'use client';

import * as React from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck,
  Scale,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';

interface AdminDisputeItem {
  id: string;
  ticketRef: string;
  complainantRole: 'CUSTOMER' | 'PROVIDER';
  complainantName: string;
  respondentName: string;
  category: string;
  description: string;
  claimedAmount: number;
  status: 'PENDING_INVESTIGATION' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
}

const MOCK_DISPUTES: AdminDisputeItem[] = [
  {
    id: 'disp-001',
    ticketRef: 'DISP-2026-1049',
    complainantRole: 'CUSTOMER',
    complainantName: 'রাশেদুল ইসলাম',
    respondentName: 'মো. রফিকুল ইসলাম (এসি টেকনিশিয়ান)',
    category: 'অসম্পূর্ণ কাজ ও পার্টস ইস্যু',
    description: 'এসি ওয়াশ করার পর ইনডোর ইউনিট থেকে পানি ঝরছে। প্রোভাইডার কল রিসিভ করছেন না।',
    claimedAmount: 1800,
    status: 'PENDING_INVESTIGATION',
    createdAt: '২ দিন আগে',
  },
  {
    id: 'disp-002',
    ticketRef: 'DISP-2026-9921',
    complainantRole: 'PROVIDER',
    complainantName: 'আব্দুল করিম (ইলেকট্রিশিয়ান)',
    respondentName: 'ফয়সাল আহমেদ (গ্রাহক)',
    category: 'পেমেন্ট বকেয়া রাখা',
    description: 'সম্পূর্ণ ওয়্যারিং শেষ করার পর চুক্তি অনুযায়ী বকেয়া ১,৫০০ টাকা পেমেন্ট করা হয়নি।',
    claimedAmount: 1500,
    status: 'RESOLVED',
    createdAt: '৫ দিন আগে',
  },
];

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = React.useState<AdminDisputeItem[]>(MOCK_DISPUTES);
  const [selectedDispute, setSelectedDispute] = React.useState<AdminDisputeItem | null>(null);
  const [resolutionNotes, setResolutionNotes] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleResolve = (status: 'RESOLVED' | 'DISMISSED') => {
    if (!selectedDispute) return;
    setDisputes((prev) =>
      prev.map((d) => (d.id === selectedDispute.id ? { ...d, status } : d))
    );
    setSelectedDispute(null);
    setResolutionNotes('');
    setSuccessMsg(status === 'RESOLVED' ? 'অভিযোগ সমাধান ও পেমেন্ট সামঞ্জস্য করা হয়েছে!' : 'অভিযোগ খারিজ করা হয়েছে।');
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 mb-2">
              <ShieldAlert className="h-3.5 w-3.5 mr-1" />
              ডিসপিউট ও ফ্রড রিপোর্ট ট্রাইব্যুনাল
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              অভিযোগ ও বিরোধ নিষ্পত্তি কেন্দ্র
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              গ্রাহক ও প্রোভাইডারদের জমা পড়া অভিযোগ পরীক্ষা করুন, প্রমাণপত্র নিরীক্ষা করুন এবং সিদ্ধান্ত দিন।
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-800 font-semibold shadow-xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((d) => (
          <Card key={d.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-900 text-rose-300 px-3 py-1 rounded-lg">
                    {d.ticketRef}
                  </span>
                  <Badge
                    className={
                      d.status === 'PENDING_INVESTIGATION'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : d.status === 'RESOLVED'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }
                  >
                    {d.status === 'PENDING_INVESTIGATION' ? 'তদন্তাধীন' : d.status === 'RESOLVED' ? 'মীমাংসিত (Resolved)' : 'খারিজ (Dismissed)'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{d.createdAt}</span>
                </div>

                <h3 className="font-black text-slate-900 text-base">{d.category}</h3>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 font-medium leading-relaxed">
                  &quot;{d.description}&quot;
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold">
                  <p>অভিযোগকারী: <span className="font-bold text-slate-900">{d.complainantName}</span> ({d.complainantRole})</p>
                  <p>বিবাদী: <span className="font-bold text-rose-700">{d.respondentName}</span></p>
                </div>
              </div>

              <div className="text-right border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 space-y-2">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">দাবিকৃত পরিমাণ</span>
                  <span className="text-xl font-black text-rose-600">৳{d.claimedAmount.toLocaleString('bn-BD')}</span>
                </div>

                {d.status === 'PENDING_INVESTIGATION' && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setSelectedDispute(d)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    <Scale className="h-4 w-4 mr-1" />
                    তদন্ত ও সমাধান করুন
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Resolution Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b pb-2">অভিযোগ সমাধান করুন</h3>
            <p className="text-xs text-slate-600">
              টিকিট <span className="font-mono font-bold">{selectedDispute.ticketRef}</span> এর বিষয়ে সিদ্ধান্ত দিন।
            </p>

            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="অ্যাডমিন সিদ্ধান্তের সারসংক্ষেপ লিখুন..."
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              rows={3}
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setSelectedDispute(null)}>
                বাতিল
              </Button>
              <Button
                type="button"
                onClick={() => handleResolve('DISMISSED')}
                variant="ghost"
                className="text-rose-600 hover:bg-rose-50 text-xs font-bold"
              >
                অভিযোগ খারিজ
              </Button>
              <Button
                type="button"
                onClick={() => handleResolve('RESOLVED')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                মীমাংসা ও রিফান্ড অনুমোদন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
