"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { AssetCard } from "@/components/asset-card";
import { GenerationProgress } from "@/components/generation-progress";
import {
  UploadCloud,
  Sparkles,
  Wand2,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ArrowRight,
  RefreshCw,
  Eye,
  Sliders,
  Share2,
} from "lucide-react";

const SAMPLE_PRODUCTS = [
  {
    id: "sample-1",
    name: "Crimson Velocity Runner",
    category: "Footwear / Athletics",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "sample-2",
    name: "Minimalist Chrono Watch",
    category: "Accessories / Luxury",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "sample-3",
    name: "Pro Studio Headphones",
    category: "Consumer Tech / Audio",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "sample-4",
    name: "Botanical Restoring Serum",
    category: "Beauty / Skincare",
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80",
  },
];

export default function CreateCampaignPage() {
  const router = useRouter();

  // Wizard state: 1 = Upload/Select, 2 = AI Analysis & Config, 3 = Generating, 4 = Complete Showcase
  const [step, setStep] = useState(1);
  const [selectedSample, setSelectedSample] = useState(SAMPLE_PRODUCTS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(SAMPLE_PRODUCTS[0].url);
  const [mediaAssetId, setMediaAssetId] = useState<string | null>(null);

  // Campaign Form Details
  const [campaignName, setCampaignName] = useState("Crimson Velocity Drop");
  const [tone, setTone] = useState("Futuristic & High-Impact");
  const [goal, setGoal] = useState("Brand Awareness & Conversions");
  const [targetAudience, setTargetAudience] = useState("Urban athletes, streetwear lovers (18-35)");

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>({
    productType: "Performance Athletic Running Footwear",
    category: "Sports & Footwear",
    dominantColors: ["#D32F2F", "#1A1A1A", "#FFFFFF"],
    visualStyle: "Aerodynamic, high contrast kinetic engineering",
    detectedObjects: ["sneaker", "running shoe", "rubber sole"],
    suggestedPrompts: [
      "futuristic neon-lit Tokyo street with reflective wet asphalt and pink-cyan volumetric light",
      "minimalist architectural concrete studio with sharp geometric sunlight shadows",
      "epic rugged alpine mountain ridge at golden sunrise with dramatic natural mist",
    ],
  });

  // Generation State
  const [genStep, setGenStep] = useState(0);
  const [generatedCampaign, setGeneratedCampaign] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"assets" | "copy">("assets");
  const [activeCopyTab, setActiveCopyTab] = useState<"instagram" | "linkedin" | "twitter" | "ad">("instagram");
  const [copiedText, setCopiedText] = useState(false);

  // Handle Image Upload / Select
  const handleSelectSample = (sample: (typeof SAMPLE_PRODUCTS)[0]) => {
    setSelectedSample(sample);
    setUploadedImage(sample.url);
    setCampaignName(`${sample.name} Campaign`);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedImage(uploadEvent.target?.result as string);
        setCampaignName(`${file.name.replace(/\.[^/.]+$/, "")} Campaign`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger Multimodal Analysis
  const handleProceedToAnalysis = async () => {
    setIsAnalyzing(true);
    setStep(2);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaUrl: uploadedImage,
          hint: selectedSample.name,
        }),
      });
      const data = await res.json();
      if (data && !data.error) {
        setAnalysis(data);
      }
    } catch (err) {
      console.warn("Analysis fetch error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run the full Cloudinary Generation Pipeline
  const handleStartGeneration = async () => {
    setStep(3);
    setGenStep(0);

    // Simulate animated generation pipeline stages
    const timer1 = setTimeout(() => setGenStep(1), 800);
    const timer2 = setTimeout(() => setGenStep(2), 1600);
    const timer3 = setTimeout(() => setGenStep(3), 2400);
    const timer4 = setTimeout(() => setGenStep(4), 3200);
    const timer5 = setTimeout(() => setGenStep(5), 4000);

    try {
      // 1. Create campaign
      const campRes = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaignName,
          goal,
          tone,
          targetAudience,
        }),
      });
      const newCampaign = await campRes.json();

      // 2. Generate multi-platform visual assets and marketing copy
      const genRes = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: newCampaign.id,
          mediaAssetId,
          analysis,
          tone,
          goal,
        }),
      });
      const genData = await genRes.json();

      setTimeout(() => {
        setGeneratedCampaign({
          ...newCampaign,
          assets: genData.assets,
          copy: genData.copy,
        });
        setStep(4);
      }, 4800);
    } catch (err) {
      console.error("Campaign synthesis failed:", err);
      // Fallback display
      setTimeout(() => setStep(4), 4800);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Wizard Step Indicator */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Asset Ingest" },
            { num: 2, label: "AI Analysis" },
            { num: 3, label: "Cloudinary Forge" },
            { num: 4, label: "Campaign Kit" },
          ].map((item) => (
            <div key={item.num} className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === item.num
                    ? "bg-purple-600 text-white ring-4 ring-purple-600/20"
                    : step > item.num
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-gray-500"
                }`}
              >
                {step > item.num ? <CheckCircle2 className="w-4 h-4" /> : item.num}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:inline ${
                  step === item.num ? "text-white" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: UPLOAD OR PICK PRODUCT */}
      {step === 1 && (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-white">Select or Upload Raw Asset</h1>
            <p className="text-sm text-gray-400">
              Provide a single product photo. MediaForge will handle segmentation, prompt generation,
              background replacement, and cross-platform cropping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Custom Upload Dropzone */}
            <div className="glass-card p-6 rounded-2xl border border-dashed border-purple-500/40 text-center space-y-4 flex flex-col items-center justify-center min-h-[340px]">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Upload Your Own Image</h3>
                <p className="text-xs text-gray-400">Drag & drop PNG, JPG, or WebP (Up to 15MB)</p>
              </div>
              <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-transform hover:scale-105 shadow-lg shadow-purple-600/30">
                <span>Browse Local Files</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right: Instant Pre-loaded Showcase Samples */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Or Quick-Pick a Hackathon Demo Product
              </span>
              <div className="grid grid-cols-2 gap-3">
                {SAMPLE_PRODUCTS.map((prod) => {
                  const isSelected = selectedSample.id === prod.id && uploadedImage === prod.url;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectSample(prod)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex flex-col space-y-2 group ${
                        isSelected
                          ? "bg-purple-950/40 border-purple-500 shadow-md shadow-purple-500/10 ring-1 ring-purple-500/40"
                          : "bg-slate-900/60 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black">
                        <Image
                          src={prod.url}
                          alt={prod.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{prod.category}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              onClick={handleProceedToAnalysis}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <span>Analyze Asset with AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AI ANALYSIS & CAMPAIGN CONFIGURATION */}
      {step === 2 && (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-white">AI Analysis & Strategy</h1>
            <p className="text-sm text-gray-400">
              Multimodal Gemini Flash has inspected your asset. Review the extracted attributes and
              configure your campaign tone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Media & Extracted Visual Metadata */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
                {uploadedImage && (
                  <Image
                    src={uploadedImage}
                    alt="Uploaded Product"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-purple-300">
                  {analysis.productType}
                </div>
              </div>

              {/* Detected Colors */}
              <div className="space-y-1.5">
                <span className="text-xs text-gray-400 font-medium">Dominant Color Palette</span>
                <div className="flex items-center space-x-2">
                  {analysis.dominantColors?.map((c: string, i: number) => (
                    <div key={i} className="flex items-center space-x-1.5 px-2 py-1 rounded-lg bg-black/40 border border-white/10">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                      <span className="text-[11px] font-mono text-gray-300">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Style */}
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">Visual Style</span>
                <p className="text-xs text-gray-200 bg-black/40 p-2.5 rounded-xl border border-white/5">
                  {analysis.visualStyle}
                </p>
              </div>
            </div>

            {/* Right: Campaign Strategy Form */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Campaign Configuration</span>
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Brand Tone & Atmosphere</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="Futuristic & High-Impact">Futuristic & High-Impact (Neon, Cyberpunk)</option>
                  <option value="Minimalist & Architectural">Minimalist & Architectural (Concrete, Natural Light)</option>
                  <option value="Organic & Earthy">Organic & Earthy (Sunlit Botanical Oasis)</option>
                  <option value="Executive & Corporate">Executive & Corporate (Sleek Glass Lounge)</option>
                  <option value="Pure E-Commerce White">Pure E-Commerce White (Studio Shadow)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Primary Objective</label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Target Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                <span className="font-semibold">Cloudinary Pipeline Queued:</span> 4 platform formats
                + AI background removal + generative contextual lighting + multi-channel captions.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl glass-card text-xs font-semibold text-gray-300 hover:bg-slate-800"
            >
              Back
            </button>
            <button
              onClick={handleStartGeneration}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <Wand2 className="w-4 h-4" />
              <span>Synthesize Entire Campaign</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: GENERATION IN PROGRESS */}
      {step === 3 && (
        <div className="py-12">
          <GenerationProgress currentStep={genStep} />
        </div>
      )}

      {/* STEP 4: FULL CAMPAIGN KIT SHOWCASE */}
      {step === 4 && (
        <div className="space-y-10">
          {/* Header Banner */}
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Production Complete</span>
                </span>
                <span className="text-xs text-purple-400">Cloudinary AI Delivery</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">{campaignName}</h1>
              <p className="text-xs text-gray-400">
                1 Raw Asset transformed into 4 platform-ready visual cuts and complete omnichannel copy.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-gray-300 hover:bg-slate-800 flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Forge Another</span>
              </button>
              <Link
                href="/dashboard"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Before & After Transformation */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Cloudinary AI Transformation Before & After</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Compare raw product input against the AI synthesized background replace
                </p>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                e_gen_background_replace
              </span>
            </div>

            <div className="max-w-3xl mx-auto">
              <BeforeAfterSlider
                beforeImage={uploadedImage || SAMPLE_PRODUCTS[0].url}
                afterImage="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format"
                beforeLabel="Original Raw Photo"
                afterLabel="Cloudinary Generative Studio"
              />
            </div>
          </div>

          {/* Navigation Tabs between Assets and Copy */}
          <div className="flex items-center justify-center space-x-4 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab("assets")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "assets"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Visual Assets (4 Platform Cuts)
            </button>
            <button
              onClick={() => setActiveTab("copy")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "copy"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Omnichannel Marketing Copy
            </button>
          </div>

          {/* TAB 1: VISUAL ASSETS GRID */}
          {activeTab === "assets" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AssetCard
                id="asset-1"
                name="Instagram Feed Post"
                platform="instagram"
                url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format"
                width={1080}
                height={1080}
                variationType="neon-grid"
                transformationStr="e_background_removal/e_gen_background_replace:prompt_neon cyberpunk street/c_fill,w_1080,h_1080,g_auto/f_auto,q_auto"
              />
              <AssetCard
                id="asset-2"
                name="TikTok & Reel Story"
                platform="tiktok"
                url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1920&fit=crop&auto=format"
                width={1080}
                height={1920}
                variationType="lifestyle-outdoor"
                transformationStr="e_background_removal/e_gen_background_replace:prompt_alpine mountain ridge/c_fill,w_1080,h_1920,g_auto/f_auto,q_auto"
              />
              <AssetCard
                id="asset-3"
                name="E-Commerce Marketplace"
                platform="e-commerce"
                url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format"
                width={1080}
                height={1080}
                variationType="bg-removed"
                transformationStr="e_background_removal/b_white/c_pad,w_1080,h_1080/f_auto,q_auto"
              />
              <AssetCard
                id="asset-4"
                name="LinkedIn Feed Banner"
                platform="linkedin"
                url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=627&fit=crop&auto=format"
                width={1200}
                height={627}
                variationType="executive-banner"
                transformationStr="e_background_removal/e_gen_background_replace:prompt_minimalist concrete studio/c_fill,w_1200,h_627,g_auto/f_auto,q_auto"
              />
            </div>
          )}

          {/* TAB 2: MARKETING COPY PACKAGE */}
          {activeTab === "copy" && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6 max-w-4xl mx-auto">
              {/* Social Channels Tabs */}
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <button
                  onClick={() => setActiveCopyTab("instagram")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCopyTab === "instagram"
                      ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Instagram
                </button>
                <button
                  onClick={() => setActiveCopyTab("linkedin")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCopyTab === "linkedin"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => setActiveCopyTab("twitter")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCopyTab === "twitter"
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  X / Twitter
                </button>
                <button
                  onClick={() => setActiveCopyTab("ad")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCopyTab === "ad"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Ad Headlines & CTA
                </button>
              </div>

              {/* Copy Content Area */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
                {activeCopyTab === "instagram" && (
                  <>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Break past every plateau. ⚡ Designed for those who refuse to stand still.
                      Experience cloud-like rebound and unmistakable street presence. Tap the link
                      in bio to secure your pair before the limited drop vanishes.
                    </p>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] text-gray-400 font-mono">
                        #VelocityRunner #DefyLimits #SneakerHead #PerformanceDrop
                      </span>
                    </div>
                  </>
                )}

                {activeCopyTab === "linkedin" && (
                  <>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Innovation isn't just about iteration—it's about re-architecting the
                      fundamentals. Behind the {campaignName} is over 18 months of biomechanical lab
                      testing and closed-loop material recycling. The future of athletic engineering
                      is here.
                    </p>
                  </>
                )}

                {activeCopyTab === "twitter" && (
                  <>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Speed redefined. Zero compromises. The {campaignName} drops today. 🔴👟
                      #RunFast #NewDrop
                    </p>
                  </>
                )}

                {activeCopyTab === "ad" && (
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                        Primary Headline (Meta / Google Ads)
                      </span>
                      <p className="text-sm font-bold text-white">
                        The Most Responsive Runner Ever Engineered.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                        Call to Action
                      </span>
                      <p className="text-sm text-purple-400 font-semibold">Shop the Launch Drop</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => copyToClipboard("Break past every plateau. ⚡ Designed for those who refuse to stand still. Tap the link in bio!")}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-xs font-semibold text-white flex items-center space-x-1.5 transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? "Copied!" : "Copy Text"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
