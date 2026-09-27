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
  adhyapakas?: React.ReactNode;
  curriculum?: React.ReactNode;
  contact?: React.ReactNode;
}

export function GurukulaTabs({
  labels,
  overview,
  adhyapakas,
  curriculum,
  contact,
}: GurukulaTabsProps) {
  const tabs = [
    { id: 'overview', label: labels.overview, content: overview },
    adhyapakas
      ? { id: 'adhyapakas', label: labels.adhyapakas, content: adhyapakas }
      : null,
    curriculum
      ? { id: 'curriculum', label: labels.curriculum, content: curriculum }
      : null,
    contact ? { id: 'contact', label: labels.contact, content: contact } : null,
  ].filter((tab): tab is { id: string; label: string; content: React.ReactNode } =>
    Boolean(tab)
  );

  return <Tabs tabs={tabs} defaultTab="overview" />;
}
