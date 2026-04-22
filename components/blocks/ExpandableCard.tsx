/**
 * ExpandableCard — card that expands into a modal on click.
 *
 * Used for trustees, adhyapakas, and trust artefacts where the
 * list view is compact but a click reveals fuller detail.
 */

'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';

interface ExpandableCardProps {
  trigger: React.ReactNode;
  modalTitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableCard({
  trigger,
  modalTitle,
  children,
  className = '',
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`text-left w-full cursor-pointer ${className}`}
        aria-haspopup="dialog"
      >
        <Card hover className="h-full transition-shadow">
          {trigger}
        </Card>
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={modalTitle}>
        {children}
      </Modal>
    </>
  );
}
