"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#EBEBEB] text-[#1A1A1A] font-sans selection:bg-[#FF3333] selection:text-white pt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <header className="mb-24 border-b-2 border-[#1A1A1A] pb-8">
          <motion.h1 
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About
          </motion.h1>
          <div className="flex justify-between items-end font-mono text-sm">
             <span className="uppercase tracking-widest bg-[#1A1A1A] text-[#EBEBEB] px-2 py-1">
               Manifesto & Changelog
             </span>
             <span className="opacity-60">
               LAST_UPDATE: 2026-01-28
             </span>
          </div>
        </header>

        {/* Manifesto Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="col-span-1 md:col-span-4">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-4 border-l-4 border-[#FF3333] pl-4">
              The Concept
            </h2>
          </div>
          <div className="col-span-1 md:col-span-8">
            <motion.p 
              className="text-2xl md:text-4xl font-serif italic leading-tight mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              "A digital garden is a place where ideas are planted, nurtured, and allowed to grow wild."
            </motion.p>
            <div className="prose prose-lg prose-neutral max-w-none font-medium opacity-80">
              <p>
                Rin&apos;s Space serves as a living archive of my journey. Unlike a traditional blog which is a stream of finished products, this space is a collection of evolving thoughts, blueprints for future projects, and letters to my future self.
              </p>
              <p>
                Here, I embrace the philosophy of <strong>Working in Public</strong>. By sharing my plans and rough notes, I hope to invite conversation, collaboration, and perhaps inspire others to build their own digital sanctuaries.
              </p>
            </div>
          </div>
        </section>

        {/* Changelog Section */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-4 h-4 bg-[#FF3333]" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">System Updates</h2>
            <div className="flex-1 h-px bg-[#1A1A1A]/20" />
          </div>

          <div className="space-y-0 border-t-2 border-[#1A1A1A]">
            <ChangelogItem 
              version="v2.0.0" 
              date="2026-01-28" 
              title="Brutalist Redesign"
              description="Complete visual overhaul inspired by Griflan. Adopted a high-contrast black/white/red color scheme, custom typography system, and grid-based layout. Removed legacy cursor effects for better usability."
            />
            <ChangelogItem 
              version="v1.5.0" 
              date="2026-01-15" 
              title="Content Expansion"
              description="Added 'Plans', 'Notes', and 'Letters' content collections. Implemented MDX rendering for rich text content and integrated Netlify CMS for easy management."
            />
            <ChangelogItem 
              version="v1.0.0" 
              date="2025-12-01" 
              title="Initial Launch"
              description="Site deployed on Vercel. Basic timeline functionality and responsive layout implemented."
            />
          </div>
        </section>

      </div>
    </main>
  );
}

function ChangelogItem({ version, date, title, description }: { version: string, date: string, title: string, description: string }) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-[#1A1A1A]/20 group hover:bg-white transition-colors duration-300 px-4 -mx-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="col-span-1 md:col-span-2 font-mono text-sm opacity-60 pt-1">
        {date}
      </div>
      <div className="col-span-1 md:col-span-2">
        <span className="inline-block bg-[#1A1A1A] text-white text-xs font-bold px-2 py-1 rounded-sm group-hover:bg-[#FF3333] transition-colors">
          {version}
        </span>
      </div>
      <div className="col-span-1 md:col-span-8">
        <h3 className="text-xl font-bold uppercase mb-2 group-hover:text-[#FF3333] transition-colors">{title}</h3>
        <p className="opacity-70 leading-relaxed max-w-2xl">{description}</p>
      </div>
    </motion.div>
  );
}
