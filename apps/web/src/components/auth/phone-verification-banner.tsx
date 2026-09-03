'use client';

import * as React from 'react';
import { Smartphone, Info } from 'lucide-react';

export function PhoneVerificationNotice({
  phone,
}: {
  phone?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 space-y-2 text-xs text-sky-950">
      <div className="flex items-center gap-2 font-bold text-sky-900">
        <Smartphone className="h-4 w-4 text-sky-600 shrink-0" />
        <span>বাংলাদেশি মোবাইল ভেরিফিকেশন আর্কিটেকচার</span>
      </div>
      <p className="leading-relaxed text-sky-800">
        {phone ? (
          <>
            আপনার মোবাইল নম্বর: <strong>{phone}</strong>। প্ল্যাটফর্ম সিকিউরিটির জন্য SMS গেটওয়ে কনফিগারেশনের মাধ্যমে শীঘ্রই সরাসরি OTP ভেরিফিকেশন যুক্ত করা হবে।
          </>
        ) : (
          'নিরাপদ লেনদেন ও যোগাযোগের জন্য আপনার সঠিক ১১ ডিজিটের মোবাইল নম্বর যুক্ত করুন।'
        )}
      </p>
      <div className="flex items-center gap-1.5 text-[11px] text-sky-700 pt-1">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>প্রোডাকশনে SSL Wireless / Greenweb SMS গেটওয়ে দ্বারা ওটিপি প্রেরিত হবে।</span>
      </div>
    </div>
  );
}

