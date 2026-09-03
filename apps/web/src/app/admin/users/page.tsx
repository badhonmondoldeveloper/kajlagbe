'use client';

import * as React from 'react';
import { Search, Filter, ShieldAlert, CheckCircle2, RefreshCw, MoreVertical, AlertTriangle } from 'lucide-react';
import { Button, Input, Badge } from '@kajlagbe/ui';
import { UserAdminSummary } from '@kajlagbe/types';

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<UserAdminSummary[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');

  // Selected user for status update modal
  const [selectedUser, setSelectedUser] = React.useState<UserAdminSummary | null>(null);
  const [targetStatus, setTargetStatus] = React.useState<string>('SUSPENDED');
  const [reason, setReason] = React.useState('');
  const [actionLoading, setActionLoading] = React.useState(false);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set('search', search);
      if (statusFilter !== 'ALL') queryParams.set('status', statusFilter);

      const res = await fetch(`/api/admin/users?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateStatus = async () => {
    if (!selectedUser || actionLoading) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus, reason }),
      });

      if (res.ok) {
        setSelectedUser(null);
        setReason('');
        await fetchUsers();
      }
    } catch {
      // Error
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">ইউজার ডিরেক্টরি ও একাউন্ট ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500">প্ল্যাটফর্মের সকল গ্রাহক ও সেবাদাতাদের তালিকা ব্রাউজ ও পরিচালনা করুন</p>
        </div>

        <Button onClick={fetchUsers} variant="outline" size="sm" disabled={loading} className="text-xs font-bold gap-1.5 self-start sm:self-auto">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'ACTIVE', 'SUSPENDED', 'RESTRICTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                statusFilter === st ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* User Table / List */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">ইউজার তালিকা লোড হচ্ছে...</div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <ShieldAlert className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">কোনো ইউজার পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400">অনুগ্রহ করে ফিল্টার পরিবর্তন করে চেষ্টা করুন</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="p-4">ব্যবহারকারী</th>
                  <th className="p-4">রোল</th>
                  <th className="p-4">স্টেটাস</th>
                  <th className="p-4">রেজিস্ট্রেশন তারিখ</th>
                  <th className="p-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map((u) => {
                  const name = u.profile ? `${u.profile.firstName} ${u.profile.lastName}` : u.email.split('@')[0];
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/60">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{name}</div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {u.roles.map((r) => (
                            <Badge key={r} variant="secondary" size="sm">
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={u.status === 'ACTIVE' ? 'success' : u.status === 'SUSPENDED' ? 'error' : 'warning'}>
                          {u.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-slate-500">
                        {new Date(u.createdAt).toLocaleDateString('bn-BD')}
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          onClick={() => {
                            setSelectedUser(u);
                            setTargetStatus(u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');
                          }}
                          variant="outline"
                          size="sm"
                          className="text-[11px] font-bold"
                        >
                          স্টেটাস পরিবর্তন
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-white p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              অ্যাকাউন্ট স্টেটাস আপডেট
            </h3>

            <div className="text-xs space-y-2">
              <p className="text-slate-600">
                ইউজার: <strong className="text-slate-900">{selectedUser.email}</strong>
              </p>
              <div>
                <label className="font-bold text-slate-700 block mb-1">নতুন স্টেটাস নির্বাচন করুন</label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-bold"
                >
                  <option value="ACTIVE">ACTIVE (সক্রিয়)</option>
                  <option value="SUSPENDED">SUSPENDED (স্থগিত)</option>
                  <option value="RESTRICTED">RESTRICTED (সীমিত)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">কারণ / বিষয় (অডিট লগের জন্য)</label>
                <Input
                  placeholder="পরিবর্তনের কারণ উল্লেখ করুন..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button onClick={() => setSelectedUser(null)} variant="outline" size="sm" className="text-xs font-bold">
                বাতিল
              </Button>
              <Button
                onClick={handleUpdateStatus}
                disabled={actionLoading}
                size="sm"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
              >
                {actionLoading ? 'আপডেট হচ্ছে...' : 'সংরক্ষণ করুন'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
