'use client';

import * as React from 'react';
import { Image as ImageIcon, Plus, Trash2, Tag, Calendar } from 'lucide-react';
import { Button, Input, Select, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { CATEGORIES } from '../../../data';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  date: string;
}

export default function ProviderPortfolioPage() {
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>([
    {
      id: 'port-1',
      title: 'গুলশান কমার্শিয়াল সেন্টারে সেন্ট্রাল ডিবি ওয়্যারিং',
      category: 'electrician',
      description: 'তিন তলা বাণিজ্যিক ভবনে থ্রি-ফেজ লাইন ওয়্যারিং ও সেফটি সার্কিট ব্রেকার সফলভাবে স্থাপন সম্পন্ন।',
      date: '২০২৪',
    },
    {
      id: 'port-2',
      title: 'উত্তরা রেসিডেন্সিয়াল ভবনে ৩টি ইনভার্টার এসি ইনস্টলেশন',
      category: 'ac-repair',
      description: 'কপার পাইপিং, গ্যাস প্রেসার টেস্ট এবং ইনডোর-আউটডোর ইউনিট সেফটি মাউন্টিং সম্পন্ন।',
      date: '২০২৪',
    },
  ]);

  const [isAdding, setIsAdding] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('electrician');
  const [newDesc, setNewDesc] = React.useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim() || 'কাজের বিবরণ',
      date: '২০২৪',
    };

    setPortfolio([newItem, ...portfolio]);
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const removePortfolio = (id: string) => {
    setPortfolio(portfolio.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout
      title="কাজের পোর্টফোলিও"
      subtitle="আপনার পূর্ববর্তী সফল কাজের বিবরণ ও ছবি প্রদর্শন করুন"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            মোট প্রজেক্ট: {portfolio.length}টি
          </span>
          <Button
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            {isAdding ? 'বাতিল করুন' : 'নতুন প্রজেক্ট যোগ করুন'}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardHeader>
              <CardTitle className="text-base">নতুন প্রজেক্টের তথ্য</CardTitle>
              <CardDescription>আপনার কাজের টাইটেল ও বিবরণ লিখুন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">কাজের শিরোনাম</label>
                  <Input
                    placeholder="যেমন: ৩ তলা ভবনে কমপ্লিট স্যানিটারি ও পাইপ ফিটিং"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">ক্যাটাগরি</label>
                    <Select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      options={CATEGORIES.map((c) => ({ value: c.slug, label: c.title }))}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">কাজের বিস্তারিত বিবরণ</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="কাজের ধরণ, চ্যালেঞ্জ এবং সমাধান..."
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm">
                    প্রজেক্ট সেভ করুন
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {portfolio.length === 0 ? (
          <DashboardEmptyState
            icon={ImageIcon}
            title="কোনো পোর্টফোলিও প্রজেক্ট নেই"
            description="পূর্বের কাজের ছবি ও বিবরণ যুক্ত করলে গ্রাহকদের আস্থা দ্রুত বৃদ্ধি পায়।"
            actionText="নতুন প্রজেক্ট যোগ করুন"
            onActionClick={() => setIsAdding(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" size="sm">
                      {item.category}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => removePortfolio(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                      title="ডিলিট"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {item.date}
                  </span>
                  <span className="text-emerald-700 font-bold">ভেরিফাইড প্রজেক্ট</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
