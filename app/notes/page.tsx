import { getPosts } from "@/lib/api";
import NotesClient from "@/components/notes/NotesClient";

interface Note {
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function NotesPage() {
  const notes = getPosts("notes") as unknown as Note[];

  return <NotesClient notes={notes} />;
}
