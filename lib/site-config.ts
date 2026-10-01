export const DEFAULT_SITE_URL = "https://gitface.dilip.website";

/**
 * Automatically transforms any legacy domain references (such as *.dilip.live or dilip.live)
 * in markdown content, badge URLs, or text into the official .website domain.
 */
export function sanitizeLegacyDomain(content: string): string {
  if (!content || typeof content !== "string") return content;
  return content
    .replace(/https?:\/\/gitface\.dilip\.live/gi, "https://gitface.dilip.website")
    .replace(/gitface\.dilip\.live/gi, "gitface.dilip.website")
    .replace(/https?:\/\/(?:www\.)?dilip\.live/gi, "https://dilip.website")
    .replace(/dilip\.live/gi, "dilip.website");
}

/**
 * Returns the canonical base URL for the site.
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL (if configured in environment)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (automatic on Vercel)
 * 3. VERCEL_URL (Vercel preview/deployment domain)
 * 4. Fallback: https://gitface.dilip.website
 */
export function getSiteUrl(): string {
  let url = DEFAULT_SITE_URL;

  if (process.env.NEXT_PUBLIC_APP_URL) {
    const custom = process.env.NEXT_PUBLIC_APP_URL.trim().replace(/\/$/, "");
    if (custom) url = custom;
  } else {
    const vercelProduction =
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (vercelProduction) {
      url = `https://${vercelProduction.replace(/\/$/, "")}`;
    } else {
      const vercelUrl =
        process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
      if (vercelUrl) {
        url = `https://${vercelUrl.replace(/\/$/, "")}`;
      }
    }
  }

  return sanitizeLegacyDomain(url);
}

/**
 * Returns the base URL for public README markdown badges.
 * When running in local development (e.g. localhost:3000), external GitHub READMEs
 * cannot fetch badges/stats from localhost, so this safely falls back to the public production domain.
 */
export function getMarkdownBaseUrl(): string {
  const customUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (customUrl && !customUrl.includes("localhost") && !customUrl.includes("127.0.0.1")) {
    return sanitizeLegacyDomain(customUrl.replace(/\/$/, ""));
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl.includes("localhost") && !siteUrl.includes("127.0.0.1")) {
    return sanitizeLegacyDomain(siteUrl);
  }

  return DEFAULT_SITE_URL;
}
