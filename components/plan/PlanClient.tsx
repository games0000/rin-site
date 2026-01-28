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
    <main className="min-h-screen bg-black text-white p-6 pt-32 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h1 
          className="text-7xl md:text-[10rem] font-serif font-bold text-white/5 leading-none mb-12 absolute top-0 left-0 pointer-events-none select-none"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          PLANS
        </motion.h1>

        <div className="mt-32 md:mt-64 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              index={index} 
              isHovered={hoveredId === plan.id}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function PlanCard({ plan, index, isHovered, onHover }: { plan: Plan; index: number; isHovered: boolean; onHover: (id: string | null) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(plan.id)}
      onMouseLeave={() => onHover(null)}
      className={`
        relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden cursor-pointer
        ${isHovered ? 'z-20' : 'z-10'}
      `}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
    >
      {/* Animated Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />

      <div className="relative z-10 h-full flex flex-col justify-between min-h-[300px]">
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">{plan.date}</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 leading-tight">{plan.title}</h2>
          <p className="text-white/60 font-light line-clamp-4 leading-relaxed">
            {plan.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {plan.tags?.map(tag => (
            <span key={tag} className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded hover:bg-white/10 hover:text-white/80 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
