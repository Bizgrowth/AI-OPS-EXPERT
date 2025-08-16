import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log('🔍 Supabase Debug Info:');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);
console.log('Key preview:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'MISSING');

// Check for placeholder values
const hasPlaceholders = !supabaseUrl || 
                       !supabaseAnonKey || 
                       supabaseUrl.includes('your-project') || 
                       supabaseUrl.includes('placeholder') ||
                       supabaseAnonKey.includes('your-anon-key') ||
                       supabaseAnonKey.includes('placeholder');
  console.error('Missing Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('❌ VITE_SUPABASE_URL:', supabaseUrl);
  console.error('❌ VITE_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey);
  console.error('❌ Contains placeholders - please update your .env file with real values');

if (hasPlaceholders) {
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);