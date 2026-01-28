"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#FFFAF0] text-[#7B341E] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-40 h-40 border-4 border-[#FEEBC8] rounded-full opacity-30 pointer-events-none" 
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-64 h-64 border-2 border-dashed border-[#ED8936] opacity-10 rounded-full pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center">
        <header className="mb-24 text-center">
          <div className="flex items-center gap-4 justify-center mb-4 opacity-60">
            <div className="w-12 h-[2px] bg-[#ED8936]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#ED8936] font-hand text-lg">From the Desk of Rin</span>
            <div className="w-12 h-[2px] bg-[#ED8936]" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 text-[#DD6B20] drop-shadow-sm flex items-center justify-center gap-4 font-rounded">
            <motion.span 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="flex"
            >
                {"LETTERS".split("").map((char, i) => (
                    <motion.span
                        key={i}
                        whileHover={{ y: -20, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-block cursor-grab active:cursor-grabbing"
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-6xl">
                📮
            </motion.span>
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
                  initial={{ opacity: 0, scale: 0.8, x: 0, rotate: 0 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.8,
                    x: isCenter ? 0 : isNext ? 300 : -300,
                    rotate: isCenter ? 0 : isNext ? 5 : -5,
                    zIndex: isCenter ? 20 : 10,
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => {
                    if (isNext) nextLetter();
                    if (isPrev) prevLetter();
                  }}
                  className={`
                    absolute w-full max-w-xl p-10 md:p-16 bg-white border-2 border-[#FBD38D] shadow-[8px_8px_0px_0px_#FEEBC8] cursor-pointer rounded-lg overflow-hidden
                    ${isCenter ? 'z-20' : 'z-10 opacity-50'}
                  `}
                >
                  {/* Airmail Stripe */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#F56565,#F56565_10px,#FFF_10px,#FFF_20px,#4299E1_20px,#4299E1_30px,#FFF_30px,#FFF_40px)]" />
                  
                  {/* Stamp */}
                  <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dashed border-[#FBD38D] opacity-30 rotate-12" />

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-between items-baseline mb-8 border-b-2 border-dashed border-[#FEEBC8] pb-4 pt-4"
                  >
                    <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#C05621] font-rounded">{letter.title}</h2>
                    <span className="font-mono text-xs font-bold bg-[#FEEBC8] text-[#C05621] px-2 py-1 rounded">{letter.date}</span>
                  </motion.div>
                  
                  <div className="prose prose-lg prose-orange max-w-none">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-medium leading-relaxed whitespace-pre-wrap opacity-80 mb-6 text-[#7B341E] font-hand text-2xl"
                    >
                      {letter.content.length > 200 ? letter.content.substring(0, 200) + "..." : letter.content}
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link 
                            href={`/letter/${letter.id}`} 
                            className="inline-block text-xs font-bold uppercase tracking-widest bg-[#FBD38D] text-[#7B341E] px-4 py-2 hover:bg-[#ED8936] hover:text-white transition-colors rounded font-mono"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Read Full Letter
                        </Link>
                    </motion.div>
                  </div>

                  {isCenter && (
                    <motion.div 
                      className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <button onClick={(e) => { e.stopPropagation(); prevLetter(); }} className="w-12 h-12 flex items-center justify-center border-2 border-[#FBD38D] text-[#ED8936] rounded-full hover:bg-[#ED8936] hover:text-white transition-colors font-bold transform hover:scale-110 active:scale-95">←</button>
                      <button onClick={(e) => { e.stopPropagation(); nextLetter(); }} className="w-12 h-12 flex items-center justify-center border-2 border-[#FBD38D] text-[#ED8936] rounded-full hover:bg-[#ED8936] hover:text-white transition-colors font-bold transform hover:scale-110 active:scale-95">→</button>
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
