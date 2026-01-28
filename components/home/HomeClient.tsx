"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="relative bg-black min-h-screen text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),transparent_70%)]" />
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] leading-none font-bold tracking-tighter mix-blend-overlay text-white opacity-80">
            RIN&apos;S SPACE
          </h1>
        </motion.div>
        
        <motion.p 
          className="mt-8 text-xl md:text-2xl text-white/50 font-light tracking-widest uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Digital Garden &nbsp;•&nbsp; Playground
        </motion.p>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-20 bg-black/50 backdrop-blur-3xl rounded-t-[3rem] border-t border-white/10 mt-[-10vh] pb-32">
        <div className="max-w-7xl mx-auto px-6 pt-32 space-y-40">
          
          <Section 
            title="Recent Plans" 
            subtitle="Architecting the future."
            items={recentPlans} 
            color="from-blue-500/20"
          />

          <Section 
            title="Recent Notes" 
            subtitle="Fragments of knowledge."
            items={recentNotes} 
            color="from-emerald-500/20"
            reverse
          />

          <Section 
            title="Recent Letters" 
            subtitle="Thoughts sent to the void."
            items={recentLetters} 
            color="from-purple-500/20"
          />

        </div>
      </div>
    </main>
  );
}

function Section({ title, subtitle, items, color, reverse = false }: { title: string; subtitle: string; items: Post[]; color: string; reverse?: boolean }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], reverse ? [-100, 100] : [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-r ${color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[100px]`} />
      
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        {/* Typography */}
        <div className={`flex-1 ${reverse ? 'md:order-2 text-right' : 'md:order-1'}`}>
          <motion.h2 
            style={{ x, opacity }}
            className="text-6xl md:text-8xl font-serif font-bold text-white/10 group-hover:text-white/30 transition-colors duration-500 whitespace-nowrap"
          >
            {title}
          </motion.h2>
          <p className="text-2xl text-white/60 mt-4 font-light italic">{subtitle}</p>
          <Link href={items[0]?.link || "#"} className="inline-block mt-8 text-white/40 hover:text-white border-b border-white/20 hover:border-white transition-all pb-1">
            View All {title} →
          </Link>
        </div>

        {/* Cards Carousel */}
        <div className={`flex-1 w-full ${reverse ? 'md:order-1' : 'md:order-2'}`}>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide no-scrollbar">
            {items.map((item, i) => (
              <motion.div 
                key={item.id}
                className="flex-shrink-0 w-80 snap-center bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-mono text-white/40">{item.date}</span>
                <h3 className="text-xl font-bold mt-2 mb-4 leading-tight">{item.title}</h3>
                <p className="text-sm text-white/50 line-clamp-3">{item.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
