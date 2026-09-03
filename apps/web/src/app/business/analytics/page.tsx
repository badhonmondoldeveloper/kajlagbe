'use client';

import * as React from 'react';
import { BarChart3, Users, Wrench, MapPin, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../../components/dashboard/dashboard-stat-card';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';

export default function BusinessAnalyticsPage() {
  return (
    <DashboardLayout
      title="বিজনেস এনালিটিক্স ও রিপোর্ট"
      subtitle="কোম্পানির সামগ্রিক অপারেশনাল পরিসংখ্যান ও অগ্রগতি"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard
            title="মোট টেকনিশিয়ান"
            value="৬ জন"
            subtitle="নিযুক্ত কারিগর"
            icon={Users}
            variant="sky"
          />
          <DashboardStatCard
            title="সার্ভিস প্যাকেজ"
            value="৪টি"
            subtitle="ক্যাটালগে অন্তর্ভুক্ত"
            icon={Wrench}
            variant="emerald"
          />
          <DashboardStatCard
            title="সার্ভিস কভারেজ"
            value="২টি জেলা"
            subtitle="ঢাকা ও চট্টগ্রাম"
            icon={MapPin}
            variant="purple"
          />
          <DashboardStatCard
            title="অপারেশন রেট"
            value="১০০%"
            subtitle="সক্রিয় সার্ভিস"
            icon={TrendingUp}
            variant="amber"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">মাসিক রেভিনিউ ও করপোরেট বুকিং অ্যানালিটিক্স</CardTitle>
            <CardDescription>করপোরেট এসক্রো পেমেন্ট ও ইনভয়েস সংক্রান্ত পূর্ণাঙ্গ রিপোর্ট</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardEmptyState
              icon={BarChart3}
              title="এনালিটিক্স ট্র্যাকিং সক্রিয় রয়েছে"
              description="করপোরেট চুক্তি ও কাস্টমার অর্ডার সম্পন্ন হলে বিস্তারিত গ্রাফিক্যাল রিপোর্ট ও রেভিনিউ অ্যানালাইসিস এখানে প্রদর্শিত হবে।"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
