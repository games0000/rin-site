"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

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
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/20">
      
      {/* 1. Hero Section (Restored) */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/[0.02] rounded-full blur-[100px] animate-pulse-slow" />
        </div>

        <div className="relative z-10 text-center mix-blend-difference">
          <motion.h1 
            className="text-[12vw] font-bold leading-none tracking-tighter"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            RIN&apos;S SPACE
          </motion.h1>
          <motion.div 
            className="mt-8 flex gap-8 justify-center text-xs md:text-sm font-mono text-white/40 uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span>Digital Garden</span>
            <span>•</span>
            <span>Playground</span>
            <span>•</span>
            <span>Archive</span>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.section>

      {/* 2. Letter to Visitors */}
      <section className="py-32 md:py-48 px-6 md:px-12 max-w-4xl mx-auto relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="md:pl-12"
        >
          <span className="block font-mono text-xs text-white/40 mb-8 tracking-widest uppercase">To The Visitor</span>
          <h2 className="text-3xl md:text-5xl font-serif italic leading-tight text-white/90 mb-8">
            "Welcome to this fragment of the internet. Here lies a collection of my thoughts, future plans, and letters sent to the void."
          </h2>
          <p className="text-white/50 leading-relaxed font-light max-w-2xl">
            This space is designed as a digital garden — a place where ideas are planted, nurtured, and allowed to grow wild. Feel free to explore the archives, read through the blueprints of my projects, or simply wander through the timeline of events.
          </p>
          
          <div className="mt-12 flex items-center gap-4">
             <div className="h-px w-12 bg-white/20" />
             <span className="font-mono text-xs text-white/30">Rin Tateishi</span>
          </div>
        </motion.div>
      </section>

      {/* 3. The Three Sections (Accordion) */}
      <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <motion.div 
          className="h-[600px] flex flex-col md:flex-row gap-2 md:gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AccordionSection 
            id="plans" 
            title="PLANS" 
            subtitle="Blueprints" 
            data={recentPlans} 
            color="bg-white/5" 
            hoverColor="hover:bg-cyan-900/20"
            accent="text-cyan-400"
          />
          <AccordionSection 
            id="notes" 
            title="NOTES" 
            subtitle="Thoughts" 
            data={recentNotes} 
            color="bg-white/5" 
            hoverColor="hover:bg-purple-900/20"
            accent="text-purple-400"
          />
          <AccordionSection 
            id="letters" 
            title="LETTERS" 
            subtitle="Transmissions" 
            data={recentLetters} 
            color="bg-white/5" 
            hoverColor="hover:bg-amber-900/20"
            accent="text-amber-400"
          />
        </motion.div>
      </section>

      <footer className="py-24 text-center border-t border-white/5 bg-black mt-12">
        <h2 className="text-[15vw] font-bold text-[#111] leading-none tracking-tighter select-none">END</h2>
        <p className="text-xs text-white/20 font-mono mt-8">© 2026 RIN&apos;S SPACE</p>
      </footer>
    </main>
  );
}

function AccordionSection({ id, title, subtitle, data, color, hoverColor, accent }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden flex flex-col ${color} ${hoverColor} transition-colors duration-500 cursor-pointer border border-white/5 group`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ flex: isHovered ? 2 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* Header */}
      <div className="p-8 flex justify-between items-start relative z-10">
        <div>
          <span className={`text-[10px] font-mono uppercase tracking-widest opacity-60 ${accent} block mb-2`}>
            {subtitle}
          </span>
          <h3 className="text-3xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
            {title}
          </h3>
        </div>
        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center ${accent} opacity-50 group-hover:opacity-100 group-hover:bg-white/10 transition-all`}>
          ↗
        </div>
      </div>

      {/* Content List (Visible on Hover/Expand) */}
      <div className="flex-1 p-8 pt-0 overflow-hidden relative">
        <motion.div 
          className="flex flex-col gap-4 h-full"
          animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4 }}
        >
          {data.slice(0, 3).map((item: any, i: number) => (
            <Link key={item.id} href={item.link} className="block group/item">
              <div className="py-4 border-b border-white/5 group-hover/item:border-white/20 transition-colors">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-lg font-medium text-white/70 group-hover/item:text-white truncate pr-4 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono text-white/20 shrink-0">
                    {item.date}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          
          <div className="mt-auto pt-8">
            <Link 
              href={`/${id === 'plans' ? 'plan' : id === 'notes' ? 'notes' : 'letter'}`}
              className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${accent} hover:opacity-80`}
            >
              Explore All {title} →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hover Glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-${accent.split('-')[1]}-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
    </motion.div>
  );
}
