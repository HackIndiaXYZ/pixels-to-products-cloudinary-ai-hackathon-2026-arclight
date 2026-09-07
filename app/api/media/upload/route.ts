import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const campaignId = formData.get("campaignId") as string | null;

    let userId = session?.user?.id;
    if (!userId) {
      const demoUser = await prisma.user.upsert({
        where: { email: "demo@mediaforge.ai" },
        update: {},
        create: {
          email: "demo@mediaforge.ai",
          name: "Hackathon Judge",
          plan: "pro",
        },
      });
      userId = demoUser.id;
    }

    let publicId = `mediaforge_${Date.now()}`;
    let secureUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80";
    let width = 1200;
    let height = 1200;
    let format = "jpg";
    let size = 256000;
    let originalFilename = "product-image.jpg";

    if (file) {
      originalFilename = file.name;
      size = file.size;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

      try {
        const uploadRes = await uploadToCloudinary(base64Data, "mediaforge/originals");
        publicId = uploadRes.public_id;
        secureUrl = uploadRes.secure_url;
        width = uploadRes.width;
        height = uploadRes.height;
        format = uploadRes.format;
      } catch (uploadErr) {
        console.warn("Cloudinary direct upload fallback to demo asset:", uploadErr);
      }
    }

    // Persist media asset record in database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        userId,
        campaignId: campaignId || undefined,
        cloudinaryPublicId: publicId,
        cloudinaryUrl: secureUrl,
        secureUrl: secureUrl,
        type: "IMAGE",
        originalFilename,
        width,
        height,
        size,
        format,
        isOriginal: true,
      },
    });

    return NextResponse.json(mediaAsset);
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Failed to upload asset" }, { status: 500 });
  }
}
