/**
 * Vedic Knowledge Map — a śākhā's reading path, opened at its first book.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { COLLECTIONS, getCollection, getText, getVeda, pick } from '@/data/vedic-map';
import { CollectionView } from '@/components/blocks/VedicMap/CollectionView';

type Params = Promise<{ locale: string; collection: string }>;

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { collection: slug } = await params;
  const locale = await getLocale();
  const collection = getCollection(slug);
  if (!collection) return {};
  const name = pick(collection.name, locale);
  const veda = collection.veda ? pick(getVeda(collection.veda).name, locale) : undefined;
  return {
    title: veda ? `${name} — ${veda}` : name,
    description: pick(collection.intro, locale),
  };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { locale, collection: slug } = await params;
  setRequestLocale(locale);
  const collection = getCollection(slug);
  if (!collection) notFound();

  const first = collection.path.find((id) => getText(id)?.home === collection.slug) ?? collection.path[0];

  return <CollectionView collection={collection} activeId={first} locale={locale} />;
}
