import { GoogleGenerativeAI } from "@google/generative-ai";

export interface MediaAnalysisResult {
  productType: string;
  category: string;
  dominantColors: string[];
  visualStyle: string;
  detectedObjects: string[];
  brandTone: string;
  suggestedAudience: string;
  composition: string;
  backgroundType: string;
  suggestedPrompts: string[];
}

export interface MarketingCopyResult {
  title: string;
  shortDesc: string;
  longDesc: string;
  instagramCaption: string;
  facebookCaption: string;
  linkedinCaption: string;
  twitterCaption: string;
  adHeadline: string;
  adDesc: string;
  cta: string;
  hashtags: string[];
  seoKeywords: string[];
}

const DEMO_ANALYSIS: MediaAnalysisResult = {
  productType: "Performance Athletic Running Shoe",
  category: "Sports & Footwear",
  dominantColors: ["#D32F2F", "#1A1A1A", "#FFFFFF", "#FF5252"],
  visualStyle: "Dynamic, modern, aerodynamic high-performance sportswear",
  detectedObjects: ["sneaker", "running shoe", "rubber sole", "mesh upper", "laces"],
  brandTone: "Energetic, premium, breakthrough athletic engineering",
  suggestedAudience: "Runners, athletes, fitness enthusiasts, streetwear aficionados (18-35)",
  composition: "Lateral profile perspective with dynamic forward tilt",
  backgroundType: "Neutral gradient studio backdrop",
  suggestedPrompts: [
    "hyper-futuristic neon drenched Tokyo street at dusk with wet asphalt reflections",
    "minimalist architectural raw concrete plinth with dramatic razor-sharp sunlight shadows",
    "scenic rugged alpine mountain ridge at sunrise with mist and golden hour glow",
    "luxurious velvet pedestal in high-end flagship sneaker gallery with spotlighting",
  ],
};

const DEMO_COPY: MarketingCopyResult = {
  title: "Defy Limits: The Crimson Velocity Runner",
  shortDesc: "Engineered for pure kinetic energy return and all-day pavement dominance.",
  longDesc: "Experience the next chapter of explosive speed. Crafted with precision aerospace-grade knit mesh and responsive nitrogen-infused foam cushioning, the Crimson Velocity Runner delivers unparalleled stability, razor-sharp cornering, and instant acceleration.",
  instagramCaption: "Break past every plateau. ⚡ Designed for those who refuse to stand still. Experience cloud-like rebound and unmistakable street presence. Tap the link in bio to secure your pair before the limited drop vanishes. #VelocityRunner #DefyLimits #SneakerHead",
  facebookCaption: "Engineered for speed, crafted for endurance. Discover why athletes around the world are making the switch to the Crimson Velocity Runner. Get free express shipping on all orders this week only!",
  linkedinCaption: "Innovation isn't just about iteration—it's about re-architecting the fundamentals. Behind the Crimson Velocity Runner is over 18 months of biomechanical lab testing and closed-loop material recycling. The future of athletic footwear is here.",
  twitterCaption: "Speed redefined. Zero compromises. The Crimson Velocity Runner drops today. 🔴👟 #RunFast #NewDrop",
  adHeadline: "The Most Responsive Runner Ever Engineered.",
  adDesc: "Nitrogen-infused foam meets aerodynamic mesh. Shop the limited launch collection today.",
  cta: "Shop the Launch",
  hashtags: ["#VelocityRunner", "#PerformanceFootwear", "#RunFast", "#SneakerDrop", "#AthleticLife"],
  seoKeywords: ["lightweight running shoe", "cushioned performance sneaker", "breathable marathon shoe", "athletic footwear 2026"],
};

/**
 * AI Analysis service with Google Gemini & Demo Mode fallback
 */
export async function analyzeProductMedia(
  mediaUrl: string,
  hint?: string
): Promise<MediaAnalysisResult> {
  const apiKey = process.env.AI_API_KEY;
  const isDemo = process.env.DEMO_MODE === "true" || !apiKey || apiKey === "your-gemini-api-key-here";

  if (isDemo) {
    // Return realistic analysis in demo mode
    return {
      ...DEMO_ANALYSIS,
      productType: hint ? `${hint} (AI Analyzed)` : DEMO_ANALYSIS.productType,
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this commercial product image: "${mediaUrl}". Optional context: ${hint || "None"}.
Respond strictly with valid JSON matching this schema:
{
  "productType": "string",
  "category": "string",
  "dominantColors": ["#hex1", "#hex2"],
  "visualStyle": "string",
  "detectedObjects": ["obj1", "obj2"],
  "brandTone": "string",
  "suggestedAudience": "string",
  "composition": "string",
  "backgroundType": "string",
  "suggestedPrompts": ["prompt1", "prompt2", "prompt3", "prompt4"]
}`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini analysis error, falling back to demo analysis:", error);
    return DEMO_ANALYSIS;
  }
}

/**
 * Generate full multi-platform marketing copy variants
 */
export async function generateMarketingCampaignCopy(
  analysis: MediaAnalysisResult,
  campaignTone = "bold and modern",
  goal = "conversions"
): Promise<MarketingCopyResult> {
  const apiKey = process.env.AI_API_KEY;
  const isDemo = process.env.DEMO_MODE === "true" || !apiKey || apiKey === "your-gemini-api-key-here";

  if (isDemo) {
    return DEMO_COPY;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a full multi-channel marketing campaign package for this product:
Product: ${analysis.productType}
Category: ${analysis.category}
Brand Tone: ${campaignTone}
Goal: ${goal}
Target Audience: ${analysis.suggestedAudience}

Respond ONLY with valid JSON matching this exact structure:
{
  "title": "Campaign Title",
  "shortDesc": "One punchy sentence",
  "longDesc": "2-3 sentences overview",
  "instagramCaption": "Engaging caption with CTA and emojis",
  "facebookCaption": "Community/value oriented post",
  "linkedinCaption": "Professional/innovation focused post",
  "twitterCaption": "Short punchy tweet with hashtag",
  "adHeadline": "Ad headline (under 40 chars)",
  "adDesc": "Ad description",
  "cta": "Call to action button label",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "seoKeywords": ["kw1", "kw2", "kw3"]
}`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI copy generation error, using fallback copy:", error);
    return DEMO_COPY;
  }
}
