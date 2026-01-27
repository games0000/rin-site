import { getPosts } from "@/lib/api";
import TimelineClient from "@/components/timeline/TimelineClient";

export default function TimelinePage() {
  const timelineEvents = getPosts("timeline");

  return <TimelineClient events={timelineEvents as any} />;
}
