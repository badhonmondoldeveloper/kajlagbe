'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FileText,
  MapPin,
  Coins,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldCheck,
  Star,
  PauseCircle,
  PlayCircle,
  XCircle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Shield,
  History,
} from 'lucide-react';
import {
  Button,
  Badge,
  Avatar,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Modal,
} from '@kajlagbe/ui';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../../components/dashboard/dashboard-empty-state';
import { JobStatus, ApplicationStatus } from '@kajlagbe/types';

export interface ApplicantProposal {
  id: string;
  providerId: string;
  providerName: string;
  providerRating: number;
  providerReviewsCount: number;
  providerExperienceYears: number;
  providerPrimaryCategory: string;
  isProviderVerified: boolean;
  coverLetter: string;
  proposedPrice: number;
  pricingType: string;
  estimatedDays: number;
  status: ApplicationStatus;
  isShortlisted: boolean;
  createdAt: string;
}

export default function CustomerJobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const [jobStatus, setJobStatus] = React.useState<JobStatus>('PUBLISHED');
  const [selectedApplicant, setSelectedApplicant] = React.useState<ApplicantProposal | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'applications' | 'compare' | 'history'>('applications');

  const [applicants, setApplicants] = React.useState<ApplicantProposal[]>([
    {
      id: 'app-1',
      providerId: 'prov-1',
      providerName: 'মোঃ রফিকুল ইসলাম',
      providerRating: 5.0,
      providerReviewsCount: 14,
      providerExperienceYears: 8,
      providerPrimaryCategory: 'ac-repair',
      isProviderVerified: true,
      coverLetter: 'আমি ১০ বছর ধরে ডেল্টা সার্ভিস ও অন্যান্য প্রতিষ্ঠানে এসি ইন্সটলেশন ও কপার পাইপিংয়ের কাজ করেছি। যথাযথ প্রেসার টেস্ট ও ভ্যাকুয়াম নিশ্চিত করে দ্রুত সম্পন্ন করব।',
      proposedPrice: 1500,
      pricingType: 'FIXED',
      estimatedDays: 1,
      status: 'SUBMITTED',
      isShortlisted: false,
      createdAt: '১ ঘণ্টা আগে',
    },
    {
      id: 'app-2',
      providerId: 'prov-2',
      providerName: 'আব্দুল করিম',
      providerRating: 4.9,
      providerReviewsCount: 22,
      providerExperienceYears: 6,
      providerPrimaryCategory: 'electrician',
      isProviderVerified: true,
      coverLetter: 'ইনভার্টার এসি ইন্সটলেশনের জন্য প্রয়োজনীয় সকল ড্রিলিং ও সেফটি ইকুইপমেন্ট আমার সাথে থাকবে। আজ বিকেলেই কাজ শুরু করতে পারব।',
      proposedPrice: 1400,
      pricingType: 'FIXED',
      estimatedDays: 1,
      status: 'SUBMITTED',
      isShortlisted: true,
      createdAt: '৩০ মিনিট আগে',
    },
    {
      id: 'app-3',
      providerId: 'prov-3',
      providerName: 'হাসান মাহমুদ',
      providerRating: 4.8,
      providerReviewsCount: 9,
      providerExperienceYears: 4,
      providerPrimaryCategory: 'ac-repair',
      isProviderVerified: false,
      coverLetter: 'আপনার কাজটি অত্যন্ত যত্ন সহকারে সম্পন্ন করে দেওয়া হবে। কোনো গ্যাস লিকেজ হবে না।',
      proposedPrice: 1600,
      pricingType: 'FIXED',
      estimatedDays: 1,
      status: 'SUBMITTED',
      isShortlisted: false,
      createdAt: '১০ মিনিট আগে',
    },
  ]);

  const handleShortlist = (appId: string) => {
    setApplicants(
      applicants.map((a) =>
        a.id === appId ? { ...a, isShortlisted: !a.isShortlisted, status: 'SHORTLISTED' } : a
      )
    );
  };

  const handleReject = (appId: string) => {
    setApplicants(
      applicants.map((a) => (a.id === appId ? { ...a, status: 'REJECTED' } : a))
    );
  };

  const handleSelectProvider = async () => {
    if (!selectedApplicant) return;
    setIsProcessing(true);

    setTimeout(() => {
      setJobStatus('PROVIDER_SELECTED');
      setApplicants(
        applicants.map((a) =>
          a.id === selectedApplicant.id ? { ...a, status: 'ACCEPTED' } : a
        )
      );
      setIsProcessing(false);
      setIsConfirmModalOpen(false);
    }, 800);
  };

  const handlePauseToggle = () => {
    setJobStatus(jobStatus === 'PUBLISHED' ? 'PAUSED' : 'PUBLISHED');
  };

  return (
    <DashboardLayout
      title="কাজের রিকোয়েস্ট ও আবেদন ইনবক্স"
      subtitle="আবেদনকারী টেকনিশিয়ানদের কোটেশন যাচাই ও কারিগর নির্বাচন"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Back navigation */}
        <Link
          href="/customer/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>আমার সকল কাজের তালিকায় ফিরে যান</span>
        </Link>

        {/* Job Command Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {jobStatus === 'PUBLISHED' && <Badge variant="default">বিজ্ঞাপিত (Active)</Badge>}
              {jobStatus === 'PROVIDER_SELECTED' && <Badge variant="verified">প্রোভাইডার নির্বাচিত</Badge>}
              {jobStatus === 'PAUSED' && <Badge variant="secondary">স্থগিত (Paused)</Badge>}
              <span className="text-xs font-semibold text-emerald-700">এসি মেরামত ও সার্ভিস</span>
            </div>

            <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
              ৩টি ইনভার্টার এসি ইন্সটলেশন ও কপার পাইপ ওয়্যারিং
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" /> মিরপুর-১০, ঢাকা
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-900">
                <Coins className="h-3.5 w-3.5 text-amber-500" /> বাজেট: ৳ ১,২০০ - ২,০০০
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" /> সময়: আজকের মধ্যে
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {jobStatus === 'PUBLISHED' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePauseToggle}
                leftIcon={<PauseCircle className="h-4 w-4" />}
              >
                স্থগিত করুন
              </Button>
            )}
            {jobStatus === 'PAUSED' && (
              <Button
                size="sm"
                onClick={handlePauseToggle}
                leftIcon={<PlayCircle className="h-4 w-4" />}
              >
                পুনরায় চালু করুন
              </Button>
            )}
          </div>
        </div>

        {/* Protected Residential Address Card */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-700 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-emerald-950">বাসার প্রাইভেট ঠিকানা (সুরক্ষিত):</span>
              <p className="text-xs text-emerald-800">বাড়ি # ১২, রোড # ৪, ব্লক সি, মিরপুর-১০, ঢাকা</p>
            </div>
          </div>
          <Badge variant="verified" size="sm">প্রাইভেসি সুরক্ষিত</Badge>
        </div>

        {/* Navigation Tabs (Applications / Compare / History) */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'applications', label: `আবেদনকারীগণ (${applicants.length} জন)`, icon: Users },
            { id: 'compare', label: 'কোটেশন তুলনা (Compare)', icon: Coins },
            { id: 'history', label: 'স্ট্যাটাস হিস্ট্রি', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: APPLICATIONS LIST */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div
                key={app.id}
                className={`rounded-2xl border bg-white p-5 sm:p-6 transition space-y-4 ${
                  app.status === 'ACCEPTED'
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                    : app.status === 'REJECTED'
                    ? 'border-slate-200 opacity-60 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Provider Identity & Quote */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-start gap-3.5">
                    <Avatar fallback={app.providerName} size="lg" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{app.providerName}</h4>
                        {app.isProviderVerified && (
                          <Badge variant="verified" size="sm">NID ভেরিফাইড</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-bold text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" /> {app.providerRating} ({app.providerReviewsCount} রিভিউ)
                        </span>
                        <span>•</span>
                        <span>{app.providerExperienceYears} বছরের অভিজ্ঞতা</span>
                      </div>
                    </div>
                  </div>

                  {/* Proposed Quote Box */}
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3 text-right">
                    <span className="text-[10px] text-slate-500 font-semibold block">প্রস্তাবিত পারিশ্রমিক</span>
                    <span className="text-base sm:text-xl font-black text-emerald-800">
                      ৳ {app.proposedPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-medium">
                      আনুমানিক সময়: {app.estimatedDays} দিন
                    </span>
                  </div>
                </div>

                {/* Proposal Message */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700">আবেদনের বিবরণ:</span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                    &ldquo;{app.coverLetter}&rdquo;
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">{app.createdAt} জমা দেওয়া হয়েছে</span>

                  <div className="flex items-center gap-2">
                    {app.status === 'ACCEPTED' ? (
                      <Badge variant="verified" size="md">নির্বাচিত কারিগর (Selected)</Badge>
                    ) : app.status === 'REJECTED' ? (
                      <span className="text-xs text-rose-500 font-bold">বাতিলকৃত</span>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShortlist(app.id)}
                        >
                          {app.isShortlisted ? 'শর্টলিস্ট বাতিল' : 'শর্টলিস্ট করুন'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleReject(app.id)}
                          className="text-rose-600 hover:bg-rose-50"
                        >
                          প্রত্যাখ্যান
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedApplicant(app);
                            setIsConfirmModalOpen(true);
                          }}
                          leftIcon={<CheckCircle2 className="h-4 w-4" />}
                        >
                          নিযুক্ত করুন (Select)
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: QUOTE COMPARISON MATRIX */}
        {activeTab === 'compare' && (
          <Card className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="p-3.5">কারিগর</th>
                  <th className="p-3.5">রেটিং ও অভিজ্ঞতা</th>
                  <th className="p-3.5">ভেরিফিকেশন</th>
                  <th className="p-3.5">প্রস্তাবিত ফি</th>
                  <th className="p-3.5">আনুমানিক সময়</th>
                  <th className="p-3.5 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 font-bold text-slate-900">{app.providerName}</td>
                    <td className="p-3.5 text-slate-600">
                      ★ {app.providerRating} • {app.providerExperienceYears} বছর
                    </td>
                    <td className="p-3.5">
                      {app.isProviderVerified ? (
                        <span className="text-emerald-700 font-bold">ভেরিফাইড</span>
                      ) : (
                        <span className="text-slate-400">সাধারণ</span>
                      )}
                    </td>
                    <td className="p-3.5 font-black text-emerald-800 text-sm">
                      ৳ {app.proposedPrice.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-slate-600">{app.estimatedDays} দিন</td>
                    <td className="p-3.5 text-right">
                      {app.status === 'ACCEPTED' ? (
                        <Badge variant="verified" size="sm">নির্বাচিত</Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedApplicant(app);
                            setIsConfirmModalOpen(true);
                          }}
                        >
                          নিযুক্ত
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* TAB 3: STATUS HISTORY */}
        {activeTab === 'history' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">কাজের স্ট্যাটাস অডিট লগ</h4>
            <div className="space-y-3">
              {[
                { title: 'বিজ্ঞাপন প্রকাশ করা হয়েছে', time: '২ ঘণ্টা আগে', note: 'গ্রাহক দ্বারা সফলভাবে পোস্ট সম্পন্ন' },
                { title: 'ড্রাফট তৈরি হয়েছে', time: '৩ ঘণ্টা আগে', note: 'প্রাথমিক খসড়া সংরক্ষণ' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900">{log.title}</span>
                    <p className="text-slate-500">{log.note}</p>
                    <span className="text-[10px] text-slate-400 block">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="প্রোভাইডার নির্বাচন নিশ্চিতকরণ"
      >
        <div className="space-y-4 p-2">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            আপনি কি <strong>{selectedApplicant?.providerName}</strong>-কে <strong>৳{selectedApplicant?.proposedPrice.toLocaleString()}</strong> পারিশ্রমিকে আপনার কাজের জন্য চূড়ান্তভাবে নির্বাচন করতে চান?
          </p>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900 space-y-1">
            <span className="font-bold">গুরুত্বপূর্ণ তথ্য:</span>
            <p>
              প্রোভাইডার নির্বাচন নিশ্চিত করার পর কারিগরের কাছে আপনার বুকিং রিকোয়েস্ট চলে যাবে এবং তিনি কাজের জন্য আপনার সাথে যোগাযোগ করবেন।
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              বাতিল
            </Button>
            <Button
              size="sm"
              onClick={handleSelectProvider}
              isLoading={isProcessing}
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
            >
              হ্যাঁ, নিশ্চিত করুন
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

