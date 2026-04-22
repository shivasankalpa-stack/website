/**
 * Events data for v0.1.
 *
 * The Maharudra Purascharana is the featured launch event.
 * Content sourced from the trust's official invite letter.
 */

import type { SiteEvent } from '@/lib/types';

export const events: SiteEvent[] = [
  {
    slug: 'maharudra',
    title: 'Mahā Rudra Puraścaraṇa',
    subtitle: 'For Loka Kalyāṇa and the support of Veda Gurukulas',
    date: '2026-05-15',
    endDate: '2026-05-17',
    location: 'Hoysala Trust, 2nd Stage, Dattatreya Nagar, Hosakerehalli, Bengaluru – 560085',
    description:
      'A three-day Mahā Rudra Puraścaraṇa organised under the auspices of Sri Shivasankalpa Vṛnda, with the divine blessings of His Holiness Jagadguru Sri Sri Bharati Tirtha Mahasannidhanam and His Holiness Jagadguru Sri Sri Vidhushekhara Bharati Sannidhanam of Dakshinamnaya Sri Sharada Peetham, Sringeri.',
    featured: true,
    image: '/assets/events/maharudra-hero.jpg',
    sevaItems: [
      { name: 'Pooja Sankalpa', amount: 501 },
      { name: 'Ekadasha Rudrabhisheka', amount: 2001 },
      { name: 'Shata Rudrabhisheka', amount: 10001 },
      { name: 'Alankara', amount: 10001 },
      { name: 'Rudra Homa Seva', amount: 10001 },
      { name: 'Upakalasha Seva (1 Kalasha)', amount: 5001 },
      { name: 'Pradhana Kalasha Seva (1 Kala)', amount: 11001 },
      { name: 'Anna Santarpana (10 people)', amount: 5001 },
      { name: 'Anna Santarpana (20 people)', amount: 10001 },
      { name: 'Anna Santarpana (30 people)', amount: 15001 },
    ],
    schedule: [
      {
        date: '2026-05-15',
        dayLabel: 'Friday, 15 May 2026',
        items: [
          {
            time: '5:00 PM – 8:00 PM',
            description:
              'Deepa Aaradhana, Devatha Prarthana, Maha Ganapati Puja, Svasti Vachana, Deva Naandi, Panchagavya, Rakshoghna & Vastu Homa, Maha Mangalarathi',
          },
          {
            time: '8:00 PM onwards',
            description: 'Teertha Prasada Distribution',
          },
        ],
      },
      {
        date: '2026-05-16',
        dayLabel: 'Saturday, 16 May 2026',
        items: [
          {
            time: '7:30 AM onwards',
            description:
              'Kalasha Sthapane, Sahasra Modaka Maha Ganapati Homa, Mahanyasa Poorvaka Maha Rudra Japa (with Veda students), Rudrabhisheka, Maha Mangalarathi',
          },
          {
            time: '12:00 PM onwards',
            description: 'Teertha Prasada Distribution',
          },
        ],
      },
      {
        date: '2026-05-17',
        dayLabel: 'Sunday, 17 May 2026',
        items: [
          {
            time: '7:30 AM onwards',
            description:
              'Kalasha Aradhane, Kruchra Acharane, Maha Rudra Homa',
          },
          {
            time: '12:00 PM onwards',
            description:
              'Poornahuti, Maha Mangalarathi, Ashtavadhana, Ashirvachana',
          },
          {
            time: '1:00 PM onwards',
            description: 'Teertha & Prasada Distribution',
          },
        ],
      },
    ],
  },
];
