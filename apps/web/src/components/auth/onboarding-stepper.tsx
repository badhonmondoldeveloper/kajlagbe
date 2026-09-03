'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  number: number;
  title: string;
}

export function OnboardingStepper({
  steps,
  currentStep,
}: {
  steps: StepItem[];
  currentStep: number;
}) {
  return (
    <div className="w-full pb-4">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              {/* Step Node */}
              <div className="flex flex-col items-center gap-1.5 flex-1 text-center">
                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isCurrent
                      ? 'border-2 border-emerald-600 bg-white text-emerald-700 ring-4 ring-emerald-50'
                      : 'border border-slate-300 bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-medium max-w-[80px] sm:max-w-none truncate ${
                    isCurrent ? 'font-bold text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-1 sm:mx-2 -mt-5 transition-colors ${
                    currentStep > step.number ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

