'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experience } from '@/data/portfolio';
export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id="experience" ref={ref} className="section-padding relative">
      <div className="container-custom relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-16">
          <span className="text-primary-400 text-sm font-mono tracking-widest uppercase mb-3 block">// experience</span>
          <h2 className="section-title gradient-text">Career Journey</h2>
          <p className="section-subtitle">7+ years building, shipping, and leading Flutter applications at production scale.</p>
        </motion.div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-accent-500 to-transparent opacity-30" />
          {experience.map((exp, i) => (
            <motion.div key={exp.id} initial={{opacity:0,x:i%2===0?-40:40}} animate={isInView?{opacity:1,x:0}:{}} transition={{duration:0.6,delay:i*0.15}} className={'relative flex items-start mb-12 '+(i%2===0?'md:flex-row':'md:flex-row-reverse')}>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 mt-6">
                <div className="timeline-dot" />
                {exp.current && <motion.div className="absolute inset-0 rounded-full bg-primary-500 opacity-20" animate={{scale:[1,2,1]}} transition={{duration:2,repeat:Infinity}} />}
              </div>
              <div className={'w-full md:w-[45%] ml-16 md:ml-0 '+(i%2===0?'md:mr-auto md:pr-12':'md:ml-auto md:pl-12')}>
                <motion.div whileHover={{y:-4}} className="glass-card p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div><h3 className="text-lg font-bold text-white">{exp.title}</h3><p className="text-primary-400 font-medium">{exp.company}</p></div>
                    {exp.current && <span className="flex-shrink-0 text-xs px-3 py-1 rounded-full bg-green-400/20 text-green-400 border border-green-400/30">Current</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-white/50">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{exp.period}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{exp.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{exp.duration}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.achievements.map((a,ai) => (
                      <div key={ai} className="flex items-start gap-2 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />{a}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.techStack.map(t => <span key={t} className="text-xs px-2 py-1 rounded-md bg-primary-500/10 text-primary-300 border border-primary-500/20">{t}</span>)}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
