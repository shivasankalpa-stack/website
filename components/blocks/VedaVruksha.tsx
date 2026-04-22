/**
 * VedaVruksha — hand-crafted inline SVG of the Vedic knowledge tree.
 *
 * Trunk: वेदः
 * Four main branches: ऋग्वेद, यजुर्वेद (शुक्ल + कृष्ण), सामवेद, अथर्ववेद
 * Sub-branches: extant/major shakhas for each Veda.
 *
 * Shakha set (confirmed):
 *   Ṛgveda       → Śākala, Bāṣkala
 *   Śukla Yajur  → Mādhyandina, Kāṇva
 *   Kṛṣṇa Yajur → Taittirīya, Maitrāyaṇī, Kaṭha
 *   Sāmaveda     → Kauthuma, Rāṇāyanīya, Jaiminīya
 *   Atharvaveda   → Śaunaka, Paippalāda
 *
 * Style: line art in deep indigo on ivory; gold accents on leaf nodes.
 * Accessible with <title> and <desc>.
 */

const INDIGO = '#2E2A5D';
const INDIGO_LIGHT = '#5D5799';
const GOLD = '#B8860B';
const GOLD_MUTED = '#D4A01744';
const IVORY_DARK = '#EDE5D0';

interface LeafProps {
  cx: number;
  cy: number;
  label: string;
  english?: string;
  anchor?: 'start' | 'middle' | 'end';
}

function Leaf({ cx, cy, label, english, anchor = 'middle' }: LeafProps) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={GOLD} opacity={0.7} />
      <text
        x={cx}
        y={cy - 14}
        textAnchor={anchor}
        style={{ fontFamily: 'var(--font-noto-serif-devanagari, serif)', fontSize: 15, fill: INDIGO }}
      >
        {label}
      </text>
      {english && (
        <text
          x={cx}
          y={cy - 0}
          textAnchor={anchor}
          style={{ fontFamily: 'var(--font-inter, sans-serif)', fontSize: 10, fill: INDIGO_LIGHT }}
        >
          {english}
        </text>
      )}
    </g>
  );
}

interface BranchLabelProps {
  x: number;
  y: number;
  label: string;
  english: string;
  size?: number;
}

function BranchLabel({ x, y, label, english, size = 20 }: BranchLabelProps) {
  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-noto-serif-devanagari, serif)', fontSize: size, fontWeight: 700, fill: INDIGO }}
      >
        {label}
      </text>
      <text
        x={x}
        y={y + size * 0.85}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-inter, sans-serif)', fontSize: size * 0.52, fill: INDIGO_LIGHT, fontStyle: 'italic' }}
      >
        {english}
      </text>
    </g>
  );
}

export function VedaVruksha({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 880 680"
      className={`w-full max-w-3xl mx-auto ${className}`}
      role="img"
      aria-labelledby="vruksha-title vruksha-desc"
    >
      <title id="vruksha-title">Veda Vruksha — The Tree of Vedic Knowledge</title>
      <desc id="vruksha-desc">
        A diagram of the four Vedas (Rigveda, Yajurveda, Samaveda, Atharvaveda)
        and their major shakhas (recension branches), depicted as a tree
        with the Veda as its root and trunk.
      </desc>

      {/* ── Roots ── */}
      <g opacity={0.5}>
        <path d="M 440,600 Q 420,640 380,660" stroke={INDIGO_LIGHT} strokeWidth={3} fill="none" />
        <path d="M 440,600 Q 460,640 500,660" stroke={INDIGO_LIGHT} strokeWidth={3} fill="none" />
        <path d="M 440,600 Q 440,645 440,665" stroke={INDIGO_LIGHT} strokeWidth={3} fill="none" />
        <path d="M 440,600 Q 410,650 350,670" stroke={INDIGO_LIGHT} strokeWidth={2} fill="none" />
        <path d="M 440,600 Q 470,650 530,670" stroke={INDIGO_LIGHT} strokeWidth={2} fill="none" />
      </g>

      {/* ── Trunk ── */}
      <path
        d="M 440,600 C 440,540 438,460 440,380"
        stroke={INDIGO}
        strokeWidth={12}
        fill="none"
        strokeLinecap="round"
      />
      {/* Slight bark texture lines */}
      <path d="M 435,550 Q 437,520 434,490" stroke={INDIGO_LIGHT} strokeWidth={1} fill="none" opacity={0.3} />
      <path d="M 446,570 Q 444,530 446,500" stroke={INDIGO_LIGHT} strokeWidth={1} fill="none" opacity={0.3} />

      {/* ── Main branch: ऋग्वेद (far left) ── */}
      <path
        d="M 440,380 C 420,340 300,280 170,210"
        stroke={INDIGO}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      <BranchLabel x={165} y={200} label="ऋग्वेद" english="Ṛgveda" />
      {/* Shakha sub-branches */}
      <path d="M 170,210 C 155,190 120,155 95,130" stroke={INDIGO} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M 170,210 C 180,185 200,155 215,125" stroke={INDIGO} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Leaf cx={95} cy={120} label="शाकल" english="Śākala" />
      <Leaf cx={215} cy={115} label="बाष्कल" english="Bāṣkala" />
      {/* Decorative leaves */}
      <ellipse cx={130} cy={175} rx={12} ry={7} fill={GOLD_MUTED} transform="rotate(-30 130 175)" />
      <ellipse cx={200} cy={165} rx={10} ry={6} fill={GOLD_MUTED} transform="rotate(-15 200 165)" />

      {/* ── Main branch: यजुर्वेद (center-left) ── */}
      <path
        d="M 440,380 C 430,340 380,290 340,230"
        stroke={INDIGO}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      <BranchLabel x={340} y={225} label="यजुर्वेद" english="Yajurveda" size={18} />

      {/* शुक्ल sub-branch */}
      <path d="M 340,230 C 320,210 280,180 260,145" stroke={INDIGO} strokeWidth={5} fill="none" strokeLinecap="round" />
      <text
        x={260} y={140}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-noto-serif-devanagari, serif)', fontSize: 13, fill: INDIGO_LIGHT, fontStyle: 'italic' }}
      >
        शुक्ल
      </text>
      <path d="M 260,145 C 245,125 225,105 215,82" stroke={INDIGO} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M 260,145 C 270,125 285,105 295,82" stroke={INDIGO} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <Leaf cx={215} cy={72} label="माध्यन्दिन" english="Mādhyandina" />
      <Leaf cx={295} cy={72} label="काण्व" english="Kāṇva" />

      {/* कृष्ण sub-branch */}
      <path d="M 340,230 C 355,200 380,170 400,140" stroke={INDIGO} strokeWidth={5} fill="none" strokeLinecap="round" />
      <text
        x={400} y={135}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-noto-serif-devanagari, serif)', fontSize: 13, fill: INDIGO_LIGHT, fontStyle: 'italic' }}
      >
        कृष्ण
      </text>
      <path d="M 400,140 C 375,115 350,90 340,65" stroke={INDIGO} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M 400,140 C 400,115 405,90 405,65" stroke={INDIGO} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M 400,140 C 420,115 445,90 460,65" stroke={INDIGO} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <Leaf cx={340} cy={55} label="तैत्तिरीय" english="Taittirīya" />
      <Leaf cx={405} cy={55} label="मैत्रायणी" english="Maitrāyaṇī" />
      <Leaf cx={460} cy={55} label="कठ" english="Kaṭha" />
      {/* Decorative leaves */}
      <ellipse cx={310} cy={190} rx={10} ry={6} fill={GOLD_MUTED} transform="rotate(-40 310 190)" />
      <ellipse cx={385} cy={180} rx={10} ry={6} fill={GOLD_MUTED} transform="rotate(10 385 180)" />

      {/* ── Main branch: सामवेद (center-right) ── */}
      <path
        d="M 440,380 C 460,340 520,290 570,230"
        stroke={INDIGO}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      <BranchLabel x={575} y={225} label="सामवेद" english="Sāmaveda" size={18} />
      {/* Shakha sub-branches */}
      <path d="M 570,230 C 545,200 520,165 510,130" stroke={INDIGO} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M 570,230 C 570,195 575,165 575,130" stroke={INDIGO} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M 570,230 C 595,195 625,165 640,130" stroke={INDIGO} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Leaf cx={510} cy={120} label="कौथुम" english="Kauthuma" />
      <Leaf cx={575} cy={120} label="राणायनीय" english="Rāṇāyanīya" />
      <Leaf cx={640} cy={120} label="जैमिनीय" english="Jaiminīya" />
      {/* Decorative leaves */}
      <ellipse cx={545} cy={185} rx={10} ry={6} fill={GOLD_MUTED} transform="rotate(25 545 185)" />
      <ellipse cx={605} cy={175} rx={10} ry={6} fill={GOLD_MUTED} transform="rotate(40 605 175)" />

      {/* ── Main branch: अथर्ववेद (far right) ── */}
      <path
        d="M 440,380 C 470,340 590,280 720,210"
        stroke={INDIGO}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      <BranchLabel x={720} y={200} label="अथर्ववेद" english="Atharvaveda" />
      {/* Shakha sub-branches */}
      <path d="M 720,210 C 695,185 665,155 650,125" stroke={INDIGO} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M 720,210 C 740,185 765,155 780,125" stroke={INDIGO} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Leaf cx={650} cy={115} label="शौनक" english="Śaunaka" />
      <Leaf cx={780} cy={115} label="पैप्पलाद" english="Paippalāda" />
      {/* Decorative leaves */}
      <ellipse cx={690} cy={170} rx={12} ry={7} fill={GOLD_MUTED} transform="rotate(25 690 170)" />
      <ellipse cx={755} cy={165} rx={10} ry={6} fill={GOLD_MUTED} transform="rotate(15 755 165)" />

      {/* ── Root label: वेदः ── */}
      <rect x={380} y={600} width={120} height={40} rx={6} fill={IVORY_DARK} stroke={GOLD} strokeWidth={1.5} />
      <text
        x={440} y={627}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-noto-serif-devanagari, serif)', fontSize: 22, fontWeight: 700, fill: INDIGO }}
      >
        वेदः
      </text>

      {/* ── Manu Smriti reference ── */}
      <text
        x={440} y={665}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-noto-serif-devanagari, serif)', fontSize: 14, fill: INDIGO_LIGHT }}
      >
        ॥ वेदोऽखिलो धर्ममूलम् ॥
      </text>
    </svg>
  );
}
