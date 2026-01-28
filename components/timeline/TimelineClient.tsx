"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface TimelineEvent {
  id: string;
  date: string;
  year?: string;
  title: string;
  description: string;
  category?: "Life" | "Work" | "Project" | "Idea";
}

export default function TimelineClient({ events }: { events: TimelineEvent[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#EBF8FF] text-[#2C5282] relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-20 left-10 text-[#BEE3F8] text-6xl opacity-40 pointer-events-none"
      >
        ☁️
      </motion.div>
      <motion.div 
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="fixed top-40 right-20 text-[#BEE3F8] text-8xl opacity-40 pointer-events-none"
      >
        ☁️
      </motion.div>
      <motion.div 
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-20 left-20 text-[#90CDF4] text-4xl opacity-30 pointer-events-none"
      >
        ⭐
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-48">
        
        {/* Header */}
        <motion.header 
          className="mb-32 md:mb-48 text-center"
        >
          <div className="flex justify-center mb-6">
            <span className="bg-[#BEE3F8] text-[#2B6CB0] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm font-mono">
              My Journey
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none text-[#2B6CB0] drop-shadow-sm font-rounded">
            <span className="inline-block hover:animate-spin">T</span>
            <span className="inline-block hover:animate-bounce">I</span>
            <span className="inline-block hover:animate-pulse">M</span>
            <span className="inline-block hover:animate-spin">E</span>
            <span className="inline-block hover:animate-bounce">L</span>
            <span className="inline-block hover:animate-pulse">I</span>
            <span className="inline-block hover:animate-spin">N</span>
            <span className="inline-block hover:animate-bounce">E</span>
          </h1>
        </motion.header>

        {/* Center Line (Dotted) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-transparent border-l-2 border-dashed border-[#BEE3F8] md:-translate-x-1/2 z-0" />

        {/* Events */}
        <div className="space-y-32 md:space-y-48 relative z-10">
          {events.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      
      {/* Desktop Spacer */}
      <div className="hidden md:block md:w-1/2" />

      {/* Content Container */}
      <div className={`
        pl-12 md:pl-0 md:w-1/2 relative
        ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}
      `}>
        
        {/* Date Label */}
        <span 
          className={`
          hidden md:block absolute top-1/2 -translate-y-1/2 font-sans text-sm font-bold tracking-widest bg-[#EBF8FF] text-[#4299E1] z-10 py-2
          ${isEven ? 'right-[-80px] text-left w-16 pl-4' : 'left-[-80px] text-right w-16 pr-4'} font-mono
        `}>
          {event.year || event.date.split(',')[1] || event.date}
        </span>

        {/* Connector Line */}
        <div 
          className={`
            hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-[#BEE3F8] origin-left
            ${isEven ? 'right-0 w-16' : 'left-0 w-16'}
          `}
        />

        {/* Content Body */}
        <Link href={`/timeline/${event.id}`} className="block group bg-white rounded-2xl border-2 border-transparent hover:border-[#90CDF4] p-8 transition-all duration-300 shadow-[0px_4px_20px_rgba(66,153,225,0.1)] hover:shadow-[0px_8px_30px_rgba(66,153,225,0.2)] hover:-translate-y-1 relative overflow-hidden">
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

          {/* Mobile Date */}
          <span className="md:hidden block text-xs font-bold text-[#4299E1] mb-2 tracking-widest uppercase font-mono">
            {event.date}
          </span>

          <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[#2C5282] group-hover:text-[#3182CE] transition-colors leading-tight font-rounded">
            {event.title}
          </h3>
          
          <p className="text-lg text-[#2C5282]/70 font-medium leading-relaxed max-w-md ml-0 md:mx-0 font-sans">
            {event.description}
          </p>

          {event.category && (
            <div className={`mt-6 ${isEven ? 'md:flex md:justify-end' : ''}`}>
              <span className="inline-block px-4 py-1.5 bg-[#EBF8FF] text-[#3182CE] text-xs font-bold uppercase tracking-wider rounded-lg group-hover:bg-[#BEE3F8] transition-colors font-mono">
                {event.category}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Center Dot (Star) */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#EBF8FF] z-20 text-[#4299E1]">
        ⭐
      </div>

    </motion.div>
  );
}
