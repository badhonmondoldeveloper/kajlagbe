'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Wrench,
  FileText,
  MapPin,
  Coins,
  Clock,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Save,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';
import { useAuth } from '../../../context/auth-context';
import { CATEGORIES, DIVISIONS } from '../../../data';
import { BudgetType, JobUrgency } from '@kajlagbe/types';

export default function PostJobPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = React.useState(1);

  // Form State
  const [selectedCategory, setSelectedCategory] = React.useState('electrician');
  const [selectedService, setSelectedService] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [requirements, setRequirements] = React.useState<string[]>(['']);

  const [division, setDivision] = React.useState('Dhaka');
  const [generalArea, setGeneralArea] = React.useState('');
  const [privateAddress, setPrivateAddress] = React.useState('');

  const [budgetType, setBudgetType] = React.useState<BudgetType>('BUDGET_RANGE');
  const [budgetMin, setBudgetMin] = React.useState('500');
  const [budgetMax, setBudgetMax] = React.useState('1500');

  const [urgency, setUrgency] = React.useState<JobUrgency>('FLEXIBLE');
  const [preferredDate, setPreferredDate] = React.useState('');
  const [preferredTime, setPreferredTime] = React.useState('যেকোনো সময়');

  const [notes, setNotes] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  const addRequirementField = () => {
    setRequirements([...requirements, '']);
  };

  const updateRequirement = (index: number, val: string) => {
    const updated = [...requirements];
    updated[index] = val;
    setRequirements(updated);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const validateStep = (step: number): boolean => {
    setErrorMsg(null);
    if (step === 1) {
      if (!selectedCategory) {
        setErrorMsg('অনুগ্রহ করে একটি সার্ভিস ক্যাটাগরি নির্বাচন করুন।');
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!title.trim() || title.length < 5) {
        setErrorMsg('কাজের শিরোনাম কমপক্ষে ৫ অক্ষরের হতে হবে।');
        return false;
      }
      if (!description.trim() || description.length < 20) {
        setErrorMsg('কাজের বিস্তারিত বিবরণ কমপক্ষে ২০ অক্ষরের হতে হবে।');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!generalArea.trim()) {
        setErrorMsg('সাধারণ এলাকা প্রদান করুন (যেমন: মিরপুর-১০, ঢাকা)।');
        return false;
      }
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinish = async (isDraft: boolean) => {
    setErrorMsg(null);
    setIsSubmitting(true);

    // Simulate creation and navigate
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/customer/jobs');
    }, 800);
  };

  const steps = [
    { num: 1, title: 'সার্ভিস খাত', icon: Wrench },
    { num: 2, title: 'বিবরণ ও শর্ত', icon: FileText },
    { num: 3, title: 'এলাকা ও ঠিকানা', icon: MapPin },
    { num: 4, title: 'বাজেট পছন্দ', icon: Coins },
    { num: 5, title: 'সময় ও জরুরীতা', icon: Clock },
    { num: 6, title: 'সংযুক্তি ও নোট', icon: Paperclip },
    { num: 7, title: 'পর্যালোচনা ও প্রকাশ', icon: CheckCircle2 },
  ];

  return (
    <Container className="py-8 sm:py-12 space-y-8 max-w-4xl">
      <PageHeader
        title="নতুন কাজের রিকোয়েস্ট তৈরি করুন"
        description="কাজের বিবরণ ও বাজেট দিন। দক্ষ ও যাচাইকৃত টেকনিশিয়ানরা আপনাকে দরপ্রস্তাব পাঠাবে।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'কাজের বোর্ড', href: '/jobs' },
              { label: 'পোস্ট জব' },
            ]}
          />
        }
      />

      {/* Stepper Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px]">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs transition ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-600'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={`text-[11px] font-bold ${
                      isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > idx + 1 ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-800">
          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Wizard Steps Content */}
      <Card className="p-6 sm:p-8 space-y-6">
        {/* STEP 1: CATEGORY & SERVICE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">ধাপ ১: কোন ধরনের কাজের কারিগর প্রয়োজন?</h3>
              <p className="text-xs text-slate-500 mt-0.5">নিচের ক্যাটাগরিগুলো থেকে আপনার প্রয়োজনীয় সার্ভিস খাত বেছে নিন।</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setSelectedService('');
                  }}
                  className={`cursor-pointer rounded-2xl border p-4 text-center transition ${
                    selectedCategory === cat.slug
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-3xl block mb-1.5">{cat.icon}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{cat.title}</h4>
                </div>
              ))}
            </div>

            {activeCategoryObj && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800">নির্দিষ্ট উপ-সেবা (ঐচ্ছিক)</label>
                <div className="flex flex-wrap gap-2">
                  {activeCategoryObj.subservices.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedService(sub.name)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition ${
                        selectedService === sub.name
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: DESCRIPTION & REQUIREMENTS */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">ধাপ ২: কাজের বিবরণ ও প্রয়োজনীয় শর্তাবলী</h3>
              <p className="text-xs text-slate-500 mt-0.5">কাজের ধরন স্পষ্ট করে লিখলে দক্ষ টেকনিশিয়ানরা সঠিক দরপ্রস্তাব দিতে পারে।</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                কাজের শিরোনাম (Job Title) <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="যেমন: ৩টি ইনভার্টার এসি ইন্সটলেশন ও পাইপ ফিটিং"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                কাজের বিস্তারিত বিবরণ (Description) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                placeholder="কাজের বর্তমান অবস্থা, কী কী সমস্যা এবং কী সমাধান প্রয়োজন বিস্তারিত লিখুন..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Special Requirements */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">প্রোভাইডারের বিশেষ যোগ্যতা / শর্ত</label>
                <button
                  type="button"
                  onClick={addRequirementField}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  + শর্ত যোগ করুন
                </button>
              </div>

              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    placeholder={`যেমন: নিজস্ব ল্যাডার ও ড্রিল মেশিন থাকতে হবে`}
                    value={req}
                    onChange={(e) => updateRequirement(idx, e.target.value)}
                  />
                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION & PRIVACY */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">ধাপ ৩: কাজের এলাকা ও ঠিকানা</h3>
              <p className="text-xs text-slate-500 mt-0.5">আপনার গোপনীয়তা সুরক্ষিত থাকবে। শুধুমাত্র ভেরিফাইড টেকনিশিয়ান কাজ পাওয়ার পর পূর্ণ ঠিকানা দেখতে পাবেন।</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">বিভাগ</label>
                <Select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  options={DIVISIONS.map((d) => ({ value: d.id, label: d.name }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  সাধারণ এলাকা (Public Area) <span className="text-rose-500">*</span>
                </label>
                <Input
                  placeholder="যেমন: মিরপুর-১০, ঢাকা"
                  value={generalArea}
                  onChange={(e) => setGeneralArea(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4 text-emerald-600" />}
                  required
                />
                <span className="text-[10px] text-slate-400 block">এটি কাজের বিজ্ঞাপনে প্রকাশ্যে দেখা যাবে।</span>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-bold text-slate-800">
                বাসা/অফিসের পূর্ণ ঠিকানা (Private Address)
              </label>
              <Input
                placeholder="যেমন: বাসা # ১২, রোড # ৪, ব্লক সি, মিরপুর-১০"
                value={privateAddress}
                onChange={(e) => setPrivateAddress(e.target.value)}
              />
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 mt-1">
                <Shield className="h-4 w-4 shrink-0" />
                <span>নিরাপত্তা গ্যারান্টি: এই পূর্ণ ঠিকানাটি প্রোভাইডার নিশ্চিত হওয়ার আগ পর্যন্ত সম্পূর্ণ গোপন থাকবে।</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET PREFERENCES */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">ধাপ ৪: বাজেট ও পেমেন্ট পছন্দ</h3>
              <p className="text-xs text-slate-500 mt-0.5">আপনার আনুমানিক বাজেট নির্ধারণ করুন।</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'BUDGET_RANGE', label: 'বাজেট সীমা (Range)', desc: 'সর্বনিম্ন ও সর্বোচ্চ বাজেট' },
                { id: 'FIXED_BUDGET', label: 'নির্দিষ্ট বাজেট (Fixed)', desc: 'ফিক্সড রেটে কাজ' },
                { id: 'REQUEST_QUOTES', label: 'দরপ্রস্তাব আহবান (Quotes)', desc: 'কারিগরদের কোটেশন দেখতে চান' },
              ].map((b) => (
                <div
                  key={b.id}
                  onClick={() => setBudgetType(b.id as any)}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    budgetType === b.id
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{b.label}</h4>
                  <p className="text-xs text-slate-500 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>

            {budgetType === 'BUDGET_RANGE' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">সর্বনিম্ন বাজেট (৳)</label>
                  <Input
                    type="number"
                    min={100}
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">সর্বোচ্চ বাজেট (৳)</label>
                  <Input
                    type="number"
                    min={100}
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                  />
                </div>
              </div>
            )}

            {budgetType === 'FIXED_BUDGET' && (
              <div className="space-y-1 pt-2 max-w-sm">
                <label className="text-xs font-bold text-slate-800">নির্দিষ্ট বাজেট (৳)</label>
                <Input
                  type="number"
                  min={100}
                  value={budgetMin}
                  onChange={(e) => {
                    setBudgetMin(e.target.value);
                    setBudgetMax(e.target.value);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 5: TIMING & URGENCY */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">ধাপ ৫: সেবা গ্রহণের সময় ও প্রয়োজনীয়তা</h3>
              <p className="text-xs text-slate-500 mt-0.5">কখন আপনি কাজটি সম্পন্ন করাতে চান?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { id: 'FLEXIBLE', label: 'সুবিধাজনক সময়ে', desc: 'যে কোনো দিন' },
                { id: 'TODAY', label: 'আজকের মধ্যে', desc: 'আজই কাজ শুরু' },
                { id: 'URGENT', label: 'জরুরী (Urgent)', desc: 'খুব শীঘ্রই' },
                { id: 'EMERGENCY_REQUEST', label: 'জরুরী রিকোয়েস্ট', desc: 'তাৎক্ষণিক প্রয়োজন' },
              ].map((u) => (
                <div
                  key={u.id}
                  onClick={() => setUrgency(u.id as any)}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    urgency === u.id
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{u.label}</h4>
                  <p className="text-xs text-slate-500 mt-1">{u.desc}</p>
                </div>
              ))}
            </div>

            {urgency === 'EMERGENCY_REQUEST' && (
              <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  সতর্কতা: KajLagbe কোনো সরকারি জরুরী সংস্থা নয়। মারাত্মক দুর্ঘটনা বা অগ্নিকাণ্ডের ক্ষেত্রে ৯৯৯ এ কল করুন।
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">পছন্দের তারিখ</label>
                <Input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">পছন্দের সময়কাল</label>
                <Input
                  placeholder="যেমন: সকাল ১০টা - দুপুর ১টা"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: ATTACHMENTS & NOTES */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">ধাপ ৬: কাজের ছবি ও অতিরিক্ত নোট</h3>
              <p className="text-xs text-slate-500 mt-0.5">কাজের জায়গার ছবি বা অতিরিক্ত নির্দেশনা দিন।</p>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center bg-slate-50">
              <Paperclip className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">কাজের ছবি সংযুক্ত করুন</h4>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG বা PDF ফরম্যাট। সর্বোচ্চ ৫টি ছবি।</p>
              <Button size="sm" variant="outline" className="mt-4">
                ফাইল নির্বাচন করুন
              </Button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">অতিরিক্ত কোনো নির্দেশনা থাকলে লিখুন</label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                placeholder="যেমন: বাসায় আসার পূর্বে ফোনে নিশ্চিত করতে হবে..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & PUBLISH */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">ধাপ ৭: কাজের বিজ্ঞাপন পর্যালোচনা ও প্রকাশ</h3>
              <p className="text-xs text-slate-500 mt-0.5">সব তথ্য সঠিক আছে কি না মিলিয়ে নিন।</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <Badge variant="secondary" size="sm">{selectedCategory}</Badge>
                  <h4 className="text-base font-black text-slate-900 mt-1">{title}</h4>
                </div>
                <span className="text-emerald-700 font-bold">
                  {budgetType === 'REQUEST_QUOTES'
                    ? 'দরপ্রস্তাব আহবান'
                    : `৳ ${Number(budgetMin).toLocaleString()} - ${Number(budgetMax).toLocaleString()}`}
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">বিবরণ:</span>
                <p className="text-slate-600 leading-relaxed">{description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                <div>
                  <span className="font-bold text-slate-700">এলাকা:</span> {generalArea}
                </div>
                <div>
                  <span className="font-bold text-slate-700">প্রয়োজনীয়তা:</span> {urgency}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              পূর্ববর্তী
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleFinish(true)}
              isLoading={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
            >
              ড্রাফট সেভ করুন
            </Button>

            {currentStep < 7 ? (
              <Button
                type="button"
                onClick={nextStep}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                পরবর্তী ধাপ
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => handleFinish(false)}
                isLoading={isSubmitting}
                rightIcon={<Sparkles className="h-4 w-4" />}
              >
                বিজ্ঞাপন প্রকাশ করুন
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
}
