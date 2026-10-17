/**
 * YouTubeEmbed — click-to-load YouTube player.
 *
 * Shows the video's thumbnail with a play button; the YouTube iframe (and
 * its ~1 MB of player script) is only loaded once the visitor clicks. Uses
 * the privacy-enhanced `youtube-nocookie.com` domain.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { youTubeThumbnail } from '@/lib/youtube';

interface YouTubeEmbedProps {
  videoId: string;
  /** Accessible title for the player and play button. */
  title: string;
  /** CSS aspect-ratio of the frame. Defaults to 16 / 9. */
  aspectRatio?: string;
  className?: string;
  /** Pass for above-the-fold or featured videos. */
  priority?: boolean;
}

export function YouTubeEmbed({
  videoId,
  title,
  aspectRatio = '16 / 9',
  className = '',
  priority = false,
}: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-charcoal-500 ${className}`}
      style={{ aspectRatio }}
    >
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={youTubeThumbnail(videoId)}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
            // Served straight from YouTube's CDN; no need to re-optimise.
            unoptimized
            priority={priority}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-charcoal-500/30 transition-colors group-hover:bg-charcoal-500/50">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ivory/90 text-kumkuma shadow-lg transition-transform group-hover:scale-110">
              <Play size={28} className="ml-1" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
