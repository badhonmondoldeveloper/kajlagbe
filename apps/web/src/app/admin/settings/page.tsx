'use client';

import * as React from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  ShieldCheck,
  Percent,
  Phone,
  ToggleLeft,
  ToggleRight,
  Database,
  Lock,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';

export default function AdminSettingsPage() {
  const [commissionRate, setCommissionRate] = React.useState('10');
  const [supportHotline, setSupportHotline] = React.useState('09600-525524');
  const [supportEmail, setSupportEmail] = React.useState('support@kajlagbe.com');
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccessMsg('প্ল্যাটফর্ম সেটিংস সফলভাবে আপডেট হয়েছে!');
      setTimeout(() => setSuccessMsg(null), 3500);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
              <Settings className="h-3.5 w-3.5 mr-1" />
              প্ল্যাটফর্ম গ্লোবাল কনফিগারেশন
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              সিস্টেম সেটিংস ও কমিশন রুলস
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              প্ল্যাটফর্ম কমিশন হার, সাপোর্ট হটলাইন ও সিস্টেম স্ট্যাটাস নিয়ন্ত্রণ করুন।
            </p>
          </div>

          <Button
            type="submit"
            form="settings-form"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
          >
            <Save className="h-4 w-4 mr-1.5" />
            {saving ? 'সেভ হচ্ছে...' : 'সেটিংস সেভ করুন'}
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
      <form id="settings-form" onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Commission Config */}
          <Card className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Percent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">প্ল্যাটফর্ম কমিশন হার (%)</h3>
                <p className="text-xs text-slate-500">প্রোভাইডার বুকিং ও জব কমিশন চার্জ</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">কমিশন শতকরা হার (%)</label>
              <Input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                placeholder="10"
                className="text-xs sm:text-sm font-bold"
                required
              />
            </div>
          </Card>

          {/* Support Hotline Config */}
          <Card className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">সাপোর্ট চ্যানেল কন্টাক্ট</h3>
                <p className="text-xs text-slate-500">হটলাইন ও অফিসিয়াল হেল্পডেস্ক ইমেইল</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">হটলাইন নম্বর</label>
                <Input
                  value={supportHotline}
                  onChange={(e) => setSupportHotline(e.target.value)}
                  placeholder="09600-XXXXXX"
                  className="text-xs sm:text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">সাপোর্ট ইমেইল</label>
                <Input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="support@kajlagbe.com"
                  className="text-xs sm:text-sm"
                  required
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Maintenance Toggle Card */}
        <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">মেনটেইনেন্স মোড (Maintenance Mode)</h3>
                <p className="text-xs text-slate-500">জরুরী আপগ্রেডের সময় সাধারণ ইউজারদের জন্য সাইট সাময়িক পজ করুন</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className="text-slate-400 hover:text-emerald-600 transition"
            >
              {maintenanceMode ? (
                <ToggleRight className="h-9 w-9 text-rose-600" />
              ) : (
                <ToggleLeft className="h-9 w-9 text-slate-300" />
              )}
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
}
