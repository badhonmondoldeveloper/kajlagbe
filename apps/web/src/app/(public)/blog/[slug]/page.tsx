import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  User,
  Calendar,
  Share2,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
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
  Breadcrumb,
} from '@kajlagbe/ui';
import { BLOG_POSTS } from '../../../../data';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id);

  return (
    <div className="py-8 sm:py-16 space-y-10 pb-16">
      <Container className="max-w-4xl">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'ব্লগ', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>

        {/* Article Header */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-xs text-slate-400">• {post.readTime}</span>
            <span className="text-xs text-slate-400">• {post.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
              {post.author.name[0]}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{post.author.name}</p>
              <p className="text-[11px] text-slate-500">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none py-8 leading-relaxed space-y-4 text-xs sm:text-base text-slate-700 whitespace-pre-line">
          {post.content}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" /> ট্যাগ:
          </span>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-700 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Service Booking CTA Box */}
        <div className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              অভিজ্ঞ টেকনিশিয়ানের সহায়তা চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              KajLagbe এর মাধ্যমে মাত্র ১৫-৩০ মিনিটে আপনার এলাকার ভেরিফাইড প্রোভাইডার বুক করুন।
            </p>
          </div>
          <Link href="/services">
            <Button size="md">সেবা বুকিং দিন</Button>
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 space-y-6 pt-10 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">অন্যান্য প্রয়োজনীয় গাইডসমূহ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`}>
                  <Card variant="interactive" className="p-4 space-y-2 h-full">
                    <Badge variant="secondary" size="sm">{rp.category}</Badge>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{rp.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{rp.excerpt}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

