import * as React from 'react';
import { cn } from '../../lib/utils';

export interface KeyValueItem {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: string;
}

export function KeyValueDisplay({
  items,
  columns = 2,
  className,
}: {
  items: KeyValueItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={cn('grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs', colStyles, className)}>
      {items.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {item.label}
          </span>
          <div className="text-sm font-medium text-slate-900">{item.value}</div>
          {item.hint && <p className="text-[11px] text-slate-400">{item.hint}</p>}
        </div>
      ))}
    </div>
  );
}

