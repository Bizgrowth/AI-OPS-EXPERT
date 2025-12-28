import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { UserPlus, ArrowLeft } from 'lucide-react';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setMessage({
          type: 'success',
          text: 'Account created successfully! Redirecting to admin panel...'
        });

        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to create account. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            Create Admin Account
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Sign up to access the blog management system
          </p>

          {message && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/50 text-green-400'
                  : 'bg-red-500/10 border border-red-500/50 text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                placeholder="Minimum 6 characters"
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                placeholder="Re-enter password"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/admin')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
