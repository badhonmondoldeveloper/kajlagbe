'use client';

import * as React from 'react';
import Link from 'next/link';
import { Star, MessageSquare, ShieldCheck, ThumbsUp, Wrench } from 'lucide-react';
import { Badge, Button } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = React.useState<any[]>([
    {
      id: 'rev-1',
      providerName: 'মোঃ রফিকুল ইসলাম',
      providerCategory: 'এসি মেরামত ও সার্ভিসিং',
      rating: 5,
      date: '৩ দিন আগে',
      comment: 'খুবই দক্ষ এবং পেশাদার টেকনিশিয়ান। সঠিক সময়ে এসে ইনভার্টার এসি ইন্সটলেশন সম্পন্ন করেছেন। কোনো লিকেজ নেই।',
      jobTitle: '৩টি ইনভার্টার এসি ইন্সটলেশন ও কপার পাইপ ওয়্যারিং',
    },
    {
      id: 'rev-2',
      providerName: 'আব্দুল করিম',
      providerCategory: 'ইলেকট্রিশিয়ান',
      rating: 5,
      date: '২ সপ্তাহ আগে',
      comment: 'ডিবি বোর্ডের ওয়্যারিং নিখুঁতভাবে ঠিক করেছেন এবং অতিরিক্ত সেফটি চেক করে দিয়েছেন।',
      jobTitle: 'বাসার মেইন ডিবি বোর্ড মেরামত',
    },
  ]);

  return (
    <DashboardLayout
      title="আমার দেওয়া রিভিউ ও রেটিং"
      subtitle="সার্ভিস সম্পন্ন করার পর প্রোভাইডারদের কাজের মূল্যায়নের তালিকা"
    >
      <div className="space-y-6 max-w-5xl">
        {reviews.length === 0 ? (
          <DashboardEmptyState
            icon={Star}
            title="কোনো রিভিউ দেওয়া হয়নি"
            description="যেকোনো সার্ভিস বা কাজ সম্পন্ন করার পর আপনার অভিজ্ঞতা ও মূল্যায়ন এখানে প্রদর্শিত হবে।"
            actionText="সেবা খুঁজুন"
            actionHref="/services"
          />
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">{rev.providerName}</h4>
                      <Badge variant="secondary" size="sm">{rev.providerCategory}</Badge>
                    </div>
                    <span className="text-xs text-slate-500">{rev.jobTitle}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rev.rating ? 'fill-current' : 'text-slate-300'}`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1.5">{rev.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

