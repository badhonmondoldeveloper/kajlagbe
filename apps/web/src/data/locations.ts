export interface DivisionCoverage {
  id: string;
  name: string;
  nameEn: string;
  activeProviders: number;
  completedJobs: number;
  districts: { name: string; isTopActive: boolean }[];
  coverageBadge: string;
}

export const DIVISIONS: DivisionCoverage[] = [
  {
    id: 'dhaka',
    name: 'ঢাকা বিভাগ',
    nameEn: 'Dhaka',
    activeProviders: 1250,
    completedJobs: 8400,
    coverageBadge: 'পূর্ণ কাভারেজ (Full Coverage)',
    districts: [
      { name: 'ঢাকা উত্তর', isTopActive: true },
      { name: 'ঢাকা দক্ষিণ', isTopActive: true },
      { name: 'গাজীপুর', isTopActive: true },
      { name: 'নারায়ণগঞ্জ', isTopActive: true },
      { name: 'সাভার', isTopActive: true },
      { name: 'মানিকগঞ্জ', isTopActive: false },
      { name: 'মুন্সীগঞ্জ', isTopActive: false },
      { name: 'নরসিংদী', isTopActive: false },
    ],
  },
  {
    id: 'chattogram',
    name: 'চট্টগ্রাম বিভাগ',
    nameEn: 'Chattogram',
    activeProviders: 640,
    completedJobs: 3900,
    coverageBadge: 'সক্রিয় কাভারেজ',
    districts: [
      { name: 'চট্টগ্রাম সদর', isTopActive: true },
      { name: 'কক্সবাজার', isTopActive: true },
      { name: 'কুমিল্লা', isTopActive: true },
      { name: 'ফেনী', isTopActive: false },
      { name: 'ব্রাহ্মণবাড়িয়া', isTopActive: false },
      { name: 'চাঁদপুর', isTopActive: false },
    ],
  },
  {
    id: 'sylhet',
    name: 'সিলেট বিভাগ',
    nameEn: 'Sylhet',
    activeProviders: 320,
    completedJobs: 1850,
    coverageBadge: 'সক্রিয় কাভারেজ',
    districts: [
      { name: 'সিলেট সদর', isTopActive: true },
      { name: 'মৌলভীবাজার', isTopActive: true },
      { name: 'হবিগঞ্জ', isTopActive: false },
      { name: 'সুনামগঞ্জ', isTopActive: false },
    ],
  },
  {
    id: 'rajshahi',
    name: 'রাজশাহী বিভাগ',
    nameEn: 'Rajshahi',
    activeProviders: 280,
    completedJobs: 1600,
    coverageBadge: 'সক্রিয় কাভারেজ',
    districts: [
      { name: 'রাজশাহী সদর', isTopActive: true },
      { name: 'বগুড়া', isTopActive: true },
      { name: 'পাবনা', isTopActive: false },
      { name: 'সিরাজগঞ্জ', isTopActive: false },
    ],
  },
  {
    id: 'khulna',
    name: 'খুলনা বিভাগ',
    nameEn: 'Khulna',
    activeProviders: 260,
    completedJobs: 1450,
    coverageBadge: 'সক্রিয় কাভারেজ',
    districts: [
      { name: 'খুলনা সদর', isTopActive: true },
      { name: 'যশোর', isTopActive: true },
      { name: 'কুষ্টিয়া', isTopActive: false },
    ],
  },
  {
    id: 'barishal',
    name: 'বরিশাল বিভাগ',
    nameEn: 'Barishal',
    activeProviders: 140,
    completedJobs: 820,
    coverageBadge: 'সম্প্রসারণ চলমান',
    districts: [
      { name: 'বরিশাল সদর', isTopActive: true },
      { name: 'পটুয়াখালী', isTopActive: false },
      { name: 'ভোলা', isTopActive: false },
    ],
  },
  {
    id: 'rangpur',
    name: 'রংপুর বিভাগ',
    nameEn: 'Rangpur',
    activeProviders: 180,
    completedJobs: 950,
    coverageBadge: 'সক্রিয় কাভারেজ',
    districts: [
      { name: 'রংপুর সদর', isTopActive: true },
      { name: 'দিনাজপুর', isTopActive: true },
      { name: 'কুড়িগ্রাম', isTopActive: false },
    ],
  },
  {
    id: 'mymensingh',
    name: 'ময়মনসিংহ বিভাগ',
    nameEn: 'Mymensingh',
    activeProviders: 160,
    completedJobs: 890,
    coverageBadge: 'সম্প্রসারণ চলমান',
    districts: [
      { name: 'ময়মনসিংহ সদর', isTopActive: true },
      { name: 'জামালপুর', isTopActive: false },
      { name: 'নেত্রকোণা', isTopActive: false },
    ],
  },
];

