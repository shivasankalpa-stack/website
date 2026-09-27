/**
 * Content for the "From Śiṣya to Guru" animated storyboard
 * (components/blocks/VidyarthiStoryboard), in English and Kannada.
 *
 * Two stories share one player:
 *   JOURNEY_SCENES — a Veda Vidyārthī's life, from joining the Gurukula
 *                    to becoming a Guru himself.
 *   DAY_SCENES     — a single day at the Gurukula, Brāhma Muhūrta to night.
 *
 * The artwork for each scene is looked up by `id` in
 * components/blocks/VidyarthiStoryboard/{journey,day}-scenes.tsx, so the text
 * here can be edited freely without touching the illustrations.
 *
 * sky / sun / night drive the shared landscape (sky colour, the sun's arc,
 * darkness) which animates smoothly between scenes.
 */

export type StoryLocale = 'en' | 'kn';
type Localised = Record<StoryLocale, string>;

export interface StoryVerse {
  devanagari: string;
  iast: string;
  meaning: Localised;
  source?: string;
}

export interface StoryScene {
  id: string;
  /** Badge on the picture, e.g. "6:00 AM" or "Age 8 · Upanayana" */
  time: Localised;
  /** Short label under the timeline segment */
  label: Localised;
  devanagari: string;
  title: Localised;
  text: Localised;
  verse?: StoryVerse;
  /** Recitation patterns shown instead of a verse (Pada / Krama / Jaṭā / Ghana) */
  patterns?: { name: Localised; seq: string }[];
  /** Show a "see a day in his life" link that switches to the Day story */
  linkToDay?: boolean;
  /** Sky gradient: [zenith, horizon] */
  sky: [string, string];
  /** Sun along its arc: 0 = sunrise (left), 0.5 = noon, 1 = sunset (right). Outside 0–1 = below the horizon. */
  sun: number;
  /** Darkness laid over the landscape: 0 (bright day) – ~0.6 (night). */
  night: number;
}

export const STORY_UI = {
  eyebrow: 'गुरुशिष्यपरम्परा',
  title: { en: 'From Śiṣya to Guru', kn: 'ಶಿಷ್ಯನಿಂದ ಗುರುವಿನವರೆಗೆ' },
  subtitle: {
    en: 'Follow a Veda Vidyārthī’s journey from his first day at the Gurukula to the day he becomes a Guru himself — or step into a single day of his life.',
    kn: 'ಗುರುಕುಲದಲ್ಲಿ ಮೊದಲ ದಿನದಿಂದ ತಾನೇ ಗುರುವಾಗುವವರೆಗಿನ ವೇದ ವಿದ್ಯಾರ್ಥಿಯ ಪಯಣವನ್ನು — ಅಥವಾ ಅವನ ಜೀವನದ ಒಂದು ದಿನವನ್ನು — ನೋಡಿ.',
  },
  tabs: {
    journey: { en: 'The Journey', kn: 'ಪಯಣ' },
    day: { en: 'A Day at the Gurukula', kn: 'ಗುರುಕುಲದಲ್ಲಿ ಒಂದು ದಿನ' },
  },
  seeDay: { en: 'See a day in his life', kn: 'ಅವನ ಒಂದು ದಿನವನ್ನು ನೋಡಿ' },
  play: { en: 'Play', kn: 'ಆರಂಭಿಸಿ' },
  pause: { en: 'Pause', kn: 'ನಿಲ್ಲಿಸಿ' },
  previous: { en: 'Previous scene', kn: 'ಹಿಂದಿನ ದೃಶ್ಯ' },
  next: { en: 'Next scene', kn: 'ಮುಂದಿನ ದೃಶ್ಯ' },
  goTo: { en: 'Go to', kn: 'ಇಲ್ಲಿಗೆ ಹೋಗಿ:' },
  sceneOf: { en: 'Scene {n} of {total}', kn: 'ದೃಶ್ಯ {n} / {total}' },
  note: {
    journey: {
      en: 'Durations are indicative; the length of study varies with the Veda, the śākhā and the level (e.g. Kramānta, Ghanānta).',
      kn: 'ಅವಧಿಗಳು ಸೂಚಕ ಮಾತ್ರ; ವೇದ, ಶಾಖೆ ಮತ್ತು ಹಂತಕ್ಕೆ (ಉದಾ: ಕ್ರಮಾಂತ, ಘನಾಂತ) ಅನುಗುಣವಾಗಿ ಅಧ್ಯಯನದ ಅವಧಿ ಬದಲಾಗುತ್ತದೆ.',
    },
    day: {
      en: 'Timings are indicative and vary from Gurukula to Gurukula.',
      kn: 'ಸಮಯಗಳು ಸೂಚಕ ಮಾತ್ರ; ಗುರುಕುಲದಿಂದ ಗುರುಕುಲಕ್ಕೆ ಬದಲಾಗುತ್ತವೆ.',
    },
  },
} as const;

/* ═══════════════════════════════ The Journey ═══════════════════════════════ */

export const JOURNEY_SCENES: StoryScene[] = [
  {
    id: 'j-pravesha',
    time: { en: 'Age 7–8 · Praveśa', kn: 'ವಯಸ್ಸು 7–8 · ಪ್ರವೇಶ' },
    label: { en: 'Praveśa', kn: 'ಪ್ರವೇಶ' },
    devanagari: 'गुरुकुलप्रवेशः',
    title: { en: 'Arriving at the Gurukula', kn: 'ಗುರುಕುಲಕ್ಕೆ ಆಗಮನ' },
    text: {
      en: 'With a tin trunk, a plate of fruits and a heart full of wonder, a young boy arrives with his parents. He bows at the Ācārya’s feet — and a new family, the Guru–Śiṣya Paramparā, receives him.',
      kn: 'ಒಂದು ತಗಡಿನ ಪೆಟ್ಟಿಗೆ, ಹಣ್ಣಿನ ತಟ್ಟೆ ಮತ್ತು ಕುತೂಹಲ ತುಂಬಿದ ಮನಸ್ಸಿನೊಂದಿಗೆ ಪುಟ್ಟ ಬಾಲಕ ತನ್ನ ತಂದೆ-ತಾಯಿಯರೊಡನೆ ಬರುತ್ತಾನೆ. ಆಚಾರ್ಯರ ಪಾದಗಳಿಗೆ ನಮಸ್ಕರಿಸುತ್ತಾನೆ — ಗುರು–ಶಿಷ್ಯ ಪರಂಪರೆಯೆಂಬ ಹೊಸ ಕುಟುಂಬ ಅವನನ್ನು ಬರಮಾಡಿಕೊಳ್ಳುತ್ತದೆ.',
    },
    verse: {
      devanagari: 'तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया ।\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥',
      iast: 'Tad viddhi praṇipātena paripraśnena sevayā | Upadekṣyanti te jñānaṃ jñāninas tattvadarśinaḥ ||',
      meaning: {
        en: 'Learn it through humble reverence, sincere questioning and service; the wise who have seen the Truth will teach you.',
        kn: 'ವಿನಯದ ನಮಸ್ಕಾರ, ಪ್ರಾಮಾಣಿಕ ಪ್ರಶ್ನೆ ಮತ್ತು ಸೇವೆಯಿಂದ ಅದನ್ನು ತಿಳಿ; ತತ್ತ್ವವನ್ನು ಕಂಡ ಜ್ಞಾನಿಗಳು ನಿನಗೆ ಉಪದೇಶಿಸುವರು.',
      },
      source: 'Bhagavad Gītā 4.34',
    },
    sky: ['#6FA8DA', '#F3DDB0'],
    sun: 0.22,
    night: 0,
  },
  {
    id: 'j-upanayana',
    time: { en: 'Age 8 · Upanayana', kn: 'ವಯಸ್ಸು 8 · ಉಪನಯನ' },
    label: { en: 'Upanayana', kn: 'ಉಪನಯನ' },
    devanagari: 'उपनयनम्',
    title: { en: 'Upanayana — the Second Birth', kn: 'ಉಪನಯನ — ಎರಡನೆಯ ಜನ್ಮ' },
    text: {
      en: 'Before the sacred fire he receives the yajñopavīta, and his father (or Ācārya) imparts the Gāyatrī mantra to him — Brahmopadeśa. He is now a brahmacārī, ready to begin the study of the Veda.',
      kn: 'ಪವಿತ್ರ ಅಗ್ನಿಯ ಸಮ್ಮುಖದಲ್ಲಿ ಅವನು ಯಜ್ಞೋಪವೀತವನ್ನು ಧರಿಸುತ್ತಾನೆ; ತಂದೆ (ಅಥವಾ ಆಚಾರ್ಯರು) ಅವನಿಗೆ ಗಾಯತ್ರೀ ಮಂತ್ರವನ್ನು ಉಪದೇಶಿಸುತ್ತಾರೆ — ಬ್ರಹ್ಮೋಪದೇಶ. ಈಗ ಅವನು ಬ್ರಹ್ಮಚಾರಿ; ವೇದಾಧ್ಯಯನಕ್ಕೆ ಸಿದ್ಧ.',
    },
    verse: {
      devanagari: 'यज्ञोपवीतं परमं पवित्रं प्रजापतेर्यत्सहजं पुरस्तात् ।\nआयुष्यमग्र्यं प्रतिमुञ्च शुभ्रं यज्ञोपवीतं बलमस्तु तेजः ॥',
      iast: 'Yajñopavītaṃ paramaṃ pavitraṃ prajāpater yat sahajaṃ purastāt | Āyuṣyam agryaṃ pratimuñca śubhraṃ yajñopavītaṃ balam astu tejaḥ ||',
      meaning: {
        en: 'This sacred thread, supremely pure, born with Prajāpati in the beginning — wear it, bright and foremost, for long life; may it be your strength and radiance.',
        kn: 'ಆದಿಯಲ್ಲಿ ಪ್ರಜಾಪತಿಯೊಡನೆ ಹುಟ್ಟಿದ, ಪರಮ ಪವಿತ್ರವಾದ ಈ ಯಜ್ಞೋಪವೀತವನ್ನು ಧರಿಸು — ಅದು ನಿನಗೆ ಆಯುಸ್ಸು, ಬಲ ಮತ್ತು ತೇಜಸ್ಸನ್ನು ನೀಡಲಿ.',
      },
      source: 'Yajñopavīta-dhāraṇa mantra',
    },
    sky: ['#79B2E2', '#F5E6BE'],
    sun: 0.3,
    night: 0,
  },
  {
    id: 'j-samhita',
    time: { en: 'Years 1–4 · Saṃhitā', kn: 'ವರ್ಷ 1–4 · ಸಂಹಿತಾ' },
    label: { en: 'Saṃhitā', kn: 'ಸಂಹಿತಾ' },
    devanagari: 'संहिताध्ययनम्',
    title: { en: 'Years of Listening and Repeating', kn: 'ಕೇಳಿ, ಪುನರುಚ್ಚರಿಸುವ ವರ್ಷಗಳು' },
    text: {
      en: 'Day after day, by ear and by heart, he learns the Saṃhitā — each syllable with its svara, exactly as his Guru received it from his own. Discipline, sevā and play fill the rest of his day.',
      kn: 'ದಿನದಿಂದ ದಿನಕ್ಕೆ, ಕಿವಿಯಿಂದ ಕೇಳಿ ಹೃದಯದಲ್ಲಿ ನೆಲೆಗೊಳಿಸುತ್ತಾ, ಅವನು ಸಂಹಿತೆಯನ್ನು ಕಲಿಯುತ್ತಾನೆ — ಪ್ರತಿಯೊಂದು ಅಕ್ಷರವನ್ನೂ ಅದರ ಸ್ವರದೊಂದಿಗೆ, ತನ್ನ ಗುರುಗಳು ಅವರ ಗುರುಗಳಿಂದ ಪಡೆದ ರೀತಿಯಲ್ಲೇ. ಶಿಸ್ತು, ಸೇವೆ ಮತ್ತು ಆಟ ದಿನದ ಉಳಿದ ಭಾಗವನ್ನು ತುಂಬುತ್ತವೆ.',
    },
    verse: {
      devanagari: 'आचार्यात् पादमादत्ते पादं शिष्यः स्वमेधया ।\nपादं सब्रह्मचारिभ्यः पादं कालक्रमेण च ॥',
      iast: 'Ācāryāt pādam ādatte pādaṃ śiṣyaḥ svamedhayā | Pādaṃ sabrahmacāribhyaḥ pādaṃ kālakrameṇa ca ||',
      meaning: {
        en: 'A quarter the student gains from the teacher, a quarter by his own intellect, a quarter from fellow students, and a quarter with time.',
        kn: 'ಕಾಲು ಭಾಗ ಆಚಾರ್ಯರಿಂದ, ಕಾಲು ಭಾಗ ಸ್ವಂತ ಬುದ್ಧಿಯಿಂದ, ಕಾಲು ಭಾಗ ಸಹಪಾಠಿಗಳಿಂದ, ಉಳಿದ ಕಾಲು ಭಾಗ ಕಾಲಕ್ರಮದಲ್ಲಿ ಶಿಷ್ಯನು ಕಲಿಯುತ್ತಾನೆ.',
      },
      source: 'Subhāṣita',
    },
    linkToDay: true,
    sky: ['#7DB4E0', '#F4E3B8'],
    sun: 0.24,
    night: 0,
  },
  {
    id: 'j-ghana',
    time: { en: 'Years 5–10 · Pada to Ghana', kn: 'ವರ್ಷ 5–10 · ಪದದಿಂದ ಘನದವರೆಗೆ' },
    label: { en: 'Ghana', kn: 'ಘನ' },
    devanagari: 'पद-क्रम-जटा-घनपाठाः',
    title: { en: 'Weaving the Words: Pada, Krama, Jaṭā, Ghana', kn: 'ಪದಗಳ ಹೆಣಿಗೆ: ಪದ, ಕ್ರಮ, ಜಟಾ, ಘನ' },
    text: {
      en: 'To guard every word against change, the Ṛṣis devised ingenious recitations. In Pada each word stands alone; Krama chants them in overlapping pairs; Jaṭā weaves each pair forward and back; and Ghana — the crown — braids three words at a time. Mastering Ghana takes many years.',
      kn: 'ಪ್ರತಿಯೊಂದು ಪದವೂ ಬದಲಾಗದಂತೆ ಕಾಪಾಡಲು ಋಷಿಗಳು ಅದ್ಭುತ ಪಠಣ ವಿಧಾನಗಳನ್ನು ರೂಪಿಸಿದರು. ಪದಪಾಠದಲ್ಲಿ ಪ್ರತಿ ಪದ ಪ್ರತ್ಯೇಕ; ಕ್ರಮದಲ್ಲಿ ಜೋಡಿ ಜೋಡಿಯಾಗಿ; ಜಟೆಯಲ್ಲಿ ಪ್ರತಿ ಜೋಡಿಯನ್ನು ಮುಂದೆ-ಹಿಂದೆ ಹೆಣೆದು; ಶಿಖರಪ್ರಾಯವಾದ ಘನದಲ್ಲಿ ಮೂರು ಪದಗಳನ್ನು ಒಟ್ಟಿಗೆ ಹೆಣೆಯಲಾಗುತ್ತದೆ. ಘನವನ್ನು ಸಿದ್ಧಿಸಿಕೊಳ್ಳಲು ಹಲವು ವರ್ಷಗಳು ಬೇಕು.',
    },
    patterns: [
      { name: { en: 'Pada', kn: 'ಪದ' }, seq: 'a · b · c' },
      { name: { en: 'Krama', kn: 'ಕ್ರಮ' }, seq: 'ab · bc · cd' },
      { name: { en: 'Jaṭā', kn: 'ಜಟಾ' }, seq: 'ab ba ab · bc cb bc' },
      { name: { en: 'Ghana', kn: 'ಘನ' }, seq: 'ab ba abc cba abc' },
    ],
    sky: ['#6FAEE0', '#EAF0E6'],
    sun: 0.42,
    night: 0,
  },
  {
    id: 'j-modern',
    time: { en: 'Alongside · Modern learning', kn: 'ಜೊತೆಜೊತೆಗೆ · ಆಧುನಿಕ ಕಲಿಕೆ' },
    label: { en: 'Modern skills', kn: 'ಆಧುನಿಕ ಕಲಿಕೆ' },
    devanagari: 'विद्यासमन्वयः',
    title: { en: 'Veda and the Modern Classroom', kn: 'ವೇದ ಮತ್ತು ಆಧುನಿಕ ತರಗತಿ' },
    text: {
      en: 'Alongside the Veda, today’s Vidyārthīs study mathematics, science, English and computers, and several Gurukulas also prepare them for school board examinations. Traditional vidyā and modern skills grow together, preparing them to serve in any walk of life.',
      kn: 'ವೇದದ ಜೊತೆಜೊತೆಗೆ ಇಂದಿನ ವಿದ್ಯಾರ್ಥಿಗಳು ಗಣಿತ, ವಿಜ್ಞಾನ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಕಲಿಯುತ್ತಾರೆ; ಹಲವು ಗುರುಕುಲಗಳು ಶಾಲಾ ಮಂಡಳಿ ಪರೀಕ್ಷೆಗಳಿಗೂ ಸಿದ್ಧಪಡಿಸುತ್ತವೆ. ಪಾರಂಪರಿಕ ವಿದ್ಯೆ ಮತ್ತು ಆಧುನಿಕ ಕೌಶಲಗಳು ಒಟ್ಟಿಗೆ ಬೆಳೆದು, ಯಾವುದೇ ಕ್ಷೇತ್ರದಲ್ಲಿ ಸೇವೆ ಸಲ್ಲಿಸಲು ಅವರನ್ನು ಸಜ್ಜುಗೊಳಿಸುತ್ತವೆ.',
    },
    verse: {
      devanagari: 'विद्या ददाति विनयं विनयाद् याति पात्रताम् ।\nपात्रत्वाद् धनमाप्नोति धनाद् धर्मं ततः सुखम् ॥',
      iast: 'Vidyā dadāti vinayaṃ vinayād yāti pātratām | Pātratvād dhanam āpnoti dhanād dharmaṃ tataḥ sukham ||',
      meaning: {
        en: 'Knowledge gives humility; humility brings worthiness; worthiness brings wealth; wealth enables dharma; and dharma brings happiness.',
        kn: 'ವಿದ್ಯೆ ವಿನಯವನ್ನು ನೀಡುತ್ತದೆ; ವಿನಯದಿಂದ ಯೋಗ್ಯತೆ; ಯೋಗ್ಯತೆಯಿಂದ ಸಂಪತ್ತು; ಸಂಪತ್ತಿನಿಂದ ಧರ್ಮ; ಧರ್ಮದಿಂದ ಸುಖ.',
      },
      source: 'Hitopadeśa',
    },
    sky: ['#66A8DC', '#EFE3B4'],
    sun: 0.62,
    night: 0,
  },
  {
    id: 'j-rashtra',
    time: { en: 'Every year · Utsava & Rāṣṭra', kn: 'ಪ್ರತಿ ವರ್ಷ · ಉತ್ಸವ ಮತ್ತು ರಾಷ್ಟ್ರ' },
    label: { en: 'Utsava', kn: 'ಉತ್ಸವ' },
    devanagari: 'राष्ट्रभक्तिः उत्सवाश्च',
    title: { en: 'Festivals, Competitions and Love for the Nation', kn: 'ಉತ್ಸವಗಳು, ಸ್ಪರ್ಧೆಗಳು ಮತ್ತು ರಾಷ್ಟ್ರಪ್ರೇಮ' },
    text: {
      en: 'Independence Day and Republic Day are celebrated with flag hoisting, Vande Mātaram and patriotic songs. Festivals, Veda sammelanas, recitation and quiz competitions and cultural programmes build confidence, teamwork and a deep love for Bhārata.',
      kn: 'ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ ಮತ್ತು ಗಣರಾಜ್ಯೋತ್ಸವಗಳನ್ನು ಧ್ವಜಾರೋಹಣ, ವಂದೇ ಮಾತರಂ ಮತ್ತು ದೇಶಭಕ್ತಿ ಗೀತೆಗಳೊಂದಿಗೆ ಆಚರಿಸಲಾಗುತ್ತದೆ. ಹಬ್ಬಗಳು, ವೇದ ಸಮ್ಮೇಳನಗಳು, ಪಠಣ ಹಾಗೂ ರಸಪ್ರಶ್ನೆ ಸ್ಪರ್ಧೆಗಳು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಆತ್ಮವಿಶ್ವಾಸ, ತಂಡಭಾವ ಮತ್ತು ಭಾರತದ ಬಗ್ಗೆ ಆಳವಾದ ಪ್ರೀತಿಯನ್ನು ಬೆಳೆಸುತ್ತವೆ.',
    },
    verse: {
      devanagari: 'माता भूमिः पुत्रो अहं पृथिव्याः ।',
      iast: 'Mātā bhūmiḥ putro ahaṃ pṛthivyāḥ |',
      meaning: {
        en: 'The Earth is my mother, and I am her son.',
        kn: 'ಭೂಮಿಯೇ ನನ್ನ ತಾಯಿ, ನಾನು ಅವಳ ಮಗ.',
      },
      source: 'Atharvaveda 12.1.12',
    },
    sky: ['#5EA8E2', '#DCECF2'],
    sun: 0.34,
    night: 0,
  },
  {
    id: 'j-pariksha',
    time: { en: 'Years 10–12 · Parīkṣā', kn: 'ವರ್ಷ 10–12 · ಪರೀಕ್ಷೆ' },
    label: { en: 'Parīkṣā', kn: 'ಪರೀಕ್ಷೆ' },
    devanagari: 'विद्वत्सभायां परीक्षा',
    title: { en: 'Examined Before the Scholars', kn: 'ವಿದ್ವಾಂಸರ ಸಮ್ಮುಖದಲ್ಲಿ ಪರೀಕ್ಷೆ' },
    text: {
      en: 'At the end of his studies he recites before a sabhā of senior Vedic scholars, often under the aegis of great Maṭhas such as Sringeri Sharada Peetham. The examiners may ask for any passage of his Veda, and every one must be flawless. Success earns him an honoured title such as Ghanapāṭhī.',
      kn: 'ಅಧ್ಯಯನದ ಕೊನೆಯಲ್ಲಿ ಅವನು ಹಿರಿಯ ವೇದ ವಿದ್ವಾಂಸರ ಸಭೆಯ ಮುಂದೆ ಪಠಿಸುತ್ತಾನೆ — ಅನೇಕ ವೇಳೆ ಶೃಂಗೇರಿ ಶಾರದಾ ಪೀಠದಂತಹ ಮಹಾ ಮಠಗಳ ಆಶ್ರಯದಲ್ಲಿ. ಪರೀಕ್ಷಕರು ಅವನ ವೇದದ ಯಾವುದೇ ಭಾಗವನ್ನು ಕೇಳಬಹುದು; ಪ್ರತಿಯೊಂದೂ ದೋಷರಹಿತವಾಗಿರಬೇಕು. ಯಶಸ್ಸು ಅವನಿಗೆ ‘ಘನಪಾಠಿ’ಯಂತಹ ಗೌರವ ಬಿರುದನ್ನು ತಂದುಕೊಡುತ್ತದೆ.',
    },
    verse: {
      devanagari: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ।',
      iast: 'Na hi jñānena sadṛśaṃ pavitram iha vidyate |',
      meaning: {
        en: 'Truly, there is nothing in this world as purifying as knowledge.',
        kn: 'ಈ ಲೋಕದಲ್ಲಿ ಜ್ಞಾನಕ್ಕೆ ಸಮಾನವಾದ ಪವಿತ್ರವಾದುದು ಬೇರೊಂದಿಲ್ಲ.',
      },
      source: 'Bhagavad Gītā 4.38',
    },
    sky: ['#6FA6D6', '#EFE0B0'],
    sun: 0.55,
    night: 0,
  },
  {
    id: 'j-samavartana',
    time: { en: 'Completion · Samāvartana', kn: 'ಪೂರ್ಣತೆ · ಸಮಾವರ್ತನ' },
    label: { en: 'Samāvartana', kn: 'ಸಮಾವರ್ತನ' },
    devanagari: 'समावर्तनम्',
    title: { en: 'Samāvartana — the Guru’s Parting Words', kn: 'ಸಮಾವರ್ತನ — ಗುರುವಿನ ಬೀಳ್ಕೊಡುಗೆಯ ಉಪದೇಶ' },
    text: {
      en: 'His study complete, he offers gurudakṣiṇā and receives his Guru’s blessing and the timeless convocation address of the Taittirīya Upaniṣad — words that will guide the rest of his life.',
      kn: 'ಅಧ್ಯಯನ ಪೂರ್ಣಗೊಂಡ ಮೇಲೆ ಅವನು ಗುರುದಕ್ಷಿಣೆಯನ್ನು ಅರ್ಪಿಸಿ, ಗುರುವಿನ ಆಶೀರ್ವಾದವನ್ನೂ ತೈತ್ತಿರೀಯ ಉಪನಿಷತ್ತಿನ ಸಾರ್ವಕಾಲಿಕ ಉಪದೇಶವನ್ನೂ ಪಡೆಯುತ್ತಾನೆ — ಆ ಮಾತುಗಳು ಜೀವನವಿಡೀ ಅವನಿಗೆ ದಾರಿದೀಪ.',
    },
    verse: {
      devanagari: 'सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ।',
      iast: 'Satyaṃ vada | Dharmaṃ cara | Svādhyāyān mā pramadaḥ |',
      meaning: {
        en: 'Speak the truth. Walk the path of dharma. Never neglect your study.',
        kn: 'ಸತ್ಯವನ್ನೇ ನುಡಿ. ಧರ್ಮದಲ್ಲಿ ನಡೆ. ಸ್ವಾಧ್ಯಾಯದಲ್ಲಿ ಎಂದೂ ಅಲಕ್ಷ್ಯ ಮಾಡಬೇಡ.',
      },
      source: 'Taittirīya Upaniṣad 1.11.1',
    },
    sky: ['#7AA6D4', '#F6D59A'],
    sun: 0.78,
    night: 0.02,
  },
  {
    id: 'j-seva',
    time: { en: 'Service · Loka-kalyāṇa', kn: 'ಸೇವೆ · ಲೋಕಕಲ್ಯಾಣ' },
    label: { en: 'Sevā', kn: 'ಸೇವೆ' },
    devanagari: 'लोककल्याणाय सेवा',
    title: { en: 'Serving Society as a Vaidika', kn: 'ವೈದಿಕನಾಗಿ ಸಮಾಜಸೇವೆ' },
    text: {
      en: 'Now a scholar, he serves as a ṛtvik in yajñas, joins Rudra pārāyaṇas and Mahārudras, and chants in temples and homes — carrying the blessings of the Veda to society for loka-kalyāṇa.',
      kn: 'ಈಗ ವಿದ್ವಾಂಸನಾಗಿ ಅವನು ಯಜ್ಞಗಳಲ್ಲಿ ಋತ್ವಿಜನಾಗಿ, ರುದ್ರಪಾರಾಯಣ ಮತ್ತು ಮಹಾರುದ್ರಗಳಲ್ಲಿ ಭಾಗವಹಿಸುತ್ತಾ, ದೇವಾಲಯಗಳು ಮತ್ತು ಮನೆಗಳಲ್ಲಿ ವೇದಘೋಷ ಮಾಡುತ್ತಾ — ಲೋಕಕಲ್ಯಾಣಕ್ಕಾಗಿ ವೇದದ ಆಶೀರ್ವಾದವನ್ನು ಸಮಾಜಕ್ಕೆ ತಲುಪಿಸುತ್ತಾನೆ.',
    },
    verse: {
      devanagari: 'लोकाः समस्ताः सुखिनो भवन्तु ।',
      iast: 'Lokāḥ samastāḥ sukhino bhavantu |',
      meaning: {
        en: 'May all the worlds be happy.',
        kn: 'ಸಮಸ್ತ ಲೋಕಗಳೂ ಸುಖವಾಗಿರಲಿ.',
      },
    },
    sky: ['#4b3f7e', '#f08c4e'],
    sun: 0.96,
    night: 0.18,
  },
  {
    id: 'j-guru',
    time: { en: 'The circle turns · Guru', kn: 'ಚಕ್ರ ಮುಂದುವರಿಯುತ್ತದೆ · ಗುರು' },
    label: { en: 'Guru', kn: 'ಗುರು' },
    devanagari: 'शिष्यो गुरुर्भवति',
    title: { en: 'The Śiṣya Becomes the Guru', kn: 'ಶಿಷ್ಯನೇ ಗುರುವಾಗುತ್ತಾನೆ' },
    text: {
      en: 'Years later, he sits where his own Guru once sat. A young boy arrives with his parents and bows before him — and the unbroken Guru–Śiṣya Paramparā continues.',
      kn: 'ವರ್ಷಗಳ ನಂತರ, ಒಮ್ಮೆ ತನ್ನ ಗುರುಗಳು ಕುಳಿತಿದ್ದ ಸ್ಥಾನದಲ್ಲಿ ಅವನು ಕುಳಿತಿದ್ದಾನೆ. ಪುಟ್ಟ ಬಾಲಕನೊಬ್ಬ ತಂದೆ-ತಾಯಿಯರೊಡನೆ ಬಂದು ಅವನಿಗೆ ನಮಸ್ಕರಿಸುತ್ತಾನೆ — ಅವಿಚ್ಛಿನ್ನ ಗುರು–ಶಿಷ್ಯ ಪರಂಪರೆ ಮುಂದುವರಿಯುತ್ತದೆ.',
    },
    verse: {
      devanagari: 'सदाशिवसमारम्भां शङ्कराचार्यमध्यमाम् ।\nअस्मदाचार्यपर्यन्तां वन्दे गुरुपरम्पराम् ॥',
      iast: 'Sadāśiva-samārambhāṃ Śaṅkarācārya-madhyamām | Asmad-ācārya-paryantāṃ vande guru-paramparām ||',
      meaning: {
        en: 'I bow to the lineage of Gurus — beginning with Sadāśiva, with Śaṅkarācārya in the middle, and reaching down to my own teacher.',
        kn: 'ಸದಾಶಿವನಿಂದ ಆರಂಭವಾಗಿ, ಶಂಕರಾಚಾರ್ಯರು ಮಧ್ಯದಲ್ಲಿದ್ದು, ನನ್ನ ಆಚಾರ್ಯರವರೆಗೆ ಬರುವ ಗುರುಪರಂಪರೆಗೆ ವಂದಿಸುತ್ತೇನೆ.',
      },
    },
    sky: ['#6FA8DA', '#F3DDB0'],
    sun: 0.22,
    night: 0,
  },
];

/* ═══════════════════════════════ A Day ═══════════════════════════════ */

const t = (en: string, kn: string) => ({ time: { en, kn }, label: { en, kn } });

export const DAY_SCENES: StoryScene[] = [
  {
    id: 'd-prabodha',
    ...t('4:30 AM', 'ಬೆಳಿಗ್ಗೆ 4:30'),
    devanagari: 'ब्राह्ममुहूर्ते प्रबोधः',
    title: { en: 'Rising in Brāhma Muhūrta', kn: 'ಬ್ರಾಹ್ಮ ಮುಹೂರ್ತದಲ್ಲಿ ಏಳುವುದು' },
    text: {
      en: 'Long before sunrise, in the stillest hour of the day, the Vidyārthī wakes. Beholding the palms, remembering Lakṣmī, Sarasvatī and Govinda, and bowing to Bhūdevī before stepping upon the earth — the day begins in gratitude.',
      kn: 'ಸೂರ್ಯೋದಯಕ್ಕೆ ಬಹಳ ಮೊದಲೇ, ದಿನದ ಅತ್ಯಂತ ಪ್ರಶಾಂತ ಹೊತ್ತಿನಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಏಳುತ್ತಾನೆ. ಅಂಗೈಗಳನ್ನು ನೋಡಿ ಲಕ್ಷ್ಮೀ, ಸರಸ್ವತೀ, ಗೋವಿಂದರನ್ನು ಸ್ಮರಿಸಿ, ನೆಲದ ಮೇಲೆ ಕಾಲಿಡುವ ಮೊದಲು ಭೂದೇವಿಗೆ ನಮಸ್ಕರಿಸುತ್ತಾನೆ — ದಿನವು ಕೃತಜ್ಞತೆಯಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.',
    },
    verse: {
      devanagari: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती ।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम् ॥',
      iast: 'Karāgre vasate Lakṣmīḥ karamadhye Sarasvatī | Karamūle tu Govindaḥ prabhāte karadarśanam ||',
      meaning: {
        en: 'Lakṣmī dwells at the fingertips, Sarasvatī in the palm, Govinda at its base — so behold your hands at dawn.',
        kn: 'ಕೈಯ ತುದಿಯಲ್ಲಿ ಲಕ್ಷ್ಮಿ, ಅಂಗೈ ಮಧ್ಯದಲ್ಲಿ ಸರಸ್ವತಿ, ಮೂಲದಲ್ಲಿ ಗೋವಿಂದ — ಆದ್ದರಿಂದ ಮುಂಜಾನೆ ಕರದರ್ಶನ ಮಾಡಬೇಕು.',
      },
    },
    sky: ['#070d24', '#27305c'],
    sun: -0.3,
    night: 0.55,
  },
  {
    id: 'd-snana',
    ...t('5:00 AM', 'ಬೆಳಿಗ್ಗೆ 5:00'),
    devanagari: 'स्नानम्',
    title: { en: 'The Sacred Bath', kn: 'ಪವಿತ್ರ ಸ್ನಾನ' },
    text: {
      en: 'A cool bath at the river, temple tank or well cleanses body and mind. The holy rivers are invoked, so that every drop of water becomes tīrtha.',
      kn: 'ನದಿ, ಕಲ್ಯಾಣಿ ಅಥವಾ ಬಾವಿಯ ತಣ್ಣೀರಿನ ಸ್ನಾನ ದೇಹ ಮತ್ತು ಮನಸ್ಸನ್ನು ಶುದ್ಧಗೊಳಿಸುತ್ತದೆ. ಪುಣ್ಯನದಿಗಳನ್ನು ಆವಾಹಿಸುವುದರಿಂದ ಪ್ರತಿಯೊಂದು ಹನಿಯೂ ತೀರ್ಥವಾಗುತ್ತದೆ.',
    },
    verse: {
      devanagari: 'गङ्गे च यमुने चैव गोदावरि सरस्वति ।\nनर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु ॥',
      iast: 'Gaṅge ca Yamune caiva Godāvari Sarasvati | Narmade Sindhu Kāveri jale’smin sannidhiṃ kuru ||',
      meaning: {
        en: 'O Gaṅgā, Yamunā, Godāvarī, Sarasvatī, Narmadā, Sindhu and Kāverī — be present in this water.',
        kn: 'ಓ ಗಂಗೆ, ಯಮುನೆ, ಗೋದಾವರಿ, ಸರಸ್ವತಿ, ನರ್ಮದೆ, ಸಿಂಧು, ಕಾವೇರಿ — ಈ ಜಲದಲ್ಲಿ ಸನ್ನಿಹಿತರಾಗಿರಿ.',
      },
    },
    sky: ['#1b2250', '#8a6f93'],
    sun: -0.12,
    night: 0.32,
  },
  {
    id: 'd-sandhya',
    ...t('6:00 AM', 'ಬೆಳಿಗ್ಗೆ 6:00'),
    devanagari: 'प्रातःसन्ध्यावन्दनम्',
    title: { en: 'Sandhyāvandanam at Dawn', kn: 'ಪ್ರಾತಃಸಂಧ್ಯಾವಂದನೆ' },
    text: {
      en: 'As the sun rises, the upanīta Vidyārthī offers arghya to Sūrya Nārāyaṇa and sits for Gāyatrī japa — the daily anchor of every Vedic student’s life.',
      kn: 'ಸೂರ್ಯ ಉದಯಿಸುತ್ತಿದ್ದಂತೆ ಉಪನೀತನಾದ ವಿದ್ಯಾರ್ಥಿ ಸೂರ್ಯನಾರಾಯಣನಿಗೆ ಅರ್ಘ್ಯವನ್ನು ಅರ್ಪಿಸಿ ಗಾಯತ್ರೀ ಜಪಕ್ಕೆ ಕುಳಿತುಕೊಳ್ಳುತ್ತಾನೆ — ಇದು ಪ್ರತಿಯೊಬ್ಬ ವೇದ ವಿದ್ಯಾರ್ಥಿಯ ದಿನಚರ್ಯೆಯ ಆಧಾರಸ್ತಂಭ.',
    },
    sky: ['#5f7fb6', '#f7bf86'],
    sun: 0.1,
    night: 0.06,
  },
  {
    id: 'd-adhyayana',
    ...t('7:00 AM', 'ಬೆಳಿಗ್ಗೆ 7:00'),
    devanagari: 'वेदाध्ययनम्',
    title: { en: 'Learning the Veda from the Guru', kn: 'ಗುರುಮುಖದಿಂದ ವೇದಾಧ್ಯಯನ' },
    text: {
      en: 'Seated before the Ācārya, students receive the Veda the way it has always been handed down — by ear. The Guru chants each portion; the students repeat it together, again and again, marking the svaras with the hand — down for anudātta, up for svarita — until every syllable is exact.',
      kn: 'ಆಚಾರ್ಯರ ಎದುರು ಕುಳಿತು, ವಿದ್ಯಾರ್ಥಿಗಳು ಪರಂಪರೆಯಿಂದ ನಡೆದುಬಂದ ರೀತಿಯಲ್ಲೇ — ಕಿವಿಯಿಂದ ಕೇಳಿ — ವೇದವನ್ನು ಕಲಿಯುತ್ತಾರೆ. ಗುರುಗಳು ಒಂದೊಂದು ಭಾಗವನ್ನು ಹೇಳುತ್ತಾರೆ; ಶಿಷ್ಯರು ಒಟ್ಟಾಗಿ ಮತ್ತೆ ಮತ್ತೆ ಪುನರುಚ್ಚರಿಸುತ್ತಾ, ಕೈಯಿಂದ ಸ್ವರಗಳನ್ನು ತೋರಿಸುತ್ತಾ — ಅನುದಾತ್ತಕ್ಕೆ ಕೆಳಗೆ, ಸ್ವರಿತಕ್ಕೆ ಮೇಲೆ — ಪ್ರತಿಯೊಂದು ಅಕ್ಷರವೂ ನಿಖರವಾಗುವವರೆಗೆ ಅಭ್ಯಾಸ ಮಾಡುತ್ತಾರೆ.',
    },
    verse: {
      devanagari: 'अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् ।\nहोता॑रं रत्न॒धात॑मम् ॥',
      iast: 'agním īḷe puróhitaṃ yajñásya devám ṛtvíjam | hótāraṃ ratnadhā́tamam ||',
      meaning: {
        en: 'I praise Agni — the purohita placed in front, the divine ṛtvik of the yajña, the hotṛ, the foremost bestower of treasures.',
        kn: 'ಯಜ್ಞದ ಪುರೋಹಿತನೂ, ದೇವನೂ, ಋತ್ವಿಜನೂ, ಹೋತೃವೂ, ರತ್ನಗಳನ್ನು ಅತ್ಯಧಿಕವಾಗಿ ಕರುಣಿಸುವವನೂ ಆದ ಅಗ್ನಿಯನ್ನು ಸ್ತುತಿಸುತ್ತೇನೆ.',
      },
      source: 'Ṛgveda 1.1.1',
    },
    sky: ['#7db4e0', '#f4e3b8'],
    sun: 0.2,
    night: 0,
  },
  {
    id: 'd-seva',
    ...t('10:00 AM', 'ಬೆಳಿಗ್ಗೆ 10:00'),
    devanagari: 'गुरुसेवा गोसेवा च',
    title: { en: 'Serving the Guru and the Āśrama', kn: 'ಗುರುಸೇವೆ ಮತ್ತು ಗೋಸೇವೆ' },
    text: {
      en: 'Between lessons the students care for their home — sweeping the courtyard, gathering flowers for pūjā, drawing water and feeding the cows. Sevā is as much a part of learning as the Veda itself.',
      kn: 'ಪಾಠಗಳ ನಡುವೆ ವಿದ್ಯಾರ್ಥಿಗಳು ತಮ್ಮ ಆಶ್ರಮವನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತಾರೆ — ಅಂಗಳ ಗುಡಿಸುವುದು, ಪೂಜೆಗೆ ಹೂ ಬಿಡಿಸುವುದು, ನೀರು ತರುವುದು, ಗೋವುಗಳಿಗೆ ಮೇವು ಹಾಕುವುದು. ಸೇವೆಯೂ ವೇದದಷ್ಟೇ ಕಲಿಕೆಯ ಭಾಗ.',
    },
    verse: {
      devanagari: 'आचार्यदेवो भव ।',
      iast: 'Ācāryadevo bhava |',
      meaning: { en: 'Revere your teacher as the Divine.', kn: 'ಆಚಾರ್ಯರನ್ನು ದೇವರೆಂದು ಭಾವಿಸು.' },
      source: 'Taittirīya Upaniṣad 1.11',
    },
    sky: ['#5ea8e2', '#dcecf2'],
    sun: 0.36,
    night: 0,
  },
  {
    id: 'd-bhojana',
    ...t('12:30 PM', 'ಮಧ್ಯಾಹ್ನ 12:30'),
    devanagari: 'भोजनम्',
    title: { en: 'The Midday Meal', kn: 'ಮಧ್ಯಾಹ್ನದ ಭೋಜನ' },
    text: {
      en: 'Seated in a row on the floor before plantain leaves, the students chant together and receive food as prasāda — offered first to the Divine, then eaten in silence and gratitude.',
      kn: 'ಬಾಳೆ ಎಲೆಗಳ ಮುಂದೆ ನೆಲದ ಮೇಲೆ ಸಾಲಾಗಿ ಕುಳಿತು, ವಿದ್ಯಾರ್ಥಿಗಳು ಒಟ್ಟಾಗಿ ಮಂತ್ರ ಹೇಳಿ ಅನ್ನವನ್ನು ಪ್ರಸಾದವಾಗಿ ಸ್ವೀಕರಿಸುತ್ತಾರೆ — ಮೊದಲು ಭಗವಂತನಿಗೆ ಅರ್ಪಿಸಿ, ನಂತರ ಮೌನವಾಗಿ ಕೃತಜ್ಞತೆಯಿಂದ ಊಟ ಮಾಡುತ್ತಾರೆ.',
    },
    verse: {
      devanagari: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।',
      iast: 'Brahmārpaṇaṃ brahma havir brahmāgnau brahmaṇā hutam |',
      meaning: {
        en: 'The offering is Brahman, the oblation is Brahman, poured by Brahman into the fire that is Brahman.',
        kn: 'ಅರ್ಪಣೆಯೂ ಬ್ರಹ್ಮ, ಹವಿಸ್ಸೂ ಬ್ರಹ್ಮ; ಬ್ರಹ್ಮನೆಂಬ ಅಗ್ನಿಯಲ್ಲಿ ಬ್ರಹ್ಮನಿಂದಲೇ ಹೋಮಿಸಲ್ಪಟ್ಟದ್ದು.',
      },
      source: 'Bhagavad Gītā 4.24',
    },
    sky: ['#4f9fe0', '#cfe8f5'],
    sun: 0.5,
    night: 0,
  },
  {
    id: 'd-shastra',
    ...t('2:30 PM', 'ಮಧ್ಯಾಹ್ನ 2:30'),
    devanagari: 'शास्त्रं गणितं विज्ञानं च',
    title: { en: 'Saṃskṛta, Mathematics and Science', kn: 'ಸಂಸ್ಕೃತ, ಗಣಿತ ಮತ್ತು ವಿಜ್ಞಾನ' },
    text: {
      en: 'After a short rest, afternoons turn to Saṃskṛta and the Vedāṅgas — and to mathematics, science, English and computers. On the blackboard, the right-triangle rule stated in Baudhāyana’s Śulba-sūtra meets modern geometry.',
      kn: 'ಸ್ವಲ್ಪ ವಿಶ್ರಾಂತಿಯ ನಂತರ ಮಧ್ಯಾಹ್ನ ಸಂಸ್ಕೃತ ಮತ್ತು ವೇದಾಂಗಗಳ ಜೊತೆಗೆ ಗಣಿತ, ವಿಜ್ಞಾನ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಕಲಿಕೆ. ಕಪ್ಪುಹಲಗೆಯ ಮೇಲೆ ಬೌಧಾಯನ ಶುಲ್ಬಸೂತ್ರದ ಲಂಬಕೋನ ತ್ರಿಕೋನದ ನಿಯಮ ಆಧುನಿಕ ಜ್ಯಾಮಿತಿಯನ್ನು ಸಂಧಿಸುತ್ತದೆ.',
    },
    verse: {
      devanagari: 'स्वाध्यायप्रवचनाभ्यां न प्रमदितव्यम् ।',
      iast: 'Svādhyāya-pravacanābhyāṃ na pramaditavyam |',
      meaning: {
        en: 'Never be careless in study and in teaching.',
        kn: 'ಸ್ವಾಧ್ಯಾಯ ಮತ್ತು ಪ್ರವಚನಗಳಲ್ಲಿ ಎಂದಿಗೂ ಅಲಕ್ಷ್ಯ ಮಾಡಬೇಡ.',
      },
      source: 'Taittirīya Upaniṣad 1.11',
    },
    sky: ['#66a8dc', '#efe3b4'],
    sun: 0.66,
    night: 0,
  },
  {
    id: 'd-krida',
    ...t('4:30 PM', 'ಸಂಜೆ 4:30'),
    devanagari: 'क्रीडा व्यायामश्च',
    title: { en: 'Play and Exercise', kn: 'ಆಟ ಮತ್ತು ವ್ಯಾಯಾಮ' },
    text: {
      en: 'Children are still children! Evenings bring traditional games, running in the open, yoga and Sūrya Namaskāra — a strong body to carry a steady mind.',
      kn: 'ಮಕ್ಕಳು ಮಕ್ಕಳೇ! ಸಂಜೆ ಹೊತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಆಟಗಳು, ಬಯಲಿನಲ್ಲಿ ಓಟ, ಯೋಗ ಮತ್ತು ಸೂರ್ಯನಮಸ್ಕಾರ — ಸ್ಥಿರ ಮನಸ್ಸಿಗೆ ಸದೃಢ ದೇಹ.',
    },
    verse: {
      devanagari: 'शरीरमाद्यं खलु धर्मसाधनम् ।',
      iast: 'Śarīram ādyaṃ khalu dharmasādhanam |',
      meaning: {
        en: 'The body is indeed the first instrument of Dharma.',
        kn: 'ಧರ್ಮಸಾಧನೆಗೆ ದೇಹವೇ ಮೊದಲ ಸಾಧನ.',
      },
      source: 'Kālidāsa, Kumārasambhava 5.33',
    },
    sky: ['#7aa6d4', '#f6d59a'],
    sun: 0.78,
    night: 0.03,
  },
  {
    id: 'd-sayam',
    ...t('6:15 PM', 'ಸಂಜೆ 6:15'),
    devanagari: 'सायंसन्ध्या दीपनमस्कारश्च',
    title: { en: 'Evening Sandhyā and the Lamp', kn: 'ಸಾಯಂಸಂಧ್ಯೆ ಮತ್ತು ದೀಪ' },
    text: {
      en: 'At sunset comes the evening Sandhyāvandanam. A lamp is lit before Tulasī, and the Āśrama fills with the sound of stotras and bhajans.',
      kn: 'ಸೂರ್ಯಾಸ್ತದ ವೇಳೆ ಸಾಯಂಸಂಧ್ಯಾವಂದನೆ. ತುಳಸಿಯ ಮುಂದೆ ದೀಪ ಬೆಳಗಿಸಲಾಗುತ್ತದೆ; ಆಶ್ರಮವೆಲ್ಲಾ ಸ್ತೋತ್ರ, ಭಜನೆಗಳ ನಾದದಿಂದ ತುಂಬುತ್ತದೆ.',
    },
    verse: {
      devanagari: 'शुभं करोति कल्याणम् आरोग्यं धनसम्पदः ।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते ॥',
      iast: 'Śubhaṃ karoti kalyāṇam ārogyaṃ dhanasampadaḥ | Śatrubuddhi-vināśāya dīpajyotir namo’stu te ||',
      meaning: {
        en: 'Salutations to the light of the lamp, which brings auspiciousness, well-being, health and plenty, and dispels ill will.',
        kn: 'ಶುಭ, ಕಲ್ಯಾಣ, ಆರೋಗ್ಯ, ಸಂಪತ್ತನ್ನು ನೀಡಿ, ದುರ್ಬುದ್ಧಿಯನ್ನು ನಾಶಮಾಡುವ ದೀಪಜ್ಯೋತಿಗೆ ನಮಸ್ಕಾರ.',
      },
    },
    sky: ['#4b3f7e', '#f08c4e'],
    sun: 0.97,
    night: 0.2,
  },
  {
    id: 'd-ratri',
    ...t('7:30 PM', 'ರಾತ್ರಿ 7:30'),
    devanagari: 'पाठावृत्तिः शयनं च',
    title: { en: 'Revision and Rest', kn: 'ಪಾಠದ ಪುನರಾವರ್ತನೆ ಮತ್ತು ವಿಶ್ರಾಂತಿ' },
    text: {
      en: 'After a simple supper, the day’s lessons are chanted once more by lamplight so they settle deep in memory. By nine the Āśrama is quiet — and tomorrow begins again in Brāhma Muhūrta.',
      kn: 'ಸರಳವಾದ ರಾತ್ರಿಯೂಟದ ನಂತರ, ಅಂದಿನ ಪಾಠಗಳು ನೆನಪಿನಲ್ಲಿ ಆಳವಾಗಿ ನೆಲೆಯೂರಲೆಂದು ದೀಪದ ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೊಮ್ಮೆ ಪಠಿಸಲಾಗುತ್ತದೆ. ಒಂಬತ್ತು ಗಂಟೆಯ ಹೊತ್ತಿಗೆ ಆಶ್ರಮ ನಿಶ್ಶಬ್ದ — ನಾಳೆ ಮತ್ತೆ ಬ್ರಾಹ್ಮ ಮುಹೂರ್ತದಲ್ಲಿ ದಿನ ಆರಂಭ.',
    },
    verse: {
      devanagari: 'वेदो नित्यमधीयताम् ।',
      iast: 'Vedo nityam adhīyatām |',
      meaning: { en: 'Let the Veda be studied daily.', kn: 'ವೇದವನ್ನು ನಿತ್ಯವೂ ಅಧ್ಯಯನ ಮಾಡಬೇಕು.' },
      source: 'Ādi Śaṅkarācārya, Sādhana Pañcakam',
    },
    sky: ['#0a1030', '#2e2d5e'],
    sun: 1.3,
    night: 0.55,
  },
];
