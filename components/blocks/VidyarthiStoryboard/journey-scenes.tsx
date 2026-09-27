/**
 * Artwork for "The Journey" (JOURNEY_SCENES in data/vidyarthi-storyboard.ts):
 * a Veda Vidyārthī's life from joining the Gurukula to becoming a Guru.
 */

'use client';

import type { ReactNode } from 'react';
import { At, Shadow } from './anim';
import { Bunting, chantTiming, GhanaWeave, Reveal, Speech, svaraHand } from './fx';
import { HAIR, Person, SKIN, type Metrics, type PersonProps } from './person';
import {
  Blackboard,
  BookStand,
  COL,
  DEVANAGARI,
  FlagPole,
  Flask,
  Gate,
  Globe,
  Glow,
  HomaKunda,
  Kalasha,
  Laptop,
  LowDesk,
  Mandapa,
  OfferingPlate,
  PalmLeafBundle,
  Trunk,
} from './props';
import type { Vignette } from './Stage';

/* ── Cast ─────────────────────────────────────────────────────────── */

const ACHARYA: PersonProps = {
  build: 'elder',
  hair: HAIR.grey,
  beard: true,
  wrap: 'shoulders',
  cloth: '#E3893C',
  border: '#8B2828',
  skin: SKIN.tan,
  mala: true,
};

/** Our Vidyārthī, grown up and now a Guru himself. */
const NEW_GURU: PersonProps = {
  build: 'adult',
  hair: HAIR.salt,
  beard: true,
  wrap: 'shoulders',
  cloth: '#F1E7CC',
  border: '#8B2828',
  skin: SKIN.wheat,
  mala: true,
};

const EXAMINER = (skin: string, cloth: string): PersonProps => ({
  build: 'elder',
  hair: HAIR.grey,
  beard: false,
  wrap: 'shoulders',
  cloth,
  border: '#B8860B',
  skin,
});

const FATHER: PersonProps = { build: 'adult', attire: 'shirt', top: '#E6EEF3', hairStyle: 'short', skin: SKIN.wheat, wrap: 'none', vibhuti: true };
const MOTHER: PersonProps = { build: 'woman', attire: 'saree', dhoti: '#8B1E3F', border: '#D9A43A', top: '#2E6B3A', cloth: '#8B1E3F', wrap: 'pallu', hairStyle: 'long', skin: SKIN.wheat, vibhuti: false, thread: false };
const CHILD: PersonProps = { build: 'child', attire: 'shirt', top: '#F4E4B4', hairStyle: 'short', skin: SKIN.wheat, wrap: 'none', vibhuti: false };

const blessing = (m: Metrics) => [{ x: m.chest.x + 10, y: m.shY - 3 }];
const anjali = (m: Metrics) => [m.anjali];
const salute = (m: Metrics) => [{ x: m.brow.x + 1.5, y: m.brow.y - 1 }];

function Pitha({ x, y, w = 104 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <Shadow x={x} y={y + 14} rx={w * 0.5} />
      <path d={`M${x - w / 2} ${y} L${x + w / 2} ${y} L${x + w / 2 - 6} ${y + 12} L${x - w / 2 + 6} ${y + 12} Z`} fill="url(#vd-wood)" />
      <rect x={x - w / 2 + 10} y={y + 12} width={7} height={8} fill={COL.woodDark} />
      <rect x={x + w / 2 - 17} y={y + 12} width={7} height={8} fill={COL.woodDark} />
      <path d={`M${x - w / 2 + 8} ${y - 1} L${x + w / 2 - 8} ${y - 1}`} stroke="#E0B35A" strokeWidth={2} />
    </g>
  );
}

/** A family arriving at the gate with a child who bows to the Guru. */
function Arrival({ guru }: { guru: ReactNode }) {
  return (
    <g>
      <At x={236} y={442}>
        <Gate />
      </At>
      <At x={318} y={432}>
        <Shadow rx={18} />
        <Person
          {...MOTHER}
          smile
          near={(m) => [{ x: m.chest.x + 10, y: m.chest.y + 8 }]}
          far={(m) => [{ x: m.chest.x + 12, y: m.chest.y + 8 }]}
          nearHold={{ node: <g transform="translate(4 -2)"><OfferingPlate /></g>, upright: true }}
        />
      </At>
      <At x={372} y={436}>
        <Shadow rx={20} />
        <Person {...FATHER} smile farHold={{ node: <g transform="translate(0 21)"><Trunk /></g>, upright: true }} />
      </At>
      <At x={446} y={436}>
        <Shadow rx={14} />
        <Person {...CHILD} eyes="down" near={anjali} far={anjali} nod />
      </At>
      <Pitha x={592} y={398} />
      <At x={592} y={398} s={1.1} flip>
        {guru}
      </At>
    </g>
  );
}

/* ── Scenes ───────────────────────────────────────────────────────── */

export const JOURNEY_VIGNETTES: Record<string, Vignette> = {
  'j-pravesha': {
    hideHut: true,
    body: (
      <Arrival
        guru={<Person posture="sit" {...ACHARYA} smile near={blessing} />}
      />
    ),
  },

  'j-upanayana': {
    hideHut: true,
    body: (
      <g>
        <At x={476} y={450}>
          <Mandapa w={320} h={140} torana />
        </At>
        <At x={476} y={392} s={0.88}>
          <Person posture="sit" {...ACHARYA} chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
        <At x={476} y={440}>
          <HomaKunda />
        </At>
        <At x={392} y={440}>
          <Shadow rx={26} />
          <Person posture="sit" build="child" skin={SKIN.wheat} wrap="none" eyes="closed" near={anjali} far={anjali} border="#D9A43A" />
        </At>
        <At x={562} y={440} flip>
          <Shadow rx={30} />
          <Person posture="sit" build="adult" skin={SKIN.wheat} wrap="shoulders" cloth="#F0DFA0" border="#8B2828" hairStyle="short" chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
        <At x={612} y={446}>
          <Kalasha purna />
        </At>
      </g>
    ),
    lights: (
      <At x={476} y={410}>
        <Glow r={120} fire />
      </At>
    ),
  },

  'j-samhita': {
    body: (
      <g>
        <Pitha x={604} y={398} />
        <At x={604} y={398} s={1.1} flip>
          <Person posture="sit" {...ACHARYA} chant eyes="closed" near={(m) => svaraHand(m, 5)} {...chantTiming} />
        </At>
        {[
          { x: 318, y: 434, skin: SKIN.wheat, border: '#B8860B' },
          { x: 398, y: 440, skin: SKIN.tan, border: '#A63232' },
          { x: 478, y: 436, skin: SKIN.fair, border: '#2E6B3A' },
        ].map((k, i) => (
          <At key={i} x={k.x} y={k.y}>
            <Shadow rx={24} />
            <Person posture="sit" build="child" skin={k.skin} border={k.border} chant eyes={i === 1 ? 'closed' : 'open'} near={(m) => svaraHand(m, 4)} {...chantTiming} />
          </At>
        ))}
        <Speech text="अ॒ग्निमी॑ळे पु॒रोहि॑तम्" x={560} y={232} tail={{ x: 596, y: 280 }} from={0} to={3.2} dur={7} tone="guru" />
        <Speech text="अ॒ग्निमी॑ळे पु॒रोहि॑तम्" x={380} y={300} tail={{ x: 400, y: 350 }} from={3.5} to={6.7} dur={7} tone="students" />
      </g>
    ),
  },

  'j-ghana': {
    overlay: (
      <At x={400} y={90}>
        <GhanaWeave />
      </At>
    ),
    body: (
      <g>
        <Pitha x={604} y={402} />
        <At x={604} y={402} s={1.08} flip>
          <Person posture="sit" {...ACHARYA} eyes="closed" nod near={(m) => [m.nearKnee]} />
        </At>
        <At x={420} y={440}>
          <Shadow rx={32} />
          <Person posture="sit" build="youth" skin={SKIN.wheat} border="#A63232" chant eyes="closed" near={(m) => svaraHand(m, 5)} {...chantTiming} />
        </At>
        <At x={498} y={444}>
          <BookStand />
        </At>
      </g>
    ),
  },

  'j-modern': {
    body: (
      <g>
        <At x={612} y={440}>
          <Blackboard w={150} h={84}>
            <g stroke={COL.chalk} strokeWidth={1.3} fill="none">
              <circle cx={-42} cy={44} r={22} />
              <path d="M-64 44 H-20" strokeDasharray="3 2" />
            </g>
            <g style={{ fontFamily: 'Georgia, serif', fill: COL.chalk }}>
              <text x={-42} y={40} textAnchor="middle" fontSize={8}>20000</text>
              <text x={30} y={34} textAnchor="middle" fontSize={12}>π ≈ 62832 / 20000</text>
              <text x={30} y={54} textAnchor="middle" fontSize={13}>= 3.1416</text>
            </g>
            <text x={30} y={72} textAnchor="middle" style={{ fontFamily: DEVANAGARI, fontSize: 10, fill: COL.chalk }}>
              आर्यभटीयम् २.१०
            </text>
          </Blackboard>
        </At>
        <At x={520} y={430}>
          <Shadow rx={20} />
          <Person {...FATHER} top="#DCE8D8" smile near={(m) => [{ x: m.shW * 2.6, y: m.shY - 6 }, { x: m.shW * 2.7, y: m.shY }, { x: m.shW * 2.6, y: m.shY - 6 }]} dur="3.2s" />
        </At>
        {[
          { x: 268, desk: <Laptop />, skin: SKIN.wheat, border: '#B8860B' },
          { x: 352, desk: <g><g transform="translate(-8 0)"><Globe /></g><g transform="translate(10 0)"><Flask /></g></g>, skin: SKIN.tan, border: '#A63232' },
          { x: 436, desk: null, skin: SKIN.fair, border: '#2E6B3A' },
        ].map((st, i) => (
          <g key={i}>
            <At x={st.x} y={436}>
              <Shadow rx={30} />
              <Person
                posture="sit"
                build="youth"
                skin={st.skin}
                border={st.border}
                wrap="sash"
                eyes={i === 2 ? 'open' : 'down'}
                near={(m) => (i === 0 ? [{ x: 3.0 * m.hipW, y: -22 }, { x: 3.2 * m.hipW, y: -22 }, { x: 3.0 * m.hipW, y: -22 }] : [{ x: 3.0 * m.hipW, y: -24 }])}
                far={(m) => [{ x: 3.3 * m.hipW, y: -25 }]}
                dur="0.8s"
              />
            </At>
            <At x={st.x + 46} y={442}>
              {st.desk ? <LowDesk w={40}>{st.desk}</LowDesk> : <BookStand flip />}
            </At>
          </g>
        ))}
      </g>
    ),
  },

  'j-rashtra': {
    overlay: <Bunting x1={60} y1={214} x2={640} y2={176} sag={22} />,
    body: (
      <g>
        <At x={476} y={440}>
          <FlagPole h={176} />
        </At>
        {[
          { x: 318, flip: false, skin: SKIN.wheat, build: 'boy' as const },
          { x: 384, flip: false, skin: SKIN.tan, build: 'youth' as const },
          { x: 566, flip: true, skin: SKIN.fair, build: 'youth' as const },
          { x: 628, flip: true, skin: SKIN.deep, build: 'boy' as const },
        ].map((st, i) => (
          <At key={i} x={st.x} y={436 - (i % 2) * 4} flip={st.flip}>
            <Shadow rx={16} />
            <Person build={st.build} skin={st.skin} wrap="sash" border="#138808" near={salute} eyes="up" />
          </At>
        ))}
        <At x={690} y={428} flip>
          <Shadow rx={20} />
          <Person {...FATHER} top="#F2F2EE" near={salute} eyes="up" />
        </At>
      </g>
    ),
  },

  'j-pariksha': {
    hideHut: true,
    body: (
      <g>
        <At x={476} y={452}>
          <Mandapa w={330} h={140} label="वेदपरीक्षा" />
        </At>
        {/* dais for the examiners */}
        <path d="M498 424 L680 424 L676 432 L502 432 Z" fill="#8B1E2E" />
        <path d="M498 424 L680 424" stroke={COL.brass} strokeWidth={1.2} />
        {[
          { x: 530, skin: SKIN.tan, cloth: '#F1E7CC', nod: true },
          { x: 590, skin: SKIN.wheat, cloth: '#E3893C', nod: false },
          { x: 650, skin: SKIN.deep, cloth: '#F1E7CC', nod: true },
        ].map((ex, i) => (
          <At key={i} x={ex.x} y={424} s={0.98} flip>
            <Person posture="sit" {...EXAMINER(ex.skin, ex.cloth)} eyes={i === 1 ? 'open' : 'closed'} nod={ex.nod} begin={`${i * 0.7}s`} near={i === 1 ? (m) => svaraHand(m, 4) : (m) => [m.nearKnee]} {...(i === 1 ? chantTiming : {})} />
          </At>
        ))}
        <At x={560} y={432}>
          <PalmLeafBundle />
        </At>
        <At x={384} y={440}>
          <Shadow rx={32} />
          <Person posture="sit" build="youth" skin={SKIN.wheat} border="#A63232" wrap="sash" chant eyes="closed" near={(m) => svaraHand(m, 5)} {...chantTiming} />
        </At>
      </g>
    ),
  },

  'j-samavartana': {
    overlay: <Reveal lines={['सत्यं वद ।', 'धर्मं चर ।', 'स्वाध्यायान्मा प्रमदः ।']} x={400} y={104} dur={9} size={22} />,
    body: (
      <g>
        <Pitha x={604} y={400} />
        <At x={604} y={400} s={1.1} flip>
          <Person posture="sit" {...ACHARYA} smile near={blessing} />
        </At>
        <At x={478} y={438}>
          <Shadow rx={20} />
          <Person
            build="youth"
            skin={SKIN.wheat}
            wrap="shoulders"
            cloth="#8B1E2E"
            border="#D9A43A"
            eyes="down"
            nod
            near={(m) => [{ x: m.chest.x + 12, y: m.chest.y + 4 }]}
            far={(m) => [{ x: m.chest.x + 14, y: m.chest.y + 4 }]}
            nearHold={{ node: <g transform="translate(5 -2)"><OfferingPlate /></g>, upright: true }}
          />
        </At>
      </g>
    ),
  },

  'j-seva': {
    body: (
      <g>
        <At x={430} y={408} s={0.88}>
          <Person posture="sit" build="adult" skin={SKIN.tan} wrap="shoulders" cloth="#F1E7CC" border="#8B2828" chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
        <At x={524} y={408} s={0.88} flip>
          <Person posture="sit" build="adult" skin={SKIN.fair} wrap="shoulders" cloth="#F0DFA0" border="#8B2828" chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
        <At x={476} y={440}>
          <HomaKunda />
        </At>
        <At x={378} y={442}>
          <Shadow rx={32} />
          <Person posture="sit" build="youth" skin={SKIN.wheat} wrap="shoulders" cloth="#F1E7CC" border="#8B2828" chant eyes="closed" near={(m) => svaraHand(m, 5)} {...chantTiming} />
        </At>
        <At x={576} y={442} flip>
          <Shadow rx={32} />
          <Person posture="sit" build="adult" skin={SKIN.deep} wrap="shoulders" cloth="#F1E7CC" border="#2E6B3A" chant eyes="closed" near={(m) => svaraHand(m, 5)} {...chantTiming} />
        </At>
        {/* kalaśas for the Rudra pārāyaṇa */}
        <path d="M626 436 L704 436 L700 444 L630 444 Z" fill="url(#vd-wood)" />
        {[640, 665, 690].map((x) => (
          <At key={x} x={x} y={436} s={0.8}>
            <Kalasha purna />
          </At>
        ))}
      </g>
    ),
    lights: (
      <At x={476} y={410}>
        <Glow r={120} fire />
      </At>
    ),
  },

  'j-guru': {
    hideHut: true,
    body: (
      <g>
        <Arrival guru={<Person posture="sit" {...NEW_GURU} smile near={blessing} />} />
        <At x={668} y={432} s={0.9} flip>
          <Shadow rx={24} />
          <Person posture="sit" build="boy" skin={SKIN.tan} border="#A63232" chant eyes="closed" near={(m) => svaraHand(m, 4)} {...chantTiming} />
        </At>
      </g>
    ),
  },
};
