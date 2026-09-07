import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding MediaForge database...");

  // 1. Create demo user
  const hashedPassword = await bcrypt.hash("mediaforge2026", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@mediaforge.ai" },
    update: {},
    create: {
      email: "demo@mediaforge.ai",
      name: "Alex Vance",
      hashedPassword,
      credits: 350,
      plan: "pro",
    },
  });

  // 2. Create seed templates
  const templates = [
    {
      name: "Cyberpunk Future Neon",
      category: "Social First",
      aspectRatio: "1:1",
      bgStyle: "High-contrast neon reflections, moody twilight atmosphere",
      description: "Ideal for streetwear, sneakers, tech gadgets, and cutting-edge lifestyle drops.",
      thumbnailUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      presetParams: JSON.stringify({
        prompt: "futuristic neon-lit Tokyo street with reflective wet asphalt and pink-cyan volumetric light",
        crop: "fill",
        gravity: "auto",
      }),
      isPopular: true,
    },
    {
      name: "Minimalist Architectural Studio",
      category: "Minimalist",
      aspectRatio: "1:1",
      bgStyle: "Raw concrete pedestals, sharp natural geometric sunbeam shadows",
      description: "Crisp, clean editorial look favored by luxury design, ceramics, and premium hardware.",
      thumbnailUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      presetParams: JSON.stringify({
        prompt: "minimalist architectural concrete studio with sharp geometric sunlight shadows",
        crop: "fill",
        gravity: "auto",
      }),
      isPopular: true,
    },
    {
      name: "Alpine Dawn Lifestyle",
      category: "Outdoor & Adventure",
      aspectRatio: "9:16",
      bgStyle: "Breathtaking mountain ridges, golden hour haze, dramatic depth",
      description: "Built for TikTok reels, Instagram stories, and performance outdoor gear.",
      thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      presetParams: JSON.stringify({
        prompt: "epic rugged alpine mountain ridge at golden sunrise with dramatic natural mist",
        crop: "fill",
        gravity: "auto",
      }),
      isPopular: false,
    },
    {
      name: "Executive Feed Hero",
      category: "B2B & Professional",
      aspectRatio: "1.91:1",
      bgStyle: "Sleek corporate tech lounge, modern dark glass architecture",
      description: "Optimized for LinkedIn sponsored updates and high-conversion Facebook feed links.",
      thumbnailUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
      presetParams: JSON.stringify({
        prompt: "executive corporate glass headquarters with soft architectural ambient lighting",
        crop: "fill",
        gravity: "auto",
      }),
      isPopular: false,
    },
    {
      name: "Pure E-Commerce Isolation",
      category: "E-commerce",
      aspectRatio: "1:1",
      bgStyle: "Pure white #FFFFFF studio background with realistic contact drop shadow",
      description: "Amazon, Shopify, and Google Shopping 100% compliant marketplace asset.",
      thumbnailUrl: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80",
      presetParams: JSON.stringify({
        prompt: "white background with subtle contact shadow",
        crop: "pad",
        background: "white",
      }),
      isPopular: true,
    },
  ];

  for (const t of templates) {
    await prisma.template.create({ data: t });
  }

  // 3. Create a showcase Campaign
  const campaign = await prisma.campaign.create({
    data: {
      userId: user.id,
      name: "Crimson Velocity Global Launch",
      description: "Global omnichannel campaign introducing our next-generation kinetic running shoe.",
      goal: "Brand Awareness & Limited Drop Conversions",
      tone: "Futuristic, Dynamic & High-Impact",
      status: "completed",
      targetAudience: "Runners, Sneakerheads, Fitness Enthusiasts (18-35)",
    },
  });

  // 4. Create original media asset
  const originalAsset = await prisma.mediaAsset.create({
    data: {
      userId: user.id,
      campaignId: campaign.id,
      cloudinaryPublicId: "samples/ecommerce/shoes",
      cloudinaryUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
      secureUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
      type: "IMAGE",
      originalFilename: "crimson-runner-raw.jpg",
      width: 1200,
      height: 1200,
      size: 342000,
      format: "jpg",
      isOriginal: true,
    },
  });

  // 5. Create AI Analysis
  await prisma.mediaAnalysis.create({
    data: {
      mediaAssetId: originalAsset.id,
      productType: "Aerodynamic Performance Running Footwear",
      category: "Athletic Goods / Footwear",
      dominantColors: JSON.stringify(["#D32F2F", "#1A1A1A", "#FFFFFF"]),
      visualStyle: "Kinetic, bold, aerodynamic styling with high contrast accents",
      detectedObjects: JSON.stringify(["running shoe", "rubber sole", "lacing system"]),
      brand: "Velocity Labs",
      composition: "Lateral profile with forward diagonal speed vector",
      backgroundType: "Neutral studio gradient",
      suggestedAudience: "Urban athletes, marathoners, techwear fashion enthusiasts",
    },
  });

  // 6. Create Generated Assets
  const generatedVariants = [
    {
      variationType: "bg-removed",
      platform: "e-commerce",
      width: 1080,
      height: 1080,
      format: "png",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format",
      transformationStr: "e_background_removal/b_white/c_pad,w_1080,h_1080/f_auto,q_auto",
    },
    {
      variationType: "neon-grid",
      platform: "instagram",
      width: 1080,
      height: 1080,
      format: "jpg",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format",
      transformationStr: "e_background_removal/e_gen_background_replace:prompt_neon cyberpunk street/c_fill,w_1080,h_1080,g_auto/f_auto,q_auto",
    },
    {
      variationType: "lifestyle-outdoor",
      platform: "tiktok",
      width: 1080,
      height: 1920,
      format: "jpg",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1920&fit=crop&auto=format",
      transformationStr: "e_background_removal/e_gen_background_replace:prompt_alpine mountain ridge/c_fill,w_1080,h_1920,g_auto/f_auto,q_auto",
    },
    {
      variationType: "executive-banner",
      platform: "linkedin",
      width: 1200,
      height: 627,
      format: "jpg",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=627&fit=crop&auto=format",
      transformationStr: "e_background_removal/e_gen_background_replace:prompt_minimalist concrete studio/c_fill,w_1200,h_627,g_auto/f_auto,q_auto",
    },
  ];

  for (const v of generatedVariants) {
    await prisma.generatedAsset.create({
      data: {
        campaignId: campaign.id,
        sourceAssetId: originalAsset.id,
        cloudinaryPublicId: `samples/ecommerce/shoes_${v.variationType}`,
        cloudinaryUrl: v.url,
        secureUrl: v.url,
        variationType: v.variationType,
        platform: v.platform,
        width: v.width,
        height: v.height,
        format: v.format,
        transformationStr: v.transformationStr,
      },
    });
  }

  // 7. Create Marketing Copy
  await prisma.marketingCopy.create({
    data: {
      campaignId: campaign.id,
      title: "Defy Limits: The Crimson Velocity Runner",
      shortDesc: "Engineered for pure kinetic energy return and all-day pavement dominance.",
      longDesc: "Experience the next chapter of explosive speed. Crafted with precision aerospace-grade knit mesh and responsive nitrogen-infused foam cushioning.",
      instagramCaption: "Break past every plateau. ⚡ Designed for those who refuse to stand still. Experience cloud-like rebound and unmistakable street presence. Link in bio! #VelocityRunner #DefyLimits",
      facebookCaption: "Engineered for speed, crafted for endurance. Discover why runners worldwide are switching to the Crimson Velocity Runner.",
      linkedinCaption: "Innovation isn't just about iteration—it's about re-architecting the fundamentals. Behind the Crimson Velocity Runner is over 18 months of biomechanical lab testing.",
      twitterCaption: "Speed redefined. Zero compromises. The Crimson Velocity Runner drops today. 🔴👟 #RunFast #NewDrop",
      adHeadline: "The Most Responsive Runner Ever Engineered.",
      adDesc: "Nitrogen-infused foam meets aerodynamic knit mesh. Limited drop available now.",
      cta: "Shop the Drop",
      hashtags: JSON.stringify(["#VelocityRunner", "#PerformanceFootwear", "#RunFast", "#SneakerDrop"]),
      seoKeywords: JSON.stringify(["performance running shoe", "cushioned sneaker", "breathable marathon shoe"]),
    },
  });

  // 8. Create Analytics Events
  const eventTypes = ["asset_created", "campaign_published", "download", "transformation"];
  for (let i = 0; i < 24; i++) {
    await prisma.analyticsEvent.create({
      data: {
        userId: user.id,
        type: eventTypes[i % eventTypes.length],
        createdAt: new Date(Date.now() - i * 3600 * 1000 * 4),
      },
    });
  }

  console.log("Database successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
