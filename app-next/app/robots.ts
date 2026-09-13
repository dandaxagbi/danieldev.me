import type { MetadataRoute } from "next";

// Portado literal de landing-app/public/robots.txt (ver SEO_GEO_REPORT.md) —
// misma lista de bots de IA permitidos explícitamente, más el disallow de
// /lab (constitución, principio IV: nunca indexado).
const ALLOWED_AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/lab" },
      ...ALLOWED_AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/lab",
      })),
    ],
    sitemap: "https://danieldev.me/sitemap.xml",
  };
}
