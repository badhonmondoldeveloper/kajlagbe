'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  FileText,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { useAuth } from '../../../context/auth-context';
import { createClient } from '../../../lib/supabase/client';
import { BookingStatus, LocationAccessState } from '@kajlagbe/types';

export default function CustomerBookingsPage() {
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [activeTab, setActiveTab] = React.useState<string>('ALL');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bookings, setBookings] = React.useState<any[]>([]);

  const fetchBookings = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          job:jobs(id, title, categorySlug),
          provider:users!bookings_providerId_fkey(
            id, email, phone,
            profile:user_profiles(firstName, lastName, avatarUrl),
            providerProfile:provider_profiles(primaryCategory, experienceYears)
          ),
          workOrder:work_orders(id, workOrderReference, status)
        `)
        .eq('customerId', user.id)
        .order('createdAt', { ascending: false });

      if (activeTab !== 'ALL') {
        query = query.eq('status', activeTab);
      }

      const { data, error } = await query;
      if (!error && data) {
        setBookings(data);
      }
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [user, activeTab, supabase]);

  React.useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.bookingReference?.toLowerCase().includes(q) ||
      b.job?.title?.toLowerCase().includes(q) ||
      b.generalArea?.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case BookingStatus.PENDING_CONFIRMATION:
        return <Badge variant="warning">পেন্ডিং কনফার্মেশন</Badge>;
      case BookingStatus.CONFIRMED:
      case BookingStatus.SCHEDULED:
        return <Badge variant="info">কনফার্মড ও শিডিউলড</Badge>;
      case BookingStatus.RESCHEDULE_REQUESTED:
        return <Badge variant="warning">সময়সূচী পরিবর্তন প্রস্তাবিত</Badge>;
      case BookingStatus.IN_PROGRESS:
        return <Badge variant="info">চলমান কাজ (In Progress)</Badge>;
      case BookingStatus.COMPLETED:
        return <Badge variant="success">সম্পন্ন সেবা</Badge>;
      case BookingStatus.CANCELLED:
        return <Badge variant="error">বাতিলকৃত</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const tabs = [
    { key: 'ALL', label: 'সব বুকিং' },
    { key: BookingStatus.PENDING_CONFIRMATION, label: 'পেন্ডিং' },
    { key: BookingStatus.CONFIRMED, label: 'কনফার্মড' },
    { key: BookingStatus.IN_PROGRESS, label: 'চলমান কাজ' },
    { key: BookingStatus.COMPLETED, label: 'সম্পন্ন' },
    { key: BookingStatus.CANCELLED, label: 'বাতিল' },
  ];

  return (
    <DashboardLayout
      title="আমার সার্ভিস বুকিংসমূহ"
      subtitle="আপনার সমস্ত বুকিং, শিডিউল ও সার্ভিস অর্ডার ট্র্যাকিং"
    >
      <div className="space-y-6">
        {/* Search & Filter Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Input
              type="search"
              placeholder="বুকিং আইডি বা কাজ দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-slate-400" />}
              className="bg-slate-50 border-slate-200"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  activeTab === tab.key
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-44 rounded-3xl bg-slate-100 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          <DashboardEmptyState
            icon={Calendar}
            title="কোনো বুকিং পাওয়া যায়নি"
            description="আপনার নির্বাচিত ফিল্টারে কোনো সার্ভিস বুকিং রেকর্ড নেই।"
            actionText="নতুন সেবা বুক করুন"
            actionHref="/services"
            secondaryActionText="কাজ পোস্ট করুন"
            secondaryActionHref="/post-job"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredBookings.map((b) => {
              const providerName =
                b.provider?.profile?.firstName && b.provider?.profile?.lastName
                  ? `${b.provider.profile.firstName} ${b.provider.profile.lastName}`
                  : b.provider?.profile?.firstName || 'প্রোভাইডার';

              return (
                <div
                  key={b.id}
                  className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        #{b.bookingReference}
                      </span>
                      {getStatusBadge(b.status)}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-1">
                      {b.job?.title || 'সার্ভিস কাজ'}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1 font-medium">
                        <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{providerName}</span>
                      </div>
                      <span>•</span>
                      <div className="font-bold text-emerald-700">
                        ৳{Number(b.agreedPrice).toLocaleString('bn-BD')}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{b.scheduledDate || 'তারিখ নির্ধারিত হয়নি'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{b.scheduledTime || 'সময়সূচী পেন্ডিং'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate max-w-[140px] sm:max-w-[180px]">
                        {b.generalArea}
                      </span>
                    </div>

                    <Link href={`/customer/bookings/${b.id}`}>
                      <Button size="sm" variant="outline" className="gap-1 text-xs">
                        <span>বিস্তারিত ট্র্যাকিং</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
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
