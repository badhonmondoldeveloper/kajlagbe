'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Smartphone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  LogOut,
  Laptop,
  ArrowRight,
} from 'lucide-react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';
import { PasswordStrengthIndicator } from '../../../components/auth/password-strength';
import { PhoneVerificationNotice } from '../../../components/auth/phone-verification-banner';
import { useAuth } from '../../../context/auth-context';

export default function SecuritySettingsPage() {
  const { user, profile, updatePassword, signOut } = useAuth();

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordMsg, setPasswordMsg] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordLoading, setPasswordLoading] = React.useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না' });
      return;
    }

    setPasswordLoading(true);
    const res = await updatePassword(newPassword);

    if (!res.success) {
      setPasswordMsg({ type: 'error', text: res.error || 'পাসওয়ার্ড আপডেট ব্যর্থ হয়েছে' });
    } else {
      setPasswordMsg({ type: 'success', text: 'পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে!' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordLoading(false);
  };

  const isEmailVerified = user?.email_confirmed_at || profile?.isEmailVerified;

  return (
    <Container className="py-8 sm:py-12 space-y-8 max-w-4xl">
      <PageHeader
        title="অ্যাকাউন্ট নিরাপত্তা কেন্দ্র (Security Center)"
        description="আপনার পাসওয়ার্ড, সক্রিয় সেশন ও পরিচয় ভেরিফিকেশন পরিচালনা করুন।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'সেটিংস', href: '/settings' },
              { label: 'নিরাপত্তা' },
            ]}
          />
        }
        badge={<Badge variant="verified">অ্যাকাউন্ট সুরক্ষা সক্রিয়</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Settings Nav Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-1">
            <Link
              href="/settings/security"
              className="flex items-center gap-2.5 rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-800"
            >
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>পাসওয়ার্ড ও নিরাপত্তা</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              <Lock className="h-4 w-4 text-slate-400" />
              <span>প্রোফাইল সেটিংস</span>
            </Link>
          </div>

          <Card className="p-4 space-y-2 text-xs text-slate-600">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-600" /> সিকিউরিটি টিপ:
            </span>
            <p className="leading-relaxed">
              পাসওয়ার্ডে বর্ণ, সংখ্যা ও বিশেষ চিহ্নের সংমিশ্রণ ব্যবহার করুন এবং কারো সাথে আপনার OTP শেয়ার করবেন না।
            </p>
          </Card>
        </div>

        {/* Main Security Settings Panels */}
        <div className="md:col-span-2 space-y-6">
          {/* 1. Email & Phone Verification Status Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">পরিচয় ভেরিফিকেশন স্ট্যাটাস</CardTitle>
              <CardDescription>আপনার যোগাযোগ ও লগইন তথ্যের সক্রিয় অবস্থা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user?.email || 'ইমেইল'}</p>
                    <span className="text-[11px] text-slate-500">
                      {isEmailVerified ? 'ইমেইল ভেরিফাইড' : 'যাচাই করা হয়নি'}
                    </span>
                  </div>
                </div>
                <Badge variant={isEmailVerified ? 'verified' : 'secondary'} size="sm">
                  {isEmailVerified ? 'ভেরিফাইড' : 'পেন্ডিং'}
                </Badge>
              </div>

              {/* Phone Notice */}
              <PhoneVerificationNotice phone={user?.phone || user?.user_metadata?.phone} />
            </CardContent>
          </Card>

          {/* 2. Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">পাসওয়ার্ড পরিবর্তন করুন</CardTitle>
              <CardDescription>অ্যাকাউন্টের সুরক্ষায় নিয়মিত পাসওয়ার্ড আপডেট করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                {passwordMsg && (
                  <div
                    className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs ${
                      passwordMsg.type === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-rose-200 bg-rose-50 text-rose-800'
                    }`}
                  >
                    {passwordMsg.type === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <p className="font-medium">{passwordMsg.text}</p>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    নতুন পাসওয়ার্ড <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    leftIcon={<Lock className="h-4 w-4" />}
                    required
                  />
                  <PasswordStrengthIndicator password={newPassword} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    নতুন পাসওয়ার্ড নিশ্চিত করুন <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="একই পাসওয়ার্ড আবার লিখুন"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    leftIcon={<Lock className="h-4 w-4" />}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="md"
                  isLoading={passwordLoading}
                >
                  পাসওয়ার্ড আপডেট করুন
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 3. Active Session & Device Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">সক্রিয় সেশন ও ডিভাইস</CardTitle>
              <CardDescription>যেসব ডিভাইসে আপনার অ্যাকাউন্ট বর্তমানে লগইন রয়েছে</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-emerald-100 text-emerald-600">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">বর্তমান ওয়েব ব্রাউজার</h4>
                      <Badge variant="verified" size="sm">এই ডিভাইস</Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> সক্রিয় সেশন (ঢাকা, বাংলাদেশ)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">অনাকাঙ্ক্ষিত প্রবেশ রোধ করতে লগআউট করুন</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => signOut()}
                leftIcon={<LogOut className="h-4 w-4" />}
              >
                লগআউট করুন
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Container>
  );
}

