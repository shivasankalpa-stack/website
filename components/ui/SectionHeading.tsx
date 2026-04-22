/**
 * SectionHeading — consistent heading treatment for page sections.
 *
 * Optionally renders a Devanagari line above the English title
 * (used for sections that reference a Vedic concept) and a
 * subtitle below.
 */

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  devanagari?: string;
  centered?: boolean;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  title,
  subtitle,
  devanagari,
  centered = false,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const alignment = centered ? 'text-center' : 'text-left';

  return (
    <div className={`space-y-2 ${alignment}`}>
      {devanagari && (
        <p className="shloka-devanagari text-lg text-indigo-300 tracking-wide">
          {devanagari}
        </p>
      )}
      <Tag className="font-serif text-3xl font-semibold text-indigo tracking-tight md:text-4xl">
        {title}
      </Tag>
      {subtitle && (
        <p className="max-w-2xl text-base text-charcoal-300 leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
