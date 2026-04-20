import { NextRequest, NextResponse } from "next/server";
import { fetchLatestActivity } from "@/lib/github-api";
import { generateActivitySVG, type SvgTheme } from "@/lib/github-stats-svg";
import { getCachedSVG, TTL } from "@/lib/svg-cache";
import "@/lib/env-init";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const theme = (request.nextUrl.searchParams.get("theme") || "dark") as SvgTheme;
  const cacheKey = `activity:${username.toLowerCase()}:${theme}`;

  try {
    const svg = await getCachedSVG(cacheKey, TTL.SHORT, async () => {
      const activity = await fetchLatestActivity(username);
      if (!activity) return null;
      return generateActivitySVG(activity, theme);
    });

    if (!svg) return new NextResponse("Activity not found", { status: 404 });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, s-maxage=${TTL.SHORT / 1000}, stale-while-revalidate=60`,
      },
    });
  } catch (error) {
    console.error("Error generating activity:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
