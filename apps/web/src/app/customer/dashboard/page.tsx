'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  Calendar,
  CheckCircle2,
  Bookmark,
  Search,
  PlusCircle,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../../components/dashboard/dashboard-stat-card';
import { DashboardSection } from '../../../components/dashboard/dashboard-section';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { ProfileCompletionCard } from '../../../components/dashboard/profile-completion-card';
import { DashboardStatusBanner } from '../../../components/dashboard/dashboard-status-banner';
import { useAuth } from '../../../context/auth-context';
import { CATEGORIES } from '../../../data';

import { createClient } from '../../../lib/supabase/client';

export default function CustomerDashboardPage() {
  const { user, profile, role } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeBookingCount, setActiveBookingCount] = React.useState(0);
  const [completedBookingCount, setCompletedBookingCount] = React.useState(0);
  const supabase = React.useMemo(() => createClient(), []);

  React.useEffect(() => {
    if (!user?.id) return;
    const userId = user.id;
    async function loadStats() {
      try {
        const [activeRes, completedRes] = await Promise.all([
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('customerId', userId).in('status', ['PENDING_CONFIRMATION', 'CONFIRMED', 'SCHEDULED', 'IN_PROGRESS']),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('customerId', userId).eq('status', 'COMPLETED'),
        ]);
        setActiveBookingCount(activeRes.count || 0);
        setCompletedBookingCount(completedRes.count || 0);
      } catch {
        // Ignored
      }
    }
    loadStats();
  }, [user, supabase]);

  const userName = profile?.profile?.firstName || user?.user_metadata?.full_name?.split(' ')[0] || 'গ্রাহক';

  return (
    <DashboardLayout
      title={`স্বাগতম, ${userName}!`}
      subtitle="আপনার পার্সোনাল সার্ভিস ড্যাশবোর্ড ও সার্ভিস হিস্ট্রি"
    >
      <div className="space-y-8">
        {/* Verification / Email Status Banner */}
        <DashboardStatusBanner
          status={profile?.status || 'ACTIVE'}
          isEmailVerified={!!user?.email_confirmed_at || !!profile?.isEmailVerified}
          role={role}
        />

        {/* Quick Search Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
              <span>বাংলাদেশ-ব্যাপী বিশ্বস্ত টেকনিশিয়ান সার্ভিস</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-snug">
              আজ কোন সার্ভিসটিতে সহায়তা প্রয়োজন?
            </h2>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="যেমন: এসি মেরামত, ইলেকট্রিশিয়ান, প্লাম্বার..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-slate-400" />}
                  className="bg-white text-slate-900 border-none shadow-md h-12"
                />
              </div>
              <Link href={searchQuery ? `/services?q=${encodeURIComponent(searchQuery)}` : '/services'}>
                <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white h-12">
                  খুঁজুন
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Primary Metric Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <DashboardStatCard
            title="চলমান রিকোয়েস্ট"
            value={0}
            subtitle="পোস্টকৃত কাজের আবেদন"
            icon={FileText}
            variant="emerald"
          />
          <DashboardStatCard
            title="আসন্ন ও চলমান বুকিং"
            value={activeBookingCount}
            subtitle="শিডিউলকৃত সার্ভিস অর্ডার"
            icon={Calendar}
            variant="sky"
          />
          <DashboardStatCard
            title="সম্পন্ন সেবা"
            value={completedBookingCount}
            subtitle="সফলভাবে সম্পন্ন"
            icon={CheckCircle2}
            variant="default"
          />
          <DashboardStatCard
            title="সংরক্ষিত প্রোভাইডার"
            value={0}
            subtitle="পছন্দের টেকনিশিয়ান"
            icon={Bookmark}
            variant="amber"
          />
        </div>

        {/* Profile Completion Checklist */}
        <ProfileCompletionCard
          percentage={75}
          missingFields={[
            { field: 'location', label: 'নির্দিষ্ট এলাকা ও ঠিকানা যোগ করুন', actionUrl: '/customer/profile' },
          ]}
          role="CUSTOMER"
        />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[
            { label: 'সেবা বুক করুন', href: '/services', icon: Search, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'কাজ পোস্ট করুন', href: '/post-job', icon: PlusCircle, color: 'text-sky-600 bg-sky-50' },
            { label: 'আমার পোস্টসমূহ', href: '/customer/jobs', icon: FileText, color: 'text-purple-600 bg-purple-50' },
            { label: 'হেল্প ও সাপোর্ট', href: '/help', icon: HelpCircle, color: 'text-amber-600 bg-amber-50' },
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

        {/* Active Bookings & Requests Sections with Honest Empty States */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Requests */}
          <DashboardSection
            title="আপনার কাজের রিকোয়েস্টসমূহ"
            subtitle="পোস্টকৃত কাজের প্রস্তাব ও প্রোভাইডারদের কোটেশন"
            actionText="সকল পোস্ট"
            actionHref="/customer/jobs"
          >
            <DashboardEmptyState
              icon={FileText}
              title="চলমান কাজের রিকোয়েস্ট দেখুন"
              description="আপনার প্রয়োজনীয় কাজের বিবরণ দিয়ে সরাসরি পোস্ট করুন। অভিজ্ঞ টেকনিশিয়ানরা আপনাকে দরপ্রস্তাব পাঠাবে।"
              actionText="কাজ পোস্ট করুন"
              actionHref="/post-job"
              secondaryActionText="আমার পোস্টসমূহ"
              secondaryActionHref="/customer/jobs"
            />
          </DashboardSection>

          {/* Upcoming Bookings */}
          <DashboardSection
            title="আসন্ন বুকিং"
            subtitle="নির্ধারিত সার্ভিস শিডিউল ও ভিজিট"
            actionText="সব সেবা"
            actionHref="/services"
          >
            <DashboardEmptyState
              icon={Calendar}
              title="কোনো আসন্ন বুকিং নেই"
              description="আপনার বাসা বা অফিসের জন্য বিশ্বস্ত কারিগর ও সার্ভিস বুকিং সম্পন্ন করুন।"
              actionText="সেবা খুঁজুন"
              actionHref="/services"
            />
          </DashboardSection>
        </div>

        {/* Popular Categories in Customer Area */}
        <DashboardSection
          title="জনপ্রিয় সার্ভিস ক্যাটাগরি"
          subtitle="গ্রাহকদের সবচেয়ে বেশি প্রয়োজনীয় সেবাসমূহ"
          actionText="সকল ক্যাটাগরি"
          actionHref="/services"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/services/${cat.slug}`}
                className="group rounded-2xl border border-slate-200/90 bg-white p-4 hover:border-emerald-400 hover:shadow-xs transition"
              >
                <span className="text-2xl block mb-1">{cat.icon}</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition">
                  {cat.title}
                </h4>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {cat.subservices.length}টি উপ-সেবা
                </span>
              </Link>
            ))}
          </div>
        </DashboardSection>
      </div>
    </DashboardLayout>
  );
}
