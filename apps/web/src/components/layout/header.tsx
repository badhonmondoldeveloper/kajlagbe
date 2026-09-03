'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, PlusCircle, ShieldCheck } from 'lucide-react';
import { Button, Drawer, Badge } from '@kajlagbe/ui';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'সেবা খুঁজুন', href: '/services' },
    { label: 'প্রোভাইডার তালিকা', href: '/providers' },
    { label: 'কাজের বোর্ড', href: '/jobs' },
    { label: 'ডিজাইন সিস্টেম', href: '/design-system', badge: 'Demo' },
    { label: 'কিভাবে কাজ করে', href: '/how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 select-none group">
            <span className="text-2xl font-black tracking-tight text-emerald-600 transition-transform group-hover:scale-102">
              KAJ<span className="text-slate-900">LAGBE</span>
            </span>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
              BD
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 transition-colors hover:text-emerald-600 ${
                    isActive ? 'text-emerald-600 font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <Badge variant="default" size="sm">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/jobs"
            className="hidden sm:inline-flex"
          >
            <Button
              variant="outline"
              size="sm"
              leftIcon={<PlusCircle className="h-4 w-4 text-emerald-600" />}
            >
              কাজ পোস্ট করুন
            </Button>
          </Link>

          <Link href="/login" className="hidden sm:inline-block">
            <Button variant="ghost" size="sm">
              লগইন
            </Button>
          </Link>

          <Link href="/register">
            <Button size="sm">শুরু করুন</Button>
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="KajLagbe নেভিগেশন"
        position="bottom"
      >
        <div className="space-y-4 py-2">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900 border border-emerald-100">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>বাংলাদেশ-ব্যাপী বিশ্বস্ত ও যাচাইকৃত লোকাল সার্ভিস মার্কেটপ্লেস</span>
          </div>

          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
              >
                <span>{link.label}</span>
                {link.badge && <Badge variant="default" size="sm">{link.badge}</Badge>}
              </Link>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/dashboard/jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <Button
                variant="outline"
                className="w-full"
                leftIcon={<PlusCircle className="h-4 w-4 text-emerald-600" />}
              >
                কাজ পোস্ট করুন (Post a Job)
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="secondary" className="w-full">
                  লগইন
                </Button>
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Button className="w-full">
                  অ্যাকাউন্ট খুলুন
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
