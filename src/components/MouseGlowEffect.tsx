'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseGlowEffect() {
    const glowRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-400);
    const mouseY = useMotionValue(-400);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
        <motion.div
                ref={glowRef}
                className="pointer-events-none fixed top-0 left-0 z-0"
                style={{
                          x: springX,
                          y: springY,
                          translateX: '-50%',
                          translateY: '-50%',
                          width: 500,
                          height: 500,
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(86,103,255,0.07) 0%, rgba(217,38,236,0.04) 40%, transparent 70%)',
                          filter: 'blur(2px)',
                }}
                aria-hidden="true"
              />
      );
}
