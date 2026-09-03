import * as React from 'react';
import { Briefcase, Calendar, MessageSquare, Search, Bell, Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center animate-in fade-in-50 duration-200',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-4 shadow-2xs">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function NoJobsEmptyState({ action, className }: { action?: React.ReactNode; className?: string }) {
  return (
    <EmptyState
      icon={<Briefcase className="h-6 w-6 text-emerald-600" />}
      title="কোন কাজ পাওয়া যায়নি (No Jobs Found)"
      description="বর্তমানে আপনার নির্বাচিত ফিল্টারে কোনো সক্রিয় কাজের সুযোগ নেই। নতুন কোনো কাজ পোস্ট করতে পারেন।"
      action={action}
      className={className}
    />
  );
}

export function NoBookingsEmptyState({ action, className }: { action?: React.ReactNode; className?: string }) {
  return (
    <EmptyState
      icon={<Calendar className="h-6 w-6 text-emerald-600" />}
      title="কোন বুকিং পাওয়া যায়নি (No Bookings Yet)"
      description="আপনার কোনো সক্রিয় বা পূর্ববর্তী সার্ভিস বুকিং রেকর্ড নেই। আপনার পছন্দের সার্ভিসটি বুক করতে পারেন।"
      action={action}
      className={className}
    />
  );
}

export function NoMessagesEmptyState({ action, className }: { action?: React.ReactNode; className?: string }) {
  return (
    <EmptyState
      icon={<MessageSquare className="h-6 w-6 text-emerald-600" />}
      title="কোন মেসেজ নেই (No Messages)"
      description="সার্ভিস প্রোভাইডার বা গ্রাহকদের সাথে যোগাযোগ করতে বুকিং বা কাজের অফার তৈরি করুন।"
      action={action}
      className={className}
    />
  );
}

export function NoSearchResultsEmptyState({ action, query, className }: { action?: React.ReactNode; query?: string; className?: string }) {
  return (
    <EmptyState
      icon={<Search className="h-6 w-6 text-emerald-600" />}
      title="খোঁজের ফলাফল পাওয়া যায়নি"
      description={query ? `"${query}" এর জন্য কোনো সার্ভিস বা প্রোভাইডার খুঁজে পাওয়া যায়নি। অন্য কিওয়ার্ড চেষ্টা করুন।` : "আপনার অনুসন্ধানের জন্য কোনো তথ্য পাওয়া যায়নি।"}
      action={action}
      className={className}
    />
  );
}

export function NoNotificationsEmptyState({ className }: { className?: string }) {
  return (
    <EmptyState
      icon={<Bell className="h-6 w-6 text-emerald-600" />}
      title="কোন নোটিফিকেশন নেই"
      description="আপনার অ্যাকাউন্টের সকল আপডেট এবং নোটিফিকেশন এখানে প্রদর্শিত হবে।"
      className={className}
    />
  );
}

