import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  Zap,
  Wrench,
  Sparkles,
  Flame,
  Truck,
  Hammer,
  Paintbrush,
  CheckCircle2,
  ArrowRight,
  Info,
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
  Container,
  SectionContainer,
  SectionHeader,
  Breadcrumb,
  Accordion,
} from '@kajlagbe/ui';
import { CATEGORIES, PROVIDERS } from '../../../../data';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export default function CategoryDetailsPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Flame,
    Zap,
    Wrench,
    Sparkles,
    Hammer,
    Truck,
    Paintbrush,
  };

  const Icon = iconMap[category.icon] || Wrench;

  // Matching providers
  const matchingProviders = PROVIDERS.filter(
    (p) => p.categorySlug === category.slug || p.category === category.title,
  );

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Category Hero Banner */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white py-10 sm:py-16">
        <Container>
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'হোম', href: '/' },
                { label: 'সেবা ডিরেক্টরি', href: '/services' },
                { label: category.title },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-xs ${category.color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                    {category.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">{category.titleEn}</p>
                </div>
              </div>

              <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                {category.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge variant="verified" size="sm">
                  <ShieldCheck className="h-3 w-3" />
                  {category.providerCount}+ ভেরিফাইড প্রোভাইডার
                </Badge>
                <Badge variant="default" size="sm">
                  শুরু মাত্র ৳ {category.startingPrice}
                </Badge>
                <Badge variant="secondary" size="sm">
                  ৭ দিনের রি-ওয়ার্ক গ্যারান্টি
                </Badge>
              </div>
            </div>

            {/* Quick Request CTA Card */}
            <div className="w-full lg:w-96 rounded-2xl border border-emerald-200 bg-white p-6 shadow-md space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">দ্রুত সার্ভিস বুকিং করুন</h3>
                <p className="text-xs text-slate-500">আপনার এলাকায় ১৫-৩০ মিনিটে টেকনিশিয়ান ডাকুন</p>
              </div>
              <div className="space-y-2 pt-2">
                <Link href="/dashboard/jobs">
                  <Button className="w-full" size="md">
                    কাজের অফার পোস্ট করুন
                  </Button>
                </Link>
                <Link href="#providers">
                  <Button variant="outline" className="w-full" size="md">
                    প্রোভাইডার তালিকা দেখুন
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>নিরাপদ এসক্রো পেমেন্ট ও ভেরিফাইড সেবা</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Subservices & Pricing Breakdown */}
      <Container>
        <SectionHeader
          badge={<Badge variant="default">সাব-সেবাসমূহ</Badge>}
          title={`${category.title} এর বিস্তারিত সার্ভিস তালিকা`}
          description="আপনার নির্দিষ্ট সমস্যা অনুযায়ী সার্ভিস নির্বাচন করুন।"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.subservices.map((sub) => (
            <div
              key={sub.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-emerald-300 transition"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{sub.name}</h4>
                  {sub.popular && <Badge variant="verified" size="sm">জনপ্রিয়</Badge>}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{sub.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">{sub.unit}</span>
                  <span className="text-sm font-bold text-emerald-700">{sub.priceRange}</span>
                </div>
                <Link href={`/providers?category=${category.slug}`}>
                  <Button size="sm" variant="outline">
                    প্রোভাইডার খুঁজুন
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Guidance Disclaimer */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
          <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>মূল্য নির্দেশিকা:</strong> প্রদর্শিত মূল্য আনুমানিক। কাজের জটিলতা, ব্যবহৃত পার্টস ও এলাকাভেদে চূড়ান্ত মূল্য ভিন্ন হতে পারে। কাজ শুরুর পূর্বে টেকনিশিয়ানের সাথে বাজেট নিশ্চিত করে নিন।
          </p>
        </div>
      </Container>

      {/* 3. Available Providers for this Category */}
      <SectionContainer id="providers" className="py-0">
        <Container>
          <SectionHeader
            badge={<Badge variant="verified">যাচাইকৃত টেকনিশিয়ান</Badge>}
            title={`${category.title} বিশেষজ্ঞ প্রোভাইডারগণ`}
            description="কাস্টমারদের ইতিবাচক রেটিংপ্রাপ্ত দক্ষ কারিগর।"
            action={
              <Link href={`/providers?category=${category.slug}`}>
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  সকল প্রোভাইডার দেখুন
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(matchingProviders.length > 0 ? matchingProviders : PROVIDERS.slice(0, 3)).map((prov) => (
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

      {/* 4. Benefits & Safety Tips */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              কেন KajLagbe থেকে {category.title} নেবেন?
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {category.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              নিরাপত্তা ও সতর্কতা টিপস
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {category.safetyTips.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* 5. Category FAQ */}
      <Container className="max-w-4xl">
        <SectionHeader
          title={`${category.title} সংক্রান্ত সচরাচর জিজ্ঞাসা`}
          description="সার্ভিস সম্পর্কিত সাধারণ প্রশ্নের উত্তর জানুন।"
          align="center"
        />

        <Accordion
          items={category.faq.map((f, idx) => ({
            id: `cat-faq-${idx}`,
            title: f.question,
            content: f.answer,
          }))}
        />
      </Container>
    </div>
  );
}

