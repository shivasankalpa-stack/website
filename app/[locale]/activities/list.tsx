'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import type { ActivityItem, ActivityKind } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';

const FILTERS: Array<{ id: 'all' | ActivityKind; key: keyof FilterLabels }> = [
  { id: 'all', key: 'all' },
  { id: 'gurukulaVisit', key: 'visits' },
  { id: 'trustAffairs', key: 'trust' },
  { id: 'culturalProgramme', key: 'programmes' },
  { id: 'healthCamp', key: 'camps' },
];

export type FilterLabels = {
  all: string;
  visits: string;
  trust: string;
  programmes: string;
  camps: string;
};

type Props = {
  items: ActivityItem[];
  locale: string;
  gurukulaNames: Record<string, string>;
  kindLabels: Record<ActivityKind, string>;
  filterLabels: FilterLabels;
  readMore: string;
  noItems: string;
};

function formatDate(dateStr: string, locale: string): string {
  const tag = locale === 'kn' ? 'kn-IN' : 'en-IN';
  return new Date(dateStr).toLocaleDateString(tag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ActivitiesList({
  items,
  locale,
  gurukulaNames,
  kindLabels,
  filterLabels,
  readMore,
  noItems,
}: Props) {
  const [filter, setFilter] = useState<'all' | ActivityKind>('all');
  const visible =
    filter === 'all' ? items : items.filter((item) => item.kind === filter);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`
              whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${
                filter === tab.id
                  ? 'bg-indigo text-ivory-50'
                  : 'bg-ivory-100 text-charcoal-300 hover:bg-indigo-50 hover:text-indigo'
              }
            `}
          >
            {filterLabels[tab.key]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-charcoal-200 italic py-12">{noItems}</p>
      ) : (
        <div className="space-y-6">
          {visible.map((item) => {
            const body = (
              <Card hover={item.hasDetailPage} className="space-y-3 !p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-kumkuma font-medium uppercase tracking-wider">
                      {kindLabels[item.kind]}
                    </p>
                    <h2 className="font-serif text-2xl font-bold text-indigo">
                      {item.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-charcoal-200">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="h-3.5 w-3.5 shrink-0" />
                        {item.endDate
                          ? `${formatDate(item.date, locale)} – ${formatDate(item.endDate, locale)}`
                          : formatDate(item.date, locale)}
                      </span>
                      {item.gurukulaSlugs.length > 0 && (
                        <span className="flex min-w-0 items-center gap-1.5">
                          <MapPin size={14} className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {item.gurukulaSlugs
                              .map((slug) => gurukulaNames[slug])
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  {item.hasDetailPage && (
                    <Button variant="secondary" size="sm" className="shrink-0 self-start">
                      {readMore}
                      <ArrowRight size={14} />
                    </Button>
                  )}
                </div>
                <p className="text-charcoal-300 leading-relaxed">{item.publicSummary}</p>
              </Card>
            );

            if (!item.hasDetailPage) {
              return <div key={item.slug}>{body}</div>;
            }

            return (
              <Link key={item.slug} href={`/activities/${item.slug}`}>
                {body}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
