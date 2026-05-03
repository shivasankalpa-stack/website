/**
 * Donations page — three purpose cards with donation modal.
 *
 * Emphasises transparency and the three channels: Gurukula Abhivruddhi,
 * Go-Samrakshanam, Event Seva.
 *
 * TODO v0.2: Razorpay integration + automated 80G receipts
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DonationSection } from '@/components/blocks/DonationSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('donationsTitle'),
    description: t('donationsDescription'),
  };
}

export default async function DonationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('donations');

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8 text-center">
        <SectionHeading title={t('title')} devanagari="दानम्" subtitle={t('subtitle')} centered />

        <div className="flex justify-center">
          <Image
            src="/assets/artefacts/donation-sraddha.png"
            alt={t('imageAlt')}
            width={400}
            height={400}
            className="w-full max-w-sm rounded-xl shadow-md"
          />
        </div>

        <div className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed space-y-3">
          <p>{t('introPara1')}</p>
          <p>{t('introPara2')}</p>
        </div>
      </div>

      <DonationSection />

      <div className="mx-auto max-w-4xl px-4 md:px-6 text-center mt-8">
        <p className="text-xs text-charcoal-200 max-w-md mx-auto leading-relaxed">
          {t('contactNote')}{' '}
          <a
            href="mailto:info@shivasankalpa.org"
            className="text-indigo underline underline-offset-2"
          >
            info@shivasankalpa.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}
