import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const role = user?.user_metadata?.role || 'CUSTOMER';
      const onboardingStatus = user?.user_metadata?.onboardingStatus || 'NOT_STARTED';

      if (onboardingStatus === 'NOT_STARTED' || onboardingStatus === 'IN_PROGRESS') {
        if (role === 'INDIVIDUAL_PROVIDER') {
          return NextResponse.redirect(`${origin}/onboarding/provider`);
        } else if (role === 'BUSINESS') {
          return NextResponse.redirect(`${origin}/onboarding/business`);
        } else {
          return NextResponse.redirect(`${origin}/onboarding/customer`);
        }
      }

      if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        return NextResponse.redirect(`${origin}/admin`);
      } else if (role === 'INDIVIDUAL_PROVIDER' || role === 'BUSINESS') {
        return NextResponse.redirect(`${origin}/provider`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Fallback to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
