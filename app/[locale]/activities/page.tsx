import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getActivities, getGurukulas, GURUKULA_MESSAGE_KEYS } from '@/lib/data-access';
import type { ActivityKind } from '@/lib/types';
import { ActivitiesList } from './list';

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('activitiesTitle'),
    description: t('activitiesDescription'),
  };
}

export default async function ActivitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('activities');
  const tDetail = await getTranslations('gurukulaDetail');
  const items = await getActivities(locale === 'kn' ? 'kn' : 'en');
  const gurukulaNames = Object.fromEntries(
    getGurukulas().map((g) => {
      const key = GURUKULA_MESSAGE_KEYS[g.slug];
      const name = key
        ? tDetail(`${key}_name` as Parameters<typeof tDetail>[0])
        : g.name;
      return [g.slug, name];
    })
  );

  const kindLabels: Record<ActivityKind, string> = {
    gurukulaVisit: t('kindVisit'),
    trustAffairs: t('kindTrust'),
    culturalProgramme: t('kindProgramme'),
    healthCamp: t('kindCamp'),
    other: t('kindOther'),
  };

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-12">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />
        <p className="mx-auto max-w-2xl text-center text-charcoal-300 leading-relaxed">
          {t('intro')}
        </p>
        <ActivitiesList
          items={items}
          locale={locale}
          gurukulaNames={gurukulaNames}
          kindLabels={kindLabels}
          filterLabels={{
            all: t('tabAll'),
            visits: t('tabVisits'),
            trust: t('tabTrust'),
            programmes: t('tabProgrammes'),
            camps: t('tabCamps'),
          }}
          readMore={t('readMore')}
          noItems={t('noItems')}
        />
      </div>
    </div>
  );
}
