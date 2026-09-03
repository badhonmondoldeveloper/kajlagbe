'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Search,
  HelpCircle,
  Headphones,
  FileQuestion,
  ShieldCheck,
  CreditCard,
  User,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Input,
  Accordion,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';
import { FAQS } from '../../../data';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');

  const helpTopics = [
    { id: 'all', label: 'সকল বিষয়', icon: HelpCircle },
    { id: 'customer', label: 'গ্রাহক জিজ্ঞাসা', icon: User },
    { id: 'provider', label: 'প্রোভাইডার সহায়িকা', icon: Briefcase },
    { id: 'payment', label: 'পেমেন্ট ও রিফান্ড', icon: CreditCard },
    { id: 'safety', label: 'নিরাপত্তা ও ভেরিফিকেশন', icon: ShieldCheck },
  ];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || f.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-8 sm:py-16 space-y-12">
      <PageHeader
        title="সাহায্য কেন্দ্র (Help & Support Center)"
        description="আপনার যেকোনো জিজ্ঞাসা ও সমস্যার সমাধানে বিস্তারিত সহায়িকা এবং নির্দেশিকা।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'সাহায্য কেন্দ্র' },
            ]}
          />
        }
      />

      {/* Search Header Banner */}
      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          আমরা আপনাকে কীভাবে সাহায্য করতে পারি?
        </h2>
        <div className="max-w-md mx-auto">
          <Input
            placeholder="আপনার সমস্যা বা প্রশ্ন লিখে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Topic Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {helpTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.id}
              onClick={() => setActiveCategory(topic.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeCategory === topic.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{topic.label}</span>
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFaqs.length > 0 ? (
          <Accordion
            items={filteredFaqs.map((f, idx) => ({
              id: `h-faq-${idx}`,
              title: f.question,
              content: f.answer,
            }))}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <FileQuestion className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-medium">কোনো আর্টিকেল খুঁজে পাওয়া যায়নি।</p>
          </div>
        )}
      </div>

      {/* Still Need Help Box */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center space-y-3 max-w-2xl mx-auto">
        <Headphones className="h-8 w-8 text-emerald-600 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">সরাসরি সহায়তা প্রয়োজন?</h3>
        <p className="text-xs sm:text-sm text-slate-500">
          আমাদের কাস্টমার কেয়ার টিম প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত সক্রিয় থাকে।
        </p>
        <div className="pt-2">
          <Link href="/contact">
            <Button size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              যোগাযোগ পেজে যান
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
