'use client';

import * as React from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { useAuth } from '../../../context/auth-context';

export default function AccountPendingPage() {
  const { user, profile } = useAuth();
  const name = profile?.profile?.firstName || user?.user_metadata?.full_name || 'সেবাদাতা';

  return (
    <AuthCard
      title="অ্যাকাউন্ট পর্যালোচনাধীন রয়েছে"
      subtitle="আপনার তথ্যাদি আমাদের ভেরিফিকেশন টিম কর্তৃক যাচাই করা হচ্ছে"
      badge="স্ট্যাটাস: পেন্ডিং রিভিউ"
      footer={
        <div className="flex items-center justify-center gap-4">
          <Link href="/help" className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-emerald-700">
            <HelpCircle className="h-3.5 w-3.5" /> হেল্প সেন্টার
          </Link>
          <span>•</span>
          <Link href="/logout" className="font-semibold text-rose-600 hover:underline">
            লগআউট
          </Link>
        </div>
      }
    >
      <div className="space-y-6 text-center py-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 mx-auto border border-amber-200 shadow-xs">
          <Clock className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">
            ধন্যবাদ, {name}!
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            আপনার আবেদন সফলভাবে গৃহীত হয়েছে। সাধারণত <strong>১২ থেকে ২৪ ঘণ্টার মধ্যে</strong> আমাদের অপারেশন ও ভেরিফিকেশন টিম তথ্য যাচাই করে আপনার প্রোফাইল সক্রিয় করবে।
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 text-left space-y-2">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> পরবর্তী ধাপসমূহ:
          </span>
          <ul className="space-y-1 pl-5 list-disc text-slate-500">
            <li>ভেরিফিকেশন সম্পন্ন হলে আপনি ইমেইল বা SMS নোটিফিকেশন পাবেন।</li>
            <li>প্রোফাইল সক্রিয় হওয়ার সাথে সাথে আপনার ড্যাশবোর্ড আনলক হবে।</li>
            <li>কোনো তথ্যে সংশোধনের প্রয়োজন হলে সাপোর্ট টিম সরাসরি যোগাযোগ করবে।</li>
          </ul>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="outline" className="w-full" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              হোমপেজে ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}

