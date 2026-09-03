import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: string;
  className?: string;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  description,
  className,
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setUncontrolledChecked(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center justify-between space-x-3">
      {(label || description) && (
        <div className="flex-1 space-y-0.5 select-none" onClick={handleToggle}>
          {label && (
            <span className="text-xs sm:text-sm font-medium text-slate-800 cursor-pointer">
              {label}
            </span>
          )}
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          isChecked ? 'bg-emerald-600' : 'bg-slate-200',
          className,
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
            isChecked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  );
}

