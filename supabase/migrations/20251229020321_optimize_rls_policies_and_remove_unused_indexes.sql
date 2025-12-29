/*
  # Optimize RLS Policies and Remove Unused Indexes

  1. Performance Optimizations
    - Wrap all auth.<function>() calls with SELECT to prevent re-evaluation per row
    - This significantly improves query performance at scale
    
  2. Tables Updated
    - bookings: Optimize "Users can view their own bookings" policy
    - knowledge_documents: Optimize "Read public documents or all if authenticated" policy
    - client_projects: Optimize "View own projects or all if authenticated" policy
    - client_documents: Optimize "View own documents or all if authenticated admin" policy
    - project_chat_messages: Optimize "Insert own messages or any if admin" and "View own messages or all if authenticated" policies
    - chatbot_knowledge: Optimize "Read active knowledge (public) or all (authenticated)" policy
    
  3. Index Cleanup
    - Drop unused indexes on blog_posts table (idx_blog_posts_published_at, idx_blog_posts_published)
    
  4. Notes
    - Auth function calls are now wrapped in SELECT statements per Supabase best practices
    - This prevents the auth functions from being re-evaluated for each row
    - Performance improvement is significant for tables with many rows
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_blog_posts_published_at;
DROP INDEX IF EXISTS idx_blog_posts_published;

-- Optimize bookings policies
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (email = (SELECT (auth.jwt() ->> 'email'::text)));

-- Optimize knowledge_documents policies
DROP POLICY IF EXISTS "Read public documents or all if authenticated" ON knowledge_documents;
CREATE POLICY "Read public documents or all if authenticated"
  ON knowledge_documents
  FOR SELECT
  TO anon, authenticated
  USING (
    CASE
      WHEN (SELECT auth.role()) = 'authenticated' THEN true
      ELSE is_private = false
    END
  );

-- Optimize client_projects policies
DROP POLICY IF EXISTS "View own projects or all if authenticated" ON client_projects;
CREATE POLICY "View own projects or all if authenticated"
  ON client_projects
  FOR SELECT
  TO authenticated
  USING (client_email = (SELECT (auth.jwt() ->> 'email'::text)) OR true);

-- Optimize client_documents policies
DROP POLICY IF EXISTS "View own documents or all if authenticated admin" ON client_documents;
CREATE POLICY "View own documents or all if authenticated admin"
  ON client_documents
  FOR SELECT
  TO authenticated
  USING (client_email = (SELECT (auth.jwt() ->> 'email'::text)) OR true);

-- Optimize project_chat_messages policies
DROP POLICY IF EXISTS "Insert own messages or any if admin" ON project_chat_messages;
CREATE POLICY "Insert own messages or any if admin"
  ON project_chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (client_email = (SELECT (auth.jwt() ->> 'email'::text)) 
     AND sender_email = (SELECT (auth.jwt() ->> 'email'::text))) 
    OR true
  );

DROP POLICY IF EXISTS "View own messages or all if authenticated" ON project_chat_messages;
CREATE POLICY "View own messages or all if authenticated"
  ON project_chat_messages
  FOR SELECT
  TO authenticated
  USING (client_email = (SELECT (auth.jwt() ->> 'email'::text)) OR true);

-- Optimize chatbot_knowledge policies
DROP POLICY IF EXISTS "Read active knowledge (public) or all (authenticated)" ON chatbot_knowledge;
CREATE POLICY "Read active knowledge (public) or all (authenticated)"
  ON chatbot_knowledge
  FOR SELECT
  TO anon, authenticated
  USING (
    CASE
      WHEN (SELECT auth.role()) = 'authenticated' THEN true
      ELSE is_active = true
    END
  );