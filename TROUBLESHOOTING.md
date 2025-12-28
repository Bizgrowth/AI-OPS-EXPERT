# Contact Form Troubleshooting Guide

## Issue: "Error sending message" appears when submitting contact form

## Quick Diagnosis Steps

### Step 1: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Submit the contact form
4. Look for error messages - particularly:
   - "Database error:" followed by details
   - "Email notification failed (non-blocking):" (this is expected if Resend isn't configured yet)
   - "Form submission error:" followed by details

### Step 2: Check Network Tab
1. Open Developer Tools (F12)
2. Go to the Network tab
3. Submit the contact form
4. Look for these requests:
   - POST to Supabase (should be 201 or 200)
   - POST to `/functions/v1/send-contact-email` (may fail if Resend not configured)

### Step 3: Verify Database Connection
Check that submissions are being saved:
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;
```

## Common Issues & Solutions

### Issue 1: Database RLS Policy Error
**Symptoms**: Error mentions "permission denied" or "RLS"

**Solution**: The RLS policy should allow anonymous inserts. Verify with:
```sql
SELECT * FROM pg_policies WHERE tablename = 'contact_submissions';
```

Should show a policy allowing INSERT for anon role.

### Issue 2: Missing Environment Variables
**Symptoms**: Console shows undefined values or blank URLs

**Solution**: Verify your `.env` file has:
```
VITE_SUPABASE_URL=https://bfeiramyzcmtoyyqqcqq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

After updating `.env`, restart your dev server.

### Issue 3: Resend API Not Configured
**Symptoms**: Form submits but no email received

**Solution**:
1. Go to Supabase Dashboard → Settings → Edge Functions → Secrets
2. Add: `RESEND_API_KEY` = `re_UAtPebKR_9H1JPKgza1DCkkyshCpE5YP6`
3. Test the form again

**Note**: The form is designed to save to database even if email fails, so you shouldn't see an error just from Resend not being configured.

### Issue 4: CORS Error
**Symptoms**: Console shows CORS-related errors

**Solution**: The edge function already has proper CORS headers. If you see CORS errors:
1. Verify you're accessing the site through the correct domain (not file://)
2. Check that the Supabase URL is correct
3. Clear browser cache and try again

## Testing the Contact Form

### Manual Test
1. Fill out the form with test data:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Message: Testing the contact form
2. Submit
3. Check browser console for errors
4. Check database for new entry
5. Check email (if Resend is configured)

### Database Test
Run this SQL to verify the table is working:
```sql
INSERT INTO contact_submissions (first_name, last_name, email, message)
VALUES ('Database', 'Test', 'dbtest@example.com', 'Direct database test')
RETURNING id, created_at;
```

If this works, the database is fine.

### Edge Function Test
Test the edge function directly:
```bash
curl -X POST \
  https://bfeiramyzcmtoyyqqcqq.supabase.co/functions/v1/send-contact-email \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "message": "Testing edge function"
  }'
```

Expected responses:
- If Resend configured: `{"success": true, "data": {...}}`
- If Resend not configured: `{"error": "Email service not configured"}`

## Next Steps After Fixing

1. **Set Resend API Key** (if not done):
   - Dashboard → Settings → Edge Functions → Secrets
   - Name: `RESEND_API_KEY`
   - Value: `re_UAtPebKR_9H1JPKgza1DCkkyshCpE5YP6`

2. **Test the complete flow**:
   - Submit a real contact form entry
   - Verify it saves to database
   - Verify email is received at dschley@aiopsexpert.com

3. **Check Edge Function Logs**:
   - Dashboard → Edge Functions → send-contact-email → Logs
   - Look for successful email sends or errors

## Still Having Issues?

If the form still shows errors after checking the above:

1. Share the exact error from the browser console
2. Check if the entry was saved to the database despite the error
3. Verify the edge function logs in Supabase Dashboard
4. Ensure your dev server was restarted after updating `.env`

## Emergency Fallback

If you need to receive contact form submissions immediately while troubleshooting:

1. The database is saving submissions even if emails fail
2. You can query them directly:
   ```sql
   SELECT
     first_name,
     last_name,
     email,
     company,
     service,
     message,
     created_at
   FROM contact_submissions
   ORDER BY created_at DESC;
   ```
3. Or build a simple admin view to see submissions
