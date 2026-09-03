'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button, Input } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { useAuth } from '../../../context/auth-context';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await requestPasswordReset(email.trim());
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.error || 'পাসওয়ার্ড রিকোয়েস্ট পাঠানো সম্ভব হয়নি');
      }
    } catch {
      setErrorMsg('সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="পাসওয়ার্ড ভুলে গেছেন?"
      subtitle="আপনার নিবন্ধিত ইমেইল ঠিকানা প্রদান করুন, আমরা পাসওয়ার্ড পুনঃসংস্থাপনের লিংক পাঠিয়ে দেব।"
      badge="নিরাপদ রিকভারি"
      footer={
        <p>
          মনে পড়েছে?{' '}
          <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
            লগইন করুন
          </Link>
        </p>
      }
    >
      {submitted ? (
        <div className="space-y-4 text-center py-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">রিকভারি লিংক পাঠানো হয়েছে!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              যদি <strong className="text-slate-900">{email}</strong> ঠিকানায় অ্যাকাউন্ট থেকে থাকে, তবে পাসওয়ার্ড পরিবর্তন করার লিংক ইমেইলে পৌছে গেছে।
            </p>
          </div>
          <Link href="/login">
            <Button variant="outline" className="w-full mt-2 font-bold text-xs">
              লগইন পেজে ফিরে যান
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              নিবন্ধিত ইমেইল ঠিকানা
            </label>
            <Input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full font-bold shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {loading ? 'পাঠানো হচ্ছে...' : 'পাসওয়ার্ড রিসেট লিংক পাঠান'}
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
