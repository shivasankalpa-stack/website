/**
 * Folio — the "open book" panel for one text on the Vedic Knowledge Map.
 *
 * Explains what the book is, where it sits, and offers a small set of
 * verified sources. Related books and other śākhās that share it are
 * internal links, so the reader stays on the map.
 */

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookAudio,
  BookOpenText,
  FileText,
  Headphones,
  Library,
  Info,
  ScrollText,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  REPOS,
  getCollection,
  getText,
  pick,
  sharedWith,
  textHref,
  type Collection,
  type SourceKind,
  type VedicText,
} from '@/data/vedic-map';
import { LAYER_TEXT } from './layers';

const KIND_ICON: Record<SourceKind, typeof Headphones> = {
  listen: Headphones,
  read: BookOpenText,
  readListen: BookAudio,
  guide: Info,
  etext: FileText,
  bhashya: ScrollText,
  scan: Library,
};

const REPO_NAME = Object.fromEntries(REPOS.map((r) => [r.id, r.name]));

interface FolioProps {
  text: VedicText;
  collection: Collection;
  locale: string;
}

export async function Folio({ text, collection, locale }: FolioProps) {
  const t = await getTranslations('resources');

  const own = collection.path.filter((id) => getText(id)?.home === collection.slug);
  const index = own.indexOf(text.id);
  const prev = index > 0 ? getText(own[index - 1]) : undefined;
  const next = index >= 0 && index < own.length - 1 ? getText(own[index + 1]) : undefined;

  const related = (text.related ?? []).map((id) => getText(id)).filter((r): r is VedicText => !!r);
  const alsoOn = sharedWith(text);
  const home = getCollection(text.home);

  return (
    <article
      className="rounded-xl border border-ivory-300 border-t-4 border-t-gold/60 bg-ivory-50 shadow-sm"
      aria-labelledby={`folio-${text.id}`}
    >
      <div className="space-y-5 p-5 md:p-7">
        <header className="space-y-1.5">
          <p className={`text-xs font-semibold uppercase tracking-wider ${LAYER_TEXT[text.layer]}`}>
            {t(`layer_${text.layer}`)}
          </p>
          <p className="shloka-devanagari text-2xl text-indigo md:text-3xl" lang="sa">
            {text.sa}
          </p>
          <h2 id={`folio-${text.id}`} className="font-serif text-xl font-semibold text-charcoal md:text-2xl">
            {pick(text.name, locale)}
          </h2>
          {text.within && (
            <p className="text-sm text-charcoal-300">
              <span className="text-charcoal-200">{t('folioWithin')}: </span>
              {pick(text.within, locale)}
            </p>
          )}
        </header>

        <p className="leading-relaxed text-charcoal-300">{pick(text.about, locale)}</p>

        <section className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-200">
            {t('folioSources')}
          </h3>
          <ul className="space-y-2">
            {text.sources.map((source) => {
              const Icon = KIND_ICON[source.kind];
              return (
                <li key={source.url + source.kind + (source.note?.en ?? '')}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-lg border border-ivory-300 bg-ivory-100 px-3.5 py-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50/60"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory-50 text-indigo ring-1 ring-ivory-300">
                      <Icon size={16} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-indigo">
                        {t(`kind_${source.kind}`)}
                      </span>
                      {source.note && (
                        <span className="block text-sm text-charcoal-300">{pick(source.note, locale)}</span>
                      )}
                      <span className="block text-xs text-charcoal-200">{REPO_NAME[source.repo]}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-charcoal-200 transition-colors group-hover:text-indigo"
                      aria-hidden
                    />
                    <span className="sr-only">({t('opensInNewTab')})</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {(related.length > 0 || alsoOn.length > 0) && (
          <section className="space-y-3 border-t border-ivory-300 pt-4">
            {related.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-200">
                  {t('folioRelated')}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={textHref(r)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ivory-400 bg-ivory px-3 py-1 text-sm text-indigo transition-colors hover:border-indigo-200 hover:bg-indigo-50"
                      >
                        {pick(r.name, locale)}
                        {r.home !== collection.slug && (
                          <span className="text-xs text-charcoal-200">
                            · {pick(getCollection(r.home)!.name, locale)}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {alsoOn.length > 0 && home && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-200">
                  {t('folioAlsoOn')}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {alsoOn.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/resources/${c.slug}`}
                        className="inline-flex items-center rounded-full border border-dashed border-indigo-200 px-3 py-1 text-sm text-indigo-300 transition-colors hover:bg-indigo-50 hover:text-indigo"
                      >
                        {pick(c.name, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {(prev || next) && (
          <nav className="flex items-center justify-between gap-3 border-t border-ivory-300 pt-4 text-sm">
            {prev ? (
              <Link
                href={`/resources/${collection.slug}/${prev.id}#step-${prev.id}`}
                className="inline-flex min-w-0 items-center gap-1.5 text-charcoal-300 transition-colors hover:text-indigo"
              >
                <ArrowLeft size={16} className="shrink-0" aria-hidden />
                <span className="sr-only">{t('prev')}: </span>
                <span className="truncate">{pick(prev.name, locale)}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/resources/${collection.slug}/${next.id}#step-${next.id}`}
                className="inline-flex min-w-0 items-center gap-1.5 text-right font-medium text-indigo transition-colors hover:text-indigo-300"
              >
                <span className="sr-only">{t('next')}: </span>
                <span className="truncate">{pick(next.name, locale)}</span>
                <ArrowRight size={16} className="shrink-0" aria-hidden />
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
