'use client';

import * as React from 'react';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  FileText,
  MapPin,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { useAuth } from '../../../context/auth-context';
import { DIVISIONS } from '../../../data';

export default function BusinessProfilePage() {
  const { user, profile, refreshProfile } = useAuth();

  const [businessName, setBusinessName] = React.useState(user?.user_metadata?.businessName || 'ডেল্টা সার্ভিস সলিউশনস লিমিটেড');
  const [tradeLicense, setTradeLicense] = React.useState('TRAD/DSCC/019283/2023');
  const [description, setDescription] = React.useState('আমরা ঢাকায় বিশ্বস্ত ও রেজিস্টার্ড সার্ভিস প্রতিষ্ঠান। আবাসিক ও বাণিজ্যিক প্রতিষ্ঠানে টেকনিশিয়ান সার্ভিস প্রদান করি।');
  const [contactEmail, setContactEmail] = React.useState(user?.email || 'contact@deltaservice.com');
  const [contactPhone, setContactPhone] = React.useState(user?.phone || user?.user_metadata?.phone || '01712345678');
  const [website, setWebsite] = React.useState('https://deltaservice.com');
  const [division, setDivision] = React.useState('Dhaka');
  const [officeAddress, setOfficeAddress] = React.useState('বাড়ি # ১২, রোড # ৪, গুলশান-১, ঢাকা');
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    setTimeout(async () => {
      await refreshProfile();
      setLoading(false);
      setFeedback({ type: 'success', text: 'কোম্পানি প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' });
    }, 600);
  };

  return (
    <DashboardLayout
      title="কোম্পানি প্রোফাইল ব্যবস্থাপনা"
      subtitle="আপনার প্রতিষ্ঠানের প্রাতিষ্ঠানিক তথ্য ও লাইসেন্স বিবরণ পরিচালনা করুন"
    >
      <div className="max-w-3xl space-y-6">
        {feedback && (
          <div
            className={`flex items-start gap-2.5 rounded-2xl border p-4 text-xs font-medium ${
              feedback.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-rose-200 bg-rose-50 text-rose-800'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <p>{feedback.text}</p>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity & License */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">প্রাতিষ্ঠানিক তথ্য</CardTitle>
              <CardDescription>কোম্পানির নাম ও সরকারি নিবন্ধন তথ্য</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 font-bold">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{businessName}</h4>
                    <span className="text-xs text-slate-500">ট্রেড লাইসেন্স: {tradeLicense}</span>
                  </div>
                </div>
                <Badge variant="verified">Verified Enterprise</Badge>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">প্রতিষ্ঠানের পুরো নাম</label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  leftIcon={<Building2 className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">ট্রেড লাইসেন্স নম্বর</label>
                <Input
                  value={tradeLicense}
                  onChange={(e) => setTradeLicense(e.target.value)}
                  leftIcon={<FileText className="h-4 w-4" />}
                  disabled
                  className="bg-slate-100/80 text-slate-600 cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400">লাইসেন্স নম্বর পরিবর্তনের জন্য সাপোর্ট টিমে যোগাযোগ করুন।</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">কোম্পানির বিবরণ ও সার্ভিস ওভারভিউ</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-sky-500 focus:outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">অফিসিয়াল যোগাযোগ</CardTitle>
              <CardDescription>গ্রাহক ও করপোরেট ক্লায়েন্টদের জন্য অফিসিয়াল যোগাযোগ চ্যানেল</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">অফিসিয়াল ইমেইল</label>
                  <Input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    leftIcon={<Mail className="h-4 w-4" />}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">হটলাইন / মোবাইল নম্বর</label>
                  <Input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    leftIcon={<Phone className="h-4 w-4" />}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">অফিসিয়াল ওয়েবসাইট (ঐচ্ছিক)</label>
                <Input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  leftIcon={<Globe className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Headquarters Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">প্রধান কার্যালয় ও ঠিকানা</CardTitle>
              <CardDescription>হেড অফিসের বিভাগ ও বিস্তারিত ঠিকানা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">বিভাগ</label>
                <Select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  options={DIVISIONS.map((d) => ({ value: d.id, label: d.name }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">অফিসের পূর্ণ ঠিকানা</label>
                <Input
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              leftIcon={<Save className="h-4 w-4" />}
            >
              কোম্পানি প্রোফাইল সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

