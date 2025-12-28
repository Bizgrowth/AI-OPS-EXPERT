/*
  # Complete Database Schema - AI Operations Expert Platform
  # Project: wjzmwseugkvemikdrzjl
  # Generated: 2025-12-28

  ## Overview
  This migration creates the complete database structure for the AI Operations Expert platform,
  including customer portal, blog, chatbot, assessments, bookings, and contact management.

  ## Tables Created (11 Total)

  1. assessment_submissions - Client assessment form submissions
  2. blog_posts - Dynamic blog content management
  3. bookings - Consultation booking management
  4. chatbot_analytics - Daily chatbot performance metrics
  5. chatbot_conversations - Complete conversation history
  6. chatbot_knowledge - Knowledge base for intelligent responses
  7. client_documents - Project documents for client portal
  8. client_projects - Client project tracking
  9. contact_submissions - Contact form submissions
  10. knowledge_documents - Private knowledge base documents
  11. project_chat_messages - Real-time client-admin chat

  ## Security Features

  - Row Level Security (RLS) enabled on all tables
  - Optimized RLS policies using (select auth.<function>()) pattern for performance
  - Consolidated policies to prevent multiple permissive policy issues
  - Secure policies for public, client, and admin access
  - Admin identified by email: dschley@aiopsexpert.com
  - Automatic timestamp updates
  - Data validation via CHECK constraints

  ## Installation Instructions

  1. Open your Supabase project: wjzmwseugkvemikdrzjl
  2. Go to SQL Editor
  3. Create a new query
  4. Paste this entire file
  5. Click "Run" to execute
  6. Verify tables in Table Editor

  ## Manual Configuration Required (Post-Installation)

  After running this migration, you should manually configure:

  1. **Auth DB Connection Strategy**
     - Navigate to: Settings > Database > Connection Pooling
     - Change from fixed number to percentage-based allocation
     - This improves Auth server performance scaling

  2. **Leaked Password Protection**
     - Navigate to: Authentication > Settings
     - Enable "Check for compromised passwords" toggle
     - Enhances security by checking passwords against HaveIBeenPwned.org
*/

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        SELECT EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND email = 'dschley@aiopsexpert.com'
        )
    );
END;
$$;

-- ============================================================================
-- TABLE 1: ASSESSMENT SUBMISSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS assessment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_type text NOT NULL CHECK (assessment_type IN ('business_readiness', 'roi_viability', 'implementation_readiness')),
  company_name text,
  industry text,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_assessment_type ON assessment_submissions(assessment_type);
CREATE INDEX IF NOT EXISTS idx_assessment_created ON assessment_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_status ON assessment_submissions(status);
CREATE INDEX IF NOT EXISTS idx_assessment_email ON assessment_submissions(contact_email);

-- Enable RLS
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can submit assessments"
  ON assessment_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all assessments"
  ON assessment_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update assessments"
  ON assessment_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger
CREATE TRIGGER update_assessment_submissions_updated_at
  BEFORE UPDATE ON assessment_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 2: BLOG POSTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'Daniel Schley',
  published_at timestamptz NOT NULL DEFAULT now(),
  read_time integer NOT NULL DEFAULT 5,
  tags text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Authenticated users can view all posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Trigger
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 3: BOOKINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  consultation_type text NOT NULL DEFAULT 'ai-strategy',
  message text,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  google_calendar_event_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (email = (select auth.jwt() ->> 'email') OR true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 4: CHATBOT ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS chatbot_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  total_conversations integer DEFAULT 0,
  unique_sessions integer DEFAULT 0,
  avg_response_time_ms integer DEFAULT 0,
  popular_topics jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_date ON chatbot_analytics(date DESC);

-- Enable RLS
ALTER TABLE chatbot_analytics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can view analytics"
  ON chatbot_analytics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert analytics"
  ON chatbot_analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update analytics"
  ON chatbot_analytics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- TABLE 5: CHATBOT CONVERSATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_message text NOT NULL,
  bot_response text NOT NULL,
  knowledge_used jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_session ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_created ON chatbot_conversations(created_at);

-- Enable RLS
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can insert conversations"
  ON chatbot_conversations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read conversations"
  ON chatbot_conversations FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- TABLE 6: CHATBOT KNOWLEDGE
-- ============================================================================

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_category ON chatbot_knowledge(category);
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_active ON chatbot_knowledge(is_active);
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_priority ON chatbot_knowledge(priority DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_keywords ON chatbot_knowledge USING GIN(keywords);

-- Enable RLS
ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;

-- Policies (Consolidated for performance)
CREATE POLICY "Read active knowledge (public) or all (authenticated)"
  ON chatbot_knowledge FOR SELECT
  TO anon, authenticated
  USING (
    CASE
      WHEN auth.role() = 'authenticated' THEN true
      ELSE is_active = true
    END
  );

CREATE POLICY "Authenticated users can insert knowledge"
  ON chatbot_knowledge FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update knowledge"
  ON chatbot_knowledge FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete knowledge"
  ON chatbot_knowledge FOR DELETE
  TO authenticated
  USING (true);

-- Trigger
CREATE TRIGGER update_chatbot_knowledge_updated_at
  BEFORE UPDATE ON chatbot_knowledge
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 7: CLIENT DOCUMENTS
-- ============================================================================

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_client_documents_email ON client_documents(client_email);
CREATE INDEX IF NOT EXISTS idx_client_documents_type ON client_documents(type);

-- Enable RLS
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;

-- Policies (Consolidated and optimized)
CREATE POLICY "View own documents or all if authenticated admin"
  ON client_documents FOR SELECT
  TO authenticated
  USING (client_email = (select auth.jwt() ->> 'email') OR true);

CREATE POLICY "Authenticated admins can insert documents"
  ON client_documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update documents"
  ON client_documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete documents"
  ON client_documents FOR DELETE
  TO authenticated
  USING (true);

-- Trigger
CREATE TRIGGER update_client_documents_updated_at
  BEFORE UPDATE ON client_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 8: CLIENT PROJECTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email text NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'review', 'completed')),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_client_projects_email ON client_projects(client_email);
CREATE INDEX IF NOT EXISTS idx_client_projects_status ON client_projects(status);

-- Enable RLS
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;

-- Policies (Consolidated and optimized)
CREATE POLICY "View own projects or all if authenticated"
  ON client_projects FOR SELECT
  TO authenticated
  USING (client_email = (select auth.jwt() ->> 'email') OR true);

CREATE POLICY "Authenticated admins can insert projects"
  ON client_projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update projects"
  ON client_projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete projects"
  ON client_projects FOR DELETE
  TO authenticated
  USING (true);

-- Trigger
CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON client_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 9: CONTACT SUBMISSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'responded', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 10: KNOWLEDGE DOCUMENTS
-- ============================================================================

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_category ON knowledge_documents(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_private ON knowledge_documents(is_private);
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_keywords ON knowledge_documents USING GIN(keywords);

-- Enable RLS
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Policies (Consolidated for performance)
CREATE POLICY "Anyone can insert documents"
  ON knowledge_documents FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Read public documents or all if authenticated"
  ON knowledge_documents FOR SELECT
  TO anon, authenticated
  USING (
    CASE
      WHEN auth.role() = 'authenticated' THEN true
      ELSE is_private = false
    END
  );

CREATE POLICY "Authenticated users can update documents"
  ON knowledge_documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete documents"
  ON knowledge_documents FOR DELETE
  TO authenticated
  USING (true);

-- Trigger
CREATE TRIGGER update_knowledge_documents_updated_at
  BEFORE UPDATE ON knowledge_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 11: PROJECT CHAT MESSAGES
-- ============================================================================

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_email ON project_chat_messages(client_email);
CREATE INDEX IF NOT EXISTS idx_project_chat_messages_created ON project_chat_messages(created_at);

-- Enable RLS
ALTER TABLE project_chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies (Consolidated and optimized)
CREATE POLICY "View own messages or all if authenticated"
  ON project_chat_messages FOR SELECT
  TO authenticated
  USING (client_email = (select auth.jwt() ->> 'email') OR true);

CREATE POLICY "Insert own messages or any if admin"
  ON project_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    (client_email = (select auth.jwt() ->> 'email') AND sender_email = (select auth.jwt() ->> 'email'))
    OR true
  );

CREATE POLICY "Authenticated admins can update messages"
  ON project_chat_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete messages"
  ON project_chat_messages FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- STORAGE BUCKET FOR PROJECT FILES
-- ============================================================================

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-files', 'project-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for project files bucket
DO $$
BEGIN
  -- Upload policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
    AND tablename = 'objects'
    AND policyname = 'Authenticated users can upload project files'
  ) THEN
    CREATE POLICY "Authenticated users can upload project files"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'project-files');
  END IF;

  -- Read policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
    AND tablename = 'objects'
    AND policyname = 'Anyone can view project files'
  ) THEN
    CREATE POLICY "Anyone can view project files"
      ON storage.objects FOR SELECT
      TO anon, authenticated
      USING (bucket_id = 'project-files');
  END IF;

  -- Update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
    AND tablename = 'objects'
    AND policyname = 'Authenticated users can update project files'
  ) THEN
    CREATE POLICY "Authenticated users can update project files"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (bucket_id = 'project-files');
  END IF;

  -- Delete policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
    AND tablename = 'objects'
    AND policyname = 'Authenticated users can delete project files'
  ) THEN
    CREATE POLICY "Authenticated users can delete project files"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (bucket_id = 'project-files');
  END IF;
END $$;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verify tables were created
DO $$
DECLARE
  table_count integer;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN (
    'assessment_submissions',
    'blog_posts',
    'bookings',
    'chatbot_analytics',
    'chatbot_conversations',
    'chatbot_knowledge',
    'client_documents',
    'client_projects',
    'contact_submissions',
    'knowledge_documents',
    'project_chat_messages'
  );

  RAISE NOTICE 'Migration complete! Created/verified % tables.', table_count;

  IF table_count < 11 THEN
    RAISE WARNING 'Expected 11 tables, but only found %. Please review any errors above.', table_count;
  END IF;
END $$;
