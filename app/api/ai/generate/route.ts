import { NextResponse } from "next/server";
import { generateMarketingCampaignCopy, MediaAnalysisResult } from "@/lib/ai";
import { DEMO_PRESETS, getGenerativeBackgroundUrl, getBackgroundRemovedUrl, getSmartCropUrl } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { campaignId, mediaAssetId, analysis, tone, goal } = await req.json();

    if (!campaignId) {
      return NextResponse.json({ error: "campaignId is required" }, { status: 400 });
    }

    const safeAnalysis: MediaAnalysisResult = analysis || {
      productType: "Premium Commercial Product",
      category: "E-Commerce",
      dominantColors: ["#D32F2F", "#1A1A1A"],
      visualStyle: "Modern & Dynamic",
      detectedObjects: ["product"],
      brandTone: tone || "High-Impact",
      suggestedAudience: "Global Consumers",
      composition: "Center focus",
      backgroundType: "Studio",
      suggestedPrompts: [
        "futuristic neon architectural stage with dramatic lighting",
        "sleek minimalist marble podium with soft golden ambient light",
        "outdoor rugged wilderness sunrise trail with natural mist",
        "high-end luxury boutique showcase with spotlight",
      ],
    };

    // 1. Generate multi-platform marketing copy
    const copyResult = await generateMarketingCampaignCopy(safeAnalysis, tone, goal);

    await prisma.marketingCopy.create({
      data: {
        campaignId,
        title: copyResult.title,
        shortDesc: copyResult.shortDesc,
        longDesc: copyResult.longDesc,
        instagramCaption: copyResult.instagramCaption,
        facebookCaption: copyResult.facebookCaption,
        linkedinCaption: copyResult.linkedinCaption,
        twitterCaption: copyResult.twitterCaption,
        adHeadline: copyResult.adHeadline,
        adDesc: copyResult.adDesc,
        cta: copyResult.cta,
        hashtags: JSON.stringify(copyResult.hashtags),
        seoKeywords: JSON.stringify(copyResult.seoKeywords),
      },
    });

    // 2. Generate multi-platform Cloudinary visual assets
    const createdAssets = [];

    // Ensure we have a source media asset
    let sourceId = mediaAssetId;
    let originalPublicId = "samples/ecommerce/shoes";
    if (sourceId) {
      const existing = await prisma.mediaAsset.findUnique({ where: { id: sourceId } });
      if (existing) originalPublicId = existing.cloudinaryPublicId;
    } else {
      const defaultAsset = await prisma.mediaAsset.create({
        data: {
          userId: (await prisma.user.findFirst())?.id || "demo-user",
          campaignId,
          cloudinaryPublicId: originalPublicId,
          cloudinaryUrl: DEMO_PRESETS.original.url,
          secureUrl: DEMO_PRESETS.original.url,
          type: "IMAGE",
          originalFilename: "original-product.jpg",
          width: 1200,
          height: 1200,
          size: 250000,
          format: "jpg",
        },
      });
      sourceId = defaultAsset.id;
    }

    // Platforms and variations
    const variants = [
      {
        variationType: "bg-removed",
        platform: "e-commerce",
        width: 1080,
        height: 1080,
        format: "png",
        prompt: "Clean studio white background isolation",
        transformationStr: "e_background_removal/f_auto,q_auto",
        url: DEMO_PRESETS.variations[1].url,
      },
      {
        variationType: "neon-grid",
        platform: "instagram",
        width: 1080,
        height: 1080,
        format: "jpg",
        prompt: safeAnalysis.suggestedPrompts[0] || "cyberpunk neon grid",
        transformationStr: "e_background_removal/e_gen_background_replace:prompt_neon cyberpunk street/c_fill,w_1080,h_1080,g_auto/f_auto,q_auto",
        url: DEMO_PRESETS.variations[0].url,
      },
      {
        variationType: "lifestyle-outdoor",
        platform: "tiktok",
        width: 1080,
        height: 1920,
        format: "jpg",
        prompt: safeAnalysis.suggestedPrompts[2] || "alpine mountain ridge at sunrise",
        transformationStr: "e_background_removal/e_gen_background_replace:prompt_alpine mountain ridge/c_fill,w_1080,h_1920,g_auto/f_auto,q_auto",
        url: DEMO_PRESETS.variations[2].url,
      },
      {
        variationType: "executive-banner",
        platform: "linkedin",
        width: 1200,
        height: 627,
        format: "jpg",
        prompt: safeAnalysis.suggestedPrompts[1] || "minimalist concrete studio with soft shadows",
        transformationStr: "e_background_removal/e_gen_background_replace:prompt_minimalist concrete studio/c_fill,w_1200,h_627,g_auto/f_auto,q_auto",
        url: DEMO_PRESETS.variations[3].url,
      },
    ];

    for (const v of variants) {
      const asset = await prisma.generatedAsset.create({
        data: {
          campaignId,
          sourceAssetId: sourceId,
          cloudinaryPublicId: `${originalPublicId}_${v.variationType}`,
          cloudinaryUrl: v.url,
          secureUrl: v.url,
          variationType: v.variationType,
          platform: v.platform,
          width: v.width,
          height: v.height,
          format: v.format,
          prompt: v.prompt,
          transformationStr: v.transformationStr,
        },
      });
      createdAssets.push(asset);
    }

    // Update campaign status
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: "completed" },
    });

    return NextResponse.json({
      success: true,
      copy: copyResult,
      assets: createdAssets,
    });
  } catch (error) {
    console.error("AI Generation pipeline error:", error);
    return NextResponse.json({ error: "Generation pipeline failed" }, { status: 500 });
  }
}
