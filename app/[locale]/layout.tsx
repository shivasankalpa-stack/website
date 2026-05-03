/**
 * Locale layout — wraps all pages with i18n provider and site chrome.
 *
 * Responsibilities:
 *   1. NextIntlClientProvider — makes useTranslations() available to
 *      all client components under this layout tree.
 *   2. Sets the lang attribute on a wrapper div (root <html> lang is
 *      set by next-intl middleware).
 *   3. Renders Ticker, Header, Footer, ScrollToTop, and the desktop
 *      manuscript frame (kolam borders).
 *
 * Every page under app/[locale]/ inherits this layout.
 */

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Ticker } from '@/components/layout/Ticker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'kn')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Ticker />
      <Header />
      {/*
        Manuscript frame (desktop only, see globals.css for full docs).
        Two nested elements give us four pseudo-elements for four borders:
          manuscript-outer  → ::before = top border, ::after = bottom border
          manuscript-frame  → ::before = left border, ::after = right border
      */}
      <div className="flex-1 lg:mx-auto lg:w-full lg:max-w-7xl lg:bg-ivory lg:shadow-sm manuscript-outer">
        <main className="manuscript-frame">{children}</main>
      </div>
      <Footer />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
