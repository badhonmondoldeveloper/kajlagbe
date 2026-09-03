import * as React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export function StatusTimeline({
  steps,
  className,
}: {
  steps: TimelineStep[];
  className?: string;
}) {
  return (
    <div className={cn('relative space-y-6 pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200', className)}>
      {steps.map((step) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';

        return (
          <div key={step.id} className="relative">
            <div
              className={cn(
                'absolute -left-6 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-white',
                isCompleted
                  ? 'text-emerald-600'
                  : isCurrent
                  ? 'text-emerald-500'
                  : 'text-slate-300',
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 fill-emerald-600 text-white" />
              ) : isCurrent ? (
                <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <h4
                  className={cn(
                    'text-xs sm:text-sm font-semibold',
                    isCurrent ? 'text-emerald-700' : isCompleted ? 'text-slate-900' : 'text-slate-500',
                  )}
                >
                  {step.title}
                </h4>
                {step.timestamp && (
                  <span className="text-[11px] text-slate-400 font-mono">{step.timestamp}</span>
                )}
              </div>
              {step.description && (
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

