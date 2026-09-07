import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const campaigns = await prisma.campaign.findMany({
      where: userId ? { userId } : undefined,
      include: {
        mediaAssets: true,
        generatedAssets: true,
        marketingCopies: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    // Default demo user if not logged in
    let userId = session?.user?.id;
    if (!userId) {
      const defaultUser = await prisma.user.upsert({
        where: { email: "demo@mediaforge.ai" },
        update: {},
        create: {
          email: "demo@mediaforge.ai",
          name: "Hackathon Judge",
          plan: "pro",
          credits: 500,
        },
      });
      userId = defaultUser.id;
    }

    const campaign = await prisma.campaign.create({
      data: {
        userId,
        name: body.name || "Untitled Campaign",
        description: body.description || "",
        goal: body.goal || "Brand Awareness & Conversions",
        tone: body.tone || "Modern & Bold",
        status: "completed",
        targetAudience: body.targetAudience || "Digital Consumers & Creators",
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Failed to create campaign:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
