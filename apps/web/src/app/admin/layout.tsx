'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Users,
  UserCheck,
  Briefcase,
  CalendarCheck,
  CreditCard,
  Flag,
  History,
  Settings,
  Search,
  Menu,
  X,
  LogOut,
  SlidersHorizontal,
  FolderTree,
  HelpCircle,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Badge, Button } from '@kajlagbe/ui';
import { useAuth } from '../../context/auth-context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, role, signOut, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Client-side & UI Role Check: Block non-admins from rendering Admin Control Center UI
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirectTo=/admin');
    }
  }, [isAuthenticated, router]);

  const sections = [
    {
      heading: 'Platform Operations',
      items: [
        { label: 'Admin Overview', href: '/admin', icon: TrendingUp },
        { label: 'User Directory', href: '/admin/users', icon: Users },
        { label: 'Provider Verification', href: '/admin/providers', icon: UserCheck },
        { label: 'Categories & Services', href: '/admin/categories', icon: FolderTree },
        { label: 'Job Marketplace', href: '/admin/jobs', icon: Briefcase },
        { label: 'Bookings Operations', href: '/admin/bookings', icon: CalendarCheck },
      ],
    },
    {
      heading: 'Finance & Monetization',
      items: [
        { label: 'Payment Approvals', href: '/admin/payments', icon: CreditCard },
        { label: 'Payment Methods', href: '/admin/payment-methods', icon: Wallet },
        { label: 'Payout Approvals', href: '/admin/payouts', icon: SlidersHorizontal },
      ],
    },
    {
      heading: 'Trust & Governance',
      items: [
        { label: 'Disputes & Reports', href: '/admin/disputes', icon: ShieldAlert },
        { label: 'Feature Flags', href: '/admin/feature-flags', icon: Flag },
        { label: 'Audit Logs', href: '/admin/audit-logs', icon: History },
        { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-rose-200 bg-white p-8 text-center space-y-4 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">এক্সেস সংরক্ষিত (403 Forbidden)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            অ্যাডমিন কমান্ড সেন্টার অ্যাক্সেস করার জন্য আপনার অ্যাকাউন্টে প্রয়োজনীয় অ্যাডমিন পারমিশন নেই।
          </p>
          <Link href="/dashboard">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs mt-2">
              ইউজার ড্যাশবোর্ডে ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">
              KJL
            </div>
            <span className="font-extrabold text-base tracking-tight text-white hidden sm:inline">
              KajLagbe <span className="text-emerald-400 font-semibold text-xs">ADMIN</span>
            </span>
          </Link>
        </div>

        {/* Header Search & Admin Profile */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="ইউজার, প্রোভাইডার বা জব আইডি খুঁজুন..."
              className="w-full pl-9 pr-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-100">{user?.email?.split('@')[0]}</p>
              <Badge variant="verified" size="sm">
                SUPER_ADMIN
              </Badge>
            </div>

            <button
              onClick={() => signOut()}
              title="লগআউট"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs space-y-6 sticky top-20">
            {sections.map((sec) => (
              <div key={sec.heading}>
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {sec.heading}
                </p>
                <nav className="space-y-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex">
            <div className="w-4/5 max-w-xs bg-white h-full p-4 space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-sm text-slate-900">Admin Control</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {sections.map((sec) => (
                <div key={sec.heading}>
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {sec.heading}
                  </p>
                  <nav className="space-y-1">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
                            isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
