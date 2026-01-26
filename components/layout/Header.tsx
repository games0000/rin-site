"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Notes", path: "/notes" },
  { label: "About", path: "/about" },
  { label: "Letter", path: "/letter" },
];

export default function Header() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center md:justify-end items-center h-20 md:h-24 px-4 md:px-10 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled 
          ? "bg-transparent" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* 破碎背景层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 碎片 1: 左上大块 */}
        <motion.div
          className="absolute top-0 left-0 w-[70%] h-full bg-white/[0.02] backdrop-blur-md border-b border-r border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: scrolled ? 0 : -100, 
            opacity: scrolled ? 1 : 0,
            x: scrolled ? 0 : -20
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* 碎片 2: 右侧大块，与左侧错位 */}
        <motion.div
          className="absolute top-0 right-0 w-[40%] h-full bg-white/[0.03] backdrop-blur-lg border-b border-l border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: scrolled ? 0 : -100, 
            opacity: scrolled ? 1 : 0,
            x: scrolled ? 0 : 20
          }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* 碎片 3: 中间下方的裂痕补丁，增加破碎感 */}
        <motion.div
          className="absolute bottom-0 left-[60%] w-[15%] h-[40%] bg-white/[0.05] backdrop-blur-sm border-t border-white/20"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: scrolled ? 1 : 0,
            scale: scrolled ? 1 : 0.8,
            y: scrolled ? 0 : 10
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      <nav 
        className="relative z-10 pointer-events-auto flex gap-2"
        onMouseLeave={() => setHoveredPath(null)}
      >
        {navItems.map((item) => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative px-4 py-2 rounded-full"
              onMouseEnter={() => setHoveredPath(item.path)}
              onClick={() => {
                if (item.path === "/") {
                  window.dispatchEvent(new Event("reset-home-view"));
                }
              }}
            >
              {/* 悬停时的透明圆框背景 */}
              {hoveredPath === item.path && (
                <motion.div
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* 激活状态的背景（可选，如果不想要激活状态有背景，可以删掉这段） */}
              {/* {isActive && hoveredPath !== item.path && (
                 <div className="absolute inset-0 bg-white/20 rounded-full border border-white/20" />
              )} */}

              <motion.span
                className={`
                  relative z-10 text-sm md:text-lg font-medium block transition-colors duration-300
                  ${isActive ? "text-white font-bold" : "text-gray-400"}
                  ${
                    hoveredPath === item.path && !isActive
                      ? "text-gray-200"
                      : ""
                  }
                `}
                style={{
                  textShadow: isActive
                    ? "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)"
                    : hoveredPath === item.path
                    ? "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)"
                    : "none",
                }}
                animate={
                  hoveredPath === item.path
                    ? {
                        x: [0, -2, 2, -2, 2, 0],
                        scale: 1.1,
                      }
                    : { x: 0, scale: 1 }
                }
                transition={{
                  x: { duration: 0.3, ease: "easeInOut" },
                  scale: { duration: 0.2 },
                }}
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
