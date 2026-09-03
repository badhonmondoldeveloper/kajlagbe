export const siteConfig = {
  name: 'KajLagbe',
  description: 'Bangladesh-wide Local Service Marketplace Platform',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  mainNav: [
    { title: 'Services', href: '/services' },
    { title: 'Find Providers', href: '/providers' },
    { title: 'Jobs Board', href: '/jobs' },
    { title: 'How it Works', href: '/how-it-works' },
    { title: 'For Providers', href: '/for-providers' },
  ],
  footerNav: [
    { title: 'Safety & Trust', href: '/safety' },
    { title: 'Help & Support', href: '/help' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'For Businesses', href: '/for-businesses' },
  ],
};

