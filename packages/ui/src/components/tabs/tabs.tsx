'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills' | 'segmented';
  className?: string;
}

export function Tabs({
  items,
  activeId,
  onChange,
  variant = 'underline',
  className,
}: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
        {items.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors select-none disabled:opacity-50 disabled:pointer-events-none',
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span>{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/70',
          className,
        )}
      >
        {items.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all select-none disabled:opacity-50',
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900',
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span>{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('border-b border-slate-200', className)}>
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {items.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 border-b-2 py-3 px-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap select-none disabled:opacity-50',
                isActive
                  ? 'border-emerald-600 text-emerald-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span>{tab.badge}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

