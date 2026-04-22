/**
 * Root layout — wraps every page with fonts, metadata, Ticker, Header, and Footer.
 *
 * Font loading:
 *   - EB Garamond:           English headings (font-serif)
 *   - Inter:                 Body / UI text (font-sans)
 *   - Noto Serif Devanagari: Sanskrit / Devanagari (font-devanagari)
 *
 * These CSS variables are consumed by the @theme block in globals.css
 * to make them available as Tailwind utilities.
 */

import type { Metadata } from 'next';
import { EB_Garamond, Inter, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import { Ticker } from '@/components/layout/Ticker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
    // TODO v0.15: Replace with custom OG image once logo is finalized
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
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} ${notoSerifDevanagari.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans antialiased">
        <Ticker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
