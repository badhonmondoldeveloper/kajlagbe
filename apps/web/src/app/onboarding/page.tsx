'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import { LoadingState } from '@kajlagbe/ui';

export default function OnboardingRouterPage() {
  const router = useRouter();
  const { role, isLoading, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login?redirectTo=/onboarding');
      } else if (role === 'INDIVIDUAL_PROVIDER') {
        router.push('/onboarding/provider');
      } else if (role === 'BUSINESS') {
        router.push('/onboarding/business');
      } else {
        router.push('/onboarding/customer');
      }
    }
  }, [isLoading, isAuthenticated, role, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingState message="অনবোর্ডিং পেজে রিডাইরেক্ট করা হচ্ছে..." />
    </div>
  );
}
