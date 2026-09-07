import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Sparkles, ArrowRight, Wand2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generative Style Presets</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Curated Campaign Templates
        </h1>
        <p className="text-sm text-gray-400">
          Kickstart your multi-platform media production with battle-tested visual presets engineered
          for conversion, engagement, and viral social reach.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-300 flex flex-col group"
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              <Image
                src={template.thumbnailUrl}
                alt={template.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold text-purple-300 border border-white/10 uppercase">
                {template.category}
              </div>
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-gray-300">
                {template.aspectRatio}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  {template.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {template.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/5">
                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-gray-400 font-medium block">Atmosphere:</span>
                  <span className="text-xs text-purple-200 font-mono line-clamp-1">{template.bgStyle}</span>
                </div>

                <Link
                  href={`/create?template=${template.id}`}
                  className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold transition-all border border-purple-500/30 flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Use This Preset in Studio</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
