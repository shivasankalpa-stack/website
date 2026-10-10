/**
 * Living details drawn over the pencil illustrations, in the drawings'
 * own coordinate space (1600 × 893): lamp and fire glow, embers, smoke,
 * water ripples and drops, birds, falling petals, dust in the light,
 * twinkling stars, and the Sanskrit text (mantra, speech, chalk, boards).
 *
 * Everything animates with SMIL through the helpers in anim.tsx, which
 * render nothing when motion is off (prefers-reduced-motion).
 */

'use client';

import { Anim, Translate } from './anim';

export const DEVANAGARI = 'var(--font-noto-serif-devanagari), "Noto Serif Devanagari", serif';
const GRAPHITE = '#2F2A25';
const KUMKUMA = '#A63232';

/** Gradients and filters used by the overlays. Rendered once per drawing. */
export function FxDefs() {
  return (
    <defs>
      <radialGradient id="fx-warm">
        <stop offset="0" stopColor="#FFE2A0" stopOpacity={0.85} />
        <stop offset="0.35" stopColor="#FFC870" stopOpacity={0.35} />
        <stop offset="1" stopColor="#FFC870" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="fx-fire">
        <stop offset="0" stopColor="#FFE9A8" stopOpacity={0.9} />
        <stop offset="0.4" stopColor="#FF9A3C" stopOpacity={0.32} />
        <stop offset="1" stopColor="#FF7A2A" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="fx-sun">
        <stop offset="0" stopColor="#FFF0C2" stopOpacity={0.9} />
        <stop offset="0.5" stopColor="#FFD98A" stopOpacity={0.25} />
        <stop offset="1" stopColor="#FFD98A" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="fx-ray" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.55} />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
      </linearGradient>
      <filter id="fx-pencil" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
      </filter>
      <filter id="fx-blur">
        <feGaussianBlur stdDeviation="10" />
      </filter>
      <filter id="fx-blur-s">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
    </defs>
  );
}

/* ── Light ────────────────────────────────────────────────────────── */

/** Warm flickering light around a lamp flame. `screen` brightens dark (night) drawings. */
export function LampGlow({ x, y, r = 90, screen = false }: { x: number; y: number; r?: number; screen?: boolean }) {
  return (
    <g style={{ mixBlendMode: screen ? 'screen' : 'multiply' }}>
      <circle cx={x} cy={y} r={r} fill="url(#fx-warm)">
        <Anim attr="opacity" values="0.75;1;0.7;0.95;0.8;0.75" dur="1.9s" />
        <Anim attr="r" values={`${r};${r * 1.06};${r * 0.97};${r * 1.04};${r}`} dur="2.3s" />
      </circle>
      <circle cx={x} cy={y} r={r * 0.18} fill="#FFF4CF" opacity={0.6}>
        <Anim attr="opacity" values="0.4;0.8;0.5;0.75;0.4" dur="0.9s" />
      </circle>
    </g>
  );
}

/** A homa fire: glow, rising embers and soft smoke. */
export function Fire({ x, y, w = 160, smoke = true }: { x: number; y: number; w?: number; smoke?: boolean }) {
  return (
    <g>
      <g style={{ mixBlendMode: 'multiply' }}>
        <ellipse cx={x} cy={y} rx={w * 1.6} ry={w * 1.2} fill="url(#fx-fire)">
          <Anim attr="opacity" values="0.7;1;0.75;0.95;0.7" dur="1.4s" />
        </ellipse>
      </g>
      {Array.from({ length: 14 }, (_, i) => {
        const x0 = x + ((i * 37) % w) - w / 2;
        const dur = 2.2 + (i % 5) * 0.35;
        return (
          <circle key={i} cx={x0} cy={y} r={1.6 + (i % 3) * 0.7} fill={i % 2 ? '#F28A2E' : '#F7C25A'} opacity={0}>
            <Translate values={`0 0; ${(i % 2 ? 1 : -1) * (8 + (i % 4) * 6)} ${-(110 + (i % 5) * 30)}`} dur={`${dur}s`} begin={`${(i * 0.29).toFixed(2)}s`} />
            <Anim attr="opacity" values="0;1;0.8;0" dur={`${dur}s`} begin={`${(i * 0.29).toFixed(2)}s`} />
          </circle>
        );
      })}
      {smoke && <Smoke x={x} y={y - w * 0.6} n={3} spread={w * 0.4} rise={260} />}
    </g>
  );
}

/** Soft grey wisps rising (smoke from fire, steam from a pot). */
export function Smoke({ x, y, n = 3, spread = 40, rise = 160, light = false }: { x: number; y: number; n?: number; spread?: number; rise?: number; light?: boolean }) {
  return (
    <g filter="url(#fx-blur-s)">
      {Array.from({ length: n }, (_, i) => {
        const dx = (i - (n - 1) / 2) * (spread / Math.max(1, n - 1));
        const dur = 4 + i * 0.7;
        return (
          <path
            key={i}
            d={`M${x + dx} ${y} q-14 -24 0 -48 q14 -24 0 -48`}
            stroke={light ? '#FFFFFF' : '#8F8880'}
            strokeWidth={light ? 5 : 7}
            strokeLinecap="round"
            fill="none"
            opacity={0}
          >
            <Translate values={`0 0; ${i % 2 ? 18 : -14} ${-rise}`} dur={`${dur}s`} begin={`${(i * 1.3).toFixed(1)}s`} />
            <Anim attr="opacity" values={light ? '0;0.75;0' : '0;0.45;0'} dur={`${dur}s`} begin={`${(i * 1.3).toFixed(1)}s`} />
          </path>
        );
      })}
    </g>
  );
}

/** A soft beam of light through a window, with dust drifting in it. */
export function LightBeam({ points, motes = [] }: { points: string; motes?: [number, number][] }) {
  return (
    <g>
      <polygon points={points} fill="url(#fx-ray)" filter="url(#fx-blur)" opacity={0.45}>
        <Anim attr="opacity" values="0.35;0.55;0.35" dur="7s" />
      </polygon>
      <Motes spots={motes} />
    </g>
  );
}

export function Motes({ spots, color = '#FFFFFF' }: { spots: [number, number][]; color?: string }) {
  return (
    <g fill={color}>
      {spots.map(([x, y], i) => {
        const dur = 7 + (i % 5) * 1.6;
        return (
          <circle key={i} cx={x} cy={y} r={1.2 + (i % 3) * 0.6} opacity={0}>
            <Anim attr="opacity" values="0;0.9;0" dur={`${dur}s`} begin={`${(i * 0.7) % 6}s`} />
            <Translate values={`0 0; ${(i % 3) * 8 - 8} ${-20 - (i % 4) * 10}`} dur={`${dur}s`} begin={`${(i * 0.7) % 6}s`} />
          </circle>
        );
      })}
    </g>
  );
}

/** Gentle pulse of a drawn sun. */
export function SunGlow({ x, y, r = 90 }: { x: number; y: number; r?: number }) {
  return (
    <g style={{ mixBlendMode: 'multiply' }}>
      <circle cx={x} cy={y} r={r} fill="url(#fx-sun)">
        <Anim attr="opacity" values="0.7;1;0.7" dur="6s" />
      </circle>
    </g>
  );
}

export function Stars({ spots }: { spots: [number, number][] }) {
  return (
    <g fill="#FFFBEA">
      {spots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6}>
          <Anim attr="opacity" values="1;0.2;1" dur={`${1.8 + (i % 4) * 0.7}s`} begin={`${i * 0.4}s`} />
        </circle>
      ))}
    </g>
  );
}

/* ── Water ────────────────────────────────────────────────────────── */

export function Ripples({ x, y, rx = 90, n = 3 }: { x: number; y: number; rx?: number; n?: number }) {
  return (
    <g fill="none" stroke="#5E5850" strokeWidth={1.4}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx * 0.3} ry={rx * 0.06} opacity={0}>
          <Anim attr="rx" values={`${rx * 0.2};${rx * 1.4}`} dur="3s" begin={`${i}s`} />
          <Anim attr="ry" values={`${rx * 0.04};${rx * 0.26}`} dur="3s" begin={`${i}s`} />
          <Anim attr="opacity" values="0.7;0" dur="3s" begin={`${i}s`} />
        </ellipse>
      ))}
    </g>
  );
}

/** Water drops falling from a point. */
export function Drops({ x, y, dx = 0, dy = 120, n = 5, dur = 1.1 }: { x: number; y: number; dx?: number; dy?: number; n?: number; dur?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={x} cy={y} rx={2.2} ry={4} fill="#FFFFFF" stroke="#7A736B" strokeWidth={0.9} opacity={0}>
          <Translate values={`0 0; ${dx} ${dy}`} dur={`${dur}s`} begin={`${((i * dur) / n).toFixed(2)}s`} />
          <Anim attr="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${dur}s`} begin={`${((i * dur) / n).toFixed(2)}s`} />
        </ellipse>
      ))}
    </g>
  );
}

/* ── Sky life ─────────────────────────────────────────────────────── */

function Bird({ delay = '0s' }: { delay?: string }) {
  return (
    <path d="M-10 0 Q-5 -6 0 0 Q5 -6 10 0" stroke={GRAPHITE} strokeWidth={1.8} fill="none" strokeLinecap="round">
      <Anim attr="d" values="M-10 0 Q-5 -6 0 0 Q5 -6 10 0;M-10 -4 Q-5 1 0 0 Q5 1 10 -4;M-10 0 Q-5 -6 0 0 Q5 -6 10 0" dur="0.7s" begin={delay} />
    </path>
  );
}

/** A small flock crossing the sky, right to left (or left to right). */
export function Birds({ y = 120, dir = -1, dur = 22 }: { y?: number; dir?: 1 | -1; dur?: number }) {
  const start = dir < 0 ? 1700 : -100;
  const travel = dir * 1850;
  return (
    <g>
      <Translate values={`0 0; ${travel} -40`} dur={`${dur}s`} />
      {[
        [0, 0, '0s'],
        [26, 16, '0.2s'],
        [50, -8, '0.4s'],
        [74, 10, '0.1s'],
        [96, 24, '0.3s'],
      ].map(([dx, dy, b], i) => (
        <g key={i} transform={`translate(${start + (dx as number) * -dir} ${y + (dy as number)})`}>
          <Bird delay={b as string} />
        </g>
      ))}
    </g>
  );
}

/** Flower petals drifting down from a point. */
export function Petals({ x, y, w = 120, fall = 420 }: { x: number; y: number; w?: number; fall?: number }) {
  const cols = ['#F0A030', '#E8572F', '#F6C343', '#D9433A'];
  return (
    <g>
      {Array.from({ length: 18 }, (_, i) => {
        const x0 = x + ((i * 53) % w) - w / 2;
        const dur = 5 + (i % 5) * 0.8;
        const sway = (i % 2 ? 1 : -1) * (20 + (i % 4) * 10);
        return (
          <ellipse key={i} cx={x0} cy={y} rx={3.6} ry={2.2} fill={cols[i % 4]} opacity={0}>
            <Translate values={`0 0; ${sway} ${fall * 0.5}; ${-sway * 0.4} ${fall}`} dur={`${dur}s`} begin={`${(i * 0.37).toFixed(2)}s`} />
            <Anim attr="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur={`${dur}s`} begin={`${(i * 0.37).toFixed(2)}s`} />
          </ellipse>
        );
      })}
    </g>
  );
}

/** Dust kicked up (by a broom, by running feet). */
export function Dust({ x, y, n = 3 }: { x: number; y: number; n?: number }) {
  return (
    <g filter="url(#fx-blur-s)">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x + i * 12} cy={y} r={6} fill="#A99E8C" opacity={0}>
          <Translate values={`0 0; ${18 + i * 8} -22`} dur="1.8s" begin={`${i * 0.6}s`} />
          <Anim attr="r" values="4;16" dur="1.8s" begin={`${i * 0.6}s`} />
          <Anim attr="opacity" values="0;0.5;0" dur="1.8s" begin={`${i * 0.6}s`} />
        </circle>
      ))}
    </g>
  );
}

/* ── Text ─────────────────────────────────────────────────────────── */

/**
 * Text painted onto a board or banner: appears letter-cluster by cluster,
 * as if being written. `skew` follows the board's perspective.
 */
export function WrittenText({
  lines,
  x,
  y,
  size = 30,
  color = GRAPHITE,
  gap = 1.35,
  rotate = 0,
  skewY = 0,
  begin = 0.6,
  step = 0.12,
  family = DEVANAGARI,
  weight = 600,
  halo,
}: {
  lines: string[];
  x: number;
  y: number;
  size?: number;
  color?: string;
  gap?: number;
  rotate?: number;
  skewY?: number;
  begin?: number;
  step?: number;
  family?: string;
  weight?: number;
  halo?: string;
}) {
  let k = 0;
  const seg = (s: string) => (typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? Array.from(new Intl.Segmenter('hi', { granularity: 'grapheme' }).segment(s), (g) => g.segment)
    : Array.from(s));
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) skewY(${skewY})`} filter="url(#fx-pencil)">
      {lines.map((l, li) => (
        <text
          key={li}
          x={0}
          y={li * size * gap}
          textAnchor="middle"
          style={{ fontFamily: family, fontSize: size, fontWeight: weight, fill: color, paintOrder: 'stroke', stroke: halo ?? 'none', strokeWidth: halo ? size * 0.18 : 0 }}
        >
          {seg(l).map((g, gi) => {
            const t = begin + k++ * step;
            return (
              <tspan key={gi} opacity={1}>
                {g}
                <Anim attr="opacity" values="0;1" keyTimes={`0;${Math.min(0.98, t / 40).toFixed(4)}`} calcMode="discrete" dur="40s" />
              </tspan>
            );
          })}
        </text>
      ))}
    </g>
  );
}

/* ── The Ṛgveda mantra, syllable by syllable, with its svaras ─────── */

type Syl = [string, boolean];
export const RV_1_1_1: Syl[][] = [
  [['अ॒', true], ['ग्नि', true], ['मी॑', true], ['ळे', true], [' ', false], ['पु॒', true], ['रो', true], ['हि॑', true], ['तं', true], [' ', false], ['य॒', true], ['ज्ञ', true], ['स्य॑', true], [' ', false], ['दे॒', true], ['व', true], ['मृ॒', true], ['त्वि', true], ['ज॑म्', true], [' ।', false]],
  [['हो', true], ['ता॑', true], ['रं', true], [' ', false], ['र', true], ['त्न॒', true], ['धा', true], ['त॑', true], ['मम्', true], [' ॥', false]],
];
const SYL = 0.44;
const N_SYL = RV_1_1_1.flat().filter((s) => s[1]).length;
export const CHANT_DUR = N_SYL * SYL + 2;

/** The mantra on a pencil-drawn palm-leaf strip; each syllable lights up as it is chanted. */
export function MantraBanner({ x, y, w = 880 }: { x: number; y: number; w?: number }) {
  let idx = 0;
  const k = (t: number) => (t / CHANT_DUR).toFixed(4);
  const lines = RV_1_1_1.map((line) =>
    line.map(([txt, sung], j) => {
      if (!sung) return <tspan key={j}>{txt}</tspan>;
      const i = idx++;
      const t0 = k(i * SYL);
      const t1 = k((i + 1) * SYL);
      return (
        <tspan key={j} fill={GRAPHITE}>
          {txt}
          {i === 0 ? (
            <Anim attr="fill" values={`${KUMKUMA};${GRAPHITE}`} keyTimes={`0;${t1}`} calcMode="discrete" dur={`${CHANT_DUR}s`} />
          ) : (
            <Anim attr="fill" values={`${GRAPHITE};${KUMKUMA};${GRAPHITE}`} keyTimes={`0;${t0};${t1}`} calcMode="discrete" dur={`${CHANT_DUR}s`} />
          )}
        </tspan>
      );
    })
  );
  const h = 136;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2 + 6} y={8} width={w} height={h} rx={22} fill="#3A2E24" opacity={0.18} filter="url(#fx-blur-s)" />
      <g filter="url(#fx-pencil)">
        <rect x={-w / 2} y={0} width={w} height={h} rx={22} fill="#F3EAD3" stroke={GRAPHITE} strokeWidth={2} />
        <path d={`M${-w / 2 + 16} 12 H${w / 2 - 16} M${-w / 2 + 16} ${h - 12} H${w / 2 - 16}`} stroke="#8C8173" strokeWidth={1} />
        <circle cx={-w / 2 + 34} cy={h / 2} r={6} fill="none" stroke={GRAPHITE} strokeWidth={1.6} />
        <circle cx={w / 2 - 34} cy={h / 2} r={6} fill="none" stroke={GRAPHITE} strokeWidth={1.6} />
      </g>
      <text x={0} y={58} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 34, fontWeight: 600 }}>
        {lines[0]}
      </text>
      <text x={0} y={106} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 34, fontWeight: 600 }}>
        {lines[1]}
      </text>
    </g>
  );
}

/** A pencil speech cloud that shows for a slice of a repeating cycle. */
export function Speech({
  text,
  x,
  y,
  tail,
  from,
  to,
  dur,
  size = 30,
  ink = KUMKUMA,
}: {
  text: string;
  x: number;
  y: number;
  tail: [number, number];
  from: number;
  to: number;
  dur: number;
  size?: number;
  ink?: string;
}) {
  const w = text.length * size * 0.44 + 50;
  const a = (from / dur).toFixed(3);
  const b = (to / dur).toFixed(3);
  const a2 = Math.min(to / dur, from / dur + 0.04).toFixed(3);
  const b2 = Math.max(from / dur, to / dur - 0.05).toFixed(3);
  return (
    <g opacity={0}>
      <Anim attr="opacity" values="0;0;1;1;0;0" keyTimes={`0;${a};${a2};${b2};${b};1`} dur={`${dur}s`} />
      <g filter="url(#fx-pencil)">
        <path d={`M${x - 18} ${y + 22} L${tail[0]} ${tail[1]} L${x + 12} ${y + 26} Z`} fill="#FBF7EC" stroke={GRAPHITE} strokeWidth={1.8} />
        <rect x={x - w / 2} y={y - 30} width={w} height={60} rx={30} fill="#FBF7EC" stroke={GRAPHITE} strokeWidth={1.8} />
        <path d={`M${x - 14} ${y + 28} L${x + 10} ${y + 28}`} stroke="#FBF7EC" strokeWidth={4} />
      </g>
      <text x={x} y={y + 11} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: size, fill: ink, fontWeight: 600 }}>
        {text}
      </text>
    </g>
  );
}

/* ── Ghana pāṭha weave ────────────────────────────────────────────── */

const WORDS = [
  { t: 'अग्निम्', c: KUMKUMA },
  { t: 'ईळे', c: '#2E2A5D' },
  { t: 'पुरोहितम्', c: '#7A5A10' },
];
const GHANA: number[][] = [[0, 1], [1, 0], [0, 1, 2], [2, 1, 0], [0, 1, 2]];

/** "ab ba abc cba abc", built up word by word on a pencil-drawn palm leaf. */
export function GhanaWeave({ x, y, s = 1.2 }: { x: number; y: number; s?: number }) {
  const total = GHANA.flat().length;
  const dur = total * 0.6 + 3;
  const chipW = 62;
  const rows = [[0, 1], [2, 3], [4]];
  let n = 0;
  const pos: { w: number; x: number; y: number; i: number }[] = [];
  rows.forEach((row, r) => {
    const groups = row.map((g) => GHANA[g]);
    const width = groups.reduce((acc, g) => acc + g.length * chipW, 0) + (groups.length - 1) * 18;
    let cx = -width / 2;
    row.forEach((g) => {
      GHANA[g].forEach((w) => {
        pos.push({ w, x: cx + chipW / 2, y: r * 34, i: n++ });
        cx += chipW;
      });
      cx += 18;
    });
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g filter="url(#fx-pencil)">
        <rect x={-250} y={-44} width={500} height={150} rx={14} fill="#F3EAD3" stroke={GRAPHITE} strokeWidth={1.6} />
      </g>
      <text x={0} y={-22} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 14, fill: '#5A4A30', fontWeight: 600 }}>
        घनपाठः · ab ba abc cba abc
      </text>
      {pos.map((p) => {
        const a = ((p.i * 0.6) / dur).toFixed(3);
        const word = WORDS[p.w];
        return (
          <g key={p.i} transform={`translate(${p.x} ${p.y})`} opacity={0}>
            <Anim attr="opacity" values="0;0;1;1;0" keyTimes={`0;${a};${Math.min(0.9, Number(a) + 0.03).toFixed(3)};0.94;1`} dur={`${dur}s`} />
            <rect x={-chipW / 2 + 2} y={-12} width={chipW - 4} height={26} rx={6} fill="#FFFDF6" stroke={word.c} strokeWidth={1.2} />
            <text x={0} y={6} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 13, fill: word.c, fontWeight: 600 }}>
              {word.t}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Lines of the Guru's upadeśa appearing one after another. */
export function Reveal({ lines, x, y, size = 34, dur = 10 }: { lines: string[]; x: number; y: number; size?: number; dur?: number }) {
  return (
    <g>
      {lines.map((l, i) => {
        const a = (i * 1.8) / dur;
        return (
          <text
            key={i}
            x={x}
            y={y + i * (size + 16)}
            textAnchor="middle"
            opacity={0}
            style={{ fontFamily: DEVANAGARI, fontSize: size, fill: GRAPHITE, fontWeight: 600, paintOrder: 'stroke', stroke: '#F7F1E3', strokeWidth: 8 }}
          >
            {l}
            <Anim attr="opacity" values="0;0;1;1;0" keyTimes={`0;${a.toFixed(3)};${Math.min(0.9, a + 0.08).toFixed(3)};0.93;1`} dur={`${dur}s`} />
          </text>
        );
      })}
    </g>
  );
}
