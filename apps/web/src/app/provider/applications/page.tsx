'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  Coins,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
} from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { ApplicationStatus } from '@kajlagbe/types';

export interface ProviderApplicationItem {
  id: string;
  jobId: string;
  jobTitle: string;
  categorySlug: string;
  generalArea: string;
  proposedPrice: number;
  estimatedDays: number;
  status: ApplicationStatus;
  isShortlisted: boolean;
  createdAt: string;
}

export default function ProviderApplicationsPage() {
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const [applications, setApplications] = React.useState<ProviderApplicationItem[]>([
    {
      id: 'app-1',
      jobId: 'job-101',
      jobTitle: '৩টি ইনভার্টার এসি ইন্সটলেশন ও কপার পাইপ ওয়্যারিং',
      categorySlug: 'ac-repair',
      generalArea: 'মিরপুর-১০, ঢাকা',
      proposedPrice: 1500,
      estimatedDays: 1,
      status: 'SUBMITTED',
      isShortlisted: true,
      createdAt: '১ ঘণ্টা আগে',
    },
    {
      id: 'app-2',
      jobId: 'job-102',
      jobTitle: 'বাসার মেইন ডিবি বোর্ড মেরামত ও শর্ট সার্কিট ফিক্স',
      categorySlug: 'electrician',
      generalArea: 'উত্তরা সেক্টর ৭, ঢাকা',
      proposedPrice: 800,
      estimatedDays: 1,
      status: 'ACCEPTED',
      isShortlisted: false,
      createdAt: 'গতকাল',
    },
  ]);

  const filteredApps = applications.filter((app) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'SHORTLISTED') return app.isShortlisted || app.status === 'SHORTLISTED';
    return app.status === activeFilter;
  });

  const handleWithdraw = (appId: string) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status: 'WITHDRAWN' } : a))
    );
  };

  const getStatusBadge = (app: ProviderApplicationItem) => {
    if (app.status === 'ACCEPTED') {
      return <Badge variant="verified" size="sm">নির্বাচিত (Accepted)</Badge>;
    }
    if (app.status === 'SHORTLISTED' || app.isShortlisted) {
      return <Badge variant="default" size="sm">শর্টলিস্টেড (Shortlisted)</Badge>;
    }
    if (app.status === 'WITHDRAWN') {
      return <Badge variant="secondary" size="sm">প্রত্যাহারকৃত</Badge>;
    }
    if (app.status === 'REJECTED') {
      return <Badge variant="error" size="sm">প্রত্যাখ্যাত</Badge>;
    }
    return <Badge variant="secondary" size="sm">জমা দেওয়া হয়েছে</Badge>;
  };

  return (
    <DashboardLayout
      title="আমার জমাকৃত কাজের আবেদনপত্র"
      subtitle="কাজের আবেদনসমূহের সর্বশেষ অগ্রগতি, গ্রাহক সিদ্ধান্ত ও কোটেশন বিবরণ"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-slate-100 p-1">
          {[
            { id: 'all', label: 'সকল আবেদন', count: applications.length },
            { id: 'SUBMITTED', label: 'পর্যালোচনাধীন', count: applications.filter((a) => a.status === 'SUBMITTED').length },
            { id: 'SHORTLISTED', label: 'শর্টলিস্টেড', count: applications.filter((a) => a.isShortlisted).length },
            { id: 'ACCEPTED', label: 'গৃহীত', count: applications.filter((a) => a.status === 'ACCEPTED').length },
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

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <DashboardEmptyState
            icon={FileText}
            title="কোনো আবেদন পাওয়া যায়নি"
            description="কাজের বোর্ডে সক্রিয় সুযোগগুলো দেখুন এবং নতুন কোটেশন পাঠিয়ে আবেদন জমা দিন।"
            actionText="কাজের বোর্ড দেখুন"
            actionHref="/provider/jobs"
          />
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-slate-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getStatusBadge(app)}
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{app.createdAt} জমা দেওয়া হয়েছে</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-emerald-700 capitalize">{app.categorySlug}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {app.jobTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {app.generalArea}
                    </span>
                    <span className="flex items-center gap-1 font-black text-emerald-800 text-sm">
                      <Coins className="h-3.5 w-3.5 text-amber-500" /> আপনার প্রস্তাবিত ফি: ৳ {app.proposedPrice.toLocaleString()}
                    </span>
                    <span>সময়: {app.estimatedDays} দিন</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  {app.status === 'SUBMITTED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleWithdraw(app.id)}
                      className="text-rose-600 hover:bg-rose-50"
                    >
                      প্রত্যাহার করুন
                    </Button>
                  )}
                  <Link href={`/jobs/${app.jobId}`}>
                    <Button size="sm" variant="secondary">
                      কাজের বিবরণ
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
