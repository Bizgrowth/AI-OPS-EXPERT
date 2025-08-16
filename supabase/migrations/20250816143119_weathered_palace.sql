/*
  # Client Portal Database Schema

  1. New Tables
    - `client_projects`
      - `id` (uuid, primary key)
      - `client_email` (text)
      - `name` (text)
      - `status` (text) - planning, in-progress, review, completed
      - `progress` (integer) - 0-100
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `client_documents`
      - `id` (uuid, primary key)
      - `client_email` (text)
      - `title` (text)
      - `type` (text) - mvp, prd, project-plan, business-doc, other
      - `content` (text)
      - `file_url` (text, optional)
      - `created_by` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `project_chat_messages`
      - `id` (uuid, primary key)
      - `client_email` (text)
      - `sender_email` (text)
      - `sender_name` (text)
      - `message` (text)
      - `is_admin` (boolean)
      - `attachment_url` (text, optional)
      - `attachment_type` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Clients can only see their own data
    - Authenticated users (admins) can see all data
    - Public users can insert their own messages

  3. Functions
    - Auto-update timestamp function for updated_at columns
*/

-- Create function to automatically update updated_at timestamp
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
    status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'review', 'completed')),
    progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create client_documents table
CREATE TABLE IF NOT EXISTS client_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_email text NOT NULL,
    title text NOT NULL,
    type text NOT NULL DEFAULT 'other' CHECK (type IN ('mvp', 'prd', 'project-plan', 'business-doc', 'other')),
    content text NOT NULL,
    file_url text,
    created_by text NOT NULL DEFAULT 'admin',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_projects_email ON client_projects(client_email);
CREATE INDEX IF NOT EXISTS idx_client_documents_email ON client_documents(client_email);
CREATE INDEX IF NOT EXISTS idx_client_documents_type ON client_documents(type);
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_email ON project_chat_messages(client_email);
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_created ON project_chat_messages(created_at);

-- Add triggers for updated_at columns
CREATE TRIGGER IF NOT EXISTS update_client_projects_updated_at
    BEFORE UPDATE ON client_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_client_documents_updated_at
    BEFORE UPDATE ON client_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_projects
CREATE POLICY IF NOT EXISTS "Clients can view their own projects"
    ON client_projects FOR SELECT
    TO public
    USING (client_email = (jwt() ->> 'email'));

CREATE POLICY IF NOT EXISTS "Authenticated users can manage all projects"
    ON client_projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- RLS Policies for client_documents
CREATE POLICY IF NOT EXISTS "Clients can view their own documents"
    ON client_documents FOR SELECT
    TO public
    USING (client_email = (jwt() ->> 'email'));

CREATE POLICY IF NOT EXISTS "Authenticated users can manage all documents"
    ON client_documents FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- RLS Policies for project_chat_messages
CREATE POLICY IF NOT EXISTS "Clients can view their own chat messages"
    ON project_chat_messages FOR SELECT
    TO public
    USING (client_email = (jwt() ->> 'email'));

CREATE POLICY IF NOT EXISTS "Clients can insert their own messages"
    ON project_chat_messages FOR INSERT
    TO public
    WITH CHECK (client_email = (jwt() ->> 'email') AND sender_email = (jwt() ->> 'email'));

CREATE POLICY IF NOT EXISTS "Authenticated users can manage all chat messages"
    ON project_chat_messages FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);