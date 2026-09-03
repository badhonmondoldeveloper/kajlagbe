'use client';

import * as React from 'react';
import { Wrench, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Button, Input, Select, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { CATEGORIES } from '../../../data';

export interface BusinessServiceItem {
  id: string;
  name: string;
  category: string;
  model: string;
  price?: number;
  isActive: boolean;
}

export default function BusinessServicesPage() {
  const [services, setServices] = React.useState<BusinessServiceItem[]>([
    { id: 'bsrv-1', name: 'করপোরেট এসি বাৎসরিক রক্ষণাবেক্ষণ চুক্তি (AMC)', category: 'ac-repair', model: 'চুক্তি ভিত্তিক কোটেশন', isActive: true },
    { id: 'bsrv-2', name: 'বাণিজ্যিক ভবন পূর্ণ ইলেকট্রিক্যাল সেফটি অডিট', category: 'electrician', model: 'চুক্তি ভিত্তিক কোটেশন', isActive: true },
    { id: 'bsrv-3', name: 'রেসিডেন্সিয়াল এসি মাস্টার ওয়াশ ও গ্যাস চার্জ', category: 'ac-repair', model: '৳ ৮০০ থেকে শুরু', price: 800, isActive: true },
  ]);

  const [isAdding, setIsAdding] = React.useState(false);
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('ac-repair');
  const [model, setModel] = React.useState('চুক্তি ভিত্তিক কোটেশন');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSrv: BusinessServiceItem = {
      id: `bsrv-${Date.now()}`,
      name: name.trim(),
      category,
      model,
      isActive: true,
    };

    setServices([newSrv, ...services]);
    setName('');
    setIsAdding(false);
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <DashboardLayout
      title="বিজনেস সার্ভিস ক্যাটালগ"
      subtitle="আপনার কোম্পানির আওতাভুক্ত সকল সার্ভিস ও করপোরেট প্যাকেজ পরিচালনা করুন"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            মোট অন্তর্ভুক্ত সার্ভিস: {services.length}টি
          </span>
          <Button
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            {isAdding ? 'বাতিল করুন' : 'নতুন প্যাকেজ যোগ করুন'}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-sky-200 bg-sky-50/30">
            <CardHeader>
              <CardTitle className="text-base">নতুন সার্ভিস প্যাকেজ</CardTitle>
              <CardDescription>কোম্পানি সার্ভিসের বিবরণ ও প্রাইসিং মডেল</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">সার্ভিসের নাম / প্যাকেজ</label>
                  <Input
                    placeholder="যেমন: বাণিজ্যিক অফিস নিয়মিত ক্লিনিং ও স্যানিটেশন"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">সার্ভিস খাত</label>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      options={CATEGORIES.map((c) => ({ value: c.slug, label: c.title }))}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">প্রাইসিং মডেল</label>
                    <Input
                      placeholder="যেমন: কোটেশন ভিত্তিক / প্রতি ভিজিট ৳ ৫০০"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm">
                    প্যাকেজ সেভ করুন
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Wrench className="h-5 w-5" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{srv.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-sky-700">{srv.model}</span>
                    <span>•</span>
                    <span className="capitalize">{srv.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => removeService(srv.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  title="ডিলিট"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
