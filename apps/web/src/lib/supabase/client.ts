import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://epmbzwcvhophzhzetoio.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_uMu8cmlM7lfbZpqEgT516Q_njdAj-cF';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

