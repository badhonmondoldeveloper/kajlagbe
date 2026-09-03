import * as React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/button/button';

export function InlineError({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  if (!message) return null;
  return (
    <div className={cn('flex items-center gap-1.5 text-xs font-medium text-rose-600', className)}>
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function PageError({
  title = 'কিছু একটা সমস্যা হয়েছে (Something went wrong)',
  description = 'অনাকাঙ্ক্ষিত ত্রুটির কারণে অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন।',
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[50vh] flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200',
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mb-4 shadow-2xs">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button
            onClick={onRetry}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            আবার চেষ্টা করুন (Retry)
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          পেছনে ফিরে যান
        </Button>
      </div>
    </div>
  );
}

export function NetworkError({
  onRetry,
  className,
}: {
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <PageError
      title="ইন্টারনেট সংযোগ সমস্যা (Network Error)"
      description="আপনার ইন্টারনেট সংযোগ বিচ্ছিন্ন থাকতে পারে। সংযোগটি যাচাই করে আবার চেষ্টা করুন।"
      onRetry={onRetry}
      className={className}
    />
  );
}

