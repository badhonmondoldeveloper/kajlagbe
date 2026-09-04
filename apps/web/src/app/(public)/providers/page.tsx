'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
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
  VerifiedProviderBadge,
  CompletedJobsCounter,
  ResponseRateIndicator,
  ExperienceBadge,
  Input,
  Select,
  Checkbox,
  Drawer,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';
import { PROVIDERS, CATEGORIES, DIVISIONS } from '../../../data';
import { useLocation } from '../../../context/location-context';

export default function ProvidersPage() {
  const { location, detectLiveLocation } = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedDivision, setSelectedDivision] = React.useState('all');
  const [onlyVerified, setOnlyVerified] = React.useState(false);
  const [onlyAvailable, setOnlyAvailable] = React.useState(false);
  const [onlyNearMe, setOnlyNearMe] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'recommended' | 'rating' | 'experience'>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);

  const filteredProviders = PROVIDERS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.fullLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.categorySlug === selectedCategory;

    const matchesDivision =
      selectedDivision === 'all' || p.division.toLowerCase() === selectedDivision.toLowerCase();

    const matchesVerified = !onlyVerified || p.isNidVerified;
    const matchesAvailable = !onlyAvailable || p.isAvailable;

    return matchesSearch && matchesCategory && matchesDivision && matchesVerified && matchesAvailable;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    return b.trustScore - a.trustScore;
  });

  const FilterContent = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          সার্ভিস ক্যাটাগরি
        </label>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={[
            { value: 'all', label: 'সকল ক্যাটাগরি' },
            ...CATEGORIES.map((c) => ({ value: c.slug, label: c.title })),
          ]}
        />
      </div>

      {/* Division Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          বিভাগ / এলাকা
        </label>
        <Select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          options={[
            { value: 'all', label: 'সকল বিভাগ (সারাদেশ)' },
            ...DIVISIONS.map((d) => ({ value: d.name.replace(' বিভাগ', ''), label: d.name })),
          ]}
        />
      </div>

      {/* Verification & Status Toggles */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          ভেরিফিকেশন ও স্ট্যাটাস
        </label>
        <Checkbox
          label="শুধুমাত্র NID ভেরিফাইড"
          checked={onlyVerified}
          onChange={(e) => setOnlyVerified(e.target.checked)}
        />
        <Checkbox
          label="এখনই সেবা প্রদানে প্রস্তুত (Available)"
          checked={onlyAvailable}
          onChange={(e) => setOnlyAvailable(e.target.checked)}
        />
      </div>

      {/* Reset button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => {
          setSelectedCategory('all');
          setSelectedDivision('all');
          setOnlyVerified(false);
          setOnlyAvailable(false);
          setSearchQuery('');
        }}
      >
        ফিল্টার রিসেট করুন
      </Button>
    </div>
  );

  return (
    <Container className="py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="দক্ষ ও যাচাইকৃত প্রোভাইডার তালিকা"
        description="আপনার প্রয়োজনীয় কাজের জন্য বিশ্বস্ত, অভিজ্ঞ ও স্থানীয় সার্ভিস প্রোভাইডার খুঁজে নিন।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'প্রোভাইডার তালিকা' },
            ]}
          />
        }
        badge={<Badge variant="verified">১০০% যাচাইকৃত প্রোফাইল</Badge>}
      />

      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="প্রোভাইডারের নাম, সার্ভিস বা এলাকা দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="hidden sm:inline">সর্ট করুন:</span>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recommended' | 'rating' | 'experience')}
              options={[
                { value: 'recommended', label: 'সেরা ট্রাস্ট স্কোর' },
                { value: 'rating', label: 'সর্বোচ্চ রেটিং' },
                { value: 'experience', label: 'দীর্ঘ অভিজ্ঞতা' },
              ]}
            />
          </div>

          {/* Mobile Filter Trigger Button */}
          <Button
            variant="outline"
            className="lg:hidden"
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
            onClick={() => setIsMobileFilterOpen(true)}
          >
            ফিল্টার
          </Button>
        </div>
      </div>

      {/* Main Layout: Desktop Sidebar Filters + Provider Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filter Card */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="h-4 w-4 text-emerald-600" />
                ফিল্টারসমূহ
              </h3>
            </div>
            {FilterContent}
          </div>
        </aside>

        {/* Providers Listing Grid */}
        <main className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>মোট {filteredProviders.length} জন প্রোভাইডার পাওয়া গেছে</span>
          </div>

          {filteredProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProviders.map((prov) => (
                <Card key={prov.id} variant="interactive" className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Avatar fallback={prov.name} size="lg" isOnline={prov.isAvailable} />
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base truncate">{prov.name}</CardTitle>
                          <RatingBadge rating={prov.rating} totalReviews={prov.reviewCount} />
                        </div>
                        <p className="text-xs text-slate-500 font-medium truncate">{prov.title}</p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <VerifiedProviderBadge
                            type={prov.isPoliceVerified ? 'police_clearance' : 'nid'}
                            size="sm"
                          />
                          {prov.isTopRated && <VerifiedProviderBadge type="top_rated" size="sm" />}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2.5 text-xs text-slate-600">
                    <div className="grid grid-cols-2 gap-2">
                      <CompletedJobsCounter count={prov.completedJobs} />
                      <ExperienceBadge years={prov.experienceYears} />
                    </div>

                    <ResponseRateIndicator rate={prov.responseRate} responseTime={prov.avgResponseTime} />

                    <div className="flex items-center gap-1 text-slate-500 pt-1">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{prov.fullLocation}</span>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {prov.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">শুরু</span>
                      <span className="text-sm font-black text-emerald-700">৳ {prov.startingPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/providers/${prov.slug}`}>
                        <Button size="sm" variant="outline">
                          প্রোফাইল দেখুন
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white">
              <ShieldCheck className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">কোনো প্রোভাইডার পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="প্রোভাইডার ফিল্টারসমূহ"
        position="bottom"
      >
        <div className="py-2">
          {FilterContent}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Button className="w-full" onClick={() => setIsMobileFilterOpen(false)}>
              ফলাফল দেখুন ({filteredProviders.length})
            </Button>
          </div>
        </div>
      </Drawer>
    </Container>
  );
}
