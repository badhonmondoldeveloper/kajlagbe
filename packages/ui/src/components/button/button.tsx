import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm border border-emerald-600',
      secondary:
        'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 border border-slate-200',
      outline:
        'border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 shadow-sm',
      ghost:
        'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm border border-rose-600',
      success:
        'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm border border-green-600',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md gap-1.5 min-w-[32px]',
      md: 'h-10 px-4 py-2 text-sm rounded-lg gap-2 min-w-[40px]',
      lg: 'h-12 px-6 text-base rounded-xl gap-2.5 min-w-[48px]',
      icon: 'h-10 w-10 p-0 rounded-lg justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

