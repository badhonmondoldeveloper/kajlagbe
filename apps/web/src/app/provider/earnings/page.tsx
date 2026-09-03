'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  ChevronRight,
  Percent,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardStatCard } from '../../../components/dashboard/dashboard-stat-card';
import { useAuth } from '../../../context/auth-context';
import { createClient } from '../../../lib/supabase/client';

export default function ProviderEarningsPage() {
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [wallet, setWallet] = React.useState<any>(null);
  const [payments, setPayments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchEarningsData = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [walletRes, paymentRes] = await Promise.all([
        supabase.from('wallet_accounts').select('*, ledgerEntries:wallet_ledger_entries(*)').eq('userId', user.id).single(),
        supabase.from('payment_orders').select('*').eq('providerId', user.id).order('createdAt', { ascending: false }),
      ]);

      if (walletRes.data) setWallet(walletRes.data);
      if (paymentRes.data) setPayments(paymentRes.data);
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  React.useEffect(() => {
    fetchEarningsData();
  }, [fetchEarningsData]);

  const availableBalance = Number(wallet?.availableBalance || 0);
  const pendingBalance = Number(wallet?.pendingBalance || 0);
  const totalEarned = Number(wallet?.totalEarned || 0);

  return (
    <DashboardLayout
      title="আয় ও ওয়ালেট কনসোল (Earnings & Wallet)"
      subtitle="আপনার অর্জিত আয়, প্লাটফর্ম কমিশন ও উত্তোলনযোগ্য ওয়ালেট ব্যালেন্স"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Wallet Balances Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-emerald-950 to-slate-900 p-6 text-white shadow-md space-y-2">
            <span className="text-xs text-emerald-300 font-bold block">উত্তোলনযোগ্য ব্যালেন্স</span>
            <h2 className="text-3xl font-black text-white">
              ৳{availableBalance.toLocaleString('bn-BD')}
            </h2>
            <Link href="/provider/payouts" className="pt-2 block">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-1">
                <span>উত্তোলন আবেদন</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <DashboardStatCard
            title="পেন্ডিং ব্যালেন্স"
            value={`৳${pendingBalance.toLocaleString('bn-BD')}`}
            subtitle="অনুমোদনের অপেক্ষায়"
            icon={Clock}
            variant="amber"
          />

          <DashboardStatCard
            title="সর্বমোট অর্জিত আয়"
            value={`৳${totalEarned.toLocaleString('bn-BD')}`}
            subtitle="কমিশন বাদ দিয়ে নিট আয়"
            icon={TrendingUp}
            variant="emerald"
          />
        </div>

        {/* Ledger & Payment Transactions List */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900">অর্জিত আয়ের ট্রানজেকশন হিস্ট্রি</h3>
              <p className="text-xs text-slate-500">স্বচ্ছ প্লাটফর্ম কমিশন কর্তনের পর নিট প্রোভাইডার ক্রেডিট</p>
            </div>

            <Link href="/provider/payouts">
              <Button size="sm" variant="outline" className="text-xs gap-1">
                <span>উত্তোলন হিস্ট্রি</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : payments.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">
              এখনো কোনো আয়ের ট্রানজেকশন রেকর্ড নেই। কাজ সম্পন্ন হলে আয় এখানে জমা হবে।
            </p>
          ) : (
            <div className="space-y-3">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-500">#{p.orderReference}</span>
                      <Badge variant="success">SUCCEEDED</Badge>
                    </div>
                    <span className="text-slate-600 block">
                      মোট গ্রাহক পেমেন্ট: ৳{Number(p.grossAmount).toLocaleString('bn-BD')} • কমিশন: ৳{Number(p.commissionAmount).toLocaleString('bn-BD')}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 block">ওয়ালেটে নিট জমা</span>
                    <span className="text-base font-black text-emerald-700">
                      +৳{Number(p.netProviderAmount).toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
