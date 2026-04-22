/**
 * About Us — trust introduction, vision, mission, objectives,
 * trustees (expandable cards), and trust artefacts.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { BookOpen, Users, Search, HandHeart, Award, Heart } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getTrustees, getManagingCommittee } from '@/lib/data-access';
import { TrusteeGrid } from './trustees-grid';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Sri Shivasankalpa Vṛnda — our vision, mission, and commitment to Vedic education and Gurukula welfare.',
};

const objectives = [
  {
    icon: BookOpen,
    title: 'Vedic Education',
    description: 'Support Vedic education in Gurukulas, fostering saṁskāra, cultural values, and the cultivation of traditional arts and skills (kalā–kauśalya).',
  },
  {
    icon: Users,
    title: 'Community Engagement',
    description: 'Foster community engagement through the organisation and participation in awareness programs, workshops, and outreach initiatives.',
  },
  {
    icon: Search,
    title: 'Vedic Research',
    description: 'Support and participate in Vedic research initiatives and help build Vedic libraries for future generations.',
  },
  {
    icon: HandHeart,
    title: 'Gurukula Welfare',
    description: 'Assist Gurukulas in the fulfilment of their essential needs — infrastructure, teaching materials, student nutrition, and teacher welfare.',
  },
  {
    icon: Award,
    title: 'Honouring Scholars',
    description: 'Honour and recognise the sacrifice of Vedic scholars and Adhyāpakas who have dedicated their lives to preserving the Gurukula tradition.',
  },
  {
    icon: Heart,
    title: 'Go-Saṁrakṣaṇam',
    description: 'Support the development of Gośālās and the sacred cause of cow protection, shelter, and welfare.',
  },
];

export default function AboutPage() {
  const trustees = getTrustees();
  const managingCommittee = getManagingCommittee();

  return (
    <div className="space-y-0">
      {/* Hero banner */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image
          src="/assets/og/hero-banner.jpg"
          alt="Gurukula students"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-500/70 to-charcoal-500/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-4">
          <div className="mx-auto rounded-xl bg-ivory/90 backdrop-blur-sm p-2 inline-block">
            <Image
              src="/assets/og/logo.png"
              alt=""
              width={80}
              height={80}
              className="h-16 w-auto md:h-20"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
            About Sri Shivasankalpa Vṛnda
          </h1>
          <p className="text-sm text-gold-100/90 tracking-wider uppercase font-medium">
            Preserving Sanātana Dharma through Seva, Śraddhā, and Saṁskāra
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8">
          <SectionHeading title="Our Story" centered />

          <div className="text-charcoal-300 leading-relaxed space-y-5">
            <p>
              Across India, Vedic Gurukulas quietly sustain one of humanity&apos;s
              greatest intellectual and spiritual traditions. Within their modest
              walls, young students rise before dawn to learn the Vedas through
              the same oral tradition that has been practiced for thousands of
              years. Adhyāpakas — teachers who have dedicated their own lives to
              mastering the Vedas — guide each student with patience and devotion.
            </p>
            <p>
              Yet these Gurukulas rarely make headlines. Many operate with limited
              funding, aging infrastructure, and almost no public visibility. The
              teachers who give their lives to this tradition are often the least
              recognised.
            </p>
            <p className="text-charcoal font-medium">
              Sri Shivasankalpa Vṛnda was founded to change this.
            </p>
            <p>
              We are not a Gurukulam. We are a trust that exists to ensure
              Gurukulas thrive. We identify what they need, bring their story
              to a wider community, mobilise resources, and work alongside them
              to build a sustainable future for Vedic education.
            </p>
          </div>

          <ShlokaBlock
            devanagari="तन्मे मनः शिवसङ्कल्पमस्तु"
            iast="Tan me manaḥ śivasaṅkalpamastu"
            translation="May our minds be filled with auspicious resolve."
            source="Shiva Sankalpa Sukta, Shukla Yajurveda"
            size="md"
          />

          <p className="text-charcoal-300 leading-relaxed text-center max-w-2xl mx-auto">
            This resolve is our foundation: to serve the Gurukulas that preserve
            the Vedas, and to invite others to join us in this sacred responsibility.
            The name &ldquo;Sri Shivasankalpa&rdquo; was given to us as a blessing
            by the Jagadguru of the Dakshinamnaya Sri Sharada Peetham, Sringeri,
            and we operate in alignment with the Advaita Vedanta tradition of
            Adi Shankaracharya.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-indigo border-y border-indigo-500">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <div className="rounded-xl bg-indigo-500/50 p-8 space-y-4 border border-indigo-200/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="shloka-devanagari text-gold text-lg">दृ</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-ivory-50">
                  Our Vision
                </h2>
              </div>
              <p className="text-ivory-100/80 leading-relaxed">
                A world where every Vedic Gurukula has the resources, recognition,
                and community it needs to thrive — and where the Guru–Shishya
                Paramparā continues to illuminate generations.
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-xl bg-indigo-500/50 p-8 space-y-4 border border-indigo-200/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="shloka-devanagari text-gold text-lg">ल</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-ivory-50">
                  Our Mission
                </h2>
              </div>
              <p className="text-ivory-100/80 leading-relaxed">
                To identify the needs of Veda Gurukulas, create public awareness
                about their vital role in preserving Vedic Dharma, generate
                financial and community support, and foster their long-term
                growth and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives — card grid with icons */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
          <SectionHeading
            title="What We Do"
            devanagari="उद्देश्यानि"
            subtitle="Our work spans six core areas of support for Vedic education and heritage preservation."
            centered
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((obj) => (
              <Card key={obj.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo shrink-0">
                    <obj.icon size={20} />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-indigo">
                    {obj.title}
                  </h3>
                </div>
                <p className="text-sm text-charcoal-300 leading-relaxed">
                  {obj.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="py-16 md:py-20 bg-ivory-50 border-y border-ivory-300">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-6">
          <SectionHeading title="How We Operate" centered />
          <div className="text-charcoal-300 leading-relaxed space-y-4">
            <p>
              The Vṛnda reaches out to Gurukulas across Karnataka — beginning
              with Bangalore — speaking with administrators, Adhyāpakas (teachers),
              and Vidyārthīs (students) to identify needs and assess what
              assistance can be provided.
            </p>
            <p>
              In parallel, we are building a database of Adhyāpakas and Veda
              Vidyārthīs — shakha, level of study, contact details — for future
              reference and coordination. This systematic approach ensures that
              our support is targeted, sustained, and responsive to real needs.
            </p>
          </div>
        </div>
      </section>

      {/* Team Shivasankalpa */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-14">
          <SectionHeading
            title="Team Shivasankalpa"
            devanagari="शिवसङ्कल्प वृन्दम्"
            subtitle="The individuals who guide and govern the Vṛnda's activities. Click to learn more."
            centered
          />

          {/* Managing Committee */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-indigo text-center">
              Managing Committee
            </h3>
            <TrusteeGrid trustees={managingCommittee} />
          </div>

          {/* Trustees */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-indigo text-center">
              Trustees
            </h3>
            <TrusteeGrid trustees={trustees} />
          </div>
        </div>
      </section>

      {/* Trust Artefacts */}
      <section className="bg-ivory-50 border-y border-ivory-300 py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8">
          <SectionHeading
            title="Trust Artefacts"
            subtitle="Certificates, audit reports, and official documents."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="text-center space-y-3">
              <PlaceholderImage
                todoId="ARTEFACT-TODO-trust-certificate"
                caption="Trust Registration Certificate"
                aspectRatio="4/3"
              />
              <p className="text-sm font-medium text-charcoal-300">
                Registration Certificate
              </p>
            </Card>
            <Card className="text-center space-y-3">
              <PlaceholderImage
                todoId="ARTEFACT-TODO-audit-report"
                caption="Audit Report"
                aspectRatio="4/3"
              />
              <p className="text-sm font-medium text-charcoal-300">
                Audit Report
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
