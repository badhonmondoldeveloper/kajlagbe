'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, AlertCircle, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Button, Input, Checkbox } from '@kajlagbe/ui';
import { AuthCard } from '../../../../components/auth/auth-card';
import { PasswordStrengthIndicator } from '../../../../components/auth/password-strength';
import { normalizeBangladeshiPhone } from '@kajlagbe/utils';
import { useAuth } from '../../../../context/auth-context';
import { RoleType } from '@kajlagbe/types';

export default function CustomerSignupPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('আপনার পুরো নাম প্রদান করুন');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('সঠিক ইমেইল এড্রেস প্রদান করুন');
      return;
    }

    if (phone.trim()) {
      const phoneCheck = normalizeBangladeshiPhone(phone);
      if (!phoneCheck.isValid) {
        setErrorMsg(phoneCheck.error || 'সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন');
        return;
      }
    }

    if (password.length < 8) {
      setErrorMsg('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না');
      return;
    }

    if (!agreed) {
      setErrorMsg('সেবার শর্তাবলী ও গোপনীয়তা নীতিতে সম্মতি প্রদান করুন');
      return;
    }

    setLoading(true);

    const normPhone = phone.trim() ? normalizeBangladeshiPhone(phone).local : undefined;

    const res = await signUp({
      email: email.trim(),
      password,
      fullName: fullName.trim(),
      phone: normPhone,
      role: RoleType.CUSTOMER,
      metadata: {
        registration_type: 'CUSTOMER',
      },
    });

    if (!res.success) {
      setErrorMsg(res.error || 'রেজিস্ট্রেশন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setLoading(false);
    } else {
      // Direct to customer onboarding
      router.push('/onboarding/customer');
    }
  };

  return (
    <AuthCard
      title="কাস্টমার রেজিস্ট্রেশন"
      subtitle="বাসা বা অফিসের যেকোনো সার্ভিস সহজে বুক করতে ফ্রি অ্যাকাউন্ট খুলুন"
      badge="গ্রাহক রেজিস্ট্রেশন"
      footer={
        <p>
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
            লগইন করুন
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {/* Google Signup Button */}
        <button
          type="button"
          onClick={async () => {
            setErrorMsg(null);
            setLoading(true);
            const res = await signInWithGoogle('/onboarding/customer');
            if (!res.success) {
              setErrorMsg(res.error || 'গুগল দিয়ে সাইন-আপ শুরু করা সম্ভব হয়নি।');
              setLoading(false);
            }
          }}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 px-4 text-xs sm:text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition disabled:opacity-60"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google দিয়ে এক-ক্লিকে অ্যাকাউন্ট খুলুন</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-semibold text-slate-400">
            অথবা ইমেইল তথ্য পূরণ করুন
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">{errorMsg}</p>
            </div>
          )}

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            পুরো নাম (Full Name) <span className="text-rose-500">*</span>
          </label>
          <Input
            placeholder="যেমন: তানভীর আহমেদ"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="h-4 w-4" />}
            required
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            ইমেইল এড্রেস <span className="text-rose-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="tanvir@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
            autoComplete="email"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            মোবাইল নম্বর <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
          </label>
          <Input
            type="tel"
            placeholder="01XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
            autoComplete="tel"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            পাসওয়ার্ড <span className="text-rose-500">*</span>
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

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            পাসওয়ার্ড নিশ্চিত করুন <span className="text-rose-500">*</span>
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

        {/* Agreement Checkbox */}
        <div className="pt-1">
          <Checkbox
            label={
              <span className="text-xs text-slate-600">
                আমি কাজ লাগবে-এর{' '}
                <Link href="/safety" className="font-semibold text-emerald-700 underline" target="_blank">
                  ব্যবহারের শর্তাবলী
                </Link>{' '}
                ও{' '}
                <Link href="/safety" className="font-semibold text-emerald-700 underline" target="_blank">
                  গোপনীয়তা নীতি
                </Link>{' '}
                মেনে নিচ্ছি।
              </span>
            }
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
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
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </div>
        </form>
      </div>
    </AuthCard>
  );
}

