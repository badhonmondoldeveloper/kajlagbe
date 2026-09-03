import Link from 'next/link';
import { Badge } from '@kajlagbe/ui';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = [
    {
      heading: 'Platform Operations',
      items: [
        { label: 'Admin Overview', href: '/admin' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Providers', href: '/admin/providers' },
        { label: 'KYC Verifications', href: '/admin/verifications' },
        { label: 'Service Categories', href: '/admin/categories' },
        { label: 'Job Board', href: '/admin/jobs' },
        { label: 'Bookings', href: '/admin/bookings' },
      ],
    },
    {
      heading: 'Finance & Monetization',
      items: [
        { label: 'Payments & Ledger', href: '/admin/payments' },
        { label: 'Payout Approvals', href: '/admin/payouts' },
        { label: 'Subscriptions', href: '/admin/subscriptions' },
        { label: 'Bidding Credits', href: '/admin/credits' },
      ],
    },
    {
      heading: 'Disputes & Support',
      items: [
        { label: 'Dispute Mediation', href: '/admin/disputes' },
        { label: 'Support Tickets', href: '/admin/support' },
      ],
    },
    {
      heading: 'System & Governance',
      items: [
        { label: 'BI Analytics', href: '/admin/analytics' },
        { label: 'CMS & Content', href: '/admin/cms' },
        { label: 'Security & Access', href: '/admin/security' },
        { label: 'Roles & RBAC', href: '/admin/roles' },
        { label: 'Permissions', href: '/admin/permissions' },
        { label: 'Platform Settings', href: '/admin/settings' },
        { label: 'Feature Flags', href: '/admin/feature-flags' },
        { label: 'Audit Logs', href: '/admin/audit-logs' },
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                AD
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Admin Control</p>
                <Badge variant="error">Super Admin</Badge>
              </div>
            </div>

            <div className="space-y-6">
              {sections.map((sec) => (
                <div key={sec.heading}>
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {sec.heading}
                  </p>
                  <nav className="space-y-1">
                    {sec.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1 min-w-0">{children}</section>
      </div>
    </div>
  );
}

