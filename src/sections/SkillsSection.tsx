'use client';
import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { profile, skillCategories, tools, type Skill } from '@/data/portfolio';

function SkillBar({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) {
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
        <m.div
          className="h-full rounded-full"
          style={{
            background: color
              ? `linear-gradient(90deg, ${color}80, ${color})`
              : 'linear-gradient(90deg, #5667ff, #d926ec)',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
        />
      </div>
    </li>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      aria-labelledby="skills-heading"
      className="section-padding relative"
    >
      <div className="container-custom relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
        </m.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((category, ci) => (
            <m.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="glass-card p-6 space-y-4"
            >
              <h3 className="font-semibold text-white text-base">
                <span aria-hidden="true">{category.icon} </span>
                {category.label}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} isInView={isInView} />
                ))}
              </ul>
            </m.div>
          ))}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-6 space-y-4"
          >
            <h3 className="font-semibold text-white text-base">
              <span aria-hidden="true">🛠️ </span>
              Tools &amp; Platforms
            </h3>
            <ul className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <m.li
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.03 + 0.5 }}
                  className="skill-badge"
                  whileHover={{ scale: 1.05 }}
                >
                  {tool}
                </m.li>
              ))}
            </ul>
          </m.div>
        </div>
      </div>
    </section>
  );
}
