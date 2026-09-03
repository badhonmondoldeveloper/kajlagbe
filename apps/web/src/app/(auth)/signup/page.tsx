'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Wrench, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { AuthCard } from '../../../components/auth/auth-card';
import { RoleType } from '@kajlagbe/types';

export default function SignupRoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = React.useState<RoleType>(RoleType.CUSTOMER);

  const roleOptions = [
    {
      role: RoleType.CUSTOMER,
      title: 'কাস্টমার (সেবা খুঁজছি)',
      tagline: 'আমি বাসা বা অফিসের জন্য দক্ষ টেকনিশিয়ান বা সার্ভিস খুঁজছি',
      icon: User,
      badge: 'গ্রাহকদের জন্য',
      benefits: ['সহজে ও দ্রুত টেকনিশিয়ান বুকিং', 'নিরাপদ এসক্রো পেমেন্ট', '৭ দিনের রি-ওয়ার্ক সাপোর্ট'],
      route: '/signup/customer',
    },
    {
      role: RoleType.INDIVIDUAL_PROVIDER,
      title: 'প্রোভাইডার (সেবা দিয়ে আয়)',
      tagline: 'আমি একজন দক্ষ ইলেকট্রিশিয়ান, প্লাম্বার বা কারিগর — কাজ পেতে চাই',
      icon: Wrench,
      badge: 'দক্ষ সেবাদাতাদের জন্য',
      benefits: ['প্রতিদিন নতুন কাজের অফার', 'সরাসরি সম্পূর্ণ উপার্জন', 'ভেরিফাইড প্রফেশনাল প্রোফাইল'],
      route: '/signup/provider',
    },
    {
      role: RoleType.BUSINESS,
      title: 'সার্ভিস ব্যবসা (এজেন্সি / টিম)',
      tagline: 'আমি একাধিক টেকনিশিয়ান ও সার্ভিস এজেন্সি পরিচালনা করি',
      icon: Building2,
      badge: 'কোম্পানি ও এজেন্সির জন্য',
      benefits: ['সেন্ট্রাল টিম ড্যাশবোর্ড', 'অটো জব অ্যাসাইনমেন্ট', 'কর্পোরেট ইনভয়েস ও রিপোর্ট'],
      route: '/signup/business',
    },
  ];

  const handleProceed = () => {
    const chosen = roleOptions.find((r) => r.role === selectedRole);
    if (chosen) {
      router.push(chosen.route);
    }
  };

  return (
    <AuthCard
      title="অ্যাকাউন্টের ধরণ নির্বাচন করুন"
      subtitle="আপনার প্রয়োজন অনুযায়ী সঠিক অ্যাকাউন্ট ধরণ বেছে নিয়ে রেজিস্ট্রেশন শুরু করুন"
      badge="সহজ ও নিরাপদ রেজিস্ট্রেশন"
      footer={
        <p>
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 underline">
            লগইন করুন
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {/* Role Cards List */}
        <div className="space-y-3">
          {roleOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedRole === opt.role;

            return (
              <div
                key={opt.role}
                onClick={() => setSelectedRole(opt.role)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{opt.title}</h3>
                      <Badge variant={isSelected ? 'verified' : 'secondary'} size="sm">
                        {opt.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{opt.tagline}</p>

                    {isSelected && (
                      <div className="pt-2 space-y-1 border-t border-emerald-100/80 mt-2">
                        {opt.benefits.map((b, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-emerald-900 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proceed Button */}
        <div className="pt-2">
          <Button
            onClick={handleProceed}
            className="w-full font-bold shadow-md"
            size="lg"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            পরবর্তী ধাপে যান
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}

