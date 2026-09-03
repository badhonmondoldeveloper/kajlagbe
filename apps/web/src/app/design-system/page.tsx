'use client';

import * as React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  PasswordInput,
  PhoneInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Badge,
  StatusBadge,
  AvailabilityBadge,
  RatingBadge,
  Avatar,
  Modal,
  Drawer,
  Tabs,
  Pagination,
  Breadcrumb,
  Alert,
  NoJobsEmptyState,
  Skeleton,
  RatingSummary,
  StatusTimeline,
  VerifiedProviderBadge,
  TrustScoreIndicator,
  CompletedJobsCounter,
  ResponseRateIndicator,
  ExperienceBadge,
  GlobalSearchInput,
  PopularSearches,
  Container,
  SectionHeader,
  PageHeader,
} from '@kajlagbe/ui';
import {
  ShieldCheck,
  Wrench,
  MapPin,
  ChevronRight,
  Heart,
} from 'lucide-react';

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [switchState, setSwitchState] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const tabs = [
    { id: 'overview', label: 'Overview & Tokens' },
    { id: 'buttons', label: 'Buttons & Actions' },
    { id: 'forms', label: 'Forms & Inputs' },
    { id: 'trust', label: 'Trust & Badges' },
    { id: 'cards', label: 'Cards & Displays' },
    { id: 'feedback', label: 'Feedback & States' },
    { id: 'navigation', label: 'Navigation & Overlays' },
  ];

  return (
    <Container className="py-10">
      {/* Page Header */}
      <PageHeader
        title="KajLagbe Design System"
        description="A mobile-first, trust-focused design language built for Bangladesh's local service marketplace."
        badge={<Badge variant="default">Module 02 Complete</Badge>}
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'Design System' },
            ]}
          />
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
            >
              Open Mobile Drawer
            </Button>
            <Button
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Open Dialog Modal
            </Button>
          </div>
        }
      />

      {/* Navigation Tabs */}
      <div className="mb-8">
        <Tabs
          items={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
          variant="segmented"
        />
      </div>

      {/* Tab: Overview & Tokens */}
      {activeTab === 'overview' && (
        <div className="space-y-12">
          {/* Brand Colors */}
          <div>
            <SectionHeader
              title="1. Color Tokens & Semantic Palette"
              description="Accessible, trust-inducing color palette based on emerald brand primary, slate neutrals, and semantic status indicators."
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <div className="h-16 w-full rounded-lg bg-emerald-600 shadow-inner" />
                <p className="text-xs font-bold text-slate-900">Primary (Emerald)</p>
                <p className="text-[10px] text-slate-500 font-mono">#059669 • hsl(160 84% 39%)</p>
              </div>
              <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <div className="h-16 w-full rounded-lg bg-emerald-700 shadow-inner" />
                <p className="text-xs font-bold text-slate-900">Primary Hover</p>
                <p className="text-[10px] text-slate-500 font-mono">#047857 • hsl(161 94% 30%)</p>
              </div>
              <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <div className="h-16 w-full rounded-lg bg-emerald-50 border border-emerald-200" />
                <p className="text-xs font-bold text-slate-900">Primary Light</p>
                <p className="text-[10px] text-slate-500 font-mono">#ecfdf5</p>
              </div>
              <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <div className="h-16 w-full rounded-lg bg-slate-900 shadow-inner" />
                <p className="text-xs font-bold text-slate-900">Text Primary</p>
                <p className="text-[10px] text-slate-500 font-mono">#0f172a</p>
              </div>
              <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <div className="h-16 w-full rounded-lg bg-slate-100 border border-slate-200" />
                <p className="text-xs font-bold text-slate-900">Surface Neutral</p>
                <p className="text-[10px] text-slate-500 font-mono">#f8fafc</p>
              </div>
              <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <div className="h-16 w-full rounded-lg bg-rose-600 shadow-inner" />
                <p className="text-xs font-bold text-slate-900">Destructive / Error</p>
                <p className="text-[10px] text-slate-500 font-mono">#e11d48</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <SectionHeader
              title="2. Typography System (Bangla & English)"
              description="Consistent typographic scale combining Inter for UI numbers & English with Hind Siliguri for beautiful Bengali rendering."
            />
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-400 font-mono uppercase">Display (text-4xl sm:text-5xl font-black)</span>
                <p className="text-3xl sm:text-5xl font-black text-slate-900 mt-1">
                  সহজেই খুঁজুন আপনার নির্ভরযোগ্য সেবাকর্মী
                </p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-400 font-mono uppercase">Heading 1 (text-3xl font-bold)</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  বাংলাদেশের সকল জেলায় ভেরিফাইড প্রোভাইডার
                </h1>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-400 font-mono uppercase">Heading 2 (text-2xl font-bold)</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  জনপ্রিয় ক্যাটাগরি ও সার্ভিসসমূহ
                </h2>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-400 font-mono uppercase">Body Regular (text-sm sm:text-base text-slate-600)</span>
                <p className="text-sm sm:text-base text-slate-600 mt-1 leading-relaxed">
                  কাজ লাগবে প্ল্যাটফর্মে যুক্ত হতে পারেন দক্ষ ইলেকট্রিশিয়ান, প্লাম্বার, কার্পেন্টার কিংবা ক্লিনার হিসেবে। আমরা গ্রাহক ও সার্ভিস প্রোভাইডারের মধ্যে তৈরি করি একটি নিরাপদ ও আস্থার মাধ্যম।
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono uppercase">Currency & Numerical Formatting (font-mono / bold)</span>
                <p className="text-lg font-bold text-emerald-700 mt-1">
                  মূল্য: ৳ ১,২৫০ (১৫% ছাড়) • রেটিং: ★ ৪.৯ (১২০+ রিভিউ)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Buttons */}
      {activeTab === 'buttons' && (
        <div className="space-y-10">
          <SectionHeader
            title="Button Variants & States"
            description="High-contrast, accessible touch targets with responsive scaling."
          />

          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All semantic button variations in default medium size</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="success">Success Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sizes & States</CardTitle>
              <CardDescription>Small, Medium, Large, Icon size and loading/disabled states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
                <Button size="icon" aria-label="Favorite">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <Button isLoading>Loading State</Button>
                <Button disabled>Disabled Button</Button>
                <Button leftIcon={<ShieldCheck className="h-4 w-4" />}>
                  With Left Icon
                </Button>
                <Button rightIcon={<ChevronRight className="h-4 w-4" />} variant="outline">
                  With Right Icon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Forms */}
      {activeTab === 'forms' && (
        <div className="space-y-8">
          <SectionHeader
            title="Form Controls & Inputs"
            description="Accessible input fields with clear focus states and validation error feedback."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="আপনার নাম (Full Name)"
                  placeholder="যেমন: তানভীর আহমেদ"
                  helperText="জাতীয় পরিচয়পত্র অনুযায়ী নাম লিখুন"
                />
                <PasswordInput
                  label="পাসওয়ার্ড (Password)"
                  placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                />
                <PhoneInput
                  label="মোবাইল নম্বর (Phone Number)"
                  placeholder="17XXXXXXXX"
                />
                <Input
                  label="ইমেইল (Email Address - Error State Example)"
                  placeholder="user@example.com"
                  defaultValue="invalid-email"
                  error="অনুগ্রহ করে সঠিক ইমেইল ঠিকানা দিন"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selectors & Toggles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  label="সার্ভিস ক্যাটাগরি (Select Category)"
                  placeholder="ক্যাটাগরি নির্বাচন করুন"
                  options={[
                    { value: 'ac', label: 'এসি মেরামত ও সার্ভিসিং' },
                    { value: 'electric', label: 'ইলেকট্রিক্যাল ওয়্যারিং' },
                    { value: 'plumbing', label: 'প্লাম্বিং ও পাইপলাইন' },
                    { value: 'cleaning', label: 'ডিপ হোম ক্লিনিং' },
                  ]}
                />
                <Textarea
                  label="কাজের বিস্তারিত বিবরণ (Job Description)"
                  placeholder="কাজের ধরণ, স্থান ও অন্যান্য প্রয়োজনীয় তথ্য বিস্তারিত লিখুন..."
                  rows={3}
                />
                <div className="space-y-3 pt-2">
                  <Switch
                    checked={switchState}
                    onChange={setSwitchState}
                    label="জরুরী সার্ভিস (Urgent Request)"
                    description="দ্রুততম সময়ে টেকনিশিয়ান প্রেরণের জন্য সক্রিয় করুন"
                  />
                  <Checkbox
                    label="শর্তাবলী এবং গোপনীয়তা নীতি মেনে নিচ্ছি"
                    defaultChecked
                  />
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold text-slate-700">পেমেন্ট মেথড নির্বাচন করুন</p>
                    <div className="flex gap-4">
                      <Radio name="payment" label="বিকাশ / নগদ" defaultChecked />
                      <Radio name="payment" label="ক্যাশ অন ডেলিভারি" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab: Trust & Badges */}
      {activeTab === 'trust' && (
        <div className="space-y-8">
          <SectionHeader
            title="Trust & Verification Components"
            description="Components specifically crafted to establish customer trust, provider credibility, and safety."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Badges</CardTitle>
                <CardDescription>Provider credentials and safety checkpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <VerifiedProviderBadge type="nid" />
                </div>
                <div>
                  <VerifiedProviderBadge type="trade_license" />
                </div>
                <div>
                  <VerifiedProviderBadge type="police_clearance" />
                </div>
                <div>
                  <VerifiedProviderBadge type="top_rated" />
                </div>
                <div>
                  <VerifiedProviderBadge type="guaranteed" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trust Metrics</CardTitle>
                <CardDescription>Provider reliability indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TrustScoreIndicator score={99} />
                <CompletedJobsCounter count={145} />
                <ResponseRateIndicator rate={98} responseTime="১০ মিনিট" />
                <ExperienceBadge years={7} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
                <CardDescription>Live states and availability indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="verified" />
                  <StatusBadge status="active" />
                  <StatusBadge status="in_progress" />
                  <StatusBadge status="completed" />
                  <StatusBadge status="pending" />
                  <StatusBadge status="rejected" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <AvailabilityBadge available={true} />
                  <AvailabilityBadge available={false} />
                  <RatingBadge rating={4.9} totalReviews={88} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab: Cards & Displays */}
      {activeTab === 'cards' && (
        <div className="space-y-8">
          <SectionHeader
            title="Card Systems & Data Display"
            description="Mobile-ready service and provider display cards."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service Card Mockup */}
            <Card variant="interactive" className="overflow-hidden">
              <div className="h-36 bg-gradient-to-tr from-emerald-600 to-teal-500 p-4 flex flex-col justify-between text-white">
                <Badge variant="verified" size="sm">জনপ্রিয় সেবা</Badge>
                <Wrench className="h-8 w-8 text-white/90" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>এসি সার্ভিসিং ও মেরামত</CardTitle>
                  <RatingBadge rating={4.9} totalReviews={124} />
                </div>
                <CardDescription>
                  বাসা ও অফিসের সকল ব্র্যান্ডের এসি ইনস্টলেশন, গ্যাস রিফিল ও ডিপ ওয়াশ।
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">শুরু মাত্র</span>
                  <span className="text-base font-black text-emerald-700">৳ ১,২০০</span>
                </div>
                <Button size="sm">বুক করুন</Button>
              </CardFooter>
            </Card>

            {/* Provider Card Mockup */}
            <Card variant="interactive">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar fallback="কামাল হোসেন" size="lg" isOnline={true} />
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">কামাল হোসেন</CardTitle>
                      <RatingBadge rating={4.8} totalReviews={96} />
                    </div>
                    <p className="text-xs text-slate-500">মাস্টার ইলেকট্রিশিয়ান</p>
                    <VerifiedProviderBadge type="nid" size="sm" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-600">
                <CompletedJobsCounter count={210} />
                <ResponseRateIndicator rate={99} responseTime="১২ মিনিট" />
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>মিরপুর, ঢাকা (সমগ্র ঢাকায় সেবা প্রদান)</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <AvailabilityBadge available={true} size="sm" />
                <Button size="sm" variant="outline">প্রোফাইল দেখুন</Button>
              </CardFooter>
            </Card>

            {/* Rating Summary Display */}
            <div>
              <RatingSummary
                rating={4.8}
                totalReviews={154}
                breakdown={{
                  5: 82,
                  4: 12,
                  3: 4,
                  2: 1,
                  1: 1,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Feedback & States */}
      {activeTab === 'feedback' && (
        <div className="space-y-8">
          <SectionHeader
            title="Feedback, Alerts & Loading States"
            description="Non-intrusive alerts, skeleton loaders, and meaningful empty states."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Alert variant="info" title="তথ্য নোটিশ (Info Alert)">
                আপনার অ্যাকাউন্ট ভেরিফিকেশনের জন্য জাতীয় পরিচয়পত্রের ছবি আপলোড করুন।
              </Alert>
              <Alert variant="success" title="সফলভাবে সম্পন্ন হয়েছে">
                আপনার সার্ভিস বুকিং সফলভাবে নিশ্চিত করা হয়েছে।
              </Alert>
              <Alert variant="warning" title="সতর্কতা নোটিশ">
                প্রোভাইডারকে কাজ শেষ হওয়ার আগে পুরো টাকা পরিশোধ করবেন না।
              </Alert>
              <Alert variant="error" title="ত্রুটি নোটিশ">
                পেমেন্ট প্রসেসিং ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
              </Alert>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skeleton Loading States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circular" className="h-12 w-12" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full rounded-xl" />
                </CardContent>
              </Card>

              <NoJobsEmptyState
                action={<Button size="sm">কাজের পোস্ট তৈরি করুন</Button>}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Navigation & Overlays */}
      {activeTab === 'navigation' && (
        <div className="space-y-8">
          <SectionHeader
            title="Navigation, Overlays & Search"
            description="Global search experience, location selector, and responsive pagination."
          />

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search & Location Experience</CardTitle>
                <CardDescription>Hero search with interactive district/division selector</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <GlobalSearchInput />
                <PopularSearches />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pagination Component</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pagination
                    currentPage={page}
                    totalPages={8}
                    onPageChange={setPage}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <StatusTimeline
                    steps={[
                      { id: '1', title: 'বুকিং তৈরি করা হয়েছে', description: 'গ্রাহক বুকিং কনফার্ম করেছেন', timestamp: '১০:৩০ AM', status: 'completed' },
                      { id: '2', title: 'প্রোভাইডার গ্রহণ করেছেন', description: 'টেকনিশিয়ান রওনা হয়েছেন', timestamp: '১০:৪৫ AM', status: 'completed' },
                      { id: '3', title: 'কাজ চলমান', description: 'টেকনিশিয়ান কাজ করছেন', timestamp: '১১:১৫ AM', status: 'current' },
                      { id: '4', title: 'কাজ সম্পন্ন ও রিভিউ', description: 'পেমেন্ট ও রেটিং', status: 'upcoming' },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ডায়ালগ কনফার্মেশন (Confirmation Modal)"
        description="এটি KajLagbe এর স্ট্যান্ডার্ড রেসপনসিভ মোডাল কম্পোনেন্ট।"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              বাতিল (Cancel)
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              সম্মতি দিন (Confirm)
            </Button>
          </div>
        }
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          আপনার সার্ভিস প্রোভাইডার নির্বাচন নিশ্চিত করতে নিচের কনফার্ম বাটনে চাপ দিন।
        </p>
      </Modal>

      {/* Demo Bottom Sheet Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="মোবাইল বটম শীট ড্রয়ার (Bottom Sheet Drawer)"
        position="bottom"
      >
        <div className="space-y-4 py-2 text-sm text-slate-600">
          <p>
            মোবাইল ডিভাইসে ফিল্টার, লোকেশন সিলেক্টর অথবা দ্রুত অ্যাকশন দেখানোর জন্য এই বটম ড্রয়ার ব্যবহৃত হয়।
          </p>
          <Button className="w-full" onClick={() => setIsDrawerOpen(false)}>
            বুঝেছি (Close Drawer)
          </Button>
        </div>
      </Drawer>
    </Container>
  );
}

