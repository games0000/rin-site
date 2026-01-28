import { getPostBySlug } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export default async function LetterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug("letters", slug);

  if (!post) {
    notFound();
  }
  
  const letter = post as any;

  return (
    <main className="min-h-screen bg-[#FFFAF0] text-[#7B341E] flex flex-col items-center py-24 px-6 font-sans relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#F56565,#F56565_20px,#FFF_20px,#FFF_40px,#4299E1_40px,#4299E1_60px,#FFF_60px,#FFF_80px)] opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#F56565,#F56565_20px,#FFF_20px,#FFF_40px,#4299E1_40px,#4299E1_60px,#FFF_60px,#FFF_80px)] opacity-50" />

        <div className="w-full max-w-2xl relative z-10">
            <Link href="/letter" className="inline-flex items-center gap-2 mb-12 px-4 py-2 bg-white rounded-lg text-xs font-bold uppercase tracking-widest text-[#ED8936] border border-[#FBD38D] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span>←</span> Return to Desk
            </Link>

            <div className="bg-white border-2 border-[#FBD38D] shadow-[0px_10px_40px_rgba(237,137,54,0.1)] p-10 md:p-16 rounded-sm relative">
                {/* Stamp Decor */}
                <div className="absolute top-8 right-8 w-20 h-24 border-2 border-dashed border-[#FBD38D] flex items-center justify-center rotate-12 opacity-50">
                    <span className="text-xs font-bold text-[#ED8936] uppercase">Postage<br/>Paid</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b-2 border-dashed border-[#FEEBC8] pb-6 gap-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tight text-[#C05621]">{letter.title}</h1>
                    <span className="font-mono text-xs font-bold bg-[#FEEBC8] text-[#C05621] px-3 py-1 rounded whitespace-nowrap">{letter.date}</span>
                </div>
                
                <div className="prose prose-lg prose-orange max-w-none">
                    <div className="font-medium leading-relaxed whitespace-pre-wrap opacity-90 text-[#7B341E]">
                        {letter.content}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t-2 border-dashed border-[#FEEBC8] text-center">
                    <span className="text-xs font-bold text-[#ED8936] uppercase tracking-widest">
                        Sent with care from Rin's Space
                    </span>
                </div>
            </div>
        </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug("letters", slug);
    if (!post) return { title: "Not Found" };
    return { title: `${post.title} | Letters` };
}
