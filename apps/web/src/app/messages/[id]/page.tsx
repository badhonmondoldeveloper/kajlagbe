'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Send,
  ChevronLeft,
  ShieldCheck,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  User,
  Clock,
} from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { useAuth } from '../../../context/auth-context';
import { createClient } from '../../../lib/supabase/client';

export default function ConversationDetailsPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);

  const [conversation, setConversation] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [sending, setSending] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const fetchConversation = React.useCallback(async () => {
    if (!conversationId || !user) return;
    setLoading(true);
    try {
      const [convRes, msgRes] = await Promise.all([
        supabase
          .from('conversations')
          .select(`
            *,
            participants:conversation_participants(
              id, userId, unreadCount,
              user:users(id, email, phone, profile:user_profiles(*))
            )
          `)
          .eq('id', conversationId)
          .single(),
        supabase
          .from('messages')
          .select(`
            *,
            sender:users!messages_senderId_fkey(
              id, email, profile:user_profiles(*)
            )
          `)
          .eq('conversationId', conversationId)
          .order('createdAt', { ascending: true }),
      ]);

      if (convRes.data) setConversation(convRes.data);
      if (msgRes.data) setMessages(msgRes.data);
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [conversationId, user, supabase]);

  React.useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  // Auto-scroll to bottom of messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch(`/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type: 'TEXT' }),
      });
      setContent('');
      fetchConversation();
    } catch {
      alert('মেসেজ পাঠাতে সমস্যা হয়েছে।');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="চ্যাট সেশন লোড হচ্ছে...">
        <div className="h-96 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
      </DashboardLayout>
    );
  }

  const otherParticipant = conversation?.participants?.find((p: any) => p.userId !== user?.id);
  const partnerName =
    otherParticipant?.user?.profile?.firstName && otherParticipant?.user?.profile?.lastName
      ? `${otherParticipant.user.profile.firstName} ${otherParticipant.user.profile.lastName}`
      : otherParticipant?.user?.profile?.firstName || 'ইউজার';

  return (
    <DashboardLayout
      title={`চ্যাট সেশন: ${partnerName}`}
      subtitle={`রেফারেন্স: #${conversation?.conversationReference || conversationId}`}
    >
      <div className="space-y-4 max-w-4xl">
        <Link href="/messages" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600">
          <ChevronLeft className="h-4 w-4" />
          <span>ইনবক্সে ফিরুন</span>
        </Link>

        {/* Chat Window Container */}
        <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm flex flex-col h-[600px]">
          {/* Conversation Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-base shrink-0">
                {partnerName[0]}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{partnerName}</h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Badge variant="outline" className="py-0 px-1.5 text-[10px]">
                    {conversation?.contextType}
                  </Badge>
                  <span>•</span>
                  <span>সুরক্ষিত চ্যাট</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">গোপনীয়তা সংরক্ষিত</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
            {messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                বার্তার সূচনা করুন। আপনার চ্যাট মেসেজ এনক্রিপ্ট থাকবে।
              </div>
            ) : (
              messages.map((msg) => {
                const isSelf = msg.senderId === user?.id;
                const isSystem = msg.type === 'SYSTEM';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                      <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-4 py-1.5 rounded-full border border-slate-200">
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm shadow-xs ${
                        isSelf
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      <span
                        className={`text-[10px] block mt-1 text-right ${
                          isSelf ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString('bn-BD', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Composer Footer */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-2">
            <Input
              type="text"
              placeholder="বার্তা লিখুন..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-slate-50 border-slate-200 text-xs sm:text-sm"
            />
            <Button
              type="submit"
              disabled={sending || !content.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 font-bold gap-1"
            >
              <span>পাঠান</span>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
