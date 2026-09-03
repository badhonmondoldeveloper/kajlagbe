export interface SubService {
  id: string;
  name: string;
  priceRange: string;
  unit: string;
  description: string;
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  group: 'home' | 'appliance' | 'technology' | 'vehicle' | 'business';
  icon: string;
  color: string;
  providerCount: number;
  startingPrice: number;
  popular: boolean;
  subservices: SubService[];
  benefits: string[];
  safetyTips: string[];
  faq: { question: string; answer: string }[];
}

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'ac-repair',
    slug: 'ac-repair',
    title: 'এসি মেরামত ও সার্ভিসিং',
    titleEn: 'AC Repair & Servicing',
    description: 'বাসা ও অফিসের সকল ব্র্যান্ডের স্প্লিট, উইন্ডো ও ক্যাসেট এসি ইনস্টলেশন, গ্যাস রিফিল, ডিপ ওয়াশ ও ইলেকট্রিক সমস্যা সমাধান।',
    group: 'appliance',
    icon: 'Flame',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    providerCount: 145,
    startingPrice: 800,
    popular: true,
    subservices: [
      { id: 'ac-basic-wash', name: 'এসি বেসিক ওয়াশ (ইনডোর ও আউটডোর)', priceRange: '৳ ৮০০ - ১,২০০', unit: 'প্রতি ইউনিট', description: 'ফিল্টার ক্লিনিং, ড্রেন ওয়াশ ও ব্লোয়ার চেক।', popular: true },
      { id: 'ac-deep-jet-wash', name: 'এসি ডিপ জেট ওয়াশ (ডিসমন্টলিং সহ)', priceRange: '৳ ১,৫০০ - ২,২০০', unit: 'প্রতি ইউনিট', description: 'হাই-প্রেশার পাম্প দ্বারা সম্পূর্ণ ইন্টারনাল কয়েল ও ব্লেড পরিষ্কার।', popular: true },
      { id: 'ac-gas-refill', name: 'এসি গ্যাস রিফিল (R22 / R410A / R32)', priceRange: '৳ ২,০০০ - ৪,৫00', unit: 'গ্যাস টাইপ অনুযায়ী', description: 'লিক ডিটেকশন, প্রেসার চেক ও সম্পূর্ণ রেফ্রিজারেন্ট রিফিল।', popular: true },
      { id: 'ac-installation', name: 'এসি আন-ইনস্টলেশন ও নতুন ফিটিং', priceRange: '৳ ২,৫০০ - ৪,০০০', unit: 'প্রতি ইউনিট', description: 'প্যাকিং, পাইপিং, ড্রিলিং ও হ্যাঙ্গার সেটআপ।' },
      { id: 'ac-circuit-repair', name: 'ইনভার্টার পিসিবি ও সার্কিট মেরামত', priceRange: '৳ ১,৮০০ - ৫,০০০', unit: 'সমস্যা অনুযায়ী', description: 'মাদারবোর্ড সমস্যা, ক্যাপাসিটর চেঞ্জ ও সেন্সর ফিক্স।' },
    ],
    benefits: [
      '১০০% অভিজ্ঞ ও সার্টিফাইড এসি টেকনিশিয়ান',
      'সার্ভিস পরবর্তী ৭ দিনের রি-ওয়ার্ক গ্যারান্টি',
      'ন্যায্য পার্টস মূল্য তালিকা ও কোনো গোপন চার্জ নেই',
      'জরুরী প্রয়োজনে ৩০ মিনিটে দ্রুত রেসপন্স',
    ],
    safetyTips: [
      'সার্ভিস শুরুর আগে টেকনিশিয়ানের কাজ লাগবে NID ভেরিফিকেশন যাচাই করুন।',
      'গ্যাস রিফিল করার আগে টেকনিশিয়ানের প্রেসার মিটারের রিডিং স্বচক্ষে দেখে নিন।',
      'কাজ সম্পূর্ণ হওয়ার পর ১৫ মিনিট এসি চালু রেখে সন্তুষ্ট হলে পেমেন্ট সম্পন্ন করুন।',
    ],
    faq: [
      { question: 'এসি সার্ভিসিং করাতে কত সময় লাগতে পারে?', answer: 'সাধারণত একটি এসির বেসিক ওয়াশে ৩০-৪৫ মিনিট এবং ডিপ জেট ওয়াশে প্রায় ১ থেকে ১.৫ ঘণ্টা সময় লাগে।' },
      { question: 'গ্যাস লিকেজ চেক করার জন্য কি অতিরিক্ত চার্জ দিতে হয়?', answer: 'প্রাথমিক ইন্সপেকশন ফি এর মধ্যেই লিকেজ চেকিং অন্তর্ভুক্ত থাকে। তবে পার্টস মেরামত বা ওয়েল্ডিং প্রয়োজন হলে টেকনিশিয়ান পূর্বেই বাজেট জানাবেন।' },
      { question: 'ইনভার্টার এসির সার্ভিসিং কি স্বাভাবিক এসির চেয়ে আলাদা?', answer: 'হ্যাঁ, ইনভার্টার এসির সার্কিট এবং সেন্সর অত্যন্ত সংবেদনশীল। আমাদের কাছে অভিজ্ঞ ইনভার্টার স্পেশালিস্ট টেকনিশিয়ান রয়েছে।' },
    ],
  },
  {
    id: 'electrician',
    slug: 'electrician',
    title: 'ইলেকট্রিশিয়ান ও ওয়্যারিং',
    titleEn: 'Electrician & Wiring',
    description: 'শর্ট সার্কিট সমাধান, ফ্যান/লাইট ফিটিং, মেইন সুইচবোর্ড, ডিবি বক্স ও সম্পূর্ণ বাড়ির নিরাপদ ইলেকট্রিক্যাল ওয়্যারিং।',
    group: 'home',
    icon: 'Zap',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    providerCount: 380,
    startingPrice: 350,
    popular: true,
    subservices: [
      { id: 'short-circuit-fix', name: 'জরুরী শর্ট সার্কিট ও লোডশেডিং ফিক্স', priceRange: '৳ ৫০০ - ১,৫০০', unit: 'সমস্যা ভিত্তিক', description: 'দ্রুত লাইন ট্রেসিং ও ব্রেকার ফল্ট সমাধান।', popular: true },
      { id: 'fan-light-fitting', name: 'সিলিং ফ্যান, ঝাড়বাতি ও লাইট ফিটিং', priceRange: '৳ ৩০০ - ৮০০', unit: 'প্রতি পিস', description: 'সিলিং ড্রিলিং, রেগুলেটর সংযোগ ও ফ্যান ব্যালেন্সিং।' },
      { id: 'switchboard-repair', name: 'সুইচ বোর্ড ও সকেট ইনস্টলেশন', priceRange: '৳ ৩০০ - ৬০০', unit: 'প্রতি বোর্ড', description: 'গ্যাং সুইচ, পাওয়ার সকেট ও আর্থিং কানেকশন।' },
      { id: 'full-house-wiring', name: 'নতুন ফ্ল্যাট বা বিল্ডিং ওয়্যারিং', priceRange: '৳ ১৫ - ৩০', unit: 'প্রতি বর্গফুট', description: 'পাইপ লেইং, ক্যাবল ড্রয়িং, ডিবি ড্রেসিং ও সম্পূর্ণ সেটআপ।' },
      { id: 'generator-ips-setup', name: 'আইপিএস ও জেনারেটর সংযোগ', priceRange: '৳ ১,২০০ - ২,৫০০', unit: 'প্রতি ডিভাইস', description: 'ব্যাটারি কানেকশন, ইনভার্টার সেটআপ ও চেঞ্জওভার সুইচ।' },
    ],
    benefits: [
      'নিরাপত্তা ফার্স্ট — সঠিক আর্থিং ও হাই-গ্রেড ক্যাবলিং গাইডেন্স',
      'বাংলাদেশ পল্লী বিদ্যুৎ / ডেসকো অনুমোদিত লাইসেন্সধারী টেকনিশিয়ান',
      'জরুরী ২৪/৭ সেবা পাওয়ার সুযোগ',
    ],
    safetyTips: [
      'টেকনিশিয়ান কাজ শুরুর আগে মেইন ব্রেকার অফ করা নিশ্চিত করুন।',
      'বৈদ্যুতিক কাজের সময় ফ্লোরে পানি থাকলে সাবধানে চলাফেরা করুন।',
    ],
    faq: [
      { question: 'হঠাৎ মেইন ব্রেকার ট্রিপ করলে কি করব?', answer: 'সকল বড় লোডের অ্যাপ্লায়েন্স বন্ধ করুন এবং সরাসরি জরুরি ইলেকট্রিশিয়ান বুকিং দিন। নিজে হাত দেওয়া থেকে বিরত থাকুন।' },
    ],
  },
  {
    id: 'plumbing',
    slug: 'plumbing',
    title: 'প্লাম্বিং ও পাইপ ফিটিং',
    titleEn: 'Plumbing & Pipe Fitting',
    description: 'পানির পাইপ লিক মেরামত, বেসিন/কমোড ইনস্টলেশন, মোটর পাম্প সমস্যা, গিজার লাইন ও পানির ট্যাংক পরিষ্কার।',
    group: 'home',
    icon: 'Wrench',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    providerCount: 220,
    startingPrice: 400,
    popular: true,
    subservices: [
      { id: 'leakage-repair', name: 'পাইপ লিক ও পানির কল মেরামত', priceRange: '৳ ৪০০ - ৮০০', unit: 'প্রতি পয়েন্ট', description: 'ওয়াল লিক ফিক্স, ট্যাপ চেঞ্জ ও থ্রেড সিলিং।', popular: true },
      { id: 'commode-basin-fit', name: 'কমোড, বেসিন ও শাওয়ার ফিটিং', priceRange: '৳ ১,০০০ - ২,২০০', unit: 'প্রতি সেট', description: 'স্যানিটারি ওয়্যার ইনস্টলেশন ও সিলিকন ওয়াটারপ্রুফিং।' },
      { id: 'water-pump-fix', name: 'পানির মোটর পাম্প সমস্যা সমাধান', priceRange: '৳ ১,২০০ - ২,৫০০', unit: 'প্রতি মোটর', description: 'ক্যাপাসিটর চেঞ্জ, ইম্পেলার জ্যাম দূরীকরণ ও বেয়ারিং সার্ভিস।' },
      { id: 'water-tank-wash', name: 'পানির রিজার্ভার ও ছাদের ট্যাংক ওয়াশ', priceRange: '৳ ১,৫০০ - ৩,৫০০', unit: 'ক্যাপাসিটি অনুযায়ী', description: 'ব্লিচিং ও প্রেশার ওয়াশ দ্বারা শৈবাল ও ময়লা পরিষ্কার।' },
    ],
    benefits: ['ওয়াটারপ্রুফ গ্যারান্টি', 'উন্নত মানের পিভিসি ও জিআই ফিটিংস অভিজ্ঞতা', 'পরিষ্কার পরিচ্ছন্ন সার্ভিস'],
    safetyTips: ['লিকের স্থানে ইলেকট্রিক তার থাকলে অবিলম্বে মেইন সুইচ বন্ধ করুন।'],
    faq: [{ question: 'ট্যাংক ওয়াশের পর কতক্ষণ পানি ব্যবহার বন্ধ রাখতে হবে?', answer: 'জীবাণুনাশক শুকানোর জন্য ট্যাংক পরিষ্কারের পর ২-৩ ঘণ্টা পর পানি ভরা উত্তম।' }],
  },
  {
    id: 'cleaning',
    slug: 'cleaning',
    title: 'হোম ও অফিস ক্লিনিং',
    titleEn: 'Home & Office Cleaning',
    description: 'ডিপ হোম ক্লিনিং, কিচেন ও বাথরুম ডিপ ওয়াশ, সোফা-ম্যাট্রেস শ্যাম্পু ওয়াশ ও কর্পোরেট ফ্লোর পলিশিং।',
    group: 'home',
    icon: 'Sparkles',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    providerCount: 160,
    startingPrice: 1200,
    popular: true,
    subservices: [
      { id: 'deep-home-clean', name: 'সম্পূর্ণ বাসা ডিপ ক্লিনিং (ফুল ফ্ল্যাট)', priceRange: '৳ ৩,৫০০ - ৮,০০০', unit: 'স্কয়ারফিট অনুযায়ী', description: 'ফ্লোর স্ক্রাবিং, ফ্যান-জানালা ওয়াশ ও ঝুল পরিষ্কার।', popular: true },
      { id: 'bathroom-deep-wash', name: 'বাথরুম টাইলস ও কমোড ডিপ স্কেলিং', priceRange: '৳ ১,০০০ - ১,৮০০', unit: 'প্রতি বাথরুম', description: 'কঠিন দাগ, মরিচা ও আয়রন রিমুভাল ট্রিটমেন্ট।' },
      { id: 'sofa-carpet-wash', name: 'সোফা, কার্পেট ও ম্যাট্রেস ফোম ওয়াশ', priceRange: '৳ ৩০০ - ৫০০', unit: 'প্রতি সিট', description: 'ভ্যাকুয়াম ও অ্যান্টিব্যাকটেরিয়াল শ্যাম্পু ওয়াশ।' },
    ],
    benefits: ['পরিবেশবান্ধব ও অ্যালার্জি-মুক্ত কেমিক্যাল', 'প্রফেশনাল ক্লিনিং ইকুইপমেন্ট ও ভ্যাকুয়াম', 'পুলিশ ভেরিফাইড ক্লিনার টিম'],
    safetyTips: ['মূল্যবান গয়না ও গুরুত্বপূর্ণ কাগজপত্র ক্লিনিং এর আগে নিরাপদ স্থানে রাখুন।'],
    faq: [{ question: 'ক্লিনিং এর সময় কি নিজেদের কোন উপাদান দিতে হবে?', answer: 'না, আমাদের টিম সকল কেমিক্যাল, মেশিনারি ও পরিষ্কারের সরঞ্জাম সাথে নিয়ে আসবে।' }],
  },
  {
    id: 'appliance-repair',
    slug: 'appliance-repair',
    title: 'ফ্রিজ, টিভি ও হোম অ্যাপ্লায়েন্স',
    titleEn: 'Appliance Repair',
    description: 'রেফ্রিজারেটর, ওয়াশিং মেশিন, মাইক্রোওয়েভ ওভেন, ব্লেন্ডার ও এলইডি টিভি বিশেষজ্ঞ মেরামত সেবা।',
    group: 'appliance',
    icon: 'Wrench',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    providerCount: 190,
    startingPrice: 500,
    popular: true,
    subservices: [
      { id: 'fridge-cooling-fix', name: 'ফ্রিজ গ্যাস চার্জ ও কুলিং সমস্যা', priceRange: '৳ ১,৫০০ - ৩,৮০০', unit: 'সমস্যা ভিত্তিক', description: 'কম্প্রেসার চেক, রিলে ও থার্মোস্ট্যাট সমাধান।', popular: true },
      { id: 'washing-machine-fix', name: 'ওয়াশিং মেশিন ড্রেন ও মোটর ফল্ট', priceRange: '৳ ১,২০০ - ২,৫০০', unit: 'সমস্যা ভিত্তিক', description: 'স্পিন সমস্যা, বেল্ট চেঞ্জ ও পিসিবি রিপেয়ার।' },
      { id: 'microwave-repair', name: 'মাইক্রোওয়েভ ওভেন হিটিং সমাধান', priceRange: '৳ ৮০০ - ১,৮০০', unit: 'সমস্যা ভিত্তিক', description: 'ম্যাগনেট্রন, ফিউজ ও টাচ প্যানেল ফিক্স।' },
    ],
    benefits: ['জেনুইন স্পেয়ার পার্টস রিপ্লেসমেন্ট', '৭ দিনের ওয়ারেন্টি', 'বাসায় বসে স্পট রিপেয়ারিং'],
    safetyTips: ['খোলার সময় আসল পার্টস এবং নতুন পার্টসের সিল নিশ্চিত করুন।'],
    faq: [{ question: 'টিভি বা ফ্রিজ কি দোকানে নিয়ে যেতে হবে?', answer: '৯০% কাজ আপনার বাসায় বসেই সম্পন্ন করা হয়। বিশেষ জটিলতার ক্ষেত্রে রসিদ দিয়ে ল্যাবে নেওয়া হয়।' }],
  },
  {
    id: 'carpenter',
    slug: 'carpenter',
    title: 'কাঠের কাজ ও ফার্নিচার মেরামত',
    titleEn: 'Carpenter & Furniture Repair',
    description: 'ফার্নিচার ফিটিং, ড্রয়ার/লক মেরামত, দরজা-জানালা ফিটিং, কিচেন ক্যাবিনেট ও কাঠের পলিশ।',
    group: 'home',
    icon: 'Hammer',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    providerCount: 175,
    startingPrice: 450,
    popular: false,
    subservices: [
      { id: 'furniture-assembly', name: 'রেডিমেড ও ফ্ল্যাটপ্যাক ফার্নিচার ফিটিং', priceRange: '৳ ৫০০ - ১,৫০০', unit: 'প্রতি আইটেম', description: 'ওটেরবি, হাতিল, ব্রাদার্স সহ সব ব্র্যান্ডের ফিটিং।' },
      { id: 'lock-door-repair', name: 'দরজার লক ও কব্জা মেরামত', priceRange: '৳ ৪০০ - ৮০০', unit: 'প্রতি দরজা', description: 'লক রিপ্লেসমেন্ট, শাটার এডজাস্টমেন্ট।' },
      { id: 'wood-polishing', name: 'কাঠের ফার্নিচার পলিশ ও রি-ফিনিশ', priceRange: '৳ ৫০ - ৯০', unit: 'প্রতি স্কয়ারফিট', description: 'হ্যান্ড পলিশ ও স্প্রে বার্নিশ কোটিং।' },
    ],
    benefits: ['নিখুঁত কারুকাজ', 'মজবুত কাঠ ও টেকসই স্ক্রু ব্যবহার', 'সময়মতো কাজ সম্পন্ন'],
    safetyTips: ['পলিশিং করার সময় পর্যাপ্ত বায়ু চলাচল নিশ্চিত করুন।'],
    faq: [{ question: 'কাস্টম সাইজের আলমারি বা শোকেস বানানো কি সম্ভব?', answer: 'হ্যাঁ, আমাদের মাস্টার কার্পেন্টাররা মাপ নিয়ে আপনার পছন্দের ডিজাইন অনুযায়ী তৈরি করে দেবে।' }],
  },
  {
    id: 'shifting',
    slug: 'shifting',
    title: 'বাসা বদল ও পরিবহন (Shifting)',
    titleEn: 'Home Shifting & Logistics',
    description: 'নিরাপদ বাসা ও অফিস শিফটিং, দক্ষ লোডিং-আনলোডিং শ্রমিক, পিকআপ/ট্রাক ও ফার্নিচার র‍্যাপিং।',
    group: 'vehicle',
    icon: 'Truck',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    providerCount: 95,
    startingPrice: 3500,
    popular: true,
    subservices: [
      { id: 'house-shifting-full', name: 'সম্পূর্ণ বাসা বদল (প্যাকিং সহ)', priceRange: '৳ ৪,০০০ - ১৫,০০০', unit: 'বাসার আয়তন অনুযায়ী', description: 'বাবল র‍্যাপ প্যাকিং, লোডিং, পরিবহন ও আনপ্যাকিং।', popular: true },
      { id: 'pickup-rental', name: 'পিকআপ ও ট্রাক ভাড়া (ড্রাইভার সহ)', priceRange: '৳ ১,৫০০ - ৪,০০০', unit: 'ট্রিপ অনুযায়ী', description: '৭ ফিট, ৯ ফিট ও ১৪ ফিট কাভার্ড ভ্যান।' },
    ],
    benefits: ['ভাঙা-চোরা রোধে স্পেশাল বাবল প্রটেকশন', 'অভিজ্ঞ লোডার টিম', 'সঠিক সময়ে গন্তব্যে পৌঁছানো'],
    safetyTips: ['কাঁচের জিনিসপত্র ও ইলেকট্রনিক্স আলাদা চিহ্নিত করে রাখুন।'],
    faq: [{ question: 'শিফটিং এর কতদিন আগে বুকিং দেওয়া উচিত?', answer: 'কমপক্ষে ২-৩ দিন আগে বুকিং দিলে সঠিক মাপের ট্রাক ও দক্ষ টিম নিশ্চিত করা সহজ হয়।' }],
  },
  {
    id: 'painting',
    slug: 'painting',
    title: 'রং মিস্ত্রি ও দেয়াল ডেকোরেশন',
    titleEn: 'Painting & Decoration',
    description: 'দেয়ালের ড্যামেজ রিপেয়ার, পুটিং, প্লাস্টিক পেইন্ট, ওয়াটারপ্রুফিং ও প্রিমিয়াম লাক্সারি ফিনিশ।',
    group: 'home',
    icon: 'Paintbrush',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    providerCount: 130,
    startingPrice: 15,
    popular: false,
    subservices: [
      { id: 'interior-painting', name: 'ইনডোর দেয়াল পেইন্টিং ও পুটিং', priceRange: '৳ ১০ - ২৫', unit: 'প্রতি স্কয়ারফিট', description: 'বার্জার, এশিয়ান পেইন্টস সহ সকল কোয়ালিটি কালার কোটিং।' },
      { id: 'damp-proofing', name: 'দেয়ালের ড্যাম্প ও লোনা প্রতিরোধ', priceRange: '৳ ৩৫ - ৬০', unit: 'প্রতি স্কয়ারফিট', description: 'কেমিক্যাল সিলেন্ট ও ওয়াটারপ্রুফ বেস লেয়ার।' },
    ],
    benefits: ['রং ছিটকে নষ্ট না হওয়ার জন্য ফ্লোর কভারিং', 'স্মুথ ও নিখুঁত ফিনিশিং', 'রঙের সঠিক পরামর্শ'],
    safetyTips: ['পেইন্টিং শেষ হওয়ার পর ১ দিন রুমের দরজা-জানালা খোলা রাখুন।'],
    faq: [{ question: 'রং কি আমাদের কিনতে হবে না মিস্ত্রি কিনে দেবে?', answer: 'আপনি চাইলে নিজে কিনে দিতে পারেন অথবা প্রোভাইডার মেমো অনুযায়ী জেনুইন দোকানে পাইকারি মূল্যে কিনে দেবে।' }],
  },
];

