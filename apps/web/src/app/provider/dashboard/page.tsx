'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Star,
  Clock,
  Wrench,
  ShieldCheck,
  Wallet,
  TrendingUp,
  Image,
  ArrowRight,
  Sparkles,
  FileText,
} from 'lucide-react';
import { Button, Badge, Avatar } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../../components/dashboard/dashboard-stat-card';
import { DashboardSection } from '../../../components/dashboard/dashboard-section';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { ProfileCompletionCard } from '../../../components/dashboard/profile-completion-card';
import { DashboardStatusBanner } from '../../../components/dashboard/dashboard-status-banner';
import { useAuth } from '../../../context/auth-context';

export default function ProviderDashboardPage() {
  const { user, profile, role } = useAuth();
  const [availability, setAvailability] = React.useState<'available' | 'busy' | 'away'>('available');

  const userName = profile?.profile?.firstName || user?.user_metadata?.full_name?.split(' ')[0] || 'প্রোভাইডার';

  return (
    <DashboardLayout
      title={`স্বাগতম, ${userName}!`}
      subtitle="প্রোভাইডার সার্ভিস কনসোল ও রিয়েল-টাইম জব রাডার"
    >
      <div className="space-y-8">
        {/* Verification & Account Status Banner */}
        <DashboardStatusBanner
          status={profile?.providerProfile?.status || profile?.status || 'PENDING_REVIEW'}
          isEmailVerified={!!user?.email_confirmed_at || !!profile?.isEmailVerified}
          role={role}
        />

        {/* Welcome & Live Availability Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar fallback={userName} size="lg" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">{userName}</h2>
                <Badge variant="verified">ভেরিফাইড টেকনিশিয়ান</Badge>
              </div>
              <p className="text-xs text-slate-500">
                ইলেকট্রিশিয়ান ও এসি সার্ভিস এক্সপার্ট • ঢাকা ডিভিশন
              </p>
            </div>
          </div>

          {/* Availability Status Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-bold text-slate-600 px-2 hidden sm:inline">কাজের অবস্থা:</span>
            {[
              { id: 'available', label: 'কাজের জন্য প্রস্তুত', color: 'bg-emerald-600 text-white' },
              { id: 'busy', label: 'ব্যস্ত', color: 'bg-amber-500 text-white' },
              { id: 'away', label: 'ছুটিতে', color: 'bg-slate-600 text-white' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setAvailability(st.id as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  availability === st.id
                    ? `${st.color} shadow-xs`
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <DashboardStatCard
            title="কাজের সুযোগ"
            value={5}
            subtitle="নিকটবর্তী নতুন আবেদন"
            icon={Briefcase}
            variant="emerald"
          />
          <DashboardStatCard
            title="চলমান বুকিং"
            value={0}
            subtitle="নির্ধারিত সার্ভিস অর্ডার"
            icon={Calendar}
            variant="sky"
          />
          <DashboardStatCard
            title="সম্পন্ন কাজ"
            value={0}
            subtitle="সফলভাবে সমাপ্ত"
            icon={CheckCircle2}
            variant="default"
          />
          <DashboardStatCard
            title="রেটিং ও ফিডব্যাক"
            value="৫.০"
            subtitle="১০০% পজিটিভ স্কোর"
            icon={Star}
            variant="amber"
          />
        </div>

        {/* Profile Completion Card */}
        <ProfileCompletionCard
          percentage={85}
          missingFields={[
            { field: 'portfolio', label: 'কাজের পোর্টফোলিও ও ছবি যোগ করুন', actionUrl: '/provider/portfolio' },
          ]}
          role="INDIVIDUAL_PROVIDER"
        />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[
            { label: 'সার্ভিস যুক্ত করুন', href: '/provider/services', icon: Wrench, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'কাজের সুযোগ খুঁজুন', href: '/provider/jobs', icon: Briefcase, color: 'text-sky-600 bg-sky-50' },
            { label: 'জমাকৃত আবেদনসমূহ', href: '/provider/applications', icon: FileText, color: 'text-purple-600 bg-purple-50' },
            { label: 'আয়ের বিবরণ', href: '/provider/earnings', icon: Wallet, color: 'text-amber-600 bg-amber-50' },
          ].map((act, idx) => {
            const Icon = act.icon;
            return (
              <Link
                key={idx}
                href={act.href}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 hover:border-emerald-300 hover:shadow-xs transition"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${act.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{act.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Active Work Radar & Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Opportunities */}
          <DashboardSection
            title="নিকটবর্তী কাজের সুযোগ (Job Radar)"
            subtitle="আপনার সার্ভিস ক্যাটাগরি ও এলাকায় গ্রাহকদের নতুন রিকোয়েস্ট"
            actionText="সকল সুযোগ"
            actionHref="/provider/jobs"
          >
            <DashboardEmptyState
              icon={Briefcase}
              title="নতুন ৫টি কাজ আপনার এলাকায় সক্রিয়"
              description="গ্রাহকদের পোস্ট করা কাজের বিবরণ দেখুন এবং সরাসরি দরপ্রস্তাব বা আবেদন জমা দিন।"
              actionText="কাজের সুযোগ দেখুন"
              actionHref="/provider/jobs"
            />
          </DashboardSection>

          {/* Active Bookings */}
          <DashboardSection
            title="চলমান বুকিং ও শিডিউল"
            subtitle="যেসব কাজের জন্য গ্রাহক আপনাকে নিযুক্ত করেছেন"
          >
            <DashboardEmptyState
              icon={Calendar}
              title="কোনো সক্রিয় বুকিং নেই"
              description="গ্রাহক আপনার কোটেশন গ্রহণ করলে বা সরাসরি সার্ভিস অর্ডার করলে এখানে বিস্তারিত সময়সূচী প্রদর্শিত হবে।"
              actionText="প্রোফাইল আকর্ষণীয় করুন"
              actionHref="/provider/profile"
            />
          </DashboardSection>
        </div>

        {/* Earnings Foundation Preview */}
        <DashboardSection
          title="আয় ও পেমেন্ট বিবরণ"
          subtitle="সম্পন্ন কাজের আয় ও উত্তোলনের সার্বিক অবস্থা"
          actionText="আয়ের পেইজ"
          actionHref="/provider/earnings"
        >
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-emerald-600 shadow-xs">
                <Wallet className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-500">মোট উত্তোলনযোগ্য ব্যালেন্স</span>
                <h3 className="text-2xl font-black text-slate-900">৳ ০.০০</h3>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm text-center sm:text-left">
              গ্রাহকের সাথে কাজ সম্পন্ন ও নিশ্চিতকরণের পর আপনার অর্জিত টাকা এখানে স্বয়ংক্রিয়ভাবে জমা হবে।
            </p>
          </div>
        </DashboardSection>
      </div>
    </DashboardLayout>
  );
}
