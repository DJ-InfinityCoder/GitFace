import { NextRequest, NextResponse } from "next/server";
import { generateTechBadgeSVG } from "@/lib/github-stats-svg";
import { TECH_BADGES } from "@/lib/tech-badges";

export const dynamic = "force-dynamic";

async function getIconRawContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return "";
    let content = await response.text();
    // Remove XML declarations, DOCTYPEs and comments to prevent SVG nesting issues
    return content
      .replace(/<\?xml.*\?>/gi, "")
      .replace(/<!DOCTYPE.*?>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
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
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
