# GitFace: GitHub Stats API & SVG Generator Context

This document provides a comprehensive overview of the available API endpoints and the underlying SVG generation logic for the **GitFace** README generator.

## Base URL
All API requests are relative to the deployment domain (e.g., `https://gitface.io/api/...`).

---

## 1. User Statistics APIs
These endpoints fetch data from the GitHub GraphQL/REST APIs and render them into themed SVGs.

| Endpoint | Generator Function | Description |
| :--- | :--- | :--- |
| `/api/stats/[username]` | `generateStatsSVG` | General stats: Stars, Commits, PRs, Issues. |
| `/api/langs/[username]` | `generateLangsSVG` | Bar chart of most used languages with percentages. |
| `/api/streak/[username]` | `generateStreakSVG` | Current, longest, and total contribution streaks. |
| `/api/trophies/[username]` | `generateTrophiesSVG` | Ranked achievements based on user metrics. |
| `/api/highlights/[username]` | `generateHighlightsSVG` | List of top repositories with star/fork counts. |

### Parameters
- **`theme`**: (Query Param) `dark` (default), `light`, or `monochrome`.

---

## 2. Activity & Pulse APIs
Visualize contribution timing and recent actions.

| Endpoint | Generator Function | Description |
| :--- | :--- | :--- |
| `/api/pulse/[username]` | `generatePulseSVG` | Weekly contribution distribution (Sun-Sat). |
| `/api/pulse-monthly/[username]` | `generateMonthlyPulseSVG` | Monthly contribution heat chart. |
| `/api/pulse-yearly/[username]` | `generateYearlyPulseSVG` | Multi-year contribution comparison. |
| `/api/activity/[username]` | `generateActivitySVG` | Live badge showing the last recorded GitHub action. |
| `/api/persona/[username]` | `generatePersonaSVG` | AI-style "Developer Type" (e.g., Night Owl). |
| `/api/oss/[username]` | `generateOSSSVG` | Total count of contributions to external repos. |

---

## 3. Utility Badge APIs
Static or semi-dynamic badges for branding and quick facts.

| Endpoint | Generator Function | Parameters |
| :--- | :--- | :--- |
| `/api/social-badge` | `generateSocialBadgeSVG` | `platform` (slug), `value` (handle) |
| `/api/tech-badge` | `generateTechBadgeSVG` | `name`, `color` (hex), `icon` (SVG path/content) |
| `/api/visitors/[username]` | `generateVisitorBadgeSVG` | Live visitor counter (Total/Unique) |
| `/api/fact-icon` | `generateFactIconSVG` | `type` (location, mail, portfolio, etc.) |

---

## 4. Technical Implementation Details (`lib/github-stats-svg.ts`)

### Styling & Themes
The colors are managed via the `THEME_COLORS` constant:
- **Dark**: GitHub-style dark mode (`#0d1117`).
- **Light**: Standard GitHub light mode.
- **Monochrome**: High-contrast black and white for a professional look.

### Icon Registry (`SOCIAL_ICONS`)
A massive dictionary of high-fidelity social icons. Each icon entry supports:
- `path`: Simple SVG path.
- `paths`: Array of complex multi-layer paths with individual colors.
- `extraDefs`: Gradient definitions or clips.
- `body`: Raw SVG inner content for complex rendering.

### Caching
- **Server Cache**: Uses Upstash Redis via `lib/svg-cache.ts`.
- **HTTP Cache**: Implements `Cache-Control` headers with `stale-while-revalidate` for edge performance.

---

## 5. Usage in LLM Prompts
When asking an LLM to generate new badge styles or expand the icon registry, provide this context:
> "GitFace uses a TypeScript-based SVG engine. Social icons are stored in a record where 'monochrome' mode overrides standard colors. New icons should provide a viewbox and either a single path or a 'body' string."
