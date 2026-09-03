import Link from 'next/link';
import { Badge } from '@kajlagbe/ui';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'My Bookings', href: '/dashboard/bookings' },
    { label: 'My Jobs', href: '/dashboard/jobs' },
    { label: 'Messages', href: '/dashboard/messages' },
    { label: 'Payments', href: '/dashboard/payments' },
    { label: 'Reviews', href: '/dashboard/reviews' },
    { label: 'Saved Providers', href: '/dashboard/saved' },
    { label: 'Support', href: '/dashboard/support' },
    { label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                CU
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Customer Portal</p>
                <Badge variant="secondary">Active</Badge>
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

