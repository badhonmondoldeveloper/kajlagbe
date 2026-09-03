'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Container } from '@kajlagbe/ui';

export interface AuthCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({
  title,
  subtitle,
  badge = 'নিরাপদ অ্যাকাউন্ট সিস্টেম',
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-10 sm:py-16 bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white">
      <Container className="max-w-md w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md space-y-6">
          {/* Header Brand & Badge */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-1.5 select-none mb-1">
              <span className="text-2xl font-black tracking-tight text-emerald-600">
                KAJ<span className="text-slate-900">LAGBE</span>
              </span>
            </Link>

            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>{badge}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div>{children}</div>

          {/* Optional Footer */}
          {footer && (
            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              {footer}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

