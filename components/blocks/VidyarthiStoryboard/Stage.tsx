/**
 * Stage — the illustrated SVG shared by both storyboards.
 *
 * Layers (back → front):
 *   sky → clouds → sun → far & near hills → coconut grove → ground
 *   → āśrama hut, tree with its stone kaṭṭe, palms
 *   → scene vignettes (cross-faded) → night overlay
 *   → stars, moon, and "lights" (lamp glow, fire, lit windows, fireflies)
 *
 * Sky colour, sun position and darkness transition smoothly between scenes,
 * so time visibly passes.
 */

'use client';

import type { ReactNode, Ref } from 'react';
import type { StoryScene } from '@/data/vidyarthi-storyboard';
import { Anim, MotionContext, Translate } from './anim';
import { ArtDefs } from './defs';
import { COL } from './props';

export const W = 800;
export const H = 450;
export const HORIZON = 318;

export interface Vignette {
  body: ReactNode;
  /** Drawn above the night overlay (lamp glow, fire, fireflies) */
  lights?: ReactNode;
  /** Hide the hut on the left (for scenes that bring their own architecture) */
  hideHut?: boolean;
  /** Drawn unscaled above the vignette (e.g. the mantra banner) */
  overlay?: ReactNode;
  /** Light the hut's windows (night scenes) */
  windows?: boolean;
  /** Camera zoom applied to the vignette around the lower centre (default 1.32) */
  zoom?: number;
}

const ANCHOR = { x: 476, y: 452 };
const DEFAULT_ZOOM = 1.32;
const zoomT = (z: number) => `translate(${ANCHOR.x} ${ANCHOR.y}) scale(${z}) translate(${-ANCHOR.x} ${-ANCHOR.y})`;

/* ── Landscape ───────────────────────────────────────────────────── */

function Hut() {
  return (
    <g>
      {/* thinnai (raised verandah) */}
      <path d="M18 344 L242 344 L236 330 L24 330 Z" fill="#C9AF84" />
      <path d="M18 344 L242 344" stroke="#9C8660" strokeWidth={1.5} />
      <rect x={24} y={330} width={212} height={3} fill={COL.kavi} opacity={0.8} />
      {/* walls */}
      <rect x={40} y={262} width={180} height={68} fill="#D6A76C" />
      <rect x={40} y={262} width={180} height={68} fill="url(#vd-shade-x)" />
      <rect x={40} y={316} width={180} height={14} fill={COL.kavi} />
      <rect x={40} y={262} width={180} height={10} fill="#1B0F08" opacity={0.18} />
      {/* door with carved frame */}
      <rect x={108} y={280} width={42} height={50} fill="#6E4526" />
      <rect x={113} y={284} width={32} height={46} fill="#3A2418" />
      <path d="M113 284 h32" stroke={COL.brass} strokeWidth={2} />
      <path d="M116 280 Q129 272 142 280" stroke="#6E4526" strokeWidth={3} fill="none" />
      {/* windows */}
      {[58, 172].map((x) => (
        <g key={x}>
          <rect x={x - 3} y={283} width={36} height={27} fill="#6E4526" />
          <rect x={x} y={286} width={30} height={21} fill="#2E1C12" />
          {[x + 6, x + 12, x + 18, x + 24].map((bx) => (
            <path key={bx} d={`M${bx} 286 v21`} stroke="#8A6040" strokeWidth={1.6} />
          ))}
        </g>
      ))}
      {/* pillars */}
      {[26, 88, 170, 230].map((x) => (
        <g key={x}>
          <rect x={x} y={270} width={5} height={60} fill="url(#vd-wood)" />
          <rect x={x - 1.5} y={326} width={8} height={4} fill="#5E3A1F" />
        </g>
      ))}
      {/* thatched roof, layered */}
      <path d="M8 276 L130 206 L252 276 L246 282 L14 282 Z" fill="#A67C3C" />
      <path d="M8 276 L130 206 L252 276 L246 282 L14 282 Z" fill="url(#vd-shade-y)" />
      {Array.from({ length: 16 }, (_, i) => (
        <path key={i} d={`M${16 + i * 15} 280 L${130 + (i - 7.5) * 5} 216`} stroke="#8E6A30" strokeWidth={0.9} opacity={0.55} />
      ))}
      <path d="M8 276 Q20 284 32 277 Q44 285 56 277 Q68 285 80 277 Q92 285 104 277 Q116 285 128 277 Q140 285 152 277 Q164 285 176 277 Q188 285 200 277 Q212 285 224 277 Q236 285 252 276" stroke="#7E5C28" strokeWidth={2} fill="none" />
      <path d="M130 206 L128 200 L132 200 Z" fill="#7E5C28" />
      {/* kolam at the doorstep */}
      <g transform="translate(129 356)" fill="none" stroke="#FBF8F0" strokeWidth={0.9} opacity={0.95}>
        <ellipse rx={24} ry={5.5} />
        <ellipse rx={14} ry={3.2} />
        <path d="M-24 0 Q-12 -6 0 0 Q12 6 24 0 M-24 0 Q-12 6 0 0 Q12 -6 24 0" />
        {[-18, -9, 0, 9, 18].map((x) => (
          <circle key={x} cx={x} cy={0} r={0.9} fill="#FBF8F0" />
        ))}
      </g>
    </g>
  );
}

function BigTree() {
  const dark = '#3F6B34';
  const mid = '#4F7F3E';
  const light = '#6A9A4C';
  return (
    <g>
      {/* trunk and roots */}
      <path d="M646 330 Q652 286 640 246 Q636 232 626 222 L640 220 Q650 232 654 244 Q660 228 676 220 L684 226 Q668 238 666 256 Q662 292 676 330 Z" fill="#6A4A30" />
      <path d="M646 330 Q652 286 640 246 L654 244 Q660 290 660 330 Z" fill="#1B0F08" opacity={0.18} />
      <path d="M636 220 Q612 212 596 196 M680 222 Q700 212 716 200 M654 236 Q652 214 656 196" stroke="#6A4A30" strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* canopy volumes */}
      {[
        [598, 208, 34, dark],
        [716, 206, 34, dark],
        [650, 176, 46, mid],
        [606, 184, 30, mid],
        [700, 180, 34, mid],
        [632, 222, 26, mid],
        [684, 226, 28, mid],
        [640, 160, 24, light],
        [684, 164, 20, light],
        [610, 176, 16, light],
        [720, 190, 14, light],
      ].map(([x, y, r, c], i) => (
        <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={c as string} />
      ))}
      {Array.from({ length: 26 }, (_, i) => {
        const a = i * 2.4;
        const rr = 10 + (i % 6) * 9;
        return <circle key={i} cx={656 + Math.cos(a) * rr * 1.3} cy={194 + Math.sin(a) * rr * 0.6} r={4 + (i % 3)} fill={i % 2 ? light : dark} opacity={0.6} />;
      })}
      {/* stone kaṭṭe around the trunk */}
      <path d="M600 334 L712 334 L706 318 L606 318 Z" fill="#BDB29C" />
      <path d="M606 318 L706 318 L702 314 L610 314 Z" fill="#D2C8B2" />
      <path d="M600 334 L712 334" stroke="#958A74" strokeWidth={1.5} />
      <path d="M622 318 v16 M646 318 v16 M670 318 v16 M694 318 v16" stroke="#A89C84" strokeWidth={0.8} />
    </g>
  );
}

function Palm({ x, h = 120, lean = 8 }: { x: number; h?: number; lean?: number }) {
  const top = HORIZON - h;
  const tx = x + lean * 1.5;
  return (
    <g>
      <path d={`M${x - 2.5} ${HORIZON + 4} Q${x + lean} ${HORIZON - h / 2} ${tx - 1.5} ${top} L${tx + 1.5} ${top} Q${x + lean + 3} ${HORIZON - h / 2} ${x + 2.5} ${HORIZON + 4} Z`} fill="#7A5A3A" />
      {Array.from({ length: Math.floor(h / 9) }, (_, i) => {
        const t = i / (h / 9);
        const px = x + (tx - x) * t + lean * Math.sin(t * Math.PI) * 0.3;
        const py = HORIZON - h * t;
        return <path key={i} d={`M${px - 2.5} ${py} h5`} stroke="#5E4428" strokeWidth={0.8} />;
      })}
      <g transform={`translate(${tx} ${top})`} fill="none" strokeLinecap="round">
        {[
          'M0 0 Q-22 -8 -38 8',
          'M0 0 Q20 -10 38 6',
          'M0 0 Q-8 -20 -26 -22',
          'M0 0 Q10 -20 26 -20',
          'M0 0 Q-16 4 -26 22',
          'M0 0 Q16 4 26 22',
          'M0 0 Q2 -14 4 -26',
        ].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#3F6E30" strokeWidth={3.6} />
            <path d={d} stroke="#5E9442" strokeWidth={1.2} strokeDasharray="1 2.4" />
          </g>
        ))}
        <circle cx={-2} cy={3} r={2.4} fill="#6B5A2A" />
        <circle cx={2} cy={4} r={2.4} fill="#7A6A30" />
        <Anim attr="opacity" values="1;1" dur="1s" />
      </g>
    </g>
  );
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF">
      <ellipse cx={0} cy={0} rx={34} ry={10} opacity={0.75} />
      <ellipse cx={-12} cy={-7} rx={16} ry={11} opacity={0.8} />
      <ellipse cx={10} cy={-9} rx={18} ry={13} opacity={0.85} />
    </g>
  );
}

/* ── Stage ───────────────────────────────────────────────────────── */

const STARS = [
  [40, 40], [96, 90], [150, 30], [210, 70], [270, 24], [330, 96], [380, 50], [440, 20],
  [500, 80], [560, 36], [610, 110], [700, 30], [760, 90], [120, 150], [240, 140], [470, 140],
  [720, 150], [60, 200], [340, 180], [590, 120], [180, 110], [420, 110], [520, 170], [290, 200],
];

function sunPosition(t: number) {
  if (t < 0 || t > 1) return { x: t < 0 ? 70 : 730, y: HORIZON + 60 };
  return { x: 70 + t * 660, y: HORIZON - 10 - Math.sin(Math.PI * t) * 250 };
}

interface StageProps {
  scenes: StoryScene[];
  vignettes: Record<string, Vignette>;
  index: number;
  motion: boolean;
  svgRef?: Ref<SVGSVGElement>;
}

export function Stage({ scenes, vignettes, index, motion, svgRef }: StageProps) {
  const scene = scenes[index];
  const sun = sunPosition(scene.sun);
  const t = motion ? '1.6s cubic-bezier(.45,.05,.3,1)' : '0s';
  const fade = motion ? 'opacity 0.9s ease' : undefined;
  const hideHut = vignettes[scene.id]?.hideHut ?? false;
  const day = scene.night < 0.25;

  return (
    <MotionContext.Provider value={motion}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="block h-full w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
        <ArtDefs />
        <defs>
          <linearGradient id="vd-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: scene.sky[0], transition: `stop-color ${t}` }} />
            <stop offset="1" style={{ stopColor: scene.sky[1], transition: `stop-color ${t}` }} />
          </linearGradient>
          <linearGradient id="vd-haze-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: scene.sky[1], stopOpacity: 0, transition: `stop-color ${t}` }} />
            <stop offset="1" style={{ stopColor: scene.sky[1], stopOpacity: 0.55, transition: `stop-color ${t}` }} />
          </linearGradient>
          <linearGradient id="vd-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7E9A54" />
            <stop offset="1" stopColor="#6A8646" />
          </linearGradient>
          <radialGradient id="vd-yard" cx="0.5" cy="0.35" r="0.65">
            <stop offset="0" stopColor="#E6D3A8" />
            <stop offset="1" stopColor="#CDB483" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="url(#vd-sky)" />

        {/* clouds */}
        <g style={{ opacity: day ? 0.9 : 0, transition: `opacity ${t}` }}>
          <g>
            <Translate values="0 0; 60 0; 0 0" dur="60s" />
            <Cloud x={180} y={80} s={1.1} />
            <Cloud x={470} y={60} s={0.8} />
            <Cloud x={620} y={110} s={0.7} />
          </g>
        </g>

        {/* sun */}
        <g style={{ transform: `translate(${sun.x}px, ${sun.y}px)`, transition: `transform ${t}` }}>
          <circle r={64} fill="url(#vd-sun)" opacity={0.6} />
          <circle r={21} fill="#FFE08A" />
        </g>

        {/* hills with atmospheric haze */}
        <path d="M0 238 Q90 186 200 214 Q300 178 420 210 Q540 170 660 204 Q740 188 800 212 L800 330 L0 330 Z" fill="#8FA6A4" />
        <path d="M0 238 Q90 186 200 214 Q300 178 420 210 Q540 170 660 204 Q740 188 800 212 L800 330 L0 330 Z" fill="url(#vd-haze-grad)" />
        <path d="M0 284 Q150 246 300 278 T620 266 T800 276 L800 330 L0 330 Z" fill="#6D8E66" />
        <path d="M0 284 Q150 246 300 278 T620 266 T800 276 L800 330 L0 330 Z" fill="url(#vd-haze-grad)" opacity={0.6} />
        {/* distant shrubs and trees */}
        <g opacity={0.9}>
          {[
            [296, 12, '#5E8252'], [322, 18, '#56794C'], [350, 11, '#648A56'], [378, 15, '#56794C'], [410, 20, '#5E8252'],
            [444, 13, '#648A56'], [470, 17, '#56794C'], [500, 12, '#5E8252'], [530, 16, '#56794C'], [560, 11, '#648A56'],
          ].map(([x, r, c], i) => (
            <g key={i}>
              <ellipse cx={x as number} cy={HORIZON - (r as number) * 0.55} rx={(r as number) * 1.2} ry={r as number} fill={c as string} />
              <ellipse cx={(x as number) - 4} cy={HORIZON - (r as number) * 0.8} rx={(r as number) * 0.6} ry={(r as number) * 0.5} fill="#789C62" opacity={0.6} />
            </g>
          ))}
          <path d={`M280 ${HORIZON} L580 ${HORIZON}`} stroke="#56794C" strokeWidth={2} />
        </g>
        <Palm x={776} h={156} lean={-6} />
        <Palm x={268} h={116} lean={10} />

        {/* ground */}
        <rect y={HORIZON} width={W} height={H - HORIZON} fill="url(#vd-ground)" />
        <ellipse cx={470} cy={446} rx={450} ry={104} fill="url(#vd-yard)" />
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${20 + i * 44} ${HORIZON + 8 + (i % 3) * 5} l2 -5 l2 5 l2 -4 l1 4`} stroke="#5E7E3E" strokeWidth={0.8} fill="none" />
        ))}

        <BigTree />
        <g style={{ opacity: hideHut ? 0 : 1, transition: fade }}>
          <Hut />
        </g>

        {/* vignettes */}
        {scenes.map((s, i) => (
          <g key={s.id} style={{ opacity: i === index ? 1 : 0, transition: fade }} visibility={Math.abs(i - index) > 1 ? 'hidden' : undefined}>
            <g transform={zoomT(vignettes[s.id]?.zoom ?? DEFAULT_ZOOM)}>{vignettes[s.id]?.body}</g>
            {vignettes[s.id]?.overlay}
          </g>
        ))}

        {/* night */}
        <rect width={W} height={H} fill="#0A1030" style={{ opacity: scene.night, transition: `opacity ${t}` }} pointerEvents="none" />

        {/* stars & moon */}
        <g style={{ opacity: scene.night > 0.3 ? 1 : 0, transition: `opacity ${t}` }}>
          {STARS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1.1} fill="#FFFBEA">
              {i % 2 === 0 && <Anim attr="opacity" values="1;0.3;1" dur={`${2 + (i % 5) * 0.6}s`} />}
            </circle>
          ))}
          <g transform="translate(700 64)">
            <circle r={30} fill="#FFF6D8" opacity={0.12} />
            <circle r={16} fill="#FFF3CF" />
            <circle cx={-5} cy={-3} r={3} fill="#EDE3BF" />
            <circle cx={5} cy={5} r={2.2} fill="#EDE3BF" />
            <circle cx={4} cy={-7} r={1.4} fill="#EDE3BF" />
          </g>
        </g>

        {/* lit windows */}
        <g style={{ opacity: vignettes[scene.id]?.windows ? 1 : 0, transition: fade }}>
          <rect x={58} y={286} width={30} height={21} fill="#FFC870" opacity={0.6} />
          <rect x={172} y={286} width={30} height={21} fill="#FFC870" opacity={0.6} />
          <rect x={113} y={284} width={32} height={46} fill="#FFB85A" opacity={0.25} />
        </g>

        {/* lights */}
        {scenes.map((s, i) =>
          vignettes[s.id]?.lights ? (
            <g key={s.id} style={{ opacity: i === index ? 1 : 0, transition: fade }} visibility={Math.abs(i - index) > 1 ? 'hidden' : undefined}>
              <g transform={zoomT(vignettes[s.id]?.zoom ?? DEFAULT_ZOOM)}>{vignettes[s.id].lights}</g>
            </g>
          ) : null
        )}
      </svg>
    </MotionContext.Provider>
  );
}
