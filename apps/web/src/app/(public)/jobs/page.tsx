'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  Coins,
  AlertTriangle,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
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
  Select,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';
import { JOBS, CATEGORIES } from '../../../data';

export default function JobsBoardPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedUrgency, setSelectedUrgency] = React.useState('all');

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || job.categorySlug === selectedCategory;

    const matchesUrgency =
      selectedUrgency === 'all' || job.urgency === selectedUrgency;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  return (
    <Container className="py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="কাজের বোর্ড (Live Job Marketplace)"
        description="গ্রাহকদের পোস্ট করা নতুন নতুন কাজের রিকোয়েস্ট দেখুন এবং সরাসরি আবেদন করে কাজ নিন।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'কাজের বোর্ড' },
            ]}
          />
        }
        badge={<Badge variant="default">সক্রিয় কাজের রিকোয়েস্ট</Badge>}
        actions={
          <Link href="/dashboard/jobs">
            <Button leftIcon={<PlusCircle className="h-4 w-4" />}>
              ফ্রি কাজ পোস্ট করুন
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex-1 w-full md:max-w-md">
          <Input
            placeholder="কাজের শিরোনাম বা এলাকা দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { value: 'all', label: 'সকল ক্যাটাগরি' },
              ...CATEGORIES.map((c) => ({ value: c.slug, label: c.title })),
            ]}
          />

          <Select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            options={[
              { value: 'all', label: 'সকল প্রয়োজনীয়তা' },
              { value: 'emergency', label: 'জরুরী (Emergency)' },
              { value: 'today', label: 'আজকের মধ্যে' },
              { value: 'flexible', label: 'সময় সুবিধাজনক' },
            ]}
          />
        </div>
      </div>

      {/* Job Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>মোট {filteredJobs.length}টি সক্রিয় কাজ রয়েছে</span>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
              <Card key={job.id} variant="interactive" className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <Badge variant="secondary" size="sm">
                      {job.category}
                    </Badge>
                    {job.urgency === 'emergency' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                        <AlertTriangle className="h-3 w-3" />
                        জরুরী
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {job.postedAt}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-snug">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {job.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{job.area}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{job.preferredDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{job.customerName}</span>
                      {job.customerVerified && (
                        <span className="text-[10px] text-emerald-700 font-semibold">(ভেরিফাইড)</span>
                      )}
                    </div>
                    <span className="text-slate-400">{job.totalProposals} জন আবেদন করেছেন</span>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between pt-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block">বাজেট ({job.budgetType})</span>
                    <span className="text-sm sm:text-base font-black text-emerald-700">
                      ৳ {job.budgetMin.toLocaleString()} - {job.budgetMax.toLocaleString()}
                    </span>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      বিস্তারিত দেখুন
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white">
            <Briefcase className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">কোনো কাজ খুঁজে পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে অন্য কোনো কিওয়ার্ড দিয়ে খুঁজুন।</p>
          </div>
        )}
      </div>
    </Container>
  );
}
