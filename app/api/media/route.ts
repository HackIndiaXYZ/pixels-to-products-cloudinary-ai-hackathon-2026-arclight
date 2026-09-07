import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const campaignId = searchParams.get("campaignId");

    const assets = await prisma.mediaAsset.findMany({
      where: {
        ...(type ? { type } : {}),
        ...(campaignId ? { campaignId } : {}),
      },
      include: {
        analysis: true,
        campaign: true,
        generatedAssets: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(assets);
  } catch (error) {
    console.error("Failed to fetch media assets:", error);
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
  }
}
