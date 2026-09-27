/**
 * VidyarthiStoryboard — "From Śiṣya to Guru"
 *
 * One homepage section, two animated storyboards sharing one player:
 *   • The Journey — joining the Gurukula → Upanayana → Saṃhitā → Ghana →
 *     modern learning → festivals & national days → examination →
 *     Samāvartana → service → becoming a Guru.
 *   • A Day at the Gurukula — Brāhma Muhūrta to lamplight.
 *
 * Behaviour
 *   - Auto-plays like a story (segmented progress bar), only while on screen;
 *     pauses while the pointer rests on the picture.
 *   - Prev / Play-Pause / Next, clickable timeline, ← → keys, swipe.
 *   - prefers-reduced-motion: no auto-play and no looping animation.
 *
 * Content (English + Kannada) lives in data/vidyarthi-storyboard.ts;
 * artwork in journey-scenes.tsx and day-scenes.tsx.
 */

'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useLocale } from 'next-intl';
import { ArrowRight, ChevronLeft, ChevronRight, Moon, Pause, Play, Sun, Sunrise, Sunset } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DAY_SCENES, JOURNEY_SCENES, STORY_UI, type StoryLocale, type StoryScene } from '@/data/vidyarthi-storyboard';
import { DAY_VIGNETTES } from './day-scenes';
import { JOURNEY_VIGNETTES } from './journey-scenes';
import { Stage } from './Stage';

type StoryKey = 'journey' | 'day';

const STORIES = {
  journey: { scenes: JOURNEY_SCENES, vignettes: JOURNEY_VIGNETTES },
  day: { scenes: DAY_SCENES, vignettes: DAY_VIGNETTES },
} as const;

/* ── prefers-reduced-motion (same pattern as ScrollReveal) ── */
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}
const getReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedServer = () => false;

/** Reading time per scene, based on the English copy. */
function durationFor(s: StoryScene) {
  const chars = s.text.en.length + (s.verse?.meaning.en.length ?? 0);
  const extra = s.id === 'd-adhyayana' ? 4000 : 0;
  return Math.min(19000, Math.max(9000, 5000 + chars * 38 + extra));
}

function TimeIcon({ sun, night }: { sun: number; night: number }) {
  const cls = 'h-4 w-4 shrink-0';
  if (night > 0.3) return <Moon className={cls} aria-hidden />;
  if (sun < 0.15) return <Sunrise className={cls} aria-hidden />;
  if (sun > 0.9) return <Sunset className={cls} aria-hidden />;
  return <Sun className={cls} aria-hidden />;
}

export function VidyarthiStoryboard() {
  const locale: StoryLocale = useLocale() === 'kn' ? 'kn' : 'en';
  const ui = STORY_UI;

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReduced, getReducedServer);
  const [story, setStory] = useState<StoryKey>('journey');
  const [index, setIndex] = useState(0);
  /** null = user hasn't chosen; default is "play" unless reduced motion. */
  const [playChoice, setPlayChoice] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userNavigated, setUserNavigated] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const touchX = useRef<number | null>(null);

  const { scenes, vignettes } = STORIES[story];
  const total = scenes.length;
  const scene = scenes[index];
  const playing = playChoice ?? !reducedMotion;
  const running = playing && inView && !hovered;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Freeze the SVG's looping animations while off screen */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof svg.pauseAnimations !== 'function') return;
    if (inView) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, story]);

  const go = useCallback(
    (i: number, manual = true) => {
      setIndex(((i % total) + total) % total);
      if (manual) setUserNavigated(true);
    },
    [total]
  );

  const switchStory = (next: StoryKey) => {
    if (next === story) return;
    setStory(next);
    setIndex(0);
    setUserNavigated(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).getAttribute('role') === 'tab') return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = story === 'journey' ? 'day' : 'journey';
      switchStory(next);
      document.getElementById(`vd-tab-${next}`)?.focus();
    }
  };

  const sceneLabel = ui.sceneOf[locale].replace('{n}', String(index + 1)).replace('{total}', String(total));

  return (
    <section className="py-16 md:py-20" aria-labelledby="vd-title">
      <style>{`
        @keyframes vd-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes vd-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .vd-fade { animation: vd-fade .6s ease both; }
        @media (prefers-reduced-motion: reduce) { .vd-fade { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-8">
        <div id="vd-title">
          <SectionHeading title={ui.title[locale]} devanagari={ui.eyebrow} subtitle={ui.subtitle[locale]} centered />
        </div>

        {/* ── Tabs ── */}
        <div className="flex justify-center">
          <div role="tablist" aria-label={ui.title[locale]} className="inline-flex rounded-full border border-indigo-100 bg-ivory-50 p-1 shadow-sm">
            {(['journey', 'day'] as const).map((k) => (
              <button
                key={k}
                id={`vd-tab-${k}`}
                type="button"
                role="tab"
                aria-selected={story === k}
                aria-controls="vd-panel"
                tabIndex={story === k ? 0 : -1}
                onClick={() => switchStory(k)}
                onKeyDown={onTabKey}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-5 ${
                  story === k ? 'bg-indigo text-ivory-50 shadow' : 'text-indigo hover:bg-indigo-50'
                }`}
              >
                {ui.tabs[k][locale]}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={rootRef}
          id="vd-panel"
          role="tabpanel"
          aria-labelledby={`vd-tab-${story}`}
          aria-roledescription="carousel"
          onKeyDown={onKeyDown}
        >
          {/* ── Stage ── */}
          <div
            className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl border border-gold/30 bg-indigo-500 shadow-sm"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
            }}
          >
            <Stage key={story} scenes={scenes} vignettes={vignettes} index={index} motion={!reducedMotion} svgRef={svgRef} />

            <div className="pointer-events-none absolute left-3 top-3 md:left-4 md:top-4 flex max-w-[75%] items-center gap-2 rounded-full bg-charcoal-500/55 px-3 py-1.5 text-ivory-50 backdrop-blur-sm">
              <TimeIcon sun={scene.sun} night={scene.night} />
              <span className="truncate text-xs sm:text-sm font-medium tabular-nums">{scene.time[locale]}</span>
            </div>
            <div className="pointer-events-none absolute right-3 top-3 md:right-4 md:top-4 rounded-full bg-charcoal-500/40 px-2.5 py-1 text-xs text-ivory-100/90 backdrop-blur-sm tabular-nums">
              {index + 1} / {total}
            </div>
          </div>

          {/* ── Timeline / progress ── */}
          <ol className="mt-4 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
            {scenes.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  className="group block w-full rounded-sm pt-2 pb-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
                  aria-label={`${ui.goTo[locale]} ${s.time[locale]} — ${s.title[locale]}`}
                  aria-current={i === index ? 'step' : undefined}
                >
                  <span className="relative block h-1.5 overflow-hidden rounded-full bg-indigo-100 transition-colors group-hover:bg-indigo-200">
                    {i < index && <span className="absolute inset-0 bg-indigo-300" />}
                    {i === index && (
                      <span
                        key={`${story}-${index}`}
                        className="absolute inset-0 origin-left bg-kumkuma"
                        style={{
                          animation: `vd-progress ${durationFor(s)}ms linear forwards`,
                          animationPlayState: running ? 'running' : 'paused',
                        }}
                        onAnimationEnd={() => go(index + 1, false)}
                      />
                    )}
                  </span>
                  <span
                    className={`mt-1.5 hidden md:block truncate text-[11px] leading-tight tabular-nums transition-colors ${
                      i === index ? 'font-semibold text-kumkuma' : 'text-charcoal-200 group-hover:text-indigo'
                    }`}
                  >
                    {s.label[locale]}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* ── Caption ── */}
          <div className="mt-5 grid gap-6 md:grid-cols-5 md:min-h-[16rem]" aria-live={running && !userNavigated ? 'off' : 'polite'}>
            <div key={`t-${story}-${index}-${locale}`} className="vd-fade md:col-span-3 space-y-2.5">
              <p className="shloka-devanagari text-base text-kumkuma" lang="sa">
                {scene.devanagari}
              </p>
              <h3 className="font-serif text-2xl md:text-[1.7rem] font-semibold leading-snug text-indigo">{scene.title[locale]}</h3>
              <p className="leading-relaxed text-charcoal-300">{scene.text[locale]}</p>
              {scene.linkToDay && (
                <button
                  type="button"
                  onClick={() => switchStory('day')}
                  className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-indigo underline decoration-indigo-200 underline-offset-4 hover:decoration-indigo"
                >
                  {ui.seeDay[locale]}
                  <ArrowRight size={15} />
                </button>
              )}
            </div>

            {scene.verse && (
              <blockquote
                key={`v-${story}-${index}-${locale}`}
                className="vd-fade md:col-span-2 self-start space-y-2 rounded-lg border border-gold/25 bg-gold-50/60 p-5 text-center"
              >
                <p className="shloka-devanagari whitespace-pre-line text-lg leading-relaxed text-indigo" lang="sa">
                  {scene.verse.devanagari}
                </p>
                {locale === 'en' && <p className="shloka-iast text-sm text-charcoal-300">{scene.verse.iast}</p>}
                <p className="text-sm italic leading-relaxed text-charcoal-300">{scene.verse.meaning[locale]}</p>
                {scene.verse.source && <cite className="block text-xs not-italic text-charcoal-200">— {scene.verse.source}</cite>}
              </blockquote>
            )}

            {scene.patterns && (
              <div key={`p-${story}-${index}-${locale}`} className="vd-fade md:col-span-2 self-start rounded-lg border border-gold/25 bg-gold-50/60 p-5">
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                  {scene.patterns.map((p) => (
                    <div key={p.seq} className="contents">
                      <dt className="font-semibold text-indigo">{p.name[locale]}</dt>
                      <dd className="font-mono tracking-wide text-charcoal-300">{p.seq}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* ── Controls ── */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 text-indigo transition-colors hover:bg-indigo-50"
                aria-label={ui.previous[locale]}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setPlayChoice(!playing)}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-indigo px-5 text-sm font-medium text-ivory-50 transition-colors hover:bg-indigo-500"
                aria-pressed={playing}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
                {playing ? ui.pause[locale] : ui.play[locale]}
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 text-indigo transition-colors hover:bg-indigo-50"
                aria-label={ui.next[locale]}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <p className="sr-only">{sceneLabel}</p>
            <p className="text-center text-xs italic text-charcoal-200">{ui.note[story][locale]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VidyarthiStoryboard;
