import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';
import Login from './Login';
import EnhancedDashboard from './EnhancedDashboard';
import TutorialSystem from './TutorialSystem';

const CustomerPortal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseError, setSupabaseError] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
      setSupabaseError(true);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Supabase connection error:', error);
        setSupabaseError(true);
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

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisited = localStorage.getItem('portal-visited');
    if (!hasVisited && user) {
      setIsFirstVisit(true);
      setShowTutorial(true);
      localStorage.setItem('portal-visited', 'true');
    }
  }, [user]);

  const handleLogin = () => {
    // The auth state change listener will handle setting the user
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleTutorialComplete = (tutorialId: string) => {
    console.log(`Tutorial ${tutorialId} completed`);
    setShowTutorial(false);
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
    
    return (
      <>
        <EnhancedDashboard user={demoUser} onLogout={handleLogout} isDemo={true} />
        <TutorialSystem 
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          activeTutorial={isFirstVisit ? 'welcome' : undefined}
          onComplete={handleTutorialComplete}
        />
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If Supabase is not configured, show login with demo mode prominent
  if (supabaseError && !user) {
    return <Login onLogin={handleLogin} />;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <EnhancedDashboard user={user} onLogout={handleLogout} />
      <TutorialSystem 
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        activeTutorial={isFirstVisit ? 'welcome' : undefined}
        onComplete={handleTutorialComplete}
      />
    </>
  );
};

export default CustomerPortal;