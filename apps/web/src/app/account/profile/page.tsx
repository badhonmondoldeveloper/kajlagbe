'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/auth-context';
import { LoadingState } from '@kajlagbe/ui';

export default function AccountProfileRouter() {
  const router = useRouter();
  const { role, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      if (role === 'INDIVIDUAL_PROVIDER') {
        router.push('/provider/profile');
      } else if (role === 'BUSINESS') {
        router.push('/business/profile');
      } else {
        router.push('/customer/profile');
      }
    }
  }, [isLoading, role, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingState message="প্রোফাইলে রিডাইরেক্ট করা হচ্ছে..." />
    </div>
  );
}
