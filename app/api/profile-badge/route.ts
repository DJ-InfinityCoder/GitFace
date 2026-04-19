import { NextRequest, NextResponse } from "next/server";
import { generatePikaBadgeSVG, type SvgTheme } from "@/lib/github-stats-svg";
import { getCachedSVG, TTL } from "@/lib/svg-cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "location";
  const label = searchParams.get("label") || "";
  const theme = (searchParams.get("theme") || "dark") as SvgTheme;

  if (!label) {
    return new NextResponse("Label is required", { status: 400 });
  }

  const cacheKey = `profile-badge:${type}:${label.toLowerCase()}:${theme}`;

  try {
    const svg = await getCachedSVG(cacheKey, TTL.LONG, async () => {
      return generatePikaBadgeSVG(type, label, theme);
    });

    if (!svg) return new NextResponse("Badge generation failed", { status: 500 });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, s-maxage=${TTL.LONG / 1000}, stale-while-revalidate=600`,
      },
    });
  } catch (error) {
    console.error("Error generating profile badge:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
