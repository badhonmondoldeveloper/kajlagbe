'use client';

import * as React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ToastItem {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const { id, type = 'info', title, message, duration = 4000 } = toast;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  const config = {
    info: { bg: 'bg-white border-slate-200 text-slate-900', icon: Info, iconColor: 'text-sky-600' },
    success: { bg: 'bg-white border-emerald-200 text-slate-900', icon: CheckCircle2, iconColor: 'text-emerald-600' },
    warning: { bg: 'bg-white border-amber-200 text-slate-900', icon: AlertTriangle, iconColor: 'text-amber-600' },
    error: { bg: 'bg-white border-rose-200 text-slate-900', icon: AlertCircle, iconColor: 'text-rose-600' },
  }[type];

  const Icon = config.icon;

  return (
    <div
      role="status"
      className={cn(
        'flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-xl animate-in slide-in-from-top-4 duration-200 select-none',
        config.bg,
      )}
    >
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconColor)} />
      <div className="flex-1 space-y-0.5">
        {title && <p className="text-xs sm:text-sm font-semibold text-slate-900">{title}</p>}
        <p className="text-xs text-slate-600 leading-snug">{message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="rounded-md p-1 text-slate-400 hover:text-slate-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-auto">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

