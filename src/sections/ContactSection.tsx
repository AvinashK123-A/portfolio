'use client';
import { m } from 'framer-motion';
import { profile } from '@/data/portfolio';

const cardClass =
  'block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/50 transition-all';

const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const;
const newTabHint = <span className="sr-only"> (opens in a new tab)</span>;

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-violet-400">Touch</span>
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            {profile.availability}. Let&apos;s build something great together.
          </p>

          {/* Contact Cards */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <li>
              <m.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.05 }}
                className={cardClass}
              >
                <span className="block text-3xl mb-3" aria-hidden="true">
                  📧
                </span>
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <p className="text-violet-300 text-sm break-all">{profile.email}</p>
              </m.a>
            </li>
            <li>
              <m.a
                href={profile.github}
                {...newTab}
                whileHover={{ scale: 1.05 }}
                className={cardClass}
              >
                <span className="block text-3xl mb-3" aria-hidden="true">
                  💻
                </span>
                <h3 className="text-white font-semibold mb-1">GitHub</h3>
                <p className="text-violet-300 text-sm">@{profile.githubUsername}</p>
                {newTabHint}
              </m.a>
            </li>
            <li>
              <m.a
                href={profile.linkedin}
                {...newTab}
                whileHover={{ scale: 1.05 }}
                className={cardClass}
              >
                <span className="block text-3xl mb-3" aria-hidden="true">
                  🔗
                </span>
                <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
                <p className="text-violet-300 text-sm">{profile.name}</p>
                {newTabHint}
              </m.a>
            </li>
          </ul>

          {/* Main CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <m.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-all"
            >
              Send Email
            </m.a>
            <m.a
              href={profile.linkedin}
              {...newTab}
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 border border-blue-500 text-blue-300 rounded-xl font-semibold hover:bg-blue-500/10 transition-all"
            >
              Connect on LinkedIn
              {newTabHint}
            </m.a>
            {profile.resumeUrl && (
              <m.a
                href={profile.resumeUrl}
                download
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 border border-green-500 text-green-300 rounded-xl font-semibold hover:bg-green-500/10 transition-all"
              >
                Download Resume
              </m.a>
            )}
            <m.a
              href={profile.github}
              {...newTab}
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-all"
            >
              View GitHub
              {newTabHint}
            </m.a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
