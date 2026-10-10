'use client';

import { useRef, useEffect, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/** Classes applied only while a section is waiting to be revealed. */
const HIDDEN_CLASSES = ['opacity-0', 'translate-y-8'];

/**
 * Fades a section in as it scrolls into view.
 *
 * Content is VISIBLE by default (server HTML, no-JS, crawlers, link
 * previews, or if hydration fails). Only once this component has mounted —
 * i.e. JavaScript is definitely running — do we hide sections that are still
 * below the viewport, and an IntersectionObserver reveals them on scroll.
 * If anything goes wrong before that point, the page simply shows without
 * animation instead of going blank.
 *
 * The hidden classes are toggled directly on the DOM node (not via React
 * state), so there is no setState-in-effect and no hydration mismatch.
 */
export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Already on screen when the page started: leave it as-is (no flicker).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.classList.add(...HIDDEN_CLASSES);

    const reveal = () => {
      el.classList.remove(...HIDDEN_CLASSES);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      // Never leave a section stuck hidden (e.g. on fast refresh / unmount).
      el.classList.remove(...HIDDEN_CLASSES);
    };
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${className}`}>
      {children}
    </div>
  );
}
