import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { AssetCard } from "@/components/asset-card";
import {
  Sparkles,
  ArrowLeft,
  Share2,
  Download,
  Calendar,
  Layers,
  Copy,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      mediaAssets: {
        include: {
          analysis: true,
        },
      },
      generatedAssets: true,
      marketingCopies: true,
    },
  });

  if (!campaign) {
    notFound();
  }

  const originalAsset = campaign.mediaAssets[0];
  const copy = campaign.marketingCopies[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back link & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl glass-card hover:bg-slate-800 text-xs font-semibold text-gray-200 border border-white/10 flex items-center space-x-1.5">
            <Share2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Share Kit</span>
          </button>
          <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md shadow-purple-600/30 flex items-center space-x-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export Full Bundle</span>
          </button>
        </div>
      </div>

      {/* Campaign Header */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Ready for Deployment</span>
          </span>
          <span className="text-xs font-mono text-gray-400 bg-black/40 px-2 py-0.5 rounded">
            {campaign.tone || "Dynamic Tone"}
          </span>
          <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
            {campaign.goal || "Conversions"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{campaign.name}</h1>
        <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
          {campaign.description || "Generated multi-channel campaign kit powered by Cloudinary AI."}
        </p>

        {originalAsset?.analysis && (
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-gray-400 border-t border-white/5">
            <span>
              <strong className="text-white">Product:</strong> {originalAsset.analysis.productType}
            </span>
            <span>
              <strong className="text-white">Category:</strong> {originalAsset.analysis.category}
            </span>
            <span>
              <strong className="text-white">Style:</strong> {originalAsset.analysis.visualStyle}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Before & After Slider */}
      {originalAsset && campaign.generatedAssets[0] && (
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Transformation Comparison</span>
            </h3>
            <span className="text-xs font-mono text-purple-400">e_gen_background_replace</span>
          </div>

          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              beforeImage={originalAsset.secureUrl}
              afterImage={campaign.generatedAssets[0].cloudinaryUrl}
              beforeLabel="Raw Asset Ingest"
              afterLabel="Cloudinary Generative AI Studio"
            />
          </div>
        </div>
      )}

      {/* Generated Assets Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Platform Renders ({campaign.generatedAssets.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaign.generatedAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              id={asset.id}
              url={asset.cloudinaryUrl}
              platform={asset.platform}
              width={asset.width}
              height={asset.height}
              variationType={asset.variationType}
              transformationStr={asset.transformationStr || undefined}
            />
          ))}
        </div>
      </div>

      {/* Generated Marketing Copy */}
      {copy && (
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white">Generated Social Copy & Ad Headlines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                Instagram Feed Caption
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">{copy.instagramCaption}</p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                LinkedIn Storytelling
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">{copy.linkedinCaption}</p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                X / Twitter Drop
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">{copy.twitterCaption}</p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Ad Headline & CTA
              </span>
              <p className="text-xs font-bold text-white">{copy.adHeadline}</p>
              <p className="text-xs text-purple-300 font-medium">CTA: {copy.cta}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
