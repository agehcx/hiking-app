import type { ReactNode } from "react";
import type { Metadata } from "next";
// Use the Tailwind v4 entry that imports `tailwindcss` directly
import "./globals.css";

export const metadata: Metadata = {
  title: "Hiking App",
  description: "Offline maps, voice navigation, and live tracking for hikers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
  <body className="min-h-screen bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
