'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Wrench,
  MapPin,
  BarChart3,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileText,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Button, Badge, Avatar } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../../components/dashboard/dashboard-stat-card';
import { DashboardSection } from '../../../components/dashboard/dashboard-section';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { ProfileCompletionCard } from '../../../components/dashboard/profile-completion-card';
import { DashboardStatusBanner } from '../../../components/dashboard/dashboard-status-banner';
import { useAuth } from '../../../context/auth-context';

export default function BusinessDashboardPage() {
  const { user, profile, role } = useAuth();
  const companyName = user?.user_metadata?.businessName || 'ডেল্টা সার্ভিস সলিউশনস';

  return (
    <DashboardLayout
      title={`বিজনেস কনসোল — ${companyName}`}
      subtitle="সার্ভিস কোম্পানি টিম ড্যাশবোর্ড ও করপোরেট অপারেশনস"
    >
      <div className="space-y-8">
        <DashboardStatusBanner
          status={profile?.businessProfile?.status || profile?.status || 'PENDING_REVIEW'}
          isEmailVerified={!!user?.email_confirmed_at || !!profile?.isEmailVerified}
          role={role}
        />

        {/* Business Header Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 font-bold text-xl">
              <Building2 className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">{companyName}</h2>
                <Badge variant="verified">ভেরিফাইড এজেন্সি</Badge>
              </div>
              <p className="text-xs text-slate-500">
                করপোরেট মেইনটেন্যান্স ও টেকনিশিয়ান নেটওয়ার্ক • হেড অফিস: ঢাকা
              </p>
            </div>
          </div>

          <Link href="/business/team">
            <Button size="sm" leftIcon={<Users className="h-4 w-4" />}>
              টিম পরিচালনা
            </Button>
          </Link>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <DashboardStatCard
            title="টিম টেকনিশিয়ান"
            value="৬ জন"
            subtitle="নিযুক্ত কারিগর"
            icon={Users}
            variant="sky"
          />
          <DashboardStatCard
            title="সক্রিয় সার্ভিস"
            value="৪টি"
            subtitle="ক্যাটালগে অন্তর্ভুক্ত"
            icon={Wrench}
            variant="emerald"
          />
          <DashboardStatCard
            title="সার্ভিস ব্রাঞ্চ"
            value="২টি"
            subtitle="ঢাকা ও চট্টগ্রাম"
            icon={MapPin}
            variant="purple"
          />
          <DashboardStatCard
            title="করপোরেট ক্লায়েন্ট"
            value="০টি"
            subtitle="চলমান চুক্তি"
            icon={BarChart3}
            variant="default"
          />
        </div>

        {/* Profile Completion */}
        <ProfileCompletionCard
          percentage={90}
          missingFields={[
            { field: 'locations', label: 'শাখা অফিস ও বিস্তারিত কভারেজ এলাকা যুক্ত করুন', actionUrl: '/business/locations' },
          ]}
          role="BUSINESS"
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[
            { label: 'সার্ভিস যোগ করুন', href: '/business/services', icon: Wrench, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'টিম মেম্বার যোগ করুন', href: '/business/team', icon: Users, color: 'text-sky-600 bg-sky-50' },
            { label: 'শাখা যুক্ত করুন', href: '/business/locations', icon: MapPin, color: 'text-purple-600 bg-purple-50' },
            { label: 'এনালিটিক্স রিপোর্ট', href: '/business/analytics', icon: BarChart3, color: 'text-amber-600 bg-amber-50' },
          ].map((act, idx) => {
            const Icon = act.icon;
            return (
              <Link
                key={idx}
                href={act.href}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 hover:border-sky-300 hover:shadow-xs transition"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${act.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{act.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Customer Requests & Active Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DashboardSection
            title="কাস্টমার ও করপোরেট রিকোয়েস্ট"
            subtitle="গ্রাহকদের সরাসরি প্রতিষ্ঠান ভিত্তিক কাজের আবেদন"
          >
            <DashboardEmptyState
              icon={FileText}
              title="কোনো নতুন কাস্টমার রিকোয়েস্ট নেই"
              description="আপনার কোম্পানির প্রোফাইল ও সার্ভিস তালিকা দেখে গ্রাহকরা যখন অর্ডার করবে, তখন এখানে রিকোয়েস্ট দৃশ্যমান হবে।"
              actionText="সার্ভিস ক্যাটালগ সাজান"
              actionHref="/business/services"
            />
          </DashboardSection>

          <DashboardSection
            title="চলমান টিম অপারেশনস"
            subtitle="আপনার টেকনিশিয়ানদের ফিল্ড অ্যাসাইনমেন্ট ও কাজের অগ্রগতি"
          >
            <DashboardEmptyState
              icon={Users}
              title="কোনো সক্রিয় ফিল্ড অর্ডার নেই"
              description="অ্যাসাইনকৃত অর্ডার সম্পন্ন হলে টেকনিশিয়ানের কাজের প্রগ্রেস ট্র্যাকিং এখানে দেখা যাবে।"
              actionText="টিম তালিকা দেখুন"
              actionHref="/business/team"
            />
          </DashboardSection>
        </div>
      </div>
    </DashboardLayout>
  );
}
