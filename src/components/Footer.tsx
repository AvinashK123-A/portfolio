'use client';
import { PROFILE, CTA_LINKS, NAV_LINKS } from '@/config/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className='bg-black border-t border-white/10 py-12 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Brand */}
          <div>
            <h3 className='text-xl font-bold text-white mb-2'>
              <span className='text-violet-400'>&lt;</span>
              {PROFILE.name}
              <span className='text-violet-400'> /&gt;</span>
            </h3>
            <p className='text-gray-400 text-sm'>{PROFILE.role}</p>
            <p className='text-gray-500 text-xs mt-1'>{PROFILE.location}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className='text-white font-semibold mb-3'>Navigation</h4>
            <ul className='space-y-2'>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className='text-gray-400 hover:text-violet-400 transition-colors text-sm'
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className='text-white font-semibold mb-3'>Connect</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href={CTA_LINKS.githubProfile}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-violet-400 transition-colors text-sm'
                >
                  GitHub - @AvinashK123-A
                </a>
              </li>
              <li>
                <a
                  href={CTA_LINKS.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-violet-400 transition-colors text-sm'
                >
                  LinkedIn - Avinash Reddy
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className='text-gray-400 hover:text-violet-400 transition-colors text-sm'
                >
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={CTA_LINKS.downloadResume}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-violet-400 transition-colors text-sm'
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-gray-500 text-sm'>
            &copy; {currentYear} {PROFILE.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
