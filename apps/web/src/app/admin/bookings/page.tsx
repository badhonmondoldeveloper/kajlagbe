'use client';

import * as React from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';

interface AdminBookingItem {
  id: string;
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  providerName: string;
  serviceTitle: string;
  agreedPrice: number;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  scheduledDate: string;
  location: string;
}

const MOCK_BOOKINGS: AdminBookingItem[] = [
  {
    id: 'bk-101',
    bookingRef: 'BK-2026-99120',
    customerName: 'তানভীর আহমেদ',
    customerPhone: '01711223344',
    providerName: 'মো. রফিকুল ইসলাম',
    serviceTitle: '২টি স্প্লিট এসি ডিপ ওয়াশ ও গ্যাস ফিক্স',
    agreedPrice: 3200,
    status: 'CONFIRMED',
    scheduledDate: 'আজ বিকেল ৪:০০ টা',
    location: 'মিরপুর-১০, ঢাকা',
  },
  {
    id: 'bk-102',
    bookingRef: 'BK-2026-88310',
    customerName: 'মাহমুদুল হাসান',
    customerPhone: '01822334455',
    providerName: 'আব্দুল করিম (ইলেকট্রিশিয়ান)',
    serviceTitle: 'মেইন সুইচ সার্কিট ট্রাবলশুটিং',
    agreedPrice: 1500,
    status: 'IN_PROGRESS',
    scheduledDate: 'গতকাল বিকেল ৩:০০ টা',
    location: 'উত্তরা সেক্টর-৭, ঢাকা',
  },
  {
    id: 'bk-103',
    bookingRef: 'BK-2026-77211',
    customerName: 'সাদিয়া তাসনিম',
    customerPhone: '01933445566',
    providerName: 'হাসান মাহমুদ (প্লাম্বার)',
    serviceTitle: 'বাথরুম ফিটিং ও পাইপ লিক মেরামত',
    agreedPrice: 2000,
    status: 'COMPLETED',
    scheduledDate: '৩ দিন আগে',
    location: 'ধানমন্ডি-২৭, ঢাকা',
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = React.useState<AdminBookingItem[]>(MOCK_BOOKINGS);
  const [filter, setFilter] = React.useState<string>('ALL');
  const [search, setSearch] = React.useState<string>('');

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === 'ALL' || b.status === filter;
    const matchesSearch =
      b.bookingRef.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.providerName.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
              <CalendarCheck className="h-3.5 w-3.5 mr-1" />
              মার্কেটপ্লেস বুকিং কন্ট্রোল প্যানেল
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              বুকিংস ও সার্ভিস অর্ডার মনিটরিং
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              গ্রাহক ও প্রোভাইডারের মধ্যকার সকল বুকিং স্ট্যাটাস, শিডিউল ও এগ্রিড প্রাইস মনিটর করুন।
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="রেফারেন্স, গ্রাহক বা প্রোভাইডার নাম..."
            className="pl-10 text-xs sm:text-sm rounded-2xl bg-white border-slate-200"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold overflow-x-auto w-full sm:w-auto">
          {['ALL', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl transition ${
                filter === st
                  ? 'bg-white text-slate-900 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {st === 'ALL'
                ? 'সকল বুকিং'
                : st === 'CONFIRMED'
                ? 'কনফার্মড'
                : st === 'IN_PROGRESS'
                ? 'চলমান'
                : st === 'COMPLETED'
                ? 'সম্পন্ন'
                : 'বাতিল'}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((b) => (
          <Card key={b.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-900 text-emerald-300 px-3 py-1 rounded-lg">
                    {b.bookingRef}
                  </span>
                  <Badge
                    className={
                      b.status === 'CONFIRMED'
                        ? 'bg-sky-100 text-sky-800 border-sky-200'
                        : b.status === 'IN_PROGRESS'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : b.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border-rose-200'
                    }
                  >
                    {b.status === 'CONFIRMED' ? 'কনফার্মড' : b.status === 'IN_PROGRESS' ? 'চলমান (In-Progress)' : b.status === 'COMPLETED' ? 'সম্পন্ন' : 'বাতিল'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{b.scheduledDate}</span>
                </div>

                <h3 className="font-black text-slate-900 text-base">{b.serviceTitle}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                  <p>👤 গ্রাহক: <span className="font-bold text-slate-900">{b.customerName}</span> ({b.customerPhone})</p>
                  <p>👨‍🔧 টেকনিশিয়ান: <span className="font-bold text-emerald-700">{b.providerName}</span></p>
                  <p className="flex items-center gap-1 text-slate-500"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {b.location}</p>
                </div>
              </div>

              <div className="text-right border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                <span className="text-xs text-slate-400 font-semibold block">নির্ধারিত মোট ফি</span>
                <span className="text-xl font-black text-slate-900">৳{b.agreedPrice.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
