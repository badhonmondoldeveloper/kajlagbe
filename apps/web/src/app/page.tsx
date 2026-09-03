import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@kajlagbe/ui';

export default function HomePage() {
  const sections = [
    {
      title: 'Public Portal',
      description: 'Customer-facing public catalog, directory and service discovery.',
      links: [
        { label: 'Services Directory', href: '/services' },
        { label: 'Find Providers', href: '/providers' },
        { label: 'Jobs Board', href: '/jobs' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'For Providers', href: '/for-providers' },
      ],
    },
    {
      title: 'Authentication',
      description: 'Multi-role authentication, registration and recovery flows.',
      links: [
        { label: 'User Login', href: '/login' },
        { label: 'Register Account', href: '/register' },
        { label: 'Forgot Password', href: '/forgot-password' },
      ],
    },
    {
      title: 'Customer Dashboard',
      description: 'Customer bookings, custom job posts, payments and reviews.',
      links: [
        { label: 'Overview', href: '/dashboard' },
        { label: 'My Bookings', href: '/dashboard/bookings' },
        { label: 'My Jobs', href: '/dashboard/jobs' },
        { label: 'Payments', href: '/dashboard/payments' },
      ],
    },
    {
      title: 'Provider Portal',
      description: 'Freelance & company provider management, jobs, earnings & verification.',
      links: [
        { label: 'Provider Console', href: '/provider' },
        { label: 'Service Offerings', href: '/provider/services' },
        { label: 'Earnings & Payouts', href: '/provider/earnings' },
        { label: 'Job Applications', href: '/provider/applications' },
      ],
    },
    {
      title: 'Admin Command Center',
      description: 'Super admin governance, RBAC, KYC verification, finance & feature flags.',
      links: [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'User Governance', href: '/admin/users' },
        { label: 'KYC & Verifications', href: '/admin/verifications' },
        { label: 'Financial Audit', href: '/admin/payments' },
        { label: 'Feature Flags', href: '/admin/feature-flags' },
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-8 sm:p-12 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge variant="default">Module 01 Completed</Badge>
          <Badge variant="outline">Monorepo Foundation Ready</Badge>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
          KAJ<span className="text-emerald-600">LAGBE</span> Platform Architecture
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Bangladesh-wide local service marketplace platform foundation. Built with Turborepo,
          Next.js App Router, NestJS API, Prisma ORM, and enterprise RBAC architecture.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="http://localhost:4000/api/v1/health"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition"
          >
            Check API Health (GET /api/v1/health)
          </a>
          <a
            href="http://localhost:4000/api/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            Swagger OpenAPI Docs
          </a>
        </div>
      </div>

      {/* Routes & Domains Directory */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Application Route Hierarchy
            </h2>
            <p className="text-sm text-slate-500">
              Verify the routed workspace structure configured for future modules.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card key={section.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800 hover:underline"
                      >
                        → {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
