import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { MobileBottomNav } from '../components/layout/mobile-bottom-nav';
import { AuthProvider } from '../context/auth-context';

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
    <html lang="bn" className="h-full">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased font-sans pb-16 md:pb-0">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
