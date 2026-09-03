'use client';

import * as React from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../components/dashboard/dashboard-stat-card';
import { DashboardEmptyState } from '../../components/dashboard/dashboard-empty-state';

export default function ModeratorPortalPage() {
  return (
    <DashboardLayout
      title="মডারেশন ও ভেরিফিকেশন প্যানেল"
      subtitle="জাতীয় পরিচয়পত্র, ট্রেড লাইসেন্স ও রিভিউ অডিট কনসোল"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard
            title="অপেক্ষমান NID"
            value="০"
            subtitle="যাচাইয়ের অপেক্ষায়"
            icon={FileCheck}
            variant="amber"
          />
          <DashboardStatCard
            title="ট্রেড লাইসেন্স"
            value="০"
            subtitle="কোম্পানি আবেদন"
            icon={ShieldCheck}
            variant="sky"
          />
          <DashboardStatCard
            title="ফ্ল্যাগড রিভিউ"
            value="০"
            subtitle="তদন্তের অপেক্ষায়"
            icon={AlertTriangle}
            variant="purple"
          />
          <DashboardStatCard
            title="যাচাইকৃত প্রোফাইল"
            value="০"
            subtitle="সফল ভেরিফিকেশন"
            icon={CheckCircle2}
            variant="emerald"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">ভেরিফিকেশন কিউ (Verification Queue)</CardTitle>
            <CardDescription>প্রোভাইডার ও বিজনেস ডকুমেন্টের অডিট তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardEmptyState
              icon={ShieldCheck}
              title="কোনো নথি পর্যালোচনার জন্য অপেক্ষমান নেই"
              description="সকল নথিপত্র এবং রিভিউ মডারেশন সফলভাবে হালনাগাদ করা হয়েছে।"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
