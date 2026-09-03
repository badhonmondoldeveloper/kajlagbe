import * as React from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, helperText, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-rose-400 focus-visible:ring-rose-400 focus-visible:border-rose-400',
              className,
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs font-medium text-rose-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <Input
        type={show ? 'text' : 'password'}
        ref={ref}
        className={className}
        rightIcon={
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="text-slate-400 hover:text-slate-600 focus:outline-none"
            tabIndex={-1}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder = 'Search for electricians, plumbers, AC repair...', ...props }, ref) => {
    return (
      <Input
        type="search"
        ref={ref}
        leftIcon={<Search className="h-4 w-4" />}
        placeholder={placeholder}
        className={cn('rounded-full bg-slate-50/80 focus:bg-white', className)}
        {...props}
      />
    );
  },
);
SearchInput.displayName = 'SearchInput';

export interface PhoneInputProps extends Omit<InputProps, 'leftIcon'> {
  countryCode?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode = '+880', ...props }, ref) => {
    return (
      <Input
        type="tel"
        ref={ref}
        leftIcon={
          <span className="font-semibold text-xs text-slate-600 tracking-wide select-none">
            {countryCode}
          </span>
        }
        placeholder="1XXXXXXXXX"
        className={cn('pl-14 tracking-wider', className)}
        {...props}
      />
    );
  },
);
PhoneInput.displayName = 'PhoneInput';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const textareaId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-slate-700 tracking-wide"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60',
            error && 'border-rose-400 focus-visible:ring-rose-400 focus-visible:border-rose-400',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-xs font-medium text-rose-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

