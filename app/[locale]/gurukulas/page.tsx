/**
 * Gurukulas list — card grid of supported Vedic Gurukulas.
 * Each card links to the drawer-style detail page at /gurukulas/[slug].
 */

import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { MapPin, Users, BookOpen } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { EnrolCallout } from '@/components/blocks/EnrolCallout';
import { getGurukulas } from '@/lib/data-access';

type Props = {
  params: Promise<{ locale: string }>;
};

const SLUG_TO_KEY: Record<string, string> = {
  'shruti-parampara': 'shrutiParampara',
  'namma-sampradaya': 'nammaSampradaya',
  'shankara-gurukulam': 'shankaraGurukulam',
  'sri-ramana-brahma-vidyashrama': 'sriRamanaBrahmaVidyashrama',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('gurukulasTitle'),
    description: t('gurukulasDescription'),
  };
}

export default async function GurukulasListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gurukulas');
  const tDetail = await getTranslations('gurukulaDetail');
  const gurukulas = getGurukulas();

  return (
    <>
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        <div className="text-center space-y-4">
          <SectionHeading
            title={t('title')}
            devanagari="वेदगुरुकुलानि"
            subtitle={t('subtitle')}
            centered
          />
          <p className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed">
            {t('introPara')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {gurukulas.map((gk) => {
            const key = SLUG_TO_KEY[gk.slug];
            const localised = (field: string, fallback: string) =>
              key
                ? tDetail(`${key}_${field}` as Parameters<typeof tDetail>[0])
                : fallback;
            const name = localised('name', gk.name);
            const location = localised('location', gk.location);
            const acharya = localised('acharya', gk.acharya);
            const shakhas = key
              ? tDetail(`${key}_shakhas` as Parameters<typeof tDetail>[0])
              : (gk.shakhas ?? []).join(' · ');

            return (
              <Link key={gk.slug} href={`/gurukulas/${gk.slug}`}>
                <Card hover as="article" className="h-full !p-0 overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={gk.heroImage}
                      alt={`${name}, ${location}`}
                      fill
                      className="object-cover"
                      style={{ objectPosition: gk.heroPosition ?? 'center' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-5 md:p-6 space-y-3">
                    <h3 className="font-serif text-xl font-semibold text-indigo leading-snug">
                      {name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-charcoal-300">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-indigo-300" />
                        {location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-indigo-300" />
                        {t('studentsLabel', { count: gk.studentCount })}
                      </span>
                      {shakhas && (
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={14} className="text-indigo-300" />
                          {shakhas}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal-300">
                      <span className="font-medium text-charcoal">
                        {t('acharyaLabel')}
                      </span>{' '}
                      {acharya}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>

    {/* Emotional, dharmic invitation to enrol — sits below the cards so
        parents who scrolled the gurukulas have a clear next step. */}
    <EnrolCallout />
    </>
  );
}
