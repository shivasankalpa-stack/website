/**
 * Footer — site-wide footer with logo, navigation, contact info, and legal.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';

const footerNav = [
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
  { href: '/donations', label: 'Donations' },
];

export function Footer() {
  return (
    <footer className="border-t border-ivory-300 bg-ivory-100">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Trust identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/og/logo.png"
                alt="Sri Shivasankalpa"
                width={48}
                height={48}
                className="h-12 w-auto mix-blend-multiply"
              />
              <div>
                <h3 className="font-serif text-lg font-semibold text-indigo">
                  Sri Shivasankalpa Vṛnda
                </h3>
                <p className="text-[10px] text-charcoal-200 tracking-wide uppercase">
                  Preserving Sanātana Dharma through Seva, Śraddhā, and Saṁskāra
                </p>
              </div>
            </div>
            <p className="shloka-devanagari text-sm text-indigo-300">
              तन्मे मनः शिवसङ्कल्पमस्तु
            </p>
            <p className="text-sm text-charcoal-300 leading-relaxed">
              Supporting Vedic education, Gurukulas, and the timeless
              Guru–Shishya Parampara with the blessings of the Jagadgurus
              of Sringeri Sharada Peetham.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal-300 hover:text-indigo transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-200 mb-4">
              Get in Touch
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

        {/* Bottom bar */}
        <div className="mt-10 border-t border-ivory-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-200">
          <p>
            © {new Date().getFullYear()} Sri Shivasankalpa Vṛnda. All rights reserved.
          </p>
          <p>
            Regd. No. <span className="font-mono">#REG-TODO</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
