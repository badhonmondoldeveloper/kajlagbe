'use client';

import * as React from 'react';
import { Clock, UserCheck, Wrench, Shield, CheckCircle2, FileText, Bell } from 'lucide-react';
import { DashboardEmptyState } from './dashboard-empty-state';

export interface ActivityFeedItem {
  id: string;
  type: string;
  description: string;
  createdAt: string | Date;
}

export function DashboardActivityFeed({
  activities,
  emptyMessage = 'আপনার অ্যাকাউন্টে এখনো কোনো নতুন কার্যকলাপ নেই।',
}: {
  activities: ActivityFeedItem[];
  emptyMessage?: string;
}) {
  if (activities.length === 0) {
    return (
      <DashboardEmptyState
        icon={Clock}
        title="কোনো অ্যাক্টিভিটি পাওয়া যায়নি"
        description={emptyMessage}
      />
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'PROFILE_UPDATED':
        return <UserCheck className="h-4 w-4 text-emerald-600" />;
      case 'SERVICE_ADDED':
        return <Wrench className="h-4 w-4 text-sky-600" />;
      case 'AVAILABILITY_CHANGED':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'SECURITY_EVENT':
        return <Shield className="h-4 w-4 text-rose-600" />;
      default:
        return <Bell className="h-4 w-4 text-emerald-600" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white divide-y divide-slate-100 overflow-hidden">
      {activities.map((act) => (
        <div key={act.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/60 transition">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 mt-0.5">
            {getIcon(act.type)}
          </div>
          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
              {act.description}
            </p>
            <span className="text-[10px] text-slate-400 block">
              {new Date(act.createdAt).toLocaleString('bn-BD', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
