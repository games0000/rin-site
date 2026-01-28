"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useRef, useState, MouseEvent } from "react";

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
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white/20">
      
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <motion.div style={{ scale: heroScale }} className="relative z-10 text-center">
          <h1 className="text-[12vw] font-bold leading-none tracking-tighter mix-blend-difference">
            RIN&apos;S
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">SPACE</span>
          </h1>
        </motion.div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </motion.section>

      {/* Plans Section - Hover Expand Cards */}
      <SectionWrapper title="LATEST PLANS" subtitle="Blueprints for the future" href="/plan">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px] md:h-[500px]">
          {recentPlans.map((plan, i) => (
            <ExpandableCard key={plan.id} item={plan} index={i} color="from-blue-500/20" />
          ))}
        </div>
      </SectionWrapper>

      {/* Notes Section - Magnetic List */}
      <SectionWrapper title="RECENT NOTES" subtitle="Fragments of thought" href="/notes" dark>
        <div className="flex flex-col gap-2">
          {recentNotes.map((note, i) => (
            <MagneticListItem key={note.id} item={note} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Letters Section - Parallax Cards */}
      <SectionWrapper title="LETTERS" subtitle="Messages sent to the void" href="/letter">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-12">
          {recentLetters.map((letter, i) => (
            <ParallaxCard key={letter.id} item={letter} index={i} />
          ))}
        </div>
      </SectionWrapper>

      <footer className="h-[50vh] flex items-center justify-center border-t border-white/10">
        <h2 className="text-9xl font-serif text-white/5 font-bold tracking-widest">END</h2>
      </footer>
    </main>
  );
}

function SectionWrapper({ children, title, subtitle, href, dark }: { children: React.ReactNode, title: string, subtitle: string, href: string, dark?: boolean }) {
  return (
    <section className={`py-32 px-6 md:px-12 border-t border-white/10 ${dark ? 'bg-[#050505]' : 'bg-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">{title}</h2>
            <p className="text-xl text-white/40 font-mono">{subtitle}</p>
          </div>
          <Link href={href} className="hidden md:block px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
            View All
          </Link>
        </div>
        {children}
        <div className="md:hidden mt-12 text-center">
          <Link href={href} className="inline-block px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

// 1. Expandable Card (Plans)
function ExpandableCard({ item, index, color }: { item: Post, index: number, color: string }) {
  return (
    <Link href={item.link} className="relative group h-full">
      <motion.div 
        className="h-full w-full bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative"
        whileHover={{ flex: 2 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">{item.date}</span>
            <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
          </div>
          <h3 className="text-3xl font-bold leading-tight mb-2">{item.title}</h3>
        </div>

        <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="text-white/70 line-clamp-4">{item.excerpt}</p>
        </div>
      </motion.div>
    </Link>
  );
}

// 2. Magnetic List Item (Notes)
function MagneticListItem({ item, index }: { item: Post, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.1);
    y.set((clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={item.link}>
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x, y }}
        className="group relative py-8 border-b border-white/10 hover:border-white/30 transition-colors cursor-pointer"
      >
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h3 className="text-4xl font-medium group-hover:pl-4 transition-all duration-300">{item.title}</h3>
          <span className="font-mono text-white/40 group-hover:text-white/60 transition-colors">{item.date}</span>
        </div>
        <motion.div 
          className="absolute bottom-0 left-0 h-px bg-white w-0 group-hover:w-full transition-all duration-500"
        />
      </motion.div>
    </Link>
  );
}

// 3. Parallax Card (Letters)
function ParallaxCard({ item, index }: { item: Post, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, index * -50]);

  return (
    <Link href={item.link} className="block w-full md:w-1/3">
      <motion.div 
        ref={ref}
        style={{ y }}
        className="bg-[#111] p-10 aspect-[3/4] rounded-sm flex flex-col justify-between hover:bg-[#1a1a1a] transition-colors border border-white/5 hover:border-white/20 group"
      >
        <div>
          <span className="block font-serif italic text-white/30 text-lg mb-6 group-hover:text-white/50 transition-colors">Dear Reader,</span>
          <h3 className="text-3xl font-bold leading-tight mb-4">{item.title}</h3>
          <p className="text-white/50 line-clamp-6 font-serif leading-relaxed">
            {item.excerpt}
          </p>
        </div>
        
        <div className="flex justify-between items-end border-t border-white/10 pt-6">
          <span className="font-mono text-xs text-white/30">{item.date}</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            →
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
