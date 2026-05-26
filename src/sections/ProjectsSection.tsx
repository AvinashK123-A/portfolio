'use client';
import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';
import { CTA_LINKS } from '@/config/profile';

export default function ProjectsSection() {
  return (
    <section id='projects' className='py-24 px-6 bg-[#0a0a0a]'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Featured <span className='text-violet-400'>Projects</span>
          </h2>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
            Enterprise-grade Flutter applications built for scale, security, and performance
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className='p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/40 transition-all group'
            >
              <div className='flex items-start justify-between mb-4'>
                <span className='text-4xl'>🚀</span>
                <div className='flex gap-2'>
                  {project.github && (
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all'
                      title='View on GitHub'
                    >
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                        <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 className='text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors'>
                {project.title}
              </h3>
              <p className='text-gray-400 text-sm leading-relaxed mb-4'>
                {project.description}
              </p>

              {/* Stats */}
              <div className='flex flex-wrap gap-2 mb-4'>
                
              </div>

              {/* Tech Stack */}
              <div className='flex flex-wrap gap-2'>
                {project.tech.map((t) => (
                  <span key={t} className='px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300 text-xs'>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All on GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='text-center'
        >
          <a
            href={CTA_LINKS.githubProfile}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-8 py-4 border border-violet-500/40 text-violet-300 rounded-xl hover:bg-violet-500/10 hover:border-violet-400 transition-all font-semibold'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
            </svg>
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
