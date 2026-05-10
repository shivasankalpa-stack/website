/**
 * Ticker — sitewide dismissible announcement bar.
 *
 * Now rotates between multiple announcements (Maharudra event +
 * Gurukula admissions CTA) with a soft cross-fade. Pauses on hover/focus
 * and honours `prefers-reduced-motion` (no auto-rotate, just shows the
 * first item with a button to advance manually).
 *
 * Dismiss state stored in sessionStorage (migrates to localStorage in v0.15).
 * Sits above the Header on every page.
 */

'use client';

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { ChevronRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const STORAGE_KEY = 'ticker-dismissed';
const ROTATE_MS = 6000;

const listeners = new Set<() => void>();
function emitChange() {
  for (const fn of listeners) fn();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === 'true';
}

function getServerSnapshot() {
  return true;
}

/** Subscribe to `prefers-reduced-motion`. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

interface TickerItem {
  id: string;
  /** Inline message body — left of the CTA link. */
  body: ReactNode;
  href: string;
  cta: string;
  /** Tailwind class for the leading dot accent. */
  dotClass: string;
}

export function Ticker() {
  const t = useTranslations('ticker');
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reduceMotion = usePrefersReducedMotion();

  const items: TickerItem[] = [
    {
      id: 'maharudra',
      dotClass: 'bg-kumkuma',
      body: (
        <>
          <span className="font-medium">{t('eventName')}</span>
          <span className="mx-1.5 text-ivory-100/50">·</span>
          <span>{t('eventDate')}</span>
        </>
      ),
      href: '/events/maharudra',
      cta: t('learnMore'),
    },
    {
      id: 'enrol',
      dotClass: 'bg-gold',
      body: (
        <>
          <span className="font-medium">{t('enrolTitle')}</span>
          <span className="mx-1.5 hidden sm:inline text-ivory-100/50">·</span>
          <span className="hidden sm:inline">{t('enrolHint')}</span>
        </>
      ),
      href: '/gurukulas',
      cta: t('chooseGurukula'),
    },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % items.length);
  }, [items.length]);

  // Auto-rotate, pausable.
  useEffect(() => {
    if (dismissed) return;
    if (paused) return;
    if (reduceMotion) return;
    if (items.length < 2) return;
    const id = window.setInterval(advance, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [advance, dismissed, paused, reduceMotion, items.length]);

  function handleDismiss() {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    emitChange();
  }

  if (dismissed) return null;

  return (
    <div
      className="relative z-50 bg-indigo text-sm text-ivory-100"
      role="region"
      aria-label={t('announcement')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        // Only unpause when focus actually leaves the ticker.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* Cross-fade stack: each item is placed in the same grid cell so
          the bar height is stable (sized to the tallest item) regardless
          of which one is active. Only the active item is opaque and
          interactive; the rest stay in the DOM for SEO / screen readers. */}
      <div
        className="grid mx-auto min-h-[2.25rem] md:min-h-[2.5rem] items-center justify-items-center px-10 py-1.5 md:py-2"
        aria-live="polite"
        aria-atomic="false"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <p
              key={item.id}
              aria-hidden={!isActive}
              style={{ gridColumn: 1, gridRow: 1 }}
              className={`
                flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center
                transition-opacity duration-500 ease-out
                ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${item.dotClass}`}
                aria-hidden="true"
              />
              {item.body}
              <span className="mx-1.5 text-ivory-100/50">·</span>
              <Link
                href={item.href}
                className="underline underline-offset-2 decoration-gold/60 hover:decoration-gold focus-visible:decoration-gold transition-colors"
                tabIndex={isActive ? 0 : -1}
              >
                {item.cta}
              </Link>
            </p>
          );
        })}
      </div>

      {/* Manual advance — visible always when there are 2+ items, gives
          reduced-motion users a way to flip between announcements. */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={advance}
          aria-label={t('next')}
          className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex h-6 w-6 items-center justify-center rounded text-ivory-100/70 hover:text-ivory-50 hover:bg-indigo-500 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Dot indicators */}
      {items.length > 1 && (
        <div
          className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5"
          aria-hidden="true"
        >
          {items.map((item, i) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-4 bg-gold'
                  : 'w-1.5 bg-ivory-100/30'
              }`}
            />
          ))}
        </div>
      )}

      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ivory-100/70 hover:text-ivory-50 hover:bg-indigo-500 transition-colors"
        aria-label={t('dismiss')}
      >
        <X size={16} />
      </button>
    </div>
  );
}
