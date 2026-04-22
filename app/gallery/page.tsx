/**
 * Gallery — photos and videos from trust activities.
 * Tabs segregate by category: Events / Gurukulas / Misc.
 */

import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getGalleryItems } from '@/lib/data-access';
import { GalleryGrid } from './grid';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos and videos from Sri Shivasankalpa Trust activities — Gurukula visits, events, and community gatherings.',
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        <SectionHeading
          title="Gallery"
          subtitle="Moments from our Gurukula visits, events, and community activities."
          centered
        />

        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
