/*
  # Create Assessment Tables

  1. New Tables
    - `assessment_submissions`
      - `id` (uuid, primary key)
      - `assessment_type` (text) - 'business_readiness', 'roi_viability', 'implementation_readiness'
      - `company_name` (text)
      - `industry` (text)
      - `contact_name` (text)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `responses` (jsonb) - stores all form responses
      - `status` (text) - 'submitted', 'reviewing', 'completed'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `assessment_submissions` table
    - Add policy for public to insert their own assessments
    - Add policy for authenticated admins to view all assessments
*/

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

ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit assessments"
  ON assessment_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all assessments"
  ON assessment_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update assessments"
  ON assessment_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_assessment_type ON assessment_submissions(assessment_type);
CREATE INDEX IF NOT EXISTS idx_assessment_created ON assessment_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_status ON assessment_submissions(status);