'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  Building,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { useAuth } from '../../../context/auth-context';
import { createClient } from '../../../lib/supabase/client';
import { PaymentMethod } from '@kajlagbe/types';

export default function ProviderPayoutsPage() {
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [wallet, setWallet] = React.useState<any>(null);
  const [payouts, setPayouts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  // Form State
  const [amount, setAmount] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(PaymentMethod.ONLINE_BKASH);
  const [accountDetails, setAccountDetails] = React.useState('');

  const fetchPayoutData = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [walletRes, payoutRes] = await Promise.all([
        supabase.from('wallet_accounts').select('*').eq('userId', user.id).single(),
        supabase.from('payout_requests').select('*').eq('providerId', user.id).order('createdAt', { ascending: false }),
      ]);

      if (walletRes.data) setWallet(walletRes.data);
      if (payoutRes.data) setPayouts(payoutRes.data);
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  React.useEffect(() => {
    fetchPayoutData();
  }, [fetchPayoutData]);

  const availableBalance = Number(wallet?.availableBalance || 0);

  const handlePayoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reqAmount = Number(amount);
    if (!reqAmount || reqAmount <= 0) {
      alert('সঠিক পরিমাণ উল্লেখ করুন।');
      return;
    }
    if (reqAmount > availableBalance) {
      alert('আপনার উত্তোলনযোগ্য ওয়ালেট ব্যালেন্সের চেয়ে বেশি আবেদন করা যাবে না।');
      return;
    }
    if (!accountDetails.trim()) {
      alert('হিসাব/মোবাইল নাম্বার বিস্তারিত প্রদান করুন।');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/wallet/payout-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: reqAmount, paymentMethod, accountDetails }),
      });

      setAmount('');
      setAccountDetails('');
      fetchPayoutData();
      alert('উত্তোলনের আবেদন জমা নেওয়া হয়েছে। পর্যালোচনা শেষে ব্যালেন্স পাঠানো হবে।');
    } catch {
      alert('আবেদন জমা দিতে ত্রুটি হয়েছে।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      title="টাকা উত্তোলন ও ব্যাংক/MFS অ্যাকাউন্ট"
      subtitle="আপনার অর্জিত আয় bKash, Nagad বা ব্যাংকে উত্তোলনের আবেদন করুন"
    >
      <div className="space-y-6 max-w-4xl">
        <Link href="/provider/earnings" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600">
          <ChevronLeft className="h-4 w-4" />
          <span>আয় কনসোলে ফিরে যান</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Withdrawal Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">নতুন উত্তোলন আবেদন</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  উপলব্ধ: ৳{availableBalance.toLocaleString('bn-BD')}
                </span>
              </div>

              <form onSubmit={handlePayoutSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">উত্তোলনের পরিমাণ (টাকা)</label>
                  <Input
                    type="number"
                    placeholder="যেমন: ১০০০"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={availableBalance}
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">উত্তোলন মাধ্যম (Method)</label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 p-2.5 bg-slate-50 font-bold"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  >
                    <option value={PaymentMethod.ONLINE_BKASH}>bKash (বিকাশ পার্সোনাল)</option>
                    <option value={PaymentMethod.ONLINE_NAGAD}>Nagad (নগদ পার্সোনাল)</option>
                    <option value={PaymentMethod.ONLINE_CARDS}>ব্যাংক অ্যাকাউন্ট ট্রান্সফার</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">একাউন্ট/মোবাইল নাম্বার বিবরণ</label>
                  <Input
                    type="text"
                    placeholder="যেমন: 01700000000 (Personal bKash)"
                    value={accountDetails}
                    onChange={(e) => setAccountDetails(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting || availableBalance <= 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 py-3"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  <span>উত্তোলন আবেদন জমা দিন</span>
                </Button>
              </form>
            </div>

            {/* Payout Requests History */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                পূর্ববর্তী আবেদনের রেকর্ড
              </h3>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : payouts.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">
                  এখনো কোনো উত্তোলনের আবেদন করা হয়নি।
                </p>
              ) : (
                <div className="space-y-3 text-xs">
                  {payouts.map((po) => (
                    <div
                      key={po.id}
                      className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{po.paymentMethod}</span>
                          <Badge variant={po.status === 'PAID' ? 'success' : 'warning'}>
                            {po.status}
                          </Badge>
                        </div>
                        <span className="text-slate-500 text-[11px] block mt-0.5">{po.accountDetails}</span>
                      </div>

                      <span className="font-black text-slate-900 text-sm">
                        ৳{Number(po.amount).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Safety Guidelines */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">উত্তোলন নিয়মাবলী</h4>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
                <li>সর্বনিম্ন ৫টি সার্ভিস পেমেন্ট সম্পন্ন হলে যেকোনো সময় টাকা তোলা যাবে।</li>
                <li>bKash / Nagad আবেদনে সাধারণত ২৪ ঘণ্টার মধ্যে প্রসেস হয়।</li>
                <li>সঠিক বিকাশ/নগদ পার্সোনাল বা ব্যাংক হিসাব প্রদান নিশ্চিত করুন।</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
