/**
 * Inline links for plain-text fields edited in Studio.
 *
 *   [label](https://example.org)   → external link (opens in a new tab)
 *   [label](/donations)            → page on this site (locale-aware)
 *   [label](mailto:x@y.org)        → email link
 *   https://example.org            → bare URLs are linked automatically
 *
 * Anything else (e.g. `javascript:` URLs) is shown as plain text.
 */

import type { ReactNode } from 'react';
import { Link } from '@/i18n/routing';

const LINK_CLASS =
  'font-medium text-indigo underline decoration-indigo/30 underline-offset-2 hover:decoration-indigo transition-colors';

// 1–2: [label](href)   3: bare http(s) URL (trailing punctuation left out)
const INLINE =
  /\[([^\]\n]+)\]\(\s*([^)\s]+)\s*\)|(https?:\/\/[^\s<>()]*[^\s<>().,;:!?'"])/g;

type Token =
  | { kind: 'text'; text: string }
  | { kind: 'link'; label: string; href: string };

function safeHref(href: string): string | null {
  if (/^https?:\/\//i.test(href) || /^(mailto|tel):/i.test(href)) return href;
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  return null;
}

export function tokenizeInline(text: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ kind: 'text', text: text.slice(last, index) });
    const label = match[1] ?? match[3];
    const href = safeHref(match[2] ?? match[3]);
    tokens.push(href ? { kind: 'link', label, href } : { kind: 'text', text: match[0] });
    last = index + match[0].length;
  }
  if (last < text.length) tokens.push({ kind: 'text', text: text.slice(last) });
  return tokens;
}

/** Plain text with link markup removed — for places that are already a link (cards, meta tags). */
export function stripInlineLinks(text: string): string {
  return tokenizeInline(text)
    .map((t) => (t.kind === 'link' ? t.label : t.text))
    .join('');
}

export function InlineText({ text }: { text: string }): ReactNode {
  return tokenizeInline(text).map((token, i) => {
    if (token.kind === 'text') return token.text;
    if (token.href.startsWith('/')) {
      return (
        <Link key={i} href={token.href} className={LINK_CLASS}>
          {token.label}
        </Link>
      );
    }
    const external = /^https?:/i.test(token.href);
    return (
      <a
        key={i}
        href={token.href}
        className={LINK_CLASS}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {token.label}
      </a>
    );
  });
}
