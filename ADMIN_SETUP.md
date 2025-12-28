# Admin Panel Setup Guide

## Quick Start

Your admin panel is located at: `/admin`

### First Time Setup

1. **Create Admin Account**: Visit `/admin-signup` to create your admin account
2. **Sign In**: After signup, go to `/admin` to access the panel

## Fixing "Failed to Fetch" Errors

If you're seeing "Failed to fetch" errors when trying to sign in, follow these steps:

### 1. Configure Supabase Site URL

The most common cause is that your production URL isn't configured in Supabase:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**
4. Add your site URL to **Site URL**: `https://aiopsexpert.com`
5. Add your redirect URLs:
   - `https://aiopsexpert.com/admin`
   - `https://aiopsexpert.com/**`
6. Click **Save**

### 2. Verify Environment Variables

Make sure your production deployment has these environment variables set:

```
VITE_SUPABASE_URL=https://bfeiramyzcmtoyyqqcqq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Check Email Confirmation Settings

If email confirmation is enabled and causing issues:

1. Go to **Authentication** → **Providers** → **Email**
2. Toggle **Confirm email** to OFF (or confirm your email via the link sent)
3. Click **Save**

## Features

### Contact Submissions Management

- View all contact form submissions
- Update submission status (New, Reviewing, Responded, Archived)
- View full details of each submission
- Real-time badge showing new submissions

### Blog Post Management

- Create new blog posts with markdown support
- Edit existing posts
- Live preview before publishing
- Tag management
- Publish/unpublish toggle
- Featured post designation
- Full control over author, date, and read time

## Security

- Admin panel is protected by authentication
- Only authenticated users can access admin features
- Row Level Security (RLS) policies protect your data
- Contact submissions and blog posts are secured

## Troubleshooting

### Can't Sign In

1. Verify your email is confirmed in Supabase (check `auth.users` table)
2. Check that Site URL is configured correctly
3. Clear browser cache and cookies
4. Try incognito/private browsing mode

### Environment Variables Not Working

1. Restart your dev server after changing `.env`
2. For production, redeploy after updating environment variables
3. Verify variable names start with `VITE_`

### CORS Errors

If you see CORS errors in the console:
1. Add your domain to Supabase allowed URLs
2. Check that your Supabase project is active
3. Verify your API keys are correct

## Support

If you continue to have issues, check:
- Supabase project status
- Browser console for specific error messages
- Network tab in developer tools for failed requests
