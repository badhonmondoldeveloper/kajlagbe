'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Wrench,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button, Input, Select, Container, Badge } from '@kajlagbe/ui';
import { OnboardingStepper } from '../../../components/auth/onboarding-stepper';
import { PhoneVerificationNotice } from '../../../components/auth/phone-verification-banner';
import { useAuth } from '../../../context/auth-context';
import { CATEGORIES, DIVISIONS } from '../../../data';

export default function ProviderOnboardingPage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();

  const [step, setStep] = React.useState(1);
  const [bio, setBio] = React.useState('আমি একজন অভিজ্ঞ পেশাদার টেকনিশিয়ান। গ্রাহকের সন্তুষ্টি ও কাজের গুণমান আমার প্রধান লক্ষ্য।');
  const [primaryCategory, setPrimaryCategory] = React.useState(CATEGORIES[0]?.slug || 'electrician');
  const [experienceYears, setExperienceYears] = React.useState(3);
  const [startingPrice, setStartingPrice] = React.useState('300');
  const [division, setDivision] = React.useState('Dhaka');
  const [serviceArea, setServiceArea] = React.useState('মিরপুর, ধানমন্ডি, মোহাম্মদপুর ও গুলশান');
  const [skills, setSkills] = React.useState('হাউস ওয়্যারিং, ডিবি বোর্ড স্থাপন, শর্ট সার্কিট মেরামত, ফ্যান ও লাইট ফিটিং');
  const [availability, setAvailability] = React.useState('always');
  const [loading, setLoading] = React.useState(false);

  const steps = [
    { number: 1, title: 'পরিচিতি' },
    { number: 2, title: 'সার্ভিস' },
    { number: 3, title: 'এলাকা' },
    { number: 4, title: 'দক্ষতা' },
    { number: 5, title: 'সময়সূচী' },
    { number: 6, title: 'পর্যালোচনা' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    await refreshProfile();
    setLoading(false);
    router.push('/account-pending');
  };

  const currentCategoryObj = CATEGORIES.find((c) => c.slug === primaryCategory) || CATEGORIES[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 sm:py-16 bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white">
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              প্রোভাইডার অনবোর্ডিং প্রোফাইল
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              পেশাদার প্রোফাইল তৈরি করুন
            </h1>
            <p className="text-xs text-slate-500">
              সঠিক তথ্যের মাধ্যমে গ্রাহকদের কাছে আপনার কাজের বিশ্বাসযোগ্যতা তুলে ধরুন
            </p>
          </div>

          <OnboardingStepper steps={steps} currentStep={step} />

          {/* STEP 1: Professional Identity */}
          {step === 1 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  সংক্ষিপ্ত পরিচিতি ও কাজের ধরণ (Bio) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="আপনার পূর্ববর্তী কাজের অভিজ্ঞতা এবং বিশেষ দক্ষতার কথা লিখুন..."
                />
              </div>

              <PhoneVerificationNotice phone={user?.phone || user?.user_metadata?.phone} />

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setStep(2)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: সার্ভিস
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Service Information */}
          {step === 2 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  মূল সার্ভিস ক্যাটাগরি <span className="text-rose-500">*</span>
                </label>
                <Select
                  value={primaryCategory}
                  onChange={(e) => setPrimaryCategory(e.target.value)}
                  options={CATEGORIES.map((c) => ({ value: c.slug, label: c.title }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">কাজের অভিজ্ঞতা (বছর)</label>
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">প্রাথমিক ভিজিট / সার্ভিস ফি (৳)</label>
                  <Input
                    type="number"
                    min={100}
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  পূর্ববর্তী
                </Button>
                <Button onClick={() => setStep(3)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: এলাকা
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Service Areas */}
          {step === 3 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">প্রধান বিভাগ</label>
                <Select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  options={DIVISIONS.map((d) => ({ value: d.id, label: d.name }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  কাজের নির্দিষ্ট এলাকা / থানা সমূহ <span className="text-rose-500">*</span>
                </label>
                <Input
                  placeholder="যেমন: ধানমন্ডি, মিরপুর, উত্তরা, বনানী"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
                <p className="text-[11px] text-slate-400">একাধিক এলাকা কমা (,) দিয়ে আলাদা করুন</p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  পূর্ববর্তী
                </Button>
                <Button onClick={() => setStep(4)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: দক্ষতা
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Skills & Tools */}
          {step === 4 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  বিশেষ দক্ষতা ও সরঞ্জামসমূহ (Skills & Equipment) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="যেমন: ডিজিটাল মাল্টিমিটার, ড্রিল মেশিন, সেফটি গিয়ার"
                />
                <p className="text-[11px] text-slate-400">কমা (,) দিয়ে আলাদা করুন</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs text-slate-600">
                <span className="font-bold text-slate-800">কাভার্ড সাব-সেবাসমূহ:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentCategoryObj.subservices.map((sub) => (
                    <span key={sub.id} className="rounded-md bg-white px-2 py-1 border text-[11px]">
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  পূর্ববর্তী
                </Button>
                <Button onClick={() => setStep(5)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ: সময়সূচী
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Availability */}
          {step === 5 && (
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold text-slate-800 block">
                দৈনিক সার্ভিস প্রদানের সময়সূচী
              </label>

              <div className="space-y-3">
                {[
                  { id: 'always', title: 'সবসময় প্রস্তুত (সকাল ৮টা - রাত ১০টা)', desc: 'নিয়মিত ও জরুরী সকল কল গ্রহণ করবেন' },
                  { id: 'business_hours', title: 'অফিস সময় (সকাল ৯টা - বিকাল ৬টা)', desc: 'শুধুমাত্র নির্ধারিত সময়ে সার্ভিস দেবেন' },
                  { id: 'evening', title: 'সান্ধ্যকালীন ও ছুটির দিন', desc: 'অফিস শেষে বা পার্ট-টাইম কাজ করবেন' },
                ].map((av) => (
                  <div
                    key={av.id}
                    onClick={() => setAvailability(av.id)}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      availability === av.id
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{av.title}</h4>
                      {availability === av.id && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{av.desc}</p>
                  </div>
                ))}
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

          {/* STEP 6: Review and Submit */}
          {step === 6 && (
            <div className="space-y-4 pt-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">ক্যাটাগরি:</span>
                  <Badge variant="verified">{currentCategoryObj.title}</Badge>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">অভিজ্ঞতা:</span>
                  <span>{experienceYears} বছর</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">প্রাথমিক রেট:</span>
                  <span className="font-bold text-emerald-700">৳ {startingPrice}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">সার্ভিস এলাকা:</span>
                  <span className="truncate max-w-[200px]">{serviceArea}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">দক্ষতা:</span>
                  <p className="text-slate-500">{skills}</p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  সাবমিটের পর আপনার প্রোফাইলটি অ্যাডমিন পর্যালোচনার জন্য জমা হবে। অনুমোদিত হলে আপনি সরাসরি গ্রাহকদের সাথে যুক্ত হতে পারবেন।
                </p>
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
                  প্রোফাইল জমা দিন
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
