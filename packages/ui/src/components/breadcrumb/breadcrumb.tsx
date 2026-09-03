import * as React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  showHome = true,
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs sm:text-sm text-slate-500', className)}>
      <ol className="flex items-center space-x-1.5 sm:space-x-2">
        {showHome && (
          <li>
            <a
              href="/"
              className="inline-flex items-center text-slate-400 hover:text-emerald-600 transition"
              aria-label="Home"
            >
              <Home className="h-3.5 w-3.5" />
            </a>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center space-x-1.5 sm:space-x-2">
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="font-medium text-slate-600 hover:text-emerald-600 transition truncate max-w-[150px] sm:max-w-[200px]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-semibold text-slate-900 truncate max-w-[150px] sm:max-w-[200px]">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

