import { prisma } from "@/lib/prisma";
import { AssetCard } from "@/components/asset-card";
import { Search, Filter, Sparkles, FolderArchive } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MediaLibraryPage() {
  const assets = await prisma.generatedAsset.findMany({
    orderBy: { createdAt: "desc" },
  });

  const originalAssets = await prisma.mediaAsset.findMany({
    where: { isOriginal: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30">
              Cloudinary Media Vault
            </span>
            <span className="text-xs text-gray-400">{assets.length + originalAssets.length} Assets Stored</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Media Library</h1>
          <p className="text-sm text-gray-400">
            Search, filter, and inspect your original source uploads and AI-generated multi-channel assets.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assets by tag or platform..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          <button className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold">
            All Assets
          </button>
          <button className="px-3 py-1.5 rounded-lg glass-card text-gray-300 hover:text-white text-xs font-semibold">
            Instagram (1:1)
          </button>
          <button className="px-3 py-1.5 rounded-lg glass-card text-gray-300 hover:text-white text-xs font-semibold">
            TikTok (9:16)
          </button>
          <button className="px-3 py-1.5 rounded-lg glass-card text-gray-300 hover:text-white text-xs font-semibold">
            E-Commerce
          </button>
          <button className="px-3 py-1.5 rounded-lg glass-card text-gray-300 hover:text-white text-xs font-semibold">
            LinkedIn
          </button>
        </div>
      </div>

      {/* Generated Platform Assets Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Platform Assets Generated via Cloudinary AI</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
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

      {/* Raw Original Uploads Grid */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <FolderArchive className="w-4 h-4 text-cyan-400" />
          <span>Original Ingested Assets</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {originalAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              id={asset.id}
              name={asset.originalFilename}
              url={asset.secureUrl}
              platform="source"
              width={asset.width}
              height={asset.height}
              variationType="Raw Source"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
