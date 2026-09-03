'use client';

import * as React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@kajlagbe/ui';

export interface DashboardStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  change?: {
    value: string;
    isPositive: boolean;
  };
  badge?: string;
  variant?: 'default' | 'emerald' | 'sky' | 'amber' | 'purple';
}

export function DashboardStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
  badge,
  variant = 'default',
}: DashboardStatCardProps) {
  const colorMap = {
    default: 'bg-slate-100 text-slate-700',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">{title}</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
            {badge && (
              <Badge variant="secondary" size="sm">
                {badge}
              </Badge>
            )}
          </div>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${colorMap[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(subtitle || change) && (
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          {subtitle && <span>{subtitle}</span>}
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold ${
                change.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {change.isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {change.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
