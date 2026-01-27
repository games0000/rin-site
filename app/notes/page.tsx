import { getPosts } from "@/lib/api"; // Keep API for server component since it works on server side
// import Link from "next/link"; // Removed unused import

export default function NotesPage() {
  const notes = getPosts("notes");

  return (
    <main className="min-h-screen flex flex-col items-center pt-32 p-8 relative overflow-hidden">
      {/* 简单的背景遮罩，增加文字对比度 */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      <div className="w-full max-w-2xl z-10">
        <h1 className="text-4xl font-serif text-white mb-12">Notes</h1>
        <div className="space-y-8">
          {notes.map((note: any) => (
            <div key={note.id} className="block group border-b border-white/10 pb-8">
              <div className="text-sm text-white/40 mb-2 font-mono">{note.date}</div>
              <h2 className="text-2xl font-medium text-white/90 group-hover:text-white transition-colors mb-4">
                {note.title}
              </h2>
              <div className="text-white/70 font-light leading-relaxed prose prose-invert whitespace-pre-wrap">
                 {note.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
