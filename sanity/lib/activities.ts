import type { ActivityItem, ActivityKind, GalleryItem } from '@/lib/types';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from './client';
import { urlFor } from './image';
import { activitiesQuery, activityBySlugQuery } from './queries';

type Locale = 'en' | 'kn';

type LocalePair = { en?: string; kn?: string };

type SanityActivityRow = {
  slug?: string;
  kind?: ActivityKind;
  title?: LocalePair;
  publicSummary?: LocalePair;
  date?: string;
  endDate?: string;
  gurukula?: string;
  gurukulas?: string[];
  representatives?: string[];
  whatWeDid?: LocalePair;
  donations?: { purpose?: LocalePair; amount?: number }[];
  learnings?: LocalePair;
  showLearnings?: boolean;
  album?: {
    _key?: string;
    caption?: LocalePair;
    image?: SanityImageSource;
  }[];
};

function pick(pair: LocalePair | undefined, locale: Locale, fallback = ''): string {
  if (locale === 'kn') return pair?.kn || pair?.en || fallback;
  return pair?.en || pair?.kn || fallback;
}

function hasText(pair: LocalePair | undefined): boolean {
  return Boolean(pair?.en?.trim() || pair?.kn?.trim());
}

function albumToItems(
  slug: string,
  title: string,
  kind: ActivityKind,
  gurukula: string | undefined,
  album: SanityActivityRow['album'],
  locale: Locale
): GalleryItem[] {
  const items: GalleryItem[] = [];
  const category: GalleryItem['category'] =
    kind === 'gurukulaVisit' ? 'gurukulas' : 'misc';
  for (const photo of album ?? []) {
    if (!photo.image) continue;
    let src: string;
    try {
      src = urlFor(photo.image).width(1600).auto('format').url();
    } catch {
      continue;
    }
    items.push({
      id: `activity-${slug}-${photo._key}`,
      src,
      alt: pick(photo.caption, locale) || title,
      caption: pick(photo.caption, locale) || undefined,
      category,
      type: 'image',
      tags: [slug, kind, gurukula].filter((value): value is string => Boolean(value)),
    });
  }
  return items;
}

function toActivity(row: SanityActivityRow, locale: Locale): ActivityItem | null {
  if (!row.slug || !row.date) return null;
  const kind = row.kind ?? 'other';
  const title = pick(row.title, locale, row.slug);
  const publicSummary = pick(row.publicSummary, locale);
  if (!publicSummary) return null;

  const album = albumToItems(
    row.slug,
    title,
    kind,
    row.gurukula,
    row.album,
    locale
  );
  const donations = (row.donations ?? [])
    .map((item) => ({
      purpose: pick(item.purpose, locale),
      amount: item.amount,
    }))
    .filter((item) => item.purpose || item.amount);
  const learnings =
    row.showLearnings === false ? undefined : pick(row.learnings, locale) || undefined;
  const representatives = (row.representatives ?? []).filter(Boolean);
  const whatWeDid = hasText(row.whatWeDid)
    ? pick(row.whatWeDid, locale)
    : undefined;

  const hasDetailPage = Boolean(
    album.length ||
      whatWeDid ||
      donations.length ||
      learnings ||
      representatives.length
  );

  const gurukulaSlugs = [
    ...new Set(
      [...(row.gurukulas ?? []), row.gurukula].filter(
        (slug): slug is string => Boolean(slug) && slug !== 'other'
      )
    ),
  ];

  return {
    slug: row.slug,
    kind,
    title,
    publicSummary,
    date: row.date,
    endDate: row.endDate,
    gurukulaSlugs,
    gurukulaSlug: gurukulaSlugs.length === 1 ? gurukulaSlugs[0] : undefined,
    representatives,
    whatWeDid,
    donations: donations.length ? donations : undefined,
    learnings,
    hasDetailPage,
    album,
  };
}

export async function getSanityActivities(locale: Locale): Promise<ActivityItem[]> {
  try {
    const rows = await client.fetch<SanityActivityRow[]>(activitiesQuery);
    return (rows ?? [])
      .map((row) => toActivity(row, locale))
      .filter((item): item is ActivityItem => item !== null);
  } catch (error) {
    console.error('Sanity activities fetch failed', error);
    return [];
  }
}

export async function getSanityActivityBySlug(
  slug: string,
  locale: Locale
): Promise<ActivityItem | undefined> {
  try {
    const row = await client.fetch<SanityActivityRow | null>(activityBySlugQuery, {
      slug,
    });
    if (!row) return undefined;
    return toActivity(row, locale) ?? undefined;
  } catch (error) {
    console.error('Sanity activity fetch failed', error);
    return undefined;
  }
}
