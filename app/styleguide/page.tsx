/**
 * Styleguide — internal design system reference.
 *
 * Showcases every UI primitive, the color palette, typography scale,
 * and layout components. Accessible at /styleguide by direct URL only;
 * not included in site navigation.
 */

import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { StyleguideInteractive } from './interactive';

export const metadata: Metadata = {
  title: 'Design System — Styleguide',
  robots: 'noindex, nofollow',
};

const colors = [
  { name: 'ivory-50', value: '#FDFBF5', css: 'bg-ivory-50' },
  { name: 'ivory', value: '#F7F1E3', css: 'bg-ivory' },
  { name: 'ivory-300', value: '#EDE5D0', css: 'bg-ivory-300' },
  { name: 'ivory-400', value: '#E0D5B8', css: 'bg-ivory-400' },
  { name: 'charcoal-200', value: '#9E9E9E', css: 'bg-charcoal-200' },
  { name: 'charcoal', value: '#2A2A2A', css: 'bg-charcoal' },
  { name: 'charcoal-500', value: '#1C1C1C', css: 'bg-charcoal-500' },
  { name: 'indigo-50', value: '#EEEDF5', css: 'bg-indigo-50' },
  { name: 'indigo-100', value: '#D4D2E8', css: 'bg-indigo-100' },
  { name: 'indigo', value: '#2E2A5D', css: 'bg-indigo' },
  { name: 'indigo-500', value: '#201D42', css: 'bg-indigo-500' },
  { name: 'kumkuma-50', value: '#F9ECEC', css: 'bg-kumkuma-50' },
  { name: 'kumkuma', value: '#A63232', css: 'bg-kumkuma' },
  { name: 'kumkuma-500', value: '#8B2828', css: 'bg-kumkuma-500' },
  { name: 'gold-50', value: '#FBF5E6', css: 'bg-gold-50' },
  { name: 'gold', value: '#B8860B', css: 'bg-gold' },
  { name: 'gold-400', value: '#946B09', css: 'bg-gold-400' },
];

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 space-y-16">
      {/* Page title */}
      <div className="space-y-2">
        <h1 className="font-serif text-4xl font-bold text-indigo">
          Design System
        </h1>
        <p className="text-charcoal-300">
          Sri Shivasankalpa Trust — v0.1 style reference. Internal use only.
        </p>
      </div>

      {/* ── Colors ── */}
      <section className="space-y-6">
        <SectionHeading title="Color Palette" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {colors.map((c) => (
            <div key={c.name} className="space-y-1.5">
              <div
                className={`h-16 rounded-md border border-ivory-300 ${c.css}`}
              />
              <p className="text-xs font-mono text-charcoal-300">{c.name}</p>
              <p className="text-[10px] font-mono text-charcoal-200">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ── */}
      <section className="space-y-6">
        <SectionHeading title="Typography" />

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-charcoal-200">
              Serif — EB Garamond (headings)
            </p>
            <h2 className="font-serif text-4xl text-indigo">
              The Eternal Wisdom of the Vedas
            </h2>
            <h3 className="font-serif text-2xl text-indigo">
              Supporting Gurukulas across Karnataka
            </h3>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-charcoal-200">
              Sans — Inter (body)
            </p>
            <p className="text-base text-charcoal leading-relaxed">
              Sri Shivasankalpa Trust is dedicated to preserving and nurturing
              Vedic education through direct support to Gurukulas, fostering
              the values of saṁskāra, and sustaining the sacred Guru–Shishya
              Parampara.
            </p>
            <p className="text-sm text-charcoal-300">
              Secondary text in charcoal-300 for captions and meta information.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-charcoal-200">
              Devanagari — Noto Serif Devanagari (shlokas &amp; Sanskrit)
            </p>
            <p className="shloka-devanagari text-2xl text-indigo">
              वेदोऽखिलो धर्ममूलम्
            </p>
            <p className="shloka-devanagari text-lg text-charcoal">
              गण्यन्ते पांसवो भूमेः गण्यन्ते वृष्टिबन्दवः।
              विधात्राऽपि न गण्यन्ते वेदाध्ययनतः फलम्॥
            </p>
          </div>
        </div>
      </section>

      {/* ── Shloka Block ── */}
      <section className="space-y-6">
        <SectionHeading title="Shloka Block" />

        <Card>
          <ShlokaBlock
            devanagari="तन्मे मनः शिवसङ्कल्पमस्तु"
            iast="Tan me manaḥ śivasaṅkalpamastu"
            translation="May my mind be filled with auspicious resolve."
            source="Shiva Sankalpa Sukta, Shukla Yajurveda"
            size="lg"
          />
        </Card>

        <Card>
          <ShlokaBlock
            devanagari="वेदोऽखिलो धर्ममूलम्"
            iast="Vedo'khilo dharma mūlam"
            translation="The Veda is the root of all Dharma."
            source="Manusmṛti 2.6"
            size="md"
          />
        </Card>

        <Card>
          <ShlokaBlock
            devanagari="रुदं द्रावयति इति रुद्रः"
            iast="Rudam drāvayati iti Rudraḥ"
            translation="That which melts away suffering — that is Rudra."
            size="sm"
          />
        </Card>
      </section>

      {/* ── Section Heading ── */}
      <section className="space-y-6">
        <SectionHeading title="Section Headings" />

        <div className="space-y-8 rounded-lg border border-ivory-300 p-6">
          <SectionHeading
            title="With Devanagari and Subtitle"
            devanagari="वेदविद्या"
            subtitle="The importance of Vedic knowledge in the modern world."
            centered
          />

          <hr className="border-ivory-300" />

          <SectionHeading
            title="Left-Aligned Heading"
            subtitle="For content sections that flow naturally from left to right."
          />

          <hr className="border-ivory-300" />

          <SectionHeading title="Simple Heading" as="h3" />
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="space-y-6">
        <SectionHeading title="Cards" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card hover>
            <h3 className="font-serif text-lg text-indigo mb-2">
              Gurukula Abhivruddhi
            </h3>
            <p className="text-sm text-charcoal-300 leading-relaxed">
              Direct support to Vedic Gurukulas for infrastructure,
              teaching materials, and student welfare.
            </p>
          </Card>

          <Card hover>
            <h3 className="font-serif text-lg text-indigo mb-2">
              Go-Samrakshanam
            </h3>
            <p className="text-sm text-charcoal-300 leading-relaxed">
              Supporting Gośālās and the sacred cause of cow protection
              and welfare.
            </p>
          </Card>

          <Card hover>
            <h3 className="font-serif text-lg text-indigo mb-2">
              Event Seva
            </h3>
            <p className="text-sm text-charcoal-300 leading-relaxed">
              Funding sacred events like the Maharudra Purascharana
              for universal welfare.
            </p>
          </Card>
        </div>
      </section>

      {/* ── Placeholder Image ── */}
      <section className="space-y-6">
        <SectionHeading title="Placeholder Image" />

        <div className="grid gap-4 sm:grid-cols-2">
          <PlaceholderImage
            todoId="IMG-TODO-example-16-9"
            caption="16:9 aspect ratio — default for hero images"
          />
          <PlaceholderImage
            todoId="IMG-TODO-example-1-1"
            caption="1:1 aspect ratio — for profile photos"
            aspectRatio="1/1"
          />
        </div>
      </section>

      {/* ── Interactive Components ── */}
      <StyleguideInteractive />
    </div>
  );
}
