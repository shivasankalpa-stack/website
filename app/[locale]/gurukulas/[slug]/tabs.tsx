/**
 * GurukulaTabs — client wrapper for the tabbed content on Gurukula detail pages.
 *
 * Tabs (rebuilt v0.1):
 *   Overview     — story, founders, hero gallery
 *   Adhyāpakas   — teaching faculty with photos and lineage
 *   Curriculum   — Veda śākhās + supporting śāstras / subjects
 *   Contact      — address, phone, website
 */

'use client';

import { Tabs } from '@/components/ui/Tabs';

interface GurukulaTabsProps {
  labels: {
    overview: string;
    adhyapakas: string;
    curriculum: string;
    contact: string;
  };
  overview: React.ReactNode;
  adhyapakas: React.ReactNode;
  curriculum: React.ReactNode;
  contact: React.ReactNode;
}

export function GurukulaTabs({
  labels,
  overview,
  adhyapakas,
  curriculum,
  contact,
}: GurukulaTabsProps) {
  return (
    <Tabs
      tabs={[
        { id: 'overview', label: labels.overview, content: overview },
        { id: 'adhyapakas', label: labels.adhyapakas, content: adhyapakas },
        { id: 'curriculum', label: labels.curriculum, content: curriculum },
        { id: 'contact', label: labels.contact, content: contact },
      ]}
      defaultTab="overview"
    />
  );
}
