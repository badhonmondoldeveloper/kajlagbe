import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function InlineLoader({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-5 w-5',
    lg: 'h-8 w-8',
  };

  return <Loader2 className={cn('animate-spin text-emerald-600', sizes[size], className)} />;
}

export function SectionLoader({
  message = 'লোড হচ্ছে...',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[180px] flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150',
        className,
      )}
    >
      <Loader2 className="h-7 w-7 animate-spin text-emerald-600" />
      <p className="mt-3 text-xs sm:text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}

export function PageLoader({
  message = 'KajLagbe লোড হচ্ছে...',
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm">
        <Loader2 className="h-7 w-7 animate-spin text-emerald-600" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>
    </div>
  );
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200/80',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

// Backward-compatible alias
export function LoadingState({
  message = 'Loading...',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return <SectionLoader message={message} className={className} />;
}

