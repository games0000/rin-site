"use client";

import { motion } from "framer-motion";
import { changelog } from "@/lib/data"; // Still using data.ts for now as we didn't migrate changelog to md

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 relative">
      <div className="fixed inset-0 bg-black/10 pointer-events-none z-0" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-serif text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About & Changelog
        </motion.h1>

        <div className="space-y-12">
          {changelog.map((log, index) => (
            <motion.div 
              key={log.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex justify-between items-baseline mb-6 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-mono text-white/90">{log.version}</h2>
                <span className="text-white/40 text-sm font-mono">{log.date}</span>
              </div>
              <ul className="space-y-3">
                {log.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 font-light">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center text-white/30 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Built with Next.js, Tailwind CSS, and Framer Motion.</p>
          <p className="mt-2">© 2026 Rin's Space. All rights reserved.</p>
        </motion.div>
      </div>
    </main>
  );
}
