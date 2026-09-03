'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCheck,
  Shield,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../components/dashboard/dashboard-empty-state';
import { useAuth } from '../../context/auth-context';

export interface NotificationItem {
  id: string;
  type: 'ACCOUNT' | 'SECURITY' | 'BOOKING' | 'SYSTEM';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export default function NotificationsPage() {
  const { user } = useAuth();

  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'SECURITY',
      title: 'নতুন ডিভাইসে লগইন সফল',
      message: 'আপনার KajLagbe অ্যাকাউন্টে বর্তমান ওয়েব ব্রাউজার থেকে লগইন করা হয়েছে।',
      isRead: false,
      createdAt: '১০ মিনিট আগে',
      link: '/settings/security',
    },
    {
      id: 'notif-2',
      type: 'ACCOUNT',
      title: 'অ্যাকাউন্ট প্রোফাইল তৈরি হয়েছে',
      message: 'KajLagbe প্ল্যাটফর্মে আপনাকে স্বাগতম! আপনার প্রোফাইল সম্পূর্ণ করুন।',
      isRead: false,
      createdAt: 'আজ',
      link: '/customer/profile',
    },
  ]);

  const [activeTab, setActiveTab] = React.useState<'all' | 'unread' | 'security'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.isRead;
    if (activeTab === 'security') return n.type === 'SECURITY';
    return true;
  });

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <DashboardLayout
      title="নোটিফিকেশন ও সতর্কবার্তা"
      subtitle="আপনার অ্যাকাউন্টের সকল সাম্প্রতিক আপডেট এবং সিকিউরিটি নোটিশ"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1">
            {[
              { id: 'all', label: 'সকল নোটিফিকেশন', count: notifications.length },
              { id: 'unread', label: 'অপঠিত', count: notifications.filter((n) => !n.isRead).length },
              { id: 'security', label: 'সিকিউরিটি', count: notifications.filter((n) => n.type === 'SECURITY').length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      activeTab === tab.id ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mark All Read Action */}
          {notifications.some((n) => !n.isRead) && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllRead}
              leftIcon={<CheckCheck className="h-4 w-4" />}
            >
              সব পড়া হয়েছে চিহ্নিত করুন
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {filteredNotifs.length === 0 ? (
          <DashboardEmptyState
            icon={Bell}
            title="কোনো নোটিফিকেশন নেই"
            description="আপনার কাছে এই মুহূর্তে কোনো নতুন নোটিফিকেশন নেই।"
          />
        ) : (
          <div className="space-y-2.5">
            {filteredNotifs.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`rounded-2xl border p-4 sm:p-5 flex items-start justify-between gap-4 transition cursor-pointer ${
                  !item.isRead
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      item.type === 'SECURITY'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.type === 'SECURITY' ? <Shield className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                    <span className="text-[11px] text-slate-400 block pt-0.5">{item.createdAt}</span>
                  </div>
                </div>

                {item.link && (
                  <Link href={item.link} className="shrink-0">
                    <Button size="sm" variant="outline">
                      দেখুন
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

