import Link from 'next/link';
import { Badge } from '@kajlagbe/ui';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Provider Console', href: '/provider' },
    { label: 'Profile & KYC', href: '/provider/profile' },
    { label: 'My Services', href: '/provider/services' },
    { label: 'Browse Jobs', href: '/provider/jobs' },
    { label: 'Applications', href: '/provider/applications' },
    { label: 'Bookings', href: '/provider/bookings' },
    { label: 'Calendar', href: '/provider/calendar' },
    { label: 'Messages', href: '/provider/messages' },
    { label: 'Portfolio', href: '/provider/portfolio' },
    { label: 'Earnings', href: '/provider/earnings' },
    { label: 'Payouts', href: '/provider/payouts' },
    { label: 'Analytics', href: '/provider/analytics' },
    { label: 'Subscription & Credits', href: '/provider/subscription' },
    { label: 'Settings', href: '/provider/settings' },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                PR
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Provider Console</p>
                <Badge variant="default">Verified Pro</Badge>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <section className="flex-1">{children}</section>
      </div>
    </div>
  );
}

