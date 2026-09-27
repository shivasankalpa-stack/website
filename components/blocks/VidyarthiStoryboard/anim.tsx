/**
 * Small SMIL animation helpers shared by the storyboard artwork.
 *
 * SMIL (<animate>, <animateTransform>) is used rather than CSS because
 * rotations must pivot around exact joints (shoulder, elbow, neck) in the
 * figure's own coordinate space. Every helper renders nothing when motion
 * is switched off (prefers-reduced-motion), leaving a still illustration.
 */

'use client';

import { createContext, useContext, type ReactNode } from 'react';

export const MotionContext = createContext(true);
export const useMotion = () => useContext(MotionContext);

export interface AnimTiming {
  dur: string;
  begin?: string;
  keyTimes?: string;
  calcMode?: 'linear' | 'spline' | 'discrete' | 'paced';
  keySplines?: string;
}

function timing({ dur, begin = '0s', keyTimes, calcMode, keySplines }: AnimTiming) {
  return {
    dur,
    begin,
    repeatCount: 'indefinite' as const,
    ...(keyTimes ? { keyTimes } : {}),
    ...(calcMode ? { calcMode } : {}),
    ...(keySplines ? { keySplines } : {}),
  };
}

type WithValues = AnimTiming & { values: string };

/** Rotation that is *added* to the element's own transform. */
export function Rotate(p: WithValues) {
  const motion = useMotion();
  if (!motion) return null;
  return <animateTransform attributeName="transform" type="rotate" additive="sum" values={p.values} {...timing(p)} />;
}

/** Rotation that *replaces* the element's transform (for joints whose only transform is a rotation). */
export function RotateAbs(p: WithValues) {
  const motion = useMotion();
  if (!motion) return null;
  return <animateTransform attributeName="transform" type="rotate" values={p.values} {...timing(p)} />;
}

export function Translate(p: WithValues) {
  const motion = useMotion();
  if (!motion) return null;
  return <animateTransform attributeName="transform" type="translate" additive="sum" values={p.values} {...timing(p)} />;
}

export function Scale(p: WithValues) {
  const motion = useMotion();
  if (!motion) return null;
  return <animateTransform attributeName="transform" type="scale" additive="sum" values={p.values} {...timing(p)} />;
}

export function Anim(p: WithValues & { attr: string }) {
  const motion = useMotion();
  if (!motion) return null;
  return <animate attributeName={p.attr} values={p.values} {...timing(p)} />;
}

export function Motion({ path, dur, begin = '0s' }: { path: string; dur: string; begin?: string }) {
  const motion = useMotion();
  if (!motion) return null;
  return <animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" />;
}

/** Places (and optionally scales / mirrors) its children. */
export function At({
  x,
  y,
  s = 1,
  flip = false,
  children,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  children: ReactNode;
}) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>{children}</g>;
}

/** Soft blurred contact shadow under a figure or object. */
export function Shadow({ rx, ry = rx * 0.18, x = 0, y = 0, o = 0.28 }: { rx: number; ry?: number; x?: number; y?: number; o?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#1C140C" opacity={o} filter="url(#vd-soft)" />;
}
