'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bookmark, MapPin, Coins, Trash2, ArrowRight } from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';

export default function ProviderSavedJobsPage() {
  const [savedJobs, setSavedJobs] = React.useState<any[]>([
    {
      id: 'job-101',
      title: '৩টি ইনভার্টার এসি ইন্সটলেশন ও কপার পাইপ ওয়্যারিং',
      category: 'এসি মেরামত',
      area: 'মিরপুর-১০, ঢাকা',
      budgetMin: 1200,
      budgetMax: 2000,
      totalProposals: 3,
    },
  ]);

  const handleRemove = (jobId: string) => {
    setSavedJobs(savedJobs.filter((j) => j.id !== jobId));
  };

  return (
    <DashboardLayout
      title="সংরক্ষিত কাজের বিজ্ঞাপন"
      subtitle="পরবর্তীতে আবেদন করার জন্য আপনার বুকমার্ক করে রাখা কাজসমূহ"
    >
      <div className="space-y-6 max-w-5xl">
        {savedJobs.length === 0 ? (
          <DashboardEmptyState
            icon={Bookmark}
            title="কোনো সংরক্ষিত কাজ নেই"
            description="কাজের সুযোগ দেখার সময় বুকমার্ক আইকনে ক্লিক করে সহজেই সংরক্ষণ করে রাখতে পারেন।"
            actionText="কাজের বোর্ড দেখুন"
            actionHref="/provider/jobs"
          />
        ) : (
          <div className="space-y-3">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <Badge variant="secondary" size="sm">{job.category}</Badge>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {job.area}
                    </span>
                    <span className="font-bold text-emerald-800">
                      ৳ {job.budgetMin.toLocaleString()} - {job.budgetMax.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/jobs/${job.id}`}>
                    <Button size="sm">
                      আবেদন করুন
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemove(job.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
