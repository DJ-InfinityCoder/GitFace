import { NextRequest, NextResponse } from "next/server";

/**
 * API to clear server-side SVG cache for a specific user.
 * This ensures that when a user resets their profile, any cached SVGs on the server
 * are also wiped so they can be regenerated with fresh data.
 */

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const globalCache = globalThis as any;
    const cache = globalCache.svgCache as Map<string, any>;

    if (cache) {
      let clearedCount = 0;
      const lowerUsername = username.toLowerCase();

      // Iterate through cache and delete keys matching the username
      // Keys are typically in the format "type:username:theme"
      for (const key of cache.keys()) {
        const parts = key.split(':');
        // Check if the middle part (username) matches
        if (parts[1] && parts[1].toLowerCase() === lowerUsername) {
          cache.delete(key);
          clearedCount++;
        }
      }

      console.log(`[Cache] Cleared ${clearedCount} entries for user: ${username}`);
      return NextResponse.json({ 
        success: true, 
        message: `Cleared ${clearedCount} cache entries for ${username}` 
      });
    }

    return NextResponse.json({ success: true, message: "Cache was already empty" });
  } catch (error) {
    console.error("Failed to clear cache:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
