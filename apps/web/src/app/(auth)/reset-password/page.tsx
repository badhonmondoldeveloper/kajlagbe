'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button, Input } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { useAuth } from '../../../context/auth-context';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword, isAuthenticated } = useAuth();

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;

    if (password.length < 6) {
      setErrorMsg('পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('দুটি পাসওয়ার্ড হুবহু মেলেনি');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await updatePassword(password);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login?msg=password_updated');
        }, 2000);
      } else {
        setErrorMsg(res.error || 'পাসওয়ার্ড আপডেট করা সম্ভব হয়নি। লিংকটি মেয়াদের বাইরে হতে পারে।');
      }
    } catch {
      setErrorMsg('পাসওয়ার্ড রিসেটে সমস্যা হয়েছে। নতুন লিংক পাওয়ার অনুরোধ জানান।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="নতুন পাসওয়ার্ড নির্ধারণ করুন"
      subtitle="আপনার অ্যাকাউন্টের জন্য নতুন একটি শক্তিশালী পাসওয়ার্ড টাইপ করুন।"
      badge="পাসওয়ার্ড রিসেট"
    >
      {success ? (
        <div className="space-y-4 text-center py-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!</h3>
            <p className="text-xs text-slate-600">আপনাকে লগইন পেজে নিয়ে যাওয়া হচ্ছে...</p>
          </div>
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
              নতুন পাসওয়ার্ড
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="ন্যূনতম ৬ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-hidden"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              পাসওয়ার্ড পুনরায় টাইপ করুন
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !password || !confirmPassword}
            className="w-full font-bold shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            {loading ? 'আপডেট করা হচ্ছে...' : 'নতুন পাসওয়ার্ড সংরক্ষণ করুন'}
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
