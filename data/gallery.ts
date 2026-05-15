/**
 * Gallery items for v0.1.
 *
 * Curated set of photos and videos from Gurukula visits and trust events.
 *
 * NOTE: Captions are translated via the `gallery.cN` keys in
 * `messages/{en,kn}.json`, indexed positionally against the array below.
 * Reordering or splicing this array MUST be reflected in both message files.
 */

import type { GalleryItem } from '@/lib/types';

export const galleryItems: GalleryItem[] = [
  // ── Shruti Parampara Gurukula ──
  {
    id: 'shruti-parampara-students',
    src: '/assets/gallery/shruti-parampare-gurukula-students.jpg',
    alt: 'Students of Shruti Parampara Gurukula during Veda pāṭha',
    category: 'gurukulas',
    caption: 'Shruti Parampara Gurukula, JP Nagar — Students during Veda pāṭha',
    type: 'image',
  },
  {
    id: 'shruti-parampare-video-1',
    src: '/assets/gallery/shruti-parampare-1.mp4',
    alt: 'Vedic chanting session at Shruti Parampara Gurukula',
    category: 'gurukulas',
    caption: 'Vedic chanting at Shruti Parampara Gurukula',
    type: 'video',
  },
  {
    id: 'shruti-parampare-video-2',
    src: '/assets/gallery/shruti-parampare-2.mp4',
    alt: 'Veda pāṭha practice at Shruti Parampara Gurukula',
    category: 'gurukulas',
    caption: 'Veda pāṭha practice session',
    type: 'video',
  },

  // ── Varthur Gurukula ──
  {
    id: 'varthur-5',
    src: '/assets/gallery/varthur-gurukula-5.jpg',
    alt: 'Adhyāpaka reviewing a manuscript with a student at Varthur Gurukula',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — Adhyāpaka reviewing a manuscript with a student',
    type: 'image',
    // Source photo is portrait (576×1280) with the orange-tiled roof above
    // the figures. Position the 3:2 grid crop ~25% from the top so the
    // ceiling falls outside the frame and we land on heads + manuscript +
    // torsos rather than mostly ceiling.
    imagePosition: 'center 25%',
  },
  {
    id: 'varthur-7',
    src: '/assets/gallery/varthur-gurukula-7.jpg',
    alt: 'Varthur Gurukula Vedic study',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — Vedic study',
    type: 'image',
  },
  {
    id: 'varthur-8',
    src: '/assets/gallery/varthur-gurukula-8.jpg',
    alt: 'Varthur Gurukula students and teachers',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — students and teachers',
    type: 'image',
  },
  {
    id: 'varthur-9',
    src: '/assets/gallery/varthur-gurukula-9.jpg',
    alt: 'Conversation with the Adhyāpaka at Varthur Gurukula',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — conversation with the Adhyāpaka',
    type: 'image',
  },
  {
    id: 'varthur-11',
    src: '/assets/gallery/varthur-gurukula-11.jpg',
    alt: 'Sri Dattratreya Kshetra at Varthur Gurukula',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — Sri Dattratreya Kshetra',
    type: 'image',
  },
  {
    id: 'varthur-video-13',
    src: '/assets/gallery/varthur-gurukula-13.mp4',
    alt: 'Vedic recitation at Varthur Gurukula',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — Vedic recitation',
    type: 'video',
  },
  {
    id: 'varthur-video-15',
    src: '/assets/gallery/varthur-gurukula-15.mp4',
    alt: 'Student activity at Varthur Gurukula',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — student activity',
    type: 'video',
  },
  {
    id: 'varthur-video-16',
    src: '/assets/gallery/varthur-gurukula-16.mp4',
    alt: 'Veda learning at Varthur Gurukula',
    category: 'gurukulas',
    caption: 'Varthur Gurukula — Veda learning',
    type: 'video',
  },

  // ── Sri Ramana Maharshi Brahmavidyashrama ──
  {
    id: 'brahmavidyashrama-1',
    src: '/assets/gallery/sri-ramanamaharshi-brahmavidyashrama-1.jpg',
    alt: 'Sri Ramana Maharshi Brahmavidyashrama',
    category: 'gurukulas',
    caption: 'Sri Ramana Maharshi Brahmavidyashrama',
    type: 'image',
  },
  {
    id: 'brahmavidyashrama-2',
    src: '/assets/gallery/sri-ramanamaharshi-brahmavidyashrama-2.jpg',
    alt: 'Students at Sri Ramana Maharshi Brahmavidyashrama',
    category: 'gurukulas',
    caption: 'Sri Ramana Maharshi Brahmavidyashrama — students',
    type: 'image',
  },
  {
    id: 'brahmavidyashrama-3',
    src: '/assets/gallery/sri-ramanamaharshi-brahmavidyashrama-3.jpg',
    alt: 'Pathway through the Sri Ramana Maharshi Brahmavidyashrama grounds',
    category: 'gurukulas',
    caption: 'Sri Ramana Maharshi Brahmavidyashrama — pathway through the āśrama',
    type: 'image',
  },
  {
    id: 'brahmavidyashrama-5',
    src: '/assets/gallery/sri-ramanamaharshi-brahmavidyashrama-5.jpg',
    alt: 'Sri Ramana Maharshi Brahmavidyashrama campus',
    category: 'gurukulas',
    caption: 'Sri Ramana Maharshi Brahmavidyashrama — campus',
    type: 'image',
  },
  {
    id: 'brahmavidyashrama-video',
    src: '/assets/gallery/sri-ramanamaharshi-brahmavidyashrama-6.mp4',
    alt: 'Vedic chanting at Sri Ramana Maharshi Brahmavidyashrama',
    category: 'gurukulas',
    caption: 'Sri Ramana Maharshi Brahmavidyashrama — Vedic chanting',
    type: 'video',
  },

  // ── Chidambarashrama ──
  {
    id: 'chidambarashrama-1',
    src: '/assets/gallery/chidambarasharama-1.jpg',
    alt: 'Chidambarashrama Gurukula',
    category: 'gurukulas',
    caption: 'Chidambarashrama',
    type: 'image',
  },
  {
    id: 'chidambarashrama-3',
    src: '/assets/gallery/chidambarashrama-3.jpg',
    alt: 'Pathway through the Chidambarashrama grounds',
    category: 'gurukulas',
    caption: 'Chidambarashrama — pathway through the āśrama',
    type: 'image',
  },
  {
    id: 'chidambarashrama-4',
    src: '/assets/gallery/chidambarashrama-4.jpg',
    alt: 'Approach to the Chidambarashrama',
    category: 'gurukulas',
    caption: 'Chidambarashrama — approach to the āśrama',
    type: 'image',
  },

  // ── Events ──
  {
    id: 'maharudra-guru-pooja',
    src: '/assets/gallery/maharudra-invite-at-guru-pooja.jpg',
    alt: 'Maharudra Purascharana invitation presented during Guru Pooja',
    category: 'events',
    caption: 'Maharudra Purascharana invite at Guru Pooja',
    type: 'image',
  },
  {
    id: 'temple-rudram-chant',
    src: '/assets/gallery/temple-rudram-chant.mp4',
    alt: 'Rudram chanting at a temple',
    category: 'events',
    caption: 'Rudram chanting at a temple',
    type: 'video',
  },
];
