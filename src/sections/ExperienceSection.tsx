'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const careerData = [
  {
        id: 1,
        company: 'OTSI',
        fullCompany: 'Object Technology Solutions Inc.',
        title: 'Senior Flutter Engineer',
        period: 'Aug 2025 – Present',
        location: 'Hyderabad, India',
        current: true,
        description:
                'Building mission-critical B2B aviation software for Hyderabad International Airport involving real-time monitoring, airport operations, flight scheduling and enterprise workflows.',
        tags: ['Flutter', 'Real-Time Systems', 'B2B', 'Aviation', 'Enterprise'],
        color: '#5667ff',
  },
  {
        id: 2,
        company: 'Allshore Technologies',
        fullCompany: 'Allshore Technologies',
        title: 'Technical Lead',
        period: 'Nov 2024 – Jul 2025',
        location: 'Hyderabad, India',
        current: false,
        description:
                'Led scalable Flutter architecture, payment integrations, real-time communication and optimized app performance.',
        tags: ['Flutter', 'GetX', 'WebSockets', 'Stripe', 'PayPal', 'Apple Pay'],
        color: '#d926ec',
  },
  {
        id: 3,
        company: 'iGuru Portal Services',
        fullCompany: 'iGuru Portal Services',
        title: 'Technical Lead',
        period: 'Sep 2023 – Oct 2024',
        location: 'Hyderabad, India',
        current: false,
        description:
                'Built school management ecosystem with attendance, GPS tracking and payment solutions deployed across 50+ institutions.',
        tags: ['Flutter', 'Firebase', 'GPS Tracking', 'Razorpay', 'School ERP'],
        color: '#5667ff',
  },
  {
        id: 4,
        company: 'Saudi Aramco',
        fullCompany: 'Saudi Aramco (via Shras IT Solutions)',
        title: 'Senior Flutter Developer',
        period: 'Jan 2023 – Sep 2023',
        location: 'Dammam, Saudi Arabia',
        current: false,
        description:
                'Built offline-first marine operations system for vessel tracking, crew management, pier & rig operations in low-connectivity environments.',
        tags: ['Flutter', 'Hive DB', 'Offline-First', 'Marine Ops', 'BLoC'],
        color: '#d926ec',
  },
  {
        id: 5,
        company: 'Commercial Bank of Qatar',
        fullCompany: 'Commercial Bank of Qatar (via Nair Systems)',
        title: 'Flutter Developer',
        period: 'Apr 2021 – Dec 2022',
        location: 'Al Wakrah, Qatar',
        current: false,
        description:
                'Built retail banking features serving 500K+ users including loans, deposits, insurance, international transfers and wealth management with biometric security.',
        tags: ['Flutter', 'Biometric Auth', 'REST APIs', 'Banking', 'SSL Pinning'],
        color: '#5667ff',
  },
  {
        id: 6,
        company: 'Walltech Software',
        fullCompany: 'Walltech Software Solutions Pvt. Ltd.',
        title: 'Mobile App Developer',
        period: 'Jun 2019 – Mar 2021',
        location: 'Bangalore, India',
        current: false,
        description:
                'Worked on hybrid ecommerce and on-demand applications including VR Deliver and Doorstep Hub, improving native performance through Flutter hybrid framework.',
        tags: ['Flutter', 'React Native', 'E-Commerce', 'On-Demand', 'Firebase'],
        color: '#d926ec',
  },
  ];

function TimelineCard({ entry, index, isInView }: { entry: typeof careerData[0]; index: number; isInView: boolean }) {
    const isLeft = index % 2 === 0;
    return (
          <div className={`relative flex items-start mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-5">
                          <motion.div
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                      transition={{ delay: 0.2 + index * 0.12, type: 'spring', stiffness: 200 }}
                                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                                      style={{
                                                    borderColor: entry.color,
                                                    background: '#0a0b14',
                                                    boxShadow: `0 0 0 4px ${entry.color}30, 0 0 15px ${entry.color}50`,
                                      }}
                                    >
                            {entry.current && (
                                                  <motion.div
                                                                  className="w-2 h-2 rounded-full"
                                                                  style={{ background: entry.color }}
                                                                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                                                                  transition={{ duration: 1.5, repeat: Infinity }}
                                                                />
                                                )}
                          </motion.div>motion.div>
                  </div>div>
          
            {/* Card */}
                <motion.div
                          className={`w-full md:w-[45%] ml-14 md:ml-0 ${isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}
                          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: 'easeOut' }}
                          whileHover={{ y: -5 }}
                        >
                        <div
                                    className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 group"
                                    style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.3)` }}
                                  >
                          {/* Header */}
                                  <div className="flex items-start justify-between gap-3 mb-4">
                                              <div>
                                                            <h3 className="text-lg font-bold text-white mb-1">{entry.title}</h3>h3>
                                                            <p className="font-semibold" style={{ color: entry.color }}>{entry.company}</p>p>
                                                            <p className="text-white/40 text-xs mt-0.5">{entry.fullCompany}</p>p>
                                              </div>div>
                                    {entry.current && (
                                                  <span className="flex-shrink-0 text-xs px-3 py-1 rounded-full bg-green-400/15 text-green-400 border border-green-400/30 whitespace-nowrap">
                                                                  Current
                                                  </span>span>
                                              )}
                                  </div>div>
                        
                          {/* Meta */}
                                  <div className="flex flex-wrap gap-3 text-xs text-white/50 mb-4">
                                              <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5" />{entry.period}
                                              </span>span>
                                              <span className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5" />{entry.location}
                                              </span>span>
                                  </div>div>
                        
                          {/* Description */}
                                  <p className="text-white/65 text-sm leading-relaxed mb-4">{entry.description}</p>p>
                        
                          {/* Tags */}
                                  <div className="flex flex-wrap gap-1.5">
                                    {entry.tags.map((tag) => (
                                                  <span
                                                                    key={tag}
                                                                    className="text-xs px-2.5 py-1 rounded-md border"
                                                                    style={{
                                                                                        background: `${entry.color}12`,
                                                                                        borderColor: `${entry.color}30`,
                                                                                        color: entry.color,
                                                                    }}
                                                                  >
                                                    {tag}
                                                  </span>span>
                                                ))}
                                  </div>div>
                        </div>div>
                </motion.div>motion.div>
          </div>div>
        );
}

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const lineHeight = useTransform(scrollYProgress, [0, 0.9], ['0%', '100%']);
  
    return (
          <section id="experience" ref={sectionRef} className="section-padding relative bg-[#0a0a0a] overflow-hidden">
            {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
                </div>div>
          
                <div className="container-custom relative z-10">
                  {/* Section header */}
                        <motion.div
                                    className="text-center mb-20"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6 }}
                                  >
                                  <span className="text-primary-400 text-sm font-mono tracking-widest uppercase mb-3 block">
                                              // career journey
                                  </span>span>
                                  <h2 className="section-title gradient-text">Career Journey</h2>h2>
                                  <p className="section-subtitle">
                                              7+ years building, shipping and leading Flutter applications at enterprise scale.
                                  </p>p>
                        </motion.div>motion.div>
                
                  {/* Timeline */}
                        <div className="relative max-w-5xl mx-auto">
                          {/* Animated vertical line */}
                                  <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
                                  <motion.div
                                                className="absolute left-6 md:left-1/2 top-0 w-px -translate-x-1/2 origin-top"
                                                style={{
                                                                height: lineHeight,
                                                                background: 'linear-gradient(180deg, #5667ff, #d926ec, #5667ff)',
                                                }}
                                              />
                        
                          {/* Cards */}
                          {careerData.map((entry, index) => (
                        <TimelineCard key={entry.id} entry={entry} index={index} isInView={isInView} />
                      ))}
                        </div>div>
                </div>div>
          </section>section>
        );
}</div>
