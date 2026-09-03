'use client';

import * as React from 'react';
import { TrendingUp, Eye, Search, CheckCircle2, Clock, Award, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../../components/dashboard/dashboard-stat-card';

export default function ProviderPerformancePage() {
  return (
    <DashboardLayout
      title="পারফরম্যান্স ও অগ্রগতি"
      subtitle="আপনার প্রোফাইলের ভিউ, রেসপন্স রেট ও সফলতার মেট্রিক্স"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard
            title="প্রোফাইল ভিউ"
            value="২৪"
            subtitle="গত ৩০ দিনে"
            icon={Eye}
            variant="emerald"
          />
          <DashboardStatCard
            title="সার্চে উপস্থিতি"
            value="৭৮"
            subtitle="ক্যাটাগরি সার্চে"
            icon={Search}
            variant="sky"
          />
          <DashboardStatCard
            title="রেসপন্স রেট"
            value="৯৮%"
            subtitle="১ ঘণ্টার মধ্যে উত্তর"
            icon={Clock}
            variant="purple"
          />
          <DashboardStatCard
            title="কাজের মান স্কোর"
            value="১০০%"
            subtitle="জিরো ডিসপিউট"
            icon={Award}
            variant="amber"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> নির্ভরযোগ্যতার মানদণ্ড (Trust Indicators)
            </CardTitle>
            <CardDescription>গ্রাহকদের চোখে আপনার প্রোফাইলের র‍্যাঙ্কিং বৃদ্ধিকারী বিষয়সমূহ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'জাতীয় পরিচয়পত্র (NID) ভেরিফিকেশন', status: 'সম্পন্ন', color: 'text-emerald-700 bg-emerald-50' },
              { title: 'মোবাইল নম্বর নিশ্চিতকরণ', status: 'সম্পন্ন', color: 'text-emerald-700 bg-emerald-50' },
              { title: 'সার্ভিস ও রেট ক্যাটালগ সক্রিয়', status: 'সম্পন্ন', color: 'text-emerald-700 bg-emerald-50' },
              { title: 'কাজের ছবি ও পোর্টফোলিও', status: 'সম্পন্ন', color: 'text-emerald-700 bg-emerald-50' },
            ].map((ind, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 text-xs">
                <span className="font-bold text-slate-800">{ind.title}</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold ${ind.color}`}>{ind.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

