"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Notes", path: "/notes" },
  { label: "About", path: "/about" },
  { label: "Letter", path: "/letter" },
];

export default function Header() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center h-24 px-10 pointer-events-none"
    >
      <nav 
        className="pointer-events-auto flex gap-2"
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
