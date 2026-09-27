/**
 * Scene effects shared by both storyboards: the chanted Ṛgveda mantra with
 * svara-synchronised hand movement, river water, birds, fireflies, bunting,
 * call-and-response speech, the Ghana-pāṭha weave and gently revealed text.
 */

'use client';

import type { Metrics, Pt } from './person';
import { Anim, At, Translate } from './anim';
import { COL, DEVANAGARI } from './props';

/* ── Ṛgveda 1.1.1, syllable by syllable, with its svaras ─────────────
 *   A = anudātta (॒, hand goes down)
 *   U = udātta (unmarked, hand level)
 *   S = svarita (॑, hand goes up)
 *   P = pracaya (unmarked after a svarita, level)
 */
type Svara = 'A' | 'U' | 'S' | 'P';
type Syl = [string, Svara | ''];

export const RV_1_1_1: Syl[][] = [
  [
    ['अ॒', 'A'], ['ग्नि', 'U'], ['मी॑', 'S'], ['ळे', 'P'], [' ', ''],
    ['पु॒', 'A'], ['रो', 'U'], ['हि॑', 'S'], ['तं', 'P'], [' ', ''],
    ['य॒', 'A'], ['ज्ञ', 'U'], ['स्य॑', 'S'], [' ', ''],
    ['दे॒', 'A'], ['व', 'U'], ['मृ॒', 'A'], ['त्वि', 'U'], ['ज॑म्', 'S'], [' ।', ''],
  ],
  [
    ['हो', 'U'], ['ता॑', 'S'], ['रं', 'P'], [' ', ''],
    ['र', 'P'], ['त्न॒', 'A'], ['धा', 'U'], ['त॑', 'S'], ['मम्', 'P'], [' ॥', ''],
  ],
];

const SYL = 0.44;
const PAUSE = 2;
const SVARAS: Svara[] = RV_1_1_1.flat().filter((s) => s[1] !== '').map((s) => s[1] as Svara);
const N = SVARAS.length;
export const CHANT_DUR = N * SYL + PAUSE;
const k = (t: number) => Math.round((t / CHANT_DUR) * 10000) / 10000;

/** keyTimes for a hand that follows the svaras of the mantra */
export const CHANT_KEYTIMES = (() => {
  const out: number[] = [];
  for (let i = 0; i < N; i++) out.push(k(i * SYL), k((i + 0.7) * SYL));
  out.push(k(N * SYL + 0.3), 1);
  return out.join(';');
})();

/** Hand positions that rise for svarita and fall for anudātta, one per keyTime. */
export function svaraHand(m: Metrics, amp = 5): Pt[] {
  const base = { x: m.chest.x + 0.25 * m.shW, y: m.chest.y + 3 };
  const dy: Record<Svara, number> = { A: amp, U: 0, P: 0, S: -amp };
  const out: Pt[] = [];
  SVARAS.forEach((s) => {
    const p = { x: base.x, y: base.y + dy[s] };
    out.push(p, p);
  });
  const rest = { x: base.x - 1, y: base.y + 2 };
  out.push(rest, rest);
  return out;
}

export const chantTiming = { dur: `${CHANT_DUR}s`, keyTimes: CHANT_KEYTIMES };

/** The mantra on a palm-leaf strip, each syllable lighting up as it is chanted. */
export function MantraBanner({ width = 540 }: { width?: number }) {
  let idx = 0;
  const lines = RV_1_1_1.map((line) =>
    line.map(([txt, sv], j) => {
      if (!sv) return <tspan key={j}>{txt}</tspan>;
      const i = idx++;
      const t0 = k(i * SYL);
      const t1 = k((i + 1) * SYL);
      const base = '#4A2E1E';
      const hi = COL.kumkuma;
      return (
        <tspan key={j} fill={base}>
          {txt}
          {i === 0 ? (
            <Anim attr="fill" values={`${hi};${base}`} keyTimes={`0;${t1}`} calcMode="discrete" dur={`${CHANT_DUR}s`} />
          ) : (
            <Anim attr="fill" values={`${base};${hi};${base}`} keyTimes={`0;${t0};${t1}`} calcMode="discrete" dur={`${CHANT_DUR}s`} />
          )}
        </tspan>
      );
    })
  );
  const w = width;
  return (
    <g>
      <rect x={-w / 2 + 4} y={4} width={w} height={84} rx={14} fill="#1B0F08" opacity={0.18} filter="url(#vd-soft)" />
      <rect x={-w / 2} y={0} width={w} height={84} rx={14} fill="url(#vd-leaf-palm)" stroke="#B89B55" strokeWidth={1.2} />
      <path d={`M${-w / 2 + 10} 8 H${w / 2 - 10} M${-w / 2 + 10} 76 H${w / 2 - 10}`} stroke="#B89B55" strokeWidth={0.6} opacity={0.7} />
      <circle cx={-w / 2 + 22} cy={42} r={4} fill="#8E7440" />
      <circle cx={w / 2 - 22} cy={42} r={4} fill="#8E7440" />
      <text x={0} y={36} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 21, fontWeight: 600 }}>
        {lines[0]}
      </text>
      <text x={0} y={66} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 21, fontWeight: 600 }}>
        {lines[1]}
      </text>
    </g>
  );
}

/* ── Water ────────────────────────────────────────────────────────── */

export function River({ top = 372 }: { top?: number }) {
  const waves = Array.from({ length: 44 }, () => 't20 0').join(' ');
  return (
    <g>
      <path d={`M0 ${top} Q200 ${top - 10} 400 ${top} T800 ${top} V450 H0 Z`} fill={COL.water} />
      <path d={`M0 ${top} Q200 ${top - 10} 400 ${top} T800 ${top} V450 H0 Z`} fill="url(#vd-shade-y)" opacity={0.6} />
      <path d={`M0 ${top + 3} Q200 ${top - 7} 400 ${top + 3} T800 ${top + 3}`} stroke="#9CC6DC" strokeWidth={2} fill="none" />
      <g stroke="#B6D8EA" strokeWidth={1.3} fill="none" opacity={0.65}>
        {[20, 42, 62].map((dy, i) => (
          <path key={dy} d={`M-40 ${top + dy} q10 -3 20 0 ${waves}`}>
            <Translate values="0 0; 40 0" dur={`${3 + i}s`} />
          </path>
        ))}
      </g>
    </g>
  );
}

/** Expanding ripple ring. */
export function Ripple({ x, y, begin = '0s' }: { x: number; y: number; begin?: string }) {
  return (
    <ellipse cx={x} cy={y} rx={20} ry={3.5} fill="none" stroke="#CFE6F2" strokeWidth={1.3} opacity={0}>
      <Anim attr="rx" values="10;42" dur="1.8s" begin={begin} />
      <Anim attr="opacity" values="0.9;0" dur="1.8s" begin={begin} />
    </ellipse>
  );
}

/** Drops falling from a point. */
export function Drops({ x, y, dx = 0, dy = 30, n = 4, color = '#CFEAF7' }: { x: number; y: number; dx?: number; dy?: number; n?: number; color?: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x} ${y} v6`} stroke={color} strokeWidth={1.8} strokeLinecap="round" opacity={0}>
          <Translate values={`0 0; ${dx} ${dy}`} dur="0.9s" begin={`${(i * 0.9) / n}s`} />
          <Anim attr="opacity" values="0;1;0" dur="0.9s" begin={`${(i * 0.9) / n}s`} />
        </path>
      ))}
    </g>
  );
}

/* ── Sky life ─────────────────────────────────────────────────────── */

function BirdShape({ delay = '0s' }: { delay?: string }) {
  return (
    <path d="M-8 0 Q-4 -5 0 0 Q4 -5 8 0" stroke="#2A1E17" strokeWidth={1.5} fill="none" strokeLinecap="round">
      <Anim attr="d" values="M-8 0 Q-4 -5 0 0 Q4 -5 8 0;M-8 -3 Q-4 1 0 0 Q4 1 8 -3;M-8 0 Q-4 -5 0 0 Q4 -5 8 0" dur="0.6s" begin={delay} />
    </path>
  );
}

export function Birds({ y = 120 }: { y?: number }) {
  return (
    <g>
      <Translate values="0 0; -960 -40" dur="18s" />
      {[
        [860, y, '0s'],
        [884, y + 14, '0.2s'],
        [906, y - 8, '0.4s'],
        [930, y + 6, '0.1s'],
      ].map(([x, yy, b], i) => (
        <At key={i} x={x as number} y={yy as number}>
          <BirdShape delay={b as string} />
        </At>
      ))}
    </g>
  );
}

export function Fireflies({ spots }: { spots: [number, number][] }) {
  return (
    <g>
      {spots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.8} fill="#FBF3A6" opacity={0.2}>
          <Anim attr="opacity" values="0.1;1;0.1" dur="2.2s" begin={`${(i * 0.53) % 2}s`} />
          <Translate values="0 0; 6 -8; -4 -14; 0 0" dur="6s" begin={`${(i * 0.7) % 3}s`} />
        </circle>
      ))}
    </g>
  );
}

/** String of tricolour pennants. */
export function Bunting({ x1, y1, x2, y2, sag = 26 }: { x1: number; y1: number; x2: number; y2: number; sag?: number }) {
  const n = 14;
  const cols = ['#FF9933', '#FFFFFF', '#138808'];
  const pt = (t: number) => {
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t + Math.sin(Math.PI * t) * sag;
    return [x, y];
  };
  return (
    <g>
      <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag * 2} ${x2} ${y2}`} stroke="#8E7E62" strokeWidth={0.8} fill="none" />
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = pt((i + 0.5) / n);
        return (
          <path key={i} d={`M${x - 5} ${y} L${x + 5} ${y} L${x} ${y + 11} Z`} fill={cols[i % 3]} stroke="#00000018" strokeWidth={0.4}>
            <Anim attr="d" values={`M${x - 5} ${y} L${x + 5} ${y} L${x} ${y + 11} Z;M${x - 5} ${y} L${x + 5} ${y} L${x + 2} ${y + 10.5} Z;M${x - 5} ${y} L${x + 5} ${y} L${x} ${y + 11} Z`} dur={`${1.4 + (i % 3) * 0.3}s`} />
          </path>
        );
      })}
    </g>
  );
}

/* ── Speech ───────────────────────────────────────────────────────── */

/** A speech cloud that fades in for a slice of a repeating cycle. */
export function Speech({
  text,
  x,
  y,
  tail,
  from,
  to,
  dur,
  size = 16,
  tone = 'guru',
}: {
  text: string;
  x: number;
  y: number;
  tail: Pt;
  from: number;
  to: number;
  dur: number;
  size?: number;
  tone?: 'guru' | 'students';
}) {
  const w = text.length * size * 0.42 + 26;
  const fill = tone === 'guru' ? '#FFF8E6' : '#EEF3FB';
  const stroke = tone === 'guru' ? '#D2B36A' : '#9DB2D6';
  const a = Math.round((from / dur) * 1000) / 1000;
  const b = Math.round((to / dur) * 1000) / 1000;
  return (
    <g opacity={0}>
      <Anim attr="opacity" values="0;0;1;1;0;0" keyTimes={`0;${a};${Math.min(b, a + 0.04)};${Math.max(a, b - 0.05)};${b};1`} dur={`${dur}s`} />
      <path d={`M${x - 10} ${y + 12} L${tail.x} ${tail.y} L${x + 6} ${y + 14} Z`} fill={fill} stroke={stroke} strokeWidth={1} />
      <rect x={x - w / 2} y={y - 16} width={w} height={32} rx={16} fill={fill} stroke={stroke} strokeWidth={1} />
      <text x={x} y={y + 6} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: size, fill: tone === 'guru' ? COL.kumkuma : '#2E2A5D', fontWeight: 600 }}>
        {text}
      </text>
    </g>
  );
}

/* ── Ghana pāṭha weave ────────────────────────────────────────────── */

const WORDS = [
  { t: 'अग्निम्', c: '#A63232' },
  { t: 'ईळे', c: '#2E2A5D' },
  { t: 'पुरोहितम्', c: '#8E6A09' },
];
const GHANA: number[][] = [
  [0, 1],
  [1, 0],
  [0, 1, 2],
  [2, 1, 0],
  [0, 1, 2],
];

/** The Ghana pattern "ab ba abc cba abc" built up word by word. */
export function GhanaWeave() {
  const flat = GHANA.flat();
  const dur = flat.length * 0.6 + 3;
  const chipW = 62;
  const rows = [[0, 1], [2, 3], [4]];
  let n = 0;
  const pos: { g: number; w: number; x: number; y: number; i: number }[] = [];
  rows.forEach((row, r) => {
    const groups = row.map((g) => GHANA[g]);
    const total = groups.reduce((s, g) => s + g.length * chipW, 0) + (groups.length - 1) * 18;
    let x = -total / 2;
    row.forEach((g) => {
      GHANA[g].forEach((w) => {
        pos.push({ g, w, x: x + chipW / 2, y: r * 34, i: n++ });
        x += chipW;
      });
      x += 18;
    });
  });
  return (
    <g>
      <rect x={-250} y={-44} width={500} height={150} rx={14} fill="url(#vd-leaf-palm)" stroke="#B89B55" strokeWidth={1.2} />
      <text x={0} y={-24} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 14, fill: '#6B4A1E', fontWeight: 600 }}>
        घनपाठः · ab ba abc cba abc
      </text>
      {pos.map((p) => {
        const a = Math.round(((p.i * 0.6) / dur) * 1000) / 1000;
        const word = WORDS[p.w];
        return (
          <g key={p.i} transform={`translate(${p.x} ${p.y})`} opacity={0}>
            <Anim attr="opacity" values="0;0;1;1;0" keyTimes={`0;${a};${Math.min(0.99, a + 0.03)};0.94;1`} dur={`${dur}s`} />
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

/* ── Text that appears line by line (Guru's upadeśa) ─────────────── */

export function Reveal({ lines, x, y, dur = 9, size = 18 }: { lines: string[]; x: number; y: number; dur?: number; size?: number }) {
  return (
    <g>
      {lines.map((l, i) => {
        const a = Math.round(((i * 1.6) / dur) * 1000) / 1000;
        return (
          <text key={i} x={x} y={y + i * (size + 10)} textAnchor="middle" opacity={0} style={{ fontFamily: DEVANAGARI, fontSize: size, fill: '#FFF6DA', fontWeight: 600, paintOrder: 'stroke', stroke: '#5A2A10', strokeWidth: 3 }}>
            {l}
            <Anim attr="opacity" values="0;0;1;1;0" keyTimes={`0;${a};${Math.min(0.99, a + 0.08)};0.92;1`} dur={`${dur}s`} />
          </text>
        );
      })}
    </g>
  );
}
