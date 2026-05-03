/**
 * Events listing — intro to trust events + featured event cards.
 */

import type { Metadata } from 'next';
import { ArrowRight, Calendar } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getEvents } from '@/lib/data-access';
import { Link } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('eventsTitle'),
    description: t('eventsDescription'),
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const tMaharudra = await getTranslations('maharudra');
  const events = getEvents();

  const cardText: Record<string, { title: string; subtitle: string; description: string }> = {
    maharudra: {
      title: tMaharudra('cardTitle'),
      subtitle: tMaharudra('cardSubtitle'),
      description: tMaharudra('cardDescription'),
    },
  };

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-12">
        <div className="space-y-6 text-center">
          <SectionHeading
            title={t('title')}
            devanagari="कार्यक्रमाः"
            subtitle={t('subtitle')}
            centered
          />

          <p className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed">{t('introPara')}</p>
        </div>

        <div className="space-y-6">
          {events.map((event) => {
            const ct = cardText[event.slug];
            return (
              <Link key={event.slug} href={`/events/${event.slug}`}>
                <Card hover className="space-y-4 !p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-1">
                      {event.featured && (
                        <p className="text-xs text-kumkuma font-medium uppercase tracking-wider">
                          {t('featuredEvent')}
                        </p>
                      )}
                      <h2 className="font-serif text-2xl font-bold text-indigo">
                        {ct?.title ?? event.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-charcoal-200">
                        <Calendar size={14} />
                        {event.endDate
                          ? `${formatDate(event.date, locale)} – ${formatDate(event.endDate, locale)}`
                          : formatDate(event.date, locale)}
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="shrink-0 self-start">
                      {t('details')}
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                  <p className="text-charcoal-300 leading-relaxed">
                    {ct?.description ?? event.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        {events.length === 1 && (
          <div className="text-center">
            <p className="text-sm text-charcoal-200 italic">{t('moreEventsComing')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string, locale: string): string {
  const tag = locale === 'kn' ? 'kn-IN' : 'en-IN';
  return new Date(dateStr).toLocaleDateString(tag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
