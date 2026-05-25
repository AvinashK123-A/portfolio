'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { PROFILE, CTA_LINKS } from '@/config/profile';

const roles = [
    'Senior Flutter Engineer',
    'Technical Lead',
    'Mobile Architect',
    'Enterprise App Specialist',
  ];

const stats = [
  { value: 7, suffix: '+', label: 'Years Experience', icon: '🚀' },
  { value: 500, suffix: 'K+', label: 'Users Impacted', icon: '👥' },
  { value: 10, suffix: '+', label: 'Team Members Mentored', icon: '🎯' },
  { value: 50, suffix: '+', label: 'Institutions Served', icon: '🏛️' },
  ];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1800;
        const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplayed(Math.floor(eased * value));
                if (progress < 1) requestAnimationFrame(step);
                else setDisplayed(value);
        };
        requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{displayed}{suffix}</span>;
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
    const [roleIndex, setRoleIndex] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
        const interval = setInterval(() => {
                setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2500);
        return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.08);
        mouseY.set((e.clientY - centerY) * 0.08);
  };

  const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
  };

  return (
        <section id="about" ref={sectionRef} className="section-padding relative bg-dark-950 overflow-hidden">
          {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl" />
                      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/6 rounded-full blur-3xl" />
              </div>
        
              <div className="container-custom relative z-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                      
                        {/* LEFT: Profile Image */}
                                <motion.div
                                              className="flex justify-center lg:justify-end"
                                              initial={{ opacity: 0, x: -60 }}
                                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                                              transition={{ duration: 0.8, ease: 'easeOut' }}
                                              onMouseMove={handleMouseMove}
                                              onMouseLeave={handleMouseLeave}
                                            >
                                            <motion.div
                                                            style={{ x: springX, y: springY }}
                                                            className="relative group"
                                                            animate={{ y: [0, -12, 0] }}
                                                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                                          >
                                              {/* Outer animated glow ring */}
                                                          <motion.div
                                                                            className="absolute inset-0 rounded-3xl"
                                                                            animate={{
                                                                                                boxShadow: [
                                                                                                                      '0 0 30px rgba(86,103,255,0.3), 0 0 60px rgba(86,103,255,0.15)',
                                                                                                                      '0 0 50px rgba(217,38,236,0.4), 0 0 80px rgba(217,38,236,0.2)',
                                                                                                                      '0 0 30px rgba(86,103,255,0.3), 0 0 60px rgba(86,103,255,0.15)',
                                                                                                                    ],
                                                                            }}
                                                                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                                                          />
                                              {/* Glassmorphism border frame */}
                                                          <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl p-[2px] overflow-hidden"
                                                                            style={{
                                                                                                background: 'linear-gradient(135deg, rgba(86,103,255,0.6) 0%, rgba(217,38,236,0.4) 50%, rgba(86,103,255,0.3) 100%)',
                                                                                                boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
                                                                            }}
                                                                          >
                                                                          <div className="w-full h-full rounded-3xl overflow-hidden backdrop-blur-sm bg-dark-950/30">
                                                                                            <img
                                                                                                                  src={PROFILE.profileImage}
                                                                                                                  alt={PROFILE.profileImageAlt}
                                                                                                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                                                                                  onError={(e) => {
                                                                                                                                          const t = e.target as HTMLImageElement;
                                                                                                                                          t.src = 'https://ui-avatars.com/api/?name=Avinash+Reddy&background=5667ff&color=fff&size=400';
                                                                                                                    }}
                                                                                                                />
                                                                          </div>
                                                          </div>
                                              {/* Floating badge */}
                                                          <motion.div
                                                                            className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl border border-green-400/30"
                                                                            initial={{ scale: 0 }}
                                                                            animate={isInView ? { scale: 1 } : {}}
                                                                            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                                                                          >
                                                                          <div className="flex items-center gap-2 text-sm">
                                                                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                                                            <span className="text-green-400 font-medium">Available</span>
                                                                          </div>
                                                          </motion.div>
                                              {/* Experience badge */}
                                                          <motion.div
                                                                            className="absolute -top-4 -left-4 glass-card px-4 py-2 rounded-xl border border-primary-500/30"
                                                                            initial={{ scale: 0 }}
                                                                            animate={isInView ? { scale: 1 } : {}}
                                                                            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                                                                          >
                                                                          <div className="text-center">
                                                                                            <div className="text-primary-400 font-bold text-lg leading-none">7+</div>
                                                                                            <div className="text-white/60 text-xs">Years</div>
                                                                          </div>
                                                          </motion.div>
                                            </motion.div>
                                </motion.div>
                      
                        {/* RIGHT: Content */}
                                <motion.div
                                              className="space-y-7"
                                              initial={{ opacity: 0, x: 60 }}
                                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                                              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                                            >
                                  {/* Tag */}
                                            <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                            transition={{ delay: 0.2 }}
                                                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10"
                                                          >
                                                          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                                                          <span className="text-primary-300 text-sm font-mono tracking-widest uppercase">About Me</span>
                                            </motion.div>
                                
                                  {/* Name */}
                                            <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                            transition={{ delay: 0.3 }}
                                                          >
                                                          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                                                                          Avinash Reddy<br />
                                                                          <span className="gradient-text">Kommareddy</span>
                                                          </h2>
                                              {/* Animated role switcher */}
                                                          <div className="h-9 overflow-hidden relative">
                                                            {roles.map((role, i) => (
                                                                              <motion.p
                                                                                                    key={role}
                                                                                                    className="text-xl font-semibold text-accent-400 absolute"
                                                                                                    initial={{ opacity: 0, y: 24 }}
                                                                                                    animate={{
                                                                                                                            opacity: i === roleIndex ? 1 : 0,
                                                                                                                            y: i === roleIndex ? 0 : -24,
                                                                                                      }}
                                                                                                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                                                                                                  >
                                                                                {role}
                                                                              </motion.p>
                                                                            ))}
                                                          </div>
                                            </motion.div>
                                
                                  {/* Description */}
                                            <motion.p
                                                            className="text-white/70 text-base leading-relaxed"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                            transition={{ delay: 0.4 }}
                                                          >
                                                          7+ years of experience building enterprise-grade cross-platform applications across aviation, banking, marine operations, education and healthcare domains.
                                                          Specialized in Flutter architecture, scalable systems, real-time applications and leading engineering teams.
                                            </motion.p>
                                
                                  {/* Stats Grid */}
                                            <motion.div
                                                            className="grid grid-cols-2 gap-3"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                            transition={{ delay: 0.5 }}
                                                          >
                                              {stats.map((stat, i) => (
                                                                            <motion.div
                                                                                                key={stat.label}
                                                                                                className="glass-card p-4 rounded-xl border border-white/10 hover:border-primary-500/40 transition-all duration-300 group"
                                                                                                initial={{ opacity: 0, y: 20 }}
                                                                                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                                                                transition={{ delay: 0.55 + i * 0.08 }}
                                                                                                whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(86,103,255,0.2)' }}
                                                                                              >
                                                                                              <div className="flex items-center gap-3">
                                                                                                                  <span className="text-2xl">{stat.icon}</span>
                                                                                                                  <div>
                                                                                                                                        <div className="text-2xl font-bold text-primary-400 leading-none">
                                                                                                                                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                                                                                                                          </div>
                                                                                                                                        <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                                                                                                                    </div>
                                                                                                </div>
                                                                            </motion.div>
                                                                          ))}
                                            </motion.div>
                                
                                  {/* CTA Buttons */}
                                            <motion.div
                                                            className="flex flex-wrap gap-3 pt-2"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                            transition={{ delay: 0.7 }}
                                                          >
                                                          <a
                                                                            href={CTA_LINKS.githubProfile}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="btn-outline text-sm px-6 py-2.5"
                                                                          >
                                                                          GitHub Profile
                                                          </a>
                                                          <a
                                                                            href={CTA_LINKS.linkedin}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="btn-outline text-sm px-6 py-2.5"
                                                                          >
                                                                          LinkedIn
                                                          </a>
                                                          <a
                                                                            href="/resume/Avinash_Reddy_Resume.pdf"
                                                                            download="Avinash_Reddy_Resume.pdf"
                                                                            className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
                                                                          >
                                                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                          </svg>
                                                                          Download Resume
                                                          </a>
                                            </motion.div>
                                </motion.div>
                      </div>
              </div>
        </section>
      );
}
