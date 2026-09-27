/**
 * Resources — the Vedic Knowledge Map.
 *
 * Sections:
 *   1. What the Veda is made of (śākhās and their books)
 *   2. How to read the map + the layers of a śākhā
 *   3. Four Veda doors → śākhā reading paths
 *   4. The six Vedāṅgas (Pāṇinīya Śikṣā) → shared shelf
 *   5. The libraries the links point to
 *
 * Content lives in data/vedic-map.ts.
 */

import type { Metadata } from 'next';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import {
  LIMBS,
  REPOS,
  VEDAS,
  getCollection,
  getText,
  pick,
  type Collection,
  type Layer,
} from '@/data/vedic-map';
import { LAYER_MARKER } from '@/components/blocks/VedicMap/layers';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('resourcesTitle'),
    description: t('resourcesDescription'),
  };
}

const DEVANAGARI_DIGITS = ['१', '२', '३'];

const LEGEND: Array<{ layer: Layer; gist: string }> = [
  { layer: 'samhita', gist: 'layer_samhita_gist' },
  { layer: 'brahmana', gist: 'layer_brahmana_gist' },
  { layer: 'aranyaka', gist: 'layer_aranyaka_gist' },
  { layer: 'upanishad', gist: 'layer_upanishad_gist' },
  { layer: 'pratishakhya', gist: 'layer_pratishakhya_gist' },
  { layer: 'grhya', gist: 'layer_kalpa_gist' },
];

function countBooks(collection: Collection) {
  const own = collection.path.filter((id) => getText(id)?.home === collection.slug).length;
  return { own, shared: collection.path.length - own };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('resources');

  function shakhaLink(slug: string) {
    const collection = getCollection(slug)!;
    const { own, shared } = countBooks(collection);
    return (
      <Link
        href={`/resources/${slug}`}
        className="group flex items-center justify-between gap-3 rounded-lg border border-ivory-300 bg-ivory-100 px-3.5 py-2.5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/60"
      >
        <span className="min-w-0">
          <span className="block font-serif text-lg leading-tight text-indigo">{pick(collection.name, locale)}</span>
          <span className="block text-xs text-charcoal-200">
            {t('bookCount', { count: own })}
            {shared > 0 && ` · ${t('sharedCount', { count: shared })}`}
          </span>
        </span>
        <ChevronRight
          size={18}
          className="shrink-0 text-charcoal-200 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo"
          aria-hidden
        />
      </Link>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl space-y-16 px-4 md:space-y-20 md:px-6">
        <header className="space-y-6">
          <SectionHeading
            as="h1"
            title={t('title')}
            devanagari={t('devanagari')}
            subtitle={t('subtitle')}
            centered
          />
          <p className="mx-auto max-w-3xl text-center leading-relaxed text-charcoal-300">{t('intro')}</p>
        </header>

        <section aria-labelledby="how-title" className="space-y-8">
          <h2 id="how-title" className="text-center font-serif text-2xl font-semibold text-indigo">
            {t('howTitle')}
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {(['how1', 'how2', 'how3'] as const).map((key, i) => (
              <li key={key} className="flex gap-4 rounded-xl border border-ivory-300 bg-ivory-50 p-5">
                <span
                  aria-hidden
                  className="shloka-devanagari flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold-50 text-lg text-gold-400"
                >
                  {DEVANAGARI_DIGITS[i]}
                </span>
                <span className="space-y-1">
                  <span className="block font-serif text-lg font-semibold text-indigo">{t(`${key}Title`)}</span>
                  <span className="block text-sm leading-relaxed text-charcoal-300">{t(`${key}Body`)}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="rounded-xl border border-ivory-300 bg-ivory-100/70 px-5 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-200">
              {t('layersTitle')}
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {LEGEND.map(({ layer, gist }) => (
                <li key={layer} className="flex items-center gap-2 text-sm">
                  <span aria-hidden className={`h-3 w-3 rounded-full border-2 ${LAYER_MARKER[layer]}`} />
                  <span className="font-medium text-charcoal">
                    {t(layer === 'grhya' ? 'layer_kalpa' : `layer_${layer}`)}
                  </span>
                  <span className="text-charcoal-200">— {t(gist)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="doors-title" className="space-y-8">
          <SectionHeading title={t('doorsTitle')} subtitle={t('doorsSubtitle')} centered />
          <div className="grid gap-6 md:grid-cols-2">
            {VEDAS.map((veda) => (
              <article
                key={veda.id}
                id={veda.id}
                className="flex flex-col rounded-2xl border border-ivory-300 bg-ivory-50 px-5 pb-6 shadow-sm md:px-6"
              >
                <div aria-hidden className="mx-auto mt-5 h-10 w-24 rounded-t-full border-2 border-b-0 border-gold/50" />
                <div className="-mt-1 space-y-1 border-t-2 border-gold/30 pt-4 text-center">
                  <p className="shloka-devanagari text-3xl text-indigo" lang="sa">
                    {veda.sa}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-charcoal">{pick(veda.name, locale)}</h3>
                  <p className="mx-auto max-w-sm text-sm leading-relaxed text-charcoal-300">
                    {pick(veda.gist, locale)}
                  </p>
                </div>
                <div className={`mt-5 grid flex-1 gap-4 ${veda.branches.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                  {veda.branches.map((branch) => (
                    <div key={branch.id} className="space-y-2">
                      {branch.name && (
                        <p className="flex items-baseline gap-2 border-b border-ivory-300 pb-1">
                          <span className="shloka-devanagari text-indigo-300" lang="sa">
                            {branch.sa}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-200">
                            {pick(branch.name, locale)}
                          </span>
                        </p>
                      )}
                      <ul className="space-y-2">
                        {branch.collections.map((slug) => (
                          <li key={slug}>
                            {shakhaLink(slug)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="shelf-title" className="space-y-8">
          <div className="space-y-2 text-center">
            <p className="shloka-devanagari text-lg tracking-wide text-indigo-300" lang="sa">
              षडङ्गानि
            </p>
            <h2
              id="shelf-title"
              className="font-serif text-3xl font-semibold tracking-tight text-indigo md:text-4xl"
            >
              {t('shelfTitle')}
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-charcoal-300">{t('shelfSubtitle')}</p>
          </div>

          <ShlokaBlock
            devanagari={
              'छन्दः पादौ तु वेदस्य हस्तौ कल्पोऽथ पठ्यते।\nज्योतिषामयनं चक्षुर्निरुक्तं श्रोत्रमुच्यते॥\nशिक्षा घ्राणं तु वेदस्य मुखं व्याकरणं स्मृतम्।'
            }
            iast={
              locale === 'en'
                ? "chandaḥ pādau tu vedasya hastau kalpo'tha paṭhyate | jyotiṣām ayanaṃ cakṣur niruktaṃ śrotram ucyate || śikṣā ghrāṇaṃ tu vedasya mukhaṃ vyākaraṇaṃ smṛtam |"
                : undefined
            }
            translation={t('shelfShlokaTranslation')}
            source="Pāṇinīya Śikṣā 41–42"
            size="sm"
          />

          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {LIMBS.map(({ textId, limb }) => {
              const text = getText(textId)!;
              const onPath = textId === 'shiksha' || textId === 'kalpa';
              return (
                <li key={textId}>
                  <Link
                    href={`/resources/vedanga/${textId}#step-${textId}`}
                    className={`flex h-full flex-col items-center gap-1 rounded-xl border px-3 py-4 text-center transition-colors hover:border-indigo-200 hover:bg-indigo-50/60 ${
                      onPath ? 'border-dashed border-gold/60 bg-ivory-100' : 'border-ivory-300 bg-ivory-50'
                    }`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                      {pick(limb, locale)}
                    </span>
                    <span className="shloka-devanagari text-xl text-indigo" lang="sa">
                      {text.sa}
                    </span>
                    <span className="text-sm text-charcoal-300">{pick(text.name, locale).split(' — ')[0]}</span>
                    {onPath && <span className="text-[11px] italic text-charcoal-200">{t('onEveryPath')}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="libraries-title" className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 id="libraries-title" className="font-serif text-2xl font-semibold text-indigo">
              {t('librariesTitle')}
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-charcoal-300">{t('librariesSubtitle')}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REPOS.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-2 rounded-xl border border-ivory-300 bg-ivory-50 p-4 transition-colors hover:border-indigo-200"
                >
                  <span className="flex items-center justify-between gap-2 font-medium text-indigo">
                    {repo.name}
                    <ArrowUpRight
                      size={16}
                      className="text-charcoal-200 transition-colors group-hover:text-indigo"
                      aria-hidden
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-charcoal-300">{pick(repo.about, locale)}</span>
                  <span className="sr-only">({t('opensInNewTab')})</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-center text-sm italic text-charcoal-200">{t('scopeNote')}</p>
        </section>
      </div>
    </div>
  );
}
