/**
 * Data access layer — the single gateway between page components and content.
 *
 * v0.1: reads from local TypeScript files in /data/.
 * v0.2: swap implementations to fetch from Sanity CMS.
 *        Page components will NOT change — only this file.
 *
 * TODO v0.2: Replace local imports with Sanity client queries.
 */

import { gurukulas } from '@/data/gurukulas';
import { events } from '@/data/events';
import { blogPosts } from '@/data/blog';
import { trustees, managingCommittee } from '@/data/trustees';
import { faqs } from '@/data/faqs';
import { galleryItems } from '@/data/gallery';
import type {
  Gurukula,
  SiteEvent,
  BlogPost,
  Trustee,
  FAQ,
  GalleryItem,
} from './types';

export function getGurukulas(): Gurukula[] {
  return gurukulas;
}

export function getGurukulaBySlug(slug: string): Gurukula | undefined {
  return gurukulas.find((g) => g.slug === slug);
}

export function getEvents(): SiteEvent[] {
  return events;
}

export function getEventBySlug(slug: string): SiteEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): SiteEvent[] {
  return events.filter((e) => e.featured);
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getTrustees(): Trustee[] {
  return trustees;
}

export function getManagingCommittee(): Trustee[] {
  return managingCommittee;
}

export function getFaqs(): FAQ[] {
  return faqs;
}

export function getGalleryItems(): GalleryItem[] {
  return galleryItems;
}

export function getGalleryItemsByCategory(
  category: GalleryItem['category']
): GalleryItem[] {
  return galleryItems.filter((item) => item.category === category);
}
