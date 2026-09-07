import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const PLATFORM_DIMENSIONS = {
  instagram: {
    post: { width: 1080, height: 1080, label: "Square Post (1:1)" },
    story: { width: 1080, height: 1920, label: "Story / Reel (9:16)" },
    portrait: { width: 1080, height: 1350, label: "Portrait (4:5)" },
  },
  tiktok: {
    video: { width: 1080, height: 1920, label: "Vertical Video (9:16)" },
  },
  facebook: {
    post: { width: 1200, height: 630, label: "Shared Link (1.91:1)" },
    square: { width: 1080, height: 1080, label: "Square (1:1)" },
  },
  linkedin: {
    banner: { width: 1200, height: 627, label: "Feed Post (1.91:1)" },
    square: { width: 1080, height: 1080, label: "Square (1:1)" },
  },
  ecommerce: {
    hero: { width: 1920, height: 1080, label: "Hero Banner (16:9)" },
    catalog: { width: 800, height: 800, label: "Product Card (1:1)" },
  },
};
