'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  KeyRound,
  RotateCw,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { useAuth } from '../../../context/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirectTo') || searchParams.get('next') || '/';
  const redirectTo = (rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')) ? rawRedirect : '/dashboard';

  const {
    signIn,
    signInWithGoogle,
    sendPhoneOtp,
    verifyPhoneOtp,
    resendVerificationEmail,
    isAuthenticated,
    role,
  } = useAuth();

  // Mode: 'email' | 'phone'
  const [authMode, setAuthMode] = React.useState<'email' | 'phone'>('email');

  // Email State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);

  // Phone OTP State
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [otpCode, setOtpCode] = React.useState('');
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);
  const [normalizedPhone, setNormalizedPhone] = React.useState('');

  // UI Feedback States
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [isUnverifiedEmail, setIsUnverifiedEmail] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  // Auto redirect if logged in & read URL errors
  React.useEffect(() => {
    const urlError = searchParams.get('error_description') || searchParams.get('error');
    if (urlError) {
      if (urlError === 'auth_callback_failed') {
        setErrorMsg('গুগল লগইন ভেরিফিকেশন সেশন স্থাপন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন অথবা ইমেইল দিয়ে লগইন করুন।');
      } else if (urlError.toLowerCase().includes('provider is not enabled') || urlError.toLowerCase().includes('unsupported provider')) {
        setErrorMsg('সুপাবেস প্রজেক্টে Google Provider সক্রিয় করতে হবে। আপনি ইমেইল দিয়ে সরাসরি লগইন করতে পারেন।');
      } else {
        setErrorMsg(decodeURIComponent(urlError));
      }
    }

    if (isAuthenticated) {
      if (redirectTo && redirectTo !== '/') {
        router.push(redirectTo);
      } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else if (role === 'INDIVIDUAL_PROVIDER' || role === 'BUSINESS') {
        router.push('/provider');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, role, redirectTo, router, searchParams]);

  // Resend OTP Countdown
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Google OAuth Login
  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setGoogleLoading(true);
    const res = await signInWithGoogle(redirectTo);
    if (!res.success) {
      setErrorMsg(res.error || 'গুগল দিয়ে লগইন শুরু করা যায়নি।');
      setGoogleLoading(false);
    }
  };

  // Email / Password Login
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsUnverifiedEmail(false);

    if (!email.trim() || !password) {
      setErrorMsg('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড উভয় ফিল্ড পূরণ করুন।');
      return;
    }

    setLoading(true);
    const res = await signIn(email.trim(), password);

    if (!res.success) {
      setErrorMsg(res.error || 'লগইন ব্যর্থ হয়েছে। তথ্য সঠিক কি না যাচাই করুন।');
      if (res.isUnverified) {
        setIsUnverifiedEmail(true);
      }
      setLoading(false);
    } else {
      setSuccessMsg('লগইন সফল হয়েছে! ড্যাশবোর্ডে প্রবেশ করা হচ্ছে...');
      if (redirectTo && redirectTo !== '/') {
        router.push(redirectTo);
      }
    }
  };

  // Resend Email Verification
  const handleResendEmail = async () => {
    if (!email) return;
    setResendLoading(true);
    const res = await resendVerificationEmail(email);
    setResendLoading(false);
    if (res.success) {
      setSuccessMsg('ভেরিফিকেশন লিঙ্কটি আপনার ইমেইলে পুনরায় পাঠানো হয়েছে। ইনবক্স বা স্প্যাম ফোল্ডার চেক করুন।');
      setIsUnverifiedEmail(false);
    } else {
      setErrorMsg(res.error || 'ভেরিফিকেশন ইমেইল পাঠানো সম্ভব হয়নি।');
    }
  };

  // Phone OTP: Step 1 Send Code
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01712345678)');
      return;
    }

    setLoading(true);
    const res = await sendPhoneOtp(cleanPhone);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'OTP পাঠানো সম্ভব হয়নি। নম্বরটি সঠিক কি না যাচাই করুন।');
    } else {
      setIsOtpSent(true);
      setNormalizedPhone(res.phone || cleanPhone);
      setResendTimer(60);
      setSuccessMsg(`${cleanPhone} নম্বরে ৬ ডিজিটের ভেরিফিকেশন কোড পাঠানো হয়েছে।`);
    }
  };

  // Phone OTP: Step 2 Verify Code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMsg('৬ ডিজিটের সম্পূর্ণ ভেরিফিকেশন কোডটি প্রদান করুন।');
      return;
    }

    setLoading(true);
    const res = await verifyPhoneOtp(normalizedPhone, otpCode.trim());

    if (!res.success) {
      setErrorMsg(res.error || 'OTP যাচাইকরণ ব্যর্থ হয়েছে। কোডটি পুনরায় চেক করুন।');
      setLoading(false);
    } else {
      setSuccessMsg('মোবাইল ভেরিফিকেশন সফল! প্রবেশ করা হচ্ছে...');
      if (redirectTo && redirectTo !== '/') {
        router.push(redirectTo);
      }
    }
  };

  // Quick Demo Autofill Helper
  const handleQuickFill = (demoEmail: string, demoPass: string = 'KajLagbe@123') => {
    setAuthMode('email');
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg(null);
  };

  return (
    <AuthCard
      title="অ্যাকাউন্টে লগইন করুন"
      subtitle="আপনার KajLagbe অ্যাকাউন্টে প্রবেশ করে সহজে সেবা গ্রহণ বা কাজ পরিচালনা করুন"
      badge="নিরাপদ অথেন্টিকেশন"
      footer={
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            এখনো KajLagbe অ্যাকাউন্ট নেই?{' '}
            <Link href="/signup" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>২৫৬-বিট SSL সুরক্ষিত ও এনক্রিপ্টেড সংযোগ</span>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Google One-Click Login Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 px-4 text-xs sm:text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition disabled:opacity-60"
          >
            {googleLoading ? (
              <RotateCw className="h-4 w-4 animate-spin text-emerald-600" />
            ) : (
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
            )}
            <span>Google দিয়ে এক-ক্লিকে লগইন করুন</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-semibold text-slate-400">
            অথবা ইমেইল / মোবাইল দিয়ে প্রবেশ করুন
          </span>
        </div>

        {/* Login Method Tabs */}
        <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1 text-center">
          <button
            type="button"
            onClick={() => {
              setAuthMode('email');
              setErrorMsg(null);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition ${
              authMode === 'email'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>ইমেইল দিয়ে</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('phone');
              setErrorMsg(null);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition ${
              authMode === 'phone'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span>মোবাইল ও ওটিপি</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <p className="leading-relaxed font-medium">{errorMsg}</p>
              {isUnverifiedEmail && (
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={resendLoading}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-900 underline hover:text-rose-950"
                >
                  {resendLoading ? 'পাঠানো হচ্ছে...' : 'নতুন ভেরিফিকেশন ইমেইল পাঠান'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <p>{successMsg}</p>
          </div>
        )}

        {/* TAB 1: EMAIL & PASSWORD FORM */}
        {authMode === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                ইমেইল এড্রেস <span className="text-rose-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="যেমন: name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
                required
                autoComplete="email"
              />
            </div>

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
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                  aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-600 font-medium">পাসওয়ার্ড মনে রাখুন</span>
              </label>
            </div>

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
        )}

        {/* TAB 2: PHONE & OTP FORM */}
        {authMode === 'phone' && (
          <div>
            {!isOtpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center gap-1.5 text-xs font-bold text-slate-600 select-none border-r border-slate-200 pr-2.5">
                      <span>🇧🇩</span>
                      <span>+880</span>
                    </div>
                    <Input
                      type="tel"
                      placeholder="1712345678"
                      className="pl-24"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    আপনার মোবাইলে ৬ ডিজিটের ওটিপি ভেরিফিকেশন কোড পাঠানো হবে।
                  </span>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full font-bold shadow-md"
                    size="lg"
                    isLoading={loading}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    ওটিপি কোড পাঠান
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3.5 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-500 block">কোড পাঠানো হয়েছে:</span>
                    <span className="font-bold text-emerald-950">{normalizedPhone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOtpSent(false);
                      setOtpCode('');
                      setErrorMsg(null);
                    }}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    নম্বর পরিবর্তন
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    ৬ ডিজিটের ওটিপি কোড <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    className="text-center text-lg font-black tracking-widest"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    leftIcon={<KeyRound className="h-4 w-4 text-slate-400" />}
                    autoFocus
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">কোড পাননি?</span>
                  {resendTimer > 0 ? (
                    <span className="font-bold text-slate-400">
                      পুনরায় পাঠান ({resendTimer}s)
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      পুনরায় কোড পাঠান
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full font-bold shadow-md"
                    size="lg"
                    isLoading={loading}
                    leftIcon={<CheckCircle2 className="h-4 w-4" />}
                  >
                    কোড যাচাই ও লগইন
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Quick Demo Credentials for Fast Testing */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              দ্রুত টেস্ট লগইন (Demo)
            </span>
            <span className="text-[10px] text-slate-400">পাসওয়ার্ড: KajLagbe@123</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {[
              { role: 'গ্রাহক', email: 'customer@kajlagbe.com' },
              { role: 'টেকনিশিয়ান', email: 'electrician@kajlagbe.com' },
              { role: 'কোম্পানি', email: 'agency@kajlagbe.com' },
              { role: 'অ্যাডমিন', email: 'admin@kajlagbe.com' },
            ].map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickFill(d.email)}
                className="rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition text-center truncate shadow-2xs"
              >
                {d.role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AuthCard>
  );
}
