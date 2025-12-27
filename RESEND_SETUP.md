# Resend API Configuration Guide

## Current Status
✅ Edge function `send-contact-email` is deployed and ACTIVE
✅ Environment example file updated with Resend API key documentation

## Setting the Resend API Secret in Supabase

The Resend API key needs to be configured as a secret in your Supabase project. Here are two methods:

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `bfeiramyzcmtoyyqqcqq`
3. Navigate to **Settings** → **Edge Functions** → **Secrets**
4. Add a new secret:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_UAtPebKR_9H1JPKgza1DCkkyshCpE5YP6`
5. Click **Save**

### Method 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Link your project (if not already linked)
supabase link --project-ref bfeiramyzcmtoyyqqcqq

# Set the secret
supabase secrets set RESEND_API_KEY=re_UAtPebKR_9H1JPKgza1DCkkyshCpE5YP6
```

## Testing the Contact Form

After setting the secret:

1. Visit your website
2. Navigate to the Contact section
3. Fill out the contact form with test data:
   - First Name: Test
   - Last Name: User
   - Email: your-email@example.com
   - Message: Testing contact form email integration
4. Submit the form
5. Check your email at `dschley@aiopsexpert.com` for the notification

## Verifying the Setup

Check the edge function logs in Supabase Dashboard:
1. Go to **Edge Functions** → **send-contact-email**
2. Click on **Logs** tab
3. Look for messages like:
   - "Processing contact form submission"
   - "RESEND_API_KEY exists: true"
   - "Sending email to Resend API..."
   - "Resend API response status: 200"

## Troubleshooting

### Email not sending
- Verify the secret is set correctly in Supabase Dashboard
- Check edge function logs for error messages
- Ensure your Resend API key is valid at https://resend.com/api-keys

### Database saving but no email
- This is expected behavior - the form saves to database first, then tries to send email
- Email failures are non-blocking, so form submissions always save
- Check edge function logs to see the specific error

### CORS errors
- The edge function already has proper CORS headers configured
- Ensure you're using the correct Supabase URL in your frontend

## API Endpoint

The contact form calls:
```
POST https://bfeiramyzcmtoyyqqcqq.supabase.co/functions/v1/send-contact-email
```

With Authorization header:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Email Details

**From**: onboarding@resend.dev
**To**: dschley@aiopsexpert.com
**Subject**: New Contact Form: [First Name] [Last Name]

## Next Steps

1. Set the `RESEND_API_KEY` secret in Supabase (see Method 1 above)
2. Test the contact form
3. Verify you receive the email notification
4. Check logs if any issues occur

---

Need help? Check the Resend documentation: https://resend.com/docs
