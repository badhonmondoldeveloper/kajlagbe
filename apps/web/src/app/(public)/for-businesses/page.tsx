'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Users,
  BarChart3,
  CalendarCheck,
  FileSpreadsheet,
} from 'lucide-react';
import {
  Button,
  Card,
  Badge,
  Container,
  SectionHeader,
} from '@kajlagbe/ui';

export default function ForBusinessesPage() {
  const businessFeatures = [
    {
      icon: Users,
      title: 'টিম ও টেকনিশিয়ান ম্যানেজমেন্ট',
      desc: 'আপনার কোম্পানির সকল টেকনিশিয়ানকে এক সেন্ট্রাল ড্যাশবোর্ড থেকে পরিচালনা করুন এবং কাজের শিডিউল মনিটর করুন।',
    },
    {
      icon: CalendarCheck,
      title: 'অটোমেটিক জব অ্যাসাইনমেন্ট',
      desc: 'গ্রাহকের বুকিং এলে নিকটস্থ উপলব্ধ টেকনিশিয়ানের কাছে সরাসরি কাজ পাঠিয়ে দ্রুত ডেলিভারি নিশ্চিত করুন।',
    },
    {
      icon: BarChart3,
      title: 'বিজনেস অ্যানালিটিক্স ও রিপোর্ট',
      desc: 'দৈনিক, সাপ্তাহিক ও মাসিক আয়ের স্বচ্ছ পরিসংখ্যান, কাস্টমার স্যাটিস্ফ্যাকশন রেট এবং কর্মী পারফরম্যান্স মেট্রিক।',
    },
    {
      icon: FileSpreadsheet,
      title: 'সেন্ট্রাল ইনভয়েসিং ও পেমেন্ট ট্র্যাকিং',
      desc: 'গ্রাহকদের অটো-জেনারেটেড প্রফেশনাল মেমো/ইনভয়েস প্রদান এবং কোম্পানির পেমেন্ট সরাসরি ব্যাংক একাউন্টে সংগ্রহ।',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24">
        <Container className="text-center max-w-3xl">
          <Badge variant="verified" className="bg-sky-500 text-slate-950 font-bold mb-4">
            KajLagbe Business
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            সার্ভিস কোম্পানি ও এজেন্সির জন্য <br />
            <span className="text-sky-400">আধুনিক ম্যানেজমেন্ট সলিউশন</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-300 leading-relaxed">
            এসি সার্ভিস কোম্পানি, ক্লিনিং এজেন্সি, শিফটিং বা মেইনটেন্যান্স ফার্ম — আপনার পুরো টিম, গ্রাহকের বুকিং ও ইনভয়েস ম্যানেজ করুন একটি মাত্র পাওয়ারফুল প্ল্যাটফর্মে।
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-sky-500 text-slate-950 hover:bg-sky-400 font-bold">
                কর্পোরেট ডেমো বুক করুন
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="text-white border-slate-700 hover:bg-slate-800">
                বিজনেস প্ল্যান দেখুন
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <Container>
        <SectionHeader
          badge={<Badge variant="default">এন্টারপ্রাইজ ফিচার</Badge>}
          title="আপনার সার্ভিস ব্যবসার পরিধি বাড়াতে যা কিছু দরকার"
          description="টিম পরিচালনা থেকে ইনভয়েস তৈরি — সবকিছু একটি ড্যাশবোর্ডে।"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessFeatures.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} className="p-6 space-y-3 flex flex-col justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 border border-sky-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* Corporate Maintenance Contract CTA */}
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <Badge variant="verified" size="sm">কর্পোরেট মেইনটেন্যান্স চুক্তি</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              অফিস বা ভবনের বাৎসরিক রক্ষণাবেক্ষণ চুক্তি (AMC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              আপনার কর্পোরেট ভবনের সার্বক্ষণিক এসি, ইলেকট্রিক ও স্যানিটারি সুরক্ষায় আমাদের সার্টিফাইড ভেন্ডর নেটওয়ার্কের সাথে যুক্ত হোন।
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="font-bold">
              কর্পোরেট প্রস্তাবনা পান
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
