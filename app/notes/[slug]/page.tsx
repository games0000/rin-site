import { getPostBySlug } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export default async function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug("notes", slug);

  if (!post) {
    notFound();
  }
  
  const note = post as any;

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#1A1A1A] px-6 py-24 md:py-32 font-sans selection:bg-[#FFD1DC] selection:text-[#FF8E8E] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#FFE4E1] rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#FFF0F5] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/notes" className="inline-flex items-center gap-2 mb-12 px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-[#FF8E8E] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <span>←</span> Back to Notes
        </Link>
        
        <article className="bg-white p-8 md:p-16 rounded-[2rem] shadow-[0px_10px_40px_rgba(0,0,0,0.03)] border-2 border-white relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFD1DC] via-[#FF8E8E] to-[#FFD1DC] opacity-50" />
            
            <header className="mb-12 border-b-2 border-[#FFF0F5] pb-8 text-center">
                <span className="inline-block px-4 py-1.5 bg-[#FFF0F5] text-[#FF8E8E] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    {note.date}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4 leading-tight tracking-tight">{note.title}</h1>
                <div className="flex justify-center gap-2 text-[#FFD1DC]">
                    <span>✿</span><span>✿</span><span>✿</span>
                </div>
            </header>

            <div className="prose prose-lg prose-neutral max-w-none font-medium leading-loose text-[#1A1A1A]/80">
                <div className="whitespace-pre-wrap">
                    {note.content}
                </div>
            </div>
        </article>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug("notes", slug);
    if (!post) return { title: "Not Found" };
    return { title: `${post.title} | Notes` };
}
