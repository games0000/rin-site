import Link from "next/link";

export default function MixBlendNav() {
  return (
    <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-start z-[9998] pointer-events-none mix-blend-difference text-white">
      <Link href="/" className="text-2xl font-black tracking-tighter uppercase pointer-events-auto hover:opacity-50 transition-opacity">
        Rin&apos;s Space
      </Link>
      <div className="flex flex-col items-end gap-1 text-sm font-bold uppercase tracking-widest pointer-events-auto">
        <Link href="/about" className="hover:opacity-50 transition-opacity">About</Link>
        <Link href="/timeline" className="hover:opacity-50 transition-opacity">Timeline</Link>
        <Link href="/plan" className="hover:opacity-50 transition-opacity">Plans</Link>
        <Link href="/notes" className="hover:opacity-50 transition-opacity">Notes</Link>
        <Link href="/letter" className="hover:opacity-50 transition-opacity">Letters</Link>
      </div>
    </nav>
  );
}
