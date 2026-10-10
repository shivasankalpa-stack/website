/**
 * Artwork for every scene: which pencil drawing to show, how the camera
 * moves across it, and the living details drawn on top.
 *
 * Drawings live in public/assets/storyboard/<CODE>.webp at 1600 × 893.
 * All coordinates below are in that space (x 0–1600, y 0–893).
 * Camera: a slow move from `from` to `to` over the scene; x, y = the point
 * the camera centres on, z = zoom (1 = the whole drawing).
 */

'use client';

import type { ReactNode } from 'react';
import {
  Birds,
  Drops,
  Dust,
  Fire,
  GhanaWeave,
  LampGlow,
  LightBeam,
  MantraBanner,
  Motes,
  Petals,
  Reveal,
  Ripples,
  Smoke,
  Speech,
  Stars,
  SunGlow,
  WrittenText,
} from './fx';

export interface Shot {
  x: number;
  y: number;
  z: number;
}

export interface SceneArt {
  code: string;
  from: Shot;
  to: Shot;
  overlay?: ReactNode;
}

export const ART_W = 1600;
export const ART_H = 893;
export const artSrc = (code: string) => `/assets/storyboard/${code}.webp`;

const CHALK = '#F1EEE4';
const GEORGIA = 'Georgia, "Times New Roman", serif';
const WIDE: Shot = { x: 800, y: 446, z: 1 };

const sunMotes: [number, number][] = [
  [940, 260], [990, 330], [1040, 220], [1100, 300], [1160, 380], [1210, 250], [1260, 330], [900, 400], [1010, 430], [1130, 460],
];

export const ART: Record<string, SceneArt> = {
  /* ═════════ The Journey ═════════ */
  'j-pravesha': {
    code: 'J01',
    from: WIDE,
    to: { x: 1080, y: 500, z: 1.28 },
    overlay: (
      <g>
        <WrittenText lines={['गुरुकुलम्']} x={400} y={186} size={32} rotate={-1} />
        <Motes spots={sunMotes} />
      </g>
    ),
  },
  'j-upanayana': {
    code: 'J02',
    from: WIDE,
    to: { x: 500, y: 440, z: 1.3 },
    overlay: <Fire x={832} y={600} w={150} />,
  },
  'j-samhita': {
    code: 'J03',
    from: { x: 800, y: 446, z: 1.04 },
    to: { x: 720, y: 430, z: 1.14 },
    overlay: (
      <g>
        <Speech text="अ॒ग्निमी॑ळे पु॒रोहि॑तम्" x={1010} y={120} tail={[1232, 252]} from={0} to={3.2} dur={7} />
        <Speech text="अ॒ग्निमी॑ळे पु॒रोहि॑तम्" x={440} y={190} tail={[352, 312]} from={3.5} to={6.7} dur={7} ink="#2E2A5D" />
      </g>
    ),
  },
  'j-ghana': {
    code: 'J04',
    from: WIDE,
    to: { x: 760, y: 400, z: 1.12 },
    overlay: <GhanaWeave x={800} y={76} s={1.15} />,
  },
  'j-modern': {
    code: 'J05',
    from: WIDE,
    to: { x: 1150, y: 330, z: 1.3 },
    overlay: (
      <g>
        <WrittenText lines={['π ≈', '62832', '÷ 20000', '= 3.1416']} x={1446} y={170} size={32} gap={1.5} color={CHALK} family={GEORGIA} weight={400} begin={1.5} step={0.18} />
        <WrittenText lines={['आर्यभटीयम्']} x={1446} y={378} size={20} color={CHALK} begin={5} step={0.15} />
      </g>
    ),
  },
  'j-rashtra': {
    code: 'J06',
    from: { x: 800, y: 560, z: 1.15 },
    to: { x: 800, y: 380, z: 1.15 },
    overlay: <Petals x={1000} y={170} w={150} fall={520} />,
  },
  'j-pariksha': {
    code: 'J07',
    from: WIDE,
    to: { x: 900, y: 430, z: 1.2 },
    overlay: <WrittenText lines={['वेदपरीक्षा']} x={800} y={232} size={60} rotate={-0.6} step={0.18} />,
  },
  'j-samavartana': {
    code: 'J08',
    from: WIDE,
    to: { x: 760, y: 330, z: 1.22 },
    overlay: <Reveal lines={['सत्यं वद ।', 'धर्मं चर ।', 'स्वाध्यायान्मा प्रमदः ।']} x={300} y={74} size={36} dur={10} />,
  },
  'j-seva': {
    code: 'J09',
    from: WIDE,
    to: { x: 640, y: 430, z: 1.18 },
    overlay: <Fire x={1150} y={640} w={170} />,
  },
  'j-guru': {
    code: 'J10',
    from: WIDE,
    to: { x: 1150, y: 420, z: 1.25 },
    overlay: (
      <g>
        <WrittenText lines={['गुरुकुलम्']} x={400} y={186} size={32} rotate={-1} />
        <LampGlow x={1452} y={462} r={60} />
        <Motes spots={sunMotes} />
      </g>
    ),
  },

  /* ═════════ A Day at the Gurukula ═════════ */
  'd-prabodha': {
    code: 'D01',
    from: { x: 800, y: 520, z: 1.25 },
    to: { x: 640, y: 520, z: 1.45 },
    overlay: (
      <g>
        <LightBeam points="330,40 445,30 840,470 600,525" motes={[[420, 140], [470, 210], [520, 280], [560, 330], [610, 380], [650, 430], [500, 250], [700, 470]]} />
        <LampGlow x={780} y={662} r={120} screen />
      </g>
    ),
  },
  'd-snana': {
    code: 'D02',
    from: WIDE,
    to: { x: 820, y: 470, z: 1.25 },
    overlay: (
      <g>
        <Drops x={742} y={500} dy={150} n={6} dur={1.1} />
        <Ripples x={800} y={706} rx={130} />
      </g>
    ),
  },
  'd-sandhya': {
    code: 'D03',
    from: WIDE,
    to: { x: 560, y: 400, z: 1.18 },
    overlay: (
      <g>
        <SunGlow x={285} y={362} r={120} />
        <Drops x={486} y={168} dy={610} dx={4} n={9} dur={1.4} />
        <Ripples x={484} y={796} rx={90} />
        <Birds y={140} dir={-1} dur={24} />
      </g>
    ),
  },
  'd-adhyayana': {
    code: 'D04',
    from: WIDE,
    to: { x: 780, y: 430, z: 1.06 },
    overlay: <MantraBanner x={690} y={22} w={880} />,
  },
  'd-seva': {
    code: 'D05',
    from: WIDE,
    to: { x: 900, y: 470, z: 1.2 },
    overlay: (
      <g>
        <Dust x={690} y={790} />
        <Motes spots={[[480, 300], [560, 380], [640, 260], [720, 340], [820, 420], [900, 300], [980, 380]]} />
      </g>
    ),
  },
  'd-bhojana': {
    code: 'D06',
    from: WIDE,
    to: { x: 1000, y: 450, z: 1.2 },
    overlay: (
      <g>
        <Smoke x={752} y={300} n={3} spread={50} rise={130} light />
        <Drops x={1112} y={612} dy={40} n={3} dur={0.8} />
      </g>
    ),
  },
  'd-shastra': {
    code: 'D07',
    from: WIDE,
    to: { x: 1180, y: 360, z: 1.3 },
    overlay: (
      <g>
        <WrittenText lines={['a² + b² = c²']} x={1408} y={392} size={34} color={CHALK} family={GEORGIA} weight={400} begin={1.5} step={0.16} />
        <WrittenText lines={['बौधायन-शुल्बसूत्रम्']} x={1404} y={440} size={20} color={CHALK} begin={4} step={0.12} />
      </g>
    ),
  },
  'd-krida': {
    code: 'D08',
    from: { x: 520, y: 446, z: 1.2 },
    to: { x: 1080, y: 446, z: 1.2 },
    overlay: (
      <g>
        <Dust x={1350} y={760} n={2} />
        <Dust x={980} y={720} n={2} />
      </g>
    ),
  },
  'd-sayam': {
    code: 'D09',
    from: WIDE,
    to: { x: 800, y: 520, z: 1.18 },
    overlay: (
      <g>
        <SunGlow x={1242} y={356} r={130} />
        <LampGlow x={840} y={646} r={85} />
        <LampGlow x={474} y={418} r={30} />
        <Birds y={96} dir={-1} dur={20} />
      </g>
    ),
  },
  'd-ratri': {
    code: 'D10',
    from: WIDE,
    to: { x: 760, y: 470, z: 1.18 },
    overlay: (
      <g>
        <LampGlow x={800} y={432} r={170} screen />
        <LampGlow x={1110} y={398} r={80} screen />
        <Stars spots={[[452, 190], [500, 230], [548, 178], [470, 262], [565, 250], [525, 205]]} />
      </g>
    ),
  },
};
