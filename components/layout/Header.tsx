/**
 * Header — site navigation with logo, desktop nav links, and mobile menu.
 *
 * Uses the trust's Kannada-script logo. Sticky below the Ticker.
 * On mobile, a hamburger reveals a slide-out navigation panel from the right.
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';

const navItems = [
  { href: '/', key: 'navHome' as const },
  { href: '/gurukulas', key: 'navGurukulas' as const },
  { href: '/events', key: 'navEvents' as const },
  { href: '/gallery', key: 'navGallery' as const },
  { href: '/donations', key: 'navDonations' as const },
  { href: '/about', key: 'navAbout' as const },
];

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ivory-300 bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 min-w-0">
            <Image
              src="/assets/og/logo.png"
              alt={t('logoAlt')}
              width={44}
              height={44}
              className="h-10 w-auto md:h-11 mix-blend-multiply"
              priority
            />
            <div className="leading-tight hidden sm:block min-w-0">
              <span className="font-serif text-base font-semibold text-indigo group-hover:text-indigo-300 transition-colors md:text-lg">
                {t('brandName')}
              </span>
              <span className="block text-[9px] text-charcoal-200 tracking-wider uppercase">
                {t('brandSub')}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-4" aria-label={t('mainNav')}>
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        isActive(item.href)
                          ? 'text-indigo bg-indigo-50'
                          : 'text-charcoal-300 hover:text-indigo hover:bg-indigo-50/50'
                      }
                    `}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="flex items-center gap-1.5 border-l border-ivory-300 pl-4 text-sm text-charcoal-300"
              aria-label="Language"
            >
              <Link
                href={pathname}
                locale="en"
                className={
                  locale === 'en'
                    ? 'font-semibold text-indigo'
                    : 'hover:text-indigo transition-colors'
                }
              >
                EN
              </Link>
              <span className="text-charcoal-200 select-none" aria-hidden>
                |
              </span>
              <Link
                href={pathname}
                locale="kn"
                className={
                  locale === 'kn'
                    ? 'font-semibold text-indigo'
                    : 'hover:text-indigo transition-colors'
                }
              >
                ಕನ್ನಡ
              </Link>
            </div>
          </nav>

          <button
            className="md:hidden rounded-md p-2 text-charcoal-300 hover:bg-ivory-300 transition-colors shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav
          className="fixed inset-0 z-50 flex flex-col md:hidden mobile-menu-frame"
          aria-label={t('mobileNav')}
        >
          <div className="relative z-10 flex items-center justify-between px-12 pt-12">
            <div className="flex items-center gap-2 text-base text-charcoal-300">
              <Link
                href={pathname}
                locale="en"
                onClick={() => setMobileOpen(false)}
                className={
                  locale === 'en'
                    ? 'font-semibold text-indigo'
                    : 'text-kumkuma hover:text-indigo'
                }
              >
                EN
              </Link>
              <span className="text-charcoal-200 select-none" aria-hidden>
                |
              </span>
              <Link
                href={pathname}
                locale="kn"
                onClick={() => setMobileOpen(false)}
                className={
                  locale === 'kn'
                    ? 'font-semibold text-indigo'
                    : 'text-kumkuma hover:text-indigo'
                }
              >
                ಕನ್ನಡ
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-12 w-12 rounded-full bg-ivory-300/60 text-charcoal-300 hover:text-kumkuma hover:bg-ivory-300 active:bg-ivory-400 transition-colors cursor-pointer"
              aria-label={t('closeMenu')}
            >
              <X size={22} />
            </button>
          </div>

          <ul className="flex-1 flex flex-col items-center justify-center gap-2 px-8 -mt-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    block px-6 py-3 text-center font-serif text-xl transition-colors
                    ${
                      isActive(item.href)
                        ? 'text-charcoal font-bold'
                        : 'text-kumkuma hover:text-indigo'
                    }
                  `}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/contact"
                className="block text-center font-serif text-xl text-kumkuma hover:text-indigo transition-colors px-6 py-3"
              >
                {t('contactUs')}
              </Link>
            </li>
          </ul>

          <div className="pb-10" />
        </nav>
      )}
    </>
  );
}
