'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE, NAV_LINKS, CTA_LINKS } from '@/config/profile';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Logo / Name */}
        <motion.a
          href='#home'
          onClick={() => handleNavClick('#home')}
          className='text-xl font-bold text-white cursor-pointer'
          whileHover={{ scale: 1.05 }}
        >
          <span className='text-violet-400'>&lt;</span>
          {PROFILE.name}
          <span className='text-violet-400'> /&gt;</span>
        </motion.a>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex items-center gap-8'>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className='text-gray-300 hover:text-white transition-colors text-sm font-medium'
            >
              {link.label}
            </button>
          ))}
          <motion.a
            href={CTA_LINKS.githubProfile}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 border border-violet-500 text-violet-400 rounded-lg text-sm hover:bg-violet-500 hover:text-white transition-all'
            whileHover={{ scale: 1.05 }}
          >
            GitHub Profile
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className='md:hidden text-white'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Toggle menu'
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            {menuOpen
              ? <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              : <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='md:hidden bg-black/95 border-b border-white/10 px-6 py-4 flex flex-col gap-4'
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className='text-gray-300 hover:text-white transition-colors text-sm font-medium text-left'
              >
                {link.label}
              </button>
            ))}
            <a
              href={CTA_LINKS.githubProfile}
              target='_blank'
              rel='noopener noreferrer'
              className='text-violet-400 text-sm font-medium'
            >
              GitHub Profile
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
