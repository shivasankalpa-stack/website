/**
 * Gurukulas the Vṛnda has visited or supports.
 *
 * `profile` omitted (full portrait): name, place, founders, Adhyāpakas,
 * śākhās, curriculum, contact, and a hero image.
 * `profile: 'brief'`: name, place, and the seva we can already describe.
 * English text lives here; Kannada lives under `gurukulaDetail.<key>_*`.
 *
 * Image paths under /public/assets/gurukulas/<slug>/.
 */

import type { Gurukula } from '@/lib/types';

/** Message-key prefix in `gurukulaDetail` for each slug. */
export const GURUKULA_MESSAGE_KEYS: Record<string, string> = {
  'shruti-parampara': 'shrutiParampara',
  'namma-sampradaya': 'nammaSampradaya',
  'shankara-gurukulam': 'shankaraGurukulam',
  'sri-ramana-brahma-vidyashrama': 'sriRamanaBrahmaVidyashrama',
  'mallige-pathashala': 'malligePathashala',
  'mallikarjuna-jyothi': 'mallikarjunaJyothi',
  'sacchidananda-advaitashrama': 'sacchidananda',
  'uma-madhukeshwara': 'umaMadhukeshwara',
  'shrauta-vijnana': 'shrautaVijnana',
  'veda-prakasha': 'vedaPrakasha',
  'sridhara-sanga': 'sridharaSanga',
  'koodali-gurukula': 'koodaliGurukula',
};

export const gurukulas: Gurukula[] = [
  {
    slug: 'shruti-parampara',
    name: 'Sri Shruti Parampara Gurukulam',
    location: 'JP Nagar, Bangalore',
    city: 'Bangalore',
    acharya: 'Veda Brahma Sri Shyamasundara Sharma Ghanapāṭhī',
    studentCount: 23,
    ghanapaathisProduced: 2,
    shakhas: ['Rigveda', 'Krishna Yajurveda'],
    otherShastras: [
      'Vedānga (Śikṣā, Vyākaraṇa, Chandas, Nirukta, Jyotiṣa)',
      'Saṁskṛta',
      'Bhagavad Gītā',
      'Dharmaśāstra',
      'Gṛhya & Śrauta Sūtras, Prayoga',
      'Kannada, English & Mathematics',
    ],
    overview:
      'Sri Shruti Parampara Gurukulam in JP Nagar is dedicated to preserving the oral tradition of the Vedas through the time-honoured Guru–Shishya Parampara. Twenty-three students undergo rigorous training in Veda adhyayana — Saṁhitā, Krama, Jaṭā and Ghana pāṭha — alongside Vedānga, Dharmaśāstra and supporting secular subjects.',
    founders: [
      {
        name: 'Veda Brahma Sri Shyamasundara Sharma Ghanapāṭhī',
        honorific: 'Founder & Ācārya',
        image: '/assets/gurukulas/shruti-parampara/shyamasundara-sharma.png',
      },
    ],
    adhyapakas: [
      {
        name: 'Veda Brahma Sri Shyamasundara Sharma Ghanapāṭhī',
        qualification: 'Salakṣaṇa Ghanapāṭhī, Rigveda (Śākala Śākhā)',
        shakha: 'Rigveda — Śākala Śākhā',
        studyLineage:
          'Sri Bharatiyagirvana Praudha Vidyabhivardhini Sanskrit Mahāpāṭhaśāla',
        vedaGuru:
          'Veda Brahma Sri Kalaseshwara Bhatt Ghanapāṭhī & Veda Brahma Sri B. K. Lakshminarayana Bhatt Ghanapāṭhī (Rigveda); Veda Brahma Sri Prakash Bhatt & Veda Brahma Sri Lakshmisha Bhatt (Yajurveda)',
        image: '/assets/gurukulas/shruti-parampara/shyamasundara-sharma.png',
      },
    ],
    contact: {
      phone: '+91 98457 05862',
      address:
        'No. 19/1, Shankar Residency, 7A Main Road, 8th Cross Road, Srinidhi Extension, JP Nagar 8th Phase, Bangalore – 560062',
      website: 'https://srishrutiparamparagurukulam.in/en',
    },
    heroImage: '/assets/gurukulas/shruti-parampara/hero.jpg',
    images: ['/assets/gurukulas/shruti-parampara/shyamasundara-sharma.png'],
  },
  {
    slug: 'namma-sampradaya',
    name: 'Namma Sampradaya Gurukulam',
    location: 'Sarjapura, Bangalore',
    city: 'Bangalore',
    acharya: 'Veda Brahma Sri Manjunath Bhat Ghanapāṭhī',
    studentCount: 30,
    graduatedCount: 120,
    shakhas: ['Krishna Yajurveda', 'Rigveda'],
    otherShastras: [
      'Saṁskṛta',
      'Purāṇa',
      'Itihāsa',
      'Dharmaśāstra',
      'Public Speaking',
    ],
    overview:
      'Namma Sampradaya Gurukulam at Sarjapura has been training students in Veda adhyayana for over a decade, with thirty residential students and one hundred and twenty alumni. Beyond Veda pāṭha, the Gurukulam emphasises Saṁskṛta, Purāṇa-Itihāsa and the practical art of public speaking — preparing Adhyāpakas who can carry the tradition forward.',
    founders: [
      { name: 'Sri Mahesh Ramakrishnan Sharma', honorific: 'Co-Founder' },
      { name: 'Sri Ram Kumar Sharma', honorific: 'Co-Founder' },
    ],
    adhyapakas: [
      {
        name: 'Veda Brahma Sri Manjunath Bhat Ghanapāṭhī',
        qualification: 'Ghanapāṭhī, Krishna Yajurveda',
        shakha: 'Krishna Yajurveda',
        studyLineage:
          'Shrimata Saṁskṛta Mahāpāṭhaśāla, Sonda Svarṇavalli Mutt',
        yearsOfService: 17,
        image: '/assets/gurukulas/namma-sampradaya/manjunath-bhat.png',
      },
    ],
    contact: {
      phone: '+91 78997 68717',
      address: 'Sarjapura, Bangalore, Karnataka',
      website: 'https://nammasampradaya.weebly.com/contact-us.html',
    },
    heroImage: '/assets/gurukulas/namma-sampradaya/hero.jpg',
    // Sri Jayendra Saraswati Swamigal's portrait sits high on the wall
    // (upper-left); anchor the crop to the top so His face stays in
    // frame while the seated Adhyāpaka remains visible below.
    heroPosition: 'center top',
    images: ['/assets/gurukulas/namma-sampradaya/manjunath-bhat.png'],
  },
  {
    slug: 'shankara-gurukulam',
    name: 'Shankara Gurukulam',
    location: 'Ungra, Huliyurdurga, Karnataka',
    city: 'Huliyurdurga',
    acharya: 'Veda Brahma Sri Devi Sathya Pavan Kumar Sharma',
    studentCount: 22,
    shakhas: ['Rigveda', 'Krishna Yajurveda'],
    otherShastras: [
      'Saṁskṛta',
      'Sāṅkhya, Yoga, Nyāya, Vaiśeṣika',
      'Pūrva & Uttara Mīmāṁsā',
      'Śrauta & Smārta Prayoga',
      'Jyotiṣa & Dharmaśāstra',
      'Āyurveda',
      'Rāṣṭrīyatā, Agriculture',
      'Mathematics, Science, English, Computer Science',
    ],
    overview:
      'Shankara Gurukulam, set amid the rural calm of Ungra village near Huliyurdurga, blends Veda adhyayana with the six darśanas, Āyurveda, agriculture and modern subjects. Twenty-two students learn Rigveda and Krishna Yajurveda alongside the philosophical śāstras, supported by an integrated curriculum spanning Saṁskṛta, science and computer literacy.',
    founders: [
      {
        name: 'Dr. Chandrashekhar T. G.',
        honorific: 'Founder',
        image: '/assets/gurukulas/shankara-gurukulam/dr-chandrashekar.png',
      },
    ],
    adhyapakas: [
      {
        name: 'Veda Brahma Sri Devi Sathya Pavan Kumar Sharma',
        qualification: 'Krishna Yajurveda',
        shakha: 'Krishna Yajurveda',
        studyLineage: 'Chandrashekara Arsha Vidyalaya',
        vedaGuru: 'Sri Kuppa Gantu Shiva Seeta Rama Sharma',
        image: '/assets/gurukulas/shankara-gurukulam/devi-sathya-pavan.avif',
      },
      {
        name: 'Veda Brahma Sri Vinayaka Vamana Hirekod Ghanapāṭhī',
        qualification: 'Ghanapāṭhī, Rigveda',
        shakha: 'Rigveda',
        studyLineage: 'Sonda Svarṇavalli Mutt',
        vedaGuru: 'Sri Udaya Vaidya Ghanapāṭhī',
        yearsOfService: 17,
        image: '/assets/gurukulas/shankara-gurukulam/vinayaka-hirekod.avif',
      },
    ],
    contact: {
      phone: '+91 82969 50505, +91 95137 07888',
      address:
        'Shankara Gurukulam, Ungra Village, Huliyurdurga Hobli, Karnataka – 572111',
      website: 'https://www.shankaragurukulam.org/',
    },
    heroImage: '/assets/gurukulas/shankara-gurukulam/hero.avif',
    images: [
      '/assets/gurukulas/shankara-gurukulam/devi-sathya-pavan.avif',
      '/assets/gurukulas/shankara-gurukulam/vinayaka-hirekod.avif',
    ],
  },
  {
    slug: 'sri-ramana-brahma-vidyashrama',
    name: 'Sri Ramana Maharṣi Brahma Vidyāśrama',
    location: 'R. Agraharam, Madagondapalli, Hosur, Tamil Nadu',
    city: 'Hosur',
    acharya: 'Sri Ganapati Mahābaleshwara Hegde',
    studentCount: 15,
    graduatedCount: 10,
    shakhas: ['Krishna Yajurveda'],
    otherShastras: [
      'Bhagavad Gītā',
      'Upaniṣad & Bhāṣya Pāṭha',
      'Saṁskṛta',
      'Rāmāyaṇa & Bhāgavata',
      'English, Mathematics',
    ],
    overview:
      'Sri Ramana Maharṣi Brahma Vidyāśrama, founded by Pūjya Sri Ramanacharanatirtha Swamiji (Nochur Swamiji), nurtures fifteen residential students in Krishna Yajurveda alongside the Upaniṣads, Bhāgavata and Bhāṣya pāṭha. Set near Hosur, the āśrama brings together the discipline of a traditional Veda Pāṭhaśāla and the contemplative spirit of an Advaita āśrama.',
    founders: [
      {
        name: 'Pūjya Sri Ramanacharanatirtha (Nochur) Swamiji',
        honorific: 'Founder & Mārga-darśi',
        image:
          '/assets/gurukulas/sri-ramana-brahma-vidyashrama/swamiji-portrait.jpg',
      },
    ],
    adhyapakas: [
      {
        name: 'Sri Ganapati Mahābaleshwara Hegde',
        qualification: 'Ghanapāṭhī, Krishna Yajurveda',
        shakha: 'Krishna Yajurveda',
        studyLineage:
          'Sri Rajarajeshwari Saṁskṛta Mahāpāṭhaśāla, Svarṇavalli; Sri Chandrashekhara Bharati / Chandrashekharendra Saraswati Veda Vidyālaya, Coimbatore',
        vedaGuru: 'Sri Jambunātha Ghanapāṭhī',
      },
    ],
    contact: {
      address:
        'Sri Ramana Maharṣi Brahma Vidyāśrama, R. Agraharam, Madagondapalli, Thalli Road, Hosur, Tamil Nadu',
    },
    heroImage: '/assets/gurukulas/sri-ramana-brahma-vidyashrama/hero.png',
    // The deity sits in the upper half of a near-square photograph; without
    // a top-anchored crop the murti's head is trimmed in 16:9.
    heroPosition: 'center top',
    images: [
      '/assets/gurukulas/sri-ramana-brahma-vidyashrama/swamiji-arunachala.webp',
      '/assets/gurukulas/sri-ramana-brahma-vidyashrama/swamiji-portrait.jpg',
    ],
  },
  {
    slug: 'mallige-pathashala',
    profile: 'brief',
    name: 'Mallige Pāṭhaśālā',
    location: 'Malleswaram, Bengaluru',
    city: 'Bengaluru',
    acharya: 'Veda Brahma Sri Srinivasan',
    engagement: 'Visited 29 May 2026; financial support in August 2026',
    overview:
      'On 29 May 2026 the Vṛnda visited Mallige Pāṭhaśālā in Malleswaram and sat with founder and Yajurveda adhyāpaka Veda Brahma Sri Srinivasan to understand the pāṭhaśālā’s needs. Rice, lentils, daily groceries, coconuts, and financial support were offered. The pāṭhaśālā was among the eight that received support again in August.',
    contact: {},
  },
  {
    slug: 'mallikarjuna-jyothi',
    profile: 'brief',
    name: 'Sri Mallikarjuna Veda Vidyā Gurukula',
    alsoKnownAs: 'Jyothi Pāṭhaśālā',
    location: 'Shankarapura, near Basavanagudi, Bengaluru',
    city: 'Bengaluru',
    acharya: 'Veda Brahma Sri Harihara Bhatta',
    studentCount: 15,
    engagement: 'Visited 30 May 2026; financial support in August 2026',
    overview:
      'On 30 May 2026 the Vṛnda visited this Yajurveda pāṭhaśālā in Shankarapura, near Basavanagudi, also called Jyothi Pāṭhaśālā. Guided by Veda Brahma Sri Harihara Bhatta, the Vṛnda offered dīkṣā vastras, sandhyāvandana vessels, and āsanas for fifteen students, along with food-grains, groceries, coconuts, and financial support. The pāṭhaśālā was among the eight that received support again in August.',
    contact: {},
  },
  {
    slug: 'sacchidananda-advaitashrama',
    profile: 'brief',
    name: 'Sacchidananda Advaitāśrama',
    location: 'Basaveshwaranagar, Bengaluru',
    city: 'Bengaluru',
    acharya: 'Paramapūjya Sri Advayānanda Sarasvatī Swamiji',
    studentCount: 8,
    engagement: 'Visited 23 May 2026; financial support in August 2026',
    overview:
      'On 23 May 2026 the Vṛnda visited Sacchidananda Advaitāśrama Veda Gurukula in Basaveshwaranagar and, after speaking with Paramapūjya Sri Advayānanda Sarasvatī Swamiji, offered grains and groceries, vastras and āsanas for eight children and three adhyāpakas, sandhyāvandana vessels, coconuts, and financial support. The āśrama was among the eight that received support again in August.',
    contact: {},
  },
  {
    slug: 'uma-madhukeshwara',
    profile: 'brief',
    name: 'Uma Madhukeshwara Veda Vidyā Gurukula',
    location: 'Banavasi, Sirsi, Karnataka',
    city: 'Banavasi',
    acharya: 'Veda Brahma Sri Madhusudana Bhat',
    studentCount: 15,
    shakhas: ['Krishna Yajurveda'],
    engagement: 'Visited July 2026; financial support in August 2026',
    overview:
      'Fifteen students under Veda Brahma Sri Madhusudana Bhat study Kṛṣṇa Yajurveda to Kramānta, with Sanskrit, English, mathematics, and science. A young guru has offered his life to this pāṭha. The Vṛnda visited in July 2026 and included the Gurukula in the August support to eight Veda Gurukulas.',
    contact: {},
  },
  {
    slug: 'shrauta-vijnana',
    profile: 'brief',
    name: 'Śrauta Vijñāna Gurukulam',
    location: 'Nadagodu, Sirsi, Karnataka',
    city: 'Sirsi',
    acharya: 'Veda Brahma Sri Āhitāgni Narasimha Bhat',
    studentCount: 35,
    engagement: 'Visited July 2026; financial support in August 2026',
    overview:
      'Thirty-five students learn Veda, śāstra, and śrauta in the home of an agnihotrin, Veda Brahma Sri Āhitāgni Narasimha Bhat, in the forest at Nadagodu, away from the crowd. The Vṛnda visited in July 2026 and included the Gurukulam in the August support to eight Veda Gurukulas.',
    contact: {},
  },
  {
    slug: 'veda-prakasha',
    profile: 'brief',
    name: 'Sri Veda Prakāśa Gurukula',
    location: 'Danandi, Sirsi, Karnataka',
    city: 'Sirsi',
    acharya: 'Veda Brahma Sri Prakāśa Bhat',
    engagement: 'Visited July 2026',
    overview:
      'Eight students are on the roll, and two were present when the Vṛnda visited in July 2026. Veda Brahma Sri Prakāśa Bhat teaches them in the Malnad forest. The hope is for more children, a fuller gośālā, and a proper campus. The Vṛnda offered rice, lentils, grains, vegetables, and financial support as needed.',
    contact: {},
  },
  {
    slug: 'sridhara-sanga',
    profile: 'brief',
    name: 'Śrīdhara Sāṅga Veda Vidyā Gurukula',
    location: 'Varadahalli, Sagara, Karnataka',
    city: 'Sagara',
    studentCount: 12,
    engagement: 'Visited July 2026',
    overview:
      'Twelve students live on Śrīdhara hill at Varadahalli, Sagara, in a Gurukula run by the Śrīdhara Āśrama Trust. Many have completed their adhyayana and taken up dharmic work. The Vṛnda visited in July 2026 and offered rice, lentils, grains, vegetables, and financial support as needed.',
    contact: {},
  },
  {
    slug: 'koodali-gurukula',
    profile: 'brief',
    name: 'Koodali Gurukula',
    location: 'Shivamogga, Karnataka',
    city: 'Shivamogga',
    engagement: 'Financial support, August 2026',
    overview:
      'In August 2026 the Vṛnda extended financial support to Koodali Gurukula in Shivamogga, as one of eight Veda Gurukulas that received support that month.',
    contact: {},
  },
];
