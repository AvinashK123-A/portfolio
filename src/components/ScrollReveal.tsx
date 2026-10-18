'use client';
import { useEffect } from 'react';

const REVEALED = 'data-revealed';

function revealTarget(target: Element) {
  const elements = target.hasAttribute('data-reveal-group')
    ? target.querySelectorAll('[data-reveal]')
    : [target];
  elements.forEach((el) => el.setAttribute(REVEALED, ''));
}

/**
 * Starts the entrance animations declared with `reveal()` (see reveal.ts) as
 * their elements scroll into view. One IntersectionObserver for the whole page;
 * renders nothing.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const groups = Array.from(document.querySelectorAll('[data-reveal-group]'));
    const singles = Array.from(document.querySelectorAll('[data-reveal]')).filter(
      (el) => !el.closest('[data-reveal-group]'),
    );
    const targets = [...groups, ...singles];

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach(revealTarget);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          revealTarget(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Start a little after the element's top edge enters the viewport.
      { rootMargin: '0px 0px -80px 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
