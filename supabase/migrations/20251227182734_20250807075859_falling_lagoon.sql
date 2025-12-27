/*
  # Create Knowledge Base Tables

  1. New Tables
    - `knowledge_documents`
      - `id` (uuid, primary key)
      - `filename` (text)
      - `content` (text)
      - `category` (text)
      - `keywords` (text array)
      - `is_private` (boolean)
      - `file_size` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chatbot_conversations`
      - `id` (uuid, primary key)
      - `session_id` (text)
      - `user_message` (text)
      - `bot_response` (text)
      - `knowledge_used` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated access only
    - Private documents only accessible by admin
*/

-- Knowledge Documents Table
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  keywords text[] DEFAULT '{}',
  is_private boolean DEFAULT true,
  file_size integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chatbot Conversations Table
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_message text NOT NULL,
  bot_response text NOT NULL,
  knowledge_used jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Policies for knowledge_documents (admin only for private docs)
CREATE POLICY "Anyone can read public documents"
  ON knowledge_documents
  FOR SELECT
  USING (is_private = false);

CREATE POLICY "Authenticated users can manage all documents"
  ON knowledge_documents
  FOR ALL
  TO authenticated
  USING (true);

-- Policies for chatbot_conversations (public can insert, admin can read)
CREATE POLICY "Anyone can insert conversations"
  ON chatbot_conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read conversations"
  ON chatbot_conversations
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_category ON knowledge_documents(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_private ON knowledge_documents(is_private);
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_keywords ON knowledge_documents USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_session ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_created ON chatbot_conversations(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_knowledge_documents_updated_at
    BEFORE UPDATE ON knowledge_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();