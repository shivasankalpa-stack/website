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
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DonationSection } from '@/components/blocks/DonationSection';

export const metadata: Metadata = {
  title: 'Donations',
  description:
    'Support Vedic Gurukulas, Go-Samrakshanam, and sacred events through your generous contributions to Sri Shivasankalpa Trust.',
};

export default function DonationsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8 text-center">
        <SectionHeading
          title="Donate"
          devanagari="दानम्"
          subtitle="Every contribution sustains Vedic education and preserves the Guru–Shishya Parampara."
          centered
        />

        {/* Illustration */}
        <div className="flex justify-center">
          <Image
            src="/assets/artefacts/donation-sraddha.png"
            alt="Śraddhayā deyam — Give with faith. A student offering to his Guru."
            width={400}
            height={400}
            className="w-full max-w-sm rounded-xl shadow-md"
          />
        </div>

        <div className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed space-y-3">
          <p>
            Your support directly reaches Vedic Gurukulas, Adhyāpakas, and
            Vidyārthīs who dedicate their lives to preserving the oral tradition
            of the Vedas. Donations also support Gośālās and sacred events that
            benefit the broader community.
          </p>
          <p>
            Choose a purpose below and contribute via UPI or bank transfer. Please
            include the purpose and your name in the transfer note so we can track
            your contribution and issue a receipt.
          </p>
        </div>
      </div>

      <DonationSection />

      <div className="mx-auto max-w-4xl px-4 md:px-6 text-center mt-8">
        <p className="text-xs text-charcoal-200 max-w-md mx-auto leading-relaxed">
          For questions about donations, receipts, or specific allocation
          requests, please write to{' '}
          <a
            href="mailto:info@shivasankalpa.org"
            className="text-indigo underline underline-offset-2"
          >
            info@shivasankalpa.org
          </a>.
        </p>
      </div>
    </div>
  );
}
