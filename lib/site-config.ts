export const DEFAULT_SITE_URL = "https://gitface.dilip.website";

/**
 * Returns the canonical base URL for the site.
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL (if configured in environment)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (automatic on Vercel)
 * 3. VERCEL_URL (Vercel preview/deployment domain)
 * 4. Fallback: https://gitface.dilip.website
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    const url = process.env.NEXT_PUBLIC_APP_URL.trim().replace(/\/$/, "");
    if (url) return url;
  }

  const vercelProduction =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) {
    return `https://${vercelProduction.replace(/\/$/, "")}`;
  }

  const vercelUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return DEFAULT_SITE_URL;
}

/**
 * Returns the base URL for public README markdown badges.
 * When running in local development (e.g. localhost:3000), external GitHub READMEs
 * cannot fetch badges/stats from localhost, so this safely falls back to the public production domain.
 */
export function getMarkdownBaseUrl(): string {
  const customUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (customUrl && !customUrl.includes("localhost") && !customUrl.includes("127.0.0.1")) {
    return customUrl.replace(/\/$/, "");
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl.includes("localhost") && !siteUrl.includes("127.0.0.1")) {
    return siteUrl;
  }

  return DEFAULT_SITE_URL;
}
