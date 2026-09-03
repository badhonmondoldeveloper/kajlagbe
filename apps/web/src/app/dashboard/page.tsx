'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import { LoadingState } from '@kajlagbe/ui';

export default function SmartDashboardRouter() {
  const router = useRouter();
  const { role, isLoading, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login?redirectTo=/dashboard');
        return;
      }

      if (role === 'INDIVIDUAL_PROVIDER') {
        router.push('/provider/dashboard');
      } else if (role === 'BUSINESS') {
        router.push('/business/dashboard');
      } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else if (role === 'SUPPORT' || role === 'SUPPORT_AGENT') {
        router.push('/support');
      } else if (role === 'MODERATOR') {
        router.push('/moderator');
      } else {
        router.push('/customer/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, role, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <LoadingState message="আপনার ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে..." />
    </div>
  );
}
