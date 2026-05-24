'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '@/data/portfolio';

function SkillBar({name,level,color,index,isInView}:{name:string;level:number;color?:string;index:number;isInView:boolean}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between"><span className="text-sm font-medium text-white/80">{name}</span><span className="text-xs text-white/40 font-mono">{level}%</span></div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{background:color?'linear-gradient(90deg,'+color+'80,'+color+')':'linear-gradient(90deg,#5667ff,#d926ec)'}} initial={{width:0}} animate={isInView?{width:level+'%'}:{width:0}} transition={{duration:1,delay:index*0.05+0.2,ease:'easeOut'}} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const cats: Record<string, string> = { mobile:'📱 Mobile & UI', stateManagement:'🔄 State Management', backend:'⚡ Backend & Data', architecture:'🏗️ Architecture', devops:'🚀 DevOps' };
  return (
    <section id="skills" ref={ref} className="section-padding relative">
      <div className="container-custom relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-16">
          <span className="text-primary-400 text-sm font-mono tracking-widest uppercase mb-3 block">// skills</span>
          <h2 className="section-title gradient-text">Technical Expertise</h2>
          <p className="section-subtitle">7+ years of deep expertise across the Flutter & mobile development ecosystem.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(Object.entries(skills) as [string, any][]).filter(([k])=>k!=='tools').map(([cat,items],ci) => (
            <motion.div key={cat} initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:ci*0.1}} className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-white text-base">{cats[cat]||cat}</h3>
              <div className="space-y-3">{items.map((s:any,i:number)=><SkillBar key={s.name} name={s.name} level={s.level} color={s.color} index={i} isInView={isInView} />)}</div>
            </motion.div>
          ))}
          <motion.div initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.5}} className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-white text-base">🛠️ Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool,i)=>(
                <motion.span key={tool} initial={{opacity:0,scale:0.8}} animate={isInView?{opacity:1,scale:1}:{}} transition={{duration:0.3,delay:i*0.03+0.5}} className="skill-badge" whileHover={{scale:1.05}}>{tool}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
