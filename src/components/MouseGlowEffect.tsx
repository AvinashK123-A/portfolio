'use client';
import { useEffect } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** Soft glow that follows the mouse. Only for fine pointers and when motion is allowed. */
export default function MouseGlowEffect() {
  const enabled = useMediaQuery('(pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!enabled) return null;
  return <Glow />;
}

function Glow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <m.div
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(86,103,255,0.07) 0%, rgba(217,38,236,0.04) 40%, transparent 70%)',
        filter: 'blur(2px)',
      }}
      aria-hidden="true"
    />
  );
}
