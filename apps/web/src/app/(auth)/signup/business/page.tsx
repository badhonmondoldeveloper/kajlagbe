'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, User, Mail, Lock, Phone, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button, Input, Select, Checkbox } from '@kajlagbe/ui';
import { AuthCard } from '../../../../components/auth/auth-card';
import { PasswordStrengthIndicator } from '../../../../components/auth/password-strength';
import { normalizeBangladeshiPhone } from '@kajlagbe/utils';
import { useAuth } from '../../../../context/auth-context';
import { RoleType } from '@kajlagbe/types';
import { CATEGORIES, DIVISIONS } from '../../../../data';

export default function BusinessSignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [repName, setRepName] = React.useState('');
  const [businessName, setBusinessName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [primaryCategory, setPrimaryCategory] = React.useState(CATEGORIES[0]?.slug || 'ac-repair');
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

    if (!repName.trim() || !businessName.trim()) {
      setErrorMsg('প্রতিনিধির নাম ও প্রতিষ্ঠানের নাম প্রদান করুন');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('সঠিক প্রাতিষ্ঠানিক ইমেইল এড্রেস প্রদান করুন');
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
      setErrorMsg('সার্ভিস কোম্পানির শর্তাবলীতে সম্মতি প্রদান করুন');
      return;
    }

    setLoading(true);

    const res = await signUp({
      email: email.trim(),
      password,
      fullName: repName.trim(),
      phone: phoneCheck.local,
      role: RoleType.BUSINESS,
      metadata: {
        registration_type: 'BUSINESS',
        businessName: businessName.trim(),
        primaryCategory,
        division,
      },
    });

    if (!res.success) {
      setErrorMsg(res.error || 'রেজিস্ট্রেশন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setLoading(false);
    } else {
      router.push('/onboarding/business');
    }
  };

  return (
    <AuthCard
      title="বিজনেস ও এজেন্সি রেজিস্ট্রেশন"
      subtitle="আপনার সার্ভিস কোম্পানির জন্য সেন্ট্রাল টিম ড্যাশবোর্ড ও কর্পোরেট ক্লায়েন্ট বুকিং"
      badge="এন্টারপ্রাইজ সলিউশন"
      footer={
        <p>
          ইতিমধ্যে বিজনেস অ্যাকাউন্ট আছে?{' '}
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

        {/* Business Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            প্রতিষ্ঠানের নাম (Company / Agency Name) <span className="text-rose-500">*</span>
          </label>
          <Input
            placeholder="যেমন: ডেল্টা সার্ভিস সলিউশনস লিমিটেড"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            leftIcon={<Building2 className="h-4 w-4" />}
            required
          />
        </div>

        {/* Rep Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            স্বত্বাধিকারী / প্রতিনিধির নাম <span className="text-rose-500">*</span>
          </label>
          <Input
            placeholder="যেমন: রাশেদুল হক"
            value={repName}
            onChange={(e) => setRepName(e.target.value)}
            leftIcon={<User className="h-4 w-4" />}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            অফিশিয়াল ইমেইল <span className="text-rose-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="contact@deltaservice.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">
            অফিসিয়াল যোগাযোগ নম্বর <span className="text-rose-500">*</span>
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

        {/* Primary Category & Division */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">
              প্রধান সার্ভিস খাত <span className="text-rose-500">*</span>
            </label>
            <Select
              value={primaryCategory}
              onChange={(e) => setPrimaryCategory(e.target.value)}
              options={CATEGORIES.map((c) => ({ value: c.slug, label: c.title }))}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">
              মূল কার্যালয়ের বিভাগ <span className="text-rose-500">*</span>
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
                আমি কোম্পানি প্রতিনিধি হিসেবে তথ্যসমূহের সত্যতা এবং কাজ লাগবে কর্পোরেট শর্তাবলী মেনে নিচ্ছি।
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
            কোম্পানি অ্যাকাউন্ট তৈরি করুন
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
