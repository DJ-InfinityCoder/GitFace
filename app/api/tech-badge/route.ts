import { NextRequest, NextResponse } from "next/server";
import { generateTechBadgeSVG } from "@/lib/github-stats-svg";
import { TECH_BADGES } from "@/lib/tech-badges";

// In-memory cache for fetched SVGs to avoid redundant network calls
const SVG_CACHE: Record<string, string> = {};

async function getIconRawContent(url: string): Promise<string> {
  if (SVG_CACHE[url]) return SVG_CACHE[url];

  try {
    const response = await fetch(url, { 
      next: { revalidate: 86400 } // Cache for 24 hours in Next.js
    });
    if (!response.ok) return "";
    let content = await response.text();
    // Remove XML declarations, DOCTYPEs and comments to prevent SVG nesting issues
    const cleaned = content
      .replace(/<\?xml.*\?>/gi, "")
      .replace(/<!DOCTYPE.*?>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
    
    SVG_CACHE[url] = cleaned;
    return cleaned;
  } catch (e) {
    console.error(`Failed to fetch icon from ${url}:`, e);
    return "";
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  // 1. Try exact match by iconId (stablest)
  let tech = TECH_BADGES.find(
    (t) => t.iconId?.toLowerCase() === name.toLowerCase()
  );

  // 2. Try exact match by formatted name
  if (!tech) {
    tech = TECH_BADGES.find(
      (t) => t.name.toLowerCase() === name.toLowerCase() ||
             t.name.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase()
    );
  }

  // 3. Last resort fuzzy match (must be a significant match)
  if (!tech) {
    tech = TECH_BADGES.find(
      (t) => t.name.toLowerCase().startsWith(name.toLowerCase()) && 
             Math.abs(t.name.length - name.length) < 5
    );
  }

  let iconContent = "";
  let color = "#333333";
  let techName = name;

  if (tech) {
    iconContent = await getIconRawContent(tech.badgeUrl);
    color = tech.color;
    techName = tech.name;
  } else {
    // Fallback
    const fallbackUrl = "https://cdn.jsdelivr.net/gh/xandemon/developer-icons@main/icons/developer-icons.svg";
    iconContent = await getIconRawContent(fallbackUrl);
  }

  const svg = generateTechBadgeSVG(techName, color, iconContent);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      // "Cache-Control": "no-cache",
    },
  });
}
