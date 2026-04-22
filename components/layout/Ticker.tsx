/**
 * Ticker — sitewide dismissible announcement bar.
 *
 * For v0.1: Maharudra Purascharana, May 15–17, 2026.
 * Dismiss state stored in sessionStorage (migrates to localStorage in v0.15).
 * Sits above the Header on every page.
 */

'use client';

import { useSyncExternalStore } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'ticker-dismissed';

const listeners = new Set<() => void>();
function emitChange() {
  for (const fn of listeners) fn();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => { listeners.delete(callback); };
}

function getSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === 'true';
}

function getServerSnapshot() {
  return true;
}

export function Ticker() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function handleDismiss() {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    emitChange();
  }

  if (dismissed) return null;

  return (
    <div
      className="relative z-50 flex items-center justify-center gap-2 bg-indigo px-4 py-2 text-sm text-ivory-100 md:py-2.5"
      role="status"
      aria-label="Announcement"
    >
      {/* Kumkuma dot */}
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-kumkuma shrink-0"
        aria-hidden="true"
      />

      <p className="text-center">
        <span className="font-medium">Maharudra Purascharana</span>
        <span className="mx-1.5 text-ivory-100/50">·</span>
        <span>May 15–17, 2026</span>
        <span className="mx-1.5 text-ivory-100/50">·</span>
        <Link
          href="/events/maharudra"
          className="underline underline-offset-2 decoration-gold/60 hover:decoration-gold transition-colors"
        >
          Learn more →
        </Link>
      </p>

      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ivory-100/70 hover:text-ivory-50 hover:bg-indigo-500 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
