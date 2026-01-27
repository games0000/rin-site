"use client";

import { motion } from "framer-motion";
import GlassArticle from "@/components/home/GlassArticle";
import RecentPosts from "@/components/home/RecentPosts";

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
  return (
    <main className="relative overflow-hidden pb-20">
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
              I have no idea &nbsp;•&nbsp; so just waiting
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

      {/* Letter to Visitor */}
      <section className="relative z-10 py-20">
        <GlassArticle />
      </section>

      {/* Recent Plans */}
      <section className="relative z-10">
        <RecentPosts title="Recent Plans" posts={recentPlans} viewAllLink="/plan" />
      </section>

      {/* Recent Notes */}
      <section className="relative z-10">
        <RecentPosts title="Recent Notes" posts={recentNotes} viewAllLink="/notes" delay={0.1} />
      </section>

      {/* Recent Letters */}
      <section className="relative z-10">
        <RecentPosts title="Recent Letters" posts={recentLetters} viewAllLink="/letter" delay={0.2} />
      </section>
    </main>
  );
}
