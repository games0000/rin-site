import { getPostBySlug, getPosts } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getPosts("timeline");
  return posts.map((post) => ({
    slug: encodeURIComponent(post.id),
  }));
}

export default async function TimelineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = getPostBySlug("timeline", decodedSlug);

  if (!post) {
    notFound();
  }
  
  const event = post as any;
  // Handle date/dateString inconsistency
  const date = event.date || event.dateString || "";

  return (
    <main className="min-h-screen bg-[#EBF8FF] text-[#2C5282] px-6 py-24 md:py-32 font-sans selection:bg-[#90CDF4] selection:text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-20 right-20 text-[#BEE3F8] text-9xl opacity-30 pointer-events-none">☁️</div>
      <div className="fixed bottom-10 left-10 text-[#BEE3F8] text-6xl opacity-30 pointer-events-none">⭐</div>

      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/timeline" className="inline-flex items-center gap-2 mb-12 px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-[#4299E1] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <span>←</span> Back to Timeline
        </Link>
        
        <article className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0px_10px_40px_rgba(66,153,225,0.1)] border-2 border-transparent relative">
            
            <header className="mb-12 border-b-2 border-dashed border-[#BEE3F8] pb-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="font-sans text-sm font-bold tracking-widest bg-[#EBF8FF] text-[#3182CE] px-4 py-1.5 rounded-full">
                        {date}
                    </span>
                    {event.category && (
                        <span className="bg-[#4299E1] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg">
                            {event.category}
                        </span>
                    )}
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-[#2B6CB0]">{event.title}</h1>
            </header>

            <div className="prose prose-lg prose-blue max-w-none">
                <p className="text-xl font-medium leading-relaxed mb-8 text-[#2C5282]">{event.description}</p>
                <div className="whitespace-pre-wrap font-medium leading-relaxed opacity-90 text-[#4A5568]">
                    {event.content}
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
    const post = getPostBySlug("timeline", decodedSlug);
    if (!post) return { title: "Not Found" };
    return { title: `${post.title} | Timeline` };
}
