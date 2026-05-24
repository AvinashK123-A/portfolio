'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, Code2, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const footerLinks = ['Home','About','Skills','Experience','Projects','Contact'].map(l => ({ label: l, href: '#' + l.toLowerCase() }));
const socialLinks = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' },
  { icon: Mail, href: 'mailto:' + personalInfo.email, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-950/80 backdrop-blur-xl">
      <div className="glow-line" />
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">{personalInfo.name}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">Senior Flutter Engineer. Clean Architecture advocate. 7+ years shipping apps.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} onClick={e => { e.preventDefault(); document.getElementById(link.href.replace('#',''))?.scrollIntoView({behavior:'smooth'}); }} className="text-sm text-white/50 hover:text-primary-400 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 glass-card flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all rounded-xl">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
          <p className="text-sm text-white/30 flex items-center gap-1.5">
            {'©'} {new Date().getFullYear()} {personalInfo.name}. Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> in India.
          </p>
          <motion.button onClick={() => window.scrollTo({top:0,behavior:'smooth'})} whileHover={{y:-2}} className="glass-card w-9 h-9 flex items-center justify-center text-white/40 hover:text-white rounded-xl" aria-label="Back to top">
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
