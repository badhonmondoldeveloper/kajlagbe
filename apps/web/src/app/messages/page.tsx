'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  User,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCheck,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../components/dashboard/dashboard-empty-state';
import { useAuth } from '../../context/auth-context';
import { createClient } from '../../lib/supabase/client';

export default function MessagesInboxPage() {
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [conversations, setConversations] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchConversations = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participants:conversation_participants(
            id, userId, unreadCount,
            user:users(id, email, profile:user_profiles(firstName, lastName, avatarUrl))
          ),
          messages(content, createdAt, type)
        `)
        .order('lastMessageAt', { ascending: false });

      if (!error && data) {
        setConversations(data);
      }
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  React.useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const otherParticipant = conv.participants?.find((p: any) => p.userId !== user?.id);
    const partnerName =
      otherParticipant?.user?.profile?.firstName || otherParticipant?.user?.email || '';
    return partnerName.toLowerCase().includes(q) || conv.conversationReference.toLowerCase().includes(q);
  });

  return (
    <DashboardLayout
      title="মেসেজ ইনবক্স (Messages)"
      subtitle="গ্রাহক ও টেকনিশিয়ানদের রিয়েল-টাইম বার্তা আদান-প্রদান"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Header Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Input
              type="search"
              placeholder="বার্তার তথ্য বা নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-slate-400" />}
              className="bg-slate-50 border-slate-200"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>নিরাপদ ও এনক্রিপ্টেড চ্যাটিং সেশন</span>
          </div>
        </div>

        {/* Conversation List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <DashboardEmptyState
            icon={MessageSquare}
            title="কোনো সক্রিয় মেসেজ নেই"
            description="কাজের দরপ্রস্তাব বা বুকিং গ্রহণের পর বার্তা আদান-প্রদান শুরু হবে।"
            actionText="সার্ভিস খুঁজুন"
            actionHref="/services"
          />
        ) : (
          <div className="space-y-3">
            {filteredConversations.map((conv) => {
              const otherParticipant = conv.participants?.find((p: any) => p.userId !== user?.id);
              const selfParticipant = conv.participants?.find((p: any) => p.userId === user?.id);
              const partnerName =
                otherParticipant?.user?.profile?.firstName && otherParticipant?.user?.profile?.lastName
                  ? `${otherParticipant.user.profile.firstName} ${otherParticipant.user.profile.lastName}`
                  : otherParticipant?.user?.profile?.firstName || otherParticipant?.user?.email || 'ইউজার';

              const lastMessage = conv.messages?.[0];
              const unread = selfParticipant?.unreadCount || 0;

              return (
                <Link key={conv.id} href={`/messages/${conv.id}`}>
                  <div
                    className={`rounded-3xl border p-4 sm:p-5 transition flex items-center justify-between gap-4 ${
                      unread > 0
                        ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                        : 'border-slate-200/90 bg-white hover:border-emerald-400 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-lg shrink-0">
                          {partnerName[0]}
                        </div>
                        {unread > 0 && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                            {unread}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                            {partnerName}
                          </h4>
                          <Badge variant="outline" className="text-[10px] py-0 px-2">
                            {conv.contextType}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 truncate max-w-sm sm:max-w-md">
                          {lastMessage?.content || 'নতুন চ্যাট সেশন শুরু হয়েছে।'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                        {new Date(conv.lastMessageAt).toLocaleDateString('bn-BD')}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
