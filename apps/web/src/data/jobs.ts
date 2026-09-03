export interface JobPost {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  division: string;
  district: string;
  area: string;
  budgetMin: number;
  budgetMax: number;
  budgetType: 'fixed' | 'negotiable' | 'hourly';
  urgency: 'emergency' | 'today' | 'flexible';
  preferredDate: string;
  postedAt: string;
  customerName: string;
  customerVerified: boolean;
  totalProposals: number;
  description: string;
  requirements: string[];
}

export const JOBS: JobPost[] = [
  {
    id: 'job-101',
    title: '২টি স্প্লিট এসির ডিপ ওয়াশ ও গ্যাস প্রেশার চেক করা প্রয়োজন',
    category: 'এসি মেরামত ও সার্ভিসিং',
    categorySlug: 'ac-repair',
    division: 'ঢাকা',
    district: 'ঢাকা উত্তর',
    area: 'মিরপুর-১, ঢাকা',
    budgetMin: 2500,
    budgetMax: 3500,
    budgetType: 'fixed',
    urgency: 'today',
    preferredDate: 'আজ বিকেল ৫:০০ টার মধ্যে',
    postedAt: '২ ঘণ্টা আগে',
    customerName: 'তানভীর আহমেদ',
    customerVerified: true,
    totalProposals: 4,
    description: 'আমার ফ্ল্যাটের ১.৫ টন গ্রী ইনভার্টার এবং ১ টন জেনারেল এসির ইনডোর ও আউটডোর ডিপ ওয়াশ করাতে হবে। বাতাস ঠান্ডা কম হচ্ছে, গ্যাস লেভেল মেপে দেখতে হবে। অভিজ্ঞ টেকনিশিয়ান দরকার।',
    requirements: [
      'হাই প্রেশার জেট ওয়াশ পাম্প সাথে থাকতে হবে',
      'প্রয়োজনীয় গ্যাসমাপক মিটার থাকতে হবে',
      'কাজের পর এরিয়া পরিষ্কার রাখতে হবে',
    ],
  },
  {
    id: 'job-102',
    title: 'মেইন ডিবি বক্সে শর্ট সার্কিট ও ব্রেকার ট্রিপিং সমস্যা সমাধান',
    category: 'ইলেকট্রিশিয়ান ও ওয়্যারিং',
    categorySlug: 'electrician',
    division: 'ঢাকা',
    district: 'ঢাকা দক্ষিণ',
    area: 'ধানমন্ডি ১৫ (পুরাতন), ঢাকা',
    budgetMin: 800,
    budgetMax: 1500,
    budgetType: 'negotiable',
    urgency: 'emergency',
    preferredDate: 'জরুরী (যত দ্রুত সম্ভব)',
    postedAt: '৪৫ মিনিট আগে',
    customerName: 'ড. ফারহানা চৌধুরী',
    customerVerified: true,
    totalProposals: 6,
    description: 'হঠাৎ করে বাসার ৩টি রুমের লাইট-ফ্যান বন্ধ হয়ে গেছে এবং মেইন ব্রেকার অন করলেই আবার স্পার্ক করে ট্রিপ করছে। জরুরি ভিত্তিতে একজন লাইসেন্সধারী ইলেকট্রিশিয়ান প্রয়োজন।',
    requirements: [
      'শর্ট সার্কিট ডিটেক্টর বা সঠিক টুলস থাকতে হবে',
      'দ্রুত ৩০ মিনিটের মধ্যে পৌঁছাতে হবে',
    ],
  },
  {
    id: 'job-103',
    title: 'বাথরুমের বেসিন পাইপ লিকেজ ও নতুন কমোড ফ্লাশ ভালভ ফিটিং',
    category: 'প্লাম্বিং ও পাইপ ফিটিং',
    categorySlug: 'plumbing',
    division: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম সদর',
    area: 'নাসিরাবাদ হাউজিং, চট্টগ্রাম',
    budgetMin: 1200,
    budgetMax: 2000,
    budgetType: 'fixed',
    urgency: 'today',
    preferredDate: 'আগামীকাল সকাল ১০:০০ টা',
    postedAt: '৩ ঘণ্টা আগে',
    customerName: 'রেজাউল করিম',
    customerVerified: true,
    totalProposals: 2,
    description: 'মাস্টার বাথরুমের বেসিনের নিচে পানি লিক করছে এবং কমোডের পুশ ফ্লাশ কাজ করছে না। পার্টস প্রয়োজন হলে আমি কিনে দেব অথবা মিস্ত্রি মেমো দিলে পেমেন্ট করব।',
    requirements: ['স্যানিটারি কাজের অভিজ্ঞতা থাকতে হবে', 'ওয়াটারপ্রুফ থ্রেড টেপ ও সিলিকন ব্যবহার করতে হবে'],
  },
  {
    id: 'job-104',
    title: 'নতুন ফ্ল্যাটে ৩টি বেডরুম ও কিচেন সম্পূর্ণ ডিপ ক্লিনিং',
    category: 'হোম ও অফিস ক্লিনিং',
    categorySlug: 'cleaning',
    division: 'ঢাকা',
    district: 'ঢাকা উত্তর',
    area: 'উত্তরা সেক্টর-১১, ঢাকা',
    budgetMin: 4500,
    budgetMax: 6500,
    budgetType: 'fixed',
    urgency: 'flexible',
    preferredDate: 'শুক্রবার সকাল ৯:০০ টা',
    postedAt: '৫ ঘণ্টা আগে',
    customerName: 'সাবরিনা জাহান',
    customerVerified: true,
    totalProposals: 5,
    description: '১৬০০ স্কয়ারফুটের নতুন ফ্ল্যাটে ওঠার আগে ফ্লোর স্ক্রাবিং, থাই গ্লাস ক্লিনিং, কিচেন টাইলস ও ৩টি বাথরুমের সম্পূর্ণ ডিপ ক্লিনিং প্রয়োজন। ২-৩ জনের টিম কাম্য।',
    requirements: [
      'নিজস্ব ভ্যাকুয়াম ও ক্লিনিং ইকুইপমেন্ট থাকতে হবে',
      'টিম মেম্বারদের NID ভেরিফিকেশন বাধ্যতামূলক',
    ],
  },
  {
    id: 'job-105',
    title: 'স্যামসাং ডাবল ডোর ফ্রিজের কুলিং বন্ধ হয়ে গেছে — কম্প্রেসার চেক',
    category: 'ফ্রিজ, টিভি ও হোম অ্যাপ্লায়েন্স',
    categorySlug: 'appliance-repair',
    division: 'সিলেট',
    district: 'সিলেট সদর',
    area: 'উপশহর ব্লক-ডি, সিলেট',
    budgetMin: 1500,
    budgetMax: 3000,
    budgetType: 'negotiable',
    urgency: 'today',
    preferredDate: 'আজ দুপুর ২:০০ টার মধ্যে',
    postedAt: '১ ঘণ্টা আগে',
    customerName: 'মোশাররফ হোসেন',
    customerVerified: false,
    totalProposals: 3,
    description: 'ফ্রিজের লাইট জ্বলছে কিন্তু কোনো বরফ জমছে না বা ঠান্ডা হচ্ছে না। সম্ভবত রিলে বা গ্যাস জনিত সমস্যা। বাসায় এসে চেক করতে হবে।',
    requirements: ['ইনভার্টার ফ্রিজ মেরামতের অভিজ্ঞতা থাকতে হবে'],
  },
];

