import { NextRequest, NextResponse } from "next/server";
import { generateFactIconSVG } from "@/lib/github-stats-svg";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "location";

  const svg = generateFactIconSVG(type);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
