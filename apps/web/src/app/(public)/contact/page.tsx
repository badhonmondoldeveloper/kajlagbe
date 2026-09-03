'use client';

import * as React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Headphones,
  Building2,
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
  Textarea,
  Select,
  Alert,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';

export default function ContactPage() {
  const [topic, setTopic] = React.useState('customer');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Container className="py-8 sm:py-16 space-y-12">
      <PageHeader
        title="যোগাযোগ ও কাস্টমার কেয়ার"
        description="আপনার যেকোনো জিজ্ঞাসা, অভিযোগ বা ব্যবসায়িক সহযোগিতার জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'যোগাযোগ' },
            ]}
          />
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information & Channels */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">অফিস ও সহায়তা ঠিকানা</h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">হেড অফিস</strong>
                  <span>লেভেল-৪, হাউজ-১২, রোড-০৭, গুলশান-১, ঢাকা-১২১২, বাংলাদেশ।</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">হটলাইন নম্বর</strong>
                  <span>+৮৮০ ৯৬১২-XXXXXX (সকাল ৯:০০ - রাত ১০:০০)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">ইমেইল সহায়তা</strong>
                  <span>support@kajlagbe.com / info@kajlagbe.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">কাস্টমার কেয়ার সময়সূচী</strong>
                  <span>সপ্তাহের ৭ দিনই সকাল ৯:০০ টা থেকে রাত ১০:০০ টা</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <Headphones className="h-4 w-4 text-emerald-700" />
              <span>জরুরী সার্ভিস ট্র্যাকিং</span>
            </div>
            <p className="leading-relaxed">
              আপনার চলমান কোনো সার্ভিসের তাৎক্ষণিক আপডেটের জন্য আপনার বুকিং আইডি উল্লেখ করে ইনকোয়ারি জমা দিন।
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg sm:text-xl">আমাদের বার্তা পাঠান (Send Message)</CardTitle>
              <CardDescription>
                নিচের ফর্মটি পূরণ করে সাবমিট করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0">
              {isSubmitted ? (
                <div className="space-y-4 py-8 text-center animate-in fade-in duration-200">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">আপনার বার্তা সফলভাবে গৃহীত হয়েছে!</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    আমাদের কাস্টমার সাপোর্ট প্রতিনিধি অতি শীঘ্রই আপনার দেওয়া মোবাইল নম্বরে বা ইমেইলে যোগাযোগ করবেন।
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4"
                  >
                    নতুন বার্তা পাঠান
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="আপনার পূর্ণ নাম"
                      placeholder="যেমন: তানভীর আহমেদ"
                      required
                    />
                    <Input
                      label="মোবাইল নম্বর"
                      placeholder="017XXXXXXXX"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="ইমেইল ঠিকানা (ঐচ্ছিক)"
                      placeholder="user@example.com"
                      type="email"
                    />
                    <Select
                      label="যোগাযোগের বিষয় (Topic)"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      options={[
                        { value: 'customer', label: 'গ্রাহক সেবা ও বুকিং সহায়তা' },
                        { value: 'provider', label: 'প্রোভাইডার একাউন্ট ও ভেরিফিকেশন' },
                        { value: 'corporate', label: 'কর্পোরেট ও ব্যবসা সহযোগিতা' },
                        { value: 'dispute', label: 'অভিযোগ ও ডিসপ্যুট' },
                      ]}
                    />
                  </div>

                  <Textarea
                    label="বার্তার বিস্তারিত বিবরণ"
                    placeholder="আপনার প্রশ্ন বা মতামত বিস্তারিত লিখুন..."
                    rows={4}
                    required
                  />

                  <div className="pt-2">
                    <Button type="submit" size="lg" leftIcon={<Send className="h-4 w-4" />}>
                      বার্তা পাঠান (Send Inquiry)
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
