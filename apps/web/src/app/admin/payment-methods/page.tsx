'use client';

import * as React from 'react';
import {
  CreditCard,
  Plus,
  Save,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Edit2,
  Trash2,
  ShieldCheck,
  RefreshCw,
  Wallet,
  Smartphone,
  Copy,
  Check,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';
import { ManualPaymentChannel } from '@kajlagbe/types';

export default function AdminPaymentMethodsPage() {
  const [channels, setChannels] = React.useState<ManualPaymentChannel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [editingChannel, setEditingChannel] = React.useState<ManualPaymentChannel | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const fetchChannels = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/payment-methods');
      if (res.ok) {
        const data = await res.json();
        setChannels(data);
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const handleToggleActive = (id: string) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive, updatedAt: new Date().toISOString() } : c))
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/admin/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channels }),
      });

      if (res.ok) {
        setSuccessMsg('পেমেন্ট মেথড সেটিংস সফলভাবে আপডেট হয়েছে!');
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch {
      // Error
    } finally {
      setSaving(false);
    }
  };

  const handleAddNewChannel = () => {
    const newChan: ManualPaymentChannel = {
      id: `custom-${Date.now()}`,
      type: 'CRYPTO',
      name: 'নতুন পেমেন্ট চ্যানেল (যেমন: USDT BEP20)',
      accountNumber: '0x1234567890abcdef1234567890abcdef12345678',
      accountType: 'Wallet Address',
      networkName: 'BEP20',
      instructions: 'পেমেন্ট সম্পন্ন করে TrxID বা TxHash জমা দিন।',
      feePercentage: 0,
      isActive: true,
      updatedAt: new Date().toISOString(),
    };
    setChannels((prev) => [...prev, newChan]);
    setEditingChannel(newChan);
  };

  const handleUpdateEditing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChannel) return;

    setChannels((prev) =>
      prev.map((c) => (c.id === editingChannel.id ? editingChannel : c))
    );
    setEditingChannel(null);
  };

  const handleDeleteChannel = (id: string) => {
    setChannels((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                ম্যানুয়াল পেমেন্ট কন্ট্রোল প্যানেল
              </Badge>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-black tracking-tight">
              পার্সোনাল নম্বর ও ক্রিপ্টো ওয়ালেট সেটিংস
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              বিকাশ, নগদ, রকেট এবং ক্রিপ্টো ওয়ালেট অ্যাড্রেস পরিবর্তন করুন, অন/অফ টগল করুন ও ইন্সট্রাকশন কাস্টমাইজ করুন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddNewChannel}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700 text-xs sm:text-sm"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              নতুন চ্যানেল যোগ করুন
            </Button>
            <Button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm shadow-lg shadow-emerald-900/30 font-bold"
            >
              {saving ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-1.5" />
              ) : (
                <Save className="h-4 w-4 mr-1.5" />
              )}
              সেটিংস সেভ করুন
            </Button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-800 font-semibold shadow-xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Payment Channels Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((chan) => (
            <Card
              key={chan.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                chan.isActive
                  ? 'border-slate-200 bg-white shadow-md hover:shadow-lg'
                  : 'border-slate-200/60 bg-slate-50/70 opacity-75'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-11 w-11 rounded-2xl flex items-center justify-center font-black text-sm text-white ${
                        chan.type === 'BKASH'
                          ? 'bg-pink-600'
                          : chan.type === 'NAGAD'
                          ? 'bg-orange-600'
                          : chan.type === 'ROCKET'
                          ? 'bg-purple-600'
                          : 'bg-emerald-600'
                      }`}
                    >
                      {chan.type === 'CRYPTO' ? <Wallet className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{chan.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">
                          {chan.type}
                        </Badge>
                        {chan.networkName && (
                          <span className="text-[11px] text-slate-500 font-medium">
                            {chan.networkName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(chan.id)}
                    className="text-slate-400 hover:text-emerald-600 transition"
                    title={chan.isActive ? 'পেমেন্ট চ্যানেল সক্রিয় (Click to Disable)' : 'পেমেন্ট চ্যানেল নিষ্ক্রিয় (Click to Enable)'}
                  >
                    {chan.isActive ? (
                      <ToggleRight className="h-8 w-8 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="h-8 w-8 text-slate-300" />
                    )}
                  </button>
                </div>

                {/* Account Number / Wallet Address */}
                <div className="rounded-2xl bg-slate-900 p-3.5 text-white space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{chan.accountType || 'অ্যাকাউন্ট / ওয়ালেট নম্বর'}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(chan.id, chan.accountNumber)}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                    >
                      {copiedId === chan.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === chan.id ? 'কপি হয়েছে' : 'কপি'}</span>
                    </button>
                  </div>
                  <p className="font-mono font-bold text-xs sm:text-sm truncate tracking-wide text-emerald-300">
                    {chan.accountNumber}
                  </p>
                </div>

                {/* Instructions */}
                <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100 leading-relaxed">
                  <p className="font-semibold text-slate-800 mb-1">নির্দেশনা:</p>
                  <p>{chan.instructions}</p>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className={`font-semibold ${chan.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {chan.isActive ? '● সক্রিয় (ON)' : '○ নিষ্ক্রিয় (OFF)'}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingChannel(chan)}
                      className="h-8 px-3 text-xs border-slate-200"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" />
                      এডিট
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteChannel(chan.id)}
                      className="h-8 px-2 text-xs text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base">
                পেমেন্ট চ্যানেল এডিট করুন
              </h3>
              <button
                type="button"
                onClick={() => setEditingChannel(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateEditing} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">মেথডের নাম</label>
                <Input
                  value={editingChannel.name}
                  onChange={(e) => setEditingChannel({ ...editingChannel, name: e.target.value })}
                  placeholder="যেমন: bKash Personal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">টাইপ</label>
                  <select
                    value={editingChannel.type}
                    onChange={(e) => setEditingChannel({ ...editingChannel, type: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm font-semibold"
                  >
                    <option value="BKASH">bKash</option>
                    <option value="NAGAD">Nagad</option>
                    <option value="ROCKET">Rocket</option>
                    <option value="CRYPTO">Crypto Wallet</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">নেটওয়ার্ক / ক্যাটাগরি</label>
                  <Input
                    value={editingChannel.networkName || ''}
                    onChange={(e) => setEditingChannel({ ...editingChannel, networkName: e.target.value })}
                    placeholder="যেমন: TRC20, BEP20, bKash App"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  পার্সোনাল নম্বর / ক্রিপ্টো ওয়ালেট অ্যাড্রেস
                </label>
                <Input
                  value={editingChannel.accountNumber}
                  onChange={(e) => setEditingChannel({ ...editingChannel, accountNumber: e.target.value })}
                  placeholder="যেমন: 01712345678 বা 0x..."
                  className="font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ব্যবহারকারীর জন্য নির্দেশাবলী (Bangla Instructions)</label>
                <textarea
                  value={editingChannel.instructions}
                  onChange={(e) => setEditingChannel({ ...editingChannel, instructions: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 p-3 text-xs leading-relaxed font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  rows={3}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setEditingChannel(null)}>
                  বাতিল
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                  আপডেট করুন
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

