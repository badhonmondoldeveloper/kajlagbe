'use client';

import * as React from 'react';
import { History, RefreshCw, ShieldCheck, Filter } from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { AuditLogItem } from '@kajlagbe/types';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = React.useState<AuditLogItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchLogs = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      } else {
        setLogs([]);
      }
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">অপরিবর্তনীয় অডিট লগ (Audit Logs)</h1>
          <p className="text-xs text-slate-500">অ্যাডমিনিস্ট্রেটরদের যাবতীয় কর্মকাণ্ড ও সিকিউরিটি ইভেন্টের রেকর্ড</p>
        </div>

        <Button onClick={fetchLogs} variant="outline" size="sm" disabled={loading} className="text-xs font-bold gap-1.5 self-start sm:self-auto">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">অডিট লগ লোড হচ্ছে...</div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <History className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">কোনো অডিট রেকর্ড পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400">অ্যাডমিন কোনো কর্মকাণ্ড সম্পন্ন করলে রেকর্ডটি এখানে সংরক্ষিত হবে</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="p-4">অ্যাক্টর (Admin)</th>
                  <th className="p-4">অ্যাকশন</th>
                  <th className="p-4">টার্গেট সত্তা</th>
                  <th className="p-4">মেটাডেটা Summary</th>
                  <th className="p-4">সময়সূচি</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-900">{l.userName || 'System'}</td>
                    <td className="p-4">
                      <Badge variant="verified" size="sm">
                        {l.action}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-700">{l.entityType}</span>
                      {l.entityId && <span className="text-slate-400 block font-mono text-[10px]">ID: {l.entityId}</span>}
                    </td>
                    <td className="p-4 text-[11px] text-slate-600 font-mono">
                      {l.metadata ? JSON.stringify(l.metadata).slice(0, 60) + '...' : '-'}
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-[11px]">
                      {new Date(l.createdAt).toLocaleString('bn-BD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
