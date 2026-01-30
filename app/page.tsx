import { getPosts } from "@/lib/api";
import HomeClient from "@/components/home/HomeClient";

// Define strict types matching the API response
interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
  [key: string]: unknown;
}

export default function Home() {
  const recentPlans = (getPosts("plans") as unknown as PostData[]).map((p) => ({ ...p, link: "/plan", excerpt: p.content.slice(0, 100) + "..." }));
  const recentNotes = (getPosts("notes") as unknown as PostData[]).map((p) => ({ ...p, link: "/notes", excerpt: p.content.slice(0, 100) + "..." }));
  const recentLetters = (getPosts("letters") as unknown as PostData[]).map((p) => ({ ...p, link: "/letter", excerpt: p.content.slice(0, 100) + "..." }));
  const recentTimeline = (getPosts("timeline") as unknown as PostData[]).map((p) => ({ ...p, link: "/timeline", excerpt: p.content.slice(0, 100) + "..." }));

  return (
    <HomeClient 
      recentPlans={recentPlans}
      recentNotes={recentNotes}
      recentLetters={recentLetters}
      recentTimeline={recentTimeline}
    />
  );
}
