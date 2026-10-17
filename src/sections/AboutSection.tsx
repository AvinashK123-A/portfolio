'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { m, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { profile, stats } from '@/data/portfolio';
import ExternalLink from '@/components/ExternalLink';
import { DownloadIcon } from '@/components/icons';

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !isInView || reduceMotion) return;
    // Write straight to the DOM each frame instead of re-rendering React ~100 times.
    let start = 0;
    let frame = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${progress < 1 ? Math.floor(eased * value) : value}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    el.textContent = `0${suffix}`;
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion, value, suffix]);

  return (
    <>
      {/* Screen readers get the final value straight away. */}
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      {/* Server-rendered with the final value so no-JS visitors and crawlers see real numbers. */}
      <span ref={ref} aria-hidden="true">
        {value}
        {suffix}
      </span>
    </>
  );
}

/** Rotating role title. Isolated so its 2.5 s state updates re-render only this component. */
function RoleSwitcher() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const activeRole = reduceMotion ? 0 : roleIndex;

  return (
    <>
      {/* Static list for assistive tech; the animated switcher is decorative. */}
      <p className="sr-only">{profile.roles.join(', ')}</p>
      <div className="h-9 overflow-hidden relative" aria-hidden="true">
        {profile.roles.map((role, i) => (
          <m.p
            key={role}
            className="text-xl font-semibold text-accent-300 absolute"
            initial={false}
            animate={{
              opacity: i === activeRole ? 1 : 0,
              y: i === activeRole ? 0 : -24,
            }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {role}
          </m.p>
        ))}
      </div>
    </>
  );
}

function Avatar() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={profile.avatarAlt}
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-600 to-accent-600 text-6xl font-bold text-white"
      >
        {profile.initials}
      </div>
    );
  }
  return (
    <Image
      src={profile.avatarUrl}
      alt={profile.avatarAlt}
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

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) * 0.08);
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) * 0.08);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // The hero is above the fold, so it is visible on first paint (opacity 1);
  // only a small slide-in transform is animated.
  const enter = (delay: number) => ({
    initial: { y: 16 },
    animate: { y: 0 },
    transition: { delay, duration: 0.5, ease: 'easeOut' as const },
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding relative bg-dark-950 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/6 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT: Profile Image */}
          <m.div
            className="flex justify-center lg:justify-end"
            {...enter(0)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <m.div style={{ x: springX, y: springY }}>
              {/* Idle float and glow are CSS animations (compositor-only, no JS per frame);
                  motion-reduce:animate-none turns them off for reduced-motion users. */}
              <div className="relative group animate-hero-float motion-reduce:animate-none">
                {/* Outer glow ring: a blue shadow with a pink one cross-fading on top */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    boxShadow: '0 0 30px rgba(86,103,255,0.3), 0 0 60px rgba(86,103,255,0.15)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-3xl opacity-0 animate-glow-fade motion-reduce:animate-none"
                  style={{
                    boxShadow: '0 0 50px rgba(217,38,236,0.4), 0 0 80px rgba(217,38,236,0.2)',
                  }}
                />
                {/* Glassmorphism border frame */}
                <div
                  className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl p-[2px] overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(86,103,255,0.6) 0%, rgba(217,38,236,0.4) 50%, rgba(86,103,255,0.3) 100%)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                >
                  <div className="w-full h-full rounded-3xl overflow-hidden backdrop-blur-sm bg-dark-950/30">
                    <Avatar />
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl border border-green-400/30">
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className="w-2 h-2 bg-green-400 rounded-full animate-pulse motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    <span className="text-green-400 font-medium">Available</span>
                  </div>
                </div>
                {/* Experience badge */}
                <div className="absolute -top-4 -left-4 glass-card px-4 py-2 rounded-xl border border-primary-500/30">
                  <div className="text-center">
                    <div className="text-primary-300 font-bold text-lg leading-none">
                      {profile.yearsOfExperience}+
                    </div>
                    <div className="text-white/70 text-xs">Years</div>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>

          {/* RIGHT: Content */}
          <div className="space-y-7">
            {/* Tag */}
            <m.p
              {...enter(0.05)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10"
            >
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" aria-hidden="true" />
              <span className="text-primary-200 text-sm font-mono tracking-widest uppercase">
                About Me
              </span>
            </m.p>

            {/* Name */}
            <m.div {...enter(0.1)}>
              <h1
                id="about-heading"
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
              >
                {profile.name}
                <br />
                <span className="gradient-text">
                  {profile.fullName.replace(profile.name, '').trim()}
                </span>
              </h1>
              <RoleSwitcher />
            </m.div>

            {/* Description */}
            <m.p className="text-white/80 text-base leading-relaxed" {...enter(0.15)}>
              {profile.summary}
            </m.p>

            {/* Stats Grid */}
            <m.ul className="grid grid-cols-2 gap-3" {...enter(0.2)}>
              {stats.map((stat) => (
                <m.li
                  key={stat.label}
                  className="glass-card p-4 rounded-xl border border-white/10 hover:border-primary-500/40 transition-all duration-300 group"
                  whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(86,103,255,0.2)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {stat.icon}
                    </span>
                    <div>
                      <div className="text-2xl font-bold text-primary-300 leading-none">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                </m.li>
              ))}
            </m.ul>

            {/* CTA Buttons */}
            <m.div className="flex flex-wrap gap-3 pt-2" {...enter(0.25)}>
              <ExternalLink href={profile.github} className="btn-outline text-sm px-6 py-2.5">
                GitHub Profile
              </ExternalLink>
              <ExternalLink href={profile.linkedin} className="btn-outline text-sm px-6 py-2.5">
                LinkedIn
              </ExternalLink>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  download
                  className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download Resume
                </a>
              )}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
