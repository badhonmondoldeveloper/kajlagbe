'use client';

import * as React from 'react';
import { Wallet, ArrowDownRight, Clock, ShieldCheck, DollarSign, History } from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../../components/dashboard/dashboard-stat-card';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';

export default function ProviderEarningsPage() {
  return (
    <DashboardLayout
      title="উপার্জন ও পেমেন্ট বিবরণ"
      subtitle="কাজের পেমেন্ট, এসক্রো ব্যালেন্স এবং উইথড্রল রেকর্ড"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DashboardStatCard
            title="উত্তোলনযোগ্য ব্যালেন্স"
            value="৳ ০.০০"
            subtitle="সরাসরি উত্তোলনযোগ্য"
            icon={Wallet}
            variant="emerald"
          />
          <DashboardStatCard
            title="পেন্ডিং ব্যালেন্স (এসক্রো)"
            value="৳ ০.০০"
            subtitle="চলমান কাজের পেমেন্ট"
            icon={Clock}
            variant="amber"
          />
          <DashboardStatCard
            title="মোট অর্জিত আয়"
            value="৳ ০.০০"
            subtitle="সর্বমোট সার্ভিস উপার্জন"
            icon={DollarSign}
            variant="sky"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>লেনদেন ও উইথড্রল ইতিহাস</span>
              <Button size="sm" variant="outline" disabled>
                উইথড্র রিকোয়েস্ট
              </Button>
            </CardTitle>
            <CardDescription>বিকাশ, নগদ বা ব্যাংক একাউন্টে ট্রান্সফারের তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardEmptyState
              icon={History}
              title="কোনো লেনদেন রেকর্ড পাওয়া যায়নি"
              description="আয়ের তথ্য কাজ সম্পন্ন ও এসক্রো পেমেন্ট সিস্টেম চালু হওয়ার পর এখানে স্বয়ংক্রিয়ভাবে দৃশ্যমান হবে।"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
