/**
 * Person — a proportioned, three-quarter-view figure for the storyboard.
 *
 * Anatomy is built from a few metrics per build (boy, youth, adult, elder),
 * so heads, torsos and limbs keep believable proportions (≈6 heads tall for
 * a boy, ≈7½ for an adult) instead of the big-headed "cartoon" look.
 *
 * Arms are posed with two-bone inverse kinematics: a pose is simply a list
 * of hand positions (in the figure's own coordinates), and the shoulder and
 * elbow angles are solved for each keyframe. Those angles are then animated
 * with SMIL rotations about the real joints, so a hand can be told to
 * "go to the mouth, then back to the leaf" and the arm follows naturally.
 *
 * Coordinates: origin at the ground under the figure, y negative upwards,
 * figure faces to the right (use <At flip> to face left).
 */

'use client';

import type { ReactNode } from 'react';
import { Anim, Rotate, RotateAbs, Translate, useMotion } from './anim';

/* ── Colour utilities ─────────────────────────────────────────────── */

function shadeHex(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
  const r = f((n >> 16) & 255);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export const SKIN = {
  fair: '#D8A77C',
  wheat: '#C98F60',
  tan: '#B87C4E',
  deep: '#9E6538',
} as const;
export type SkinTone = keyof typeof SKIN;

export const HAIR = { black: '#231812', grey: '#B9B4AC', salt: '#7E776F' } as const;

/* ── Builds ───────────────────────────────────────────────────────── */

export type Build = 'child' | 'boy' | 'youth' | 'adult' | 'elder' | 'woman';

const BUILDS: Record<Build, { hr: number; neck: number; torso: number; shW: number; hipW: number; leg: number; seat: number; ua: number; fa: number; armW: number; belly: number }> = {
  child: { hr: 8.2, neck: 3.6, torso: 27, shW: 11, hipW: 9.5, leg: 42, seat: 10, ua: 15, fa: 14, armW: 4.6, belly: 1 },
  boy: { hr: 8.6, neck: 4.4, torso: 33, shW: 13, hipW: 11, leg: 54, seat: 12, ua: 19, fa: 17, armW: 5.2, belly: 1 },
  youth: { hr: 9, neck: 5.4, torso: 40, shW: 16, hipW: 12.5, leg: 68, seat: 13, ua: 24, fa: 21, armW: 6, belly: 1 },
  adult: { hr: 9.5, neck: 5.8, torso: 45, shW: 18, hipW: 14, leg: 76, seat: 14, ua: 27, fa: 24, armW: 6.8, belly: 1.08 },
  woman: { hr: 9.1, neck: 5.6, torso: 42, shW: 14.5, hipW: 13.5, leg: 70, seat: 13, ua: 24, fa: 21, armW: 5.6, belly: 1 },
  elder: { hr: 9.5, neck: 5.4, torso: 44, shW: 17.5, hipW: 14.5, leg: 74, seat: 14, ua: 26, fa: 23, armW: 6.6, belly: 1.2 },
};

export type Posture = 'stand' | 'sit';

export interface Pt {
  x: number;
  y: number;
}

export function bodyMetrics(build: Build, posture: Posture) {
  const b = BUILDS[build];
  const hipY = posture === 'stand' ? -b.leg : -b.seat;
  const shY = hipY - b.torso;
  const hx = 0.2 * b.shW;
  const hy = shY - b.neck - b.hr * 0.95;
  return {
    ...b,
    posture,
    hipY,
    shY,
    hx,
    hy,
    nearSh: { x: -0.6 * b.shW, y: shY + 2.5 },
    farSh: { x: 0.5 * b.shW, y: shY + 1.5 },
    /** handy landmarks for authoring poses */
    chest: { x: 0.8 * b.shW, y: shY + b.torso * 0.36 },
    mouth: { x: hx + 0.85 * b.hr, y: hy + 0.55 * b.hr },
    brow: { x: hx + 0.75 * b.hr, y: hy - 0.45 * b.hr },
    nearKnee: { x: -2.1 * b.hipW, y: -8 },
    farKnee: { x: 2.2 * b.hipW, y: -8.5 },
    nearHang: { x: -0.5 * b.shW, y: shY + 2.5 + b.ua + b.fa - 1.2 },
    farHang: { x: 0.62 * b.shW, y: shY + 1.5 + b.ua + b.fa - 1.4 },
    /** palms joined in añjali / namaskāra */
    anjali: { x: 0.6 * b.shW, y: shY + b.torso * 0.42 },
    /** in front of and above the head (arghya, raised hands) */
    overhead: { x: hx + b.hr * 1.6, y: hy - b.hr * 1.9 },
    /** hands held forward at forehead height (arghya, offering) */
    offer: { x: hx + b.hr * 3.1, y: hy - b.hr * 0.3 },
  };
}
export type Metrics = ReturnType<typeof bodyMetrics>;

/* ── Two-bone IK ──────────────────────────────────────────────────── */

const DEG = 180 / Math.PI;

function solve(s: Pt, t: Pt, L1: number, L2: number, side: number) {
  const dx = t.x - s.x;
  const dy = t.y - s.y;
  const d = Math.min(L1 + L2 - 0.05, Math.max(Math.abs(L1 - L2) + 0.05, Math.hypot(dx, dy)));
  const phi = Math.atan2(dy, dx);
  const a = Math.acos((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d));
  const sa = phi + side * a;
  const ex = s.x + L1 * Math.cos(sa);
  const ey = s.y + L1 * Math.sin(sa);
  const cx = s.x + d * Math.cos(phi);
  const cy = s.y + d * Math.sin(phi);
  const fa = Math.atan2(cy - ey, cx - ex);
  return { sh: sa * DEG - 90, el: (fa - sa) * DEG };
}

/** Keep successive angles continuous so interpolation doesn't spin the long way round. */
function unwrap(list: number[]) {
  const out = [list[0]];
  for (let i = 1; i < list.length; i++) {
    let v = list[i];
    while (v - out[i - 1] > 180) v -= 360;
    while (v - out[i - 1] < -180) v += 360;
    out.push(v);
  }
  return out;
}

const fmt = (n: number) => Math.round(n * 100) / 100;

/* ── Limb primitives ──────────────────────────────────────────────── */

function limbPath(len: number, w0: number, w1: number) {
  const a = w0 / 2;
  const b = w1 / 2;
  return `M${-a} 0 L${-b} ${len} A${b} ${b} 0 0 0 ${b} ${len} L${a} 0 A${a} ${a} 0 0 0 ${-a} 0 Z`;
}

function Hand({ at, r, fill, line }: { at: number; r: number; fill: string; line: string }) {
  return (
    <g transform={`translate(0 ${at})`}>
      <ellipse cx={0} cy={r * 0.45} rx={r * 0.36} ry={r * 0.56} fill={fill} />
      <ellipse cx={r * 0.3} cy={r * 0.2} rx={r * 0.14} ry={r * 0.3} fill={fill} transform={`rotate(-25 ${r * 0.3} ${r * 0.2})`} />
      <path d={`M${-r * 0.12} ${r * 0.62} v${r * 0.3} M${r * 0.08} ${r * 0.66} v${r * 0.28}`} stroke={line} strokeWidth={0.35} opacity={0.6} />
    </g>
  );
}

export interface Hold {
  node: ReactNode;
  /** keep the held object upright regardless of the arm's angle */
  upright?: boolean;
}

interface ArmProps {
  m: Metrics;
  shoulder: Pt;
  targets: Pt[];
  side: number;
  skin: string;
  far?: boolean;
  dur: string;
  begin?: string;
  keyTimes?: string;
  hold?: Hold;
  sleeve?: string;
  sleeveLen?: number;
}

function Arm({ m, shoulder, targets, side, skin, far, dur, begin, keyTimes, hold, sleeve, sleeveLen = 0.55 }: ArmProps) {
  const motion = useMotion();
  const sols = targets.map((t) => solve(shoulder, t, m.ua, m.fa, side));
  const sh = unwrap(sols.map((s) => s.sh));
  const el = unwrap(sols.map((s) => s.el));
  const tot = unwrap(sols.map((_, i) => -(sh[i] + el[i])));
  const animated = motion && targets.length > 1;
  const fill = far ? shadeHex(skin, -0.14) : skin;
  const line = shadeHex(skin, -0.35);
  const w = m.armW * (far ? 0.92 : 1);
  const timing = { dur, begin, keyTimes };

  return (
    <g transform={`translate(${fmt(shoulder.x)} ${fmt(shoulder.y)})`}>
      <g transform={`rotate(${fmt(sh[0])})`}>
        {animated && <RotateAbs values={sh.map(fmt).join(';')} {...timing} />}
        <path d={limbPath(m.ua, w, w * 0.82)} fill={fill} />
        <path d={limbPath(m.ua, w, w * 0.82)} fill="url(#vd-shade-x)" />
        {sleeve && <path d={limbPath(m.ua * sleeveLen, w * 1.3, w * 1.12)} fill={far ? shadeHex(sleeve, -0.12) : sleeve} />}
        <g transform={`translate(0 ${m.ua})`}>
          <g transform={`rotate(${fmt(el[0])})`}>
            {animated && <RotateAbs values={el.map(fmt).join(';')} {...timing} />}
            <path d={limbPath(m.fa, w * 0.8, w * 0.6)} fill={fill} />
            <path d={limbPath(m.fa, w * 0.8, w * 0.6)} fill="url(#vd-shade-x)" />
            <Hand at={m.fa - 1} r={m.hr * 0.72} fill={fill} line={line} />
            {hold && (
              <g transform={`translate(0 ${m.fa + m.hr * 0.25})`}>
                {hold.upright ? (
                  <g transform={`rotate(${fmt(tot[0])})`}>
                    {animated && <RotateAbs values={tot.map(fmt).join(';')} {...timing} />}
                    {hold.node}
                  </g>
                ) : (
                  hold.node
                )}
              </g>
            )}
          </g>
        </g>
      </g>
    </g>
  );
}

/* ── Head ─────────────────────────────────────────────────────────── */

export type Eyes = 'open' | 'closed' | 'down' | 'up';
export type HairStyle = 'shaved' | 'short' | 'long';

interface HeadProps {
  m: Metrics;
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  eyes: Eyes;
  chant: boolean;
  smile: boolean;
  beard: boolean;
  vibhuti: boolean;
  begin: string;
}

function Head({ m, skin, hair, hairStyle, eyes, chant, smile, beard, vibhuti, begin }: HeadProps) {
  const r = m.hr;
  const x = m.hx;
  const y = m.hy;
  const line = shadeHex(skin, -0.42);
  const P = (dx: number, dy: number) => `${fmt(x + dx * r)} ${fmt(y + dy * r)}`;

  const face = `M${P(-0.62, 0.25)} Q${P(-0.25, 1.02)} ${P(0.42, 0.98)} Q${P(0.72, 0.92)} ${P(0.78, 0.7)} L${P(0.8, 0.57)} L${P(0.86, 0.47)} L${P(0.9, 0.34)} Q${P(1.1, 0.29)} ${P(1.03, 0.13)} L${P(0.9, -0.2)} Q${P(0.95, -0.36)} ${P(0.9, -0.47)} L${P(0.4, -0.2)} Z`;
  const hairPath = `M${P(0.58, -0.78)} A${r} ${r} 0 0 0 ${P(-0.98, 0.18)} Q${P(-0.78, 0.5)} ${P(-0.5, 0.4)} Q${P(-0.52, -0.12)} ${P(-0.12, -0.24)} Q${P(0.22, -0.52)} ${P(0.58, -0.78)} Z`;

  const eye = (cx: number, w: number) => {
    const cy = -0.07;
    const h = 0.14;
    const eyePath = `M${P(cx - w / 2, cy)} Q${P(cx, cy - h)} ${P(cx + w / 2, cy)} Q${P(cx, cy + h * 0.75)} ${P(cx - w / 2, cy)} Z`;
    if (eyes === 'closed') {
      return <path d={`M${P(cx - w / 2, cy)} Q${P(cx, cy + h * 0.7)} ${P(cx + w / 2, cy)}`} stroke={hair === HAIR.grey ? '#3A2A20' : hair} strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />;
    }
    const irisDy = eyes === 'down' ? 0.04 : eyes === 'up' ? -0.04 : 0;
    return (
      <g>
        <path d={eyePath} fill="#F4ECE2" />
        <circle cx={x + (cx + w * 0.12) * r} cy={y + (cy + irisDy) * r} r={r * 0.075} fill="#2B1B12" />
        <path
          d={`M${P(cx - w / 2, cy)} Q${P(cx, cy - h * (eyes === 'down' ? 0.35 : 1))} ${P(cx + w / 2, cy)}`}
          stroke="#2B1B12"
          strokeWidth={r * 0.065}
          fill={eyes === 'down' ? skin : 'none'}
          strokeLinecap="round"
        />
      </g>
    );
  };

  return (
    <g>
      {/* neck */}
      <path d={`M${P(-0.4, 0.45)} L${P(0.35, 0.8)} L${fmt(0.36 * m.shW)} ${fmt(m.shY + 1.5)} L${fmt(-0.28 * m.shW)} ${fmt(m.shY + 1.5)} Z`} fill={skin} />
      <path d={`M${P(-0.4, 0.45)} L${P(0.35, 0.8)} L${fmt(0.36 * m.shW)} ${fmt(m.shY + 1.5)} L${fmt(-0.28 * m.shW)} ${fmt(m.shY + 1.5)} Z`} fill="url(#vd-shade-y)" />
      {/* skull + face */}
      <circle cx={x} cy={y} r={r} fill={skin} />
      <path d={face} fill={skin} />
      <circle cx={x} cy={y} r={r} fill="url(#vd-head-light)" />
      {/* ear */}
      <ellipse cx={x - 0.3 * r} cy={y + 0.08 * r} rx={0.17 * r} ry={0.27 * r} fill={skin} />
      <path d={`M${P(-0.36, -0.08)} Q${P(-0.2, 0.05)} ${P(-0.3, 0.26)}`} stroke={line} strokeWidth={r * 0.05} fill="none" opacity={0.7} />
      {/* hair */}
      <path d={hairPath} fill={hair} opacity={hairStyle === 'shaved' ? 0.5 : 0.97} />
      {hairStyle === 'shaved' && (
        <g>
          {/* śikhā */}
          <ellipse cx={x - 0.5 * r} cy={y - 0.84 * r} rx={0.3 * r} ry={0.24 * r} fill={hair} />
          <path d={`M${P(-0.72, -0.8)} Q${P(-1.05, -0.45)} ${P(-0.95, 0.05)}`} stroke={hair} strokeWidth={r * 0.14} fill="none" strokeLinecap="round" />
        </g>
      )}
      {hairStyle === 'long' && (
        <g>
          <path d={`M${P(0.6, -0.8)} Q${P(0.2, -1.12)} ${P(-0.4, -0.98)}`} stroke={shadeHex(hair, 0.25)} strokeWidth={r * 0.06} fill="none" />
          <ellipse cx={x - 0.98 * r} cy={y + 0.28 * r} rx={0.42 * r} ry={0.36 * r} fill={hair} />
          {[-0.5, -0.1, 0.3, 0.7].map((d, i) => (
            <circle key={i} cx={x - 0.98 * r + Math.cos(d + 1.7) * 0.46 * r} cy={y + 0.28 * r + Math.sin(d + 1.7) * 0.4 * r} r={0.1 * r} fill="#FFFDF4" />
          ))}
        </g>
      )}
      {/* cheek warmth + nose shadow */}
      <ellipse cx={x + 0.48 * r} cy={y + 0.3 * r} rx={0.2 * r} ry={0.13 * r} fill="#B8433A" opacity={0.1} />
      <path d={`M${P(0.84, 0.3)} q${0.06 * r} ${0.06 * r} ${0.15 * r} 0`} stroke={line} strokeWidth={r * 0.05} fill="none" opacity={0.7} />
      <path d={`M${P(0.93, -0.18)} L${P(0.98, 0.1)}`} stroke={line} strokeWidth={r * 0.04} opacity={0.35} />
      {/* brows */}
      <path d={`M${P(0.12, -0.27)} Q${P(0.33, -0.39)} ${P(0.54, -0.29)}`} stroke={hair === HAIR.grey ? '#8E877E' : '#2B1B12'} strokeWidth={r * 0.1} fill="none" strokeLinecap="round" />
      <path d={`M${P(0.7, -0.31)} Q${P(0.8, -0.37)} ${P(0.88, -0.31)}`} stroke={hair === HAIR.grey ? '#8E877E' : '#2B1B12'} strokeWidth={r * 0.08} fill="none" strokeLinecap="round" />
      {eye(0.33, 0.3)}
      {eye(0.8, 0.14)}
      {/* forehead mark */}
      {vibhuti && (
        <g stroke="#F7F3EA" strokeWidth={r * 0.075} strokeLinecap="round" fill="none" opacity={0.95}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${P(0.02, -0.72 + i * 0.1)} Q${P(0.42, -0.8 + i * 0.1)} ${P(0.84, -0.62 + i * 0.1)}`} />
          ))}
        </g>
      )}
      <circle cx={x + 0.52 * r} cy={y - 0.6 * r} r={r * 0.08} fill="#A32A2A" />
      {/* beard + moustache */}
      {beard && (
        <g>
          <path
            d={`M${P(-0.32, 0.18)} Q${P(-0.38, 0.95)} ${P(0.18, 1.4)} Q${P(0.55, 1.8)} ${P(0.74, 1.46)} Q${P(0.94, 1.02)} ${P(0.84, 0.62)} Q${P(0.7, 0.66)} ${P(0.62, 0.74)} Q${P(0.3, 0.8)} ${P(0.14, 0.5)} Q${P(-0.06, 0.3)} ${P(-0.32, 0.18)} Z`}
            fill={hair}
          />
          <g stroke={shadeHex(hair, -0.18)} strokeWidth={r * 0.035} opacity={0.6} fill="none">
            <path d={`M${P(0.0, 0.7)} Q${P(0.2, 1.1)} ${P(0.4, 1.4)}`} />
            <path d={`M${P(0.3, 0.85)} Q${P(0.45, 1.1)} ${P(0.6, 1.45)}`} />
            <path d={`M${P(0.62, 0.8)} Q${P(0.72, 1.05)} ${P(0.72, 1.3)}`} />
          </g>
          <path d={`M${P(0.55, 0.46)} Q${P(0.74, 0.37)} ${P(0.92, 0.48)}`} stroke={hair} strokeWidth={r * 0.13} fill="none" strokeLinecap="round" />
        </g>
      )}
      {/* mouth */}
      {chant ? (
        <ellipse cx={x + 0.72 * r} cy={y + 0.53 * r} rx={0.1 * r} ry={0.06 * r} fill="#5A2219">
          <Anim attr="ry" values={`${0.03 * r};${0.1 * r};${0.05 * r};${0.09 * r};${0.03 * r}`} dur="0.9s" begin={begin} />
        </ellipse>
      ) : (
        <path
          d={smile ? `M${P(0.56, 0.5)} Q${P(0.7, 0.6)} ${P(0.84, 0.5)}` : `M${P(0.58, 0.53)} L${P(0.84, 0.51)}`}
          stroke="#7A3528"
          strokeWidth={r * 0.07}
          fill="none"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

/* ── Clothing ─────────────────────────────────────────────────────── */

function StandingDhoti({ m, dhoti, border }: { m: Metrics; dhoti: string; border: string }) {
  const h = m.hipW;
  const L = m.leg;
  const top = m.hipY - 3;
  const fold = shadeHex(dhoti, -0.2);
  const outline = `M${-0.95 * h} ${top} L${0.97 * h} ${top} Q${1.18 * h} ${-L * 0.5} ${1.05 * h} -2 L${-1.05 * h} -2 Q${-1.15 * h} ${-L * 0.5} ${-0.95 * h} ${top} Z`;
  return (
    <g>
      <path d={outline} fill={dhoti} />
      <path d={outline} fill="url(#vd-shade-x)" />
      {/* gap between the legs (kaccha) */}
      <path d={`M${0.05 * h} ${-L * 0.4} Q${0.12 * h} ${-L * 0.18} ${0.3 * h} -2 L${-0.14 * h} -2 Q${-0.04 * h} ${-L * 0.18} ${0.05 * h} ${-L * 0.4} Z`} fill={shadeHex(dhoti, -0.32)} />
      {/* folds */}
      <g stroke={fold} strokeWidth={0.8} fill="none" opacity={0.75}>
        <path d={`M${-0.5 * h} ${top + 5} Q${-0.7 * h} ${-L * 0.45} ${-0.72 * h} -6`} />
        <path d={`M${-0.15 * h} ${top + 8} Q${-0.3 * h} ${-L * 0.3} ${-0.35 * h} -4`} />
        <path d={`M${0.7 * h} ${top + 6} Q${0.9 * h} ${-L * 0.4} ${0.8 * h} -5`} />
      </g>
      {/* front pleats */}
      <path d={`M${0.15 * h} ${top + 1} L${0.55 * h} ${top + 1} L${0.72 * h} ${-L * 0.42} L${0.28 * h} ${-L * 0.4} Z`} fill={shadeHex(dhoti, 0.25)} />
      <g stroke={fold} strokeWidth={0.6} opacity={0.7}>
        <path d={`M${0.28 * h} ${top + 2} L${0.38 * h} ${-L * 0.41}`} />
        <path d={`M${0.42 * h} ${top + 2} L${0.55 * h} ${-L * 0.41}`} />
      </g>
      <path d={`M${0.28 * h} ${-L * 0.4} L${0.72 * h} ${-L * 0.42}`} stroke={border} strokeWidth={1.4} />
      {/* hem border */}
      <path d={`M${-1.05 * h} -4 L${-0.1 * h} -4 M${0.3 * h} -4 L${1.05 * h} -4`} stroke={border} strokeWidth={1.8} />
      {/* waist roll */}
      <path d={`M${-0.98 * h} ${top - 1.5} Q0 ${top - 3} ${0.98 * h} ${top - 1.5} L${0.98 * h} ${top + 2.5} Q0 ${top + 1.5} ${-0.98 * h} ${top + 2.5} Z`} fill={shadeHex(dhoti, -0.08)} />
    </g>
  );
}

function Saree({ m, color, border }: { m: Metrics; color: string; border: string }) {
  const h = m.hipW;
  const top = m.hipY - 2;
  const L = m.leg;
  const fold = shadeHex(color, -0.22);
  const outline = `M${-0.95 * h} ${top} L${0.97 * h} ${top} Q${1.25 * h} ${-L * 0.45} ${1.45 * h} -1 L${-1.3 * h} -1 Q${-1.15 * h} ${-L * 0.45} ${-0.95 * h} ${top} Z`;
  return (
    <g>
      <path d={outline} fill={color} />
      <path d={outline} fill="url(#vd-shade-x)" />
      {/* front pleats */}
      <path d={`M${0.05 * h} ${top + 2} L${0.6 * h} ${top + 2} L${1.0 * h} -1 L${-0.1 * h} -1 Z`} fill={shadeHex(color, 0.12)} />
      <g stroke={fold} strokeWidth={0.7} opacity={0.8}>
        {[0.2, 0.35, 0.5].map((f) => (
          <path key={f} d={`M${f * h} ${top + 3} L${(f * 1.6 - 0.05) * h} -2`} />
        ))}
        <path d={`M${-0.6 * h} ${top + 6} Q${-0.85 * h} ${-L * 0.4} ${-0.9 * h} -4`} fill="none" />
      </g>
      <path d={`M${-1.3 * h} -3 L${1.45 * h} -3`} stroke={border} strokeWidth={3.2} />
      <path d={`M${-1.3 * h} -5.2 L${1.43 * h} -5.2`} stroke={shadeHex(border, 0.3)} strokeWidth={0.6} />
    </g>
  );
}

function Blouse({ m, color }: { m: Metrics; color: string }) {
  const s = m.shW;
  const y2 = m.shY + m.torso * 0.5;
  const d = `M${-0.72 * s} ${m.shY + 3} Q${-0.8 * s} ${m.shY + m.torso * 0.3} ${-0.72 * s} ${y2} Q0 ${y2 + 2} ${0.78 * s} ${y2 - 1} Q${0.8 * s} ${m.shY + m.torso * 0.3} ${0.72 * s} ${m.shY + m.torso * 0.22} Q${0.68 * s} ${m.shY + 3} ${0.5 * s} ${m.shY + 1} L${0.22 * s} ${m.shY - 1} Q${0.05 * s} ${m.shY + 4} ${-0.12 * s} ${m.shY - 1} Q${-0.5 * s} ${m.shY - 0.5} ${-0.72 * s} ${m.shY + 3} Z`;
  return (
    <g>
      <path d={d} fill={color} />
      <path d={d} fill="url(#vd-shade-x)" />
    </g>
  );
}

function Shirt({ m, color }: { m: Metrics; color: string }) {
  const s = m.shW;
  const h = m.hipW;
  const d = `M${-0.74 * s} ${m.shY + 3} Q${-0.9 * s} ${m.shY + m.torso * 0.5} ${-0.92 * h} ${m.hipY + 5} L${0.92 * h * m.belly} ${m.hipY + 5} Q${1.08 * h * m.belly} ${m.hipY - m.torso * 0.3} ${0.76 * s} ${m.shY + m.torso * 0.24} Q${0.72 * s} ${m.shY + 3} ${0.52 * s} ${m.shY + 0.5} L${0.24 * s} ${m.shY - 2} L${-0.12 * s} ${m.shY - 1.5} Q${-0.5 * s} ${m.shY - 0.5} ${-0.74 * s} ${m.shY + 3} Z`;
  const line = shadeHex(color, -0.25);
  return (
    <g>
      <path d={d} fill={color} />
      <path d={d} fill="url(#vd-shade-x)" />
      <path d={`M${-0.12 * s} ${m.shY - 1.5} L${0.1 * s} ${m.shY + 4} L${0.24 * s} ${m.shY - 2}`} stroke={line} strokeWidth={0.9} fill={shadeHex(color, -0.1)} />
      <path d={`M${0.1 * s} ${m.shY + 4} L${0.16 * s} ${m.hipY + 5}`} stroke={line} strokeWidth={0.6} />
      {[0.25, 0.5, 0.75].map((f) => (
        <circle key={f} cx={0.1 * s + f * 0.06 * s} cy={m.shY + 4 + f * (m.hipY - m.shY)} r={0.6} fill={line} />
      ))}
      <path d={`M${0.35 * s} ${m.shY + m.torso * 0.25} h${0.25 * s} v${0.18 * s} h${-0.25 * s} Z`} fill="none" stroke={line} strokeWidth={0.5} />
    </g>
  );
}

function SeatedLegs({ m, dhoti, border, skin }: { m: Metrics; dhoti: string; border: string; skin: string }) {
  const h = m.hipW;
  const y0 = m.hipY;
  const dark = shadeHex(dhoti, -0.12);
  const fold = shadeHex(dhoti, -0.25);
  // thighs run from the hips out to the knees; shins cross in front
  const farThigh = `M${0.2 * h} ${y0 - 2} Q${1.6 * h} ${y0 - 3} ${2.45 * h} -7 Q${2.7 * h} -1.5 ${2.1 * h} -0.5 Q${1.1 * h} -2 ${0.1 * h} -3 Z`;
  const nearThigh = `M${0.3 * h} ${y0 - 2.5} Q${-1.4 * h} ${y0 - 3.5} ${-2.4 * h} -7.5 Q${-2.75 * h} -1.5 ${-2.1 * h} 0 Q${-1 * h} -1.5 ${0.2 * h} -2 Z`;
  const farShin = `M${2.2 * h} -1 Q${0.8 * h} -3.5 ${-0.8 * h} -3.2 L${-0.9 * h} 0.2 Q${0.8 * h} 0.6 ${2.2 * h} 0.4 Z`;
  const nearShin = `M${-2.2 * h} -1.5 Q${-0.4 * h} -8.5 ${1.2 * h} -6.5 L${1.25 * h} -1.2 Q${-0.4 * h} -2.2 ${-2.1 * h} 0.6 Z`;
  return (
    <g>
      <path d={farThigh} fill={dark} />
      <path d={farShin} fill={dark} />
      <ellipse cx={-1.05 * h} cy={-1.3} rx={0.36 * h} ry={0.17 * h} fill={shadeHex(skin, -0.15)} />
      <path d={nearThigh} fill={dhoti} />
      <path d={nearThigh} fill="url(#vd-shade-y)" />
      <path d={nearShin} fill={dhoti} />
      <path d={nearShin} fill="url(#vd-shade-x)" />
      {/* folds */}
      <g stroke={fold} strokeWidth={0.75} fill="none" opacity={0.75}>
        <path d={`M${-0.3 * h} ${y0 - 1} Q${-1.3 * h} ${y0 + 1} ${-2.1 * h} -6`} />
        <path d={`M${0.5 * h} ${y0 - 1} Q${1.5 * h} ${y0} ${2.2 * h} -5`} />
        <path d={`M${-1.6 * h} -2 Q${-0.4 * h} -6 ${0.9 * h} -5.5`} />
      </g>
      {/* hem borders at the ankles */}
      <path d={`M${1.15 * h} -6.4 L${1.2 * h} -1.3`} stroke={border} strokeWidth={1.6} />
      <path d={`M${-0.78 * h} -3.1 L${-0.85 * h} 0.1`} stroke={border} strokeWidth={1.4} />
      {/* near foot resting on the far knee side, sole towards us */}
      <path d={`M${1.2 * h} -6.2 Q${1.9 * h} -7.6 ${2.1 * h} -4.6 Q${1.9 * h} -2 ${1.2 * h} -1.6 Z`} fill={skin} />
      <path d={`M${1.3 * h} -5 Q${1.7 * h} -4.4 ${1.9 * h} -4.8`} stroke={shadeHex(skin, -0.3)} strokeWidth={0.5} fill="none" />
      {/* pleats falling over the lap */}
      <path d={`M${0.05 * h} ${y0 - 2} L${0.55 * h} ${y0 - 2} L${0.75 * h} ${y0 + 6} L${0.15 * h} ${y0 + 6.5} Z`} fill={shadeHex(dhoti, 0.2)} />
      <path d={`M${0.15 * h} ${y0 + 6.5} L${0.75 * h} ${y0 + 6}`} stroke={border} strokeWidth={1.1} />
    </g>
  );
}

function Upper({ m, wrap, cloth, border }: { m: Metrics; wrap: Wrap; cloth: string; border: string }) {
  const fold = shadeHex(cloth, -0.2);
  if (wrap === 'waist') {
    const top = m.hipY - 8;
    const h = m.hipW;
    return (
      <g>
        <path d={`M${-1.0 * h} ${top} Q0 ${top - 2} ${1.02 * h} ${top} L${1.04 * h} ${top + 7} Q0 ${top + 9} ${-1.02 * h} ${top + 7} Z`} fill={cloth} />
        <path d={`M${-1.02 * h} ${top + 7} Q0 ${top + 9} ${1.04 * h} ${top + 7}`} stroke={border} strokeWidth={1.3} fill="none" />
        <path d={`M${-0.3 * h} ${top + 1} Q${0.2 * h} ${top + 4} ${0.8 * h} ${top + 1.5}`} stroke={fold} strokeWidth={0.7} fill="none" />
        {/* knot and hanging ends */}
        <circle cx={-0.85 * h} cy={top + 4} r={2.4} fill={shadeHex(cloth, -0.08)} />
        {m.posture === 'stand' && (
          <g>
            <path d={`M${-0.9 * h} ${top + 5} L${-1.15 * h} ${top + 20} L${-0.72 * h} ${top + 19} Z`} fill={cloth} />
            <path d={`M${-1.15 * h} ${top + 20} L${-0.72 * h} ${top + 19}`} stroke={border} strokeWidth={1.2} />
          </g>
        )}
      </g>
    );
  }
  if (wrap === 'sash') {
    const a = { x: 0.52 * m.shW, y: m.shY - 0.5 };
    const b = { x: -0.95 * m.hipW, y: m.hipY - 1 };
    const ctl = { x: 0.02 * m.shW, y: m.shY + m.torso * 0.62 };
    const wd = m.shW * 0.34;
    return (
      <g>
        <path
          d={`M${a.x - wd * 0.3} ${a.y - 1} Q${ctl.x - wd * 0.5} ${ctl.y - wd * 0.7} ${b.x - 1} ${b.y - wd} L${b.x + 2} ${b.y + 1} Q${ctl.x + wd * 0.5} ${ctl.y + wd * 0.5} ${a.x + wd * 0.7} ${a.y + 2} Z`}
          fill={cloth}
        />
        <path d={`M${b.x + 2} ${b.y + 1} Q${ctl.x + wd * 0.5} ${ctl.y + wd * 0.5} ${a.x + wd * 0.7} ${a.y + 2}`} stroke={border} strokeWidth={1.3} fill="none" />
        <path d={`M${a.x} ${a.y + 1} Q${ctl.x} ${ctl.y} ${b.x} ${b.y - wd * 0.4}`} stroke={fold} strokeWidth={0.7} fill="none" />
      </g>
    );
  }
  if (wrap === 'pallu') {
    const a = { x: 0.5 * m.shW, y: m.shY - 1 };
    const b = { x: -0.95 * m.hipW, y: m.hipY + 2 };
    const wd = m.shW * 0.75;
    return (
      <g>
        {/* the end falling behind the far shoulder */}
        <path d={`M${a.x - 1} ${a.y} L${a.x + wd * 0.5} ${a.y + 2} L${a.x + wd * 0.6} ${m.hipY + 6} L${a.x + wd * 0.15} ${m.hipY + 8} Z`} fill={shadeHex(cloth, -0.18)} />
        <path
          d={`M${a.x - wd * 0.35} ${a.y - 0.5} Q${-0.1 * m.shW} ${m.shY + m.torso * 0.35} ${b.x - 1} ${b.y - wd * 0.9} L${b.x + wd * 0.4} ${b.y + 1} Q${0.35 * m.shW} ${m.shY + m.torso * 0.62} ${a.x + wd * 0.42} ${a.y + 3} Z`}
          fill={cloth}
        />
        <path d={`M${b.x + wd * 0.4} ${b.y + 1} Q${0.35 * m.shW} ${m.shY + m.torso * 0.62} ${a.x + wd * 0.42} ${a.y + 3}`} stroke={border} strokeWidth={2.6} fill="none" />
        <g stroke={fold} strokeWidth={0.7} fill="none" opacity={0.8}>
          <path d={`M${a.x - wd * 0.1} ${a.y + 1} Q${0.05 * m.shW} ${m.shY + m.torso * 0.5} ${b.x + wd * 0.05} ${b.y - wd * 0.5}`} />
          <path d={`M${a.x + wd * 0.15} ${a.y + 2} Q${0.2 * m.shW} ${m.shY + m.torso * 0.58} ${b.x + wd * 0.25} ${b.y - wd * 0.2}`} />
        </g>
      </g>
    );
  }
  if (wrap === 'shoulders') {
    const s = m.shW;
    return (
      <g>
        {/* over the near shoulder and down the front */}
        <path d={`M${-0.95 * s} ${m.shY + 1} Q${-0.5 * s} ${m.shY - 3} ${-0.05 * s} ${m.shY - 1} L${0.02 * s} ${m.hipY + 2} L${-0.55 * s} ${m.hipY + 4} Q${-0.8 * s} ${m.shY + m.torso * 0.5} ${-0.95 * s} ${m.shY + 1} Z`} fill={cloth} />
        <path d={`M${0.02 * s} ${m.hipY + 2} L${-0.55 * s} ${m.hipY + 4}`} stroke={border} strokeWidth={1.4} />
        <path d={`M${-0.4 * s} ${m.shY + 3} L${-0.3 * s} ${m.hipY + 2}`} stroke={fold} strokeWidth={0.7} />
        {/* the other end over the far shoulder */}
        <path d={`M${0.3 * s} ${m.shY - 1.5} Q${0.55 * s} ${m.shY - 2} ${0.72 * s} ${m.shY + 2} L${0.78 * s} ${m.shY + m.torso * 0.62} L${0.46 * s} ${m.shY + m.torso * 0.64} Z`} fill={shadeHex(cloth, -0.06)} />
        <path d={`M${0.78 * s} ${m.shY + m.torso * 0.62} L${0.46 * s} ${m.shY + m.torso * 0.64}`} stroke={border} strokeWidth={1.4} />
      </g>
    );
  }
  return null;
}

/* ── Person ───────────────────────────────────────────────────────── */

export type Wrap = 'waist' | 'sash' | 'shoulders' | 'pallu' | 'none';
export type Attire = 'dhoti' | 'shirt' | 'saree';

export interface PersonProps {
  build?: Build;
  posture?: Posture;
  skin?: string;
  hair?: string;
  hairStyle?: HairStyle;
  dhoti?: string;
  cloth?: string;
  border?: string;
  wrap?: Wrap;
  attire?: Attire;
  /** shirt / blouse colour */
  top?: string;
  /** hand positions per keyframe, in the figure's coordinates (see bodyMetrics) */
  near?: Pt[] | ((m: Metrics) => Pt[]);
  far?: Pt[] | ((m: Metrics) => Pt[]);
  dur?: string;
  keyTimes?: string;
  begin?: string;
  nearHold?: Hold;
  farHold?: Hold;
  /** draw the far arm in front of the torso (e.g. reaching across) */
  farInFront?: boolean;
  eyes?: Eyes;
  chant?: boolean;
  smile?: boolean;
  beard?: boolean;
  vibhuti?: boolean;
  thread?: boolean;
  sway?: boolean;
  bob?: boolean;
  nod?: boolean;
  /** rudrākṣa mālā around the neck */
  mala?: boolean;
  /** extra artwork drawn over the torso */
  children?: ReactNode;
}

export function Person({
  build = 'boy',
  posture = 'stand',
  skin = SKIN.wheat,
  hair = HAIR.black,
  hairStyle = 'shaved',
  dhoti = '#F6F1E3',
  cloth = '#F3EEDF',
  border = '#B8860B',
  wrap = 'waist',
  attire = 'dhoti',
  top = '#DCE6EE',
  near,
  far,
  dur = '3s',
  keyTimes,
  begin = '0s',
  nearHold,
  farHold,
  farInFront = false,
  eyes = 'open',
  chant = false,
  smile = false,
  beard = false,
  vibhuti = true,
  thread = true,
  sway = false,
  bob = false,
  nod = false,
  mala = false,
  children,
}: PersonProps) {
  const m = bodyMetrics(build, posture);
  const resolve = (v: PersonProps['near'], fallback: Pt[]) => (typeof v === 'function' ? v(m) : v ?? fallback);
  const nearT = resolve(near, posture === 'sit' ? [m.nearKnee] : [m.nearHang]);
  const farT = resolve(far, posture === 'sit' ? [m.farKnee] : [m.farHang]);
  const common = { m, skin, dur, begin, keyTimes };

  const sleeve = attire === 'shirt' ? top : attire === 'saree' ? top : undefined;
  const sleeveLen = attire === 'shirt' ? 1 : 0.45;
  const farArm = <Arm {...common} shoulder={m.farSh} targets={farT} side={1} far hold={farHold} sleeve={sleeve} sleeveLen={sleeveLen} />;
  const torsoPath = `M${-0.72 * m.shW} ${m.shY + 3} Q${-0.86 * m.shW} ${m.shY + m.torso * 0.45} ${-0.85 * m.hipW} ${m.hipY} L${0.82 * m.hipW} ${m.hipY} Q${1.04 * m.hipW * m.belly} ${m.hipY - m.torso * 0.2} ${0.9 * m.hipW * m.belly} ${m.hipY - m.torso * 0.38} Q${0.8 * m.shW} ${m.shY + m.torso * 0.45} ${0.72 * m.shW} ${m.shY + m.torso * 0.26} Q${0.7 * m.shW} ${m.shY + 4} ${0.52 * m.shW} ${m.shY + 1} Q${0.3 * m.shW} ${m.shY - 1} ${0.22 * m.shW} ${m.shY - 1.5} L${-0.1 * m.shW} ${m.shY - 1} Q${-0.5 * m.shW} ${m.shY - 0.5} ${-0.72 * m.shW} ${m.shY + 3} Z`;
  const shadeLine = shadeHex(skin, -0.3);
  const lightLine = shadeHex(skin, 0.25);

  return (
    <g>
      {bob && <Translate values="0 0; 0 -1.2; 0 0" dur="2.8s" begin={begin} />}
      {sway && <Rotate values={`0 0 ${m.hipY}; 1 0 ${m.hipY}; 0 0 ${m.hipY}; -1 0 ${m.hipY}; 0 0 ${m.hipY}`} dur="4.4s" begin={begin} />}

      {/* feet (standing) */}
      {posture === 'stand' && (
        <g>
          <path d={`M${0.3 * m.hipW} -3 Q${0.25 * m.hipW} -0.5 ${0.5 * m.hipW} -0.3 L${1.05 * m.hipW} -0.3 Q${1.15 * m.hipW} -1.8 ${0.8 * m.hipW} -3.2 Z`} fill={shadeHex(skin, -0.14)} />
          <path d={`M${-0.75 * m.hipW} -3 Q${-0.8 * m.hipW} 0.4 ${-0.5 * m.hipW} 0.6 L${0.15 * m.hipW} 0.6 Q${0.28 * m.hipW} -1.2 ${-0.1 * m.hipW} -3.4 Z`} fill={skin} />
        </g>
      )}

      {posture === 'sit' ? <SeatedLegs m={m} dhoti={dhoti} border={border} skin={skin} /> : null}
      {!farInFront && farArm}
      {posture === 'stand' ? attire === 'saree' ? <Saree m={m} color={dhoti} border={border} /> : <StandingDhoti m={m} dhoti={dhoti} border={border} /> : null}

      {/* torso */}
      <path d={torsoPath} fill={skin} />
      <path d={torsoPath} fill="url(#vd-shade-x)" />
      <g fill="none" strokeLinecap="round">
        <path d={`M${-0.45 * m.shW} ${m.shY + 3.5} Q${-0.05 * m.shW} ${m.shY + 5.5} ${0.22 * m.shW} ${m.shY + 3}`} stroke={lightLine} strokeWidth={0.8} opacity={0.6} />
        <path d={`M${-0.3 * m.shW} ${m.shY + m.torso * 0.34} Q${0.15 * m.shW} ${m.shY + m.torso * 0.44} ${0.66 * m.shW} ${m.shY + m.torso * 0.3}`} stroke={shadeLine} strokeWidth={0.8} opacity={0.35} />
        <path d={`M${0.34 * m.shW} ${m.shY + m.torso * 0.42} Q${0.4 * m.shW} ${m.shY + m.torso * 0.7} ${0.36 * m.shW} ${m.hipY - 4}`} stroke={shadeLine} strokeWidth={0.7} opacity={0.2} />
      </g>
      <ellipse cx={0.38 * m.hipW * m.belly} cy={m.hipY - m.torso * 0.18} rx={0.7} ry={1.2} fill={shadeLine} opacity={0.5} />

      {attire === 'saree' && <Blouse m={m} color={top} />}
      {attire === 'shirt' && <Shirt m={m} color={top} />}
      {/* yajñopavīta over the left shoulder */}
      {thread && attire === 'dhoti' && (
        <g fill="none" strokeLinecap="round">
          <path d={`M${0.46 * m.shW} ${m.shY} Q${-0.02 * m.shW} ${m.shY + m.torso * 0.62} ${-0.8 * m.hipW} ${m.hipY - 1}`} stroke="#FBF6E6" strokeWidth={1.05} />
          <path d={`M${0.5 * m.shW} ${m.shY + 0.8} Q${0.02 * m.shW} ${m.shY + m.torso * 0.66} ${-0.74 * m.hipW} ${m.hipY}`} stroke="#EFE6CC" strokeWidth={0.6} />
        </g>
      )}

      <Upper m={m} wrap={wrap} cloth={cloth} border={border} />
      {mala && (
        <path
          d={`M${-0.28 * m.shW} ${m.shY - 0.5} Q${0.05 * m.shW} ${m.shY + m.torso * 0.5} ${0.5 * m.shW} ${m.shY + m.torso * 0.12} Q${0.45 * m.shW} ${m.shY} ${0.3 * m.shW} ${m.shY - 1}`}
          stroke="#6B3A1E"
          strokeWidth={2.2}
          strokeDasharray="1.7 1.1"
          fill="none"
        />
      )}
      {children}

      {/* head (with an optional slow nod) */}
      <g>
        {nod && <Rotate values={`0 ${m.hx} ${m.shY}; 4 ${m.hx} ${m.shY}; 0 ${m.hx} ${m.shY}`} dur="2.2s" begin={begin} />}
        <Head m={m} skin={skin} hair={hair} hairStyle={hairStyle} eyes={eyes} chant={chant} smile={smile} beard={beard} vibhuti={vibhuti} begin={begin} />
      </g>

      {farInFront && farArm}
      <Arm {...common} shoulder={m.nearSh} targets={nearT} side={1} hold={nearHold} sleeve={sleeve} sleeveLen={sleeveLen} />
    </g>
  );
}

/** Shorthand for a figure that just needs a hand to cycle between points. */
export const pts = (...p: [number, number][]) => p.map(([x, y]) => ({ x, y }));
