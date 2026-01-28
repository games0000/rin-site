"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

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
  // Default to middle section active or none? Let's default to none expanded for equal width, 
  // or middle one. Let's try equal width initially.
  const [activeSection, setActiveSection] = useState<"plans" | "notes" | "letters" | null>(null);

  const sections = [
    {
      id: "plans",
      title: "PLANS",
      subtitle: "Recent Blueprints",
      data: recentPlans,
      bg: "bg-[#080808]",
      accent: "text-cyan-400",
      border: "border-cyan-900/30",
      texture: "radial-gradient(circle at center, rgba(6,182,212,0.05) 0%, transparent 70%)"
    },
    {
      id: "notes",
      title: "NOTES",
      subtitle: "Recent Thoughts",
      data: recentNotes,
      bg: "bg-[#050505]",
      accent: "text-purple-400",
      border: "border-purple-900/30",
      texture: "radial-gradient(circle at center, rgba(168,85,247,0.05) 0%, transparent 70%)"
    },
    {
      id: "letters",
      title: "LETTERS",
      subtitle: "Recent Transmissions",
      data: recentLetters,
      bg: "bg-[#080808]",
      accent: "text-amber-100",
      border: "border-amber-900/30",
      texture: "radial-gradient(circle at center, rgba(254,243,199,0.05) 0%, transparent 70%)"
    }
  ];

  return (
    <main className="bg-black h-screen w-full flex flex-col text-white font-sans selection:bg-white/20 overflow-hidden">
      
      {/* Header */}
      <header className="h-20 shrink-0 flex items-center justify-between px-8 border-b border-white/5 z-20 bg-black/50 backdrop-blur-sm">
        <h1 className="text-xl font-bold tracking-tighter mix-blend-difference">RIN&apos;S SPACE</h1>
        <div className="flex gap-6 text-xs font-mono text-white/40 uppercase tracking-widest">
          <span>Digital Garden</span>
          <span>•</span>
          <span>Archive</span>
        </div>
      </header>

      {/* Accordion Content */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = activeSection === section.id; // Simplify for now

          return (
            <motion.div
              key={section.id}
              className={`relative h-full flex flex-col border-r border-white/5 overflow-hidden transition-colors duration-500 cursor-pointer ${section.bg}`}
              initial={false}
              animate={{ 
                flex: isActive ? 3 : 1,
                opacity: activeSection && !isActive ? 0.3 : 1
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setActiveSection(section.id as any)}
              onHoverEnd={() => setActiveSection(null)}
              onClick={() => setActiveSection(section.id as any)}
            >
              {/* Background Texture */}
              <div 
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{ background: section.texture }}
              />
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

              {/* Section Header (Always Visible) */}
              <div className="p-8 flex md:flex-col justify-between items-start h-24 md:h-auto shrink-0 relative z-10">
                <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-full ${isActive ? section.accent.replace('text-', 'bg-') : 'bg-white/20'}`} />
                   <h2 className={`text-2xl md:text-4xl font-bold tracking-tighter ${isActive ? 'text-white' : 'text-white/40'}`}>
                     {section.title}
                   </h2>
                </div>
                <motion.p 
                  className={`mt-2 text-xs font-mono uppercase tracking-widest ${section.accent} opacity-60`}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                >
                  {section.subtitle}
                </motion.p>
              </div>

              {/* Content List (Revealed on Expand) */}
              <div className="flex-1 overflow-y-auto px-8 pb-12 scrollbar-hide">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="flex flex-col gap-4 mt-8"
                    >
                      {section.data.map((item, i) => (
                        <ListItem key={item.id} item={item} index={i} accent={section.accent} border={section.border} />
                      ))}
                      
                      <Link 
                        href={`/${section.id === 'plans' ? 'plan' : section.id === 'notes' ? 'notes' : 'letter'}`}
                        className={`mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${section.accent} hover:opacity-80 transition-opacity`}
                      >
                        View All {section.title} <span>→</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Vertical Title for Collapsed State (Desktop) */}
              {!isActive && !activeSection && (
                <div className="hidden md:flex absolute bottom-8 left-8 origin-bottom-left -rotate-90 items-center gap-4 opacity-20 pointer-events-none">
                  <span className="text-sm font-mono tracking-[0.5em] uppercase whitespace-nowrap">
                    Click to Expand
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="h-12 shrink-0 flex items-center justify-between px-8 border-t border-white/5 bg-black z-20 text-[10px] text-white/20 font-mono">
        <span>© 2026 RIN&apos;S SPACE</span>
        <span>SCROLL / HOVER TO EXPLORE</span>
      </footer>
    </main>
  );
}

function ListItem({ item, index, accent, border }: { item: Post, index: number, accent: string, border: string }) {
  return (
    <Link href={item.link} className="block group">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.05 }}
        className={`p-6 rounded-lg bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:translate-x-2`}
      >
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-mono opacity-50 ${accent}`}>{item.date}</span>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
        </div>
        <h3 className="text-lg font-medium leading-tight mb-2 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
          {item.excerpt}
        </p>
      </motion.div>
    </Link>
  );
}
