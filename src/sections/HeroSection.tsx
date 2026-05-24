'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Twitter, Mail, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { personalInfo, stats } from '@/data/portfolio';

const cv = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.15,delayChildren:0.3}} };
const iv = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.25,0.46,0.45,0.94]}} };

export default function HeroSection() {
  const codeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(codeRef.current) gsap.to(codeRef.current,{y:-15,duration:3,ease:'power1.inOut',yoyo:true,repeat:-1});
  }, []);

  const socials = [
    { href: personalInfo.github, icon: Github, label: 'GitHub' },
    { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: personalInfo.twitter, icon: Twitter, label: 'Twitter' },
    { href: 'mailto:' + personalInfo.email, icon: Mail, label: 'Email' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute -top-40 -left-40 w-96 h-96 rounded-full" style={{background:'radial-gradient(circle, rgba(86,103,255,0.2) 0%, transparent 70%)'}} animate={{scale:[1,1.2,1],opacity:[0.5,0.8,0.5]}} transition={{duration:6,repeat:Infinity}} />
        <motion.div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full" style={{background:'radial-gradient(circle, rgba(217,38,236,0.15) 0%, transparent 70%)'}} animate={{scale:[1.2,1,1.2],opacity:[0.4,0.7,0.4]}} transition={{duration:8,repeat:Infinity}} />
      </div>
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <motion.div variants={cv} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={iv}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary-300 border border-primary-500/30">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {personalInfo.availability}
              </span>
            </motion.div>
            <motion.div variants={iv}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white/90">Hi, I'm</span>
                <span className="block gradient-text-hero mt-1">{personalInfo.name}</span>
              </h1>
            </motion.div>
            <motion.div variants={iv} className="text-xl md:text-2xl font-medium text-white/70">
              <TypeAnimation sequence={['Senior Flutter Engineer',2000,'Mobile Architecture Expert',2000,'Clean Architecture Advocate',2000,'Enterprise App Builder',2000]} wrapper="span" speed={50} repeat={Infinity} className="text-primary-300" />
            </motion.div>
            <motion.p variants={iv} className="text-white/60 text-lg leading-relaxed max-w-xl">{personalInfo.description}</motion.p>
            <motion.div variants={iv} className="flex flex-wrap gap-4 mt-2">
              <Link href="#projects" className="btn-primary"><span className="relative z-10 flex items-center gap-2">View My Work <ExternalLink className="w-4 h-4" /></span></Link>
              <a href={personalInfo.resumeUrl} download className="btn-outline flex items-center gap-2"><Download className="w-4 h-4" />Resume</a>
            </motion.div>
            <motion.div variants={iv} className="flex items-center gap-5 mt-2">
              {socials.map(({href,icon:Icon,label}) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white/40 hover:text-white transition-all duration-300 hover:scale-110"><Icon className="w-5 h-5" /></a>
              ))}
            </motion.div>
            <motion.div variants={iv} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {stats.map(s => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}{s.suffix}</div>
                  <div className="text-xs text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{opacity:0,x:60}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.5}} className="hidden lg:flex justify-center items-center">
            <div ref={codeRef} className="relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30" style={{background:'linear-gradient(135deg,#5667ff,#d926ec)'}} />
              <div className="relative glass-card p-6 font-mono text-sm leading-7 max-w-md">
                <div className="flex gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-white/30 text-xs self-center">profile.dart</span>
                </div>
                <div className="space-y-1">
                  <p><span className="text-pink-400">class</span> <span className="text-yellow-300">SeniorFlutterEngineer</span> {'{'}</p>
                  <p className="pl-4"><span className="text-blue-400">final</span> <span className="text-green-400">String</span> name = <span className="text-orange-300">'Avinash Reddy K'</span>;</p>
                  <p className="pl-4"><span className="text-blue-400">final</span> <span className="text-green-400">int</span> yoe = <span className="text-purple-400">7</span>;</p>
                  <p className="pl-4"><span className="text-blue-400">final</span> <span className="text-green-400">String</span> stack = <span className="text-orange-300">'Flutter'</span>;</p>
                  <p className="pl-4"></p>
                  <p className="pl-4"><span className="text-blue-400">String</span> get philosophy =&gt;</p>
                  <p className="pl-8"><span className="text-orange-300">'Ship. Scale. Lead.'</span>;</p>
                  <p>{'}'}</p>
                </div>
                <motion.span className="inline-block w-2 h-5 bg-primary-400 ml-1 align-middle" animate={{opacity:[1,0,1]}} transition={{duration:1,repeat:Infinity}} />
                <motion.div className="absolute -top-4 -right-4 glass-card px-3 py-1 text-xs text-green-400 border border-green-400/30" animate={{y:[0,-6,0]}} transition={{duration:3,repeat:Infinity}}>
                  {'✓ Production Ready'}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30" animate={{y:[0,8,0]}} transition={{duration:2,repeat:Infinity}}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
