export type SvgTheme = "dark" | "light" | "monochrome";

const THEME_COLORS = {
  dark: {
    bg: "#0d1117",
    border: "#30363d",
    header: "#39d353",
    text: "#c9d1d9",
    textMuted: "#8b949e",
    textSubtle: "#6e7681",
    brand: "#444c56",
    accent: "#39d353",
    accentAlt: "#a371f7",
    accentOpen: "#3fb950",
    cardBg: "#161b22",
    barBg: "#161b22",
    badgeBg: "#161b22",
    badgeBorder: "#30363d",
  },
  light: {
    bg: "#ffffff",
    border: "#d1d9e0",
    header: "#1f883d",
    text: "#1f2328",
    textMuted: "#656d76",
    textSubtle: "#8b949e",
    brand: "#8b949e",
    accent: "#1f883d",
    accentAlt: "#8250df",
    accentOpen: "#1a7f37",
    cardBg: "#f6f8fa",
    barBg: "#eaeef2",
    badgeBg: "#f6f8fa",
    badgeBorder: "#d1d9e0",
  },
  monochrome: {
    bg: "#ffffff",
    border: "#000000",
    header: "#000000",
    text: "#000000",
    textMuted: "#666666",
    textSubtle: "#999999",
    brand: "#000000",
    accent: "#000000",
    accentAlt: "#e0e0e0",
    accentOpen: "#ffffff",
    cardBg: "#f0f0f0",
    barBg: "#e0e0e0",
    badgeBg: "#ffffff",
    badgeBorder: "#000000",
  },
};

function getColors(theme?: SvgTheme) {
  return THEME_COLORS[theme === "light" ? "light" : "dark"];
}

export interface StatsData {
  name: string;
  totalStars: number;
  totalRepos: number;
  followers: number;
  following: number;
  username: string;
}

export function generateStatsSVG(data: {
  name: string;
  username: string;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  prsMerged: number;
  prsOpen: number;
}, theme?: SvgTheme): string {
  const { name, username, totalStars, totalCommits, totalPRs, totalIssues, prsMerged, prsOpen } = data;
  const displayName = name || username;
  const c = getColors(theme);

  return `
    <svg width="495" height="210" viewBox="0 0 495 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .stat-item { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .stat-value { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        .stat-merged { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accentAlt}; }
        .stat-open { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accentOpen}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
        .icon { fill: ${c.accent}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="209" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">${displayName}'s GitHub Stats</text>
      
      <g transform="translate(25, 70)">
        <!-- Column 1 -->
        <g>
          <g transform="translate(0, 0)">
            <path class="icon" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" transform="translate(0, -11)"/>
            <text x="22" y="0" class="stat-item">Total Stars:</text>
            <text x="180" y="0" class="stat-value">${totalStars}</text>
          </g>
          
          <g transform="translate(0, 35)">
            <path class="icon" d="M1 12.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75Zm0-4.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75Zm0-4.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM5.25 2h13.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 18.75 22H5.25A1.75 1.75 0 0 1 3.5 20.25V3.75C3.5 2.784 4.284 2 5.25 2Z" transform="scale(0.7) translate(0, -18)"/>
            <text x="22" y="0" class="stat-item">Total Commits:</text>
            <text x="180" y="0" class="stat-value">${totalCommits}</text>
          </g>
          
          <g transform="translate(0, 70)">
            <path class="icon" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" transform="scale(0.9) translate(0, -12)"/>
            <text x="22" y="0" class="stat-item">Total Issues:</text>
            <text x="180" y="0" class="stat-value">${totalIssues}</text>
          </g>
        </g>
        
        <!-- Column 2 -->
        <g transform="translate(260, 0)">
          <g transform="translate(0, 0)">
            <path class="icon" d="M7.177 3.073L4.417 5.833a.25.25 0 00.177.427h1.656v3.25a.25.25 0 00.25.25h1.5a.25.25 0 00.25-.25v-3.25h1.656a.25.25 0 00.177-.427L7.53 3.073a.25.25 0 00-.354 0z" transform="scale(1.2) translate(0, -10)"/>
            <text x="22" y="0" class="stat-item">PRs Raised:</text>
            <text x="130" y="0" class="stat-value">${totalPRs}</text>
          </g>
          
          <g transform="translate(0, 35)">
            <path class="icon" style="fill: ${c.accentAlt}" d="M7 2.3c3.12 0 5.7 2.58 5.7 5.7s-2.58 5.7-5.7 5.7S1.3 11.12 1.3 8s2.58-5.7 5.7-5.7z" transform="translate(0, -11)"/>
            <text x="22" y="0" class="stat-item">PRs Merged:</text>
            <text x="130" y="0" class="stat-merged">${prsMerged}</text>
          </g>
          
          <g transform="translate(0, 70)">
            <path class="icon" style="fill: ${c.accentOpen}" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3 9H5V7h6v2z" transform="scale(0.9) translate(0, -12)"/>
            <text x="22" y="0" class="stat-item">PRs Open:</text>
            <text x="130" y="0" class="stat-open">${prsOpen}</text>
          </g>
        </g>
      </g>
      
      <text x="25" y="190" class="brand">Generated by GitFace</text>
    </svg>
  `.trim();
}



export function generateLangsSVG(username: string, langs: { name: string; count: number }[], theme?: SvgTheme): string {
  const displayLangs = langs.slice(0, 8);
  const total = langs.reduce((acc, l) => acc + l.count, 0);
  const c = getColors(theme);

  const itemHeight = 35;
  const headerHeight = 60;
  const footerHeight = 40;
  const svgHeight = headerHeight + (displayLangs.length * itemHeight) + footerHeight;

  return `
    <svg width="495" height="${svgHeight}" viewBox="0 0 495 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .lang-name { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .lang-p { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="${svgHeight - 1}" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Most Used Languages</text>
      
      <g transform="translate(25, 60)">
        ${displayLangs.map((lang, i) => {
    const percentage = ((lang.count / total) * 100).toFixed(2);
    const barWidth = 445;
    const progressWidth = (lang.count / total) * 445;
    return `
            <g transform="translate(0, ${i * itemHeight})">
              <text x="0" y="0" class="lang-name">${lang.name}</text>
              <text x="445" y="0" text-anchor="end" class="lang-p">${percentage}%</text>
              <rect x="0" y="8" width="${barWidth}" height="8" rx="4" fill="${c.barBg}"/>
              <rect x="0" y="8" width="${progressWidth}" height="8" rx="4" fill="${c.accent}"/>
            </g>
          `;
  }).join('')}
      </g>
      
      <text x="25" y="${svgHeight - 15}" class="brand">Generated by GitFace</text>
    </svg>
  `.trim();
}

export function generateStreakSVG(data: {
  total: number;
  current: number;
  longest: number;
  totalRange: string;
  currentRange: string;
  longestRange: string;
}, theme?: SvgTheme): string {
  const { total, current, longest, totalRange, currentRange, longestRange } = data;
  const c = getColors(theme);

  return `
    <svg width="495" height="210" viewBox="0 0 495 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .stat-label { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .stat-value { font: 700 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        .stat-range { font: 400 9px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textSubtle}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="209" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">GitHub Streak Stats</text>
      
      <g transform="translate(25, 80)">
        <g transform="translate(0, 0)">
          <text x="0" y="0" class="stat-value">${total}</text>
          <text x="0" y="20" class="stat-label">Total Contributions</text>
          <text x="0" y="38" class="stat-range">${totalRange}</text>
        </g>
        
        <g transform="translate(160, 0)">
          <text x="0" y="0" class="stat-value">${current}</text>
          <text x="0" y="20" class="stat-label">Current Streak</text>
          <text x="0" y="38" class="stat-range">${currentRange}</text>
        </g>
        
        <g transform="translate(320, 0)">
          <text x="0" y="0" class="stat-value">${longest}</text>
          <text x="0" y="20" class="stat-label">Longest Streak</text>
          <text x="0" y="38" class="stat-range">${longestRange}</text>
        </g>
      </g>
      
      <text x="25" y="190" class="brand">Generated by GitFace</text>
    </svg>
  `.trim();
}

export function generateTrophiesSVG(data: { stars: number; repos: number; followers: number }, theme?: SvgTheme): string {
  const c = getColors(theme);
  const achievements = [
    { label: "Star Collector", val: data.stars, rank: data.stars > 100 ? "Gold" : data.stars > 10 ? "Silver" : "Bronze" },
    { label: "Repo Master", val: data.repos, rank: data.repos > 50 ? "Gold" : data.repos > 10 ? "Silver" : "Bronze" },
    { label: "Follower Magnet", val: data.followers, rank: data.followers > 100 ? "Gold" : data.followers > 10 ? "Silver" : "Bronze" },
  ];

  const rankColors = {
    Gold: c.accent,
    Silver: c.text,
    Bronze: c.textMuted
  };

  return `
    <svg width="495" height="140" viewBox="0 0 495 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .trophy-text { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .rank-text { font: 700 10px 'Segoe UI', Ubuntu, Sans-Serif; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="139" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="20" y="30" class="header">Achievements</text>
      
      <g transform="translate(20, 50)">
        ${achievements.map((a, i) => {
    const color = rankColors[a.rank as keyof typeof rankColors];
    return `
            <g transform="translate(${i * 155}, 0)">
              <rect width="145" height="50" rx="8" fill="${c.cardBg}" stroke="${color}" stroke-opacity="0.3"/>
              <text x="10" y="20" class="trophy-text">${a.label}</text>
              <text x="10" y="38" class="rank-text" fill="${color}">${a.rank} (${a.val})</text>
            </g>
          `;
  }).join('')}
      </g>
      
      <text x="20" y="128" class="brand">Generated by GitFace</text>
    </svg>
  `.trim();
}

export function generateHighlightsSVG(repos: any[], theme?: SvgTheme): string {
  const displayRepos = repos.slice(0, 5);
  const c = getColors(theme);
  const itemHeight = 45;
  const headerHeight = 60;
  const footerHeight = 45;
  const svgHeight = headerHeight + (displayRepos.length * itemHeight) + footerHeight;

  return `
    <svg width="495" height="${svgHeight}" viewBox="0 0 495 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .repo-name { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .repo-meta { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="${svgHeight - 1}" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Top Repositories</text>
      
      <g transform="translate(25, 60)">
        ${displayRepos.map((repo, i) => `
          <g transform="translate(0, ${i * itemHeight})">
            <text x="0" y="0" class="repo-name">${repo.name}</text>
            <text x="0" y="18" class="repo-meta">⭐ ${repo.stargazerCount}  •  🍴 ${repo.forkCount}  •  ${repo.primaryLanguage?.name || 'N/A'}</text>
          </g>
        `).join('')}
      </g>
      
      <text x="25" y="${svgHeight - 15}" class="brand">Generated by GitFace</text>
    </svg>
  `.trim();
}

export function generatePulseSVG(activityDays: any[], theme?: SvgTheme): string {
  const c = getColors(theme);
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const distribution = [0, 0, 0, 0, 0, 0, 0];

  activityDays.forEach(day => {
    const d = new Date(day.date).getDay();
    distribution[d] += day.contributionCount;
  });

  const max = Math.max(...distribution, 1);
  const total = distribution.reduce((a, b) => a + b, 0);
  const peakIndex = distribution.indexOf(max);

  return `
    <svg width="495" height="210" viewBox="0 0 495 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .day-label { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .data-label { font: 600 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
        .peak-day { font: 700 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="209" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Weekly Productivity Pulse</text>
      
      <g transform="translate(60, 140)">
        ${distribution.map((count, i) => {
    const height = (count / max) * 60;
    return `
            <g transform="translate(${i * 55}, 0)">
              <text x="0" y="${-height - 8}" text-anchor="middle" class="data-label">${count}</text>
              <rect x="-10" y="${-height}" width="20" height="${height}" rx="4" fill="${c.accent}" fill-opacity="${i === peakIndex ? 1 : 0.4}"/>
              <text x="0" y="18" text-anchor="middle" class="day-label" fill="${i === peakIndex ? c.accent : c.textMuted}">${weekdayNames[i]}</text>
            </g>
          `;
  }).join('')}
      </g>
      
      <g transform="translate(25, 190)">
        <text class="brand">Total Contributions: ${total}</text>
        <text x="180" class="peak-day">Peak Activity: ${weekdayNames[peakIndex]}</text>
      </g>
    </svg>
  `.trim();
}

export function generateMonthlyPulseSVG(activityDays: any[], theme?: SvgTheme): string {
  const c = getColors(theme);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const distribution = new Array(12).fill(0);

  activityDays.forEach(day => {
    const m = new Date(day.date).getMonth();
    distribution[m] += day.contributionCount;
  });

  const max = Math.max(...distribution, 1);
  const total = distribution.reduce((a, b) => a + b, 0);
  const peakIndex = distribution.indexOf(max);

  return `
    <svg width="495" height="210" viewBox="0 0 495 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .day-label { font: 400 9px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .data-label { font: 600 8px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
        .peak-day { font: 700 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="209" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Monthly Productivity Pulse</text>
      
      <g transform="translate(45, 140)">
        ${distribution.map((count, i) => {
    const height = (count / max) * 60;
    return `
            <g transform="translate(${i * 37}, 0)">
              <text x="0" y="${-height - 6}" text-anchor="middle" class="data-label">${count}</text>
              <rect x="-8" y="${-height}" width="16" height="${height}" rx="3" fill="${c.accent}" fill-opacity="${i === peakIndex ? 1 : 0.4}"/>
              <text x="0" y="16" text-anchor="middle" class="day-label" fill="${i === peakIndex ? c.accent : c.textMuted}">${monthNames[i]}</text>
            </g>
          `;
  }).join('')}
      </g>
      
      <g transform="translate(25, 190)">
        <text class="brand">Total Contributions: ${total}</text>
        <text x="180" class="peak-day">Peak Month: ${monthNames[peakIndex]}</text>
      </g>
    </svg>
  `.trim();
}

export function generateYearlyPulseSVG(activityDays: any[], theme?: SvgTheme): string {
  const c = getColors(theme);
  const yearsMap: Record<number, number> = {};

  activityDays.forEach(day => {
    const y = new Date(day.date).getFullYear();
    yearsMap[y] = (yearsMap[y] || 0) + day.contributionCount;
  });

  const sortedYears = Object.keys(yearsMap).map(Number).sort((a, b) => a - b);
  const distribution = sortedYears.map(y => yearsMap[y]);

  const max = Math.max(...distribution, 1);
  const total = distribution.reduce((a, b) => a + b, 0);
  const peakYear = sortedYears[distribution.indexOf(max)];

  return `
    <svg width="495" height="210" viewBox="0 0 495 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .day-label { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .data-label { font: 600 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
        .peak-day { font: 700 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="209" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Yearly Productivity Pulse</text>
      
      <g transform="translate(60, 140)">
        ${distribution.map((count, i) => {
    const height = (count / max) * 60;
    const year = sortedYears[i];
    const spacing = Math.max(40, Math.min(80, 400 / (distribution.length || 1)));
    return `
            <g transform="translate(${i * spacing}, 0)">
              <text x="0" y="${-height - 8}" text-anchor="middle" class="data-label">${count}</text>
              <rect x="-15" y="${-height}" width="30" height="${height}" rx="4" fill="${c.accent}" fill-opacity="${year === peakYear ? 1 : 0.4}"/>
              <text x="0" y="18" text-anchor="middle" class="day-label" fill="${year === peakYear ? c.accent : c.textMuted}">${year}</text>
            </g>
          `;
  }).join('')}
      </g>
      
      <g transform="translate(25, 190)">
        <text class="brand">Total Contributions: ${total}</text>
        <text x="180" class="peak-day">Peak Year: ${peakYear}</text>
      </g>
    </svg>
  `.trim();
}

export function generateOSSSVG(count: number, theme?: SvgTheme): string {
  const c = getColors(theme);
  return `
    <svg width="495" height="210" viewBox="0 0 495 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .count { font: 800 48px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        .label { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="209" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Open Source Impact</text>
      
      <g transform="translate(25, 105)">
        <text x="0" y="0" class="count">${count}</text>
        <text x="0" y="30" class="label">Total contributions to external ecosystems</text>
      </g>
      
      <text x="25" y="190" class="brand">Generated by GitFace</text>
    </svg>
  `.trim();
}

export function generateActivitySVG(activity: { action: string, repo: string, date: string }, theme?: SvgTheme): string {
  const c = getColors(theme);
  return `
    <svg width="495" height="100" viewBox="0 0 495 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .action { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .repo { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .live { font: 700 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        .pulse-circle { animation: pulse 2s infinite; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="99" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      
      <g transform="translate(25, 30)">
        <circle cx="0" cy="-5" r="4" fill="${c.accent}" class="pulse-circle"/>
        <text x="12" y="-2" class="live">LATEST ACTIVITY</text>
        
        <text x="0" y="25" class="action">${activity.action}</text>
        <text x="0" y="45" class="repo">in ${activity.repo}</text>
      </g>
      
      <text x="380" y="85" font-family="Segoe UI" font-size="9" fill="${c.brand}">${new Date(activity.date).toLocaleDateString()}</text>
    </svg>
  `.trim();
}

export function generatePersonaSVG(data: { username: string, peakHour: number, reviewsCount: number, topTopic: string }, theme?: SvgTheme): string {
  const { username, peakHour, reviewsCount, topTopic } = data;
  const c = getColors(theme);

  const isNightOwl = peakHour >= 20 || peakHour <= 4;
  const isEarlyBird = peakHour >= 5 && peakHour <= 9;
  const isReviewer = reviewsCount > 20;

  const personaTitle = isNightOwl ? "Night Owl Architect" : isEarlyBird ? "Early Bird Pioneer" : "Dynamic Developer";

  return `
    <svg width="495" height="200" viewBox="0 0 495 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .persona-title { font: 700 22px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        .trait-label { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .trait-value { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
        .badge { fill: ${c.badgeBg}; stroke: ${c.badgeBorder}; stroke-width: 1; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="199" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      
      <g transform="translate(25, 35)">
        <text x="0" y="0" class="header">${username}'s Developer Persona</text>
        <text x="0" y="35" class="persona-title">${personaTitle}</text>
      </g>
      
      <g transform="translate(25, 100)">
        <!-- Trait 1: Activity -->
        <g transform="translate(0, 0)">
          <rect width="140" height="45" rx="8" class="badge"/>
          <path d="M15 15 L25 15 L20 25 Z" fill="${c.accent}" opacity="0.8" transform="translate(5, 5)"/>
          <text x="35" y="18" class="trait-label">Activity Peak</text>
          <text x="35" y="35" class="trait-value">${isNightOwl ? "Night Owl" : isEarlyBird ? "Early Bird" : "Daylight"}</text>
        </g>
        
        <!-- Trait 2: Role -->
        <g transform="translate(150, 0)">
          <rect width="140" height="45" rx="8" class="badge"/>
          <text x="10" y="18" class="trait-label">Community Role</text>
          <text x="10" y="35" class="trait-value">${isReviewer ? "Code Reviewer" : "Core Builder"}</text>
        </g>
        
        <!-- Trait 3: Ecosystem -->
        <g transform="translate(300, 0)">
          <rect width="140" height="45" rx="8" class="badge"/>
          <text x="10" y="18" class="trait-label">Primary Stack</text>
          <text x="10" y="35" class="trait-value">#${topTopic}</text>
        </g>
      </g>
      
      <text x="25" y="185" class="brand">Determined by recent GitHub activity pulse</text>
    </svg>
  `.trim();
}

const SOCIAL_ICONS: Record<string, { path: string; color: string; viewBox?: string }> = {
  twitter: { path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z", color: "#000000" },
  linkedin: { path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", color: "#0077B5" },
  youtube: { path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z", color: "#FF0000" },
  instagram: { path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z", color: "#E4405F" },
  discord: { path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.461-.63.861-1.297 1.198-1.99a.076.076 0 0 0-.041-.105 13.11 13.11 0 0 1-1.872-.89.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.89.076.076 0 0 0-.041.106c.34.693.74 1.362 1.2 1.99a.078.078 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z", color: "#5865F2" },
  facebook: { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", color: "#1877F2" },
  stackoverflow: { path: "M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.78v-2.131H6.111v2.131zm.562-4.81l10.462 2.306.446-2.1-10.462-2.306-.446 2.1zm1.715-4.419l9.523 5.044 1.011-1.914-9.522-5.044-1.012 1.914zm3.101-3.705l7.769 7.614 1.503-1.507-7.771-7.614-1.501 1.507zM17.652 0l-1.047 1.315 5.518 10.398 1.15-.992L17.652 0z", color: "#F48024" },
  medium: { path: "M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z", color: "#000000" },
  leetcode: { path: "M16.102 17.93l-2.697 2.607c-.466.462-1.211.462-1.677 0L6.445 15.39a.82.82 0 010-1.153.828.828 0 011.159 0l4.635 4.544 2.167-2.096c.466-.462 1.211-.462 1.677 0 .466.462.466 1.211 0 1.677a1.189 1.189 0 01-.019.019l-.014.013a1.189 1.189 0 01-.019.019l-.014.013zM22.071 9.043l-9.37-9.37a2.124 2.124 0 00-3.003 0l-9.37 9.37a2.125 2.125 0 000 3.003l9.37 9.37a2.126 2.126 0 003.003 0l9.37-9.37a2.126 2.126 0 000-3.003zM12.924 13.435H9.418a1.197 1.197 0 110-2.394h3.506a1.197 1.197 0 110 2.394z", color: "#FFA116" },
  codepen: { path: "m24 8.247-12-8-12 8 0 7.506 12 8 12-8 0-7.506zm-10.714 13.158-9.428-6.285 3.845-2.563 5.583 3.722v5.126zm0-7.286-5.464-3.643 5.464-3.643 5.464 3.643-5.464 3.643zm1.429 7.286v-5.126l5.583-3.722 3.845 2.563-9.428 6.285zm9.428-9.083-3.111-2.074 3.111-2.074v4.148zm-10.857-8.075 9.428 6.285-3.845 2.563-5.583-3.722v-5.126zm-1.429 0v5.126l-5.583 3.722-3.845-2.563 9.428-6.285zm-9.428 9.083 3.111 2.074-3.111 2.074v-4.148z", color: "#000000" },
  twitch: { path: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z", color: "#9146FF" },
  devto: { path: "M7.42 10.05c-.18-.16-.3-.47-.3-.8l-.02-3.23c0-.33.12-.64.3-.81.17-.16.4-.26.66-.26h.96c.26 0 .48.1.66.26.18.17.3.48.3.81v3.23c0 .33-.12.64-.3.81-.17.16-.4.26-.66.26h-.96c-.26.01-.4-.09-.66-.27zm.33-3.95v3.13h.85v-3.13h-.85zM0 0v24h24V0H0zm18.33 13.43c-.43.43-1.02.69-1.68.69H15c-.66 0-1.25-.26-1.68-.69-.43-.43-.69-1.02-.69-1.68V7.5c0-.66.26-1.25.69-1.68.43-.43 1.02-.69 1.68-.69h1.65c.66 0 1.25.26 1.68.69.43.43.69 1.02.69 1.68v.1h-1.92v-.1c0-.25-.1-.47-.27-.64-.17-.17-.4-.27-.64-.27H15c-.25 0-.47.1-.64.27-.17.17-.27.4-.27.64v4.25c0 .25.1.47.27.64.17.17.4.27.64.27h1.65c.25 0 .47-.1.64-.27.17-.17.27-.4.27-.64v-.4h-1.65v-1.91h3.6v2.31c0 .67-.26 1.26-.69 1.69zm-5.4 0c-.43.43-1.02.69-1.68.69H7.13c-.66 0-1.25-.26-1.68-.69-.43-.43-.69-1.02-.69-1.68V7.5c0-.66.26-1.25.69-1.68.43-.43 1.02-.69 1.68-.69h4.12c.66 0 1.25.26 1.68.69.43.43.69 1.02.69 1.68V7.5h-1.92V7.5c0-.25-.1-.47-.27-.64-.17-.17-.4-.27-.64-.27H7.13c-.25 0-.47.1-.64.27-.17.17-.27.4-.27.64v4.25c0 .25.1.47.27.64.17.17.4.27.64.27h4.12c.25 0 .47-.1.64-.27.17-.17.27-.4.27-.64v-.1h1.92v.1c0 .67-.26 1.26-.69 1.69zm-8.85 0h-1.92V5.13h1.92v8.3z", color: "#000000" },
  hashnode: { path: "M22.351 8.019l-6.37-6.37a3.957 3.957 0 0 0-5.591 0l-8.37 8.37a3.957 3.957 0 0 0 0 5.591l6.37 6.37a3.957 3.957 0 0 0 5.591 0l8.37-8.37a3.957 3.957 0 0 0 0-5.591zM12 15.692a3.692 3.692 0 1 1 3.692-3.692A3.692 3.692 0 0 1 12 15.692z", color: "#2962FF" },
  reddit: { path: "M24 11.5c0-1.65-1.35-3-3-3-.61 0-1.18.19-1.65.52C17.67 7.74 15.63 7 13.5 6.77l.68-3.2 2.18.46c.03.85.74 1.54 1.6 1.54 1.1 0 2-0.9 2-2s-0.9-2-2-2c-0.89 0-1.63.58-1.89 1.38l-2.43-.5c-0.12-0.03-0.25 0.04-0.29.17L12.59 6.77c-2.13.23-4.17 0.97-5.85 2.25-.47-.33-1.04-.52-1.65-.52-1.65 0-3 1.35-3 3 0 1.1.59 2.06 1.48 2.58-.04.22-.06.44-.06.67 0 3.31 3.58 6 8 6 4.41 0 8-2.69 8-6 0-0.22-0.02-0.45-0.06-0.67.89-0.52 1.48-1.48 1.48-2.58zM9 13.5c0-1.1.9-2 2-2s2 .9 2 2-0.9 2-2 2-2-0.9-2-2zm9.33 3.83c-1.16 1.16-3.35 1.25-4.33 1.25s-3.17-0.09-4.33-1.25c-0.11-0.11-0.11-0.28 0-0.39s0.28-0.11 0.39 0c0.88 0.88 2.62 1.14 3.94 1.14s3.06-0.26 3.94-1.14c0.11-0.11 0.28-0.11 0.39 0s0.11 0.28 0 0.39zm-1.33-1.83c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 .9 2 2-0.9 2-2 2z", color: "#FF4500" },
  pinterest: { path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.966 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.999 5.368 18.621 0 12.017 0z", color: "#BD081C" },
  threads: { path: "M14.28 11.832c3.552 0 4.704 2.808 4.704 2.808l3.6-1.584s-1.896-4.488-8.304-4.488C9.656 8.568 7.32 12.096 7.32 14.88c0 3.144 2.112 5.256 5.328 5.256 2.016 0 3.912-.768 5.232-2.112l3.48 2.616c-2.328 2.376-5.712 3.48-8.712 3.48-6.144 0-9.648-4.152-9.648-9.24 0-4.728 3.312-9.36 11.04-9.36 5.712 0 9.144 3.192 9.144 7.632 0 4.104-1.92 6.36-4.632 6.36-1.416 0-2.448-.96-2.448-2.448 0-1.68 1.008-3.072 1.008-3.072s.528-1.032.528-2.232c0-1.872-1.2-3.144-3.144-3.144-2.112 0-3.6 1.584-3.6 4.104 0 2.256 1.224 3.888 2.832 3.888 1.248 0 2.136-.672 2.136-.672v1.392c0 .48.24.768.648.768.312 0 .528-.192.528-.432V11.832z", color: "#000000" },
  bluesky: { path: "M12 10.8c-1.32.583-2.917 1.458-3.003 3.583-.006.136-.006.273 0 .409.086 2.125 1.683 3 3.003 3 .152 0 .304-.011.455-.033C13.627 17.737 15 16.5 15 14.5c0-1.833-1.25-3.083-3-3.7zM6.5 3c-2.485 0-4.5 2.015-4.5 4.5S4.015 12 6.5 12c.152 0 .304-.011.455-.033C5.782 11.989 3.016 11.238 3.016 7.5S4.782 3.011 6.5 3zm11 0c2.485 0 4.5 2.015 4.5 4.5S19.985 12 17.5 12c-.152 0-.304-.011-.455-.033C18.218 11.989 20.984 11.238 20.984 7.5S19.218 3.011 17.5 3zM12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z", color: "#0285FF" },
  mastodon: { path: "M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0c-4.22-.016-6.177.016-7.14.281-2.687.722-4.61 3.125-4.61 5.86 0 1.953-.016 4.047 0 6.094.03 4.11.2 8.187 2.063 11.125l.03.047c1.782 2.875 5.25 3.594 8.016 3.422.594-.03 1.156-.125 1.703-.25V23.44c-1.39.266-2.735.313-2.735-.39 0-.25 0-1.344.016-1.594 0-.156.406-.188.75-.203.266 0 .547-.016.828-.016h.047c1.234 0 2.453-.016 3.656-.03.547-.016 1.094-.03 1.625-.047 2.766-.078 5.33-.422 6.015-1.906.015-.047.047-.11.063-.172.937-2.92 1.047-6.906 1.063-10.969 0-1.953.015-4.047-.016-6.094", color: "#6364FF" },
  kaggle: { path: "M18.825 23.859c-.215 0-.414-.082-.578-.225l-7.734-7.069 2.115-2.148 6.136 6.136c.265.265.265.696 0 .961-.205.205-.436.345-.694.345h.755zM13.23 9.482l-2.115-2.148L18.82 0l1.24.45c.265.097.43.345.43.628 0 .283-.165.531-.43.628L13.23 9.482zM1.155 0c.638 0 1.155.517 1.155 1.155V22.845c0 .638-.517 1.155-1.155 1.155S0 23.483 0 22.845V1.155C0 .517.517 0 1.155 0z", color: "#20BEFF" },
  hackerrank: { path: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.275 16.4l-1.325.75-.025-5.225-4.925 2.825v4.5l-1.325-.75v-1.75l-4.225-2.425v-4.65l1.325.75v3.15l2.9-1.65v-4.525l1.325.75v1.75l4.225 2.4l.025 4.675-.025-.525z", color: "#2EC866" },
  codewars: { path: "M15.436.953l-2.029.98c.3.565.418 1.488.083 2.508l-3.484 2.887a1.696 1.696 0 0 1 1.096.38l3.18-1.572c.621-.307 1.258-.337 1.66-.089.431.264.551.784.34 1.439l-1.353 3.864 2.613-2.14 2-.857c.731-.313 1.359-.283 1.706.07.369.375.385.992.046 1.716l-3.321 6.815a1.144 1.144 0 0 1-1.026.63h-3.66a1.111 1.111 0 0 1-1.037-.69l-1.077-2.61a1.272 1.272 0 0 0-.258-.403 1.25 1.25 0 0 0-.395-.274l-2.636-1.125a1.137 1.137 0 0 1-.723-1.04v-3.8l.583-.027-.583-.556v-.219l1.644-1.282-1.644-.069v.656h-1.609l.487-1.42.062-.224c-.161-.264-.492-.416-.893-.416-.549 0-1.218.283-1.848.914l-1 1.83-2.015.823v1.8l-1.661.7-.852 2 1.661-.7v2.22l-.852 2.01-.81 1.83v2.84a1.865 1.865 0 0 0 .546 1.341 1.776 1.776 0 0 0 1.27.531h4.22l.852-2.01-1.661.7-.852-2 1.661.7-.852-2 1.661.7v-2.22c.11.085 2.126.9 2.126.9L4 12V8.408l.3-.8c.11-.293.4-.607.7-.8l.2-.1c-.11.4-.11.83-.08 1.26.07.71.42 1.37.89 1.88l1.32 1.43.3-.4c-.1-.13-.17-.28-.2-.44a11.168 11.168 0 0 1 .42-6.52c.21-.51.62-.97 1.14-1.3l.06-.03.54.49zm2.463 3.657l.03.01h.03c.53.284.77.8.61 1.353l-1.34 3.827 2.6-2.122 1.98-.846c.38-.163.69-.147.88.046s.21.52.02 1l-3.32 6.8a.15.15 0 0 1-.13.09h-3.66a.12.12 0 0 1-.11-.08l-1.07-2.6a1.9 1.9 0 0 0-1.12-1.13L10 9.87s0 .01-.01.02l-.28-.35.91-.46s.01.01.02.01c.21.11.45.19.7.23a1.4 1.4 0 0 0 .61-.13l3.66-2.01a1.41 1.41 0 0 0 .76-1.16z", color: "#AD2C2D" },
  codeforces: { path: "M4.5 7.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 0 15V9a1.5 1.5 0 0 1 1.5-1.5h3zm9-4.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V4.5a1.5 1.5 0 0 1 1.5-1.5h3zm9 7.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h3z", color: "#1F8ACB" },
  geeksforgeeks: { path: "M12.116 12.404L4.461 4.75a7.357 7.357 0 000 10.412 7.357 7.357 0 0010.412 0l-2.757-2.758zm-2.758-2.758l7.655 7.655a7.357 7.357 0 000-10.412 7.357 7.357 0 00-10.412 0l2.757 2.757z", color: "#2F8D46" },
  topcoder: { path: "M14.766 2.112c-4.48 0-8.98 0-13.46 0-.08 0-.15.02-.21.08C.1 3.202.1 4.212.1 5.222c0 .35 0 .7 0 1.05.02.32 0 .64 0 .96.02.2.14.33.3.43 3.65 2.21 7.3 4.41 10.95 6.62 1.34.81 2.68 1.62 4.02 2.43 1.25.76 2.5 1.36 3.84 1.93 1.15.48 2.34.87 3.52 1.21.3.09.6.14.88.22.1.03.2.04.3.04.28-.01.53-.16.63-.42.1-.26.04-.55-.16-.74-.08-.08-.18-.12-.29-.15-1.66-.46-3.32-.93-4.98-1.39l-4.71-1.31c-1.12-.31-2.24-.62-3.36-.93-3.33-.92-6.66-1.84-9.99-2.77-.33-.09-.54-.3-.54-.6V7.242c0-.3.21-.51.54-.6 4.39-1.22 8.78-2.44 13.17-3.66.27-.08.5-.13.78-.2.08-.02.16-.04.25-.04 2.18-.11 4.36-.22 6.54-.33 1.13-.05 2.26.11 3.39.17l-.87-1.1s-.41-.51-.81-1.02c-.15-.2-.31-.4-.46-.6C27.9.602 27.21.332 26.54.122 25.1.752 23.65 1.382 22.21 2.012l-1.34-1.28c-.1-.1-.13-.23-.1-.36.03-.13.13-.23.26-.26.04-.01.08-.01.12-.01 1.44 0 2.88 0 4.32 0 .43.25.86.5 1.29.75.14.08.28.16.42.24.47.27.94.54 1.41.81.4 3.02.8 6.04 1.2 9.06.01.07-.01.14-.04.2-.07.1-.18.16-.31.15-.07-.01-.14-.04-.2-.08l-2.09-1.24c-.11-.07-.18-.19-.18-.32 0-.07.02-.14.06-.2 1.15-1.78 2.3-3.56 3.45-5.34.05-.08.08-.17.08-.26V1.752c-.01-.33-.2-.61-.49-.75l-4.88 2.26c-.1.05-.22.05-.32 0l-2.07-.96c-.33-.16-.6-.44-.75-.78L26.31.542h-1.04l-.84.81c-.2.2-.4.4-.6.6-.74 1-1.48 2-2.22 3-1.61 2.17-3.22 4.34-4.83 6.51-.12.16-.18.35-.18.55v1.65c.01.37.23.69.56.84 3.05 1.39 6.1 2.78 9.15 4.17.65.3 1.3 1 1.7 1.63.15.24.28.5.42.75.18.3.36.6.54.91.43 2.13.86 4.26 1.29 6.39-.01.08.01.16.03.23.05.15.2.25.36.24.09 0 .18-.04.24-.1l2.05-2.04c.05-.05.08-.11.1-.18.02-.07.02-.15 0-.22l-.12-.25c.04-.08 1.15-.17 1.73-.25.54-.08.81-.35.94-.81l.45-3s-.65.25-1 .5c-2.3 2.05-4.6 4.1-6.9 6.15-.1.09-.23.13-.36.13-.08 0-.16-.02-.23-.06-.11-.06-.18-.18-.18-.31v-2l10.45-12.87c.2-.24.3-.55.3-.86V2.202c-.01-.32-.15-.61-.39-.81-.23-.2-.55-.26-.83-.15 0 0-.25.13-.5.2-.23.2-.44.4-.6.65l-1.35 1.54c-.11.12-.26.17-.42.12-.13-.04-.23-.14-.27-.27-.03-.13-.01-.26.06-.37l.45-.63s.63-.82 1.25-1.64c.2-.26.17-.63-.07-.84-.24-.21-.61-.18-.84.05L21.36 4.162c-.1.1-.23.13-.36.1-.13-.03-.23-.13-.26-.26 0-.04-.01-.08-.01-.12 0-1.28 0-2.56 0-3.84C20.73 0 17.74 0 14.76 0z", color: "#2982BC" },
  codechef: { path: "M14.28 11.832c3.552 0 4.704 2.808 4.704 2.808s-1.152-2.808-4.704-2.808zM12 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H12zm2.28 1.714c.648 0 1.164.516 1.164 1.164s-.516 1.164-1.164 1.164-1.164-.516-1.164-1.164.516-1.164 1.164-1.164zM12 1.714c.648 0 1.164.516 1.164 1.164s-.516 1.164-1.164 1.164-1.164-.516-1.164-1.164.516-1.164 1.164-1.164zm-2.28 0c.648 0 1.164.516 1.164 1.164s-.516 1.164-1.164 1.164-1.164-.516-1.164-1.164.516-1.164 1.164-1.164zM12 21.428c-5.204 0-9.428-4.224-9.428-9.428s4.224-9.428 9.428-9.428 9.428 4.224 9.428 9.428-4.224 9.428-9.428 9.428zm-3.036-7.232c0 2.214 1.794 4.008 4.008 4.008 1.107 0 2.11-.453 2.835-1.179l-2.613-2.613c-.1-.1-.235-.157-.376-.157a.536.536 0 0 0-.536.536c0 .141.057.276.157.376l1.326 1.326c-.234.156-.51.247-.803.247-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5c.293 0 .569.091.803.247l-1.326 1.326c-.1.1-.157.235-.157.376a.536.536 0 0 0 .536.536c.141 0 .276-.057.376-.157l2.138-2.138c.1-.1.157-.235.157-.376a.536.536 0 0 0-.536-.536c-.141 0-.276.057-.376.157l-.375.375c.168-.225.267-.502.267-.802 0-.745-.605-1.35-1.35-1.35s-1.35.605-1.35 1.35c0 .3.099.577.267.802l-.375-.375c-.1-.1-.235-.157-.376-.157a.536.536 0 0 0-.536.536c0 .141.057.276.157.376l.3.3z", color: "#5B4638" },
  codestudio: { path: "M21.1 1.1c-1.3-1.3-3.4-1.3-4.7 0L1.1 16.4c-1.3 1.3-1.3 3.4 0 4.7l2.8 2.8c1.3 1.3 3.4 1.3 4.7 0l15.3-15.3c1.3-1.3 1.3-3.4 0-4.7L21.1 1.1zM11.6 15.6c-.6.6-1.6.6-2.2 0s-.6-1.6 0-2.2l3-3c.6-.6 1.6-.6 2.2 0s.6 1.6 0 2.2l-3 3z", color: "#F89A1C" },
  interviewbit: { path: "M12 0L1.7 4.2v4.8c0 1.2 1.3 2.1 2.3 2.5 1 .4 1.3.9 1.3 1.4v6.8l6.7 4.3 6.7-4.3V12.9c0-.5.3-1 1.3-1.4 1-.4 2.3-1.3 2.3-2.5V4.2L12 0zm0 15.4c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4z", color: "#0097D2" },
  atcoder: { path: "M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm-3.3 16.5l3.3-3.03 3.3 3.03 1.35-1.233-3.3-3.031 3.3-3.03L15.3 8.01 12 11.042 8.7 8.007l-1.35 1.233 3.3 3.03-3.3 3.03z", color: "#000000" },
  exercism: { path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z", color: "#0097A7" },
  tryhackme: { path: "M12 0L1.7 4h20.6L12 0zM1.7 6.4V24h20.6V6.4H1.7zm10.3 14.1c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4z", color: "#212C42" },
  substack: { path: "M22.539 8.242H1.46V5.414h21.08v2.828zM1.46 10.812V24L12 18.11L22.54 24V10.812H1.46zM22.54 0H1.46v2.828h21.08V0z", color: "#FF6719" },
  ghost: { path: "M24 6.136a.35.35 0 0 0-.35-.35H.35a.35.35 0 0 0-.35.35v2.308a.35.35 0 0 0 .35.35h23.3a.35.35 0 0 0 .35-.35V6.136zm0 7.21a.35.35 0 0 0-.35-.35H.35a.35.35 0 0 0-.35.35v2.308a.35.35 0 0 0 .35.35h23.3a.35.35 0 0 0 .35-.35V13.346zm0 7.21a.35.35 0 0 0-.35-.35H.35a.35.35 0 0 0-.35.35v2.308a.35.35 0 0 0 .35.35h23.3a.35.35 0 0 0 .35-.35V20.556z", color: "#15171A" },
  writeas: { path: "M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm.5 17.5v-2h-1v2h1zm0-3.5v-6h-1v6h1z", color: "#222222" },
  tiktok: { path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.92-.39-2.86-.12-1.51.44-2.65 1.74-2.89 3.25-.13.84-.02 1.71.32 2.48.42.92 1.2 1.64 2.15 2.03.79.31 1.65.41 2.49.27.99-.18 1.87-.72 2.47-1.53.51-.71.74-1.58.75-2.46.06-4.52.02-9.04.03-13.56z", color: "#000000" },
  telegram: { path: "M20.665.48a.95.95 0 0 0-.92.1c-1.1.72-17.7 11.52-18.4 12.02-.3.2-.5.5-.5.8 0 .4.2.7.5.9l4.5 1.7 1.7 5.4c.1.4.5.6.9.6.3 0 .6-.1.8-.4l2.4-2.4 4.5 3.4c.3.2.6.3 1 .3.3 0 .6-.2.8-.5l4-17c.1-.4 0-.8-.3-1.1-.3-.2-.7-.3-1-.2z", color: "#26A5E4" },
  whatsapp: { path: "M17.472 14.382c-.301-.15-1.78-.878-2.05-.975-.272-.098-.47-.146-.668.146-.197.294-.766.974-.938 1.17-.172.198-.344.223-.646.073-.302-.15-1.272-.469-2.42-1.494-.895-.798-1.498-1.784-1.674-2.083-.176-.299-.019-.461.13-.61.136-.134.301-.351.452-.527.151-.176.201-.3.302-.5.101-.199.05-.375-.025-.525-.075-.15-.668-1.61-.916-2.207-.242-.584-.487-.504-.668-.513-.173-.008-.371-.01-.57-.01s-.523.074-.797.373c-.273.3-.105.748.118.91l.138.1c.17.13.34.22.52.3 2.016 0 3.65 1.634 3.65 3.65 0 2.016-1.634 3.65-3.65 3.65", color: "#25D366" },
  signal: { path: "M12 0C5.373 0 0 5.373 0 12c0 2.215.599 4.29 1.645 6.074L.04 23.96l5.886-1.605A11.932 11.932 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 18.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z", color: "#3A76F0" },
  snapchat: { path: "M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm7.1 16.4l-1.3.7-.1-5.2-4.9 2.8v4.5L11.5 18.5v-1.8l-4.2-2.4v-4.7l1.3.8v3.1l2.9-1.6v-4.5l1.3.7v1.8l4.2 2.4v4.7z", color: "#FFFC00" },
};

export function generateSocialBadgeSVG(platform: string, value: string): string {
  const icon = SOCIAL_ICONS[platform.toLowerCase()] || { path: "", color: "#333333" };
  const label = platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase();

  // Estimate badge width
  const labelWidth = Math.max(label.length * 8, 40);
  const totalWidth = 32 + labelWidth + 12;

  return `
    <svg width="${totalWidth}" height="32" viewBox="0 0 ${totalWidth} 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${totalWidth}" height="32" rx="6" fill="${icon.color}"/>
      <g transform="translate(8, 8)">
        <path d="${icon.path}" fill="white" transform="scale(0.66)"/>
      </g>
      <text x="32" y="21" fill="white" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="14" font-weight="600">${label}</text>
    </svg>
  `.trim();
}

export function generateVisitorBadgeSVG(total: number, unique: number): string {
  const label = "Profile Visitors";
  const stats = `${total} Total • ${unique} Unique`;

  // Dynamic widths based on content
  const labelWidth = label.length * 8 + 20;
  const statsWidth = stats.length * 7 + 20;
  const totalWidth = labelWidth + statsWidth;

  return `
    <svg width="${totalWidth}" height="32" viewBox="0 0 ${totalWidth} 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="visitor_grad" x1="0" y1="0" x2="${totalWidth}" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="#24292f"/>
          <stop offset="1" stop-color="#1b1f23"/>
        </linearGradient>
      </defs>
      
      <rect width="${totalWidth}" height="32" rx="6" fill="url(#visitor_grad)"/>
      <rect width="${labelWidth}" height="32" rx="6" fill="#0969da"/>
      <path d="M${labelWidth - 6} 0h6v32h-6z" fill="#0969da"/> <!-- Square off the middle -->
      
      <g transform="translate(8, 7)">
        <g transform="scale(0.75)">
          <path d="M16 15H8C5.79086 15 4 16.7909 4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19C20 16.7909 18.2091 15 16 15Z" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>

      <text x="32" y="21" fill="white" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="12" font-weight="600">${label}</text>
      <text x="${labelWidth + 10}" y="21" fill="white" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="12" font-weight="400">${stats}</text>
    </svg>
  `.trim();
}
export const FACT_ICONS: Record<string, string[]> = {
  location: [
    "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",
    "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  ],
  mail: [
    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z",
    "m22 6-10 7L2 6",
  ],
  portfolio: [
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z",
    "M2 12h20",
    "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
  ],
  working: [
    "M4 5h16v10H4z",
    "M8 19h8",
    "M12 15v4",
    "M7 9l2 2-2 2",
    "M11 13h4",
  ],
  learning: [
    "M4 19.5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14.5a2.5 2.5 0 0 0 2.5 2.5h-15A2.5 2.5 0 0 1 4 19.5Z",
    "M6 7h10M6 11h10",
  ],
  collab: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    "M22 21v-2a4 4 0 0 0-3-3.87",
    "M16 3.13a4 4 0 0 1 0 7.75",
  ],
};

export function generateFactIconSVG(type: string): string {
  const paths = FACT_ICONS[type.toLowerCase()] || FACT_ICONS.location;

  return `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        path { stroke: #333; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        @media (prefers-color-scheme: dark) {
          path { stroke: #fff; }
        }
      </style>
      ${paths.map((d) => `<path d="${d}" />`).join("")}
    </svg>
  `.trim();
}

