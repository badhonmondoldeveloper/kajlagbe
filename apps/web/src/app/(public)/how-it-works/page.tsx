'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Star,
  Users,
  Briefcase,
  UserCheck,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Tabs,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = React.useState('customer');

  const customerSteps = [
    {
      step: '০১',
      title: 'সেবা বা দক্ষ কর্মী খুঁজুন',
      desc: 'আপনার প্রয়োজনীয় কাজ (এসি, ইলেকট্রিক, প্লাম্বিং ইত্যাদি) নির্বাচন করুন এবং আপনার এলাকা বেছে নিন। অথবা কাজের বিবরণ লিখে ফ্রি জব পোস্ট করুন।',
      icon: Search,
    },
    {
      step: '০২',
      title: 'প্রোভাইডারের প্রোফাইল ও রেটিং যাচাই',
      desc: 'টেকনিশিয়ানদের জাতীয় পরিচয়পত্র ভেরিফিকেশন, অন্যান্য গ্রাহকদের রিভিউ, কাজের অভিজ্ঞতা ও মূল্য তালিকা দেখে সেরা ব্যক্তিকে বেছে নিন।',
      icon: UserCheck,
    },
    {
      step: '০৩',
      title: 'বুকিং দিন বা সরাসরি কথা বলুন',
      desc: 'আপনার পছন্দের সময়ে টেকনিশিয়ানকে বাসায় ডাকুন। দ্রুত সময়ের মধ্যে টেকনিশিয়ান আপনার ঠিকানায় এসে সমস্যা পরিদর্শন করবেন।',
      icon: Briefcase,
    },
    {
      step: '০৪',
      title: 'কাজ শেষ হলে নিশ্চিত পেমেন্ট ও রিভিউ',
      desc: 'কাজে সন্তুষ্ট হওয়ার পর ক্যাশ বা ডিজিটাল মাধ্যমে নিরাপদ পেমেন্ট করুন এবং ভবিষ্যৎ গ্রাহকদের সহায়তার জন্য একটি সৎ রিভিউ দিন।',
      icon: CreditCard,
    },
  ];

  const providerSteps = [
    {
      step: '০১',
      title: 'ফ্রি একাউন্ট খুলুন',
      desc: 'মোবাইল নম্বর ও মৌলিক তথ্য দিয়ে কয়েক মিনিটে প্রোভাইডার একাউন্ট তৈরি করুন। কোনো অপ্রয়োজনীয় রেজিস্ট্রেশন ফি নেই।',
      icon: Users,
    },
    {
      step: '০২',
      title: 'NID ও অভিজ্ঞতা ভেরিফিকেশন',
      desc: 'আপনার জাতীয় পরিচয়পত্র (NID) ও কাজের সার্টিফিকেশন আপলোড করুন। আমাদের ভেরিফিকেশন টিম যাচাই করে আপনার প্রোফাইলে ভেরিফাইড ব্যাজ দেবে।',
      icon: ShieldCheck,
    },
    {
      step: '০৩',
      title: 'কাজের রিকোয়েস্ট গ্রহণ করুন',
      desc: 'আপনার এলাকার গ্রাহকদের সরাসরি বুকিং পান অথবা জব বোর্ডে প্রকাশিত নতুন নতুন কাজের অফারে বিড করুন।',
      icon: Briefcase,
    },
    {
      step: '০৪',
      title: 'কাজ সম্পন্ন করুন ও আয় বাড়ান',
      desc: 'দক্ষতার সাথে কাজ করে গ্রাহকের কাছ থেকে ৫-স্টার রেটিং অর্জন করুন এবং এলাকায় নিজের পরিচিতি ও আয় বৃদ্ধি করুন।',
      icon: TrendingUp,
    },
  ];

  return (
    <Container className="py-8 sm:py-16 space-y-12">
      {/* Header */}
      <PageHeader
        title="কীভাবে কাজ করে KajLagbe?"
        description="সহজ, নিরাপদ ও স্বচ্ছ প্রক্রিয়ায় সার্ভিস বুকিং এবং সেবাদাতাদের উপার্জনের সম্পূর্ণ নির্দেশিকা।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'কীভাবে কাজ করে' },
            ]}
          />
        }
        badge={<Badge variant="default">সহজ গাইডলাইন</Badge>}
      />

      {/* Tab Selector */}
      <div className="flex justify-center">
        <Tabs
          items={[
            { id: 'customer', label: 'গ্রাহকদের জন্য (For Customers)' },
            { id: 'provider', label: 'সেবাদাতাদের জন্য (For Providers)' },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
          variant="segmented"
        />
      </div>

      {/* Dynamic Steps View */}
      {activeTab === 'customer' ? (
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-3xl font-black text-slate-900">
              গ্রাহকদের জন্য ৪টি সহজ ধাপ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              নিরাপদে বিশ্বস্ত টেকনিশিয়ান পাওয়ার শতভাগ কার্যকর সমাধান।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card key={idx} className="p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-emerald-600">{s.step}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900">এখনই সার্ভিস প্রয়োজন?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              আপনার এলাকার ভেরিফাইড টেকনিশিয়ান তালিকা দেখুন অথবা বিনামূল্যে কাজ পোস্ট করুন।
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/services">
                <Button>সেবা ব্রাউজ করুন</Button>
              </Link>
              <Link href="/dashboard/jobs">
                <Button variant="outline">কাজ পোস্ট করুন</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-3xl font-black text-slate-900">
              সেবাদাতাদের ক্যারিয়ার শুরুর ধাপসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              আপনার স্থানীয় দক্ষতাকে কাজে লাগিয়ে সম্মান ও নিয়মিত গ্রাহক অর্জন করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providerSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card key={idx} className="p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-emerald-600">{s.step}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900">আজই আমাদের নেটওয়ার্কে যুক্ত হোন</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              বিনামূল্যে প্রোভাইডার একাউন্ট খুলুন এবং এলাকার সেরা টেকনিশিয়ান হিসেবে সুনাম গড়ে তুলুন।
            </p>
            <Link href="/for-providers">
              <Button size="lg" className="font-bold">
                প্রোভাইডার একাউন্ট তৈরি করুন
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}
