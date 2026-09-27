import type { Metadata } from 'next';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { GalleryGrid } from '../../gallery/grid';
import { ActivityRichText } from '@/components/blocks/ActivityRichText';
import {
  getActivityBySlug,
  getGurukulaBySlug,
  GURUKULA_MESSAGE_KEYS,
} from '@/lib/data-access';
import { notFound } from 'next/navigation';

type Params = Promise<{ slug: string; locale: string }>;

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const item = await getActivityBySlug(slug, locale === 'kn' ? 'kn' : 'en');
  if (!item) return {};
  return {
    title: item.title,
    description: item.publicSummary,
  };
}

function formatDate(dateStr: string, locale: string): string {
  const tag = locale === 'kn' ? 'kn-IN' : 'en-IN';
  return new Date(dateStr).toLocaleDateString(tag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ActivityDetailPage({ params }: { params: Params }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('activities');
  const tDetail = await getTranslations('gurukulaDetail');
  const item = await getActivityBySlug(slug, locale === 'kn' ? 'kn' : 'en');
  if (!item) notFound();

  const kindLabels = {
    gurukulaVisit: t('kindVisit'),
    trustAffairs: t('kindTrust'),
    culturalProgramme: t('kindProgramme'),
    healthCamp: t('kindCamp'),
    other: t('kindOther'),
  };

  const linkedGurukulas = item.gurukulaSlugs.flatMap((gurukulaSlug) => {
    const gurukula = getGurukulaBySlug(gurukulaSlug);
    if (!gurukula) return [];
    const key = GURUKULA_MESSAGE_KEYS[gurukula.slug];
    const name = key
      ? tDetail(`${key}_name` as Parameters<typeof tDetail>[0])
      : gurukula.name;
    return [{ slug: gurukula.slug, name }];
  });

  const dateRange = item.endDate
    ? `${formatDate(item.date, locale)} – ${formatDate(item.endDate, locale)}`
    : formatDate(item.date, locale);

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-12">
        <Link
          href="/activities"
          className="inline-flex items-center gap-1.5 text-sm text-charcoal-200 hover:text-indigo transition-colors"
        >
          <ArrowLeft size={16} />
          {t('backLink')}
        </Link>

        <header className="text-center space-y-4">
          <p className="text-xs text-kumkuma font-medium uppercase tracking-wider">
            {kindLabels[item.kind]}
          </p>
          <h1 className="font-serif text-3xl font-bold text-indigo md:text-4xl">
            {item.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-charcoal-200">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {dateRange}
            </span>
            {linkedGurukulas.map((gurukula) => (
              <Link
                key={gurukula.slug}
                href={`/gurukulas/${gurukula.slug}`}
                className="flex items-center gap-1.5 hover:text-indigo transition-colors"
              >
                <MapPin size={16} />
                {gurukula.name}
              </Link>
            ))}
          </div>
          <p className="max-w-2xl mx-auto text-charcoal-300 leading-relaxed">
            {item.publicSummary}
          </p>
        </header>

        {item.representatives.length > 0 && (
          <section className="space-y-4 text-center">
            <SectionHeading title={t('whoWent')} centered />
            <p className="flex items-center justify-center gap-2 text-charcoal-300">
              <Users size={16} className="text-kumkuma shrink-0" />
              {item.representatives.join(', ')}
            </p>
          </section>
        )}

        {item.whatWeDid && (
          <section className="space-y-6">
            <SectionHeading title={t('whatWeDid')} centered />
            <ActivityRichText text={item.whatWeDid} />
          </section>
        )}

        {item.donations && item.donations.length > 0 && (
          <section className="space-y-6">
            <SectionHeading title={t('donations')} centered />
            <div
              className={
                item.donations.length === 1
                  ? 'mx-auto w-full max-w-xl'
                  : 'mx-auto grid w-full max-w-2xl gap-3 sm:grid-cols-2'
              }
            >
              {item.donations.map((donation, idx) => (
                <Card
                  key={`${donation.purpose}-${idx}`}
                  className="flex items-center justify-between gap-3 !py-4"
                >
                  <span className="text-sm text-charcoal-300">{donation.purpose}</span>
                  {donation.amount != null && (
                    <span className="shrink-0 font-serif font-semibold text-indigo">
                      ₹{donation.amount.toLocaleString('en-IN')}
                    </span>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {item.learnings && (
          <section className="space-y-6">
            <SectionHeading title={t('learnings')} centered />
            <ActivityRichText text={item.learnings} />
          </section>
        )}

        {item.album.length > 0 && (
          <section className="space-y-8">
            <SectionHeading title={t('photos')} centered />
            <GalleryGrid
              items={item.album}
              tabLabels={{
                all: '',
                gurukulas: '',
                events: '',
                misc: '',
              }}
              noItemsText=""
              showFilters={false}
            />
          </section>
        )}
      </div>
    </div>
  );
}
