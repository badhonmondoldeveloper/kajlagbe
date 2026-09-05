'use client';

import * as React from 'react';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Search,
  Tag,
  DollarSign,
  Wrench,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@kajlagbe/ui';
import { CATEGORIES, ServiceCategory } from '../../../data/categories';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<ServiceCategory[]>(CATEGORIES);
  const [search, setSearch] = React.useState('');
  const [editingCategory, setEditingCategory] = React.useState<ServiceCategory | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const filteredCategories = categories.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleTogglePopular = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, popular: !c.popular } : c))
    );
    setSuccessMsg('ক্যাটাগরি পপুলার স্ট্যাটাস আপডেট হয়েছে!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAddNewCategory = () => {
    const newCat: ServiceCategory = {
      id: `cat-${Date.now()}`,
      slug: `custom-category-${Date.now().toString().slice(-4)}`,
      title: 'নতুন সার্ভিস ক্যাটাগরি',
      titleEn: 'New Service Category',
      description: 'নতুন সার্ভিস ক্যাটাগরির বিস্তারিত বিবরণ দিন।',
      group: 'home',
      icon: 'Wrench',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      providerCount: 0,
      startingPrice: 500,
      popular: false,
      subservices: [],
      benefits: ['ভেরিফাইড টেকনিশিয়ান', 'গ্যারান্টিড সার্ভিস'],
      safetyTips: ['কাজের পরে পরীক্ষা করে নিন।'],
      faq: [],
    };
    setCategories([newCat, ...categories]);
    setEditingCategory(newCat);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setCategories((prev) =>
      prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
    );
    setEditingCategory(null);
    setSuccessMsg('ক্যাটাগরি সফলভাবে আপডেট হয়েছে!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
              <FolderTree className="h-3.5 w-3.5 mr-1" />
              ট্যাক্সোনমি ও সার্ভিস ম্যানেজমেন্ট
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              সার্ভিস ক্যাটাগরি ও প্রাইসিং কন্ট্রোল
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              প্ল্যাটফর্মের সকল সার্ভিস ক্যাটাগরি, সাব-সার্ভিস লিস্ট, স্টার্টিং প্রাইস ও পপুলার ফ্ল্যাগ ম্যানেজ করুন।
            </p>
          </div>

          <Button
            type="button"
            onClick={handleAddNewCategory}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            নতুন ক্যাটাগরি যোগ করুন
          </Button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-800 font-semibold shadow-xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Controls */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ক্যাটাগরি বা সেবা খুঁজুন..."
          className="pl-10 text-xs sm:text-sm rounded-2xl bg-white border-slate-200"
        />
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <Card key={cat.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-base">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{cat.title}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{cat.titleEn}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTogglePopular(cat.id)}
                  title="Popular Flag Toggle"
                >
                  {cat.popular ? (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[10px]">
                      ★ পপুলার
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] text-slate-400">
                      সাধারণ
                    </Badge>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 font-semibold">
                <span className="text-slate-500">শুরুর প্রাইস:</span>
                <span className="font-bold text-emerald-700">৳{cat.startingPrice.toLocaleString('bn-BD')}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">
                  {cat.subservices.length}টি সাব-সার্ভিস
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingCategory(cat)}
                    className="h-8 px-3 text-xs border-slate-200"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    এডিট
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b pb-3">ক্যাটাগরি তথ্য এডিট করুন</h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ক্যাটাগরি নাম (Bangla)</label>
                <Input
                  value={editingCategory.title}
                  onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ক্যাটাগরি নাম (English)</label>
                <Input
                  value={editingCategory.titleEn}
                  onChange={(e) => setEditingCategory({ ...editingCategory, titleEn: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">শুরুর মূল্য (Starting Price BDT)</label>
                <Input
                  type="number"
                  value={editingCategory.startingPrice}
                  onChange={(e) => setEditingCategory({ ...editingCategory, startingPrice: parseInt(e.target.value, 10) || 500 })}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">বিবরণ (Description)</label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  rows={3}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setEditingCategory(null)}>
                  বাতিল
                </Button>
                <Button type="submit" className="bg-emerald-600 text-white font-bold">
                  সেভ করুন
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
