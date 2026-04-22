/**
 * PlaceholderImage — dignified fallback when an image is not yet available.
 *
 * Renders an ivory box with a subtle Devanagari ॐ in muted indigo,
 * plus a caption with the TODO tag for the PLACEHOLDERS.md checklist.
 * Never shows a broken image icon.
 */

interface PlaceholderImageProps {
  todoId: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
}

export function PlaceholderImage({
  todoId,
  caption,
  aspectRatio = '16/9',
  className = '',
}: PlaceholderImageProps) {
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        rounded-lg border border-dashed border-ivory-400 bg-ivory-100
        overflow-hidden
        ${className}
      `}
      style={{ aspectRatio }}
      role="img"
      aria-label={caption || `Placeholder image — ${todoId}`}
    >
      {/* Decorative Om */}
      <span
        className="shloka-devanagari text-6xl text-indigo-100 select-none"
        aria-hidden="true"
      >
        ॐ
      </span>

      {/* Caption */}
      <p className="mt-2 text-xs text-charcoal-200 text-center px-4">
        {caption || 'Image coming soon'}
      </p>
      <p className="text-[10px] text-charcoal-200/60 mt-1 font-mono">
        #{todoId}
      </p>
    </div>
  );
}
