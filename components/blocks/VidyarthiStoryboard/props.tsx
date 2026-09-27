/**
 * Objects and set pieces for the storyboard: lamps, vessels, the cow,
 * tulasī kaṭṭe, homa kuṇḍa, the national flag, study props (book stand,
 * blackboard, laptop, globe, flask), the Gurukula gate and a maṇḍapa.
 *
 * Origin convention: ground contact point at (0, 0), y negative upwards.
 */

'use client';

import type { ReactNode } from 'react';
import { Anim, Rotate, Scale, Shadow, Translate } from './anim';

export const COL = {
  brass: '#C99A2E',
  brassLight: '#E8C66A',
  copper: '#B8683A',
  wood: '#7A4B2A',
  woodDark: '#553318',
  leaf: '#3F7F3A',
  leafLight: '#63A04A',
  flame: '#FFB938',
  flameCore: '#FFF3B8',
  chalk: '#F4F1E8',
  water: '#5B8FB2',
  kumkuma: '#A63232',
  lime: '#F3EEDF',
  kavi: '#9C4A2E',
  stone: '#B9AE9A',
};

export const DEVANAGARI = 'var(--font-noto-serif-devanagari), "Noto Serif Devanagari", serif';

/* ── Fire & light ─────────────────────────────────────────────────── */

export function Flame({ s = 1, begin = '0s' }: { s?: number; begin?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M0 0 C-3.6 -3 -3 -8.5 0 -14 C3 -8.5 3.6 -3 0 0 Z" fill={COL.flame} />
      <path d="M0 -1 C-1.7 -3 -1.3 -6.5 0 -9 C1.3 -6.5 1.7 -3 0 -1 Z" fill={COL.flameCore} />
      <Scale values="1 1; 0.88 1.12; 1.06 0.94; 0.95 1.08; 1 1" dur="0.7s" begin={begin} />
    </g>
  );
}

/** Soft warm light, meant to be drawn above the night overlay. */
export function Glow({ r = 70, fire = false }: { r?: number; fire?: boolean }) {
  return (
    <circle cx={0} cy={0} r={r} fill={fire ? 'url(#vd-fire)' : 'url(#vd-glow)'}>
      <Anim attr="opacity" values="0.85;1;0.8;0.95;0.85" dur="1.6s" />
    </circle>
  );
}

/** Small brass oil lamp (dīpa). Flame base at (0, -15). */
export function Lamp() {
  return (
    <g>
      <Shadow rx={10} o={0.25} />
      <ellipse cx={0} cy={0} rx={9} ry={2.6} fill="url(#vd-brass)" />
      <path d="M-2 0 L-1.4 -12 L1.4 -12 L2 0 Z" fill="url(#vd-brass)" />
      <ellipse cx={0} cy={-6} rx={3} ry={1.2} fill={COL.brassLight} />
      <path d="M-9.5 -13.5 Q0 -5 9.5 -13.5 Z" fill="url(#vd-brass)" />
      <ellipse cx={0} cy={-13.5} rx={9.5} ry={2.2} fill="#8E6A1C" />
      <ellipse cx={0} cy={-13.8} rx={8} ry={1.5} fill="#C9A24A" />
      <g transform="translate(5 -14.5) rotate(20)">
        <Flame s={0.9} />
      </g>
    </g>
  );
}

/** Tall standing lamp (samai). Flame base at (0, -58). */
export function TallLamp() {
  return (
    <g>
      <Shadow rx={14} o={0.3} />
      <path d="M-13 0 Q-12 -6 0 -7 Q12 -6 13 0 Z" fill="url(#vd-brass)" />
      <rect x={-2} y={-50} width={4} height={44} fill="url(#vd-brass)" />
      {[-16, -30, -42].map((y) => (
        <ellipse key={y} cx={0} cy={y} rx={4.2} ry={1.6} fill={COL.brassLight} />
      ))}
      <path d="M-12 -52 Q0 -46 12 -52 L10 -55 Q0 -52 -10 -55 Z" fill="url(#vd-brass)" />
      <ellipse cx={0} cy={-55} rx={10} ry={2} fill="#8E6A1C" />
      <path d="M-4 -56 L0 -66 L4 -56 Z" fill="url(#vd-brass)" />
      <g transform="translate(-8 -56)">
        <Flame s={0.75} />
      </g>
      <g transform="translate(8 -56)">
        <Flame s={0.75} begin="0.3s" />
      </g>
    </g>
  );
}

/* ── Vessels ──────────────────────────────────────────────────────── */

export function Kalasha({ s = 1, purna = false }: { s?: number; purna?: boolean }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={-9} rx={9} ry={9} fill="url(#vd-copper)" />
      <path d="M-5.5 -12 A6 6 0 0 1 1 -16" stroke="#F0B38A" strokeWidth={1.1} fill="none" opacity={0.8} />
      <path d="M-4 -17 L-3.6 -21 L3.6 -21 L4 -17 Z" fill="url(#vd-copper)" />
      <ellipse cx={0} cy={-21} rx={6} ry={1.8} fill="#D2804B" />
      <path d="M-9 -8 Q0 -5 9 -8" stroke="#7C4222" strokeWidth={0.6} fill="none" opacity={0.6} />
      {purna && (
        <g>
          {[-36, -18, 0, 18, 36].map((a) => (
            <path key={a} d="M0 -21 Q-2.5 -27 0 -33 Q2.5 -27 0 -21 Z" fill={COL.leaf} transform={`rotate(${a} 0 -21)`} />
          ))}
          <ellipse cx={0} cy={-28} rx={6.5} ry={7.5} fill="#8A5A34" />
          <path d="M-3 -34 Q0 -38 3 -34" stroke="#6B4424" strokeWidth={1} fill="none" />
          <path d="M-6 -24 Q0 -30 6 -24" stroke={COL.kumkuma} strokeWidth={0.8} fill="none" />
        </g>
      )}
    </g>
  );
}

/** Brass water pot (koḍa). */
export function Pot({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-10 -8 Q-12 -18 -5 -21 L-4 -25 L4 -25 L5 -21 Q12 -18 10 -8 Q8 0 0 0 Q-8 0 -10 -8 Z" fill="url(#vd-brass)" />
      <ellipse cx={0} cy={-25} rx={5.5} ry={1.6} fill="#8E6A1C" />
      <path d="M-7 -16 Q-5 -19 -1 -19" stroke="#F4DC8E" strokeWidth={1} fill="none" />
    </g>
  );
}

/** Large cauldron with rising steam. */
export function Cauldron() {
  return (
    <g>
      <Shadow rx={24} o={0.25} />
      <path d="M-22 -26 Q-26 0 0 2 Q26 0 22 -26 Z" fill="url(#vd-brass)" />
      <ellipse cx={0} cy={-26} rx={23} ry={4.5} fill="#8E6A1C" />
      <ellipse cx={0} cy={-26} rx={20} ry={3.4} fill="#F3E6C4" />
      <path d="M-26 -22 q-5 2 -2 6 M26 -22 q5 2 2 6" stroke="#8E6A1C" strokeWidth={2} fill="none" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${-8 + i * 8} -32 q-5 -8 0 -16 q5 -8 0 -16`} stroke="#FFFFFF" strokeWidth={2.2} fill="none" opacity={0} strokeLinecap="round">
          <Translate values="0 0; 0 -12" dur="2.6s" begin={`${i * 0.85}s`} />
          <Anim attr="opacity" values="0;0.65;0" dur="2.6s" begin={`${i * 0.85}s`} />
        </path>
      ))}
    </g>
  );
}

/* ── Floor things ─────────────────────────────────────────────────── */

export function Mat({ w = 70, color = '#C8A46A' }: { w?: number; color?: string }) {
  return (
    <g>
      <path d={`M${-w / 2} -4 L${w / 2} -4 L${w / 2 + 6} 4 L${-w / 2 - 6} 4 Z`} fill={color} />
      {Array.from({ length: Math.floor(w / 5) }, (_, i) => (
        <path key={i} d={`M${-w / 2 + 2 + i * 5} -4 L${-w / 2 - 4 + i * 5 * (1 + 12 / w)} 4`} stroke="#A9864E" strokeWidth={0.6} />
      ))}
      <path d={`M${-w / 2 - 6} 4 L${w / 2 + 6} 4`} stroke={COL.kavi} strokeWidth={1.2} />
    </g>
  );
}

export function Sleeper({ blanket = '#7E4A3A', skin = '#C98F60', delay = '0s' }: { blanket?: string; skin?: string; delay?: string }) {
  return (
    <g>
      <Mat w={96} />
      <path d="M-46 -4 Q-48 -12 -40 -13 L-26 -12 Q-22 -6 -26 -3 Z" fill="#EFE9DA" />
      {/* head in profile on the pillow */}
      <ellipse cx={-33} cy={-15} rx={8} ry={7.5} fill={skin} />
      <path d="M-40 -18 A8 7.5 0 0 1 -28 -21" stroke="#231812" strokeWidth={3} fill="none" opacity={0.55} />
      <circle cx={-38} cy={-20} r={2.2} fill="#231812" />
      <path d="M-30 -12 q2 0.8 3 0" stroke="#5a3a2a" strokeWidth={0.7} fill="none" />
      {/* body under the blanket: shoulder, hip, knees */}
      <path d="M-26 -3 Q-28 -22 -12 -21 Q2 -19 10 -24 Q22 -27 30 -18 Q42 -16 44 -3 Z" fill={blanket}>
        <Anim
          attr="d"
          values="M-26 -3 Q-28 -22 -12 -21 Q2 -19 10 -24 Q22 -27 30 -18 Q42 -16 44 -3 Z;M-26 -3 Q-28 -24 -12 -23 Q2 -20 10 -24 Q22 -27 30 -18 Q42 -16 44 -3 Z;M-26 -3 Q-28 -22 -12 -21 Q2 -19 10 -24 Q22 -27 30 -18 Q42 -16 44 -3 Z"
          dur="3.6s"
          begin={delay}
        />
      </path>
      <path d="M-26 -3 Q-28 -22 -12 -21 Q2 -19 10 -24 Q22 -27 30 -18 Q42 -16 44 -3 Z" fill="url(#vd-shade-y)" />
      <path d="M-18 -18 Q0 -12 20 -20 M-10 -8 Q10 -6 38 -8" stroke="#00000030" strokeWidth={1} fill="none" />
      <path d="M-26 -5 L44 -5" stroke="#D9B35A" strokeWidth={1} opacity={0.6} />
    </g>
  );
}

export function BananaLeaf() {
  return (
    <g>
      <path d="M-28 0 Q-26 -9 0 -9.5 L32 -7.5 Q36 -1 32 3.5 L0 5.5 Q-26 6.5 -28 0 Z" fill="#4E9A3A" />
      <path d="M-28 0 Q-26 -9 0 -9.5 L32 -7.5 Q36 -1 32 3.5 L0 5.5 Q-26 6.5 -28 0 Z" fill="url(#vd-shade-x)" />
      <path d="M-26 -1 L34 -2" stroke="#3B7A2B" strokeWidth={0.9} />
      {[-18, -8, 2, 12, 22].map((x) => (
        <path key={x} d={`M${x} -1.5 L${x + 4} -8 M${x} -1.5 L${x + 4} 4`} stroke="#5FAE48" strokeWidth={0.4} />
      ))}
      <ellipse cx={4} cy={-2.5} rx={9} ry={3.8} fill="#FBF8F0" />
      <ellipse cx={4} cy={-3.5} rx={6} ry={2} fill="#FFFFFF" />
      <circle cx={-11} cy={-3} r={2.3} fill="#E0A23A" />
      <circle cx={-17} cy={0} r={2} fill="#9A3B2A" />
      <circle cx={19} cy={-3} r={2.4} fill="#C9A33A" />
      <circle cx={24} cy={1} r={1.8} fill="#6E9A3A" />
    </g>
  );
}

/** Wooden X-shaped book stand with an open book. */
export function BookStand({ flip = false }: { flip?: boolean }) {
  return (
    <g>
      <Shadow rx={14} o={0.2} />
      <path d="M-13 0 L10 -17 M13 0 L-10 -17" stroke="url(#vd-wood)" strokeWidth={2.8} strokeLinecap="round" />
      <path d="M-15 -19 L0 -15 L15 -19 L15 -26 L0 -22 L-15 -26 Z" fill="#FBF8F0" stroke="#D8CBA8" strokeWidth={0.6} />
      <path d="M-12 -22.5 l9 2.2 M-12 -20.5 l9 2.2 M3 -20.3 l9 -2.2 M3 -18.3 l9 -2.2" stroke="#8E8E8E" strokeWidth={0.5} />
      <path d="M0 -22 L0 -15" stroke="#C9B98E" strokeWidth={0.8} />
      {flip && (
        <path d="M0 -22 L15 -26 L15 -19 L0 -15 Z" fill="#F2EBD9">
          <Anim attr="d" values="M0 -22 L15 -26 L15 -19 L0 -15 Z;M0 -22 L1 -37 L1 -30 L0 -15 Z;M0 -22 L-15 -26 L-15 -19 L0 -15 Z;M0 -22 L-15 -26 L-15 -19 L0 -15 Z" keyTimes="0;0.15;0.3;1" dur="5s" />
          <Anim attr="opacity" values="1;1;1;0" keyTimes="0;0.3;0.31;1" dur="5s" />
        </path>
      )}
    </g>
  );
}

/** Low wooden desk used for writing / modern subjects. */
export function LowDesk({ w = 44, children }: { w?: number; children?: ReactNode }) {
  return (
    <g>
      <Shadow rx={w * 0.55} o={0.2} />
      <rect x={-w / 2 + 3} y={-12} width={3} height={12} fill={COL.woodDark} />
      <rect x={w / 2 - 6} y={-12} width={3} height={12} fill={COL.woodDark} />
      <path d={`M${-w / 2} -12 L${w / 2} -12 L${w / 2 - 3} -16 L${-w / 2 + 3} -16 Z`} fill="url(#vd-wood)" />
      <rect x={-w / 2} y={-12} width={w} height={2.2} fill={COL.woodDark} />
      <g transform="translate(0 -16)">{children}</g>
    </g>
  );
}

export function Laptop() {
  return (
    <g>
      <path d="M-11 0 L11 0 L13 2 L-13 2 Z" fill="#6E7580" />
      <path d="M-10 0 L-8 -15 L10 -15 L8 0 Z" fill="#3B414A" />
      <path d="M-8.4 -1.4 L-6.8 -13.6 L8.6 -13.6 L7 -1.4 Z" fill="#8FD0F0">
        <Anim attr="fill" values="#8FD0F0;#A9E0F7;#8FD0F0" dur="3s" />
      </path>
      <path d="M-5 -10 h8 M-5.3 -7.5 h10 M-5.6 -5 h6" stroke="#2E5C7A" strokeWidth={0.7} />
    </g>
  );
}

export function Globe() {
  return (
    <g>
      <path d="M-6 0 L6 0 L3 -3 L-3 -3 Z" fill={COL.woodDark} />
      <path d="M0 -3 L0 -7" stroke={COL.brass} strokeWidth={1.4} />
      <path d="M-9 -16 A10 10 0 0 0 9 -16" stroke={COL.brass} strokeWidth={1.2} fill="none" transform="rotate(-20 0 -16)" />
      <clipPath id="vd-globe-clip">
        <circle cx={0} cy={-17} r={9} />
      </clipPath>
      <circle cx={0} cy={-17} r={9} fill="#4E8FC4" />
      <g clipPath="url(#vd-globe-clip)">
        <g>
          <path d="M-14 -22 q4 -3 7 0 q2 4 -2 7 q-4 1 -5 -7 Z M-3 -20 q5 -4 9 -1 q2 3 -1 5 q2 4 -3 6 q-4 -3 -5 -10 Z M8 -13 q4 -2 6 1 q-2 4 -6 2 Z" fill="#7DB35A" />
          <Translate values="0 0; 9 0; 0 0" dur="8s" />
        </g>
      </g>
      <circle cx={-3} cy={-20} r={3} fill="#FFFFFF" opacity={0.25} />
    </g>
  );
}

export function Flask() {
  return (
    <g>
      <path d="M-2.5 -18 L-2.5 -11 L-8 -1 Q-8 0 -6.5 0 L6.5 0 Q8 0 8 -1 L2.5 -11 L2.5 -18 Z" fill="#E8F4F8" stroke="#9EB8C4" strokeWidth={0.6} />
      <path d="M-6 -3.5 L6 -3.5 L7.3 -1 Q7.3 -0.4 6.5 -0.4 L-6.5 -0.4 Q-7.3 -0.4 -7.3 -1 Z" fill="#6FBF73" />
      {[0, 0.8, 1.6].map((b, i) => (
        <circle key={i} cx={-1 + i} cy={-3} r={0.8} fill="#DFF5E0" opacity={0}>
          <Translate values="0 0; 0 -12" dur="2.4s" begin={`${b}s`} />
          <Anim attr="opacity" values="0;1;0" dur="2.4s" begin={`${b}s`} />
        </circle>
      ))}
    </g>
  );
}

/* ── Study & teaching ─────────────────────────────────────────────── */

export function Blackboard({ w = 128, h = 74, children }: { w?: number; h?: number; children?: ReactNode }) {
  return (
    <g>
      <Shadow rx={w * 0.4} o={0.2} />
      <path d={`M${-w * 0.42} 0 L${-w * 0.3} ${-h - 36} M${w * 0.42} 0 L${w * 0.3} ${-h - 36} M0 0 L0 ${-36}`} stroke="url(#vd-wood)" strokeWidth={4} strokeLinecap="round" />
      <rect x={-w / 2} y={-h - 40} width={w} height={h} rx={2} fill="#2D4638" stroke={COL.wood} strokeWidth={4} />
      <rect x={-w / 2 + 3} y={-h - 37} width={w - 6} height={h - 6} fill="#FFFFFF" opacity={0.03} />
      <rect x={-w / 2 + 6} y={-41} width={16} height={3} fill={COL.chalk} opacity={0.8} />
      <g transform={`translate(0 ${-h - 40})`}>{children}</g>
    </g>
  );
}

/* ── Sacred ───────────────────────────────────────────────────────── */

export function Tulasi() {
  return (
    <g>
      <Shadow rx={40} o={0.25} />
      <path d="M-38 0 L38 0 L36 -10 L-36 -10 Z" fill="#DCD0B4" />
      <path d="M-28 -10 L28 -10 L26 -46 L-26 -46 Z" fill={COL.lime} />
      <path d="M-28 -10 L28 -10 L26 -46 L-26 -46 Z" fill="url(#vd-shade-x)" />
      <path d="M-27 -14 H27 M-26 -42 H26" stroke={COL.kavi} strokeWidth={2.4} />
      {/* niche for the lamp */}
      <path d="M-9 -14 V-27 A9 9 0 0 1 9 -27 V-14 Z" fill="#4A2E1E" />
      {/* painted motifs */}
      <circle cx={-18} cy={-28} r={3.5} fill="none" stroke={COL.kavi} strokeWidth={1} />
      <circle cx={18} cy={-28} r={3.5} fill="none" stroke={COL.kavi} strokeWidth={1} />
      <path d="M-32 -46 L32 -46 L30 -51 L-30 -51 Z" fill="#DCD0B4" />
      {/* tulasī plant */}
      <g>
        {[
          [0, -64, 12],
          [-11, -58, 9],
          [11, -58, 9],
          [-5, -76, 8],
          [6, -74, 7],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={COL.leaf} />
        ))}
        {Array.from({ length: 22 }, (_, i) => {
          const a = (i * 137.5 * Math.PI) / 180;
          const rr = 4 + (i % 7) * 1.7;
          return <ellipse key={i} cx={Math.cos(a) * rr} cy={-64 + Math.sin(a) * rr * 0.9} rx={2.3} ry={1.4} fill={i % 3 ? COL.leafLight : '#2F6A2C'} transform={`rotate(${i * 40} ${Math.cos(a) * rr} ${-64 + Math.sin(a) * rr * 0.9})`} />;
        })}
        <path d="M-4 -80 v-7 M3 -79 v-8 M10 -70 v-7 M-12 -64 v-7 M13 -60 v-6" stroke="#7A4A7E" strokeWidth={1.6} strokeLinecap="round" />
        <Rotate values="0 0 -50; 1.5 0 -50; 0 0 -50; -1.5 0 -50; 0 0 -50" dur="5s" />
      </g>
    </g>
  );
}

/** Square brick fire altar with a living fire. Fire base at (0, -16). */
export function HomaKunda() {
  return (
    <g>
      <Shadow rx={34} o={0.3} />
      <path d="M-34 0 L34 0 L30 -6 L-30 -6 Z" fill="#B0643E" />
      <path d="M-30 -6 L30 -6 L26 -11 L-26 -11 Z" fill="#C4744A" />
      <path d="M-26 -11 L26 -11 L22 -16 L-22 -16 Z" fill="#D2865A" />
      <g stroke="#8E4A2C" strokeWidth={0.5} opacity={0.7}>
        {[-24, -12, 0, 12, 24].map((x) => (
          <path key={x} d={`M${x} 0 v-6`} />
        ))}
        {[-18, -6, 6, 18].map((x) => (
          <path key={x} d={`M${x} -6 v-5`} />
        ))}
      </g>
      <path d="M-14 -16 L14 -16 L10 -19 L-10 -19 Z" fill="#3A2418" />
      <path d="M-10 -18 L8 -21 M-8 -21 L10 -18" stroke="#5E3A1F" strokeWidth={2.4} strokeLinecap="round" />
      {[
        [-7, 1.3, '0s'],
        [0, 1.9, '0.2s'],
        [7, 1.4, '0.45s'],
        [-3, 1.1, '0.6s'],
        [4, 1.2, '0.1s'],
      ].map(([x, s, b], i) => (
        <g key={i} transform={`translate(${x} -18)`}>
          <Flame s={s as number} begin={b as string} />
        </g>
      ))}
      {[0, 1.3, 2.6].map((b, i) => (
        <circle key={i} cx={i * 3 - 3} cy={-44} r={4} fill="#D9D4CC" opacity={0}>
          <Translate values="0 0; 8 -40" dur="4s" begin={`${b}s`} />
          <Anim attr="r" values="3;11" dur="4s" begin={`${b}s`} />
          <Anim attr="opacity" values="0;0.45;0" dur="4s" begin={`${b}s`} />
        </circle>
      ))}
    </g>
  );
}

/* ── Animals ──────────────────────────────────────────────────────── */

/** A Hallikar-style cow facing left, with a slow head turn and tail flick. */
export function Cow({ delay = '0s', calf = false }: { delay?: string; calf?: boolean }) {
  const body = '#EDE7DA';
  const shade = '#C9BFAE';
  return (
    <g transform={calf ? 'scale(0.62)' : undefined}>
      <Shadow rx={46} o={0.25} />
      {/* tail */}
      <g transform="translate(44 -52)">
        <path d="M0 0 Q7 18 4 40" stroke={shade} strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <path d="M4 38 q-3 6 0 12 q3 -6 0 -12 Z" fill="#4A3A2E" />
        <Rotate values="-8 0 0; 16 0 0; -8 0 0" dur="2.3s" begin={delay} />
      </g>
      {/* far legs */}
      <path d="M-22 -30 L-24 -2 L-19 -2 L-17 -30 Z M26 -30 L30 -2 L35 -2 L33 -30 Z" fill={shade} />
      {/* body */}
      <path d="M-34 -48 Q-30 -62 -16 -60 Q10 -58 36 -58 Q50 -56 48 -40 Q46 -26 36 -26 L-20 -26 Q-34 -28 -36 -38 Z" fill={body} />
      <path d="M-34 -48 Q-30 -62 -16 -60 Q10 -58 36 -58 Q50 -56 48 -40 Q46 -26 36 -26 L-20 -26 Q-34 -28 -36 -38 Z" fill="url(#vd-shade-y)" />
      {/* hump and dewlap */}
      <path d="M-26 -58 Q-22 -72 -10 -60 Z" fill={body} />
      <path d="M-36 -38 Q-40 -26 -30 -22 Q-26 -30 -28 -36 Z" fill={shade} />
      <path d="M-4 -40 Q10 -34 30 -38" stroke={shade} strokeWidth={1.2} fill="none" />
      {/* near legs */}
      <path d="M-30 -30 L-31 -2 L-25 -2 L-23 -30 Z M18 -30 Q24 -18 20 -2 L26 -2 Q30 -18 28 -30 Z" fill={body} />
      <path d="M-31 -3 h6 v3 h-6 Z M20 -3 h6 v3 h-6 Z M-24 -3 h5 v3 h-5 Z M30 -3 h5 v3 h-5 Z" fill="#3A2E24" />
      {/* head */}
      <g>
        <Rotate values="0 -34 -54; 12 -34 -54; 12 -34 -54; 0 -34 -54" keyTimes="0;0.3;0.7;1" dur="4s" begin={delay} />
        <path d="M-32 -58 Q-44 -62 -56 -52 L-62 -40 Q-62 -34 -56 -34 L-44 -42 Q-34 -46 -30 -50 Z" fill={body} />
        <path d="M-62 -40 Q-62 -34 -56 -34 L-54 -38 Z" fill="#6B5A4C" />
        <circle cx={-47} cy={-50} r={1.5} fill="#2A1E17" />
        <path d="M-42 -58 Q-44 -72 -32 -78" stroke="#8E7E62" strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <path d="M-48 -57 Q-56 -70 -52 -80" stroke="#7A6A50" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        <path d="M-36 -56 q8 -1 10 3 q-6 2 -10 -3 Z" fill={shade} />
        {/* kumkuma on the forehead */}
        <circle cx={-50} cy={-55} r={1.3} fill={COL.kumkuma} />
      </g>
    </g>
  );
}

/* ── Nation ───────────────────────────────────────────────────────── */

/**
 * The national flag on a pole, gently waving, with flower petals released
 * as it unfurls. Flag proportion 3:2 with a 24-spoke Ashoka Chakra.
 */
export function FlagPole({ h = 150 }: { h?: number }) {
  const W = 48;
  const H = 32;
  const wave = (a: number) => `M0 0 Q${W * 0.25} ${-a} ${W * 0.5} 0 T${W} 0 L${W} ${H} Q${W * 0.75} ${H + a} ${W * 0.5} ${H} T0 ${H} Z`;
  return (
    <g>
      <Shadow rx={20} o={0.3} />
      {/* platform */}
      <path d="M-22 0 L22 0 L18 -6 L-18 -6 Z" fill="#CFC4AE" />
      <path d="M-14 -6 L14 -6 L11 -11 L-11 -11 Z" fill="#E2D8C2" />
      <rect x={-1.6} y={-h} width={3.2} height={h - 10} fill="#DAD6CE" />
      <circle cx={0} cy={-h - 2} r={3} fill={COL.brass} />
      <g transform={`translate(2 ${-h + 2})`}>
        <clipPath id="vd-flag-clip">
          <path d={wave(2)}>
            <Anim attr="d" values={`${wave(2)};${wave(-2)};${wave(2)}`} dur="1.6s" />
          </path>
        </clipPath>
        <g clipPath="url(#vd-flag-clip)">
          <rect x={0} y={-4} width={W} height={H / 3 + 4} fill="#FF9933" />
          <rect x={0} y={H / 3} width={W} height={H / 3} fill="#FFFFFF" />
          <rect x={0} y={(2 * H) / 3} width={W} height={H / 3 + 4} fill="#138808" />
          <g transform={`translate(${W / 2} ${H / 2})`}>
            <circle r={H / 6 - 0.4} fill="none" stroke="#000080" strokeWidth={0.8} />
            {Array.from({ length: 24 }, (_, i) => (
              <path key={i} d={`M0 0 L0 ${-(H / 6 - 0.6)}`} stroke="#000080" strokeWidth={0.35} transform={`rotate(${i * 15})`} />
            ))}
            <circle r={0.9} fill="#000080" />
          </g>
          <rect x={0} y={-4} width={W} height={H + 8} fill="url(#vd-shade-x)" opacity={0.6} />
        </g>
        {/* rope */}
        <path d={`M-2 ${H} L-2 ${h - 16}`} stroke="#E8E2D2" strokeWidth={0.6} />
        {/* petals */}
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={i} cx={10 + (i % 3) * 12} cy={H} rx={1.6} ry={1} fill={['#FF9933', '#E0453A', '#FFD34E'][i % 3]} opacity={0}>
            <Translate values={`0 0; ${(i % 2 ? 1 : -1) * (6 + i)} ${60 + i * 6}`} dur="4.5s" begin={`${(i * 0.45).toFixed(2)}s`} />
            <Anim attr="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="4.5s" begin={`${(i * 0.45).toFixed(2)}s`} />
          </ellipse>
        ))}
      </g>
    </g>
  );
}

/* ── Architecture ─────────────────────────────────────────────────── */

/** Entrance arch of the Gurukula with its name board. */
export function Gate({ label = 'गुरुकुलम्' }: { label?: string }) {
  return (
    <g>
      <Shadow rx={70} o={0.25} />
      {[-58, 46].map((x) => (
        <g key={x}>
          <rect x={x} y={-104} width={12} height={104} fill={COL.lime} />
          <rect x={x} y={-104} width={12} height={104} fill="url(#vd-shade-x)" />
          <rect x={x - 2} y={-10} width={16} height={10} fill="#DCD0B4" />
          <rect x={x - 2} y={-108} width={16} height={6} fill="#DCD0B4" />
          <path d={`M${x} -20 h12 M${x} -90 h12`} stroke={COL.kavi} strokeWidth={2} />
        </g>
      ))}
      <path d="M-64 -108 Q0 -142 64 -108 L64 -100 Q0 -132 -64 -100 Z" fill={COL.lime} />
      <path d="M-64 -108 Q0 -142 64 -108" stroke={COL.kavi} strokeWidth={2.2} fill="none" />
      <rect x={-38} y={-128} width={76} height={18} rx={2} fill="#6E2E22" stroke={COL.brass} strokeWidth={1.4} />
      <text x={0} y={-114.5} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 11, fill: '#F7E3A6', fontWeight: 600 }}>
        {label}
      </text>
      {/* mango-leaf toraṇa */}
      <path d="M-46 -98 Q0 -84 46 -98" stroke="#5E8A3A" strokeWidth={1} fill="none" />
      {Array.from({ length: 11 }, (_, i) => {
        const x = -42 + i * 8.4;
        const y = -97 + Math.sin((i / 10) * Math.PI) * 11;
        return <path key={i} d={`M${x} ${y} q-2 5 0 9 q2 -4 0 -9 Z`} fill={i % 2 ? COL.leaf : COL.leafLight} />;
      })}
    </g>
  );
}

/** String of mango leaves (toraṇa) hung across a doorway. */
export function Torana({ w = 120 }: { w?: number }) {
  const n = Math.floor(w / 9);
  return (
    <g>
      <path d={`M${-w / 2} 0 Q0 12 ${w / 2} 0`} stroke="#5E8A3A" strokeWidth={1} fill="none" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        const x = -w / 2 + w * t;
        const y = Math.sin(t * Math.PI) * 6;
        return <path key={i} d={`M${x} ${y} q-2.4 6 0 11 q2.4 -5 0 -11 Z`} fill={i % 2 ? COL.leaf : COL.leafLight} />;
      })}
      {Array.from({ length: Math.floor(n / 4) }, (_, i) => {
        const t = (i * 4 + 2.5) / n;
        return <circle key={i} cx={-w / 2 + w * t} cy={Math.sin(t * Math.PI) * 6 + 3} r={2.2} fill="#F2A33A" />;
      })}
    </g>
  );
}

/** Stone-pillared maṇḍapa (pavilion) with a raised plinth. Floor at y = -12. */
export function Mandapa({ w = 240, h = 130, label, torana = false }: { w?: number; h?: number; label?: string; torana?: boolean }) {
  const cols = [-w / 2 + 10, -w / 6, w / 6, w / 2 - 22];
  return (
    <g>
      <Shadow rx={w * 0.55} o={0.2} />
      <path d={`M${-w / 2 - 8} 0 L${w / 2 + 8} 0 L${w / 2 + 4} -12 L${-w / 2 - 4} -12 Z`} fill="#CFC4AE" />
      <path d={`M${-w / 2 - 8} 0 L${w / 2 + 8} 0`} stroke="#A99E86" strokeWidth={1.5} />
      <rect x={-w / 2} y={-14} width={w} height={3} fill="#E4DAC5" />
      {cols.map((x) => (
        <g key={x}>
          <rect x={x} y={-h} width={12} height={h - 14} fill="#D9CFB8" />
          <rect x={x} y={-h} width={12} height={h - 14} fill="url(#vd-shade-x)" />
          <rect x={x - 2} y={-h - 4} width={16} height={6} fill="#C9BEA6" />
          <rect x={x - 2} y={-22} width={16} height={8} fill="#C9BEA6" />
          <path d={`M${x} ${-h * 0.55} h12 M${x} ${-h * 0.45} h12`} stroke="#B2A68E" strokeWidth={1} />
        </g>
      ))}
      <path d={`M${-w / 2 - 12} ${-h - 4} L${w / 2 + 12} ${-h - 4} L${w / 2} ${-h - 20} L${-w / 2} ${-h - 20} Z`} fill="#C2B69C" />
      <path d={`M${-w / 2 - 12} ${-h - 4} L${w / 2 + 12} ${-h - 4}`} stroke="#9C9078" strokeWidth={2} />
      <path d={`M${-w / 2} ${-h - 20} L${w / 2} ${-h - 20} L${w / 2 - 20} ${-h - 34} L${-w / 2 + 20} ${-h - 34} Z`} fill="#B3A68A" />
      {label && (
        <g>
          <rect x={-46} y={-h - 18} width={92} height={13} rx={2} fill="#6E2E22" stroke={COL.brass} strokeWidth={1} />
          <text x={0} y={-h - 8} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 9, fill: '#F7E3A6', fontWeight: 600 }}>
            {label}
          </text>
        </g>
      )}
      {torana && (
        <g transform={`translate(0 ${-h + 2})`}>
          <Torana w={w - 30} />
        </g>
      )}
    </g>
  );
}

/* ── Hand-held things (drawn in the hand's frame, pointing down the forearm) ── */

/** Coconut-rib broom, held near its top. */
export function Broom() {
  return (
    <g>
      <path d="M0 -4 L3 30" stroke="#C4A45E" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M1 -3 L3 8" stroke={COL.kavi} strokeWidth={3.4} />
      {[-10, -6, -2, 2, 6, 10].map((dx) => (
        <path key={dx} d={`M3 28 L${3 + dx} 44`} stroke="#B89A55" strokeWidth={0.9} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Plate of offerings: bananas, betel leaves and a coconut (phala-tāmbūla). */
export function OfferingPlate() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={13} ry={3.2} fill="url(#vd-brass)" />
      <path d="M-9 -2 Q-4 -9 3 -4" stroke="#E8C23A" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-7 -1 Q-2 -8 5 -3" stroke="#D9AE2A" strokeWidth={2.6} fill="none" strokeLinecap="round" />
      <ellipse cx={6} cy={-4} rx={4.5} ry={4} fill="#8A5A34" />
      <path d="M-12 -1 q4 -6 9 -2 q-5 3 -9 2 Z" fill={COL.leaf} />
      <circle cx={-2} cy={-3} r={1.2} fill={COL.kumkuma} />
    </g>
  );
}

/** Folded shawl (śāl), presented as an honour. */
export function Shawl({ color = '#8B1E2E' }: { color?: string }) {
  return (
    <g>
      <path d="M-12 -3 L12 -3 L14 3 L-14 3 Z" fill={color} />
      <path d="M-14 3 L14 3" stroke={COL.brass} strokeWidth={1.6} />
      <path d="M-12 -3 L12 -3" stroke={COL.brass} strokeWidth={0.8} />
      <path d="M-14 3 L-16 10 L-11 10 Z M14 3 L16 10 L11 10 Z" fill={color} />
    </g>
  );
}

/** Tin trunk — every new student arrives with one. */
export function Trunk() {
  return (
    <g>
      <Shadow rx={20} o={0.25} />
      <rect x={-18} y={-18} width={36} height={18} rx={1.5} fill="#3F6E8C" />
      <rect x={-18} y={-18} width={36} height={18} rx={1.5} fill="url(#vd-shade-x)" />
      <rect x={-18} y={-18} width={36} height={4} fill="#335A73" />
      <rect x={-2.5} y={-15} width={5} height={5} fill={COL.brass} />
      <path d="M-6 -18 Q0 -24 6 -18" stroke="#2A2A2A" strokeWidth={1.4} fill="none" />
      <path d="M-16 -9 h32" stroke="#E0C77A" strokeWidth={0.6} />
    </g>
  );
}

/** Palm-leaf manuscript bundle. */
export function PalmLeafBundle() {
  return (
    <g>
      <rect x={-14} y={-4} width={28} height={4} rx={1.5} fill="url(#vd-wood)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={-13} y={-6 - i * 1.6} width={26} height={1.8} rx={0.8} fill={i % 2 ? '#E2CC8E' : '#EAD8A0'} />
      ))}
      <rect x={-14} y={-12} width={28} height={3} rx={1.5} fill="url(#vd-wood)" />
      <path d="M-4 -12 v12 M4 -12 v12" stroke={COL.kumkuma} strokeWidth={0.8} />
    </g>
  );
}

export { Shadow };
