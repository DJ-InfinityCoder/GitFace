import { NextRequest, NextResponse } from "next/server";
import { generateSocialBadgeSVG } from "@/lib/github-stats-svg";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const value = searchParams.get("value");

  if (!platform || !value) {
    return new NextResponse("Platform and Value are required", { status: 400 });
  }

  const svg = generateSocialBadgeSVG(platform, value);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
