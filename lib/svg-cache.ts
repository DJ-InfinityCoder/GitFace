/**
 * In-memory SVG cache with TTL.
 * Keys are derived from username + theme so different themes cache independently.
 * The cache is module-level, so it persists across requests within the same
 * Next.js server instance but resets on cold start or deployment.
 */

interface CacheEntry {
  value: string;
  expiresAt: number;
}

const globalCache = globalThis as unknown as {
  svgCache?: Map<string, CacheEntry>;
  svgCacheInterval?: NodeJS.Timeout;
};

if (!globalCache.svgCache) {
  globalCache.svgCache = new Map<string, CacheEntry>();
}

const cache = globalCache.svgCache;

// Lightweight periodic cleanup to avoid unbounded memory growth
if (!globalCache.svgCacheInterval) {
  globalCache.svgCacheInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (entry.expiresAt < now) cache.delete(key);
    }
  }, 5*60_000); // Run every 5 minutes
}

/**
 * Get a cached SVG or generate it fresh.
 *
 * @param key       Unique cache key (e.g. `stats:kamlesh:dark`)
 * @param ttlMs     Time-to-live in milliseconds (default 10 minutes)
 * @param generate  Async factory that produces the SVG string
 */
export async function getCachedSVG(
  key: string,
  ttlMs: number,
  generate: () => Promise<string | null>
): Promise<string | null> {
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) return hit.value;

  const value = await generate();
  if (value === null) return null;

  cache.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

// ── Convenience TTL constants ──────────────────────────────────────────────
export const TTL = {
  /** Fast-changing data (activity, streak) — 5 minutes */
  SHORT: 5 * 60 * 1000,
  /** Most stat cards — 10 minutes */
  MEDIUM: 10 * 60 * 1000,
  /** Pulse / yearly charts — 30 minutes */
  LONG: 30 * 60 * 1000,
} as const;
