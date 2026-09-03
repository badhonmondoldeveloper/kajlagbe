'use client';

import * as React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export interface NavLinkItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

export function DesktopNavbar({
  logo,
  links,
  actions,
  className,
}: {
  logo?: React.ReactNode;
  links: NavLinkItem[];
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md', className)}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          {logo || (
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-emerald-600">
                KAJ<span className="text-slate-900">LAGBE</span>
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                BD
              </span>
            </a>
          )}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 transition-colors hover:text-emerald-600"
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-800">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}

export function MobileBottomNav({
  activeHref,
  className,
}: {
  activeHref?: string;
  className?: string;
}) {
  const items = [
    { label: 'হোম', href: '/', icon: Home },
    { label: 'খুঁজুন', href: '/services', icon: Search },
    { label: 'কাজ দিন', href: '/post-job', icon: PlusCircle, isCta: true },
    { label: 'কাজের বোর্ড', href: '/jobs', icon: MessageSquare },
    { label: 'ড্যাশবোর্ড', href: '/dashboard', icon: User },
  ];

  return (
    <div
      className={cn(
        'md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-1.5 shadow-lg',
        className,
      )}
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeHref === item.href;

          if (item.isCta) {
            return (
              <a
                key={item.href}
                href={item.href}
                className="-mt-5 flex flex-col items-center select-none"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md active:scale-95 transition">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-1 text-[10px] font-bold text-emerald-700">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center py-1 px-3 text-[11px] font-medium transition select-none',
                isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900',
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-0.5">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function CollapsibleSidebar({
  title,
  items,
  activeHref,
  isCollapsed = false,
  onToggleCollapse,
  className,
}: {
  title?: React.ReactNode;
  items: { label: string; href: string; icon: React.ReactNode; count?: number }[];
  activeHref?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        'flex flex-col border-r border-slate-200 bg-white transition-all duration-200 select-none min-h-screen',
        isCollapsed ? 'w-16' : 'w-64',
        className,
      )}
    >
      {title && (
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          {!isCollapsed && <div className="font-bold text-slate-900">{title}</div>}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <ChevronRight
                className={cn('h-4 w-4 transition-transform', !isCollapsed && 'rotate-180')}
              />
            </button>
          )}
        </div>
      )}

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const isActive = activeHref === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition',
                isActive
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
              {!isCollapsed && item.count !== undefined && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  {item.count}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

