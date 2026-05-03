/**
 * i18n configuration — supported locales and default locale.
 *
 * Locales:
 *   en — English (default, no URL prefix)
 *   kn — Kannada (prefixed as /kn/...)
 *
 * All main site routes (including /blog and /styleguide) live under
 * app/[locale]/ and share this locale configuration.
 */

export const locales = ['en', 'kn'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
