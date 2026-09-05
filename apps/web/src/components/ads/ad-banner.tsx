'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, ExternalLink, Zap } from 'lucide-react';
import { Badge, Button } from '@kajlagbe/ui';

export interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'inline' | 'compact';
  className?: string;
  clientId?: string;
}

export function AdBanner({
  slot = '1234567890',
  format: _format = 'horizontal',
  className = '',
  clientId = 'ca-pub-9249570729862532',
}: AdBannerProps) {
  const [adLoaded, setAdLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const win = window as any;
        win.adsbygoogle = win.adsbygoogle || [];
        win.adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch {
      // Fallback to promotional banner
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden my-6 ${className}`}>
      {/* Real Google AdSense Tag Wrapper */}
      <div className="relative rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 via-emerald-50/40 to-slate-50 p-4 sm:p-5 shadow-2xs transition hover:border-emerald-300">
        {/* Small Ad Tag Badge */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>বিজ্ঞাপন (AdSense Partner)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">ID: {clientId.slice(0, 14)}...</span>
        </div>

        {/* AdSense Unit Container */}
        <div className="min-h-[90px] flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={clientId}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />

          {/* Backup Clean Promotional Sponsor Banner */}
          {!adLoaded && (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white font-black shrink-0 shadow-xs">
                  <Zap className="h-6 w-6 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      কাজলগবে প্ল্যাটফর্মে আপনার সার্ভিস বিক্রি করুন
                    </span>
                    <Badge variant="verified" size="sm">স্পন্সরড</Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    আজই ভেরিফাইড কারিগর হিসেবে ফ্রিতে রেজিস্টার করে দ্বিগুণ আয় বাড়ান।
                  </p>
                </div>
              </div>

              <Link href="/signup/provider" className="shrink-0 w-full sm:w-auto">
                <Button size="sm" variant="primary" rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
                  কারিগর হিসেবে জয়েন করুন
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
