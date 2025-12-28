/*
  # Add Chatbot Knowledge Base and Analytics Tables

  1. New Tables
    - `chatbot_knowledge`
      - `id` (uuid, primary key)
      - `category` (text) - Knowledge category
      - `topic` (text) - Specific topic
      - `content` (text) - Detailed content
      - `keywords` (text array) - Search keywords
      - `is_active` (boolean) - Whether this knowledge is active
      - `priority` (integer) - Display/search priority
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `chatbot_analytics`
      - `id` (uuid, primary key)
      - `date` (date) - Analytics date
      - `total_conversations` (integer) - Total conversations
      - `unique_sessions` (integer) - Unique sessions
      - `avg_response_time_ms` (integer) - Average response time
      - `popular_topics` (jsonb) - Popular topics JSON
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Public can read active knowledge
    - Only authenticated admins can manage knowledge
    - Analytics accessible to admins only
*/

-- Create chatbot_knowledge table
CREATE TABLE IF NOT EXISTS chatbot_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  topic text NOT NULL,
  content text NOT NULL,
  keywords text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chatbot_analytics table
CREATE TABLE IF NOT EXISTS chatbot_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  total_conversations integer DEFAULT 0,
  unique_sessions integer DEFAULT 0,
  avg_response_time_ms integer DEFAULT 0,
  popular_topics jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_category ON chatbot_knowledge(category);
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_active ON chatbot_knowledge(is_active);
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_priority ON chatbot_knowledge(priority DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_date ON chatbot_analytics(date DESC);

-- Enable Row Level Security
ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_analytics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can read active knowledge" ON chatbot_knowledge;
  DROP POLICY IF EXISTS "Admins can view all knowledge" ON chatbot_knowledge;
  DROP POLICY IF EXISTS "Admins can insert knowledge" ON chatbot_knowledge;
  DROP POLICY IF EXISTS "Admins can update knowledge" ON chatbot_knowledge;
  DROP POLICY IF EXISTS "Admins can delete knowledge" ON chatbot_knowledge;
  DROP POLICY IF EXISTS "Admins can view analytics" ON chatbot_analytics;
  DROP POLICY IF EXISTS "Admins can manage analytics" ON chatbot_analytics;
END $$;

-- Policies for chatbot_knowledge
CREATE POLICY "Anyone can read active knowledge"
  ON chatbot_knowledge FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all knowledge"
  ON chatbot_knowledge FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can insert knowledge"
  ON chatbot_knowledge FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can update knowledge"
  ON chatbot_knowledge FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can delete knowledge"
  ON chatbot_knowledge FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Policies for chatbot_analytics
CREATE POLICY "Admins can view analytics"
  ON chatbot_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can manage analytics"
  ON chatbot_analytics FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_chatbot_knowledge_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for chatbot_knowledge
DROP TRIGGER IF EXISTS trigger_update_chatbot_knowledge_updated_at ON chatbot_knowledge;
CREATE TRIGGER trigger_update_chatbot_knowledge_updated_at
  BEFORE UPDATE ON chatbot_knowledge
  FOR EACH ROW
  EXECUTE FUNCTION update_chatbot_knowledge_updated_at();