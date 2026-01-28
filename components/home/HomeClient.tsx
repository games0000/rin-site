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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Custom Cursor Logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#EBEBEB] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#FF3333] selection:text-white cursor-none">
      
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 bg-[#FF3333] rounded-full pointer-events-none z-50 mix-blend-multiply"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      {/* Navigation (Griflan style: minimal, corners) */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-40 pointer-events-none mix-blend-difference text-white">
        <div className="font-bold text-xl tracking-tighter pointer-events-auto">RIN</div>
        <div className="flex gap-8 text-sm font-medium pointer-events-auto">
          <Link href="/timeline" className="hover:underline decoration-2 underline-offset-4">Timeline</Link>
          <Link href="/plan" className="hover:underline decoration-2 underline-offset-4">Plans</Link>
          <Link href="/notes" className="hover:underline decoration-2 underline-offset-4">Notes</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-between p-6 pt-32 relative border-b border-[#1A1A1A]">
        <div className="max-w-[90vw]">
          <h1 className="text-[11vw] leading-[0.85] font-black tracking-tighter uppercase">
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
                className="block pl-[10vw] text-[#FF3333]"
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

        <div className="flex justify-between items-end">
          <div className="w-64 text-sm font-medium leading-tight">
            EST. 2026<br/>
            TOKYO, JAPAN<br/>
            CURRENTLY BUILDING
          </div>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border border-[#1A1A1A] rounded-full flex items-center justify-center text-xs font-bold uppercase"
          >
            Scroll Down
          </motion.div>
        </div>
      </section>

      {/* Letter to Visitor (Griflan "Who this is for" style) */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-[#1A1A1A]">
        <div className="col-span-1 md:col-span-4 p-6 md:p-12 border-b md:border-b-0 md:border-r border-[#1A1A1A] bg-[#FF3333] text-white">
          <h2 className="text-4xl md:text-5xl font-bold leading-none tracking-tight mb-8">
            TO THE<br/>VISITOR
          </h2>
          <div className="w-12 h-1 bg-black mb-8" />
          <p className="text-lg font-medium leading-relaxed">
            Welcome to this fragment of the internet. Here lies a collection of my thoughts, future plans, and letters sent to the void.
          </p>
        </div>
        <div className="col-span-1 md:col-span-8 p-6 md:p-12 flex flex-col justify-center">
          <p className="text-2xl md:text-4xl font-medium leading-tight max-w-3xl">
            This space is designed as a digital garden — a place where ideas are planted, nurtured, and allowed to grow wild. Feel free to explore the archives, read through the blueprints, or simply wander.
          </p>
          <div className="mt-12 flex items-center gap-4">
             <div className="h-px w-24 bg-[#1A1A1A]" />
             <span className="font-bold uppercase tracking-widest text-sm">Rin Tateishi</span>
          </div>
        </div>
      </section>

      {/* Grid Layout Content (Plans, Notes, Letters) */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        {/* Plans Column */}
        <div className="border-r border-[#1A1A1A] border-b md:border-b-0">
          <div className="p-6 border-b border-[#1A1A1A] bg-white sticky top-0 z-10">
            <h3 className="text-xl font-bold uppercase tracking-tight flex justify-between items-center">
              Plans <span className="text-[#FF3333] text-sm">01</span>
            </h3>
          </div>
          <div className="flex flex-col">
            {recentPlans.slice(0, 3).map((item, i) => (
              <GridItem key={item.id} item={item} index={i} type="plan" />
            ))}
            <ViewAllLink href="/plan" label="All Plans" />
          </div>
        </div>

        {/* Notes Column */}
        <div className="border-r border-[#1A1A1A] border-b md:border-b-0">
          <div className="p-6 border-b border-[#1A1A1A] bg-white sticky top-0 z-10">
            <h3 className="text-xl font-bold uppercase tracking-tight flex justify-between items-center">
              Notes <span className="text-[#FF3333] text-sm">02</span>
            </h3>
          </div>
          <div className="flex flex-col">
            {recentNotes.slice(0, 3).map((item, i) => (
              <GridItem key={item.id} item={item} index={i} type="note" />
            ))}
            <ViewAllLink href="/notes" label="All Notes" />
          </div>
        </div>

        {/* Letters Column */}
        <div>
          <div className="p-6 border-b border-[#1A1A1A] bg-white sticky top-0 z-10">
            <h3 className="text-xl font-bold uppercase tracking-tight flex justify-between items-center">
              Letters <span className="text-[#FF3333] text-sm">03</span>
            </h3>
          </div>
          <div className="flex flex-col">
            {recentLetters.slice(0, 3).map((item, i) => (
              <GridItem key={item.id} item={item} index={i} type="letter" />
            ))}
            <ViewAllLink href="/letter" label="All Letters" />
          </div>
        </div>
      </section>

      {/* Marquee Footer */}
      <footer className="bg-[#1A1A1A] text-[#EBEBEB] overflow-hidden py-4 md:py-8">
        <motion.div 
          className="whitespace-nowrap flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[10vw] font-black uppercase tracking-tighter leading-none mx-4">
              Rin&apos;s Space — Digital Garden — 
            </span>
          ))}
        </motion.div>
      </footer>
    </div>
  );
}

function GridItem({ item, index, type }: { item: Post, index: number, type: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={item.link} className="group relative block border-b border-[#1A1A1A] last:border-b-0">
      <motion.div 
        className="p-6 h-64 flex flex-col justify-between transition-colors duration-300 hover:bg-[#1A1A1A] hover:text-white"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs opacity-50 uppercase">{item.date}</span>
          <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-[#FF3333]' : 'bg-[#1A1A1A]'} group-hover:bg-[#FF3333] transition-colors`} />
        </div>
        
        <div>
          <h4 className="text-2xl font-bold leading-tight mb-2 line-clamp-2">
            {item.title}
          </h4>
          <p className="text-sm opacity-60 line-clamp-2 leading-relaxed group-hover:opacity-80">
            {item.excerpt}
          </p>
        </div>

        <div className="overflow-hidden h-6">
          <motion.div 
            className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
          >
            Read {type} <span>→</span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

function ViewAllLink({ href, label }: { href: string, label: string }) {
  return (
    <Link href={href} className="p-6 flex items-center justify-between font-bold uppercase tracking-tight hover:bg-[#FF3333] hover:text-white transition-colors duration-300">
      <span>{label}</span>
      <span>→</span>
    </Link>
  );
}
