import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubStreak } from "@/lib/github-api";
import { generateStreakSVG, type SvgTheme } from "@/lib/github-stats-svg";
import { getCachedSVG, TTL } from "@/lib/svg-cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const theme = (request.nextUrl.searchParams.get("theme") || "dark") as SvgTheme;
  const cacheKey = `streak:${username.toLowerCase()}:${theme}`;

  try {
    const svg = await getCachedSVG(cacheKey, TTL.SHORT, async () => {
      const streakData = await fetchGitHubStreak(username);
      if (!streakData) return null;
      return generateStreakSVG({
        total: streakData.totalContributions,
        current: streakData.currentStreak,
        longest: streakData.longestStreak,
        totalRange: streakData.totalRange,
        currentRange: streakData.currentRange,
        longestRange: streakData.longestRange,
      }, theme);
    });

    if (!svg) return new NextResponse("Streak data not found", { status: 404 });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, s-maxage=${TTL.SHORT / 1000}, stale-while-revalidate=60`,
      },
    });
  } catch (error) {
    console.error("Error generating streak stats:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return new NextResponse(message, { status: 500 });
  }
}
