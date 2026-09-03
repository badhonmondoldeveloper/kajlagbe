'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/auth-context';
import { LoadingState } from '@kajlagbe/ui';

export default function AccountSettingsRouter() {
  const router = useRouter();
  const { role, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      if (role === 'INDIVIDUAL_PROVIDER') {
        router.push('/provider/settings');
      } else if (role === 'BUSINESS') {
        router.push('/business/settings');
      } else {
        router.push('/customer/settings');
      }
    }
  }, [isLoading, role, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingState message="সেটিংসে রিডাইরেক্ট করা হচ্ছে..." />
    </div>
  );
}
