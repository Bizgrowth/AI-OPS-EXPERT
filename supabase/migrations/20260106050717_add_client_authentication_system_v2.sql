/*
  # Client Authentication System Migration

  ## Overview
  This migration adds full authentication support for the client portal, enabling
  clients to self-register, login securely, and access personalized project data.

  ## New Tables Created (3)

  1. **clients_profile** - Extended client profile information
  2. **project_updates** - Track project milestone changes  
  3. **notification_preferences** - Client email notification settings

  ## Existing Tables Modified (3)

  1. **client_projects** - Add user_id for auth-based access
  2. **client_documents** - Add user_id for auth-based access
  3. **project_chat_messages** - Add user_id for auth-based access

  ## Security Features

  - All tables have Row Level Security (RLS) enabled
  - Policies use auth.uid() for secure user-based access control
  - Clients can only access their own data
  - Admins (dschley@aiopsexpert.com) can access all data
*/

-- ============================================================================
-- STEP 1: MODIFY EXISTING TABLES FIRST (ADD USER_ID COLUMNS)
-- ============================================================================

-- Add user_id to client_projects if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'client_projects' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE client_projects ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
    CREATE INDEX idx_client_projects_user_id ON client_projects(user_id);
  END IF;
END $$;

-- Add user_id to client_documents if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'client_documents' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE client_documents ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
    CREATE INDEX idx_client_documents_user_id ON client_documents(user_id);
  END IF;
END $$;

-- Add user_id to project_chat_messages if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'project_chat_messages' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE project_chat_messages ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
    CREATE INDEX idx_project_chat_messages_user_id ON project_chat_messages(user_id);
  END IF;
END $$;

-- ============================================================================
-- STEP 2: UPDATE RLS POLICIES TO USE USER_ID
-- ============================================================================

-- Drop and recreate client_projects policies
DROP POLICY IF EXISTS "View own projects or all if authenticated" ON client_projects;
DROP POLICY IF EXISTS "Authenticated admins can insert projects" ON client_projects;
DROP POLICY IF EXISTS "Authenticated admins can update projects" ON client_projects;
DROP POLICY IF EXISTS "Authenticated admins can delete projects" ON client_projects;
DROP POLICY IF EXISTS "Users can view own projects" ON client_projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON client_projects;
DROP POLICY IF EXISTS "Admins can update projects" ON client_projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON client_projects;

CREATE POLICY "Users can view own projects"
  ON client_projects FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND email = 'dschley@aiopsexpert.com'
    )
  );

CREATE POLICY "Admins can insert projects"
  ON client_projects FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE POLICY "Admins can update projects"
  ON client_projects FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE POLICY "Admins can delete projects"
  ON client_projects FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

-- Drop and recreate client_documents policies
DROP POLICY IF EXISTS "View own documents or all if authenticated admin" ON client_documents;
DROP POLICY IF EXISTS "Authenticated admins can insert documents" ON client_documents;
DROP POLICY IF EXISTS "Authenticated admins can update documents" ON client_documents;
DROP POLICY IF EXISTS "Authenticated admins can delete documents" ON client_documents;
DROP POLICY IF EXISTS "Users can view own documents" ON client_documents;
DROP POLICY IF EXISTS "Admins can insert documents" ON client_documents;
DROP POLICY IF EXISTS "Admins can update documents" ON client_documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON client_documents;

CREATE POLICY "Users can view own documents"
  ON client_documents FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND email = 'dschley@aiopsexpert.com'
    )
  );

CREATE POLICY "Admins can insert documents"
  ON client_documents FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE POLICY "Admins can update documents"
  ON client_documents FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE POLICY "Admins can delete documents"
  ON client_documents FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

-- Drop and recreate project_chat_messages policies
DROP POLICY IF EXISTS "View own messages or all if authenticated" ON project_chat_messages;
DROP POLICY IF EXISTS "Insert own messages or any if admin" ON project_chat_messages;
DROP POLICY IF EXISTS "Authenticated admins can update messages" ON project_chat_messages;
DROP POLICY IF EXISTS "Authenticated admins can delete messages" ON project_chat_messages;
DROP POLICY IF EXISTS "Users can view own messages" ON project_chat_messages;
DROP POLICY IF EXISTS "Users can insert own messages" ON project_chat_messages;
DROP POLICY IF EXISTS "Admins can update messages" ON project_chat_messages;
DROP POLICY IF EXISTS "Admins can delete messages" ON project_chat_messages;

CREATE POLICY "Users can view own messages"
  ON project_chat_messages FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND email = 'dschley@aiopsexpert.com'
    )
  );

CREATE POLICY "Users can insert own messages"
  ON project_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND email = 'dschley@aiopsexpert.com'
    )
  );

CREATE POLICY "Admins can update messages"
  ON project_chat_messages FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE POLICY "Admins can delete messages"
  ON project_chat_messages FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

-- ============================================================================
-- STEP 3: CREATE NEW TABLES
-- ============================================================================

-- TABLE 1: CLIENTS_PROFILE
CREATE TABLE IF NOT EXISTS clients_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  company_name text,
  full_name text NOT NULL,
  phone text,
  industry text,
  avatar_url text,
  onboarded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_clients_profile_user_id ON clients_profile(user_id);

ALTER TABLE clients_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON clients_profile FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE POLICY "Users can insert own profile"
  ON clients_profile FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON clients_profile FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ))
  WITH CHECK (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE TRIGGER update_clients_profile_updated_at
  BEFORE UPDATE ON clients_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- TABLE 2: PROJECT_UPDATES
CREATE TABLE IF NOT EXISTS project_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES client_projects(id) ON DELETE CASCADE NOT NULL,
  update_type text NOT NULL CHECK (update_type IN ('status_change', 'milestone', 'document', 'message', 'note')),
  title text NOT NULL,
  description text,
  old_value text,
  new_value text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON project_updates(project_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_created_at ON project_updates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_updates_email_sent ON project_updates(email_sent) WHERE email_sent = false;

ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view updates for their projects"
  ON project_updates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_projects
      WHERE client_projects.id = project_updates.project_id
      AND client_projects.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND email = 'dschley@aiopsexpert.com'
    )
  );

CREATE POLICY "Admins can insert project updates"
  ON project_updates FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

CREATE POLICY "Admins can update project updates"
  ON project_updates FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'dschley@aiopsexpert.com'
  ));

-- TABLE 3: NOTIFICATION_PREFERENCES
CREATE TABLE IF NOT EXISTS notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  project_updates boolean DEFAULT true,
  new_documents boolean DEFAULT true,
  new_messages boolean DEFAULT true,
  weekly_summary boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notification preferences"
  ON notification_preferences FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own notification preferences"
  ON notification_preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own notification preferences"
  ON notification_preferences FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
DECLARE
  new_table_count integer;
BEGIN
  SELECT COUNT(*) INTO new_table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN (
    'clients_profile',
    'project_updates',
    'notification_preferences'
  );

  RAISE NOTICE 'Client authentication migration complete! Created % new tables.', new_table_count;
END $$;