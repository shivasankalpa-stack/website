/**
 * Gurukulas list — card grid of supported Vedic Gurukulas.
 * Each card links to the drawer-style detail page at /gurukulas/[slug].
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getGurukulas } from '@/lib/data-access';

export const metadata: Metadata = {
  title: 'Vedic Gurukulas',
  description:
    'Vedic Gurukulas supported by Sri Shivasankalpa Trust — Shruti Parampara, Gowtama Veda Pathashala, Sacchidananda Advaitashrama.',
};

function hasRealImage(path: string): boolean {
  return !path.includes('#') && !path.includes('hero.jpg');
}

export default function GurukulasListPage() {
  const gurukulas = getGurukulas();

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        <div className="text-center space-y-4">
          <SectionHeading
            title="Vedic Gurukulas"
            devanagari="वेदगुरुकुलानि"
            subtitle="We work directly with Gurukulas in Karnataka, understanding their needs and providing sustained support."
            centered
          />
          <p className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed">
            Click on a Gurukula to learn more about their tradition, Ācāryas,
            students, and how you can support them.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gurukulas.map((gk) => (
            <Link key={gk.slug} href={`/gurukulas/${gk.slug}`}>
              <Card hover as="article" className="h-full space-y-4">
                <div className="overflow-hidden rounded-md">
                  {hasRealImage(gk.heroImage) ? (
                    <Image
                      src={gk.heroImage}
                      alt={`${gk.name}, ${gk.location}`}
                      width={400}
                      height={267}
                      className="w-full object-cover"
                      style={{ aspectRatio: '3/2' }}
                    />
                  ) : (
                    <PlaceholderImage
                      todoId={`IMG-TODO-${gk.slug}-hero`}
                      caption={gk.name}
                      aspectRatio="3/2"
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
                  {gk.shakha && !gk.shakha.includes('#') && (
                    <p className="text-xs text-indigo-300">{gk.shakha}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
