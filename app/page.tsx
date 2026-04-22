/**
 * Homepage — Sri Shivasankalpa Vṛnda
 *
 * Sections (top to bottom):
 *   1. Hero with banner image, tagline shloka, audio player, CTAs
 *   2. Importance of Veda Vidya with Veda Vruksha image
 *   3. Why Vedic Gurukulas Matter Today
 *   4. Featured Gurukulas (3 cards)
 *   5. Upcoming Events (Maharudra)
 *   6. Jagadguru's Anugraha callout
 *   7. Donation CTA (3 purpose cards + modal)
 */

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { AudioPlayer } from '@/components/blocks/AudioPlayer';
import { DonationSection } from '@/components/blocks/DonationSection';
import { getGurukulas, getFeaturedEvents } from '@/lib/data-access';

export default function HomePage() {
  const gurukulas = getGurukulas();
  const featuredEvents = getFeaturedEvents();
  const maharudra = featuredEvents[0];

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          Section 1 — Hero with banner background
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/assets/og/hero-banner.jpg"
          alt="Gurukula students"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-500/70 via-charcoal-500/60 to-charcoal-500/80" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-8 py-16">
          {/* Logo — mix-blend-mode removes white background */}
          <div className="mx-auto h-24 w-auto md:h-32 rounded-xl bg-ivory/90 backdrop-blur-sm p-3 inline-block">
            <Image
              src="/assets/og/logo.png"
              alt="Sri Shivasankalpa"
              width={120}
              height={120}
              className="h-full w-auto"
            />
          </div>

          {/* Tagline shloka */}
          <div className="space-y-3">
            <p className="shloka-devanagari text-2xl text-gold-100 md:text-3xl drop-shadow-md">
              तन्मे मनः शिवसङ्कल्पमस्तु
            </p>
            <p className="shloka-iast text-base text-ivory-100/80 md:text-lg">
              Tan me manaḥ śivasaṅkalpamastu
            </p>
            <p className="text-sm text-ivory-100/70 italic">
              May my mind be filled with auspicious resolve
            </p>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-3xl font-bold text-ivory-50 md:text-5xl tracking-tight drop-shadow-md">
              Sri Shivasankalpa Vṛnda
            </h1>
            <p className="text-sm text-gold-100/90 tracking-wider uppercase font-medium">
              Preserving Sanātana Dharma through Seva, Śraddhā, and Saṁskāra
            </p>
            <p className="mx-auto max-w-xl text-base text-ivory-100/80 leading-relaxed">
              With the boundless grace of the Jagadgurus of Dakshinamnaya
              Sri Sharada Peetham, Sringeri, we are devoted to supporting
              Veda Gurukulas and sustaining the timeless Guru–Shishya Parampara.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/donations">
              <Button variant="primary" size="lg" className="!bg-kumkuma hover:!bg-kumkuma-500 !border-kumkuma">
                Support a Gurukula
              </Button>
            </Link>
            <Link href="/events/maharudra">
              <Button variant="secondary" size="lg" className="!border-ivory-100/40 !text-ivory-50 hover:!bg-ivory-50/10">
                Maharudra Purascharana
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          {/* Audio player — integrated into hero */}
          <div className="pt-4">
            <AudioPlayer src="/assets/audio/vedic-chant.mp4" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Section 2 — Importance of Veda Vidya + Veda Vruksha
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
          <SectionHeading
            title="The Importance of Veda Vidya"
            devanagari="वेदविद्या"
            subtitle="The Vedas are the foundation of Sanātana Dharma — an unbroken oral tradition spanning millennia, preserved through the sacred bond of Guru and Shishya."
            centered
          />

          <ShlokaBlock
            devanagari={"ऋचो यजूंषि सामानि अथर्वाङ्गिरसां तथा।\nएष वेदचतुष्टस्य धर्मो मूलं सनातनम्॥"}
            iast="Ṛco yajūṃṣi sāmāni atharvāṅgirasāṃ tathā | Eṣa vedacatuṣṭasya dharmo mūlaṃ sanātanam ||"
            translation="Rooted in the four Vedas, Dharma stands eternal — nourishing life, order, and truth."
            source="Viṣṇu Purāṇa"
            size="md"
          />

          {/* Veda Vruksha — image */}
          <div className="flex justify-center py-4">
            <Image
              src="/assets/artefacts/veda-vruksha.png"
              alt="Veda Vriksha — The Tree of Vedic Knowledge showing the four Vedas (Rigveda, Yajurveda, Samaveda, Atharvaveda), their shakhas, and the six Vedangas"
              width={600}
              height={850}
              className="w-full max-w-xl rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Section 3 — Why Vedic Gurukulas Matter Today
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-ivory-50 border-y border-ivory-300">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8">
          <SectionHeading
            title="Why Vedic Gurukulas Matter Today"
            devanagari="नित्यं वेदमधीयताम्"
            subtitle="Adi Shankaracharya's timeless injunction: 'Let the Veda be studied daily.'"
            centered
          />

          <div className="space-y-5 text-charcoal-300 leading-relaxed">
            <p>
              Inspired by the timeless injunction of Adi Shankaracharya —{' '}
              <em className="shloka-iast">nityaṁ vedam adhīyatām</em>{' '}
              (&ldquo;let the Veda be studied daily&rdquo;) — Veda Gurukulas
              stand as sacred institutions that preserve the very heartbeat
              of Sanātana Dharma. Rooted in the venerable Guru–Śiṣya
              Paramparā, they are not merely centres of learning, but
              sanctuaries where knowledge is lived, discipline is cultivated,
              and saṁskāra is imbibed through constant guidance and practice.
            </p>
            <p>
              In an age of rapid change, they remain timeless beacons, ensuring
              that the wisdom of the Ṛṣis continues to illuminate generations
              with purity, authenticity, and unwavering continuity.
            </p>
            <p>
              In humble alignment with this sacred ideal, Śrī Śivasaṅkalpa
              Vṛnda is devoted to supporting and strengthening Veda Gurukulas.
              Through dedicated efforts toward the welfare of Vedic students
              and Adhyāpakas, the Vṛnda seeks to contribute — however
              modestly — to the continuity of this timeless heritage, for the
              benefit of society and for{' '}
              <em className="shloka-iast">loka kalyāṇa</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Section 4 — Featured Gurukulas
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
          <SectionHeading
            title="Gurukulas We Support"
            devanagari="गुरुकुलानि"
            subtitle="We work directly with Vedic Gurukulas in Karnataka, understanding their needs and providing sustained support."
            centered
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gurukulas.map((gk) => (
              <Link key={gk.slug} href={`/gurukulas/${gk.slug}`}>
                <Card hover as="article" className="h-full space-y-4">
                  <div className="overflow-hidden rounded-md">
                    {gk.heroImage.includes('#') || gk.heroImage.endsWith('/hero.jpg') ? (
                      <PlaceholderImage
                        todoId={`IMG-TODO-${gk.slug}-hero`}
                        caption={gk.name}
                        aspectRatio="3/2"
                      />
                    ) : (
                      <Image
                        src={gk.heroImage}
                        alt={`${gk.name}, ${gk.location}`}
                        width={400}
                        height={267}
                        className="w-full object-cover"
                        style={{ aspectRatio: '3/2' }}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-semibold text-indigo">
                      {gk.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-charcoal-200">
                      <MapPin size={14} />
                      {gk.location}
                    </div>
                    <p className="text-sm text-charcoal-300">
                      Ācārya: {gk.acharya}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-charcoal-200">
                      <Users size={14} />
                      {gk.studentCount} students
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/gurukulas">
              <Button variant="ghost">
                View all Gurukulas
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Section 5 — Upcoming Events (Maharudra)
          ═══════════════════════════════════════════════════ */}
      {maharudra && (
        <section className="py-16 md:py-20 bg-indigo-50/50 border-y border-ivory-300">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Card className="!bg-ivory-50 !p-8 md:!p-10 space-y-6 border-indigo-100">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <p className="shloka-devanagari text-sm text-kumkuma">
                    महारुद्र पुरश्चरणा
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-indigo md:text-3xl">
                    {maharudra.title}
                  </h2>
                  <p className="text-sm text-charcoal-200">
                    May 15–17, 2026 · {maharudra.location || 'Bangalore'}
                  </p>
                </div>
                <Link href="/events/maharudra" className="shrink-0">
                  <Button variant="primary">
                    Learn More & Participate
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
              <p className="text-charcoal-300 leading-relaxed">
                {maharudra.description}
              </p>
              <ShlokaBlock
                devanagari="रुदं द्रावयति इति रुद्रः"
                iast="Rudam drāvayati iti Rudraḥ"
                translation="That which melts away suffering — that is Rudra."
                size="sm"
              />
            </Card>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          Section 6 — Blessed by the Sringeri Jagadgurus
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <div className="relative rounded-xl border border-gold/30 bg-gold-50/40 overflow-hidden">
            {/* Sringeri Parampara image */}
            <div className="overflow-hidden">
              <Image
                src="/assets/artefacts/sringeri-parampara.jpg"
                alt="Sri Sharada Devi, Adi Shankaracharya, Jagadguru Sri Sri Bharati Tirtha Mahasannidhanam, and Jagadguru Sri Sri Vidhushekhara Bharati Sannidhanam of Sringeri Sharada Peetham"
                width={1024}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="p-8 md:p-10 text-center space-y-5">
              <div className="inline-block rounded-full bg-ivory px-4 py-1 border border-gold/30">
                <span className="shloka-devanagari text-sm text-gold">अनुग्रहः</span>
              </div>

              <h2 className="font-serif text-2xl font-semibold text-indigo md:text-3xl">
                Blessed by the Sringeri Jagadgurus
              </h2>

              <p className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed">
                The name &ldquo;Sri Shivasankalpa&rdquo; was bestowed as a blessing
                by His Holiness Jagadguru Sri Sri Vidhushekhara Bharati Sannidhanam
                of the Dakshinamnaya Sri Sharada Peetham, Sringeri. Sri Shivasankalpa
                Vṛnda operates with the boundless grace and divine blessings of
                His Holiness Jagadguru Sri Sri Bharati Tirtha Mahasannidhanam and
                His Holiness Jagadguru Sri Sri Vidhushekhara Bharati Sannidhanam.
              </p>

              <p className="text-sm text-charcoal-200 italic">
                The Vṛnda considers the blessings and approval of the Sringeri
                Jagadgurus as paramount in all its endeavours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Section 7 — Donation CTA
          ═══════════════════════════════════════════════════ */}
      <div className="border-t border-ivory-300 bg-ivory-50">
        <DonationSection />
      </div>
    </>
  );
}
