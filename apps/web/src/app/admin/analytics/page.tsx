'use client';

import * as React from 'react';
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';
import { Badge, Card } from '@kajlagbe/ui';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              গ্রোথ ও পারফরম্যান্স এনালাইটিক্স
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              প্ল্যাটফর্ম বিজনেস এনালাইটিক্স ড্যাশবোর্ড
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              ৬৪ জেলায় সার্ভিস গ্রোথ, পেমেন্ট ভলিউম ও প্রোভাইডার এক্টিভিটি ওভারভিউ।
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="rounded-3xl border border-slate-200 bg-white p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold">মোট নিবন্ধিত গ্রাহক</span>
          <p className="text-2xl font-black text-slate-900">১২,৪৫০+</p>
          <span className="text-[11px] text-emerald-600 font-bold">↑ ১৫% এই মাসে</span>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold">সক্রিয় প্রোভাইডার</span>
          <p className="text-2xl font-black text-emerald-600">৩,২০০+</p>
          <span className="text-[11px] text-emerald-600 font-bold">↑ ১০% এই মাসে</span>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold">মোট সম্পন্ন কাজ</span>
          <p className="text-2xl font-black text-slate-900">১৮,৬০০+</p>
          <span className="text-[11px] text-emerald-600 font-bold">↑ ২২% এই মাসে</span>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold">প্ল্যাটফর্ম রেভিনিউ ভলিউম</span>
          <p className="text-2xl font-black text-slate-900">৳ ৪.৫M</p>
          <span className="text-[11px] text-emerald-600 font-bold">↑ ১৮% গ্রোথ</span>
        </Card>
      </div>
    </div>
  );
}
