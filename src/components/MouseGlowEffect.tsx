'use client';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { createSpring2D } from '@/hooks/spring';

const OFFSCREEN = -400;
const toTransform = (x: number, y: number) =>
  `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

/** Soft glow that follows the mouse. Only for fine pointers and when motion is allowed. */
export default function MouseGlowEffect() {
  const enabled = useMediaQuery('(pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!enabled) return null;
  return <Glow />;
}

function Glow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Writes the transform straight to the DOM; React never re-renders while it moves.
    const spring = createSpring2D(
      (x, y) => {
        el.style.transform = toTransform(x, y);
      },
      { stiffness: 60, damping: 18 },
      { x: OFFSCREEN, y: OFFSCREEN },
    );
    const handleMouseMove = (e: MouseEvent) => spring.set(e.clientX, e.clientY);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      spring.stop();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        transform: toTransform(OFFSCREEN, OFFSCREEN),
        width: 500,
        height: 500,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(86,103,255,0.07) 0%, rgba(217,38,236,0.04) 40%, transparent 70%)',
        filter: 'blur(2px)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
