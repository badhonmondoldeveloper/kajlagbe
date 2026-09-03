import * as React from 'react';
import {
  Lock,
  AlertTriangle,
  UserCheck,
  EyeOff,
  Scale,
} from 'lucide-react';
import {
  Card,
  Badge,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';

export default function SafetyPage() {
  const pillars = [
    {
      icon: UserCheck,
      title: '১. প্রোভাইডার যাচাইকরণ ও ব্যাকগ্রাউন্ড চেক',
      desc: 'আমাদের প্ল্যাটফর্মে তালিকাভুক্ত হওয়ার পূর্বে প্রতিটি টেকনিশিয়ানের জাতীয় পরিচয়পত্র (NID) বায়োমেট্রিক ডাটাবেজ দ্বারা পরীক্ষা করা হয়। বাণিজ্যিক ও প্রতিষ্ঠান পর্যায়ের ক্ষেত্রে ট্রেড লাইসেন্স ও পুলিশ ক্লিয়ারেন্স যাচাই বাধ্যতামূলক।',
    },
    {
      icon: EyeOff,
      title: '২. ব্যবহারকারীর তথ্য ও প্রাইভেসি সুরক্ষা',
      desc: 'গ্রাহকের ফোন নম্বর ও সঠিক ফ্ল্যাট ঠিকানা বুকিং নিশ্চিত হওয়ার আগে প্রকাশ্যে প্রদর্শন করা হয় না। আপনার সকল তথ্য এনক্রিপ্টেড ডাটাবেজে সম্পূর্ণ সংরক্ষিত থাকে।',
    },
    {
      icon: Lock,
      title: '৩. নিরাপদ ও স্বচ্ছ পেমেন্ট নীতি',
      desc: 'আমরা সরাসরি কিংবা এসক্রো পেমেন্টের মাধ্যমে আর্থিক লেনদেন সুরক্ষার সর্বোচ্চ ব্যবস্থা রাখি। কাজ সন্তোষজনকভাবে সমাপ্ত হওয়ার পূর্বে পুরো অর্থ প্রদান থেকে বিরত থাকার পরামর্শ দেওয়া হয়।',
    },
    {
      icon: Scale,
      title: '৪. বিরোধ নিষ্পত্তি ও গ্রাহক সুরক্ষা নীতি',
      desc: 'কাজের মান বা আচরণগত কোনো অভিযোগ থাকলে আমাদের ডেডিকেটেড ডিসপ্যুট টিম দ্রুত বিষয়টির তদন্ত করে রি-ওয়ার্ক বা সমাধান নিশ্চিত করে।',
    },
  ];

  return (
    <Container className="py-8 sm:py-16 space-y-12">
      <PageHeader
        title="নিরাপত্তা ও বিশ্বাসযোগ্যতা নীতি"
        description="কাজ লাগবে প্ল্যাটফর্মে আপনার প্রতিটি সার্ভিস বুকিং যেন নিশ্চিন্ত ও নিরাপদ হয়, তা নিশ্চিত করাই আমাদের প্রধান অঙ্গীকার।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'নিরাপত্তা ও বিশ্বাসযোগ্যতা' },
            ]}
          />
        }
        badge={<Badge variant="verified">ট্রাস্ট ও সেফটি ফ্রেমওয়ার্ক</Badge>}
      />

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <Card key={idx} className="p-6 sm:p-8 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
            </Card>
          );
        })}
      </div>

      {/* Safety Guidelines for Customers */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10 space-y-6">
        <h2 className="text-lg sm:text-2xl font-black text-slate-900">
          গ্রাহকদের জন্য গুরুত্বপূর্ণ নিরাপত্তা নির্দেশিকা
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="space-y-2 rounded-xl bg-white p-4 border border-slate-200">
            <span className="font-bold text-emerald-700 block">১. পরিচয় নিশ্চিত করুন</span>
            <p className="text-slate-500">টেকনিশিয়ান বাসায় পৌঁছালে অ্যাপের ছবি ও নামের সাথে পরিচয়পত্র মিলিয়ে নিন।</p>
          </div>
          <div className="space-y-2 rounded-xl bg-white p-4 border border-slate-200">
            <span className="font-bold text-emerald-700 block">২. মূল্যবান জিনিস নিরাপদে রাখুন</span>
            <p className="text-slate-500">বাসায় মিস্ত্রি বা ক্লিনার কাজ করার সময় ব্যক্তিগত অলংকার ও প্রয়োজনীয় কাগজপত্র নিরাপদ স্থানে রাখুন।</p>
          </div>
          <div className="space-y-2 rounded-xl bg-white p-4 border border-slate-200">
            <span className="font-bold text-emerald-700 block">৩. প্ল্যাটফর্মের মাধ্যমে যোগাযোগ</span>
            <p className="text-slate-500">যেকোনো সমস্যা এড়াতে প্ল্যাটফর্মের হিস্ট্রি ও অফিশিয়াল ইনভয়েস সংরক্ষণ করুন।</p>
          </div>
        </div>
      </div>

      {/* Emergency Disclaimer */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6 text-xs text-rose-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
          <AlertTriangle className="h-4 w-4 text-rose-600" />
          <span>জরুরী নিরাপত্তা বিষয়ক সতর্কতা (Emergency Disclaimer):</span>
        </div>
        <p className="leading-relaxed">
          কাজ লাগবে একটি টেকনোলজি মার্কেটপ্লেস যা স্বাধীন সেবাদাতাদের সাথে গ্রাহকদের যুক্ত করে। কোনো অনাকাঙ্ক্ষিত অপরাধ বা শারীরিক নিরাপত্তার হুমকির ক্ষেত্রে অবিলম্বে জাতীয় জরুরী সেবা <strong>৯৯৯ (999)</strong> নম্বরে যোগাযোগ করুন।
        </p>
      </div>
    </Container>
  );
}
