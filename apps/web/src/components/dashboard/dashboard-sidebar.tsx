'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  Bookmark,
  Activity,
  Bell,
  User,
  Settings,
  Shield,
  Wrench,
  Image,
  Clock,
  TrendingUp,
  Star,
  Wallet,
  Building2,
  Users,
  MapPin,
  BarChart3,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { Badge, Avatar } from '@kajlagbe/ui';
import { useAuth } from '../../context/auth-context';

export function DashboardSidebar({
  isMobile = false,
  onItemClick,
}: {
  isMobile?: boolean;
  onItemClick?: () => void;
}) {
  const pathname = usePathname();
  const { role, profile, user, signOut } = useAuth();

  const getNavItems = () => {
    if (role === 'INDIVIDUAL_PROVIDER') {
      return [
        { label: 'ড্যাশবোর্ড', href: '/provider/dashboard', icon: LayoutDashboard },
        { label: 'প্রোফাইল', href: '/provider/profile', icon: User },
        { label: 'সার্ভিস তালিকা', href: '/provider/services', icon: Wrench },
        { label: 'পোর্টফোলিও', href: '/provider/portfolio', icon: Image },
        { label: 'কাজের সময়সূচী', href: '/provider/availability', icon: Clock },
        { label: 'পারফরম্যান্স', href: '/provider/performance', icon: TrendingUp },
        { label: 'রিভিউ ও রেটিং', href: '/provider/reviews', icon: Star },
        { label: 'আয় ও লেনদেন', href: '/provider/earnings', icon: Wallet },
        { label: 'নোটিফিকেশন', href: '/notifications', icon: Bell },
        { label: 'সেটিংস', href: '/provider/settings', icon: Settings },
      ];
    }

    if (role === 'BUSINESS') {
      return [
        { label: 'ড্যাশবোর্ড', href: '/business/dashboard', icon: LayoutDashboard },
        { label: 'কোম্পানি প্রোফাইল', href: '/business/profile', icon: Building2 },
        { label: 'সার্ভিস ক্যাটালগ', href: '/business/services', icon: Wrench },
        { label: 'টিম মেম্বার্স', href: '/business/team', icon: Users },
        { label: 'অফিস ও ব্রাঞ্চ', href: '/business/locations', icon: MapPin },
        { label: 'বিজনেস এনালিটিক্স', href: '/business/analytics', icon: BarChart3 },
        { label: 'নোটিফিকেশন', href: '/notifications', icon: Bell },
        { label: 'সেটিংস', href: '/business/settings', icon: Settings },
      ];
    }

    // Default: Customer
    return [
      { label: 'ড্যাশবোর্ড', href: '/customer/dashboard', icon: LayoutDashboard },
      { label: 'সেবা খুঁজুন', href: '/services', icon: Search },
      { label: 'সংরক্ষিত প্রোভাইডার', href: '/customer/saved', icon: Bookmark },
      { label: 'অ্যাকাউন্ট অ্যাক্টিভিটি', href: '/customer/activity', icon: Activity },
      { label: 'নোটিফিকেশন', href: '/notifications', icon: Bell },
      { label: 'প্রোফাইল', href: '/customer/profile', icon: User },
      { label: 'সেটিংস', href: '/customer/settings', icon: Settings },
    ];
  };

  const navItems = getNavItems();
  const userName = profile?.profile?.firstName || user?.user_metadata?.full_name || 'ইউজার';
  const roleLabel =
    role === 'INDIVIDUAL_PROVIDER'
      ? 'প্রোভাইডার পোর্টাল'
      : role === 'BUSINESS'
      ? 'বিজনেস পোর্টাল'
      : role === 'ADMIN'
      ? 'অ্যাডমিন পোর্টাল'
      : 'কাস্টমার পোর্টাল';

  return (
    <div className={`flex flex-col h-full bg-white ${isMobile ? 'p-4' : 'p-5 border-r border-slate-200'}`}>
      {/* Brand & Portal Type */}
      {!isMobile && (
        <div className="flex items-center gap-2 pb-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-1.5 select-none">
            <span className="text-xl font-black tracking-tight text-emerald-600">
              KAJ<span className="text-slate-900">LAGBE</span>
            </span>
          </Link>
          <Badge variant="verified" size="sm">
            {roleLabel}
          </Badge>
        </div>
      )}

      {/* User Mini Identity Card */}
      <div className="my-4 rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 flex items-center gap-3">
        <Avatar fallback={userName} size="md" />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-slate-900 truncate">{userName}</h4>
          <span className="text-[10px] text-slate-500 truncate block">{user?.email}</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="space-y-1 flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/customer/dashboard' && item.href !== '/provider/dashboard' && item.href !== '/business/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Controls: Help, Security, Logout */}
      <div className="pt-4 border-t border-slate-100 space-y-1">
        <Link
          href="/settings/security"
          onClick={onItemClick}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
        >
          <Shield className="h-4 w-4 text-slate-400" />
          <span>সিকিউরিটি সেন্টার</span>
        </Link>
        <Link
          href="/help"
          onClick={onItemClick}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
        >
          <HelpCircle className="h-4 w-4 text-slate-400" />
          <span>সহায়তা কেন্দ্র</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            if (onItemClick) onItemClick();
            signOut();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut className="h-4 w-4 text-rose-500" />
          <span>লগআউট</span>
        </button>
      </div>
    </div>
  );
}
