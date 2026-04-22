/**
 * Events listing — intro to trust events + featured event cards.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getEvents } from '@/lib/data-access';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Sacred events organised by Sri Shivasankalpa Trust — Maharudra Purascharana, community gatherings, and more.',
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-12">
        <div className="space-y-6 text-center">
          <SectionHeading
            title="Events"
            devanagari="कार्यक्रमाः"
            subtitle="Sacred gatherings that strengthen community bonds and sustain the Vedic tradition."
            centered
          />

          <p className="mx-auto max-w-2xl text-charcoal-300 leading-relaxed">
            Sri Shivasankalpa Trust organises events that serve both spiritual
            and social purposes — from elaborate Vedic rituals like the Maharudra
            Purascharana to community awareness programmes and Gurukula visits.
            Each event is an opportunity for devotees to participate through
            tanu (service), mana (devotion), and dhana (contribution).
          </p>
        </div>

        {/* Event cards */}
        <div className="space-y-6">
          {events.map((event) => (
            <Link key={event.slug} href={`/events/${event.slug}`}>
              <Card hover className="space-y-4 !p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1">
                    {event.subtitle && (
                      <p className="text-xs text-kumkuma font-medium uppercase tracking-wider">
                        Featured Event
                      </p>
                    )}
                    <h2 className="font-serif text-2xl font-bold text-indigo">
                      {event.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-charcoal-200">
                      <Calendar size={14} />
                      {event.endDate
                        ? `${formatDate(event.date)} – ${formatDate(event.endDate)}`
                        : formatDate(event.date)
                      }
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="shrink-0 self-start">
                    Details
                    <ArrowRight size={14} />
                  </Button>
                </div>
                <p className="text-charcoal-300 leading-relaxed">
                  {event.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        {events.length === 1 && (
          <div className="text-center">
            <p className="text-sm text-charcoal-200 italic">
              More events will be announced as they are planned. Follow us for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
