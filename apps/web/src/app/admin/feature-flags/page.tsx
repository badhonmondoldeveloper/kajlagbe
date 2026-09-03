'use client';

import * as React from 'react';
import { Flag, RefreshCw, CheckCircle2, XCircle, Sliders } from 'lucide-react';
import { Button, Badge } from '@kajlagbe/ui';
import { FeatureFlagItem } from '@kajlagbe/types';

export default function AdminFeatureFlagsPage() {
  const [flags, setFlags] = React.useState<FeatureFlagItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [togglingId, setTogglingId] = React.useState<string | null>(null);

  const fetchFlags = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/feature-flags');
      if (res.ok) {
        const data = await res.json();
        setFlags(data);
      } else {
        setFlags([]);
      }
    } catch {
      setFlags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  const handleToggle = async (flag: FeatureFlagItem) => {
    if (togglingId) return;
    setTogglingId(flag.id);

    try {
      const res = await fetch(`/api/admin/feature-flags/${flag.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnabled: !flag.isEnabled }),
      });

      if (res.ok) {
        await fetchFlags();
      }
    } catch {
      // Error
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">সিস্টেম ফিচার ফ্ল্যাগ (Feature Flags)</h1>
          <p className="text-xs text-slate-500">প্ল্যাটফর্মের ফিচারসমূহ লাইভ বন্ধ বা চালু করার গভার্নেন্স প্যানেল</p>
        </div>

        <Button onClick={fetchFlags} variant="outline" size="sm" disabled={loading} className="text-xs font-bold gap-1.5 self-start sm:self-auto">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 rounded-3xl bg-white border border-slate-200">
            ফিচার ফ্ল্যাগ লোড হচ্ছে...
          </div>
        ) : flags.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 rounded-3xl bg-white border border-slate-200">
            কোনো ফিচার ফ্ল্যাগ কনফিগার করা নেই
          </div>
        ) : (
          flags.map((fl) => (
            <div
              key={fl.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{fl.name}</h3>
                  <code className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    {fl.key}
                  </code>
                </div>
                <p className="text-xs text-slate-500">{fl.description || 'কোনো বিবরণ নেই'}</p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <Badge variant={fl.isEnabled ? 'success' : 'secondary'}>
                  {fl.isEnabled ? 'ENABLED' : 'DISABLED'}
                </Badge>

                <Button
                  onClick={() => handleToggle(fl)}
                  disabled={togglingId === fl.id}
                  variant={fl.isEnabled ? 'outline' : 'primary'}
                  size="sm"
                  className="text-xs font-bold"
                >
                  {togglingId === fl.id ? 'আপডেট হচ্ছে...' : fl.isEnabled ? 'বন্ধ করুন' : 'চালু করুন'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
