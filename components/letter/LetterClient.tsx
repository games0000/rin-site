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
  const [activeIndex, setActiveIndex] = useState(0);

  const nextLetter = () => setActiveIndex((prev) => (prev + 1) % letters.length);
  const prevLetter = () => setActiveIndex((prev) => (prev - 1 + letters.length) % letters.length);

  return (
    <main className="min-h-screen bg-[#EBEBEB] text-[#1A1A1A] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center">
        <header className="mb-24 text-center">
          <div className="flex items-center gap-4 justify-center mb-4 opacity-40">
            <div className="w-12 h-1 bg-[#1A1A1A]" />
            <span className="text-xs font-bold uppercase tracking-widest">Transmissions</span>
            <div className="w-12 h-1 bg-[#1A1A1A]" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8">
            LETTERS
          </h1>
        </header>

        <div className="relative w-full h-[600px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {letters.map((letter, index) => {
              const offset = (index - activeIndex + letters.length) % letters.length;
              const isCenter = offset === 0;
              const isNext = offset === 1;
              const isPrev = offset === letters.length - 1;
              
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
                    zIndex: isCenter ? 20 : 10,
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => {
                    if (isNext) nextLetter();
                    if (isPrev) prevLetter();
                  }}
                  className={`
                    absolute w-full max-w-xl p-10 md:p-16 bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] cursor-pointer
                    ${isCenter ? 'z-20' : 'z-10 opacity-50'}
                  `}
                >
                  <div className="flex justify-between items-baseline mb-8 border-b-2 border-[#1A1A1A] pb-4">
                    <h2 className="text-3xl font-black uppercase leading-none tracking-tight">{letter.title}</h2>
                    <span className="font-mono text-xs font-bold bg-[#1A1A1A] text-white px-2 py-1">{letter.date}</span>
                  </div>
                  
                  <div className="prose prose-lg prose-neutral max-w-none">
                    <p className="font-medium leading-relaxed whitespace-pre-wrap opacity-80">
                      {letter.content}
                    </p>
                  </div>

                  {isCenter && (
                    <motion.div 
                      className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <button onClick={(e) => { e.stopPropagation(); prevLetter(); }} className="w-12 h-12 flex items-center justify-center border-2 border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors font-bold">←</button>
                      <button onClick={(e) => { e.stopPropagation(); nextLetter(); }} className="w-12 h-12 flex items-center justify-center border-2 border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors font-bold">→</button>
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
