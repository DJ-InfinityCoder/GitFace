import { NextRequest, NextResponse } from "next/server";
import { generateRepoBadgeSVG } from "@/lib/github-stats-svg";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "stars";
  const repo = "DJ-InfinityCoder/GitFace";

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "Accept": "application/vnd.github.v3+json",
        // Add User-Agent as required by GitHub API
        "User-Agent": "GitFace-Badge-Generator"
      }
    });

    if (!response.ok) {
       throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json();

    let value = "0";
    if (type === "stars") {
      value = data.stargazers_count?.toLocaleString() || "0";
    } else if (type === "forks") {
      value = data.forks_count?.toLocaleString() || "0";
    } else if (type === "license") {
      value = data.license?.spdx_id || "MIT";
    }

    const svg = generateRepoBadgeSVG(type, value);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching repo stats:", error);
    // Return a fallback badge with "?" instead of error to keep it clean
    const svg = generateRepoBadgeSVG(type, "...");
    return new NextResponse(svg, {
      headers: { 
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache"
      },
    });
  }
}
