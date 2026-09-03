'use client';

import * as React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import {
  Button,
  Card,
  Badge,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';

export default function PricingPage() {
  const plans = [
    {
      id: 'free',
      name: 'ফ্রি (Basic Plan)',
      nameEn: 'Starter',
      price: '৳ ০',
      period: 'আজীবন ফ্রি',
      description: 'ব্যক্তিগত সেবাদাতা ও নতুন টেকনিশিয়ানদের জন্য উপযুক্ত।',
      badge: 'জনপ্রিয় শুরু',
      features: [
        'বেসিক প্রোভাইডার প্রোফাইল',
        'মাসে ৫টি সরাসরি জব রিকোয়েস্ট গ্রহণ',
        'NID ভেরিফিকেশন সুবিধা',
        'কাস্টমার রিভিউ সংগ্রহ',
        'কমিউনিটি সাপোর্ট',
      ],
      cta: 'ফ্রি শুরু করুন',
      href: '/register',
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'প্রো (Pro Provider)',
      nameEn: 'Professional',
      price: '৳ ৯৯৯',
      period: 'প্রতি মাস',
      description: 'দক্ষ ফুল-টাইম টেকনিশিয়ান ও অধিক আয়ের জন্য।',
      badge: 'সেরা পছন্দ',
      features: [
        'ফ্রি প্ল্যানের সকল সুবিধা',
        'আনলিমিটেড জব অফারে আবেদন ও বিডিং',
        'সার্চ ফলাফলে শীর্ষ অগ্রাধিকার র‍্যাঙ্কিং',
        'প্রো ভেরিফাইড গোল্ড ব্যাজ',
        'বিস্তারিত পোর্টফোলিও আপলোড (১০টি ছবি)',
        'জরুরী কাস্টমার ডিসপ্যাচ অ্যালার্ট',
        'ডেডিকেটেড প্রোভাইডার সাপোর্ট',
      ],
      cta: 'প্রো প্ল্যান নিন',
      href: '/register',
      highlighted: true,
    },
    {
      id: 'business',
      name: 'বিজনেস (Agency / Team)',
      nameEn: 'Enterprise',
      price: '৳ ২,৪৯৯',
      period: 'প্রতি মাস',
      description: 'সার্ভিস কোম্পানি ও একাধিক টেকনিশিয়ান টিমের জন্য।',
      badge: 'টিম ও কোম্পানি',
      features: [
        'প্রো প্ল্যানের সকল সুবিধা',
        '১০ জন টেকনিশিয়ান টিম মেম্বার অ্যাকাউন্ট',
        'সেন্ট্রাল অ্যাডমিন জব অ্যাসাইন ড্যাশবোর্ড',
        'কর্পোরেট ইনভয়েসিং ও বিলিং সিস্টেম',
        'কাস্টমার স্যাটিস্ফ্যাকশন রিপোর্ট',
        'কোম্পানি ব্র্যান্ডেড প্রোফাইল পেজ',
        '২৪/৭ প্রায়োরিটি ম্যানেজার সাপোর্ট',
      ],
      cta: 'বিজনেস টিম শুরু করুন',
      href: '/contact',
      highlighted: false,
    },
  ];

  return (
    <Container className="py-8 sm:py-16 space-y-12">
      <PageHeader
        title="স্বচ্ছ ও ন্যায্য সাবস্ক্রিপশন প্ল্যান"
        description="আপনার কাজের পরিধি ও ব্যবসার প্রয়োজন অনুযায়ী সেরা প্ল্যানটি বেছে নিন। কোনো লুকানো চার্জ নেই।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'সাবস্ক্রিপশন ও মূল্য' },
            ]}
          />
        }
        badge={<Badge variant="default">ন্যায্য মূল্য নির্ধারণ</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((p) => (
          <Card
            key={p.id}
            className={`p-6 sm:p-8 flex flex-col justify-between relative ${
              p.highlighted
                ? 'border-2 border-emerald-600 shadow-xl ring-4 ring-emerald-50'
                : 'border-slate-200'
            }`}
          >
            {p.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge variant="verified" className="shadow-xs font-bold">
                  {p.badge}
                </Badge>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500">{p.description}</p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">{p.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/ {p.period}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  অন্তর্ভুক্ত সুবিধাসমূহ:
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link href={p.href}>
                <Button
                  variant={p.highlighted ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full font-bold"
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Pricing Clarification note */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-600 space-y-2 text-center max-w-2xl mx-auto">
        <p className="font-bold text-slate-800">গ্রাহকদের জন্য সার্ভিস চার্জ নীতি:</p>
        <p>
          গ্রাহকদের জন্য KajLagbe প্ল্যাটফর্মে ব্রাউজিং ও কাজ পোস্ট করা সম্পূর্ণ ফ্রি। শুধুমাত্র সেবা সম্পন্ন হওয়ার পর টেকনিশিয়ানের সাথে চুক্তি অনুযায়ী নির্ধারিত সার্ভিস ফি প্রদান করবেন।
        </p>
      </div>
    </Container>
  );
}
