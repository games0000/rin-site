"use client";

import { motion } from "framer-motion";

interface Plan {
  id: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

export default function PlanClient({ plans }: { plans: Plan[] }) {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 relative">
      <div className="fixed inset-0 bg-black/10 pointer-events-none z-0" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-serif text-white mb-12 border-b border-white/20 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Plans & Thoughts
        </motion.h1>

        <div className="space-y-16">
          {plans.map((plan, index) => (
            <motion.article 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                <span className="text-white/40 font-mono text-sm shrink-0">{plan.date}</span>
                <h2 className="text-2xl font-medium text-white/90 group-hover:text-white transition-colors">
                  {plan.title}
                </h2>
              </div>
              
              <div className="md:pl-24">
                <p className="text-white/70 leading-relaxed text-lg font-light mb-4 whitespace-pre-wrap">
                  {plan.content}
                </p>
                <div className="flex gap-3">
                  {plan.tags && plan.tags.map(tag => (
                    <span key={tag} className="text-xs text-white/30 border border-white/10 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
