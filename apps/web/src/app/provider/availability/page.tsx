'use client';

import * as React from 'react';
import { Clock, CheckCircle2, AlertCircle, Save, Calendar } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Checkbox } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

export default function ProviderAvailabilityPage() {
  const [status, setStatus] = React.useState<'available' | 'busy' | 'away'>('available');
  const [isAutoAccept, setIsAutoAccept] = React.useState(false);
  const [workingHours, setWorkingHours] = React.useState('সকাল ৮:০০ - রাত ৯:০০ (প্রতিদিন)');
  const [customNotice, setCustomNotice] = React.useState('শুক্রবার জুমার নামাজের সময় (১২:৩০ - ২:০০) সার্ভিস সাময়িক স্থগিত থাকে।');
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout
      title="কাজের সময়সূচী ও প্রাপ্যতা"
      subtitle="দৈনিক কাজের সময় ও সক্রিয় অবস্থা নির্ধারণ করুন"
    >
      <div className="max-w-3xl space-y-6">
        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>প্রাপ্যতার সময়সূচী সফলভাবে সংরক্ষিত হয়েছে!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Current Status Radio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" /> বর্তমান কাজের অবস্থা
              </CardTitle>
              <CardDescription>গ্রাহকরা আপনার প্রোফাইলে এই স্ট্যাটাস দেখতে পাবেন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: 'available', title: 'কাজের জন্য প্রস্তুত (Available Now)', desc: 'গ্রাহক সরাসরি আপনাকে কল বা মেসেজ পাঠাতে পারবেন।' },
                { id: 'busy', title: 'কাজে ব্যস্ত (Busy on a Job)', desc: 'চলমান কাজে ব্যস্ত থাকায় নতুন ইনস্ট্যান্ট কল গ্রহণ করা হবে না।' },
                { id: 'away', title: 'সাময়িক ছুটিতে (Away / Off-Duty)', desc: 'বর্তমানে নতুন কোনো কাজের আবেদন নেওয়া হবে না।' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setStatus(opt.id as any)}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    status === opt.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{opt.title}</h4>
                    {status === opt.id && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Schedule Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-600" /> কাজের দৈনিক সময়সূচী
              </CardTitle>
              <CardDescription>আপনার সাধারণ সেবাদানের সময়কাল</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">দৈনিক কর্মঘণ্টা</label>
                <Input
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">বিশেষ ছুটির বা নোটিশ বার্তা</label>
                <Input
                  value={customNotice}
                  onChange={(e) => setCustomNotice(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Checkbox
                  label="ইনস্ট্যান্ট বুকিং অটো-অ্যাকসেপ্ট সক্রিয় করুন (উপযুক্ত হলে স্বয়ংক্রিয়ভাবে বুকিং নিশ্চিত হবে)"
                  checked={isAutoAccept}
                  onChange={(e) => setIsAutoAccept(e.target.checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              leftIcon={<Save className="h-4 w-4" />}
            >
              সময়সূচী সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

