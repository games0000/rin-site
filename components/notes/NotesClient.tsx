"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Note {
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function NotesClient({ notes }: { notes: Note[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#E5E5E5] text-[#1A1A1A] relative overflow-hidden font-serif">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <header className="mb-24 text-center">
          <span className="block text-xs font-sans font-bold uppercase tracking-[0.3em] mb-4 text-[#FF3333]">
            Personal Archive
          </span>
          <h1 className="text-6xl md:text-8xl font-serif italic font-bold mb-8">
            Notes
          </h1>
          <div className="w-12 h-1 bg-[#1A1A1A] mx-auto" />
        </header>

        <div className="space-y-16">
          {notes.map((note, index) => (
            <NoteItem key={note.id} note={note} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function NoteItem({ note, index }: { note: Note; index: number }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative pl-8 border-l-2 border-[#1A1A1A]/10 hover:border-[#1A1A1A] transition-colors duration-500"
    >
      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#1A1A1A] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <span className="text-xs font-sans font-bold uppercase tracking-widest opacity-40 mb-2 block">
        {note.date}
      </span>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-[#FF3333] transition-colors leading-tight">
        {note.title}
      </h2>
      
      <div className="prose prose-lg prose-neutral max-w-none font-serif leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
        <p className="whitespace-pre-wrap">{note.content}</p>
      </div>
    </motion.article>
  );
}
