/**
 * ShlokaBlock — reverent display of Vedic verses.
 *
 * Three layers:
 *   1. Devanagari in Noto Serif Devanagari (or Shobhika when self-hosted)
 *   2. IAST transliteration in italic EB Garamond
 *   3. English meaning in Inter
 *
 * Never used as background decoration — always presented with adequate
 * vertical spacing and respectful formatting.
 */

import type { ShlokaData } from '@/lib/types';

interface ShlokaBlockProps extends ShlokaData {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: { devanagari: 'text-lg', iast: 'text-sm', translation: 'text-sm' },
  md: { devanagari: 'text-xl md:text-2xl', iast: 'text-base', translation: 'text-base' },
  lg: { devanagari: 'text-2xl md:text-3xl', iast: 'text-lg', translation: 'text-lg' },
};

export function ShlokaBlock({
  devanagari,
  iast,
  translation,
  source,
  size = 'md',
  className = '',
}: ShlokaBlockProps) {
  const styles = sizeStyles[size];

  return (
    <blockquote
      className={`space-y-3 text-center py-4 ${className}`}
      lang="sa"
    >
      {/* Devanagari */}
      <p className={`shloka-devanagari ${styles.devanagari} text-indigo leading-relaxed whitespace-pre-line`}>
        {devanagari}
      </p>

      {/* IAST transliteration */}
      {iast && (
        <p className={`shloka-iast ${styles.iast} text-charcoal-300`}>
          {iast}
        </p>
      )}

      {/* English meaning */}
      {translation && (
        <p className={`${styles.translation} text-charcoal-300 italic max-w-xl mx-auto leading-relaxed`}>
          {translation}
        </p>
      )}

      {/* Source attribution */}
      {source && (
        <cite className="block text-xs text-charcoal-200 not-italic mt-2">
          — {source}
        </cite>
      )}
    </blockquote>
  );
}
