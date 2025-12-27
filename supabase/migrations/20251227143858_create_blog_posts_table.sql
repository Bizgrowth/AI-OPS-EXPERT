/*
  # Create Blog Posts Table

  ## Overview
  This migration creates a comprehensive blog management system that allows you to create, 
  edit, and publish blog posts without modifying code.

  ## New Tables
  
  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text, required) - Blog post title
  - `excerpt` (text, required) - Short summary/preview of the post
  - `content` (text, required) - Full markdown content of the post
  - `author` (text, required) - Author name (defaults to "Daniel Schley")
  - `published_at` (timestamptz, required) - Publication date and time
  - `read_time` (integer, required) - Estimated reading time in minutes
  - `tags` (text[], required) - Array of tags/categories
  - `featured` (boolean, required) - Whether post appears as featured (defaults to false)
  - `published` (boolean, required) - Whether post is live on the site (defaults to false)
  - `created_at` (timestamptz) - When the record was created
  - `updated_at` (timestamptz) - When the record was last updated

  ## Security
  
  1. Enable RLS on blog_posts table
  2. Public read access for published posts only
  3. Authenticated users can create, update, and delete posts (admin access)

  ## Indexes
  
  - Index on `published_at` for efficient sorting
  - Index on `featured` for quick featured post queries
  - Index on `published` for filtering published vs draft posts
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can view all posts (including drafts)
CREATE POLICY "Authenticated users can view all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Insert existing blog posts as initial data
INSERT INTO blog_posts (title, excerpt, content, author, published_at, read_time, tags, featured, published) VALUES
(
  'AI will make my business feel impersonal',
  'The #1 objection from small business owners about AI - and why it''s completely wrong. Real example: How Jennifer''s agency gained 12 hours weekly and increased revenue 34%.',
  '# AI will make my business feel impersonal

This is the #1 objection I hear from small business owners.

**Here''s the truth:**

AI doesn''t replace personal relationships. It creates MORE time for them.

## Real Example: Jennifer''s Marketing Agency

**Before AI:** 15 hrs/week on admin = stressed, overwhelmed

**After AI:** 12 hrs saved = 12 MORE hours for client strategy

**Result:** 34% revenue increase (took on 3 new clients)

---

## The Bottom Line

Your customers don''t care HOW you deliver great service. They care THAT you deliver it.

**AI handles the mundane. You handle the relationships.**

That''s the winning formula.

---

## Your Turn

**What administrative task is stealing time from your customers?**

Hit reply and tell me. I personally respond to every email within 24 hours.

---

💡 **Ready to implement AI without losing the human touch?**

Book your free AI strategy session: [dschley@aiopsexpert.com](mailto:dschley@aiopsexpert.com)

Best regards,  
Daniel Schley  
AI Operations Expert',
  'Daniel Schley',
  '2025-01-11T10:00:00Z',
  4,
  ARRAY['AI Strategy', 'Customer Experience', 'Business Growth'],
  true,
  true
),
(
  'The 5 AI Tools Every Small Business Needs in 2025',
  'Stop wasting time on manual tasks. These 5 AI tools will transform your operations and give you back 20+ hours per week.',
  '# The 5 AI Tools Every Small Business Needs in 2025

Stop wasting time on manual tasks. Here are the 5 AI tools that will transform your operations:

## 1. AI Customer Service Chatbot
- **What it does:** Handles 80% of customer inquiries automatically
- **Time saved:** 15+ hours/week
- **ROI:** 300% within 90 days

## 2. AI Content Generator
- **What it does:** Creates blog posts, social media, emails
- **Time saved:** 10+ hours/week
- **ROI:** 250% within 60 days

## 3. AI Scheduling Assistant
- **What it does:** Manages appointments and follow-ups
- **Time saved:** 5+ hours/week
- **ROI:** 200% within 30 days

## 4. AI Financial Forecasting
- **What it does:** Predicts cash flow and identifies trends
- **Time saved:** 8+ hours/week
- **ROI:** 400% within 120 days

## 5. AI Inventory Management
- **What it does:** Optimizes stock levels and prevents shortages
- **Time saved:** 6+ hours/week
- **ROI:** 350% within 90 days

---

**Ready to implement these AI tools in your business?**

Book a free consultation: [dschley@aiopsexpert.com](mailto:dschley@aiopsexpert.com)',
  'Daniel Schley',
  '2025-01-10T14:00:00Z',
  6,
  ARRAY['AI Tools', 'Productivity', 'Small Business'],
  false,
  true
),
(
  'How AI Saved My Client $50K in 6 Months',
  'Real case study: How intelligent automation transformed a manufacturing company''s operations and delivered massive cost savings.',
  '# How AI Saved My Client $50K in 6 Months

**Client:** Mid-size manufacturing company  
**Challenge:** Manual inventory tracking causing overstock and stockouts  
**Solution:** AI-powered inventory optimization system  
**Result:** $50K saved in 6 months

## The Problem

My client was losing money on two fronts:
- **Overstock:** $30K tied up in slow-moving inventory
- **Stockouts:** $25K in lost sales from popular items being out of stock

## The AI Solution

I implemented an intelligent inventory system that:
- Analyzes 3 years of sales data
- Predicts seasonal demand patterns
- Automatically adjusts reorder points
- Sends alerts for unusual trends

## The Results (6 Months Later)

- **$30K recovered** from reduced overstock
- **$20K additional revenue** from preventing stockouts
- **15 hours/week saved** on manual inventory management
- **95% accuracy** in demand forecasting

## The ROI

- **Investment:** $8K for AI system setup
- **Savings:** $50K in 6 months
- **ROI:** 525% return on investment

---

**Want similar results for your business?**

Book your free AI assessment: [dschley@aiopsexpert.com](mailto:dschley@aiopsexpert.com)',
  'Daniel Schley',
  '2025-01-09T16:00:00Z',
  5,
  ARRAY['Case Study', 'ROI', 'Manufacturing', 'Inventory'],
  false,
  true
);