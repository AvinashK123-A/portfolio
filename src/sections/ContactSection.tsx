'use client';
import { motion } from 'framer-motion';
import { PROFILE, CTA_LINKS } from '@/config/profile';

export default function ContactSection() {
  return (
    <section id='contact' className='py-24 px-6 bg-[#0a0a0a]'>
      <div className='max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Get In <span className='text-violet-400'>Touch</span>
          </h2>
          <p className='text-gray-400 text-lg mb-12 max-w-2xl mx-auto'>
            Open to Senior / Lead / Architect roles. Let&apos;s build something great together.
          </p>

          {/* Contact Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            {/* Email */}
            <motion.a
              href={`mailto:${PROFILE.email}`}
              whileHover={{ scale: 1.05 }}
              className='block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/50 transition-all'
            >
              <div className='text-3xl mb-3'>📧</div>
              <h3 className='text-white font-semibold mb-1'>Email</h3>
              <p className='text-violet-400 text-sm break-all'>{PROFILE.email}</p>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={CTA_LINKS.githubProfile}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              className='block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/50 transition-all'
            >
              <div className='text-3xl mb-3'>💻</div>
              <h3 className='text-white font-semibold mb-1'>GitHub</h3>
              <p className='text-violet-400 text-sm'>@AvinashK123-A</p>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href={CTA_LINKS.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              className='block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/50 transition-all'
            >
              <div className='text-3xl mb-3'>🔗</div>
              <h3 className='text-white font-semibold mb-1'>LinkedIn</h3>
              <p className='text-violet-400 text-sm'>Avinash Reddy</p>
            </motion.a>
          </div>

          {/* Main CTA Buttons */}
          <div className='flex flex-wrap justify-center gap-4'>
            <motion.a
              href={`mailto:${PROFILE.email}`}
              whileHover={{ scale: 1.05 }}
              className='px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-all'
            >
              Send Email
            </motion.a>
            <motion.a
              href={CTA_LINKS.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              className='px-10 py-4 border border-blue-500 text-blue-300 rounded-xl font-semibold hover:bg-blue-500/10 transition-all'
            >
              Connect on LinkedIn
            </motion.a>
            <motion.a
              href={CTA_LINKS.downloadResume}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              className='px-10 py-4 border border-green-500 text-green-300 rounded-xl font-semibold hover:bg-green-500/10 transition-all'
            >
              Download Resume
            </motion.a>
            <motion.a
              href={CTA_LINKS.githubProfile}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              className='px-10 py-4 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-all'
            >
              View GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
