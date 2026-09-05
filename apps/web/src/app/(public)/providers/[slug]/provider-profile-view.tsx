'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  AvailabilityBadge,
  VerifiedProviderBadge,
  CompletedJobsCounter,
  ResponseRateIndicator,
  ExperienceBadge,
  TrustScoreIndicator,
  RatingSummary,
  Container,
  Breadcrumb,
} from '@kajlagbe/ui';
import { QuickBookingModal } from '../../../../components/booking/quick-booking-modal';
import type { Provider } from '../../../../data';

interface ProviderProfileViewProps {
  provider: Provider;
  similarProviders: Provider[];
}

export function ProviderProfileView({ provider, similarProviders }: ProviderProfileViewProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = React.useState<string | undefined>(undefined);
  const [selectedPrice, setSelectedPrice] = React.useState<string | undefined>(undefined);

  const handleOpenBooking = (title?: string, price?: string) => {
    setSelectedServiceTitle(title);
    setSelectedPrice(price);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-24 lg:pb-16">
      {/* Quick Booking Modal */}
      <QuickBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        providerName={provider.name}
        categoryTitle={provider.category}
        serviceTitle={selectedServiceTitle || `${provider.title} সার্ভিস`}
        estimatedPrice={selectedPrice || `৳ ১,০০০ - ৳ ৩,০০০`}
      />

      {/* Top Banner & Breadcrumb */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white pt-8 pb-10">
        <Container>
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'হোম', href: '/' },
                { label: 'প্রোভাইডার তালিকা', href: '/providers' },
                { label: provider.name },
              ]}
            />
          </div>

          {/* Profile Master Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Avatar and Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Avatar
                  fallback={provider.name}
                  size="xl"
                  isOnline={provider.isAvailable}
                  className="ring-4 ring-emerald-50"
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-3xl font-black text-slate-900">
                      {provider.name}
                    </h1>
                    <AvailabilityBadge available={provider.isAvailable} />
                  </div>
                  <p className="text-xs sm:text-base text-slate-600 font-medium">
                    {provider.title} • <span className="text-emerald-700 font-semibold">{provider.category}</span>
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{provider.fullLocation}</span>
                  </div>
                  {/* Verifications */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {provider.isNidVerified && <VerifiedProviderBadge type="nid" size="sm" />}
                    {provider.isPoliceVerified && <VerifiedProviderBadge type="police_clearance" size="sm" />}
                    {provider.isTradeLicenseVerified && <VerifiedProviderBadge type="trade_license" size="sm" />}
                    {provider.isTopRated && <VerifiedProviderBadge type="top_rated" size="sm" />}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto shadow-md"
                  leftIcon={<Zap className="h-4 w-4 text-amber-300" />}
                  onClick={() => handleOpenBooking()}
                >
                  ⚡ ১-ট্যাপ সার্ভিস বুকিং দিন
                </Button>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    মেসেজ দিন
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400">ট্রাস্ট স্কোর</span>
                <TrustScoreIndicator score={provider.trustScore} />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400">সম্পন্ন কাজ</span>
                <CompletedJobsCounter count={provider.completedJobs} />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400">কাজের অভিজ্ঞতা</span>
                <ExperienceBadge years={provider.experienceYears} />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400">রেসপন্স রেট</span>
                <ResponseRateIndicator rate={provider.responseRate} responseTime={provider.avgResponseTime} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area: 2-column layout */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* About / Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">আমার সম্পর্কে (About Provider)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {provider.bio}
                </p>
              </CardContent>
            </Card>

            {/* Services Offered */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">প্রদত্ত সেবাসমূহ ও রেট</CardTitle>
                <CardDescription>প্রোভাইডারের স্পেশালাইজড সার্ভিস ও প্রদেয় সুবিধা</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100">
                {provider.servicesOffered.map((srv, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">{srv.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{srv.description}</p>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-3">
                      <span className="text-sm font-bold text-emerald-700">{srv.price}</span>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleOpenBooking(srv.title, srv.price)}
                      >
                        ⚡ বুকিং
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">বিশেষ দক্ষতা ও ইকুইপমেন্ট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Gallery */}
            {provider.portfolio.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">পূর্ববর্তী কাজের পোর্টফোলিও</CardTitle>
                  <CardDescription>সাম্প্রতিক সম্পন্ন করা প্রকল্পের নমুনা</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {provider.portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{item.category}</span>
                          <span className="text-[10px] text-slate-400">{item.completedDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews and Ratings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">গ্রাহক রিভিউ ও মূল্যায়ন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RatingSummary
                  rating={provider.rating}
                  totalReviews={provider.reviewCount}
                  breakdown={{ 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 }}
                />

                <div className="divide-y divide-slate-100 pt-4 border-t border-slate-100">
                  {provider.reviews.length > 0 ? (
                    provider.reviews.map((rev) => (
                      <div key={rev.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                            <span className="inline-block rounded border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">{rev.serviceType}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-4">এখনো কোন রিভ্যু যুক্ত হয়নি।</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardHeader>
                <CardTitle className="text-base text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  কাজলগবে কাস্টমার গ্যারান্টি
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-emerald-900">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>কাজলগবে এসক্রো প্রটেকশন:</strong> কাজ সম্পন্ন হওয়ার পূর্বে টাকা প্রোভাইডার পাবেন না।</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>৭ দিনের রি-ওয়ার্ক গ্যারান্টি:</strong> সন্তুষ্ট না হলে বিনা খরচে পুনরায় কাজ করার সুযোগ।</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
