'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
}: AccordionProps) {
  const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);

  const toggle = (id: string) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded(allowMultiple ? [...expanded, id] : [id]);
    }
  };

  return (
    <div className={cn('divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white overflow-hidden', className)}>
      {items.map((item) => {
        const isOpen = expanded.includes(item.id);

        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              <span className="flex items-center gap-3">
                {item.icon && <span className="text-slate-500">{item.icon}</span>}
                <span>{item.title}</span>
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0',
                  isOpen && 'rotate-180 text-emerald-600',
                )}
              />
            </button>
            {isOpen && (
              <div className="border-t border-slate-100 bg-slate-50/40 p-4 sm:p-5 pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in-50 duration-150">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

