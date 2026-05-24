'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/data/portfolio';

const values = [
  { title: 'Clean Architecture', description: 'Feature-first, SOLID, DDD — code that communicates its intent.', icon: '📐' },
  { title: 'Production Quality', description: 'Every commit is production-ready. No mock data, no partial implementations.', icon: '🚀' },
  { title: 'Continuous Learning', description: 'Active contributor to flutter/flutter, FlutterFire, and open-source packages.', icon: '📚' },
  { title: 'Team Leadership', description: 'Code reviews, mentoring, setting standards, and lifting the team.', icon: '👥' },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const cv = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.1}} };
  const iv = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} };
  return (
    <section id="about" ref={ref} className="section-padding relative">
      <div className="container-custom relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-16">
          <span className="text-primary-400 text-sm font-mono tracking-widest uppercase mb-3 block">// about me</span>
          <h2 className="section-title gradient-text">Who I Am</h2>
          <p className="section-subtitle">A passionate Flutter engineer who turns complex requirements into elegant mobile experiences.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div variants={cv} initial="hidden" animate={isInView?'visible':'hidden'} className="space-y-8">
            <motion.div variants={iv} className="glass-card p-6 flex gap-5 items-start">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-primary-500/40">
                  <Image src="https://avatars.githubusercontent.com/AvinashK123-A" alt="Avinash Reddy K" width={80} height={80} className="object-cover" unoptimized />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 ring-2 ring-dark-950" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{personalInfo.name}</h3>
                <p className="text-primary-400 font-medium">{personalInfo.tagline}</p>
                <p className="text-white/50 text-sm mt-1">{personalInfo.location}</p>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />{personalInfo.availability}</p>
              </div>
            </motion.div>
            <motion.div variants={iv} className="space-y-4">
              <p className="text-white/70 leading-relaxed">{personalInfo.description}</p>
              <blockquote className="code-block p-4 rounded-xl text-white/60 italic border-l-2 border-primary-500">"{personalInfo.philosophy}"</blockquote>
            </motion.div>
          </motion.div>
          <motion.div variants={cv} initial="hidden" animate={isInView?'visible':'hidden'} className="space-y-6">
            <motion.h3 variants={iv} className="text-2xl font-bold text-white">What Drives Me</motion.h3>
            {values.map(v => (
              <motion.div key={v.title} variants={iv} whileHover={{x:6}} className="glass-card-hover p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{v.icon}</span>
                <div><h4 className="font-semibold text-white mb-1">{v.title}</h4><p className="text-white/60 text-sm">{v.description}</p></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
