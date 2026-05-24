'use client';
import { motion } from 'framer-motion';
import { PROFILE, CTA_LINKS } from '@/config/profile';

const roles = ['Senior Flutter Engineer', 'Mobile Architect', 'Clean Code Advocate', 'Team Lead'];

export default function HeroSection() {
  return (
    <section id='home' className='min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a] px-6'>
      <div className='max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20'>
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='space-y-6'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10'
          >
            <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
            <span className='text-violet-300 text-sm'>{PROFILE.availability}</span>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='text-gray-400 text-lg mb-2'
            >
              Hi, I am
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className='text-5xl md:text-7xl font-bold text-white leading-tight'
            >
              {PROFILE.name}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='text-2xl md:text-3xl font-semibold text-violet-400 mt-2'
            >
              {PROFILE.role}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className='text-gray-300 text-lg leading-relaxed max-w-xl'
          >
            {PROFILE.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className='flex flex-wrap gap-4'
          >
            <a
              href={CTA_LINKS.projectsSection}
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className='px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-all hover:scale-105 cursor-pointer'
            >
              Explore Projects
            </a>
            <a
              href={CTA_LINKS.githubProfile}
              target='_blank'
              rel='noopener noreferrer'
              className='px-8 py-4 border border-white/20 hover:border-violet-400 text-white rounded-xl font-semibold transition-all hover:scale-105'
            >
              GitHub Profile
            </a>
            <a
              href={CTA_LINKS.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='px-8 py-4 border border-blue-500/40 hover:border-blue-400 text-blue-300 rounded-xl font-semibold transition-all hover:scale-105'
            >
              LinkedIn
            </a>
            <a
              href={CTA_LINKS.downloadResume}
              target='_blank'
              rel='noopener noreferrer'
              className='px-8 py-4 border border-green-500/40 hover:border-green-400 text-green-300 rounded-xl font-semibold transition-all hover:scale-105'
            >
              Download Resume
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className='flex gap-8 pt-4'
          >
            {[
              { label: 'Years Experience', value: '7+' },
              { label: 'Apps Shipped', value: '20+' },
              { label: 'Architecture', value: 'Clean' },
            ].map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-2xl font-bold text-violet-400'>{stat.value}</div>
                <div className='text-gray-500 text-xs mt-1'>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className='flex justify-center lg:justify-end'
        >
          <div className='relative'>
            <div className='w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 p-1'>
              <div className='w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden'>
                <img
                  src={PROFILE.profileImage}
                  alt={PROFILE.profileImageAlt}
                  className='w-full h-full object-cover rounded-full'
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    t.parentElement!.innerHTML = '<span class="text-6xl">AR</span>';
                  }}
                />
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className='absolute -bottom-4 -left-4 bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg'
            >
              Flutter Expert
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
