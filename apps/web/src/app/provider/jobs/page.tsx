'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Coins,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Send,
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
  Modal,
} from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { useAuth } from '../../../context/auth-context';
import { CATEGORIES, JOBS } from '../../../data';

export default function ProviderJobsDiscoveryPage() {
  const { user, profile } = useAuth();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedUrgency, setSelectedUrgency] = React.useState('all');

  // Application Modal state
  const [activeJobForApply, setActiveJobForApply] = React.useState<any | null>(null);
  const [coverLetter, setCoverLetter] = React.useState('');
  const [proposedPrice, setProposedPrice] = React.useState('');
  const [estimatedDays, setEstimatedDays] = React.useState('1');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [appliedJobs, setAppliedJobs] = React.useState<string[]>([]);
  const [savedJobs, setSavedJobs] = React.useState<string[]>([]);

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || job.categorySlug === selectedCategory;
    const matchesUrg = selectedUrgency === 'all' || job.urgency === selectedUrgency;
    return matchesSearch && matchesCat && matchesUrg;
  });

  const handleOpenApply = (job: any) => {
    setActiveJobForApply(job);
    setProposedPrice(job.budgetMin.toString());
    setCoverLetter('');
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobForApply) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setAppliedJobs([...appliedJobs, activeJobForApply.id]);
      setIsSubmitting(false);
      setActiveJobForApply(null);
    }, 600);
  };

  const toggleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <DashboardLayout
      title="কাজের সুযোগ ও জব রাডার (Job Discovery)"
      subtitle="গ্রাহকদের পোস্ট করা নতুন কাজের বিজ্ঞাপন দেখুন এবং সরাসরি কোটেশন পাঠিয়ে কাজ নিন"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Search & Filter Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full md:max-w-md">
            <Input
              placeholder="কাজের শিরোনাম বা এলাকা দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-slate-400" />}
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
                { value: 'emergency', label: 'জরুরী' },
                { value: 'today', label: 'আজকের মধ্যে' },
                { value: 'flexible', label: 'সুবিধাজনক সময়ে' },
              ]}
            />
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>মোট {filteredJobs.length}টি কাজের সুযোগ রয়েছে</span>
            <Link href="/provider/saved-jobs" className="text-emerald-700 font-bold hover:underline">
              সংরক্ষিত কাজ ({savedJobs.length})
            </Link>
          </div>

          {filteredJobs.length === 0 ? (
            <DashboardEmptyState
              icon={Briefcase}
              title="কোনো কাজ পাওয়া যায়নি"
              description="অন্য কোনো ক্যাটাগরি বা এলাকা দিয়ে খুঁজে দেখুন।"
            />
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const hasApplied = appliedJobs.includes(job.id);
                const isSaved = savedJobs.includes(job.id);

                return (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-slate-300 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" size="sm">{job.category}</Badge>
                        {job.urgency === 'emergency' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                            <AlertTriangle className="h-3 w-3" /> জরুরী
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-medium">{job.postedAt}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {job.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {job.area}
                        </span>
                        <span className="flex items-center gap-1 font-black text-emerald-800 text-sm">
                          <Coins className="h-3.5 w-3.5 text-amber-500" /> ৳ {job.budgetMin.toLocaleString()} - {job.budgetMax.toLocaleString()}
                        </span>
                        <span className="text-slate-400">
                          {job.totalProposals} জন আবেদন করেছেন
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => toggleSave(job.id)}
                        className={`p-2.5 rounded-xl border transition ${
                          isSaved
                            ? 'bg-amber-50 border-amber-200 text-amber-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                        title="সংরক্ষণ করুন"
                      >
                        <Bookmark className="h-4 w-4 fill-current" />
                      </button>

                      {hasApplied ? (
                        <Badge variant="verified" size="md">আবেদন সম্পন্ন</Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleOpenApply(job)}
                          leftIcon={<Send className="h-4 w-4" />}
                        >
                          আবেদন ও কোটেশন পাঠান
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Apply Proposal Modal */}
      <Modal
        isOpen={!!activeJobForApply}
        onClose={() => setActiveJobForApply(null)}
        title="কাজের আবেদন ও দরপ্রস্তাব"
      >
        {activeJobForApply && (
          <form onSubmit={handleSubmitApplication} className="space-y-4 p-2">
            <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block">কাজের বিষয়</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{activeJobForApply.title}</h4>
              <span className="text-xs text-emerald-800 font-bold block">
                গ্রাহকের বাজেট: ৳ {activeJobForApply.budgetMin} - {activeJobForApply.budgetMax}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  আপনার প্রস্তাবিত পারিশ্রমিক (৳) <span className="text-rose-500">*</span>
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
                <label className="text-xs font-bold text-slate-800">কাজের আনুমানিক সময় (দিন)</label>
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
                কাজের প্রস্তাব ও আপনার অভিজ্ঞতা (Cover Letter) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                placeholder="কেন আপনি এই কাজের জন্য উপযুক্ত? আপনার পূর্বের অভিজ্ঞতা ও কাজের প্রতিশ্রুতি উল্লেখ করুন..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveJobForApply(null)}
              >
                বাতিল
              </Button>
              <Button
                type="submit"
                size="sm"
                isLoading={isSubmitting}
                leftIcon={<Send className="h-4 w-4" />}
              >
                আবেদন জমা দিন
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </DashboardLayout>
  );
}
