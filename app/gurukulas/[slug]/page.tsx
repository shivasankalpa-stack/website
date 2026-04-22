/**
 * Gurukula detail — drawer-style full page.
 *
 * Visually designed to feel like a drawer/modal: large hero at top,
 * close button (×) top-right returning to /gurukulas, tabs below.
 * But it's a real page — linkable, SEO-friendly, mobile-comfortable.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { X, MapPin, Users, BookOpen, Phone, Mail } from 'lucide-react';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Card } from '@/components/ui/Card';
import { getGurukulaBySlug, getGurukulas } from '@/lib/data-access';
import { notFound } from 'next/navigation';
import { GurukulaTabs } from './tabs';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getGurukulas().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const gk = getGurukulaBySlug(slug);
  if (!gk) return {};
  return {
    title: gk.name,
    description: `${gk.name} in ${gk.location} — Ācārya ${gk.acharya}, ${gk.studentCount} students.`,
  };
}

function hasRealImage(path: string): boolean {
  return !path.includes('#') && !path.includes('hero.jpg');
}

function cleanPlaceholder(text: string): string {
  return text.replace(/#GKL-TODO-\S+/g, '').trim();
}

export default async function GurukulaDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const gk = getGurukulaBySlug(slug);
  if (!gk) notFound();

  return (
    <div className="relative">
      {/* Close button — returns to Gurukulas list */}
      <Link
        href="/gurukulas"
        className="fixed top-20 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 border border-ivory-300 shadow-md text-charcoal-300 hover:text-indigo hover:border-indigo-100 transition-colors md:right-8"
        aria-label="Close and return to Gurukulas list"
      >
        <X size={20} />
      </Link>

      {/* Hero image */}
      <div className="relative h-64 md:h-80 bg-ivory-300 overflow-hidden">
        {hasRealImage(gk.heroImage) ? (
          <Image
            src={gk.heroImage}
            alt={`${gk.name}, ${gk.location}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <PlaceholderImage
            todoId={`IMG-TODO-${gk.slug}-hero`}
            caption={gk.name}
            aspectRatio="auto"
            className="!rounded-none h-full"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/50 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-2xl font-bold text-ivory-50 md:text-3xl drop-shadow-md">
              {gk.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-ivory-100/90">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {gk.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                {gk.studentCount} students
              </span>
              {gk.shakha && !gk.shakha.includes('#') && (
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {gk.shakha}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content with tabs */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <GurukulaTabs
          overview={
            <div className="space-y-6">
              <div className="text-charcoal-300 leading-relaxed space-y-4">
                <p>{cleanPlaceholder(gk.overview)}</p>
                {gk.history && <p>{cleanPlaceholder(gk.history)}</p>}
              </div>
              {gk.dailySchedule && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-indigo mb-2">
                    Daily Schedule
                  </h3>
                  <p className="text-sm text-charcoal-300 leading-relaxed">
                    {cleanPlaceholder(gk.dailySchedule)}
                  </p>
                </div>
              )}
            </div>
          }
          adhyapakas={
            <div className="space-y-4">
              {gk.adhyapakas.map((teacher) => (
                <Card key={teacher.name} className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden shrink-0">
                    <PlaceholderImage
                      todoId={`IMG-TODO-${gk.slug}-teacher-${teacher.name.toLowerCase().replace(/\s+/g, '-')}`}
                      aspectRatio="1/1"
                      className="!rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-indigo">{teacher.name}</h4>
                    {teacher.qualification && (
                      <p className="text-sm text-charcoal-300">{teacher.qualification}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          }
          vidyarthis={
            <div className="text-charcoal-300 leading-relaxed">
              <p>{cleanPlaceholder(gk.studentsSummary)}</p>
              <p className="mt-2 text-xs text-charcoal-200 italic">
                Individual student details are not published to protect privacy.
              </p>
            </div>
          }
          events={
            <div className="space-y-4">
              {gk.events.length === 0 ? (
                <p className="text-charcoal-200 italic">
                  No upcoming events listed for this Gurukula.
                </p>
              ) : (
                gk.events.map((event, i) => (
                  <Card key={i} className="space-y-1">
                    <h4 className="font-serif font-semibold text-indigo">{event.title}</h4>
                    <p className="text-xs text-charcoal-200">{event.date}</p>
                    <p className="text-sm text-charcoal-300">{event.description}</p>
                  </Card>
                ))
              )}
            </div>
          }
          contact={
            <div className="space-y-3">
              {gk.contact.address && (
                <div className="flex items-start gap-3 text-sm text-charcoal-300">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-indigo" />
                  <span>{gk.contact.address}</span>
                </div>
              )}
              {gk.contact.phone && (
                <div className="flex items-center gap-3 text-sm text-charcoal-300">
                  <Phone size={16} className="shrink-0 text-indigo" />
                  <span>{cleanPlaceholder(gk.contact.phone)}</span>
                </div>
              )}
              {gk.contact.email && (
                <div className="flex items-center gap-3 text-sm text-charcoal-300">
                  <Mail size={16} className="shrink-0 text-indigo" />
                  <span>{cleanPlaceholder(gk.contact.email)}</span>
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}
