import { useState, useEffect } from 'react';
import { CreditCard, Calendar, DollarSign, ExternalLink, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Subscription {
  id: string;
  status: string;
  price_id: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  created_at: string;
}

interface SubscriptionData {
  subscription: Subscription | null;
  allSubscriptions: Subscription[];
  recentPayments: Payment[];
  hasActiveSubscription: boolean;
}

export default function BillingPortal() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('Please sign in to view billing information');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-subscription-status`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load subscription data');
      }

      const data = await response.json();
      setSubscriptionData(data);
    } catch (err) {
      console.error('Error loading subscription data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const openBillingPortal = async () => {
    setPortalLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Please sign in');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-portal-session`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            returnUrl: window.location.href,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to open billing portal');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Error opening billing portal:', err);
      setError(err instanceof Error ? err.message : 'Failed to open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: JSX.Element }> = {
      active: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
      trialing: { color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="h-4 w-4" /> },
      past_due: { color: 'bg-yellow-100 text-yellow-800', icon: <XCircle className="h-4 w-4" /> },
      canceled: { color: 'bg-red-100 text-red-800', icon: <XCircle className="h-4 w-4" /> },
      incomplete: { color: 'bg-gray-100 text-gray-800', icon: <XCircle className="h-4 w-4" /> },
      succeeded: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
      failed: { color: 'bg-red-100 text-red-800', icon: <XCircle className="h-4 w-4" /> },
    };

    const config = statusConfig[status] || statusConfig.incomplete;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and payment methods</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      {subscriptionData?.hasActiveSubscription ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Current Subscription</h2>
              </div>
              <button
                onClick={openBillingPortal}
                disabled={portalLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {portalLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Manage Subscription
                    <ExternalLink className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {subscriptionData.subscription && (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Status</span>
                  {getStatusBadge(subscriptionData.subscription.status)}
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Billing Period</span>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="h-4 w-4" />
                    Until {formatDate(subscriptionData.subscription.current_period_end)}
                  </div>
                </div>

                {subscriptionData.subscription.cancel_at_period_end && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      Your subscription will be canceled at the end of the current billing period.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {subscriptionData.recentPayments && subscriptionData.recentPayments.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Description</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionData.recentPayments.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-b-0">
                        <td className="py-3 px-4 text-gray-900">
                          {formatDate(payment.created_at)}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {payment.description || 'Subscription payment'}
                        </td>
                        <td className="py-3 px-4 text-gray-900 font-medium">
                          {formatCurrency(payment.amount, payment.currency)}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(payment.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscription</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to one of our plans to access premium features
          </p>
          <a
            href="/portal"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Plans
          </a>
        </div>
      )}
    </div>
  );
}
