/**
 * EnrolCallout — emotional, dharmic call-to-action inviting parents to
 * enrol their children in one of the supported Veda Gurukulas.
 *
 * Visually distinct from regular sections — deep indigo→kumkuma gradient
 * with a temple-gold shloka, ivory body copy, and a kumkuma primary
 * button — so it stands out wherever it appears (home, gurukulas list,
 * etc.) and reads as a sincere invitation rather than a marketing pitch.
 *
 * Pure server component (no state); composes a client `Button` and the
 * locale-aware `Link`.
 */

import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

interface EnrolCalloutProps {
  /**
   * Visual variant. `band` paints a full-width section (used between page
   * sections); `card` renders a contained rounded card (use inside an
   * existing layout container that already has its own padding).
   */
  variant?: 'band' | 'card';
  /** Override the primary CTA label (defaults to `enrol.cta`). */
  ctaLabelKey?: 'cta' | 'ctaShort';
}

export async function EnrolCallout({
  variant = 'band',
  ctaLabelKey = 'cta',
}: EnrolCalloutProps = {}) {
  const t = await getTranslations('enrol');
  const shlokaIast = t('shlokaIast');

  const Inner = (
    <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6 text-center space-y-7">
      {/* Devanagari shloka in temple gold — the auspicious opening */}
      <div className="space-y-1.5">
        <p className="shloka-devanagari text-2xl md:text-3xl text-gold-100 drop-shadow-sm">
          तमसो मा ज्योतिर्गमय
        </p>
        {shlokaIast && (
          <p className="shloka-iast text-sm text-ivory-100/70 italic">
            {shlokaIast}
          </p>
        )}
        <p className="text-xs md:text-sm text-gold-100/80 italic">
          — {t('shlokaTranslation')}
        </p>
      </div>

      {/* Headline */}
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory-50 tracking-tight drop-shadow-md">
        {t('title')}
      </h2>

      {/* Body copy */}
      <div className="space-y-4 text-ivory-100/90 leading-relaxed text-base md:text-[1.0625rem] mx-auto max-w-2xl">
        <p>{t('para1')}</p>
        <p>{t('para2')}</p>
        <p className="font-serif italic text-gold-100">{t('closing')}</p>
      </div>

      {/* Primary CTA + sub-note */}
      <div className="space-y-3 pt-2">
        <Link href="/gurukulas" className="inline-block">
          <Button
            variant="primary"
            size="lg"
            className="!bg-kumkuma hover:!bg-kumkuma-500 !border-kumkuma !text-ivory-50 shadow-lg shadow-kumkuma-500/30"
          >
            {t(ctaLabelKey)}
            <ArrowRight size={18} />
          </Button>
        </Link>
        <p className="text-xs uppercase tracking-[0.18em] text-gold-100/85 font-medium">
          {t('admissionsNote')}
        </p>
      </div>
    </div>
  );

  if (variant === 'card') {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-br from-indigo via-indigo-500 to-kumkuma-500 py-14 md:py-16 shadow-md">
        {/* Subtle radial decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_25%_30%,_white_1px,_transparent_1.5px),radial-gradient(circle_at_75%_70%,_white_1px,_transparent_1.5px)] [background-size:120px_120px]"
        />
        {Inner}
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo via-indigo-500 to-kumkuma-500 border-y border-indigo-500 py-20 md:py-24">
      {/* Subtle radial decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_20%_30%,_white_1px,_transparent_1.5px),radial-gradient(circle_at_80%_70%,_white_1px,_transparent_1.5px)] [background-size:120px_120px]"
      />
      {/* Top hairline in gold for a temple-card feel */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      {Inner}
    </section>
  );
}
