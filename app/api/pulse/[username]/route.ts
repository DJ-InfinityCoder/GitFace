import { NextRequest, NextResponse } from "next/server";
import { fetchAdvancedGitHubStats } from "@/lib/github-api";
import { generatePulseSVG, type SvgTheme } from "@/lib/github-stats-svg";
import { getCachedSVG, TTL } from "@/lib/svg-cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const theme = (request.nextUrl.searchParams.get("theme") || "dark") as SvgTheme;
  const cacheKey = `pulse:${username.toLowerCase()}:${theme}`;

  try {
    const svg = await getCachedSVG(cacheKey, TTL.LONG, async () => {
      const data = await fetchAdvancedGitHubStats(username);
      if (!data) return null;
      return generatePulseSVG(data.activityDays || [], theme);
    });

    if (!svg) return new NextResponse("Data not found", { status: 404 });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, s-maxage=${TTL.LONG / 1000}, stale-while-revalidate=300`,
      },
    });
  } catch (error) {
    console.error("Error generating pulse:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
