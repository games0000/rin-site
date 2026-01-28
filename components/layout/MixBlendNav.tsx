import Link from "next/link";

export default function MixBlendNav() {
  return (
    <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-start z-[9999] mix-blend-difference text-white pointer-events-none">
      <Link href="/" className="text-2xl font-black tracking-tighter uppercase pointer-events-auto hover:opacity-50 transition-opacity cursor-pointer">
        Rin&apos;s Space
      </Link>
      <div className="flex flex-col items-end gap-1 text-sm font-bold uppercase tracking-widest pointer-events-auto">
        <Link href="/timeline" className="hover:opacity-50 transition-opacity cursor-pointer">Timeline</Link>
        <Link href="/plan" className="hover:opacity-50 transition-opacity cursor-pointer">Plans</Link>
        <Link href="/notes" className="hover:opacity-50 transition-opacity cursor-pointer">Notes</Link>
        <Link href="/letter" className="hover:opacity-50 transition-opacity cursor-pointer">Letters</Link>
        <Link href="/about" className="hover:opacity-50 transition-opacity cursor-pointer">About</Link>
      </div>
    </nav>
  );
}
