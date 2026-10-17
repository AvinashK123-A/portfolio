'use client';

import { useEffect, useState } from 'react';
import { navLinks, profile } from '@/data/portfolio';
import { DownloadIcon } from '@/components/icons';

const MOBILE_MENU_ID = 'mobile-menu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const linkClass = (href: string) =>
    activeSection === href.slice(1)
      ? 'text-white bg-white/10'
      : 'text-gray-300 hover:text-white hover:bg-white/5';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-2 group rounded-lg">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200"
            >
              {profile.initials}
            </span>
            <span className="text-white font-semibold text-sm opacity-90 group-hover:opacity-100 transition-opacity max-sm:sr-only">
              {profile.name}
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass(link.href)}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <DownloadIcon className="w-4 h-4" />
                Resume
              </a>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id={MOBILE_MENU_ID}
          hidden={!menuOpen}
          className="md:hidden py-3 border-t border-white/10"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${linkClass(link.href)}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium"
            >
              <DownloadIcon className="w-4 h-4" />
              Download Resume
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
