'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE, NAV_LINKS, CTA_LINKS } from '@/config/profile';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
        const handleScroll = () => {
                setScrolled(window.scrollY > 50);
                // Update active section based on scroll position
                const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
                for (const id of sections) {
                          const el = document.getElementById(id);
                          if (el) {
                                      const rect = el.getBoundingClientRect();
                                      if (rect.top <= 100 && rect.bottom >= 100) {
                                                    setActiveSection(id);
                                                    break;
                                      }
                          }
                }
        };
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
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
              >
              <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                {/* Logo / Name */}
                      <motion.button
                                  onClick={() => handleNavClick('#about')}
                                  className='text-xl font-bold text-white cursor-pointer'
                                  whileHover={{ scale: 1.05 }}
                                >
                                <span className='text-primary-400'>&lt;</span>span>
                                ARK
                                <span className='text-primary-400'> /&gt;</span>span>
                      </motion.button>motion.button>
              
                {/* Desktop Nav Links */}
                      <div className='hidden md:flex items-center gap-6'>
                        {NAV_LINKS.map((link) => (
                            <button
                                            key={link.href}
                                            onClick={() => handleNavClick(link.href)}
                                            className={`text-sm font-medium transition-colors relative pb-1 ${
                                                              activeSection === link.href.replace('#', '')
                                                                ? 'text-primary-400'
                                                                : 'text-gray-300 hover:text-white'
                                            }`}
                                          >
                              {link.label}
                              {activeSection === link.href.replace('#', '') && (
                                                            <motion.div
                                                                                layoutId="navIndicator"
                                                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 rounded-full"
                                                                              />
                                                          )}
                            </button>button>
                          ))}
                                <motion.a
                                              href='/resume/Avinash_Reddy_Resume.pdf'
                                              download='Avinash_Reddy_Resume.pdf'
                                              className='px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center gap-1.5'
                                              whileHover={{ scale: 1.05, y: -1 }}
                                            >
                                            <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                            </svg>svg>
                                            Resume
                                </motion.a>motion.a>
                      </div>div>
              
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
                                </svg>svg>
                      </button>button>
              </div>div>
        
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
                                                      </button>button>
                                                    ))}
                                      <a
                                                      href='/resume/Avinash_Reddy_Resume.pdf'
                                                      download='Avinash_Reddy_Resume.pdf'
                                                      className='text-primary-400 text-sm font-medium flex items-center gap-1.5'
                                                    >
                                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                                    </svg>svg>
                                                    Download Resume
                                      </a>a>
                          </motion.div>motion.div>
                        )}
              </AnimatePresence>AnimatePresence>
        </motion.nav>motion.nav>
      );
}</motion.nav>
