"use client";

import { useState } from "react";
import { TrendingUp, Sparkles, HardDrive, Zap, Layers, BarChart3, PieChart as PieIcon } from "lucide-react";

const PLATFORM_DATA = [
  { name: "Instagram (1:1)", value: 42, color: "#ec4899", count: "64 assets" },
  { name: "TikTok / Reels (9:16)", value: 28, color: "#06b6d4", count: "43 assets" },
  { name: "E-Commerce Studio", value: 20, color: "#a855f7", count: "31 assets" },
  { name: "LinkedIn Feed (1.91:1)", value: 10, color: "#3b82f6", count: "15 assets" },
];

const ACTIVITY_DATA = [
  { day: "Mon", assets: 12, height: "35%" },
  { day: "Tue", assets: 19, height: "55%" },
  { day: "Wed", assets: 15, height: "45%" },
  { day: "Thu", assets: 26, height: "75%" },
  { day: "Fri", assets: 32, height: "95%" },
  { day: "Sat", assets: 28, height: "82%" },
  { day: "Sun", assets: 21, height: "62%" },
];

export default function AnalyticsPage() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30">
            Performance & CDN Insights
          </span>
          <span className="text-xs text-gray-400">Live Telemetry</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Media Production Analytics</h1>
        <p className="text-sm text-gray-400">
          Track multi-platform asset throughput, Cloudinary CDN delivery acceleration, and generative AI compute.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
          <span className="text-xs text-gray-400 font-medium">Generation Velocity</span>
          <p className="text-3xl font-extrabold text-white">14.2s</p>
          <p className="text-xs text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>3.4x faster than manual workflows</span>
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
          <span className="text-xs text-gray-400 font-medium">CDN Bandwidth Optimization</span>
          <p className="text-3xl font-extrabold text-white">68.4%</p>
          <p className="text-xs text-purple-400">via Cloudinary f_auto & q_auto</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
          <span className="text-xs text-gray-400 font-medium">Assets Produced (Last 7d)</span>
          <p className="text-3xl font-extrabold text-white">153</p>
          <p className="text-xs text-blue-400">Across 4+ social aspect ratios</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
          <span className="text-xs text-gray-400 font-medium">Cache Hit Rate</span>
          <p className="text-3xl font-extrabold text-white">99.8%</p>
          <p className="text-xs text-cyan-400">Global Cloudinary Edge CDN</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Bar Chart (Pure CSS/SVG) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span>Daily Asset Generation Velocity</span>
              </h3>
              <p className="text-xs text-gray-400">Total renders generated through Cloudinary AI Pipeline</p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-500/20">
              153 Total
            </span>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-4 bg-black/40 rounded-xl border border-white/5">
            {ACTIVITY_DATA.map((item) => (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center h-full justify-end group relative"
                onMouseEnter={() => setHoveredBar(item.day)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {hoveredBar === item.day && (
                  <div className="absolute -top-10 px-2 py-1 rounded bg-purple-900 text-white text-[11px] font-bold shadow-lg border border-purple-400/40 z-20">
                    {item.assets} assets
                  </div>
                )}
                {/* Bar */}
                <div
                  className="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t from-purple-600 via-indigo-500 to-pink-500 transition-all duration-300 group-hover:brightness-125"
                  style={{ height: item.height }}
                />
                <span className="text-xs text-gray-400 mt-2 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Breakdown (Pure SVG Donut & Badges) */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <PieIcon className="w-4 h-4 text-pink-400" />
              <span>Platform Mix Breakdown</span>
            </h3>
            <p className="text-xs text-gray-400">Ratio of generated platform aspect ratios</p>
          </div>

          {/* SVG Donut Chart */}
          <div className="flex items-center justify-center py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1f2937" strokeWidth="3" />
                {/* Instagram 42% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#ec4899"
                  strokeWidth="3.5"
                  strokeDasharray="42 58"
                  strokeDashoffset="0"
                />
                {/* TikTok 28% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                  strokeDasharray="28 72"
                  strokeDashoffset="-42"
                />
                {/* E-Commerce 20% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                  strokeDasharray="20 80"
                  strokeDashoffset="-70"
                />
                {/* LinkedIn 10% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeDasharray="10 90"
                  strokeDashoffset="-90"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-white">4</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Formats</span>
              </div>
            </div>
          </div>

          {/* Platform Legend */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            {PLATFORM_DATA.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-gray-300 font-medium">{p.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 font-mono">{p.count}</span>
                  <span className="text-white font-bold font-mono">({p.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
