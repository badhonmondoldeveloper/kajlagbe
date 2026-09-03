import * as React from 'react';
import { cn } from '../lib/utils';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export function LoadingState({
  message = 'Loading...',
  className,
  ...props
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[200px] flex-col items-center justify-center p-8 text-center',
        className,
      )}
      {...props}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      {message && <p className="mt-3 text-sm text-slate-500 font-medium">{message}</p>}
    </div>
  );
}

