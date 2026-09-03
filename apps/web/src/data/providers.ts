export interface ProviderReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  serviceType: string;
}

export interface ProviderPortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description: string;
  completedDate: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  avatarUrl?: string;
  title: string;
  category: string;
  categorySlug: string;
  division: string;
  district: string;
  area: string;
  fullLocation: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experienceYears: number;
  trustScore: number;
  responseRate: number;
  avgResponseTime: string;
  isAvailable: boolean;
  isNidVerified: boolean;
  isPoliceVerified: boolean;
  isTradeLicenseVerified: boolean;
  isTopRated: boolean;
  hourlyRate?: number;
  startingPrice: number;
  bio: string;
  skills: string[];
  servicesOffered: { title: string; price: string; description: string }[];
  portfolio: ProviderPortfolioItem[];
  reviews: ProviderReview[];
  emergencyAvailable: boolean;
}

export const PROVIDERS: Provider[] = [
  {
    id: 'prov-001',
    slug: 'md-rafiqul-islam-ac-expert',
    name: 'মো. রফিকুল ইসলাম',
    title: 'সিনিয়র এসি ও রেফ্রিজারেশন স্পেশালিস্ট',
    category: 'এসি মেরামত ও সার্ভিসিং',
    categorySlug: 'ac-repair',
    division: 'ঢাকা',
    district: 'ঢাকা উত্তর',
    area: 'মিরপুর, গুলশান, বনানী, উত্তরা',
    fullLocation: 'মিরপুর-১০, ঢাকা (সমগ্র ঢাকা উত্তর)',
    rating: 4.9,
    reviewCount: 142,
    completedJobs: 260,
    experienceYears: 8,
    trustScore: 99,
    responseRate: 98,
    avgResponseTime: '১৫ মিনিট',
    isAvailable: true,
    isNidVerified: true,
    isPoliceVerified: true,
    isTradeLicenseVerified: true,
    isTopRated: true,
    startingPrice: 800,
    emergencyAvailable: true,
    bio: 'দীর্ঘ ৮ বছর ধরে ডাইকিন, জেনারেল, গ্রী ও ওয়ালটন এসির জটিল সার্কিট ও গ্যাস লিকেজ সমাধানে কাজ করছি। সততা, সঠিক যন্ত্রপাতি ও স্বচ্ছ মূল্যে গ্রাহকের কাজ সম্পন্ন করাই আমার লক্ষ্য।',
    skills: ['ইনভার্টার পিসিবি রিপেয়ার', 'হাই-প্রেশার ডিপ জেট ওয়াশ', 'R410A / R32 গ্যাস চার্জ', 'কপার পাইপ ব্রেজিং', 'ফল্ট কোড ডায়াগনস্টিকস'],
    servicesOffered: [
      { title: 'এসি ডিপ জেট ওয়াশ (ইনডোর + আউটডোর)', price: '৳ ১,৫০০', description: 'হাই প্রেশার পাম্প দ্বারা ডিসমন্টলিং সহ জীবাণুমুক্ত ওয়াশ।' },
      { title: 'জরুরী এসি গ্যাস চার্জ ও লিক ফিক্স', price: '৳ ২,৫০০', description: 'নাইট্রোজেন প্রেশার টেস্ট ও ফুল গ্যাস রিফিল।' },
      { title: 'এসি নতুন ফিটিং ও ড্রিলিং', price: '৳ ২,০০০', description: 'কপার পাইপিং সহ ব্যালেন্সড মাউন্টিং।' },
    ],
    portfolio: [
      { id: 'port-1', title: 'গুলশানে ৩টি ইনভার্টার এসি ডিপ ক্লিনিং', category: 'ডিপ ওয়াশ', description: '১০ বছরের পুরনো কয়েল রিস্টোরেশন ও এয়ারফ্লো বৃদ্ধি।', completedDate: 'আগস্ট ২০২৬' },
      { id: 'port-2', title: 'উত্তরায় অফিস এসি পিসিবি মেরামত', category: 'সার্কিট ফিক্স', description: 'মেইন প্রসেসর আইসি রিপ্লেসমেন্ট ও ওভারহিট সমস্যার সমাধান।', completedDate: 'জুলাই ২০২৬' },
    ],
    reviews: [
      { id: 'rev-1', author: 'কামরুল হাসান (গুলশান)', rating: 5, date: '২৮ আগস্ট ২০২৬', serviceType: 'এসি ডিপ ওয়াশ', comment: 'রফিকুল ভাই অত্যন্ত বিনয়ী ও পেশাদার। এসির ঠান্ডা বাতাস দ্বিগুণ হয়েছে। কোনো অপ্রয়োজনীয় পার্টস পরিবর্তনের চাপ দেননি।' },
      { id: 'rev-2', author: 'সাদিয়া আক্তার (মিরপুর)', rating: 5, date: '১৫ আগস্ট ২০২৬', serviceType: 'গ্যাস রিফিল', comment: 'কল দেওয়ার ২০ মিনিটের মধ্যে চলে এসেছেন। গ্যাস ভরার মিটার নিজে দেখিয়ে দিয়েছেন। ধন্যবাদ KajLagbe প্ল্যাটফর্মকে।' },
    ],
  },
  {
    id: 'prov-002',
    slug: 'abdul-karim-master-electrician',
    name: 'আব্দুল করিম',
    title: 'মাস্টার ইলেকট্রিশিয়ান ও ওয়্যারিং এক্সপার্ট',
    category: 'ইলেকট্রিশিয়ান ও ওয়্যারিং',
    categorySlug: 'electrician',
    division: 'ঢাকা',
    district: 'ঢাকা দক্ষিণ',
    area: 'ধানমন্ডি, মোহাম্মদপুর, লালমাটিয়া, পান্থপথ',
    fullLocation: 'ধানমন্ডি, ঢাকা (সমগ্র ঢাকা দক্ষিণ)',
    rating: 4.8,
    reviewCount: 98,
    completedJobs: 185,
    experienceYears: 6,
    trustScore: 98,
    responseRate: 99,
    avgResponseTime: '১০ মিনিট',
    isAvailable: true,
    isNidVerified: true,
    isPoliceVerified: true,
    isTradeLicenseVerified: false,
    isTopRated: true,
    startingPrice: 350,
    emergencyAvailable: true,
    bio: 'ডেসকো সার্টিফাইড অভিজ্ঞ ইলেকট্রিশিয়ান। বাসা-বাড়ির শর্ট সার্কিট, ডিবি বোর্ড ড্রেসিং, আইপিএস লাইন ও আধুনিক লাইটিং ফিটিংয়ে স্পেশালিস্ট।',
    skills: ['শর্ট সার্কিট ট্রেসিং', 'ডিবি বক্স ড্রেসিং', 'আইপিএস ও জেনারেটর কানেকশন', 'ঝাড়বাতি ও এলইডি প্রোফাইল লাইটিং', 'থ্রি-ফেজ লোড ক্যালকুলেশন'],
    servicesOffered: [
      { title: 'জরুরী শর্ট সার্কিট সমাধান', price: '৳ ৬০০', description: 'দ্রুত লাইন ট্রেসিং ও ব্রেকার ট্রিপিং ফিক্স।' },
      { title: 'সুইচবোর্ড ও ফ্যান ইনস্টলেশন', price: '৳ ৩০০', description: 'গ্যাং সুইচ, রেগুলেটর ও সিলিং ফিটিং।' },
      { title: 'আইপিএস কানেকশন ও ফল্ট ফিক্স', price: '৳ ১,২০০', description: 'ব্যাটারি ওয়াটার চেক ও ফুল লোড টেস্টিং।' },
    ],
    portfolio: [
      { id: 'port-3', title: 'ধানমন্ডিতে ডুপ্লেক্স বাড়ির লাইটিং সেটআপ', category: 'ওয়্যারিং', description: 'স্মার্ট অটোমেশন ও প্রোফাইল লাইট ইন্সটলেশন।', completedDate: 'আগস্ট ২০২৬' },
    ],
    reviews: [
      { id: 'rev-3', author: 'তানভীর আহমেদ (ধানমন্ডি)', rating: 5, date: '২২ আগস্ট ২০২৬', serviceType: 'শর্ট সার্কিট ফিক্স', comment: 'মধ্যরাতে মেইন ব্রেকার ট্রিপ করেছিল। করিম ভাই এসে ১৫ মিনিটে সমস্যা ঠিক করে দেন। লাইফ সেভার!' },
    ],
  },
  {
    id: 'prov-003',
    slug: 'hasan-mahmud-plumber',
    name: 'হাসান মাহমুদ',
    title: 'স্যানিটারি ও প্লাম্বিং ইঞ্জিনিয়ার',
    category: 'প্লাম্বিং ও পাইপ ফিটিং',
    categorySlug: 'plumbing',
    division: 'ঢাকা',
    district: 'ঢাকা উত্তর',
    area: 'উত্তরা, নিকুঞ্জ, এয়ারপোর্ট, খিলক্ষেত',
    fullLocation: 'উত্তরা সেক্টর-৪, ঢাকা',
    rating: 4.9,
    reviewCount: 215,
    completedJobs: 340,
    experienceYears: 10,
    trustScore: 100,
    responseRate: 97,
    avgResponseTime: '২০ মিনিট',
    isAvailable: true,
    isNidVerified: true,
    isPoliceVerified: true,
    isTradeLicenseVerified: true,
    isTopRated: true,
    startingPrice: 400,
    emergencyAvailable: true,
    bio: '১০ বছরের কাজের অভিজ্ঞতা। বাথরুম ফিটিংস, কমোড, বেসিন, পানির পাম্প মোটর এবং ছাদের রিজার্ভার পরিষ্কারের নির্ভরযোগ্য বিশেষজ্ঞ।',
    skills: ['হিডেন পাইপ লিকেজ ফিক্স', 'কমোড ও ফ্লাশ ভালভ ফিটিং', 'পানির মোটর পাম্প রিপেয়ার', 'গিজার ও সেন্ট্রাল হট ওয়াটার লাইন'],
    servicesOffered: [
      { title: 'হিডেন ওয়াল লিক ডিটেকশন ও ফিক্স', price: '৳ ১,২০০', description: 'দেয়াল না ভেঙে আধুনিক পদ্ধতিতে লিক সনাক্তকরণ।' },
      { title: 'পানির রিজার্ভার ও ছাদের ট্যাংক ওয়াশ', price: '৳ ২,০০০', description: 'ব্লিচিং ও প্রেশার ওয়াশার দিয়ে সম্পূর্ণ জীবানুমুক্ত ওয়াশ।' },
    ],
    portfolio: [
      { id: 'port-4', title: 'উত্তরায় বহুতল ভবনের সেন্ট্রাল প্লাম্বিং', category: 'প্লাম্বিং', description: 'সকল পাইপলাইনের প্রেশার ব্যালেন্সিং।', completedDate: 'জুন ২০২৬' },
    ],
    reviews: [
      { id: 'rev-4', author: 'ড. জামিলুর রেজা (উত্তরা)', rating: 5, date: '১০ আগস্ট ২০২৬', serviceType: 'লিক রিপেয়ার', comment: 'অসাধারণ কাজ। পানির ড্রপ পড়ার দীর্ঘদিনের সমস্যা হাসান সাহেব মুহূর্তেই সমাধান করেছেন।' },
    ],
  },
  {
    id: 'prov-004',
    slug: 'clean-zone-bd-chattogram',
    name: 'ক্লিন জোন বিডি (Chattogram)',
    title: 'প্রফেশনাল ডিপ ক্লিনিং এজেন্সি',
    category: 'হোম ও অফিস ক্লিনিং',
    categorySlug: 'cleaning',
    division: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম সদর',
    area: 'জিইসি, নাসিরাবাদ, আগ্রাবাদ, খুলশী, হালিশহর',
    fullLocation: 'জিইসি মোড়, চট্টগ্রাম',
    rating: 4.8,
    reviewCount: 76,
    completedJobs: 130,
    experienceYears: 5,
    trustScore: 97,
    responseRate: 96,
    avgResponseTime: '২৫ মিনিট',
    isAvailable: true,
    isNidVerified: true,
    isPoliceVerified: true,
    isTradeLicenseVerified: true,
    isTopRated: false,
    startingPrice: 1500,
    emergencyAvailable: false,
    bio: 'চট্টগ্রামের শীর্ষস্থানীয় পেশাদার ক্লিনিং এজেন্সি। জার্মানি থেকে আমদানিকৃত ভ্যাকুয়াম ও পরিবেশবান্ধব কেমিক্যাল দিয়ে বাসা ও কর্পোরেট অফিস ডিপ ক্লিন করি।',
    skills: ['সোফা ও কার্পেট ফোম ওয়াশ', 'বাথরুম টাইলস ডিপ স্কেলিং', 'কিচেন চিমনি ও গ্রিজ রিমুভাল', 'পোস্ট-কনস্ট্রাকশন ফুল ওয়াশ'],
    servicesOffered: [
      { title: '৩ বেডরুম ফ্ল্যাট সম্পূর্ণ ডিপ ক্লিনিং', price: '৳ ৪,৫০০', description: 'ফ্লোর স্ক্রাবিং, কিচেন, বাথরুম ও ব্যালকনি পরিষ্কার।' },
      { title: 'সোফা সেট শ্যাম্পু ওয়াশ (৫ সিটার)', price: '৳ ১,৫০০', description: 'ভ্যাকুয়াম ড্রাই ও সুগন্ধযুক্ত অ্যান্টিব্যাকটেরিয়াল ওয়াশ।' },
    ],
    portfolio: [],
    reviews: [
      { id: 'rev-5', author: 'ফারহানা ইসলাম (খুলশী)', rating: 5, date: '০৫ আগস্ট ২০২৬', serviceType: 'ডিপ ক্লিনিং', comment: 'টিমের সবার ইউনিফর্ম ও আচরণ চমৎকার ছিল। বাসা নতুনের মত চকচক করছে।' },
    ],
  },
  {
    id: 'prov-005',
    slug: 'tariqul-islam-carpenter',
    name: 'তারিকুল ইসলাম',
    title: 'মাস্টার কার্পেন্টার ও ইন্টেরিয়র ফিটার',
    category: 'কাঠের কাজ ও ফার্নিচার মেরামত',
    categorySlug: 'carpenter',
    division: 'ঢাকা',
    district: 'ঢাকা উত্তর',
    area: 'বাড্ডা, গুলশান, রামপুরা, আফতাবনগর',
    fullLocation: 'বাড্ডা, ঢাকা',
    rating: 4.7,
    reviewCount: 64,
    completedJobs: 110,
    experienceYears: 7,
    trustScore: 96,
    responseRate: 95,
    avgResponseTime: '৩০ মিনিট',
    isAvailable: true,
    isNidVerified: true,
    isPoliceVerified: false,
    isTradeLicenseVerified: false,
    isTopRated: false,
    startingPrice: 450,
    emergencyAvailable: false,
    bio: 'ফার্নিচার ফিটিং, ড্রয়ার চ্যানেল রিপ্লেসমেন্ট, দরজা লক ও কিচেন কেবিনেট তৈরির অভিজ্ঞ মিস্ত্রি। নিখুঁত মাপ ও টেকসই কাজের নিশ্চয়তা।',
    skills: ['ক্যাবিনেট ফিটিং', 'হিঞ্জেস ও চ্যানেল এডজাস্টমেন্ট', 'কাঠের বার্নিশ ও স্প্রে পলিশ'],
    servicesOffered: [
      { title: 'দরজার লক ও কব্জা ফিটিং', price: '৳ ৫০০', description: 'মজবুত স্ক্রু ও অ্যালাইনমেন্ট ঠিক করা।' },
    ],
    portfolio: [],
    reviews: [],
  },
  {
    id: 'prov-006',
    slug: 'shahidul-alam-sylhet-electrician',
    name: 'শহিদুল আলম',
    title: 'ইলেকট্রিশিয়ান ও সাবস্টেশন টেকনিশিয়ান',
    category: 'ইলেকট্রিশিয়ান ও ওয়্যারিং',
    categorySlug: 'electrician',
    division: 'সিলেট',
    district: 'সিলেট সদর',
    area: 'জিন্দাবাজার, আম্বরখানা, লামাবাজার, উপশহর',
    fullLocation: 'জিন্দাবাজার, সিলেট সদর',
    rating: 4.9,
    reviewCount: 52,
    completedJobs: 95,
    experienceYears: 9,
    trustScore: 99,
    responseRate: 98,
    avgResponseTime: '১৫ মিনিট',
    isAvailable: true,
    isNidVerified: true,
    isPoliceVerified: true,
    isTradeLicenseVerified: true,
    isTopRated: true,
    startingPrice: 400,
    emergencyAvailable: true,
    bio: 'সিলেট শহরের বিশ্বস্ত ইলেকট্রিশিয়ান। বাসা-বাড়ির ওয়্যারিং থেকে শুরু করে জেনারেটর ও আইপিএস মেরামতে দক্ষ।',
    skills: ['আইপিএস মেরামত', 'সার্কিট ব্রেকার চেঞ্জ', 'ওয়্যারিং'],
    servicesOffered: [
      { title: 'জরুরী ইলেকট্রিক চেকআপ', price: '৳ ৫০০', description: 'সমস্যা চিহ্নিতকরণ ও তাত্ক্ষণিক সমাধান।' },
    ],
    portfolio: [],
    reviews: [],
  },
];

