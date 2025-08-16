/*
  # Client Portal Database Schema

  1. New Tables
    - `client_projects`
      - `id` (uuid, primary key)
      - `client_email` (text, not null)
      - `name` (text, not null)
      - `status` (text, check constraint for valid statuses)
      - `progress` (integer, 0-100)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `client_documents`
      - `id` (uuid, primary key)
      - `client_email` (text, not null)
      - `title` (text, not null)
      - `type` (text, check constraint for document types)
      - `content` (text, not null)
      - `file_url` (text, optional)
      - `created_by` (text, default 'admin')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `project_chat_messages`
      - `id` (uuid, primary key)
      - `client_email` (text, not null)
      - `sender_email` (text, not null)
      - `sender_name` (text, not null)
      - `message` (text, not null)
      - `is_admin` (boolean, default false)
      - `attachment_url` (text, optional)
      - `attachment_type` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Clients can only access their own data
    - Authenticated users (admins) can access all data
    - Public users can insert chat messages and view their own data

  3. Indexes
    - Performance indexes on frequently queried columns
    - Email-based indexes for efficient client data retrieval

  4. Triggers
    - Auto-update timestamps on record changes
*/

-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create client_projects table
CREATE TABLE IF NOT EXISTS client_projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_email text NOT NULL,
    name text NOT NULL,
    status text NOT NULL DEFAULT 'planning',
    progress integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    CONSTRAINT client_projects_status_check 
        CHECK (status IN ('planning', 'in-progress', 'review', 'completed')),
    CONSTRAINT client_projects_progress_check 
        CHECK (progress >= 0 AND progress <= 100)
);

-- Create client_documents table
CREATE TABLE IF NOT EXISTS client_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_email text NOT NULL,
    title text NOT NULL,
    type text NOT NULL DEFAULT 'other',
    content text NOT NULL,
    file_url text,
    created_by text NOT NULL DEFAULT 'admin',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    CONSTRAINT client_documents_type_check 
        CHECK (type IN ('mvp', 'prd', 'project-plan', 'business-doc', 'other'))
);

-- Create project_chat_messages table
CREATE TABLE IF NOT EXISTS project_chat_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_email text NOT NULL,
    sender_email text NOT NULL,
    sender_name text NOT NULL,
    message text NOT NULL,
    is_admin boolean DEFAULT false,
    attachment_url text,
    attachment_type text,
    created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_client_projects_email ON client_projects(client_email);
CREATE INDEX IF NOT EXISTS idx_client_documents_email ON client_documents(client_email);
CREATE INDEX IF NOT EXISTS idx_client_documents_type ON client_documents(type);
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_email ON project_chat_messages(client_email);
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_created ON project_chat_messages(created_at);

-- Enable Row Level Security
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for client_projects
CREATE POLICY "Clients can view their own projects"
    ON client_projects
    FOR SELECT
    TO public
    USING (client_email = (jwt() ->> 'email'));

CREATE POLICY "Authenticated users can manage all projects"
    ON client_projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create RLS policies for client_documents
CREATE POLICY "Clients can view their own documents"
    ON client_documents
    FOR SELECT
    TO public
    USING (client_email = (jwt() ->> 'email'));

CREATE POLICY "Authenticated users can manage all documents"
    ON client_documents
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create RLS policies for project_chat_messages
CREATE POLICY "Clients can view their own chat messages"
    ON project_chat_messages
    FOR SELECT
    TO public
    USING (client_email = (jwt() ->> 'email'));

CREATE POLICY "Clients can insert their own messages"
    ON project_chat_messages
    FOR INSERT
    TO public
    WITH CHECK (
        client_email = (jwt() ->> 'email') AND 
        sender_email = (jwt() ->> 'email')
    );

CREATE POLICY "Authenticated users can manage all chat messages"
    ON project_chat_messages
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_client_projects_updated_at
    BEFORE UPDATE ON client_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_documents_updated_at
    BEFORE UPDATE ON client_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for demonstration (optional - remove in production)
INSERT INTO client_projects (client_email, name, status, progress) VALUES
    ('demo@aiopsexpert.com', 'AI Customer Service Chatbot', 'in-progress', 75),
    ('demo@aiopsexpert.com', 'Inventory Management AI', 'completed', 100),
    ('demo@aiopsexpert.com', 'Financial Forecasting System', 'planning', 25);

INSERT INTO client_documents (client_email, title, type, content) VALUES
    ('demo@aiopsexpert.com', 'AI Chatbot MVP - Customer Service Automation', 'mvp', 
     '# AI Chatbot MVP - Customer Service Automation

## Executive Summary
This MVP outlines the development of an AI-powered customer service chatbot that will handle 80% of routine customer inquiries, reducing response time from hours to seconds.

## Key Features
- Natural language processing for customer queries
- Integration with existing CRM system
- 24/7 availability
- Escalation to human agents when needed
- Multi-language support

## Success Metrics
- 80% reduction in customer service tickets
- <5 second average response time
- 90%+ customer satisfaction rating
- 24/7 availability

## Implementation Timeline
- Week 1-2: Requirements gathering and design
- Week 3-4: Core chatbot development
- Week 5-6: CRM integration and testing
- Week 7-8: Deployment and training

## Investment
- Development: $5,000
- Monthly hosting: $97
- Expected ROI: 400% within 6 months');