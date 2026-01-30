import { getPostBySlug, getPosts } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getPosts("plans");
  return posts.map((post) => ({
    slug: encodeURIComponent(post.id),
  }));
}

export default async function PlanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = getPostBySlug("plans", decodedSlug);

  if (!post) {
    notFound();
  }
  
  const plan = post as any;

  return (
    <main className="min-h-screen bg-[#F0FFF4] text-[#2F855A] font-mono px-6 py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6F6D5] rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9AE6B4] rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/plan" className="inline-flex items-center gap-2 mb-12 px-4 py-2 bg-white rounded-lg text-xs font-bold uppercase tracking-widest text-[#48BB78] border border-[#C6F6D5] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <span>←</span> Back to Garden
        </Link>
        
        <article className="bg-white border-2 border-[#C6F6D5] p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0px_10px_40px_rgba(72,187,120,0.1)]">
            <div className="absolute top-0 right-0 p-4 opacity-50 text-6xl pointer-events-none">
                🌱
            </div>
            
            <header className="mb-12 border-b-2 border-dashed border-[#C6F6D5] pb-8">
                <div className="flex justify-between items-center mb-6 text-xs">
                    <span className="bg-[#F0FFF4] text-[#2F855A] px-2 py-1 rounded font-bold">
                        SEED_{plan.date ? plan.date.replace(/-/g, '').slice(2) : 'UNKNOWN'}
                    </span>
                    <span className="text-[#48BB78] font-bold">STATUS: GROWING</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-[#276749]">{plan.title}</h1>
                <div className="flex flex-wrap gap-2">
                    {plan.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs uppercase border border-[#9AE6B4] px-3 py-1 rounded-full text-[#48BB78] bg-[#F0FFF4] font-bold">
                            #{tag}
                        </span>
                    ))}
                </div>
            </header>

            <div className="prose prose-lg max-w-none text-[#2F855A]">
                <div className="whitespace-pre-wrap leading-relaxed opacity-90">
                    {plan.content}
                </div>
            </div>
        </article>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const post = getPostBySlug("plans", decodedSlug);
    if (!post) return { title: "Not Found" };
    return { title: `${post.title} | Plans` };
}
