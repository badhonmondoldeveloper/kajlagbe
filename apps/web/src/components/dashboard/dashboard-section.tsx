'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface DashboardSectionProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  children: React.ReactNode;
  className?: string;
}

export function DashboardSection({
  title,
  subtitle,
  actionText,
  actionHref,
  children,
  className = '',
}: DashboardSectionProps) {
  return (
    <div className={`space-y-3.5 ${className}`}>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            <span>{actionText}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
}
