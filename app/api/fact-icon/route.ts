import { NextRequest, NextResponse } from "next/server";
import { generateFactIconSVG, generateFactBadgeSVG } from "@/lib/github-stats-svg";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "location";
  const label = searchParams.get("label");
  const value = searchParams.get("value");
  const theme = (searchParams.get("theme") as "light" | "dark") || "dark";

  const svg = value 
    ? generateFactBadgeSVG(type, label || "", value, theme)
    : generateFactIconSVG(type);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      // "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
