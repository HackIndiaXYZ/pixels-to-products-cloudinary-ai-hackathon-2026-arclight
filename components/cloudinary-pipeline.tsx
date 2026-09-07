"use client";

import { useState } from "react";
import { UploadCloud, Cpu, Scissors, Wand2, Crop, Zap, CheckCircle2 } from "lucide-react";

export function CloudinaryPipeline() {
  const [activeStage, setActiveStage] = useState(2);

  const stages = [
    {
      id: 0,
      title: "1. Asset Ingestion",
      icon: UploadCloud,
      cloudinaryParam: "cloudinary.uploader.upload()",
      desc: "Raw single product image uploaded directly to Cloudinary with secure signature validation and metadata extraction.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 1,
      title: "2. Multimodal AI Analysis",
      icon: Cpu,
      cloudinaryParam: "Gemini 1.5 Flash + Cloudinary Context",
      desc: "Extracts product category, visual style, dominant hex colors, brand attributes, and suggested prompt directions.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 2,
      title: "3. AI Background Removal",
      icon: Scissors,
      cloudinaryParam: "e_background_removal",
      desc: "Cloudinary AI background removal isolates the product with sub-pixel edge detection and shadow preservation.",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "4. Generative Backgrounds",
      icon: Wand2,
      cloudinaryParam: "e_gen_background_replace / b_gen_fill",
      desc: "Generative AI creates hyper-realistic contextual environments, ambient reflections, and dynamic lighting based on AI prompts.",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 4,
      title: "5. Smart Crop & Edge Delivery",
      icon: Crop,
      cloudinaryParam: "c_auto,g_auto,f_auto,q_auto",
      desc: "Content-aware gravity cropping for Instagram (1:1), TikTok (9:16), LinkedIn (1.91:1) delivered via Cloudinary global CDN.",
      color: "from-amber-500 to-emerald-500",
    },
  ];

  return (
    <div className="w-full py-8">
      {/* Pipeline Steps Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-4 rounded-xl text-left transition-all duration-200 border relative ${
                isActive
                  ? "bg-slate-900 border-purple-500/50 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30"
                  : "bg-slate-950/60 border-white/5 hover:border-white/20 hover:bg-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${stage.color} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isActive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-sm text-white mb-1">{stage.title}</h4>
              <code className="text-[11px] text-purple-400 font-mono block truncate">
                {stage.cloudinaryParam}
              </code>
            </button>
          );
        })}
      </div>

      {/* Detail Card for Selected Stage */}
      <div className="mt-6 p-6 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium border border-purple-500/30">
                Cloudinary Architecture Deep Dive
              </span>
              <span className="text-xs text-gray-400">Step {activeStage + 1} of 5</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {stages[activeStage].title}
            </h3>
            <p className="text-gray-300 text-sm max-w-3xl leading-relaxed">
              {stages[activeStage].desc}
            </p>
          </div>

          <div className="flex flex-col space-y-2 min-w-[260px] p-3 rounded-xl bg-black/40 border border-white/5">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
              Live Cloudinary Transformation
            </span>
            <code className="text-xs text-emerald-400 font-mono break-all">
              {stages[activeStage].cloudinaryParam}
            </code>
            <div className="flex items-center space-x-1.5 text-xs text-blue-400 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero-latency CDN caching active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
