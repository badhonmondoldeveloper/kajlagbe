import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { MobileBottomNav } from '../components/layout/mobile-bottom-nav';
import { AuthProvider } from '../context/auth-context';
import { LocationProvider } from '../context/location-context';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'amp-auto-ads': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          'data-ad-client'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const metadata: Metadata = {
  metadataBase: new URL('https://kajlagbe-sigma.vercel.app'),
  title: {
    default: 'KajLagbe (কাজলগবে) | বাংলাদেশের বিশ্বস্ত সার্ভিস ও কারিগর মার্কেটপ্লেস',
    template: '%s | KajLagbe',
  },
  description:
    'বাংলাদেশের ৬৪ জেলায় অন-ডিমান্ড ও ভেরিফাইড কারিগর (এসি মেকানিক, ইলেকট্রিশিয়ান, প্লাম্বার, হোম ক্লিনিং, টেকনিশিয়ান) খুঁজে নিন ১৫ মিনিটে।',
  keywords: [
    'KajLagbe',
    'কাজলগবে',
    'এসি সার্ভিসিং',
    'ইলেকট্রিশিয়ান',
    'প্লাম্বার',
    'টেকনিশিয়ান',
    'হোম সার্ভিস',
    'ওয়ার্কার বুকিং',
    'বাংলাদেশ সার্ভিস মার্কেটপ্লেস',
  ],
  authors: [{ name: 'KajLagbe Team' }],
  creator: 'KajLagbe',
  publisher: 'KajLagbe Technologies Ltd.',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'KajLagbe | বাংলাদেশের বিশ্বস্ত সার্ভিস ও কারিগর মার্কেটপ্লেস',
    description:
      '৬৪ জেলায় যাচাইকৃত ও দক্ষ টেকনিশিয়ান এবং কারিগরদের সরাসরি বুকিং দিন। দ্রুত ও নিরাপদ সেবা।',
    url: 'https://kajlagbe-sigma.vercel.app',
    siteName: 'KajLagbe',
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KajLagbe | Bangladesh Local Worker & Service Marketplace',
    description:
      'Connect with NID-verified plumbers, electricians, AC technicians, and local service providers near you.',
  },
  verification: {
    google: 'google-site-verification-kajlagbe-2026',
  },
  other: {
    'google-adsense-account': 'ca-pub-9249570729862532',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data Schema for Google Search Console
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KajLagbe',
    url: 'https://kajlagbe-sigma.vercel.app',
    logo: 'https://kajlagbe-sigma.vercel.app/logo.png',
    sameAs: [
      'https://facebook.com/kajlagbebd',
      'https://twitter.com/kajlagbebd',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+8809600-525524',
      contactType: 'customer support',
      areaServed: 'BD',
      availableLanguage: ['Bengali', 'English'],
    },
  };

  return (
    <html lang="bn" className="h-full scroll-smooth">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9249570729862532" />
        
        {/* Step 1: AMP Auto-Ads Head Script */}
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9249570729862532"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Search Console JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased font-sans pb-16 md:pb-0 relative selection:bg-emerald-500 selection:text-white">
        {/* Step 2: AMP Auto-Ads Component directly after <body> tag */}
        <amp-auto-ads
          type="adsense"
          data-ad-client="ca-pub-9249570729862532"
        />

        <AuthProvider>
          <LocationProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileBottomNav />
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
