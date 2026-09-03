'use client';

import * as React from 'react';
import { CreditCard, RefreshCw, CheckCircle2, XCircle, AlertCircle, ShieldAlert } from 'lucide-react';
import { Button, Badge, Input } from '@kajlagbe/ui';
import { PayoutRequestAdminItem } from '@kajlagbe/types';

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = React.useState<PayoutRequestAdminItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<string>('PENDING');

  const [selectedPayout, setSelectedPayout] = React.useState<PayoutRequestAdminItem | null>(null);
  const [failureReason, setFailureReason] = React.useState('');
  const [actionLoading, setActionLoading] = React.useState(false);

  const fetchPayouts = React.useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filter !== 'ALL') queryParams.set('status', filter);

      const res = await fetch(`/api/admin/payouts?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPayouts(data);
      } else {
        setPayouts([]);
      }
    } catch {
      setPayouts([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  React.useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  const handleProcess = async (action: 'APPROVE' | 'REJECT') => {
    if (!selectedPayout || actionLoading) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/admin/payouts/${selectedPayout.id}/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, failureReason }),
      });

      if (res.ok) {
        setSelectedPayout(null);
        setFailureReason('');
        await fetchPayouts();
      }
    } catch {
      // Error
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">উপার্জন পেআউট অনুমোদন প্যানেল</h1>
          <p className="text-xs text-slate-500">প্রোভাইডারদের বিকাশ, রকেট বা ব্যাংক অ্যাকাউন্টে তহবিল ট্রান্সফার অনুমোদন দিন</p>
        </div>

        <Button onClick={fetchPayouts} variant="outline" size="sm" disabled={loading} className="text-xs font-bold gap-1.5 self-start sm:self-auto">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        {['PENDING', 'PROCESSED', 'REJECTED', 'ALL'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`pb-3 transition border-b-2 ${
              filter === st ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {st === 'PENDING' ? 'পেন্ডিং পেআউট' : st === 'PROCESSED' ? 'সম্পন্ন' : st === 'REJECTED' ? 'বাতিল' : 'সব'}
          </button>
        ))}
      </div>

      {/* Payout Requests List Table */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">পেআউট তালিকা লোড হচ্ছে...</div>
        ) : payouts.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <CreditCard className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">কোনো পেআউট অনুরোধ অপেক্ষমান নেই</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="p-4">প্রোভাইডার</th>
                  <th className="p-4">পেমেন্ট মেথড & একাউন্ট</th>
                  <th className="p-4">পরিমাণ (BDT)</th>
                  <th className="p-4">রেফারেন্স কোড</th>
                  <th className="p-4">স্টেটাস</th>
                  <th className="p-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-900">{p.userName}</td>
                    <td className="p-4">
                      <span className="font-bold text-slate-800 uppercase">{p.payoutMethod}:</span>{' '}
                      <span className="text-slate-600">{p.accountNumberMasked}</span>
                    </td>
                    <td className="p-4 font-black text-slate-900">৳ {p.amount.toLocaleString('bn-BD')}</td>
                    <td className="p-4 text-slate-500 font-mono text-[11px]">{p.referenceCode}</td>
                    <td className="p-4">
                      <Badge variant={p.status === 'PROCESSED' ? 'success' : p.status === 'REJECTED' ? 'error' : 'warning'}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      {p.status === 'PENDING' ? (
                        <Button
                          onClick={() => setSelectedPayout(p)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px]"
                        >
                          প্রসেস করুন
                        </Button>
                      ) : (
                        <span className="text-[11px] text-slate-400">সম্পন্ন</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-white p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              পেআউট ট্রান্সফার অনুমোদন
            </h3>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 space-y-1 text-xs">
              <p className="font-bold text-purple-950">{selectedPayout.userName}</p>
              <p className="text-purple-800">
                মেথড: <strong>{selectedPayout.payoutMethod}</strong> ({selectedPayout.accountNumberMasked})
              </p>
              <p className="text-sm font-black text-purple-900 pt-1">
                ট্রান্সফার পরিমাণ: ৳ {selectedPayout.amount.toLocaleString('bn-BD')} BDT
              </p>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-700 block mb-1">প্রত্যাখ্যানের কারণ (যদি বাতিল করতে চান)</label>
              <Input
                placeholder="বাতিল করার নির্দিষ্ট কারণ লিখুন..."
                value={failureReason}
                onChange={(e) => setFailureReason(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <Button onClick={() => setSelectedPayout(null)} variant="outline" size="sm" className="text-xs font-bold">
                বন্ধ
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleProcess('REJECT')}
                  disabled={actionLoading}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold text-rose-600 border-rose-200 hover:bg-rose-50"
                >
                  বাতিল করুন
                </Button>
                <Button
                  onClick={() => handleProcess('APPROVE')}
                  disabled={actionLoading}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  {actionLoading ? 'অনুমোদন হচ্ছে...' : 'ট্রান্সফার অনুমোদন দিন'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
