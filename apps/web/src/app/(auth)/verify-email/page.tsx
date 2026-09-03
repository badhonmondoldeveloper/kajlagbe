'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { useAuth } from '../../../context/auth-context';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const [resending, setResending] = React.useState(false);
  const [resentSuccess, setResentSuccess] = React.useState(false);

  const email = user?.email || 'আপনার নিবন্ধিত ইমেইল';

  const handleResend = async () => {
    setResending(true);
    setResentSuccess(false);

    // Simulate resend with delay
    setTimeout(() => {
      setResending(false);
      setResentSuccess(true);
    }, 1200);
  };

  return (
    <AuthCard
      title="ইমেইল ভেরিফিকেশন"
      subtitle="অ্যাকাউন্ট সক্রিয় করতে আপনার ইমেইল এড্রেস যাচাই করুন"
      badge="নিরাপত্তা যাচাই"
      footer={
        <p>
          ইমেইল যাচাই শেষে{' '}
          <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
            লগইন করুন
          </Link>
        </p>
      }
    >
      <div className="space-y-6 text-center py-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100 shadow-xs">
          <Mail className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">ভেরিফিকেশন লিংক পাঠানো হয়েছে</h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            আমরা <strong>{email}</strong> ঠিকানায় একটি যাচাইকরণ ইমেইল পাঠিয়েছি। লিংকে ক্লিক করে আপনার অ্যাকাউন্ট সক্রিয় করুন।
          </p>
        </div>

        {resentSuccess && (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>নতুন ভেরিফিকেশন ইমেইল সফলভাবে পাঠানো হয়েছে!</span>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Button
            variant="outline"
            className="w-full"
            size="md"
            isLoading={resending}
            onClick={handleResend}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            পুনরায় ইমেইল পাঠান (Resend Email)
          </Button>

          <Link href="/onboarding">
            <Button
              variant="ghost"
              className="w-full text-xs text-slate-500"
              size="sm"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              পরবর্তী ধাপে যান
            </Button>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}

