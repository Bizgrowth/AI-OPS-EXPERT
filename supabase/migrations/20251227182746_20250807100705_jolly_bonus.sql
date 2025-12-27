/*
  # Fix Knowledge Documents RLS Policy

  1. Changes
    - Allow anonymous users to insert documents (for admin uploads)
    - Keep read access restricted to public documents only
    - Authenticated users can still manage all documents

  2. Security
    - Anonymous users can only insert, not read private documents
    - Public documents remain readable by everyone
    - Full access for authenticated users (admin)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read public documents" ON knowledge_documents;
DROP POLICY IF EXISTS "Authenticated users can manage all documents" ON knowledge_documents;

-- Allow anonymous users to insert documents (for admin uploads)
CREATE POLICY "Anyone can insert documents"
  ON knowledge_documents
  FOR INSERT
  WITH CHECK (true);

-- Anyone can read public documents
CREATE POLICY "Anyone can read public documents"
  ON knowledge_documents
  FOR SELECT
  USING (is_private = false);

-- Authenticated users can manage all documents
CREATE POLICY "Authenticated users can manage all documents"
  ON knowledge_documents
  FOR ALL
  TO authenticated
  USING (true);

-- Authenticated users can update and delete any document
CREATE POLICY "Authenticated users can update documents"
  ON knowledge_documents
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete documents"
  ON knowledge_documents
  FOR DELETE
  TO authenticated
  USING (true);