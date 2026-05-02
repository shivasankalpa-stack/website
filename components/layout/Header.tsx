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
    <>
      <header className="sticky top-0 z-40 border-b border-ivory-300 bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
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

          <button
            className="md:hidden rounded-md p-2 text-charcoal-300 hover:bg-ivory-300 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/*
        ════════════════════════════════════════════════════════════
        Mobile full-screen overlay menu
        ════════════════════════════════════════════════════════════

        RENDERING POSITION:
          Rendered OUTSIDE <header> as a sibling (inside a fragment).
          This is critical — <header> has `sticky` positioning which
          creates a stacking context. A `fixed` overlay inside it
          would be trapped and unable to cover the full viewport.

        STYLING (see .mobile-menu-frame in globals.css):
          - Ivory-50 background with kolam rangoli borders on all
            four edges, using CSS multiple backgrounds (same SVG
            tiles as the desktop manuscript frame).
          - The border pattern is ~36px wide on each edge.

        LAYOUT:
          - Close button: inset 48px (px-12 pt-12) from the edge to
            clear the 36px border. Soft circular pill background.
          - Nav links: centred vertically and horizontally using
            flex. Serif font (EB Garamond) at text-xl.
          - Active page: charcoal + bold. Others: kumkuma (warm red).
          - Contact Us separated with extra top padding.

        BEHAVIOUR:
          - Opens when mobileOpen state is true (hamburger tap).
          - Closes on: X button tap, or route change (render-time
            state adjustment in the component body above).
          - body overflow is set to 'hidden' while open (useEffect).
          - Hidden on md+ screens via `md:hidden`.
        ════════════════════════════════════════════════════════════
      */}
      {mobileOpen && (
        <nav
          className="fixed inset-0 z-50 flex flex-col md:hidden mobile-menu-frame"
          aria-label="Mobile navigation"
        >
          {/*
            Close button — positioned px-12 pt-12 (48px) from the
            viewport edge so it sits comfortably inside the 36px
            rangoli border without overlapping the pattern.
            10×10 rounded pill with a subtle ivory-300 background
            for visual weight; hovers to kumkuma to match nav links.
          */}
          <div className="relative z-10 flex justify-end px-12 pt-12">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-12 w-12 rounded-full bg-ivory-300/60 text-charcoal-300 hover:text-kumkuma hover:bg-ivory-300 active:bg-ivory-400 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/*
            Nav links — vertically and horizontally centred.
            -mt-8 compensates for the close button height so the
            link group appears optically centred in the viewport.
          */}
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
                  {item.label}
                </Link>
              </li>
            ))}
            {/* Contact Us — separated from main nav with extra spacing */}
            <li className="pt-4">
              <Link
                href="/contact"
                className="block text-center font-serif text-xl text-kumkuma hover:text-indigo transition-colors px-6 py-3"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
