'use client';

import * as React from 'react';
import { MapPin, Plus, Trash2, Building, CheckCircle2 } from 'lucide-react';
import { Button, Input, Select, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DIVISIONS } from '../../../data';

export interface LocationItem {
  id: string;
  title: string;
  division: string;
  address: string;
  isPrimary: boolean;
}

export default function BusinessLocationsPage() {
  const [locations, setLocations] = React.useState<LocationItem[]>([
    { id: 'loc-1', title: 'হেড অফিস ও সেন্ট্রাল সার্ভিস হাব', division: 'ঢাকা', address: 'বাড়ি # ১২, রোড # ৪, গুলশান-১, ঢাকা-১২১২', isPrimary: true },
    { id: 'loc-2', title: 'চট্টগ্রাম আঞ্চলিক হাব', division: 'চট্টগ্রাম', address: 'জিইসি মোড়, সিডিএ এভিনিউ, চট্টগ্রাম', isPrimary: false },
  ]);

  const [isAdding, setIsAdding] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [division, setDivision] = React.useState('Dhaka');
  const [address, setAddress] = React.useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !address.trim()) return;

    const newLoc: LocationItem = {
      id: `loc-${Date.now()}`,
      title: title.trim(),
      division: DIVISIONS.find((d) => d.id === division)?.name || 'ঢাকা',
      address: address.trim(),
      isPrimary: false,
    };

    setLocations([...locations, newLoc]);
    setTitle('');
    setAddress('');
    setIsAdding(false);
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id));
  };

  return (
    <DashboardLayout
      title="অফিস ও সার্ভিস কভারেজ হাব"
      subtitle="আপনার কোম্পানির প্রধান কার্যালয় ও আঞ্চলিক শাখাগুলো পরিচালনা করুন"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            মোট অফিস / হাব: {locations.length}টি
          </span>
          <Button
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            {isAdding ? 'বাতিল করুন' : 'নতুন শাখা যুক্ত করুন'}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-sky-200 bg-sky-50/30">
            <CardHeader>
              <CardTitle className="text-base">নতুন শাখার বিবরণ</CardTitle>
              <CardDescription>শাখার নাম, বিভাগ ও পূর্ণ ঠিকানা লিখুন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">শাখার নাম</label>
                    <Input
                      placeholder="যেমন: সিলেট বিভাগীয় হাব"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">বিভাগ</label>
                    <Select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      options={DIVISIONS.map((d) => ({ value: d.id, label: d.name }))}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">পূর্ণ ঠিকানা</label>
                  <Input
                    placeholder="হোল্ডিং, রোড, থানা ও জেলা..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm">
                    শাখা সেভ করুন
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 flex items-start justify-between gap-4 hover:border-slate-300 transition"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{loc.title}</h4>
                    {loc.isPrimary ? (
                      <Badge variant="verified" size="sm">হেড অফিস</Badge>
                    ) : (
                      <Badge variant="secondary" size="sm">আঞ্চলিক শাখা</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">{loc.address}</p>
                  <span className="text-[11px] text-slate-400 font-medium block">বিভাগ: {loc.division}</span>
                </div>
              </div>

              {!loc.isPrimary && (
                <button
                  type="button"
                  onClick={() => removeLocation(loc.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  title="ডিলিট"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

