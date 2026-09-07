import { NextResponse } from "next/server";

export const PRESET_TEMPLATES = [
  {
    id: "tmpl-1",
    name: "Cyberpunk Future Neon",
    category: "Social First",
    aspectRatio: "1:1",
    bgStyle: "High-contrast neon reflections, moody twilight atmosphere",
    description: "Ideal for streetwear, sneakers, tech gadgets, and cutting-edge lifestyle drops.",
    thumbnailUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    presetParams: {
      prompt: "futuristic neon-lit Tokyo street with reflective wet asphalt and pink-cyan volumetric light",
      crop: "fill",
      gravity: "auto",
    },
    isPopular: true,
  },
  {
    id: "tmpl-2",
    name: "Minimalist Architectural Studio",
    category: "Minimalist",
    aspectRatio: "1:1",
    bgStyle: "Raw concrete pedestals, sharp natural geometric sunbeam shadows",
    description: "Crisp, clean editorial look favored by luxury design, ceramics, and premium hardware.",
    thumbnailUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    presetParams: {
      prompt: "minimalist architectural concrete studio with sharp geometric sunlight shadows",
      crop: "fill",
      gravity: "auto",
    },
    isPopular: true,
  },
  {
    id: "tmpl-3",
    name: "Alpine Dawn Lifestyle",
    category: "Outdoor & Adventure",
    aspectRatio: "9:16",
    bgStyle: "Breathtaking mountain ridges, golden hour haze, dramatic depth",
    description: "Built for TikTok reels, Instagram stories, and performance outdoor gear.",
    thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    presetParams: {
      prompt: "epic rugged alpine mountain ridge at golden sunrise with dramatic natural mist",
      crop: "fill",
      gravity: "auto",
    },
    isPopular: false,
  },
  {
    id: "tmpl-4",
    name: "Executive Feed Hero",
    category: "B2B & Professional",
    aspectRatio: "1.91:1",
    bgStyle: "Sleek corporate tech lounge, modern dark glass architecture",
    description: "Optimized for LinkedIn sponsored updates and high-conversion Facebook feed links.",
    thumbnailUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
    presetParams: {
      prompt: "executive corporate glass headquarters with soft architectural ambient lighting",
      crop: "fill",
      gravity: "auto",
    },
    isPopular: false,
  },
  {
    id: "tmpl-5",
    name: "Pure E-Commerce Isolation",
    category: "E-commerce",
    aspectRatio: "1:1",
    bgStyle: "Pure white #FFFFFF studio background with realistic contact drop shadow",
    description: "Amazon, Shopify, and Google Shopping 100% compliant marketplace asset.",
    thumbnailUrl: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80",
    presetParams: {
      prompt: "white background with subtle contact shadow",
      crop: "pad",
      background: "white",
    },
    isPopular: true,
  },
  {
    id: "tmpl-6",
    name: "Botanical Oasis",
    category: "Organic & Wellness",
    aspectRatio: "4:5",
    bgStyle: "Sunlit monstera foliage, soft earth tones, warm morning light",
    description: "Tailored for skincare, cosmetics, organic beverages, and sustainable goods.",
    thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    presetParams: {
      prompt: "warm sunlit tropical botanical greenhouse with monstera leaf shadows",
      crop: "fill",
      gravity: "auto",
    },
    isPopular: false,
  },
];

export async function GET() {
  return NextResponse.json(PRESET_TEMPLATES);
}
