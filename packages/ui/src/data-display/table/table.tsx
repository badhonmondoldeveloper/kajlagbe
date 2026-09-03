import * as React from 'react';
import { cn } from '../../lib/utils';

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-xs">
      <table ref={ref} className={cn('w-full caption-bottom text-xs sm:text-sm text-left', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('bg-slate-50/80 border-b border-slate-200 text-slate-700 font-semibold', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-slate-100 bg-white text-slate-800', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('transition-colors hover:bg-slate-50/60 data-[state=selected]:bg-slate-50', className)}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('h-10 px-4 text-left align-middle font-semibold text-slate-600 text-xs uppercase tracking-wider', className)}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle text-slate-700 font-normal', className)} {...props} />
  ),
);
TableCell.displayName = 'TableCell';

export function DataCard({
  title,
  subtitle,
  status,
  fields,
  actions,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  status?: React.ReactNode;
  fields: { label: string; value: React.ReactNode }[];
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3', className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {status && <div>{status}</div>}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
        {fields.map((f, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-slate-400 font-medium">{f.label}</span>
            <div className="text-slate-700 font-medium truncate">{f.value}</div>
          </div>
        ))}
      </div>

      {actions && <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">{actions}</div>}
    </div>
  );
}

