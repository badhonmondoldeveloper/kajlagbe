'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FileText,
  MapPin,
  Coins,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowLeft,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';

export default function ProviderApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const appId = params?.id as string;

  const [status, setStatus] = React.useState('SUBMITTED');
  const [isWithdrawing, setIsWithdrawing] = React.useState(false);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setStatus('WITHDRAWN');
      setIsWithdrawing(false);
    }, 600);
  };

  return (
    <DashboardLayout
      title="আবেদনপত্রের বিস্তারিত"
      subtitle="আপনার জমাকৃত আবেদন ও দরপ্রস্তাবের অবস্থা"
    >
      <div className="space-y-6 max-w-4xl">
        <Link
          href="/provider/applications"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>আমার আবেদন তালিকায় ফিরে যান</span>
        </Link>

        {/* Application Status Banner */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {status === 'SUBMITTED' && <Badge variant="default">পর্যালোচনাধীন (Submitted)</Badge>}
              {status === 'SHORTLISTED' && <Badge variant="verified">শর্টলিস্টেড (Shortlisted)</Badge>}
              {status === 'ACCEPTED' && <Badge variant="verified">গৃহীত (Accepted)</Badge>}
              {status === 'WITHDRAWN' && <Badge variant="secondary">প্রত্যাহারকৃত (Withdrawn)</Badge>}
            </div>
            <span className="text-xs text-slate-400 font-medium">১ ঘণ্টা আগে জমা দেওয়া হয়েছে</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold">কাজের শিরোনাম:</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              ৩টি ইনভার্টার এসি ইন্সটলেশন ও কপার পাইপ ওয়্যারিং
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            <div className="rounded-2xl bg-slate-50 p-3.5 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">আপনার প্রস্তাবিত ফি</span>
              <h4 className="text-base font-black text-emerald-800">৳ ১,৫০০</h4>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3.5 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">আনুমানিক সময়</span>
              <h4 className="text-base font-bold text-slate-900">১ দিন</h4>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3.5 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">কাজের এলাকা</span>
              <h4 className="text-base font-bold text-slate-900">মিরপুর-১০, ঢাকা</h4>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-xs font-bold text-slate-700">আপনার প্রেরিত বার্তা:</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              &ldquo;আমি ১০ বছর ধরে ডেল্টা সার্ভিস ও অন্যান্য প্রতিষ্ঠানে এসি ইন্সটলেশন ও কপার পাইপিংয়ের কাজ করেছি। যথাযথ প্রেসার টেস্ট ও ভ্যাকুয়াম নিশ্চিত করে দ্রুত সম্পন্ন করব।&rdquo;
            </p>
          </div>

          {status === 'SUBMITTED' && (
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleWithdraw}
                isLoading={isWithdrawing}
                className="text-rose-600 hover:bg-rose-50"
              >
                আবেদন প্রত্যাহার করুন
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
