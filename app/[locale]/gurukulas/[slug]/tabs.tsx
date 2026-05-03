/**
 * GurukulaTabs — client wrapper for the tabbed content on Gurukula detail pages.
 */

'use client';

import { Tabs } from '@/components/ui/Tabs';

interface GurukulaTabsProps {
  labels: {
    overview: string;
    adhyapakas: string;
    vidyarthis: string;
    events: string;
    contact: string;
  };
  overview: React.ReactNode;
  adhyapakas: React.ReactNode;
  vidyarthis: React.ReactNode;
  events: React.ReactNode;
  contact: React.ReactNode;
}

export function GurukulaTabs({
  labels,
  overview,
  adhyapakas,
  vidyarthis,
  events,
  contact,
}: GurukulaTabsProps) {
  return (
    <Tabs
      tabs={[
        { id: 'overview', label: labels.overview, content: overview },
        { id: 'adhyapakas', label: labels.adhyapakas, content: adhyapakas },
        { id: 'vidyarthis', label: labels.vidyarthis, content: vidyarthis },
        { id: 'events', label: labels.events, content: events },
        { id: 'contact', label: labels.contact, content: contact },
      ]}
      defaultTab="overview"
    />
  );
}
