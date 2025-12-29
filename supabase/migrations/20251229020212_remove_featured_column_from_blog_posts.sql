/*
  # Remove featured column from blog_posts table

  1. Changes
    - Drop the `featured` column from the `blog_posts` table
    - This column is no longer used in the application
  
  2. Notes
    - This is a safe operation as the column has a default value
    - No data migration needed
*/

ALTER TABLE blog_posts DROP COLUMN IF EXISTS featured;