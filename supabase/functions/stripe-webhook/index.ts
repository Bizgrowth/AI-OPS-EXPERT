import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.55.0";
import Stripe from "npm:stripe@17.4.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2024-12-18.acacia",
});

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "No signature found" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(
        JSON.stringify({ error: "Webhook signature verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing event:", event.type);

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      case "customer.created": {
        const customer = event.data.object as Stripe.Customer;
        await handleCustomerCreated(customer);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  const { data: customerData } = await supabaseAdmin
    .from("stripe_customers")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!customerData) {
    console.error("Customer not found:", customerId);
    return;
  }

  const subscriptionData = {
    user_id: customerData.user_id,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: customerId,
    status: subscription.status,
    price_id: subscription.items.data[0]?.price.id || "",
    quantity: subscription.items.data[0]?.quantity || 1,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(subscriptionData, {
      onConflict: "stripe_subscription_id",
    });

  if (error) {
    console.error("Error upserting subscription:", error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error("Error updating deleted subscription:", error);
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const customerId = paymentIntent.customer as string;
  
  const { data: customerData } = await supabaseAdmin
    .from("stripe_customers")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!customerData) {
    console.error("Customer not found:", customerId);
    return;
  }

  const paymentData = {
    user_id: customerData.user_id,
    stripe_payment_intent_id: paymentIntent.id,
    stripe_customer_id: customerId,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: "succeeded",
    description: paymentIntent.description || "",
  };

  const { error } = await supabaseAdmin
    .from("payments")
    .upsert(paymentData, {
      onConflict: "stripe_payment_intent_id",
    });

  if (error) {
    console.error("Error upserting payment:", error);
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const customerId = paymentIntent.customer as string;
  
  const { data: customerData } = await supabaseAdmin
    .from("stripe_customers")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!customerData) {
    console.error("Customer not found:", customerId);
    return;
  }

  const paymentData = {
    user_id: customerData.user_id,
    stripe_payment_intent_id: paymentIntent.id,
    stripe_customer_id: customerId,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: "failed",
    description: paymentIntent.description || "",
  };

  const { error } = await supabaseAdmin
    .from("payments")
    .upsert(paymentData, {
      onConflict: "stripe_payment_intent_id",
    });

  if (error) {
    console.error("Error upserting failed payment:", error);
  }
}

async function handleCustomerCreated(customer: Stripe.Customer) {
  const userId = customer.metadata?.user_id;
  if (!userId) {
    console.log("No user_id in customer metadata");
    return;
  }

  const customerData = {
    user_id: userId,
    stripe_customer_id: customer.id,
    email: customer.email || "",
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("stripe_customers")
    .upsert(customerData, {
      onConflict: "stripe_customer_id",
    });

  if (error) {
    console.error("Error upserting customer:", error);
  }
}