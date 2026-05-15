/**
 * GalleryGrid — client component with category tabs and image/video grid.
 *
 * - Photos and videos share the same `3:2` card aspect so cards line up
 *   neatly in the grid (caption sits at the same height for both kinds).
 * - Photos open in a `Modal` lightbox at full uncropped size on click.
 * - Videos play inline on click with native controls (no lightbox — the
 *   inline experience already lets users go fullscreen via the browser
 *   chrome and avoids re-loading the file).
 */

'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { GalleryItem } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';

interface GalleryGridProps {
  items: GalleryItem[];
  captions: string[];
  tabLabels: { all: string; gurukulas: string; events: string; misc: string };
  noItemsText: string;
}

const CARD_ASPECT_RATIO = '3 / 2';

function VideoCard({ item }: { item: GalleryItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [playing]);

  return (
    <div className="relative" style={{ aspectRatio: CARD_ASPECT_RATIO }}>
      <video
        ref={videoRef}
        src={item.src}
        className="w-full h-full object-cover rounded-t-lg bg-charcoal-500"
        preload="metadata"
        controls={playing}
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-charcoal-500/30 hover:bg-charcoal-500/50 transition-colors cursor-pointer"
          aria-label={`Play video: ${item.alt}`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/90 text-kumkuma shadow-lg hover:scale-110 transition-transform">
            <Play size={24} className="ml-0.5" />
          </div>
        </button>
      )}
    </div>
  );
}

function ImageCard({ item, caption }: { item: GalleryItem; caption?: string }) {
  const [open, setOpen] = useState(false);
  const lightboxTitle = caption ?? item.alt;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${lightboxTitle} — click to enlarge`}
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-t-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        style={{ aspectRatio: CARD_ASPECT_RATIO }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-200 hover:scale-[1.03]"
          style={{ objectPosition: item.imagePosition ?? 'center' }}
        />
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={lightboxTitle}
        size="3xl"
      >
        <div className="flex justify-center">
          <Image
            src={item.src}
            alt={item.alt}
            width={1600}
            height={1200}
            className="h-auto w-auto max-h-[75vh] max-w-full rounded-md object-contain"
          />
        </div>
      </Modal>
    </>
  );
}

export function GalleryGrid({ items, captions, tabLabels, noItemsText }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: tabLabels.all },
    { id: 'gurukulas', label: tabLabels.gurukulas },
    { id: 'events', label: tabLabels.events },
    { id: 'misc', label: tabLabels.misc },
  ];

  const indexedItems = items.map((item, i) => ({ item, originalIndex: i }));
  const filtered =
    activeCategory === 'all'
      ? indexedItems
      : indexedItems.filter(({ item }) => item.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${
                activeCategory === cat.id
                  ? 'bg-indigo text-ivory-50'
                  : 'bg-ivory-100 text-charcoal-300 hover:bg-indigo-50 hover:text-indigo'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-charcoal-200 italic py-12">
          {noItemsText}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ item, originalIndex }) => {
            const caption = captions[originalIndex];
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border border-ivory-300 bg-ivory-50"
              >
                {item.type === 'video' ? (
                  <VideoCard item={item} />
                ) : (
                  <ImageCard item={item} caption={caption} />
                )}

                {caption && (
                  <div className="px-3 py-2">
                    <p className="text-xs text-charcoal-300 leading-relaxed">
                      {caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
