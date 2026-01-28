import "./globals.css";
import MixBlendNav from "../components/layout/MixBlendNav";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#EBEBEB] text-[#1A1A1A]`}
      >
        <MixBlendNav />
        {children}
      </body>
    </html>
  );
}
