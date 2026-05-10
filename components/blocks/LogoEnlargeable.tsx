/**
 * LogoEnlargeable — circular trust logo that opens a larger view in a modal
 * when clicked. Used in the home and About hero sections where the logo is a
 * decorative focal point (Header/Footer keep their nav-link behaviour).
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';

interface LogoEnlargeableProps {
  /** Accessible label and modal title (defaults to the trust name). */
  label?: string;
  /** Tailwind classes that size the displayed logo, e.g. `'h-16 md:h-20'`. */
  sizeClass?: string;
  /**
   * Optional ring/backplate around the displayed logo. Defaults to no ring;
   * the logo crops to a circle which sits cleanly on any background.
   */
  ringClass?: string;
}

export function LogoEnlargeable({
  label = 'Sri Shivasankalpa Vṛnda logo',
  sizeClass = 'h-20 w-20 md:h-24 md:w-24',
  ringClass = '',
}: LogoEnlargeableProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${label} — click to enlarge`}
        aria-haspopup="dialog"
        className={`inline-block cursor-zoom-in rounded-full overflow-hidden transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${sizeClass} ${ringClass}`}
      >
        <Image
          src="/assets/og/logo.jpg"
          alt={label}
          width={256}
          height={256}
          priority
          className="h-full w-full object-cover"
        />
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={label}>
        <div className="flex justify-center">
          <Image
            src="/assets/og/logo.jpg"
            alt={label}
            width={1024}
            height={1024}
            className="h-auto w-full max-w-[80vh] rounded-full"
          />
        </div>
      </Modal>
    </>
  );
}
