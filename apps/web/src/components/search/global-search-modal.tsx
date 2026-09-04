'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Sparkles,
  Navigation,
  History,
  X,
  ChevronRight,
  Wrench,
  UserCheck,
  Briefcase,
  RefreshCw,
  Check,
} from 'lucide-react';
import { Badge, Button, Input } from '@kajlagbe/ui';
import { CATEGORIES } from '../../data/categories';
import { DIVISIONS } from '../../data/locations';
import { useLocation } from '../../context/location-context';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'এসি মেরামত',
  'ইলেকট্রিশিয়ান',
  'মিরপুর প্লাম্বার',
  'উত্তরা এসি ওয়াশ',
  'হাউস ক্লিনিং',
  'ফ্রিজ রিপেয়ার',
];

const HISTORY_STORAGE_KEY = 'kajlagbe_search_history';

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const { location, detectLiveLocation, setLocation } = useLocation();
  const [query, setQuery] = React.useState('');
  const [history, setHistory] = React.useState<string[]>([]);
  const [showLocationPicker, setShowLocationPicker] = React.useState(false);

  // Keyboard Event Listener for Ctrl+K / Cmd+K / ESC
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Hydrate search history
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      // Storage fallback
    }
  }, []);

  const saveSearchToHistory = (term: string) => {
    if (!term.trim()) return;
    const filtered = [term, ...history.filter((h) => h !== term)].slice(0, 6);
    setHistory(filtered);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      // Storage fallback
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // Storage fallback
    }
  };

  const handleSelectSearch = (href: string, term?: string) => {
    if (term) saveSearchToHistory(term);
    onClose();
    router.push(href);
  };

  // Filter matching categories & services
  const matchingCategories = CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.titleEn.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  // Filter matching locations
  const matchingLocations: { name: string; type: string }[] = [];
  DIVISIONS.forEach((d) => {
    if (d.name.toLowerCase().includes(query.toLowerCase()) || d.nameEn.toLowerCase().includes(query.toLowerCase())) {
      matchingLocations.push({ name: d.name, type: 'বিভাগ' });
    }
    d.districts.forEach((dist) => {
      if (dist.name.toLowerCase().includes(query.toLowerCase())) {
        matchingLocations.push({ name: dist.name, type: `${d.name}` });
      }
    });
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95">
        {/* Top Search Header Bar */}
        <div className="relative border-b border-slate-100 p-4 flex items-center gap-3 bg-slate-50/80">
          <Search className="h-5 w-5 text-emerald-600 shrink-0 ml-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সার্ভিস, টেকনিশিয়ান বা আপনার এলাকা দিয়ে খুঁজুন (যেমন: এসি মেরামত, মিরপুর)..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-200/80 hover:bg-slate-300/80 px-2.5 py-1 text-xs font-bold text-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Live Location Quick Detect Banner */}
        <div className="bg-slate-900 text-white p-3.5 px-6 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-300">বর্তমান অবস্থান:</span>
            <span className="font-bold text-emerald-300">
              {location.area || location.district || 'ঢাকা (Auto)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => detectLiveLocation()}
              disabled={location.loading}
              className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition"
            >
              {location.loading ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Navigation className="h-3.5 w-3.5" />
              )}
              <span>{location.loading ? 'সনাক্ত হচ্ছে...' : 'লাইব লোকেশন আপডেট'}</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="font-bold text-slate-300 hover:text-white"
            >
              ম্যানুয়াল সিলেক্ট
            </button>
          </div>
        </div>

        {/* Manual Location Picker Drawer */}
        {showLocationPicker && (
          <div className="bg-slate-800 p-4 border-b border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {DIVISIONS.slice(0, 8).map((div) => (
              <button
                key={div.id}
                type="button"
                onClick={() => {
                  setLocation(div.name, div.districts[0]?.name || div.name);
                  setShowLocationPicker(false);
                }}
                className={`p-2 rounded-xl border text-left font-semibold transition ${
                  location.division === div.name
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                    : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                📍 {div.name}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 divide-y divide-slate-100">
          {/* Recent History & Popular Searches (When query is empty) */}
          {!query && (
            <div className="space-y-4 pt-1">
              {history.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-bold">
                    <span className="flex items-center gap-1.5">
                      <History className="h-3.5 w-3.5 text-slate-400" />
                      সাম্প্রতিক অনুসন্ধানসমূহ
                    </span>
                    <button
                      type="button"
                      onClick={clearHistory}
                      className="text-rose-500 hover:underline text-[11px]"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.map((h, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setQuery(h);
                        }}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800 transition"
                      >
                        <span>{h}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  জনপ্রিয় ক্যাটাগরি ও সার্চ ট্যাগ
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectSearch(`/services?q=${encodeURIComponent(tag)}`, tag)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white transition shadow-2xs"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 1: Services & Categories */}
          {matchingCategories.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                মেলা সার্ভিস ক্যাটাগরি ({matchingCategories.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingCategories.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      handleSelectSearch(`/services/${cat.slug}`, cat.title)
                    }
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-emerald-50/60 hover:border-emerald-200 text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-700">
                          {cat.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{cat.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Matching Locations */}
          {matchingLocations.length > 0 && (
            <div className="space-y-2 pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                ম্যাচিং এলাকা ও জেলা ({matchingLocations.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {matchingLocations.slice(0, 6).map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setLocation(loc.type, loc.name);
                      handleSelectSearch(`/providers?location=${encodeURIComponent(loc.name)}`, loc.name);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white px-3 py-1.5 text-xs font-bold text-slate-700 transition"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{loc.name}</span>
                    <span className="text-[10px] opacity-75">({loc.type})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Action Links */}
          {query && (
            <div className="pt-3 grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleSelectSearch(`/providers?q=${encodeURIComponent(query)}`, query)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20"
              >
                <UserCheck className="h-4 w-4" />
                <span>টেকনিশিয়ান খুঁজুন &quot;{query}&quot;</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectSearch(`/jobs?q=${encodeURIComponent(query)}`, query)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md"
              >
                <Briefcase className="h-4 w-4" />
                <span>জব পোস্ট খুঁজুন &quot;{query}&quot;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
