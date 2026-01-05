import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  created_at: string;
}

export default function BillingPortal() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('Please sign in to view billing information');
        setLoading(false);
        return;
      }

      const { data, error: dbError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (dbError) {
        throw dbError;
      }

      setPayments(data || []);
    } catch (err) {
      console.error('Error loading payment history:', err);
      setError(err instanceof Error ? err.message : 'Failed to load payment history');
    } finally {
      setLoading(false);
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
      succeeded: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
      processing: { color: 'bg-blue-100 text-blue-800', icon: <Loader2 className="h-4 w-4 animate-spin" /> },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Loader2 className="h-4 w-4" /> },
      failed: { color: 'bg-red-100 text-red-800', icon: <XCircle className="h-4 w-4" /> },
      canceled: { color: 'bg-gray-100 text-gray-800', icon: <XCircle className="h-4 w-4" /> },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Payments</h1>
        <p className="text-gray-400">View your payment history and manage invoices</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Payment Methods</h2>
          </div>
          <p className="text-gray-300 mb-4">
            All payments are securely processed through Stripe. You can pay for services using:
          </p>
          <ul className="text-gray-300 space-y-2 ml-6 list-disc">
            <li>Credit or debit cards</li>
            <li>ACH bank transfers</li>
            <li>Wire transfers (for invoiced projects)</li>
          </ul>
        </div>

        {payments.length > 0 ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="h-6 w-6 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Payment History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-slate-700 last:border-b-0">
                      <td className="py-3 px-4 text-gray-300">
                        {formatDate(payment.created_at)}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {payment.description || 'Service payment'}
                      </td>
                      <td className="py-3 px-4 text-white font-medium">
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
        ) : (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
            <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Payment History</h3>
            <p className="text-gray-400 mb-6">
              You haven't made any payments yet. Browse our services to get started.
            </p>
            <a
              href="/services"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
            >
              View Services
            </a>
          </div>
        )}

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Custom Invoices</h2>
          </div>
          <p className="text-gray-300 mb-4">
            For custom projects and enterprise engagements, you'll receive detailed invoices via email through Stripe.
            These invoices include:
          </p>
          <ul className="text-gray-300 space-y-2 ml-6 list-disc mb-4">
            <li>Flexible payment terms (Net 30/60/90)</li>
            <li>Milestone-based billing options</li>
            <li>Detailed line-item breakdowns</li>
            <li>Multiple payment methods</li>
          </ul>
          <p className="text-gray-300">
            Invoices will be sent to your registered email address. If you have questions about an invoice,{' '}
            <a href="/#contact" className="text-cyan-400 hover:text-cyan-300">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
