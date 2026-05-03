/**
 * next-intl middleware — detects locale from the URL path and redirects
 * or rewrites as needed.
 *
 * The matcher excludes:
 *   - Static assets, Next.js internals, API routes
 *   - Public files (images, SVGs, audio, etc.)
 *
 * Blog and styleguide live under app/[locale]/ — they must match this
 * middleware so /blog is rewritten with a locale (not parsed as [locale]).
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(en|kn)/:path*',
    '/((?!api|_next|assets|favicon\\.ico|.*\\..*).*)',
  ],
};
