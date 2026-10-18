'use client';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const INTERVAL_MS = 2500;

/** Rotating role title in the hero. The first role stays put when motion is reduced. */
export default function RoleSwitcher({ roles }: { roles: readonly string[] }) {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || roles.length < 2) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [reduceMotion, roles.length]);

  const activeRole = reduceMotion ? 0 : roleIndex;

  return (
    <>
      {/* Static list for assistive tech; the animated switcher is decorative. */}
      <p className="sr-only">{roles.join(', ')}</p>
      <div className="h-9 overflow-hidden relative" aria-hidden="true">
        {roles.map((role, i) => (
          <p
            key={role}
            className="text-xl font-semibold text-accent-300 absolute transition-[opacity,transform] duration-[450ms] ease-in-out"
            style={
              i === activeRole
                ? { opacity: 1, transform: 'none' }
                : { opacity: 0, transform: 'translateY(-24px)' }
            }
          >
            {role}
          </p>
        ))}
      </div>
    </>
  );
}
