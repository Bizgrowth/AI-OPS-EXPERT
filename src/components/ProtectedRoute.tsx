import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      }
      setSession(session);
      setLoading(false);
    }).catch((err) => {
      setError(err.message || 'Failed to connect to authentication service');
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setError(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-xl border border-slate-700 p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login Required
          </h1>
          {error && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#06b6d4',
                    brandAccent: '#0891b2',
                  },
                },
              },
            }}
            providers={[]}
            theme="dark"
            redirectTo={window.location.origin + '/admin'}
          />
          <div className="mt-4 p-4 bg-slate-700 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong>Note:</strong> If you see "Failed to fetch" errors, please ensure:
            </p>
            <ul className="text-gray-400 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Your Supabase project URL is configured correctly</li>
              <li>Your site URL is added in Supabase Authentication settings</li>
              <li>Email confirmation is disabled or your email is confirmed</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
