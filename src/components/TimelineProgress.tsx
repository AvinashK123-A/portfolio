'use client';
import { useEffect, useRef, type CSSProperties } from 'react';

/**
 * Scroll-linked progress line for the experience timeline. Its height goes from
 * 0% when the enclosing <section> enters the bottom of the viewport to 100% at
 * 90% of the way until the section leaves through the top.
 */
export default function TimelineProgress({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest('section');
    if (!el || !section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport - rect.top) / (rect.height + viewport);
      const height = Math.min(Math.max(progress / 0.9, 0), 1);
      el.style.height = `${height * 100}%`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={className} style={{ ...style, height: '0%' }} />
  );
}
