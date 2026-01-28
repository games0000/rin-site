"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect, MouseEvent } from "react";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

interface HomeClientProps {
  recentPlans: Post[];
  recentNotes: Post[];
  recentLetters: Post[];
}

export default function HomeClient({ recentPlans, recentNotes, recentLetters }: HomeClientProps) {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.5]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroBlur = useTransform(scrollY, [0, 400], ["0px", "20px"]);

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-cyan-500/30">
      
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden perspective-1000"
        style={{ opacity: heroOpacity }}
      >
        <motion.div 
          style={{ scale: heroScale, filter: heroBlur }} 
          className="relative z-10 text-center mix-blend-screen"
        >
          <h1 className="text-[15vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-transparent animate-pulse-slow">
            RIN&apos;S
          </h1>
          <h1 className="text-[15vw] font-bold leading-none tracking-tighter mt-[-4vw] text-white/10 blur-sm absolute top-full left-0 right-0 transform scale-y-[-1] opacity-50">
            RIN&apos;S
          </h1>
          <motion.div 
            className="text-[4vw] font-mono tracking-[1em] text-cyan-400/80 mt-8 uppercase"
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "1em" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            Space
          </motion.div>
        </motion.div>
        
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_100deg,#0ff_140deg,transparent_180deg)] animate-spin-slow opacity-10 blur-[100px]" />
           <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_180deg,transparent_0deg,transparent_100deg,#f0f_140deg,transparent_180deg)] animate-spin-reverse-slow opacity-10 blur-[100px]" />
        </div>
      </motion.section>

      {/* Plans Section: Holographic Scanner */}
      <SectionWrapper title="BLUEPRINTS" subtitle="Constructing Reality">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPlans.map((plan, i) => (
            <ScanCard key={plan.id} item={plan} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Notes Section: Nebula Field */}
      <SectionWrapper title="THOUGHT STREAM" subtitle="Consciousness Fragments" dark>
        <div className="flex flex-col gap-6 relative">
          {recentNotes.map((note, i) => (
            <NebulaItem key={note.id} item={note} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Letters Section: Cinematic Portals */}
      <SectionWrapper title="TRANSMISSIONS" subtitle="Signals to the Void">
        <div className="space-y-24 py-12">
          {recentLetters.map((letter, i) => (
            <CinematicCard key={letter.id} item={letter} index={i} />
          ))}
        </div>
      </SectionWrapper>

      <footer className="h-[50vh] flex items-center justify-center border-t border-white/5 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#222,transparent)]" />
        <h2 className="text-[20vw] font-bold text-[#111] tracking-tighter select-none">END</h2>
      </footer>
    </main>
  );
}

function SectionWrapper({ children, title, subtitle, dark }: { children: React.ReactNode, title: string, subtitle: string, dark?: boolean }) {
  return (
    <section className={`py-40 px-6 md:px-12 relative overflow-hidden ${dark ? 'bg-black' : 'bg-[#080808]'}`}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-start mb-24">
          <motion.h2 
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-800"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-cyan-500 mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="text-xl text-white/40 font-mono uppercase tracking-widest">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

// 1. ScanCard (Plans) - Holographic Scanning Effect
function ScanCard({ item, index }: { item: Post, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={item.link} className="block relative group">
      <motion.div 
        className="relative h-[400px] bg-[#111] rounded-xl overflow-hidden border border-white/5 transition-colors duration-500"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Grid */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-30' : 'opacity-10'}`}>
           <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,.3)_25%,rgba(0,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,255,.3)_75%,rgba(0,255,255,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,255,.3)_25%,rgba(0,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,255,.3)_75%,rgba(0,255,255,.3)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
        </div>

        {/* Scanning Beam */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[20%] w-full pointer-events-none transition-transform duration-[2s] ease-linear ${isHovered ? 'translate-y-[400%]' : '-translate-y-full'}`} />

        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-xs text-cyan-400 border border-cyan-900/50 bg-cyan-900/10 px-2 py-1 rounded">
                PLAN-{item.date.replace(/-/g, '')}
              </span>
              <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-cyan-400 shadow-[0_0_10px_#0ff]' : 'bg-white/20'} transition-all duration-300`} />
            </div>
            <h3 className="text-3xl font-bold leading-tight mb-4 group-hover:text-cyan-50 transition-colors">
              {item.title}
            </h3>
          </div>
          
          <div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
              {item.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/60 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
              <span>Initiate Protocol</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// 2. NebulaItem (Notes) - Interactive Gas Cloud
function NebulaItem({ item, index }: { item: Post, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
  };

  return (
    <Link href={item.link}>
      <motion.div 
        className="relative py-12 px-8 border-b border-white/5 group overflow-hidden rounded-2xl transition-all duration-500 hover:border-white/0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        {/* The Nebula Gradient Follower */}
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(100,50,255,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[50px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: x, 
            top: y,
            opacity 
          }}
        />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h3 className="text-5xl md:text-6xl font-bold text-white/40 group-hover:text-white transition-colors duration-500 mix-blend-overlay">
            {item.title}
          </h3>
          <span className="font-mono text-sm text-white/20 group-hover:text-white/60 transition-colors">
            {item.date}
          </span>
        </div>

        <motion.p 
          className="relative z-10 mt-4 text-lg text-white/30 max-w-2xl group-hover:text-white/70 transition-colors duration-500"
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: 'auto', opacity: 1 }}
        >
          {item.excerpt}
        </motion.p>
      </motion.div>
    </Link>
  );
}

// 3. CinematicCard (Letters) - Video-like Focus
function CinematicCard({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link} className="block group">
      <motion.div 
        className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-[#111] rounded-3xl overflow-hidden flex items-center justify-center isolate"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 z-0" />
        
        {/* Animated Noise/Grain */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-10 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-20 w-full h-full p-12 flex flex-col md:flex-row items-center justify-between gap-12 group-hover:backdrop-blur-sm transition-all duration-700">
          
          {/* Left: Date & Meta */}
          <div className="hidden md:flex flex-col items-start gap-4 w-1/4">
            <div className="w-12 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-500" />
            <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
              Transmission {index + 1}
            </span>
            <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
              {item.date}
            </span>
          </div>

          {/* Center: Title */}
          <div className="flex-1 text-center">
            <h3 className="text-4xl md:text-7xl font-serif italic text-white/80 group-hover:text-white group-hover:scale-105 transition-all duration-700">
              {item.title}
            </h3>
          </div>

          {/* Right: Excerpt (Reveals on Hover) */}
          <div className="w-full md:w-1/4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <p className="text-white/60 font-serif leading-relaxed text-sm">
              &quot;{item.excerpt}&quot;
            </p>
            <div className="mt-4 text-xs font-mono text-white/30 uppercase tracking-widest">
              Read Transmission →
            </div>
          </div>
        </div>

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10 pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
        
      </motion.div>
    </Link>
  );
}
