/**
 * VedaVruksha — the Veda as a banyan tree, with a short reading guide.
 *
 * The painting (public/assets/artefacts/veda-vruksha-banyan-v2.jpg) carries
 * English + Kannada labels. A picture cannot hold every śākhā or explain
 * itself, so the notes below it:
 *   1. explain how to read the tree (root, nourishment, trunk, twigs,
 *      aerial roots, fruit),
 *   2. show the parts of one śākhā (Taittirīya), matching the small twig
 *      at the centre of the painting,
 *   3. name the living śākhās the painting leaves out,
 * and lead into the Knowledge Map button that follows on the homepage.
 *
 * All text lives in the `vedaVruksha` namespace of messages/*.json.
 */

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const IMAGE_SRC = '/assets/artefacts/veda-vruksha-banyan-v2.jpg';

const LEAF = '#5F7D45';
const LEAF_LIGHT = '#9AAF73';
const BARK = '#6B4A2E';
const GOLD = '#B8860B';
const IVORY = '#FBF8F0';

const READ_KEYS = ['source', 'nourish', 'trunk', 'shakhas', 'vedangas', 'fruit'] as const;

export function VedaVruksha({ className = '' }: { className?: string }) {
  const t = useTranslations('vedaVruksha');

  return (
    <div className={`mx-auto w-full max-w-4xl space-y-8 ${className}`}>
      {/* The painting — tap / click opens it full size */}
      <figure className="flex flex-col items-center">
        <a href={IMAGE_SRC} target="_blank" rel="noopener" className="block w-full max-w-2xl">
          <Image
            src={IMAGE_SRC}
            alt={t('alt')}
            width={2052}
            height={2550}
            sizes="(max-width: 768px) 100vw, 672px"
            className="h-auto w-full rounded-lg shadow-sm"
          />
        </a>
        <figcaption className="mt-2">
          <a
            href={IMAGE_SRC}
            target="_blank"
            rel="noopener"
            className="text-sm text-indigo-300 underline decoration-gold/50 underline-offset-4 hover:text-indigo"
          >
            {t('enlarge')}
          </a>
        </figcaption>
      </figure>

      {/* 1 · How to read the tree */}
      <div className="rounded-xl border border-gold/40 bg-ivory-50 p-5 md:p-6">
        <h3 className="font-serif text-xl font-semibold text-indigo">{t('readTitle')}</h3>
        <dl className="mt-4 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {READ_KEYS.map((key) => (
            <div key={key}>
              <dt className="font-semibold text-indigo">{t(`read.${key}.term`)}</dt>
              <dd className="mt-0.5 text-sm leading-relaxed text-charcoal-300">{t(`read.${key}.text`)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 2 · Inside one śākhā */}
      <ShakhaAnatomy />

      {/* 3 · Śākhās the painting leaves out */}
      <div className="rounded-xl border border-gold/40 bg-ivory-50 p-5 md:p-6">
        <h3 className="font-serif text-xl font-semibold text-indigo">{t('others.title')}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-300">{t('others.text')}</p>
        <ul className="mt-3 space-y-1.5 text-sm text-indigo">
          {(['kanva', 'ranayaniya', 'krishna'] as const).map((key) => (
            <li key={key} className="flex gap-2">
              <span aria-hidden="true" className="text-gold">✦</span>
              <span>{t(`others.${key}`)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lead-in to the Knowledge Map button that follows on the page */}
      <p className="text-center text-base text-indigo">{t('cta')}</p>
    </div>
  );
}

/* ───────── Parts of one śākhā (Taittirīya) ───────── */

function PartIcon({ kind }: { kind: 'leaf' | 'bud' | 'flower' | 'fruit' }) {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      {kind === 'leaf' && <path d="M 8,32 C 8,14 22,6 34,6 C 34,20 26,32 8,32 Z M 8,32 L 26,14" fill={LEAF} stroke={LEAF} strokeWidth={1.5} />}
      {kind === 'bud' && (
        <g>
          <path d="M 20,36 L 20,22" stroke={BARK} strokeWidth={2} />
          <path d="M 20,24 C 12,20 14,8 20,4 C 26,8 28,20 20,24 Z" fill={LEAF_LIGHT} stroke={LEAF} strokeWidth={1.5} />
        </g>
      )}
      {kind === 'flower' && (
        <g>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={20} cy={11} rx={5} ry={8} fill="#F3E4BC" stroke={GOLD} strokeWidth={1} transform={`rotate(${a} 20 20)`} />
          ))}
          <circle cx={20} cy={20} r={4} fill={GOLD} />
        </g>
      )}
      {kind === 'fruit' && (
        <g>
          <path d="M 20,4 L 20,12" stroke={BARK} strokeWidth={2} />
          <circle cx={20} cy={24} r={12} fill={GOLD} />
          <circle cx={15} cy={19} r={3} fill={IVORY} opacity={0.6} />
        </g>
      )}
    </svg>
  );
}

function ShakhaAnatomy() {
  const t = useTranslations('vedaVruksha.anatomy');
  const parts: { key: string; icon: 'leaf' | 'bud' | 'flower' | 'fruit' }[] = [
    { key: 'samhita', icon: 'leaf' },
    { key: 'brahmana', icon: 'bud' },
    { key: 'aranyaka', icon: 'flower' },
    { key: 'upanishad', icon: 'fruit' },
  ];

  return (
    <div className="rounded-xl border border-gold/40 bg-ivory-50 p-5 md:p-6">
      <h3 className="font-serif text-xl font-semibold text-indigo">{t('title')}</h3>
      <p className="mt-1 text-sm leading-relaxed text-charcoal-300">{t('subtitle')}</p>

      <ol className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {parts.map(({ key, icon }, i) => (
          <li key={key} className="relative flex flex-col items-center text-center">
            <PartIcon kind={icon} />
            <span className="mt-1 font-devanagari text-lg font-semibold text-indigo">{t(`${key}.name`)}</span>
            <span className="text-sm text-indigo">{t(`${key}.text`)}</span>
            <span className="mt-0.5 text-xs italic text-indigo-300">{t(`${key}.role`)}</span>
            {i < parts.length - 1 && (
              <span aria-hidden="true" className="absolute -right-3 top-3 hidden text-gold md:block">→</span>
            )}
          </li>
        ))}
      </ol>

      {/* karma-kāṇḍa → jñāna-kāṇḍa */}
      <div className="mt-5 flex items-center gap-3 text-xs font-medium text-indigo-300">
        <span className="whitespace-nowrap">{t('karma')}</span>
        <span aria-hidden="true" className="h-0.5 flex-1 rounded bg-gradient-to-r from-[#5F7D45] to-gold" />
        <span className="whitespace-nowrap">{t('jnana')}</span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-charcoal-300">{t('note')}</p>
    </div>
  );
}
