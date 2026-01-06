import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { UserPlus, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function ClientRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    industry: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company_name: formData.companyName,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('clients_profile')
          .insert({
            user_id: authData.user.id,
            full_name: formData.fullName,
            company_name: formData.companyName,
            phone: formData.phone || null,
            industry: formData.industry || null,
            onboarded_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        const { error: prefsError } = await supabase
          .from('notification_preferences')
          .insert({
            user_id: authData.user.id,
          });

        if (prefsError) {
          console.error('Notification preferences error:', prefsError);
        }

        setSuccess(true);
        setTimeout(() => {
          navigate('/client-login');
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 bg-slate-800/50 border-slate-700 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-gray-300 mb-4">
            Your client account has been successfully created. You can now sign in to access your portal.
          </p>
          <p className="text-gray-400 text-sm">
            Redirecting to login page...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-gray-400">Register to access your client portal</p>
        </div>

        <Card className="p-8 bg-slate-800/50 border-slate-700">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                placeholder="john@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-gray-300">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                placeholder="Your Company"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-gray-300">
                  Industry
                </Label>
                <Input
                  id="industry"
                  name="industry"
                  type="text"
                  value={formData.industry}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  placeholder="Technology"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password <span className="text-red-400">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                placeholder="Minimum 8 characters"
              />
              <p className="text-xs text-gray-400">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password <span className="text-red-400">*</span>
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                placeholder="Re-enter password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link
              to="/client-login"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
