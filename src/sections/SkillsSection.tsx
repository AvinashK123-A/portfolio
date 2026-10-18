import type { CSSProperties } from 'react';
import { profile, skillCategories, tools, type Skill } from '@/data/portfolio';
import { reveal, revealGroup } from '@/components/reveal';

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const { name, level, color } = skill;
  return (
    <li className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-white/85">{name}</span>
        <span className="text-xs text-white/60 font-mono">{level}%</span>
      </div>
      <div
        className="h-2 bg-white/5 rounded-full overflow-hidden"
        role="meter"
        aria-label={`${name} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
      >
        <div
          className="h-full rounded-full"
          {...reveal('bar', { delay: index * 0.05 + 0.2, duration: 1 }, {
            // The bar's width comes from --level (see the 'bar' reveal in globals.css).
            '--level': `${level}%`,
            background: color
              ? `linear-gradient(90deg, ${color}80, ${color})`
              : 'linear-gradient(90deg, #5667ff, #d926ec)',
          } as CSSProperties)}
        />
      </div>
    </li>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-padding relative"
      {...revealGroup}
    >
      <div className="container-custom relative z-10">
        <div {...reveal('up')} className="text-center mb-16">
          <p
            className="text-primary-300 text-sm font-mono tracking-widest uppercase mb-3"
            aria-hidden="true"
          >
            {'// skills'}
          </p>
          <h2 id="skills-heading" className="section-title gradient-text">
            Technical Expertise
          </h2>
          <p className="section-subtitle">
            {profile.yearsOfExperience}+ years of deep expertise across the Flutter &amp; mobile
            development ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((category, ci) => (
            <div
              key={category.id}
              {...reveal('up', { delay: ci * 0.1 })}
              className="glass-card p-6 space-y-4"
            >
              <h3 className="font-semibold text-white text-base">
                <span aria-hidden="true">{category.icon} </span>
                {category.label}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </ul>
            </div>
          ))}
          <div {...reveal('up', { delay: 0.5 })} className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-white text-base">
              <span aria-hidden="true">🛠️ </span>
              Tools &amp; Platforms
            </h3>
            <ul className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <li
                  key={tool}
                  {...reveal('scale', { delay: i * 0.03 + 0.5, duration: 0.3 })}
                  className="skill-badge motion-safe:hover:scale-105"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
