import * as React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: React.ReactNode;
  onClose?: () => void;
}

export function Alert({
  className,
  variant = 'info',
  title,
  children,
  onClose,
  ...props
}: AlertProps) {
  const config = {
    info: {
      bg: 'bg-sky-50 border-sky-200 text-sky-900',
      icon: Info,
      iconColor: 'text-sky-600',
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: AlertCircle,
      iconColor: 'text-rose-600',
    },
  }[variant];

  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 rounded-xl border p-4 text-xs sm:text-sm',
        config.bg,
        className,
      )}
      {...props}
    >
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconColor)} />
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-tight">{title}</h5>}
        {children && <div className="text-xs sm:text-sm opacity-90 leading-relaxed">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 opacity-70 hover:opacity-100 transition"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
