'use client';

import * as React from 'react';
import { Wrench, Plus, Trash2, CheckCircle2, Tag, DollarSign } from 'lucide-react';
import { Button, Input, Select, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { CATEGORIES } from '../../../data';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isActive: boolean;
}

export default function ProviderServicesPage() {
  const [services, setServices] = React.useState<ServiceItem[]>([
    { id: 'srv-1', name: 'হাউস ওয়্যারিং ও ডিবি বোর্ড স্থাপন', category: 'electrician', price: 500, isActive: true },
    { id: 'srv-2', name: 'শর্ট সার্কিট ও ফল্ট ডায়াগনোসিস', category: 'electrician', price: 350, isActive: true },
    { id: 'srv-3', name: 'এসি বেসিক ওয়াশ ও মাস্টার সার্ভিসিং', category: 'ac-repair', price: 600, isActive: true },
  ]);

  const [isAdding, setIsAdding] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('electrician');
  const [newPrice, setNewPrice] = React.useState('400');

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      price: parseInt(newPrice) || 300,
      isActive: true,
    };

    setServices([newSrv, ...services]);
    setNewName('');
    setIsAdding(false);
  };

  const toggleStatus = (id: string) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <DashboardLayout
      title="সার্ভিস ক্যাটালগ ব্যবস্থাপনা"
      subtitle="যেসব সেবা আপনি প্রদান করেন তা পরিচালনা ও নতুন সেবা যোগ করুন"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            মোট সক্রিয় সার্ভিস: {services.filter((s) => s.isActive).length}টি
          </span>
          <Button
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            {isAdding ? 'বাতিল করুন' : 'নতুন সার্ভিস যোগ করুন'}
          </Button>
        </div>

        {/* Add Service Box */}
        {isAdding && (
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardHeader>
              <CardTitle className="text-base">নতুন সার্ভিস তথ্য</CardTitle>
              <CardDescription>গ্রাহকদের জন্য সেবার নাম ও প্রাথমিক ফি নির্ধারণ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-800">সার্ভিসের নাম</label>
                    <Input
                      placeholder="যেমন: সিলিং ফ্যান ও লাইট ফিটিং"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">প্রাথমিক ফি (৳)</label>
                    <Input
                      type="number"
                      min={100}
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="w-48">
                    <Select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      options={CATEGORIES.map((c) => ({ value: c.slug, label: c.title }))}
                    />
                  </div>
                  <Button type="submit" size="sm">
                    সার্ভিস সেভ করুন
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Services List */}
        {services.length === 0 ? (
          <DashboardEmptyState
            icon={Wrench}
            title="কোনো সার্ভিস যোগ করা হয়নি"
            description="আপনার প্রোভাইডার প্রোফাইলে সার্ভিস যুক্ত করুন যাতে গ্রাহকরা সরাসরি আপনাকে বুক করতে পারে।"
            actionText="নতুন সার্ভিস যোগ করুন"
            onActionClick={() => setIsAdding(true)}
          />
        ) : (
          <div className="space-y-3">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{srv.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-700">শুরু ৳ {srv.price}</span>
                      <span>•</span>
                      <span className="capitalize">{srv.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleStatus(srv.id)}
                    className={`px-3 py-1 text-xs font-bold rounded-xl transition ${
                      srv.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {srv.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </button>
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
        )}
      </div>
    </DashboardLayout>
  );
}
