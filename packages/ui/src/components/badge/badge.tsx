import * as React from 'react';
import { CheckCircle2, AlertCircle, Clock, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info' | 'verified';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-white text-slate-700 border-slate-300',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    verified: 'bg-emerald-600 text-white border-transparent shadow-xs',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1 gap-2 font-semibold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border transition-colors select-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function StatusBadge({
  status,
  size = 'md',
  className,
}: {
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'verified' | 'rejected' | 'in_progress';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const config = {
    active: { variant: 'success' as const, label: 'Active', icon: CheckCircle2 },
    verified: { variant: 'verified' as const, label: 'Verified', icon: CheckCircle2 },
    completed: { variant: 'success' as const, label: 'Completed', icon: CheckCircle2 },
    pending: { variant: 'warning' as const, label: 'Pending', icon: Clock },
    in_progress: { variant: 'info' as const, label: 'In Progress', icon: Clock },
    cancelled: { variant: 'secondary' as const, label: 'Cancelled', icon: AlertCircle },
    rejected: { variant: 'error' as const, label: 'Rejected', icon: AlertCircle },
  }[status] || { variant: 'secondary' as const, label: status, icon: Clock };

  const Icon = config.icon;

  return (
    <Badge variant={config.variant} size={size} className={className}>
      <Icon className="h-3 w-3 shrink-0" />
      <span>{config.label}</span>
    </Badge>
  );
}

export function AvailabilityBadge({
  available = true,
  size = 'md',
  className,
}: {
  available?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium select-none',
        available
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
          : 'bg-slate-100 text-slate-600 border-slate-200',
        size === 'sm' ? 'text-[10px] gap-1.5' : 'text-xs gap-2',
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400',
        )}
      />
      <span>{available ? 'Available Now' : 'Currently Busy'}</span>
    </div>
  );
}

export function RatingBadge({
  rating,
  totalReviews,
  className,
}: {
  rating: number;
  totalReviews?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200/70 select-none',
        className,
      )}
    >
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span>{rating.toFixed(1)}</span>
      {totalReviews !== undefined && (
        <span className="text-amber-600 font-normal">({totalReviews})</span>
      )}
    </div>
  );
}

