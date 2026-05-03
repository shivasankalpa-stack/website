/**
 * next-intl request configuration — loads the correct message JSON
 * for the current locale on each server request.
 *
 * This runs once per request during the Server Components render pass
 * (via React cache). It resolves the locale from the middleware and
 * dynamically imports the corresponding messages/<locale>.json file.
 *
 * Fallback: if the locale is invalid, defaults to 'en'.
 */

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'en' | 'kn')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
