/**
 * Card — content container used for Gurukula entries, donation purposes,
 * blog previews, and other boxed content throughout the site.
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'section';
}

export function Card({
  children,
  className = '',
  hover = false,
  as: Element = 'div',
}: CardProps) {
  return (
    <Element
      className={`
        rounded-lg border border-ivory-300 bg-ivory-50
        p-6 shadow-sm
        ${hover ? 'transition-shadow duration-200 hover:shadow-md hover:border-indigo-100' : ''}
        ${className}
      `}
    >
      {children}
    </Element>
  );
}
