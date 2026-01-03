# Stripe Payment Integration Setup Guide

This guide will walk you through setting up Stripe payments for your application, including subscriptions, checkout flows, and billing portal.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating Products and Prices](#creating-products-and-prices)
3. [Webhook Configuration](#webhook-configuration)
4. [Testing Payments](#testing-payments)
5. [Going Live](#going-live)

## Prerequisites

Your Stripe API keys are already configured in your `.env` file:
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key

## Creating Products and Prices

You need to create products and prices in Stripe that match the plans in your application.

### Step 1: Create Products

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/test/products)
2. Click "Add product"
3. Create three products:

**Basic Plan:**
- Name: Basic
- Description: AI Strategy Consultation with Basic Features
- Pricing: $29.00 / month
- Click "Save product"
- Copy the Price ID (starts with `price_`)

**Professional Plan:**
- Name: Professional
- Description: Advanced AI Tools with Priority Support
- Pricing: $99.00 / month
- Click "Save product"
- Copy the Price ID (starts with `price_`)

**Enterprise Plan:**
- Name: Enterprise
- Description: Full AI Suite with Dedicated Support
- Pricing: $299.00 / month
- Click "Save product"
- Copy the Price ID (starts with `price_`)

### Step 2: Update Price IDs

Update the price IDs in `/src/components/SubscriptionPlans.tsx`:

```typescript
const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    interval: 'month',
    stripePriceId: 'price_YOUR_BASIC_PRICE_ID', // Replace this
    features: [...]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 99,
    interval: 'month',
    stripePriceId: 'price_YOUR_PRO_PRICE_ID', // Replace this
    features: [...]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    stripePriceId: 'price_YOUR_ENTERPRISE_PRICE_ID', // Replace this
    features: [...]
  },
];
```

## Webhook Configuration

Webhooks are essential for keeping your database in sync with Stripe events.

### Step 1: Get Webhook URL

Your webhook endpoint URL is:
```
https://YOUR_SUPABASE_PROJECT_URL/functions/v1/stripe-webhook
```

Replace `YOUR_SUPABASE_PROJECT_URL` with your actual Supabase project URL from the `.env` file.

### Step 2: Configure Webhook in Stripe

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL
4. Select events to listen to:
   - `customer.created`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"

### Step 3: Get Webhook Secret

1. After creating the endpoint, click on it
2. Copy the "Signing secret" (starts with `whsec_`)
3. Add it to your `.env` file:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

**Important:** You must redeploy your edge function after updating the webhook secret:
```bash
# This will be handled automatically by the deployment system
```

## Testing Payments

### Test Mode

You're currently in test mode. Use these test card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Payment Requires Authentication (3D Secure):**
- Card: `4000 0025 0000 3155`

**Payment Declined:**
- Card: `4000 0000 0000 9995`

### Testing the Flow

1. Navigate to the Customer Portal at `/portal`
2. Sign in or sign up
3. Click on "Subscription" in the sidebar
4. Select a plan and click "Get Started"
5. You'll be redirected to Stripe Checkout
6. Use a test card to complete the payment
7. You'll be redirected back to the portal
8. Check the "Billing" section to see your subscription

### Verifying Webhooks

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click on your webhook endpoint
3. Check the "Recent deliveries" section
4. Verify that events are being delivered successfully (status 200)

### Checking Database

After a successful subscription:

1. Go to Supabase Dashboard → Table Editor
2. Check these tables:
   - `stripe_customers` - Should have your customer record
   - `subscriptions` - Should have your active subscription
   - `payments` - Should have your payment record

## Going Live

When you're ready to accept real payments:

### Step 1: Switch to Production Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle from "Test mode" to "Live mode" (top right)
3. Go to [Developers → API keys](https://dashboard.stripe.com/apikeys)
4. Copy your live keys
5. Update your production environment variables:
   ```
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
   ```

### Step 2: Create Live Products

Repeat the product creation steps in live mode with your actual pricing.

### Step 3: Configure Live Webhook

1. Create a new webhook endpoint in live mode
2. Use your production webhook URL
3. Copy the live webhook secret
4. Update your production environment:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
   ```

### Step 4: Enable Customer Portal

1. Go to [Stripe Dashboard → Settings → Billing](https://dashboard.stripe.com/settings/billing/portal)
2. Activate the customer portal
3. Configure the features you want to enable:
   - Cancel subscriptions
   - Update payment methods
   - View invoices
   - Update billing information

## Features Implemented

### Subscription Management
- Users can subscribe to plans via Stripe Checkout
- Automatic customer creation in Stripe
- Subscription status synced with your database
- Cancel at period end support

### Billing Portal
- View current subscription status
- View payment history
- Manage subscription via Stripe Customer Portal
- Update payment methods
- View and download invoices
- Cancel subscriptions

### Security
- Row Level Security (RLS) enabled on all payment tables
- Users can only view their own payment data
- Webhook signature verification
- Service role used for webhook updates

## Troubleshooting

### Webhook Not Receiving Events

1. Check the webhook URL is correct
2. Verify the webhook secret is properly configured
3. Check the webhook logs in Stripe Dashboard
4. Ensure the edge function is deployed

### Subscription Not Showing in Database

1. Check webhook delivery in Stripe Dashboard
2. Verify the customer was created in `stripe_customers` table
3. Check edge function logs in Supabase Dashboard

### Checkout Not Working

1. Verify price IDs are correct in `SubscriptionPlans.tsx`
2. Check that products exist in Stripe
3. Ensure user is authenticated
4. Check browser console for errors

## Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)

For integration issues:
- Check Supabase Edge Function logs
- Review browser console errors
- Verify environment variables are set correctly
