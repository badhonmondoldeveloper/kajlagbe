import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Heart,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
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
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';

export default function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'বিশ্বাসযোগ্যতা ও সুরক্ষা',
      desc: 'কঠোর ভেরিফিকেশন ও স্বচ্ছতার মাধ্যমে প্রতিটি পরিবারের নিরাপত্তাকে আমরা সর্বোচ্চ গুরুত্ব দিই।',
    },
    {
      icon: Users,
      title: 'শ্রমের মর্যাদা ও ক্ষমতায়ন',
      desc: 'দক্ষ সেবাদাতাদের অর্থনৈতিক মুক্তি ও সমাজে পেশাদার সম্মান নিশ্চিত করা আমাদের অঙ্গীকার।',
    },
    {
      icon: Sparkles,
      title: 'প্রযুক্তিগত উৎকর্ষ',
      desc: 'সহজ, দ্রুত ও মোবাইল-বান্ধব সফটওয়্যার সলিউশনের মাধ্যমে সেবাপ্রাপ্তি সহজতর করা।',
    },
  ];

  return (
    <Container className="py-8 sm:py-16 space-y-12">
      <PageHeader
        title="আমাদের লক্ষ্য ও পথচলা (About KajLagbe)"
        description="বাংলাদেশ-ব্যাপী প্রতিটি ঘরে নির্ভরযোগ্য ও দক্ষ সেবাকর্মীদের সহজে পৌঁছে দেওয়ার এক অনন্য উদ্যোগ।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'আমাদের সম্পর্কে' },
            ]}
          />
        }
        badge={<Badge variant="verified">মেড ফর বাংলাদেশ</Badge>}
      />

      {/* Story Banner */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-14 space-y-6">
        <Badge variant="verified" className="bg-emerald-500 text-slate-950 font-bold">
          আমাদের ভিশন
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight max-w-3xl">
          বাংলাদেশের সেবা খাতকে প্রযুক্তির মাধ্যমে স্বচ্ছ, আধুনিক ও আস্থার প্রতীকে রূপান্তর করা।
        </h2>
        <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          দৈনন্দিন জীবনে সঠিক সময়ে দক্ষ ইলেকট্রিশিয়ান, প্লাম্বার বা মেকানিক খুঁজে পাওয়া এক দীর্ঘদিনের সমস্যা।
          একইসাথে দক্ষ সেবাদাতারা তাদের ন্যায্য পারিশ্রমিক ও নিয়মিত কাজ থেকে বঞ্চিত হন।
          <strong> KajLagbe</strong> এই দুই প্রান্তকে একটি নিরাপদ, স্বচ্ছ ও ডিজিটাল ছাতার নিচে নিয়ে এসেছে।
        </p>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">আমাদের মূল স্তম্ভসমূহ</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">যে বিশ্বাস নিয়ে আমরা প্রতিদিন কাজ করি</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Card key={idx} className="p-6 space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Nationwide Impact */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold text-slate-900">৬৪ জেলায় সম্প্রসারণ যাত্রা</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ঢাকা ও চট্টগ্রামের পাশাপাশি দেশের প্রতিটি বিভাগ ও জেলা সদরে বিশ্বস্ত সার্ভিস সেবা ছড়িয়ে দিতে আমরা নিরলসভাবে কাজ করছি।
          </p>
        </div>
        <Link href="/services">
          <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
            সেবাসমূহ দেখুন
          </Button>
        </Link>
      </div>
    </Container>
  );
}

