'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  Clock,
  Coins,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { JobStatus, JobUrgency, BudgetType } from '@kajlagbe/types';

export interface CustomerJobItem {
  id: string;
  title: string;
  categorySlug: string;
  generalArea: string;
  status: JobStatus;
  urgency: JobUrgency;
  budgetType: BudgetType;
  budgetMin?: number;
  budgetMax?: number;
  totalApplications: number;
  createdAt: string;
}

export default function CustomerJobsPage() {
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const [jobs, setJobs] = React.useState<CustomerJobItem[]>([
    {
      id: 'job-101',
      title: '৩টি ইনভার্টার এসি ইন্সটলেশন ও কপার পাইপ ওয়্যারিং',
      categorySlug: 'ac-repair',
      generalArea: 'মিরপুর-১০, ঢাকা',
      status: 'PUBLISHED',
      urgency: 'TODAY',
      budgetType: 'BUDGET_RANGE',
      budgetMin: 1200,
      budgetMax: 2000,
      totalApplications: 3,
      createdAt: '২ ঘণ্টা আগে',
    },
    {
      id: 'job-102',
      title: 'বাসার মেইন ডিবি বোর্ড মেরামত ও শর্ট সার্কিট ফিক্স',
      categorySlug: 'electrician',
      generalArea: 'উত্তরা সেক্টর ৭, ঢাকা',
      status: 'PROVIDER_SELECTED',
      urgency: 'URGENT',
      budgetType: 'FIXED_BUDGET',
      budgetMin: 800,
      budgetMax: 800,
      totalApplications: 4,
      createdAt: 'গতকাল',
    },
  ]);

  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === 'all') return true;
    return job.status === activeFilter;
  });

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="secondary" size="sm">ড্রাফট (Draft)</Badge>;
      case 'PUBLISHED':
        return <Badge variant="default" size="sm">বিজ্ঞাপিত (Active)</Badge>;
      case 'PAUSED':
        return <Badge variant="secondary" size="sm">স্থগিত (Paused)</Badge>;
      case 'PROVIDER_SELECTED':
        return <Badge variant="verified" size="sm">প্রোভাইডার নির্বাচিত</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="verified" size="sm">চলমান (In Progress)</Badge>;
      case 'COMPLETED':
        return <Badge variant="verified" size="sm">সম্পন্ন (Completed)</Badge>;
      case 'CANCELLED':
        return <Badge variant="error" size="sm">বাতিলকৃত</Badge>;
      default:
        return <Badge variant="secondary" size="sm">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="আমার পোস্টকৃত কাজের বিজ্ঞাপন"
      subtitle="কাজের আবেদনসমূহ দেখুন, দরপ্রস্তাব যাচাই করুন এবং প্রোভাইডার নির্বাচন করুন"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-slate-100 p-1">
            {[
              { id: 'all', label: 'সকল কাজ', count: jobs.length },
              { id: 'PUBLISHED', label: 'বিজ্ঞাপিত', count: jobs.filter((j) => j.status === 'PUBLISHED').length },
              { id: 'PROVIDER_SELECTED', label: 'নির্বাচিত', count: jobs.filter((j) => j.status === 'PROVIDER_SELECTED').length },
              { id: 'DRAFT', label: 'ড্রাফট', count: jobs.filter((j) => j.status === 'DRAFT').length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      activeFilter === tab.id ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <Link href="/post-job" className="shrink-0">
            <Button size="sm" leftIcon={<PlusCircle className="h-4 w-4" />}>
              নতুন কাজ পোস্ট করুন
            </Button>
          </Link>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <DashboardEmptyState
            icon={FileText}
            title="কোনো কাজ পাওয়া যায়নি"
            description="আপনার বাসা বা অফিসের জন্য প্রয়োজনীয় কাজের বিজ্ঞাপন পোস্ট করে দ্রুত সেরা কারিগর বেছে নিন।"
            actionText="নতুন কাজ পোস্ট করুন"
            actionHref="/post-job"
          />
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getStatusBadge(job.status)}
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-500">{job.createdAt}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-emerald-700 capitalize">{job.categorySlug}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    <Link href={`/customer/jobs/${job.id}`} className="hover:text-emerald-700 transition">
                      {job.title}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{job.generalArea}</span>
                    </div>

                    <div className="flex items-center gap-1 font-semibold text-slate-900">
                      <Coins className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>
                        ৳ {job.budgetMin?.toLocaleString()} {job.budgetMax && job.budgetMax !== job.budgetMin ? `- ৳ ${job.budgetMax.toLocaleString()}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      <span>{job.totalApplications} জন আবেদন করেছেন</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <Link href={`/customer/jobs/${job.id}`}>
                    <Button size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                      আবেদন ও কোটেশন দেখুন
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
