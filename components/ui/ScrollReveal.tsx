'use client';

import {
  useRef,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Subscribe to `prefers-reduced-motion` via `useSyncExternalStore` so we
 * never call setState synchronously inside an effect (which the
 * `react-hooks/set-state-in-effect` lint rule forbids). When the user
 * prefers reduced motion we skip the IntersectionObserver entirely and
 * render in the visible state immediately.
 */
function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const shown = visible || reducedMotion;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}
