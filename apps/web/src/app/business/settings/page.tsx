'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bell,
  Building2,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Checkbox } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

export default function BusinessSettingsPage() {
  const [inquiryAlerts, setInquiryAlerts] = React.useState(true);
  const [teamUpdates, setTeamUpdates] = React.useState(true);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout
      title="কোম্পানি সেটিংস"
      subtitle="কর্পোরেট ক্লায়েন্ট নোটিফিকেশন ও টিম ডিসপ্যাচ সেটিংস পরিচালনা করুন"
    >
      <div className="max-w-3xl space-y-6">
        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-sky-600" /> করপোরেট নোটিফিকেশন প্রেফারেন্স
              </CardTitle>
              <CardDescription>ক্লায়েন্ট রিকোয়েস্ট ও ইনভয়েস সংক্রান্ত সতর্কবার্তা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Checkbox
                label="নতুন ক্লায়েন্ট ইনকোয়ারি ও টেন্ডারের সরাসরি নোটিফিকেশন"
                checked={inquiryAlerts}
                onChange={(e) => setInquiryAlerts(e.target.checked)}
              />
              <Checkbox
                label="টেকনিশিয়ানদের কাজের স্ট্যাটাস ও অ্যাসাইনমেন্ট আপডেট"
                checked={teamUpdates}
                onChange={(e) => setTeamUpdates(e.target.checked)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-sky-600" /> কোম্পানি অ্যাকাউন্ট নিরাপত্তা
              </CardTitle>
              <CardDescription>মাস্টার পাসওয়ার্ড ও অথেন্টিকেশন সেটিংস</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/settings/security">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  সিকিউরিটি সেন্টারে যান
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="md">
              সেটিংস সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
