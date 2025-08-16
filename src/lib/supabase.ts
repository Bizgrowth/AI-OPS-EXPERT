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
if (hasPlaceholders) {
  console.warn('Missing Supabase environment variables');
  console.warn('VITE_SUPABASE_URL:', supabaseUrl);
  console.warn('❌ VITE_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey);
  console.warn('❌ Contains placeholders - please update your .env file with real values');
}
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);