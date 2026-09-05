'use client';

import * as React from 'react';
import {
  FileText,
  Save,
  CheckCircle2,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';

export default function AdminCmsPage() {
  const [heroHeading, setHeroHeading] = React.useState('আপনার প্রয়োজনের সঠিক সেবা, কাজ লাগবে এখন আপনার এলাকায়');
  const [heroSubheading, setHeroSubheading] = React.useState('এসি মেরামত, ইলেকট্রিশিয়ান, প্লাম্বার থেকে শুরু করে যে কোনো গৃহস্থালী সেবার জন্য ভেরিফাইড টেকনিশিয়ান খুঁজুন ৬৪ জেলায়।');
  const [saving, setSaving] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccessMsg('CMS কন্টেন্ট আপডেট সম্পন্ন হয়েছে!');
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
              <FileText className="h-3.5 w-3.5 mr-1" />
              CMS কন্টেন্ট ম্যানেজমেন্ট
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              হোমপেজ ও পাবলিক পেজ কন্টেন্ট এডিটর
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              হোমপেজের হিরো হেডিং, সেফটি টিপস ও গাইডলাইন টেক্সট অ্যাডমিন প্যানেল থেকে পরিবর্তন করুন।
            </p>
          </div>

          <Button
            type="submit"
            form="cms-form"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
          >
            <Save className="h-4 w-4 mr-1.5" />
            {saving ? 'সেভ হচ্ছে...' : 'কন্টেন্ট সেভ করুন'}
          </Button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-800 font-semibold shadow-xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form id="cms-form" onSubmit={handleSave} className="space-y-6">
        <Card className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b pb-3">
            <Edit3 className="h-4 w-4 text-emerald-600" />
            হোমপেজ হিরো টেক্সট কাস্টমাইজেশন
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">হিরো টাইটেল (Hero Title)</label>
            <Input
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="text-xs sm:text-sm font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">হিরো সাব-টাইটেল (Hero Subtitle)</label>
            <textarea
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              rows={3}
              required
            />
          </div>
        </Card>
      </form>
    </div>
  );
}
