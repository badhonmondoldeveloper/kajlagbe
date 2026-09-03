import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, id, onChange, ...props }, ref) => {
    const checkboxId = id || React.useId();

    return (
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center pt-0.5">
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={cn(
              'peer h-4 w-4 shrink-0 rounded border border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-emerald-600 cursor-pointer',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="space-y-0.5 select-none">
            {label && (
              <label
                htmlFor={checkboxId}
                className="text-xs sm:text-sm font-medium text-slate-800 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
            {error && <p className="text-xs text-rose-600">{error}</p>}
          </div>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

