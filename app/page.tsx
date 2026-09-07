"use client";

import Link from "next/link";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { CloudinaryPipeline } from "@/components/cloudinary-pipeline";
import {
  Sparkles,
  Wand2,
  ArrowRight,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle,
  Copy,
  Image as ImageIcon,
  Cpu,
  Share2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-purple-900/20">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Cloudinary AI Hackathon 2026 — Track 2: Generative Content Workflows</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              One Asset. <br className="hidden sm:inline" />
              <span className="gradient-text">An Entire Campaign.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Upload a single raw product photo. Watch MediaForge AI execute an end-to-end Cloudinary
              generative workflow—isolating your product, synthesizing contextual 3D environments,
              auto-formatting for every platform, and writing multi-channel social copy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Wand2 className="w-5 h-5" />
                <span>Launch Campaign Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-slate-800/80 text-gray-200 font-semibold text-base border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Explore Live Demo</span>
              </Link>
            </div>

            {/* Key Metrics Banner */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <p className="text-2xl font-extrabold text-white">100%</p>
                <p className="text-xs text-gray-400">Cloudinary AI Powered</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <p className="text-2xl font-extrabold text-white">4+ Formats</p>
                <p className="text-xs text-gray-400">Auto-Generated</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <p className="text-2xl font-extrabold text-white">&lt; 15s</p>
                <p className="text-xs text-gray-400">Campaign Synthesis</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <p className="text-2xl font-extrabold text-white">f_auto, q_auto</p>
                <p className="text-xs text-gray-400">Global Edge CDN</p>
              </div>
            </div>
          </div>

          {/* Interactive Before & After Showcase */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="p-2 rounded-3xl gradient-border shadow-2xl">
              <div className="gradient-border-inner p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <span>Interactive Live Transformation Engine</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Drag slider to compare raw unedited photo vs Cloudinary generative background synthesis
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    e_gen_background_replace
                  </span>
                </div>

                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80"
                  afterImage="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format"
                  beforeLabel="Raw Camera Photo (Isolated)"
                  afterLabel="Cloudinary AI: Cyberpunk Neon Grid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloudinary Generative Content Workflow Architecture Section */}
      <section className="py-20 bg-slate-950/40 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-purple-400 font-bold">
              Track 2 Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              The 5-Stage Cloudinary Generative Engine
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Cloudinary is not a storage bucket—it is the computational backbone of MediaForge.
              Every asset is dynamically transformed at the CDN edge.
            </p>
          </div>

          <CloudinaryPipeline />
        </div>
      </section>

      {/* "Upload Once, Deploy Everywhere" Multi-Platform Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
                Automated Omnichannel Deployment
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                One Click. All Channels Ready.
              </h3>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              From TikTok vertical videos to Amazon-compliant product cuts and LinkedIn banners,
              all aspect ratios are dynamically cropped via Cloudinary smart gravity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Platform 1: Instagram Square */}
            <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                  Instagram (1:1)
                </span>
                <span className="text-xs font-mono text-gray-500">1080 x 1080</span>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
                  alt="Instagram preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-xs text-gray-300 font-medium">Cyberpunk Neon Grid</p>
              <code className="text-[10px] text-purple-400 font-mono block truncate">
                c_fill,w_1080,h_1080,g_auto
              </code>
            </div>

            {/* Platform 2: TikTok & Reel Story */}
            <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  TikTok / Stories (9:16)
                </span>
                <span className="text-xs font-mono text-gray-500">1080 x 1920</span>
              </div>
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black max-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
                  alt="TikTok preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-xs text-gray-300 font-medium">Alpine Trail Sunrise</p>
              <code className="text-[10px] text-purple-400 font-mono block truncate">
                c_fill,w_1080,h_1920,g_auto
              </code>
            </div>

            {/* Platform 3: E-Commerce Clean */}
            <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                  E-Commerce White (1:1)
                </span>
                <span className="text-xs font-mono text-gray-500">1080 x 1080</span>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
                  alt="E-Commerce preview"
                  className="object-contain w-full h-full p-4"
                />
              </div>
              <p className="text-xs text-gray-300 font-medium">Studio White Isolation</p>
              <code className="text-[10px] text-purple-400 font-mono block truncate">
                e_background_removal/b_white
              </code>
            </div>

            {/* Platform 4: LinkedIn Banner */}
            <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  LinkedIn Banner (1.91:1)
                </span>
                <span className="text-xs font-mono text-gray-500">1200 x 627</span>
              </div>
              <div className="relative aspect-[1.91/1] rounded-xl overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
                  alt="LinkedIn preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-xs text-gray-300 font-medium">Executive Concrete Plinth</p>
              <code className="text-[10px] text-purple-400 font-mono block truncate">
                c_fill,w_1200,h_627,g_auto
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Multimodal Marketing Copy Generation Showcase */}
      <section className="py-20 bg-slate-950/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Multimodal AI Synthesis</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Automated Copywriting <br />
                Tailored Per Social Platform
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Visual analysis meets generative text. MediaForge generates hyper-targeted captions,
                compelling ad headlines, conversion-focused CTAs, and trending hashtags customized
                for each platform’s unique audience.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Instagram captions with curated hashtag bundles</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>B2B executive storytelling for LinkedIn feed updates</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Conversion-focused Google & Meta ad headlines</span>
                </div>
              </div>

              <Link
                href="/create"
                className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold text-sm pt-2"
              >
                <span>Try the Campaign Generator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mock Generated Copy Panel */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Instagram Ready Copy
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">Gemini 1.5 Flash</span>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed">
                Break past every plateau. ⚡ Designed for those who refuse to stand still. Experience
                cloud-like rebound and unmistakable street presence with the Crimson Velocity
                Runner.
              </p>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-400 font-semibold uppercase">CTA & Tags</span>
                <p className="text-xs text-purple-300 font-mono">
                  Tap link in bio to secure your pair.
                </p>
                <p className="text-[11px] text-blue-400 font-mono">
                  #VelocityRunner #DefyLimits #SneakerDrop #PerformanceFootwear
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to Forge Your Next Campaign?
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Experience the power of generative Cloudinary media workflows. Upload your first product
            asset in seconds.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            <span>Launch MediaForge Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
