/**
 * Modal — overlay dialog used for donation payment details,
 * image lightboxes, and confirmations.
 *
 * Traps focus, closes on Escape, closes on backdrop click.
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Tailwind max-width of the dialog. Defaults to `'max-w-lg'`. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const SIZE_TO_MAX_W: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-xl',
  xl: 'max-w-2xl',
  '2xl': 'max-w-3xl',
  '3xl': 'max-w-4xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client. Defer rendering until mount
  // so SSR output stays empty and we avoid ancestor `transform` containing
  // blocks that would otherwise capture our `position: fixed` overlay.
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      dialogRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !mounted) return null;

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-charcoal-500/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative z-10 w-full ${SIZE_TO_MAX_W[size]} max-h-[90vh] overflow-y-auto rounded-lg border border-ivory-300 bg-ivory-50 p-6 shadow-xl focus:outline-none`}
      >
        <div className="mb-4 flex items-start justify-between">
          {title && (
            <h2 className="font-serif text-xl text-indigo">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto rounded-md p-1.5 text-charcoal-300 transition-colors hover:bg-ivory-300 hover:text-charcoal"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
