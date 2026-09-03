import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  Coins,
  AlertTriangle,
  CheckCircle2,
  Users,
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
  Container,
  Breadcrumb,
  SectionHeader,
} from '@kajlagbe/ui';
import { JOBS } from '../../../../data';

interface JobDetailsProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return JOBS.map((j) => ({
    id: j.id,
  }));
}

export default function JobDetailsPage({ params }: JobDetailsProps) {
  const job = JOBS.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  const relatedJobs = JOBS.filter(
    (j) => j.id !== job.id && j.categorySlug === job.categorySlug,
  );

  return (
    <div className="space-y-10 sm:space-y-12 py-8 sm:py-12 pb-16">
      <Container>
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'কাজের বোর্ড', href: '/jobs' },
              { label: job.title },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Details (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" size="sm">{job.category}</Badge>
                  {job.urgency === 'emergency' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                      <AlertTriangle className="h-3 w-3" />
                      জরুরী ভিত্তিতে প্রয়োজন
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-medium">পোস্ট: {job.postedAt}</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span>{job.area}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>সময়: {job.preferredDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>{job.totalProposals} জন আবেদনকারী</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">কাজের বিস্তারিত বিবরণ:</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              {job.requirements.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">প্রয়োজনীয় যোগ্যতা ও শর্তাবলী:</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            {/* Safety & Customer Verification Note */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>কাস্টমার প্রাইভেসি ও নিরাপত্তা</span>
              </div>
              <p className="leading-relaxed">
                আপনার আবেদনের পর কাস্টমার সম্মতি দিলে সরাসরি যোগাযোগ নম্বর ও সঠিক ফ্ল্যাট ঠিকানা শেয়ার করা হবে।
                কোনো অগ্রিম ফি বা জামানত ছাড়া কাজ সম্পন্ন করার পর KajLagbe এসক্রো এর মাধ্যমে সুরক্ষিত পেমেন্ট নিশ্চিত করা হয়।
              </p>
            </div>
          </div>

          {/* Right Sidebar: Apply Action Box */}
          <div className="space-y-6">
            <Card className="p-6 space-y-6 border-emerald-200 shadow-md">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">কাস্টমার বাজেট সীমা</span>
                <div className="text-2xl font-black text-emerald-700">
                  ৳ {job.budgetMin.toLocaleString()} - {job.budgetMax.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">বাজেটের ধরণ: {job.budgetType}</span>
              </div>

              <div className="space-y-3 pt-2">
                <Link href="/for-providers">
                  <Button size="lg" className="w-full font-bold shadow-sm">
                    কাজে আবেদন করুন (Apply Now)
                  </Button>
                </Link>
                <p className="text-[11px] text-center text-slate-400">
                  আবেদন করতে প্রোভাইডার একাউন্টে লগইন করুন
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>কাস্টমার স্ট্যাটাস:</span>
                  <span className="font-semibold text-slate-800">{job.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ভেরিফিকেশন:</span>
                  <span className="font-semibold text-emerald-700">
                    {job.customerVerified ? 'ভেরিফাইড কাস্টমার' : 'সাধারণ কাস্টমার'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">একই ক্যাটাগরির অন্যান্য কাজ</h3>
                <div className="space-y-3">
                  {relatedJobs.slice(0, 2).map((rj) => (
                    <Link key={rj.id} href={`/jobs/${rj.id}`}>
                      <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300 transition space-y-1.5">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{rj.title}</h4>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">{rj.area}</span>
                          <span className="font-bold text-emerald-700">৳ {rj.budgetMin} - {rj.budgetMax}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

