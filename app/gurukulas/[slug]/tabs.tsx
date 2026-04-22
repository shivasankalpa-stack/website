/**
 * GurukulaTabs — client wrapper for the tabbed content on Gurukula detail pages.
 */

'use client';

import { Tabs } from '@/components/ui/Tabs';

interface GurukulaTabsProps {
  overview: React.ReactNode;
  adhyapakas: React.ReactNode;
  vidyarthis: React.ReactNode;
  events: React.ReactNode;
  contact: React.ReactNode;
}

export function GurukulaTabs({
  overview,
  adhyapakas,
  vidyarthis,
  events,
  contact,
}: GurukulaTabsProps) {
  return (
    <Tabs
      tabs={[
        { id: 'overview', label: 'Overview', content: overview },
        { id: 'adhyapakas', label: 'Adhyāpakas', content: adhyapakas },
        { id: 'vidyarthis', label: 'Vidyārthīs', content: vidyarthis },
        { id: 'events', label: 'Events', content: events },
        { id: 'contact', label: 'Contact', content: contact },
      ]}
      defaultTab="overview"
    />
  );
}
