/**
 * CollectionView — one śākhā (or the shared Vedāṅga shelf) as a single
 * vertical reading path, with the selected book open in a folio.
 *
 * Desktop: path on the left, folio sticky on the right.
 * Mobile:  the folio opens inline beneath the selected step; step links
 *          carry a #step-… hash so the reader lands back on that step.
 */

import { ArrowLeft, ChevronRight, CornerDownRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  SHRUTI_LAYERS,
  getCollection,
  getText,
  getVeda,
  pick,
  siblingCollections,
  type Collection,
  type VedicText,
} from '@/data/vedic-map';
import { Folio } from './Folio';
import { LAYER_MARKER, LAYER_TEXT } from './layers';

interface CollectionViewProps {
  collection: Collection;
  activeId: string;
  locale: string;
}

export async function CollectionView({ collection, activeId, locale }: CollectionViewProps) {
  const t = await getTranslations('resources');
  const veda = collection.veda ? getVeda(collection.veda) : undefined;
  const branch = veda?.branches.find((b) => b.id === collection.branch);
  const siblings = siblingCollections(collection);
  const active = getText(activeId)!;

  const steps = collection.path.map((id) => getText(id)!);
  const groups: Array<{ title: string; items: VedicText[] }> = veda
    ? [
        { title: t('groupShruti'), items: steps.filter((s) => SHRUTI_LAYERS.includes(s.layer)) },
        { title: t('groupAngas'), items: steps.filter((s) => !SHRUTI_LAYERS.includes(s.layer)) },
      ]
    : [{ title: t('groupShelf'), items: steps }];

  const vedaLine = veda
    ? [pick(veda.name, locale), branch?.name ? pick(branch.name, locale) : null].filter(Boolean).join(' · ')
    : t('shelfCrumb');

  return (
    <div className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl space-y-8 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal-300">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/resources" className="hover:text-indigo transition-colors">
                {t('breadcrumbRoot')}
              </Link>
            </li>
            <li aria-hidden className="text-charcoal-200">
              <ChevronRight size={14} />
            </li>
            <li>{vedaLine}</li>
            <li aria-hidden className="text-charcoal-200">
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="font-medium text-indigo">
              {pick(collection.name, locale)}
            </li>
          </ol>
        </nav>

        <header className="space-y-3">
          <p className="shloka-devanagari text-lg tracking-wide text-indigo-300" lang="sa">
            {veda ? `${veda.sa} · ${collection.sa}` : collection.sa}
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-indigo md:text-4xl">
            {pick(collection.name, locale)}
          </h1>
          <p className="max-w-3xl leading-relaxed text-charcoal-300">{pick(collection.intro, locale)}</p>
          {siblings.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-sm">
              <span className="text-charcoal-200">{t('otherShakhas')}:</span>
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/resources/${s.slug}`}
                  className="rounded-full border border-ivory-400 bg-ivory-50 px-3 py-1 text-indigo transition-colors hover:border-indigo-200 hover:bg-indigo-50"
                >
                  {pick(s.name, locale)}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <nav aria-label={t('pathTitle')} className="space-y-7">
            {groups
              .filter((g) => g.items.length > 0)
              .map((group) => (
                <section key={group.title} className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-200">
                    {group.title}
                  </h2>
                  <ol className="relative space-y-1 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-ivory-400">
                    {group.items.map((step) => {
                      const shared = step.home !== collection.slug;
                      const isActive = step.id === active.id;
                      const home = getCollection(step.home)!;
                      return (
                        <li key={step.id} id={`step-${step.id}`} className="relative scroll-mt-32 pl-7">
                          <span
                            aria-hidden
                            className={`absolute left-0 top-4 h-[15px] w-[15px] rounded-full border-2 ${
                              shared ? 'border-dashed bg-ivory-50 border-indigo-200' : LAYER_MARKER[step.layer]
                            } ${isActive ? 'ring-4 ring-gold/25' : ''}`}
                          />
                          {shared ? (
                            <Link
                              href={`/resources/${home.slug}/${step.id}#step-${step.id}`}
                              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-ivory-50"
                            >
                              <span className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-200">
                                {t(`layer_${step.layer}`)}
                              </span>
                              <span className="block font-serif text-lg leading-snug text-charcoal-300">
                                {pick(step.name, locale)}
                              </span>
                              <span className="mt-0.5 flex items-center gap-1 text-xs italic text-indigo-300">
                                <CornerDownRight size={12} aria-hidden />
                                {t('sharedStep', { name: pick(home.name, locale) })}
                                <span className="sr-only"> — {t('readOnPath', { name: pick(home.name, locale) })}</span>
                              </span>
                            </Link>
                          ) : (
                            <Link
                              href={`/resources/${collection.slug}/${step.id}#step-${step.id}`}
                              aria-current={isActive ? 'page' : undefined}
                              className={`block rounded-lg px-3 py-2.5 transition-colors ${
                                isActive
                                  ? 'bg-ivory-50 shadow-sm ring-1 ring-gold/40'
                                  : 'hover:bg-ivory-50'
                              }`}
                            >
                              <span
                                className={`block text-[11px] font-semibold uppercase tracking-wider ${LAYER_TEXT[step.layer]}`}
                              >
                                {t(`layer_${step.layer}`)}
                              </span>
                              <span className="block font-serif text-lg leading-snug text-indigo">
                                {pick(step.name, locale)}
                              </span>
                              <span className="shloka-devanagari block text-sm text-indigo-300" lang="sa">
                                {step.sa}
                              </span>
                            </Link>
                          )}
                          {isActive && (
                            <div className="mt-3 lg:hidden">
                              <Folio text={step} collection={collection} locale={locale} />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              ))}
          </nav>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Folio text={active} collection={collection} locale={locale} />
            </div>
          </aside>
        </div>

        {collection.notOnPath.length > 0 && (
          <section className="rounded-xl border border-dashed border-ivory-400 bg-ivory-100/60 p-5 md:p-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-200">
              {t('notOnPathTitle')}
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-charcoal-300">
              {collection.notOnPath.map((note) => (
                <li key={note.en} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  <span>{pick(note, locale)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory-300 pt-6 text-sm">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-indigo transition-colors hover:text-indigo-300"
          >
            <ArrowLeft size={16} aria-hidden />
            {t('backToMap')}
          </Link>
          {collection.slug !== 'vedanga' && (
            <Link href="/resources/vedanga" className="text-charcoal-300 transition-colors hover:text-indigo">
              {t('openShelf')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
