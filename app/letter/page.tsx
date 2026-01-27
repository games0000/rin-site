import { getPosts } from "@/lib/api";
import LetterClient from "@/components/letter/LetterClient";

interface Letter {
  id: string;
  title: string;
  date: string;
  content: string;
  color?: string;
}

export default function LetterPage() {
  const letters = getPosts("letters") as unknown as Letter[];

  return <LetterClient letters={letters} />;
}
