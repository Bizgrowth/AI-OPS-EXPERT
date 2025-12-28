/*
  # Fix RLS Performance and Security Issues

  ## Overview
  This migration addresses critical performance and security issues identified in the database audit.

  ## Performance Improvements
  
  ### Optimized RLS Policies
  The following policies have been updated to use `(SELECT auth.jwt()->>'email')` pattern
  to prevent re-evaluation of auth functions for each row, significantly improving query
  performance at scale:
  
  - `bookings.user_select_own_bookings`
  - `client_projects.client_select_own`
  - `client_documents.client_select_own_docs`
  - `project_chat_messages.client_insert_own_msgs`
  - `project_chat_messages.client_select_own_msgs`

  ## Security Improvements
  
  ### Function Search Path
  - Fixed `update_blog_posts_updated_at()` function to use immutable search_path
  - Added SECURITY DEFINER with explicit search_path to prevent SQL injection

  ## Tables Updated
  - bookings
  - client_projects
  - client_documents
  - project_chat_messages

  ## Functions Updated
  - update_blog_posts_updated_at
*/

-- Fix bookings table RLS policy
DROP POLICY IF EXISTS "user_select_own_bookings" ON bookings;
CREATE POLICY "user_select_own_bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (email = (SELECT auth.jwt()->>'email'));

-- Fix client_projects table RLS policy
DROP POLICY IF EXISTS "client_select_own" ON client_projects;
CREATE POLICY "client_select_own"
  ON client_projects FOR SELECT
  TO authenticated
  USING (client_email = (SELECT auth.jwt()->>'email'));

-- Fix client_documents table RLS policy
DROP POLICY IF EXISTS "client_select_own_docs" ON client_documents;
CREATE POLICY "client_select_own_docs"
  ON client_documents FOR SELECT
  TO authenticated
  USING (client_email = (SELECT auth.jwt()->>'email'));

-- Fix project_chat_messages table RLS policies
DROP POLICY IF EXISTS "client_insert_own_msgs" ON project_chat_messages;
DROP POLICY IF EXISTS "client_select_own_msgs" ON project_chat_messages;

CREATE POLICY "client_insert_own_msgs"
  ON project_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    client_email = (SELECT auth.jwt()->>'email') 
    AND sender_email = (SELECT auth.jwt()->>'email')
  );

CREATE POLICY "client_select_own_msgs"
  ON project_chat_messages FOR SELECT
  TO authenticated
  USING (client_email = (SELECT auth.jwt()->>'email'));

-- Fix function search_path to be secure and immutable
DROP FUNCTION IF EXISTS update_blog_posts_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger after function recreation
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Add helpful comments documenting the optimization
COMMENT ON POLICY "user_select_own_bookings" ON bookings IS 
  'Optimized: Uses (SELECT auth.jwt()) to prevent per-row evaluation';
COMMENT ON POLICY "client_select_own" ON client_projects IS 
  'Optimized: Uses (SELECT auth.jwt()) to prevent per-row evaluation';
COMMENT ON POLICY "client_select_own_docs" ON client_documents IS 
  'Optimized: Uses (SELECT auth.jwt()) to prevent per-row evaluation';
COMMENT ON POLICY "client_insert_own_msgs" ON project_chat_messages IS 
  'Optimized: Uses (SELECT auth.jwt()) to prevent per-row evaluation';
COMMENT ON POLICY "client_select_own_msgs" ON project_chat_messages IS 
  'Optimized: Uses (SELECT auth.jwt()) to prevent per-row evaluation';
COMMENT ON FUNCTION update_blog_posts_updated_at() IS 
  'Secure: Uses SECURITY DEFINER with explicit search_path to prevent SQL injection';
