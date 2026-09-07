import { NextResponse } from "next/server";
import { analyzeProductMedia } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { mediaUrl, mediaAssetId, hint } = await req.json();

    if (!mediaUrl && !mediaAssetId) {
      return NextResponse.json(
        { error: "mediaUrl or mediaAssetId is required" },
        { status: 400 }
      );
    }

    let urlToAnalyze = mediaUrl;
    if (!urlToAnalyze && mediaAssetId) {
      const asset = await prisma.mediaAsset.findUnique({
        where: { id: mediaAssetId },
      });
      if (asset) urlToAnalyze = asset.secureUrl;
    }

    const analysis = await analyzeProductMedia(urlToAnalyze || "", hint);

    // Save to database if mediaAssetId is provided
    if (mediaAssetId) {
      await prisma.mediaAnalysis.upsert({
        where: { mediaAssetId },
        update: {
          productType: analysis.productType,
          category: analysis.category,
          dominantColors: JSON.stringify(analysis.dominantColors),
          visualStyle: analysis.visualStyle,
          detectedObjects: JSON.stringify(analysis.detectedObjects),
          brand: analysis.brandTone,
          suggestedAudience: analysis.suggestedAudience,
          composition: analysis.composition,
          backgroundType: analysis.backgroundType,
          analysisRaw: JSON.stringify(analysis),
        },
        create: {
          mediaAssetId,
          productType: analysis.productType,
          category: analysis.category,
          dominantColors: JSON.stringify(analysis.dominantColors),
          visualStyle: analysis.visualStyle,
          detectedObjects: JSON.stringify(analysis.detectedObjects),
          brand: analysis.brandTone,
          suggestedAudience: analysis.suggestedAudience,
          composition: analysis.composition,
          backgroundType: analysis.backgroundType,
          analysisRaw: JSON.stringify(analysis),
        },
      });
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
