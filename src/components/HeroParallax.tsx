'use client';
import { useEffect, useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { createSpring2D, type Spring2D } from '@/hooks/spring';

interface HeroParallaxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Fraction of the pointer's distance from the centre that the content moves. */
  strength?: number;
}

/** Moves its content gently towards the mouse pointer (skipped when motion is reduced). */
export default function HeroParallax({
  children,
  className,
  style,
  strength = 0.08,
}: HeroParallaxProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<Spring2D | null>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const spring = createSpring2D(
      (x, y) => {
        el.style.transform = x === 0 && y === 0 ? 'none' : `translate3d(${x}px, ${y}px, 0)`;
      },
      { stiffness: 80, damping: 20 },
    );
    springRef.current = spring;
    return () => {
      spring.stop();
      springRef.current = null;
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    springRef.current?.set(
      (e.clientX - (rect.left + rect.width / 2)) * strength,
      (e.clientY - (rect.top + rect.height / 2)) * strength,
    );
  };

  return (
    <div
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => springRef.current?.set(0, 0)}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
