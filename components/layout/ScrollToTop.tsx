/**
 * ScrollToTop — floating button that appears after scrolling down.
 *
 * Sits in the bottom-right corner of the viewport. Smooth-scrolls
 * back to the top on tap. Especially useful on long mobile pages.
 * Fades in after 400px of scroll and fades out when near the top.
 */

'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ScrollToTop() {
  const t = useTranslations('scrollToTop');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="
        fixed bottom-6 right-6 z-40
        flex items-center gap-1.5 rounded-full
        bg-indigo/90 px-4 py-2.5
        text-xs font-medium text-ivory-100
        shadow-lg backdrop-blur-sm
        hover:bg-indigo transition-all
        active:scale-95
      "
      aria-label={t('ariaLabel')}
    >
      <ChevronUp size={16} />
      <span className="hidden sm:inline">{t('label')}</span>
    </button>
  );
}
