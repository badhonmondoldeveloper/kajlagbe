'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Calendar,
} from 'lucide-react';
import { Button, Badge, Input } from '@kajlagbe/ui';
import { useLocation } from '../../context/location-context';

export interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
  categoryTitle?: string;
  providerName?: string;
  providerPhone?: string;
  estimatedPrice?: string;
}

export function QuickBookingModal({
  isOpen,
  onClose,
  serviceTitle = 'এসি সার্ভিসিং ও মেরামত',
  categoryTitle: _categoryTitle = 'এসি ও ইলেকট্রিক সেবা',
  providerName,
  providerPhone: _providerPhone = '০১৭০০-০০০০০০',
  estimatedPrice = '৳ ১,২০০ - ৳ ২,৫০০',
}: QuickBookingModalProps) {
  const { location, detectLiveLocation } = useLocation();

  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [schedule, setSchedule] = React.useState<'urgent' | 'today' | 'tomorrow'>('urgent');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('01712345678');
  const [notes, setNotes] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState<'cod' | 'bkash' | 'nagad' | 'escrow'>('cod');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [bookingReference, setBookingReference] = React.useState<string | null>(null);

  // Auto-fill address from context
  React.useEffect(() => {
    if (location?.area || location?.district) {
      setAddress([location.area, location.district, location.division].filter(Boolean).join(', '));
    }
  }, [location]);

  if (!isOpen) return null;

  const handleDetectLocation = async () => {
    await detectLiveLocation();
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const ref = `KB-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingReference(ref);
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-bold shrink-0">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="verified" size="sm">
                ১-ট্যাপ কুইক বুকিং
              </Badge>
              {providerName && (
                <span className="text-xs font-semibold text-slate-500">
                  • {providerName}
                </span>
              )}
            </div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              {serviceTitle}
            </h3>
          </div>
        </div>

        {/* STEP 1: Details & Schedule & Location */}
        {step === 1 && (
          <div className="space-y-5 pt-4">
            {/* Price Preview */}
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4">
              <div>
                <span className="text-xs text-slate-500 block">আনুমানিক বাজেট / রেট</span>
                <span className="text-base font-bold text-emerald-800">{estimatedPrice}</span>
              </div>
              <Badge variant="default" size="sm">
                ৭ দিনের রি-ওয়ার্ক গ্যারান্টি
              </Badge>
            </div>

            {/* Schedule Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                সার্ভিসের সময় নির্বাচন করুন
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSchedule('urgent')}
                  className={`flex flex-col items-center justify-center rounded-xl p-3 border text-center transition ${
                    schedule === 'urgent'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Zap className="h-5 w-5 text-amber-500 mb-1" />
                  <span className="text-xs font-bold">এখনই (জরুরী)</span>
                  <span className="text-[10px] opacity-75">১৫-৩০ মি.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSchedule('today')}
                  className={`flex flex-col items-center justify-center rounded-xl p-3 border text-center transition ${
                    schedule === 'today'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Clock className="h-5 w-5 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold">আজ বিকেলে</span>
                  <span className="text-[10px] opacity-75">৪টা - ৭টা</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSchedule('tomorrow')}
                  className={`flex flex-col items-center justify-center rounded-xl p-3 border text-center transition ${
                    schedule === 'tomorrow'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Calendar className="h-5 w-5 text-blue-600 mb-1" />
                  <span className="text-xs font-bold">আগামীকাল</span>
                  <span className="text-[10px] opacity-75">সুবিধাজনক সময়ে</span>
                </button>
              </div>
            </div>

            {/* Address & GPS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  সার্ভিসের স্থান (ঠিকানা)
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3 text-emerald-600" />
                  <span>GPS লোকেশন ব্যবহার করুন</span>
                </button>
              </div>
              <Input
                placeholder="বাসা নং, রোড নং, এলাকা (যেমন: বাসা ১২, রোড ৪, মিরপুর ১০)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Phone number */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                মোবাইল নম্বর
              </label>
              <Input
                placeholder="017xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Additional notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                কাজের অতিরিক্ত বিবরণ (ঐচ্ছিক)
              </label>
              <Input
                placeholder="যেমন: ২ কয়েল এসি ইনডোর ওয়্যাশিং দরকার..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Next Step Button */}
            <Button
              className="w-full mt-2"
              size="lg"
              disabled={!address.trim() || !phone.trim()}
              onClick={() => setStep(2)}
            >
              পেমেন্ট ও অর্ডার কনফার্ম করুন →
            </Button>
          </div>
        )}

        {/* STEP 2: Payment Method */}
        {step === 2 && (
          <div className="space-y-5 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                পেমেন্ট পদ্ধতি নির্বাচন করুন
              </label>
              <div className="space-y-2.5">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💵</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">ক্যাশ অন ডেলিভারি (কাজ শেষে টাকা)</h4>
                      <p className="text-xs text-slate-500">কাজ পুরোপুরি সম্পন্ন হওয়ার পর টেকনিশিয়ানকে ক্যাশ দিন</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'cod'} readOnly className="accent-emerald-600 h-4 w-4" />
                </label>

                {/* bKash / Nagad */}
                <label
                  onClick={() => setPaymentMethod('bkash')}
                  className={`flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition ${
                    paymentMethod === 'bkash'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📱</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">বিকাশ / নগদ / রকেট পেমেন্ট</h4>
                      <p className="text-xs text-slate-500">মোবাইল ব্যাংকিং অ্যাডভান্স বা সিকিউর পেমেন্ট</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'bkash'} readOnly className="accent-emerald-600 h-4 w-4" />
                </label>

                {/* Escrow Wallet */}
                <label
                  onClick={() => setPaymentMethod('escrow')}
                  className={`flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition ${
                    paymentMethod === 'escrow'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">কাজলগবে সেফ এসক্রো ওয়ালেট</h4>
                      <p className="text-xs text-slate-500">টাকা সেফ ডিপোজিটে থাকবে, সন্তুষ্ট হলেই রিলিজ হবে</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'escrow'} readOnly className="accent-emerald-600 h-4 w-4" />
                </label>
              </div>
            </div>

            {/* Back & Confirm buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                className="w-1/3"
                onClick={() => setStep(1)}
              >
                ← পেছনে
              </Button>
              <Button
                className="w-2/3"
                size="lg"
                disabled={isSubmitting}
                onClick={handleConfirmOrder}
              >
                {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : '⚡ সার্ভিস অর্ডার নিশ্চিত করুন'}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-5 pt-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                রেফারেন্স আইডি: {bookingReference}
              </span>
              <h3 className="text-xl font-black text-slate-900 pt-2">
                আপনার সার্ভিস বুকিং নিশ্চিত হয়েছে!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                আমাদের টেকনিশিয়ান আগামী ১৫-৩০ মিনিটের মধ্যে আপনার সাথে যোগাযোগ করবেন।
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">সার্ভিস:</span>
                <span className="font-bold text-slate-900">{serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ঠিকানা:</span>
                <span className="font-bold text-slate-900">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">পেমেন্ট:</span>
                <span className="font-bold text-emerald-700">
                  {paymentMethod === 'cod'
                    ? 'ক্যাশ অন ডেলিভারি'
                    : paymentMethod === 'bkash'
                    ? 'বিকাশ / মোবাইল ব্যাংকিং'
                    : 'এসক্রো ওয়ালেট'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link href="/customer/bookings" className="w-full sm:w-1/2">
                <Button className="w-full" size="md" onClick={onClose}>
                  বুকিং ট্র্যাকিং দেখুন
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-1/2"
                onClick={onClose}
              >
                ঠিক আছে (বন্ধ করুন)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
