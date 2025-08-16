# 🚀 Complete Supabase Setup Guide for Client Portal

## Step 1: Create Supabase Account & Project

1. **Go to Supabase:** https://supabase.com
2. **Sign up** with your email (use dschley@aiopsexpert.com)
3. **Create New Project:**
   - Project Name: `AI Ops Expert Portal`
   - Database Password: (choose a strong password)
   - Region: Choose closest to your location
   - Wait for project to be created (2-3 minutes)

## Step 2: Get Your Environment Variables

1. **In your Supabase dashboard**, go to **Settings** → **API**
2. **Copy these values:**
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. **Create `.env` file** in your project root (if it doesn't exist)
2. **Add these lines:**
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
3. **Replace** with your actual values from Step 2

## Step 4: Run Database Migration

1. **In Supabase dashboard**, go to **SQL Editor**
2. **Click "New Query"**
3. **Copy and paste** the entire contents of `supabase/migrations/create_portal_tables.sql`
4. **Click "Run"** - you should see "Success. No rows returned"

## Step 5: Verify Database Setup

1. **Go to Table Editor** in Supabase dashboard
2. **You should see 3 new tables:**
   - `client_projects`
   - `client_documents` 
   - `project_chat_messages`

## Step 6: Create Your Admin Account

1. **Go to:** https://aiopsexpert.com/portal
2. **Click "Client Login" tab**
3. **Click "Don't have an account? Sign up"**
4. **Sign up with:** dschley@aiopsexpert.com
5. **Check your email** for confirmation link
6. **Click confirmation link**
7. **Sign in** - you now have admin access!

## Step 7: Test Admin Features

As an authenticated admin, you can:
- **View all client projects** across all clients
- **Upload documents** for any client
- **Respond to chat messages** from any client
- **Create new projects** and assign them to clients

## Step 8: Add Your First Client

1. **Have your client go to:** https://aiopsexpert.com/portal
2. **They sign up** with their email
3. **You can now:**
   - Create projects for them
   - Share documents with them
   - Chat with them in real-time

## 🔒 Security Features

- **Row Level Security (RLS)** ensures clients only see their own data
- **Admin access** (authenticated users) can see all data
- **Real-time subscriptions** for instant chat updates
- **Secure file uploads** to Supabase Storage

## 🎯 Admin Capabilities

- **Project Management:** Create, update, and track client projects
- **Document Sharing:** Upload MVPs, PRDs, project plans, business docs
- **Real-time Chat:** Communicate directly with clients
- **Progress Tracking:** Update project status and completion percentages

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify environment variables are correct
3. Ensure database migration ran successfully
4. Contact support if needed

Your client portal is now ready for production use! 🎉