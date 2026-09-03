'use client';

import * as React from 'react';
import { validatePasswordStrength } from '@kajlagbe/utils';

export function PasswordStrengthIndicator({ password }: { password: string }) {
  if (!password) return null;

  const strength = validatePasswordStrength(password);

  return (
    <div className="space-y-1.5 pt-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-500 font-medium">পাসওয়ার্ড শক্তি:</span>
        <span className="font-bold text-slate-700">{strength.label}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`rounded-full transition-colors ${
              step <= strength.score ? strength.color : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {strength.feedback.length > 0 && strength.score < 3 && (
        <p className="text-[10px] text-slate-500">
          টিপ: {strength.feedback[0]}
        </p>
      )}
    </div>
  );
}

