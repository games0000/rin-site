"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface Note {
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function NotesClient({ notes }: { notes: Note[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#FFF8F0] text-[#1A1A1A] relative overflow-hidden font-sans">
      {/* Decorative background blobs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-20 left-20 w-64 h-64 bg-[#FFE4E1] rounded-full blur-3xl opacity-40 -z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="fixed bottom-20 right-20 w-80 h-80 bg-[#FFF0F5] rounded-full blur-3xl opacity-50 -z-10" 
      />

      <div className="max-w-5xl mx-auto px-6 py-32">
        <header className="mb-24 text-center relative">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block relative"
            >
                <motion.div 
                    animate={{ rotate: [12, 24, 12] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 text-4xl"
                >
                    ✨
                </motion.div>
                <motion.div 
                    animate={{ rotate: [-12, -24, -12] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 -left-8 text-3xl"
                >
                    ✿
                </motion.div>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#FF8E8E] mb-4 drop-shadow-sm font-rounded flex justify-center gap-2">
                    {"NOTES".split("").map((char, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ y: -10, rotate: i % 2 === 0 ? 10 : -10 }}
                            className="inline-block cursor-default"
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>
                <p className="font-medium text-[#1A1A1A]/50 tracking-wide font-hand text-xl">
                    Little fragments of thought
                </p>
            </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <NoteItem key={note.id} note={note} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function NoteItem({ note, index }: { note: Note; index: number }) {
  const truncatedContent = note.content.length > 120 
    ? note.content.substring(0, 120) + "..." 
    : note.content;

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? 2 : -2 }}
      className="group relative bg-white p-8 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[4px_8px_24px_rgba(255,183,178,0.4)] border-2 border-transparent hover:border-[#FFB7B2] transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Pop effect on hover */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#FFF0F5] rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />

      <div className="mb-6 flex justify-between items-center relative z-10">
        <span className="inline-block px-3 py-1 bg-[#FFF0F5] text-[#FF8E8E] text-xs font-bold uppercase tracking-wider rounded-full font-mono">
            {note.date}
        </span>
        <div className="w-2 h-2 rounded-full bg-[#FFD1DC] group-hover:bg-[#FF8E8E] transition-colors" />
      </div>
      
      <Link href={`/notes/${note.id}`} className="block mb-4 relative z-10">
        <h2 className="text-2xl font-bold mb-3 text-[#1A1A1A] group-hover:text-[#FF8E8E] transition-colors leading-tight font-rounded">
            {note.title}
        </h2>
      </Link>
      
      <div className="flex-1 mb-6 relative z-10">
        <p className="text-[#1A1A1A]/60 leading-relaxed text-sm font-medium font-sans">
            {truncatedContent}
        </p>
      </div>

      <div className="pt-4 border-t border-[#FFF0F5] relative z-10">
        <Link href={`/notes/${note.id}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF8E8E] hover:gap-3 transition-all font-mono">
            Read Note <span>➜</span>
        </Link>
      </div>
    </motion.article>
  );
}
