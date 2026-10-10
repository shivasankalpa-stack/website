/**
 * Stage — shows one pencil drawing per scene and brings it to life.
 *
 *   • Each new scene is sketched in over the previous one by a sweep of
 *     pencil strokes that grows outward from the scene's subject.
 *   • A slow camera move (pan / push-in) runs across the scene.
 *   • Living details (light, fire, water, text) are drawn on top.
 *
 * At most two drawings are on screen at once (the outgoing and the
 * incoming one), and the next scene's drawing is preloaded.
 */

'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { StoryScene } from '@/data/vidyarthi-storyboard';
import { MotionContext } from './anim';
import { ART, ART_H, ART_W, artSrc, type Shot } from './art';
import { FxDefs } from './fx';

const FIRST_REVEAL_MS = 3200;
const REVEAL_MS = 1700;

function frame({ x, y, z }: Shot) {
  let tx = 0.5 - (x / ART_W) * z;
  let ty = 0.5 - (y / ART_H) * z;
  tx = Math.min(0, Math.max(1 - z, tx));
  ty = Math.min(0, Math.max(1 - z, ty));
  return `translate(${(tx * 100).toFixed(3)}%, ${(ty * 100).toFixed(3)}%) scale(${z})`;
}

/** Zig-zag pencil strokes covering the drawing, ordered outward from a focus point. */
function buildStrokes(focus: Shot) {
  const rows: { d: string; dist: number }[] = [];
  for (let y = -20; y < ART_H + 40; y += 36) {
    for (let x0 = -40; x0 < ART_W; x0 += 180) {
      const pts: string[] = [];
      for (let k = 0; k <= 8; k++) {
        const px = x0 + k * 25;
        const py = y + (k % 2 ? 19 : -19) + Math.sin(k * 1.7 + y * 0.05) * 4;
        pts.push(`${px.toFixed(0)} ${py.toFixed(0)}`);
      }
      const cx = x0 + 100;
      rows.push({ d: `M${pts.join(' L')}`, dist: Math.hypot(cx - focus.x, (y - focus.y) * 1.5) });
    }
  }
  return rows.sort((a, b) => a.dist - b.dist).map((r) => r.d);
}

interface LayerProps {
  scene: StoryScene;
  durationMs: number;
  running: boolean;
  motion: boolean;
  revealMs: number | null;
  onRevealed?: () => void;
}

function Layer({ scene, durationMs, running, motion, revealMs: revealProp, onRevealed }: LayerProps) {
  const art = ART[scene.id];
  // Fixed at mount: a layer that becomes the outgoing one keeps its timing.
  const [revealMs] = useState(revealProp);
  const camRef = useRef<HTMLDivElement>(null);
  const strokesRef = useRef<SVGGElement>(null);
  const camAnim = useRef<Animation | null>(null);
  const maskId = `vd-mask-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const strokes = useMemo(() => buildStrokes(art.to), [art]);
  const needsReveal = motion && revealMs !== null;
  const [revealed, setRevealed] = useState(!needsReveal);

  /* camera move across the scene */
  useEffect(() => {
    const el = camRef.current;
    if (!el) return;
    if (!motion) {
      el.style.transform = frame(art.from);
      return;
    }
    const a = el.animate([{ transform: frame(art.from) }, { transform: frame(art.to) }], {
      duration: durationMs + (revealMs ?? 0),
      easing: 'cubic-bezier(.42,.05,.4,1)',
      fill: 'forwards',
    });
    camAnim.current = a;
    return () => a.cancel();
  }, [art, durationMs, motion, revealMs]);

  useEffect(() => {
    const a = camAnim.current;
    if (!a) return;
    if (running) a.play();
    else a.pause();
  }, [running]);

  /* pencil-stroke reveal */
  useEffect(() => {
    const g = strokesRef.current;
    if (!g || !needsReveal || revealMs === null) return;
    const paths = Array.from(g.querySelectorAll('path'));
    const strokeMs = 360;
    const anims = paths.map((p, k) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      return p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration: strokeMs,
        delay: (k / paths.length) * (revealMs - strokeMs),
        fill: 'forwards',
        easing: 'ease-out',
      });
    });
    const last = anims[anims.length - 1];
    if (last) {
      last.onfinish = () => {
        setRevealed(true);
        onRevealed?.();
      };
    }
    return () => anims.forEach((a) => a.cancel());
  }, [needsReveal, revealMs, onRevealed]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={camRef} className="absolute inset-0 origin-top-left will-change-transform" style={{ transform: frame(art.from) }}>
        <svg viewBox={`0 0 ${ART_W} ${ART_H}`} className="block h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <FxDefs />
          {!revealed && (
            <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={ART_W} height={ART_H}>
              <rect width={ART_W} height={ART_H} fill="black" />
              <g ref={strokesRef} fill="none" stroke="white" strokeWidth={46} strokeLinecap="round" strokeLinejoin="round">
                {strokes.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            </mask>
          )}
          <g mask={revealed ? undefined : `url(#${maskId})`}>
            <rect width={ART_W} height={ART_H} fill="#F4EFE3" />
            <image href={artSrc(art.code)} width={ART_W} height={ART_H} preserveAspectRatio="xMidYMid slice" />
            {art.overlay}
          </g>
        </svg>
      </div>
    </div>
  );
}

interface StageProps {
  scenes: StoryScene[];
  index: number;
  motion: boolean;
  running: boolean;
  durationFor: (s: StoryScene) => number;
}

export function Stage({ scenes, index, motion, running, durationFor }: StageProps) {
  const [cur, setCur] = useState(index);
  const [prev, setPrev] = useState<number | null>(null);
  const [gen, setGen] = useState(0);
  const [first, setFirst] = useState(true);

  // A new scene: keep the outgoing one underneath until the new one is drawn in.
  if (index !== cur) {
    setPrev(cur);
    setCur(index);
    setGen((g) => g + 1);
    setFirst(false);
  }

  const clearPrev = useCallback(() => setPrev(null), []);

  /* preload the next drawing */
  useEffect(() => {
    const next = scenes[(index + 1) % scenes.length];
    const art = next && ART[next.id];
    if (!art) return;
    const img = new Image();
    img.src = artSrc(art.code);
  }, [index, scenes]);

  return (
    <MotionContext.Provider value={motion}>
      <div className="absolute inset-0 bg-[#F4EFE3]">
        {prev !== null && scenes[prev] && (
          <Layer key={`L${gen - 1}`} scene={scenes[prev]} durationMs={durationFor(scenes[prev])} running={running} motion={motion} revealMs={null} />
        )}
        <Layer
          key={`L${gen}`}
          scene={scenes[cur]}
          durationMs={durationFor(scenes[cur])}
          running={running}
          motion={motion}
          revealMs={first ? FIRST_REVEAL_MS : REVEAL_MS}
          onRevealed={clearPrev}
        />
      </div>
    </MotionContext.Provider>
  );
}
