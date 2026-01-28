"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  type?: string;
}

interface HomeClientProps {
  recentPlans: Post[];
  recentNotes: Post[];
  recentLetters: Post[];
}

export default function HomeClient({ recentPlans, recentNotes, recentLetters }: HomeClientProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Combine all posts into one array
  const allPosts = [
    ...recentPlans.map(p => ({ ...p, type: 'Plan' })),
    ...recentNotes.map(p => ({ ...p, type: 'Note' })),
    ...recentLetters.map(p => ({ ...p, type: 'Letter' }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="relative bg-black min-h-screen text-white overflow-hidden selection:bg-white/20">
      {/* Noise Texture */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 h-[80vh] flex flex-col items-center justify-center text-center px-4"
      >
        <div className="relative">
          <motion.h1 
            className="text-[15vw] md:text-[12vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20"
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            RIN&apos;S
          </motion.h1>
          <motion.h1 
            className="text-[15vw] md:text-[12vw] leading-none font-bold tracking-tighter text-white mix-blend-difference mt-[-2vw]"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          >
            SPACE
          </motion.h1>
          
          {/* Glitch Effect Element */}
          <motion.div 
            className="absolute inset-0 text-[15vw] md:text-[12vw] font-bold tracking-tighter text-red-500/20 mix-blend-screen pointer-events-none"
            animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 3, repeatDelay: 5 }}
          >
            RIN&apos;S
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 flex flex-col md:flex-row gap-6 md:gap-12 text-sm md:text-base font-mono uppercase tracking-widest text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>Digital Garden</span>
          <span className="hidden md:inline">•</span>
          <span>Playground</span>
          <span className="hidden md:inline">•</span>
          <span>Thoughts</span>
        </motion.div>
      </motion.section>

      {/* Horizontal Scroll Section */}
      <section className="relative z-20 pb-32">
        <div className="mb-12 px-6 md:px-12 flex items-baseline justify-between max-w-[1920px] mx-auto">
          <h2 className="text-4xl font-serif italic text-white/80">Latest Updates</h2>
          <div className="h-px flex-1 bg-white/10 mx-8" />
          <span className="font-mono text-xs text-white/40">SCROLL →</span>
        </div>

        <HorizontalScroll items={allPosts} />
      </section>

      {/* Footer / Contact */}
      <section className="relative z-20 py-32 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6 text-center">
          <Link href="/timeline" className="group inline-flex flex-col items-center">
            <span className="text-lg text-white/40 mb-4 group-hover:text-white transition-colors">Explore the Journey</span>
            <span className="text-6xl md:text-8xl font-serif group-hover:italic transition-all duration-300">Timeline</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function HorizontalScroll({ items }: { items: Post[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={targetRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {items.map((item, i) => (
            <Card key={item.id + i} item={item} index={i} />
          ))}
          {/* End Card */}
          <div className="w-[30vw] md:w-[20vw] h-[60vh] flex items-center justify-center shrink-0">
            <div className="w-px h-32 bg-white/20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Card({ item, index }: { item: Post; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={item.link} className="block group">
      <motion.div 
        className="w-[85vw] md:w-[40vw] h-[60vh] relative shrink-0 bg-[#0A0A0A] border border-white/10 p-8 md:p-12 flex flex-col justify-between transition-colors duration-500 hover:border-white/30 hover:bg-[#111]"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-5xl">↗</span>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-mono px-2 py-1 border border-white/20 rounded-full uppercase tracking-wider text-white/60">
              {item.type}
            </span>
            <span className="text-xs font-mono text-white/40">{item.date}</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6 line-clamp-3 group-hover:text-white/90 transition-colors">
            {item.title}
          </h3>
        </div>

        <div>
          <p className="text-lg text-white/50 font-light line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl">
            {item.excerpt}
          </p>
          
          <div className="mt-8 overflow-hidden">
            <div className={`h-px bg-white/20 w-full transform origin-left transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
