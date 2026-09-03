import * as React from 'react';
import { cn } from '../../lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const radioId = id || React.useId();

    return (
      <div className="flex items-start space-x-3">
        <input
          id={radioId}
          type="radio"
          className={cn(
            'mt-0.5 h-4 w-4 border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {(label || description) && (
          <div className="space-y-0.5 select-none">
            {label && (
              <label
                htmlFor={radioId}
                className="text-xs sm:text-sm font-medium text-slate-800 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);
Radio.displayName = 'Radio';

