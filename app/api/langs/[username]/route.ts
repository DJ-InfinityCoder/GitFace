import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubStats } from "@/lib/github-api";
import { generateLangsSVG, type SvgTheme } from "@/lib/github-stats-svg";
import { getCachedSVG, TTL } from "@/lib/svg-cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const theme = (request.nextUrl.searchParams.get("theme") || "dark") as SvgTheme;
  const cacheKey = `langs:${username.toLowerCase()}:${theme}`;

  try {
    const svg = await getCachedSVG(cacheKey, TTL.MEDIUM, async () => {
      const stats = await fetchGitHubStats(username);
      if (!stats) return null;
      return generateLangsSVG(username, stats.topLanguages, theme);
    });

    if (!svg) return new NextResponse("Data not found", { status: 404 });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, s-maxage=${TTL.MEDIUM / 1000}, stale-while-revalidate=60`,
      },
    });
  } catch (error) {
    console.error("Error generating language stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
