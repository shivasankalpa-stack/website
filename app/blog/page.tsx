/**
 * Blog list — articles, travelogues, and reflections curated by trust members.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Button } from '@/components/ui/Button';
import { getBlogPosts } from '@/lib/data-access';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles, travelogues, and reflections on Vedic education, Gurukula visits, and dharmic life — by Sri Shivasankalpa Trust.',
};

function hasRealImage(path: string): boolean {
  return !path.includes('#') && !path.includes('importance');
}

export default function BlogListPage() {
  const posts = getBlogPosts();

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-10">
        <SectionHeading
          title="Blog"
          subtitle="Reflections, visit reports, and essays on Vedic traditions — written by trust members and well-wishers."
          centered
        />

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card hover className="flex flex-col sm:flex-row gap-5 !p-5">
                <div className="sm:w-48 shrink-0 overflow-hidden rounded-md">
                  {post.image && hasRealImage(post.image) ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={192}
                      height={128}
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '3/2' }}
                    />
                  ) : (
                    <PlaceholderImage
                      todoId={`IMG-TODO-blog-${post.slug}`}
                      caption={post.title}
                      aspectRatio="3/2"
                    />
                  )}
                </div>

                <div className="space-y-2 flex-1 min-w-0">
                  <h2 className="font-serif text-xl font-semibold text-indigo">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-charcoal-200">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span>·</span>
                    <span>{post.author}</span>
                  </div>
                  <p className="text-sm text-charcoal-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="!px-0">
                    Read more
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
