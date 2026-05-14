/**
 * BrandIcons — inline SVG icons for third-party brands not covered by Lucide.
 *
 * Lucide intentionally omits commercial/brand glyphs. These small wrappers
 * provide the WhatsApp and YouTube marks with a Lucide-like API (size + className)
 * so they sit naturally next to other icons in the layout.
 */

import type { SVGProps } from 'react';

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function WhatsAppIcon({ size = 16, className, ...rest }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M19.05 4.91A10.05 10.05 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.27-1.38a9.9 9.9 0 0 0 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zM12.05 20.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.13.82.83-3.05-.2-.31a8.22 8.22 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.06 0 1.21.88 2.38 1.01 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

export function YouTubeIcon({ size = 16, className, ...rest }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.55 3.55 12 3.55 12 3.55s-7.55 0-9.4.52A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.85.52 9.4.52 9.4.52s7.55 0 9.4-.52a3 3 0 0 0 2.1-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.57V8.43L15.82 12z" />
    </svg>
  );
}
