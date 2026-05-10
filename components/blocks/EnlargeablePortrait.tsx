/**
 * EnlargeablePortrait — circular avatar that opens an uncropped lightbox of
 * the same image when clicked. Used on Gurukula detail pages for founders
 * and adhyāpakas so visitors can see the full portrait without the round
 * crop trimming heads or bodies.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';

interface EnlargeablePortraitProps {
  src: string;
  alt: string;
  /** Modal title — usually the person's localised name. */
  title?: string;
  /** Tailwind classes that size the avatar (must include both height & width). */
  sizeClass?: string;
  /** Optional CSS `object-position` for the avatar crop (e.g. `'top'`). */
  imagePosition?: string;
}

export function EnlargeablePortrait({
  src,
  alt,
  title,
  sizeClass = 'h-20 w-20',
  imagePosition = 'center top',
}: EnlargeablePortraitProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — click to enlarge`}
        aria-haspopup="dialog"
        className={`shrink-0 cursor-zoom-in rounded-full overflow-hidden border border-ivory-300 transition-transform hover:scale-[1.04] hover:border-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${sizeClass}`}
      >
        <Image
          src={src}
          alt={alt}
          width={160}
          height={160}
          className="h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title ?? alt}
        size="xl"
      >
        <div className="flex justify-center">
          <Image
            src={src}
            alt={alt}
            width={1024}
            height={1024}
            className="h-auto w-auto max-h-[75vh] max-w-full rounded-md object-contain"
          />
        </div>
      </Modal>
    </>
  );
}
