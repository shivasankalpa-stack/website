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
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
}

export interface GurukulaEvent {
  title: string;
  date: string;
  description: string;
}

export interface Gurukula {
  slug: string;
  name: string;
  location: string;
  city: string;
  acharya: string;
  studentCount: number;
  shakha?: string;
  established?: string;
  overview: string;
  history: string;
  dailySchedule?: string;
  adhyapakas: Adhyapaka[];
  studentsSummary: string;
  events: GurukulaEvent[];
  contact: ContactInfo;
  heroImage: string;
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
  image: string;
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
