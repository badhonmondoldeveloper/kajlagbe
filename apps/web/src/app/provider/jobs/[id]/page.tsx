'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Briefcase,
  MapPin,
  Coins,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@kajlagbe/ui';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { JOBS } from '../../../../data';

export default function ProviderJobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const job = JOBS.find((j) => j.id === jobId) || JOBS[0];

  const [coverLetter, setCoverLetter] = React.useState('');
  const [proposedPrice, setProposedPrice] = React.useState(job.budgetMin.toString());
  const [estimatedDays, setEstimatedDays] = React.useState('1');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isApplied, setIsApplied] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplied(true);
    }, 600);
  };

  return (
    <DashboardLayout
      title="কাজের বিস্তারিত ও আবেদন"
      subtitle="কাজের সকল শর্তাবলী ও বিবরণ দেখে আপনার দরপ্রস্তাব পাঠান"
    >
      <div className="space-y-6 max-w-4xl">
        <Link
          href="/provider/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>সকল কাজের সুযোগে ফিরে যান</span>
        </Link>

        {/* Job Summary Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{job.category}</Badge>
            <span className="text-xs text-slate-400 font-medium">{job.postedAt}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {job.area}
            </span>
            <span className="flex items-center gap-1 font-bold text-emerald-800 text-sm">
              <Coins className="h-3.5 w-3.5 text-amber-500" /> বাজেট: ৳ {job.budgetMin.toLocaleString()} - {job.budgetMax.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> সময়: {job.preferredDate}
            </span>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800">কাজের পূর্ণ বিবরণ:</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-xs font-bold text-slate-800">প্রয়োজনীয় শর্তাবলী:</span>
            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4 text-xs text-sky-950 flex items-center gap-3">
          <Shield className="h-5 w-5 text-sky-700 shrink-0" />
          <span>
            গ্রাহকের নিরাপত্তা ও গোপনীয়তা রক্ষার স্বার্থে পূর্ণ ঠিকানা এবং ফোন নম্বর গ্রাহক কর্তৃক আপনার আবেদন গৃহীত হওয়ার পর স্বয়ংক্রিয়ভাবে উন্মুক্ত করা হবে।
          </span>
        </div>

        {/* Application Form */}
        <Card className="p-6 sm:p-8 space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-base">আপনার আবেদন ও দরপ্রস্তাব জমা দিন</CardTitle>
            <CardDescription>সঠিক পারিশ্রমিক ও পরিষ্কার কাজের প্রতিশ্রুতি লিখুন</CardDescription>
          </CardHeader>

          {isApplied ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950">আপনার আবেদনটি সফলভাবে জমা হয়েছে!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                গ্রাহক আপনার কোটেশন পর্যালোচনা করছেন। গ্রাহকের সিদ্ধান্ত হলে আপনাকে নোটিফিকেশনের মাধ্যমে জানানো হবে।
              </p>
              <Link href="/provider/applications" className="inline-block pt-2">
                <Button size="sm">আমার আবেদনসমূহ দেখুন</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    আপনার প্রস্তাবিত মোট ফি (৳) <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min={100}
                    value={proposedPrice}
                    onChange={(e) => setProposedPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">কাজ শেষ করতে সম্ভাব্য সময় (দিন)</label>
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  আবেদন বার্তা ও আপনার কাজের প্রতিশ্রুতি <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                  placeholder="যেমন: আমি ইনভার্টার এসি ওয়্যারিং ও পাইপিংয়ের কাজে অভিজ্ঞ..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="h-4 w-4" />}
                >
                  আবেদন ও কোটেশন পাঠান
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}

