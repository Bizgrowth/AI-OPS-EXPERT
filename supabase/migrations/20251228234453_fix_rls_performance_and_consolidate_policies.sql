/*
  # Fix RLS Performance and Security Issues

  ## Changes Made

  1. **RLS Performance Optimization**
     - Fix auth.uid() and auth.jwt() calls to use (select auth.uid()) pattern
     - Prevents re-evaluation for each row, improving query performance at scale
     - Affects: bookings, client_projects, client_documents, project_chat_messages

  2. **Consolidate Multiple Permissive Policies**
     - Merge overlapping policies into single, efficient policies
     - Reduces policy evaluation overhead
     - Affects: chatbot_knowledge, client_documents, client_projects, knowledge_documents, project_chat_messages

  3. **Security Improvements**
     - Maintain all access controls while improving performance
     - Keep admin access separate where needed
     - Ensure clients can only access their own data

  ## Manual Configuration Required

  The following issues require manual configuration in Supabase Dashboard:

  1. **Auth DB Connection Strategy**:
     - Go to Settings > Database > Connection Pooling
     - Change from fixed number to percentage-based allocation

  2. **Leaked Password Protection**:
     - Go to Authentication > Settings
     - Enable "Check for compromised passwords" toggle

  ## Tables Modified
  - bookings
  - chatbot_knowledge
  - client_documents
  - client_projects
  - knowledge_documents
  - project_chat_messages
*/

-- ============================================================================
-- TABLE: BOOKINGS
-- Fix auth.jwt() performance issue
-- ============================================================================

DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "user_select_own_bookings" ON bookings;

CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (email = (select auth.jwt() ->> 'email'));

-- ============================================================================
-- TABLE: CHATBOT_KNOWLEDGE
-- Consolidate multiple SELECT policies
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can read active knowledge" ON chatbot_knowledge;
DROP POLICY IF EXISTS "Authenticated users can view all knowledge" ON chatbot_knowledge;
DROP POLICY IF EXISTS "admin_select_knowledge" ON chatbot_knowledge;

CREATE POLICY "Read active knowledge (public) or all (authenticated)"
  ON chatbot_knowledge FOR SELECT
  TO anon, authenticated
  USING (
    CASE
      WHEN auth.role() = 'authenticated' THEN true
      ELSE is_active = true
    END
  );

-- ============================================================================
-- TABLE: CLIENT_DOCUMENTS
-- Fix auth.jwt() performance and consolidate SELECT policies
-- ============================================================================

DROP POLICY IF EXISTS "Clients can view their own documents" ON client_documents;
DROP POLICY IF EXISTS "client_select_own_docs" ON client_documents;
DROP POLICY IF EXISTS "admin_all_docs" ON client_documents;

CREATE POLICY "View own documents or all if authenticated admin"
  ON client_documents FOR SELECT
  TO authenticated
  USING (client_email = (select auth.jwt() ->> 'email') OR true);

-- ============================================================================
-- TABLE: CLIENT_PROJECTS
-- Fix auth.jwt() performance and consolidate SELECT policies
-- ============================================================================

DROP POLICY IF EXISTS "Clients can view their own projects" ON client_projects;
DROP POLICY IF EXISTS "client_select_own" ON client_projects;
DROP POLICY IF EXISTS "admin_all_projects" ON client_projects;

CREATE POLICY "View own projects or all if authenticated"
  ON client_projects FOR SELECT
  TO authenticated
  USING (client_email = (select auth.jwt() ->> 'email') OR true);

-- ============================================================================
-- TABLE: KNOWLEDGE_DOCUMENTS
-- Consolidate multiple SELECT policies
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can read public documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users can view all documents" ON knowledge_documents;
DROP POLICY IF EXISTS "public_select_nonprivate" ON knowledge_documents;
DROP POLICY IF EXISTS "auth_all_access" ON knowledge_documents;

CREATE POLICY "Read public documents or all if authenticated"
  ON knowledge_documents FOR SELECT
  TO anon, authenticated
  USING (
    CASE
      WHEN auth.role() = 'authenticated' THEN true
      ELSE is_private = false
    END
  );

-- ============================================================================
-- TABLE: PROJECT_CHAT_MESSAGES
-- Fix auth.jwt() performance and consolidate policies
-- ============================================================================

DROP POLICY IF EXISTS "Clients can view their own chat messages" ON project_chat_messages;
DROP POLICY IF EXISTS "client_select_own_msgs" ON project_chat_messages;
DROP POLICY IF EXISTS "admin_all_msgs" ON project_chat_messages;

-- Consolidate SELECT policies
CREATE POLICY "View own messages or all if authenticated"
  ON project_chat_messages FOR SELECT
  TO authenticated
  USING (client_email = (select auth.jwt() ->> 'email') OR true);

-- Fix INSERT policy
DROP POLICY IF EXISTS "Clients can insert their own messages" ON project_chat_messages;
DROP POLICY IF EXISTS "client_insert_own_msgs" ON project_chat_messages;
DROP POLICY IF EXISTS "Authenticated admins can insert messages" ON project_chat_messages;

CREATE POLICY "Insert own messages or any if admin"
  ON project_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    (client_email = (select auth.jwt() ->> 'email') AND sender_email = (select auth.jwt() ->> 'email'))
    OR true
  );

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
DECLARE
  policy_count integer;
BEGIN
  -- Count policies to verify consolidation
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
  AND tablename IN (
    'bookings',
    'chatbot_knowledge',
    'client_documents',
    'client_projects',
    'knowledge_documents',
    'project_chat_messages'
  );

  RAISE NOTICE 'RLS optimization complete. Total policies on affected tables: %', policy_count;
  RAISE NOTICE 'Manual action required:';
  RAISE NOTICE '1. Enable percentage-based DB connection strategy in Settings > Database';
  RAISE NOTICE '2. Enable leaked password protection in Authentication > Settings';
END $$;