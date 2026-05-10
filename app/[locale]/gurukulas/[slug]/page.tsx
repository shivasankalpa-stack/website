/**
 * Gurukula detail — drawer-style full page.
 *
 * Visually designed to feel like a drawer/modal: large hero at top,
 * close button (×) top-right returning to /gurukulas, tabs below.
 * Linkable, SEO-friendly, mobile-comfortable.
 *
 * Tabs: Overview, Adhyāpakas, Curriculum, Contact.
 */

import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import {
  X,
  MapPin,
  Users,
  BookOpen,
  Phone,
  Globe,
  GraduationCap,
} from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Card } from '@/components/ui/Card';
import { EnlargeablePortrait } from '@/components/blocks/EnlargeablePortrait';
import { getGurukulaBySlug, getGurukulas } from '@/lib/data-access';
import { notFound } from 'next/navigation';
import { GurukulaTabs } from './tabs';

type Params = Promise<{ slug: string; locale: string }>;

const SLUG_TO_KEY: Record<string, string> = {
  'shruti-parampara': 'shrutiParampara',
  'namma-sampradaya': 'nammaSampradaya',
  'shankara-gurukulam': 'shankaraGurukulam',
  'sri-ramana-brahma-vidyashrama': 'sriRamanaBrahmaVidyashrama',
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
  const localisedName = key ? t(`${key}_name` as Parameters<typeof t>[0]) : gk.name;
  return {
    title: localisedName || gk.name,
    description: `${localisedName || gk.name} — ${location}`,
  };
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

  const name = localised('name', gk.name);
  const location = localised('location', gk.location);
  const overview = localised('overview', gk.overview);

  return (
    <div className="relative">
      <Link
        href="/gurukulas"
        className="fixed top-20 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 border border-ivory-300 shadow-md text-charcoal-300 hover:text-indigo hover:border-indigo-100 transition-colors md:right-8"
        aria-label={t('closeLabel')}
      >
        <X size={20} />
      </Link>

      {/* Hero image — kept at the same 16:9 aspect as the gurukula card so
          portrait/square hero photos crop the same way in both places.
          A max-width keeps the hero from becoming absurdly tall on wide
          desktops while still feeling cinematic. */}
      <div className="mx-auto max-w-5xl">
        <div className="relative aspect-[16/9] bg-ivory-300 overflow-hidden md:rounded-b-lg">
          <Image
            src={gk.heroImage}
            alt={`${name}, ${location}`}
            fill
            className="object-cover"
            style={{ objectPosition: gk.heroPosition ?? 'center' }}
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/65 via-charcoal-500/25 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="font-serif text-2xl font-bold text-ivory-50 md:text-3xl drop-shadow-md">
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-sm text-ivory-100/90">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                {t('studentsLabel', { count: gk.studentCount })}
              </span>
              {gk.shakhas && gk.shakhas.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {key
                    ? t(`${key}_shakhas` as Parameters<typeof t>[0])
                    : gk.shakhas.join(' · ')}
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
            curriculum: t('tabCurriculum'),
            contact: t('tabContact'),
          }}
          overview={
            <div className="space-y-8">
              <div className="text-charcoal-300 leading-relaxed">
                <p>{overview}</p>
              </div>

              {gk.founders && gk.founders.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-indigo">
                    {t('foundersTitle')}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {gk.founders.map((founder, idx) => {
                      const founderName = key
                        ? t(`${key}_founder${idx}` as Parameters<typeof t>[0])
                        : founder.name;
                      const founderRole = founder.honorific
                        ? key
                          ? t(`${key}_founder${idx}role` as Parameters<typeof t>[0])
                          : founder.honorific
                        : null;
                      return (
                        <Card
                          key={`${founder.name}-${idx}`}
                          className="flex items-center gap-4"
                        >
                          {founder.image && (
                            <EnlargeablePortrait
                              src={founder.image}
                              alt={founderName}
                              title={founderName}
                              sizeClass="h-16 w-16"
                              imagePosition={founder.imagePosition}
                            />
                          )}
                          <div>
                            <h4 className="font-serif font-semibold text-indigo leading-snug">
                              {founderName}
                            </h4>
                            {founderRole && (
                              <p className="text-xs text-kumkuma font-medium mt-0.5">
                                {founderRole}
                              </p>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stats: students, alumni, ghanapaathis */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card className="text-center !p-5">
                  <Users size={18} className="mx-auto text-indigo" />
                  <p className="font-serif text-2xl font-semibold text-indigo mt-1">
                    {gk.studentCount}
                  </p>
                  <p className="text-xs text-charcoal-200 uppercase tracking-wider mt-1">
                    {t('statCurrentStudents')}
                  </p>
                </Card>
                {typeof gk.graduatedCount === 'number' && (
                  <Card className="text-center !p-5">
                    <GraduationCap size={18} className="mx-auto text-indigo" />
                    <p className="font-serif text-2xl font-semibold text-indigo mt-1">
                      {gk.graduatedCount}+
                    </p>
                    <p className="text-xs text-charcoal-200 uppercase tracking-wider mt-1">
                      {t('statGraduates')}
                    </p>
                  </Card>
                )}
                {typeof gk.ghanapaathisProduced === 'number' && (
                  <Card className="text-center !p-5">
                    <BookOpen size={18} className="mx-auto text-indigo" />
                    <p className="font-serif text-2xl font-semibold text-indigo mt-1">
                      {gk.ghanapaathisProduced}
                    </p>
                    <p className="text-xs text-charcoal-200 uppercase tracking-wider mt-1">
                      {t('statGhanapaathis')}
                    </p>
                  </Card>
                )}
              </div>

            </div>
          }
          adhyapakas={
            <div className="space-y-4">
              {gk.adhyapakas.map((teacher, idx) => {
                const teacherName = key
                  ? t(`${key}_adhyapaka${idx}` as Parameters<typeof t>[0])
                  : teacher.name;
                return (
                <Card key={`${teacher.name}-${idx}`} className="space-y-4">
                  <div className="flex items-start gap-4">
                    {teacher.image && (
                      <EnlargeablePortrait
                        src={teacher.image}
                        alt={teacherName}
                        title={teacherName}
                        sizeClass="h-20 w-20"
                        imagePosition={teacher.imagePosition}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base font-semibold text-indigo leading-snug">
                        {teacherName}
                      </h4>
                      {teacher.qualification && (
                        <p className="text-sm text-kumkuma font-medium mt-0.5">
                          {key
                            ? t(`${key}_adhyapaka${idx}qual` as Parameters<typeof t>[0])
                            : teacher.qualification}
                        </p>
                      )}
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {teacher.shakha && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-charcoal-200">
                          {t('adhyapakaShakhaLabel')}
                        </dt>
                        <dd className="text-charcoal-300 mt-0.5">
                          {key
                            ? t(`${key}_adhyapaka${idx}shakha` as Parameters<typeof t>[0])
                            : teacher.shakha}
                        </dd>
                      </div>
                    )}
                    {typeof teacher.yearsOfService === 'number' && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-charcoal-200">
                          {t('adhyapakaExperienceLabel')}
                        </dt>
                        <dd className="text-charcoal-300 mt-0.5">
                          {t('yearsValue', { count: teacher.yearsOfService })}
                        </dd>
                      </div>
                    )}
                    {teacher.studyLineage && (
                      <div className="sm:col-span-2">
                        <dt className="text-xs uppercase tracking-wider text-charcoal-200">
                          {t('adhyapakaLineageLabel')}
                        </dt>
                        <dd className="text-charcoal-300 mt-0.5">
                          {key
                            ? t(`${key}_adhyapaka${idx}lineage` as Parameters<typeof t>[0])
                            : teacher.studyLineage}
                        </dd>
                      </div>
                    )}
                    {teacher.vedaGuru && (
                      <div className="sm:col-span-2">
                        <dt className="text-xs uppercase tracking-wider text-charcoal-200">
                          {t('adhyapakaVedaGuruLabel')}
                        </dt>
                        <dd className="text-charcoal-300 mt-0.5">
                          {key
                            ? t(`${key}_adhyapaka${idx}vedaGuru` as Parameters<typeof t>[0])
                            : teacher.vedaGuru}
                        </dd>
                      </div>
                    )}
                  </dl>
                </Card>
                );
              })}
            </div>
          }
          curriculum={
            <div className="space-y-6">
              {gk.shakhas && gk.shakhas.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-indigo mb-3">
                    {t('shakhasTitle')}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {gk.shakhas.map((shakha, i) => (
                      <li
                        key={shakha}
                        className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo text-sm font-medium"
                      >
                        {key
                          ? t(`${key}_shakha${i}` as Parameters<typeof t>[0])
                          : shakha}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {gk.otherShastras && gk.otherShastras.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-indigo mb-3">
                    {t('otherShastrasTitle')}
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2 list-disc pl-5 text-sm text-charcoal-300 leading-relaxed marker:text-kumkuma">
                    {gk.otherShastras.map((subject, i) => (
                      <li key={subject}>
                        {key
                          ? t(`${key}_shastra${i}` as Parameters<typeof t>[0])
                          : subject}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-charcoal-200 italic">
                {t('curriculumNote')}
              </p>
            </div>
          }
          contact={
            <div className="space-y-4">
              {gk.contact.address && (
                <div className="flex items-start gap-3 text-sm text-charcoal-300">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-indigo" />
                  <span className="leading-relaxed">
                    {key
                      ? t(`${key}_address` as Parameters<typeof t>[0])
                      : gk.contact.address}
                  </span>
                </div>
              )}
              {gk.contact.phone && (
                <div className="flex items-center gap-3 text-sm text-charcoal-300">
                  <Phone size={16} className="shrink-0 text-indigo" />
                  <a
                    href={`tel:${gk.contact.phone.split(',')[0].replace(/\s+/g, '')}`}
                    className="hover:text-indigo transition-colors"
                  >
                    {gk.contact.phone}
                  </a>
                </div>
              )}
              {gk.contact.website && (
                <div className="flex items-center gap-3 text-sm text-charcoal-300">
                  <Globe size={16} className="shrink-0 text-indigo" />
                  <a
                    href={gk.contact.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-indigo transition-colors break-all"
                  >
                    {gk.contact.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </div>
              )}

              <p className="text-xs text-charcoal-200 italic pt-2">
                {t('contactNote')}
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
