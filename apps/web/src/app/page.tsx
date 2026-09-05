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
  Paintbrush,
  ArrowRight,
  CheckCircle2,
  Lock,
  Headphones,
  MapPin,
  Star,
  Briefcase,
  Building2,
  Users,
  AlertTriangle,
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
  Accordion,
} from '@kajlagbe/ui';
import { CATEGORIES, PROVIDERS, TESTIMONIALS, DIVISIONS, FAQS } from '../data';
import { AdBanner } from '../components/ads/ad-banner';

export default function HomePage() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Flame,
    Zap,
    Wrench,
    Sparkles,
    Hammer,
    Truck,
    Paintbrush,
  };

  const emergencyServices = [
    { title: 'জরুরী বিদ্যুৎ ও শর্ট সার্কিট', time: '১৫ মিনিট রেসপন্স', icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { title: 'পানির পাইপ লিক ও মোটর ফল্ট', time: '২০ মিনিট রেসপন্স', icon: Wrench, color: 'text-sky-600 bg-sky-50' },
    { title: 'এসি গ্যাস লিক ও কুলিং সমস্যা', time: '২৫ মিনিট রেসপন্স', icon: Flame, color: 'text-teal-600 bg-teal-50' },
    { title: 'দরজার লক ও সিকিউরিটি ফিক্স', time: '২০ মিনিট রেসপন্স', icon: Lock, color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Hero Section & Smart Search */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white py-12 sm:py-20 lg:py-24">
        <Container className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              বাংলাদেশ-ব্যাপী ভেরিফাইড সার্ভিস নেটওয়ার্ক
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 max-w-4xl mx-auto leading-tight">
            আপনার প্রয়োজনের সঠিক সেবা, <br />
            <span className="text-emerald-600">কাজ লাগবে</span> এখন আপনার এলাকায়
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            এসি মেরামত, ইলেকট্রিশিয়ান, প্লাম্বার থেকে শুরু করে যে কোনো গৃহস্থালী ও কর্পোরেট সেবার জন্য
            জাতীয় পরিচয়পত্র যাচাইকৃত দক্ষ টেকনিশিয়ান খুঁজুন ৬৪ জেলায়।
          </p>

          {/* Smart Search Bar */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
            <GlobalSearchInput />
            <div className="mt-3 flex justify-center">
              <PopularSearches />
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/dashboard/jobs">
              <Button size="sm" variant="outline" leftIcon={<Briefcase className="h-4 w-4 text-emerald-600" />}>
                ফ্রি কাজ পোস্ট করুন
              </Button>
            </Link>
            <Link href="/for-providers">
              <Button size="sm" variant="secondary" leftIcon={<Users className="h-4 w-4 text-emerald-600" />}>
                প্রোভাইডার হিসেবে যোগ দিন
              </Button>
            </Link>
          </div>

          {/* Key Stats Bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/80">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">৬৪</div>
              <div className="text-xs font-semibold text-slate-500">জেলায় সার্ভিস কাভারেজ</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">১০০%</div>
              <div className="text-xs font-semibold text-slate-500">NID যাচাইকৃত প্রোভাইডার</div>
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

      {/* 2. Emergency Services Banner */}
      <Container>
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/60 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <AlertTriangle className="h-4 w-4 text-rose-600" />
                <span>জরুরী সেবা (Emergency Quick Dispatch)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                জরুরী সার্ভিস প্রয়োজন? ১৫-৩০ মিনিটে টেকনিশিয়ান ডাকুন
              </h2>
            </div>
            <Link href="/services">
              <Button variant="danger" size="sm">
                জরুরী সার্ভিস কল করুন
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyServices.map((em, idx) => {
              const Icon = em.icon;
              return (
                <Link key={idx} href="/services">
                  <div className="flex items-center gap-3 rounded-xl border border-rose-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${em.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{em.title}</h4>
                      <p className="text-[11px] text-rose-600 font-medium">{em.time}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>

      {/* 3. Popular Service Categories */}
      <SectionContainer className="py-0">
        <Container>
          <SectionHeader
            badge={<Badge variant="default">সার্ভিস ক্যাটালগ</Badge>}
            title="জনপ্রিয় সেবাসমূহ"
            description="আপনার প্রয়োজনীয় ক্যাটাগরি বেছে নিন এবং অভিজ্ঞ প্রোভাইডারদের সাথে সরাসরি যুক্ত হোন।"
            action={
              <Link href="/services">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  সকল সেবা দেখুন
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Wrench;
              return (
                <Link key={cat.id} href={`/services/${cat.slug}`}>
                  <Card variant="interactive" className="p-5 flex flex-col justify-between h-full hover:border-emerald-300">
                    <div className="space-y-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${cat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                      <span className="text-emerald-700 font-bold">শুরু ৳ {cat.startingPrice}</span>
                      <span className="text-slate-400">{cat.providerCount}+ প্রোভাইডার</span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </SectionContainer>

      {/* 4. How KajLagbe Works */}
      <SectionContainer className="bg-slate-50 border-y border-slate-200 py-12 sm:py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="default" className="mb-2">সহজ ৩ ধাপ</Badge>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              কীভাবে কাজ করে KajLagbe?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              কোনো ঝামেলা ছাড়াই মুহূর্তেই আপনার পছন্দের সার্ভিস প্রোভাইডার খুঁজে নিন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-black text-lg">
                ১
              </div>
              <h3 className="text-base font-bold text-slate-900">১. সেবা বা প্রোভাইডার খুঁজুন</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                আপনার প্রয়োজনীয় সার্ভিস বা এলাকা সিলেক্ট করুন অথবা ফ্রি কাজের অফার পোস্ট করুন।
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-black text-lg">
                ২
              </div>
              <h3 className="text-base font-bold text-slate-900">২. যাচাই ও বুকিং নিশ্চিত করুন</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                প্রোভাইডারের ভেরিফিকেশন, রেটিং, রেট ও রিভিউ দেখে সরাসরি বুক করুন বা কথা বলুন।
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-black text-lg">
                ৩
              </div>
              <h3 className="text-base font-bold text-slate-900">৩. কাজ শেষ হলে নিরাপদ পেমেন্ট</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                টেকনিশিয়ান কাজ সন্তোষজনকভাবে সম্পন্ন করার পর ক্যাশ বা ডিজিটাল মাধ্যমে পেমেন্ট দিন।
              </p>
            </div>
          </div>

          {/* AdSense Homepage Banner */}
          <AdBanner slot="9876543210" className="mt-8" />
        </Container>
      </SectionContainer>

      {/* 5. Featured Verified Providers */}
      <SectionContainer className="py-0">
        <Container>
          <SectionHeader
            badge={<Badge variant="verified">টপ রেটেড</Badge>}
            title="শীর্ষ ভেরিফাইড প্রোভাইডারগণ"
            description="গ্রাহকদের সর্বোচ্চ প্রশংসিত ও জাতীয় পরিচয়পত্র যাচাইকৃত দক্ষ পেশাজীবী।"
            action={
              <Link href="/providers">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  সকল প্রোভাইডার
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROVIDERS.slice(0, 3).map((prov) => (
              <Card key={prov.id} variant="interactive" className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Avatar fallback={prov.name} size="lg" isOnline={prov.isAvailable} />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{prov.name}</CardTitle>
                        <RatingBadge rating={prov.rating} totalReviews={prov.reviewCount} />
                      </div>
                      <p className="text-xs text-slate-500">{prov.title}</p>
                      <div className="pt-1">
                        <VerifiedProviderBadge type={prov.isPoliceVerified ? 'police_clearance' : 'nid'} size="sm" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-slate-600">
                  <CompletedJobsCounter count={prov.completedJobs} />
                  <ResponseRateIndicator rate={prov.responseRate} responseTime={prov.avgResponseTime} />
                  <div className="flex items-center gap-1 text-slate-500 pt-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{prov.fullLocation}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <AvailabilityBadge available={prov.isAvailable} size="sm" />
                  <Link href={`/providers/${prov.slug}`}>
                    <Button size="sm" variant="outline">
                      প্রোফাইল দেখুন
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </SectionContainer>

      {/* 6. Trust and Safety Section */}
      <SectionContainer className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl p-8 sm:p-12 lg:p-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="verified" className="bg-emerald-500 text-slate-950 mb-3 font-bold">
            নিরাপত্তা ও ভরসা
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            কাজ লাগবে কেন সবার চেয়ে নির্ভরযোগ্য?
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-300">
            আমরা নিশ্চিত করি কঠোর যাচাই প্রক্রিয়া, নিরাপদ লেনদেন এবং গ্রাহকের প্রতিটি কাজের পূর্ণ নিরাপত্তা।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white leading-snug">১০০% NID যাচাই</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              প্রত্যেক টেকনিশিয়ানের জাতীয় পরিচয়পত্র ও ঠিকানা সরাসরি ভেরিফিকেশন অফিসার দ্বারা যাচাইকৃত।
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white leading-snug">নিরাপদ এসক্রো পেমেন্ট</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              কাজ সন্তোষজনকভাবে সম্পন্ন হওয়ার পর আপনার সম্মতিতে টাকা রিলিজ হয়।
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white leading-snug">৭ দিনের রি-ওয়ার্ক গ্যারান্টি</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              কাজে কোনো সমস্যা দেখা দিলে দ্রুত ফ্রি রি-ওয়ার্ক ও সমাধান সহায়তা প্রদান করা হয়।
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Headphones className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white leading-snug">২৪/৭ কাস্টমার সাপোর্ট</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              যেকোনো জরুরি জিজ্ঞাসা বা প্রয়োজনে আমাদের ডেডিকেটেড সাপোর্ট টিম সার্বক্ষণিক প্রস্তুত।
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* 7. Bangladesh Coverage & Division Explorer */}
      <SectionContainer className="py-0">
        <Container>
          <SectionHeader
            badge={<Badge variant="default">সারাদেশে কাভারেজ</Badge>}
            title="বাংলাদেশের ৮টি বিভাগেই আমাদের সেবা"
            description="আপনার জেলার অভিজ্ঞ টেকনিশিয়ানদের সাথে সরাসরি যুক্ত হোন।"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DIVISIONS.map((div) => (
              <Link key={div.id} href={`/providers?division=${div.nameEn.toLowerCase()}`}>
                <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300 hover:shadow-xs transition space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{div.name}</h3>
                    <MapPin className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500">{div.activeProviders}+ সক্রিয় কর্মী</p>
                  <span className="inline-block rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                    {div.coverageBadge.split(' ')[0]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </SectionContainer>

      {/* 8. For Businesses & Enterprise Solutions */}
      <SectionContainer className="py-0">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <Badge variant="verified" className="bg-sky-500 text-slate-950 font-bold">
                কর্পোরেট ও ব্যবসা
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                আপনার ব্যবসা প্রতিষ্ঠানের রক্ষণাবেক্ষণে ডেডিকেটেড সার্ভিস সলিউশন
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                অফিস এসি মেইনটেন্যান্স, ইলেকট্রিক্যাল ব্যাকআপ, স্যানিটারি ও নিয়মিত পরিষ্কারের জন্য
                মান্থলি কন্ট্রাক্ট ও সেন্ট্রাল ইনভয়েসিং সুবিধা।
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/for-businesses">
                  <Button variant="primary">কর্পোরেট অফার জানুন</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-800">
                    যোগাযোগ করুন
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-4 text-center">
                <Building2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">৫০+ কোম্পানি</div>
                <p className="text-[11px] text-slate-400">নিয়মিত কর্পোরেট ক্লায়েন্ট</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-4 text-center">
                <ShieldCheck className="h-6 w-6 text-sky-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">SLA গ্যারান্টি</div>
                <p className="text-[11px] text-slate-400">চুক্তিভিত্তিক সময়সীমা</p>
              </div>
            </div>
          </div>
        </Container>
      </SectionContainer>

      {/* 9. Testimonials & Social Proof */}
      <SectionContainer className="py-0">
        <Container>
          <SectionHeader
            badge={<Badge variant="default">গ্রাহক ও কর্মী মতামত</Badge>}
            title="ব্যবহারকারীদের অভিজ্ঞতা"
            description="কাজ লাগবে ব্যবহার করে গ্রাহক ও টেকনিশিয়ানদের বাস্তব অনুভূতি।"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((test) => (
              <Card key={test.id} className="p-6 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{test.name}</h4>
                    <p className="text-xs text-slate-500">{test.role} • {test.location}</p>
                  </div>
                  <Badge variant="secondary" size="sm">{test.service}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </SectionContainer>

      {/* 10. Provider Acquisition CTA Banner */}
      <SectionContainer className="py-0">
        <Container>
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
            <div className="space-y-3 max-w-xl">
              <Badge variant="verified" className="bg-white text-emerald-800 font-bold">
                কাজের সুযোগ
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-black">
                আপনার দক্ষতাকে আয়ে পরিণত করুন
              </h2>
              <p className="text-xs sm:text-base text-emerald-50 leading-relaxed">
                আপনি কি ইলেকট্রিশিয়ান, প্লাম্বার, এসি মেকানিক বা ক্লিনার? আজই KajLagbe তে ফ্রি প্রোভাইডার প্রোফাইল খুলুন এবং এলাকায় প্রতিদিন নতুন নতুন কাজের সুযোগ পান।
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/for-providers">
                <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50 shadow-md font-bold">
                  প্রোভাইডার হিসেবে যোগ দিন
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </SectionContainer>

      {/* 11. FAQ Section */}
      <SectionContainer className="py-0">
        <Container className="max-w-4xl">
          <SectionHeader
            badge={<Badge variant="default">সাধারণ জিজ্ঞাসা</Badge>}
            title="সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
            description="KajLagbe সম্পর্কে আপনার যে কোনো প্রশ্নের তাৎক্ষণিক উত্তর জানুন।"
            align="center"
          />

          <Accordion
            items={FAQS.map((faq, idx) => ({
              id: `faq-${idx}`,
              title: faq.question,
              content: faq.answer,
            }))}
          />

          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-500">
              আপনার কাঙ্ক্ষিত প্রশ্নের উত্তর খুঁজে পাননি?{' '}
              <Link href="/help" className="font-semibold text-emerald-600 hover:underline">
                আমাদের সাহায্য কেন্দ্র দেখুন
              </Link>{' '}
              অথবা{' '}
              <Link href="/contact" className="font-semibold text-emerald-600 hover:underline">
                সরাসরি যোগাযোগ করুন
              </Link>
            </p>
          </div>
        </Container>
      </SectionContainer>
    </div>
  );
}
