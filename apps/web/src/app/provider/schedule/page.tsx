'use client';

import * as React from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, User, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';
import { useAuth } from '../../../context/auth-context';
import { createClient } from '../../../lib/supabase/client';

export default function ProviderSchedulePage() {
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState<any[]>([]);

  const fetchSchedule = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          job:jobs(title, categorySlug),
          customer:users!bookings_customerId_fkey(
            profile:user_profiles(firstName, lastName)
          )
        `)
        .eq('providerId', user.id)
        .in('status', ['CONFIRMED', 'SCHEDULED', 'IN_PROGRESS'])
        .order('scheduledDate', { ascending: true });

      if (!error && data) {
        setBookings(data);
      }
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  React.useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // Group bookings by date
  const groupedBookings = React.useMemo(() => {
    const map: Record<string, any[]> = {};
    bookings.forEach((b) => {
      const dateKey = b.scheduledDate || 'তারিখ অনির্ধারিত';
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(b);
    });
    return map;
  }, [bookings]);

  return (
    <DashboardLayout
      title="আমার সার্ভিস সময়সূচী (Schedule)"
      subtitle="তারিখ অনুযায়ী আপনার আগামী সার্ভিস ভিজিট ও এপয়েন্টমেন্ট"
    >
      <div className="space-y-6 max-w-4xl">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : Object.keys(groupedBookings).length === 0 ? (
          <DashboardEmptyState
            icon={CalendarIcon}
            title="কোনো শিডিউলকৃত কাজ নেই"
            description="বর্তমানে আপনার কোনো আগামী কনফার্মড সার্ভিস ভিজিট পেন্ডিং নেই।"
            actionText="বুকিং তালিকা দেখুন"
            actionHref="/provider/bookings"
          />
        ) : (
          Object.entries(groupedBookings).map(([date, dateBookings]) => (
            <div key={date} className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-slate-800 bg-slate-100 px-4 py-2 rounded-2xl w-fit">
                <CalendarIcon className="h-4 w-4 text-emerald-600" />
                <span>{date}</span>
              </div>

              <div className="space-y-3">
                {dateBookings.map((b) => {
                  const customerName =
                    b.customer?.profile?.firstName && b.customer?.profile?.lastName
                      ? `${b.customer.profile.firstName} ${b.customer.profile.lastName}`
                      : b.customer?.profile?.firstName || 'গ্রাহক';

                  return (
                    <div
                      key={b.id}
                      className="rounded-3xl border border-slate-200/90 bg-white p-5 hover:border-emerald-400 hover:shadow-xs transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{b.bookingReference}
                          </span>
                          <Badge variant="info">{b.status}</Badge>
                        </div>

                        <h4 className="text-base font-bold text-slate-900">{b.job?.title}</h4>

                        <div className="flex items-center gap-4 text-xs text-slate-600">
                          <div className="flex items-center gap-1 font-medium">
                            <User className="h-3.5 w-3.5 text-sky-600" />
                            <span>{customerName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span>{b.scheduledTime || 'সময় অনির্ধারিত'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            <span>{b.generalArea}</span>
                          </div>
                        </div>
                      </div>

                      <Link href={`/provider/bookings/${b.id}`}>
                        <Button size="sm" variant="outline" className="gap-1 text-xs shrink-0">
                          <span>বিস্তারিত</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
