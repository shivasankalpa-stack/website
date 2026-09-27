/**
 * Artwork for "A Day at the Gurukula" (DAY_SCENES in data/vidyarthi-storyboard.ts).
 */

'use client';

import { Anim, At, Motion, Scale, Shadow, Translate } from './anim';
import { chantTiming, Drops, Fireflies, MantraBanner, Ripple, River, Birds, svaraHand } from './fx';
import { bodyMetrics, HAIR, Person, SKIN, type Metrics } from './person';
import {
  BananaLeaf,
  Blackboard,
  BookStand,
  Broom,
  Cauldron,
  COL,
  Cow,
  DEVANAGARI,
  Flask,
  Globe,
  Glow,
  Kalasha,
  Lamp,
  Laptop,
  LowDesk,
  Mat,
  Pot,
  Sleeper,
  TallLamp,
  Tulasi,
} from './props';
import type { Vignette } from './Stage';

const boy = bodyMetrics('boy', 'stand');

/* Outfit presets so the class looks varied but consistent */
const O = {
  a: { skin: SKIN.wheat, border: '#B8860B' },
  b: { skin: SKIN.tan, border: '#A63232' },
  c: { skin: SKIN.fair, border: '#2E6B3A' },
  d: { skin: SKIN.deep, border: '#B8860B' },
};

const guru = {
  build: 'elder' as const,
  hair: HAIR.grey,
  beard: true,
  wrap: 'shoulders' as const,
  cloth: '#E3893C',
  border: '#8B2828',
  skin: SKIN.tan,
};

const handsCupped = (m: Metrics) => [{ x: m.hx + 1.3 * m.hr, y: m.hy + 2.6 * m.hr }];

export const DAY_VIGNETTES: Record<string, Vignette> = {
  /* 4:30 — waking, karadarśana by lamplight */
  'd-prabodha': {
    windows: true,
    body: (
      <g>
        <At x={292} y={392}>
          <Sleeper blanket="#7E4A3A" />
        </At>
        <At x={392} y={410}>
          <Sleeper blanket="#4E5E7A" skin={SKIN.tan} delay="1.2s" />
        </At>
        <At x={520} y={420}>
          <Mat w={84} />
        </At>
        <At x={516} y={418}>
          <Shadow rx={30} />
          <Person posture="sit" {...O.a} eyes="down" near={handsCupped} far={handsCupped} sway />
        </At>
        <At x={588} y={420}>
          <Lamp />
        </At>
      </g>
    ),
    lights: (
      <g>
        <At x={593} y={400}>
          <Glow r={95} />
        </At>
      </g>
    ),
  },

  /* 5:00 — bath in the river, water poured over the head */
  'd-snana': {
    body: (
      <g>
        <River top={364} />
        {/* stone ghat steps */}
        <g>
          <path d="M600 382 L800 382 L800 396 L590 396 Z" fill="#9C9383" />
          <path d="M616 370 L800 370 L800 382 L606 382 Z" fill="#B3AA99" />
          <path d="M632 358 L800 358 L800 370 L622 370 Z" fill="#C6BDAD" />
        </g>
        <At x={420} y={444}>
          <Person
            {...O.a}
            eyes="closed"
            wrap="none"
            near={(m) => [{ x: m.hx + 0.6 * m.hr, y: m.hy - 2.4 * m.hr }]}
            far={(m) => [{ x: m.hx + 0.6 * m.hr, y: m.hy - 2.4 * m.hr }]}
            nearHold={{ node: <g transform="translate(0 6) rotate(180)"><Kalasha s={0.8} /></g>, upright: true }}
          />
        </At>
        <Drops x={425} y={330} dy={24} n={5} />
        {/* water in front of the bather */}
        <path d="M360 402 Q420 396 480 402 L480 450 L360 450 Z" fill={COL.water} opacity={0.93} />
        <path d="M360 402 Q420 396 480 402" stroke="#9CC6DC" strokeWidth={1.5} fill="none" />
        <Ripple x={422} y={404} />
        <Ripple x={422} y={404} begin="0.9s" />
        <At x={654} y={358} s={0.95}>
          <Shadow rx={16} />
          <Person {...O.b} eyes="closed" chant wrap="sash" cloth="#F3EEDF" near={(m) => [m.anjali]} far={(m) => [m.anjali]} bob />
        </At>
        <At x={622} y={360}>
          <Kalasha s={0.9} />
        </At>
      </g>
    ),
  },

  /* 6:00 — arghya to the rising sun, japa on the bank */
  'd-sandhya': {
    body: (
      <g>
        <River top={396} />
        <At x={366} y={404}>
          <Shadow rx={16} />
          <Person
            {...O.a}
            eyes="up"
            near={(m) => [m.offer, { x: m.offer.x + 2, y: m.offer.y + 3 }, m.offer]}
            far={(m) => [m.offer, { x: m.offer.x + 2, y: m.offer.y + 3 }, m.offer]}
            dur="3s"
          />
        </At>
        <Drops x={366 + boy.offer.x + 2} y={404 + boy.offer.y + 6} dy={40} dx={4} n={5} color="#E9F5FB" />
        {[
          { x: 540, o: O.b, b: '0.4s' },
          { x: 646, o: O.c, b: '1.1s' },
        ].map(({ x, o, b }) => (
          <g key={x}>
            <At x={x} y={394}>
              <Mat w={74} />
            </At>
            <At x={x} y={392}>
              <Shadow rx={28} />
              <Person posture="sit" {...o} eyes="closed" near={(m) => [m.anjali]} far={(m) => [m.anjali]} sway begin={b} />
            </At>
          </g>
        ))}
        <At x={595} y={398} s={0.6}>
          <Kalasha />
        </At>
      </g>
    ),
  },

  /* 7:00 — Veda class: the full first ṛk of the Ṛgveda, syllable by syllable */
  'd-adhyayana': {
    overlay: (
      <At x={400} y={44}>
        <MantraBanner />
      </At>
    ),
    body: (
      <g>
        {/* Ācārya on a wooden pīṭha */}
        <g>
          <Shadow x={660} y={392} rx={52} />
          <path d="M610 378 L712 378 L706 390 L616 390 Z" fill="url(#vd-wood)" />
          <rect x={620} y={390} width={7} height={8} fill={COL.woodDark} />
          <rect x={694} y={390} width={7} height={8} fill={COL.woodDark} />
        </g>
        <At x={660} y={380} s={1.12} flip>
          <Person posture="sit" {...guru} mala chant eyes="closed" near={(m) => svaraHand(m, 5)} {...chantTiming} />
        </At>
        {/* students */}
        {[
          { x: 312, y: 414, o: O.a },
          { x: 404, y: 422, o: O.b },
          { x: 494, y: 416, o: O.c },
          { x: 574, y: 428, o: O.d, s: 0.94 },
        ].map((st, i) => (
          <At key={i} x={st.x} y={st.y} s={st.s ?? 1}>
            <Shadow rx={30} />
            <Person posture="sit" {...st.o} chant eyes={i % 2 ? 'closed' : 'open'} near={(m) => svaraHand(m, 5)} {...chantTiming} begin="0s" />
          </At>
        ))}
      </g>
    ),
  },

  /* 10:00 — sevā: sweeping, carrying water, feeding the cows */
  'd-seva': {
    body: (
      <g>
        <At x={292} y={414}>
          <Shadow rx={18} />
          <Person
            {...O.a}
            eyes="down"
            near={(m) => [{ x: 1.6 * m.hipW, y: m.hipY + 6 }, { x: 2.6 * m.hipW, y: m.hipY + 10 }, { x: 1.6 * m.hipW, y: m.hipY + 6 }]}
            far={(m) => [{ x: 1.2 * m.hipW, y: m.hipY - 4 }, { x: 2.0 * m.hipW, y: m.hipY }, { x: 1.2 * m.hipW, y: m.hipY - 4 }]}
            dur="1.4s"
            nearHold={{ node: <Broom /> }}
          />
        </At>
        {[0, 0.7].map((b, i) => (
          <circle key={i} cx={338} cy={410} r={4} fill="#D9C39A" opacity={0}>
            <Translate values="0 0; 16 -10" dur="1.4s" begin={`${b}s`} />
            <Anim attr="opacity" values="0;0.8;0" dur="1.4s" begin={`${b}s`} />
            <Anim attr="r" values="3;10" dur="1.4s" begin={`${b}s`} />
          </circle>
        ))}
        <g>
          <Translate values="0 0; 50 0; 50 0; 0 0; 0 0" keyTimes="0;0.4;0.5;0.9;1" dur="10s" />
          <At x={380} y={404}>
            <Shadow rx={16} />
            <Person {...O.b} bob near={(m) => [{ x: m.nearSh.x - 1, y: m.shY - 7 }]} nearHold={{ node: <g transform="translate(0 3)"><Pot s={0.9} /></g>, upright: true }} />
          </At>
        </g>
        {/* hay */}
        <ellipse cx={516} cy={420} rx={22} ry={6} fill="#D8B45A" />
        <path d="M498 418 l6 -9 M510 417 l3 -10 M524 417 l-2 -10 M534 418 l-5 -9" stroke="#C9A04A" strokeWidth={1.4} />
        <At x={578} y={424}>
          <Cow />
        </At>
        <At x={674} y={420} flip>
          <Shadow rx={16} />
          <Person
            {...O.c}
            smile
            near={(m) => [{ x: m.chest.x + 18, y: m.chest.y + 8 }, { x: m.chest.x + 22, y: m.chest.y + 4 }, { x: m.chest.x + 18, y: m.chest.y + 8 }]}
            dur="2.2s"
            nearHold={{
              node: <path d="M0 2 l-6 10 M0 2 l2 12 M0 2 l7 9 M0 2 l-9 5" stroke="#7FA848" strokeWidth={1.6} strokeLinecap="round" />,
            }}
          />
        </At>
        {/* flower basket */}
        <g transform="translate(342 426)">
          <path d="M-13 -9 L-10 2 L10 2 L13 -9 Z" fill="#B08040" />
          <path d="M-13 -9 L13 -9" stroke="#8A6030" strokeWidth={1.4} />
          {[
            [-7, -11, '#F2A33A'],
            [0, -12, '#FFFFFF'],
            [7, -11, '#D0452F'],
            [-3, -14, '#F7D34A'],
          ].map(([x, y, c], i) => (
            <circle key={i} cx={x as number} cy={y as number} r={3} fill={c as string} />
          ))}
        </g>
      </g>
    ),
  },

  /* 12:30 — meal on plantain leaves */
  'd-bhojana': {
    body: (
      <g>
        <path d="M236 392 L640 392 L650 440 L226 440 Z" fill="#C9B083" opacity={0.45} />
        {[
          { x: 280, o: O.a },
          { x: 364, o: O.b },
          { x: 448, o: O.c },
          { x: 532, o: O.d },
        ].map(({ x, o }, i) => (
          <g key={x}>
            <At x={x} y={406}>
              <Shadow rx={28} />
              <Person
                posture="sit"
                {...o}
                eyes="down"
                near={(m) => [{ x: 2.6 * m.hipW, y: 4 }, { x: 2.6 * m.hipW, y: 4 }, { x: m.mouth.x + 2, y: m.mouth.y + 1 }, { x: 2.6 * m.hipW, y: 4 }]}
                keyTimes="0;0.45;0.7;1"
                dur="2.8s"
                begin={`${i * 0.55}s`}
              />
            </At>
            <At x={x + 34} y={420}>
              <BananaLeaf />
            </At>
          </g>
        ))}
        <g>
          <Translate values="0 0; -24 0; -24 0; 0 0; 0 0" keyTimes="0;0.35;0.6;0.95;1" dur="8s" />
          <At x={632} y={404}>
            <Shadow rx={16} />
            <Person
              {...O.b}
              smile
              near={(m) => [{ x: m.chest.x + 14, y: m.hipY + 2 }, { x: m.chest.x + 16, y: m.hipY + 8 }, { x: m.chest.x + 14, y: m.hipY + 2 }]}
              dur="1.8s"
              nearHold={{ node: <g><path d="M0 0 L0 12" stroke={COL.brass} strokeWidth={1.8} /><ellipse cx={0} cy={14} rx={4} ry={2.2} fill="url(#vd-brass)" /></g> }}
              far={(m) => [m.farHang]}
              farHold={{ node: <g transform="translate(0 12)"><path d="M-9 -12 L-7 4 Q0 8 7 4 L9 -12 Z" fill="url(#vd-brass)" /><ellipse cx={0} cy={-12} rx={9} ry={2.4} fill="#8E6A1C" /></g>, upright: true }}
            />
          </At>
        </g>
        <At x={690} y={428}>
          <Cauldron />
        </At>
      </g>
    ),
  },

  /* 2:30 — Saṃskṛta, maths, science and computers */
  'd-shastra': {
    body: (
      <g>
        <At x={606} y={428}>
          <Blackboard w={150} h={82}>
            {/* right triangle with a² + b² = c² */}
            <g stroke={COL.chalk} strokeWidth={1.4} fill="none">
              <path d="M-60 66 L-60 22 L-10 66 Z" />
              <path d="M-60 58 h8 v8" />
            </g>
            <g style={{ fontFamily: 'Georgia, serif', fill: COL.chalk }} fontSize={11}>
              <text x={-69} y={46}>a</text>
              <text x={-38} y={76}>b</text>
              <text x={-30} y={40}>c</text>
              <text x={30} y={40} fontSize={15} textAnchor="middle">
                a² + b² = c²
                <Anim attr="opacity" values="0;0;1;1" keyTimes="0;0.25;0.35;1" dur="6s" />
              </text>
            </g>
            <text x={30} y={62} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 11, fill: COL.chalk }}>
              बौधायन-शुल्बसूत्रम्
            </text>
          </Blackboard>
        </At>
        {/* adhyāpaka in shirt and dhoti */}
        <At x={496} y={420}>
          <Shadow rx={20} />
          <Person
            build="adult"
            attire="shirt"
            top="#E8E2D2"
            hairStyle="short"
            skin={SKIN.wheat}
            smile
            wrap="none"
            near={(m) => [{ x: m.shW * 2.6, y: m.shY - 8 }, { x: m.shW * 2.7, y: m.shY - 2 }, { x: m.shW * 2.6, y: m.shY - 8 }]}
            dur="3s"
          />
        </At>
        {/* students at low desks */}
        <At x={272} y={426}>
          <Shadow rx={28} />
          <Person posture="sit" {...O.a} eyes="down" near={(m) => [{ x: 3.1 * m.hipW, y: -20 }, { x: 3.3 * m.hipW, y: -20 }, { x: 3.1 * m.hipW, y: -20 }]} far={(m) => [{ x: 3.4 * m.hipW, y: -22 }]} dur="0.8s" />
        </At>
        <At x={314} y={432}>
          <LowDesk w={40}>
            <Laptop />
          </LowDesk>
        </At>
        <At x={362} y={428}>
          <Shadow rx={28} />
          <Person posture="sit" {...O.b} eyes="down" near={(m) => [{ x: 3.1 * m.hipW, y: -24 }]} far={(m) => [{ x: 3.4 * m.hipW, y: -24 }]} />
        </At>
        <At x={402} y={434}>
          <BookStand flip />
        </At>
        <At x={438} y={432}>
          <LowDesk w={36}>
            <g transform="translate(-8 0)">
              <Globe />
            </g>
            <g transform="translate(10 0)">
              <Flask />
            </g>
          </LowDesk>
        </At>
      </g>
    ),
  },

  /* 4:30 — play */
  'd-krida': {
    body: (
      <g>
        {[
          { x: 320, o: O.a, flip: false, b: '0s' },
          { x: 548, o: O.b, flip: true, b: '1.2s' },
        ].map(({ x, o, flip, b }) => (
          <At key={x} x={x} y={418} flip={flip}>
            <Shadow rx={18} />
            <Person
              {...o}
              smile
              near={(m) => [m.overhead, { x: m.chest.x + 8, y: m.chest.y }, m.overhead]}
              far={(m) => [m.overhead, { x: m.chest.x + 10, y: m.chest.y + 2 }, m.overhead]}
              dur="2.4s"
              begin={b}
            />
          </At>
        ))}
        <circle cx={0} cy={0} r={6} fill={COL.kumkuma}>
          <Motion path="M340 296 Q434 196 528 296 Q434 196 340 296" dur="2.4s" />
        </circle>
        {/* spinning top */}
        <g transform="translate(440 428)">
          <ellipse cx={0} cy={3} rx={6} ry={1.4} fill="#00000022" />
          <g>
            <path d="M-8 -12 L8 -12 L0 2 Z" fill="#C0502F" />
            <ellipse cx={0} cy={-12} rx={8} ry={2.5} fill="#E07B4F" />
            <path d="M-6 -8 L6 -8" stroke="#F5D08A" strokeWidth={1.4} />
            <Scale values="1 1; -1 1; 1 1" dur="0.35s" />
          </g>
        </g>
        {/* ūrdhva-hastāsana with a little jump */}
        <g>
          <Translate values="0 0; 0 -10; 0 0; 0 0" keyTimes="0;0.2;0.4;1" dur="1.6s" />
          <At x={682} y={420}>
            <Person {...O.c} near={(m) => [m.overhead]} far={(m) => [m.overhead]} smile />
          </At>
        </g>
        <At x={682} y={422}>
          <Shadow rx={16} />
        </At>
      </g>
    ),
  },

  /* 6:15 — lamp before Tulasī, evening prayers */
  'd-sayam': {
    body: (
      <g>
        <At x={560} y={416}>
          <Tulasi />
        </At>
        <At x={560} y={402} s={0.9}>
          <Lamp />
        </At>
        <At x={440} y={424}>
          <Shadow rx={28} />
          <Person posture="sit" {...O.a} eyes="closed" chant near={(m) => [m.anjali]} far={(m) => [m.anjali]} sway />
        </At>
        <At x={680} y={426} flip>
          <Shadow rx={28} />
          <Person posture="sit" {...O.b} eyes="closed" chant near={(m) => [m.anjali]} far={(m) => [m.anjali]} sway begin="0.6s" />
        </At>
        <At x={322} y={420}>
          <Shadow rx={16} />
          <Person {...O.c} chant eyes="closed" near={(m) => [m.anjali]} far={(m) => [m.anjali]} bob />
        </At>
        <Birds y={120} />
      </g>
    ),
    lights: (
      <At x={565} y={382}>
        <Glow r={80} />
      </At>
    ),
  },

  /* 7:30 — revision by lamplight */
  'd-ratri': {
    windows: true,
    body: (
      <g>
        <At x={484} y={388} s={0.86}>
          <Person posture="sit" {...O.c} chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
        <At x={386} y={424}>
          <Shadow rx={28} />
          <Person posture="sit" {...O.a} chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
        <At x={578} y={424} flip>
          <Shadow rx={28} />
          <Person posture="sit" {...O.b} chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
        <At x={480} y={428}>
          <TallLamp />
        </At>
        <At x={440} y={434}>
          <BookStand />
        </At>
      </g>
    ),
    lights: (
      <g>
        <At x={480} y={366}>
          <Glow r={130} />
        </At>
        <Fireflies spots={[[620, 330], [700, 300], [300, 340], [744, 360], [262, 300], [560, 300]]} />
      </g>
    ),
  },
};

