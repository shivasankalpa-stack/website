/**
 * Vedic Knowledge Map — the Veda by śākhā.
 *
 * Model:
 *   Veda → śākhā (a "collection") → the books that śākhā actually carries,
 *   in reading order: saṃhitā → (padapāṭha) → brāhmaṇa → āraṇyaka → upaniṣad,
 *   then the limbs that belong to that śākhā (prātiśākhya, kalpa-sūtras).
 *
 * Every text has exactly one `home` collection. When another śākhā shares
 * the book, its path lists the same id and the UI renders it as a link to
 * the home path — never a duplicate catalogue entry.
 *
 * Books without an open, verifiable source are not placed on a path; they
 * are named in that collection's `notOnPath` notes instead.
 *
 * Every URL here was checked by hand (HTTP 200 and content matches). Do not
 * add links that have not been opened and read.
 */

export type MapLocale = 'en' | 'kn';
export type L = { en: string; kn: string };

export type VedaId = 'rig' | 'yajur' | 'sama' | 'atharva';

export type Layer =
  | 'samhita'
  | 'padapatha'
  | 'brahmana'
  | 'aranyaka'
  | 'upanishad'
  | 'pratishakhya'
  | 'shrauta'
  | 'grhya'
  | 'dharma'
  | 'shulba'
  | 'anga';

export const SHRUTI_LAYERS: Layer[] = ['samhita', 'padapatha', 'brahmana', 'aranyaka', 'upanishad'];

/**
 * listen     — recitation audio / video
 * read       — the text itself, in Devanagari, on the page
 * readListen — both of the above
 * guide      — introduction, structure and published editions
 * etext      — machine-readable Sanskrit e-text
 * bhashya    — text together with a commentary
 * scan       — scanned printed edition
 */
export type SourceKind = 'listen' | 'read' | 'readListen' | 'guide' | 'etext' | 'bhashya' | 'scan';
export type Repo = 'vhp' | 'gretil' | 'sd' | 'archive';

export interface Source {
  kind: SourceKind;
  repo: Repo;
  url: string;
  note?: L;
}

export interface VedicText {
  id: string;
  home: string;
  layer: Layer;
  name: L;
  sa: string;
  about: L;
  within?: L;
  related?: string[];
  sources: Source[];
}

export interface Collection {
  slug: string;
  veda?: VedaId;
  branch?: 'shukla' | 'krishna';
  name: L;
  sa: string;
  intro: L;
  path: string[];
  notOnPath: L[];
}

export interface Veda {
  id: VedaId;
  name: L;
  sa: string;
  gist: L;
  branches: Array<{ id: 'shukla' | 'krishna' | 'all'; name?: L; sa?: string; collections: string[] }>;
}

export interface RepoInfo {
  id: Repo;
  name: string;
  url: string;
  about: L;
}

const vhp = (path: string) => `https://vedicheritage.gov.in/${path}`;
const gretil = (file: string) =>
  `https://gretil.sub.uni-goettingen.de/gretil/corpustei/transformations/html/${file}.htm`;
const gretilVeda = (path: string) => `https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/1_veda/${path}`;
const SD_VEDA = 'https://sanskritdocuments.org/doc_veda/';

const SHIKSHA_PAGE: Source = { kind: 'guide', repo: 'vhp', url: vhp('vedangas/shiksha/') };
const SHANKARA: L = { en: 'with the bhāṣya ascribed to Śaṅkara', kn: 'ಶಂಕರರದೆಂದು ಪರಿಗಣಿತ ಭಾಷ್ಯದೊಂದಿಗೆ' };

export const REPOS: RepoInfo[] = [
  {
    id: 'vhp',
    name: 'Vedic Heritage Portal',
    url: 'https://vedicheritage.gov.in/',
    about: {
      en: 'IGNCA, Ministry of Culture. Recitations by śākhā, introductions to each book, published editions and a manuscript search.',
      kn: 'IGNCA, ಸಂಸ್ಕೃತಿ ಸಚಿವಾಲಯ. ಶಾಖಾವಾರು ಪಠಣಗಳು, ಪ್ರತಿ ಗ್ರಂಥದ ಪರಿಚಯ, ಪ್ರಕಟಿತ ಆವೃತ್ತಿಗಳು ಮತ್ತು ಹಸ್ತಪ್ರತಿ ಹುಡುಕಾಟ.',
    },
  },
  {
    id: 'gretil',
    name: 'GRETIL',
    url: 'https://gretil.sub.uni-goettingen.de/gretil.html',
    about: {
      en: 'Göttingen Register of Electronic Texts in Indian Languages. Scholarly Sanskrit e-texts, several with their bhāṣyas.',
      kn: 'ಗೊಟ್ಟಿಂಗೆನ್ ವಿಶ್ವವಿದ್ಯಾಲಯದ ಭಾರತೀಯ ಭಾಷಾ ಇ-ಪಠ್ಯ ಸಂಗ್ರಹ. ವಿದ್ವತ್ಪೂರ್ಣ ಸಂಸ್ಕೃತ ಪಠ್ಯಗಳು, ಹಲವು ಭಾಷ್ಯಸಹಿತ.',
    },
  },
  {
    id: 'sd',
    name: 'Sanskrit Documents',
    url: 'https://sanskritdocuments.org/doc_veda/',
    about: {
      en: 'Volunteer-typeset Vedic texts with svara marks, including the Taittirīya books and the Kauthuma Sāmaveda.',
      kn: 'ಸ್ವಯಂಸೇವಕರು ಸ್ವರಸಹಿತವಾಗಿ ಟೈಪ್ ಮಾಡಿದ ವೈದಿಕ ಪಠ್ಯಗಳು — ತೈತ್ತಿರೀಯ ಗ್ರಂಥಗಳು ಮತ್ತು ಕೌಥುಮ ಸಾಮವೇದ ಸಹಿತ.',
    },
  },
  {
    id: 'archive',
    name: 'Internet Archive',
    url: 'https://archive.org/',
    about: {
      en: 'Scans of classic printed editions, such as Sāyaṇa’s Ṛgveda bhāṣya.',
      kn: 'ಸಾಯಣರ ಋಗ್ವೇದ ಭಾಷ್ಯದಂತಹ ಪ್ರಾಚೀನ ಮುದ್ರಿತ ಆವೃತ್ತಿಗಳ ಸ್ಕ್ಯಾನ್‌ಗಳು.',
    },
  },
];

export const VEDAS: Veda[] = [
  {
    id: 'rig',
    name: { en: 'Ṛgveda', kn: 'ಋಗ್ವೇದ' },
    sa: 'ऋग्वेदः',
    gist: {
      en: 'Ṛk — the hymns of praise, recited by the hotṛ.',
      kn: 'ಋಕ್ — ಸ್ತುತಿ ಮಂತ್ರಗಳು, ಹೋತೃವಿನಿಂದ ಪಠಿತ.',
    },
    branches: [{ id: 'all', collections: ['shakala', 'shankhayana'] }],
  },
  {
    id: 'yajur',
    name: { en: 'Yajurveda', kn: 'ಯಜುರ್ವೇದ' },
    sa: 'यजुर्वेदः',
    gist: {
      en: 'Yajus — the formulas of the sacrifice, recited by the adhvaryu.',
      kn: 'ಯಜುಸ್ — ಯಜ್ಞದ ಮಂತ್ರಗಳು, ಅಧ್ವರ್ಯುವಿನಿಂದ ಪಠಿತ.',
    },
    branches: [
      {
        id: 'shukla',
        name: { en: 'Śukla', kn: 'ಶುಕ್ಲ' },
        sa: 'शुक्ल',
        collections: ['madhyandina', 'kanva'],
      },
      {
        id: 'krishna',
        name: { en: 'Kṛṣṇa', kn: 'ಕೃಷ್ಣ' },
        sa: 'कृष्ण',
        collections: ['taittiriya', 'maitrayani', 'katha'],
      },
    ],
  },
  {
    id: 'sama',
    name: { en: 'Sāmaveda', kn: 'ಸಾಮವೇದ' },
    sa: 'सामवेदः',
    gist: {
      en: 'Sāman — the ṛk set to melody, sung by the udgātṛ.',
      kn: 'ಸಾಮ — ರಾಗಕ್ಕೆ ಅಳವಡಿಸಿದ ಋಕ್, ಉದ್ಗಾತೃವಿನಿಂದ ಗಾನ.',
    },
    branches: [{ id: 'all', collections: ['kauthuma', 'ranayaniya', 'jaiminiya'] }],
  },
  {
    id: 'atharva',
    name: { en: 'Atharvaveda', kn: 'ಅಥರ್ವವೇದ' },
    sa: 'अथर्ववेदः',
    gist: {
      en: 'Atharvāṅgiras — protection, healing and the household; the Veda of the brahman priest.',
      kn: 'ಅಥರ್ವಾಂಗಿರಸ — ರಕ್ಷಣೆ, ಆರೋಗ್ಯ ಮತ್ತು ಗೃಹಜೀವನ; ಬ್ರಹ್ಮ ಋತ್ವಿಜನ ವೇದ.',
    },
    branches: [{ id: 'all', collections: ['shaunaka', 'paippalada'] }],
  },
];

export const TEXTS: VedicText[] = [
  // ── Ṛgveda · Śākala ──
  {
    id: 'rigveda-samhita',
    home: 'shakala',
    layer: 'samhita',
    name: { en: 'Ṛgveda Saṃhitā', kn: 'ಋಗ್ವೇದ ಸಂಹಿತಾ' },
    sa: 'ऋग्वेदसंहिता',
    about: {
      en: 'The oldest layer of the Veda: 1,028 sūktas in ten maṇḍalas, addressed to Agni, Indra, Soma and the other devatās. The Śākala recension is the one recited today, in both maṇḍala and aṣṭaka order.',
      kn: 'ವೇದದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಭಾಗ: ಹತ್ತು ಮಂಡಲಗಳಲ್ಲಿ 1,028 ಸೂಕ್ತಗಳು — ಅಗ್ನಿ, ಇಂದ್ರ, ಸೋಮ ಮೊದಲಾದ ದೇವತೆಗಳ ಸ್ತುತಿ. ಇಂದು ಪಠಿಸಲ್ಪಡುವುದು ಶಾಕಲ ಸಂಹಿತೆ — ಮಂಡಲ ಮತ್ತು ಅಷ್ಟಕ ಕ್ರಮಗಳೆರಡರಲ್ಲೂ.',
    },
    sources: [
      {
        kind: 'listen',
        repo: 'vhp',
        url: vhp('samhitas/rigveda/shakala-samhita/mandal-01/'),
        note: { en: 'Kerala tradition, maṇḍala by maṇḍala', kn: 'ಕೇರಳ ಸಂಪ್ರದಾಯ, ಮಂಡಲವಾರು' },
      },
      {
        kind: 'listen',
        repo: 'vhp',
        url: vhp('samhitas/rigveda/shakala-samhita/maharashtra-tradition/'),
        note: { en: 'Maharashtra tradition', kn: 'ಮಹಾರಾಷ್ಟ್ರ ಸಂಪ್ರದಾಯ' },
      },
      {
        kind: 'etext',
        repo: 'gretil',
        url: gretil('sa_Rgveda-edAufrecht'),
        note: { en: 'Accented, Aufrecht’s edition', kn: 'ಸ್ವರಸಹಿತ, ಆಫ್ರೆಕ್ಟ್ ಆವೃತ್ತಿ' },
      },
      {
        kind: 'scan',
        repo: 'archive',
        url: 'https://archive.org/details/rigvedasanhitasa01syaauoft',
        note: { en: 'With Sāyaṇa’s bhāṣya — Max Müller ed., vol. 1', kn: 'ಸಾಯಣ ಭಾಷ್ಯಸಹಿತ — ಮ್ಯಾಕ್ಸ್ ಮುಲ್ಲರ್ ಆವೃತ್ತಿ, ಸಂಪುಟ 1' },
      },
    ],
  },
  {
    id: 'rigveda-padapatha',
    home: 'shakala',
    layer: 'padapatha',
    name: { en: 'Ṛgveda Padapāṭha', kn: 'ಋಗ್ವೇದ ಪದಪಾಠ' },
    sa: 'ऋग्वेदपदपाठः',
    about: {
      en: 'Śākalya’s word-by-word form of the saṃhitā, with every sandhi undone. It is the base for the krama, jaṭā and ghana recitations that have protected the text letter for letter.',
      kn: 'ಶಾಕಲ್ಯರ ಪದಪಾಠ — ಸಂಧಿಗಳನ್ನು ಬಿಡಿಸಿ ಪ್ರತಿ ಪದವನ್ನೂ ಪ್ರತ್ಯೇಕಿಸಿದ ಸಂಹಿತೆ. ಪಠ್ಯವನ್ನು ಅಕ್ಷರಶಃ ಕಾಪಾಡಿರುವ ಕ್ರಮ, ಜಟಾ, ಘನ ಪಾಠಗಳಿಗೆ ಇದೇ ಆಧಾರ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_RgvedasaMhitApadapATha') }],
  },
  {
    id: 'aitareya-brahmana',
    home: 'shakala',
    layer: 'brahmana',
    name: { en: 'Aitareya Brāhmaṇa', kn: 'ಐತರೇಯ ಬ್ರಾಹ್ಮಣ' },
    sa: 'ऐतरेयब्राह्मणम्',
    about: {
      en: 'Ascribed to Mahidāsa Aitareya. Eight pañcikās of five adhyāyas each: the first six explain the soma sacrifice from the hotṛ’s side, the last two the royal consecration (rājyābhiṣeka).',
      kn: 'ಮಹಿದಾಸ ಐತರೇಯರಿಗೆ ಆರೋಪಿತ. ಎಂಟು ಪಂಚಿಕೆಗಳು, ಪ್ರತಿಯೊಂದರಲ್ಲಿ ಐದು ಅಧ್ಯಾಯಗಳು: ಮೊದಲ ಆರು ಹೋತೃವಿನ ದೃಷ್ಟಿಯಿಂದ ಸೋಮಯಾಗವನ್ನು ವಿವರಿಸುತ್ತವೆ, ಕೊನೆಯ ಎರಡು ರಾಜ್ಯಾಭಿಷೇಕವನ್ನು.',
    },
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('brahmanas/aitareya-brahmana/') }],
  },
  {
    id: 'aitareya-aranyaka',
    home: 'shakala',
    layer: 'aranyaka',
    name: { en: 'Aitareya Āraṇyaka', kn: 'ಐತರೇಯ ಆರಣ್ಯಕ' },
    sa: 'ऐतरेयारण्यकम्',
    about: {
      en: 'Five āraṇyakas, studied away from the village. Its second āraṇyaka turns from ritual to the prāṇa and the Self, and contains the Aitareya Upaniṣad.',
      kn: 'ಐದು ಆರಣ್ಯಕಗಳು — ಗ್ರಾಮದಿಂದ ದೂರ ಅಧ್ಯಯನ ಮಾಡುವ ಭಾಗ. ಎರಡನೆಯ ಆರಣ್ಯಕ ಕರ್ಮದಿಂದ ಪ್ರಾಣ ಮತ್ತು ಆತ್ಮದೆಡೆಗೆ ತಿರುಗುತ್ತದೆ; ಐತರೇಯ ಉಪನಿಷತ್ತು ಇದರೊಳಗಿದೆ.',
    },
    related: ['aitareya-upanishad'],
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('aranyakas/aitareyaranyaka/') }],
  },
  {
    id: 'aitareya-upanishad',
    home: 'shakala',
    layer: 'upanishad',
    name: { en: 'Aitareya Upaniṣad', kn: 'ಐತರೇಯ ಉಪನಿಷತ್' },
    sa: 'ऐतरेयोपनिषत्',
    within: { en: 'Aitareya Āraṇyaka, āraṇyaka 2', kn: 'ಐತರೇಯ ಆರಣ್ಯಕ, 2ನೇ ಆರಣ್ಯಕ' },
    about: {
      en: 'Three short chapters: the Self alone was in the beginning, and brought forth the worlds and the person. It closes with the mahāvākya “prajñānaṃ brahma”.',
      kn: 'ಮೂರು ಚಿಕ್ಕ ಅಧ್ಯಾಯಗಳು: ಆದಿಯಲ್ಲಿ ಆತ್ಮವೊಂದೇ ಇತ್ತು, ಅದು ಲೋಕಗಳನ್ನೂ ಪುರುಷನನ್ನೂ ಸೃಷ್ಟಿಸಿತು. “ಪ್ರಜ್ಞಾನಂ ಬ್ರಹ್ಮ” ಎಂಬ ಮಹಾವಾಕ್ಯದೊಂದಿಗೆ ಮುಗಿಯುತ್ತದೆ.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('upanishads/aitareyopanishad/') },
      { kind: 'bhashya', repo: 'gretil', url: gretil('sa_aitareyopaniSad-comm'), note: SHANKARA },
    ],
  },
  {
    id: 'rk-pratishakhya',
    home: 'shakala',
    layer: 'pratishakhya',
    name: { en: 'Ṛk Prātiśākhya', kn: 'ಋಕ್ ಪ್ರಾತಿಶಾಖ್ಯ' },
    sa: 'ऋक्प्रातिशाख्यम्',
    about: {
      en: 'The phonetic manual of the Śākala school, attributed to Śaunaka: sounds, accent, and the rules that turn the padapāṭha back into the saṃhitā. Its closing chapters are also a source for Chandas.',
      kn: 'ಶಾಕಲ ಶಾಖೆಯ ಧ್ವನಿಶಾಸ್ತ್ರ ಗ್ರಂಥ, ಶೌನಕರಿಗೆ ಆರೋಪಿತ: ವರ್ಣಗಳು, ಸ್ವರ, ಮತ್ತು ಪದಪಾಠವನ್ನು ಮತ್ತೆ ಸಂಹಿತೆಯಾಗಿಸುವ ನಿಯಮಗಳು. ಇದರ ಕೊನೆಯ ಅಧ್ಯಾಯಗಳು ಛಂದಸ್ಸಿಗೂ ಆಧಾರ.',
    },
    sources: [SHIKSHA_PAGE],
  },
  {
    id: 'ashvalayana-shrauta',
    home: 'shakala',
    layer: 'shrauta',
    name: { en: 'Āśvalāyana Śrautasūtra', kn: 'ಆಶ್ವಲಾಯನ ಶ್ರೌತಸೂತ್ರ' },
    sa: 'आश्वलायनश्रौतसूत्रम्',
    about: {
      en: 'The hotṛ’s manual for the great śrauta sacrifices in the Śākala tradition — which ṛks are recited, when, and how.',
      kn: 'ಶಾಕಲ ಸಂಪ್ರದಾಯದಲ್ಲಿ ಶ್ರೌತಯಾಗಗಳಿಗೆ ಹೋತೃವಿನ ಕೈಪಿಡಿ — ಯಾವ ಋಕ್, ಯಾವಾಗ, ಹೇಗೆ ಪಠಿಸಬೇಕು.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_AzvalAyanazrautasUtra') }],
  },
  {
    id: 'ashvalayana-grhya',
    home: 'shakala',
    layer: 'grhya',
    name: { en: 'Āśvalāyana Gṛhyasūtra', kn: 'ಆಶ್ವಲಾಯನ ಗೃಹ್ಯಸೂತ್ರ' },
    sa: 'आश्वलायनगृह्यसूत्रम्',
    about: {
      en: 'The domestic rites of Ṛgvedins: the saṃskāras from birth through upanayana and vivāha, and the daily offerings of the household fire.',
      kn: 'ಋಗ್ವೇದಿಗಳ ಗೃಹ್ಯಕರ್ಮಗಳು: ಜನನದಿಂದ ಉಪನಯನ, ವಿವಾಹದವರೆಗಿನ ಸಂಸ್ಕಾರಗಳು ಮತ್ತು ಗೃಹ್ಯಾಗ್ನಿಯ ನಿತ್ಯ ಹೋಮಗಳು.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_AzvalAyanagRhyasUtra') }],
  },
  {
    id: 'vasishtha-dharma',
    home: 'shakala',
    layer: 'dharma',
    name: { en: 'Vāsiṣṭha Dharmasūtra', kn: 'ವಾಸಿಷ್ಠ ಧರ್ಮಸೂತ್ರ' },
    sa: 'वासिष्ठधर्मसूत्रम्',
    about: {
      en: 'Traditionally associated with the Ṛgveda. Sources of dharma, the āśramas, conduct and expiation.',
      kn: 'ಸಂಪ್ರದಾಯದಲ್ಲಿ ಋಗ್ವೇದಕ್ಕೆ ಸಂಬಂಧಿಸಿದ್ದು. ಧರ್ಮದ ಮೂಲಗಳು, ಆಶ್ರಮಗಳು, ಆಚಾರ ಮತ್ತು ಪ್ರಾಯಶ್ಚಿತ್ತ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_vAsiSThadharmasUtra') }],
  },

  // ── Ṛgveda · Śāṅkhāyana (Kauṣītaki) ──
  {
    id: 'kaushitaki-brahmana',
    home: 'shankhayana',
    layer: 'brahmana',
    name: { en: 'Kauṣītaki Brāhmaṇa', kn: 'ಕೌಷೀತಕಿ ಬ್ರಾಹ್ಮಣ' },
    sa: 'कौषीतकिब्राह्मणम्',
    about: {
      en: 'Also called the Śāṅkhāyana Brāhmaṇa. Thirty adhyāyas on the hotṛ’s part in the sacrifices — the second Ṛgvedic brāhmaṇa, parallel to the Aitareya.',
      kn: 'ಶಾಂಖಾಯನ ಬ್ರಾಹ್ಮಣ ಎಂದೂ ಹೆಸರು. ಯಜ್ಞಗಳಲ್ಲಿ ಹೋತೃವಿನ ಪಾತ್ರ ಕುರಿತು ಮೂವತ್ತು ಅಧ್ಯಾಯಗಳು — ಐತರೇಯಕ್ಕೆ ಸಮಾನಾಂತರವಾದ ಎರಡನೆಯ ಋಗ್ವೇದೀಯ ಬ್ರಾಹ್ಮಣ.',
    },
    sources: [
      { kind: 'listen', repo: 'vhp', url: vhp('brahmanas/kausitaki-shankhyayana-brahmana/') },
      { kind: 'etext', repo: 'gretil', url: gretil('sa_kauSItakibrAhmaNa') },
    ],
  },
  {
    id: 'shankhayana-aranyaka',
    home: 'shankhayana',
    layer: 'aranyaka',
    name: { en: 'Śāṅkhāyana Āraṇyaka', kn: 'ಶಾಂಖಾಯನ ಆರಣ್ಯಕ' },
    sa: 'शाङ्खायनारण्यकम्',
    about: {
      en: 'Fifteen adhyāyas. Adhyāyas 3–6 are the Kauṣītaki Upaniṣad — Citra’s questions, Pratardana and Indra, and Ajātaśatru’s teaching to Bālāki — so this is where to read it.',
      kn: 'ಹದಿನೈದು ಅಧ್ಯಾಯಗಳು. 3–6ನೇ ಅಧ್ಯಾಯಗಳೇ ಕೌಷೀತಕಿ ಉಪನಿಷತ್ — ಚಿತ್ರನ ಪ್ರಶ್ನೆಗಳು, ಪ್ರತರ್ದನ ಮತ್ತು ಇಂದ್ರ, ಅಜಾತಶತ್ರು ಬಾಲಾಕಿಗೆ ಮಾಡಿದ ಉಪದೇಶ. ಆ ಉಪನಿಷತ್ತನ್ನು ಇಲ್ಲಿಯೇ ಓದಬಹುದು.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('aranyakas/sankhyayana-aranyaka/') },
      { kind: 'etext', repo: 'gretil', url: gretil('sa_zaGkhAyana-AraNyaka') },
    ],
  },
  {
    id: 'shankhayana-shrauta',
    home: 'shankhayana',
    layer: 'shrauta',
    name: { en: 'Śāṅkhāyana Śrautasūtra', kn: 'ಶಾಂಖಾಯನ ಶ್ರೌತಸೂತ್ರ' },
    sa: 'शाङ्खायनश्रौतसूत्रम्',
    about: {
      en: 'The hotṛ’s śrauta manual of this school, following the Kauṣītaki Brāhmaṇa. It also has a section on Vedic metre.',
      kn: 'ಈ ಶಾಖೆಯ ಹೋತೃ ಶ್ರೌತ ಕೈಪಿಡಿ, ಕೌಷೀತಕಿ ಬ್ರಾಹ್ಮಣವನ್ನು ಅನುಸರಿಸುತ್ತದೆ. ವೈದಿಕ ಛಂದಸ್ಸಿನ ಕುರಿತ ಭಾಗವೂ ಇದರಲ್ಲಿದೆ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_zAGkhAyanazrautasUtra') }],
  },
  {
    id: 'shankhayana-grhya',
    home: 'shankhayana',
    layer: 'grhya',
    name: { en: 'Śāṅkhāyana Gṛhyasūtra', kn: 'ಶಾಂಖಾಯನ ಗೃಹ್ಯಸೂತ್ರ' },
    sa: 'शाङ्खायनगृह्यसूत्रम्',
    about: {
      en: 'Domestic rites and saṃskāras as practised in the Kauṣītaki tradition.',
      kn: 'ಕೌಷೀತಕಿ ಸಂಪ್ರದಾಯದಲ್ಲಿ ಆಚರಿಸುವ ಗೃಹ್ಯಕರ್ಮಗಳು ಮತ್ತು ಸಂಸ್ಕಾರಗಳು.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_zAGkhAyanagRhyasUtra') }],
  },

  // ── Śukla Yajurveda · Mādhyandina ──
  {
    id: 'vajasaneyi-madhyandina',
    home: 'madhyandina',
    layer: 'samhita',
    name: { en: 'Vājasaneyi Saṃhitā (Mādhyandina)', kn: 'ವಾಜಸನೇಯಿ ಸಂಹಿತಾ (ಮಾಧ್ಯಂದಿನ)' },
    sa: 'वाजसनेयिसंहिता (माध्यन्दिन)',
    about: {
      en: 'Forty adhyāyas of yajus received by Yājñavalkya. Adhyāya 16 is the Rudrādhyāya of the Śukla tradition; 34.1–6 is the Śivasaṅkalpa sūkta — “tan me manaḥ śivasaṅkalpam astu” — from which this trust takes its name; adhyāya 40 is the Īśa Upaniṣad.',
      kn: 'ಯಾಜ್ಞವಲ್ಕ್ಯರು ಪಡೆದ ಯಜುಸ್ಸುಗಳ ನಲವತ್ತು ಅಧ್ಯಾಯಗಳು. 16ನೇ ಅಧ್ಯಾಯ ಶುಕ್ಲ ಸಂಪ್ರದಾಯದ ರುದ್ರಾಧ್ಯಾಯ; 34.1–6 ಶಿವಸಂಕಲ್ಪ ಸೂಕ್ತ — “ತನ್ಮೇ ಮನಃ ಶಿವಸಂಕಲ್ಪಮಸ್ತು” — ಈ ಟ್ರಸ್ಟಿನ ಹೆಸರು ಇದರಿಂದಲೇ; 40ನೇ ಅಧ್ಯಾಯ ಈಶೋಪನಿಷತ್.',
    },
    related: ['ishavasya-upanishad'],
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('samhitas/yajurveda/vajasneyi-madhyandina-samhita/') },
      {
        kind: 'etext',
        repo: 'gretil',
        url: gretil('sa_zivasaMkalpopaniSad'),
        note: {
          en: 'Śivasaṅkalpa Upaniṣad — the 28-verse expansion of the VS 34 sūkta',
          kn: 'ಶಿವಸಂಕಲ್ಪೋಪನಿಷತ್ — ವಾಜಸನೇಯಿ 34ನೇ ಸೂಕ್ತದ 28 ಮಂತ್ರಗಳ ವಿಸ್ತರಣೆ',
        },
      },
    ],
  },
  {
    id: 'shatapatha-madhyandina',
    home: 'madhyandina',
    layer: 'brahmana',
    name: { en: 'Śatapatha Brāhmaṇa (Mādhyandina)', kn: 'ಶತಪಥ ಬ್ರಾಹ್ಮಣ (ಮಾಧ್ಯಂದಿನ)' },
    sa: 'शतपथब्राह्मणम् (माध्यन्दिन)',
    about: {
      en: 'The “hundred paths”: fourteen kāṇḍas, the largest brāhmaṇa, explaining the rites of the Vājasaneyi Saṃhitā in order. Its final kāṇḍa is the Bṛhadāraṇyaka.',
      kn: '“ನೂರು ಮಾರ್ಗಗಳು”: ಹದಿನಾಲ್ಕು ಕಾಂಡಗಳ ಅತಿ ದೊಡ್ಡ ಬ್ರಾಹ್ಮಣ; ವಾಜಸನೇಯಿ ಸಂಹಿತೆಯ ಕರ್ಮಗಳನ್ನು ಕ್ರಮವಾಗಿ ವಿವರಿಸುತ್ತದೆ. ಕೊನೆಯ ಕಾಂಡವೇ ಬೃಹದಾರಣ್ಯಕ.',
    },
    related: ['brhadaranyaka-upanishad'],
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('?p=8539') },
      {
        kind: 'etext',
        repo: 'gretil',
        url: gretilVeda('2_bra/satapath/sb_01_u.htm'),
        note: { en: 'Kāṇḍa 1; later kāṇḍas are listed on GRETIL', kn: 'ಕಾಂಡ 1; ಮುಂದಿನ ಕಾಂಡಗಳು GRETIL ಪಟ್ಟಿಯಲ್ಲಿ' },
      },
    ],
  },
  {
    id: 'vajasaneyi-pratishakhya',
    home: 'madhyandina',
    layer: 'pratishakhya',
    name: { en: 'Vājasaneyi Prātiśākhya', kn: 'ವಾಜಸನೇಯಿ ಪ್ರಾತಿಶಾಖ್ಯ' },
    sa: 'वाजसनेयिप्रातिशाख्यम्',
    about: {
      en: 'The phonetics of the Śukla Yajurveda, attributed to Kātyāyana, shared by the Mādhyandina and Kāṇva reciters.',
      kn: 'ಶುಕ್ಲ ಯಜುರ್ವೇದದ ಧ್ವನಿಶಾಸ್ತ್ರ, ಕಾತ್ಯಾಯನರಿಗೆ ಆರೋಪಿತ; ಮಾಧ್ಯಂದಿನ ಮತ್ತು ಕಾಣ್ವ ಪಾಠಕರಿಬ್ಬರಿಗೂ ಸಾಮಾನ್ಯ.',
    },
    sources: [SHIKSHA_PAGE],
  },

  // ── Śukla Yajurveda · Kāṇva ──
  {
    id: 'vajasaneyi-kanva',
    home: 'kanva',
    layer: 'samhita',
    name: { en: 'Vājasaneyi Saṃhitā (Kāṇva)', kn: 'ವಾಜಸನೇಯಿ ಸಂಹಿತಾ (ಕಾಣ್ವ)' },
    sa: 'वाजसनेयिसंहिता (काण्व)',
    about: {
      en: 'The Kāṇva recension of the same saṃhitā, in forty adhyāyas with its own readings and arrangement. Śaṅkara’s Īśa bhāṣya follows this text.',
      kn: 'ಅದೇ ಸಂಹಿತೆಯ ಕಾಣ್ವ ಪಾಠ — ತನ್ನದೇ ಪಾಠಭೇದ ಮತ್ತು ಜೋಡಣೆಯೊಂದಿಗೆ ನಲವತ್ತು ಅಧ್ಯಾಯಗಳು. ಶಂಕರರ ಈಶಾವಾಸ್ಯ ಭಾಷ್ಯ ಈ ಪಾಠವನ್ನು ಅನುಸರಿಸುತ್ತದೆ.',
    },
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('samhitas/yajurveda/vajasaneyi-kanva-samhita/') }],
  },
  {
    id: 'shatapatha-kanva',
    home: 'kanva',
    layer: 'brahmana',
    name: { en: 'Śatapatha Brāhmaṇa (Kāṇva)', kn: 'ಶತಪಥ ಬ್ರಾಹ್ಮಣ (ಕಾಣ್ವ)' },
    sa: 'शतपथब्राह्मणम् (काण्व)',
    about: {
      en: 'The same teaching in the Kāṇva arrangement of seventeen kāṇḍas. The Bṛhadāraṇyaka that Śaṅkara commented on is the close of this recension.',
      kn: 'ಅದೇ ಉಪದೇಶ, ಹದಿನೇಳು ಕಾಂಡಗಳ ಕಾಣ್ವ ಜೋಡಣೆಯಲ್ಲಿ. ಶಂಕರರು ಭಾಷ್ಯ ಬರೆದ ಬೃಹದಾರಣ್ಯಕ ಈ ಪಾಠದ ಅಂತಿಮ ಭಾಗ.',
    },
    related: ['brhadaranyaka-upanishad'],
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('brahmanas/kanva-shatapatha-brahmanas/') }],
  },
  {
    id: 'brhadaranyaka-upanishad',
    home: 'kanva',
    layer: 'upanishad',
    name: { en: 'Bṛhadāraṇyaka Upaniṣad', kn: 'ಬೃಹದಾರಣ್ಯಕ ಉಪನಿಷತ್' },
    sa: 'बृहदारण्यकोपनिषत्',
    within: { en: 'Śatapatha Brāhmaṇa, final kāṇḍa', kn: 'ಶತಪಥ ಬ್ರಾಹ್ಮಣ, ಅಂತಿಮ ಕಾಂಡ' },
    about: {
      en: 'The “great forest teaching” and the largest of the principal Upaniṣads — Yājñavalkya with Maitreyī, Gārgī and King Janaka; “neti neti”. Āraṇyaka and Upaniṣad here are one book. Both recensions are recited; Śaṅkara commented on the Kāṇva.',
      kn: '“ಮಹಾ ಅರಣ್ಯ ಉಪದೇಶ” — ಪ್ರಧಾನ ಉಪನಿಷತ್ತುಗಳಲ್ಲಿ ಅತಿ ದೊಡ್ಡದು. ಮೈತ್ರೇಯಿ, ಗಾರ್ಗಿ, ಜನಕರೊಂದಿಗೆ ಯಾಜ್ಞವಲ್ಕ್ಯ; “ನೇತಿ ನೇತಿ”. ಇಲ್ಲಿ ಆರಣ್ಯಕ ಮತ್ತು ಉಪನಿಷತ್ ಒಂದೇ ಗ್ರಂಥ. ಎರಡೂ ಪಾಠಗಳು ಪಠಿತ; ಶಂಕರರು ಕಾಣ್ವ ಪಾಠಕ್ಕೆ ಭಾಷ್ಯ ಬರೆದರು.',
    },
    sources: [
      { kind: 'listen', repo: 'vhp', url: vhp('upanishads/brihadaranyakopanishad/') },
      { kind: 'guide', repo: 'vhp', url: vhp('aranyakas/brihadaranyaka/'), note: { en: 'As an āraṇyaka', kn: 'ಆರಣ್ಯಕವಾಗಿ' } },
      {
        kind: 'bhashya',
        repo: 'gretil',
        url: gretil('sa_bRhadAraNyakopaniSadkANva-recension-comm'),
        note: { en: 'Kāṇva text, with the bhāṣya ascribed to Śaṅkara', kn: 'ಕಾಣ್ವ ಪಾಠ, ಶಂಕರರದೆಂದು ಪರಿಗಣಿತ ಭಾಷ್ಯದೊಂದಿಗೆ' },
      },
    ],
  },
  {
    id: 'ishavasya-upanishad',
    home: 'kanva',
    layer: 'upanishad',
    name: { en: 'Īśāvāsya Upaniṣad', kn: 'ಈಶಾವಾಸ್ಯ ಉಪನಿಷತ್' },
    sa: 'ईशावास्योपनिषत्',
    within: { en: 'Vājasaneyi Saṃhitā, adhyāya 40', kn: 'ವಾಜಸನೇಯಿ ಸಂಹಿತಾ, 40ನೇ ಅಧ್ಯಾಯ' },
    about: {
      en: 'Eighteen mantras — the only principal Upaniṣad that is itself part of a saṃhitā. “All this is to be covered by the Lord”: renunciation and action held together.',
      kn: 'ಹದಿನೆಂಟು ಮಂತ್ರಗಳು — ಸ್ವತಃ ಸಂಹಿತೆಯ ಭಾಗವಾಗಿರುವ ಏಕೈಕ ಪ್ರಧಾನ ಉಪನಿಷತ್. “ಈಶಾವಾಸ್ಯಮಿದಂ ಸರ್ವಮ್”: ತ್ಯಾಗ ಮತ್ತು ಕರ್ಮ ಜೊತೆಯಾಗಿ.',
    },
    sources: [
      { kind: 'readListen', repo: 'vhp', url: vhp('upanishads/ishavasyopanishad/') },
      {
        kind: 'bhashya',
        repo: 'gretil',
        url: gretil('sa_IzopaniSad-or-IzAvAsyopaniSadkANva-recension-comm'),
        note: { en: 'Kāṇva text, with the bhāṣya ascribed to Śaṅkara', kn: 'ಕಾಣ್ವ ಪಾಠ, ಶಂಕರರದೆಂದು ಪರಿಗಣಿತ ಭಾಷ್ಯದೊಂದಿಗೆ' },
      },
    ],
  },

  // ── Kṛṣṇa Yajurveda · Taittirīya ──
  {
    id: 'taittiriya-samhita',
    home: 'taittiriya',
    layer: 'samhita',
    name: { en: 'Taittirīya Saṃhitā', kn: 'ತೈತ್ತಿರೀಯ ಸಂಹಿತಾ' },
    sa: 'तैत्तिरीयसंहिता',
    about: {
      en: 'Seven kāṇḍas in which mantra and explanatory prose are woven together — the mark of the Kṛṣṇa Yajurveda. Kāṇḍa 4.5 is the Śrī Rudram (namakam) and 4.7 the camakam.',
      kn: 'ಮಂತ್ರ ಮತ್ತು ವಿವರಣಾತ್ಮಕ ಗದ್ಯ ಒಟ್ಟಿಗೆ ಹೆಣೆದಿರುವ ಏಳು ಕಾಂಡಗಳು — ಕೃಷ್ಣ ಯಜುರ್ವೇದದ ಲಕ್ಷಣ. 4.5 ಶ್ರೀರುದ್ರ (ನಮಕ), 4.7 ಚಮಕ.',
    },
    sources: [
      { kind: 'listen', repo: 'vhp', url: vhp('samhitas/yajurveda/taittiriya-samhita/'), note: { en: 'Audio', kn: 'ಧ್ವನಿ' } },
      { kind: 'listen', repo: 'vhp', url: vhp('samhitas/yajurveda/taittiriya-samhita-video/'), note: { en: 'Video', kn: 'ವೀಡಿಯೊ' } },
      {
        kind: 'etext',
        repo: 'sd',
        url: SD_VEDA,
        note: { en: 'Accented text — see “Taittiriya Samhita” in the list', kn: 'ಸ್ವರಸಹಿತ ಪಠ್ಯ — ಪಟ್ಟಿಯಲ್ಲಿ “Taittiriya Samhita”' },
      },
    ],
  },
  {
    id: 'taittiriya-brahmana',
    home: 'taittiriya',
    layer: 'brahmana',
    name: { en: 'Taittirīya Brāhmaṇa', kn: 'ತೈತ್ತಿರೀಯ ಬ್ರಾಹ್ಮಣ' },
    sa: 'तैत्तिरीयब्राह्मणम्',
    about: {
      en: 'Three aṣṭakas that carry on the saṃhitā’s ritual explanation, including the nakṣatra offerings. Its last sections preserve portions of the Kāṭhaka tradition.',
      kn: 'ಸಂಹಿತೆಯ ಕರ್ಮವಿವರಣೆಯನ್ನು ಮುಂದುವರಿಸುವ ಮೂರು ಅಷ್ಟಕಗಳು — ನಕ್ಷತ್ರೇಷ್ಟಿ ಸಹಿತ. ಇದರ ಕೊನೆಯ ಭಾಗಗಳು ಕಾಠಕ ಸಂಪ್ರದಾಯದ ಅಂಶಗಳನ್ನು ಉಳಿಸಿಕೊಂಡಿವೆ.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('brahmanas/taittiriya-brhamana/') },
      {
        kind: 'etext',
        repo: 'sd',
        url: SD_VEDA,
        note: { en: 'Accented text — see “Taittiriya Brahmanam”', kn: 'ಸ್ವರಸಹಿತ ಪಠ್ಯ — “Taittiriya Brahmanam” ನೋಡಿ' },
      },
    ],
  },
  {
    id: 'taittiriya-aranyaka',
    home: 'taittiriya',
    layer: 'aranyaka',
    name: { en: 'Taittirīya Āraṇyaka', kn: 'ತೈತ್ತಿರೀಯ ಆರಣ್ಯಕ' },
    sa: 'तैत्तिरीयारण्यकम्',
    about: {
      en: 'Ten prapāṭhakas: the Aruṇa praśna recited for sūrya namaskāra, the Mantrapuṣpa, and — as prapāṭhakas 7 to 10 — the Taittirīya and Mahānārāyaṇa Upaniṣads.',
      kn: 'ಹತ್ತು ಪ್ರಪಾಠಕಗಳು: ಸೂರ್ಯನಮಸ್ಕಾರಕ್ಕೆ ಪಠಿಸುವ ಅರುಣಪ್ರಶ್ನ, ಮಂತ್ರಪುಷ್ಪ, ಮತ್ತು 7ರಿಂದ 10ನೇ ಪ್ರಪಾಠಕಗಳಾಗಿ ತೈತ್ತಿರೀಯ ಹಾಗೂ ಮಹಾನಾರಾಯಣ ಉಪನಿಷತ್ತುಗಳು.',
    },
    related: ['taittiriya-upanishad'],
    sources: [
      { kind: 'listen', repo: 'vhp', url: vhp('aranyakas/taittiriya-aranyaka/') },
      {
        kind: 'etext',
        repo: 'sd',
        url: SD_VEDA,
        note: { en: 'Accented text — see “Taittiriya Aranyaka”', kn: 'ಸ್ವರಸಹಿತ ಪಠ್ಯ — “Taittiriya Aranyaka” ನೋಡಿ' },
      },
    ],
  },
  {
    id: 'taittiriya-upanishad',
    home: 'taittiriya',
    layer: 'upanishad',
    name: { en: 'Taittirīya Upaniṣad', kn: 'ತೈತ್ತಿರೀಯ ಉಪನಿಷತ್' },
    sa: 'तैत्तिरीयोपनिषत्',
    within: { en: 'Taittirīya Āraṇyaka, prapāṭhakas 7–9', kn: 'ತೈತ್ತಿರೀಯ ಆರಣ್ಯಕ, 7–9ನೇ ಪ್ರಪಾಠಕಗಳು' },
    about: {
      en: 'Three vallīs. The Śīkṣā vallī opens with a lesson in pronunciation and the convocation address to the departing student; the Brahmānanda and Bhṛgu vallīs lead from annam, food, to ānanda.',
      kn: 'ಮೂರು ವಲ್ಲಿಗಳು. ಶೀಕ್ಷಾವಲ್ಲಿ ಉಚ್ಚಾರಣಪಾಠದಿಂದ ಆರಂಭವಾಗಿ ಹೊರಡುವ ಶಿಷ್ಯನಿಗೆ ಮಾಡುವ ಸಮಾವರ್ತನ ಉಪದೇಶವನ್ನು ಒಳಗೊಂಡಿದೆ; ಬ್ರಹ್ಮಾನಂದ ಮತ್ತು ಭೃಗುವಲ್ಲಿಗಳು ಅನ್ನದಿಂದ ಆನಂದದವರೆಗೆ ಕರೆದೊಯ್ಯುತ್ತವೆ.',
    },
    sources: [
      { kind: 'readListen', repo: 'vhp', url: vhp('upanishads/taittiriya-upanishads/') },
      {
        kind: 'bhashya',
        repo: 'gretil',
        url: gretil('sa_taittirIyopaniSad-zaMkarabhASya'),
        note: { en: 'With Śaṅkara’s bhāṣya', kn: 'ಶಂಕರ ಭಾಷ್ಯಸಹಿತ' },
      },
    ],
  },
  {
    id: 'shvetashvatara-upanishad',
    home: 'taittiriya',
    layer: 'upanishad',
    name: { en: 'Śvetāśvatara Upaniṣad', kn: 'ಶ್ವೇತಾಶ್ವತರ ಉಪನಿಷತ್' },
    sa: 'श्वेताश्वतरोपनिषत्',
    about: {
      en: 'Six adhyāyas on Rudra–Śiva as the one Lord who is also the Self. It belongs to the Kṛṣṇa Yajurveda as a whole rather than to one saṃhitā; it is placed here because Taittirīya reciters carry it.',
      kn: 'ಆರು ಅಧ್ಯಾಯಗಳು — ಆತ್ಮನೂ ಆಗಿರುವ ಏಕೈಕ ಈಶ್ವರನಾದ ರುದ್ರ–ಶಿವನ ಕುರಿತು. ಇದು ಯಾವುದೇ ಒಂದು ಸಂಹಿತೆಗಿಂತ ಒಟ್ಟು ಕೃಷ್ಣ ಯಜುರ್ವೇದಕ್ಕೆ ಸೇರಿದ್ದು; ತೈತ್ತಿರೀಯ ಪಾಠಕರು ಇದನ್ನು ಪಠಿಸುವುದರಿಂದ ಇಲ್ಲಿ ಇರಿಸಲಾಗಿದೆ.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('upanishads/shwetashwataropanishad/') },
      { kind: 'etext', repo: 'gretil', url: gretil('sa_zvetAzvataropaniSad') },
    ],
  },
  {
    id: 'taittiriya-pratishakhya',
    home: 'taittiriya',
    layer: 'pratishakhya',
    name: { en: 'Taittirīya Prātiśākhya', kn: 'ತೈತ್ತಿರೀಯ ಪ್ರಾತಿಶಾಖ್ಯ' },
    sa: 'तैत्तिरीयप्रातिशाख्यम्',
    about: {
      en: 'The phonetics of the Taittirīya saṃhitā: how each sound is produced, the accents, and the sandhi rules the reciter must keep.',
      kn: 'ತೈತ್ತಿರೀಯ ಸಂಹಿತೆಯ ಧ್ವನಿಶಾಸ್ತ್ರ: ಪ್ರತಿ ವರ್ಣದ ಉತ್ಪತ್ತಿ, ಸ್ವರಗಳು, ಮತ್ತು ಪಾಠಕನು ಪಾಲಿಸಬೇಕಾದ ಸಂಧಿನಿಯಮಗಳು.',
    },
    sources: [SHIKSHA_PAGE],
  },
  {
    id: 'apastamba-grhya',
    home: 'taittiriya',
    layer: 'grhya',
    name: { en: 'Āpastamba Gṛhyasūtra', kn: 'ಆಪಸ್ತಂಬ ಗೃಹ್ಯಸೂತ್ರ' },
    sa: 'आपस्तम्बगृह्यसूत्रम्',
    about: {
      en: 'The domestic rites followed by Āpastambins — the largest Taittirīya community — from upanayana and vivāha to the household offerings.',
      kn: 'ಆಪಸ್ತಂಬೀಯರು — ತೈತ್ತಿರೀಯರಲ್ಲಿ ಅತಿ ದೊಡ್ಡ ಸಮುದಾಯ — ಅನುಸರಿಸುವ ಗೃಹ್ಯಕರ್ಮಗಳು: ಉಪನಯನ, ವಿವಾಹದಿಂದ ಗೃಹ್ಯ ಹೋಮಗಳವರೆಗೆ.',
    },
    sources: [
      {
        kind: 'bhashya',
        repo: 'gretil',
        url: gretil('sa_ApastambagRhyasUtra-comm'),
        note: {
          en: 'With Haradatta’s Anākulā and Sudarśana’s Tātparyadarśana',
          kn: 'ಹರದತ್ತರ ಅನಾಕುಲಾ ಮತ್ತು ಸುದರ್ಶನರ ತಾತ್ಪರ್ಯದರ್ಶನ ವ್ಯಾಖ್ಯಾನಗಳೊಂದಿಗೆ',
        },
      },
    ],
  },
  {
    id: 'apastamba-dharma',
    home: 'taittiriya',
    layer: 'dharma',
    name: { en: 'Āpastamba Dharmasūtra', kn: 'ಆಪಸ್ತಂಬ ಧರ್ಮಸೂತ್ರ' },
    sa: 'आपस्तम्बधर्मसूत्रम्',
    about: {
      en: 'Conduct for the student, householder and renunciant, and the duties of the king, in the Āpastamba Kalpa.',
      kn: 'ಆಪಸ್ತಂಬ ಕಲ್ಪದಲ್ಲಿ ಬ್ರಹ್ಮಚಾರಿ, ಗೃಹಸ್ಥ, ಸಂನ್ಯಾಸಿಗಳ ಆಚಾರ ಮತ್ತು ರಾಜಧರ್ಮ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_ApastambadharmasUtra') }],
  },
  {
    id: 'apastamba-shulba',
    home: 'taittiriya',
    layer: 'shulba',
    name: { en: 'Āpastamba Śulbasūtra', kn: 'ಆಪಸ್ತಂಬ ಶುಲ್ಬಸೂತ್ರ' },
    sa: 'आपस्तम्बशुल्बसूत्रम्',
    about: {
      en: 'How to measure and build the fire altars with cord and peg — the geometry of the vedi.',
      kn: 'ಹಗ್ಗ ಮತ್ತು ಗೂಟಗಳಿಂದ ಅಗ್ನಿವೇದಿಗಳನ್ನು ಅಳೆದು ನಿರ್ಮಿಸುವ ವಿಧಾನ — ವೇದಿಯ ರೇಖಾಗಣಿತ.',
    },
    sources: [
      {
        kind: 'bhashya',
        repo: 'gretil',
        url: gretil('sa_ApastambazulbasUtra'),
        note: {
          en: 'With the commentaries of Kapardin, Karavinda and Sundararāja',
          kn: 'ಕಪರ್ದಿ, ಕರವಿಂದ ಮತ್ತು ಸುಂದರರಾಜರ ವ್ಯಾಖ್ಯಾನಗಳೊಂದಿಗೆ',
        },
      },
    ],
  },
  {
    id: 'baudhayana-dharma',
    home: 'taittiriya',
    layer: 'dharma',
    name: { en: 'Baudhāyana Dharmasūtra', kn: 'ಬೌಧಾಯನ ಧರ್ಮಸೂತ್ರ' },
    sa: 'बौधायनधर्मसूत्रम्',
    about: {
      en: 'The dharmasūtra of the Baudhāyana Kalpa, the other great Taittirīya school.',
      kn: 'ತೈತ್ತಿರೀಯದ ಇನ್ನೊಂದು ಪ್ರಮುಖ ಪರಂಪರೆಯಾದ ಬೌಧಾಯನ ಕಲ್ಪದ ಧರ್ಮಸೂತ್ರ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_baudhAyanadharmasUtra') }],
  },

  // ── Kṛṣṇa Yajurveda · Maitrāyaṇī ──
  {
    id: 'maitrayani-samhita',
    home: 'maitrayani',
    layer: 'samhita',
    name: { en: 'Maitrāyaṇī Saṃhitā', kn: 'ಮೈತ್ರಾಯಣೀ ಸಂಹಿತಾ' },
    sa: 'मैत्रायणीसंहिता',
    about: {
      en: 'Four kāṇḍas of mantra and brāhmaṇa prose — the Maitrāyaṇīya counterpart of the Taittirīya Saṃhitā, with its own order and readings.',
      kn: 'ಮಂತ್ರ ಮತ್ತು ಬ್ರಾಹ್ಮಣ ಗದ್ಯದ ನಾಲ್ಕು ಕಾಂಡಗಳು — ತೈತ್ತಿರೀಯ ಸಂಹಿತೆಗೆ ಮೈತ್ರಾಯಣೀಯ ಪ್ರತಿರೂಪ, ತನ್ನದೇ ಕ್ರಮ ಮತ್ತು ಪಾಠಗಳೊಂದಿಗೆ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretilVeda('1_sam/maitrs_au.htm') }],
  },
  {
    id: 'maitrayani-upanishad',
    home: 'maitrayani',
    layer: 'upanishad',
    name: { en: 'Maitrāyaṇī Upaniṣad', kn: 'ಮೈತ್ರಾಯಣೀ ಉಪನಿಷತ್' },
    sa: 'मैत्रायण्युपनिषत्',
    about: {
      en: 'King Bṛhadratha renounces his kingdom and asks the sage Śākāyanya about the Self; seven prapāṭhakas.',
      kn: 'ರಾಜ್ಯವನ್ನು ತ್ಯಜಿಸಿದ ರಾಜ ಬೃಹದ್ರಥನು ಶಾಕಾಯನ್ಯ ಮುನಿಯನ್ನು ಆತ್ಮದ ಕುರಿತು ಪ್ರಶ್ನಿಸುತ್ತಾನೆ; ಏಳು ಪ್ರಪಾಠಕಗಳು.',
    },
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('upanishads/maitrayani-upanishad/') }],
  },
  {
    id: 'manava-grhya',
    home: 'maitrayani',
    layer: 'grhya',
    name: { en: 'Mānava Gṛhyasūtra', kn: 'ಮಾನವ ಗೃಹ್ಯಸೂತ್ರ' },
    sa: 'मानवगृह्यसूत्रम्',
    about: {
      en: 'The domestic rites of the Mānava school of the Maitrāyaṇīyas.',
      kn: 'ಮೈತ್ರಾಯಣೀಯರ ಮಾನವ ಪರಂಪರೆಯ ಗೃಹ್ಯಕರ್ಮಗಳು.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_mAnavagRhyasUtra-maitrAyaNIyamAnavagRhyasUtra') }],
  },
  {
    id: 'varaha-grhya',
    home: 'maitrayani',
    layer: 'grhya',
    name: { en: 'Vārāha Gṛhyasūtra', kn: 'ವಾರಾಹ ಗೃಹ್ಯಸೂತ್ರ' },
    sa: 'वाराहगृह्यसूत्रम्',
    about: {
      en: 'The domestic rites of the Vārāha school, a sister tradition within the Maitrāyaṇīya.',
      kn: 'ಮೈತ್ರಾಯಣೀಯದೊಳಗಿನ ಸಹೋದರ ಪರಂಪರೆಯಾದ ವಾರಾಹ ಶಾಖೆಯ ಗೃಹ್ಯಕರ್ಮಗಳು.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_vArAhagRhyasUtra') }],
  },

  // ── Kṛṣṇa Yajurveda · Kaṭha ──
  {
    id: 'katha-upanishad',
    home: 'katha',
    layer: 'upanishad',
    name: { en: 'Kaṭha Upaniṣad', kn: 'ಕಠ ಉಪನಿಷತ್' },
    sa: 'कठोपनिषत्',
    about: {
      en: 'Young Naciketas waits three nights at the door of Yama and asks what remains after death. Two adhyāyas of three vallīs each — “uttiṣṭhata jāgrata”.',
      kn: 'ಬಾಲಕ ನಚಿಕೇತ ಯಮನ ಬಾಗಿಲಲ್ಲಿ ಮೂರು ರಾತ್ರಿ ಕಾದು, ಮರಣದ ನಂತರ ಉಳಿಯುವುದೇನು ಎಂದು ಕೇಳುತ್ತಾನೆ. ತಲಾ ಮೂರು ವಲ್ಲಿಗಳ ಎರಡು ಅಧ್ಯಾಯಗಳು — “ಉತ್ತಿಷ್ಠತ ಜಾಗ್ರತ”.',
    },
    sources: [
      { kind: 'readListen', repo: 'vhp', url: vhp('upanishads/kathopanishad/') },
      { kind: 'etext', repo: 'gretil', url: gretil('sa_kathopaniSad') },
    ],
  },

  // ── Sāmaveda · Kauthuma ──
  {
    id: 'kauthuma-samhita',
    home: 'kauthuma',
    layer: 'samhita',
    name: { en: 'Sāmaveda Saṃhitā (Kauthuma)', kn: 'ಸಾಮವೇದ ಸಂಹಿತಾ (ಕೌಥುಮ)' },
    sa: 'सामवेदसंहिता (कौथुम)',
    about: {
      en: 'The ṛks of the Sāmaveda — almost all drawn from the Ṛgveda — in the Pūrvārcika and Uttarārcika, 1,875 mantras in all. The gānas, the actual melodies, are sung on these.',
      kn: 'ಸಾಮವೇದದ ಋಕ್ಕುಗಳು — ಬಹುತೇಕ ಋಗ್ವೇದದಿಂದಲೇ — ಪೂರ್ವಾರ್ಚಿಕ ಮತ್ತು ಉತ್ತರಾರ್ಚಿಕಗಳಲ್ಲಿ, ಒಟ್ಟು 1,875 ಮಂತ್ರಗಳು. ನಿಜವಾದ ರಾಗಗಳಾದ ಗಾನಗಳನ್ನು ಇವುಗಳ ಮೇಲೆ ಹಾಡಲಾಗುತ್ತದೆ.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('samhitas/samaveda-samhitas/kauthuma-samhita/') },
      {
        kind: 'etext',
        repo: 'sd',
        url: SD_VEDA,
        note: {
          en: 'Typeset with Sāmavedic svara numerals, and the four gāna books',
          kn: 'ಸಾಮವೇದೀಯ ಸ್ವರಾಂಕಗಳೊಂದಿಗೆ, ಹಾಗೂ ನಾಲ್ಕು ಗಾನ ಗ್ರಂಥಗಳು',
        },
      },
      {
        kind: 'etext',
        repo: 'gretil',
        url: gretil('sa_sAmavedasaMhitA'),
        note: { en: 'Unaccented; recension not stated by GRETIL', kn: 'ಸ್ವರರಹಿತ; GRETIL ಶಾಖೆಯನ್ನು ಸೂಚಿಸಿಲ್ಲ' },
      },
    ],
  },
  {
    id: 'tandya-brahmana',
    home: 'kauthuma',
    layer: 'brahmana',
    name: { en: 'Tāṇḍya (Pañcaviṃśa) Brāhmaṇa', kn: 'ತಾಂಡ್ಯ (ಪಂಚವಿಂಶ) ಬ್ರಾಹ್ಮಣ' },
    sa: 'ताण्ड्यमहाब्राह्मणम्',
    about: {
      en: 'The “great brāhmaṇa” of the Sāmaveda: twenty-five adhyāyas on the sāmans sung at the soma sacrifices.',
      kn: 'ಸಾಮವೇದದ “ಮಹಾಬ್ರಾಹ್ಮಣ”: ಸೋಮಯಾಗಗಳಲ್ಲಿ ಹಾಡುವ ಸಾಮಗಳ ಕುರಿತು ಇಪ್ಪತ್ತೈದು ಅಧ್ಯಾಯಗಳು.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('brahmanas/tandya-brahmana/') },
      { kind: 'etext', repo: 'gretil', url: gretil('sa_paJcaviMzabrAhmaNa') },
    ],
  },
  {
    id: 'shadvimsha-brahmana',
    home: 'kauthuma',
    layer: 'brahmana',
    name: { en: 'Ṣaḍviṃśa Brāhmaṇa', kn: 'ಷಡ್ವಿಂಶ ಬ್ರಾಹ್ಮಣ' },
    sa: 'षड्विंशब्राह्मणम्',
    about: {
      en: 'The “twenty-sixth” — a supplement to the Tāṇḍya. Its last part, the Adbhuta Brāhmaṇa, deals with portents and their pacification.',
      kn: '“ಇಪ್ಪತ್ತಾರನೆಯದು” — ತಾಂಡ್ಯಕ್ಕೆ ಪೂರಕ. ಇದರ ಕೊನೆಯ ಭಾಗವಾದ ಅದ್ಭುತ ಬ್ರಾಹ್ಮಣ ಉತ್ಪಾತಗಳು ಮತ್ತು ಅವುಗಳ ಶಾಂತಿಯ ಕುರಿತು.',
    },
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('brahmanas/shadavimsa-brahmana/') }],
  },
  {
    id: 'chandogya-brahmana',
    home: 'kauthuma',
    layer: 'brahmana',
    name: { en: 'Chāndogya Brāhmaṇa', kn: 'ಛಾಂದೋಗ್ಯ ಬ್ರಾಹ್ಮಣ' },
    sa: 'छान्दोग्यब्राह्मणम्',
    about: {
      en: 'Ten prapāṭhakas. The first two are the mantras used in the domestic rites (the Mantra Brāhmaṇa); the remaining eight are the Chāndogya Upaniṣad.',
      kn: 'ಹತ್ತು ಪ್ರಪಾಠಕಗಳು. ಮೊದಲ ಎರಡು ಗೃಹ್ಯಕರ್ಮಗಳ ಮಂತ್ರಗಳು (ಮಂತ್ರ ಬ್ರಾಹ್ಮಣ); ಉಳಿದ ಎಂಟು ಛಾಂದೋಗ್ಯ ಉಪನಿಷತ್.',
    },
    related: ['chandogya-upanishad'],
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('brahmanas/chandogyopanishad-brahmana/') }],
  },
  {
    id: 'chandogya-upanishad',
    home: 'kauthuma',
    layer: 'upanishad',
    name: { en: 'Chāndogya Upaniṣad', kn: 'ಛಾಂದೋಗ್ಯ ಉಪನಿಷತ್' },
    sa: 'छान्दोग्योपनिषत्',
    within: { en: 'Chāndogya Brāhmaṇa, prapāṭhakas 3–10', kn: 'ಛಾಂದೋಗ್ಯ ಬ್ರಾಹ್ಮಣ, 3–10ನೇ ಪ್ರಪಾಠಕಗಳು' },
    about: {
      en: 'Eight prapāṭhakas: Om as the udgītha, Uddālaka teaching Śvetaketu “tat tvam asi”, and Sanatkumāra leading Nārada to the bhūman.',
      kn: 'ಎಂಟು ಪ್ರಪಾಠಕಗಳು: ಉದ್ಗೀಥವಾಗಿ ಓಂಕಾರ, ಉದ್ದಾಲಕನು ಶ್ವೇತಕೇತುವಿಗೆ “ತತ್ತ್ವಮಸಿ” ಉಪದೇಶ, ಸನತ್ಕುಮಾರರು ನಾರದರನ್ನು ಭೂಮದೆಡೆಗೆ ಕರೆದೊಯ್ಯುವುದು.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('upanishads/chandogyopanishad/') },
      { kind: 'bhashya', repo: 'gretil', url: gretil('sa_chAndogyopaniSad-comm'), note: SHANKARA },
    ],
  },
  {
    id: 'kauthuma-grhya',
    home: 'kauthuma',
    layer: 'grhya',
    name: { en: 'Kauthuma Gṛhyasūtra', kn: 'ಕೌಥುಮ ಗೃಹ್ಯಸೂತ್ರ' },
    sa: 'कौथुमगृह्यसूत्रम्',
    about: {
      en: 'A gṛhyasūtra transmitted in the Kauthuma śākhā.',
      kn: 'ಕೌಥುಮ ಶಾಖೆಯಲ್ಲಿ ಹರಿದು ಬಂದ ಗೃಹ್ಯಸೂತ್ರ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_kauthumagRhyasUtra') }],
  },
  {
    id: 'gautama-dharma',
    home: 'kauthuma',
    layer: 'dharma',
    name: { en: 'Gautama Dharmasūtra', kn: 'ಗೌತಮ ಧರ್ಮಸೂತ್ರ' },
    sa: 'गौतमधर्मसूत्रम्',
    about: {
      en: 'Traditionally associated with the Sāmaveda; among the oldest dharmasūtras.',
      kn: 'ಸಂಪ್ರದಾಯದಲ್ಲಿ ಸಾಮವೇದಕ್ಕೆ ಸಂಬಂಧಿಸಿದ್ದು; ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಧರ್ಮಸೂತ್ರಗಳಲ್ಲಿ ಒಂದು.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_gautama-dharmasUtra') }],
  },

  // ── Sāmaveda · Rāṇāyanīya ──
  {
    id: 'ranayaniya-samhita',
    home: 'ranayaniya',
    layer: 'samhita',
    name: { en: 'Sāmaveda Saṃhitā (Rāṇāyanīya)', kn: 'ಸಾಮವೇದ ಸಂಹಿತಾ (ರಾಣಾಯನೀಯ)' },
    sa: 'सामवेदसंहिता (राणायनीय)',
    about: {
      en: 'Very close to the Kauthuma text; the two differ in a few readings and in how certain syllables are sounded when sung.',
      kn: 'ಕೌಥುಮ ಪಠ್ಯಕ್ಕೆ ಬಹಳ ಹತ್ತಿರ; ಕೆಲವು ಪಾಠಗಳಲ್ಲಿ ಮತ್ತು ಗಾನದಲ್ಲಿ ಕೆಲ ಅಕ್ಷರಗಳ ಉಚ್ಚಾರದಲ್ಲಿ ಮಾತ್ರ ಭಿನ್ನ.',
    },
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('samhitas/samaveda-samhitas/ranayaniya-samhita/') }],
  },

  // ── Sāmaveda · Jaiminīya ──
  {
    id: 'jaiminiya-samhita',
    home: 'jaiminiya',
    layer: 'samhita',
    name: { en: 'Sāmaveda Saṃhitā (Jaiminīya)', kn: 'ಸಾಮವೇದ ಸಂಹಿತಾ (ಜೈಮಿನೀಯ)' },
    sa: 'सामवेदसंहिता (जैमिनीय)',
    about: {
      en: 'The Jaiminīya (Talavakāra) saṃhitā, with its own sequence of ṛks and a singing tradition distinct from the Kauthuma.',
      kn: 'ಜೈಮಿನೀಯ (ತಲವಕಾರ) ಸಂಹಿತೆ — ತನ್ನದೇ ಋಕ್ ಕ್ರಮ ಮತ್ತು ಕೌಥುಮಕ್ಕಿಂತ ಭಿನ್ನವಾದ ಗಾನ ಸಂಪ್ರದಾಯ.',
    },
    sources: [{ kind: 'listen', repo: 'vhp', url: vhp('samhitas/samaveda-samhitas/jaiminiya-samhita-2/') }],
  },
  {
    id: 'jaiminiya-brahmana',
    home: 'jaiminiya',
    layer: 'brahmana',
    name: { en: 'Jaiminīya Brāhmaṇa', kn: 'ಜೈಮಿನೀಯ ಬ್ರಾಹ್ಮಣ' },
    sa: 'जैमिनीयब्राह्मणम्',
    about: {
      en: 'The largest Sāmavedic brāhmaṇa, rich in the legends told around the soma rites.',
      kn: 'ಸಾಮವೇದದ ಅತಿ ದೊಡ್ಡ ಬ್ರಾಹ್ಮಣ — ಸೋಮಕರ್ಮಗಳ ಸುತ್ತಲಿನ ಆಖ್ಯಾನಗಳಿಂದ ಸಮೃದ್ಧ.',
    },
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('brahmanas/jaiminiya-brhamana/') }],
  },
  {
    id: 'jaiminiya-upanishad-brahmana',
    home: 'jaiminiya',
    layer: 'aranyaka',
    name: { en: 'Jaiminīya Upaniṣad Brāhmaṇa', kn: 'ಜೈಮಿನೀಯ ಉಪನಿಷದ್ ಬ್ರಾಹ್ಮಣ' },
    sa: 'जैमिनीयोपनिषद्ब्राह्मणम्',
    about: {
      en: 'Also called the Talavakāra Upaniṣad Brāhmaṇa; the āraṇyaka-like meditation of this śākhā on the sāman and the syllable. The Kena Upaniṣad is one of its sections.',
      kn: 'ತಲವಕಾರ ಉಪನಿಷದ್ ಬ್ರಾಹ್ಮಣ ಎಂದೂ ಹೆಸರು; ಸಾಮ ಮತ್ತು ಅಕ್ಷರದ ಕುರಿತು ಈ ಶಾಖೆಯ ಆರಣ್ಯಕದಂತಹ ಧ್ಯಾನ. ಕೇನೋಪನಿಷತ್ ಇದರ ಒಂದು ಭಾಗ.',
    },
    related: ['kena-upanishad'],
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('brahmanas/jaiminiyopanishad-brahmana/') }],
  },
  {
    id: 'kena-upanishad',
    home: 'jaiminiya',
    layer: 'upanishad',
    name: { en: 'Kena Upaniṣad', kn: 'ಕೇನ ಉಪನಿಷತ್' },
    sa: 'केनोपनिषत्',
    within: { en: 'Jaiminīya Upaniṣad Brāhmaṇa', kn: 'ಜೈಮಿನೀಯ ಉಪನಿಷದ್ ಬ್ರಾಹ್ಮಣ' },
    about: {
      en: '“By whom?” — by whom is the mind sent forth, by whom does speech speak? The devas cannot know the yakṣa until Umā Haimavatī teaches Indra.',
      kn: '“ಯಾರಿಂದ?” — ಮನಸ್ಸು ಯಾರಿಂದ ಪ್ರೇರಿತ, ಮಾತು ಯಾರಿಂದ ನುಡಿಯುತ್ತದೆ? ಉಮಾ ಹೈಮವತಿ ಇಂದ್ರನಿಗೆ ಉಪದೇಶಿಸುವವರೆಗೆ ದೇವತೆಗಳಿಗೆ ಯಕ್ಷನನ್ನು ಅರಿಯಲಾಗುವುದಿಲ್ಲ.',
    },
    sources: [{ kind: 'readListen', repo: 'vhp', url: vhp('upanishads/kenopanisad/') }],
  },
  {
    id: 'jaiminiya-grhya',
    home: 'jaiminiya',
    layer: 'grhya',
    name: { en: 'Jaiminīya Gṛhyasūtra', kn: 'ಜೈಮಿನೀಯ ಗೃಹ್ಯಸೂತ್ರ' },
    sa: 'जैमिनीयगृह्यसूत्रम्',
    about: {
      en: 'The domestic rites of the Jaiminīya Sāmavedins.',
      kn: 'ಜೈಮಿನೀಯ ಸಾಮವೇದಿಗಳ ಗೃಹ್ಯಕರ್ಮಗಳು.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_jaiminIyagRhyasUtra') }],
  },

  // ── Atharvaveda · Śaunaka ──
  {
    id: 'shaunaka-samhita',
    home: 'shaunaka',
    layer: 'samhita',
    name: { en: 'Atharvaveda Saṃhitā (Śaunaka)', kn: 'ಅಥರ್ವವೇದ ಸಂಹಿತಾ (ಶೌನಕ)' },
    sa: 'अथर्ववेदसंहिता (शौनक)',
    about: {
      en: 'Twenty kāṇḍas, about 730 sūktas: healing, protection, the household and kingship, alongside great hymns such as the Pṛthivī Sūkta (12.1).',
      kn: 'ಇಪ್ಪತ್ತು ಕಾಂಡಗಳು, ಸುಮಾರು 730 ಸೂಕ್ತಗಳು: ಆರೋಗ್ಯ, ರಕ್ಷಣೆ, ಗೃಹ ಮತ್ತು ರಾಜಧರ್ಮ — ಜೊತೆಗೆ ಪೃಥಿವೀ ಸೂಕ್ತದಂತಹ (12.1) ಮಹಾಸೂಕ್ತಗಳು.',
    },
    sources: [
      { kind: 'listen', repo: 'vhp', url: vhp('samhitas/atharvaveda-samhitas/shaunaka-samhita/'), note: { en: 'Audio', kn: 'ಧ್ವನಿ' } },
      {
        kind: 'listen',
        repo: 'vhp',
        url: vhp('samhitas/atharvaveda-samhitas/atharvaveda-shaunaka-samhita/'),
        note: { en: 'Video', kn: 'ವೀಡಿಯೊ' },
      },
      { kind: 'etext', repo: 'gretil', url: gretilVeda('1_sam/avs_acu.htm'), note: { en: 'Accented', kn: 'ಸ್ವರಸಹಿತ' } },
    ],
  },
  {
    id: 'gopatha-brahmana',
    home: 'shaunaka',
    layer: 'brahmana',
    name: { en: 'Gopatha Brāhmaṇa', kn: 'ಗೋಪಥ ಬ್ರಾಹ್ಮಣ' },
    sa: 'गोपथब्राह्मणम्',
    about: {
      en: 'The one surviving brāhmaṇa of the Atharvaveda, in a pūrva and an uttara part; it sets out the brahman priest’s role in the sacrifice.',
      kn: 'ಅಥರ್ವವೇದದ ಉಳಿದಿರುವ ಏಕೈಕ ಬ್ರಾಹ್ಮಣ — ಪೂರ್ವ ಮತ್ತು ಉತ್ತರ ಭಾಗಗಳಲ್ಲಿ; ಯಜ್ಞದಲ್ಲಿ ಬ್ರಹ್ಮ ಋತ್ವಿಜನ ಪಾತ್ರವನ್ನು ನಿರೂಪಿಸುತ್ತದೆ.',
    },
    sources: [
      { kind: 'guide', repo: 'vhp', url: vhp('brahmanas/gopatha-brhamana/') },
      { kind: 'etext', repo: 'gretil', url: gretil('sa_gopathabrAhmaNa') },
    ],
  },
  {
    id: 'mundaka-upanishad',
    home: 'shaunaka',
    layer: 'upanishad',
    name: { en: 'Muṇḍaka Upaniṣad', kn: 'ಮುಂಡಕ ಉಪನಿಷತ್' },
    sa: 'मुण्डकोपनिषत्',
    about: {
      en: 'Śaunaka asks Aṅgiras what, once known, makes all known. The answer names the four Vedas and six Vedāṅgas as the lower knowledge, and the knowledge of the Imperishable as the higher (1.1.5).',
      kn: 'ಯಾವುದನ್ನು ಅರಿತರೆ ಎಲ್ಲವೂ ಅರಿವಾಗುತ್ತದೆ ಎಂದು ಶೌನಕ ಅಂಗಿರಸರನ್ನು ಕೇಳುತ್ತಾನೆ. ನಾಲ್ಕು ವೇದಗಳು ಮತ್ತು ಆರು ವೇದಾಂಗಗಳು ಅಪರಾ ವಿದ್ಯೆ, ಅಕ್ಷರವನ್ನು ಅರಿಯುವುದು ಪರಾ ವಿದ್ಯೆ ಎಂಬುದು ಉತ್ತರ (1.1.5).',
    },
    sources: [{ kind: 'readListen', repo: 'vhp', url: vhp('upanishads/mundakopanishad/') }],
  },
  {
    id: 'mandukya-upanishad',
    home: 'shaunaka',
    layer: 'upanishad',
    name: { en: 'Māṇḍūkya Upaniṣad', kn: 'ಮಾಂಡೂಕ್ಯ ಉಪನಿಷತ್' },
    sa: 'माण्डूक्योपनिषत्',
    about: {
      en: 'Twelve mantras on Om and the four states — waking, dream, deep sleep and turīya. Read with Gauḍapāda’s Kārikā, the first systematic Advaita text.',
      kn: 'ಓಂಕಾರ ಮತ್ತು ನಾಲ್ಕು ಅವಸ್ಥೆಗಳ ಕುರಿತು ಹನ್ನೆರಡು ಮಂತ್ರಗಳು — ಜಾಗ್ರತ್, ಸ್ವಪ್ನ, ಸುಷುಪ್ತಿ, ತುರೀಯ. ಅದ್ವೈತದ ಮೊದಲ ವ್ಯವಸ್ಥಿತ ಗ್ರಂಥವಾದ ಗೌಡಪಾದರ ಕಾರಿಕೆಯೊಂದಿಗೆ ಓದಲಾಗುತ್ತದೆ.',
    },
    sources: [
      { kind: 'readListen', repo: 'vhp', url: vhp('upanishads/mandukyopanishad/') },
      {
        kind: 'bhashya',
        repo: 'gretil',
        url: gretil('sa_mANDUkyopaniSad-comm'),
        note: {
          en: 'With Gauḍapāda’s Kārikā and the bhāṣya ascribed to Śaṅkara',
          kn: 'ಗೌಡಪಾದ ಕಾರಿಕೆ ಮತ್ತು ಶಂಕರರದೆಂದು ಪರಿಗಣಿತ ಭಾಷ್ಯದೊಂದಿಗೆ',
        },
      },
    ],
  },
  {
    id: 'atharva-pratishakhya',
    home: 'shaunaka',
    layer: 'pratishakhya',
    name: { en: 'Atharvaveda Prātiśākhya', kn: 'ಅಥರ್ವವೇದ ಪ್ರಾತಿಶಾಖ್ಯ' },
    sa: 'अथर्ववेदप्रातिशाख्यम्',
    about: {
      en: 'The phonetics of the Śaunaka saṃhitā — sounds, accents and sandhi as the Atharvavedin recites them.',
      kn: 'ಶೌನಕ ಸಂಹಿತೆಯ ಧ್ವನಿಶಾಸ್ತ್ರ — ಅಥರ್ವವೇದಿಗಳು ಪಠಿಸುವಂತೆ ವರ್ಣ, ಸ್ವರ ಮತ್ತು ಸಂಧಿ.',
    },
    sources: [SHIKSHA_PAGE],
  },
  {
    id: 'kaushika-sutra',
    home: 'shaunaka',
    layer: 'grhya',
    name: { en: 'Kauśika Sūtra', kn: 'ಕೌಶಿಕ ಸೂತ್ರ' },
    sa: 'कौशिकसूत्रम्',
    about: {
      en: 'The gṛhyasūtra of the Atharvaveda: how its mantras are applied in rites of healing, protection and the household.',
      kn: 'ಅಥರ್ವವೇದದ ಗೃಹ್ಯಸೂತ್ರ: ಆರೋಗ್ಯ, ರಕ್ಷಣೆ ಮತ್ತು ಗೃಹದ ಕರ್ಮಗಳಲ್ಲಿ ಅದರ ಮಂತ್ರಗಳ ವಿನಿಯೋಗ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_kauzikasUtra') }],
  },
  {
    id: 'vaitana-shrauta',
    home: 'shaunaka',
    layer: 'shrauta',
    name: { en: 'Vaitāna Śrautasūtra', kn: 'ವೈತಾನ ಶ್ರೌತಸೂತ್ರ' },
    sa: 'वैतानश्रौतसूत्रम्',
    about: {
      en: 'The Atharvaveda’s śrauta manual, for the brahman priest who silently oversees the sacrifice and corrects its errors.',
      kn: 'ಅಥರ್ವವೇದದ ಶ್ರೌತ ಕೈಪಿಡಿ — ಯಜ್ಞವನ್ನು ಮೌನವಾಗಿ ನಿರೀಕ್ಷಿಸಿ ದೋಷಗಳನ್ನು ಸರಿಪಡಿಸುವ ಬ್ರಹ್ಮ ಋತ್ವಿಜನಿಗಾಗಿ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_vaitAnazrautasUtra-vaitAnasUtra') }],
  },

  // ── Atharvaveda · Paippalāda ──
  {
    id: 'paippalada-samhita',
    home: 'paippalada',
    layer: 'samhita',
    name: { en: 'Atharvaveda Saṃhitā (Paippalāda)', kn: 'ಅಥರ್ವವೇದ ಸಂಹಿತಾ (ಪೈಪ್ಪಲಾದ)' },
    sa: 'अथर्ववेदसंहिता (पैप्पलाद)',
    about: {
      en: 'The other surviving Atharvaveda recension, preserved in Odisha and in old Kashmiri manuscripts, with much material not found in the Śaunaka.',
      kn: 'ಉಳಿದಿರುವ ಇನ್ನೊಂದು ಅಥರ್ವವೇದ ಪಾಠ — ಒಡಿಶಾ ಮತ್ತು ಪ್ರಾಚೀನ ಕಾಶ್ಮೀರಿ ಹಸ್ತಪ್ರತಿಗಳಲ್ಲಿ ಉಳಿದುಬಂದಿದೆ; ಶೌನಕದಲ್ಲಿ ಇಲ್ಲದ ಬಹಳಷ್ಟು ಭಾಗಗಳನ್ನು ಹೊಂದಿದೆ.',
    },
    sources: [{ kind: 'etext', repo: 'gretil', url: gretil('sa_paippalAdasaMhitA') }],
  },
  {
    id: 'prashna-upanishad',
    home: 'paippalada',
    layer: 'upanishad',
    name: { en: 'Praśna Upaniṣad', kn: 'ಪ್ರಶ್ನ ಉಪನಿಷತ್' },
    sa: 'प्रश्नोपनिषत्',
    about: {
      en: 'Six seekers come to the sage Pippalāda with six questions — on creation, prāṇa, sleep, Om and the person of sixteen parts.',
      kn: 'ಆರು ಜಿಜ್ಞಾಸುಗಳು ಆರು ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ಪಿಪ್ಪಲಾದ ಮಹರ್ಷಿಯ ಬಳಿ ಬರುತ್ತಾರೆ — ಸೃಷ್ಟಿ, ಪ್ರಾಣ, ನಿದ್ರೆ, ಓಂಕಾರ ಮತ್ತು ಷೋಡಶಕಲ ಪುರುಷನ ಕುರಿತು.',
    },
    sources: [
      { kind: 'readListen', repo: 'vhp', url: vhp('upanishads/prashnopanishad/') },
      { kind: 'bhashya', repo: 'gretil', url: gretil('sa_praznopaniSad-comm'), note: SHANKARA },
    ],
  },

  // ── Shared shelf · Vedāṅga ──
  {
    id: 'shiksha',
    home: 'vedanga',
    layer: 'anga',
    name: { en: 'Śikṣā — phonetics', kn: 'ಶಿಕ್ಷಾ — ಧ್ವನಿಶಾಸ್ತ್ರ' },
    sa: 'शिक्षा',
    about: {
      en: 'The nose of the Veda. Pronunciation, accent, length and the joining of sounds — the first thing a student learns. Each śākhā has its own prātiśākhya, which sits on that śākhā’s path.',
      kn: 'ವೇದದ ಮೂಗು. ಉಚ್ಚಾರ, ಸ್ವರ, ಮಾತ್ರೆ ಮತ್ತು ವರ್ಣಸಂಧಿ — ವಿದ್ಯಾರ್ಥಿ ಮೊದಲು ಕಲಿಯುವುದು ಇದನ್ನೇ. ಪ್ರತಿ ಶಾಖೆಗೂ ತನ್ನದೇ ಪ್ರಾತಿಶಾಖ್ಯವಿದೆ; ಅದು ಆ ಶಾಖೆಯ ಮಾರ್ಗದಲ್ಲಿದೆ.',
    },
    related: ['rk-pratishakhya', 'vajasaneyi-pratishakhya', 'taittiriya-pratishakhya', 'atharva-pratishakhya'],
    sources: [SHIKSHA_PAGE],
  },
  {
    id: 'kalpa',
    home: 'vedanga',
    layer: 'anga',
    name: { en: 'Kalpa — ritual procedure', kn: 'ಕಲ್ಪ — ಕರ್ಮವಿಧಾನ' },
    sa: 'कल्पः',
    about: {
      en: 'The arms of the Veda. Four kinds of sūtra — śrauta for the great sacrifices, gṛhya for the home, dharma for conduct, śulba for the altars. Every Kalpa belongs to a śākhā, so the sūtras are placed on those paths.',
      kn: 'ವೇದದ ಬಾಹುಗಳು. ನಾಲ್ಕು ಬಗೆಯ ಸೂತ್ರಗಳು — ಮಹಾಯಜ್ಞಗಳಿಗೆ ಶ್ರೌತ, ಮನೆಗೆ ಗೃಹ್ಯ, ಆಚಾರಕ್ಕೆ ಧರ್ಮ, ವೇದಿಗಳಿಗೆ ಶುಲ್ಬ. ಪ್ರತಿ ಕಲ್ಪವೂ ಒಂದು ಶಾಖೆಗೆ ಸೇರಿದ್ದು; ಆದ್ದರಿಂದ ಸೂತ್ರಗಳು ಆಯಾ ಮಾರ್ಗಗಳಲ್ಲಿವೆ.',
    },
    related: ['ashvalayana-shrauta', 'apastamba-grhya', 'apastamba-shulba', 'kaushika-sutra'],
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('vedangas/kalpa/') }],
  },
  {
    id: 'vyakarana',
    home: 'vedanga',
    layer: 'anga',
    name: { en: 'Vyākaraṇa — grammar', kn: 'ವ್ಯಾಕರಣ' },
    sa: 'व्याकरणम्',
    about: {
      en: 'The mouth of the Veda. Pāṇini’s Aṣṭādhyāyī, in nearly 4,000 sūtras, with Kātyāyana’s vārttikas and Patañjali’s Mahābhāṣya after it. It is not tied to any one śākhā.',
      kn: 'ವೇದದ ಮುಖ. ಸುಮಾರು 4,000 ಸೂತ್ರಗಳ ಪಾಣಿನಿಯ ಅಷ್ಟಾಧ್ಯಾಯೀ; ನಂತರ ಕಾತ್ಯಾಯನರ ವಾರ್ತಿಕಗಳು ಮತ್ತು ಪತಂಜಲಿಯ ಮಹಾಭಾಷ್ಯ. ಯಾವುದೇ ಒಂದು ಶಾಖೆಗೆ ಸೀಮಿತವಲ್ಲ.',
    },
    sources: [
      { kind: 'etext', repo: 'gretil', url: gretil('sa_pANini-aSTAdhyAyI'), note: { en: 'Aṣṭādhyāyī', kn: 'ಅಷ್ಟಾಧ್ಯಾಯೀ' } },
      { kind: 'guide', repo: 'vhp', url: vhp('vedangas/vyakarana/') },
    ],
  },
  {
    id: 'nirukta',
    home: 'vedanga',
    layer: 'anga',
    name: { en: 'Nirukta — etymology', kn: 'ನಿರುಕ್ತ' },
    sa: 'निरुक्तम्',
    about: {
      en: 'The ears of the Veda. Yāska’s Nirukta explains the Nighaṇṭu word-lists — why a Vedic word means what it means. Without it, says Yāska, the mantras cannot be understood.',
      kn: 'ವೇದದ ಕಿವಿಗಳು. ಯಾಸ್ಕರ ನಿರುಕ್ತ ನಿಘಂಟು ಪದಪಟ್ಟಿಗಳನ್ನು ವಿವರಿಸುತ್ತದೆ — ವೈದಿಕ ಪದಕ್ಕೆ ಆ ಅರ್ಥ ಏಕೆ ಎಂದು. ಇದಿಲ್ಲದೆ ಮಂತ್ರಾರ್ಥ ತಿಳಿಯದು ಎನ್ನುತ್ತಾರೆ ಯಾಸ್ಕರು.',
    },
    sources: [
      { kind: 'etext', repo: 'gretil', url: gretil('sa_yAska-nirukta') },
      { kind: 'guide', repo: 'vhp', url: vhp('vedangas/nirukta/') },
    ],
  },
  {
    id: 'chandas',
    home: 'vedanga',
    layer: 'anga',
    name: { en: 'Chandas — metre', kn: 'ಛಂದಸ್ಸು' },
    sa: 'छन्दः',
    about: {
      en: 'The feet of the Veda: every mantra has its ṛṣi, devatā and chandas. The texts are Piṅgala’s Chandaḥsūtra, with metrical sections in the Ṛk Prātiśākhya, the Śāṅkhāyana Śrautasūtra and the Sāmaveda’s Nidāna Sūtra.',
      kn: 'ವೇದದ ಪಾದಗಳು: ಪ್ರತಿ ಮಂತ್ರಕ್ಕೂ ಋಷಿ, ದೇವತೆ, ಛಂದಸ್ಸು ಇವೆ. ಪಿಂಗಳರ ಛಂದಃಸೂತ್ರ, ಜೊತೆಗೆ ಋಕ್ ಪ್ರಾತಿಶಾಖ್ಯ, ಶಾಂಖಾಯನ ಶ್ರೌತಸೂತ್ರ ಮತ್ತು ಸಾಮವೇದದ ನಿದಾನಸೂತ್ರಗಳಲ್ಲಿರುವ ಛಂದೋಭಾಗಗಳು.',
    },
    related: ['rk-pratishakhya', 'shankhayana-shrauta'],
    sources: [{ kind: 'guide', repo: 'vhp', url: vhp('vedangas/chanda/') }],
  },
  {
    id: 'jyotisha',
    home: 'vedanga',
    layer: 'anga',
    name: { en: 'Jyotiṣa — time-reckoning', kn: 'ಜ್ಯೋತಿಷ' },
    sa: 'ज्योतिषम्',
    about: {
      en: 'The eyes of the Veda — not astrology but the calendar: when each rite should be done. Lagadha’s Vedāṅga Jyotiṣa survives in a Ṛgveda and a Yajurveda recension.',
      kn: 'ವೇದದ ಕಣ್ಣುಗಳು — ಫಲಜ್ಯೋತಿಷವಲ್ಲ, ಕಾಲಗಣನೆ: ಯಾವ ಕರ್ಮ ಯಾವಾಗ. ಲಗಧರ ವೇದಾಂಗ ಜ್ಯೋತಿಷ ಋಗ್ವೇದ ಮತ್ತು ಯಜುರ್ವೇದ ಪಾಠಗಳಲ್ಲಿ ಉಳಿದಿದೆ.',
    },
    sources: [
      {
        kind: 'etext',
        repo: 'gretil',
        url: gretil('sa_lagadha-RgvedavedAGgajyotiSa'),
        note: { en: 'Ṛgveda recension', kn: 'ಋಗ್ವೇದ ಪಾಠ' },
      },
      { kind: 'guide', repo: 'vhp', url: vhp('vedangas/jyotisha/') },
    ],
  },
];

export const COLLECTIONS: Collection[] = [
  {
    slug: 'shakala',
    veda: 'rig',
    name: { en: 'Śākala', kn: 'ಶಾಕಲ' },
    sa: 'शाकल',
    intro: {
      en: 'The Ṛgveda as it is recited today. Its books run from the saṃhitā through the Aitareya Brāhmaṇa and Āraṇyaka to the Aitareya Upaniṣad, with the Āśvalāyana Kalpa.',
      kn: 'ಇಂದು ಪಠಿಸಲ್ಪಡುವ ಋಗ್ವೇದ. ಸಂಹಿತೆಯಿಂದ ಐತರೇಯ ಬ್ರಾಹ್ಮಣ, ಆರಣ್ಯಕಗಳ ಮೂಲಕ ಐತರೇಯ ಉಪನಿಷತ್ತಿನವರೆಗೆ, ಆಶ್ವಲಾಯನ ಕಲ್ಪದೊಂದಿಗೆ.',
    },
    path: [
      'rigveda-samhita',
      'rigveda-padapatha',
      'aitareya-brahmana',
      'aitareya-aranyaka',
      'aitareya-upanishad',
      'rk-pratishakhya',
      'ashvalayana-shrauta',
      'ashvalayana-grhya',
      'vasishtha-dharma',
    ],
    notOnPath: [
      {
        en: 'Bāṣkala: its saṃhitā does not survive as a separate text. The Kauṣītaki books traditionally linked with the Ṛgveda’s second line have their own path, Śāṅkhāyana.',
        kn: 'ಬಾಷ್ಕಲ: ಇದರ ಸಂಹಿತೆ ಪ್ರತ್ಯೇಕ ಪಠ್ಯವಾಗಿ ಉಳಿದಿಲ್ಲ. ಋಗ್ವೇದದ ಎರಡನೆಯ ಪರಂಪರೆಗೆ ಸಂಬಂಧಿಸಿದ ಕೌಷೀತಕಿ ಗ್ರಂಥಗಳಿಗೆ ಶಾಂಖಾಯನ ಎಂಬ ಪ್ರತ್ಯೇಕ ಮಾರ್ಗವಿದೆ.',
      },
    ],
  },
  {
    slug: 'shankhayana',
    veda: 'rig',
    name: { en: 'Śāṅkhāyana (Kauṣītaki)', kn: 'ಶಾಂಖಾಯನ (ಕೌಷೀತಕಿ)' },
    sa: 'शाङ्खायन',
    intro: {
      en: 'The second line of Ṛgvedic books. It recites the same saṃhitā as Śākala, and has its own brāhmaṇa, āraṇyaka, upaniṣad and Kalpa.',
      kn: 'ಋಗ್ವೇದೀಯ ಗ್ರಂಥಗಳ ಎರಡನೆಯ ಪರಂಪರೆ. ಶಾಕಲದ ಅದೇ ಸಂಹಿತೆಯನ್ನು ಪಠಿಸುತ್ತದೆ; ತನ್ನದೇ ಬ್ರಾಹ್ಮಣ, ಆರಣ್ಯಕ, ಉಪನಿಷತ್ ಮತ್ತು ಕಲ್ಪಗಳಿವೆ.',
    },
    path: ['rigveda-samhita', 'kaushitaki-brahmana', 'shankhayana-aranyaka', 'shankhayana-shrauta', 'shankhayana-grhya'],
    notOnPath: [
      {
        en: 'Kauṣītaki Upaniṣad: we have not found an open e-text we can vouch for on its own. It is adhyāyas 3–6 of the Śāṅkhāyana Āraṇyaka — read it there.',
        kn: 'ಕೌಷೀತಕಿ ಉಪನಿಷತ್: ಪ್ರತ್ಯೇಕವಾಗಿ ವಿಶ್ವಾಸಾರ್ಹ ಮುಕ್ತ ಇ-ಪಠ್ಯ ದೊರೆತಿಲ್ಲ. ಇದು ಶಾಂಖಾಯನ ಆರಣ್ಯಕದ 3–6ನೇ ಅಧ್ಯಾಯಗಳು — ಅಲ್ಲಿಯೇ ಓದಿ.',
      },
    ],
  },
  {
    slug: 'madhyandina',
    veda: 'yajur',
    branch: 'shukla',
    name: { en: 'Mādhyandina', kn: 'ಮಾಧ್ಯಂದಿನ' },
    sa: 'माध्यन्दिन',
    intro: {
      en: 'The more widely recited recension of the Śukla Yajurveda, revealed to Yājñavalkya. The saṃhitā and Śatapatha are its own; the Īśa and Bṛhadāraṇyaka are shared with Kāṇva.',
      kn: 'ಯಾಜ್ಞವಲ್ಕ್ಯರಿಗೆ ಪ್ರಕಟವಾದ ಶುಕ್ಲ ಯಜುರ್ವೇದದ ಹೆಚ್ಚು ಪ್ರಚಲಿತ ಪಾಠ. ಸಂಹಿತೆ ಮತ್ತು ಶತಪಥ ಇದರದೇ; ಈಶ ಮತ್ತು ಬೃಹದಾರಣ್ಯಕ ಕಾಣ್ವದೊಂದಿಗೆ ಸಾಮಾನ್ಯ.',
    },
    path: [
      'vajasaneyi-madhyandina',
      'shatapatha-madhyandina',
      'brhadaranyaka-upanishad',
      'ishavasya-upanishad',
      'vajasaneyi-pratishakhya',
    ],
    notOnPath: [
      {
        en: 'Kātyāyana Śrautasūtra and Pāraskara Gṛhyasūtra belong here. We have not yet found open e-texts we can vouch for, so they are not linked.',
        kn: 'ಕಾತ್ಯಾಯನ ಶ್ರೌತಸೂತ್ರ ಮತ್ತು ಪಾರಸ್ಕರ ಗೃಹ್ಯಸೂತ್ರ ಇಲ್ಲಿಗೆ ಸೇರಿವೆ. ವಿಶ್ವಾಸಾರ್ಹ ಮುಕ್ತ ಇ-ಪಠ್ಯಗಳು ಇನ್ನೂ ದೊರೆತಿಲ್ಲವಾದ್ದರಿಂದ ಲಿಂಕ್ ನೀಡಿಲ್ಲ.',
      },
      {
        en: 'The Īśa and Bṛhadāraṇyaka differ slightly between the two recensions. Śaṅkara commented on the Kāṇva text, so their pages live on the Kāṇva path.',
        kn: 'ಈಶ ಮತ್ತು ಬೃಹದಾರಣ್ಯಕಗಳು ಎರಡು ಪಾಠಗಳಲ್ಲಿ ಸ್ವಲ್ಪ ಭಿನ್ನ. ಶಂಕರರು ಕಾಣ್ವ ಪಾಠಕ್ಕೆ ಭಾಷ್ಯ ಬರೆದುದರಿಂದ ಅವುಗಳ ಪುಟಗಳು ಕಾಣ್ವ ಮಾರ್ಗದಲ್ಲಿವೆ.',
      },
    ],
  },
  {
    slug: 'kanva',
    veda: 'yajur',
    branch: 'shukla',
    name: { en: 'Kāṇva', kn: 'ಕಾಣ್ವ' },
    sa: 'काण्व',
    intro: {
      en: 'The second Śukla recension, with its own saṃhitā and Śatapatha. The Īśa and Bṛhadāraṇyaka that Śaṅkara explained are the Kāṇva texts.',
      kn: 'ಶುಕ್ಲದ ಎರಡನೆಯ ಪಾಠ — ತನ್ನದೇ ಸಂಹಿತೆ ಮತ್ತು ಶತಪಥದೊಂದಿಗೆ. ಶಂಕರರು ವಿವರಿಸಿದ ಈಶ ಮತ್ತು ಬೃಹದಾರಣ್ಯಕಗಳು ಕಾಣ್ವ ಪಾಠಗಳು.',
    },
    path: [
      'vajasaneyi-kanva',
      'shatapatha-kanva',
      'brhadaranyaka-upanishad',
      'ishavasya-upanishad',
      'vajasaneyi-pratishakhya',
    ],
    notOnPath: [
      {
        en: 'The Kāṇvas follow the Kātyāyana Śrauta and Pāraskara Gṛhya sūtras too; see the note on the Mādhyandina path.',
        kn: 'ಕಾಣ್ವರೂ ಕಾತ್ಯಾಯನ ಶ್ರೌತ ಮತ್ತು ಪಾರಸ್ಕರ ಗೃಹ್ಯ ಸೂತ್ರಗಳನ್ನೇ ಅನುಸರಿಸುತ್ತಾರೆ; ಮಾಧ್ಯಂದಿನ ಮಾರ್ಗದ ಟಿಪ್ಪಣಿ ನೋಡಿ.',
      },
    ],
  },
  {
    slug: 'taittiriya',
    veda: 'yajur',
    branch: 'krishna',
    name: { en: 'Taittirīya', kn: 'ತೈತ್ತಿರೀಯ' },
    sa: 'तैत्तिरीय',
    intro: {
      en: 'The śākhā most widely recited in South India, and the fullest surviving Kṛṣṇa Yajurveda: saṃhitā, brāhmaṇa, āraṇyaka and upaniṣad, with the Āpastamba and Baudhāyana Kalpas.',
      kn: 'ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಪಠಿತ ಶಾಖೆ, ಮತ್ತು ಸಂಪೂರ್ಣವಾಗಿ ಉಳಿದಿರುವ ಕೃಷ್ಣ ಯಜುರ್ವೇದ: ಸಂಹಿತಾ, ಬ್ರಾಹ್ಮಣ, ಆರಣ್ಯಕ, ಉಪನಿಷತ್ — ಆಪಸ್ತಂಬ ಮತ್ತು ಬೌಧಾಯನ ಕಲ್ಪಗಳೊಂದಿಗೆ.',
    },
    path: [
      'taittiriya-samhita',
      'taittiriya-brahmana',
      'taittiriya-aranyaka',
      'taittiriya-upanishad',
      'shvetashvatara-upanishad',
      'taittiriya-pratishakhya',
      'apastamba-grhya',
      'apastamba-dharma',
      'apastamba-shulba',
      'baudhayana-dharma',
    ],
    notOnPath: [
      {
        en: 'Āpastamba and Baudhāyana Śrautasūtras: open e-texts are available only under restricted access, so we do not link them yet.',
        kn: 'ಆಪಸ್ತಂಬ ಮತ್ತು ಬೌಧಾಯನ ಶ್ರೌತಸೂತ್ರಗಳು: ಮುಕ್ತ ಇ-ಪಠ್ಯಗಳು ನಿರ್ಬಂಧಿತ ಪ್ರವೇಶದಲ್ಲಿ ಮಾತ್ರ ಲಭ್ಯ; ಆದ್ದರಿಂದ ಸದ್ಯಕ್ಕೆ ಲಿಂಕ್ ನೀಡಿಲ್ಲ.',
      },
      {
        en: 'The Mahānārāyaṇa Upaniṣad is the tenth prapāṭhaka of the Taittirīya Āraṇyaka; open the Āraṇyaka to read it.',
        kn: 'ಮಹಾನಾರಾಯಣ ಉಪನಿಷತ್ ತೈತ್ತಿರೀಯ ಆರಣ್ಯಕದ ಹತ್ತನೆಯ ಪ್ರಪಾಠಕ; ಅದನ್ನು ಆರಣ್ಯಕದಲ್ಲಿ ಓದಿ.',
      },
    ],
  },
  {
    slug: 'maitrayani',
    veda: 'yajur',
    branch: 'krishna',
    name: { en: 'Maitrāyaṇī', kn: 'ಮೈತ್ರಾಯಣೀ' },
    sa: 'मैत्रायणी',
    intro: {
      en: 'A Kṛṣṇa Yajurveda śākhā still recited by a small community, with its own saṃhitā, upaniṣad and the Mānava and Vārāha gṛhyasūtras.',
      kn: 'ಇಂದಿಗೂ ಸಣ್ಣ ಸಮುದಾಯವೊಂದು ಪಠಿಸುವ ಕೃಷ್ಣ ಯಜುರ್ವೇದ ಶಾಖೆ — ತನ್ನದೇ ಸಂಹಿತೆ, ಉಪನಿಷತ್, ಮತ್ತು ಮಾನವ, ವಾರಾಹ ಗೃಹ್ಯಸೂತ್ರಗಳೊಂದಿಗೆ.',
    },
    path: ['maitrayani-samhita', 'maitrayani-upanishad', 'manava-grhya', 'varaha-grhya'],
    notOnPath: [
      {
        en: 'There is no separate Maitrāyaṇī Brāhmaṇa: the explanatory prose sits inside the saṃhitā, as in all Kṛṣṇa Yajurveda texts.',
        kn: 'ಪ್ರತ್ಯೇಕ ಮೈತ್ರಾಯಣೀ ಬ್ರಾಹ್ಮಣವಿಲ್ಲ: ಎಲ್ಲ ಕೃಷ್ಣ ಯಜುರ್ವೇದ ಪಠ್ಯಗಳಂತೆ ವಿವರಣಾತ್ಮಕ ಗದ್ಯ ಸಂಹಿತೆಯೊಳಗೇ ಇದೆ.',
      },
      {
        en: 'Mānava Śrautasūtra: no open e-text we can vouch for yet.',
        kn: 'ಮಾನವ ಶ್ರೌತಸೂತ್ರ: ವಿಶ್ವಾಸಾರ್ಹ ಮುಕ್ತ ಇ-ಪಠ್ಯ ಇನ್ನೂ ದೊರೆತಿಲ್ಲ.',
      },
    ],
  },
  {
    slug: 'katha',
    veda: 'yajur',
    branch: 'krishna',
    name: { en: 'Kaṭha', kn: 'ಕಠ' },
    sa: 'कठ',
    intro: {
      en: 'Once a major Kṛṣṇa Yajurveda śākhā. Its best-known book today is the Kaṭha Upaniṣad.',
      kn: 'ಒಮ್ಮೆ ಪ್ರಮುಖವಾಗಿದ್ದ ಕೃಷ್ಣ ಯಜುರ್ವೇದ ಶಾಖೆ. ಇಂದು ಇದರ ಅತಿ ಪರಿಚಿತ ಗ್ರಂಥ ಕಠೋಪನಿಷತ್.',
    },
    path: ['katha-upanishad'],
    notOnPath: [
      {
        en: 'The Kāṭhaka Saṃhitā and the Kaṭha-Kapiṣṭhala Saṃhitā survive, but their e-texts are under restricted access and the Vedic Heritage Portal has no page for them yet.',
        kn: 'ಕಾಠಕ ಸಂಹಿತಾ ಮತ್ತು ಕಠ-ಕಪಿಷ್ಠಲ ಸಂಹಿತಾ ಉಳಿದಿವೆ; ಆದರೆ ಅವುಗಳ ಇ-ಪಠ್ಯಗಳು ನಿರ್ಬಂಧಿತ, ಮತ್ತು ವೈದಿಕ ಪರಂಪರಾ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಇನ್ನೂ ಪುಟವಿಲ್ಲ.',
      },
      {
        en: 'Portions of the lost Kāṭhaka Brāhmaṇa are preserved inside the Taittirīya Brāhmaṇa and Āraṇyaka.',
        kn: 'ಕಳೆದುಹೋದ ಕಾಠಕ ಬ್ರಾಹ್ಮಣದ ಅಂಶಗಳು ತೈತ್ತಿರೀಯ ಬ್ರಾಹ್ಮಣ ಮತ್ತು ಆರಣ್ಯಕಗಳೊಳಗೆ ಉಳಿದಿವೆ.',
      },
    ],
  },
  {
    slug: 'kauthuma',
    veda: 'sama',
    name: { en: 'Kauthuma', kn: 'ಕೌಥುಮ' },
    sa: 'कौथुम',
    intro: {
      en: 'The most widely sung Sāmaveda śākhā. Its books run from the saṃhitā through the Tāṇḍya and the Chāndogya Brāhmaṇa to the Chāndogya Upaniṣad.',
      kn: 'ಅತಿ ಹೆಚ್ಚು ಗಾನ ಮಾಡಲ್ಪಡುವ ಸಾಮವೇದ ಶಾಖೆ. ಸಂಹಿತೆಯಿಂದ ತಾಂಡ್ಯ, ಛಾಂದೋಗ್ಯ ಬ್ರಾಹ್ಮಣಗಳ ಮೂಲಕ ಛಾಂದೋಗ್ಯ ಉಪನಿಷತ್ತಿನವರೆಗೆ.',
    },
    path: [
      'kauthuma-samhita',
      'tandya-brahmana',
      'shadvimsha-brahmana',
      'chandogya-brahmana',
      'chandogya-upanishad',
      'kauthuma-grhya',
      'gautama-dharma',
    ],
    notOnPath: [
      {
        en: 'Gobhila and Khādira Gṛhyasūtras and the Lāṭyāyana Śrautasūtra belong to this Veda; we have not found open e-texts we can vouch for.',
        kn: 'ಗೋಭಿಲ, ಖಾದಿರ ಗೃಹ್ಯಸೂತ್ರಗಳು ಮತ್ತು ಲಾಟ್ಯಾಯನ ಶ್ರೌತಸೂತ್ರ ಈ ವೇದಕ್ಕೆ ಸೇರಿವೆ; ವಿಶ್ವಾಸಾರ್ಹ ಮುಕ್ತ ಇ-ಪಠ್ಯಗಳು ದೊರೆತಿಲ್ಲ.',
      },
      {
        en: 'No prātiśākhya of the Sāmaveda is listed on the Vedic Heritage Portal, so none is placed here.',
        kn: 'ವೈದಿಕ ಪರಂಪರಾ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸಾಮವೇದದ ಪ್ರಾತಿಶಾಖ್ಯ ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲ; ಆದ್ದರಿಂದ ಇಲ್ಲಿ ಇರಿಸಿಲ್ಲ.',
      },
    ],
  },
  {
    slug: 'ranayaniya',
    veda: 'sama',
    name: { en: 'Rāṇāyanīya', kn: 'ರಾಣಾಯನೀಯ' },
    sa: 'राणायनीय',
    intro: {
      en: 'A sister śākhā of the Kauthuma. It has its own saṃhitā recitation and shares the Kauthuma brāhmaṇas and upaniṣad.',
      kn: 'ಕೌಥುಮದ ಸಹೋದರ ಶಾಖೆ. ತನ್ನದೇ ಸಂಹಿತಾ ಪಠಣವಿದೆ; ಬ್ರಾಹ್ಮಣಗಳು ಮತ್ತು ಉಪನಿಷತ್ತು ಕೌಥುಮದೊಂದಿಗೆ ಸಾಮಾನ್ಯ.',
    },
    path: ['ranayaniya-samhita', 'tandya-brahmana', 'chandogya-brahmana', 'chandogya-upanishad'],
    notOnPath: [],
  },
  {
    slug: 'jaiminiya',
    veda: 'sama',
    name: { en: 'Jaiminīya (Talavakāra)', kn: 'ಜೈಮಿನೀಯ (ತಲವಕಾರ)' },
    sa: 'जैमिनीय',
    intro: {
      en: 'The Sāmaveda of Jaimini, with its own saṃhitā, a large brāhmaṇa, and the Upaniṣad Brāhmaṇa that contains the Kena Upaniṣad.',
      kn: 'ಜೈಮಿನಿಯ ಸಾಮವೇದ — ತನ್ನದೇ ಸಂಹಿತೆ, ದೊಡ್ಡ ಬ್ರಾಹ್ಮಣ, ಮತ್ತು ಕೇನೋಪನಿಷತ್ತನ್ನು ಒಳಗೊಂಡ ಉಪನಿಷದ್ ಬ್ರಾಹ್ಮಣ.',
    },
    path: [
      'jaiminiya-samhita',
      'jaiminiya-brahmana',
      'jaiminiya-upanishad-brahmana',
      'kena-upanishad',
      'jaiminiya-grhya',
    ],
    notOnPath: [
      {
        en: 'Śaṅkara’s bhāṣya on the Kena: no open e-text we can vouch for yet.',
        kn: 'ಕೇನೋಪನಿಷತ್ತಿಗೆ ಶಂಕರ ಭಾಷ್ಯ: ವಿಶ್ವಾಸಾರ್ಹ ಮುಕ್ತ ಇ-ಪಠ್ಯ ಇನ್ನೂ ದೊರೆತಿಲ್ಲ.',
      },
    ],
  },
  {
    slug: 'shaunaka',
    veda: 'atharva',
    name: { en: 'Śaunaka', kn: 'ಶೌನಕ' },
    sa: 'शौनक',
    intro: {
      en: 'The Atharvaveda as most often printed and recited. Its books include the Gopatha Brāhmaṇa, the Muṇḍaka and Māṇḍūkya Upaniṣads, and the Kauśika and Vaitāna sūtras.',
      kn: 'ಹೆಚ್ಚಾಗಿ ಮುದ್ರಿತ ಮತ್ತು ಪಠಿತ ಅಥರ್ವವೇದ. ಗೋಪಥ ಬ್ರಾಹ್ಮಣ, ಮುಂಡಕ ಮತ್ತು ಮಾಂಡೂಕ್ಯ ಉಪನಿಷತ್ತುಗಳು, ಕೌಶಿಕ ಮತ್ತು ವೈತಾನ ಸೂತ್ರಗಳು ಇದರ ಗ್ರಂಥಗಳು.',
    },
    path: [
      'shaunaka-samhita',
      'gopatha-brahmana',
      'mundaka-upanishad',
      'mandukya-upanishad',
      'atharva-pratishakhya',
      'kaushika-sutra',
      'vaitana-shrauta',
    ],
    notOnPath: [
      {
        en: 'The Atharvaveda has no āraṇyaka; its upaniṣads stand on their own.',
        kn: 'ಅಥರ್ವವೇದಕ್ಕೆ ಆರಣ್ಯಕವಿಲ್ಲ; ಇದರ ಉಪನಿಷತ್ತುಗಳು ಸ್ವತಂತ್ರ.',
      },
    ],
  },
  {
    slug: 'paippalada',
    veda: 'atharva',
    name: { en: 'Paippalāda', kn: 'ಪೈಪ್ಪಲಾದ' },
    sa: 'पैप्पलाद',
    intro: {
      en: 'The second surviving Atharvaveda recension, named after the sage Pippalāda — the teacher of the Praśna Upaniṣad.',
      kn: 'ಉಳಿದಿರುವ ಎರಡನೆಯ ಅಥರ್ವವೇದ ಪಾಠ — ಪ್ರಶ್ನೋಪನಿಷತ್ತಿನ ಆಚಾರ್ಯ ಪಿಪ್ಪಲಾದ ಮಹರ್ಷಿಯ ಹೆಸರಿನಲ್ಲಿ.',
    },
    path: ['paippalada-samhita', 'gopatha-brahmana', 'prashna-upanishad'],
    notOnPath: [
      {
        en: 'No brāhmaṇa of its own survives; the Gopatha is shared across the Atharvaveda.',
        kn: 'ತನ್ನದೇ ಬ್ರಾಹ್ಮಣ ಉಳಿದಿಲ್ಲ; ಗೋಪಥ ಬ್ರಾಹ್ಮಣ ಇಡೀ ಅಥರ್ವವೇದಕ್ಕೆ ಸಾಮಾನ್ಯ.',
      },
    ],
  },
  {
    slug: 'vedanga',
    name: { en: 'The six Vedāṅgas', kn: 'ಷಡ್ವೇದಾಂಗಗಳು' },
    sa: 'षडङ्गानि',
    intro: {
      en: 'The limbs that let the Veda be recited, understood and used. Śikṣā and Kalpa belong to each śākhā and sit on its path; Vyākaraṇa, Nirukta, Chandas and Jyotiṣa serve every Veda.',
      kn: 'ವೇದವನ್ನು ಪಠಿಸಲು, ಅರಿಯಲು ಮತ್ತು ಬಳಸಲು ನೆರವಾಗುವ ಅಂಗಗಳು. ಶಿಕ್ಷಾ ಮತ್ತು ಕಲ್ಪ ಪ್ರತಿ ಶಾಖೆಗೆ ಸೇರಿದ್ದು ಅದರ ಮಾರ್ಗದಲ್ಲಿವೆ; ವ್ಯಾಕರಣ, ನಿರುಕ್ತ, ಛಂದಸ್ಸು, ಜ್ಯೋತಿಷ ಎಲ್ಲ ವೇದಗಳಿಗೂ ಸಾಮಾನ್ಯ.',
    },
    path: ['shiksha', 'kalpa', 'vyakarana', 'nirukta', 'chandas', 'jyotisha'],
    notOnPath: [
      {
        en: 'Piṅgala’s Chandaḥsūtra: no open e-text we can vouch for yet.',
        kn: 'ಪಿಂಗಳರ ಛಂದಃಸೂತ್ರ: ವಿಶ್ವಾಸಾರ್ಹ ಮುಕ್ತ ಇ-ಪಠ್ಯ ಇನ್ನೂ ದೊರೆತಿಲ್ಲ.',
      },
    ],
  },
];

/** Pāṇinīya Śikṣā 41–42: the Vedāṅgas as the limbs of the Veda-puruṣa. */
export const LIMBS: Array<{ textId: string; limb: L }> = [
  { textId: 'chandas', limb: { en: 'feet', kn: 'ಪಾದಗಳು' } },
  { textId: 'kalpa', limb: { en: 'hands', kn: 'ಕೈಗಳು' } },
  { textId: 'jyotisha', limb: { en: 'eyes', kn: 'ಕಣ್ಣುಗಳು' } },
  { textId: 'nirukta', limb: { en: 'ears', kn: 'ಕಿವಿಗಳು' } },
  { textId: 'shiksha', limb: { en: 'nose', kn: 'ಮೂಗು' } },
  { textId: 'vyakarana', limb: { en: 'mouth', kn: 'ಮುಖ' } },
];

const textById = new Map(TEXTS.map((t) => [t.id, t]));
const collectionBySlug = new Map(COLLECTIONS.map((c) => [c.slug, c]));

export function getText(id: string): VedicText | undefined {
  return textById.get(id);
}

export function getCollection(slug: string): Collection | undefined {
  return collectionBySlug.get(slug);
}

export function getVeda(id: VedaId): Veda {
  return VEDAS.find((v) => v.id === id)!;
}

export function textHref(text: VedicText): string {
  return `/resources/${text.home}/${text.id}`;
}

/** Collections that list this text on their path but are not its home. */
export function sharedWith(text: VedicText): Collection[] {
  return COLLECTIONS.filter((c) => c.slug !== text.home && c.path.includes(text.id));
}

/** Other śākhās of the same Veda (and branch, for Yajurveda). */
export function siblingCollections(collection: Collection): Collection[] {
  if (!collection.veda) return [];
  return COLLECTIONS.filter(
    (c) => c.veda === collection.veda && c.branch === collection.branch && c.slug !== collection.slug
  );
}

export function pick(value: L, locale: string): string {
  return locale === 'kn' ? value.kn : value.en;
}
