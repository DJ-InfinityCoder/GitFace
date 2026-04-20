import { NextRequest, NextResponse } from "next/server";
import { fetchAdvancedGitHubStats } from "@/lib/github-api";
import { generateMonthlyPulseSVG, type SvgTheme } from "@/lib/github-stats-svg";
import { getCachedSVG, TTL } from "@/lib/svg-cache";
import "@/lib/env-init";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const theme = (request.nextUrl.searchParams.get("theme") || "dark") as SvgTheme;
  const cacheKey = `pulse-monthly:${username.toLowerCase()}:${theme}`;

  try {
    const svg = await getCachedSVG(cacheKey, TTL.LONG, async () => {
      const stats = await fetchAdvancedGitHubStats(username);
      if (!stats) return null;
      return generateMonthlyPulseSVG(stats.activityDays, theme);
    });

    if (!svg) return new NextResponse("Data not found", { status: 404 });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, s-maxage=${TTL.LONG / 1000}, stale-while-revalidate=300`,
      },
    });
  } catch (error) {
    console.error("Error generating monthly pulse:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
