/**
 * Root layout — minimal shell that handles fonts, CSS, and <html>/<body>.
 *
 * The locale-specific layout (app/[locale]/layout.tsx) adds:
 *   - NextIntlClientProvider (i18n messages)
 *   - Ticker, Header, Footer, ScrollToTop
 *   - Manuscript frame (desktop kolam borders)
 *
 * Font loading:
 *   - EB Garamond:           English headings (font-serif)
 *   - Inter:                 Body / UI text (font-sans)
 *   - Noto Serif Devanagari: Sanskrit / Devanagari (font-devanagari)
 */

import type { Metadata } from 'next';
import { EB_Garamond, Inter, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: '--font-noto-serif-devanagari',
  subsets: ['devanagari'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Sri Shivasankalpa Trust — तन्मे मनः शिवसङ्कल्पमस्तु',
    template: '%s | Sri Shivasankalpa Trust',
  },
  description:
    'Supporting Vedic education, Gurukulas, and the timeless Guru–Shishya Parampara. With the blessings of the Jagadgurus of Sringeri Sharada Peetham.',
  keywords: [
    'Vedic education',
    'Gurukula',
    'Sringeri',
    'Shivasankalpa',
    'Veda',
    'Parampara',
    'Dharma',
    'Rudra',
  ],
  authors: [{ name: 'Sri Shivasankalpa Trust' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://srishivasankalpa.org',
    siteName: 'Sri Shivasankalpa Trust',
    title: 'Sri Shivasankalpa Trust',
    description:
      'Supporting Vedic education, Gurukulas, and the timeless Guru–Shishya Parampara.',
    images: [{ url: '/assets/og/og-image.png', width: 1200, height: 630 }],
  },
  metadataBase: new URL('https://srishivasankalpa.org'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${ebGaramond.variable} ${inter.variable} ${notoSerifDevanagari.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
