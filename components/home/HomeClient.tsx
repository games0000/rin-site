"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
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
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-cyan-500/30 font-sans">
      
      {/* Compact Hero */}
      <motion.section 
        className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mix-blend-difference mb-4">
            RIN&apos;S SPACE
          </h1>
          <div className="flex gap-4 justify-center text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
            <span>Digital Garden</span>
            <span>•</span>
            <span>Archive</span>
          </div>
        </div>
        
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
      </motion.section>

      <div className="max-w-5xl mx-auto px-6 pb-32 space-y-24">
        
        {/* Recent Plans: Compact Grid */}
        <Section title="RECENT PLANS" href="/plan">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPlans.map((plan, i) => (
              <CompactPlanCard key={plan.id} item={plan} index={i} />
            ))}
          </div>
        </Section>

        {/* Recent Notes: Minimal List */}
        <Section title="RECENT NOTES" href="/notes">
          <div className="flex flex-col gap-1">
            {recentNotes.map((note, i) => (
              <CompactNoteItem key={note.id} item={note} index={i} />
            ))}
          </div>
        </Section>

        {/* Recent Letters: Stacked Cards */}
        <Section title="RECENT LETTERS" href="/letter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentLetters.map((letter, i) => (
              <CompactLetterCard key={letter.id} item={letter} index={i} />
            ))}
          </div>
        </Section>

      </div>

      <footer className="py-12 text-center border-t border-white/5 bg-black">
        <p className="text-xs text-white/20 font-mono">END OF TRANSMISSION</p>
      </footer>
    </main>
  );
}

function Section({ children, title, href }: { children: React.ReactNode, title: string, href: string }) {
  return (
    <section>
      <div className="flex justify-between items-baseline mb-8 border-b border-white/10 pb-4">
        <h2 className="text-sm font-mono tracking-widest text-white/60">{title}</h2>
        <Link href={href} className="text-xs text-white/30 hover:text-white transition-colors">
          VIEW ALL →
        </Link>
      </div>
      {children}
    </section>
  );
}

// 1. Compact Plan Card
function CompactPlanCard({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link} className="block group">
      <motion.div 
        className="relative bg-white/5 hover:bg-white/10 rounded-lg p-5 transition-all duration-300 border border-white/5 hover:border-white/20 h-full flex flex-col justify-between overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
      >
        {/* Scanning Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[50%] -translate-y-full group-hover:translate-y-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

        <div>
          <span className="text-[10px] font-mono text-cyan-400/60 mb-2 block">{item.date}</span>
          <h3 className="text-sm font-bold leading-snug mb-3 group-hover:text-cyan-50 transition-colors">
            {item.title}
          </h3>
        </div>
        <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
          {item.excerpt}
        </p>
      </motion.div>
    </Link>
  );
}

// 2. Compact Note Item
function CompactNoteItem({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link}>
      <motion.div 
        className="group flex items-baseline justify-between py-3 px-4 rounded hover:bg-white/5 transition-colors cursor-pointer"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.03 }}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-purple-400 transition-colors shrink-0" />
          <h3 className="text-sm text-white/70 group-hover:text-white truncate transition-colors">
            {item.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 shrink-0 ml-4">
          {item.date}
        </span>
      </motion.div>
    </Link>
  );
}

// 3. Compact Letter Card
function CompactLetterCard({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link} className="block group">
      <motion.div 
        className="aspect-[4/5] bg-[#111] p-6 rounded-sm border border-white/5 hover:border-white/20 transition-all duration-500 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        <div className="h-full flex flex-col justify-between relative z-10">
          <div>
            <span className="block text-[10px] font-mono text-white/30 mb-4 tracking-widest uppercase">
              To: Future Self
            </span>
            <h3 className="text-lg font-serif italic text-white/80 group-hover:text-white transition-colors mb-2 leading-tight">
              {item.title}
            </h3>
            <div className="w-8 h-px bg-white/10 group-hover:w-16 transition-all duration-500 my-4" />
            <p className="text-xs text-white/40 font-serif leading-relaxed line-clamp-4 group-hover:text-white/60 transition-colors">
              {item.excerpt}
            </p>
          </div>
          
          <div className="text-right">
             <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40">
              {item.date}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
