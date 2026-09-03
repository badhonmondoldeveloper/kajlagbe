'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Star,
} from 'lucide-react';
import {
  Button,
  Card,
  Badge,
  Container,
  SectionContainer,
  SectionHeader,
  Accordion,
} from '@kajlagbe/ui';

export default function ForProvidersPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'নতুন ও নিয়মিত কাজের সুযোগ',
      desc: 'আপনার এলাকার শত শত গ্রাহকের সরাসরি সার্ভিস কল ও জব অফার পান। কাজের সন্ধানে আর বসে থাকতে হবে না।',
    },
    {
      icon: DollarSign,
      title: 'ন্যায্য ও সরাসরি উপার্জন',
      desc: 'গ্রাহকের সাথে সরাসরি মূল্য আলোচনা করুন। কাজ শেষে সম্পূর্ণ টাকা সরাসরি গ্রহণ করুন।',
    },
    {
      icon: ShieldCheck,
      title: 'ভেরিফাইড প্রোফাইল ও সম্মান',
      desc: 'NID ভেরিফিকেশনের মাধ্যমে এলাকায় একজন স্বীকৃত ও পেশাদার টেকনিশিয়ান হিসেবে ক্যারিয়ার গড়ে তুলুন।',
    },
    {
      icon: Star,
      title: 'কাস্টমার রিভিউ ও সুনাম',
      desc: 'ভালো কাজের মাধ্যমে ৫-স্টার রেটিং পেয়ে প্ল্যাটফর্মে টপ-রেটেড প্রোভাইডার হওয়ার সুযোগ।',
    },
  ];

  const faqs = [
    {
      question: 'প্রোভাইডার একাউন্ট খুলতে কি টাকা লাগে?',
      answer: 'না! প্রাথমিক প্রোভাইডার প্রোফাইল তৈরি ও বেসিক কাজ গ্রহণ সম্পূর্ণ ফ্রি। কোনো হিডেন চার্জ নেই।',
    },
    {
      question: 'ভেরিফিকেশনের জন্য কী কী ডকুমেন্ট লাগবে?',
      answer: 'আপনার জাতীয় পরিচয়পত্র (NID) এর ছবি, মোবাইল নম্বর এবং কাজের পূর্ববর্তী অভিজ্ঞতার বিবরণ প্রয়োজন হবে।',
    },
    {
      question: 'পেমেন্ট কীভাবে পাব?',
      answer: 'কাজ শেষে গ্রাহকের কাছ থেকে সরাসরি ক্যাশ অথবা বিকাশ/নগদ/ব্যাংকের মাধ্যমে ডিজিটাল পেমেন্ট পাবেন।',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50/80 via-slate-50 to-white py-12 sm:py-20">
        <Container className="text-center max-w-3xl">
          <Badge variant="verified" className="mb-4">
            সেবাদাতাদের জন্য প্ল্যাটফর্ম
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
            আপনার দক্ষতাকে <br />
            <span className="text-emerald-600">সম্মানজনক আয়ে</span> পরিণত করুন
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-600 leading-relaxed">
            আপনি কি ইলেকট্রিশিয়ান, প্লাম্বার, এসি মেকানিক, কাঠমিস্ত্রি বা ক্লিনার?
            KajLagbe তে যুক্ত হয়ে প্রতিদিন আপনার এলাকার নতুন নতুন গ্রাহক পান।
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="font-bold shadow-md">
                আজই ফ্রি রেজিস্ট্রেশন করুন
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                সাবস্ক্রিপশন প্ল্যান দেখুন
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> কোনো রেজিস্ট্রেশন ফি নেই
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> ১০০% সরাসরি পেমেন্ট
            </span>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <Container>
        <SectionHeader
          badge={<Badge variant="default">সুবিধাসমূহ</Badge>}
          title="কেন কাজ লাগবে প্ল্যাটফর্মে যুক্ত হবেন?"
          description="আমাদের প্ল্যাটফর্ম সেবাদাতাদের অর্থনৈতিক মুক্তি ও পেশাগত পরিচিতি নিশ্চিত করে।"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <Card key={idx} className="p-6 space-y-3 flex flex-col justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* Trust and Safety Commitment */}
      <SectionContainer className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge variant="verified" className="bg-emerald-500 text-slate-950 font-bold">
              ভেরিফিকেশন প্রক্রিয়া
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              স্বীকৃতি ও নিরাপত্তা নিশ্চিত করার সহজ উপায়
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              গ্রাহকরা ভেরিফাইড টেকনিশিয়ানদের বেশি পছন্দ করেন এবং বেশি অর্ডার দেন।
              আপনার এনআইডি জমা দিলে ২৪ ঘণ্টার মধ্যে প্রোফাইল ভেরিফাইড হবে।
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>জাতীয় পরিচয়পত্র (NID) ভেরিফিকেশন ব্যাজ</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>ট্রেড লাইসেন্স বা প্রাতিষ্ঠানিক অনুমোদন</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>পুলিশ ক্লিয়ারেন্স ব্যাজ (প্রযোজ্য ক্ষেত্রে)</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">প্রোভাইডার ড্যাশবোর্ড টুলস</h3>
            <p className="text-xs text-slate-400">
              মোবাইল ও ওয়েব ড্যাশবোর্ড থেকে খুব সহজেই আপনার জব রিকোয়েস্ট ম্যানেজ করুন, শিডিউল ক্যালেন্ডার ট্র্যাক করুন এবং গ্রাহকদের রিভিউ মনিটর করুন।
            </p>
            <div className="pt-2">
              <Link href="/register">
                <Button className="w-full">
                  রেজিস্ট্রেশন শুরু করুন
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <Container className="max-w-4xl">
        <SectionHeader
          title="প্রোভাইডারদের সাধারণ প্রশ্নাবলী"
          description="যোগদানের আগে সচরাচর জিজ্ঞাসিত প্রশ্নের উত্তরগুলো জেনে নিন।"
          align="center"
        />

        <Accordion
          items={faqs.map((f, idx) => ({
            id: `p-faq-${idx}`,
            title: f.question,
            content: f.answer,
          }))}
        />
      </Container>
    </div>
  );
}
