"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="bg-[#EBEBEB] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#FF3333] selection:text-white relative">
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-between p-6 pt-32 relative border-b-2 border-[#1A1A1A]">
        <div className="max-w-[90vw] relative z-10">
          <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase text-[#1A1A1A]">
            <span className="block overflow-hidden">
              <StaggerText text="Digital" delay={0} />
            </span>
            <span className="block overflow-hidden">
              <StaggerText text="Garden" delay={0.2} className="pl-[10vw] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3333] to-[#FF0000]" />
            </span>
            <span className="block overflow-hidden">
              <StaggerText text="Archive" delay={0.4} className="text-right" />
            </span>
          </h1>
        </div>

        <div className="flex justify-between items-end pb-4">
          <div className="font-mono text-xs font-medium leading-relaxed opacity-60">
            [ EST. 2026 ]<br/>
            [ TOKYO, JP ]
          </div>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-2 border-[#1A1A1A] rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest"
          >
            Scroll
          </motion.div>
        </div>
      </section>

      {/* Letter to Visitor - Expandable */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#1A1A1A]">
        <div className="col-span-1 md:col-span-4 p-8 md:p-16 border-b-2 md:border-b-0 md:border-r-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#EBEBEB]">
          <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tighter mb-8 font-sans">
            HELLO<br/>WORLD
          </h2>
          <div className="w-16 h-2 bg-[#FF3333] mb-8" />
          <p className="font-mono text-sm leading-relaxed opacity-80">
            // A DIGITAL FRAGMENT<br/>
            // LOST IN THE VOID
          </p>
        </div>
        
        <LetterContent />
        
      </section>

      {/* Distinct Sections Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 bg-[#1A1A1A] gap-[2px]">
        
        {/* Plans: Technical / Monospace */}
        <div className="bg-[#EBEBEB] flex flex-col h-full">
          <div className="p-6 border-b-2 border-[#1A1A1A] bg-[#EBEBEB] sticky top-0 z-10 flex justify-between items-center">
            <h3 className="text-xl font-mono font-bold uppercase tracking-tighter">
              01_PLANS
            </h3>
            <div className="w-3 h-3 bg-[#FF3333]" />
          </div>
          <div className="flex-1 flex flex-col font-mono">
            {recentPlans.slice(0, 3).map((item, i) => (
              <PlanItem key={item.id} item={item} index={i} />
            ))}
            <Link href="/plan" className="mt-auto p-8 border-t-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EBEBEB] transition-colors uppercase text-sm font-bold tracking-widest text-center">
              [ View All Blueprints ]
            </Link>
          </div>
        </div>

        {/* Notes: Editorial / Serif */}
        <div className="bg-[#E5E5E5] flex flex-col h-full">
          <div className="p-6 border-b-2 border-[#1A1A1A] bg-[#E5E5E5] sticky top-0 z-10 flex justify-between items-center">
            <h3 className="text-2xl font-serif italic font-bold">
              02. Notes
            </h3>
            <div className="w-3 h-3 rounded-full bg-[#1A1A1A]" />
          </div>
          <div className="flex-1 flex flex-col font-serif">
            {recentNotes.slice(0, 3).map((item, i) => (
              <NoteItem key={item.id} item={item} index={i} />
            ))}
            <Link href="/notes" className="mt-auto p-8 border-t-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EBEBEB] transition-colors italic text-lg font-medium text-center">
              Read all thoughts →
            </Link>
          </div>
        </div>

        {/* Letters: Humanist / Sans */}
        <div className="bg-[#EBEBEB] flex flex-col h-full">
          <div className="p-6 border-b-2 border-[#1A1A1A] bg-[#EBEBEB] sticky top-0 z-10 flex justify-between items-center">
            <h3 className="text-xl font-sans font-black uppercase tracking-tight">
              03 LETTERS
            </h3>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#1A1A1A]" />
          </div>
          <div className="flex-1 flex flex-col font-sans">
            {recentLetters.slice(0, 3).map((item, i) => (
              <LetterItem key={item.id} item={item} index={i} />
            ))}
            <Link href="/letter" className="mt-auto p-8 border-t-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EBEBEB] transition-colors font-bold text-sm tracking-wide text-center">
              OPEN ARCHIVE
            </Link>
          </div>
        </div>

      </section>

      {/* Marquee Footer */}
      <footer className="bg-[#FF3333] text-white overflow-hidden py-6 border-t-2 border-[#1A1A1A]">
        <motion.div 
          className="whitespace-nowrap flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[8vw] font-black uppercase tracking-tighter leading-none mx-8 mix-blend-overlay">
              Rin&apos;s Digital Space — Est. 2026 — 
            </span>
          ))}
        </motion.div>
      </footer>
    </div>
  );
}

// Helper for Staggered Text Reveal
function StaggerText({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  return (
    <motion.span 
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
        hidden: {}
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12, stiffness: 200 } },
            hidden: { y: "100%", opacity: 0 }
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function LetterContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="col-span-1 md:col-span-8 p-8 md:p-16 flex flex-col justify-center bg-[#EBEBEB] relative">
      <motion.div 
        animate={{ height: expanded ? "auto" : "200px" }} 
        className="overflow-hidden relative"
      >
        <p className="text-2xl md:text-4xl font-serif italic font-light leading-tight text-[#1A1A1A]">
          "Welcome to this fragment of the internet. Here lies a collection of my thoughts, future plans, and letters sent to the void."
        </p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-lg font-serif leading-relaxed text-[#1A1A1A]/80 max-w-3xl"
            >
              {/* Typewriter Effect Content */}
              <TypewriterText text="This space is not designed to be efficient or optimized for engagement. It is a quiet corner where I can document my journey, successes, and failures without the noise of social media algorithms." />
              <div className="h-4" />
              <TypewriterText text="Whether you are here to explore my technical blueprints, read my personal reflections, or just wander through the timeline of events, I hope you find something that resonates with you." delay={2} />
              <div className="h-4" />
              <TypewriterText text="Take your time. There is no rush here." delay={4} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Gradient Fade for Collapsed State */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#EBEBEB] to-transparent pointer-events-none" />
        )}
      </motion.div>

      <div className="mt-8 flex items-center justify-between border-t border-[#1A1A1A]/20 pt-8">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-bold uppercase tracking-widest hover:text-[#FF3333] transition-colors flex items-center gap-2"
        >
          {expanded ? "Read Less [-]" : "Read More [+]"}
        </button>
        
        <div className="flex items-center gap-4">
           <div className="h-px w-12 bg-[#1A1A1A]" />
           <span className="font-bold uppercase tracking-widest text-xs font-sans">荼蘼</span>
        </div>
      </div>
    </div>
  );
}

// Helper for Typewriter Effect
function TypewriterText({ text, delay = 0 }: { text: string, delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: delay + i * 0.05 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

// 1. Plan Item (Technical, Monospace) - Slide Effect
function PlanItem({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link} className="group relative block border-b border-[#1A1A1A] last:border-b-0 overflow-hidden cursor-pointer">
      {/* Sliding Background */}
      <div className="absolute inset-0 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      
      <div className="p-6 relative z-10 transition-colors duration-300 group-hover:text-[#00FF00]">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs opacity-60">ID: {item.date.replace(/-/g, '')}</span>
          <span className="text-xs opacity-0 group-hover:opacity-100">::INIT</span>
        </div>
        <h4 className="text-sm font-bold uppercase leading-relaxed mb-2">
          {item.title}
        </h4>
        <p className="text-xs opacity-50 line-clamp-2">
          {item.excerpt}
        </p>
      </div>
    </Link>
  );
}

// 2. Note Item (Elegant, Serif) - Slide Effect
function NoteItem({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link} className="group relative block border-b border-[#1A1A1A] last:border-b-0 overflow-hidden cursor-pointer">
      {/* Sliding Background */}
      <div className="absolute inset-0 bg-[#1A1A1A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />

      <div className="p-8 relative z-10 transition-colors duration-500 group-hover:text-white">
        <span className="block text-xs italic opacity-50 mb-2 group-hover:text-[#FF3333] transition-colors">
          {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </span>
        <h4 className="text-2xl font-light leading-tight mb-4 group-hover:italic">
          {item.title}
        </h4>
        <p className="text-sm opacity-60 line-clamp-2 font-sans">
          {item.excerpt}
        </p>
      </div>
    </Link>
  );
}

// 3. Letter Item (Bold, Sans) - Slide Effect
function LetterItem({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link} className="group relative block border-b border-[#1A1A1A] last:border-b-0 overflow-hidden cursor-pointer">
      {/* Sliding Background */}
      <div className="absolute inset-0 bg-[#FF3333] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />

      <div className="p-6 relative z-10 transition-colors duration-300 group-hover:text-white">
        <div className="flex gap-2 items-center mb-3">
          <div className="w-2 h-2 rounded-full bg-[#1A1A1A] group-hover:bg-white transition-colors" />
          <span className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">
            Transmission
          </span>
        </div>
        <h4 className="text-xl font-black uppercase leading-none mb-3 tracking-tight">
          {item.title}
        </h4>
        <div className="h-1 w-8 bg-[#1A1A1A] group-hover:bg-white group-hover:w-full transition-all duration-500 mb-3" />
        <p className="text-xs font-medium leading-relaxed opacity-70">
          {item.excerpt}
        </p>
      </div>
    </Link>
  );
}
