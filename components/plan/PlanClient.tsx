"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
    <main className="min-h-screen bg-[#EBEBEB] text-[#1A1A1A] pt-32 relative overflow-hidden font-mono">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="mb-24 border-b-2 border-[#1A1A1A] pb-8">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-4">
            Blueprints
          </h1>
          <div className="flex justify-between items-end">
             <span className="text-sm font-bold uppercase tracking-widest bg-[#1A1A1A] text-[#EBEBEB] px-2 py-1">
               System Architecture & Roadmaps
             </span>
             <span className="text-xs font-mono opacity-60">
               TOTAL_ENTRIES: {plans.length}
             </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#1A1A1A] border-2 border-[#1A1A1A]">
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#EBEBEB] p-8 h-[400px] flex flex-col justify-between group hover:bg-[#1A1A1A] hover:text-[#00FF00] transition-colors duration-300 relative overflow-hidden"
    >
      <div>
        <div className="flex justify-between items-start mb-6 border-b border-[#1A1A1A]/20 group-hover:border-[#00FF00]/30 pb-4 transition-colors">
          <span className="text-xs font-mono opacity-60 group-hover:opacity-100">
            ID_{plan.date.replace(/-/g, '')}
          </span>
          <div className="w-2 h-2 bg-[#FF3333] group-hover:bg-[#00FF00] transition-colors" />
        </div>
        
        <h2 className="text-2xl font-bold uppercase leading-tight mb-4">
          {plan.title}
        </h2>
        <p className="text-sm opacity-60 line-clamp-4 leading-relaxed font-medium group-hover:opacity-80">
          {plan.content}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {plan.tags?.map(tag => (
          <span key={tag} className="text-[10px] uppercase border border-[#1A1A1A]/20 px-2 py-1 group-hover:border-[#00FF00]/50 group-hover:text-[#00FF00] transition-colors">
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

