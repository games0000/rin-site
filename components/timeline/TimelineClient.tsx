"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
    <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <motion.h1 
          className="text-6xl md:text-9xl font-serif font-bold text-center mb-32 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Timeline
        </motion.h1>

        {/* Center Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
          <motion.div 
            className="w-full bg-white origin-top"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />
        </div>

        <div className="space-y-24">
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
      className={`relative flex md:justify-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
      <div className={`
        ml-12 md:ml-0 md:w-1/2 
        ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}
      `}>
        <div className="relative group">
          {/* Connector Line (Desktop) */}
          <div className={`
            hidden md:block absolute top-6 w-16 h-px bg-white/20
            ${isEven ? 'right-[-64px]' : 'left-[-64px]'}
            group-hover:w-24 group-hover:bg-white transition-all duration-300
          `} />

          <span className="text-sm font-mono text-blue-400 mb-2 block">{event.date}</span>
          <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
          <p className="text-white/60 leading-relaxed text-lg">{event.description}</p>
          
          {event.category && (
            <span className="inline-block mt-4 text-xs uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full text-white/40">
              {event.category}
            </span>
          )}
        </div>
      </div>

      {/* Center Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 bg-black border-2 border-white rounded-full z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
    </motion.div>
  );
}
