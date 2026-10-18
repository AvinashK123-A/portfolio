'use client';
import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  /** Shown on a gradient if the image cannot be loaded. */
  initials: string;
}

export default function Avatar({ src, alt, initials }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex items-center justify-center bg-linear-to-br/srgb from-primary-600 to-accent-600 text-6xl font-bold text-white"
      >
        {initials}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={320}
      height={384}
      sizes="(min-width: 1024px) 320px, 288px"
      // GitHub already serves a sized avatar; skipping the optimizer keeps the
      // site fully static and avoids a server-side fetch to github.com.
      unoptimized
      loading="eager"
      fetchPriority="high"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
  );
}
