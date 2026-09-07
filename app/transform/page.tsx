"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Sliders,
  Scissors,
  Wand2,
  Crop,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

export default function TransformationPlaygroundPage() {
  const [activeEffect, setActiveEffect] = useState<"bg-remove" | "gen-bg" | "gen-fill" | "smart-crop">("gen-bg");
  const [prompt, setPrompt] = useState("cyberpunk neon-lit wet Tokyo street with reflective puddles");
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "9:16" | "16:9">("1:1");
  const [copied, setCopied] = useState(false);

  const sampleImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&auto=format&fit=crop&q=80";

  // Compute live simulated Cloudinary transformation string
  const getTransformationString = () => {
    switch (activeEffect) {
      case "bg-remove":
        return "e_background_removal/b_white/c_pad,w_1080,h_1080/f_auto,q_auto";
      case "gen-bg":
        return `e_background_removal/e_gen_background_replace:prompt_${encodeURIComponent(prompt)}/c_fill,w_1080,h_1080,g_auto/f_auto,q_auto`;
      case "gen-fill":
        return `c_pad,w_1920,h_1080,b_gen_fill/f_auto,q_auto`;
      case "smart-crop":
        return `c_auto,g_auto,w_${aspectRatio === "9:16" ? "1080,h_1920" : aspectRatio === "16:9" ? "1920,h_1080" : "1080,h_1080"}/f_auto,q_auto`;
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://res.cloudinary.com/mediaforge/image/upload/${getTransformationString()}/samples/ecommerce/shoes.jpg`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30">
            Developer Playground
          </span>
          <span className="text-xs text-gray-400">Live URL Construction</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Cloudinary AI Playground</h1>
        <p className="text-sm text-gray-400">
          Experiment with Cloudinary generative content workflows in real time. Adjust effects, customize
          prompts, and inspect the generated URL transformation string.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls Sidebar */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>Transformation Settings</span>
          </h3>

          {/* Workflow Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Select Generative Workflow</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setActiveEffect("gen-bg")}
                className={`p-3 rounded-xl text-left border transition-all flex items-center space-x-3 ${
                  activeEffect === "gen-bg"
                    ? "bg-purple-950/40 border-purple-500 text-white"
                    : "bg-slate-900 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Wand2 className="w-4 h-4 text-pink-400" />
                <div>
                  <p className="text-xs font-bold">Generative Background Replace</p>
                  <p className="text-[10px] text-gray-400 font-mono">e_gen_background_replace</p>
                </div>
              </button>

              <button
                onClick={() => setActiveEffect("bg-remove")}
                className={`p-3 rounded-xl text-left border transition-all flex items-center space-x-3 ${
                  activeEffect === "bg-remove"
                    ? "bg-purple-950/40 border-purple-500 text-white"
                    : "bg-slate-900 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Scissors className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-xs font-bold">AI Background Removal</p>
                  <p className="text-[10px] text-gray-400 font-mono">e_background_removal</p>
                </div>
              </button>

              <button
                onClick={() => setActiveEffect("smart-crop")}
                className={`p-3 rounded-xl text-left border transition-all flex items-center space-x-3 ${
                  activeEffect === "smart-crop"
                    ? "bg-purple-950/40 border-purple-500 text-white"
                    : "bg-slate-900 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Crop className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs font-bold">Smart Content-Aware Crop</p>
                  <p className="text-[10px] text-gray-400 font-mono">c_auto, g_auto</p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Prompt Input */}
          {activeEffect === "gen-bg" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Generative Scene Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {/* Aspect Ratio Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Target Output Canvas</label>
            <div className="grid grid-cols-3 gap-2">
              {(["1:1", "9:16", "16:9"] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    aspectRatio === ratio
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-slate-900 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Display */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">
                Live Interactive Render
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                f_auto, q_auto
              </span>
            </div>

            <div className="relative aspect-square max-h-[520px] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={sampleImage}
                alt="Transformed Preview"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-white border border-white/10">
                {activeEffect.toUpperCase()}
              </div>
            </div>

            {/* Generated Cloudinary URL Bar */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Generated Cloudinary Delivery URL
                </span>
                <button
                  onClick={copyUrl}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy URL"}</span>
                </button>
              </div>
              <code className="text-xs text-purple-300 font-mono block break-all">
                https://res.cloudinary.com/mediaforge/image/upload/{getTransformationString()}/samples/ecommerce/shoes.jpg
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
