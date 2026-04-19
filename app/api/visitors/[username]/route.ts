import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { generateVisitorBadgeSVG } from "@/lib/github-stats-svg";
import { createHash } from "crypto";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  
  // Use a fallback for environment variable check if needed
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return new NextResponse("Redis configuration missing", { status: 500 });
  }

  try {
    // 1. Identification
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
    
    // Privacy: Hash the IP with the username as salt (unique per profile)
    const rawHash = createHash("sha256")
      .update(`${ip}-${username}`)
      .digest("hex");
    
    // Use short hash for Redis storage
    const ipHash = rawHash.substring(0, 16);

    const totalKey = `visitors:total:${username}`;
    const uniqueKey = `visitors:unique:${username}`;

    // 2. Atomic Redis Operations (Total + Unique)
    // We use a pipeline to minimize roundtrips
    const pipeline = redis.pipeline();
    pipeline.incr(totalKey);
    pipeline.sadd(uniqueKey, ipHash);
    pipeline.scard(uniqueKey);
    
    const results = await pipeline.exec();
    
    const totalCount = results[0] as number;
    const uniqueCount = results[2] as number;

    // 3. Generate and Return SVG
    const svg = generateVisitorBadgeSVG(totalCount, uniqueCount);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error tracking visitors:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
