'use client';

import * as React from 'react';
import { UserCheck, ShieldCheck, RefreshCw, CheckCircle2, XCircle, AlertCircle, FileText } from 'lucide-react';
import { Button, Badge, Input } from '@kajlagbe/ui';
import { ProviderVerificationItem } from '@kajlagbe/types';

export default function AdminProvidersPage() {
  const [providers, setProviders] = React.useState<ProviderVerificationItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<string>('PENDING');

  const [selectedProvider, setSelectedProvider] = React.useState<ProviderVerificationItem | null>(null);
  const [rejectionReason, setRejectionReason] = React.useState('');
  const [actionLoading, setActionLoading] = React.useState(false);

  const fetchProviders = React.useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filter !== 'ALL') queryParams.set('verificationStatus', filter);

      const res = await fetch(`/api/admin/providers?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      } else {
        setProviders([]);
      }
    } catch {
      setProviders([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  React.useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const handleVerify = async (status: 'APPROVED' | 'REJECTED' | 'SUSPENDED') => {
    if (!selectedProvider || actionLoading) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/admin/providers/${selectedProvider.id}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, rejectionReason }),
      });

      if (res.ok) {
        setSelectedProvider(null);
        setRejectionReason('');
        await fetchProviders();
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
          <h1 className="text-xl font-black text-slate-900 tracking-tight">প্রোভাইডার কেওয়াইসি ভেরিফিকেশন সেন্টার</h1>
          <p className="text-xs text-slate-500">সেবাদাতাদের পেশাদার পরিচয় ও নথিপত্র পর্যালোচনা করে অনুমোদন দিন</p>
        </div>

        <Button onClick={fetchProviders} variant="outline" size="sm" disabled={loading} className="text-xs font-bold gap-1.5 self-start sm:self-auto">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        {['PENDING', 'APPROVED', 'REJECTED', 'ALL'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`pb-3 transition border-b-2 ${
              filter === st ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {st === 'PENDING' ? 'পেন্ডিং আবেদন' : st === 'APPROVED' ? 'অনুমোদিত' : st === 'REJECTED' ? 'বাতিলকৃত' : 'সব'}
          </button>
        ))}
      </div>

      {/* Provider Queue Table */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">আবেদন তালিকা লোড হচ্ছে...</div>
        ) : providers.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <CheckCircle2 className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">কোনো আবেদন অপেক্ষমান নেই</p>
            <p className="text-xs text-slate-400">নতুন সেবাদাতা আবেদন জমা দিলে এখানে দেখা যাবে</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="p-4">প্রোভাইডার</th>
                  <th className="p-4">অভিজ্ঞতা</th>
                  <th className="p-4">সার্ভিস ক্যাটাগরি</th>
                  <th className="p-4">স্টেটাস</th>
                  <th className="p-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{p.fullName}</div>
                      <div className="text-[11px] text-slate-500">{p.userEmail}</div>
                    </td>
                    <td className="p-4 text-slate-700 font-bold">{p.experienceYears || 0} বছর</td>
                    <td className="p-4">
                      <div className="flex gap-1 flex-wrap">
                        {p.serviceCategories.map((c) => (
                          <Badge key={c} variant="secondary" size="sm">
                            {c}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={p.verificationStatus === 'APPROVED' ? 'success' : p.verificationStatus === 'REJECTED' ? 'error' : 'warning'}>
                        {p.verificationStatus}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        onClick={() => setSelectedProvider(p)}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                      >
                        রিভিউ করুন
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Drawer Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-white p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">প্রোভাইডার কেওয়াইসি রিভিউ</h3>
              <Badge variant="warning">{selectedProvider.verificationStatus}</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-900">{selectedProvider.fullName}</p>
                <p className="text-slate-500">{selectedProvider.userEmail} • {selectedProvider.phone || 'ফোন সংযুক্ত নেই'}</p>
                <p className="text-slate-700 italic pt-1">{selectedProvider.bio || 'কোনো বায়ো দেওয়া হয়নি'}</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">প্রত্যাখ্যানের কারণ (প্রযোজ্য ক্ষেত্রে)</label>
                <Input
                  placeholder="যদি অনুমোদন না দিতে চান তবে স্পষ্ট কারণ দিন..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <Button onClick={() => setSelectedProvider(null)} variant="outline" size="sm" className="text-xs font-bold">
                বন্ধ করুন
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleVerify('REJECTED')}
                  disabled={actionLoading}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold text-rose-600 border-rose-200 hover:bg-rose-50"
                >
                  বাতিল করুন
                </Button>
                <Button
                  onClick={() => handleVerify('APPROVED')}
                  disabled={actionLoading}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  {actionLoading ? 'প্রসেসিং...' : 'অনুমোদন দিন (Approve)'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
