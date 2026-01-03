/*
  # Payment and Subscription System

  1. New Tables
    - `stripe_customers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `stripe_customer_id` (text, unique)
      - `email` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `stripe_subscription_id` (text, unique)
      - `stripe_customer_id` (text)
      - `status` (text) - active, canceled, past_due, etc.
      - `price_id` (text) - Stripe price ID
      - `quantity` (integer)
      - `cancel_at_period_end` (boolean)
      - `current_period_start` (timestamptz)
      - `current_period_end` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `stripe_payment_intent_id` (text, unique)
      - `stripe_customer_id` (text)
      - `amount` (integer) - amount in cents
      - `currency` (text)
      - `status` (text) - succeeded, failed, pending, etc.
      - `description` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can read their own payment data
    - Only service role can insert/update payment data (via webhooks)
*/

-- Create stripe_customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id text UNIQUE NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text UNIQUE NOT NULL,
  stripe_customer_id text NOT NULL,
  status text NOT NULL DEFAULT 'incomplete',
  price_id text NOT NULL,
  quantity integer DEFAULT 1 NOT NULL,
  cancel_at_period_end boolean DEFAULT false NOT NULL,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id text UNIQUE NOT NULL,
  stripe_customer_id text NOT NULL,
  amount integer NOT NULL,
  currency text DEFAULT 'usd' NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  description text,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Enable RLS
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for stripe_customers
CREATE POLICY "Users can view own customer data"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);