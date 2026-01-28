"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface Plan {
  id: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

export default function PlanClient({ plans }: { plans: Plan[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F0FFF4] text-[#2F855A] pt-32 relative overflow-hidden font-mono">
      {/* Decorative background elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-64 bg-[#C6F6D5] rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#9AE6B4] rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" 
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <header className="mb-24 border-b-2 border-dashed border-[#9AE6B4] pb-8 flex flex-col items-start">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-3 py-1 bg-[#C6F6D5] text-[#276749] rounded-lg text-xs font-bold uppercase tracking-widest mb-4"
          >
            Garden of Ideas
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-[#276749] flex items-center gap-4">
            <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex"
            >
                {"GARDEN".split("").map((char, i) => (
                    <motion.span
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 10, color: "#48BB78" }}
                        className="inline-block cursor-pointer"
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span> 
            <motion.span 
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl inline-block"
            >
                🌱
            </motion.span>
          </h1>
          <div className="flex justify-between items-end w-full">
             <span className="text-sm font-bold uppercase tracking-widest text-[#48BB78]">
               Growth & Milestones
             </span>
             <span className="text-xs font-mono opacity-60 bg-white px-2 py-1 rounded border border-[#C6F6D5]">
               SEEDS_PLANTED: {plans.length}
             </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white p-8 h-[400px] group rounded-3xl border-2 border-[#C6F6D5] hover:border-[#48BB78] hover:shadow-[8px_8px_0px_0px_#9AE6B4] transition-all duration-300 relative overflow-hidden"
    >
      <Link href={`/plan/${plan.id}`} className="flex flex-col justify-between h-full relative z-10">
      <div>
        <div 
            className="flex justify-between items-start mb-6 border-b border-[#F0FFF4] pb-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#48BB78] bg-[#F0FFF4] px-2 py-1 rounded">
            SEED_{plan.date.replace(/-/g, '').slice(2)}
          </span>
          <div className="text-xl group-hover:scale-125 transition-transform duration-300 group-hover:rotate-12">🌿</div>
        </div>
        
        <h2 
            className="text-2xl font-bold uppercase leading-tight mb-4 text-[#276749] group-hover:text-[#2F855A] transition-colors"
        >
          {plan.title}
        </h2>
        <p 
            className="text-sm text-[#2F855A]/70 line-clamp-4 leading-relaxed font-medium"
        >
          {plan.content}
        </p>
      </div>

      <div 
        className="flex flex-wrap gap-2 mt-auto"
      >
        {plan.tags?.map(tag => (
          <span key={tag} className="text-[10px] uppercase border border-[#C6F6D5] px-2 py-1 rounded-full text-[#48BB78] bg-[#F0FFF4] group-hover:bg-[#C6F6D5] transition-colors">
            #{tag}
          </span>
        ))}
      </div>
      
      {/* Hidden flower that appears on hover */}
      <div className="absolute -bottom-10 -right-10 text-9xl opacity-0 group-hover:opacity-10 group-hover:-bottom-4 group-hover:-right-4 transition-all duration-500 pointer-events-none rotate-12">
        🌻
      </div>
      </Link>
    </motion.div>
  );
}

