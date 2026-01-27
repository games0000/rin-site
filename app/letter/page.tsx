import { getPosts } from "@/lib/api";
import LetterClient from "@/components/letter/LetterClient";

export default function LetterPage() {
  const letters = getPosts("letters");

  return <LetterClient letters={letters as any} />;
}
