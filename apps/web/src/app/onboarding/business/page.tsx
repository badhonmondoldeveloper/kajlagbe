'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { Button, Input, Select, Container, Badge } from '@kajlagbe/ui';
import { OnboardingStepper } from '../../../components/auth/onboarding-stepper';
import { useAuth } from '../../../context/auth-context';
import { CATEGORIES, DIVISIONS } from '../../../data';

export default function BusinessOnboardingPage() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const [step, setStep] = React.useState(1);
  const [businessName, setBusinessName] = React.useState(user?.user_metadata?.businessName || 'আমার সার্ভিস কোম্পানি');
  const [description, setDescription] = React.useState('আমরা একটি বিশ্বস্ত সার্ভিস প্রতিষ্ঠান। আবাসিক ও বাণিজ্যিক প্রতিষ্ঠানে দক্ষ টিম দ্বারা পেশাদার সেবা প্রদান করি।');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(['ac-repair', 'electrician']);
  const [division, setDivision] = React.useState('Dhaka');
  const [officeAddress, setOfficeAddress] = React.useState('বাড়ি # ১২, রোড # ৪, গুলশান-১, ঢাকা');
  const [teamSize, setTeamSize] = React.useState('6-20');
  const [tradeLicense, setTradeLicense] = React.useState('TRAD/DSCC/019283/2023');
  const [loading, setLoading] = React.useState(false);

  const steps = [
    { number: 1, title: 'কোম্পানি' },
    { number: 2, title: 'ক্যাটাগরি' },
    { number: 3, title: 'ঠিকানা' },
    { number: 4, title: 'টিম সাইজ' },
    { number: 5, title: 'ডকুমেন্ট' },
    { number: 6, title: 'পর্যালোচনা' },
  ];

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(selectedCategories.filter((s) => s !== slug));
    } else {
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await refreshProfile();
    setLoading(false);
    router.push('/account-pending');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 sm:py-16 bg-gradient-to-b from-sky-50/50 via-slate-50 to-white">
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              বিজনেস অনবোর্ডিং প্রোফাইল
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              এজেন্সি ও টিম প্রোফাইল সাজান
            </h1>
            <p className="text-xs text-slate-500">
              কর্পোরেট ক্লায়েন্ট ও টিম ম্যানেজমেন্ট সুবিধার জন্য আপনার তথ্য নিশ্চিত করুন
            </p>
          </div>

          <OnboardingStepper steps={steps} currentStep={step} />

          {/* STEP 1: Business Identity */}
          {step === 1 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  প্রতিষ্ঠানের নাম <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  leftIcon={<Building2 className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  কোম্পানির বিবরণ ও মিশন <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-sky-500 focus:outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setStep(2)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: ক্যাটাগরি
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Categories */}
          {step === 2 && (
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold text-slate-800 block">
                যেসব খাতে আপনার প্রতিষ্ঠান সার্ভিস দেয় (একাধিক নির্বাচনযোগ্য):
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.slug);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleCategory(cat.slug)}
                      className={`cursor-pointer rounded-xl border p-3 flex items-center justify-between transition ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/60 text-sky-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs">{cat.title}</span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  পূর্ববর্তী
                </Button>
                <Button onClick={() => setStep(3)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: ঠিকানা
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {step === 3 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">মূল কার্যালয়ের বিভাগ</label>
                <Select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  options={DIVISIONS.map((d) => ({ value: d.id, label: d.name }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  প্রধান কার্যালয় / অফিসের পূর্ণ ঠিকানা <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  পূর্ববর্তী
                </Button>
                <Button onClick={() => setStep(4)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: টিম সাইজ
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Team Size */}
          {step === 4 && (
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold text-slate-800 block">
                আপনার প্রতিষ্ঠানে মোট কতজন দক্ষ টেকনিশিয়ান রয়েছেন?
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: '1-5', title: '১ - ৫ জন', desc: 'ছোট টিম বা নতুন ফার্ম' },
                  { id: '6-20', title: '৬ - ২০ জন', desc: 'মাঝারি এজেন্সি' },
                  { id: '21-50', title: '২১ - ৫০ জন', desc: 'বড় সার্ভিস কোম্পানি' },
                  { id: '50+', title: '৫০+ জন', desc: 'এন্টারপ্রাইজ নেটওয়ার্ক' },
                ].map((ts) => (
                  <div
                    key={ts.id}
                    onClick={() => setTeamSize(ts.id)}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      teamSize === ts.id
                        ? 'border-sky-600 bg-sky-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{ts.title}</h4>
                      {teamSize === ts.id && <CheckCircle2 className="h-4 w-4 text-sky-600" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{ts.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  পূর্ববর্তী
                </Button>
                <Button onClick={() => setStep(5)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: ডকুমেন্ট
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Trade License */}
          {step === 5 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  ট্রেড লাইসেন্স নম্বর <span className="text-slate-400 font-normal">(ঐচ্ছিক - ভেরিফিকেশন ফাস্ট-ট্র্যাকের জন্য)</span>
                </label>
                <Input
                  placeholder="যেমন: TRAD/DSCC/019283/2023"
                  value={tradeLicense}
                  onChange={(e) => setTradeLicense(e.target.value)}
                  leftIcon={<FileText className="h-4 w-4" />}
                />
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 text-xs text-sky-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-sky-600" /> করপোরেট ব্যাজ সুবিধা:
                </span>
                <p>
                  ট্রেড লাইসেন্স ভেরিফাইড হলে আপনার কোম্পানি প্রোফাইলে <strong>&quot;Verified Enterprise&quot;</strong> গোল্ডেন ব্যাজ প্রদর্শিত হবে এবং কর্পোরেট টেন্ডারে অগ্রাধিকার দেওয়া হবে।
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
                  পূর্ববর্তী
                </Button>
                <Button onClick={() => setStep(6)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: পর্যালোচনা
                </Button>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Submit */}
          {step === 6 && (
            <div className="space-y-4 pt-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">কোম্পানি নাম:</span>
                  <span className="font-bold text-slate-900">{businessName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">টিম সাইজ:</span>
                  <span>{teamSize} জন টেকনিশিয়ান</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">হেড অফিস:</span>
                  <span className="truncate max-w-[200px]">{officeAddress}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">সার্ভিস ক্যাটাগরি:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCategories.map((c) => (
                      <Badge key={c} variant="secondary" size="sm">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(5)}>
                  পূর্ববর্তী
                </Button>
                <Button
                  onClick={handleSubmit}
                  isLoading={loading}
                  rightIcon={<CheckCircle2 className="h-4 w-4" />}
                >
                  কোম্পানি প্রোফাইল জমা দিন
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
