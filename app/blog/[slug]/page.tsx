/**
 * Blog post detail page.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar } from 'lucide-react';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data-access';
import { notFound } from 'next/navigation';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function hasRealImage(path: string): boolean {
  return !path.includes('#') && !path.includes('importance');
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content
    .split('\n\n')
    .filter((p) => p.trim() && !p.trim().startsWith('#BLOG-TODO'));

  return (
    <article className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6 space-y-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-charcoal-200 hover:text-indigo transition-colors"
        >
          <ArrowLeft size={16} />
          All Posts
        </Link>

        {/* Header */}
        <header className="space-y-4">
          <h1 className="font-serif text-3xl font-bold text-indigo md:text-4xl leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-200">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs text-indigo font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Hero image */}
        {post.image && (
          <div className="overflow-hidden rounded-lg">
            {hasRealImage(post.image) ? (
              <Image
                src={post.image}
                alt={post.title}
                width={768}
                height={432}
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
                priority
              />
            ) : (
              <PlaceholderImage
                todoId={`IMG-TODO-blog-${post.slug}`}
                caption={post.title}
              />
            )}
          </div>
        )}

        {/* Body */}
        <div className="space-y-5 text-charcoal-300 leading-relaxed">
          {paragraphs.map((para, i) => {
            if (para.startsWith('*') && para.endsWith('*')) {
              return (
                <p key={i} className="text-sm italic text-charcoal-200">
                  {para.slice(1, -1)}
                </p>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>
      </div>
    </article>
  );
}
