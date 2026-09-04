'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Smartphone,
  Wallet,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Lock,
  Sparkles,
} from 'lucide-react';
import { Button, Input, Card, Badge, Container } from '@kajlagbe/ui';
import { ManualPaymentChannel } from '@kajlagbe/types';
import { useAuth } from '../../context/auth-context';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const rawAmount = searchParams.get('amount') || '1200';
  const rawTitle = searchParams.get('title') || 'কাজ লাগবে সার্ভিস সার্ভিসিং পেমেন্ট';
  const amountBdt = Math.max(10, parseInt(rawAmount, 10) || 1200);
  const amountUsd = (amountBdt / 120).toFixed(2);

  const { user } = useAuth();

  const [channels, setChannels] = React.useState<ManualPaymentChannel[]>([]);
  const [loadingChannels, setLoadingChannels] = React.useState(true);
  const [selectedChannel, setSelectedChannel] = React.useState<ManualPaymentChannel | null>(null);

  // Form inputs
  const [senderAccount, setSenderAccount] = React.useState('');
  const [transactionId, setTransactionId] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [userEmail, setUserEmail] = React.useState(user?.email || '');

  // UI Feedback
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successOrder, setSuccessOrder] = React.useState<any | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  React.useEffect(() => {
    async function loadPaymentMethods() {
      setLoadingChannels(true);
      try {
        const res = await fetch('/api/admin/payment-methods');
        if (res.ok) {
          const data: ManualPaymentChannel[] = await res.json();
          const activeList = data.filter((c) => c.isActive);
          setChannels(activeList);
          if (activeList.length > 0) {
            setSelectedChannel(activeList[0]);
          }
        }
      } catch {
        // Handled
      } finally {
        setLoadingChannels(false);
      }
    }
    loadPaymentMethods();
  }, []);

  const handleCopyNumber = () => {
    if (!selectedChannel) return;
    navigator.clipboard.writeText(selectedChannel.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChannel) return;

    setErrorMsg(null);
    if (!senderAccount.trim() || !transactionId.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার প্রেরক নম্বর/ওয়ালেট এবং TrxID প্রদান করুন।');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountBdt,
          amountUsd,
          channelId: selectedChannel.id,
          channelName: selectedChannel.name,
          senderAccount: senderAccount.trim(),
          transactionId: transactionId.trim(),
          notes: notes.trim(),
          userEmail: userEmail || user?.email || 'user@kajlagbe.com',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessOrder(data.order);
      } else {
        setErrorMsg(data.error || 'পেমেন্ট সাবমিট করতে সমস্যা হয়েছে।');
      }
    } catch {
      setErrorMsg('সার্ভারে যোগাযোগ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  if (successOrder) {
    return (
      <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-4 py-12">
        <Container size="sm">
          <Card className="rounded-3xl border border-emerald-200 bg-white p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-2">
                পেমেন্ট তথ্য সফলভাবে জমা হয়েছে
              </Badge>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                ধন্যবাদ! পেমেন্ট পর্যালোচনায় রয়েছে
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                আপনার রেফারেন্স আইডি <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{successOrder.orderReference}</span> সহ TrxID অ্যাডমিন প্যানেলে পাঠানো হয়েছে। ভেরিফিকেশনের পর পেমেন্ট কনফার্ম হবে।
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-4 text-xs space-y-2 text-left">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">পেমেন্ট মেথড:</span>
                <span className="font-bold text-emerald-300">{successOrder.channelName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Transaction ID (TrxID):</span>
                <span className="font-mono font-bold">{successOrder.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">মোট পরিশোধিত:</span>
                <span className="font-bold text-white">৳{successOrder.amountBdt} (${successOrder.amountUsd} USD)</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/dashboard">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm h-12 rounded-2xl shadow-lg shadow-emerald-900/20">
                  ড্যাশবোর্ডে ফিরে যান
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <Container size="default">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Top Title Banner */}
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                নিরাপদ পার্সোনাল পেমেন্ট চেকআউট
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black">{rawTitle}</h1>
            <p className="mt-1 text-xs text-slate-400">
              বিকাশ, নগদ, রকেট অথবা ক্রিপ্টো ওয়ালেট (USDT TRC20/BEP20) থেকে সরাসরি সেন্ড মানি করুন।
            </p>
          </div>

          {/* Amount Card */}
          <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-semibold">প্রদেয় মোট সার্ভিস চার্জ</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                  ৳{amountBdt.toLocaleString('bn-BD')}
                  <span className="text-xs font-bold text-emerald-600 ml-2">
                    (~${amountUsd} USD)
                  </span>
                </h2>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Lock className="h-6 w-6" />
              </div>
            </div>
          </Card>

          {/* Channel Selector Tabs */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              পেমেন্ট মাধ্যম সিলেক্ট করুন:
            </label>

            {loadingChannels ? (
              <div className="flex justify-center py-6">
                <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {channels.map((chan) => (
                  <button
                    key={chan.id}
                    type="button"
                    onClick={() => setSelectedChannel(chan)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition ${
                      selectedChannel?.id === chan.id
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-xl flex items-center justify-center text-white shrink-0 font-bold text-xs ${
                        chan.type === 'BKASH'
                          ? 'bg-pink-600'
                          : chan.type === 'NAGAD'
                          ? 'bg-orange-600'
                          : chan.type === 'ROCKET'
                          ? 'bg-purple-600'
                          : 'bg-emerald-600'
                      }`}
                    >
                      {chan.type === 'CRYPTO' ? <Wallet className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                    </div>
                    <span className="text-xs truncate font-bold">{chan.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Channel Details Card */}
          {selectedChannel && (
            <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">
                    {selectedChannel.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedChannel.networkName}</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  {selectedChannel.accountType || 'Personal'}
                </Badge>
              </div>

              {/* Number / Wallet Copy Box */}
              <div className="rounded-2xl bg-slate-900 p-4 text-white space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{selectedChannel.accountType || 'অ্যাকাউন্ট / ওয়ালেট নম্বর'}</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">১-ক্লিক কপি</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-sm sm:text-base text-emerald-300 truncate tracking-wider">
                    {selectedChannel.accountNumber}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCopyNumber}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 px-3.5 h-9 rounded-xl shadow-xs"
                  >
                    {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? 'কপি হয়েছে!' : 'কপি করুন'}
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-900 leading-relaxed font-medium space-y-1">
                <p className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  পেমেন্ট সম্পন্ন করার নিয়ম:
                </p>
                <p>{selectedChannel.instructions}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitPayment} className="space-y-4 pt-2">
                {errorMsg && (
                  <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-semibold">
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আপনার ইমেইল ঠিকানা
                  </label>
                  <Input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="আপনার ইমেইল দিন..."
                    className="text-xs sm:text-sm rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আপনার প্রেরক নম্বর / ওয়ালেট অ্যাড্রেস (Sender Number/Address)
                  </label>
                  <Input
                    value={senderAccount}
                    onChange={(e) => setSenderAccount(e.target.value)}
                    placeholder="যেমন: 01711XXXXXX বা 0x..."
                    className="text-xs sm:text-sm font-mono rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Transaction ID (TrxID / TxHash)
                  </label>
                  <Input
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="যেমন: TRX9A8B7C6D বা 0x3f..."
                    className="text-xs sm:text-sm font-mono rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    রেফারেন্স / অতিরিক্ত নোট (ঐচ্ছিক)
                  </label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="যেমন: এসি ডিপ ওয়াশ সার্ভিস"
                    className="text-xs sm:text-sm rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm h-12 rounded-2xl shadow-lg shadow-emerald-900/20 active:scale-[0.99] transition mt-2"
                >
                  {submitting ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 mr-2" />
                  )}
                  {submitting ? 'পেমেন্ট সাবমিট হচ্ছে...' : 'পেমেন্ট সাবমিট করুন (Submit Payment)'}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}
