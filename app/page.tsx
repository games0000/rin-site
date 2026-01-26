"use client";

import { motion } from "framer-motion";
import GlassArticle from "@/components/home/GlassArticle";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* 简单的背景遮罩，增加文字对比度 */}
      <div className="fixed inset-0 bg-black/10 pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10">
        <div className="z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-2 drop-shadow-2xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              RIN'S SPACE
            </motion.h1>
            
            <motion.div 
              className="h-1 w-24 bg-white/50 mx-auto my-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.p 
              className="text-xl md:text-3xl text-white/90 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Designing the Future &nbsp;•&nbsp; Coding the Dream
            </motion.p>
          </motion.div>
        </div>

        {/* 底部滚动提示动画 */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <motion.div 
            className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Content Section - The Hidden Article */}
      <section className="min-h-[50vh] relative z-10 pb-20">
        <GlassArticle />
      </section>
    </main>
  );
}
