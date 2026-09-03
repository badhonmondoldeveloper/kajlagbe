import * as React from 'react';
import { cn } from '../lib/utils';

export function Container({
  size = 'default',
  className,
  children,
  ...props
}: {
  size?: 'sm' | 'default' | 'lg' | 'full';
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('py-12 sm:py-16 lg:py-20', className)} {...props}>
      {children}
    </section>
  );
}

export function Stack({
  direction = 'col',
  gap = 4,
  align,
  justify,
  className,
  children,
  ...props
}: {
  direction?: 'row' | 'col';
  gap?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const gaps = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  }[gap];

  const aligns = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  }[align || (direction === 'row' ? 'center' : 'stretch')];

  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }[justify || 'start'];

  return (
    <div
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        gaps,
        aligns,
        justifies,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  badge,
  breadcrumbs,
  actions,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-8 space-y-4', className)}>
      {breadcrumbs && <div>{breadcrumbs}</div>}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>
          {description && (
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  align = 'left',
  action,
  className,
}: {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4',
        align === 'center' && 'text-center items-center',
        className,
      )}
    >
      <div className={cn('space-y-1.5', align === 'center' && 'max-w-2xl mx-auto')}>
        {badge && <div className="mb-2">{badge}</div>}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

