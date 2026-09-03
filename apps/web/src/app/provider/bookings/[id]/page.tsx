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
  Play,
  PlusCircle,
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

export default function ProviderBookingDetailsPage() {
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
  const [showProgressModal, setShowProgressModal] = React.useState(false);
  const [progressTitle, setProgressTitle] = React.useState('');
  const [progressNote, setProgressNote] = React.useState('');

  const [showRescheduleModal, setShowRescheduleModal] = React.useState(false);
  const [proposedDate, setProposedDate] = React.useState('');
  const [proposedTime, setProposedTime] = React.useState('');
  const [rescheduleReason, setRescheduleReason] = React.useState('');

  const fetchBooking = React.useCallback(async () => {
    if (!bookingId || !user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          job:jobs(*),
          customer:users!bookings_customerId_fkey(
            id, email, phone,
            profile:user_profiles(*)
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
        setErrorMsg('বুকিং তথ্য পাওয়া যায়নি।');
      } else {
        setBooking(data);
      }
    } catch {
      setErrorMsg('বুকিং তথ্য লোড করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  }, [bookingId, user, supabase]);

  React.useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const handleConfirmAvailability = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: 'প্রোভাইডার প্রাপ্যতা ও সময়সূচী নিশ্চিত করেছেন।' }),
      });
      fetchBooking();
    } catch {
      alert('বুকিং কনফার্ম করতে সমস্যা হয়েছে।');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStartWork = async () => {
    if (!booking?.workOrder?.id) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/work-orders/${booking.workOrder.id}/start`, {
        method: 'POST',
      });
      fetchBooking();
    } catch {
      alert('কাজ শুরু করতে সমস্যা হয়েছে।');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking?.workOrder?.id || !progressTitle) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/work-orders/${booking.workOrder.id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: booking.workOrder.status,
          title: progressTitle,
          note: progressNote,
        }),
      });
      setShowProgressModal(false);
      setProgressTitle('');
      setProgressNote('');
      fetchBooking();
    } catch {
      alert('অগ্রগতি পোস্ট করতে সমস্যা হয়েছে।');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    if (!booking?.workOrder?.id) return;
    if (!confirm('আপনি কি কাজ সম্পন্ন ঘোষণা করতে চান?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/work-orders/${booking.workOrder.id}/complete`, {
        method: 'POST',
      });
      fetchBooking();
    } catch {
      alert('কাজ সম্পন্ন ঘোষণা করতে সমস্যা হয়েছে।');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedDate || !proposedTime || !rescheduleReason) return;
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
      alert('সময়সূচী প্রস্তাব করতে সমস্যা হয়েছে।');
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
          <h3 className="text-lg font-bold text-slate-800">{errorMsg || 'বুকিং তথ্য পাওয়া যায়নি।'}</h3>
          <Link href="/provider/bookings" className="mt-4 inline-block">
            <Button variant="outline">সকল বুকিংয়ে ফিরুন</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const customerName =
    booking.customer?.profile?.firstName && booking.customer?.profile?.lastName
      ? `${booking.customer.profile.firstName} ${booking.customer.profile.lastName}`
      : booking.customer?.profile?.firstName || 'গ্রাহক';

  const isPendingConfirm = booking.status === BookingStatus.PENDING_CONFIRMATION;
  const isConfirmed = booking.status === BookingStatus.CONFIRMED;
  const isInProgress = booking.status === BookingStatus.IN_PROGRESS;
  const woStatus = booking.workOrder?.status;

  return (
    <DashboardLayout
      title={`বুকিং প্যানেল #${booking.bookingReference}`}
      subtitle="সময়সূচী ও সার্ভিস অর্ডারের কার্যপদ্ধতি ব্যবস্থাপনা করুন"
    >
      <div className="space-y-6 max-w-5xl">
        <Link href="/provider/bookings" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600">
          <ChevronLeft className="h-4 w-4" />
          <span>সকল বুকিং তালিকায় ফিরুন</span>
        </Link>

        {/* Top Control Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-800 p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-300">
                #{booking.bookingReference}
              </span>
              <Badge variant="warning" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                {booking.status}
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{booking.job?.title}</h1>
            <p className="text-xs text-slate-300">
              গ্রাহক: <span className="font-semibold text-white">{customerName}</span>
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1 bg-white/10 p-4 rounded-2xl backdrop-blur-xs border border-white/10 w-full sm:w-auto">
            <span className="text-[11px] text-slate-300 block">কাজের মূল্য</span>
            <span className="text-2xl font-black text-emerald-300">
              ৳{Number(booking.agreedPrice).toLocaleString('bn-BD')}
            </span>
          </div>
        </div>

        {/* Main Action Banner based on Booking State */}
        {isPendingConfirm && (
          <div className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-amber-950">
                  গ্রাহক আপনাকে এই কাজের জন্য নির্বাচন করেছেন!
                </h3>
                <p className="text-xs text-amber-800 mt-1">
                  অনুগ্রহ করে সময়সূচী পরীক্ষা করে প্রোভাইডার হিসেবে আপনার প্রাপ্যতা নিশ্চিত করুন।
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 w-full sm:w-auto"
              onClick={handleConfirmAvailability}
              disabled={actionLoading}
            >
              <Check className="h-4 w-4" />
              <span>বুকিং ও প্রাপ্যতা কনফার্ম করুন</span>
            </Button>
          </div>
        )}

        {isConfirmed && woStatus !== WorkOrderStatus.STARTED && (
          <div className="rounded-3xl border-2 border-emerald-500 bg-emerald-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-emerald-950">
                বুকিং নিশ্চিত হয়েছে! স্থান ভিজিট করার সময় কাজ শুরু করুন।
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                কাজ শুরু করলে গ্রাহক লাইভ ট্র্যাকিং আপডেট দেখতে পাবেন।
              </p>
            </div>

            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 w-full sm:w-auto shrink-0"
              onClick={handleStartWork}
              disabled={actionLoading}
            >
              <Play className="h-4 w-4 fill-white" />
              <span>কাজ শুরু করুন (Start Work)</span>
            </Button>
          </div>
        )}

        {isInProgress && woStatus !== WorkOrderStatus.COMPLETED_BY_PROVIDER && (
          <div className="rounded-3xl border-2 border-sky-500 bg-sky-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-sky-950">সার্ভিস প্রদান চলমান রয়েছে</h3>
              <p className="text-xs text-sky-800 mt-0.5">
                কাজের আপডেট পোস্ট করুন অথবা কাজ সম্পূর্ণ হলে শেষ ঘোষণা করুন।
              </p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                size="md"
                variant="outline"
                className="gap-1.5 text-xs bg-white"
                onClick={() => setShowProgressModal(true)}
              >
                <PlusCircle className="h-4 w-4 text-sky-600" />
                <span>অগ্রগতি আপডেট দিন</span>
              </Button>

              <Button
                size="md"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs"
                onClick={handleMarkCompleted}
                disabled={actionLoading}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>কাজ শেষ ঘোষণা করুন</span>
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule & Location */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                সময়সূচী বিবরণ
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
                    <span className="text-slate-400 block">সময়সূচী</span>
                    <span className="font-bold text-slate-800">
                      {booking.scheduledTime || 'সময় পেন্ডিং'}
                    </span>
                  </div>
                </div>
              </div>

              {!isPendingConfirm && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 text-xs"
                  onClick={() => setShowRescheduleModal(true)}
                >
                  <RefreshCw className="h-3.5 w-3.5 text-sky-600" />
                  <span>নতুন সময়সূচীর প্রস্তাব দিন</span>
                </Button>
              )}
            </div>

            {/* Work Order Progress Updates */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-slate-900">অগ্রগতি হিস্ট্রি</h2>
              </div>

              {booking.workOrder?.progressUpdates && booking.workOrder.progressUpdates.length > 0 ? (
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                  {booking.workOrder.progressUpdates.map((update: any, idx: number) => (
                    <div key={update.id || idx} className="space-y-1">
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
                  এখনো কোনো কাজের আপডেট পোস্ট করা হয়নি।
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Customer Info & Unlocked Location Card */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                গ্রাহক প্রোফাইল
              </h2>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-lg">
                  {customerName[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{customerName}</h4>
                  <span className="text-xs text-slate-500">সম্মানিত গ্রাহক</span>
                </div>
              </div>

              {booking.customer?.phone && (
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{booking.customer.phone}</span>
                </div>
              )}
            </div>

            {/* Unlocked / Hidden Address Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">কাজের স্থান ও সুনির্দিষ্ট ঠিকানা</h3>
              </div>

              {booking.locationAccessState === LocationAccessState.LOCATION_HIDDEN ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Lock className="h-4 w-4 text-amber-600" />
                    <span>সুনির্দিষ্ট ঠিকানা গোপন রয়েছে</span>
                  </div>
                  <p>বুকিং কনফার্ম করলে ফুল ঠিকানা এখানে আনলক হবে।</p>
                  <span className="text-[11px] text-slate-500 block">এরিয়া: {booking.generalArea}</span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <Eye className="h-4 w-4" />
                    <span>ঠিকানা আনলক হয়েছে</span>
                  </div>
                  <p className="font-bold text-slate-900">{booking.privateAddress || booking.generalArea}</p>
                  <span className="text-[11px] text-slate-500 block">এরিয়া: {booking.generalArea}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Modal */}
        {showProgressModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900">কাজের অগ্রগতি আপডেট</h3>
              <form onSubmit={handleAddProgress} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">আপডেটের শিরোনাম</label>
                  <Input
                    type="text"
                    placeholder="যেমন: কাজ শুরু, ওয়্যারিং সম্পন্ন, বা মালামাল কেনা..."
                    value={progressTitle}
                    onChange={(e) => setProgressTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">বিস্তারিত নোট (ঐচ্ছিক)</label>
                  <Input
                    type="text"
                    placeholder="গ্রাহকের জন্য বার্তা লিখুন..."
                    value={progressNote}
                    onChange={(e) => setProgressNote(e.target.value)}
                  />
                </div>
                <div className="pt-3 flex gap-2 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setShowProgressModal(false)}>
                    বাতিল
                  </Button>
                  <Button type="submit" className="bg-emerald-600 text-white font-bold" disabled={actionLoading}>
                    পোস্ট করুন
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900">নতুন সময়সূচীর প্রস্তাব</h3>
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
                  <label className="font-bold text-slate-700 block mb-1">প্রস্তাবিত সময়</label>
                  <Input
                    type="time"
                    value={proposedTime}
                    onChange={(e) => setProposedTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">কারণ</label>
                  <Input
                    type="text"
                    placeholder="যেমন: পূর্বের কাজের সময় বৃদ্ধির কারণে..."
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
                    প্রস্তাব জমা দিন
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

