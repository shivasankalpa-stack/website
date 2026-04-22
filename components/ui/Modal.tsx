/**
 * Modal — overlay dialog used for donation payment details,
 * image lightboxes, and confirmations.
 *
 * Traps focus, closes on Escape, closes on backdrop click.
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-500/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg rounded-lg border border-ivory-300 bg-ivory-50 p-6 shadow-xl focus:outline-none"
      >
        {/* Header */}
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

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
