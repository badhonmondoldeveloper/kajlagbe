'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Tag,
  Search,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Container,
  PageHeader,
  Breadcrumb,
} from '@kajlagbe/ui';
import { BLOG_POSTS } from '../../../data';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredPosts = BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Container className="py-8 sm:py-16 space-y-12">
      <PageHeader
        title="ব্লগ ও সার্ভিস গাইড (Blog & Guides)"
        description="গৃহস্থালী সরঞ্জাম রক্ষণাবেক্ষণ, ইলেকট্রিক ও প্লাম্বিং নিরাপত্তা এবং বিশেষজ্ঞদের মূল্যবান পরামর্শ।"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: 'হোম', href: '/' },
              { label: 'ব্লগ ও গাইড' },
            ]}
          />
        }
      />

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="ব্লগ বা নির্দেশিকা খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} variant="interactive" className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="secondary" size="sm">{post.category}</Badge>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <CardTitle className="text-base sm:text-lg leading-snug">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">{post.publishedAt}</span>
              <Link href={`/blog/${post.slug}`}>
                <Button size="sm" variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  সম্পূর্ণ পড়ুন
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
}

