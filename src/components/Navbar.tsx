'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map(i => i.href.replace('#', ''));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
      >
        <nav className="container-custom flex items-center justify-between h-16 md:h-20">
          <button onClick={() => handleNavClick('#home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg"><span className="gradient-text">AR</span></span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeSection === item.href.replace('#', '') ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                >
                  {activeSection === item.href.replace('#', '') && (
                    <motion.span layoutId="activeNav" className="absolute inset-0 rounded-lg bg-white/10" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={`mailto:${personalInfo.email}`} className="hidden md:flex btn-primary text-sm px-5 py-2">Hire Me</a>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all" aria-label="Toggle menu">
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-x-0 top-16 z-40 p-4 glass-card mx-4 rounded-2xl">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button onClick={() => handleNavClick(item.href)} className="w-full text-left px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-white/10">
                <a href={`mailto:${personalInfo.email}`} className="block w-full text-center btn-primary text-sm py-3">Hire Me</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
