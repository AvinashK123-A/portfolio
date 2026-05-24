'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/portfolio';

const cats = ['All','Mobile','FinTech','Security','Enterprise','Platform'];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="container-custom relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-12">
          <span className="text-primary-400 text-sm font-mono tracking-widest uppercase mb-3 block">// projects</span>
          <h2 className="section-title gradient-text">Featured Work</h2>
          <p className="section-subtitle">Production-grade Flutter applications — real code, real architecture, real users.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.2}} className="flex flex-wrap justify-center gap-3 mb-12">
          {cats.map(c=>(
            <button key={c} onClick={()=>setActive(c)} className={'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 '+(active===c?'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow-sm':'glass-card text-white/60 hover:text-white hover:bg-white/10')}>{c}</button>
          ))}
        </motion.div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p,i)=>(
              <motion.div key={p.id} layout initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.9}} transition={{duration:0.4,delay:i*0.05}} whileHover={{y:-8}} className="group relative glass-card overflow-hidden">
                <div className={'h-1 w-full bg-gradient-to-r '+p.color} />
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{p.emoji}</span>
                    <span className={'text-xs px-2 py-1 rounded-full bg-gradient-to-r '+p.color+' text-white font-medium'}>{p.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{p.description}</p>
                </div>
                <div className="px-6 pb-4">
                  <div className="flex gap-4">{Object.entries(p.stats).map(([k,v])=>(
                    <div key={k} className="text-center"><div className="text-sm font-bold text-primary-300">{v}</div><div className="text-xs text-white/40 capitalize">{k}</div></div>
                  ))}</div>
                </div>
                <div className="px-6 pb-4 flex flex-wrap gap-2">
                  {p.tech.slice(0,4).map(t=><span key={t} className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/60 border border-white/10">{t}</span>)}
                  {p.tech.length>4&&<span className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/40">+{p.tech.length-4}</span>}
                </div>
                <div className="px-6 pb-6 flex gap-3">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-white glass-card px-4 py-2 rounded-lg flex-1 justify-center transition-colors">
                    <Github className="w-4 h-4" />View Code
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.div initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.5}} className="text-center mt-14">
          <a href="https://github.com/AvinashK123-A" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 btn-outline px-8 py-3 text-base">
            <Github className="w-5 h-5" />View All on GitHub<ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
