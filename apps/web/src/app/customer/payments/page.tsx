'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronRight,
  ShieldCheck,
  FileText,
  Clock,
  ArrowDownLeft,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { useAuth } from '../../../context/auth-context';
import { createClient } from '../../../lib/supabase/client';

export default function CustomerPaymentsPage() {
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [payments, setPayments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchPayments = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payment_orders')
        .select(`
          *,
          provider:users!payment_orders_providerId_fkey(
            profile:user_profiles(firstName, lastName)
          )
        `)
        .eq('customerId', user.id)
        .order('createdAt', { ascending: false });

      if (!error && data) {
        setPayments(data);
      }
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  React.useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const filteredPayments = payments.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.orderReference.toLowerCase().includes(q) || p.paymentMethod.toLowerCase().includes(q);
  });

  return (
    <DashboardLayout
      title="আমার পেমেন্ট ও রসিদসমূহ (Payments)"
      subtitle="আপনার সমস্ত পরিশোধিত সেবা চার্জ, রসিদ ও পেমেন্ট হিস্ট্রি"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Header Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Input
              type="search"
              placeholder="অর্ডার রেফারেন্স দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-slate-400" />}
              className="bg-slate-50 border-slate-200"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-2xl">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>সার্ভার ভেরিফাইড সুরক্ষিত লেনদেন</span>
          </div>
        </div>

        {/* Payments List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredPayments.length === 0 ? (
          <DashboardEmptyState
            icon={CreditCard}
            title="কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি"
            description="আপনার কোনো পূর্ববর্তী সার্ভিস পেমেন্ট ট্রানজেকশন রেকর্ড নেই।"
            actionText="সার্ভিস বুকিং দেখুন"
            actionHref="/customer/bookings"
          />
        ) : (
          <div className="space-y-3">
            {filteredPayments.map((p) => {
              const providerName =
                p.provider?.profile?.firstName && p.provider?.profile?.lastName
                  ? `${p.provider.profile.firstName} ${p.provider.profile.lastName}`
                  : p.provider?.profile?.firstName || 'প্রোভাইডার';

              return (
                <div
                  key={p.id}
                  className="rounded-3xl border border-slate-200/90 bg-white p-5 hover:border-emerald-400 hover:shadow-xs transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        #{p.orderReference}
                      </span>
                      <Badge variant={p.status === 'SUCCEEDED' ? 'success' : 'warning'}>
                        {p.status}
                      </Badge>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      সার্ভিস চার্জ (প্রোভাইডার: {providerName})
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>মেথড: {p.paymentMethod}</span>
                      <span>•</span>
                      <span>{new Date(p.createdAt).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="text-xs text-slate-400 block">মোট পরিশোধিত</span>
                    <span className="text-xl font-black text-emerald-700">
                      ৳{Number(p.grossAmount).toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

