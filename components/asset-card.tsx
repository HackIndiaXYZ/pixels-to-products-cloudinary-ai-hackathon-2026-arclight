"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Download, ExternalLink, Sparkles } from "lucide-react";

interface AssetCardProps {
  id: string;
  name?: string;
  url: string;
  platform?: string;
  width?: number;
  height?: number;
  variationType?: string;
  transformationStr?: string;
  onSelect?: () => void;
}

export function AssetCard({
  id,
  name,
  url,
  platform = "e-commerce",
  width = 1080,
  height = 1080,
  variationType,
  transformationStr,
  onSelect,
}: AssetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformBadge = (plat: string) => {
    switch (plat.toLowerCase()) {
      case "instagram":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "tiktok":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "linkedin":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "facebook":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
  };

  return (
    <div
      onClick={onSelect}
      className="group glass-card rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Preview Container */}
      <div className="relative w-full aspect-square bg-gray-950 overflow-hidden">
        <Image
          src={url}
          alt={name || "Generated Asset"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex items-center space-x-1.5 z-10">
          <span
            className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border backdrop-blur-md ${getPlatformBadge(
              platform
            )}`}
          >
            {platform}
          </span>
          <span className="text-[10px] font-mono text-gray-300 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded">
            {width}x{height}
          </span>
        </div>

        {variationType && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="text-[10px] font-medium text-purple-200 bg-purple-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-purple-500/30 flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
              <span className="capitalize">{variationType.replace("-", " ")}</span>
            </span>
          </div>
        )}

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2 z-20">
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-lg bg-gray-900/90 text-white hover:bg-purple-600 transition-colors shadow-lg"
            title="Copy Cloudinary CDN URL"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-lg bg-gray-900/90 text-white hover:bg-purple-600 transition-colors shadow-lg"
            title="Open High-Res"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={url}
            download="mediaforge-asset"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-lg bg-gray-900/90 text-white hover:bg-purple-600 transition-colors shadow-lg"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-3 bg-slate-950/60 border-t border-white/5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white truncate max-w-[180px]">
            {name || "Platform Asset"}
          </span>
          <span className="text-[10px] text-gray-400 font-mono">f_auto,q_auto</span>
        </div>
        {transformationStr && (
          <p className="text-[10px] text-gray-500 font-mono truncate">
            {transformationStr}
          </p>
        )}
      </div>
    </div>
  );
}
