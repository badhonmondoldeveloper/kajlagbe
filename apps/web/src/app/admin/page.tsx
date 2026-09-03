'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Users,
  UserCheck,
  Briefcase,
  CalendarCheck,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { AdminDashboardStats } from '@kajlagbe/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchStats = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        // Fallback default stats
        setStats({
          totalUsers: 0,
          newUsersToday: 0,
          activeProviders: 0,
          pendingProviders: 0,
          suspendedUsers: 0,
          totalJobs: 0,
          publishedJobs: 0,
          inProgressJobs: 0,
          completedJobs: 0,
          activeBookings: 0,
          totalPaymentVolume: 0,
          platformRevenue: 0,
          pendingPayoutsCount: 0,
          pendingPayoutsAmount: 0,
        });
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            অ্যাডমিন কমান্ড সেন্টার (Dashboard)
          </h1>
          <p className="text-xs text-slate-500">
            সমগ্র KajLagbe প্ল্যাটফর্মের রিয়েল-টাইম অপারেশন ও মেট্রিকে নজর রাখুন
          </p>
        </div>

        <Button
          onClick={fetchStats}
          variant="outline"
          size="sm"
          disabled={loading}
          className="text-xs font-bold gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>রিফ্রেশ করুন</span>
        </Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">মোট ব্যবহারকারী</span>
            <div className="h-9 w-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.totalUsers ?? 0}</div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>সাসপেন্ডেড: <strong className="text-rose-600">{stats?.suspendedUsers ?? 0}</strong></span>
          </div>
        </div>

        {/* Providers Verification Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">প্রোভাইডার ভেরিফিকেশন</span>
            <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.activeProviders ?? 0}</div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-amber-700 font-bold">পেন্ডিং রিভিও: {stats?.pendingProviders ?? 0}</span>
            <Link href="/admin/providers" className="text-emerald-600 font-bold hover:underline">
              রিভিউ করুন →
            </Link>
          </div>
        </div>

        {/* Jobs Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">জব মার্কেটপ্লেস</span>
            <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.totalJobs ?? 0}</div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>চলমান: <strong className="text-emerald-600">{stats?.inProgressJobs ?? 0}</strong></span>
            <span>•</span>
            <span>সম্পন্ন: <strong className="text-blue-600">{stats?.completedJobs ?? 0}</strong></span>
          </div>
        </div>

        {/* Payouts Pending Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">পেন্ডিং পেআউট</span>
            <div className="h-9 w-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">৳ {stats?.pendingPayoutsAmount ?? 0}</div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-purple-700 font-bold">{stats?.pendingPayoutsCount ?? 0} টি অনুরোধ</span>
            <Link href="/admin/payouts" className="text-emerald-600 font-bold hover:underline">
              অনুমোদন →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/providers">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-500 transition shadow-xs space-y-3 group cursor-pointer">
            <div className="flex items-center justify-between">
              <Badge variant="warning">অ্যাকশন প্রয়োজন</Badge>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">প্রোভাইডার কেওয়াইসি যাচাই</h3>
            <p className="text-xs text-slate-500">নতুন সেবাদাতাদের জাতীয় পরিচয়পত্র ও প্রোফাইল যাচাই করুন</p>
          </div>
        </Link>

        <Link href="/admin/payouts">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-500 transition shadow-xs space-y-3 group cursor-pointer">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">ফাইন্যান্স</Badge>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">উপার্জন পেআউট অনুমোদন</h3>
            <p className="text-xs text-slate-500">প্রোভাইডারদের বিকাশ/রকেট/ব্যাংক পেআউট রিকোয়েস্ট প্রক্রিয়া করুন</p>
          </div>
        </Link>

        <Link href="/admin/audit-logs">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-500 transition shadow-xs space-y-3 group cursor-pointer">
            <div className="flex items-center justify-between">
              <Badge variant="verified">সিকিউরিটি</Badge>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">সিস্টেম অডিট লগ</h3>
            <p className="text-xs text-slate-500">অ্যাডমিন কর্মকাণ্ডের অপরিবর্তনীয় রেকর্ড ব্রাউজ করুন</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
