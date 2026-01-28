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
    <div ref={containerRef} className="bg-[#FFF8F0] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#FFD1DC] selection:text-[#FF8E8E] relative overflow-hidden">
      
      {/* Background Doodles */}
      <div className="fixed top-20 left-10 text-4xl opacity-20 rotate-12 pointer-events-none">✨</div>
      <div className="fixed top-40 right-20 text-6xl opacity-10 -rotate-12 pointer-events-none">🌸</div>
      <div className="fixed bottom-32 left-32 text-5xl opacity-10 rotate-45 pointer-events-none">🎈</div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-between p-6 pt-32 relative border-b-2 border-dashed border-[#FFB7B2]">
        <div className="max-w-[90vw] relative z-10 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block relative"
          >
            {/* Crown Icon */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 text-6xl"
            >
              👑
            </motion.div>
            
            <h1 className="text-[12vw] leading-[0.9] font-black tracking-tight uppercase text-[#FF8E8E] drop-shadow-[4px_4px_0px_#FFD1DC] font-rounded">
              <span className="block">
                Rin's
              </span>
              <span className="block text-[#FFB7B2]">
                Wonder
              </span>
              <span className="block">
                Land
              </span>
            </h1>
          </motion.div>
        </div>

        <div className="flex justify-between items-end pb-8 px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-sm font-bold text-[#FF8E8E] bg-white px-4 py-2 rounded-full shadow-sm border border-[#FFD1DC]"
          >
            Example ✿ 2026<br/>
            Tokyo ☁️
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }} 
            transition={{ 
                opacity: { delay: 0.8 },
                scale: { delay: 0.8 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
            }}
            className="w-20 h-20 bg-white border-2 border-[#FFB7B2] rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_#FFD1DC]"
          >
            ⬇️
          </motion.div>
        </div>
      </section>

      {/* Letter to Visitor - Expandable */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-dashed border-[#FFB7B2] bg-white">
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-4 p-8 md:p-16 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-[#FFB7B2] bg-[#FFF0F5] text-[#FF8E8E] flex flex-col justify-center items-center text-center"
        >
          <div 
            className="text-6xl mb-6 animate-bounce"
          >
            💌
          </div>
          <h2 
            className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 font-rounded"
          >
            HI THERE!<br/>FRIEND
          </h2>
          <div 
            className="w-16 h-2 bg-[#FFB7B2] rounded-full mb-4" 
          />
          <p 
            className="font-medium text-sm leading-relaxed opacity-80 uppercase tracking-widest bg-white px-3 py-1 rounded-full text-[#FF8E8E] font-mono"
          >
            Welcome to my space
          </p>
        </motion.div>
        
        <LetterContent />
        
      </section>

      {/* Distinct Sections Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 bg-[#1A1A1A] gap-[2px]">
        
        {/* Plans: Garden / Growth */}
        <div className="bg-[#F0FFF4] flex flex-col h-full relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-[#C6F6D5] rounded-full opacity-30 pointer-events-none blur-2xl" />
          <div className="absolute bottom-20 right-[-20px] w-32 h-32 bg-[#9AE6B4] rounded-full opacity-30 pointer-events-none blur-2xl" />

          <div className="p-6 bg-[#F0FFF4]/80 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center border-b-2 border-dashed border-[#9AE6B4]">
            <h3 className="text-xl font-mono font-bold text-[#48BB78] tracking-tighter flex items-center gap-2">
              <span>🌱</span> 01_PLANS
            </h3>
            <div className="w-3 h-3 bg-[#48BB78] rounded-tl-xl rounded-br-xl" />
          </div>
          <div className="flex-1 flex flex-col font-mono p-4 gap-4">
            {recentPlans.slice(0, 3).map((item, i) => (
              <PlanItem key={item.id} item={item} index={i} />
            ))}
            <Link href="/plan" className="mt-auto mx-4 mb-6 p-4 bg-white rounded-xl border-2 border-[#9AE6B4] text-[#48BB78] hover:bg-[#48BB78] hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_#C6F6D5] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] text-center font-bold tracking-widest uppercase text-xs">
              [ View All Seeds ]
            </Link>
          </div>
        </div>

        {/* Notes: Cute / Soft */}
        <div className="bg-[#FFF8F0] flex flex-col h-full relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-[#FFD1DC] rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#FFE4E1] rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="p-6 bg-[#FFF8F0]/80 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center border-b-2 border-dashed border-[#FFB7B2]">
            <h3 className="text-2xl font-sans font-bold text-[#FF8E8E] tracking-wide flex items-center gap-2">
              <span>✿</span> 02. Notes
            </h3>
            <div className="w-3 h-3 rounded-full bg-[#FF8E8E]" />
          </div>
          <div className="flex-1 flex flex-col font-sans p-4 gap-4">
            {recentNotes.slice(0, 3).map((item, i) => (
              <NoteItem key={item.id} item={item} index={i} />
            ))}
            <Link href="/notes" className="mt-auto mx-4 mb-6 p-4 bg-white rounded-2xl border-2 border-[#FFB7B2] text-[#FF8E8E] hover:bg-[#FF8E8E] hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_#FFD1DC] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] text-center font-bold tracking-wide">
              Read all thoughts ➜
            </Link>
          </div>
        </div>

        {/* Letters: Warm / Postal */}
        <div className="bg-[#FFFAF0] flex flex-col h-full relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-[#FEEBC8] rounded-full opacity-40 pointer-events-none" />
          <div className="absolute top-10 right-10 rotate-12 opacity-20 pointer-events-none">
            <div className="w-20 h-24 border-2 border-[#F6AD55] border-dashed" />
          </div>

          <div className="p-6 bg-[#FFFAF0]/80 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center border-b-2 border-dashed border-[#FBD38D]">
            <h3 className="text-xl font-sans font-black uppercase tracking-tight text-[#ED8936] flex items-center gap-2">
              <span>🕊️</span> 03 LETTERS
            </h3>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#ED8936]" />
          </div>
          <div className="flex-1 flex flex-col font-sans p-4 gap-4">
            {recentLetters.slice(0, 3).map((item, i) => (
              <LetterItem key={item.id} item={item} index={i} />
            ))}
            <Link href="/letter" className="mt-auto mx-4 mb-6 p-4 bg-white rounded-lg border-2 border-[#FBD38D] text-[#ED8936] hover:bg-[#ED8936] hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_#FEEBC8] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] text-center font-bold text-sm tracking-wide">
              OPEN MAILBOX
            </Link>
          </div>
        </div>

      </section>

      {/* Marquee Footer */}
      <footer className="bg-[#FFB7B2] text-white overflow-hidden py-6 border-t-2 border-dashed border-white">
        <motion.div 
          className="whitespace-nowrap flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[6vw] font-black uppercase tracking-tight leading-none mx-8 drop-shadow-sm flex items-center gap-4 font-rounded">
              <span>Rin's Digital Wonderland</span> <span className="text-[4vw]">✨</span> <span>Est. 2026</span> <span className="text-[4vw]">🎈</span>
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
            visible: { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
            hidden: { y: 20, opacity: 0, rotate: 10 }
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
    <div className="col-span-1 md:col-span-8 p-8 md:p-16 flex flex-col justify-center bg-white relative">
      <motion.div 
        animate={{ height: expanded ? "auto" : "200px" }} 
        className="overflow-hidden relative"
      >
        <p className="text-2xl md:text-3xl font-hand font-bold leading-tight text-[#FF8E8E] drop-shadow-sm">
          "Welcome to this little corner of the internet! Here lies a collection of my thoughts, dreams, and letters sent to the fluffy clouds."
        </p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-lg font-medium leading-relaxed text-[#1A1A1A]/70 max-w-3xl font-mono"
            >
              {/* Content */}
              <p>This space is a cozy garden where I plant my ideas and watch them grow. No algorithms, just pure creativity and joy!</p>
              <div className="h-4" />
              <p>Whether you are here to see my plans sprout, read my whispered notes, or check the mail, I hope you find a little spark of happiness.</p>
              <div className="h-4" />
              <p>Take your time, relax, and enjoy the view! 🌈</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Gradient Fade for Collapsed State */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </motion.div>

      <div className="mt-8 flex items-center justify-between border-t-2 border-dashed border-[#FFB7B2] pt-8">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="px-6 py-2 bg-[#FFF0F5] text-[#FF8E8E] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FFB7B2] hover:text-white transition-all shadow-sm flex items-center gap-2 font-mono"
        >
          {expanded ? "Close Letter [-]" : "Open Letter [+]"}
        </button>
        
        <div className="flex items-center gap-2 text-[#FF8E8E]">
           <span className="font-bold uppercase tracking-widest text-xs font-mono">荼蘼</span>
           <div className="text-xl">🌸</div>
        </div>
      </div>
    </div>
  );
}

// 1. Plan Item (Garden, Soft) - Leaf Effect
function PlanItem({ item, index }: { item: Post, index: number }) {
  return (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
    >
        <Link href={item.link} className="group relative block bg-white rounded-xl border-2 border-transparent hover:border-[#9AE6B4] shadow-sm hover:shadow-[4px_4px_0px_0px_#C6F6D5] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer p-6">
        <div className="flex justify-between items-start mb-3">
            <span className="inline-block px-2 py-1 bg-[#F0FFF4] text-[#48BB78] rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#C6F6D5]">
            SEED_{item.date.replace(/-/g, '').slice(2)}
            </span>
            <span className="text-xs opacity-0 group-hover:opacity-100 text-[#48BB78]">🌿</span>
        </div>
        
        <h4 className="text-sm font-bold uppercase leading-relaxed mb-2 text-[#2F855A] group-hover:text-[#48BB78] transition-colors">
            {item.title}
        </h4>
        <p className="text-xs text-[#2F855A]/60 line-clamp-2">
            {item.excerpt}
        </p>
        </Link>
    </motion.div>
  );
}

// 2. Note Item (Cute, Soft) - Pop Effect
function NoteItem({ item, index }: { item: Post, index: number }) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
    >
        <Link href={item.link} className="group relative block bg-white rounded-2xl border-2 border-transparent hover:border-[#FFB7B2] shadow-sm hover:shadow-[4px_4px_0px_0px_#FFD1DC] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer p-6">
        <div className="flex justify-between items-start mb-3">
            <span className="inline-block px-3 py-1 bg-[#FFF0F5] text-[#FF8E8E] rounded-full text-[10px] font-bold uppercase tracking-wider">
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <div className="w-2 h-2 rounded-full bg-[#FFD1DC] group-hover:bg-[#FF8E8E] transition-colors" />
        </div>
        
        <h4 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF8E8E] transition-colors leading-tight">
            {item.title}
        </h4>
        
        <p className="text-sm text-[#1A1A1A]/60 line-clamp-2 font-medium leading-relaxed">
            {item.excerpt}
        </p>
        </Link>
    </motion.div>
  );
}

// 3. Letter Item (Postal, Warm) - Envelope Effect
function LetterItem({ item, index }: { item: Post, index: number }) {
  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
    >
        <Link href={item.link} className="group relative block bg-white rounded-lg border-2 border-transparent hover:border-[#FBD38D] shadow-sm hover:shadow-[4px_4px_0px_0px_#FEEBC8] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer p-6">
        <div className="flex gap-3 items-center mb-3 border-b-2 border-dashed border-[#FEEBC8] pb-3">
            <div className="w-8 h-6 bg-[#FEEBC8] rounded-sm flex items-center justify-center text-[10px]">📮</div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ED8936] opacity-70 group-hover:opacity-100">
            Airmail
            </span>
        </div>
        <h4 className="text-lg font-black uppercase leading-none mb-2 tracking-tight text-[#DD6B20] group-hover:text-[#ED8936] transition-colors">
            {item.title}
        </h4>
        <p className="text-xs font-medium leading-relaxed text-[#DD6B20]/60">
            {item.excerpt}
        </p>
        </Link>
    </motion.div>
  );
}
