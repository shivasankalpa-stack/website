/**
 * FAQs — frequently asked questions with accordion UI.
 */

import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from './accordion';
import { Link } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('faqsTitle'),
    description: t('faqsDescription'),
  };
}

export default async function FAQsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faqs');

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6 space-y-10">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} centered />

        <FAQAccordion />

        <div className="text-center text-sm text-charcoal-200">
          <p>
            {t('closingText')}{' '}
            <Link href="/contact" className="text-indigo underline underline-offset-2">
              {t('writeToUs')}
            </Link>{' '}
            {t('closingEnd')}
          </p>
        </div>
      </div>
    </div>
  );
}
