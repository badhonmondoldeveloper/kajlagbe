import Link from 'next/link';
import { siteConfig } from '../../config/site';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="text-xl font-black text-emerald-600">
              KAJ<span className="text-slate-900">LAGBE</span>
            </span>
            <p className="mt-2 text-sm text-slate-500 max-w-md">
              Bangladesh-wide local service marketplace platform. Connecting trusted local service
              providers and skilled technicians with consumers and businesses across all 8 divisions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-emerald-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Support & Safety</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-emerald-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} KajLagbe Technologies Ltd. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Module 01: Platform Foundation</p>
        </div>
      </div>
    </footer>
  );
}

