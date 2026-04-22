/**
 * Header — site navigation with logo, desktop nav links, and mobile menu.
 *
 * Uses the trust's Kannada-script logo. Sticky below the Ticker.
 * On mobile, a hamburger reveals a slide-out navigation panel from the right.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/gurukulas', label: 'Gurukulas' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donations', label: 'Donations' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ivory-300 bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src="/assets/og/logo.png"
            alt="Sri Shivasankalpa"
            width={44}
            height={44}
            className="h-10 w-auto md:h-11 mix-blend-multiply"
            priority
          />
          <div className="leading-tight hidden sm:block">
            <span className="font-serif text-base font-semibold text-indigo group-hover:text-indigo-300 transition-colors md:text-lg">
              Sri Shivasankalpa
            </span>
            <span className="block text-[9px] text-charcoal-200 tracking-wider uppercase">
              Vṛnda
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:block" aria-label="Main navigation">
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
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-md p-2 text-charcoal-300 hover:bg-ivory-300 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile slide-out panel */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-charcoal-500/40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed top-0 right-0 z-50 h-full w-72 bg-ivory-50 border-l border-indigo-100 shadow-xl md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-indigo-100 bg-indigo-50/50">
              <div className="flex items-center gap-2">
                <Image src="/assets/og/logo.png" alt="" width={32} height={32} className="h-8 w-auto mix-blend-multiply" />
                <span className="font-serif text-lg font-semibold text-indigo">Menu</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 text-indigo hover:bg-indigo-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      block rounded-md px-3 py-3 text-base font-medium transition-colors
                      ${
                        isActive(item.href)
                          ? 'text-ivory-50 bg-indigo'
                          : 'text-indigo hover:text-indigo-500 hover:bg-indigo-50'
                      }
                    `}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-indigo-100">
              <Link
                href="/contact"
                className="block text-center rounded-md bg-kumkuma px-4 py-2.5 text-sm font-medium text-ivory-50 hover:bg-kumkuma-500 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
