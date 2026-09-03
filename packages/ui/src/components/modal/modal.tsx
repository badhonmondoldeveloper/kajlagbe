'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
}: ModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-50 w-full overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-slate-200 animate-in zoom-in-95 duration-200',
          sizes[size],
          className,
        )}
      >
        {(title || description) && (
          <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
            <div className="space-y-1">
              {title && (
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs sm:text-sm text-slate-500">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="p-5 sm:p-6">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  position?: 'bottom' | 'right';
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'bottom',
  className,
}: DrawerProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {position === 'bottom' ? (
        <div
          className={cn(
            'fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom duration-250 border-t border-slate-200',
            className,
          )}
        >
          {/* Pull handle indicator */}
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          {children}
        </div>
      ) : (
        <div
          className={cn(
            'fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-250 border-l border-slate-200',
            className,
          )}
        >
          {title && (
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

