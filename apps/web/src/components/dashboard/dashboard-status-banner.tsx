'use client';

import * as React from 'react';
import Link from 'next/link';
import { Clock, AlertTriangle, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@kajlagbe/ui';

export interface DashboardStatusBannerProps {
  status: string;
  isEmailVerified: boolean;
  role: string;
}

export function DashboardStatusBanner({
  status,
  isEmailVerified,
  role,
}: DashboardStatusBannerProps) {
  if (status === 'PENDING_REVIEW') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Clock className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-amber-900">
              প্রোফাইল পর্যালোচনাধীন রয়েছে (Under Review)
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              আপনার {role === 'BUSINESS' ? 'কোম্পানি' : 'প্রোভাইডার'} প্রোফাইলটি বর্তমানে ভেরিফিকেশন টিম কর্তৃক যাচাই করা হচ্ছে। খুব শীঘ্রই সক্রিয় করা হবে।
            </p>
          </div>
        </div>

        <Link href="/help" className="shrink-0">
          <Button variant="outline" size="sm" className="bg-white hover:bg-amber-100 border-amber-300 text-amber-900">
            সহায়তা কেন্দ্র
          </Button>
        </Link>
      </div>
    );
  }

  if (!isEmailVerified) {
    return (
      <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4 sm:p-5 text-sky-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
            <Mail className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-sky-900">ইমেইল ভেরিফিকেশন সম্পন্ন করুন</h4>
            <p className="text-xs text-sky-800 leading-relaxed">
              আপনার অ্যাকাউন্টের সম্পূর্ণ নিরাপত্তা ও নোটিফিকেশন পেতে ইমেইল নিশ্চিত করুন।
            </p>
          </div>
        </div>

        <Link href="/verify-email" className="shrink-0">
          <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white">
            যাচাই করুন
          </Button>
        </Link>
      </div>
    );
  }

  return null;
}
