import * as React from 'react';
import { ShieldCheck, Award, CheckCircle, Clock, Zap, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export function VerifiedProviderBadge({
  type = 'nid',
  size = 'md',
  className,
}: {
  type?: 'nid' | 'trade_license' | 'police_clearance' | 'top_rated' | 'guaranteed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const config = {
    nid: { label: 'NID ভেরিফাইড (NID Verified)', icon: ShieldCheck, bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    trade_license: { label: 'ট্রেড লাইসেন্স ভেরিফাইড', icon: Award, bg: 'bg-sky-50 text-sky-800 border-sky-200' },
    police_clearance: { label: 'নিরাপত্তা যাচাইকৃত (Safe Check)', icon: ShieldCheck, bg: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    top_rated: { label: 'টপ রেটেড প্রোভাইডার', icon: Star, bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    guaranteed: { label: 'কাজ লাগবে গ্যারান্টি', icon: CheckCircle, bg: 'bg-emerald-600 text-white border-transparent' },
  }[type];

  const Icon = config.icon;

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border shadow-2xs select-none',
        config.bg,
        sizes[size],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{config.label}</span>
    </div>
  );
}

export function TrustScoreIndicator({
  score = 98, // percentage 0 - 100
  className,
}: {
  score?: number;
  className?: string;
}) {
  return (
    <div className={cn('inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 select-none', className)}>
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-xs">
        {score}%
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
          Trust Score
        </p>
        <p className="text-xs font-semibold text-slate-800">অত্যন্ত বিশ্বস্ত (High Trust)</p>
      </div>
    </div>
  );
}

export function CompletedJobsCounter({
  count = 120,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('inline-flex items-center gap-1.5 text-xs font-medium text-slate-700', className)}>
      <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
      <span>
        <strong className="font-bold text-slate-900">{count}+</strong> টি কাজ সম্পন্ন
      </span>
    </div>
  );
}

export function ResponseRateIndicator({
  rate = 99,
  responseTime = '১৫ মিনিট',
  className,
}: {
  rate?: number;
  responseTime?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3 text-xs text-slate-600', className)}>
      <span className="flex items-center gap-1">
        <Zap className="h-3.5 w-3.5 text-amber-500" />
        {rate}% রেসপন্স রেট
      </span>
      <span className="text-slate-300">•</span>
      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5 text-slate-400" />
        গড় রেসপন্স সময়: {responseTime}
      </span>
    </div>
  );
}

export function ExperienceBadge({
  years = 5,
  className,
}: {
  years?: number;
  className?: string;
}) {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700', className)}>
      <Award className="h-3.5 w-3.5 text-slate-500" />
      <span>{years}+ বছরের অভিজ্ঞতা</span>
    </div>
  );
}

