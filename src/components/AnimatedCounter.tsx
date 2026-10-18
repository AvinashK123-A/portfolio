'use client';
import { useEffect, useRef } from 'react';

const DURATION_MS = 1800;

/**
 * Counts up to `value` once it scrolls into view. Server-rendered with the final
 * value, so crawlers, no-JS and reduced-motion visitors see the real number.
 */
export default function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const count = () => {
      // Writes straight to the DOM each frame instead of re-rendering React ~100 times.
      let start = 0;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${progress < 1 ? Math.floor(eased * value) : value}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      el.textContent = `0${suffix}`;
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      count();
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return (
    <>
      {/* Screen readers get the final value straight away. */}
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true">
        {value}
        {suffix}
      </span>
    </>
  );
}
