import type { GalleryItem } from '@/lib/types';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from './client';
import { urlFor } from './image';
import { eventAlbumsQuery, mediaItemsQuery } from './queries';

type Locale = 'en' | 'kn';

type LocalePair = { en?: string; kn?: string };

type SanityAlbumRow = {
  slug?: string;
  title?: LocalePair;
  album?: {
    _key?: string;
    caption?: LocalePair;
    alt?: LocalePair;
    image?: SanityImageSource;
  }[];
};

type SanityMediaRow = {
  _id: string;
  mediaType?: 'image' | 'video';
  caption?: LocalePair;
  alt?: LocalePair;
  image?: SanityImageSource;
  videoUrl?: string;
  eventSlug?: string;
  tags?: (string | null)[];
};

function pick(pair: LocalePair | undefined, locale: Locale, fallback = ''): string {
  if (locale === 'kn') return pair?.kn || pair?.en || fallback;
  return pair?.en || pair?.kn || fallback;
}

function imageSrc(image: SanityImageSource | undefined, width: number): string | null {
  if (!image) return null;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return null;
  }
}

function hotspotPosition(image: unknown): string | undefined {
  const hotspot = (image as { hotspot?: { x?: number; y?: number } } | undefined)
    ?.hotspot;
  if (hotspot?.x == null || hotspot?.y == null) return undefined;
  return `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`;
}

function albumRowsToItems(rows: SanityAlbumRow[], locale: Locale): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const event of rows) {
    const slug = event.slug || 'event';
    const fallbackCaption = pick(event.title, locale, slug);
    for (const photo of event.album ?? []) {
      const src = imageSrc(photo.image, 1600);
      if (!src) continue;
      items.push({
        id: `album-${slug}-${photo._key}`,
        src,
        alt: pick(photo.alt, locale, pick(photo.caption, locale, fallbackCaption)),
        caption: pick(photo.caption, locale, fallbackCaption),
        category: 'events',
        type: 'image',
        imagePosition: hotspotPosition(photo.image),
        tags: [slug],
      });
    }
  }
  return items;
}

function mediaRowsToItems(rows: SanityMediaRow[], locale: Locale): GalleryItem[] {
  const items: GalleryItem[] = [];

  for (const row of rows) {
    const tags = (row.tags ?? []).filter((t): t is string => Boolean(t));
    if (row.eventSlug && !tags.includes(row.eventSlug)) {
      tags.push(row.eventSlug);
    }

    if (row.mediaType === 'video') {
      const isFile = Boolean(row.videoUrl && /\.(mp4|webm)(\?|$)/i.test(row.videoUrl));
      if (!isFile || !row.videoUrl) continue;
      items.push({
        id: row._id,
        src: row.videoUrl,
        alt: pick(row.alt, locale, pick(row.caption, locale)),
        caption: pick(row.caption, locale),
        category: 'events',
        type: 'video',
        tags,
      });
      continue;
    }

    const src = imageSrc(row.image, 1600);
    if (!src) continue;
    items.push({
      id: row._id,
      src,
      alt: pick(row.alt, locale, pick(row.caption, locale)),
      caption: pick(row.caption, locale),
      category: 'events',
      type: 'image',
      imagePosition: hotspotPosition(row.image),
      tags,
    });
  }

  return items;
}

async function fetchSanityGallery(locale: Locale): Promise<GalleryItem[]> {
  try {
    const [albums, media] = await Promise.all([
      client.fetch<SanityAlbumRow[]>(eventAlbumsQuery),
      client.fetch<SanityMediaRow[]>(mediaItemsQuery),
    ]);
    return [
      ...albumRowsToItems(albums ?? [], locale),
      ...mediaRowsToItems(media ?? [], locale),
    ];
  } catch (error) {
    console.error('Sanity gallery fetch failed', error);
    return [];
  }
}

export async function getSanityGalleryItems(locale: Locale): Promise<GalleryItem[]> {
  return fetchSanityGallery(locale);
}

export async function getSanityAlbumByEventSlug(
  slug: string,
  locale: Locale
): Promise<GalleryItem[]> {
  const all = await fetchSanityGallery(locale);
  return all.filter((item) => item.tags?.includes(slug));
}
