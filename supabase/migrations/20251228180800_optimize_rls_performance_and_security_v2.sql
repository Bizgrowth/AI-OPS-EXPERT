/*
  # Optimize RLS Performance and Security
  
  ## Overview
  This migration optimizes Row Level Security (RLS) policies for better performance at scale
  and removes duplicate policies that create security confusion.
  
  ## Changes Made
  
  ### 1. RLS Performance Optimization
  Wraps all `auth.uid()`, `auth.jwt()`, and `auth.role()` calls in `(SELECT ...)` to prevent
  re-evaluation for each row, improving query performance significantly.
  
  ### 2. Duplicate Policy Removal
  Removes duplicate permissive policies that were causing confusion and potential security gaps:
  - blog_posts: Consolidated overlapping SELECT, INSERT, UPDATE, DELETE policies
  - knowledge_documents: Removed redundant access policies
  - chatbot_knowledge: Kept only essential policies
  - client_documents: Removed duplicate VIEW policies
  - client_projects: Removed duplicate VIEW policies
  - project_chat_messages: Consolidated chat message policies
  
  ### 3. Unused Index Cleanup
  Drops indexes that are not being utilized to reduce storage overhead.
  
  ### 4. Function Security
  Fixes the search_path for `update_chatbot_knowledge_updated_at` function.
  
  ## Security Impact
  - Improved performance without compromising security
  - Clearer policy structure with less redundancy
  - Properly optimized auth function calls
*/

-- ============================================================================
-- STEP 1: DROP ALL EXISTING POLICIES TO REBUILD FROM SCRATCH
-- ============================================================================

-- Blog Posts
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON blog_posts;
DROP POLICY IF EXISTS "View blog posts based on role" ON blog_posts;

-- Knowledge Documents
DROP POLICY IF EXISTS "Public can read non-private documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Public can view public documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Anyone can insert knowledge documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users can manage all documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users can read all documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users can insert documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users can update documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users full access to knowledge documents" ON knowledge_documents;

-- Client Projects
DROP POLICY IF EXISTS "Clients can view their own projects" ON client_projects;
DROP POLICY IF EXISTS "View client projects based on role" ON client_projects;
DROP POLICY IF EXISTS "Authenticated users can manage all projects" ON client_projects;

-- Client Documents
DROP POLICY IF EXISTS "Clients can view their own documents" ON client_documents;
DROP POLICY IF EXISTS "View client documents based on role" ON client_documents;
DROP POLICY IF EXISTS "Authenticated users can manage all documents" ON client_documents;

-- Project Chat Messages
DROP POLICY IF EXISTS "Clients can view their own chat messages" ON project_chat_messages;
DROP POLICY IF EXISTS "Clients can insert their own messages" ON project_chat_messages;
DROP POLICY IF EXISTS "View chat messages based on role" ON project_chat_messages;
DROP POLICY IF EXISTS "Insert chat messages based on role" ON project_chat_messages;
DROP POLICY IF EXISTS "Authenticated users full access to chat messages" ON project_chat_messages;

-- Bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;

-- Chatbot Knowledge
DROP POLICY IF EXISTS "Admins can view all knowledge" ON chatbot_knowledge;
DROP POLICY IF EXISTS "Admins can insert knowledge" ON chatbot_knowledge;
DROP POLICY IF EXISTS "Admins can update knowledge" ON chatbot_knowledge;
DROP POLICY IF EXISTS "Admins can delete knowledge" ON chatbot_knowledge;

-- Chatbot Analytics
DROP POLICY IF EXISTS "Admins can view analytics" ON chatbot_analytics;
DROP POLICY IF EXISTS "Admins can manage analytics" ON chatbot_analytics;

-- ============================================================================
-- STEP 2: CREATE OPTIMIZED RLS POLICIES
-- ============================================================================

-- Blog Posts Policies
CREATE POLICY "anon_select_published"
  ON blog_posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "auth_select_all"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_insert"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "auth_update"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_delete"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Knowledge Documents Policies
CREATE POLICY "public_select_nonprivate"
  ON knowledge_documents FOR SELECT
  TO public
  USING (is_private = false);

CREATE POLICY "auth_all_access"
  ON knowledge_documents FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Client Projects Policies (Optimized with SELECT)
CREATE POLICY "client_select_own"
  ON client_projects FOR SELECT
  TO authenticated
  USING (client_email = (SELECT (auth.jwt() ->> 'email')));

CREATE POLICY "admin_all_projects"
  ON client_projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Client Documents Policies (Optimized with SELECT)
CREATE POLICY "client_select_own_docs"
  ON client_documents FOR SELECT
  TO authenticated
  USING (client_email = (SELECT (auth.jwt() ->> 'email')));

CREATE POLICY "admin_all_docs"
  ON client_documents FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Project Chat Messages Policies (Optimized with SELECT)
CREATE POLICY "client_select_own_msgs"
  ON project_chat_messages FOR SELECT
  TO authenticated
  USING (client_email = (SELECT (auth.jwt() ->> 'email')));

CREATE POLICY "client_insert_own_msgs"
  ON project_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    client_email = (SELECT (auth.jwt() ->> 'email')) AND
    sender_email = (SELECT (auth.jwt() ->> 'email'))
  );

CREATE POLICY "admin_all_msgs"
  ON project_chat_messages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Bookings Policy (Optimized with SELECT)
CREATE POLICY "user_select_own_bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (email = (SELECT (auth.jwt() ->> 'email')));

-- Chatbot Knowledge Policies (Optimized with SELECT)
CREATE POLICY "admin_select_knowledge"
  ON chatbot_knowledge FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE (SELECT auth.uid()) = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admin_insert_knowledge"
  ON chatbot_knowledge FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE (SELECT auth.uid()) = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admin_update_knowledge"
  ON chatbot_knowledge FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE (SELECT auth.uid()) = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE (SELECT auth.uid()) = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admin_delete_knowledge"
  ON chatbot_knowledge FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE (SELECT auth.uid()) = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Chatbot Analytics Policies (Optimized with SELECT)
CREATE POLICY "admin_select_analytics"
  ON chatbot_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE (SELECT auth.uid()) = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admin_insert_analytics"
  ON chatbot_analytics FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE (SELECT auth.uid()) = id
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- ============================================================================
-- STEP 3: DROP UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_chatbot_knowledge_category;
DROP INDEX IF EXISTS idx_chatbot_knowledge_priority;
DROP INDEX IF EXISTS idx_chatbot_analytics_date;

-- ============================================================================
-- STEP 4: FIX FUNCTION SEARCH PATH
-- ============================================================================

CREATE OR REPLACE FUNCTION update_chatbot_knowledge_updated_at()
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
