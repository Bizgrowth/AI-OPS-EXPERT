# Admin Panel Setup Guide

## 🚀 Quick Start

Your admin panel has THREE main sections:
1. **Contact Submissions** - View contact form submissions
2. **Blog Posts** - Create and manage blog posts
3. **Chatbot Knowledge** - Manage ARIA chatbot responses

---

## 📍 Admin Panel Locations

| Purpose | URL |
|---------|-----|
| **Create Admin Account** (first time only) | https://aiopsexpert.com/admin-signup |
| **Log In to Admin Panel** | https://aiopsexpert.com/admin |

---

## 🎯 First Time Setup

### Step 1: Create Your Admin Account

1. Go to: **https://aiopsexpert.com/admin-signup**
2. Fill in:
   - Email address
   - Password (minimum 6 characters)
   - Confirm password
3. Click **"Create Account"**
4. You'll be automatically redirected to the admin panel

**Important:** Only do this once! After creating your account, use the login page.

---

## 🔐 How to Log In (Every Time)

1. Go to: **https://aiopsexpert.com/admin**
2. Enter your email and password
3. Click **"Sign in"**
4. You'll see the admin dashboard with three tabs

---

## 📝 Admin Panel Features

### 1. Contact Submissions Tab

**What it does:** View and manage contact form submissions from your website

**Features:**
- See all contact form submissions
- Update status (New → Reviewing → Responded → Archived)
- View full message details
- Track which submissions need attention

**How to use:**
1. Click **"Contact Submissions"** tab
2. Click on any submission to view details
3. Use status buttons to update tracking

---

### 2. Blog Posts Tab

**What it does:** Create, edit, and publish blog posts

**Features:**
- Create new blog posts with Markdown formatting
- Live preview before publishing
- Edit existing posts
- Publish/unpublish toggle
- Mark posts as "featured"
- Add tags and categories
- Set publish date and author

**How to use:**
1. Click **"Blog Posts"** tab
2. Click **"+ New Post"** button
3. Fill in all fields (see BLOG_POSTING_GUIDE.md for details)
4. Click **"Preview"** to check formatting
5. Check **"Published"** box to make live
6. Click **"Save"**

**Need detailed blog posting instructions?** See `BLOG_POSTING_GUIDE.md`

---

### 3. Chatbot Knowledge Tab

**What it does:** Manage ARIA chatbot's knowledge base

**Features:**
- Add new knowledge items
- Edit existing responses
- Organize by category
- Add keywords for better matching
- Set priority levels
- Activate/deactivate items

**How to use:**
1. Click **"Chatbot Knowledge"** tab
2. Click **"+ Add New"** to create knowledge item
3. Fill in:
   - Category (e.g., Pricing, Services)
   - Topic
   - Content (what ARIA will say)
   - Keywords (for search matching)
   - Priority (higher = shown first)
4. Click **"Save"**

**Categories available:**
- Business Background
- AI Solutions
- Pricing
- Client Success
- Technical Expertise
- Consultation Process

---

## 🆘 Troubleshooting

### Can't Access Admin Panel?

**Problem:** "Failed to fetch" or connection errors

**Solutions:**

1. **Check Supabase Configuration:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Navigate to **Authentication** → **URL Configuration**
   - Ensure **Site URL** is set to: `https://aiopsexpert.com`
   - Add redirect URLs:
     - `https://aiopsexpert.com/admin`
     - `https://aiopsexpert.com/**`
   - Click **Save**

2. **Disable Email Confirmation (if needed):**
   - In Supabase Dashboard → **Authentication** → **Providers** → **Email**
   - Toggle **"Confirm email"** to OFF
   - Click **Save**

3. **Clear Browser Cache:**
   - Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Clear cookies and cached files
   - Try logging in again

4. **Try Incognito/Private Mode:**
   - Open a private browsing window
   - Go to admin panel
   - Try logging in

### Can't Log In?

1. Double-check your email and password
2. Make sure email confirmation is disabled (see above)
3. Try resetting your password
4. Create a new admin account if needed

### Blog Post Not Showing?

**Check:**
1. Is **"Published"** checkbox checked?
2. Is publish date in the past (not future)?
3. Did you click **"Save"**?
4. Refresh your website (Ctrl+R)

### Changes Not Saving?

1. Check your internet connection
2. Look for error messages
3. Try logging out and back in
4. Clear browser cache

---

## 🔒 Security Best Practices

1. **Strong Password:** Use at least 12 characters with numbers and symbols
2. **Don't Share:** Keep your admin credentials private
3. **Log Out:** Always log out when done, especially on shared computers
4. **Regular Updates:** Keep your knowledge base current
5. **Review Submissions:** Check contact submissions regularly

---

## 📊 Recommended Workflow

### Daily
- Check new contact submissions
- Respond to urgent inquiries

### Weekly
- Review chatbot conversations (if analytics enabled)
- Update chatbot knowledge if needed

### Bi-Weekly
- Post new blog content
- Review published posts for updates

### Monthly
- Archive old contact submissions
- Update outdated chatbot responses
- Review blog post performance

---

## 🎓 Additional Resources

### Detailed Guides
- **Blog Posting:** See `BLOG_POSTING_GUIDE.md` for complete blog instructions
- **General Help:** See `TROUBLESHOOTING.md` for technical issues

### Support Links
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)

---

## ⚡ Quick Reference

```
Admin Signup:  https://aiopsexpert.com/admin-signup (first time only)
Admin Login:   https://aiopsexpert.com/admin
Your Website:  https://aiopsexpert.com
```

**Bookmark the admin login page for quick access!**

---

Last Updated: December 28, 2024
