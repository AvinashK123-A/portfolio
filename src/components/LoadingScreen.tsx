'use client';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
export default function LoadingScreen() {
  return (
    <motion.div key="loading" initial={{opacity:1}} exit={{opacity:0,scale:1.05}} transition={{duration:0.5}} className="loading-screen fixed inset-0 z-[200] flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-20" style={{background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(86,103,255,0.4) 0%, transparent 70%)'}} />
      <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.5}} className="relative z-10 flex flex-col items-center gap-6">
        <motion.div className="relative" animate={{rotate:[0,0,360]}} transition={{duration:2,times:[0,0.7,1],repeat:Infinity,repeatDelay:1}}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
            <Code2 className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <motion.div className="text-center" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
          <p className="text-2xl font-bold gradient-text">Avinash Reddy K</p>
          <p className="text-white/50 text-sm font-mono mt-1">Senior Flutter Engineer</p>
        </motion.div>
        <motion.div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary-500 to-accent-500" initial={{width:'0%'}} animate={{width:'100%'}} transition={{duration:1.2,ease:'easeInOut',delay:0.2}} />
        </motion.div>
        <div className="flex gap-2">
          {[0,1,2].map(i=>(
            <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-400" animate={{opacity:[0.3,1,0.3],scale:[0.8,1.2,0.8]}} transition={{duration:0.8,delay:i*0.15,repeat:Infinity}} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
