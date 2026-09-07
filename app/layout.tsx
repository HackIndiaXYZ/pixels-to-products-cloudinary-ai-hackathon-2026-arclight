import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediaForge AI — One Asset. An Entire Campaign.",
  description:
    "Transform a single raw product photo or video into a complete multi-platform marketing campaign powered by Cloudinary AI and Gemini Flash. Built for Cloudinary AI Hackathon 2026.",
  keywords: [
    "Cloudinary AI",
    "Generative Content Workflows",
    "Generative AI",
    "Media Production",
    "Background Removal",
    "Automated Marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#030712] text-gray-100 antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
