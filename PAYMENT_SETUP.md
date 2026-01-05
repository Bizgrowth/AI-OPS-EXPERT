# Payment System Setup Guide

Your payment system has been restructured to use **fixed-price Stripe Payment Links** for services and **Stripe Invoicing** for custom projects. This guide will help you complete the setup.

## Overview

The new payment system includes:

1. **Fixed-Price Services** - Three service tiers:
   - Discovery Call (FREE - books directly via scheduling modal)
   - AI Audit ($99 - one-time payment via Stripe Payment Link)
   - Monthly Retainer (Contact for Pricing - opens quote request form)

2. **Custom Quote Request Form** - For larger projects requiring custom pricing

3. **Stripe Invoicing Documentation** - For enterprise and custom projects

4. **Payment History** - Tracks one-time payments (no subscriptions)

## Setup Steps

### 1. Create Stripe Payment Link

You only need to create ONE Payment Link in your Stripe Dashboard for the AI Audit service:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Products** → **Payment Links**
3. Click **New** to create a payment link

#### AI Audit Payment Link
- **Product Name**: Comprehensive AI Audit
- **Price**: $99 USD (one-time)
- **Description**: Complete AI infrastructure analysis with detailed report
- After creation, copy the Payment Link URL

**Note:**
- The Discovery Call is FREE and uses the existing scheduling system (no payment required)
- The Monthly Retainer and other services use the custom quote request form (no fixed pricing)

### 2. Update Payment Link in Code

Open `/src/pages/ServicesPaymentPage.tsx` and update the `stripePriceId` value for the AI Audit:

Find this line:
```typescript
stripePriceId: 'YOUR_STRIPE_PAYMENT_LINK_FOR_AUDIT',
```

Replace `YOUR_STRIPE_PAYMENT_LINK_FOR_AUDIT` with your actual Stripe Payment Link URL from step 1.

**Example:**
```typescript
stripePriceId: 'https://buy.stripe.com/test_xxxxxxxxxxxxxxx',
```

### 3. Configure Stripe Webhooks (Optional)

If you want to track payments in your database, configure a webhook:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Set endpoint URL: `https://YOUR_SUPABASE_PROJECT.supabase.co/functions/v1/stripe-webhook`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and add to your Supabase secrets

### 4. Set Up Stripe Invoicing

For custom projects, you'll use Stripe's built-in invoicing:

1. Go to **Invoices** in Stripe Dashboard
2. Click **Create invoice**
3. Add customer details, line items, and payment terms
4. Send invoice directly from Stripe

**Best Practices:**
- Use Net 30/60/90 terms for enterprise clients
- Add milestone-based line items for phased projects
- Include detailed descriptions for each line item
- Enable multiple payment methods

### 5. Test the Payment Flow

1. Visit `/services` on your website
2. Click on a service payment button
3. Verify it redirects to the correct Stripe Payment Link
4. Complete a test transaction (use Stripe test mode)
5. Check that payment appears in the billing portal

### 6. Custom Quote Requests

The custom quote form:
- Sends email notifications via Resend (already configured)
- Stores requests in `quote_requests` table
- Accessible to admins via admin panel

To view quote requests:
1. Log in to admin panel at `/admin`
2. Navigate to quote requests section
3. Review, respond, and create Stripe invoices as needed

## Database Structure

The following tables support the payment system:

- **payments** - Tracks one-time service payments
- **quote_requests** - Stores custom project inquiries
- **stripe_customers** - Links Stripe customers to users

## Features Removed

- Subscription plans and recurring billing
- Subscription management in billing portal
- Subscription checkout flow
- Subscription-related edge functions

## Features Added

- Fixed-price service payment buttons
- Stripe Payment Links integration
- Custom quote request form with email notifications
- Quote requests database storage
- Stripe Invoicing documentation
- Simplified billing portal for payment history

## Support

If you encounter issues:
1. Check Stripe Dashboard for payment status
2. Review Supabase function logs for edge function errors
3. Verify Payment Link URLs are correctly configured
4. Ensure webhook secrets are properly set (if using webhooks)

## Next Steps

1. ✅ Create Stripe Payment Link for AI Audit ($99)
2. ✅ Update `stripePriceId` value in the code
3. ✅ Test payment flow in Stripe test mode
4. ✅ Configure webhooks (optional)
5. ✅ Set up Stripe Invoicing for custom projects
6. ✅ Test the free Discovery Call booking
7. ✅ Test the custom quote request form
8. ✅ Deploy to production
9. ✅ Test with real payments

---

**Note:** All email notifications for quote requests use the Resend integration that's already configured in your project.
