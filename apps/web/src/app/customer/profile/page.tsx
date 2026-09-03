'use client';

import * as React from 'react';
import { User, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { Button, Input, Select, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Avatar } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { useAuth } from '../../../context/auth-context';
import { normalizeBangladeshiPhone } from '@kajlagbe/utils';
import { DIVISIONS } from '../../../data';

export default function CustomerProfilePage() {
  const { user, profile, refreshProfile } = useAuth();

  const [firstName, setFirstName] = React.useState(profile?.profile?.firstName || user?.user_metadata?.full_name?.split(' ')[0] || '');
  const [lastName, setLastName] = React.useState(profile?.profile?.lastName || user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '');
  const [phone, setPhone] = React.useState(user?.phone || user?.user_metadata?.phone || '');
  const [division, setDivision] = React.useState('Dhaka');
  const [address, setAddress] = React.useState('মিরপুর-১০, ঢাকা');
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const isEmailVerified = user?.email_confirmed_at || profile?.isEmailVerified;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!firstName.trim()) {
      setFeedback({ type: 'error', text: 'নামের প্রথম অংশ প্রদান করুন' });
      return;
    }

    if (phone.trim()) {
      const check = normalizeBangladeshiPhone(phone);
      if (!check.isValid) {
        setFeedback({ type: 'error', text: check.error || 'সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন' });
        return;
      }
    }

    setLoading(true);
    // Simulate save and refresh profile
    setTimeout(async () => {
      await refreshProfile();
      setLoading(false);
      setFeedback({ type: 'success', text: 'আপনার প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!' });
    }, 600);
  };

  return (
    <DashboardLayout
      title="কাস্টমার প্রোফাইল"
      subtitle="আপনার ব্যক্তিগত ও যোগাযোগের তথ্য পরিচালনা করুন"
    >
      <div className="max-w-3xl space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
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

          {/* Avatar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">প্রোফাইল ছবি</CardTitle>
              <CardDescription>গ্রাহক হিসেবে আপনার আইডেন্টিটি প্রদর্শন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-5">
                <Avatar fallback={firstName || 'গ্রাহক'} size="lg" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{firstName} {lastName}</h4>
                  <p className="text-xs text-slate-500">JPG, PNG বা WebP ফরম্যাট। সর্বোচ্চ ২ মেগাবাইট।</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ব্যক্তিগত তথ্য</CardTitle>
              <CardDescription>আপনার নাম এবং পরিচিতি</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    নামের প্রথম অংশ <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    placeholder="যেমন: তানভীর"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    leftIcon={<User className="h-4 w-4" />}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">নামের শেষ অংশ</label>
                  <Input
                    placeholder="যেমন: আহমেদ"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email (Readonly with badge) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">ইমেইল এড্রেস</label>
                  <Badge variant={isEmailVerified ? 'verified' : 'secondary'} size="sm">
                    {isEmailVerified ? 'ভেরিফাইড' : 'যাচাই বাকি'}
                  </Badge>
                </div>
                <Input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
                  className="bg-slate-100/80 text-slate-600 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">মোবাইল নম্বর</label>
                <Input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  leftIcon={<Phone className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">এলাকা ও ঠিকানা</CardTitle>
              <CardDescription>সার্ভিস দ্রুত পাওয়ার জন্য আপনার এলাকা ও প্রাইভেট ঠিকানা</CardDescription>
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
                <label className="text-xs font-bold text-slate-800">বাসা / অফিসের ঠিকানা</label>
                <Input
                  placeholder="যেমন: ফ্ল্যাট ৪বি, বাড়ি ১২, রোড ৩, মিরপুর-১০"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
                <p className="text-[11px] text-slate-400">
                  আপনার সম্পূর্ণ ঠিকানা কখনোই পাবলিক প্রোফাইলে প্রকাশ করা হবে না। শুধুমাত্র বুকিং নিশ্চিতকারী টেকনিশিয়ান দেখতে পারবেন।
                </p>
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
              পরিবর্তন সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

