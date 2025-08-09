import type { ReactNode } from "react";
import type { Metadata } from "next";
// Use the Tailwind v4 entry that imports `tailwindcss` directly
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ChatFab } from "@/components/chat/ChatFab";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hiking App",
  description: "Offline maps, voice navigation, and live tracking for hikers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Navbar />
  {children}
  <Footer />
  <ChatFab />
      </body>
    </html>
  );
}
