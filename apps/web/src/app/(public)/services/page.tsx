'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Flame,
  Zap,
  Sparkles,
  Hammer,
  Truck,
  Paintbrush,
  Search,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';
import { CATEGORIES } from '../../../data';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGroup, setSelectedGroup] = React.useState<'all' | 'home' | 'appliance' | 'vehicle'>('all');

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Flame,
    Zap,
    Wrench,
    Sparkles,
    Hammer,
    Truck,
    Paintbrush,
  };

  const filteredCategories = CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subservices.some((sub) => sub.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGroup = selectedGroup === 'all' || cat.group === selectedGroup;

    return matchesSearch && matchesGroup;
  });

  return (
    <Container className="py-8 sm:py-12 space-y-10">
      {/* Header & Breadcrumb */}
      <PageHeader
        title="সকল সেবা ডিরেক্টরি (All Services)"
        description="আপনার বাসা, অফিস বা বাণিজ্যিক প্রতিষ্ঠানের জন্য প্রয়োজনীয় সকল প্রকার মেরামত ও রক্ষণাবেক্ষণ সেবা।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'সেবা ডিরেক্টরি' },
            ]}
          />
        }
        badge={<Badge variant="verified">৬৪ জেলায় কাভারেজ</Badge>}
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        {/* Search input */}
        <div className="w-full md:w-96">
          <Input
            placeholder="সার্ভিস বা কাজের নাম লিখে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Category group filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'সকল সেবা' },
            { id: 'home', label: 'গৃহস্থালী ও ওয়্যারিং' },
            { id: 'appliance', label: 'এসি ও হোম অ্যাপ্লায়েন্স' },
            { id: 'vehicle', label: 'শিফটিং ও পরিবহন' },
          ].map((grp) => (
            <button
              key={grp.id}
              type="button"
              onClick={() => setSelectedGroup(grp.id as 'all' | 'home' | 'appliance' | 'vehicle')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedGroup === grp.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {grp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench;

            return (
              <Card key={cat.id} variant="interactive" className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${cat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base sm:text-lg">{cat.title}</CardTitle>
                        {cat.popular && <Badge variant="verified" size="sm">জনপ্রিয়</Badge>}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{cat.titleEn}</p>
                    </div>
                  </div>
                  <CardDescription className="mt-3 line-clamp-2">
                    {cat.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 pt-0">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    প্রধান সাব-সেবাসমূহ:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {cat.subservices.slice(0, 3).map((sub) => (
                      <li key={sub.id} className="flex items-center justify-between">
                        <span className="truncate max-w-[200px]">• {sub.name}</span>
                        <span className="text-emerald-700 font-medium shrink-0">{sub.priceRange}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="flex items-center justify-between pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">শুরু মাত্র</span>
                    <span className="text-sm font-black text-emerald-700">৳ {cat.startingPrice}</span>
                  </div>
                  <Link href={`/services/${cat.slug}`}>
                    <Button size="sm" variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      বিস্তারিত দেখুন
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <Wrench className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">কোনো সার্ভিস পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে অন্য কোনো কিওয়ার্ড দিয়ে খুঁজুন।</p>
          <Button size="sm" variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); setSelectedGroup('all'); }}>
            ফিল্টার রিসেট করুন
          </Button>
        </div>
      )}

      {/* Safety & Quality Guarantee */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>KajLagbe সার্ভিস কোয়ালিটি গ্যারান্টি</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            সকল সার্ভিসে আমরা নিশ্চিত করি দক্ষ ও যাচাইকৃত টেকনিশিয়ান। কাজের ৭ দিনের মধ্যে কোনো সমস্যা হলে ফ্রি রি-ওয়ার্ক সহায়তা দেওয়া হয়।
          </p>
        </div>
        <Link href="/safety">
          <Button size="sm" variant="primary">নিরাপত্তা নীতি জানুন</Button>
        </Link>
      </div>
    </Container>
  );
}
