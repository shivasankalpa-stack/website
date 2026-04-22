/**
 * Trustees and Managing Committee data for v0.1.
 *
 * Two groups:
 *   1. Trustees — the trust's governing board
 *   2. Managing Committee — day-to-day operations
 *
 * Bio placeholders tagged #BIO-TODO-<name>.
 * Photo placeholders tagged #IMG-TODO-<name>.
 */

import type { Trustee } from '@/lib/types';

export const trustees: Trustee[] = [
  {
    name: 'Veda Brahma Shri Anantanarayana Sharma',
    role: 'Trustee',
    bio: 'A lifelong scholar and supporter of Vedic education, Veda Brahma Shri Anantanarayana Sharma brings deep traditional knowledge and spiritual grounding to the Vṛnda\'s mission. #BIO-TODO-anantanarayana-sharma',
    image: '/assets/trustees/anantanarayana-sharma.jpg',
  },
  {
    name: 'Ravishankar K.S.',
    role: 'Trustee',
    bio: 'Committed to fostering the Guru–Shishya Parampara, Ravishankar K.S. contributes to the Vṛnda\'s outreach and community engagement efforts. #BIO-TODO-ravishankar-ks',
    image: '/assets/trustees/ravishankar-ks.jpg',
  },
  {
    name: 'Giri Bhardwaj',
    role: 'Trustee',
    bio: 'With a passion for cultural preservation, Giri Bhardwaj supports the Vṛnda\'s initiatives in Gurukula development and Vedic research. #BIO-TODO-giri-bhardwaj',
    image: '/assets/trustees/giri-bhardwaj.jpg',
  },
  {
    name: 'Harisha Harithasa',
    role: 'Trustee',
    bio: 'Harisha Harithasa actively contributes to the Vṛnda\'s mission of supporting Gurukulas and promoting traditional arts and skills. #BIO-TODO-harisha-harithasa',
    image: '/assets/trustees/harisha-harithasa.jpg',
  },
  {
    name: 'Bodhayana Jayasimha',
    role: 'Trustee',
    bio: 'Bodhayana Jayasimha brings dedication and organisational strength to the Vṛnda\'s endeavours in service of Vedic education. #BIO-TODO-bodhayana-jayasimha',
    image: '/assets/trustees/bodhayana-jayasimha.jpg',
  },
];

export const managingCommittee: Trustee[] = [
  {
    name: 'Naveen Subrahmanya',
    role: 'President',
    bio: 'As President, Naveen Subrahmanya leads Sri Shivasankalpa Vṛnda with a vision rooted in the Sringeri Parampara, driving the Vṛnda\'s mission to support and strengthen Veda Gurukulas. #BIO-TODO-naveen-subrahmanya',
    image: '/assets/trustees/naveen-subrahmanya.jpg',
  },
  {
    name: 'Sheshadri G',
    role: 'Vice-President',
    bio: 'Sheshadri G serves as Vice-President, supporting the Vṛnda\'s strategic direction and community outreach with commitment and insight. #BIO-TODO-sheshadri-g',
    image: '/assets/trustees/sheshadri.jpg',
  },
  {
    name: 'Shreesha Harithasa',
    role: 'Secretary',
    bio: 'As Secretary, Shreesha Harithasa manages the Vṛnda\'s coordination, documentation, and day-to-day outreach activities. #BIO-TODO-shreesha-harithasa',
    image: '/assets/trustees/shreesha-harithasa.jpg',
  },
  {
    name: 'Gourishankara Sharma',
    role: 'Treasurer',
    bio: 'Gourishankara Sharma oversees the Vṛnda\'s finances with transparency and diligence, ensuring every contribution serves its intended purpose. #BIO-TODO-gourishankara-sharma',
    image: '/assets/trustees/gourishankara-sharma.jpg',
  },
];
