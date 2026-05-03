/**
 * About Us — trust introduction, vision, mission, objectives,
 * trustees (expandable cards), and trust artefacts.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { BookOpen, Users, Search, HandHeart, Award, Heart } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getTrustees, getManagingCommittee } from '@/lib/data-access';
import { TrusteeGrid } from './trustees-grid';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  };
}

const OBJECTIVE_TITLE_KEYS = [
  'obj0Title',
  'obj1Title',
  'obj2Title',
  'obj3Title',
  'obj4Title',
  'obj5Title',
] as const;
const OBJECTIVE_DESC_KEYS = [
  'obj0Desc',
  'obj1Desc',
  'obj2Desc',
  'obj3Desc',
  'obj4Desc',
  'obj5Desc',
] as const;

const objectives = [
  { icon: BookOpen, index: 0 },
  { icon: Users, index: 1 },
  { icon: Search, index: 2 },
  { icon: HandHeart, index: 3 },
  { icon: Award, index: 4 },
  { icon: Heart, index: 5 },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tHeader = await getTranslations('header');

  const trustees = getTrustees();
  const managingCommittee = getManagingCommittee();

  const roleMap: Record<string, string> = {
    'Trustee': t('trusteeRole'),
    'President': t('presidentRole'),
    'Vice-President': t('vicePresidentRole'),
    'Secretary': t('secretaryRole'),
    'Treasurer': t('treasurerRole'),
  };

  return (
    <div className="space-y-0">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image
          src="/assets/og/hero-banner.jpg"
          alt={tHeader('logoAlt')}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-500/70 to-charcoal-500/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-4">
          <div className="mx-auto rounded-xl bg-ivory/90 backdrop-blur-sm p-2 inline-block">
            <Image
              src="/assets/og/logo.png"
              alt=""
              width={80}
              height={80}
              className="h-16 w-auto md:h-20"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50 md:text-4xl">{t('heroTitle')}</h1>
          <p className="text-sm text-gold-100/90 tracking-wider uppercase font-medium">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8">
          <SectionHeading title={t('storyTitle')} centered />

          <div className="text-charcoal-300 leading-relaxed space-y-5">
            <p>{t('storyPara1')}</p>
            <p>{t('storyPara2')}</p>
            <p className="text-charcoal font-medium">{t('storyPara3')}</p>
            <p>{t('storyPara4')}</p>
          </div>

          <ShlokaBlock
            devanagari="तन्मे मनः शिवसङ्कल्पमस्तु"
            iast={locale === 'en' ? "Tan me manaḥ śivasaṅkalpamastu" : undefined}
            translation={t('storyShlokaTranslation')}
            source={t('shlokaSource')}
            size="md"
          />

          <p className="text-charcoal-300 leading-relaxed text-center max-w-2xl mx-auto">{t('storyClosing')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-indigo border-y border-indigo-500">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-indigo-500/50 p-8 space-y-4 border border-indigo-200/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="shloka-devanagari text-gold text-lg">दृ</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-ivory-50">{t('visionTitle')}</h2>
              </div>
              <p className="text-ivory-100/80 leading-relaxed">{t('visionText')}</p>
            </div>

            <div className="rounded-xl bg-indigo-500/50 p-8 space-y-4 border border-indigo-200/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="shloka-devanagari text-gold text-lg">ल</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-ivory-50">{t('missionTitle')}</h2>
              </div>
              <p className="text-ivory-100/80 leading-relaxed">{t('missionText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
          <SectionHeading
            title={t('objectivesTitle')}
            devanagari="उद्देश्यानि"
            subtitle={t('objectivesSubtitle')}
            centered
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((obj) => (
              <Card key={obj.index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo shrink-0">
                    <obj.icon size={20} />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-indigo">
                    {t(OBJECTIVE_TITLE_KEYS[obj.index])}
                  </h3>
                </div>
                <p className="text-sm text-charcoal-300 leading-relaxed">
                  {t(OBJECTIVE_DESC_KEYS[obj.index])}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-ivory-50 border-y border-ivory-300">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-6">
          <SectionHeading title={t('operateTitle')} centered />
          <div className="text-charcoal-300 leading-relaxed space-y-4">
            <p>{t('operatePara1')}</p>
            <p>{t('operatePara2')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-14">
          <SectionHeading
            title={t('teamTitle')}
            devanagari="शिवसङ्कल्प वृन्दम्"
            subtitle={t('teamSubtitle')}
            centered
          />

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-indigo text-center">
              {t('managingCommittee')}
            </h3>
            <TrusteeGrid trustees={managingCommittee} roleMap={roleMap} clickToRead={t('clickToRead')} />
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-indigo text-center">{t('trustees')}</h3>
            <TrusteeGrid trustees={trustees} roleMap={roleMap} clickToRead={t('clickToRead')} />
          </div>
        </div>
      </section>

      <section className="bg-ivory-50 border-y border-ivory-300 py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8">
          <SectionHeading
            title={t('artefactsTitle')}
            subtitle={t('artefactsSubtitle')}
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="text-center space-y-3">
              <PlaceholderImage
                todoId="ARTEFACT-TODO-trust-certificate"
                caption={t('regCertificate')}
                aspectRatio="4/3"
              />
              <p className="text-sm font-medium text-charcoal-300">{t('regCertificate')}</p>
            </Card>
            <Card className="text-center space-y-3">
              <PlaceholderImage
                todoId="ARTEFACT-TODO-audit-report"
                caption={t('auditReport')}
                aspectRatio="4/3"
              />
              <p className="text-sm font-medium text-charcoal-300">{t('auditReport')}</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
