import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "mediaforge-demo",
  api_key: process.env.CLOUDINARY_API_KEY || "123456789012345",
  api_secret: process.env.CLOUDINARY_API_SECRET || "demo-secret",
  secure: true,
});

export { cloudinary };

// Pre-seeded high-res demo assets for reliable hackathon showcase
export const DEMO_PRESETS = {
  original: {
    publicId: "samples/ecommerce/shoes",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
    name: "Crimson Velocity Runner",
    category: "Footwear / Athletics",
    dominantColors: ["#D32F2F", "#1A1A1A", "#FFFFFF"],
  },
  bgRemoved: {
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
  },
  variations: [
    {
      id: "var-1",
      name: "Cyberpunk Neon Grid",
      platform: "instagram",
      type: "Square Post (1:1)",
      width: 1080,
      height: 1080,
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format",
      transformationStr: "e_background_removal/e_gen_background_replace:prompt_neon cyberpunk street with reflections/c_fill,w_1080,h_1080,g_auto/f_auto,q_auto",
    },
    {
      id: "var-2",
      name: "Minimalist Studio Light",
      platform: "ecommerce",
      type: "Product Card (1:1)",
      width: 1080,
      height: 1080,
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1080&fit=crop&auto=format",
      transformationStr: "e_background_removal/b_white/c_pad,w_1080,h_1080/f_auto,q_auto",
    },
    {
      id: "var-3",
      name: "Mountain Trail Lifestyle",
      platform: "tiktok",
      type: "Vertical Story (9:16)",
      width: 1080,
      height: 1920,
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080&h=1920&fit=crop&auto=format",
      transformationStr: "e_background_removal/e_gen_background_replace:prompt_rugged alpine mountain hiking trail at sunrise/c_fill,w_1080,h_1920,g_auto/f_auto,q_auto",
    },
    {
      id: "var-4",
      name: "Executive Feed Banner",
      platform: "linkedin",
      type: "Feed Banner (1.91:1)",
      width: 1200,
      height: 627,
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=627&fit=crop&auto=format",
      transformationStr: "e_background_removal/e_gen_background_replace:prompt_modern architectural concrete studio with soft shadows/c_fill,w_1200,h_627,g_auto/f_auto,q_auto",
    },
  ],
};

/**
 * Generate upload signature for direct browser uploads
 */
export function generateUploadSignature(paramsToSign: Record<string, string | number>) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "demo-secret";
  return cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
}

/**
 * Construct optimized Cloudinary delivery URL with best practice auto-formatting
 */
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    gravity?: string;
    background?: string;
    effect?: string;
    format?: string;
    quality?: string | number;
  } = {}
) {
  const {
    width,
    height,
    crop = "auto",
    gravity = "auto",
    background,
    effect,
    format = "auto",
    quality = "auto",
  } = options;

  return cloudinary.url(publicId, {
    transformation: [
      {
        width,
        height,
        crop: width && height ? crop : undefined,
        gravity: gravity ? gravity : undefined,
        background,
        effect,
        fetch_format: format,
        quality,
      },
    ],
    secure: true,
  });
}

/**
 * Construct Cloudinary Generative Background Replacement URL
 */
export function getGenerativeBackgroundUrl(
  publicId: string,
  prompt: string,
  width = 1080,
  height = 1080
) {
  return cloudinary.url(publicId, {
    transformation: [
      { effect: "background_removal" },
      { effect: `gen_background_replace:prompt_${prompt}` },
      { width, height, crop: "fill", gravity: "auto" },
      { fetch_format: "auto", quality: "auto" },
    ],
    secure: true,
  });
}

/**
 * Construct Cloudinary Background Removal URL
 */
export function getBackgroundRemovedUrl(publicId: string) {
  return cloudinary.url(publicId, {
    transformation: [
      { effect: "background_removal" },
      { fetch_format: "auto", quality: "auto" },
    ],
    secure: true,
  });
}

/**
 * Construct Cloudinary Smart Auto Crop URL for specific platform dimensions
 */
export function getSmartCropUrl(
  publicId: string,
  width: number,
  height: number,
  gravity = "auto"
) {
  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: "fill", gravity },
      { fetch_format: "auto", quality: "auto" },
    ],
    secure: true,
  });
}

/**
 * Construct Cloudinary Generative Fill / Outpainting URL
 */
export function getGenerativeFillUrl(
  publicId: string,
  targetWidth: number,
  targetHeight: number,
  prompt?: string
) {
  const background = prompt ? `gen_fill:prompt_${prompt}` : "gen_fill";
  return cloudinary.url(publicId, {
    transformation: [
      { width: targetWidth, height: targetHeight, crop: "pad", background },
      { fetch_format: "auto", quality: "auto" },
    ],
    secure: true,
  });
}

/**
 * Upload a media file buffer or base64 to Cloudinary
 */
export async function uploadToCloudinary(
  fileBufferOrUrl: string,
  folder = "mediaforge/uploads",
  publicId?: string
): Promise<UploadApiResponse> {
  // If demo mode or test credentials, simulate upload
  if (process.env.DEMO_MODE === "true" && (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY === "123456789012345")) {
    return {
      public_id: publicId || `mediaforge_demo_${Date.now()}`,
      version: 1,
      signature: "demo-signature",
      width: 1200,
      height: 1200,
      format: "jpg",
      resource_type: "image",
      created_at: new Date().toISOString(),
      tags: ["demo", "mediaforge"],
      bytes: 256000,
      type: "upload",
      etag: "demo-etag",
      placeholder: false,
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
      secure_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
      access_mode: "public",
    } as UploadApiResponse;
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileBufferOrUrl,
      {
        folder,
        public_id: publicId,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    );
  });
}
