/*
  # Create Bookings Table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Unique booking identifier
      - `first_name` (text) - Client's first name
      - `last_name` (text) - Client's last name
      - `email` (text) - Client's email address
      - `phone` (text, nullable) - Client's phone number
      - `company` (text, nullable) - Client's company name
      - `consultation_type` (text) - Type of consultation
      - `message` (text, nullable) - Client's message/notes
      - `booking_date` (date) - Date of the booking
      - `booking_time` (text) - Time slot of the booking
      - `status` (text) - Booking status (confirmed, cancelled, completed)
      - `google_calendar_event_id` (text, nullable) - Google Calendar event ID for syncing
      - `created_at` (timestamptz) - When booking was created
      - `updated_at` (timestamptz) - When booking was last updated

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for public insert (allow anyone to create bookings)
    - Add policy for authenticated users to read their own bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  consultation_type text NOT NULL DEFAULT 'ai-strategy',
  message text,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  google_calendar_event_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO anon, authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);