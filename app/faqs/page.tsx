/**
 * FAQs — frequently asked questions with accordion UI.
 */

import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getFaqs } from '@/lib/data-access';
import { FAQAccordion } from './accordion';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about Sri Shivasankalpa Trust — objectives, donations, volunteering, and more.',
};

export default function FAQsPage() {
  const faqs = getFaqs();

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6 space-y-10">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Common questions about the trust, our work, and how you can participate."
          centered
        />

        <FAQAccordion faqs={faqs} />

        <div className="text-center text-sm text-charcoal-200">
          <p>
            Have another question?{' '}
            <a href="/contact" className="text-indigo underline underline-offset-2">
              Write to us
            </a>{' '}
            and we will respond promptly.
          </p>
        </div>
      </div>
    </div>
  );
}
