import type { CSSProperties } from 'react';
import { profile, stats } from '@/data/portfolio';
import AnimatedCounter from '@/components/AnimatedCounter';
import Avatar from '@/components/Avatar';
import ExternalLink from '@/components/ExternalLink';
import HeroParallax from '@/components/HeroParallax';
import RoleSwitcher from '@/components/RoleSwitcher';
import { DownloadIcon } from '@/components/icons';

// The hero is above the fold, so it is visible on first paint (opacity 1); only a
// small CSS slide-in runs, without waiting for JavaScript.
const ENTER = 'animate-hero-enter';
const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

/** Combined hero and about section. A server component; only the small interactive parts hydrate. */
export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding relative bg-dark-950 overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT: Profile Image */}
          <HeroParallax className={`flex justify-center lg:justify-end ${ENTER}`}>
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
                <div className="w-full h-full rounded-3xl overflow-hidden backdrop-blur-xs bg-dark-950/30">
                  <Avatar
                    src={profile.avatarUrl}
                    alt={profile.avatarAlt}
                    initials={profile.initials}
                  />
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
          </HeroParallax>

          {/* RIGHT: Content */}
          <div className="space-y-7">
            {/* Tag */}
            <p
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 ${ENTER}`}
              style={delay(0.05)}
            >
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" aria-hidden="true" />
              <span className="text-primary-200 text-sm font-mono tracking-widest uppercase">
                About Me
              </span>
            </p>

            {/* Name */}
            <div className={ENTER} style={delay(0.1)}>
              <h1
                id="about-heading"
                className="text-4xl md:text-5xl font-bold text-white leading-tight md:leading-none mb-3"
              >
                {profile.name}
                <br />
                <span className="gradient-text">
                  {profile.fullName.replace(profile.name, '').trim()}
                </span>
              </h1>
              <RoleSwitcher roles={profile.roles} />
            </div>

            {/* Description */}
            <p className={`text-white/80 text-base leading-relaxed ${ENTER}`} style={delay(0.15)}>
              {profile.summary}
            </p>

            {/* Stats Grid */}
            <ul className={`grid grid-cols-2 gap-3 ${ENTER}`} style={delay(0.2)}>
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="glass-card p-4 rounded-xl border border-white/10 hover:border-primary-500/40 transition-all duration-300 group motion-safe:hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(86,103,255,0.2)]"
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
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-3 pt-2 ${ENTER}`} style={delay(0.25)}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
