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
  const rawEvents = getPosts("timeline");
  const timelineEvents = rawEvents.map((event: any) => ({
    ...event,
    date: event.date || event.dateString || "Unknown Date",
  })) as TimelineEvent[];

  return <TimelineClient events={timelineEvents} />;
}
