'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface DropdownItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: (DropdownItem | 'divider')[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  align = 'left',
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-flex">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[180px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
            className,
          )}
        >
          {items.map((item, idx) => {
            if (item === 'divider') {
              return <div key={`divider-${idx}`} className="my-1 border-t border-slate-100" />;
            }

            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition text-left select-none disabled:opacity-50 disabled:pointer-events-none',
                  item.danger
                    ? 'text-rose-600 hover:bg-rose-50'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                )}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

