'use client';

import * as React from 'react';
import { Activity, Clock } from 'lucide-react';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardActivityFeed } from '../../../components/dashboard/dashboard-activity-feed';
import { useAuth } from '../../../context/auth-context';

export default function CustomerActivityPage() {
  const { user } = useAuth();

  const activities = [
    {
      id: 'act-1',
      type: 'SECURITY_EVENT',
      description: 'KajLagbe প্ল্যাটফর্মে অ্যাকাউন্ট নিবন্ধন সফল হয়েছে।',
      createdAt: user?.created_at || new Date().toISOString(),
    },
  ];

  return (
    <DashboardLayout
      title="অ্যাকাউন্ট অ্যাক্টিভিটি"
      subtitle="আপনার অ্যাকাউন্টের নিরাপত্তা ও সার্ভিস সংক্রান্ত সাম্প্রতিক সকল কার্যকলাপ"
    >
      <div className="max-w-3xl space-y-6">
        <DashboardActivityFeed activities={activities} />
      </div>
    </DashboardLayout>
  );
}

