"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TimelineEvent {
  id: string;
  date: string; // From markdown frontmatter "date" or "dateString"
  year?: string;
  title: string;
  description: string;
  category?: "Life" | "Work" | "Project" | "Idea";
}

export default function TimelineClient({ events }: { events: TimelineEvent[] }) {
  const [search, setSearch] = useState("");
  
  const filteredEvents = events.filter((event) => 
    event.title.toLowerCase().includes(search.toLowerCase()) || 
    event.description?.toLowerCase().includes(search.toLowerCase()) ||
    event.year?.includes(search)
  );

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 relative">
      <div className="fixed inset-0 bg-black/10 pointer-events-none z-0" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Timeline</h1>
          <input
            type="text"
            placeholder="Search timeline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
          />
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-12 pl-8 md:pl-0">
          {filteredEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center"
            >
              {/* Date (Left on Desktop) */}
              <div className="hidden md:block text-right">
                <span className="text-white/40 font-mono text-sm">{event.date}</span>
              </div>

              {/* Dot */}
              <div className="absolute left-[-37px] md:static md:left-auto flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm" />
              </div>

              {/* Content (Right on Desktop) */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="md:hidden text-white/40 font-mono text-xs mb-2">{event.date}</div>
                <h3 className="text-xl font-medium text-white/90 mb-2">{event.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  {event.description}
                </p>
                {event.category && (
                  <span className="text-[10px] uppercase tracking-wider text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
                    {event.category}
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center text-white/30 py-10">
              No events found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
