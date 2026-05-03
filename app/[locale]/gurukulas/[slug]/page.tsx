/**
 * Gurukula detail — drawer-style full page.
 *
 * Visually designed to feel like a drawer/modal: large hero at top,
 * close button (×) top-right returning to /gurukulas, tabs below.
 * But it's a real page — linkable, SEO-friendly, mobile-comfortable.
 */

import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { X, MapPin, Users, BookOpen, Phone, Mail } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Card } from '@/components/ui/Card';
import { getGurukulaBySlug, getGurukulas } from '@/lib/data-access';
import { notFound } from 'next/navigation';
import { GurukulaTabs } from './tabs';

type Params = Promise<{ slug: string; locale: string }>;

const SLUG_TO_KEY: Record<string, string> = {
  'shruti-parampara': 'shrutiParampara',
  'gowtama-veda-pathashala': 'gowtamaVedaPathashala',
  'sacchidananda-advaitashrama': 'sacchidanandaAdvaitashrama',
};

export async function generateStaticParams() {
  return getGurukulas().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'gurukulaDetail' });
  const gk = getGurukulaBySlug(slug);
  if (!gk) return {};
  const key = SLUG_TO_KEY[slug];
  const location = key
    ? t(`${key}_location` as Parameters<typeof t>[0])
    : gk.location;
  return {
    title: gk.name,
    description: `${gk.name} — ${location}`,
  };
}

function hasRealImage(path: string): boolean {
  return !path.includes('#') && !path.includes('hero.jpg');
}

export default async function GurukulaDetailPage({ params }: { params: Params }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gurukulaDetail');
  const gk = getGurukulaBySlug(slug);
  if (!gk) notFound();

  const key = SLUG_TO_KEY[slug];

  function localised(field: string, fallback: string): string {
    if (!key) return fallback;
    return t(`${key}_${field}` as Parameters<typeof t>[0]);
  }

  const location = localised('location', gk.location);

  return (
    <div className="relative">
      <Link
        href="/gurukulas"
        className="fixed top-20 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 border border-ivory-300 shadow-md text-charcoal-300 hover:text-indigo hover:border-indigo-100 transition-colors md:right-8"
        aria-label={t('closeLabel')}
      >
        <X size={20} />
      </Link>

      {/* Hero image */}
      <div className="relative h-64 md:h-80 bg-ivory-300 overflow-hidden">
        {hasRealImage(gk.heroImage) ? (
          <Image
            src={gk.heroImage}
            alt={`${gk.name}, ${location}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <PlaceholderImage
            todoId={`IMG-TODO-${gk.slug}-hero`}
            caption={gk.name}
            aspectRatio="auto"
            className="!rounded-none h-full"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-2xl font-bold text-ivory-50 md:text-3xl drop-shadow-md">
              {gk.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-ivory-100/90">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                {t('studentsLabel', { count: gk.studentCount })}
              </span>
              {gk.shakha && !gk.shakha.includes('#') && (
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {gk.shakha}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content with tabs */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <GurukulaTabs
          labels={{
            overview: t('tabOverview'),
            adhyapakas: t('tabAdhyapakas'),
            vidyarthis: t('tabVidyarthis'),
            events: t('tabEvents'),
            contact: t('tabContact'),
          }}
          overview={
            <div className="space-y-6">
              <div className="text-charcoal-300 leading-relaxed space-y-4">
                <p>{localised('overview', gk.overview)}</p>
                {gk.history && <p>{localised('history', gk.history)}</p>}
              </div>
              {gk.dailySchedule && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-indigo mb-2">
                    {t('dailyScheduleTitle')}
                  </h3>
                  <p className="text-sm text-charcoal-300 leading-relaxed">
                    {key ? localised('schedule', gk.dailySchedule) : gk.dailySchedule}
                  </p>
                </div>
              )}
            </div>
          }
          adhyapakas={
            <div className="space-y-4">
              {gk.adhyapakas.map((teacher) => (
                <Card key={teacher.name} className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden shrink-0">
                    <PlaceholderImage
                      todoId={`IMG-TODO-${gk.slug}-teacher-${teacher.name.toLowerCase().replace(/\s+/g, '-')}`}
                      aspectRatio="1/1"
                      className="!rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-indigo">{teacher.name}</h4>
                    {teacher.qualification && (
                      <p className="text-sm text-charcoal-300">{teacher.qualification}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          }
          vidyarthis={
            <div className="text-charcoal-300 leading-relaxed">
              <p>{localised('students', gk.studentsSummary)}</p>
              <p className="mt-2 text-xs text-charcoal-200 italic">
                {t('privacyNote')}
              </p>
            </div>
          }
          events={
            <div className="space-y-4">
              {gk.events.length === 0 ? (
                <p className="text-charcoal-200 italic">
                  {t('noEvents')}
                </p>
              ) : (
                gk.events.map((event, i) => (
                  <Card key={i} className="space-y-1">
                    <h4 className="font-serif font-semibold text-indigo">{event.title}</h4>
                    <p className="text-xs text-charcoal-200">{event.date}</p>
                    <p className="text-sm text-charcoal-300">{event.description}</p>
                  </Card>
                ))
              )}
            </div>
          }
          contact={
            <div className="space-y-3">
              {gk.contact.address && (
                <div className="flex items-start gap-3 text-sm text-charcoal-300">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-indigo" />
                  <span>{gk.contact.address}</span>
                </div>
              )}
              {gk.contact.phone && !gk.contact.phone.includes('#') && (
                <div className="flex items-center gap-3 text-sm text-charcoal-300">
                  <Phone size={16} className="shrink-0 text-indigo" />
                  <span>{gk.contact.phone}</span>
                </div>
              )}
              {gk.contact.email && !gk.contact.email.includes('#') && (
                <div className="flex items-center gap-3 text-sm text-charcoal-300">
                  <Mail size={16} className="shrink-0 text-indigo" />
                  <span>{gk.contact.email}</span>
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}
