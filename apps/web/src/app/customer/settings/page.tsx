'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bell,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Checkbox } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

export default function CustomerSettingsPage() {
  const [emailNotifs, setEmailNotifs] = React.useState(true);
  const [bookingUpdates, setBookingUpdates] = React.useState(true);
  const [marketingNotifs, setMarketingNotifs] = React.useState(false);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout
      title="অ্যাকাউন্ট সেটিংস"
      subtitle="নোটিফিকেশন, ভাষা ও গোপনীয়তা পছন্দসমূহ নির্ধারণ করুন"
    >
      <div className="max-w-3xl space-y-6">
        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-emerald-600" /> নোটিফিকেশন প্রেফারেন্স
              </CardTitle>
              <CardDescription>কোন কোন বিষয়ে আপনি সতর্কবার্তা পেতে চান</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Checkbox
                label="ইমেইলে সার্ভিস কোটেশন ও বুকিং আপডেট গ্রহণ করুন"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
              />
              <Checkbox
                label="জরুরী বুকিং স্ট্যাটাস ও টেকনিশিয়ান আসার নোটিফিকেশন (সুপারিশকৃত)"
                checked={bookingUpdates}
                onChange={(e) => setBookingUpdates(e.target.checked)}
              />
              <Checkbox
                label="বিশেষ অফার, ডিসকাউন্ট ভাউচার ও মাসিক নিউজলেটার"
                checked={marketingNotifs}
                onChange={(e) => setMarketingNotifs(e.target.checked)}
              />
            </CardContent>
          </Card>

          {/* Language Preference */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-600" /> ভাষা ও আঞ্চলিকতা
              </CardTitle>
              <CardDescription>ইন্টারফেসের ডিফল্ট ভাষা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-emerald-600 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800">
                  বাংলা (বাংলা)
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 cursor-not-allowed">
                  English (শীঘ্রই আসছে)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Security Center Link */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" /> নিরাপত্তা ও পাসওয়ার্ড
              </CardTitle>
              <CardDescription>পাসওয়ার্ড পরিবর্তন ও সক্রিয় ডিভাইস ব্যবস্থাপনা</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/settings/security">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  সিকিউরিটি সেন্টারে যান
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" size="md">
              সেটিংস সংরক্ষণ করুন
            </Button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 space-y-3">
          <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-600" /> অ্যাকাউন্ট নিষ্ক্রিয়করণ
          </h4>
          <p className="text-xs text-rose-800 leading-relaxed max-w-xl">
            আপনি চাইলে সাময়িকভাবে আপনার অ্যাকাউন্ট নিষ্ক্রিয় করতে পারেন। পরবর্তীতে পুনরায় লগইন করার মাধ্যমে অ্যাকাউন্টটি সক্রিয় করা যাবে।
          </p>
          <Button variant="danger" size="sm">
            নিষ্ক্রিয়করণের আবেদন করুন
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

