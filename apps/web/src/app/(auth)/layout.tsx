'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Auth Dedicated Minimal Header */}
      <header className="w-full border-b border-slate-200/80 bg-white py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-xs group-hover:scale-105 transition">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                কাজ লাগবে
              </span>
              <span className="text-[10px] font-bold text-emerald-600 tracking-wider">
                KAJLAGBE.COM
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>হোমপেজে ফিরে যান</span>
          </Link>
        </div>
      </header>

      {/* Main Auth Content Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Auth Dedicated Minimal Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} KajLagbe Inc. সর্বস্বত্ব সংরক্ষিত।</span>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
            <Link href="/safety" className="hover:text-emerald-600">নিরাপত্তা নীতি</Link>
            <span>•</span>
            <Link href="/help" className="hover:text-emerald-600">সহায়তা কেন্দ্র</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-emerald-600">যোগাযোগ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

