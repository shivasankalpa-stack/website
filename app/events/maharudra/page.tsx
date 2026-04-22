/**
 * Maharudra Purascharana — detailed event page.
 *
 * Content sourced from the trust's official Maharudra invite letter.
 * Includes: spiritual significance, programme schedule, seva information,
 * and an inline donation modal (opens directly, not via /donations).
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getEventBySlug } from '@/lib/data-access';
import { notFound } from 'next/navigation';
import { MaharudraDonateButton } from './donate-button';

export const metadata: Metadata = {
  title: 'Mahā Rudra Puraścaraṇa — May 15–17, 2026',
  description:
    'A three-day Maha Rudra Purascharana for Loka Kalyana and the support of Veda Gurukulas, organised by Sri Shivasankalpa Vṛnda.',
};

export default function MaharudraPage() {
  const event = getEventBySlug('maharudra');
  if (!event) notFound();

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-16">
        {/* Back link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-charcoal-200 hover:text-indigo transition-colors"
        >
          <ArrowLeft size={16} />
          All Events
        </Link>

        {/* ── Hero ── */}
        <div className="text-center space-y-6">
          <ShlokaBlock
            devanagari="श्रीगणेशाय नमः श्रीशारदागुरुभ्यो नमः"
            size="sm"
          />

          <div className="space-y-3">
            <p className="shloka-devanagari text-lg text-kumkuma">
              महारुद्र पुरश्चरणा
            </p>
            <h1 className="font-serif text-3xl font-bold text-indigo md:text-4xl">
              {event.title}
            </h1>
            <p className="text-lg text-charcoal-300">
              {event.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-charcoal-200">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              May 15–17, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} />
              {event.location || 'Bangalore'}
            </span>
          </div>

          {/* Venue map */}
          <div className="overflow-hidden rounded-lg border border-ivory-300 shadow-sm max-w-xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6386530619593!2d77.53902407649872!3d12.930930587380791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e382916eb6b%3A0xd6480eb951f7e896!2sHoysala%20Trust!5e0!3m2!1sen!2sin!4v1776786114496!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hoysala Trust, Hosakerehalli, Bengaluru — venue for Maharudra Purascharana"
            />
          </div>
        </div>

        {/* ── Sri Adi Shankaracharya worshipping the Sphatika Linga ── */}
        <div className="flex justify-center">
          <Image
            src="/assets/artefacts/sri-adi-shankara.jpg"
            alt="Sri Adi Shankaracharya worshipping the Sphatika Linga — painting"
            width={600}
            height={750}
            className="w-full max-w-lg rounded-xl shadow-lg"
            priority
          />
        </div>

        {/* ── Introduction ── */}
        <div className="text-center space-y-6">
          <ShlokaBlock
            devanagari="गण्यन्ते पांसवो भूमेः गण्यन्ते वृष्टिबन्दवः।\nविधात्राऽपि न गण्यन्ते वेदाध्ययनतः फलम्॥"
            translation="The particles of earth may be counted, the drops of rain may be counted — but even Brahma, the Creator, cannot measure the fruits of Vedādhyayana."
            size="sm"
          />

          <div className="text-charcoal-300 leading-relaxed space-y-4 max-w-2xl mx-auto">
            <p>
              Recognising the immeasurable value of the Vedas, it is our sacred
              responsibility to contribute towards their preservation, nourishment,
              and propagation. With the boundless grace and divine blessings of
              His Holiness Jagadguru Sri Sri Bharati Tirtha Mahasannidhanam and
              His Holiness Jagadguru Sri Sri Vidhushekhara Bharati Sannidhanam of
              Dakshinamnaya Sri Sharada Peetham, Sringeri, and under the auspices
              of Sri Shivasankalpa Vṛnda, we are organising this Mahā Rudra
              Puraścaraṇa for Loka Kalyāṇa and the support of Veda Gurukulas.
            </p>

            <p>
              We humbly invite all devotees and well-wishers to participate and
              contribute through <em className="shloka-iast">tanu</em> (service),{' '}
              <em className="shloka-iast">mana</em> (devotion), and{' '}
              <em className="shloka-iast">dhana</em> (resources).
            </p>
          </div>
        </div>

        {/* ── Spiritual Significance of the Rudrādhyāya ── */}
        <section className="space-y-8 text-center">
          <SectionHeading title="Spiritual Significance of the Rudrādhyāya" centered />

          <ShlokaBlock
            devanagari="रुदं द्रावयति इति रुद्रः"
            iast="Rudam drāvayati iti Rudraḥ"
            translation="That which melts away suffering — that is Rudra."
            size="md"
          />

          <p className="text-charcoal-300 leading-relaxed max-w-2xl mx-auto">
            Rudra is the compassionate Lord who melts away the devotee&apos;s
            sorrow and destroys all suffering.
          </p>

          <Card className="!bg-ivory-100 !border-gold/20 max-w-2xl mx-auto">
            <ShlokaBlock
              devanagari={"पातकानि विनश्यन्ति यावन्ति रुद्रजपतः |\nभुवि तावन्ति पापानि जन्यन्ते न नरैर्मुने ||\nशिवनामनि तरे प्राप्ते संसाराब्धिं तरन्ति ते |\nसंसारमूलपापानि तानि नश्यन्त्यसंशयः ||"}
              translation="All sins are destroyed for one who chants the Rudra. Through the grace of Shiva's name, one crosses the ocean of worldly existence. The root causes of worldly bondage are undoubtedly annihilated."
              source="Shiva Purana"
              size="sm"
            />
          </Card>

          <div className="text-charcoal-300 leading-relaxed space-y-4 max-w-2xl mx-auto">
            <p>
              As described in the Shiva Purana, the ultimate goal of human birth
              is liberation from the cycle of birth and death and attainment of
              Kaivalya (Supreme Liberation). In Kali Yuga, Bhagavan has bestowed
              two primary paths — Karma Mārga (Path of Action) and Jñāna Mārga
              (Path of Knowledge). Selfless actions performed with devotion lead
              one towards knowledge and liberation.
            </p>
            <p className="font-medium text-charcoal">
              The Yajur Veda, particularly the Rudrādhyāya, prescribes sacred
              chanting and homa that remove accumulated karmas, bestow inner
              purification, and lead the seeker towards Amṛtatva — immortality.
            </p>
          </div>
        </section>

        {/* ── Programme Schedule ── */}
        {event.schedule && (
          <section className="space-y-8">
            <SectionHeading title="Programme Schedule" centered />

            <div className="space-y-6">
              {event.schedule.map((day) => (
                <Card key={day.date} className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-indigo flex items-center gap-2">
                    <Calendar size={18} className="text-kumkuma" />
                    {day.dayLabel}
                  </h3>
                  <div className="space-y-3">
                    {day.items.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="shrink-0 w-36 text-sm font-medium text-kumkuma">
                          {item.time}
                        </span>
                        <span className="text-sm text-charcoal-300 leading-relaxed">
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── Seva Information ── */}
        {event.sevaItems && (
          <section className="space-y-8">
            <SectionHeading
              title="Seva Opportunities"
              subtitle="Participate by offering seva. Each contribution supports the sacred event and the welfare of Veda Gurukulas."
              centered
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {event.sevaItems.map((seva) => (
                <Card key={seva.name} className="flex items-center justify-between gap-3 !py-4">
                  <span className="text-sm text-charcoal-300">{seva.name}</span>
                  <span className="shrink-0 font-serif font-semibold text-indigo">
                    ₹{seva.amount.toLocaleString('en-IN')}
                  </span>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── CTAs ── */}
        <section className="text-center space-y-6 py-8 border-t border-ivory-300">
          <ShlokaBlock
            devanagari="॥ शिवसंकल्पमस्तु ॥"
            translation="May our minds be filled with auspicious resolve."
            size="md"
          />

          <p className="text-charcoal-300 leading-relaxed max-w-lg mx-auto">
            We earnestly request all devotees to participate actively and help
            make this sacred endeavour successful through your presence and support.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <MaharudraDonateButton />
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Volunteer
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
