import type { ReactNode } from "react";
import type { Metadata } from "next";
// Use the Tailwind v4 entry that imports `tailwindcss` directly
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ConditionalChatFab } from "@/components/chat/ConditionalChatFab";

export const metadata: Metadata = {
  title: "Hikingbros",
  description: "Hikingbros",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-raleway">
        <Navbar />
  {children}
  <Footer />
  <ConditionalChatFab />
      </body>
    </html>
  );
}
