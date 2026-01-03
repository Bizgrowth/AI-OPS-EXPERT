import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  stripePriceId: string;
  features: string[];
  popular?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    interval: 'month',
    stripePriceId: 'price_basic_monthly',
    features: [
      'AI Strategy Consultation',
      'Basic Document Management',
      'Email Support',
      '5GB Storage',
      'Up to 10 Projects',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 99,
    interval: 'month',
    stripePriceId: 'price_pro_monthly',
    features: [
      'Everything in Basic',
      'Advanced AI Tools',
      'Priority Support',
      '50GB Storage',
      'Unlimited Projects',
      'Custom Integrations',
      'Team Collaboration',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    stripePriceId: 'price_enterprise_monthly',
    features: [
      'Everything in Professional',
      'Dedicated Account Manager',
      '24/7 Premium Support',
      'Unlimited Storage',
      'Custom AI Models',
      'SLA Guarantees',
      'Advanced Analytics',
      'On-premise Deployment',
    ],
  },
];

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = '/portal';
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId,
            successUrl: `${window.location.origin}/portal?success=true`,
            cancelUrl: `${window.location.origin}/portal?canceled=true`,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">
            Select the perfect plan for your AI transformation journey
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/{plan.interval}</span>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.stripePriceId)}
                  disabled={loading !== null}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {loading === plan.stripePriceId ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Processing...
                    </>
                  ) : (
                    'Get Started'
                  )}
                </button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>All plans include a 14-day money-back guarantee</p>
          <p className="mt-2">Need a custom plan? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact us</a></p>
        </div>
      </div>
    </div>
  );
}
