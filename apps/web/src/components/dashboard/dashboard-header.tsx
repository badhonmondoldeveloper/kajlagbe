'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bell, Menu, PlusCircle, Search, Sparkles, Wrench } from 'lucide-react';
import { Button, Avatar, Drawer } from '@kajlagbe/ui';
import { useAuth } from '../../context/auth-context';
import { DashboardSidebar } from './dashboard-sidebar';

export function DashboardHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const { user, profile, role } = useAuth();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

  const userName =
    profile?.profile?.firstName ||
    user?.user_metadata?.full_name?.split(' ')[0] ||
    'ব্যবহারকারী';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'শুভ সকাল';
    if (hour < 17) return 'শুভ অপরাহ্ন';
    return 'শুভ সন্ধ্যা';
  };

  const greeting = getGreeting();

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8">
          {/* Left Title / Greeting */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                {title || `${greeting}, ${userName}!`}
              </h1>
              {subtitle && (
                <p className="text-[11px] text-slate-500 hidden sm:block">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {role === 'CUSTOMER' && (
              <Link href="/dashboard/jobs" className="hidden sm:inline-flex">
                <Button
                  size="sm"
                  leftIcon={<PlusCircle className="h-4 w-4" />}
                >
                  কাজ পোস্ট করুন
                </Button>
              </Link>
            )}

            {role === 'INDIVIDUAL_PROVIDER' && (
              <Link href="/provider/services" className="hidden sm:inline-flex">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Wrench className="h-4 w-4 text-emerald-600" />}
                >
                  সার্ভিস যোগ করুন
                </Button>
              </Link>
            )}

            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              title="নোটিফিকেশন"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-600 ring-2 ring-white" />
            </Link>

            {/* Profile Avatar */}
            <Link href={role === 'INDIVIDUAL_PROVIDER' ? '/provider/profile' : role === 'BUSINESS' ? '/business/profile' : '/customer/profile'}>
              <div className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-100 transition cursor-pointer">
                <Avatar fallback={userName} size="sm" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        title="ড্যাশবোর্ড মেনু"
        position="right"
      >
        <DashboardSidebar isMobile onItemClick={() => setIsMobileDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
