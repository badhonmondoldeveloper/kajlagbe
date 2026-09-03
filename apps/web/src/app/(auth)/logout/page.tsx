'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/auth-context';
import { AuthCard } from '../../../components/auth/auth-card';
import { LoadingState } from '@kajlagbe/ui';

export default function LogoutPage() {
  const router = useRouter();
  const { signOut } = useAuth();

  React.useEffect(() => {
    signOut().then(() => {
      router.push('/login');
    });
  }, [signOut, router]);

  return (
    <AuthCard title="লগআউট হচ্ছে..." badge="সেশন সমাপ্তি">
      <div className="py-8 text-center space-y-3">
        <LoadingState message="আপনার সেশন নিরাপদে সমাপ্ত করা হচ্ছে..." />
      </div>
    </AuthCard>
  );
}
