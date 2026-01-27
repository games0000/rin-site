"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Letter {
  id: string;
  title: string;
  date: string;
  content: string;
  color?: string;
}

export default function LetterClient({ letters }: { letters: Letter[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center pt-32 pb-20 px-4 relative">
      <div className="fixed inset-0 bg-black/10 pointer-events-none z-0" />
      
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white">Letters</h1>
          {expanded && (
            <button 
              onClick={() => setExpanded(false)}
              className="text-sm text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              Stack View
            </button>
          )}
        </div>

        <div className={`relative ${expanded ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "h-[400px] flex justify-center items-center"}`}>
          <AnimatePresence mode="popLayout">
            {letters.map((letter, index) => {
              // Stacked logic
              const randomRotate = expanded ? 0 : (index % 2 === 0 ? -3 : 3) * (index + 1);
              const randomX = expanded ? 0 : (index % 3 === 0 ? -5 : 5) * index;
              const randomY = expanded ? 0 : -index * 2;
              const zIndex = letters.length - index;

              return (
                <motion.div
                  layout
                  key={letter.id}
                  onClick={() => !expanded && setExpanded(true)}
                  initial={false}
                  animate={{
                    rotate: randomRotate,
                    x: randomX,
                    y: randomY,
                    scale: expanded ? 1 : 1 - index * 0.05,
                    opacity: expanded ? 1 : 1 - index * 0.1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  style={{ zIndex }}
                  className={`
                    ${expanded ? "relative w-full" : "absolute w-full max-w-md cursor-pointer hover:!scale-105 transition-transform"}
                    p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl
                    ${letter.color || "bg-white/5"}
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-medium text-white/90">{letter.title}</h2>
                    <span className="text-xs font-mono text-white/40">{letter.date}</span>
                  </div>
                  <p className="text-white/70 leading-relaxed font-light text-sm md:text-base whitespace-pre-wrap">
                    {letter.content}
                  </p>
                  
                  {!expanded && index === 0 && (
                    <div className="absolute bottom-4 right-6 text-xs text-white/30 italic">
                      Click to expand pile
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
