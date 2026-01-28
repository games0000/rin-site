"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7FAFC] text-[#4A5568] font-sans selection:bg-[#E2E8F0] selection:text-[#2D3748] pt-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 pointer-events-none -rotate-12 animate-bounce delay-1000">🧸</div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-[#E2E8F0] rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#EDF2F7] rounded-full blur-3xl opacity-60 pointer-events-none animate-pulse delay-700" />
      <div className="absolute top-1/2 right-10 text-4xl opacity-10 rotate-45 pointer-events-none">✨</div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <header className="mb-24 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block mb-6 relative"
          >
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-lg border-4 border-[#E2E8F0]">
                👋
            </div>
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 text-2xl"
            >
                ✨
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-[#2D3748] font-rounded flex justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {"About Me".split(" ").map((word, i) => (
                <span key={i} className="inline-block">
                    {word.split("").map((char, j) => (
                        <motion.span
                            key={j}
                            className="inline-block hover:text-[#4A5568] transition-colors cursor-pointer"
                            whileHover={{ scale: 1.3, rotate: Math.random() * 20 - 10 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 flex-wrap"
          >
             <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-[#E2E8F0] text-sm font-bold uppercase tracking-widest text-[#718096] flex items-center gap-2 font-mono">
                Designer 🎨
             </span>
             <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-[#E2E8F0] text-sm font-bold uppercase tracking-widest text-[#718096] flex items-center gap-2 font-mono">
                Developer 💻
             </span>
             <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-[#E2E8F0] text-sm font-bold uppercase tracking-widest text-[#718096] flex items-center gap-2 font-mono">
                Dreamer 🌙
             </span>
          </motion.div>
        </header>

        {/* Profile Card */}
        <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#E2E8F0] mb-24 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7FAFC] rounded-full -translate-y-1/2 translate-x-1/2 z-0" />
            
            <div className="relative z-10">
                <div className="inline-block bg-[#EDF2F7] px-4 py-2 rounded-lg text-[#4A5568] font-bold text-sm transform -rotate-2 mb-8 shadow-sm font-hand">
                    The Concept 💡
                </div>
                
                <motion.p 
                    className="text-2xl md:text-4xl font-black leading-tight mb-8 text-[#2D3748] text-center font-rounded"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    "A digital garden is a place where ideas are planted, nurtured, and allowed to grow wild."
                </motion.p>
                
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#4A5568]/80 leading-loose text-lg font-sans"
                >
                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <p className="mb-4">
                            <strong>Rin&apos;s Space</strong> is not just a website; it&apos;s a living, breathing archive of my journey. Unlike a traditional portfolio that only shows the polished final result, this space celebrates the messy, beautiful process of creation.
                        </p>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                        <p>
                            I believe in <strong>Working in Public</strong>. By sharing my rough drafts, blueprints, and personal letters, I hope to create a space that feels human in an increasingly algorithmic world.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {[
                { label: "Est.", value: "2026", icon: "📅" },
                { label: "Location", value: "Tokyo", icon: "🗼" },
                { label: "Mood", value: "Cozy", icon: "☕" },
                { label: "Status", value: "Online", icon: "🟢" },
            ].map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl border border-[#E2E8F0] text-center hover:shadow-md transition-all hover:-translate-y-1"
                >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xl font-black text-[#2D3748] font-rounded">{stat.value}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#A0AEC0] font-mono">{stat.label}</div>
                </motion.div>
            ))}
        </section>

        {/* Changelog Section */}
        <section className="relative">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-[#CBD5E0]" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-[#A0AEC0] flex items-center gap-2 font-mono">
                <span>System Updates</span>
                <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    ⚙️
                </motion.span>
            </h2>
            <div className="h-px w-12 bg-[#CBD5E0]" />
          </div>

          <div className="space-y-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-[#E2E8F0] md:left-1/2 md:-translate-x-1/2 z-0" />

            <ChangelogItem 
              version="v2.0.0" 
              date="2026-01-28" 
              title="Wonderland Redesign"
              description="Transformed the site into a cozy digital garden! Adopted a soft pastel color palette, cute icons, and playful interactions. Every section now has its own unique theme."
              emoji="🎨"
              align="left"
            />
            <ChangelogItem 
              version="v1.5.0" 
              date="2026-01-15" 
              title="Content Expansion"
              description="Added 'Plans', 'Notes', and 'Letters' content collections. Implemented MDX rendering for rich text content."
              emoji="📝"
              align="right"
            />
            <ChangelogItem 
              version="v1.0.0" 
              date="2025-12-01" 
              title="Initial Launch"
              description="Site deployed on Vercel. Basic timeline functionality and responsive layout implemented."
              emoji="🚀"
              align="left"
            />
          </div>
        </section>
        
        {/* Bottom Spacer */}
        <div className="h-24" />

      </div>
    </main>
  );
}

function ChangelogItem({ version, date, title, description, emoji, align = "left" }: { version: string, date: string, title: string, description: string, emoji: string, align?: "left" | "right" }) {
  return (
    <motion.div 
      className={`relative z-10 grid grid-cols-[40px_1fr] md:grid-cols-2 gap-8 md:gap-0 items-center ${align === "right" ? "md:text-right" : ""}`}
      initial={{ opacity: 0, x: align === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      {/* Mobile Icon (always left) */}
      <div className="md:hidden w-10 h-10 bg-white rounded-full border-2 border-[#E2E8F0] flex items-center justify-center text-xl shadow-sm z-10">
        {emoji}
      </div>

      {/* Content Card */}
      <div className={`
        bg-white p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#CBD5E0] hover:shadow-lg transition-all duration-300 group
        ${align === "right" ? "md:order-1 md:ml-12" : "md:mr-12"}
      `}>
        <div className={`flex flex-col gap-2 mb-3 ${align === "right" ? "md:items-end" : ""}`}>
            <div className="flex items-center gap-3">
                <span className="inline-block bg-[#EDF2F7] text-[#4A5568] text-xs font-bold px-3 py-1 rounded-full group-hover:bg-[#E2E8F0] transition-colors font-mono">
                    {version}
                </span>
                <span className="font-mono text-xs text-[#A0AEC0] font-bold uppercase tracking-wide">
                    {date}
                </span>
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] group-hover:text-[#4A5568] transition-colors font-rounded">{title}</h3>
        </div>
        <p className="text-[#718096] leading-relaxed text-sm font-medium font-sans">{description}</p>
      </div>

      {/* Desktop Icon (Center) */}
      <div className={`
        hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-[#F7FAFC] items-center justify-center text-2xl shadow-sm z-10
        ${align === "right" ? "order-2" : ""}
      `}>
        {emoji}
      </div>

      {/* Empty space for grid balance */}
      <div className={`hidden md:block ${align === "right" ? "order-last" : "order-first"}`} />
      
    </motion.div>
  );
}
