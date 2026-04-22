/**
 * Gurukula seed data for v0.1.
 *
 * Three Bangalore-based Gurukulas as specified in the charter.
 * Every placeholder is tagged #GKL-TODO-<slug>-<field> for the
 * pre-launch checklist in PLACEHOLDERS.md.
 */

import type { Gurukula } from '@/lib/types';

export const gurukulas: Gurukula[] = [
  {
    slug: 'shruti-parampara',
    name: 'Shruti Parampara Gurukula',
    location: 'JP Nagar, Bangalore',
    city: 'Bangalore',
    acharya: 'Shyamasundara Ghanapati',
    studentCount: 12,
    shakha: 'Krishna Yajurveda — Taittirīya Shākhā',
    established: '#GKL-TODO-shruti-parampara-established',
    overview:
      'Shruti Parampara Gurukula in JP Nagar is dedicated to preserving the oral tradition of the Krishna Yajurveda through the time-honoured Guru–Shishya Parampara. Under the guidance of Ācārya Shyamasundara Ghanapati, twelve students undergo rigorous training in Veda adhyayana, samhita pāṭha, and Ghana pāṭha. #GKL-TODO-shruti-parampara-overview',
    history: '#GKL-TODO-shruti-parampara-history — Placeholder: Founded to ensure the unbroken chain of Vedic recitation continues in urban Bangalore, the Gurukula was established with the blessings of senior Vedic scholars.',
    dailySchedule: '#GKL-TODO-shruti-parampara-schedule — Placeholder: Students rise before dawn for Sandhyāvandana, followed by structured Veda pāṭha sessions, scriptural study, and evening prayers.',
    adhyapakas: [
      {
        name: 'Shyamasundara Ghanapati',
        qualification: 'Ghana Pāṭhī, Krishna Yajurveda',
        image: '/assets/gurukulas/shruti-parampara/acharya.jpg',
      },
    ],
    studentsSummary:
      '12 residential students currently pursuing Veda adhyayana from Samhita through Ghana Pāṭha levels. #GKL-TODO-shruti-parampara-students',
    events: [
      {
        title: 'Annual Upakarma',
        date: '#GKL-TODO-shruti-parampara-event-date',
        description: 'Annual renewal of the sacred thread and Vedic study commitment.',
      },
    ],
    contact: {
      phone: '#GKL-TODO-shruti-parampara-phone',
      email: '#GKL-TODO-shruti-parampara-email',
      address: 'JP Nagar, Bangalore, Karnataka',
    },
    heroImage: '/assets/gurukulas/shruti-parampara/hero.jpg',
    images: [
      '/assets/gurukulas/shruti-parampara/students.jpg',
    ],
  },
  {
    slug: 'gowtama-veda-pathashala',
    name: 'Gowtama Veda Pathashala',
    location: 'Banashankari, Bangalore',
    city: 'Bangalore',
    acharya: 'Govinda Sharma Ghanapati',
    studentCount: 20,
    shakha: 'Krishna Yajurveda — Taittirīya Shākhā',
    established: '#GKL-TODO-gowtama-established',
    overview:
      'Gowtama Veda Pathashala in Banashankari is one of the larger Gurukulas in Bangalore, with twenty students learning under Ācārya Govinda Sharma Ghanapati. The Pathashala emphasises both Veda pāṭha and the holistic formation of character through Saṁskāra and cultural education. #GKL-TODO-gowtama-overview',
    history: '#GKL-TODO-gowtama-history — Placeholder: Established to serve the growing need for structured Vedic education in South Bangalore.',
    dailySchedule: '#GKL-TODO-gowtama-schedule',
    adhyapakas: [
      {
        name: 'Govinda Sharma Ghanapati',
        qualification: 'Ghana Pāṭhī, Krishna Yajurveda',
        image: '/assets/gurukulas/gowtama/acharya.jpg',
      },
    ],
    studentsSummary:
      '20 students in various stages of Veda adhyayana. #GKL-TODO-gowtama-students',
    events: [],
    contact: {
      phone: '#GKL-TODO-gowtama-phone',
      email: '#GKL-TODO-gowtama-email',
      address: 'Banashankari, Bangalore, Karnataka',
    },
    heroImage: '/assets/gurukulas/gowtama/hero.jpg',
    images: [],
  },
  {
    slug: 'sacchidananda-advaitashrama',
    name: 'Sacchidananda Advaitashrama',
    location: 'Rajajinagar, Bangalore',
    city: 'Bangalore',
    acharya: 'Sumantha Ghanapati',
    studentCount: 12,
    shakha: '#GKL-TODO-sacchidananda-shakha',
    established: '#GKL-TODO-sacchidananda-established',
    overview:
      'Sacchidananda Advaitashrama in Rajajinagar carries forward the tradition of Advaita Vedanta alongside Veda pāṭha. Under Ācārya Sumantha Ghanapati, twelve students receive grounding in both the ritual (karma-kāṇḍa) and philosophical (jñāna-kāṇḍa) dimensions of the Veda. #GKL-TODO-sacchidananda-overview',
    history: '#GKL-TODO-sacchidananda-history — Placeholder: Named in honour of the Sat-Chit-Ānanda nature of Brahman, the Ashrama integrates Vedantic study with Vedic recitation.',
    dailySchedule: '#GKL-TODO-sacchidananda-schedule',
    adhyapakas: [
      {
        name: 'Sumantha Ghanapati',
        qualification: 'Ghana Pāṭhī',
        image: '/assets/gurukulas/sacchidananda/acharya.jpg',
      },
    ],
    studentsSummary:
      '12 residential students. #GKL-TODO-sacchidananda-students',
    events: [],
    contact: {
      phone: '#GKL-TODO-sacchidananda-phone',
      email: '#GKL-TODO-sacchidananda-email',
      address: 'Rajajinagar, Bangalore, Karnataka',
    },
    heroImage: '/assets/gurukulas/sacchidananda/hero.jpg',
    images: [],
  },
];
