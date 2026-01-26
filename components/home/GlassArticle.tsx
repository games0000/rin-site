"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function GlassArticle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto my-20 relative z-10 px-4">
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative overflow-hidden
          bg-white/5 backdrop-blur-md border border-white/10
          rounded-2xl cursor-pointer transition-colors duration-500
          hover:bg-white/10 hover:border-white/20 shadow-2xl
          ${isOpen ? "p-8 md:p-12" : "p-6 md:p-8"}
        `}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* 装饰光效：顶部流光 */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
        
        <motion.h2 
          layout="position"
          className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide font-serif"
        >
          致访客的一封信
        </motion.h2>

        <motion.div layout className="text-gray-300 leading-relaxed space-y-4 font-light text-justify">
          <p>
            在这个数字化的荒原中，我们建立了自己的小小庇护所。
            这里没有算法的推荐，没有无休止的信息流，只有此刻的宁静。
          </p>
          
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p>
                当你看到这段文字的时候，也许是在一个深夜，屏幕的微光照亮了你的脸庞。
                我想创造一个空间，不仅仅是展示代码或设计，而是关于连接。
              </p>
              <p className="mt-4">
                这里存放着我的思绪碎片、未完成的梦想，以及那些稍纵即逝的灵感。
                每一个像素的跳动，都代表着某种可能。它们或许并不完美，但足够真实。
              </p>
              <p className="mt-4">
                不必急着离开，也不必急着寻找意义。
                就像在海边拾起贝壳，有时我们需要的只是那一瞬间的触感。
                愿你能在这里找到片刻的共鸣。
              </p>
              <p className="mt-8 font-serif italic text-right text-white/60">
                —— Rin, 2026
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* 底部渐变遮罩 (仅收起时显示，暗示还有内容) */}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
          />
        )}
        
        {/* 展开/收起 指示器 */}
        <motion.div 
          layout="position"
          className="mt-6 flex justify-center items-center gap-2"
        >
           <motion.div 
             animate={{ rotate: isOpen ? 180 : 0 }}
             className="text-white/40"
           >
             ↓
           </motion.div>
          <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
            {isOpen ? "Fold" : "Unfold"}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
