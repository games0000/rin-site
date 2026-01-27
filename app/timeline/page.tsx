import { getPosts } from "@/lib/api";
import TimelineClient from "@/components/timeline/TimelineClient";

interface TimelineEvent {
  id: string;
  date: string;
  year?: string;
  title: string;
  description: string;
  category?: "Life" | "Work" | "Project" | "Idea";
}

export default function TimelinePage() {
  const timelineEvents = getPosts("timeline") as unknown as TimelineEvent[];

  return <TimelineClient events={timelineEvents} />;
}
