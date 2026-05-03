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
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DonationDetails } from '@/components/blocks/DonationDetails';

const purposes = [
  {
    id: 'gurukula-abhivruddhi',
    titleKey: 'purpose0Title' as const,
    descKey: 'purpose0Desc' as const,
    titleSanskrit: 'गुरुकुल अभिवृद्धि',
    Icon: GraduationCap,
  },
  {
    id: 'go-samrakshanam',
    titleKey: 'purpose1Title' as const,
    descKey: 'purpose1Desc' as const,
    titleSanskrit: 'गोसंरक्षणम्',
    Icon: Heart,
  },
  {
    id: 'event-seva',
    titleKey: 'purpose2Title' as const,
    descKey: 'purpose2Desc' as const,
    titleSanskrit: 'कार्यक्रम सेवा',
    Icon: Calendar,
  },
];

export function DonationSection() {
  const t = useTranslations('donation');
  const [modalPurpose, setModalPurpose] = useState<string | null>(null);

  const activePurpose = purposes.find((p) => p.id === modalPurpose);
  const activeTitle = activePurpose ? t(activePurpose.titleKey) : undefined;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        <SectionHeading
          title={t('sectionTitle')}
          devanagari="दानम्"
          subtitle={t('sectionSubtitle')}
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
                    {t(purpose.titleKey)}
                  </h3>
                  <p className="shloka-devanagari text-xs text-indigo-300">
                    {purpose.titleSanskrit}
                  </p>
                </div>
              </div>
              <p className="text-sm text-charcoal-300 leading-relaxed flex-1">
                {t(purpose.descKey)}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 w-full"
                onClick={() => setModalPurpose(purpose.id)}
              >
                {t('contribute')}
              </Button>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={!!modalPurpose}
          onClose={() => setModalPurpose(null)}
          title={activeTitle ? `${t('donatePrefix')}${activeTitle}` : t('donateDefault')}
        >
          <DonationDetails purposeLabel={activeTitle} />
        </Modal>
      </div>
    </section>
  );
}
