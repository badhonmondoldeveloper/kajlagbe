'use client';

import * as React from 'react';
import { Star, MessageSquare, ShieldCheck, ThumbsUp } from 'lucide-react';
import { Button, Badge, Avatar, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';

export default function ProviderReviewsPage() {
  const reviews = [
    {
      id: 'rev-1',
      author: 'তানভীর আহমেদ',
      rating: 5,
      date: '৩ দিন আগে',
      service: 'হাউস ওয়্যারিং ও ডিবি মেরামত',
      comment: 'খুবই দক্ষ ও ভদ্র টেকনিশিয়ান। দ্রুত সময়ের মধ্যে ওয়্যারিংয়ের ফল্ট খুঁজে বের করে নিরাপদভাবে ঠিক করে দিয়েছেন। পুরো কাজ শেষে পরিষ্কারও করে গেছেন।',
    },
    {
      id: 'rev-2',
      author: 'রাফসান জামিল',
      rating: 5,
      date: '১ সপ্তাহ আগে',
      service: 'এসি গ্যাস রিফিল ও ওয়াশ',
      comment: 'সময়মতো পৌঁছেছেন এবং সঠিকভাবে প্রেশার টেস্ট করে গ্যাস রিফিল করেছেন। চমৎকার সার্ভিস!',
    },
  ];

  return (
    <DashboardLayout
      title="গ্রাহক রিভিউ ও রেটিং"
      subtitle="আপনার কাজের বিষয়ে গ্রাহকদের মূল্যবান মতামত ও ফিডব্যাক"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Rating Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1 p-6 text-center flex flex-col items-center justify-center space-y-2">
            <span className="text-4xl font-black text-slate-900">৫.০</span>
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-slate-500">মোট ২টি গ্রাহক রিভিউ</span>
          </Card>

          <Card className="md:col-span-2 p-6 space-y-2 justify-center flex flex-col">
            {[
              { stars: 5, count: 2, percent: 100 },
              { stars: 4, count: 0, percent: 0 },
              { stars: 3, count: 0, percent: 0 },
              { stars: 2, count: 0, percent: 0 },
              { stars: 1, count: 0, percent: 0 },
            ].map((r) => (
              <div key={r.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-bold text-slate-700 flex items-center gap-1">
                  {r.stars} <Star className="h-3 w-3 text-amber-500 fill-current" />
                </span>
                <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.percent}%` }} />
                </div>
                <span className="w-8 text-right text-slate-400">{r.count}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">সাম্প্রতিক রিভিউসমূহ ({reviews.length}টি)</h3>

          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar fallback={rev.author} size="md" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rev.author}</h4>
                    <span className="text-[11px] text-slate-400 block">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">{rev.service}</Badge>
                <Badge variant="verified" size="sm">ভেরিফাইড বুকিং</Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
