'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bookmark, Search, Star, Wrench, Trash2 } from 'lucide-react';
import { Button, Badge, Avatar } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { DashboardEmptyState } from '../../../components/dashboard/dashboard-empty-state';

export default function CustomerSavedProvidersPage() {
  const [savedList, setSavedList] = React.useState<any[]>([]);

  return (
    <DashboardLayout
      title="সংরক্ষিত প্রোভাইডার"
      subtitle="আপনার বুকমার্ক করা নির্ভরযোগ্য টেকনিশিয়ান ও সার্ভিস প্রোভাইডারগণ"
    >
      <div className="space-y-6">
        {savedList.length === 0 ? (
          <DashboardEmptyState
            icon={Bookmark}
            title="কোনো প্রোভাইডার সংরক্ষিত নেই"
            description="যেকোনো প্রোভাইডারের প্রোফাইল দেখার সময় বুকমার্ক বাটনে ক্লিক করে পরবর্তীতে সহজে খুঁজে পাওয়ার জন্য সেভ করে রাখতে পারেন।"
            actionText="প্রোভাইডার তালিকা দেখুন"
            actionHref="/providers"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedList.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="flex items-start gap-3">
                  <Avatar fallback={item.name} size="md" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <span className="text-xs text-slate-500">{item.category}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/providers/${item.slug}`}>
                    <Button size="sm" variant="outline">
                      প্রোফাইল
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSavedList(savedList.filter((s) => s.id !== item.id))}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
