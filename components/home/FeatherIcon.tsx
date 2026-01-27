"use client";

import { motion } from "framer-motion";

export default function FeatherIcon() {
  return (
    <div className="flex justify-center items-center py-4">
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-white/60"
      >
        {/* 羽毛笔杆 - 优雅的曲线 */}
        <motion.path
          d="M30 90 Q 60 30 85 15"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        
        {/* 羽毛细节 - 增加纹理感 */}
        <motion.path
          d="M85 15 Q 75 35 65 45 M80 20 Q 70 40 60 50 M75 25 Q 65 45 55 55"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        />

        {/* 书写轨迹 - 连笔字效果 */}
        <motion.path
          d="M25 95 C 35 95, 35 85, 40 90 C 45 95, 50 85, 60 90"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 1.2, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 4,
            repeatType: "loop"
          }}
        />
      </svg>
    </div>
  );
}
