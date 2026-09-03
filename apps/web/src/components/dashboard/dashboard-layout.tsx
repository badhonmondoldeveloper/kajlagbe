'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardHeader } from './dashboard-header';
import { DashboardMobileNav } from './dashboard-mobile-nav';
import { useAuth } from '../../context/auth-context';
import { LoadingState } from '@kajlagbe/ui';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({
  children,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingState message="ড্যাশবোর্ড লোড হচ্ছে..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 fixed inset-y-0 left-0 z-30">
        <DashboardSidebar />
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen pb-20 lg:pb-8">
        <DashboardHeader title={title} subtitle={subtitle} />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        {/* Mobile Navigation */}
        <DashboardMobileNav />
      </div>
    </div>
  );
}

