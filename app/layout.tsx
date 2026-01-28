import "./globals.css";
// import Header from "../components/layout/Header"; // Removed to avoid duplicate navigation
// import InteractiveBackground from "../components/layout/InteractiveBackground"; // Removed as requested by new design
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Rin's Space",
  description: "Digital Garden & Archive",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon.ico in public folder
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <InteractiveBackground /> Removed legacy background */}
        {/* <Header /> Removed legacy header */}
        {children}
      </body>
    </html>
  );
}
