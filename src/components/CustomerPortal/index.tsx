import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';
import Login from './Login';
import Dashboard from './Dashboard';

const CustomerPortal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    // The auth state change listener will handle setting the user
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  // Check if we're in demo mode (no real user but want to show interface)
  const isDemoMode = window.location.search.includes('demo=true');
  
  if (isDemoMode && !user) {
    // Create a mock user for demo purposes
    const demoUser = {
      id: 'demo-user',
      email: 'demo@aiopsexpert.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated'
    } as User;
    
    return <Dashboard user={demoUser} onLogout={handleLogout} isDemo={true} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default CustomerPortal;