'use client';

import * as React from 'react';
import {
  CreditCard,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  Wallet,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';
import { ManualPaymentSubmission } from '@kajlagbe/types';

export default function AdminPaymentsPage() {
  const [orders, setOrders] = React.useState<ManualPaymentSubmission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<string>('PENDING');
  const [search, setSearch] = React.useState<string>('');
  const [selectedOrder, setSelectedOrder] = React.useState<ManualPaymentSubmission | null>(null);
  const [rejectReason, setRejectReason] = React.useState('');
  const [actionLoading, setActionLoading] = React.useState(false);

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/payment-orders?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  }, [filter]);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleProcess = async (action: 'APPROVE' | 'REJECT') => {
    if (!selectedOrder || actionLoading) return;
    setActionLoading(true);

    try {
      const res = await fetch('/api/admin/payment-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          action,
          reason: rejectReason,
        }),
      });

      if (res.ok) {
        setSelectedOrder(null);
        setRejectReason('');
        await fetchOrders();
      }
    } catch {
      // Handled
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderReference.toLowerCase().includes(search.toLowerCase()) ||
      o.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      o.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      o.senderAccount.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              ম্যানুয়াল পেমেন্ট ভেরিফিকেশন সেন্টার
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              জমা পড়া পেমেন্ট ও TrxID অনুমোদন কিউ
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              বিকাশ, নগদ, রকেট ও ক্রিপ্টো ওয়ালেট ট্রানজেকশন আইডি যাচাই করে অনুমোদন বা বাতিল করুন।
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => fetchOrders()}
            disabled={loading}
            className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700 text-xs sm:text-sm w-fit"
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            রিফ্রেশ
          </Button>
        </div>
      </div>

      {/* Controls & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="TrxID, ইমেইল বা রেফারেন্স খুঁজুন..."
            className="pl-10 text-xs sm:text-sm rounded-2xl bg-white border-slate-200"
          />
        </div>

        {/* Filter Status Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold w-full sm:w-auto overflow-x-auto">
          {['PENDING', 'APPROVED', 'REJECTED', 'ALL'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-4 py-2 rounded-xl transition ${
                filter === st
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {st === 'PENDING'
                ? 'অপেক্ষমাণ (Pending)'
                : st === 'APPROVED'
                ? 'অনুমোদিত (Approved)'
                : st === 'REJECTED'
                ? 'বাতিল (Rejected)'
                : 'সকল পেমেন্ট'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table / Cards */}
      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card className="rounded-3xl border border-slate-200 p-12 text-center space-y-3 bg-white">
          <AlertCircle className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-base">কোনো পেমেন্ট অর্ডার পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-400">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((ord) => (
            <Card
              key={ord.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 hover:shadow-md transition overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-lg">
                      {ord.orderReference}
                    </span>
                    <Badge
                      className={
                        ord.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : ord.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
                      }
                    >
                      {ord.status === 'PENDING' ? 'অপেক্ষমাণ' : ord.status === 'APPROVED' ? 'অনুমোদিত' : 'বাতিল'}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(ord.createdAt).toLocaleString('bn-BD')}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
                    <p className="font-semibold text-slate-900">
                      গ্রাহক: <span className="text-emerald-700 font-bold">{ord.userEmail}</span>
                    </p>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <p className="font-bold text-slate-900">
                      চ্যানেল: <span className="text-slate-700">{ord.channelName}</span>
                    </p>
                  </div>

                  {/* TrxID Highlight Box */}
                  <div className="flex flex-wrap items-center gap-3 bg-slate-900 text-white rounded-2xl p-3.5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Transaction ID / Hash
                      </span>
                      <span className="font-mono font-bold text-emerald-300 text-xs sm:text-sm">
                        {ord.transactionId}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-slate-700 hidden sm:block" />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        প্রেরক নম্বর / ওয়ালেট
                      </span>
                      <span className="font-mono font-semibold text-slate-200">
                        {ord.senderAccount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Amount & Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium">মোট পরিমাণ</p>
                    <p className="text-lg sm:text-xl font-black text-slate-900">
                      ৳{ord.amountBdt.toLocaleString('bn-BD')}{' '}
                      <span className="text-xs font-semibold text-emerald-600">
                        (${ord.amountUsd} USD)
                      </span>
                    </p>
                  </div>

                  {ord.status === 'PENDING' && (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(ord);
                          handleProcess('APPROVE');
                        }}
                        disabled={actionLoading}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 h-9 shadow-xs"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        অনুমোদন করুন
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedOrder(ord)}
                        disabled={actionLoading}
                        className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold px-3 h-9"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        বাতিল
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {selectedOrder && filter !== 'PENDING' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base">পেমেন্ট বাতিল নিশ্চিত করুন</h3>
            <p className="text-xs text-slate-600">
              অর্ডার <span className="font-mono font-bold">{selectedOrder.orderReference}</span> বাতিল করার কারণ সংক্ষেপে লিখুন।
            </p>

            <Input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="যেমন: TrxID মেলেনি বা ফান্ড জমা হয়নি"
              className="text-xs sm:text-sm"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setSelectedOrder(null)}>
                বাতিল
              </Button>
              <Button
                type="button"
                onClick={() => handleProcess('REJECT')}
                disabled={actionLoading}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                পেমেন্ট বাতিল নিশ্চিত করুন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
