/**
 * FAQ accordion — client component for expandable Q&A items.
 */

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FAQ_ITEMS = [
  { id: 'what-is-shivasankalpa', qKey: 'q0' as const, aKey: 'a0' as const },
  { id: 'what-does-shivasankalpa-mean', qKey: 'q1' as const, aKey: 'a1' as const },
  { id: 'how-are-donations-used', qKey: 'q2' as const, aKey: 'a2' as const },
  { id: 'how-to-participate', qKey: 'q3' as const, aKey: 'a3' as const },
  { id: 'is-donation-tax-exempt', qKey: 'q4' as const, aKey: 'a4' as const },
  { id: 'which-gurukulas', qKey: 'q5' as const, aKey: 'a5' as const },
  { id: 'how-to-volunteer', qKey: 'q6' as const, aKey: 'a6' as const },
  { id: 'sringeri-connection', qKey: 'q7' as const, aKey: 'a7' as const },
];

export function FAQAccordion() {
  const t = useTranslations('faqs');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="divide-y divide-ivory-300 border-y border-ivory-300">
      {FAQ_ITEMS.map((faq) => {
        const isOpen = openId === faq.id;
        const answer = t(faq.aKey).replace(/#FAQ-TODO-\S+/g, '').trim();

        return (
          <div key={faq.id}>
            <button
              onClick={() => toggle(faq.id)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-indigo"
              aria-expanded={isOpen}
              aria-controls={`faq-${faq.id}`}
            >
              <span className="font-serif text-lg font-medium text-indigo">{t(faq.qKey)}</span>
              <ChevronDown
                size={20}
                className={`mt-1 shrink-0 text-charcoal-200 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={`faq-${faq.id}`}
              role="region"
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? 'max-h-96 pb-5' : 'max-h-0'
              }`}
            >
              <p className="text-charcoal-300 leading-relaxed pr-8">{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
