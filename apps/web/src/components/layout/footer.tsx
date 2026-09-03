import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand and Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-emerald-600">
                KAJ<span className="text-slate-900">LAGBE</span>
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                BD
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              বাংলাদেশের সর্ববৃহৎ বিশ্বস্ত ও ভেরিফাইড লোকাল সার্ভিস প্ল্যাটফর্ম। দক্ষ ইলেকট্রিশিয়ান,
              প্লাম্বার, এসি টেকনিশিয়ানসহ সকল পেশাজীবী সরাসরি যুক্ত হোন।
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 w-fit">
              <ShieldCheck className="h-4 w-4" />
              <span>নিরাপদ ও জাতীয় পরিচয়পত্র যাচাইকৃত প্রোভাইডার</span>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              জনপ্রিয় সেবাসমূহ
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/services/ac-repair" className="hover:text-emerald-600 transition">
                  এসি মেরামত ও সার্ভিসিং
                </Link>
              </li>
              <li>
                <Link href="/services/electrician" className="hover:text-emerald-600 transition">
                  ইলেকট্রিক্যাল ওয়্যারিং
                </Link>
              </li>
              <li>
                <Link href="/services/plumbing" className="hover:text-emerald-600 transition">
                  প্লাম্বিং ও পাইপ ফিটিং
                </Link>
              </li>
              <li>
                <Link href="/services/cleaning" className="hover:text-emerald-600 transition">
                  বাড়ি ও অফিস ক্লিনিং
                </Link>
              </li>
              <li>
                <Link href="/services/shifting" className="hover:text-emerald-600 transition">
                  বাসা বদল ও শিফটিং
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-600 transition font-semibold text-emerald-700">
                  সকল সেবা ডিরেক্টরি →
                </Link>
              </li>
            </ul>
          </div>

          {/* For Providers & Businesses */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              প্রোভাইডার ও ব্যবসা
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/for-providers" className="hover:text-emerald-600 transition">
                  প্রোভাইডার হিসেবে যোগ দিন
                </Link>
              </li>
              <li>
                <Link href="/for-businesses" className="hover:text-emerald-600 transition">
                  কর্পোরেট সেবা ও সমাধান
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-emerald-600 transition">
                  লাইভ কাজের বোর্ড (Job Board)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-600 transition">
                  সাবস্ক্রিপশন ও মূল্য
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-emerald-600 transition">
                  নিরাপত্তা ও নীতি নির্দেশিকা
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-emerald-600 transition font-medium text-emerald-600">
                  ডিজাইন সিস্টেম গাইড
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              কোম্পানি ও সহায়তা
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-600 transition">
                  আমাদের সম্পর্কে (About)
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-emerald-600 transition">
                  কীভাবে কাজ করে
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-600 transition">
                  ব্লগ ও সার্ভিস গাইড
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-emerald-600 transition">
                  সাহায্য কেন্দ্র (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600 transition">
                  যোগাযোগ ফর্ম
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-slate-600 pt-1">
                <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
                <span>+৮৮০ ৯৬১২-XXXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Division Coverage Badge List */}
        <div className="mt-10 pt-6 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              সেবা প্রদানকারী অঞ্চল:
            </span>
            {divisions.map((div) => (
              <span
                key={div}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-600 text-[11px]"
              >
                {div} বিভাগ
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} KajLagbe Technologies Ltd. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="mt-3 sm:mt-0 flex items-center space-x-4">
            <Link href="/safety" className="hover:underline">শর্তাবলী ও গোপনীয়তা</Link>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">Module 03: Premium Public Website</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
