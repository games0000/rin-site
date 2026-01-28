import "./globals.css";
import MixBlendNav from "../components/layout/MixBlendNav";
import { Nunito, Fredoka, Patrick_Hand, Quicksand } from "next/font/google";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "700", "900"] });
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["400", "600"] });
const patrickHand = Patrick_Hand({ variable: "--font-patrick", subsets: ["latin"], weight: ["400"] });
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Rin's Space",
  description: "Digital Garden & Archive",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${fredoka.variable} ${patrickHand.variable} ${quicksand.variable} antialiased bg-[#FFF8F0] text-[#1A1A1A]`}
      >
        <MixBlendNav />
        {children}
      </body>
    </html>
  );
}
