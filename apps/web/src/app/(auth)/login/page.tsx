'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { Button, Input } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { useAuth } from '../../../context/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  const { signIn, isAuthenticated, role } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      if (redirectTo !== '/') {
        router.push(redirectTo);
      } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else if (role === 'INDIVIDUAL_PROVIDER' || role === 'BUSINESS') {
        router.push('/provider');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, role, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg('ইমেইল ও পাসওয়ার্ড উভয় ফিল্ড পূরণ করুন');
      return;
    }

    setLoading(true);
    const res = await signIn(email.trim(), password);

    if (!res.success) {
      setErrorMsg(res.error || 'লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করে আবার চেষ্টা করুন।');
      setLoading(false);
    } else {
      // Redirect handled by useEffect or explicit push
      if (redirectTo !== '/') {
        router.push(redirectTo);
      }
    }
  };

  return (
    <AuthCard
      title="অ্যাকাউন্টে লগইন করুন"
      subtitle="আপনার KajLagbe অ্যাকাউন্টে প্রবেশ করে সার্ভিস পরিচালনা করুন"
      badge="সুরক্ষিত অথেন্টিকেশন"
      footer={
        <p>
          এখনো অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
            নতুন অ্যাকাউন্ট খুলুন
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Alert */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{errorMsg}</p>
          </div>
        )}

        {/* Email / Identifier */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            ইমেইল এড্রেস <span className="text-rose-500">*</span>
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

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">
              পাসওয়ার্ড <span className="text-rose-500">*</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-emerald-700 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full font-bold shadow-md"
            size="lg"
            isLoading={loading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            লগইন করুন
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
