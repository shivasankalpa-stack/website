/**
 * TrusteeGrid — client component with expandable team cards.
 * Click to open a larger portrait (no bios).
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import type { Trustee } from '@/lib/types';

function slugForPlaceholder(name: string): string {
  return name.toLowerCase().replace(/[\s.]+/g, '-');
}

interface TrusteeGridProps {
  trustees: Trustee[];
  roleMap?: Record<string, string>;
  /** Show role label on each card. Defaults to true. */
  showRole?: boolean;
}

export function TrusteeGrid({
  trustees,
  roleMap = {},
  showRole = true,
}: TrusteeGridProps) {
  const [selected, setSelected] = useState<Trustee | null>(null);

  return (
    <>
      <div className="mx-auto max-w-5xl grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center">
        {trustees.map((trustee) => (
          <button
            key={trustee.name}
            onClick={() => setSelected(trustee)}
            className="text-left w-full cursor-pointer group"
            aria-haspopup="dialog"
            aria-label={trustee.name}
          >
            <Card hover className="text-center space-y-2 h-full pt-4 pb-3 px-3">
              <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-ivory-300 group-hover:border-indigo-100 transition-colors">
                {trustee.image ? (
                  <Image
                    src={trustee.image}
                    alt={trustee.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: trustee.imagePosition ?? 'center' }}
                  />
                ) : (
                  <PlaceholderImage
                    todoId={`IMG-TODO-${slugForPlaceholder(trustee.name)}`}
                    aspectRatio="1/1"
                    className="!rounded-full"
                  />
                )}
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-indigo leading-snug">
                  {trustee.name}
                </h3>
                {showRole && (
                  <p className="text-xs text-kumkuma font-medium mt-0.5">
                    {roleMap[trustee.role] || trustee.role}
                  </p>
                )}
              </div>
            </Card>
          </button>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="w-56 h-56 rounded-full overflow-hidden border-2 border-ivory-300 shrink-0">
              {selected.image ? (
                <Image
                  src={selected.image}
                  alt={selected.name}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: selected.imagePosition ?? 'center' }}
                />
              ) : (
                <PlaceholderImage
                  todoId={`IMG-TODO-${slugForPlaceholder(selected.name)}`}
                  aspectRatio="1/1"
                  className="!rounded-full"
                />
              )}
            </div>
            {showRole && (
              <p className="text-kumkuma font-medium">
                {roleMap[selected.role] || selected.role}
              </p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
