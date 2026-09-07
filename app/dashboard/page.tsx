import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  Sparkles,
  Layers,
  Wand2,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  HardDrive,
  Coins,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      mediaAssets: true,
      generatedAssets: true,
      marketingCopies: true,
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const totalAssets = await prisma.generatedAsset.count();
  const totalCampaigns = await prisma.campaign.count();
  const recentAssets = await prisma.generatedAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30">
              Active Workspace
            </span>
            <span className="text-xs text-gray-400">Pro Tier</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Production Dashboard</h1>
          <p className="text-sm text-gray-400">
            Overview of your active campaigns, Cloudinary AI workflows, and generated media assets.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/transform"
            className="px-4 py-2.5 rounded-xl glass-card hover:bg-slate-800 text-sm font-semibold text-gray-200 border border-white/10 flex items-center space-x-1.5 transition-colors"
          >
            <span>Playground</span>
          </Link>
          <Link
            href="/create"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-sm font-bold text-white shadow-lg shadow-purple-600/30 flex items-center space-x-2 transition-transform hover:scale-102"
          >
            <Wand2 className="w-4 h-4" />
            <span>New Campaign</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Total Campaigns</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{totalCampaigns}</p>
          <p className="text-xs text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% processing success</span>
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Platform Assets Generated</span>
            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{totalAssets}</p>
          <p className="text-xs text-purple-300">Across 4+ social aspect ratios</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Cloudinary Storage Used</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">1.8 MB</p>
          <p className="text-xs text-cyan-400">f_auto saved 68% bandwidth</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Available AI Credits</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">350</p>
          <p className="text-xs text-gray-400">Pro Plan (Renews monthly)</p>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Recent Campaigns</span>
          </h2>
          <Link href="/create" className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1">
            <span>Create another</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <div className="p-12 text-center glass-card rounded-2xl border border-dashed border-white/10 space-y-4">
            <p className="text-gray-400">No campaigns created yet.</p>
            <Link
              href="/create"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold"
            >
              <span>Create First Campaign</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Thumbnails preview */}
                <div className="relative h-48 bg-gray-950 overflow-hidden">
                  {camp.generatedAssets[0] ? (
                    <Image
                      src={camp.generatedAssets[0].cloudinaryUrl}
                      alt={camp.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      No Preview
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Completed</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white truncate">{camp.name}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">{camp.description || "No description provided."}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      <span className="text-white font-semibold">{camp.generatedAssets.length}</span> Assets •{" "}
                      <span className="text-white font-semibold">{camp.marketingCopies.length}</span> Copy Bundles
                    </div>
                    <Link
                      href={`/campaigns/${camp.id}`}
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                    >
                      <span>View Kit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generated Assets Quick Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Latest Transformed Media Assets</h2>
          <Link href="/library" className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1">
            <span>View all in Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recentAssets.map((asset) => (
            <div key={asset.id} className="relative aspect-square rounded-xl overflow-hidden glass-card border border-white/5 group">
              <Image
                src={asset.cloudinaryUrl}
                alt={asset.variationType}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-xs font-semibold text-white capitalize">{asset.variationType.replace("-", " ")}</span>
                <span className="text-[10px] text-gray-400 font-mono uppercase">{asset.platform} • {asset.width}x{asset.height}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
