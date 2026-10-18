import { profile } from '@/data/portfolio';
import ExternalLink from '@/components/ExternalLink';
import { reveal } from '@/components/reveal';

const cardClass =
  'block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/50 transition-all motion-safe:hover:scale-105';
const buttonClass =
  'px-10 py-4 rounded-xl font-semibold transition-all motion-safe:hover:scale-105';

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        <div {...reveal('up')}>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-violet-400">Touch</span>
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            {profile.availability}. Let&apos;s build something great together.
          </p>

          {/* Contact Cards */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <li>
              <a href={`mailto:${profile.email}`} className={cardClass}>
                <span className="block text-3xl mb-3" aria-hidden="true">
                  📧
                </span>
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <p className="text-violet-300 text-sm break-all">{profile.email}</p>
              </a>
            </li>
            <li>
              <ExternalLink href={profile.github} className={cardClass}>
                <span className="block text-3xl mb-3" aria-hidden="true">
                  💻
                </span>
                <h3 className="text-white font-semibold mb-1">GitHub</h3>
                <p className="text-violet-300 text-sm">@{profile.githubUsername}</p>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.linkedin} className={cardClass}>
                <span className="block text-3xl mb-3" aria-hidden="true">
                  🔗
                </span>
                <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
                <p className="text-violet-300 text-sm">{profile.name}</p>
              </ExternalLink>
            </li>
          </ul>

          {/* Main CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className={`${buttonClass} bg-violet-600 hover:bg-violet-700 text-white`}
            >
              Send Email
            </a>
            <ExternalLink
              href={profile.linkedin}
              className={`${buttonClass} border border-blue-500 text-blue-300 hover:bg-blue-500/10`}
            >
              Connect on LinkedIn
            </ExternalLink>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className={`${buttonClass} border border-green-500 text-green-300 hover:bg-green-500/10`}
              >
                Download Resume
              </a>
            )}
            <ExternalLink
              href={profile.github}
              className={`${buttonClass} border border-white/20 text-white hover:bg-white/5`}
            >
              View GitHub
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
