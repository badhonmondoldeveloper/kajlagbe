'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button, Input } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { PasswordStrengthIndicator } from '../../../components/auth/password-strength';
import { useAuth } from '../../../context/auth-context';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword } = useAuth();

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 8) {
      setErrorMsg('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না');
      return;
    }

    setLoading(true);
    const res = await updatePassword(password);

    if (!res.success) {
      setErrorMsg(res.error || 'পাসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি। লিংকটি মেয়াদোত্তীর্ণ হতে পারে।');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <AuthCard
      title="নতুন পাসওয়ার্ড সেট করুন"
      subtitle="আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী নতুন পাসওয়ার্ড নির্ধারণ করুন"
      badge="পাসওয়ার্ড রিসেট"
      footer={
        <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
          লগইন পেজে যান
        </Link>
      }
    >
      {success ? (
        <div className="space-y-4 text-center py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              আপনার অ্যাকাউন্টের পাসওয়ার্ড আপডেট করা হয়েছে। এখন নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারেন।
            </p>
          </div>
          <div className="pt-2">
            <Link href="/login">
              <Button className="w-full font-bold shadow-md" size="lg">
                লগইন করুন
              </Button>
            </Link>
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
              নতুন পাসওয়ার্ড <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <PasswordStrengthIndicator password={password} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">
              নতুন পাসওয়ার্ড নিশ্চিত করুন <span className="text-rose-500">*</span>
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="একই পাসওয়ার্ড আবার লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              required
              autoComplete="new-password"
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
              পাসওয়ার্ড পরিবর্তন করুন
            </Button>
          </div>
        </form>
      )}
    </AuthCard>
  );
}
