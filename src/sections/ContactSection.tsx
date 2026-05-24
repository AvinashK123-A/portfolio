'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, MapPin, Clock } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const cLinks = [
  { icon: Mail, label: 'Email', value: personalInfo.email, href: 'mailto:'+personalInfo.email, color: 'text-primary-400' },
  { icon: Github, label: 'GitHub', value: 'AvinashK123-A', href: personalInfo.github, color: 'text-white' },
  { icon: Linkedin, label: 'LinkedIn', value: 'avinashk123', href: personalInfo.linkedin, color: 'text-blue-400' },
  { icon: Twitter, label: 'Twitter', value: '@AvinashK_Dev', href: personalInfo.twitter, color: 'text-sky-400' },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    await new Promise(r=>setTimeout(r,1500));
    setSending(false); setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="container-custom relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-16">
          <span className="text-primary-400 text-sm font-mono tracking-widest uppercase mb-3 block">// contact</span>
          <h2 className="section-title gradient-text">Let's Work Together</h2>
          <p className="section-subtitle">Open to Senior / Lead / Architect roles. Let's discuss how I can add value.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,x:-40}} animate={isInView?{opacity:1,x:0}:{}} transition={{duration:0.6,delay:0.1}} className="space-y-8">
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div><p className="font-semibold text-white">Available for New Opportunities</p><p className="text-sm text-white/60">{personalInfo.availability}</p></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm"><MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />{personalInfo.location} — Remote-first preferred</div>
              <div className="flex items-center gap-3 text-white/60 text-sm"><Clock className="w-4 h-4 text-primary-400 flex-shrink-0" />IST (UTC+5:30) — Flexible for global teams</div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Connect With Me</h3>
              {cLinks.map(({icon:Icon,label,value,href,color})=>(
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{x:6}} className="glass-card-hover flex items-center gap-4 p-4 rounded-xl">
                  <Icon className={'w-5 h-5 '+color} />
                  <div><p className="text-xs text-white/40">{label}</p><p className="text-sm font-medium text-white">{value}</p></div>
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:40}} animate={isInView?{opacity:1,x:0}:{}} transition={{duration:0.6,delay:0.2}}>
            {submitted ? (
              <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="glass-card p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-green-400" /></div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/60">Thanks for reaching out. I'll reply within 24 hours.</p>
                <button onClick={()=>{setSubmitted(false);setForm({name:'',email:'',subject:'',message:'',});}} className="btn-outline text-sm px-6 py-2 mt-4">Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <h3 className="text-lg font-semibold text-white">Send a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(['name','email'] as const).map(f=>(
                    <div key={f} className="space-y-1.5">
                      <label className="text-xs text-white/50 font-medium capitalize">{f}</label>
                      <input type={f==='email'?'email':'text'} required value={form[f]} onChange={e=>setForm(s=>({...s,[f]:e.target.value}))} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500/50 transition-all" />
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50 font-medium">Subject</label>
                  <input type="text" required value={form.subject} onChange={e=>setForm(s=>({...s,subject:e.target.value}))} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500/50 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50 font-medium">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e=>setForm(s=>({...s,message:e.target.value}))} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500/50 transition-all resize-none" />
                </div>
                <button type="submit" disabled={sending} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-60">
                  {sending ? <><motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{rotate:360}} transition={{duration:0.8,repeat:Infinity,ease:'linear'}} />Sending...</> : <><Send className="w-4 h-4" />Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
