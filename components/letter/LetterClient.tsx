"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

interface Letter {
  id: string;
  title: string;
  date: string;
  content: string;
  color?: string;
}

export default function LetterClient({ letters }: { letters: Letter[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextLetter = () => setActiveIndex((prev) => (prev + 1) % letters.length);
  const prevLetter = () => setActiveIndex((prev) => (prev - 1 + letters.length) % letters.length);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black z-0" />
      
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white/20 mb-12 tracking-widest">LETTERS</h1>

        <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-1000">
          <AnimatePresence mode="popLayout">
            {letters.map((letter, index) => {
              // Calculate relative index for "carousel" feel
              const offset = (index - activeIndex + letters.length) % letters.length;
              const isCenter = offset === 0;
              const isNext = offset === 1;
              const isPrev = offset === letters.length - 1;
              
              // Only render relevant cards to save resources
              if (!isCenter && !isNext && !isPrev) return null;

              return (
                <motion.div
                  key={letter.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: 0 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.8,
                    x: isCenter ? 0 : isNext ? 300 : -300,
                    z: isCenter ? 100 : 0,
                    rotateY: isCenter ? 0 : isNext ? -15 : 15,
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => {
                    if (isNext) nextLetter();
                    if (isPrev) prevLetter();
                  }}
                  className={`
                    absolute w-full max-w-xl p-10 md:p-16 rounded-3xl backdrop-blur-md shadow-2xl cursor-pointer
                    ${isCenter ? 'z-20 bg-white/10 border border-white/20' : 'z-10 bg-white/5 border border-white/5'}
                  `}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex justify-between items-baseline mb-8">
                    <h2 className="text-3xl font-bold">{letter.title}</h2>
                    <span className="font-mono text-sm text-white/40">{letter.date}</span>
                  </div>
                  
                  <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-white/80 font-light leading-relaxed whitespace-pre-wrap">
                      {letter.content}
                    </p>
                  </div>

                  {isCenter && (
                    <motion.div 
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <button onClick={(e) => { e.stopPropagation(); prevLetter(); }} className="p-4 rounded-full bg-white/5 hover:bg-white/20 transition-colors">←</button>
                      <button onClick={(e) => { e.stopPropagation(); nextLetter(); }} className="p-4 rounded-full bg-white/5 hover:bg-white/20 transition-colors">→</button>
                    </motion.div>
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
