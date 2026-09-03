'use client';

import * as React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Button } from '@kajlagbe/ui';

export interface DashboardEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  secondaryActionText?: string;
  secondaryActionHref?: string;
}

export function DashboardEmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
  secondaryActionText,
  secondaryActionHref,
}: DashboardEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 sm:p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-500 mx-auto shadow-xs">
        <Icon className="h-7 w-7 text-slate-400" />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>

      {(actionText || secondaryActionText) && (
        <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
          {actionText && (
            actionHref ? (
              <Link href={actionHref}>
                <Button size="sm">{actionText}</Button>
              </Link>
            ) : (
              <Button size="sm" onClick={onActionClick}>
                {actionText}
              </Button>
            )
          )}

          {secondaryActionText && secondaryActionHref && (
            <Link href={secondaryActionHref}>
              <Button variant="outline" size="sm">
                {secondaryActionText}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
