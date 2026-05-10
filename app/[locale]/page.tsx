/**
 * Homepage — Sri Shivasankalpa Vṛnda
 *
 * Sections (top to bottom):
 *   1. Hero with banner image, tagline shloka, audio player, CTAs
 *   2. Importance of Veda Vidya with Veda Vruksha image
 *   3. Why Vedic Gurukulas Matter Today
 *   4. Featured Gurukulas (3 cards)
 *   5. Upcoming Events (Maharudra)
 *   6. Jagadguru's Anugraha callout
 *   7. Donation CTA (3 purpose cards + modal)
 */

import Image from 'next/image';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AudioPlayer } from '@/components/blocks/AudioPlayer';
import { DonationSection } from '@/components/blocks/DonationSection';
import { EnrolCallout } from '@/components/blocks/EnrolCallout';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LogoEnlargeable } from '@/components/blocks/LogoEnlargeable';
import { getGurukulas, getFeaturedEvents } from '@/lib/data-access';
import { Link } from '@/i18n/routing';

const SLUG_TO_KEY: Record<string, string> = {
  'shruti-parampara': 'shrutiParampara',
  'namma-sampradaya': 'nammaSampradaya',
  'shankara-gurukulam': 'shankaraGurukulam',
  'sri-ramana-brahma-vidyashrama': 'sriRamanaBrahmaVidyashrama',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const tGk = await getTranslations('gurukulaDetail');
  const tMr = await getTranslations('maharudra');

  const gurukulas = getGurukulas();
  const featuredEvents = getFeaturedEvents();
  const maharudra = featuredEvents[0];

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/og/hero-banner-mobile.png"
          alt="Dakshinamurthy — the Adi Guru"
          className="absolute inset-0 h-full w-full object-cover object-[80%_center] md:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/og/hero-banner.jpg"
          alt="Gurukula students"
          className="absolute inset-0 h-full w-full object-cover hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-500/70 via-charcoal-500/60 to-charcoal-500/80" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-8 py-[4.25rem] md:py-16">
          <div className="hidden md:flex justify-center">
            <LogoEnlargeable
              label={t('heroTitle')}
              sizeClass="h-28 w-28 md:h-32 md:w-32"
              ringClass="ring-2 ring-ivory-50/30 shadow-lg"
            />
          </div>

          <div className="space-y-3">
            <p className="shloka-devanagari text-2xl text-gold-100 md:text-3xl drop-shadow-md">
              तन्मे मनः शिवसङ्कल्पमस्तु
            </p>
            {t('heroIast') && (
              <p className="shloka-iast text-base text-ivory-100/80 md:text-lg">
                {t('heroIast')}
              </p>
            )}
            <p className="text-sm text-ivory-100/70 italic">{t('heroTaglineTranslation')}</p>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-3xl font-bold text-ivory-50 md:text-5xl tracking-tight drop-shadow-md">
              {t('heroTitle')}
            </h1>
            <p className="text-sm text-gold-100/90 tracking-wider uppercase font-medium">
              {t('heroSubtitle')}
            </p>
            <p className="mx-auto max-w-xl text-base text-ivory-100/80 leading-relaxed">
              {t('heroDescription')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/donations">
              <Button variant="primary" size="lg" className="!bg-kumkuma hover:!bg-kumkuma-500 !border-kumkuma">
                {t('supportGurukula')}
              </Button>
            </Link>
            <Link href="/events/maharudra">
              <Button variant="secondary" size="lg" className="!border-ivory-100/40 !text-ivory-50 hover:!bg-ivory-50/10">
                {t('maharudraPurascharana')}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="pt-4">
            <AudioPlayer src="/assets/audio/vedic-chant.mp4" />
          </div>
        </div>
      </section>

      <ScrollReveal>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
          <SectionHeading
            title={t('vedaVidyaTitle')}
            devanagari="वेदविद्या"
            subtitle={t('vedaVidyaSubtitle')}
            centered
          />

          <ShlokaBlock
            devanagari={"ऋचो यजूंषि सामानि अथर्वाङ्गिरसां तथा।\nएष वेदचतुष्टस्य धर्मो मूलं सनातनम्॥"}
            iast={locale === 'en' ? "Ṛco yajūṃṣi sāmāni atharvāṅgirasāṃ tathā | Eṣa vedacatuṣṭasya dharmo mūlaṃ sanātanam ||" : undefined}
            translation={t('vedaVidyaShlokaTranslation')}
            source="Viṣṇu Purāṇa"
            size="md"
          />

          <div className="flex justify-center py-4">
            <Image
              src="/assets/artefacts/veda-vruksha.png"
              alt={t('vedaVrukshaAlt')}
              width={600}
              height={850}
              className="w-full max-w-xl rounded-lg"
            />
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="py-16 md:py-20 bg-ivory-50 border-y border-ivory-300">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8">
          <SectionHeading
            title={t('whyGurukulasTitle')}
            devanagari="वेदो नित्यमधीयताम्"
            subtitle={t('whyGurukulasSubtitle')}
            centered
          />

          <div className="space-y-5 text-charcoal-300 leading-relaxed">
            <p>
              {t('whyGurukulasPara1', {
                shloka: locale === 'en' ? 'vedō nityam adhīyatām' : 'ವೇದೋ ನಿತ್ಯಮಧೀಯತಾಮ್',
              })}
            </p>
            <p>{t('whyGurukulasPara2')}</p>
            <p>
              {t('whyGurukulasPara3', {
                lokaKalyana: locale === 'en' ? 'loka kalyāṇa' : 'ಲೋಕಕಲ್ಯಾಣ',
              })}
            </p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
          <SectionHeading
            title={t('gurukulasTitle')}
            devanagari="गुरुकुलानि"
            subtitle={t('gurukulasSubtitle')}
            centered
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {gurukulas.slice(0, 4).map((gk) => {
              const key = SLUG_TO_KEY[gk.slug];
              const localised = (field: string, fallback: string) =>
                key ? tGk(`${key}_${field}` as Parameters<typeof tGk>[0]) : fallback;
              const name = localised('name', gk.name);
              const location = localised('location', gk.location);
              const acharya = localised('acharya', gk.acharya);
              return (
                <Link key={gk.slug} href={`/gurukulas/${gk.slug}`}>
                  <Card hover as="article" className="h-full !p-0 overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={gk.heroImage}
                        alt={`${name}, ${location}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5 md:p-6 space-y-2">
                      <h3 className="font-serif text-lg font-semibold text-indigo leading-snug">
                        {name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm text-charcoal-200">
                        <MapPin size={14} />
                        {location}
                      </div>
                      <p className="text-sm text-charcoal-300">
                        {t('acharyaLabel')} {acharya}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm text-charcoal-200">
                        <Users size={14} />
                        {t('studentsLabel', { count: gk.studentCount })}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/gurukulas">
              <Button variant="ghost">
                {t('viewAllGurukulas')}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Emotional CTA inviting parents to enrol — placed right after the
          Gurukulas grid so visitors who've just seen the options have a
          clear, dharmic next step. */}
      <ScrollReveal>
        <EnrolCallout />
      </ScrollReveal>

      {maharudra && (
        <ScrollReveal>
        <section className="py-16 md:py-20 bg-indigo-50/50 border-y border-ivory-300">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Card className="!bg-ivory-50 !p-8 md:!p-10 space-y-6 border-indigo-100">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <p className="shloka-devanagari text-sm text-kumkuma">महारुद्र पुरश्चरणा</p>
                  <h2 className="font-serif text-2xl font-bold text-indigo md:text-3xl">
                    {tMr('cardTitle')}
                  </h2>
                  <p className="text-sm text-charcoal-200">
                    {t('maharudraDate')} · {maharudra.location || t('maharudraLocation')}
                  </p>
                </div>
                <Link href="/events/maharudra" className="shrink-0">
                  <Button variant="primary">
                    {t('learnMoreParticipate')}
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
              <p className="text-charcoal-300 leading-relaxed">{tMr('cardDescription')}</p>
              <ShlokaBlock
                devanagari="रुदं द्रावयति इति रुद्रः"
                iast={locale === 'en' ? "Rudam drāvayati iti Rudraḥ" : undefined}
                translation={t('maharudraShlokaTranslation')}
                size="sm"
              />
            </Card>
          </div>
        </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <div className="relative rounded-xl border border-gold/30 bg-gold-50/40 overflow-hidden">
            <div className="overflow-hidden">
              <Image
                src="/assets/artefacts/sringeri-parampara.jpg"
                alt={t('sringeriImageAlt')}
                width={1024}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="p-8 md:p-10 text-center space-y-5">
              <div className="inline-block rounded-full bg-ivory px-4 py-1 border border-gold/30">
                <span className="shloka-devanagari text-sm text-gold">अनुग्रहः</span>
              </div>

              <h2 className="font-serif text-2xl font-semibold text-indigo md:text-3xl">
                {t('sringeriTitle')}
              </h2>

              <p className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed">{t('sringeriPara')}</p>

              <p className="text-sm text-charcoal-200 italic">{t('sringeriNote')}</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <div className="border-t border-ivory-300 bg-ivory-50">
        <DonationSection />
      </div>
      </ScrollReveal>
    </>
  );
}
