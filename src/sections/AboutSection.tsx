'use client';
import { motion } from 'framer-motion';
import { PROFILE, CTA_LINKS } from '@/config/profile';
import { personalInfo } from '@/data/portfolio';

export default function AboutSection() {
  return (
    <section id='about' className='py-24 px-6 bg-[#0f0f0f]'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            About <span className='text-violet-400'>Me</span>
          </h2>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
            Senior Flutter Engineer crafting enterprise-grade mobile experiences
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left: Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex items-center gap-6 mb-8'>
              <div className='w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 p-1 flex-shrink-0'>
                <div className='w-full h-full rounded-full bg-[#0f0f0f] overflow-hidden'>
                  <img
                    src={PROFILE.profileImage}
                    alt={PROFILE.profileImageAlt}
                    className='w-full h-full object-cover rounded-full'
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-white'>{PROFILE.name}</h3>
                <p className='text-violet-400 font-semibold'>{PROFILE.role}</p>
                <p className='text-gray-400 text-sm'>{PROFILE.location} &bull; {PROFILE.yearsOfExperience}+ Years</p>
              </div>
            </div>

            <p className='text-gray-300 text-lg leading-relaxed mb-6'>
              {personalInfo.description}
            </p>

            <blockquote className='border-l-4 border-violet-500 pl-4 text-gray-400 italic mb-8'>
              &ldquo;{PROFILE.philosophy}&rdquo;
            </blockquote>

            <div className='flex flex-wrap gap-4'>
              <a
                href={CTA_LINKS.githubProfile}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:border-violet-400 transition-all'
              >
                GitHub Profile
              </a>
              <a
                href={CTA_LINKS.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:border-blue-400 transition-all'
              >
                LinkedIn
              </a>
              <a
                href={CTA_LINKS.downloadResume}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl text-white transition-all'
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right: Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='grid grid-cols-2 gap-4'
          >
            {[
              { value: '7+', label: 'Years Experience', icon: '🚀' },
              { value: '20+', label: 'Apps Shipped', icon: '📱' },
              { value: '100K+', label: 'Users Served', icon: '👥' },
              { value: '99.9%', label: 'Uptime Achieved', icon: '⚡' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className='p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-violet-500/50 transition-all'
              >
                <div className='text-3xl mb-2'>{stat.icon}</div>
                <div className='text-3xl font-bold text-violet-400 mb-1'>{stat.value}</div>
                <div className='text-gray-400 text-sm'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
