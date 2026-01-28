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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        <motion.header 
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Notes
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-lg mx-auto">
            Fragments of thought, code snippets, and digital gardening.
          </p>
        </motion.header>

        <div className="space-y-32">
          {notes.map((note, index) => (
            <NoteItem key={note.id} note={note} index={index} />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed left-0 bottom-0 h-1 bg-white z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  );
}

function NoteItem({ note, index }: { note: Note; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.article 
      ref={ref}
      style={{ opacity, scale }}
      className="group relative"
    >
      <div className="absolute -left-12 top-0 hidden md:flex flex-col items-center h-full">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 w-2 h-2 rounded-full bg-white/50 ring-4 ring-black" />
      </div>

      <div className="pl-0 md:pl-12 border-l border-white/10 md:border-none">
        <span className="inline-block text-sm font-mono text-white/40 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5">
          {note.date}
        </span>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight group-hover:text-blue-200 transition-colors duration-300">
          {note.title}
        </h2>
        
        <div className="prose prose-invert prose-lg max-w-none text-white/70 font-light leading-relaxed">
          <p className="whitespace-pre-wrap">{note.content}</p>
        </div>
      </div>
    </motion.article>
  );
}
