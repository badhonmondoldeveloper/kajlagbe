'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bell,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Checkbox } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

export default function ProviderSettingsPage() {
  const [jobAlerts, setJobAlerts] = React.useState(true);
  const [smsAlerts, setSmsAlerts] = React.useState(true);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout
      title="প্রোভাইডার অ্যাকাউন্ট সেটিংস"
      subtitle="কাজের অ্যালার্ট নোটিফিকেশন ও অ্যাকাউন্ট নিরাপত্তা পরিচালনা করুন"
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
                <Bell className="h-4 w-4 text-emerald-600" /> কাজের অ্যালার্ট প্রেফারেন্স
              </CardTitle>
              <CardDescription>আপনার এলাকায় নতুন কাজ পোস্ট হলে কিভাবে সতর্কবার্তা পাবেন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Checkbox
                label="নিকটবর্তী নতুন কাজের ইনস্ট্যান্ট নোটিফিকেশন"
                checked={jobAlerts}
                onChange={(e) => setJobAlerts(e.target.checked)}
              />
              <Checkbox
                label="জরুরী কাজের জন্য SMS সতর্কতা গ্রহণ করুন"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" /> নিরাপত্তা ও লগইন
              </CardTitle>
              <CardDescription>পাসওয়ার্ড এবং দুই স্তরের নিরাপত্তা পরিচালনা</CardDescription>
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

        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 space-y-3">
          <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-600" /> প্রোভাইডার অ্যাকাউন্ট সাময়িক বিরতি
          </h4>
          <p className="text-xs text-rose-800 leading-relaxed max-w-xl">
            যদি আপনি কিছুদিনের জন্য কাজের কল গ্রহণ করতে না চান, তবে কাজের সময়সূচী থেকে &ldquo;ছুটিতে&rdquo; নির্বাচন করুন অথবা সাময়িক বিরতির আবেদন করুন।
          </p>
          <Button variant="danger" size="sm">
            বিরতির জন্য আবেদন করুন
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
