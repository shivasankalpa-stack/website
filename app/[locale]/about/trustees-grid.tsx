/**
 * TrusteeGrid — client component with expandable trustee cards.
 * Click a trustee to see enlarged photo and full bio in a modal.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import type { Trustee } from '@/lib/types';

const TRUSTEES_WITH_PHOTOS = ['anantanarayana sharma', 'sheshadri'];

function hasPhoto(name: string): boolean {
  return TRUSTEES_WITH_PHOTOS.some((n) => name.toLowerCase().includes(n));
}

function cleanBio(bio: string): string {
  return bio.replace(/#BIO-TODO-\S+/g, '').trim();
}

export function TrusteeGrid({ trustees }: { trustees: Trustee[] }) {
  const [selected, setSelected] = useState<Trustee | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trustees.map((trustee) => (
          <button
            key={trustee.name}
            onClick={() => setSelected(trustee)}
            className="text-left w-full cursor-pointer group"
            aria-haspopup="dialog"
          >
            <Card hover className="text-center space-y-3 h-full">
              <div className="mx-auto w-28 h-28 rounded-full overflow-hidden border-2 border-ivory-300 group-hover:border-indigo-100 transition-colors">
                {hasPhoto(trustee.name) ? (
                  <Image
                    src={trustee.image}
                    alt={trustee.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PlaceholderImage
                    todoId={`IMG-TODO-${trustee.name.toLowerCase().replace(/[\s.]+/g, '-')}`}
                    aspectRatio="1/1"
                    className="!rounded-full"
                  />
                )}
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-indigo">
                  {trustee.name}
                </h3>
                <p className="text-sm text-kumkuma font-medium">{trustee.role}</p>
              </div>
              <p className="text-xs text-charcoal-200 italic">Click to read more</p>
            </Card>
          </button>
        ))}
      </div>

      {/* Expanded trustee modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-ivory-300 shrink-0">
                {hasPhoto(selected.name) ? (
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PlaceholderImage
                    todoId={`IMG-TODO-${selected.name.toLowerCase().replace(/[\s.]+/g, '-')}`}
                    aspectRatio="1/1"
                    className="!rounded-full"
                  />
                )}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-serif text-xl font-semibold text-indigo">
                  {selected.name}
                </h3>
                <p className="text-kumkuma font-medium">{selected.role}</p>
              </div>
            </div>
            <p className="text-charcoal-300 leading-relaxed">
              {cleanBio(selected.bio)}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
