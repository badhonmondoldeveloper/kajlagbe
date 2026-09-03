'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { User, MapPin, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, Input, Select, Container, Card } from '@kajlagbe/ui';
import { OnboardingStepper } from '../../../components/auth/onboarding-stepper';
import { useAuth } from '../../../context/auth-context';
import { CATEGORIES, DIVISIONS } from '../../../data';

export default function CustomerOnboardingPage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();

  const [step, setStep] = React.useState(1);
  const [firstName, setFirstName] = React.useState(profile?.profile?.firstName || user?.user_metadata?.full_name?.split(' ')[0] || '');
  const [lastName, setLastName] = React.useState(profile?.profile?.lastName || user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '');
  const [division, setDivision] = React.useState('Dhaka');
  const [district, setDistrict] = React.useState('ঢাকা সদর');
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>(['electrician', 'ac-repair']);
  const [loading, setLoading] = React.useState(false);

  const steps = [
    { number: 1, title: 'প্রোফাইল' },
    { number: 2, title: 'এলাকা' },
    { number: 3, title: 'সার্ভিস পছন্দ' },
  ];

  const toggleInterest = (slug: string) => {
    if (selectedInterests.includes(slug)) {
      setSelectedInterests(selectedInterests.filter((s) => s !== slug));
    } else {
      setSelectedInterests([...selectedInterests, slug]);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    await refreshProfile();
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 sm:py-16 bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white">
      <Container className="max-w-xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              কাস্টমার অনবোর্ডিং
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              আপনার অভিজ্ঞতা কাস্টমাইজ করুন
            </h1>
            <p className="text-xs text-slate-500">
              কয়েকটি সহজ তথ্যের মাধ্যমে আপনার এলাকায় দ্রুত সেবা নিশ্চিত করুন
            </p>
          </div>

          <OnboardingStepper steps={steps} currentStep={step} />

          {/* STEP 1: Basic Profile */}
          {step === 1 && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">নামের প্রথম অংশ</label>
                  <Input
                    placeholder="তানভীর"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    leftIcon={<User className="h-4 w-4" />}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">নামের শেষ অংশ</label>
                  <Input
                    placeholder="আহমেদ"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  এখনই পূরণ না করে এড়িয়ে যান
                </button>
                <Button onClick={() => setStep(2)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Location Preference */}
          {step === 2 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">আপনার বিভাগ</label>
                <Select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  options={DIVISIONS.map((d) => ({ value: d.id, label: d.name }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">জেলা / প্রধান এলাকা</label>
                <Input
                  placeholder="যেমন: মিরপুর / ধানমন্ডি / উত্তরা"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  পূর্ববর্তী ধাপ
                </Button>
                <Button onClick={() => setStep(3)} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  পরবর্তী ধাপ
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Service Interests */}
          {step === 3 && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  যেসব সার্ভিস আপনার নিয়মিত প্রয়োজন হতে পারে:
                </label>
                <p className="text-xs text-slate-500">পছন্দ অনুযায়ী সার্ভিস নির্বাচন করুন</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedInterests.includes(cat.slug);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleInterest(cat.slug)}
                      className={`cursor-pointer rounded-xl border p-3 flex items-center justify-between transition ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs">{cat.title}</span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  পূর্ববর্তী ধাপ
                </Button>
                <Button
                  onClick={handleFinish}
                  isLoading={loading}
                  rightIcon={<Sparkles className="h-4 w-4" />}
                >
                  অনবোর্ডিং সম্পন্ন করুন
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

