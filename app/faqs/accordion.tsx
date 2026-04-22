/**
 * FAQ accordion — client component for expandable Q&A items.
 */

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/lib/types';

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="divide-y divide-ivory-300 border-y border-ivory-300">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div key={faq.id}>
            <button
              onClick={() => toggle(faq.id)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-indigo"
              aria-expanded={isOpen}
              aria-controls={`faq-${faq.id}`}
            >
              <span className="font-serif text-lg font-medium text-indigo">
                {faq.question}
              </span>
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
              <p className="text-charcoal-300 leading-relaxed pr-8">
                {faq.answer.replace(/#FAQ-TODO-\S+/g, '').trim()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
