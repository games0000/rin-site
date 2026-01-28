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
}

interface HomeClientProps {
  recentPlans: Post[];
  recentNotes: Post[];
  recentLetters: Post[];
}

export default function HomeClient({ recentPlans, recentNotes, recentLetters }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor and Nav logic moved to RootLayout
  
  return (
    <div ref={containerRef} className="bg-[#EBEBEB] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#FF3333] selection:text-white relative">
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-between p-6 pt-32 relative border-b-2 border-[#1A1A1A]">
        <div className="max-w-[90vw] relative z-10">
          <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase text-[#1A1A1A]">
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="block"
              >
                Digital
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="block pl-[10vw] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3333] to-[#FF0000]"
              >
                Garden
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="block text-right"
              >
                Archive
              </motion.span>
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

      {/* Letter to Visitor */}
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
        <div className="col-span-1 md:col-span-8 p-8 md:p-16 flex flex-col justify-center bg-[#EBEBEB]">
          <p className="text-3xl md:text-5xl font-serif italic font-light leading-tight max-w-4xl text-[#1A1A1A]">
            "Welcome to this fragment of the internet. Here lies a collection of my thoughts, future plans, and letters sent to the void."
          </p>
          <div className="mt-12 flex items-center gap-4">
             <div className="h-px w-24 bg-[#1A1A1A]" />
             <span className="font-bold uppercase tracking-widest text-xs font-sans">Rin Tateishi</span>
          </div>
        </div>
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
            <Link href="/plan" className="mt-auto p-8 border-t-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EBEBEB] transition-colors uppercase text-sm font-bold tracking-widest text-center cursor-none">
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
            <Link href="/notes" className="mt-auto p-8 border-t-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EBEBEB] transition-colors italic text-lg font-medium text-center cursor-none">
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
            <Link href="/letter" className="mt-auto p-8 border-t-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EBEBEB] transition-colors font-bold text-sm tracking-wide text-center cursor-none">
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

// 1. Plan Item (Technical, Monospace) - Slide Effect
function PlanItem({ item, index }: { item: Post, index: number }) {
  return (
    <Link href={item.link} className="group relative block border-b border-[#1A1A1A] last:border-b-0 cursor-none overflow-hidden">
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
    <Link href={item.link} className="group relative block border-b border-[#1A1A1A] last:border-b-0 cursor-none overflow-hidden">
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
    <Link href={item.link} className="group relative block border-b border-[#1A1A1A] last:border-b-0 cursor-none overflow-hidden">
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
