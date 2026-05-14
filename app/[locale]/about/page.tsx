/**
 * About Us — trust introduction, the naming Anugraha from Sringeri,
 * vision, mission, objectives, and the team
 * (managing committee, trustees, trust members).
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { BookOpen, Users, Search, HandHeart, Award, Heart } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LogoEnlargeable } from '@/components/blocks/LogoEnlargeable';
import { getTrustees, getManagingCommittee, getTrustMembers } from '@/lib/data-access';
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
  const trustMembers = getTrustMembers();

  const roleMap: Record<string, string> = {
    'Trustee': t('trusteeRole'),
    'Trust member': t('trustMemberRole'),
    'President': t('presidentRole'),
    'Vice-President': t('vicePresidentRole'),
    'Secretary': t('secretaryRole'),
    'Treasurer': t('treasurerRole'),
    'Additional Treasurer': t('addlTreasurerRole'),
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
          <div className="flex justify-center">
            <LogoEnlargeable
              label={tHeader('logoAlt')}
              sizeClass="h-20 w-20 md:h-24 md:w-24"
              ringClass="ring-2 ring-ivory-50/30 shadow-md"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50 md:text-4xl">{t('heroTitle')}</h1>
          <p className="text-sm text-gold-100/90 tracking-wider uppercase font-medium">{t('heroSubtitle')}</p>
        </div>
      </section>

      <ScrollReveal>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionHeading title={t('storyTitle')} devanagari="इतिवृत्तम्" centered />

          <div className="mt-10 md:mt-12 space-y-5 max-w-2xl mx-auto">
            <p className="text-charcoal leading-relaxed">{t('storyPara1')}</p>
            <p className="text-charcoal-300 leading-relaxed">{t('storyPara2')}</p>
          </div>

          {/* Emotional pivot — lifted out of the prose flow */}
          <div className="my-12 md:my-14 flex flex-col items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-gold/50" />
            <p className="font-serif text-xl md:text-2xl text-indigo text-center leading-snug tracking-tight max-w-xl">
              {t('storyPara3')}
            </p>
            <span aria-hidden className="h-px w-10 bg-gold/50" />
          </div>

          <p className="text-charcoal-300 leading-relaxed max-w-2xl mx-auto">{t('storyPara4')}</p>

          <div className="mt-12">
            <ShlokaBlock
              devanagari="तन्मे मनः शिवसङ्कल्पमस्तु"
              iast={locale === 'en' ? "Tan me manaḥ śivasaṅkalpamastu" : undefined}
              translation={t('storyShlokaTranslation')}
              source={t('shlokaSource')}
              size="md"
            />
          </div>

          <p className="mt-6 font-serif italic text-charcoal text-center max-w-xl mx-auto leading-relaxed">
            {t('storyClosing')}
          </p>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="py-16 md:py-20 bg-ivory-50 border-y border-ivory-300">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-5 md:items-center">
            <figure className="md:col-span-2">
              <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-ivory shadow-md">
                <Image
                  src="/assets/artefacts/sri-vidhushekhara-bharati.jpg"
                  alt={t('anugrahaImageAlt')}
                  width={694}
                  height={1080}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs text-charcoal-200 italic leading-snug">
                {t('anugrahaCaption')}
              </figcaption>
            </figure>

            <div className="md:col-span-3 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-1 border border-gold/30">
                <span className="shloka-devanagari text-sm text-gold">अनुग्रहः</span>
                <span className="text-[10px] uppercase tracking-wider text-gold-400">
                  {t('anugrahaLabel')}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-indigo md:text-3xl">
                {t('anugrahaTitle')}
              </h2>
              <p className="text-charcoal-300 leading-relaxed">{t('anugrahaPara1')}</p>
              <p className="text-charcoal-300 leading-relaxed">{t('anugrahaPara2')}</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
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
      </ScrollReveal>

      <ScrollReveal>
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
      </ScrollReveal>

      <ScrollReveal>
      <section className="py-16 md:py-20 bg-ivory-50 border-y border-ivory-300">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-6">
          <SectionHeading title={t('operateTitle')} centered />
          <div className="text-charcoal-300 leading-relaxed space-y-4">
            <p>{t('operatePara1')}</p>
            <p>{t('operatePara2')}</p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
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
            <TrusteeGrid trustees={managingCommittee} roleMap={roleMap} />
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-indigo text-center">{t('trustees')}</h3>
            <TrusteeGrid trustees={trustees} roleMap={roleMap} showRole={false} />
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-indigo text-center">{t('trustMembers')}</h3>
            <TrusteeGrid trustees={trustMembers} roleMap={roleMap} showRole={false} />
          </div>
        </div>
      </section>
      </ScrollReveal>

    </div>
  );
}
