import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://epmbzwcvhophzhzetoio.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbWJ6d2N2aG9waHpoemV0b2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjUwMjUsImV4cCI6MjEwNDAwMTAyNX0.chCb9rM3BPlvzaRQYGZ0pCU7OW_TJnaaJG5sKGlsQFM';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

