import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { sanitizeRedirectPath } from '@kajlagbe/utils';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  const rawNext = searchParams.get('redirectTo') || searchParams.get('next');
  const next = sanitizeRedirectPath(rawNext, '/dashboard');

  // Handle Supabase OAuth errors in redirect query
  if (error || error_description) {
    const errorMsg = encodeURIComponent(error_description || error || 'auth_error');
    return NextResponse.redirect(`${origin}/login?error=${errorMsg}`);
  }

  if (code) {
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://epmbzwcvhophzhzetoio.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_uMu8cmlM7lfbZpqEgT516Q_njdAj-cF';

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Handled
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // Handled
          }
        },
      },
    });

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (!exchangeError) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const role = user?.user_metadata?.role || 'CUSTOMER';
      const onboardingStatus = user?.user_metadata?.onboardingStatus || 'NOT_STARTED';

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const hostOrigin = !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

      if (onboardingStatus === 'NOT_STARTED' || onboardingStatus === 'IN_PROGRESS') {
        if (role === 'INDIVIDUAL_PROVIDER') {
          return NextResponse.redirect(`${hostOrigin}/onboarding/provider`);
        } else if (role === 'BUSINESS') {
          return NextResponse.redirect(`${hostOrigin}/onboarding/business`);
        } else {
          return NextResponse.redirect(`${hostOrigin}/onboarding/customer`);
        }
      }

      if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        return NextResponse.redirect(`${hostOrigin}/admin`);
      } else if (role === 'INDIVIDUAL_PROVIDER' || role === 'BUSINESS') {
        return NextResponse.redirect(`${hostOrigin}/provider`);
      } else {
        const dest = next.startsWith('/') ? next : `/${next}`;
        return NextResponse.redirect(`${hostOrigin}${dest}`);
      }
    } else {
      const exchangeMsg = encodeURIComponent(exchangeError.message);
      return NextResponse.redirect(`${origin}/login?error=${exchangeMsg}`);
    }
  }

  // Fallback to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
