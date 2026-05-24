'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const raf = useRef<number>();
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsPointer(el ? window.getComputedStyle(el).cursor === 'pointer' : false);
    };
    const animate = () => {
      setPos(p => ({ x: p.x + (target.current.x - p.x) * 0.15, y: p.y + (target.current.y - p.y) * 0.15 }));
      raf.current = requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', () => setIsVisible(false));
    window.addEventListener('mouseenter', () => setIsVisible(true));
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current!); };
  }, []);
  return (
    <>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" animate={{ x: pos.x - 20, y: pos.y - 20, opacity: isVisible ? 1 : 0, scale: isPointer ? 1.5 : 1 }} transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}>
        <div className={`w-10 h-10 rounded-full border transition-all duration-300 ${isPointer ? 'border-accent-400/60 bg-accent-400/10' : 'border-primary-400/40'}`} />
      </motion.div>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" animate={{ x: pos.x - 3, y: pos.y - 3, opacity: isVisible ? 1 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
        <div className={`w-1.5 h-1.5 rounded-full ${isPointer ? 'bg-accent-400' : 'bg-primary-400'}`} />
      </motion.div>
    </>
  );
}
