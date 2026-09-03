'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  User,
  Phone,
  Mail,
  FileText,
  RefreshCw,
  XCircle,
  ChevronLeft,
  Lock,
  Eye,
  Check,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { useAuth } from '../../../../context/auth-context';
import { createClient } from '../../../../lib/supabase/client';
import {
  BookingStatus,
  WorkOrderStatus,
  CancellationReason,
  LocationAccessState,
} from '@kajlagbe/types';

export default function CustomerBookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [booking, setBooking] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);

  // Modal States
  const [showRescheduleModal, setShowRescheduleModal] = React.useState(false);
  const [proposedDate, setProposedDate] = React.useState('');
  const [proposedTime, setProposedTime] = React.useState('');
  const [rescheduleReason, setRescheduleReason] = React.useState('');

  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [cancelCategory, setCancelCategory] = React.useState<CancellationReason>(
    CancellationReason.CUSTOMER_CHANGED_MIND,
  );
  const [cancelNote, setCancelNote] = React.useState('');

  const fetchBooking = React.useCallback(async () => {
    if (!bookingId || !user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          job:jobs(*),
          provider:users!bookings_providerId_fkey(
            id, email, phone,
            profile:user_profiles(*),
            providerProfile:provider_profiles(*)
          ),
          workOrder:work_orders(
            *,
            progressUpdates:service_progress_updates(*),
            statusHistories:work_order_status_histories(*)
          ),
          rescheduleRequests:booking_reschedule_requests(*),
          cancellation:booking_cancellations(*),
          statusHistories:booking_status_histories(*)
        `)
        .eq('id', bookingId)
        .single();

      if (error || !data) {
        setErrorMsg('বুকিং তথ্য সংগ্রহ করা সম্ভব হয়নি।');
      } else {
        setBooking(data);
      }
    } catch {
      setErrorMsg('বুকিং তথ্য সংগ্রহে ত্রুটি হয়েছে।');
    } finally {
      setLoading(false);
    }
  }, [bookingId, user, supabase]);

  React.useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedDate || !proposedTime || !rescheduleReason) {
      alert('অনুগ্রহ করে তারিখ, সময় এবং কারণ প্রদান করুন।');
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/reschedule/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposedDate, proposedTime, reason: rescheduleReason }),
      });
      setShowRescheduleModal(false);
      fetchBooking();
    } catch {
      alert('সময়সূচী পরিবর্তনের অনুরোধ পাঠাতে ত্রুটি হয়েছে।');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reasonCategory: cancelCategory, note: cancelNote }),
      });
      setShowCancelModal(false);
      fetchBooking();
    } catch {
      alert('বুকিং বাতিল করতে সমস্যা হয়েছে।');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmCompletion = async () => {
    if (!booking?.workOrder?.id) return;
    if (!confirm('আপনি কি নিশ্চিত যে কাজ সফলভাবে সম্পন্ন হয়েছে?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/work-orders/${booking.workOrder.id}/confirm-completion`, {
        method: 'POST',
      });
      fetchBooking();
    } catch {
      alert('সম্পন্নকরণ কনফার্ম করতে ত্রুটি হয়েছে।');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="বুকিং লোড হচ্ছে...">
        <div className="h-64 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
      </DashboardLayout>
    );
  }

  if (errorMsg || !booking) {
    return (
      <DashboardLayout title="বুকিং পাওয়া যায়নি">
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">{errorMsg || 'বুকিং রেকর্ড পাওয়া যায়নি।'}</h3>
          <Link href="/customer/bookings" className="mt-4 inline-block">
            <Button variant="outline">সকল বুকিংয়ে ফিরুন</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const providerName =
    booking.provider?.profile?.firstName && booking.provider?.profile?.lastName
      ? `${booking.provider.profile.firstName} ${booking.provider.profile.lastName}`
      : booking.provider?.profile?.firstName || 'প্রোভাইডার';

  const isCompleted = booking.status === BookingStatus.COMPLETED;
  const isCancelled = booking.status === BookingStatus.CANCELLED;
  const canConfirmCompletion =
    booking.workOrder?.status === WorkOrderStatus.COMPLETED_BY_PROVIDER;

  return (
    <DashboardLayout
      title={`বুকিং #${booking.bookingReference}`}
      subtitle="সার্ভিস ট্র্যাকিং, শিডিউল ও সার্ভিস সম্পন্নকরণ অনুমোদন"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Back Link */}
        <Link href="/customer/bookings" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600">
          <ChevronLeft className="h-4 w-4" />
          <span>সকল বুকিং তালিকায় ফিরুন</span>
        </Link>

        {/* Main Status Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-300">
                #{booking.bookingReference}
              </span>
              <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                {booking.status}
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{booking.job?.title}</h1>
            <p className="text-xs text-slate-300">
              এরিয়া: <span className="font-semibold text-white">{booking.generalArea}</span>
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1 bg-white/10 p-4 rounded-2xl backdrop-blur-xs border border-white/10 w-full sm:w-auto">
            <span className="text-[11px] text-slate-300 block">চুক্তিভিত্তিক মূল্য</span>
            <span className="text-2xl font-black text-emerald-300">
              ৳{Number(booking.agreedPrice).toLocaleString('bn-BD')}
            </span>
          </div>
        </div>

        {/* Completion Confirmation Alert */}
        {canConfirmCompletion && (
          <div className="rounded-3xl border-2 border-emerald-500 bg-emerald-50 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-emerald-950">
                  টেকনিশিয়ান কাজ সম্পন্ন ঘোষণা করেছেন!
                </h3>
                <p className="text-xs text-emerald-800 mt-1">
                  অনুগ্রহ করে সার্ভিসটি পরীক্ষা করুন। সবকিছু ঠিক থাকলে সম্পন্নকরণ নিশ্চিত করুন।
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto font-bold gap-2"
              onClick={handleConfirmCompletion}
              disabled={actionLoading}
            >
              <Check className="h-4 w-4" />
              <span>কাজ সম্পন্নকরণ কনফার্ম করুন</span>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Details & Progress Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service & Schedule Overview */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                সার্ভিস শিডিউল বিবরণ
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Calendar className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">নির্ধারিত তারিখ</span>
                    <span className="font-bold text-slate-800">
                      {booking.scheduledDate || 'তারিখ নির্ধারিত হয়নি'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="h-5 w-5 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">নির্ধারিত সময়সূচী</span>
                    <span className="font-bold text-slate-800">
                      {booking.scheduledTime || 'সময় নির্ধারণ পেন্ডিং'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Reschedule / Cancel */}
              {!isCompleted && !isCancelled && (
                <div className="pt-2 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs"
                    onClick={() => setShowRescheduleModal(true)}
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-sky-600" />
                    <span>সময়সূচী পরিবর্তনের অনুরোধ</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                    onClick={() => setShowCancelModal(true)}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>বুকিং বাতিল করুন</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Service Execution Work Order Progress Timeline */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-slate-900">কাজের অগ্রগতি ট্র্যাকিং</h2>
                {booking.workOrder && (
                  <span className="text-xs font-mono font-bold text-slate-500">
                    WO: #{booking.workOrder.workOrderReference}
                  </span>
                )}
              </div>

              {booking.workOrder?.progressUpdates && booking.workOrder.progressUpdates.length > 0 ? (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                  {booking.workOrder.progressUpdates.map((update: any, idx: number) => (
                    <div key={update.id || idx} className="relative space-y-1">
                      <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-100" />
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{update.title}</h4>
                        <span className="text-[11px] text-slate-400">
                          {new Date(update.createdAt).toLocaleTimeString('bn-BD', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      {update.note && <p className="text-xs text-slate-600">{update.note}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 py-4 text-center">
                  কাজ শুরু হলে টেকনিশিয়ান কর্তৃক অগ্রগতি তথ্য আপডেট করা হবে।
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Provider & Location Info */}
          <div className="space-y-6">
            {/* Assigned Provider Summary */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                নিযুক্ত টেকনিশিয়ান
              </h2>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-lg">
                  {providerName[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{providerName}</h4>
                  <span className="text-xs text-slate-500">
                    {booking.provider?.providerProfile?.primaryCategory || 'অভিজ্ঞ টেকনিশিয়ান'}
                  </span>
                </div>
              </div>

              {booking.provider?.phone && (
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{booking.provider.phone}</span>
                </div>
              )}
            </div>

            {/* Controlled Privacy Location Box */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">গোপনীয়তা সংরক্ষিত ঠিকানা</h3>
              </div>
              <p className="text-xs text-slate-600">
                বুকিং কনফার্ম হওয়ার আগে আপনার সুনির্দিষ্ট ঠিকানা প্রোভাইডারের কাছে গোপন রাখা হয়।
              </p>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-slate-400 block">এলাকা:</span>
                <span className="font-bold text-slate-800">{booking.generalArea}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900">সময়সূচী পরিবর্তনের অনুরোধ</h3>
              <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">প্রস্তাবিত তারিখ</label>
                  <Input
                    type="date"
                    value={proposedDate}
                    onChange={(e) => setProposedDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">প্রস্তাবিত সময়</label>
                  <Input
                    type="time"
                    value={proposedTime}
                    onChange={(e) => setProposedTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">পরিবর্তনের কারণ</label>
                  <Input
                    type="text"
                    placeholder="যেমন: জরুরি কাজ উপস্থিত থাকায়..."
                    value={rescheduleReason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    required
                  />
                </div>
                <div className="pt-3 flex gap-2 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setShowRescheduleModal(false)}>
                    বাতিল
                  </Button>
                  <Button type="submit" className="bg-emerald-600 text-white font-bold" disabled={actionLoading}>
                    প্রস্তাব পাঠান
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cancellation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900">বুকিং বাতিলকরণ</h3>
              <form onSubmit={handleCancelSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">বাতিলের প্রাথমিক কারণ</label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 p-2.5 bg-slate-50 font-bold"
                    value={cancelCategory}
                    onChange={(e) => setCancelCategory(e.target.value as CancellationReason)}
                  >
                    <option value={CancellationReason.CUSTOMER_CHANGED_MIND}>সিদ্ধান্ত পরিবর্তন করেছি</option>
                    <option value={CancellationReason.SCHEDULE_CONFLICT}>সময়সূচীর সমস্যা</option>
                    <option value={CancellationReason.SERVICE_NO_LONGER_NEEDED}>সেবাটির প্রয়োজন ফুরিয়েছে</option>
                    <option value={CancellationReason.OTHER}>অন্যান্য কারণ</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">অতিরিক্ত বিবরণ (ঐচ্ছিক)</label>
                  <Input
                    type="text"
                    placeholder="সংক্ষিপ্ত বিবরণ লিখুন..."
                    value={cancelNote}
                    onChange={(e) => setCancelNote(e.target.value)}
                  />
                </div>
                <div className="pt-3 flex gap-2 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setShowCancelModal(false)}>
                    ফিরে যান
                  </Button>
                  <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold" disabled={actionLoading}>
                    বুকিং বাতিল নিশ্চিত করুন
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
