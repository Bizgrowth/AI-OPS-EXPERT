import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Settings } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setError('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLogin();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Simulate admin login for demo purposes
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-600 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Client Portal</h1>
            <p className="text-white/90">Access your AI project dashboard</p>
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={() => setShowDemo(false)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  !showDemo ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <User className="w-3 h-3 inline mr-1" />
                Client Login
              </button>
              <button
                onClick={() => setShowDemo(true)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  showDemo ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <Settings className="w-3 h-3 inline mr-1" />
                Demo Mode
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {showDemo ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="text-green-400 font-semibold mb-2">Demo Mode - Owner Access</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    This will show you the client portal interface with sample data. Perfect for seeing how your clients will experience the portal.
                  </p>
                  <button
                    onClick={handleDemoLogin}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Enter Demo Portal</span>
                  </button>
                </div>
                
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">What you'll see in Demo Mode:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Sample client projects with different statuses</li>
                    <li>• Mock documents (MVPs, PRDs, Project Plans)</li>
                    <li>• Live chat interface demonstration</li>
                    <li>• Full portal navigation and features</li>
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            )}

            {!showDemo && (
              <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm space-y-2">
          <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">🚀 Setup Instructions for Owner:</h4>
            <div className="text-left space-y-2 text-xs">
              <p><strong>1. Supabase Setup:</strong> Create account at supabase.com</p>
              <p><strong>2. Environment:</strong> Add SUPABASE_URL and SUPABASE_ANON_KEY to .env</p>
              <p><strong>3. Database:</strong> Run the migration file to create tables</p>
              <p><strong>4. Admin Access:</strong> Sign up with your email to become admin</p>
            </div>
          </div>
          <p>Need help? Contact Daniel at dschley@aiopsexpert.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;