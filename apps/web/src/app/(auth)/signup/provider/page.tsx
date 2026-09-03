'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, AlertCircle, ArrowRight, Eye, EyeOff, Wrench } from 'lucide-react';
import { Button, Input, Select, Checkbox } from '@kajlagbe/ui';
import { AuthCard } from '../../../../components/auth/auth-card';
import { PasswordStrengthIndicator } from '../../../../components/auth/password-strength';
import { normalizeBangladeshiPhone } from '@kajlagbe/utils';
import { useAuth } from '../../../../context/auth-context';
import { RoleType } from '@kajlagbe/types';
import { CATEGORIES, DIVISIONS } from '../../../../data';

export default function ProviderSignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [primaryCategory, setPrimaryCategory] = React.useState(CATEGORIES[0]?.slug || 'electrician');
  const [division, setDivision] = React.useState('Dhaka');
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

    const phoneCheck = normalizeBangladeshiPhone(phone);
    if (!phoneCheck.isValid) {
      setErrorMsg(phoneCheck.error || 'সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন');
      return;
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
      setErrorMsg('সেবাদাতার আচরণবিধি ও নীতিমালা মেনে সম্মতি প্রদান করুন');
      return;
    }

    setLoading(true);

    const res = await signUp({
      email: email.trim(),
      password,
      fullName: fullName.trim(),
      phone: phoneCheck.local,
      role: RoleType.INDIVIDUAL_PROVIDER,
      metadata: {
        registration_type: 'INDIVIDUAL_PROVIDER',
        primaryCategory,
        division,
      },
    });

    if (!res.success) {
      setErrorMsg(res.error || 'রেজিস্ট্রেশন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setLoading(false);
    } else {
      router.push('/onboarding/provider');
    }
  };

  return (
    <AuthCard
      title="প্রোভাইডার হিসেবে যোগ দিন"
      subtitle="আপনার এলাকা থেকে প্রতিদিন সরাসরি সার্ভিস কল ও জব রিকোয়েস্ট পেতে প্রোফাইল তৈরি করুন"
      badge="সেবাদাতা রেজিস্ট্রেশন"
      footer={
        <p>
          ইতিমধ্যে প্রোভাইডার অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
            লগইন করুন
          </Link>
        </p>
      }
    >
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
            পুরো নাম (NID অনুযায়ী) <span className="text-rose-500">*</span>
          </label>
          <Input
            placeholder="যেমন: আব্দুল করিম"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="h-4 w-4" />}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            ইমেইল এড্রেস <span className="text-rose-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="karim@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            মোবাইল নম্বর <span className="text-rose-500">*</span>
          </label>
          <Input
            type="tel"
            placeholder="01XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
            required
          />
        </div>

        {/* Service Category & Division */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">
              প্রধান সার্ভিস ক্যাটাগরি <span className="text-rose-500">*</span>
            </label>
            <Select
              value={primaryCategory}
              onChange={(e) => setPrimaryCategory(e.target.value)}
              options={CATEGORIES.map((c) => ({ value: c.slug, label: c.title }))}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">
              কাজের বিভাগ <span className="text-rose-500">*</span>
            </label>
            <Select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              options={DIVISIONS.map((d) => ({ value: d.id, label: d.name }))}
            />
          </div>
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
          />
        </div>

        {/* Agreement */}
        <div className="pt-1">
          <Checkbox
            label={
              <span className="text-xs text-slate-600">
                আমি প্রোভাইডার আচরণবিধি, কাজের গুণমান বজায় রাখা ও প্ল্যাটফর্মের নীতিমালা মেনে চলার অঙ্গীকার করছি।
              </span>
            }
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full font-bold shadow-md"
            size="lg"
            isLoading={loading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            প্রোভাইডার অ্যাকাউন্ট খুলুন
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
