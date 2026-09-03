'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  ShieldCheck,
  KeyRound,
  LogOut,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { useAuth } from '../../context/auth-context';

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user, profile, role, onboardingStatus, signOut, updatePassword } = useAuth();

  const [activeTab, setActiveTab] = React.useState<'profile' | 'security' | 'onboarding'>('profile');

  // Password change state
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordLoading, setPasswordLoading] = React.useState(false);
  const [passwordSuccess, setPasswordSuccess] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || passwordLoading) return;

    if (newPassword.length < 6) {
      setPasswordError('পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('পাসওয়ার্ড দ্বয় হুবহু মেলেনি');
      return;
    }

    setPasswordError(null);
    setPasswordLoading(true);

    try {
      const res = await updatePassword(newPassword);
      if (res.success) {
        setPasswordSuccess(true);
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSuccess(false), 4000);
      } else {
        setPasswordError(res.error || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে');
      }
    } catch {
      setPasswordError('সার্ভারে সমস্যা হয়েছে');
    } finally {
      setPasswordLoading(false);
    }
  };

  const getRoleLabel = () => {
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') return 'অ্যাডমিনিস্ট্রেটর';
    if (role === 'INDIVIDUAL_PROVIDER') return 'প্রোভাইডার';
    if (role === 'BUSINESS') return 'সার্ভিস ব্যবসা (এজেন্সি)';
    return 'কাস্টমার';
  };

  const userName =
    profile?.profile?.firstName && profile?.profile?.lastName
      ? `${profile.profile.firstName} ${profile.profile.lastName}`
      : profile?.profile?.firstName || user?.email?.split('@')[0] || 'ব্যবহারকারী';

  return (
    <DashboardLayout
      title="অ্যাকাউন্ট সিকিউরিটি ও সেটিংস"
      subtitle="আপনার প্রোফাইল তথ্য, সিকিউরিটি সেটিংস ও অ্যাকাউন্ট স্টেটাস পরিচালনা করুন"
    >
      <div className="space-y-6 max-w-4xl">
        {/* User Card Banner */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shadow-xs">
              {userName[0]}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">{userName}</h2>
                <Badge variant="verified">{getRoleLabel()}</Badge>
              </div>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          <Button
            onClick={() => signOut()}
            variant="outline"
            size="sm"
            className="text-xs font-bold text-rose-600 border-rose-200 hover:bg-rose-50 gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>লগআউট করুন</span>
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            প্রোফাইল তথ্য
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'security'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            সিকিউরিটি ও পাসওয়ার্ড
          </button>

          <button
            onClick={() => setActiveTab('onboarding')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'onboarding'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            অনবোর্ডিং স্টেটাস
          </button>
        </div>

        {/* Tab 1: Profile Details */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              ব্যক্তিগত প্রোফাইল
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">প্রথম নাম</label>
                <Input value={profile?.profile?.firstName || ''} readOnly className="bg-slate-50" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">শেষ নাম</label>
                <Input value={profile?.profile?.lastName || ''} readOnly className="bg-slate-50" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা</label>
                <Input value={user?.email || ''} readOnly className="bg-slate-50" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">মোবাইল নাম্বার</label>
                <Input value={profile?.phone || 'সংযুক্ত নেই'} readOnly className="bg-slate-50" />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Security & Password Change */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Status Badges */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                যাচাইকরণ ও নিরাপত্তা স্টেটাস
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="font-bold text-slate-800">ইমেইল ভেরিফিকেশন</span>
                  </div>
                  <Badge variant={profile?.isEmailVerified ? 'success' : 'warning'}>
                    {profile?.isEmailVerified ? 'VERIFIED' : 'PENDING'}
                  </Badge>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="font-bold text-slate-800">মোবাইল OTP ভেরিফিকেশন</span>
                  </div>
                  <Badge variant={profile?.isPhoneVerified ? 'success' : 'secondary'}>
                    {profile?.isPhoneVerified ? 'VERIFIED' : 'UNLINKED'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                পাসওয়ার্ড পরিবর্তন করুন
              </h3>

              {passwordSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4 text-xs max-w-md">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">নতুন পাসওয়ার্ড</label>
                  <Input
                    type="password"
                    placeholder="ন্যূনতম ৬ অক্ষর"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                  <Input
                    type="password"
                    placeholder="পুনরায় পাসওয়ার্ড টাইপ করুন"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={passwordLoading || !newPassword || !confirmPassword}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
                >
                  <KeyRound className="h-4 w-4" />
                  <span>{passwordLoading ? 'সংরক্ষণ হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করুন'}</span>
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 3: Onboarding Status */}
        {activeTab === 'onboarding' && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              অনবোর্ডিং তথ্য
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">বর্তমান অনবোর্ডিং ধরণ</span>
                <span className="text-sm font-bold text-slate-900">{getRoleLabel()}</span>
              </div>
              <Badge variant={onboardingStatus === 'COMPLETED' ? 'success' : 'warning'}>
                {onboardingStatus}
              </Badge>
            </div>

            {onboardingStatus !== 'COMPLETED' && (
              <div className="pt-2">
                <Link href={`/onboarding/${role === 'INDIVIDUAL_PROVIDER' ? 'provider' : role === 'BUSINESS' ? 'business' : 'customer'}`}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 text-xs">
                    <span>অনবোর্ডিং তথ্য সম্পন্ন করুন</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
