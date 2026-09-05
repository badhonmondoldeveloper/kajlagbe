'use client';

import * as React from 'react';
import {
  UserCheck,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';

interface VerificationItem {
  id: string;
  providerName: string;
  email: string;
  phone: string;
  nidNumber: string;
  tradeLicense?: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const MOCK_VERIFICATIONS: VerificationItem[] = [
  {
    id: 'ver-01',
    providerName: 'মো. রফিকুল ইসলাম',
    email: 'rafiqul.ac@gmail.com',
    phone: '01712345678',
    nidNumber: '19922691234567890',
    tradeLicense: 'TRD-DH-2026-88',
    submittedAt: 'আজ সকাল ১০:০০ টা',
    status: 'PENDING',
  },
  {
    id: 'ver-02',
    providerName: 'আব্দুল করিম',
    email: 'karim.electric@gmail.com',
    phone: '01812345678',
    nidNumber: '19882699876543210',
    submittedAt: 'গতকাল বিকেল ৪:৩০ মিনিট',
    status: 'APPROVED',
  },
];

export default function AdminVerificationsPage() {
  const [items, setItems] = React.useState<VerificationItem[]>(MOCK_VERIFICATIONS);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleProcess = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    setSuccessMsg(status === 'APPROVED' ? 'প্রোভাইডার NID ও প্রোফাইল ভেরিফাইড করা হয়েছে!' : 'ভেরিফিকেশন প্রত্যাখান করা হয়েছে।');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
              <UserCheck className="h-3.5 w-3.5 mr-1" />
              প্রোভাইডার NID ও ডকুমেন্ট ভেরিফিকেশন কিউ
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              NID ও ট্রেড লাইসেন্স অনুমোদন কেন্দ্র
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              প্রোভাইডারদের জমা দেওয়া জাতীয় পরিচয়পত্র (NID) নম্বর ও ট্রেড লাইসেন্স ভেরিফাই করুন।
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

      {/* Verification Queue List */}
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      item.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : item.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border-rose-200'
                    }
                  >
                    {item.status === 'PENDING' ? 'অপেক্ষমাণ' : item.status === 'APPROVED' ? 'ভেরিফাইড' : 'প্রত্যাখ্যাত'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{item.submittedAt}</span>
                </div>

                <h3 className="font-black text-slate-900 text-base">{item.providerName}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                  <p>📧 ইমেইল: <span className="font-bold text-slate-900">{item.email}</span></p>
                  <p>📱 ফোন: <span className="font-bold text-slate-900">{item.phone}</span></p>
                  <p className="font-mono">🆔 NID নম্বর: <span className="font-bold text-emerald-700">{item.nidNumber}</span></p>
                  {item.tradeLicense && <p className="font-mono">📄 ট্রেড লাইসেন্স: <span className="font-bold text-sky-700">{item.tradeLicense}</span></p>}
                </div>
              </div>

              {item.status === 'PENDING' && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleProcess(item.id, 'APPROVED')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    অনুমোদন করুন
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleProcess(item.id, 'REJECTED')}
                    className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    বাতিল
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
