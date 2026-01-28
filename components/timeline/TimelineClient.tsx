"use client";

import { motion, useScroll } from "framer-motion";
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
    <main ref={containerRef} className="min-h-screen bg-[#EBEBEB] text-[#1A1A1A] relative overflow-hidden font-sans selection:bg-[#FF3333] selection:text-white">
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-48">
        
        {/* Header */}
        <motion.header 
          className="mb-32 md:mb-48 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <span className="bg-[#1A1A1A] text-white px-4 py-2 text-sm font-bold uppercase tracking-widest">
              Chronology
            </span>
          </div>
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none text-[#1A1A1A]">
            TIMELINE
          </h1>
        </motion.header>

        {/* Center Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#1A1A1A]/10 md:-translate-x-1/2 z-0">
          <motion.div 
            className="w-full bg-[#1A1A1A] origin-top"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />
        </div>

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
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      
      {/* Desktop Spacer (to push content to side) */}
      <div className="hidden md:block md:w-1/2" />

      {/* Content Container */}
      <div className={`
        pl-12 md:pl-0 md:w-1/2 relative
        ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}
      `}>
        
        {/* Date Label (Desktop: Absolute positioned near line) */}
        <span className={`
          hidden md:block absolute top-1/2 -translate-y-1/2 font-mono text-xs font-bold tracking-widest bg-[#EBEBEB] z-10 py-2
          ${isEven ? 'right-[-80px] text-left w-16 pl-4' : 'left-[-80px] text-right w-16 pr-4'}
        `}>
          {event.year || event.date.split(',')[1] || event.date}
        </span>

        {/* Connector Line (Desktop) */}
        <div className={`
          hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#1A1A1A]
          ${isEven ? 'right-0 w-16' : 'left-0 w-16'}
        `} />

        {/* Content Body */}
        <div className="group border-2 border-transparent hover:border-[#1A1A1A] p-8 transition-all duration-300 hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
          {/* Mobile Date */}
          <span className="md:hidden block text-xs font-mono font-bold text-[#1A1A1A]/40 mb-2 tracking-widest uppercase">
            {event.date}
          </span>

          <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight group-hover:text-[#FF3333] transition-colors leading-none">
            {event.title}
          </h3>
          
          <p className="text-lg md:text-xl text-[#1A1A1A]/60 font-medium leading-relaxed max-w-md ml-0 md:mx-0">
            {event.description}
          </p>

          {event.category && (
            <div className={`mt-6 ${isEven ? 'md:flex md:justify-end' : ''}`}>
              <span className="inline-block px-3 py-1 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider">
                {event.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Center Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-4 h-4 bg-[#EBEBEB] border-4 border-[#1A1A1A] z-20" />

    </motion.div>
  );
}
