/**
 * next-intl routing configuration.
 *
 * localePrefix: 'as-needed' means:
 *   - English (default): /about, /donations, etc. (no prefix)
 *   - Kannada:           /kn/about, /kn/donations, etc.
 *
 * Also exports locale-aware navigation helpers (Link, redirect, etc.)
 * that automatically handle the locale prefix.
 */

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
