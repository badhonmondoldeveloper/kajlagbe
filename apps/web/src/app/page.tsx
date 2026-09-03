'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Wrench,
  Sparkles,
  Flame,
  Truck,
  Hammer,
  ArrowRight,
  CheckCircle2,
  Lock,
  Headphones,
  MapPin,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  RatingBadge,
  AvailabilityBadge,
  VerifiedProviderBadge,
  CompletedJobsCounter,
  ResponseRateIndicator,
  GlobalSearchInput,
  PopularSearches,
  Container,
  SectionContainer,
  SectionHeader,
} from '@kajlagbe/ui';

export default function HomePage() {
  const categories = [
    {
      id: 'ac',
      title: 'এসি সার্ভিসিং ও মেরামত',
      count: '১২০+ টেকনিশিয়ান',
      icon: Flame,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      id: 'electric',
      title: 'ইলেকট্রিক্যাল সার্ভিস',
      count: '৩৫০+ প্রোভাইডার',
      icon: Zap,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'plumbing',
      title: 'প্লাম্বিং ও পাইপ ফিটিং',
      count: '২০০+ প্রোভাইডার',
      icon: Wrench,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'cleaning',
      title: 'হোম ও অফিস ক্লিনিং',
      count: '১৫০+ কর্মী',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'carpenter',
      title: 'কাঠের কাজ ও ফার্নিচার',
      count: '১৮০+ কার্পেন্টার',
      icon: Hammer,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      id: 'shifting',
      title: 'বাসা বদল ও পরিবহন',
      count: '৯০+ এজেন্সি',
      icon: Truck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const featuredProviders = [
    {
      name: 'মো. রফিকুল ইসলাম',
      title: 'সিনিয়র এসি ও রেফ্রিজারেশন বিশেষজ্ঞ',
      rating: 4.9,
      reviews: 142,
      jobs: 260,
      location: 'মিরপুর ও গুলশান, ঢাকা',
      badge: 'nid' as const,
    },
    {
      name: 'আব্দুল করিম',
      title: 'মাস্টার ইলেকট্রিশিয়ান ও ওয়্যারিং এক্সপার্ট',
      rating: 4.8,
      reviews: 98,
      jobs: 185,
      location: 'ধানমন্ডি ও লালমাটিয়া, ঢাকা',
      badge: 'police_clearance' as const,
    },
    {
      name: 'হাসান মাহমুদ',
      title: 'প্লাম্বিং ও স্যানিটারি ইঞ্জিনিয়ার',
      rating: 4.9,
      reviews: 215,
      jobs: 340,
      location: 'উত্তরা ও এয়ারপোর্ট, ঢাকা',
      badge: 'top_rated' as const,
    },
  ];

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: '১০০% NID ও ব্যাকগ্রাউন্ড যাচাই',
      description: 'প্রত্যেক সার্ভিস প্রোভাইডারের পরিচয়পত্র ও পুলিশ ক্লিয়ারেন্স কঠোরভাবে যাচাইকৃত।',
    },
    {
      icon: Lock,
      title: 'নিরাপদ এসক্রো পেমেন্ট',
      description: 'কাজ সন্তোষজনকভাবে শেষ হওয়ার পর আপনার সম্মতিতে প্রোভাইডারকে পেমেন্ট রিলিজ হয়।',
    },
    {
      icon: CheckCircle2,
      title: 'সার্ভিস কোয়ালিটি গ্যারান্টি',
      description: 'যেকোনো সার্ভিস সমস্যার দ্রুত সমাধান ও ফ্রি রি-ওয়ার্ক সাপোর্ট নীতি।',
    },
    {
      icon: Headphones,
      title: '২৪/৭ ডেডিকেটেড সাপোর্ট',
      description: 'আমাদের কাস্টমার কেয়ার টিম সবসময় আপনার সহায়তায় প্রস্তুত।',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white py-12 sm:py-20 lg:py-24">
        <Container className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="h-3 w-3" />
              বাংলাদেশ-ব্যাপী ভেরিফাইড সার্ভিস নেটওয়ার্ক
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 max-w-4xl mx-auto leading-tight">
            প্রয়োজনে দক্ষ সেবাকর্মী, <br />
            <span className="text-emerald-600">কাজ লাগবে</span> এখন আপনার এলাকায়
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            এসি মেরামত, ইলেকট্রিশিয়ান, প্লাম্বার থেকে শুরু করে যে কোনো গৃহস্থালী ও কর্পোরেট সেবার জন্য
            নির্ভরযোগ্য প্ল্যাটফর্ম। ৬৪ জেলাতেই দ্রুত সেবা নিন।
          </p>

          {/* Global Search Component */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
            <GlobalSearchInput />
            <div className="mt-3 flex justify-center">
              <PopularSearches />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/80">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">৬৪</div>
              <div className="text-xs font-semibold text-slate-500">জেলায় সার্ভিস কাভারেজ</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">১০০%</div>
              <div className="text-xs font-semibold text-slate-500">যাচাইকৃত প্রোভাইডার</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">১৫ মিনিট</div>
              <div className="text-xs font-semibold text-slate-500">গড় রেসপন্স সময়</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600">৪.৯ ★</div>
              <div className="text-xs font-semibold text-slate-500">গ্রাহক সন্তুষ্টি রেটিং</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Categories */}
      <SectionContainer className="py-0">
        <Container>
          <SectionHeader
            badge={<Badge variant="default">সার্ভিস ক্যাটাগরি</Badge>}
            title="জনপ্রিয় সেবাসমূহ"
            description="আপনার প্রয়োজনীয় সেবাটি নির্বাচন করুন এবং সরাসরি দক্ষ প্রোভাইডারদের সাথে যুক্ত হোন।"
            action={
              <Link href="/services">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  সকল সেবা দেখুন
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.id} href={`/services?category=${cat.id}`}>
                  <Card
                    variant="interactive"
                    className="p-4 text-center flex flex-col items-center justify-center space-y-2.5 h-full hover:border-emerald-300"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${cat.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {cat.count}
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </SectionContainer>

      {/* Featured Verified Providers Preview */}
      <SectionContainer className="py-0">
        <Container>
          <SectionHeader
            badge={<Badge variant="verified">শীর্ষ রেটেড</Badge>}
            title="ভেরিফাইড টপ প্রোভাইডারগণ"
            description="গ্রাহক দ্বারা সর্বোচ্চ প্রশংসিত ও সম্পূর্ণ যাচাইকৃত দক্ষ টেকনিশিয়ানগণ।"
            action={
              <Link href="/providers">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  সকল প্রোভাইডার
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProviders.map((prov, idx) => (
              <Card key={idx} variant="interactive">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Avatar fallback={prov.name} size="lg" isOnline={true} />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{prov.name}</CardTitle>
                        <RatingBadge rating={prov.rating} totalReviews={prov.reviews} />
                      </div>
                      <p className="text-xs text-slate-500">{prov.title}</p>
                      <div className="pt-1">
                        <VerifiedProviderBadge type={prov.badge} size="sm" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-slate-600">
                  <CompletedJobsCounter count={prov.jobs} />
                  <ResponseRateIndicator rate={99} responseTime="১০ মিনিট" />
                  <div className="flex items-center gap-1 text-slate-500 pt-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{prov.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <AvailabilityBadge available={true} size="sm" />
                  <Link href="/providers">
                    <Button size="sm" variant="outline">
                      বুক করুন
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </SectionContainer>

      {/* Trust & Safety Section */}
      <SectionContainer className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl p-8 sm:p-12 lg:p-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="verified" className="bg-emerald-500 text-slate-950 mb-3 font-bold">
            নিরাপত্তা ও ভরসা
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            কাজ লাগবে কেন সবার চেয়ে নির্ভরযোগ্য?
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-300">
            আমরা নিশ্চিত করি কঠোর যাচাই প্রক্রিয়া, নিরাপদ লেনদেন এবং গ্রাহকের প্রতিটি কাজের পূর্ণ গ্যারান্টি।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 space-y-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Design System & Post Job CTA */}
      <SectionContainer className="pb-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-tr from-emerald-50 to-white p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="default" size="sm">গ্রাহকদের জন্য</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  নির্দিষ্ট কাজ করাতে চান?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  কাজের বিবরণ দিয়ে বিনামূল্যে পোস্ট করুন এবং নিকটস্থ দক্ষ টেকনিশিয়ানদের সরাসরি কোটেশন গ্রহণ করুন।
                </p>
              </div>
              <div className="mt-6">
                <Link href="/dashboard/jobs">
                  <Button size="md">কাজ পোস্ট করুন (Post a Job)</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-tr from-slate-100/80 to-white p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="outline" size="sm">Module 02 Architecture</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  ডিজাইন সিস্টেম শোরুম
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  KajLagbe এর সকল বাটন, ইনপুট, কার্ড, ট্রাস্ট ব্যাজ, মোডাল, ড্রয়ার ও থিম টোকেন দেখুন।
                </p>
              </div>
              <div className="mt-6">
                <Link href="/design-system">
                  <Button variant="outline" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    শোরুম দেখুন (/design-system)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </SectionContainer>
    </div>
  );
}
