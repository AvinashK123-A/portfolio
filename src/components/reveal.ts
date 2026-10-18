import type { CSSProperties } from 'react';

/**
 * Scroll-triggered entrance animations without an animation library.
 *
 * Server components mark elements with `{...reveal('up')}`; the client-side
 * <ScrollReveal> sets `data-revealed` once an element (or its
 * `data-reveal-group` ancestor) scrolls into view, and CSS in globals.css
 * plays the matching keyframes. Until then the element is hidden (or, for
 * 'bar', has zero width); a <noscript> rule in the layout shows everything
 * when JavaScript is off.
 */
export type RevealVariant = 'up' | 'left' | 'right' | 'pop' | 'scale' | 'bar';

export interface RevealOptions {
  /** Seconds before the animation starts, counted from the reveal. */
  delay?: number;
  /** Seconds the animation runs (CSS default: 0.6). */
  duration?: number;
}

export function reveal(
  variant: RevealVariant,
  { delay, duration }: RevealOptions = {},
  style: CSSProperties = {},
): { 'data-reveal': RevealVariant; style: CSSProperties } {
  const vars: Record<string, string> = {};
  if (delay) vars['--reveal-delay'] = `${delay}s`;
  if (duration) vars['--reveal-duration'] = `${duration}s`;
  return { 'data-reveal': variant, style: { ...style, ...vars } };
}

/** Marks a container whose `data-reveal` descendants all reveal together. */
export const revealGroup = { 'data-reveal-group': '' } as const;
