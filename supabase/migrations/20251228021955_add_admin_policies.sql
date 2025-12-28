/*
  # Add Admin Access Policies

  1. Security Updates
    - Add SELECT policy for authenticated users on `contact_submissions`
    - Add UPDATE policy for authenticated users on `contact_submissions`
    - Add SELECT, INSERT, UPDATE, DELETE policies for authenticated users on `blog_posts`
    
  2. Notes
    - Policies restrict access to authenticated users only
    - In production, you should further restrict to specific admin users
    - For now, any authenticated user is treated as admin
*/

-- Policies for contact_submissions (admin read/update access)
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for blog_posts (full admin access)
CREATE POLICY "Authenticated users can view all blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow public to read published blog posts
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);
