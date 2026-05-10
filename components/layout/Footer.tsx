/**
 * Footer — site-wide footer with logo, navigation, contact info, and legal.
 */

import Image from 'next/image';
import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const footerNav = [
  { href: '/blog', key: 'navBlog' as const },
  { href: '/gallery', key: 'navGallery' as const },
  { href: '/faqs', key: 'navFaqs' as const },
  { href: '/contact', key: 'navContact' as const },
  { href: '/about', key: 'navAbout' as const },
  { href: '/donations', key: 'navDonations' as const },
];

export async function Footer() {
  const t = await getTranslations('footer');
  const tHeader = await getTranslations('header');

  return (
    <footer className="border-t border-ivory-300 bg-ivory-100">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/og/logo.jpg"
                alt={tHeader('logoAlt')}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-serif text-lg font-semibold text-indigo">
                  {t('brandName')}
                </h3>
                <p className="text-[10px] text-charcoal-200 tracking-wide uppercase">
                  {t('tagline')}
                </p>
              </div>
            </div>
            <p className="shloka-devanagari text-sm text-indigo-300">
              तन्मे मनः शिवसङ्कल्पमस्तु
            </p>
            <p className="text-sm text-charcoal-300 leading-relaxed">{t('description')}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-200 mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal-300 hover:text-indigo transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-200 mb-4">
              {t('getInTouch')}
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@shivasankalpa.org"
                className="inline-flex items-center gap-2 text-sm text-charcoal-300 hover:text-indigo transition-colors"
              >
                <Mail size={16} />
                info@shivasankalpa.org
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-ivory-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-200">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <p>
            {t('regNo')} <span className="font-mono">#REG-TODO</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
