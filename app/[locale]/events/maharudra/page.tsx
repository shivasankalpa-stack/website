/**
 * Maharudra Purascharana — detailed event page.
 *
 * Content sourced from the trust's official Maharudra invite letter.
 * Includes: spiritual significance, programme schedule, seva information,
 * and an inline donation modal (opens directly, not via /donations).
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getEventBySlug } from '@/lib/data-access';
import { notFound } from 'next/navigation';
import { MaharudraDonateButton } from './donate-button';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('maharudraTitle'),
    description: t('maharudraDescription'),
  };
}

export default async function MaharudraPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('maharudra');

  const event = getEventBySlug('maharudra');
  if (!event) notFound();

  const dateTag = locale === 'kn' ? 'kn-IN' : 'en-IN';
  const dateRange = event.endDate
    ? `${formatDate(event.date, dateTag)} – ${formatDate(event.endDate, dateTag)}`
    : formatDate(event.date, dateTag);

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-16">
        {/* Back link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-charcoal-200 hover:text-indigo transition-colors"
        >
          <ArrowLeft size={16} />
          {t('backLink')}
        </Link>

        {/* ── Hero ── */}
        <div className="text-center space-y-6">
          <ShlokaBlock
            devanagari="श्रीगणेशाय नमः श्रीशारदागुरुभ्यो नमः"
            size="sm"
          />

          <div className="space-y-3">
            <p className="shloka-devanagari text-lg text-kumkuma">
              महारुद्र पुरश्चरणा
            </p>
            <h1 className="font-serif text-3xl font-bold text-indigo md:text-4xl">
              {t('cardTitle')}
            </h1>
            <p className="text-lg text-charcoal-300">
              {t('cardSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-charcoal-200">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {dateRange}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} />
              {locale === 'en' ? (event.location || 'Bangalore') : 'ಹೊಯ್ಸಳ ಟ್ರಸ್ಟ್, ದತ್ತಾತ್ರೇಯ ನಗರ, ಹೊಸಕೆರೆಹಳ್ಳಿ, ಬೆಂಗಳೂರು – 560085'}
            </span>
          </div>

          {/* Venue map */}
          <div className="overflow-hidden rounded-lg border border-ivory-300 shadow-sm max-w-xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6386530619593!2d77.53902407649872!3d12.930930587380791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e382916eb6b%3A0xd6480eb951f7e896!2sHoysala%20Trust!5e0!3m2!1sen!2sin!4v1776786114496!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('mapTitle')}
            />
          </div>
        </div>

        {/* ── Sri Adi Shankaracharya worshipping the Sphatika Linga ── */}
        <div className="flex justify-center">
          <Image
            src="/assets/artefacts/sri-adi-shankara.jpg"
            alt={t('imageAlt')}
            width={600}
            height={750}
            className="w-full max-w-lg rounded-xl shadow-lg"
            priority
          />
        </div>

        {/* ── Introduction ── */}
        <div className="text-center space-y-6">
          <ShlokaBlock
            devanagari={`गण्यन्ते पांसवो भूमेः गण्यन्ते वृष्टिबन्दवः।
विधात्राऽपि न गण्यन्ते वेदाध्ययनतः फलम्॥`}
            translation={t('shlokaVedaTranslation')}
            size="sm"
          />

          <div className="text-charcoal-300 leading-relaxed space-y-4 max-w-2xl mx-auto">
            <p>{t('introPara1')}</p>
            <p>
              {t.rich('introPara2', {
                em: (chunks) => <em className="shloka-iast">{chunks}</em>,
              })}
            </p>
          </div>
        </div>

        {/* ── Spiritual Significance of the Rudrādhyāya ── */}
        <section className="space-y-8 text-center">
          <SectionHeading title={t('significanceTitle')} centered />

          <ShlokaBlock
            devanagari="रुदं द्रावयति इति रुद्रः"
            iast={locale === 'en' ? "Rudam drāvayati iti Rudraḥ" : undefined}
            translation={t('rudraTranslation')}
            size="md"
          />

          <p className="text-charcoal-300 leading-relaxed max-w-2xl mx-auto">
            {t('rudraDesc')}
          </p>

          <Card className="!bg-ivory-100 !border-gold/20 max-w-2xl mx-auto">
            <ShlokaBlock
              devanagari={`पातकानि विनश्यन्ति यावन्ति रुद्रजपतः |
भुवि तावन्ति पापानि जन्यन्ते न नरैर्मुने ||
शिवनामनि तरे प्राप्ते संसाराब्धिं तरन्ति ते |
संसारमूलपापानि तानि नश्यन्त्यसंशयः ||`}
              translation={t('shivaPuranaTranslation')}
              source="Shiva Purana"
              size="sm"
            />
          </Card>

          <div className="text-charcoal-300 leading-relaxed space-y-4 max-w-2xl mx-auto">
            <p>{t('shivaPuranaPara1')}</p>
            <p className="font-medium text-charcoal">{t('shivaPuranaPara2')}</p>
          </div>
        </section>

        {/* ── Programme Schedule ── */}
        {event.schedule && (
          <section className="space-y-8">
            <SectionHeading title={t('scheduleTitle')} centered />

            <div className="space-y-6">
              {event.schedule.map((day, dayIdx) => (
                <Card key={day.date} className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-indigo flex items-center gap-2">
                    <Calendar size={18} className="text-kumkuma" />
                    {t(`day${dayIdx}Label` as Parameters<typeof t>[0])}
                  </h3>
                  <div className="space-y-3">
                    {day.items.map((_, itemIdx) => (
                      <div key={itemIdx} className="flex gap-4">
                        <span className="shrink-0 w-36 text-sm font-medium text-kumkuma">
                          {t(`day${dayIdx}Item${itemIdx}Time` as Parameters<typeof t>[0])}
                        </span>
                        <span className="text-sm text-charcoal-300 leading-relaxed">
                          {t(`day${dayIdx}Item${itemIdx}Desc` as Parameters<typeof t>[0])}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── Seva Information ── */}
        {event.sevaItems && (
          <section className="space-y-8">
            <SectionHeading
              title={t('sevaTitle')}
              subtitle={t('sevaSubtitle')}
              centered
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {event.sevaItems.map((seva, idx) => (
                <Card key={idx} className="flex items-center justify-between gap-3 !py-4">
                  <span className="text-sm text-charcoal-300">
                    {t(`seva${idx}` as Parameters<typeof t>[0])}
                  </span>
                  <span className="shrink-0 font-serif font-semibold text-indigo">
                    ₹{seva.amount.toLocaleString('en-IN')}
                  </span>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── CTAs ── */}
        <section className="text-center space-y-6 py-8 border-t border-ivory-300">
          <ShlokaBlock
            devanagari="॥ शिवसंकल्पमस्तु ॥"
            translation={t('closingTranslation')}
            size="md"
          />

          <p className="text-charcoal-300 leading-relaxed max-w-lg mx-auto">
            {t('closingPara')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <MaharudraDonateButton />
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                {t('volunteer')}
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function formatDate(dateStr: string, localeTag: string): string {
  return new Date(dateStr).toLocaleDateString(localeTag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
