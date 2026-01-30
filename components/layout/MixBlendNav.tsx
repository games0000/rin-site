"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MixBlendNav() {
  const pathname = usePathname();

  // Don't render the nav on the Keystatic admin pages
  if (pathname?.startsWith("/keystatic")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-[9999] pointer-events-none">
      <Link href="/" className="pointer-events-auto group">
        <div className="bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-[#FFD1DC] shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-[#FF8E8E] group-hover:text-[#FFB7B2] transition-colors font-rounded">
            Rin&apos;s Space
            </span>
            <span className="text-lg group-hover:rotate-12 transition-transform">✨</span>
        </div>
      </Link>

      <div className="flex flex-col items-end gap-2 pointer-events-auto">
        {[
            { label: "Timeline", path: "/timeline", icon: "☁️", color: "text-[#4299E1]", border: "border-[#BEE3F8]", bg: "hover:bg-[#EBF8FF]" },
            { label: "Plans", path: "/plan", icon: "🌱", color: "text-[#48BB78]", border: "border-[#C6F6D5]", bg: "hover:bg-[#F0FFF4]" },
            { label: "Notes", path: "/notes", icon: "✿", color: "text-[#FF8E8E]", border: "border-[#FFD1DC]", bg: "hover:bg-[#FFF0F5]" },
            { label: "Letters", path: "/letter", icon: "💌", color: "text-[#ED8936]", border: "border-[#FBD38D]", bg: "hover:bg-[#FFFAF0]" },
            { label: "About", path: "/about", icon: "🧸", color: "text-[#A0AEC0]", border: "border-[#E2E8F0]", bg: "hover:bg-[#F7FAFC]" },
        ].map((item) => (
            <Link 
                key={item.path} 
                href={item.path}
                className={`bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-xl border-2 ${item.border} shadow-sm hover:shadow-md hover:-translate-x-1 transition-all duration-300 flex items-center gap-2 ${item.bg} group`}
            >
                <span className={`text-xs font-bold uppercase tracking-wider ${item.color} font-mono`}>
                    {item.label}
                </span>
                <span className="text-xs group-hover:scale-110 transition-transform">{item.icon}</span>
            </Link>
        ))}
      </div>
    </nav>
  );
}
