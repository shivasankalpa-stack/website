/**
 * DonationSection — homepage CTA with three purpose cards + donation modal.
 *
 * Each card (Gurukula Abhivruddhi, Go-Samrakshanam, Event Seva) opens a
 * shared modal showing UPI/QR/bank placeholders.
 *
 * TODO v0.2: Razorpay integration + automated 80G receipts
 */

'use client';

import { useState } from 'react';
import { GraduationCap, Heart, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DonationDetails } from '@/components/blocks/DonationDetails';

const purposes = [
  {
    id: 'gurukula-abhivruddhi',
    title: 'Gurukula Abhivruddhi',
    titleSanskrit: 'गुरुकुल अभिवृद्धि',
    description:
      'Direct support to Vedic Gurukulas — infrastructure, teaching materials, student nutrition, and welfare of Adhyāpakas.',
    Icon: GraduationCap,
  },
  {
    id: 'go-samrakshanam',
    title: 'Go-Samrakshanam',
    titleSanskrit: 'गोसंरक्षणम्',
    description:
      'Supporting Gośālās and the sacred cause of cow protection, shelter, and sustenance.',
    Icon: Heart,
  },
  {
    id: 'event-seva',
    title: 'Event Seva',
    titleSanskrit: 'कार्यक्रम सेवा',
    description:
      'Funding sacred events such as the Maharudra Purascharana, community gatherings, and awareness programmes for universal welfare.',
    Icon: Calendar,
  },
];

export function DonationSection() {
  const [modalPurpose, setModalPurpose] = useState<string | null>(null);

  const activePurpose = purposes.find((p) => p.id === modalPurpose);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        <SectionHeading
          title="Support the Cause"
          devanagari="दानम्"
          subtitle="Your contribution sustains Vedic education, protects sacred traditions, and uplifts communities."
          centered
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {purposes.map((purpose) => (
            <Card key={purpose.id} hover className="flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo shrink-0">
                  <purpose.Icon size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-indigo">
                    {purpose.title}
                  </h3>
                  <p className="shloka-devanagari text-xs text-indigo-300">
                    {purpose.titleSanskrit}
                  </p>
                </div>
              </div>
              <p className="text-sm text-charcoal-300 leading-relaxed flex-1">
                {purpose.description}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 w-full"
                onClick={() => setModalPurpose(purpose.id)}
              >
                Contribute
              </Button>
            </Card>
          ))}
        </div>

        {/* Donation modal */}
        <Modal
          isOpen={!!modalPurpose}
          onClose={() => setModalPurpose(null)}
          title={activePurpose ? `Donate — ${activePurpose.title}` : 'Donate'}
        >
          {/* TODO: Replace with actual trust account details once available */}
          <DonationDetails purposeLabel={activePurpose?.title} />
        </Modal>
      </div>
    </section>
  );
}
