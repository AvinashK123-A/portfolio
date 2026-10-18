import { Calendar, MapPin } from 'lucide-react';
import { experience, profile, type Experience } from '@/data/portfolio';
import TimelineProgress from '@/components/TimelineProgress';
import { reveal, revealGroup } from '@/components/reveal';

const ACCENTS = ['#7b96ff', '#ec5ef8'] as const;

function TimelineCard({ entry, index }: { entry: Experience; index: number }) {
  const isLeft = index % 2 === 0;
  const color = ACCENTS[index % ACCENTS.length];

  return (
    <li
      className={`relative flex items-start mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-5" aria-hidden="true">
        <div
          {...reveal(
            'pop',
            { delay: 0.2 + index * 0.12, duration: 0.5 },
            {
              borderColor: color,
              background: '#0a0b14',
              boxShadow: `0 0 0 4px ${color}30, 0 0 15px ${color}50`,
            },
          )}
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
        >
          {entry.current && (
            <div
              className="w-2 h-2 rounded-full animate-pulse-dot motion-reduce:animate-none"
              style={{ background: color }}
            />
          )}
        </div>
      </div>

      {/* Card */}
      <article
        className={`w-full md:w-[45%] ml-14 md:ml-0 ${isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'} transition-transform duration-300 motion-safe:hover:-translate-y-[5px]`}
        {...reveal(isLeft ? 'left' : 'right', { delay: 0.15 + index * 0.12 })}
      >
        <div
          className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 group"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{entry.title}</h3>
              <p className="font-semibold" style={{ color }}>
                {entry.company}
              </p>
              <p className="text-white/60 text-xs mt-0.5">{entry.fullCompany}</p>
            </div>
            {entry.current && (
              <span className="shrink-0 text-xs px-3 py-1 rounded-full bg-green-400/15 text-green-400 border border-green-400/30 whitespace-nowrap">
                Current
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-xs text-white/70 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              {entry.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {entry.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-white/75 text-sm leading-relaxed mb-4">{entry.description}</p>

          {/* Tags */}
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md border"
                style={{
                  background: `${color}12`,
                  borderColor: `${color}30`,
                  color,
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-padding relative bg-[#0a0a0a] overflow-hidden"
      {...revealGroup}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-20" {...reveal('up')}>
          <p
            className="text-primary-300 text-sm font-mono tracking-widest uppercase mb-3"
            aria-hidden="true"
          >
            {'// career journey'}
          </p>
          <h2 id="experience-heading" className="section-title gradient-text">
            Career Journey
          </h2>
          <p className="section-subtitle">
            {profile.yearsOfExperience}+ years building, shipping and leading Flutter applications
            at enterprise scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2"
            aria-hidden="true"
          />
          {/* Scroll-linked progress line */}
          <TimelineProgress
            className="absolute left-6 md:left-1/2 top-0 w-px -translate-x-1/2 origin-top"
            style={{ background: 'linear-gradient(180deg, #5667ff, #d926ec, #5667ff)' }}
          />

          <ol className="relative">
            {experience.map((entry, index) => (
              <TimelineCard key={entry.id} entry={entry} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
