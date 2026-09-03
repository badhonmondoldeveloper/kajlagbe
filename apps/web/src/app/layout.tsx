import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';

export const metadata: Metadata = {
  title: 'KajLagbe | Bangladesh Local Service Marketplace',
  description:
    'Reliable on-demand and scheduled services across all 64 districts in Bangladesh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

