import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { MobileBottomNav } from '../components/layout/mobile-bottom-nav';
import { AuthProvider } from '../context/auth-context';
import { LocationProvider } from '../context/location-context';

export const metadata: Metadata = {
  title: 'KajLagbe | Bangladesh Local Service Marketplace',
  description:
    'Reliable on-demand and scheduled services across all 64 districts in Bangladesh.',
  other: {
    'google-adsense-account': 'ca-pub-9249570729862532',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9249570729862532" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9249570729862532"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased font-sans pb-16 md:pb-0">
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
