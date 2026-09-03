'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button, Input } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { useAuth } from '../../../context/auth-context';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !email.includes('@')) {
      setErrorMsg('সঠিক ইমেইল এড্রেস প্রদান করুন');
      return;
    }

    setLoading(true);
    const res = await requestPasswordReset(email.trim());

    if (!res.success) {
      setErrorMsg(res.error || 'পাসওয়ার্ড রিসেট লিংক পাঠানো সম্ভব হয়নি। আবার চেষ্টা করুন।');
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <AuthCard
      title="পাসওয়ার্ড ভুলে গেছেন?"
      subtitle="আপনার অ্যাকাউন্টের সাথে যুক্ত ইমেইল দিন। আমরা একটি নিরাপদ পাসওয়ার্ড রিসেট লিংক পাঠাব।"
      badge="অ্যাকাউন্ট পুনরুদ্ধার"
      footer={
        <Link href="/login" className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="h-3.5 w-3.5" /> লগইন পেজে ফিরে যান
        </Link>
      }
    >
      {submitted ? (
        <div className="space-y-4 text-center py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">রিসেট লিংক পাঠানো হয়েছে!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>{email}</strong> ইমেইলে একটি পাসওয়ার্ড পুনরুদ্ধারের লিংক পাঠানো হয়েছে। অনুগ্রহ করে আপনার ইনবক্স অথবা স্প্যাম ফোল্ডার চেক করুন।
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full"
              size="md"
              onClick={() => setSubmitted(false)}
            >
              অন্য ইমেইল দিয়ে চেষ্টা করুন
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">{errorMsg}</p>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">
              অ্যাকাউন্টের ইমেইল <span className="text-rose-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              required
              autoComplete="email"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full font-bold shadow-md"
              size="lg"
              isLoading={loading}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              রিসেট লিংক পাঠান
            </Button>
          </div>
        </form>
      )}
    </AuthCard>
  );
}
