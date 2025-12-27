/*
  # Create Customer Portal Tables

  1. New Tables
    - `client_projects`
      - `id` (uuid, primary key)
      - `client_email` (text)
      - `name` (text)
      - `status` (text)
      - `progress` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `client_documents`
      - `id` (uuid, primary key)
      - `client_email` (text)
      - `title` (text)
      - `type` (text)
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
    - Add policies for client access to their own data
    - Admin access for all data
*/

-- Client Projects Table
CREATE TABLE IF NOT EXISTS client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email text NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'review', 'completed')),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Client Documents Table
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

-- Project Chat Messages Table
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

-- Enable RLS
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for client_projects
CREATE POLICY "Clients can view their own projects"
  ON client_projects
  FOR SELECT
  USING (client_email = auth.jwt() ->> 'email');

CREATE POLICY "Authenticated users can manage all projects"
  ON client_projects
  FOR ALL
  TO authenticated
  USING (true);

-- Policies for client_documents
CREATE POLICY "Clients can view their own documents"
  ON client_documents
  FOR SELECT
  USING (client_email = auth.jwt() ->> 'email');

CREATE POLICY "Authenticated users can manage all documents"
  ON client_documents
  FOR ALL
  TO authenticated
  USING (true);

-- Policies for project_chat_messages
CREATE POLICY "Clients can view their own chat messages"
  ON project_chat_messages
  FOR SELECT
  USING (client_email = auth.jwt() ->> 'email');

CREATE POLICY "Clients can insert their own messages"
  ON project_chat_messages
  FOR INSERT
  WITH CHECK (client_email = auth.jwt() ->> 'email' AND sender_email = auth.jwt() ->> 'email');

CREATE POLICY "Authenticated users can manage all chat messages"
  ON project_chat_messages
  FOR ALL
  TO authenticated
  USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_projects_email ON client_projects(client_email);
CREATE INDEX IF NOT EXISTS idx_client_documents_email ON client_documents(client_email);
CREATE INDEX IF NOT EXISTS idx_client_documents_type ON client_documents(type);
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_email ON project_chat_messages(client_email);
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_created ON project_chat_messages(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_client_projects_updated_at
    BEFORE UPDATE ON client_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_documents_updated_at
    BEFORE UPDATE ON client_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-files', 'project-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Authenticated users can upload project files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-files');

CREATE POLICY "Anyone can view project files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-files');

CREATE POLICY "Authenticated users can update project files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-files');

CREATE POLICY "Authenticated users can delete project files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-files');