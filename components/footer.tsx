import Link from "next/link";
import { Sparkles, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight">MEDIAFORGE AI</span>
            <p className="text-xs text-gray-500">
              One Asset. An Entire Campaign. Built for Cloudinary AI Hackathon 2026.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
          <Link href="/create" className="hover:text-purple-400 transition-colors">
            Studio
          </Link>
          <Link href="/transform" className="hover:text-purple-400 transition-colors">
            Transformation Playground
          </Link>
          <Link href="/templates" className="hover:text-purple-400 transition-colors">
            Templates
          </Link>
          <a
            href="https://cloudinary.com/documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center space-x-1"
          >
            <span>Cloudinary Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Powered by</span>
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
            Cloudinary AI
          </span>
          <span>&</span>
          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20">
            Gemini Flash
          </span>
        </div>
      </div>
    </footer>
  );
}
