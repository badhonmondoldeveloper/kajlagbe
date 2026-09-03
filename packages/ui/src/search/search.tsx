'use client';

import * as React from 'react';
import { Search, MapPin, X, TrendingUp, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Modal } from '../components/modal/modal';

export interface SearchProps {
  value?: string;
  onChange?: (val: string) => void;
  onSearch?: (query: string, location?: string) => void;
  placeholder?: string;
  className?: string;
}

export function GlobalSearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'ইলেকট্রিশিয়ান, প্লাম্বার, এসি মেরামত বা যে কোনো সেবা খুঁজুন...',
  className,
}: SearchProps) {
  const [internalVal, setInternalVal] = React.useState(value || '');
  const [isLocationOpen, setIsLocationOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState('ঢাকা (সকল এলাকা)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(internalVal, selectedLocation);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex w-full flex-col sm:flex-row items-stretch rounded-2xl sm:rounded-full border-2 border-emerald-600 bg-white p-1.5 shadow-lg transition-shadow hover:shadow-xl',
        className,
      )}
    >
      {/* Search query input */}
      <div className="relative flex flex-1 items-center px-3">
        <Search className="h-5 w-5 text-emerald-600 shrink-0 mr-2.5" />
        <input
          type="text"
          value={value !== undefined ? value : internalVal}
          onChange={(e) => {
            setInternalVal(e.target.value);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        {internalVal && (
          <button
            type="button"
            onClick={() => {
              setInternalVal('');
              onChange?.('');
            }}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Location selector trigger */}
      <div className="relative flex items-center border-t sm:border-t-0 sm:border-l border-slate-200 px-3 py-1.5 sm:py-0">
        <button
          type="button"
          onClick={() => setIsLocationOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition"
        >
          <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="truncate max-w-[130px]">{selectedLocation}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      {/* Search Submit button */}
      <button
        type="submit"
        className="mt-2 sm:mt-0 flex items-center justify-center rounded-xl sm:rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 active:bg-emerald-800 transition select-none"
      >
        খুঁজুন
      </button>

      {/* Location Selector Modal */}
      <LocationSelectorModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={(loc) => {
          setSelectedLocation(loc);
          setIsLocationOpen(false);
        }}
      />
    </form>
  );
}

export function PopularSearches({
  onSelect,
  className,
}: {
  onSelect?: (term: string) => void;
  className?: string;
}) {
  const popular = [
    'এসি সার্ভিসিং',
    'ইলেকট্রিশিয়ান',
    'প্লাম্বার',
    'হোম ক্লিনিং',
    'ফ্রিজ মেরামত',
    'রং মিস্ত্রি',
  ];

  return (
    <div className={cn('flex flex-wrap items-center gap-2 text-xs', className)}>
      <span className="flex items-center gap-1 font-semibold text-slate-500">
        <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
        জনপ্রিয় সেবা:
      </span>
      {popular.map((term) => (
        <button
          key={term}
          type="button"
          onClick={() => onSelect?.(term)}
          className="rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1 text-slate-700 transition select-none border border-slate-200/60"
        >
          {term}
        </button>
      ))}
    </div>
  );
}

export function LocationSelectorModal({
  isOpen,
  onClose,
  selectedLocation: _selectedLocation,
  onSelectLocation,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
}) {
  const divisions = [
    { name: 'ঢাকা (Dhaka)', districts: ['ঢাকা উত্তর', 'ঢাকা দক্ষিণ', 'গাজীপুর', 'নারায়ণগঞ্জ', 'সাভার'] },
    { name: 'চট্টগ্রাম (Chattogram)', districts: ['চট্টগ্রাম সদর', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী'] },
    { name: 'রাজশাহী (Rajshahi)', districts: ['রাজশাহী সদর', 'বগুড়া', 'পাবনা'] },
    { name: 'খুলনা (Khulna)', districts: ['খুলনা সদর', 'যশোর', 'কুষ্টিয়া'] },
    { name: 'সিলেট (Sylhet)', districts: ['সিলেট সদর', 'মৌলভীবাজার', 'হবিগঞ্জ'] },
    { name: 'বরিশাল (Barishal)', districts: ['বরিশাল সদর', 'পটুয়াখালী', 'ভোলা'] },
    { name: 'রংপুর (Rangpur)', districts: ['রংপুর সদর', 'দিনাজপুর', 'কুড়িগ্রাম'] },
    { name: 'ময়মনসিংহ (Mymensingh)', districts: ['ময়মনসিংহ সদর', 'জামালপুর', 'নেত্রকোণা'] },
  ];

  const [activeDivision, setActiveDivision] = React.useState(divisions[0].name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="আপনার এলাকা নির্বাচন করুন (Select Location)"
      description="আপনার নিকটস্থ বিশ্বস্ত সার্ভিস প্রোভাইডারদের খুঁজে পেতে আপনার বিভাগ ও জেলা নির্বাচন করুন।"
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Division column */}
        <div className="space-y-1.5 border-r border-slate-100 pr-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            বিভাগ (Divisions)
          </p>
          <div className="space-y-1 max-h-[250px] overflow-y-auto">
            {divisions.map((div) => (
              <button
                key={div.name}
                type="button"
                onClick={() => setActiveDivision(div.name)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition text-left',
                  activeDivision === div.name
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-700 hover:bg-slate-50',
                )}
              >
                <span>{div.name}</span>
                <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* District column */}
        <div className="space-y-1.5 pl-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            জেলা / থানা (Districts)
          </p>
          <div className="space-y-1 max-h-[250px] overflow-y-auto">
            {divisions
              .find((d) => d.name === activeDivision)
              ?.districts.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => onSelectLocation(`${activeDivision.split(' ')[0]} — ${district}`)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-600 hover:text-white transition text-left"
                >
                  <span>{district}</span>
                  <MapPin className="h-3.5 w-3.5 opacity-60" />
                </button>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

