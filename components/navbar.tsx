"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Layers, Wand2, Compass, ArrowRight, Menu, X, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white">MEDIAFORGE</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30">AI</span>
                </div>
                <span className="text-[10px] text-gray-400 -mt-1 tracking-wider uppercase">Cloudinary Powered</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Dashboard</span>
            </Link>
            <Link href="/create" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center space-x-1.5">
              <Wand2 className="w-4 h-4 text-pink-400" />
              <span>Create Campaign</span>
            </Link>
            <Link href="/library" className="text-sm text-gray-300 hover:text-white transition-colors">
              Media Library
            </Link>
            <Link href="/transform" className="text-sm text-gray-300 hover:text-white transition-colors">
              Playground
            </Link>
            <Link href="/templates" className="text-sm text-gray-300 hover:text-white transition-colors">
              Templates
            </Link>
            <Link href="/analytics" className="text-sm text-gray-300 hover:text-white transition-colors">
              Analytics
            </Link>
          </div>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Track 2 Finalist</span>
            </div>

            <Link
              href="/create"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-500 hover:text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:scale-102"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-gray-900 rounded-[7px] group-hover:bg-opacity-0 flex items-center space-x-1.5">
                <span>Try Studio</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Dashboard
          </Link>
          <Link
            href="/create"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-purple-400 hover:text-purple-300 hover:bg-gray-800"
          >
            ✨ Create Campaign
          </Link>
          <Link
            href="/library"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Media Library
          </Link>
          <Link
            href="/transform"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Transformation Playground
          </Link>
          <Link
            href="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Preset Templates
          </Link>
          <Link
            href="/analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Analytics & Metrics
          </Link>
        </div>
      )}
    </nav>
  );
}
