'use client';
import { m } from 'framer-motion';
import { profile, projects, type Project } from '@/data/portfolio';
import ExternalLink from '@/components/ExternalLink';
import { GitHubIcon, PackageIcon } from '@/components/icons';

const featured = projects.filter((p) => p.featured);
const openSource = projects.filter((p) => p.kind === 'open-source' && !p.featured);
const clientWork = projects.filter((p) => p.kind === 'client' && !p.featured);

function TechList({ tech }: { tech: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {tech.map((t) => (
        <li
          key={t}
          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300 text-xs"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { github, package: pkg, demo } = project.links;
  if (!github && !pkg && !demo) return null;
  const linkClass =
    'inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-200 hover:text-white transition-all';
  return (
    <div className="flex flex-wrap gap-2">
      {pkg && (
        <ExternalLink href={pkg} className={linkClass}>
          <PackageIcon className="w-4 h-4" />
          pub.dev
        </ExternalLink>
      )}
      {github && (
        <ExternalLink href={github} className={linkClass}>
          <GitHubIcon className="w-4 h-4" />
          Source
        </ExternalLink>
      )}
      {demo && (
        <ExternalLink href={demo} className={linkClass}>
          Live demo
        </ExternalLink>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <m.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="flex flex-col gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/40 transition-all group"
    >
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-violet-300 mb-2">
          {project.category}
        </p>
        <h4 className="text-xl font-bold text-white group-hover:text-violet-200 transition-colors">
          {project.title}
        </h4>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
      <div className="mt-auto flex flex-col gap-4">
        <TechList tech={project.tech} />
        <ProjectLinks project={project} />
      </div>
    </m.article>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <m.article
      data-testid="featured-project"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-8 rounded-3xl border border-violet-500/40 bg-gradient-to-br from-violet-500/10 via-white/5 to-blue-500/10 mb-12"
    >
      <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-200 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-300" aria-hidden="true" />
        Featured · {project.category}
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h3>
      <p className="text-gray-200 leading-relaxed mb-6 max-w-3xl">{project.description}</p>
      <div className="flex flex-col gap-5">
        <TechList tech={project.tech} />
        <ProjectLinks project={project} />
      </div>
    </m.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-violet-400">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Open-source Flutter work with public code, plus selected client and employer projects.
          </p>
        </m.div>

        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}

        {openSource.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6">Open source</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {openSource.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {clientWork.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-2">Client &amp; employer work</h3>
            <p className="text-gray-400 text-sm mb-6">
              Selected projects from client and employer engagements. Their source code is not
              public.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clientWork.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* View All on GitHub CTA */}
        <div className="text-center">
          <ExternalLink
            href={profile.github}
            className="inline-flex items-center gap-2 px-8 py-4 border border-violet-500/40 text-violet-200 rounded-xl hover:bg-violet-500/10 hover:border-violet-400 transition-all font-semibold"
          >
            <GitHubIcon className="w-5 h-5" />
            View All Projects on GitHub
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
