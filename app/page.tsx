import { getPosts } from "@/lib/api";
import HomeClient from "@/components/home/HomeClient";

export default function Home() {
  const recentPlans = getPosts("plans").slice(0, 3).map((p: any) => ({ ...p, link: "/plan", excerpt: p.content.slice(0, 100) + "..." }));
  const recentNotes = getPosts("notes").slice(0, 3).map((p: any) => ({ ...p, link: "/notes", excerpt: p.content.slice(0, 100) + "..." }));
  const recentLetters = getPosts("letters").slice(0, 2).map((p: any) => ({ ...p, link: "/letter", excerpt: p.content.slice(0, 100) + "..." }));

  return (
    <HomeClient 
      recentPlans={recentPlans}
      recentNotes={recentNotes}
      recentLetters={recentLetters}
    />
  );
}
