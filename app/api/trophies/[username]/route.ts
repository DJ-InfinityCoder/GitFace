import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubUser, fetchGitHubStats } from "@/lib/github-api";
import { generateTrophiesSVG, type SvgTheme } from "@/lib/github-stats-svg";
import { getCachedSVG, TTL } from "@/lib/svg-cache";
import "@/lib/env-init";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const theme = (request.nextUrl.searchParams.get("theme") || "dark") as SvgTheme;
  const cacheKey = `trophies:${username.toLowerCase()}:${theme}`;

  try {
    const svg = await getCachedSVG(cacheKey, TTL.MEDIUM, async () => {
      const [user, stats] = await Promise.all([
        fetchGitHubUser(username),
        fetchGitHubStats(username),
      ]);
      if (!user || !stats) return null;
      return generateTrophiesSVG({
        stars: stats.totalStars,
        repos: user.public_repos,
        followers: user.followers,
      }, theme);
    });

    if (!svg) return new NextResponse("User data not found", { status: 404 });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, s-maxage=${TTL.MEDIUM / 1000}, stale-while-revalidate=60`,
      },
    });
  } catch (error) {
    console.error("Error generating trophies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
