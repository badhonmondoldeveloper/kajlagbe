'use client';

import * as React from 'react';
import { Headphones, Shield, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../components/dashboard/dashboard-stat-card';
import { DashboardEmptyState } from '../../components/dashboard/dashboard-empty-state';

export default function SupportPortalPage() {
  return (
    <DashboardLayout
      title="সাপোর্ট এজেন্ট কনসোল"
      subtitle="গ্রাহক ও প্রোভাইডারদের সহায়তা এবং টিকিট ম্যানেজমেন্ট সিস্টেম"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard
            title="ওপেন টিকিট"
            value="০"
            subtitle="অপেক্ষমান প্রশ্ন"
            icon={Headphones}
            variant="sky"
          />
          <DashboardStatCard
            title="চলমান তদন্ত"
            value="০"
            subtitle="ডিসপিউট কেস"
            icon={AlertCircle}
            variant="amber"
          />
          <DashboardStatCard
            title="সমাধানকৃত টিকিট"
            value="০"
            subtitle="সফল সাপোর্ট"
            icon={CheckCircle2}
            variant="emerald"
          />
          <DashboardStatCard
            title="গড় রেসপন্স টাইম"
            value="৫ মিনিট"
            subtitle="সাপোর্ট এসএলএ"
            icon={MessageSquare}
            variant="purple"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">সাপোর্ট টিকিট কিউ (Queue)</CardTitle>
            <CardDescription>অ্যাসাইনকৃত গ্রাহক অভিযোগ ও অনুসন্ধানসমূহ</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardEmptyState
              icon={Headphones}
              title="কোনো সাপোর্ট টিকিট পেন্ডিং নেই"
              description="সকল গ্রাহক ও প্রোভাইডার অনুসন্ধান সফলভাবে পরিচালনা করা হয়েছে।"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

