/**
 * Vedic Knowledge Map — a śākhā's reading path with one book open.
 *
 * Only a text's home collection renders it; a shared text requested under
 * another śākhā redirects to its home path.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import { TEXTS, getCollection, getText, pick } from '@/data/vedic-map';
import { CollectionView } from '@/components/blocks/VedicMap/CollectionView';

type Params = Promise<{ locale: string; collection: string; text: string }>;

export function generateStaticParams() {
  return TEXTS.map((t) => ({ collection: t.home, text: t.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { collection: slug, text: id } = await params;
  const locale = await getLocale();
  const collection = getCollection(slug);
  const text = getText(id);
  if (!collection || !text) return {};
  return {
    title: `${pick(text.name, locale)} — ${pick(collection.name, locale)}`,
    description: pick(text.about, locale),
  };
}

export default async function TextPage({ params }: { params: Params }) {
  const { locale, collection: slug, text: id } = await params;
  setRequestLocale(locale);
  const collection = getCollection(slug);
  const text = getText(id);
  if (!collection || !text || !collection.path.includes(id)) notFound();

  if (text.home !== collection.slug) {
    redirect({ href: `/resources/${text.home}/${text.id}`, locale });
  }

  return <CollectionView collection={collection} activeId={text.id} locale={locale} />;
}
