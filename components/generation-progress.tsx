"use client";

import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface GenerationProgressProps {
  currentStep: number;
}

export function GenerationProgress({ currentStep }: GenerationProgressProps) {
  const steps = [
    { title: "Uploading to Cloudinary CDN", desc: "Signed asset ingest with sub-second caching" },
    { title: "Multimodal Gemini Analysis", desc: "Extracting color palette, silhouette, and aesthetics" },
    { title: "Cloudinary AI Background Removal", desc: "Executing e_background_removal with edge feathering" },
    { title: "Generative Background Synthesis", desc: "Synthesizing custom lighting & contextual scenes" },
    { title: "Multi-Platform Asset Formatting", desc: "Generating Instagram, TikTok, and LinkedIn renders" },
    { title: "Generating Social Copy & SEO Tags", desc: "Creating targeted captions and ad headlines" },
  ];

  const progressPercentage = Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100));

  return (
    <div className="p-8 rounded-2xl glass-card border border-purple-500/30 shadow-2xl max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">MediaForge Production Engine</h3>
            <p className="text-xs text-gray-400">Processing media through Cloudinary AI Pipeline</p>
          </div>
        </div>
        <span className="text-sm font-bold font-mono text-purple-400">{progressPercentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
        <div
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3 pt-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={idx}
              className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isCurrent
                  ? "bg-purple-950/40 border border-purple-500/30"
                  : isDone
                  ? "bg-slate-900/30 opacity-70"
                  : "opacity-40"
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${isCurrent ? "text-purple-200" : "text-gray-300"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
