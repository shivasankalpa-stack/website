/**
 * GalleryGrid — client component with category tabs and image/video grid.
 * Videos play inline on click with native controls.
 */

'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { GalleryItem } from '@/lib/types';

interface GalleryGridProps {
  items: GalleryItem[];
  captions: string[];
  tabLabels: { all: string; gurukulas: string; events: string; misc: string };
  noItemsText: string;
}

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
    <div className="relative" style={{ aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        src={item.src}
        className="w-full h-full object-cover rounded-t-lg"
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
          {filtered.map(({ item, originalIndex }) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border border-ivory-300 bg-ivory-50"
            >
              {item.type === 'video' ? (
                <VideoCard item={item} />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={267}
                  className="w-full object-cover"
                  style={{ aspectRatio: '3/2' }}
                />
              )}

              {captions[originalIndex] && (
                <div className="px-3 py-2">
                  <p className="text-xs text-charcoal-300 leading-relaxed">
                    {captions[originalIndex]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
