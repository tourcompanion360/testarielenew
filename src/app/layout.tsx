import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ariele Academy - AI-Powered Content Creation Platform",
  description: "Master AI content creation with Ariele. Learn to generate stunning images, videos, and content with the power of artificial intelligence.",
  keywords: "AI, content creation, video generation, image generation, courses, Ariele, learning platform",
  authors: [{ name: "Ariele" }],
  openGraph: {
    title: "Ariele Academy - AI-Powered Content Creation Platform",
    description: "Master AI content creation with Ariele",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <AppShell>
          {children}
        </AppShell>
        <ChatWidget />
      </body>
    </html>
  );
}
