'use client';
import { LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default);

/**
 * - LazyMotion + `m.*` components keep Framer Motion's feature bundle out of
 *   the initial JS; `strict` makes accidental `motion.*` usage throw in dev.
 * - reducedMotion="user" honours the OS "reduce motion" setting: transform
 *   and layout animations are skipped for those users.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
