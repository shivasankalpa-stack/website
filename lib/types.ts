/**
 * Shared TypeScript interfaces for Sri Shivasankalpa Trust website.
 *
 * These types define the shape of all content entities used across the site.
 * In v0.1, data comes from local TS files in /data/. In v0.2, these same
 * interfaces will be satisfied by Sanity CMS queries — page components
 * never import from /data/ directly, only through /lib/data-access.ts.
 */

export interface Adhyapaka {
  name: string;
  qualification?: string;
  yearsOfService?: number;
  image?: string;
  /**
   * Optional CSS `object-position` value for the circular avatar crop
   * (e.g. `'top'`, `'center 25%'`). Defaults to `'center top'`.
   */
  imagePosition?: string;
  /** Veda shākhā — e.g. "Krishna Yajurveda". */
  shakha?: string;
  /** Adhyayana pāṭhaśāle — where the Adhyāpaka studied. */
  studyLineage?: string;
  /** Veda Guru under whom the Adhyāpaka learnt. */
  vedaGuru?: string;
}

export interface Founder {
  name: string;
  /** Optional honorific shown alongside the name (e.g. "Mārga-darshi Swamiji"). */
  honorific?: string;
  image?: string;
  /** Optional CSS `object-position` for the circular avatar crop. */
  imagePosition?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  /** Public website URL, if the Gurukula maintains one. */
  website?: string;
}

export interface Gurukula {
  slug: string;
  name: string;
  location: string;
  city: string;
  /** Primary face used on list / featured cards (typically the senior Adhyāpaka). */
  acharya: string;
  studentCount: number;
  /** All shākhās taught at the Gurukula. */
  shakhas?: string[];
  /** Curriculum beyond Veda pāṭha — Vedānga, śāstras, secular subjects, etc. */
  otherShastras?: string[];
  graduatedCount?: number;
  ghanapaathisProduced?: number;
  established?: string;
  overview: string;
  /** Founders / mārga-darshis (may differ from teaching Adhyāpakas). */
  founders?: Founder[];
  adhyapakas: Adhyapaka[];
  contact: ContactInfo;
  heroImage: string;
  /**
   * Optional CSS `object-position` for the wide hero crop
   * (e.g. `'top'`, `'center 30%'`). Use when the subject sits above or
   * below the centre and a default crop hides the focal point.
   */
  heroPosition?: string;
  images: string[];
}

export interface SevaItem {
  name: string;
  amount: number;
  description?: string;
}

export interface SiteEvent {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  endDate?: string;
  location?: string;
  description: string;
  fullContent?: string;
  image?: string;
  featured: boolean;
  sevaItems?: SevaItem[];
  schedule?: EventScheduleDay[];
}

export interface EventScheduleDay {
  date: string;
  dayLabel: string;
  items: { time: string; description: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
}

export interface Trustee {
  name: string;
  role: string;
  bio: string;
  /** Public URL under `/public`; omit when no photograph is available yet. */
  image?: string;
  /**
   * Optional CSS `object-position` value (e.g. `'top'`, `'center 25%'`) used
   * when the photo's subject sits higher than the centre of the frame.
   * Defaults to `'center'`.
   */
  imagePosition?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'events' | 'gurukulas' | 'misc';
  caption?: string;
  type: 'image' | 'video';
  /**
   * Optional CSS `object-position` value (e.g. `'top'`, `'center 25%'`) used
   * by the gallery card crop when a photo's subject sits above or below the
   * frame's centre. Defaults to `'center'`. Has no effect on videos.
   */
  imagePosition?: string;
}

export interface DonationPurpose {
  id: string;
  title: string;
  titleSanskrit?: string;
  description: string;
  icon: string;
}

export interface ShlokaData {
  devanagari: string;
  iast?: string;
  translation?: string;
  source?: string;
}
