import { navLinks, profile } from '@/data/portfolio';
import ExternalLink from '@/components/ExternalLink';

const linkClass = 'text-gray-300 hover:text-violet-300 transition-colors text-sm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold text-white mb-2">
              <span className="text-violet-400" aria-hidden="true">
                &lt;
              </span>
              {profile.name}
              <span className="text-violet-400" aria-hidden="true">
                {' '}
                /&gt;
              </span>
            </p>
            <p className="text-gray-300 text-sm">{profile.role}</p>
            <p className="text-gray-400 text-xs mt-1">{profile.location}</p>
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className="text-white font-semibold mb-3 text-base">
              Navigation
            </h2>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="text-white font-semibold mb-3 text-base">Connect</h2>
            <ul className="space-y-2">
              <li>
                <ExternalLink href={profile.github} className={linkClass}>
                  GitHub - @{profile.githubUsername}
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={profile.linkedin} className={linkClass}>
                  LinkedIn - {profile.name}
                </ExternalLink>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
                  {profile.email}
                </a>
              </li>
              {profile.resumeUrl && (
                <li>
                  <a href={profile.resumeUrl} download className={linkClass}>
                    Download Resume
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {profile.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
