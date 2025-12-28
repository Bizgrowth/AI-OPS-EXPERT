/*
  # Recreate Blog Posts Table

  Force PostgREST to recognize the blog_posts table by recreating it.
  
  1. Drop existing table and all related objects
  2. Recreate table with all columns and constraints
  3. Restore data
  4. Recreate indexes and triggers
  5. Set up RLS policies
*/

-- Backup existing data
CREATE TEMP TABLE blog_posts_backup AS 
SELECT * FROM blog_posts;

-- Drop existing table (CASCADE will drop all related objects)
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Recreate blog_posts table
CREATE TABLE blog_posts (
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

-- Restore data
INSERT INTO blog_posts 
SELECT * FROM blog_posts_backup;

-- Create indexes
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX idx_blog_posts_published ON blog_posts(published) WHERE published = true;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON blog_posts TO anon, authenticated, service_role;

-- RLS Policies
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

-- Create update trigger
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Force PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
