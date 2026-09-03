'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@kajlagbe/ui';

export interface ProfileCompletionCardProps {
  percentage: number;
  missingFields: {
    field: string;
    label: string;
    actionUrl: string;
  }[];
  role: string;
}

export function ProfileCompletionCard({
  percentage,
  missingFields,
  role,
}: ProfileCompletionCardProps) {
  if (percentage >= 100) return null;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              প্রোফাইল সম্পূর্ণ করুন ({percentage}%)
            </h4>
            <p className="text-[11px] text-slate-500">
              {role === 'INDIVIDUAL_PROVIDER'
                ? 'সম্পূর্ণ প্রোফাইল ৫ গুণ বেশি কাজের অফার ও বুকিং পায়'
                : 'সঠিক তথ্যে দ্রুততম সময়ে পছন্দের এলাকায় সার্ভিস পান'}
            </p>
          </div>
        </div>

        <span className="text-sm font-black text-emerald-700">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Missing items checklist */}
      {missingFields.length > 0 && (
        <div className="pt-1 space-y-1.5 border-t border-emerald-100/60">
          <span className="text-[11px] font-bold text-slate-700 block">বাকি রয়েছে:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {missingFields.slice(0, 4).map((item) => (
              <Link
                key={item.field}
                href={item.actionUrl}
                className="flex items-center justify-between rounded-xl bg-white border border-slate-200/80 p-2 text-xs text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40 transition group"
              >
                <span className="font-medium text-[11px]">{item.label}</span>
                <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-emerald-600 transition" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
