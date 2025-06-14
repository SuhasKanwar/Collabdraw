import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { AuthProvider } from "@/providers/AuthProvide";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Collabdraw",
  keywords: [
    "collaborative",
    "drawing",
    "real-time",
    "sketching",
    "team",
    "brainstorming",
    "remote",
    "collaboration",
    "WebSockets",
    "drawing",
    "canvas",
  ],
  authors: [
    { name: "SuhasKanwar", url: "https://github.com/SuhasKanwar/Collabdraw" },
  ],
  description:
    "Collabdraw is a real-time collaborative drawing tool that lets multiple users sketch, brainstorm, and ideate on a shared canvas. Powered by WebSockets, it ensures seamless, low-latency interaction—ideal for teams, educators, and creators working remotely to visualize and build ideas together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <main className="min-h-screen">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}