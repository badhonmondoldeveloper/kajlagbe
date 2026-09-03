'use client';

import * as React from 'react';
import {
  User,
  Wrench,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Save,
  ShieldCheck,
  Eye,
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
  Avatar,
  Checkbox,
} from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { useAuth } from '../../../context/auth-context';
import { CATEGORIES, DIVISIONS } from '../../../data';

export default function ProviderProfilePage() {
  const { user, profile, refreshProfile } = useAuth();

  const [headline, setHeadline] = React.useState('মাস্টার ইলেকট্রিশিয়ান ও এসি টেকনিশিয়ান');
  const [bio, setBio] = React.useState('১০ বছরের অভিজ্ঞতাসম্পন্ন পেশাদার টেকনিশিয়ান। হাউস ওয়্যারিং, ডিবি বোর্ড স্থাপন ও এসি মেরামতে বিশেষজ্ঞ।');
  const [primaryCategory, setPrimaryCategory] = React.useState('electrician');
  const [experience, setExperience] = React.useState(8);
  const [division, setDivision] = React.useState('Dhaka');
  const [serviceAreas, setServiceAreas] = React.useState('মিরপুর, উত্তরা, ধানমন্ডি ও মোহাম্মদপুর');
  const [skills, setSkills] = React.useState('হাউস ওয়্যারিং, এসি গ্যাস রিফিল, শর্ট সার্কিট সমাধান, ফল্ট ডায়াগনোসিস');
  const [isPublicVisible, setIsPublicVisible] = React.useState(true);
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const userName = profile?.profile?.firstName || user?.user_metadata?.full_name || 'প্রোভাইডার';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    setTimeout(async () => {
      await refreshProfile();
      setLoading(false);
      setFeedback({ type: 'success', text: 'প্রোভাইডার প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' });
    }, 600);
  };

  return (
    <DashboardLayout
      title="প্রোভাইডার প্রোফাইল ব্যবস্থাপনা"
      subtitle="আপনার কাজের অভিজ্ঞতা, দক্ষতা ও এলাকা আপডেট করুন"
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
          {/* Identity & Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">আইডেন্টিটি ও ভেরিফিকেশন</CardTitle>
              <CardDescription>গ্রাহকদের আস্থার জন্য অফিসিয়াল ভেরিফিকেশন স্ট্যাটাস</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <Avatar fallback={userName} size="md" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{userName}</h4>
                    <span className="text-xs text-slate-500">{user?.email}</span>
                  </div>
                </div>
                <Badge variant="verified">NID ভেরিফাইড প্রোভাইডার</Badge>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  পেশাদার হেডলাইন (Headline) <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="যেমন: অভিজ্ঞ এসি ও ফ্রিজ সার্ভিস এক্সপার্ট"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  পেশাদার পরিচিতি (Bio) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Skills & Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">সার্ভিস খাত ও অভিজ্ঞতা</CardTitle>
              <CardDescription>আপনার প্রধান কাজের ধরণ ও কর্মদক্ষতা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">প্রধান ক্যাটাগরি</label>
                  <Select
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value)}
                    options={CATEGORIES.map((c) => ({ value: c.slug, label: c.title }))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">কাজের অভিজ্ঞতা (বছর)</label>
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={experience}
                    onChange={(e) => setExperience(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">বিশেষ দক্ষতাসমূহ</label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="কমা দিয়ে আলাদা করুন"
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Coverage Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">সার্ভিস এলাকা ও দৃশ্যমানতা</CardTitle>
              <CardDescription>যেসব এলাকায় আপনি সরাসরি সেবা প্রদান করতে প্রস্তুত</CardDescription>
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
                <label className="text-xs font-bold text-slate-800">নির্দিষ্ট কভারেজ এলাকা</label>
                <Input
                  value={serviceAreas}
                  onChange={(e) => setServiceAreas(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
              </div>

              <div className="pt-2">
                <Checkbox
                  label="পাবলিক সার্চ ও মার্কেটপ্লেস ডিরেক্টরিতে আমার প্রোফাইল সক্রিয় রাখুন"
                  checked={isPublicVisible}
                  onChange={(e) => setIsPublicVisible(e.target.checked)}
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
              প্রোফাইল সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
