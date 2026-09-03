'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  Bookmark,
  Activity,
  User,
  Wrench,
  Clock,
  Star,
  Users,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../context/auth-context';

export function DashboardMobileNav() {
  const pathname = usePathname();
  const { role } = useAuth();

  const getItems = () => {
    if (role === 'INDIVIDUAL_PROVIDER') {
      return [
        { label: 'হোম', href: '/provider/dashboard', icon: LayoutDashboard },
        { label: 'সার্ভিস', href: '/provider/services', icon: Wrench },
        { label: 'সময়সূচী', href: '/provider/availability', icon: Clock },
        { label: 'রিভিউ', href: '/provider/reviews', icon: Star },
        { label: 'প্রোফাইল', href: '/provider/profile', icon: User },
      ];
    }

    if (role === 'BUSINESS') {
      return [
        { label: 'হোম', href: '/business/dashboard', icon: LayoutDashboard },
        { label: 'সার্ভিস', href: '/business/services', icon: Wrench },
        { label: 'টিম', href: '/business/team', icon: Users },
        { label: 'শাখা', href: '/business/locations', icon: MapPin },
        { label: 'প্রোফাইল', href: '/business/profile', icon: User },
      ];
    }

    // Customer
    return [
      { label: 'হোম', href: '/customer/dashboard', icon: LayoutDashboard },
      { label: 'খুঁজুন', href: '/services', icon: Search },
      { label: 'সংরক্ষিত', href: '/customer/saved', icon: Bookmark },
      { label: 'অ্যাক্টিভিটি', href: '/customer/activity', icon: Activity },
      { label: 'প্রোফাইল', href: '/customer/profile', icon: User },
    ];
  };

  const items = getItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200 bg-white/95 px-2 py-1.5 backdrop-blur-lg lg:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-bold transition ${
                isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
