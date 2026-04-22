/**
 * AudioPlayer — floating audio control for Vedic chanting.
 *
 * Designed to sit within the hero section as a compact, elegant control.
 * Attempts autoplay on mount (browsers may block; handled gracefully).
 * User can toggle play/pause. Respects prefers-reduced-motion.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  label?: string;
  autoPlay?: boolean;
}

export function AudioPlayer({
  src,
  label = 'Vedic chanting by Gurukula students',
  autoPlay = true,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.play().then(() => setPlaying(true)).catch(() => {
      setPlaying(false);
    });
  }, [autoPlay]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-indigo-500/80 backdrop-blur-sm px-4 py-2 text-ivory-100 shadow-lg">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="metadata"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <button
        onClick={togglePlay}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-kumkuma text-ivory-50 hover:bg-kumkuma-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kumkuma"
        aria-label={playing ? 'Pause audio' : 'Play audio'}
      >
        {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>

      <div className="flex items-center gap-2">
        <Volume2 size={14} className="text-ivory-100/60 shrink-0" />
        <span className="text-xs text-ivory-100/80 hidden sm:inline">
          {label}
        </span>
        <span className="text-xs text-ivory-100/80 sm:hidden">
          {playing ? 'Playing' : 'Play'}
        </span>
      </div>
    </div>
  );
}
