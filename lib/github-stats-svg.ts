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



const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Go: "#00add8",
  Rust: "#dea584",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Vue: "#41b883",
  React: "#61dafb",
  Svelte: "#ff3e00",
};

function getLangColor(name: string): string {
  return LANG_COLORS[name] || "#8b949e";
}

export function generateLangsSVG(username: string, langs: { name: string; count: number }[], theme?: SvgTheme): string {
  const displayLangs = langs.slice(0, 8); // Top 8 for the 2-column grid
  const total = langs.reduce((acc, l) => acc + l.count, 0);
  const c = getColors(theme);
  const svgHeight = 210;

  let currentX = 0;
  const barWidth = 445;
  const barY = 55;
  const barHeight = 10;

  return `
    <svg width="495" height="${svgHeight}" viewBox="0 0 495 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .lang-name { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .lang-p { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="${svgHeight - 1}" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Most Used Languages</text>
      
      <!-- Segmented Progress Bar -->
      <g transform="translate(25, ${barY})">
        <rect width="${barWidth}" height="${barHeight}" rx="5" fill="${c.barBg}"/>
        ${displayLangs.map((lang) => {
          const width = (lang.count / total) * barWidth;
          const x = currentX;
          currentX += width;
          return `<rect x="${x}" y="0" width="${width}" height="${barHeight}" fill="${getLangColor(lang.name)}"/>`;
        }).join('')}
        <!-- Round the corners of the whole bar -->
        <rect width="${barWidth}" height="${barHeight}" rx="5" fill="none" stroke="${c.bg}" stroke-width="2"/>
      </g>

      <!-- 2-Column Legend -->
      <g transform="translate(25, 85)">
        ${displayLangs.map((lang, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = col * 220;
          const y = row * 24;
          const percentage = ((lang.count / total) * 100).toFixed(1);
          const color = getLangColor(lang.name);
          
          return `
            <g transform="translate(${x}, ${y})">
              <circle cx="5" cy="-4" r="5" fill="${color}"/>
              <text x="18" y="0" class="lang-name">${lang.name}</text>
              <text x="140" y="0" class="lang-p">${percentage}%</text>
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

  const svgHeight = 210; // FIXED HEIGHT

  return `
    <svg width="495" height="${svgHeight}" viewBox="0 0 495 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .trophy-text { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .rank-text { font: 700 10px 'Segoe UI', Ubuntu, Sans-Serif; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="${svgHeight - 1}" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Achievements</text>
      
      <g transform="translate(25, 80)">
        ${achievements.map((a, i) => {
    const color = rankColors[a.rank as keyof typeof rankColors];
    return `
            <g transform="translate(${i * 155}, 0)">
              <rect width="145" height="60" rx="8" fill="${c.cardBg}" stroke="${color}" stroke-opacity="0.3"/>
              <text x="10" y="25" class="trophy-text">${a.label}</text>
              <text x="10" y="45" class="rank-text" fill="${color}">${a.rank} (${a.val})</text>
            </g>
          `;
  }).join('')}
      </g>
      
      <text x="25" y="${svgHeight - 15}" class="brand">Generated by GitFace</text>
    </svg>
  `.trim();
}

export function generateHighlightsSVG(repos: any[], theme?: SvgTheme): string {
  const displayRepos = repos.slice(0, 3); // Fit 3 repos perfectly in 210px
  const c = getColors(theme);
  const svgHeight = 210;
  const itemHeight = 42;

  const starIcon = "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z";
  const forkIcon = "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z";
  const repoIcon = "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8V1.5ZM5 12.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z";

  return `
    <svg width="495" height="${svgHeight}" viewBox="0 0 495 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .repo-name { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        .repo-meta { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
        .icon { fill: ${c.textSubtle}; }
        .stat-icon { fill: ${c.textMuted}; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="${svgHeight - 1}" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      <text x="25" y="35" class="header">Top Repositories</text>
      
      <g transform="translate(25, 60)">
        ${displayRepos.map((repo, i) => {
          const langColor = repo.primaryLanguage?.color || "#8b949e";
          return `
          <g transform="translate(0, ${i * (itemHeight + 8)})">
            <path class="icon" d="${repoIcon}" transform="translate(0, -12) scale(1.1)"/>
            <text x="22" y="0" class="repo-name">${repo.name}</text>
            
            <g transform="translate(22, 18)">
              <!-- Stars -->
              <path class="stat-icon" d="${starIcon}" transform="translate(0, -9.5) scale(0.8)"/>
              <text x="18" y="0" class="repo-meta">${repo.stargazerCount}</text>
              
              <!-- Forks -->
              <path class="stat-icon" d="${forkIcon}" transform="translate(52, -9.5) scale(0.85)"/>
              <text x="70" y="0" class="repo-meta">${repo.forkCount}</text>
              
              <!-- Language -->
              <circle cx="118" cy="-4" r="4.5" fill="${langColor}"/>
              <text x="128" y="0" class="repo-meta">${repo.primaryLanguage?.name || 'N/A'}</text>
            </g>
          </g>
          `;
        }).join('')}
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
  const svgHeight = 210; // Standardized

  return `
    <svg width="495" height="${svgHeight}" viewBox="0 0 495 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.header}; }
        .persona-title { font: 700 22px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.accent}; }
        .trait-label { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.textMuted}; }
        .trait-value { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.text}; }
        .brand { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.brand}; }
        .badge { fill: ${c.badgeBg}; stroke: ${c.badgeBorder}; stroke-width: 1; }
      </style>
      
      <rect x="0.5" y="0.5" width="494" height="${svgHeight - 1}" rx="5" fill="${c.bg}" stroke="${c.border}"/>
      
      <g transform="translate(25, 35)">
        <text x="0" y="0" class="header">${username}'s Developer Persona</text>
        <text x="0" y="35" class="persona-title">${personaTitle}</text>
      </g>
      
      <g transform="translate(25, 105)">
        <!-- Trait 1: Activity -->
        <g transform="translate(0, 0)">
          <rect width="140" height="50" rx="8" class="badge"/>
          <text x="10" y="20" class="trait-label">Activity Peak</text>
          <text x="10" y="40" class="trait-value">${isNightOwl ? "Night Owl" : isEarlyBird ? "Early Bird" : "Daylight"}</text>
        </g>
        
        <!-- Trait 2: Role -->
        <g transform="translate(150, 0)">
          <rect width="140" height="50" rx="8" class="badge"/>
          <text x="10" y="20" class="trait-label">Community Role</text>
          <text x="10" y="40" class="trait-value">${isReviewer ? "Code Reviewer" : "Core Builder"}</text>
        </g>
        
        <!-- Trait 3: Ecosystem -->
        <g transform="translate(300, 0)">
          <rect width="140" height="50" rx="8" class="badge"/>
          <text x="10" y="20" class="trait-label">Primary Stack</text>
          <text x="10" y="40" class="trait-value">#${topTopic}</text>
        </g>
      </g>
      
      <text x="25" y="${svgHeight - 15}" class="brand">Determined by recent GitHub activity pulse</text>
    </svg>
  `.trim();
}

type IconPath = { d: string; color?: string; fillRule?: "evenodd" | "nonzero"; clipRule?: "evenodd" | "nonzero" };

const SOCIAL_ICONS: Record<string, {
  path?: string;
  paths?: IconPath[];
  color: string;
  viewBox?: string;
  transform?: string;
  fillRule?: "evenodd" | "nonzero";
  clipRule?: "evenodd" | "nonzero";
  extraDefs?: string;
  body?: string;
}> = {
  twitter: { path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z", color: "#000000" },
  linkedin: { path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", color: "#0077B5" },
  youtube: { path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z", color: "#FF0000" },
  instagram: { 
    extraDefs: `
      <radialGradient id="insta_f" cx="158.429" cy="578.088" r="52.3515" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -4.03418 4.28018 0 -2332.2273 942.2356)" fx="158.429" fy="578.088">
        <stop offset="0" stop-color="#fc0"/><stop offset=".1242" stop-color="#fc0"/><stop offset=".5672" stop-color="#fe4a05"/><stop offset=".6942" stop-color="#ff0f3f"/><stop offset="1" stop-color="#fe0657" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="insta_g" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.67441 -1.16203 1.51283 .87801 -814.3657 -47.8354)" cx="172.6149" cy="600.6924" fx="172.6149" fy="600.6924" r="65">
        <stop offset="0" stop-color="#fc0"/><stop offset="1" stop-color="#fc0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="insta_h" cx="144.012" cy="51.3367" fx="144.012" fy="51.3367" r="67.081" gradientTransform="matrix(-2.3989 .67549 -.23008 -.81732 464.9957 -26.4035)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#780cff"/><stop stop-color="#820bff" offset="1" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="insta_e" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-3.10797 .87652 -.6315 -2.23914 1345.6503 1374.1983)" cx="199.7884" cy="628.4379" fx="199.7884" fy="628.4379" r="52.3515">
        <stop offset="0" stop-color="#ff005f"/><stop offset="1" stop-color="#fc01d8"/>
      </radialGradient>
    `,
    paths: [
      { d: "M132.3348 0c-55.2305 0-71.3834.057-74.5232.3175-11.3342.9424-18.387 2.7275-26.0708 6.554-5.9214 2.9413-10.5915 6.3506-15.2005 11.1298-8.3938 8.7157-13.481 19.4383-15.3226 32.1842-.8953 6.1877-1.1558 7.4496-1.2087 39.0558-.0203 10.5354 0 24.4007 0 42.9984 0 55.2008.061 71.3418.3256 74.4764.9157 11.032 2.6453 17.9728 6.3081 25.565 7 14.5329 20.369 25.4428 36.119 29.5137 5.4535 1.4044 11.4767 2.1779 19.2092 2.5442 3.2762.1425 36.6684.2443 70.081.2443 33.4127 0 66.8253-.0407 70.02-.2035 8.9535-.4214 14.1526-1.1195 19.9011-2.6054 15.8517-4.0912 28.9767-14.8383 36.119-29.5748 3.5916-7.409 5.4128-14.6144 6.237-25.0704.179-2.2796.2543-38.6263.2543-74.924 0-36.304-.0814-72.5835-.2605-74.8632-.8343-10.6249-2.6555-17.7692-6.363-25.3207-3.0421-6.1816-6.42-10.798-11.324-15.518-8.752-8.3616-19.4555-13.4502-32.2101-15.2902-6.18-.8936-7.411-1.1582-39.033-1.2131z", color: "url(#insta_e)" },
      { d: "M132.3348 0c-55.2305 0-71.3834.057-74.5232.3175-11.3342.9424-18.387 2.7275-26.0708 6.554-5.9214 2.9413-10.5915 6.3506-15.2005 11.1298-8.3938 8.7157-13.481 19.4383-15.3226 32.1842-.8953 6.1877-1.1558 7.4496-1.2087 39.0558-.0203 10.5354 0 24.4007 0 42.9984 0 55.2008.061 71.3418.3256 74.4764.9157 11.032 2.6453 17.9728 6.3081 25.565 7 14.5329 20.369 25.4428 36.119 29.5137 5.4535 1.4044 11.4767 2.1779 19.2092 2.5442 3.2762.1425 36.6684.2443 70.081.2443 33.4127 0 66.8253-.0407 70.02-.2035 8.9535-.4214 14.1526-11.1195 19.9011-2.6054 15.8517-4.0912-28.9767-14.8383 36.119-29.5748 3.5916-7.409 5.4128-14.6144 6.237-25.0704.179-2.2796.2543-38.6263.2543-74.924 0-36.304-.0814-72.5835-.2605-74.8632-.8343-10.6249-2.6555-17.7692-6.363-25.3207-3.0421-6.1816-6.42-10.798-11.324-15.518-8.752-8.3616-19.4555-13.4502-32.2101-15.2902-6.18-.8936-7.411-1.1582-39.033-1.2131z", color: "url(#insta_f)" },
      { d: "M132.3348 0c-55.2305 0-71.3834.057-74.5232.3175-11.3342.9424-18.387 2.7275-26.0708 6.554-5.9214 2.9413-10.5915 6.3506-15.2005 11.1298-8.3938 8.7157-13.481 19.4383-15.3226 32.1842-.8953 6.1877-1.1558 7.4496-1.2087 39.0558-.0203 10.5354 0 24.4007 0 42.9984 0 55.2008.061 71.3418.3256 74.4764.9157 11.032 2.6453 17.9728 6.3081 25.565 7 14.5329 20.369 25.4428 36.119 29.5137 5.4535 1.4044 11.4767 2.1779 19.2092 2.5442 3.2762.1425 36.6684.2443 70.081.2443 33.4127 0 66.8253-.0407 70.02-.2035 8.9535-.4214 14.1526-11.1195 19.9011-2.6054 15.8517-4.0912-28.9767-14.8383 36.119-29.5748 3.5916-7.409 5.4128-14.6144 6.237-25.0704.179-2.2796.2543-38.6263.2543-74.924 0-36.304-.0814-72.5835-.2605-74.8632-.8343-10.6249-2.6555-17.7692-6.363-25.3207-3.0421-6.1816-6.42-10.798-11.324-15.518-8.752-8.3616-19.4555-13.4502-32.2101-15.2902-6.18-.8936-7.411-1.1582-39.033-1.2131z", color: "url(#insta_g)" },
      { d: "M132.3348 0c-55.2305 0-71.3834.057-74.5232.3175-11.3342.9424-18.387 2.7275-26.0708 6.554-5.9214 2.9413-10.5915 6.3506-15.2005 11.1298-8.3938 8.7157-13.481 19.4383-15.3226 32.1842-.8953 6.1877-1.1558 7.4496-1.2087 39.0558-.0203 10.5354 0 24.4007 0 42.9984 0 55.2008.061 71.3418.3256 74.4764.9157 11.032 2.6453 17.9728 6.3081 25.565 7 14.5329 20.369 25.4428 36.119 29.5137 5.4535 1.4044 11.4767 2.1779 19.2092 2.5442 3.2762.1425 36.6684.2443 70.081.2443 33.4127 0 66.8253-.0407 70.02-.2035 8.9535-.4214 14.1526-11.1195 19.9011-2.6054 15.8517-4.0912-28.9767-14.8383 36.119-29.5748 3.5916-7.409 5.4128-14.6144 6.237-25.0704.179-2.2796.2543-38.6263.2543-74.924 0-36.304-.0814-72.5835-.2605-74.8632-.8343-10.6249-2.6555-17.7692-6.363-25.3207-3.0421-6.1816-6.42-10.798-11.324-15.518-8.752-8.3616-19.4555-13.4502-32.2101-15.2902-6.18-.8936-7.411-1.1582-39.033-1.2131z", color: "url(#insta_h)" },
      { d: "M132.3452 33.973c-26.7167 0-30.0696.1167-40.5629.5939-10.4727.4792-17.6212 2.136-23.8762 4.567-6.4701 2.5107-11.9586 5.8693-17.4265 11.3352-5.472 5.464-8.8332 10.9483-11.354 17.4116-2.4389 6.2524-4.099 13.3976-4.5703 23.8585-.4693 10.4854-.5923 13.8379-.5923 40.5348 0 26.697.1189 30.0371.5943 40.5225.4817 10.465 2.1397 17.6082 4.5703 23.8585 2.5147 6.4654 5.8758 11.9497 11.3458 17.4136 5.466 5.468 10.9544 8.8349 17.4204 11.3456 6.259 2.4309 13.4097 4.0877 23.8803 4.567 10.4933.477 13.8441.5938 40.5588.5938 26.7188 0 30.0615-.1167 40.5547-.5939 10.4728-.4792 17.6295-2.136 23.8885-4.567 6.4681-2.5106 11.9484-5.8775 17.4143-11.3455 5.472-5.4639 8.8332-10.9482 11.354-17.4115 2.4183-6.2524 4.0784-13.3976 4.5703-23.8585.4713-10.4854.5943-13.8277.5943-40.5246 0-26.697-.123-30.0473-.5943-40.5328-.4919-10.465-2.152-17.6081-4.5703-23.8584-2.5208-6.4654-5.882-11.9498-11.354-17.4137-5.4721-5.468-10.9442-8.8266-17.4204-11.3353-6.2714-2.4309-13.424-4.0877-23.8967-4.5669-10.4933-.4772-13.8339-.5939-40.5588-.5939zm-8.825 17.7147c2.6193-.0041 5.5418 0 8.825 0 26.2659 0 29.379.0942 39.7513.5652 9.5915.4383 14.7971 2.0397 18.2648 3.3852 4.5908 1.7817 7.8638 3.9116 11.3048 7.3521 3.4431 3.4406 5.5745 6.7173 7.3617 11.3046 1.3465 3.461 2.9512 8.6628 3.3877 18.2472.4714 10.3625.5739 13.4754.5739 39.7095 0 26.234-.1025 29.347-.5739 39.7095-.4386 9.5843-2.0412 14.7861-3.3877 18.2471-1.783 4.5874-3.9186 7.8539-7.3617 11.2923-3.443 3.4406-6.712 5.5704-11.3048 7.3521-3.4636 1.3517-8.6733 2.949-18.2648 3.3873-10.3702.471-13.4854.5734-39.7513.5734-26.2679 0-29.381-.1024-39.7513-.5734-9.5914-.4423-14.797-2.0438-18.2668-3.3893-4.5908-1.7817-7.87-3.9116-11.313-7.3521-3.4431-3.4405-5.5745-6.709-7.3617-11.2985-1.3465-3.461-2.9512-8.6628-3.3877-18.2471-.4714-10.3626-.5657-13.4754-.5657-39.7259 0-26.2504.0943-29.347.5657-39.7095.4386-9.5844 2.0412-14.7861 3.3877-18.2512 1.783-4.5874 3.9186-7.8641 7.3617-11.3046 3.443-3.4406 6.7222-5.5704 11.313-7.3562 3.4677-1.3517 8.6754-2.949 18.2668-3.3894 9.075-.4096 12.5919-.5324 30.9264-.553zm61.3363 16.322c-6.5173 0-11.805 5.2776-11.805 11.792 0 6.5125 5.2877 11.7962 11.805 11.7962 6.5172 0 11.8049-5.2837 11.8049-11.7962 0-6.5124-5.2877-11.796-11.805-11.796zm-52.5113 13.7826c-27.8993 0-50.5191 22.6031-50.5191 50.4817 0 27.8786 22.6198 50.4714 50.5191 50.4714s50.511-22.5928 50.511-50.4714c0-27.8786-22.6137-50.4817-50.513-50.4817zm0 17.7147c18.109 0 32.7914 14.6694 32.7914 32.767 0 18.0956-14.6824 32.767-32.7914 32.767-18.111 0-32.7913-14.6714-32.7913-32.767 0-18.0976 14.6803-32.767 32.7913-32.767z", color: "#FFFFFF" }
    ],
    color: "#E4405F",
    viewBox: "0 0 264.5833 264.5833" 
  },
  discord: { path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.461-.63.861-1.297 1.198-1.99a.076.076 0 0 0-.041-.105 13.11 13.11 0 0 1-1.872-.89.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.89.076.076 0 0 0-.041.106c.34.693.74 1.362 1.2 1.99a.078.078 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z", color: "#5865F2" },
  facebook: { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", color: "#1877F2" },
  stackoverflow: {
    paths: [
      { d: "M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012z", color: "#BCBBBB" },
      { d: "M6.111 19.731H16.78v-2.131H6.111v2.131zm.562-4.81l10.462 2.306.446-2.1-10.462-2.306-.446 2.1zm1.715-4.419l9.523 5.044 1.011-1.914-9.522-5.044-1.012 1.914zm3.101-3.705l7.769 7.614 1.503-1.507-7.771-7.614-1.501 1.507zM17.652 0l-1.047 1.315 5.518 10.398 1.15-.992L17.652 0z", color: "#F48024" }
    ],
    color: "#F48024"
  },
  medium: { path: "M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z", color: "#000000" },
  reddit: {
    extraDefs: `
      <radialGradient id="reddit_p0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(57.1401 107.558) scale(59.9015 52.2545)"><stop stop-color="#FEFFFF"></stop><stop offset="0.4" stop-color="#FEFFFF"></stop><stop offset="0.51" stop-color="#F9FCFC"></stop><stop offset="0.62" stop-color="#EDF3F5"></stop><stop offset="0.7" stop-color="#DEE9EC"></stop><stop offset="0.72" stop-color="#D8E4E8"></stop><stop offset="0.76" stop-color="#CCD8DF"></stop><stop offset="0.8" stop-color="#C8D5DD"></stop><stop offset="0.83" stop-color="#CCD6DE"></stop><stop offset="0.85" stop-color="#D8DBE2"></stop><stop offset="0.88" stop-color="#EDE3E9"></stop><stop offset="0.9" stop-color="#FFEBEF"></stop></radialGradient>
      <radialGradient id="reddit_p1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(225.01 107.558) rotate(-180) scale(59.9015 52.2545)"><stop stop-color="#FEFFFF"></stop><stop offset="0.4" stop-color="#FEFFFF"></stop><stop offset="0.51" stop-color="#F9FCFC"></stop><stop offset="0.62" stop-color="#EDF3F5"></stop><stop offset="0.7" stop-color="#DEE9EC"></stop><stop offset="0.72" stop-color="#D8E4E8"></stop><stop offset="0.76" stop-color="#CCD8DF"></stop><stop offset="0.8" stop-color="#C8D5DD"></stop><stop offset="0.83" stop-color="#CCD6DE"></stop><stop offset="0.85" stop-color="#D8DBE2"></stop><stop offset="0.88" stop-color="#EDE3E9"></stop><stop offset="0.9" stop-color="#FFEBEF"></stop></radialGradient>
      <radialGradient id="reddit_p2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(130.347 99.1759) scale(180.687 126.865)"><stop stop-color="#FEFFFF"></stop><stop offset="0.4" stop-color="#FEFFFF"></stop><stop offset="0.51" stop-color="#F9FCFC"></stop><stop offset="0.62" stop-color="#EDF3F5"></stop><stop offset="0.7" stop-color="#DEE9EC"></stop><stop offset="0.72" stop-color="#D8E4E8"></stop><stop offset="0.76" stop-color="#CCD8DF"></stop><stop offset="0.8" stop-color="#C8D5DD"></stop><stop offset="0.83" stop-color="#CCD6DE"></stop><stop offset="0.85" stop-color="#D8DBE2"></stop><stop offset="0.88" stop-color="#EDE3E9"></stop><stop offset="0.9" stop-color="#FFEBEF"></stop></radialGradient>
      <radialGradient id="reddit_p3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(90.1905 150.971) scale(15.0964 22.1628)"><stop stop-color="#FF6600"></stop><stop offset="0.5" stop-color="#FF4500"></stop><stop offset="0.7" stop-color="#FC4301"></stop><stop offset="0.82" stop-color="#F43F07"></stop><stop offset="0.92" stop-color="#E53812"></stop><stop offset="1" stop-color="#D4301F"></stop></radialGradient>
      <radialGradient id="reddit_p4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(168.756 150.971) rotate(180) scale(15.0964 22.1628)"><stop stop-color="#FF6600"></stop><stop offset="0.5" stop-color="#FF4500"></stop><stop offset="0.7" stop-color="#FC4301"></stop><stop offset="0.82" stop-color="#F43F07"></stop><stop offset="0.92" stop-color="#E53812"></stop><stop offset="1" stop-color="#D4301F"></stop></radialGradient>
      <radialGradient id="reddit_p5" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(128.369 194.908) scale(53.2322 35.1106)"><stop stop-color="#172E35"></stop><stop offset="0.29" stop-color="#0E1C21"></stop><stop offset="0.73" stop-color="#030708"></stop><stop offset="1"></stop></radialGradient>
      <radialGradient id="reddit_p6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(175.312 34.1061) scale(46.7274 46.7274)"><stop stop-color="#FEFFFF"></stop><stop offset="0.4" stop-color="#FEFFFF"></stop><stop offset="0.51" stop-color="#F9FCFC"></stop><stop offset="0.62" stop-color="#EDF3F5"></stop><stop offset="0.7" stop-color="#DEE9EC"></stop><stop offset="0.72" stop-color="#D8E4E8"></stop><stop offset="0.76" stop-color="#CCD8DF"></stop><stop offset="0.8" stop-color="#C8D5DD"></stop><stop offset="0.83" stop-color="#CCD6DE"></stop><stop offset="0.85" stop-color="#D8DBE2"></stop><stop offset="0.88" stop-color="#EDE3E9"></stop><stop offset="0.9" stop-color="#FFEBEF"></stop></radialGradient>
      <radialGradient id="reddit_p7" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(155.84 85.0459) scale(38.3003 38.3003)"><stop offset="0.48" stop-color="#7A9299"></stop><stop offset="0.67" stop-color="#172E35"></stop><stop offset="0.75"></stop><stop offset="0.82" stop-color="#172E35"></stop></radialGradient>
    `,
    paths: [
      { d: "M 128, 128 m -128, 0 a 128,128 0 1,0 256,0 a 128,128 0 1,0 -256,0", color: "#FF4500" },
      { d: "M55.44 153.54C71.9478 153.54 85.33 140.158 85.33 123.65C85.33 107.142 71.9478 93.76 55.44 93.76C38.9322 93.76 25.55 107.142 25.55 123.65C25.55 140.158 38.9322 153.54 55.44 153.54Z", color: "url(#reddit_p0)" },
      { d: "M200.56 153.54C217.068 153.54 230.45 140.158 230.45 123.65C230.45 107.142 217.068 93.76 200.56 93.76C184.052 93.76 170.67 107.142 170.67 123.65C170.67 140.158 184.052 153.54 200.56 153.54Z", color: "url(#reddit_p1)" },
      { d: "M128.07 213.33C175.196 213.33 213.4 184.676 213.4 149.33C213.4 113.984 175.196 85.33 128.07 85.33C80.9435 85.33 42.74 113.984 42.74 149.33C42.74 184.676 80.9435 213.33 128.07 213.33Z", color: "url(#reddit_p2)" },
      { d: "M102.84 143.11C102.34 153.95 95.14 157.89 86.77 157.89C78.4 157.89 72 152.34 72.5 141.5C73 130.66 80.2 123.48 88.57 123.48C96.94 123.48 103.34 132.27 102.84 143.11Z", color: "#842123" },
      { d: "M183.64 141.49C184.14 152.33 177.75 157.88 169.37 157.88C160.99 157.88 153.79 153.95 153.3 143.1 C152.8 132.26 159.19 123.47 167.57 123.47C175.95 123.47 183.15 130.64 183.64 141.49Z", color: "#842123" },
      { d: "M102.85 144.05C102.38 154.2 95.65 157.88 87.81 157.88C79.97 157.88 73.99 152.37 74.46 142.22C74.93 132.07 81.66 125.43 89.5 125.43C97.34 125.43 103.32 133.9 102.85 144.05Z", color: "url(#reddit_p3)" },
      { d: "M166.65 125.44C174.49 125.44 181.22 132.08 181.69 142.23C182.16 152.38 176.18 157.89 168.34 157.89C160.5 157.89 153.77 154.21 153.3 144.06C152.83 133.91 158.81 125.44 166.65 125.44Z", color: "url(#reddit_p4)" },
      { d: "M128.07 165.12C117.49 165.12 107.35 165.63 97.97 166.56C96.37 166.72 95.35 168.35 95.97 169.81C101.22 182.12 113.61 190.77 128.07 190.77C142.53 190.77 154.91 182.12 160.17 169.81C160.79 168.35 159.78 166.72 158.17 166.56C148.79 165.63 138.65 165.12 128.07 165.12Z", color: "#BBCFDA" },
      { d: "M128.07 167.47C117.52 167.47 107.41 167.99 98.06 168.94C96.46 169.1 95.45 170.76 96.07 172.24C101.31 184.75 113.66 193.53 128.06 193.53C142.46 193.53 154.82 184.74 160.06 172.24C160.68 170.76 159.67 169.1 158.07 168.94C148.72 167.99 138.61 167.47 128.06 167.47H128.07Z", color: "white" },
      { d: "M128.07 166.25C117.69 166.25 107.74 166.76 98.53 167.69C96.96 167.85 95.96 169.48 96.57 170.94C101.72 183.25 113.88 191.9 128.07 191.9C142.26 191.9 154.41 183.25 159.57 170.94C160.18 169.48 159.18 167.85 157.61 167.69C148.41 166.76 138.46 166.25 128.07 166.25Z", color: "url(#reddit_p5)" },
      { d: "M174.81 76.63C186.507 76.63 195.99 67.1474 195.99 55.45C195.99 43.7526 186.507 34.27 174.81 34.27C163.113 34.27 153.63 43.7526 153.63 55.45C153.63 67.1474 163.113 76.63 174.81 76.63Z", color: "url(#reddit_p6)" },
      { d: "M127.77 88.03C125.23 88.03 123.18 86.97 123.18 85.33C123.18 66.35 138.62 50.92 157.59 50.92C160.13 50.92 162.18 52.98 162.18 55.51C162.18 58.04 160.12 60.1 157.59 60.1C143.68 60.1 132.36 71.42 132.36 85.33C132.36 86.97 130.3 88.03 127.77 88.03Z", color: "url(#reddit_p7)" },
      { d: "M97.27 149.07C97.27 153 93.09 154.76 87.94 154.76C82.79 154.76 78.61 153 78.61 149.07C78.61 145.14 82.79 141.96 87.94 141.96C93.09 141.96 97.27 145.14 97.27 149.07Z", color: "#FF6101" },
      { d: "M177.54 149.07C177.54 153 173.36 154.76 168.21 154.76C163.06 154.76 158.88 153 158.88 149.07C158.88 145.14 163.06 141.96 168.21 141.96C173.36 141.96 177.54 145.14 177.54 149.07Z", color: "#FF6101" },
      { d: "M94.38 138.41C96.2136 138.41 97.7 136.789 97.7 134.79C97.7 132.791 96.2136 131.17 94.38 131.17C92.5464 131.17 91.06 132.791 91.06 134.79C91.06 136.789 92.5464 138.41 94.38 138.41Z", color: "#FFC49C" },
      { d: "M173.29 138.41C175.124 138.41 176.61 136.789 176.61 134.79C176.61 132.791 175.124 131.17 173.29 131.17C171.456 131.17 169.97 132.791 169.97 134.79C169.97 136.789 171.456 138.41 173.29 138.41Z", color: "#FFC49C" }
    ],
    color: "#FF4500",
    viewBox: "0 0 256 256"
  },
  leetcode: {
    paths: [
      { d: "M68.0063 83.0664C70.5 80.5764 74.5366 80.5829 77.0223 83.0809C79.508 85.579 79.5015 89.6226 77.0078 92.1127L65.9346 103.17C55.7187 113.371 39.06 113.519 28.6718 103.513C28.6117 103.456 23.9861 98.9201 8.72653 83.957C-1.42528 74.0029 -2.43665 58.0749 7.11648 47.8464L24.9282 28.7745C34.4095 18.6219 51.887 17.5122 62.7275 26.2789L78.9048 39.362C81.6444 41.5776 82.0723 45.5985 79.8606 48.3429C77.6488 51.0873 73.635 51.5159 70.8954 49.3003L54.7182 36.2173C49.0488 31.6325 39.1314 32.2622 34.2394 37.5006L16.4274 56.5727C11.7767 61.5522 12.2861 69.574 17.6456 74.8292C28.851 85.8169 37.4869 94.2846 37.4969 94.2942C42.8977 99.496 51.6304 99.4184 56.9331 94.1234L68.0063 83.0664Z", color: "#FFA116" },
      { d: "M41.1067 72.0014C37.5858 72.0014 34.7314 69.1421 34.7314 65.615C34.7314 62.0879 37.5858 59.2286 41.1067 59.2286H88.1245C91.6454 59.2286 94.4997 62.0879 94.4997 65.615C94.4997 69.1421 91.6454 72.0014 88.1245 72.0014H41.1067Z", color: "#B3B3B3" },
      { d: "M49.9118 2.02335C52.3173 -0.55232 56.3517 -0.686894 58.9228 1.72277C61.494 4.13244 61.6284 8.17385 59.2229 10.7495L16.4276 56.5729C11.7768 61.552 12.2861 69.5738 17.6453 74.8292L37.4088 94.2091C39.9249 96.6764 39.968 100.72 37.505 103.24C35.042 105.761 31.0056 105.804 28.4895 103.337L8.72593 83.9567C-1.42529 74.0021 -2.43665 58.0741 7.1169 47.8463L49.9118 2.02335Z", color: "#070707" }
    ],
    color: "#FFA116",
    viewBox: "0 0 95 111"
  },
  hackerrank: {
    paths: [
      { d: "M64.8625 40C65.2135 40 65.5 39.7255 65.5 39.3825V0.617499C65.5 0.274499 65.2135 0 64.8625 0H36.1375C35.7865 0 35.5 0.274499 35.5 0.617499V39.3825C35.5 39.7255 35.7865 40 36.1375 40H64.8625Z", color: "#00EA64" },
      { d: "M30.5 0H20.284V14.9255H10.716V0H0.5V40H10.716V23.8315H20.284V40H30.5V0Z", color: "#000000" }
    ],
    color: "#00EA64",
    viewBox: "0 0 66 40"
  },
  twitch: { path: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z", color: "#9146FF" },
  devto: { 
    paths: [
      { d: "M76.8,0 h358.4 c42.4,0 76.8,34.4 76.8,76.8 v358.4 c0,42.4 -34.4,76.8 -76.8,76.8 h-358.4 c-42.4,0 -76.8,-34.4 -76.8,-76.8 v-358.4 c0,-42.4 34.4,-76.8 76.8,-76.8 z", color: "#000000" },
      { d: "M140.47 203.94h-17.44v104.47h17.45c10.155-.545 17.358-8.669 17.47-17.41v-69.65c-.696-10.364-7.796-17.272-17.48-17.41zm45.73 87.25c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H233.6v38.42h32.57v29.57H233.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z", color: "#ffffff" }
    ],
    color: "#000000",
    viewBox: "0 0 512 512" 
  },
  hashnode: { 
    paths: [
      { d: "M 113,168.5 C 113,199.15 137.84,224 168.5,224 v 0 C 199.15,224 224,199.15 224,168.5 v 0 C 224,137.84 199.15,113 168.5,113 V 113 C 137.84,113 113,137.84 113,168.5 Z", color: "#ffffff" },
      { d: "m 23.155,224.402 c -30.873,-30.874 -30.873,-80.93 0,-111.803 L 112.598,23.155 c 30.874,-30.874 80.93,-30.874 111.804,0 l 89.443,89.443 c 30.874,30.874 30.874,80.93 0,111.804 l -89.443,89.443 c -30.874,30.874 -80.93,30.874 -111.804,0 z M 207.63,129.368 c 21.61,21.61 21.61,56.65 0,78.263 -21.61,21.61 -56.65,21.61 -78.26,0 -21.61,-21.61 -21.61,-56.65 0,-78.263 21.61,-21.61 56.65,-21.61 78.26,0 z", color: "#2962ff", fillRule: "evenodd" }
    ],
    color: "#2962FF",
    viewBox: "0 0 337 337",
    transform: "scale(1, -1)"
  },
  pinterest: { path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.966 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.999 5.368 18.621 0 12.017 0z", color: "#BD081C" },
  threads: { 
    path: "M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z", 
    color: "#000000",
    viewBox: "0 0 192 192" 
  },
  bluesky: { 
    path: "M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z", 
    color: "#006AFF",
    viewBox: "0 0 64 57" 
  },
  mastodon: { 
    extraDefs: `
      <linearGradient id="mastodon_grad" x1="30.5" y1="0" x2="30.5" y2="65" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6364FF"/><stop offset="1" stop-color="#563ACC"/>
      </linearGradient>
    `,
    paths: [
      { d: "M60.7539 14.3904C59.8143 7.40642 53.7273 1.90257 46.5117 0.836066C45.2943 0.655854 40.6819 0 29.9973 0H29.9175C19.2299 0 16.937 0.655854 15.7196 0.836066C8.70488 1.87302 2.29885 6.81852 0.744617 13.8852C-0.00294988 17.3654 -0.0827298 21.2237 0.0561464 24.7629C0.254119 29.8384 0.292531 34.905 0.753482 39.9598C1.07215 43.3175 1.62806 46.6484 2.41704 49.9276C3.89445 55.9839 9.87499 61.0239 15.7344 63.0801C22.0077 65.2244 28.7542 65.5804 35.2184 64.1082C35.9295 63.9428 36.6318 63.7508 37.3252 63.5321C38.8971 63.0329 40.738 62.4745 42.0913 61.4937C42.1099 61.4799 42.1251 61.4621 42.1358 61.4417C42.1466 61.4212 42.1526 61.3986 42.1534 61.3755V56.4773C42.153 56.4557 42.1479 56.4345 42.1383 56.4151C42.1287 56.3958 42.1149 56.3788 42.0979 56.3655C42.0809 56.3522 42.0611 56.3429 42.04 56.3382C42.019 56.3335 41.9971 56.3336 41.9761 56.3384C37.8345 57.3276 33.5905 57.8234 29.3324 57.8156C22.0045 57.8156 20.0336 54.3384 19.4693 52.8908C19.0156 51.6397 18.7275 50.3346 18.6124 49.0088C18.6112 48.9866 18.6153 48.9643 18.6243 48.9439C18.6333 48.9236 18.647 48.9056 18.6643 48.8915C18.6816 48.8774 18.7019 48.8675 18.7237 48.8628C18.7455 48.858 18.7681 48.8585 18.7897 48.8641C22.8622 49.8465 27.037 50.3423 31.2265 50.3412C32.234 50.3412 33.2387 50.3412 34.2463 50.3146C38.4598 50.1964 42.9009 49.9808 47.0465 49.1713C47.1499 49.1506 47.2534 49.1329 47.342 49.1063C53.881 47.8507 60.1038 43.9097 60.7362 33.9301C60.7598 33.5372 60.8189 29.8148 60.8189 29.4071C60.8218 28.0215 61.2651 19.5781 60.7539 14.3904Z", color: "url(#mastodon_grad)" },
      { d: "M50.3943 22.237V39.5876H43.5185V22.7481C43.5185 19.2029 42.0411 17.3949 39.036 17.3949C35.7325 17.3949 34.0778 19.5338 34.0778 23.7585V32.9759H27.2434V23.7585C27.2434 19.5338 25.5857 17.3949 22.2822 17.3949C19.2949 17.3949 17.8027 19.2029 17.8027 22.7481V39.5876H10.9298V22.237C10.9298 18.6918 11.835 15.8754 13.6453 13.7877C15.5128 11.7049 17.9623 10.6355 21.0028 10.6355C24.522 10.6355 27.1813 11.9885 28.9542 14.6917L30.665 17.5633L32.3788 14.6917C34.1517 11.9885 36.811 10.6355 40.3243 10.6355C43.3619 10.6355 45.8114 11.7049 47.6847 13.7877C49.4931 15.8734 50.3963 18.6899 50.3943 22.237Z", color: "white" }
    ],
    color: "#6364FF",
    viewBox: "0 0 61 65"
  },
  kaggle: {
    path: "M26.92 47c-.05.18-.24.27-.56.27h-6.17a1.24 1.24 0 0 1-1-.48L9 33.78l-2.83 2.71v10.06a.61.61 0 0 1-.69.69H.69a.61.61 0 0 1-.69-.69V.69A.61.61 0 0 1 .69 0h4.79a.61.61 0 0 1 .69.69v28.24l12.21-12.35a1.44 1.44 0 0 1 1-.49h6.39a.54.54 0 0 1 .55.35.59.59 0 0 1-.07.63L13.32 29.55l13.46 16.72a.65.65 0 0 1 .14.73Z",
    color: "#20BEFF",
    viewBox: "0 0 27.5 48.5"
  },
  codewars: {
    paths: [
      { d: "M10.85,18.68c.3.4.3.8.2,1.2.5,0,1,.5,1,1,.5-.1,1,.2,1.2.6.4-.3,1-.2,1.3.2q.2.27,0,0h.1c.2-.3.6-.4.9-.2,0-.1.1-.2.2-.3.2-.2.6-.2.8,0,0-.2.2-.3.3-.3-.1-.2-.2-.4-.2-.6h0c-.2,0-.4,0-.5-.2q-.07-.13,0,0c-.2.1-.4.1-.6,0-.2-.1-.3-.3-.4-.5h-.5c-.4-.1-.6-.5-.5-.9-.3,0-.6-.2-.8-.4-.2-.3-.2-.6,0-.9-.4,0-.6-.4-.7-.8,0-.4,0-.8.3-1-.4-.4-.5-1-.1-1.5h0c0,.2-.2.4-.4.5s-.4.1-.6,0c0,.5-.4.8-.9.9.1.2.2.6,0,.8-.1.3-.3.5-.6.6.4.4.3,1.1,0,1.5.2,0,.4.1.6.4l-.1-.1Z", color: "#f05656" },
      { d: "M16.65,24.98c0-.5.3-1,.8-1h0c0-.5.1-.8.4-.9,0,0-.2-.2-.2-.3,0-.3,0-.6.4-.7,0,0,0-.1-.1-.2v-.2c-.2,0-.4,0-.6-.2,0,0,0,.2-.2.3,0,0-.2.1-.4,0,0,.2-.1.5-.3.6s-.5.1-.7,0c0,.3-.3.5-.5.6-.3,0-.6,0-.7-.2,0,0-.1.2-.2.2-.2.2-.5.3-.8.2-.3,0-.5-.2-.6-.5-.3.2-.7.3-1,.2-.3-.1-.6-.4-.6-.8-.5.2-1.1,0-1.3-.5h-.1c.1.1.2.3.2.4,0,.3,0,.5-.2.7.4.3.5.8.3,1.2.3,0,.5.2.7.4.2.2.2.5.2.8.6,0,1.1.3,1.2.8.6-.4,1.4-.4,1.8.2h0c.3-.4.9-.6,1.4-.4.2-.4.6-.8,1.1-.7h0Z", color: "#f05656" },
      { d: "M19.35,15.58c0,.2,0,.5-.2.7s-.4.3-.7.3h0c0,.5,0,.8-.4.9h0c.3.3.3.7,0,.9l-.2.1s.1.2,0,.3c.2,0,.5,0,.7.2,0-.2.3-.3.5-.2,0-.2.1-.5.3-.6s.5-.1.7,0c0-.2,0-.3.2-.4.3-.3.8-.2,1,0,.2-.4.8-.6,1.2-.4.2,0,.3.2.4.4.3-.2.7-.3,1-.2.3.1.6.4.6.8.5-.2,1.1,0,1.3.5h.1c-.3-.4-.3-.8,0-1.2h0c-.4-.3-.5-.8-.3-1.2-.3,0-.6-.1-.7-.4-.2-.2-.2-.5-.2-.8-.6,0-1.1-.3-1.2-.8-.6.4-1.4.4-1.8-.2-.3.4-.9.6-1.4.4,0,.5-.6.8-1,.8l.1.1Z", color: "#f05656" },
      { d: "M14.45,15.58c.4.4.4.9,0,1.3.2,0,.4.3.5.5v.7h.1c.3.1.6.4.5.8.2,0,.4,0,.6.1.2.1.3.4.2.6h.4c.1-.2.3-.4.4-.5v-.6c-.2-.1-.3-.3-.3-.6s.1-.4.3-.6c-.2-.2-.3-.5-.2-.7,0-.3.3-.5.6-.5-.2-.3-.2-.6,0-.9.2-.3.5-.4.8-.4,0-.4,0-.7.4-1,.3-.2.7-.3,1-.2,0-.4.5-.8.9-.8v-.2h-.5c-.3,0-.4-.3-.5-.6-.4.2-.9.1-1.2-.3-.2.2-.4.4-.7.4s-.6,0-.8-.2c-.2.5-.7.9-1.3.7.1.7-.4,1.4-1.1,1.5.2.5,0,1-.4,1.4l.3.1Z", color: "#f05656" },
      { d: "M24.95,24.38c.1-.3.3-.5.6-.6-.4-.4-.3-1.1,0-1.5-.2,0-.4-.2-.6-.4h0c-.3-.4-.3-.8-.2-1.2-.5,0-1-.5-1-1-.5.1-1-.2-1.1-.6-.2.2-.5.2-.7.2s-.5-.2-.6-.4h-.1c-.2.3-.6.4-.9.2,0,.1-.1.2-.2.3-.2.2-.6.2-.8,0,0,.1-.1.2-.2.3,0,.2.2.4.2.6h.2c.2,0,.2.2.3.3.2-.1.4-.1.7,0,.2.1.4.3.4.6h.5c.4.1.6.5.5.9.4,0,.7.1.9.4s.2.7,0,1c.3.1.6.4.6.8s0,.7-.3,1c.4.4.5,1,.1,1.5h.1c0-.2.2-.3.4-.4s.4-.1.6,0c0-.5.4-.9.9-.9-.2-.3-.2-.6,0-.9l-.3-.2Z", color: "#f05656" },
      { d: "M21.55,24.98c-.4-.4-.4-.9,0-1.3-.2,0-.4-.3-.5-.5s0-.5,0-.7h-.1c-.3-.1-.5-.4-.5-.8h0c-.2,0-.4,0-.6-.1s-.3-.3-.3-.6c-.1,0-.3,0-.4-.1-.1.2-.3.4-.5.5.2.2.2.4,0,.6q-.13.13,0,0c.3.2.4.6.2.9,0,0-.1.2-.2.2.2.2.3.5.2.7,0,.3-.3.5-.5.5v.3c0,.3,0,.6-.2.8-.2.2-.5.3-.7.3,0,.6-.3,1.1-.8,1.2h-.5c0,.4-.5.8-.9.8v.2h.6c.2.1.3.3.4.5.4-.2.9-.1,1.2.3.2-.2.4-.4.7-.4s.6,0,.8.2c.2-.6.8-.8,1.3-.7-.1-.7.4-1.4,1.1-1.5-.2-.5,0-1,.4-1.4l-.2.1Z", color: "#f05656" },
      { d: "M16.45,30.08c-.4,0-.6-.4-.7-.7-.3.1-.6,0-.8,0-.2-.2-.3-.4-.3-.7h-.3c-.3-.1-.5-.4-.4-.8-.2.2-.4.3-.7.3-.7,0-1.4-.4-1.4-1.1-.4.2-.8.2-1.2,0-.4-.3-.5-.7-.4-1.1-.5,0-1-.3-1.1-.9,0-.2,0-.5.2-.6-.5,0-.8-.5-.8-1,0-.2.2-.4.3-.6-.2-.2-.3-.4-.3-.7s.2-.5.5-.6c-.2-.2-.2-.6,0-.8h0c-.2,0-.3-.2-.4-.4-.4-.6-.3-1.4.2-1.8-.4-.2-.6-.6-.5-1.1,0-.4.4-.8.8-.9-.2-.3-.2-.7,0-1s.6-.5.9-.5c-.1-.3,0-.7.2-1,.2-.2.6-.3,1-.2,0-.3.2-.5.5-.6s.6,0,.8.1c.1-.3.4-.4.6-.4h0c0-.4.2-.8.6-1,.4-.2.8-.3,1.2-.1v-.4c.2-.4.5-.6.8-.7.4,0,.7,0,1,.3.1-.4.5-.6.9-.6s.7.2.9.5c.2-.3.6-.4.9-.3.4,0,.6.4.7.7.3-.1.6,0,.8.1.2.2.3.5.3.7.3,0,.7.2.7.5v.2c.2-.2.4-.3.7-.3.7,0,1.3.5,1.4,1.2.4-.2.9-.2,1.2,0,.4.3.5.7.4,1.2.5,0,1,.3,1.1.9,0,.2,0,.5-.2.6.4,0,.6.3.7.7,0,.4,0,.7-.3.9.2.1.3.3.3.5,0,.4-.2.7-.5.9.2.2.2.6,0,.8.4.2.6.6.6,1s-.2.8-.5,1.1c.1,0,.2.1.3.2.2.3.3.7.2,1-.1.4-.4.6-.7.7.3.4.2,1-.2,1.3-.2.2-.4.3-.7.2.1.3,0,.7-.2,1-.2.2-.6.3-1,.2,0,.3-.2.5-.4.6-.3.1-.6,0-.8-.1-.1.2-.4.4-.6.4,0,.2,0,.3-.1.4-.3.6-1,1-1.7.7,0,.6-.4,1.1-1.1,1.1-.3,0-.6,0-.8-.3-.2.4-.5.6-.8.6M29.85,10.38l-9.2-5.3c-1.6-1-3.7-1-5.3,0l-9.2,5.3c-1.6,1-2.7,2.7-2.7,4.6v10.6c0,1.9,1,3.7,2.7,4.6l9.2,5.3c1.6,1,3.7,1,5.3,0l9.2-5.3c1.6-1,2.7-2.7,2.7-4.6v-10.7c0-1.9-1-3.6-2.7-4.6v.1Z", color: "#f05656" }
    ],
    color: "#f05656",
    viewBox: "0 0 35 40.3"
  },
  codeforces: {
    paths: [
      { d: "M30.3,32.7H9c-5,0-9,4.1-9,9v64.7c0,5,4.1,9,9,9h21.3c5,0,9-4.1,9-9V41.7C39.4,36.7,35.3,32.7,30.3,32.7z", color: "#F6C43D" },
      { d: "M84.6,0H63.3c-5,0-9,4.1-9,9v97.4c0,5,4.1,9,9,9h21.3c5,0,9-4.1,9-9V9C93.6,4.1,89.6,0,84.6,0z", color: "#1F8ACB" },
      { d: "M138.7,45.1h-21.3c-5,0-9,4.1-9,9v52.3c0,5,4.1,9,9,9h21.3c5,0,9-4.1,9-9V54.1C147.7,49.1,143.7,45.1,138.7,45.1z", color: "#B11E26" }
    ],
    color: "#1F8ACB",
    viewBox: "0 0 148 116"
  },
  geeksforgeeks: {
    path: "M193.664,1471.966H169.257a9.748,9.748,0,0,1,17.129-5.146l3.55-3.57a14.77,14.77,0,0,0-25.724,8.716h-.085a14.77,14.77,0,0,0-25.724-8.716l3.55,3.57a9.748,9.748,0,0,1,17.129,5.146H134.674q-.043.565-.044,1.141a14.771,14.771,0,0,0,29.149,3.383h.778a14.769,14.769,0,0,0,29.149-3.383Q193.708,1472.531,193.664,1471.966ZM149.4,1482.855a9.749,9.749,0,0,1-9.151-6.385h18.3A9.75,9.75,0,0,1,149.4,1482.855Zm29.538,0a9.75,9.75,0,0,1-9.152-6.385h18.3A9.75,9.75,0,0,1,178.939,1482.855Z",
    color: "#2F8D46",
    transform: "translate(-134.631, -1458.338)",
    viewBox: "0 0 59.1 29.5"
  },
  topcoder: {
    paths: [
      { d: "M9.69359 41.4136C11.2804 34.7275 14.9598 28.8195 19.6604 24.3898C10.5846 22.799 2.02951 22.9362 0.307489 27.3804C-0.903928 30.5132 1.57389 35.2412 5.83405 39.9109C7.0003 41.1884 8.3419 41.6584 9.6184 41.7072L9.69359 41.4085V41.4136Z", color: "#2BA9E0" },
      { d: "M77.1289 27.3798C75.4113 22.9355 66.8562 22.7984 57.7756 24.3841C62.4763 28.8188 66.1557 34.7218 67.7425 41.4079L67.8174 41.7065C69.0989 41.6527 70.4355 41.1878 71.602 39.9102C75.8622 35.2456 78.34 30.5173 77.1289 27.3798Z", color: "#F69322" },
      { d: "M38.7181 29.8862C32.8263 30.7967 22.8042 35.7597 14.5745 40.2533C13.9287 40.6058 11.8664 41.795 9.62366 41.7022L9.69884 41.4035C11.2856 34.7174 14.9701 28.8094 19.6707 24.375C21.9533 24.8057 24.2611 25.3001 24.276 25.3001C25.4324 25.574C27.695 26.1565 29.8174 26.7487 29.8474 26.7585C31.0089 27.111C32.9312 27.7228 34.8886 28.3933 35.0188 28.4376C36.8009 29.1131 37.617 29.4263 37.677 29.446", color: "#0E73BA" },
      { d: "M38.7182 29.8862C44.61 30.7967 54.6321 35.7597 62.8618 40.2533C63.5076 40.6058 65.57 41.795 67.8127 41.7022L67.7375 41.4035C66.1507 34.7174 62.4662 28.8094 57.7656 24.375C57.0034 25.574 49.7259 26.1565 47.6184 26.7487C46.4269 27.111 44.3494 27.7719 42.4172 28.4376C40.6349 29.1131 39.8188 29.4263 38.6971 29.8523L38.7182 29.8862Z", color: "#FFD600" },
      { d: "M39.7593 29.4898C40.0696 29.3675 40.37 29.25 40.6554 29.1373C45.3209 27.2969 51.6633 25.4516 57.7706 24.3846C52.2441 19.1768 45.3108 16 38.7182 16C32.1252 16 25.192 19.1717 19.6606 24.3846C25.7679 25.4516 32.1154 27.2969 36.781 29.1373C37.3715 29.3723 38.0224 29.6218 38.7182 29.8863C38.8733 29.8274 39.0186 29.7735 39.1687 29.7149L39.7593 29.4898Z", color: "#8CC542" }
    ],
    color: "#2BA9E0",
    viewBox: "0 16 80 26"
  },
  codechef: {
    paths: [
      // Hat (Cream & Tan)
      { d: "M51.65 53.38C53.19 52.71 53.98 47.51 55.02 42.67C58.77 34.1 67.14 27.79 66.64 19.82C59.77 6.37 50.15 5.89 46.03 4.82C40.69 3.83 35.36 3.1 30.03 3.87C26.24 4.43 21.33 8.08 16.79 8.39C12.46 9.82 11.38 11.72 10.17 13.39C8.82003 16.33 8.51003 19.26 9.17003 22.2C10.83 27.48 13.38 32.28 14.17 38.03C15.92 41.12 16.04 46.96 20.04 50.88C32.28 45.05 42.28 49.57 51.65 53.38Z", color: "#F9F9EC" },
      { d: "M20.39 54.28C24.8 51.94 35.84 46.15 50.62 56.3C51.04 53.92 51.08 51.54 50.75 49.16C50.33 43.53 28.27 36.64 20.27 49.04L20.39 54.28Z", color: "#D4C6A6" },
      // Face Features (Mustache, Eyes, Smile) - #5B4538
      { d: "M18.91 77.29C17.4 86.31 28.43 87.18 32.96 83.13C36.09 80.33 35.21 76.44 30.72 76.68C26.77 76.89 24.44 81.99 18.91 77.29Z", color: "#5B4538" }, // Left Mustache
      { d: "M52.41 77.29C53.92 86.31 42.89 87.18 38.36 83.13C35.23 80.33 36.11 76.44 40.6 76.68C44.55 76.89 46.88 81.99 52.41 77.29Z", color: "#5B4538" }, // Right Mustache
      { d: "M29.74 64.2C29.24 63.85 28.62 63.67 27.88 63.67C26.99 63.67 26.27 63.94 25.71 64.47C25.06 65.06 24.81 65.9 24.96 67C25.05 67.89 25.37 68.67 25.91 69.35C26.46 70.03 27.12 70.37 27.88 70.37C28.35 70.37 28.84 70.24 29.34 69.97C30.23 69.44 30.67 68.42 30.67 66.91C30.67 65.55 30.36 64.65 29.74 64.2Z", color: "#5B4538" }, // Left Eye
      { d: "M45.1301 64.14C44.6301 63.79 44.0101 63.61 43.2701 63.61C42.3801 63.61 41.66 63.88 41.1 64.41C40.45 65 40.2 65.85 40.35 66.94C40.44 67.83 40.76 68.61 41.3 69.29C41.85 69.97 42.5101 70.31 43.2701 70.31C43.7401 70.31 44.2301 70.18 44.7301 69.91C45.6201 69.38 46.0601 68.36 46.0601 66.85C46.0701 65.48 45.7601 64.58 45.1301 64.14Z", color: "#5B4538" }, // Right Eye
      { d: "M36.34 75.91C35.98 75.9 35.64 75.82 35.34 75.69C35.02 75.54 34.74 75.33 34.48 75.07C34.22 74.81 33.99 74.51 33.79 74.17", color: "#5B4538" } // Smile
    ],
    color: "#5B4638",
    viewBox: "0 3 70 95"
  },
  codestudio: {
    paths: [
      { d: "M12.8274 25.9822C19.9117 25.9822 25.6548 20.1699 25.6548 13.0001C25.6548 5.83033 19.9117 0.0180664 12.8274 0.0180664C5.74301 0.0180664 0 5.83033 0 13.0001C0 20.1699 5.74301 25.9822 12.8274 25.9822Z", color: "white" },
      { d: "M4.65156 13.0404C4.61289 14.3648 4.84315 15.6892 5.26674 16.9732C5.65167 18.0638 6.38285 18.9989 7.34605 19.6607C8.46216 20.362 9.74349 20.6344 11.0802 20.6344H19.2797V16.7289H11.067C9.06152 16.7289 8.09833 15.35 8.09833 13.0484V13.051C8.09833 10.7493 9.0624 9.37573 11.067 9.37573H19.2788V5.47021H11.0793C9.78304 5.47021 8.46216 5.74265 7.34517 6.44396C6.38285 7.10572 5.65167 8.03991 5.26586 9.13141C4.84227 10.4163 4.61201 11.7398 4.65068 13.0642", color: "#F37421" },
      { d: "M9.63196 12.2417L13.4812 12.9861C13.4812 12.9861 10.6576 15.9548 9.63196 12.2417Z", color: "#414141" },
      { d: "M18.6593 12.2549L14.9269 13.0379C14.9269 13.0379 18.1592 15.975 18.6593 12.2549Z", color: "#414141" }
    ],
    color: "#F37421",
    viewBox: "0 0 26 26"
  },
  interviewbit: {
    paths: [
      // Tier 1 (Peak) - Teal
      { d: "M34.4,6.1l-5.6,5.7-5.7-5.7L28.8,0.5Z", color: "#61DDE1" },
      { d: "M28.8,11.2l-6.1-6.1,6.1-6.1L35,5.1ZM23.6,5.1,28.8,10.2l5.2-5.2L28.8,0Z", color: "#606060" },
      // Tier 2 - White
      { d: "M28.7,11.8l-5.6,5.7-5.7-5.7L23.1,6.2Z", color: "#FFFFFF" },
      { d: "M23.1,16.9l-6.1-6.1,6.1-6.1L29.3,10.8ZM18,10.8,23.1,16l5.2-5.2L23.1,5.6Z", color: "#606060" },
      { d: "M40,11.8l-5.6,5.7-5.7-5.7L34.4,6.2Z", color: "#FFFFFF" },
      { d: "M34.4,16.9l-6.1-6.1,6.1-6.1L40.6,10.8ZM29.3,10.8l5.1,5.2,5.2-5.2-5.2-5.2Z", color: "#606060" },
      // Tier 3 - Orange
      { d: "M23,17.4l-5.6,5.7-5.6-5.7,5.6-5.7Z", color: "#FFB94D" },
      { d: "M17.4,22.6l-6.1-6.1,6.1-6.1L23.6,16.5ZM12.3,16.5,17.4,21.7,22.6,16.5,17.4,11.3Z", color: "#606060" },
      { d: "M34.3,17.4l-5.6,5.7-5.6-5.7,5.6-5.7Z", color: "#FFB94D" },
      { d: "M28.7,22.6l-6.1-6.1,6.1-6.1L34.9,16.5ZM23.6,16.5,28.7,21.7l5.2-5.2-5.2-5.2Z", color: "#606060" },
      { d: "M45.6,17.4L40,23.1l-5.7-5.7L40,11.7Z", color: "#FFB94D" },
      { d: "M40,22.6l-6.1-6.1,6.1-6.1,6.1,6.1ZM34.9,16.5,40,21.7l5.2-5.2-5.2-5.2Z", color: "#606060" },
      // Tier 4 - White
      { d: "M17.4,23.1l-5.7,5.7-5.6-5.7l5.6-5.7Z", color: "#FFFFFF" },
      { d: "M11.8,28.2l-6.1-6.1,6.1-6.1l6.1,6.1ZM6.6,22.1,11.8,27.3,17,22.1,11.8,16.9Z", color: "#606060" },
      { d: "M28.7,23.1l-5.6,5.7-5.7-5.7l5.7-5.7Z", color: "#FFFFFF" },
      { d: "M23.1,28.2l-6.1-6.1,6.1-6.1l6,6.1ZM18,22.1l5.1,5.2,5.1-5.2-5.1-5.2Z", color: "#606060" },
      { d: "M40,23.1l-5.6,5.7-5.7-5.7L34.3,17.4Z", color: "#FFFFFF" },
      { d: "M34.3,28.2l-6.1-6.1,6.1-6.1,6.1,6.1ZM29.2,22.1l5.1,5.2,5.2-5.2-5.2-5.2Z", color: "#606060" },
      { d: "M51.3,23.1L45.7,28.8l-5.7-5.7,5.7-5.7Z", color: "#FFFFFF" },
      { d: "M45.7,28.2l-6.1-6.1,6.1-6.1,6.1,6.1ZM40.6,22.1,45.7,27.3,50.9,22.1,45.7,16.9Z", color: "#606060" },
      // Tier 5 (Base) - Teal
      { d: "M11.8,28.7l-5.7,5.7-5.6-5.7l5.6-5.7Z", color: "#61DDE1" },
      { d: "M6.2,33.9,0.1,27.8,6.2,21.7l6.1,6.1Zm-5.1-6.1,5.1,5.2,5.2-5.2-5.2-5.2Z", color: "#606060" },
      { d: "M23.1,28.7l-5.7,5.7-5.6-5.7l5.6-5.7Z", color: "#61DDE1" },
      { d: "M17.5,33.9l-6.1-6.1,6.1-6.1l6.1,6.1Zm-5.1-6.1,5.1,5.2,5.2-5.2-5.2-5.1Z", color: "#606060" },
      { d: "M34.4,28.7l-5.7,5.7-5.6-5.7l5.6-5.7Z", color: "#61DDE1" },
      { d: "M28.8,33.9,22.7,27.8l6.1-6.1,6.1,6.1Zm-5.1-6.1,5.1,5.2,5.2-5.2-5.2-5.2Z", color: "#606060" },
      { d: "M45.7,28.7l-5.7,5.7-5.6-5.7l5.6-5.7Z", color: "#61DDE1" },
      { d: "M40.1,33.9,34,27.8l6.1-6.1,6.1,6.1Zm-5.1-6.1,5.1,5.2,5.2-5.2-5.2-5.2Z", color: "#606060" },
      { d: "M57,28.7l-5.7,5.7-5.6-5.7l5.6-5.7Z", color: "#61DDE1" },
      { d: "M51.4,33.9,45.3,27.8l6.1-6.1,6.1,6.1Zm-5.1-6.1,5.1,5.2,5.2-5.2-5.2-5.2Z", color: "#606060" }
    ],
    color: "#61DDE1",
    viewBox: "0 0 58 35"
  },
  atcoder: {
    body: `<text x="12" y="12" dominant-baseline="central" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="13" fill="#000000">AC</text>`,
    color: "#000000",
    viewBox: "0 0 24 24"
  },
  exercism: {
    path: "M16.7711 15.3596c0,1.016-0.88,1.651-1.659,1.651c-0.779,0-1.715-0.316-1.715-1.651V14.71h-1.027v0.65 c0,1.479,1.23,2.682,2.741,2.682c1.511,0,2.741-1.203,2.741-2.682V14.71h-1.082V15.3596z M8.14791 12.2226 c0-0.97,0.842-1.759,1.876-1.759c1.034,0,1.875,0.79,1.875,1.759h1.182c0-1.583-1.371-2.87-3.057-2.87 c-1.686,0-3.058,1.287-3.058,2.87H8.14791z M17.8859 12.2226c0-0.97,0.842-1.759,1.875-1.759c1.034,0,1.876,0.791,1.876,1.759 h1.182c0-1.583-1.371-2.87-3.058-2.87c-1.686,0-3.058,1.287-3.058,2.87H17.8859z M24.7258 8.45805V4.64371 c0-1.285-0.156-2.177-0.469-2.676c-0.313-0.498-0.963-0.883-1.952-1.153C22.0063,0.732,21.857,0.596,21.857,0.41 c0-0.252,0.336-0.377,1.008-0.377H23.886c1.11,0,1.952,0.345,2.526,1.034c0.574,0.689,0.861,1.699,0.861,3.022v4.024 c0,0.931,0.1,1.649,0.301,2.152c0.2,0.503,0.571,0.973,1.113,1.411c0.159,0.13,0.238,0.237,0.238,0.321 c0,0.084-0.079,0.191-0.238,0.321c-0.551,0.447-0.924,0.92-1.12,1.418c-0.196,0.498-0.294,1.213-0.294,2.145v4.01 c0,1.332-0.289,2.343-0.868,3.032c-0.578,0.689-1.418,1.034-2.519,1.034H22.865c-0.439,0-0.716-0.021-0.833-0.063 c-0.117-0.042-0.175-0.147-0.175-0.314c0-0.233,0.154-0.387,0.462-0.461l0.56-0.126c1.231-0.28,1.847-1.495,1.847-3.647V15.528 c0-1.444,0.35-2.464,1.05-3.06l0.266-0.224c0.131-0.112,0.196-0.196,0.196-0.252s-0.065-0.14-0.196-0.242l-0.266-0.224 C25.076,10.922,24.726,9.902,24.726,8.458L24.726,8.458z M5.323 8.425V4.611c0-1.285,0.156-2.177,0.469-2.676 c0.313-0.498,0.966-0.883,1.955-1.153C8.043,0.699,8.192,0.564,8.192,0.377c0-0.252-0.336-0.377-1.008-0.377H6.163 c-1.11,0-1.952,0.345-2.526,1.034C3.063,1.723,2.776,2.729,2.776,4.052v4.024c0,0.931-0.1,1.649-0.301,2.152 c-0.201,0.503-0.571,0.973-1.113,1.411c-0.159,0.13-0.238,0.237-0.238,0.321c0,0.084,0.079,0.191,0.238,0.321 c0.551,0.447,0.924,0.92,1.12,1.418c0.196,0.498,0.294,1.213,0.294,2.145v4.01c0,1.332,0.289,2.343,0.868,3.032 c0.578,0.689,1.418,1.034,2.519,1.034h1.022c0.439,0,0.716-0.021,0.833-0.063c0.117-0.042,0.175-0.147,0.175-0.314 c0-0.233-0.154-0.387-0.462-0.461l-0.56-0.126C5.939,22.677,5.323,21.461,5.323,19.309V15.495c0-1.444-0.35-2.464-1.05-3.06 l-0.266-0.224c-0.131-0.112-0.196-0.196-0.196-0.252s0.065-0.14,0.196-0.242l0.266-0.224 C4.973,10.889,5.323,9.869,5.323,8.425L5.323,8.425z",
    color: "#3B2A93",
    viewBox: "1 0 28 24"
  },
  tryhackme: {
    paths: [
      // Row 1 Bites - Red
      { d: "m 976.051,894.77 v 135.19 l -34.289,-26.48 -22.621,30.93 60.55,44.46 h 39.799 v -184.1 h -43.439", color: "#C01717" },
      { d: "m 1154.41,987.34 c 0,5.711 -0.35,12.039 -1.01,18.99 -0.7,6.91 -1.99,13.4 -3.91,19.37 -1.91,5.98 -4.65,11.02 -8.2,15.08 -3.56,4.06 -8.17,6.1 -13.91,6.1 -5.7,0 -10.39,-2.04 -14.02,-6.1 -3.67,-4.06 -6.48,-9.1 -8.48,-15.08 -1.99,-5.97 -3.32,-12.46 -4.02,-19.37 -0.7,-6.951 -1.06,-13.279 -1.06,-18.99 0,-5.891 0.36,-12.34 1.06,-19.371 0.7,-7.028 2.03,-13.52 4.02,-19.489 2,-5.98 4.81,-11.019 8.48,-15.082 3.63,-4.097 8.32,-6.128 14.02,-6.128 5.74,0 10.35,2.031 13.91,6.128 3.55,4.063 6.29,9.102 8.2,15.082 1.92,5.969 3.21,12.461 3.91,19.489 0.66,7.031 1.01,13.48 1.01,19.371 z m 44.73,0 c 0,-13 -1.29,-25.391 -3.91,-37.18 -2.57,-11.801 -6.75,-22.148 -12.46,-31.058 -5.74,-8.942 -13.12,-16.051 -22.22,-21.332 -9.1,-5.27 -20.16,-7.93 -33.17,-7.93 -13,0 -24.1,2.66 -33.28,7.93 -9.18,5.281 -16.68,12.39 -22.5,21.332 -5.78,8.91 -10,19.257 -12.62,31.058 -2.57,11.789 -3.86,24.18 -3.86,37.18 0,13.01 1.29,25.36 3.86,37.04 2.62,11.71 6.84,21.95 12.62,30.7 5.82,8.75 13.32,15.7 22.5,20.94 9.18,5.19 20.28,7.77 33.28,7.77 13.01,0 24.07,-2.58 33.17,-7.77 9.1,-5.24 16.48,-12.19 22.22,-20.94 5.71,-8.75 9.89,-18.99 12.46,-30.7 2.62,-11.68 3.91,-24.03 3.91,-37.04", color: "#C01717" },
      { d: "m 1443.16,894.77 v 135.19 l -34.29,-26.48 -22.66,30.93 60.59,44.46 h 39.8 v -184.1 h -43.44", color: "#C01717" },
      { d: "m 1621.52,987.34 c 0,5.711 -0.35,12.039 -1.01,18.99 -0.71,6.91 -1.99,13.4 -3.91,19.37 -1.91,5.98 -4.65,11.02 -8.2,15.08 -3.56,4.06 -8.2,6.1 -13.91,6.1 -5.7,0 -10.39,-2.04 -14.02,-6.1 -3.67,-4.06 -6.49,-9.1 -8.48,-15.08 -1.99,-5.97 -3.32,-12.46 -4.02,-19.37 -0.7,-6.951 -1.06,-13.279 -1.06,-18.99 0,-5.891 0.36,-12.34 1.06,-19.371 0.7,-7.028 2.03,-13.52 4.02,-19.489 1.99,-5.98 4.81,-11.019 8.48,-15.082 3.63,-4.097 8.32,-6.128 14.02,-6.128 5.71,0 10.35,2.031 13.91,6.128 3.55,4.063 6.29,9.102 8.2,15.082 1.92,5.969 3.2,12.461 3.91,19.489 0.66,7.031 1.01,13.48 1.01,19.371 z m 44.73,0 c 0,-13 -1.29,-25.391 -3.91,-37.18 -2.57,-11.801 -6.75,-22.148 -12.46,-31.058 -5.74,-8.942 -13.12,-16.051 -22.22,-21.332 -9.11,-5.27 -20.16,-7.93 -33.17,-7.93 -13.01,0 -24.1,2.66 -33.28,7.93 -9.18,5.281 -16.68,12.39 -22.5,21.332 -5.82,8.91 -10,19.257 -12.62,31.058 -2.57,11.789 -3.86,24.18 -3.86,37.18 0,13.01 1.29,25.36 3.86,37.04 2.62,11.71 6.8,21.95 12.62,30.7 5.82,8.75 13.32,15.7 22.5,20.94 9.18,5.19 20.27,7.77 33.28,7.77 13.01,0 24.06,-2.58 33.17,-7.77 9.1,-5.24 16.48,-12.19 22.22,-20.94 5.71,-8.75 9.89,-18.99 12.46,-30.7 2.62,-11.68 3.91,-24.03 3.91,-37.04", color: "#C01717" },
      // Row 2 Bites - Grey
      { d: "m 972.031,605 v 135.199 l -34.332,-26.527 -22.621,30.937 60.582,44.493 h 39.81 V 605 h -43.439", color: "#212121" },
      { d: "m 1125.08,605 v 135.199 l -34.34,-26.527 -22.62,30.937 60.59,44.493 h 39.81 V 605 h -43.44", color: "#212121" },
      { d: "m 1277.46,605 v 135.199 l -34.34,-26.527 -22.57,30.937 60.54,44.493 h 39.81 V 605 h -43.44", color: "#212121" },
      { d: "m 1463.71,697.582 c 0,5.699 -0.35,12.027 -1.05,18.938 -0.67,6.96 -2,13.402 -3.87,19.378 -1.91,5.981 -4.65,11.012 -8.2,15.082 -3.56,4.102 -8.21,6.129 -13.91,6.129 -5.74,0 -10.39,-2.027 -14.06,-6.129 -3.64,-4.07 -6.45,-9.101 -8.44,-15.082 -1.99,-5.976 -3.32,-12.418 -4.02,-19.378 -0.71,-6.911 -1.06,-13.239 -1.06,-18.938 0,-5.902 0.35,-12.352 1.06,-19.383 0.7,-7.027 2.03,-13.508 4.02,-19.488 1.99,-5.981 4.8,-11.012 8.44,-15.082 3.67,-4.098 8.32,-6.129 14.06,-6.129 5.7,0 10.35,2.031 13.91,6.129 3.55,4.07 6.29,9.101 8.2,15.082 1.87,5.98 3.2,12.461 3.87,19.488 0.7,7.031 1.05,13.481 1.05,19.383 z m 44.73,0 c 0,-13.012 -1.29,-25.391 -3.91,-37.191 -2.62,-11.801 -6.76,-22.153 -12.5,-31.09 -5.7,-8.91 -13.12,-16.02 -22.23,-21.289 -9.1,-5.313 -20.11,-7.93 -33.12,-7.93 -13.01,0 -24.1,2.617 -33.28,7.93 -9.18,5.269 -16.68,12.379 -22.5,21.289 -5.82,8.937 -10,19.289 -12.62,31.09 -2.58,11.8 -3.9,24.179 -3.9,37.191 0,12.969 1.32,25.348 3.9,37.027 2.62,11.723 6.8,21.911 12.62,30.661 5.82,8.789 13.32,15.75 22.5,20.98 9.18,5.16 20.27,7.77 33.28,7.77 13.01,0 24.02,-2.61 33.12,-7.77 9.11,-5.23 16.53,-12.191 22.23,-20.98 5.74,-8.75 9.88,-18.938 12.5,-30.661 2.62,-11.679 3.91,-24.058 3.91,-37.027", color: "#212121" },
      // Row 3 Bites - Red
      { d: "m 1060,398.629 v 98.133 l -24.92,-19.223 -16.41,22.422 43.99,32.309 h 28.86 V 398.629 H 1060", color: "#C01717" },
      { d: "m 1280.98,398.629 v 98.133 l -24.93,-19.223 -16.44,22.422 43.98,32.309 h 28.91 V 398.629 h -31.52", color: "#C01717" },
      { d: "m 971.68,465.82 c 0,4.141 -0.231,8.75 -0.739,13.789 -0.511,5 -1.453,9.692 -2.851,14.063 -1.371,4.34 -3.36,7.969 -5.942,10.937 -2.578,2.93 -5.937,4.411 -10.078,4.411 -4.179,0 -7.582,-1.481 -10.191,-4.411 -2.66,-2.968 -4.688,-6.597 -6.141,-10.937 -1.476,-4.371 -2.418,-9.063 -2.929,-14.063 -0.508,-5.039 -0.778,-9.648 -0.778,-13.789 0,-4.3 0.27,-8.98 0.778,-14.058 0.511,-5.082 1.453,-9.852 2.929,-14.184 1.453,-4.34 3.481,-7.969 6.141,-10.937 2.609,-2.969 6.012,-4.411 10.191,-4.411 4.141,0 7.5,1.442 10.078,4.411 2.582,2.968 4.571,6.597 5.942,10.937 1.398,4.332 2.34,9.102 2.851,14.184 0.508,5.078 0.739,9.758 0.739,14.058 z m 32.46,0 c 0,-9.449 -0.94,-18.441 -2.81,-26.992 -1.881,-8.558 -4.92,-16.098 -9.06,-22.539 -4.18,-6.519 -9.54,-11.68 -16.141,-15.508 -6.598,-3.832 -14.649,-5.742 -24.059,-5.742 -9.449,0 -17.5,1.91 -24.179,5.742 -6.68,3.828 -12.11,8.989 -16.332,15.508 -4.219,6.441 -7.258,13.981 -9.137,22.539 -1.91,8.551 -2.852,17.543 -2.852,26.992 0,9.41 0.942,18.399 2.852,26.879 1.879,8.512 4.918,15.93 9.137,22.301 4.222,6.328 9.652,11.41 16.332,15.199 6.679,3.75 14.73,5.66 24.179,5.66 9.41,0 17.461,-1.91 24.059,-5.66 6.601,-3.789 11.961,-8.871 16.141,-15.199 4.14,-6.371 7.179,-13.789 9.06,-22.301 1.87,-8.48 2.81,-17.469 2.81,-26.879", color: "#C01717" },
      { d: "m 1193.91,465.82 c 0,4.141 -0.24,8.75 -0.75,13.789 -0.5,5 -1.44,9.692 -2.85,14.063 -1.36,4.34 -3.36,7.969 -5.93,10.937 -2.58,2.93 -5.94,4.411 -10.08,4.411 -4.18,0 -7.58,-1.481 -10.2,-4.411 -2.65,-2.968 -4.72,-6.597 -6.13,-10.937 -1.49,-4.371 -2.46,-9.063 -2.93,-14.063 -0.51,-5.039 -0.78,-9.648 -0.78,-13.789 0,-4.3 0.27,-8.98 0.78,-14.058 0.47,-5.082 1.44,-9.852 2.93,-14.184 1.41,-4.34 3.48,-7.969 6.13,-10.937 2.62,-2.969 6.02,-4.411 10.2,-4.411 4.14,0 7.5,1.442 10.08,4.411 2.57,2.968 4.57,6.597 5.93,10.937 1.41,4.332 2.35,9.102 2.85,14.184 0.51,5.078 0.75,9.758 0.75,14.058 z m 32.46,0 c 0,-9.449 -0.94,-18.441 -2.82,-26.992 -1.91,-8.558 -4.92,-16.098 -9.06,-22.539 -4.18,-6.519 -9.53,-11.68 -16.13,-15.508 -6.6,-3.832 -14.65,-5.742 -24.06,-5.742 -9.46,0 -17.5,1.91 -24.18,5.742 -6.68,3.828 -12.11,8.989 -16.33,15.508 -4.22,6.441 -7.27,13.981 -9.14,22.539 -1.92,8.551 -2.85,17.543 -2.85,26.992 0,9.41 0.93,18.399 2.85,26.879 1.87,8.512 4.92,15.93 9.14,22.301 4.22,6.328 9.65,11.41 16.33,15.199 6.68,3.75 14.72,5.66 24.18,5.66 9.41,0 17.46,-1.91 24.06,-5.66 6.6,-3.789 11.95,-8.871 16.13,-15.199 4.14,-6.371 7.15,-13.789 9.06,-22.301 1.88,-8.48 2.82,-17.469 2.82,-26.879", color: "#C01717" },
      // Row 4 Bites - Grey
      { d: "m 1648.83,398.629 v 98.133 l -24.92,-19.223 -16.45,22.422 43.99,32.309 h 28.9 V 398.629 h -31.52", color: "#212121" },
      { d: "m 1561.76,465.82 c 0,4.141 -0.24,8.75 -0.74,13.789 -0.51,5 -1.45,9.692 -2.86,14.063 -1.36,4.34 -3.36,7.969 -5.93,10.937 -2.58,2.93 -5.94,4.411 -10.08,4.411 -4.18,0 -7.58,-1.481 -10.2,-4.411 -2.65,-2.968 -4.68,-6.597 -6.17,-10.937 -1.4,-4.371 -2.38,-9.063 -2.89,-14.063 -0.51,-5.039 -0.78,-9.648 -0.78,-13.789 0,-4.3 0.27,-8.98 0.78,-14.058 0.51,-5.082 1.49,-9.852 2.89,-14.184 1.49,-4.34 3.52,-7.969 6.17,-10.937 2.62,-2.969 6.02,-4.411 10.2,-4.411 4.14,0 7.5,1.442 10.08,4.411 2.57,2.968 4.57,6.597 5.93,10.937 1.41,4.332 2.35,9.102 2.86,14.184 0.5,5.078 0.74,9.758 0.74,14.058 z m 32.46,0 c 0,-9.449 -0.94,-18.441 -2.81,-26.992 -1.92,-8.558 -4.93,-16.098 -9.07,-22.539 -4.18,-6.519 -9.53,-11.68 -16.13,-15.508 -6.6,-3.832 -14.65,-5.742 -24.06,-5.742 -9.45,0 -17.5,1.91 -24.18,5.742 -6.68,3.828 -12.11,8.989 -16.33,15.508 -4.22,6.441 -7.26,13.981 -9.14,22.539 -1.91,8.551 -2.85,17.543 -2.85,26.992 0,9.41 0.94,18.399 2.85,26.879 1.88,8.512 4.92,15.93 9.14,22.301 4.22,6.328 9.65,11.41 16.33,15.199 6.68,3.75 14.73,5.66 24.18,5.66 9.41,0 17.46,-1.91 24.06,-5.66 6.6,-3.789 11.95,-8.871 16.13,-15.199 4.14,-6.371 7.15,-13.789 9.07,-22.301 1.87,-8.48 2.81,-17.469 2.81,-26.879", color: "#212121" },
      { d: "m 1527.54,241.172 v 98.129 l -24.92,-19.262 -16.45,22.5 43.99,32.262 h 28.9 V 241.172 h -31.52", color: "#212121" },
      { d: "m 1440.47,308.359 c 0,4.141 -0.24,8.75 -0.74,13.789 -0.51,5 -1.45,9.692 -2.85,14.063 -1.37,4.34 -3.36,7.969 -5.94,10.937 -2.58,2.93 -5.94,4.411 -10.08,4.411 -4.18,0 -7.58,-1.481 -10.2,-4.411 -2.65,-2.968 -4.68,-6.597 -6.13,-10.937 -1.44,-4.371 -2.42,-9.063 -2.93,-14.063 -0.51,-5.039 -0.78,-9.648 -0.78,-13.789 0,-4.3 0.27,-8.98 0.78,-14.058 0.51,-5.082 1.49,-9.852 2.93,-14.18 1.45,-4.34 3.48,-7.973 6.13,-10.941 2.62,-2.969 6.02,-4.41 10.2,-4.41 4.14,0 7.5,1.441 10.08,4.41 2.58,2.968 4.57,6.601 5.94,10.941 1.4,4.328 2.34,9.098 2.85,14.18 0.5,5.078 0.74,9.758 0.74,14.058 z m 32.46,0 c 0,-9.449 -0.94,-18.437 -2.81,-26.988 -1.88,-8.562 -4.92,-16.101 -9.07,-22.582 -4.14,-6.488 -9.53,-11.641 -16.13,-15.469 -6.6,-3.832 -14.65,-5.742 -24.06,-5.742 -9.45,0 -17.5,1.91 -24.18,5.742 -6.68,3.828 -12.11,8.981 -16.33,15.469 -4.22,6.481 -7.26,14.02 -9.14,22.582 -1.87,8.551 -2.85,17.539 -2.85,26.988 0,9.411 0.98,18.403 2.85,26.871 1.88,8.52 4.92,15.942 9.14,22.309 4.22,6.332 9.65,11.41 16.33,15.191 6.68,3.75 14.73,5.668 24.18,5.668 9.41,0 17.46,-1.918 24.06,-5.668 6.6,-3.781 11.99,-8.859 16.13,-15.191 4.15,-6.367 7.19,-13.789 9.07,-22.309 1.87,-8.468 2.81,-17.46 2.81,-26.871", color: "#212121" },
      { d: "m 1015.9,243.09 v 68 l -17.271,-13.32 -11.359,15.589 30.46,22.34 h 20.04 V 243.09 h -21.87", color: "#212121" },
      // Row 5 Bites - Red
      { d: "m 955.59,289.648 c 0,2.891 -0.199,6.051 -0.512,9.571 -0.387,3.48 -1.019,6.722 -1.988,9.73 -0.942,3 -2.309,5.539 -4.11,7.571 -1.789,2.07 -4.14,3.089 -6.992,3.089 -2.886,0 -5.226,-1.019 -7.066,-3.089 -1.832,-2.032 -3.242,-4.571 -4.262,-7.571 -1.012,-3.008 -1.68,-6.25 -2.031,-9.73 -0.348,-3.52 -0.508,-6.68 -0.508,-9.571 0,-2.929 0.16,-6.207 0.508,-9.726 0.351,-3.551 1.019,-6.801 2.031,-9.801 1.02,-3.012 2.43,-5.551 4.262,-7.582 1.84,-2.07 4.18,-3.09 7.066,-3.09 2.852,0 5.203,1.02 6.992,3.09 1.801,2.031 3.168,4.57 4.11,7.582 0.969,3 1.601,6.25 1.988,9.801 0.313,3.519 0.512,6.797 0.512,9.726 z m 22.5,0 c 0,-6.527 -0.668,-12.769 -1.961,-18.707 -1.328,-5.902 -3.399,-11.14 -6.289,-15.632 -2.891,-4.489 -6.602,-8.039 -11.211,-10.7 -4.57,-2.66 -10.109,-4.019 -16.641,-4.019 -6.558,0 -12.148,1.359 -16.758,4.019 -4.609,2.661 -8.39,6.211 -11.32,10.7 -2.93,4.492 -5.039,9.73 -6.332,15.632 -1.328,5.938 -1.957,12.18 -1.957,18.707 0,6.563 0.629,12.774 1.957,18.633 1.293,5.899 3.402,11.059 6.332,15.469 2.93,4.371 6.711,7.93 11.32,10.512 4.61,2.617 10.2,3.937 16.758,3.937 6.532,0 12.071,-1.32 16.641,-3.937 4.609,-2.582 8.32,-6.141 11.211,-10.512 2.89,-4.41 4.961,-9.57 6.289,-15.469 1.293,-5.859 1.961,-12.07 1.961,-18.633", color: "#C01717" },
      { d: "m 1287.77,124.141 v 68.007 l -17.26,-13.32 -11.37,15.551 30.47,22.383 h 20 v -92.621 h -21.84", color: "#C01717" },
      { d: "m 1227.46,170.699 c 0,2.891 -0.19,6.063 -0.55,9.571 -0.35,3.48 -0.97,6.718 -1.95,9.73 -0.98,3.012 -2.34,5.551 -4.1,7.578 -1.8,2.07 -4.14,3.082 -7.03,3.082 -2.85,0 -5.24,-1.012 -7.03,-3.082 -1.84,-2.027 -3.28,-4.566 -4.26,-7.578 -1.02,-3.012 -1.68,-6.25 -2.03,-9.73 -0.35,-3.508 -0.55,-6.68 -0.55,-9.571 0,-2.969 0.2,-6.211 0.55,-9.719 0.35,-3.558 1.01,-6.8 2.03,-9.851 0.98,-3.008 2.42,-5.508 4.26,-7.578 1.79,-2.031 4.18,-3.039 7.03,-3.039 2.89,0 5.23,1.008 7.03,3.039 1.76,2.07 3.12,4.57 4.1,7.578 0.98,3.051 1.6,6.293 1.95,9.851 0.36,3.508 0.55,6.75 0.55,9.719 z m 22.5,0 c 0,-6.519 -0.66,-12.769 -1.99,-18.711 -1.29,-5.937 -3.4,-11.129 -6.25,-15.617 -2.89,-4.492 -6.6,-8.09 -11.21,-10.75 -4.57,-2.652 -10.12,-3.941 -16.68,-3.941 -6.53,0 -12.11,1.289 -16.72,3.941 -4.65,2.66 -8.4,6.258 -11.33,10.75 -2.93,4.488 -5.04,9.68 -6.33,15.617 -1.33,5.942 -1.99,12.192 -1.99,18.711 0,6.531 0.66,12.781 1.99,18.641 1.29,5.89 3.4,11.051 6.33,15.43 2.93,4.41 6.68,7.929 11.33,10.539 4.61,2.621 10.19,3.91 16.72,3.91 6.56,0 12.11,-1.289 16.68,-3.91 4.61,-2.61 8.32,-6.129 11.21,-10.539 2.85,-4.379 4.96,-9.54 6.25,-15.43 1.33,-5.86 1.99,-12.11 1.99,-18.641", color: "#C01717" },
      { d: "m 1661.02,308.359 c 0,4.141 -0.24,8.75 -0.75,13.789 -0.5,5 -1.44,9.692 -2.85,14.063 -1.37,4.34 -3.36,7.969 -5.94,10.937 -2.57,2.93 -5.93,4.411 -10.07,4.411 -4.14,0 -7.58,-1.481 -10.2,-4.411 -2.66,-2.968 -4.69,-6.597 -6.13,-10.937 -1.45,-4.371 -2.42,-9.063 -2.93,-14.063 -0.51,-5.039 -0.74,-9.648 -0.74,-13.789 0,-4.3 0.23,-8.98 0.74,-14.058 0.51,-5.082 1.48,-9.852 2.93,-14.18 1.44,-4.34 3.47,-7.973 6.13,-10.941 2.62,-2.969 6.06,-4.41 10.2,-4.41 4.14,0 7.5,1.441 10.07,4.41 2.58,2.968 4.57,6.601 5.94,10.941 1.41,4.328 2.35,9.098 2.85,14.18 0.51,5.078 0.75,9.758 0.75,14.058 z m 32.5,0 c 0,-9.449 -0.98,-18.437 -2.86,-26.988 -1.87,-8.562 -4.92,-16.101 -9.06,-22.582 -4.14,-6.488 -9.53,-11.641 -16.13,-15.469 -6.6,-3.832 -14.61,-5.742 -24.06,-5.742 -9.46,0 -17.5,1.91 -24.18,5.742 -6.64,3.828 -12.11,8.981 -16.33,15.469 -4.22,6.481 -7.27,14.02 -9.14,22.582 -1.88,8.551 -2.85,17.539 -2.85,26.988 0,9.411 0.97,18.403 2.85,26.871 1.87,8.52 4.92,15.942 9.14,22.309 4.22,6.332 9.69,11.41 16.33,15.191 6.68,3.75 14.72,5.668 24.18,5.668 9.45,0 17.46,-1.918 24.06,-5.668 6.6,-3.781 11.99,-8.859 16.13,-15.191 4.14,-6.367 7.19,-13.789 9.06,-22.309 1.88,-8.468 2.86,-17.46 2.86,-26.871", color: "#C01717" },
      { d: "m 1600.16,1210.51 c -30.82,150.58 -164.93,259.88 -318.87,259.88 -23.44,0 -46.49,-2.66 -68.95,-7.5 -37.42,219.49 -228.86,387.15 -458.86,387.15 -227.859,0 -417.859,-164.57 -457.742,-381.06 C 130.16,1453.91 0,1314.38 0,1144.92 0,965.469 146.02,819.488 325.469,819.488 h 486.953 c 24.848,0 45,20.121 45,45 0,24.852 -20.152,45 -45,45 H 325.469 C 195.621,909.488 90,1015.12 90,1144.92 c 0,129.85 105.621,235.47 235.469,235.47 47.191,0 92.691,-13.87 131.601,-40.16 20.629,-13.9 48.59,-8.51 62.5,12.07 13.91,20.59 8.481,48.6 -12.109,62.5 -36.762,24.85 -77.813,41.45 -120.902,49.65 36.761,168.79 187.269,295.59 366.921,295.59 191.399,0 349.68,-143.91 372.61,-329.18 -12.07,-6.56 -23.86,-13.75 -35.15,-21.91 -20.16,-14.54 -24.69,-42.66 -10.16,-62.82 14.57,-20.15 42.7,-24.68 62.85,-10.15 40.24,29.06 87.85,44.41 137.66,44.41 111.41,0 208.4,-79.02 230.66,-187.97 4.38,-21.29 23.13,-35.97 44.07,-35.97 2.96,0 6.01,0.31 9.06,0.93 24.33,4.96 40.04,28.75 35.08,53.13", color: "#C01717" }
      // Cloud - Red
    ],
    color: "#C01717",
    viewBox: "0 230 1700 1230",
    transform: "scale(1, -1)"
  },
  codepen: { 
    path: "M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3 88 34.8 73 44.9 54.3 32.4zm-8.6 0v20L27.1 44.8 12 34.8zM8.6 42.8 19.3 50 8.6 57.2zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2 34.8 50 50 39.8 65.2 50zm4.3 27.5v-20l18.6-12.5 15 10.1zm37.1-30.5L80.7 50l10.8-7.2z",
    color: "#000000",
    viewBox: "0 0 100 100"
  },
  substack: { path: "M22.539 8.242H1.46V5.414h21.08v2.828zM1.46 10.812V24L12 18.11L22.54 24V10.812H1.46zM22.54 0H1.46v2.828h21.08V0z", color: "#FF6719" },
  ghost: { 
    paths: [
      { d: "M12,0.1c-8.4,0-11.9,3.5-11.9,11.9s3.5,11.9,11.9,11.9s11.9-3.5,11.9-11.9S20.4,0.1,12,0.1z M12,18.5c-4,0-6.7-2.3-6.7-6.2c0-3.9,2.6-6.8,6.8-6.8c4.2,0,6.6,2.9,6.6,6.3C18.7,15.2,16,18.5,12,18.5z", color: "#15171A" },
      { d: "M12,13.2c0.7,0,1.2-0.5,1.2-1.2s-0.5-1.2-1.2-1.2s-1.2,0.5-1.2,1.2S11.3,13.2,12,13.2z", color: "#15171A" }
    ],
    color: "#15171A",
    viewBox: "0 0 24 24" 
  },
  writeas: { 
    paths: [
      { d: "m34.37 152.015 5.805-20.007c0.285-1.016 0.586-2.114 0.902-3.293 0.32-1.18 0.609-2.266 0.871-3.258h0.066c0.145 0.992 0.387 2.058 0.727 3.207 0.344 1.144 0.656 2.187 0.941 3.133l2.797 9.172c0.211 0.66 0.399 1.257 0.567 1.789 0.164 0.531 0.336 1.019 0.511 1.468 0.18 0.446 0.348 0.871 0.516 1.274 0.164 0.402 0.352 0.801 0.567 1.203v0.07l-4.18-0.281v5.523h13.773v-4.64c-0.969 0-1.816-0.317-2.547-0.953-0.734-0.637-1.363-1.395-1.894-2.266-0.535-0.875-0.969-1.75-1.313-2.621-0.343-0.875-0.597-1.547-0.761-2.02l-8.25-23.972h-7.684l-4.992 15.472c-0.141 0.379-0.32 0.918-0.531 1.614-0.211 0.695-0.43 1.453-0.657 2.265-0.222 0.817-0.461 1.661-0.707 2.532-0.246 0.875-0.476 1.699-0.691 2.48h-0.07c-0.141-1.016-0.372-2.156-0.692-3.418-0.316-1.262-0.648-2.496-0.992-3.699-0.34-1.203-0.66-2.289-0.953-3.258-0.297-0.969-0.516-1.652-0.656-2.055l-4-11.933h-7.188l-8.781 25.14c-0.332 0.922-0.59 1.664-0.781 2.231-0.188 0.566-0.348 1.059-0.477 1.473-0.133 0.41-0.23 0.781-0.301 1.113-0.07 0.332-0.156 0.707-0.25 1.133l-2.832-0.141v5.523h17.387v-4.64c-1.016-0.07-1.73-0.375-2.145-0.918-0.414-0.543-0.617-1.242-0.617-2.09-0.023-0.402 0.004-0.828 0.086-1.273 0.086-0.45 0.196-0.911 0.34-1.383l2.441-8.852c0.286-1.062 0.559-2.179 0.832-3.347 0.27-1.168 0.489-2.356 0.657-3.559h0.07c0.117 0.52 0.234 1.051 0.356 1.594 0.117 0.543 0.246 1.129 0.386 1.754 0.145 0.625 0.309 1.312 0.496 2.054 0.192 0.742 0.414 1.563 0.676 2.457l5.309 18.203h7.863z", color: "#262424" },
      { d: "m64.18 121.402c0-3.285-2.664-5.949-5.949-5.949s-5.945 2.664-5.945 5.949 2.66 5.949 5.945 5.949 5.949-2.664 5.949-5.949", color: "#5bc4ee" }
    ],
    color: "#262424",
    viewBox: "0 98 110 77",
    transform: "scale(1, -1)"
  },
  tiktok: {
    paths: [
      { d: "M10.7907645,12.33 L10.7907645,11.11 C10.3672629,11.0428887 9.93950674,11.0061284 9.51076448,10.9999786 C5.35996549,10.9912228 1.68509679,13.6810205 0.438667694,17.6402658 C-0.807761399,21.5995112 0.663505842,25.9093887 4.07076448,28.28 C1.51848484,25.5484816 0.809799545,21.5720834 2.26126817,18.1270053 C3.71273679,14.6819273 7.05329545,12.4115428 10.7907645,12.33 L10.7907645,12.33 Z", color: "#25F4EE" },
      { d: "M11.0207645,26.15 C13.3415287,26.1468776 15.2491662,24.3185414 15.3507645,22 L15.3507645,1.31 L19.1307645,1.31 C19.0536068,0.877682322 19.0167818,0.439130992 19.0207645,0 L13.8507645,0 L13.8507645,20.67 C13.764798,23.0003388 11.8526853,24.846212 9.52076448,24.85 C8.82390914,24.844067 8.13842884,24.6726969 7.52076448,24.35 C8.33268245,25.4749154 9.63346203,26.1438878 11.0207645,26.15 Z", color: "#25F4EE" },
      { d: "M26.1907645,8.33 L26.1907645,7.18 C24.79964,7.18047625 23.4393781,6.76996242 22.2807645,6 C23.2964446,7.18071769 24.6689622,7.99861177 26.1907645,8.33 L26.1907645,8.33 Z", color: "#25F4EE" },
      { d: "M22.2807645,6 C21.1394675,4.70033161 20.5102967,3.02965216 20.5107645,1.3 L19.1307645,1.3 C19.4909812,3.23268519 20.6300383,4.93223067 22.2807645,6 L22.2807645,6 Z", color: "#FE2C55" },
      { d: "M9.51076448,16.17 C7.51921814,16.1802178 5.79021626,17.544593 5.31721201,19.4791803 C4.84420777,21.4137677 5.74860956,23.4220069 7.51076448,24.35 C6.55594834,23.0317718 6.42106871,21.2894336 7.16162883,19.8399613 C7.90218896,18.3904889 9.39306734,17.4787782 11.0207645,17.48 C11.4547752,17.4854084 11.8857908,17.5527546 12.3007645,17.68 L12.3007645,12.42 C11.8769919,12.3565056 11.4492562,12.3230887 11.0207645,12.32 L10.7907645,12.32 L10.7907645,16.32 C10.3736368,16.2081544 9.94244934,16.1576246 9.51076448,16.17 Z", color: "#FE2C55" },
      { d: "M26.1907645,8.33 L26.1907645,12.33 C23.61547,12.3250193 21.107025,11.5098622 19.0207645,10 L19.0207645,20.51 C19.0097352,25.7544158 14.7551919,30.0000116 9.51076448,30 C7.56312784,30.0034556 5.66240321,29.4024912 4.07076448,28.28 C6.72698674,31.1368108 10.8608257,32.0771989 14.4914706,30.6505586 C18.1221155,29.2239183 20.5099375,25.7208825 20.5107645,21.82 L20.5107645,11.34 C22.604024,12.8399663 25.1155724,13.6445013 27.6907645,13.64 L27.6907645,8.49 C27.1865925,8.48839535 26.6839313,8.43477816 26.1907645,8.33 Z", color: "#FE2C55" },
      { d: "M19.0207645,20.51 L19.0207645,10 C21.1134087,11.5011898 23.6253623,12.3058546 26.2007645,12.3 L26.2007645,8.3 C24.6792542,7.97871265 23.3034403,7.17147491 22.2807645,6 C20.6300383,4.93223067 19.4909812,3.23268519 19.1307645,1.3 L15.3507645,1.3 L15.3507645,22 C15.2751521,23.8467664 14.0381991,25.4430201 12.268769,25.9772302 C10.4993389,26.5114403 8.58570942,25.8663815 7.50076448,24.37 C5.73860956,23.4420069 4.83420777,21.4337677 5.30721201,19.4991803 C5.78021626,17.564593 7.50921814,16.2002178 9.50076448,16.19 C9.934903,16.1938693 10.3661386,16.2612499 10.7807645,16.39 L10.7807645,12.39 C7.0223379,12.4536691 3.65653929,14.7319768 2.20094561,18.1976761 C0.745351938,21.6633753 1.47494493,25.6617476 4.06076448,28.39 C5.66809542,29.4755063 7.57158782,30.0378224 9.51076448,30 C14.7551919,30.0000116 19.0097352,25.7544158 19.0207645,20.51 Z", color: "#000000" }
    ],
    color: "#000000",
    viewBox: "0 0 29 32",
    transform: "translate(0.979236, 0.000000)"
  },
  telegram: { 
    extraDefs: `
      <linearGradient id="tele_grad" x1="120.1" y1="240.1" x2="120.1" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" style="stop-color:#2AABEE"/><stop offset="1" style="stop-color:#229ED9"/>
      </linearGradient>
    `,
    paths: [
      { d: "M 120.1, 120.1 m -120.1, 0 a 120.1,120.1 0 1,0 240.2,0 a 120.1,120.1 0 1,0 -240.2,0", color: "url(#tele_grad)" },
      { d: "M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z", color: "#FFFFFF" }
    ],
    color: "#24A1DE",
    viewBox: "0 0 240.1 240.1" 
  },
  whatsapp: { 
    path: "M307.546 52.5655C273.709 18.685 228.706 0.0171895 180.756 0C81.951 0 1.53846 80.404 1.50408 179.235C1.48689 210.829 9.74646 241.667 25.4319 268.844L0 361.736L95.0236 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.4547 307.546 52.5741V52.5655ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.4242 304.358L43.034 319.149L58.0834 264.168L54.5423 258.53C39.6304 234.809 31.749 207.391 31.7662 179.244C31.8006 97.1036 98.6334 30.2707 180.817 30.2707C220.61 30.2879 258.015 45.8015 286.145 73.9665C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.5909 128.621 96.777 125.879 96.6309C123.266 96.5019 120.284 96.4762 117.293 96.4762C114.302 96.4762 109.454 97.5935 105.346 102.08C101.238 106.566 89.6691 117.404 89.6691 139.441C89.6691 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z", 
    color: "#25D366",
    viewBox: "0 0 360 362" 
  },
  signal: { 
    paths: [
      { d: "m80 0c4.1505 0 8.2271.31607 12.2072.925452l-1.1444 7.413248c-3.6069-.55226-7.3014-.8387-11.0628-.8387-3.7612 0-7.4555.28641-11.0623.83862l-1.1444-7.413245c3.9799-.609332 8.0564-.925375 12.2067-.925375z", color: "#3B45FD" },
      { d: "m98.9849 2.26619-1.7798 7.28755c7.3099 1.77896 14.1849 4.66606 20.4389 8.47306l3.895-6.411c-6.901-4.20091-14.488-7.38658-22.5541-9.34961z", color: "#3B45FD" },
      { d: "m127.279 15.4591-4.432 6.0507c5.977 4.3861 11.257 9.6664 15.643 15.6437l6.051-4.4324c-4.84-6.5957-10.666-12.4222-17.262-17.262z", color: "#3B45FD" },
      { d: "m148.384 38.4618-6.411 3.8942c3.807 6.2541 6.694 13.1299 8.473 20.4395l7.288-1.7798c-1.963-8.0657-5.149-15.6528-9.35-22.5539z", color: "#3B45FD" },
      { d: "m159.075 67.7934-7.414 1.1444c.553 3.6067.839 7.301.839 11.0622 0 3.7614-.286 7.4559-.839 11.0628l7.414 1.1444c.609-3.9801.925-8.0567.925-12.2072 0-4.1503-.316-8.2267-.925-12.2066z", color: "#3B45FD" },
      { d: "m141.973 117.645c3.807-6.255 6.694-13.13 8.473-20.44l7.288 1.7798c-1.963 8.0662-5.149 15.6532-9.35 22.5542z", color: "#3B45FD" },
      { d: "m138.49 122.847 6.051 4.432c-4.84 6.596-10.666 12.422-17.262 17.262l-4.433-6.051c5.978-4.386 11.258-9.666 15.644-15.643z", color: "#3B45FD" },
      { d: "m117.644 141.973 3.894 6.411c-6.901 4.201-14.488 7.387-22.5537 9.35l-1.7798-7.288c7.3095-1.779 14.1855-4.666 20.4395-8.473z", color: "#3B45FD" },
      { d: "m91.0622 151.661 1.1445 7.414c-3.9799.609-8.0564.925-12.2067.925-4.1505 0-8.2272-.316-12.2073-.925l1.1442-7.413c3.6054.552 7.2997.838 11.0631.838 3.7612 0 7.4555-.286 11.0622-.839z", color: "#3B45FD" },
      { d: "m62.7945 150.448-1.7794 7.286c-6.0589-1.475-11.8477-3.639-17.2785-6.406l-7.5927 1.772-1.7042-7.304 10.2604-2.394 2.4408 1.243c4.9187 2.506 10.1623 4.467 15.6536 5.803z", color: "#3B45FD" },
      { d: "m28.1097 147.273 1.7042 7.304-13.0145 3.036c-8.66079 2.021-16.433718-5.752-14.41286-14.412l3.03673-13.015 7.30383 1.704-3.03675 13.015c-.75782 3.248 2.15705 6.162 5.40485 5.405z", color: "#3B45FD" },
      { d: "m14.2041 125.56-7.30383-1.704 1.77163-7.593c-2.76664-5.431-4.93123-11.22-6.40585-17.2787l7.28586-1.7794c1.33599 5.4911 3.29709 10.7351 5.80279 15.6541l1.2435 2.441z", color: "#3B45FD" },
      { d: "m8.33759 91.0624-7.412228 1.1442c-.609324-3.9799-.925362-8.0563-.925362-12.2066 0-4.1505.316067-8.2271.925446-12.2072l7.413244 1.1444c-.55225 3.607-.83869 7.3014-.83869 11.0628 0 3.7631.28613 7.4572.83759 11.0624z", color: "#3B45FD" },
      { d: "m9.55373 62.795-7.28755-1.7798c1.96302-8.0657 5.1487-15.6528 9.34962-22.5539l6.411 3.8942c-3.807 6.2541-6.6941 13.1299-8.47307 20.4395z", color: "#3B45FD" },
      { d: "m21.5098 37.1531-6.0507-4.4324c4.8398-6.5957 10.6663-12.4221 17.262-17.2619l4.4324 6.0507c-5.9773 4.3861-11.2576 9.6663-15.6437 15.6436z", color: "#3B45FD" },
      { d: "m42.356 18.0266-3.8943-6.4111c6.9011-4.20082 14.4882-7.38645 22.554-9.34944l1.7798 7.28755c-7.3096 1.77899-14.1854 4.66589-20.4395 8.47299z", color: "#3B45FD" },
      { d: "m145 80c0 35.899-29.101 65-65 65-11.3866 0-22.0893-2.928-31.3965-8.072-.8961-.495-1.9417-.658-2.9389-.426l-28.9134 6.747 6.7465-28.914c.2326-.997.0692-2.043-.426-2.939-5.1439-9.307-8.0717-20.0095-8.0717-31.396 0-35.8985 29.1015-65 65-65 35.899 0 65 29.1015 65 65z", color: "#3B45FD" }
    ],
    color: "#3B45FD",
    viewBox: "0 0 160 160" 
  },
  snapchat: {
    body: `
      <g transform="translate(-51.448719,-71.557488)">
        <g transform="matrix(0.26458333,0,0,0.26458333,31.72956,-43.303112)">
          <g transform="matrix(4.370655,0,0,-4.370655,325.04631,434.11881)">
            <path d="M 0,0 C 5.999,0 10.864,-4.864 10.864,-10.865 V -57.318 C 10.864,-63.317 5.999,-68.182 0,-68.182 h -46.453 c -6,0 -10.865,4.865 -10.865,10.864 v 46.453 c 0,6.001 4.865,10.865 10.865,10.865 z" style="fill:#fffc00;fill-opacity:1;fill-rule:nonzero;stroke:none" />
          </g>
        </g>
      </g>
      <g transform="translate(-51.448719,-71.557488)">
        <g transform="matrix(0.05532529,0,0,0.05532529,62.544683,82.653856)">
          <path d="m 992.5,756.3 c -4.2,-13.9 -24.3,-23.7 -24.3,-23.7 v 0 c -1.9,-1 -3.6,-1.9 -5,-2.6 C 929.7,713.8 900,694.3 875,672.2 854.9,654.4 837.7,634.8 823.9,614 807,588.6 799.1,567.4 795.7,555.9 c -1.9,-7.5 -1.6,-10.5 0,-14.4 1.3,-3.3 5.2,-6.4 7,-7.9 11.3,-8 29.5,-19.8 40.7,-27 9.7,-6.3 18,-11.7 22.9,-15.1 15.7,-11 26.5,-22.2 32.8,-34.3 8.2,-15.6 9.2,-32.8 2.8,-49.7 -8.6,-22.8 -29.9,-36.4 -57,-36.4 -6,0 -12.2,0.7 -18.4,2 -15.5,3.4 -30.2,8.9 -42.5,13.7 -0.9,0.4 -1.9,-0.3 -1.8,-1.3 1.3,-30.5 2.8,-71.5 -0.6,-110.4 -3,-35.2 -10.3,-64.9 -22.1,-90.8 C 747.6,158.3 732.1,139.1 720,125.2 708.5,112 688.2,92.5 657.6,75 614.6,50.4 565.6,37.9 512,37.9 458.5,37.9 409.6,50.4 366.5,75 c -32.4,18.5 -53.1,39.4 -62.5,50.2 -12.1,13.9 -27.6,33.1 -39.5,59.1 -11.9,25.9 -19.1,55.5 -22.1,90.8 -3.4,39.1 -2,76.8 -0.6,110.4 0,1 -0.9,1.7 -1.9,1.3 -12.3,-4.8 -27,-10.3 -42.5,-13.7 -6.1,-1.3 -12.3,-2 -18.4,-2 -27,0 -48.3,13.6 -57,36.4 -6.4,16.9 -5.4,34.1 2.8,49.7 6.4,12.1 17.1,23.3 32.8,34.3 4.8,3.4 13.2,8.8 22.9,15.1 10.9,7.1 28.6,18.6 40,26.5 1.4,1 6.2,4.6 7.7,8.4 1.6,4 1.9,7 -0.2,15 -3.5,11.6 -11.4,32.6 -28,57.5 -13.8,20.9 -31,40.4 -51.1,58.2 -25,22.1 -54.7,41.6 -88.2,57.8 -1.6,0.8 -3.5,1.7 -5.5,2.9 v 0 c 0,0 -20,10.2 -23.8,23.4 -5.6,19.5 9.3,37.8 24.4,47.6 24.8,16 55,24.6 72.5,29.3 4.9,1.3 9.3,2.5 13.3,3.7 2.5,0.8 8.8,3.2 11.5,6.7 3.4,4.4 3.8,9.8 5,15.9 v 0 c 1.9,10.3 6.2,23 18.9,31.8 14,9.6 31.7,10.3 54.2,11.2 23.5,0.9 52.7,2 86.2,13.1 15.5,5.1 29.6,13.8 45.8,23.8 34,20.9 76.3,46.9 148.5,46.9 72.3,0 114.9,-26.1 149.1,-47.1 16.2,-9.9 30.1,-18.5 45.3,-23.5 33.5,-11.1 62.7,-12.2 86.2,-13.1 22.5,-0.9 40.2,-1.5 54.2,-11.2 13.6,-9.4 17.5,-23.4 19.3,-33.9 1,-5.2 1.6,-9.9 4.6,-13.7 2.6,-3.3 8.4,-5.6 11.1,-6.5 4.1,-1.3 8.7,-2.5 13.8,-3.9 17.5,-4.7 39.5,-10.2 66.2,-25.3 32.2,-18.3 34.4,-40.7 31,-51.8 z" style="fill:#ffffff" />
          <path d="m 1020.3,745.5 c -7.1,-19.4 -20.7,-29.7 -36.1,-38.3 -2.9,-1.7 -5.6,-3.1 -7.8,-4.1 -4.6,-2.4 -9.3,-4.7 -14,-7.1 -48.1,-25.5 -85.7,-57.7 -111.7,-95.8 -8.8,-12.9 -14.9,-24.5 -19.2,-34 -2.2,-6.4 -2.1,-10 -0.5,-13.3 1.2,-2.5 4.4,-5.1 6.2,-6.4 8.3,-5.5 16.8,-11 22.6,-14.7 10.3,-6.7 18.5,-12 23.7,-15.6 19.8,-13.8 33.6,-28.5 42.2,-44.9 12.2,-23.1 13.7,-49.5 4.3,-74.3 -13,-34.4 -45.6,-55.8 -85,-55.8 -8.2,0 -16.5,0.9 -24.7,2.7 -2.2,0.5 -4.3,1 -6.4,1.5 0.4,-23.4 -0.2,-48.4 -2.3,-72.8 -7.4,-86 -37.5,-131.1 -68.9,-167 C 729.6,90.6 706.8,68.7 672.6,49.1 624.9,21.7 570.9,7.9 512,7.9 453.3,7.9 399.3,21.7 351.6,49 c -34.4,19.6 -57.2,41.6 -70.2,56.5 -31.4,35.9 -61.5,81 -68.9,167 -2.1,24.4 -2.6,49.4 -2.3,72.8 -2.1,-0.5 -4.3,-1 -6.4,-1.5 -8.2,-1.8 -16.6,-2.7 -24.7,-2.7 -39.4,0 -72,21.4 -85,55.8 -9.4,24.8 -7.9,51.2 4.3,74.3 8.6,16.4 22.5,31.1 42.2,44.9 5.3,3.7 13.4,9 23.7,15.6 5.6,3.6 13.7,8.9 21.7,14.2 1.2,0.8 5.5,4 7,7 1.7,3.4 1.7,7.1 -0.8,13.9 -4.2,9.3 -10.3,20.7 -18.9,33.3 -25.5,37.3 -62,68.9 -108.5,94.1 -24.7,13.1 -50.3,21.8 -61.1,51.2 -8.2,22.2 -2.8,47.5 17.9,68.8 v 0 c 6.8,7.3 15.4,13.8 26.2,19.8 25.4,14 47,20.9 64,25.6 3,0.9 9.9,3.1 12.9,5.8 7.6,6.6 6.5,16.6 16.6,31.2 6.1,9.1 13.1,15.3 18.9,19.3 21.1,14.6 44.9,15.5 70.1,16.5 22.7,0.9 48.5,1.9 77.9,11.6 12.2,4 24.9,11.8 39.5,20.8 35.2,21.7 83.5,51.3 164.2,51.3 80.8,0 129.3,-29.8 164.8,-51.5 14.6,-8.9 27.2,-16.7 39,-20.6 29.4,-9.7 55.2,-10.7 77.9,-11.6 25.2,-1 48.9,-1.9 70.1,-16.5 6.6,-4.6 15,-12.1 21.6,-23.5 7.2,-12.3 7.1,-21 13.9,-26.9 2.8,-2.4 8.9,-4.5 12.2,-5.5 17.1,-4.7 39,-11.6 64.9,-25.9 11.5,-6.3 20.4,-13.2 27.5,-21.1 0.1,-0.1 0.2,-0.2 0.3,-0.3 19.3,-21 24.2,-45.5 16.2,-67.2 z M 948.6,784 c -43.8,24.2 -72.9,21.6 -95.5,36.1 -19.2,12.4 -7.9,39.1 -21.8,48.7 -17.2,11.9 -67.9,-0.8 -133.4,20.8 -54,17.9 -88.5,69.2 -185.8,69.2 -97.5,0 -131,-51.1 -185.8,-69.2 C 260.8,868 210,880.7 192.9,868.8 179,859.2 190.3,832.5 171.1,820.1 148.5,805.5 119.4,808.1 75.6,784 47.7,768.6 63.5,759.1 72.8,754.6 c 158.6,-76.7 183.8,-195.3 185,-204.2 1.4,-10.6 2.9,-19 -8.8,-29.9 -11.3,-10.5 -61.6,-41.6 -75.5,-51.3 -23.1,-16.1 -33.2,-32.2 -25.7,-52 5.2,-13.7 18,-18.8 31.5,-18.8 4.2,0 8.5,0.5 12.6,1.4 25.3,5.5 49.9,18.2 64.1,21.6 2,0.5 3.7,0.7 5.2,0.7 7.6,0 10.2,-3.8 9.7,-12.5 -1.6,-27.7 -5.6,-81.7 -1.2,-132.2 6,-69.4 28.4,-103.8 55,-134.3 12.8,-14.6 72.8,-78 187.5,-78 115,0 174.7,63.4 187.5,78 26.6,30.4 49,64.8 55,134.3 4.4,50.5 0.6,104.5 -1.2,132.2 -0.6,9.1 2.2,12.5 9.7,12.5 1.5,0 3.3,-0.2 5.2,-0.7 14.2,-3.4 38.8,-16.1 64.1,-21.6 4.1,-0.9 8.4,-1.4 12.6,-1.4 13.5,0 26.3,5.2 31.5,18.8 7.5,19.8 -2.7,35.9 -25.7,52 -13.9,9.7 -64.2,40.8 -75.5,51.3 -11.7,10.8 -10.2,19.2 -8.8,29.9 1.1,8.9 26.4,127.5 185,204.2 9,4.5 24.9,14 -3,29.4 z" style="fill:#000000" />
        </g>
      </g>
    `,
    color: "#FFFC00",
    viewBox: "0 0 78.845833 78.845833"
  },
  portfolio: {
    path: "M117.606,385.2a36.884,36.884,0,1,0,36.884,36.884A36.926,36.926,0,0,0,117.606,385.2Zm33.846,35.383H136.366a48.681,48.681,0,0,0-3.047-16.068,36.786,36.786,0,0,0,8.781-5.808A33.752,33.752,0,0,1,151.452,420.586Zm-32.346-31.072a36.534,36.534,0,0,1,6.069,6.387,39.467,39.467,0,0,1,4.176,7.028,33.843,33.843,0,0,1-10.245,2.061Zm3.534-.935a33.762,33.762,0,0,1,17.292,8.051,33.809,33.809,0,0,1-7.772,5.116A41.252,41.252,0,0,0,122.64,388.579ZM110.19,395.9a36.615,36.615,0,0,1,5.916-6.261v15.35a33.789,33.789,0,0,1-10.116-2.013A39.5,39.5,0,0,1,110.19,395.9Zm-7.013,5.906a33.8,33.8,0,0,1-7.9-5.177,33.757,33.757,0,0,1,17.469-8.074A41.244,41.244,0,0,0,103.177,401.807Zm12.929,6.183v12.6H102a45.607,45.607,0,0,1,2.835-14.838A36.83,36.83,0,0,0,116.106,407.99Zm0,15.6v12.386a36.8,36.8,0,0,0-11.018,2.146A42.373,42.373,0,0,1,102,423.587Zm0,15.386v15.252a47.106,47.106,0,0,1-9.792-13.361A33.819,33.819,0,0,1,116.106,438.973Zm-2.86,16.708a33.755,33.755,0,0,1-18.084-8.24,33.786,33.786,0,0,1,8.306-5.426A48.955,48.955,0,0,0,113.246,455.681Zm5.86-1.313v-15.4a33.8,33.8,0,0,1,9.922,1.94A47.081,47.081,0,0,1,119.106,454.368Zm12.762-12.294a33.846,33.846,0,0,1,8.182,5.367,33.759,33.759,0,0,1-17.909,8.217A48.888,48.888,0,0,0,131.868,442.074Zm-12.762-6.1V423.587h14.257a42.352,42.352,0,0,1-3.106,14.582A36.818,36.818,0,0,0,119.106,435.973Zm0-15.386v-12.6a36.806,36.806,0,0,0,11.4-2.291,45.562,45.562,0,0,1,2.854,14.888ZM93.112,398.711a36.8,36.8,0,0,0,8.91,5.871A48.7,48.7,0,0,0,99,420.587H83.76A33.757,33.757,0,0,1,93.112,398.711ZM83.76,423.587H99a45.675,45.675,0,0,0,3.256,15.683A36.807,36.807,0,0,0,93,445.35,33.755,33.755,0,0,1,83.76,423.587Zm58.447,21.764a36.8,36.8,0,0,0-9.122-6.022,45.69,45.69,0,0,0,3.279-15.742h15.088A33.759,33.759,0,0,1,142.207,445.351Z",
    color: "#0070f3",
    viewBox: "0 0 73.768 73.768",
    transform: "translate(-80.722 -385.203)"
  },
};

function darkenColor(hex: string, amount: number = 20): string {
  const usePound = hex.startsWith("#");
  hex = usePound ? hex.slice(1) : hex;
  const num = parseInt(hex, 16);

  let r = Math.max(0, (num >> 16) - amount);
  let g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  let b = Math.max(0, (num & 0x0000ff) - amount);

  return (usePound ? "#" : "") +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');
}

export function generateSocialBadgeSVG(platform: string, value: string): string {
  const icon = SOCIAL_ICONS[platform.toLowerCase()] || { path: "", color: "#333333" };
  const label = platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase();
  const gradId = `grad_${platform.toLowerCase()}`;

  // Calculate widths 
  const labelWidth = Math.max(label.length * 8.5, 45);
  const iconZoneWidth = 36;
  const totalWidth = iconZoneWidth + labelWidth + 12;
  const rx = 6;
  const clipId = `clip_${platform.toLowerCase()}`;

  // Dynamic icon scaling
  let iconScale = 0.66;
  let centeringTransform = "translate(-12, -12)";

  if (icon.viewBox) {
    const [vbX, vbY, vbW, vbH] = icon.viewBox.split(" ").map(Number);
    iconScale = 18 / Math.max(vbW, vbH);
    // Center the custom viewBox icon locally at (0,0)
    centeringTransform = `translate(${-vbX - vbW / 2}, ${-vbY - vbH / 2})`;
  }

  return `
    <svg width="${totalWidth}" height="32" viewBox="0 0 ${totalWidth} 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .icon-bg { 
          fill: #ffffff; 
          fill-opacity: 1; 
        }
        @media (prefers-color-scheme: dark) {
          .icon-bg { 
            fill-opacity: 0.3; 
          }
        }
      </style>
      <defs>
        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${icon.color || "#333"}" />
          <stop offset="100%" stop-color="${darkenColor(icon.color || "#333", 20)}" />
        </linearGradient>
        <clipPath id="${clipId}">
          <rect width="${totalWidth}" height="32" rx="${rx}"/>
        </clipPath>
        ${icon.extraDefs || ""}
      </defs>
      
      <!-- Clipped Background Layers -->
      <g clip-path="url(#${clipId})">
        <rect class="icon-bg" width="${iconZoneWidth}" height="32"/>
        <rect x="${iconZoneWidth}" width="${totalWidth - iconZoneWidth}" height="32" fill="url(#${gradId})"/>
      </g>
      
      <!-- Whole Badge Border -->
      <rect x="0.75" y="0.75" width="${totalWidth - 1.5}" height="30.5" rx="${rx - 0.75}" stroke="${icon.color || "#333"}" stroke-width="1.5" fill="none"/>
      
      <!-- Icon Zone (Centered) -->
        <g transform="translate(18, 16)">
          <g transform="scale(${iconScale})">
            <g transform="${icon.transform || ""}">
              <g transform="${centeringTransform}">
                ${icon.body 
                  ? icon.body 
                  : icon.paths
                    ? icon.paths.map(p => `
                        <path d="${p.d}" fill="${p.color || icon.color}" 
                              ${p.fillRule ? `fill-rule="${p.fillRule}"` : 'fill-rule="nonzero"'} 
                              ${p.clipRule ? `clip-rule="${p.clipRule}"` : ""} />`).join("")
                    : `<path d="${icon.path}" fill="${icon.color || "#333"}" fill-rule="${icon.fillRule || "nonzero"}" />`
                }
              </g>
            </g>
          </g>
        </g>
      
      <!-- Label (White on Brand Color) -->
      <text x="${iconZoneWidth + 8}" y="21" fill="white" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="14" font-weight="600">${label}</text>
    </svg>
  `.trim();
}

const REPO_ICONS: Record<string, { path: string; color: string }> = {
  stars: {
    path: "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z",
    color: "#e3b341", // Star Gold
  },
  forks: {
    path: "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z",
    color: "#2da44e", // GitHub Green
  },
  license: {
    path: "M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9ZM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13ZM3 5.75A.75.75 0 0 1 3.75 5h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 5.75Zm0 2A.75.75 0 0 1 3.75 7h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 7.75Zm0 2A.75.75 0 0 1 3.75 9h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 3 9.75Z",
    color: "#0969da", // GitHub Blue
  },
  launch: {
    path: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 8.75a9.64 9.64 0 0 0 1.35 3.48c.12.19.24.37.37.54a6.507 6.507 0 0 1-4.14-4.02Zm0-1.5H3a6.507 6.507 0 0 1 4.14-4.02 9.64 9.64 0 0 0-1.35 3.48c-.12.19-.24.37-.37.54Zm1.5 0c.12-.17.23-.35.34-.54a7.92 7.92 0 0 1 .41-2.36 7.92 7.92 0 0 1 .41 2.36c.11.19.22.37.34.54H7.28Zm0 1.5h1.44c-.12.17-.23.35-.34.54a7.92 7.92 0 0 1-.41 2.36 7.92 7.92 0 0 1-.41-2.36 7.92 7.92 0 0 1-.34-.54Zm1.5 0h2.72a6.507 6.507 0 0 1-4.14 4.02 9.64 9.64 0 0 0 1.35-3.48c.12-.19.24-.37.37-.54Zm0-1.5c-.12-.17-.24-.35-.37-.54a9.64 9.64 0 0 0-1.35-3.48A6.507 6.507 0 0 1 13 7.25h-2.72Zm-1.85-5.59A7.904 7.904 0 0 1 8 1.5a7.904 7.904 0 0 1 1.07.16c-.05.1-.11.23-.17.38a9.44 9.44 0 0 0-.17 3.71h-1.46a9.44 9.44 0 0 0-.17-3.71c-.06-.15-.12-.28-.17-.38ZM8 14.5a7.904 7.904 0 0 1-1.07-.16c.05-.1.11-.23.17-.38a9.44 9.44 0 0 0 .17-3.71h1.46a9.44 9.44 0 0 0 .17 3.71c.06.15.12.28.17.38a7.904 7.904 0 0 1-1.07.16Z",
    color: "#2da44e", // GitHub Green
  }
};

export function generateRepoBadgeSVG(type: string, value: string): string {
  const icon = REPO_ICONS[type.toLowerCase()] || REPO_ICONS.stars;
  const isLaunch = type.toLowerCase() === 'launch';
  const label = isLaunch ? value : `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`;
  const gradId = `grad_repo_${type.toLowerCase()}`;
  const clipId = `clip_repo_${type.toLowerCase()}`;

  // Calculate widths 
  const labelWidth = Math.max(label.length * 9, 60);
  const iconZoneWidth = isLaunch ? 0 : 36;
  const totalWidth = isLaunch ? labelWidth + 32 : iconZoneWidth + labelWidth + 12;
  const rx = 6;

  return `
    <svg width="${totalWidth}" height="32" viewBox="0 0 ${totalWidth} 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .icon-bg { fill: #ffffff; fill-opacity: 1; }
        @media (prefers-color-scheme: dark) { .icon-bg { fill-opacity: 0.3; } }
      </style>
      <defs>
        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${icon.color}" />
          <stop offset="100%" stop-color="${darkenColor(icon.color, 25)}" />
        </linearGradient>
        <clipPath id="${clipId}">
          <rect width="${totalWidth}" height="32" rx="${rx}"/>
        </clipPath>
      </defs>
      
      <g clip-path="url(#${clipId})">
        ${isLaunch 
          ? `<rect width="${totalWidth}" height="32" fill="url(#${gradId})"/>`
          : `
            <rect class="icon-bg" width="${iconZoneWidth}" height="32"/>
            <rect x="${iconZoneWidth}" width="${totalWidth - iconZoneWidth}" height="32" fill="url(#${gradId})"/>
          `
        }
      </g>
      
      <rect x="0.75" y="0.75" width="${totalWidth - 1.5}" height="30.5" rx="${rx - 0.75}" stroke="${isLaunch ? 'rgba(255,255,255,0.2)' : icon.color}" stroke-width="1.5" fill="none"/>
      
      ${isLaunch 
        ? `<text x="${totalWidth / 2}" y="21" fill="white" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="14" font-weight="700" letter-spacing="0.2" text-anchor="middle">${label}</text>`
        : `
          <g transform="translate(18, 16) scale(1.2)">
            <path d="${icon.path}" fill="${icon.color}" transform="translate(-8, -8)" />
          </g>
          <text x="${iconZoneWidth + 8}" y="21" fill="white" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="14" font-weight="600">${label}</text>
        `
      }
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

export function generateTechBadgeSVG(name: string, color: string, iconContent: string): string {
  const label = name;
  const labelWidth = Math.max(label.length * 8.5, 45);
  const totalWidth = 32 + labelWidth + 10;

  let processedIcon = "";
  if (iconContent && iconContent.includes("<svg")) {
    const viewBoxMatch = iconContent.match(/viewBox=["']([^"']*)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 128 128";

    const innerContent = iconContent
      .replace(/^[\s\S]*?<svg[^>]*?>/, "")
      .replace(/<\/svg>[\s\S]*?$/, "")
      .trim();

    processedIcon = `
      <svg width="36" height="36" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
        ${innerContent}
      </svg>
    `;
  }

  return `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        ${processedIcon || `<rect width="36" height="36" fill="${color || "#333333"}" opacity="0.1" rx="6"/>`}
      </g>
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
      ${paths.map((d) => `<path d="${d}" stroke="#7d8590" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`).join("")}
    </svg>
  `.trim();
}

export function generateFactBadgeSVG(type: string, label: string, value: string, theme: "light" | "dark" = "dark"): string {
  const content = `${label}: ${value}`;
  const labelWidth = Math.max(content.length * 8.2, 50);
  const iconZoneWidth = 32;
  const totalWidth = iconZoneWidth + labelWidth + 16;
  const rx = 6;
  
  const isLight = theme === "light";
  const bgColor = isLight ? "#ffffff" : "#0d1117";
  const borderColor = isLight ? "#d0d7de" : "#30363d";
  const textColor = isLight ? "#24292f" : "#e6edf3";
  const mutedColor = isLight ? "#656d76" : "#7d8590";
  const iconStroke = isLight ? "#0969da" : "#58a6ff";

  const paths = FACT_ICONS[type.toLowerCase()] || FACT_ICONS.location;

  return `
    <svg width="${totalWidth}" height="36" viewBox="0 0 ${totalWidth} 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${totalWidth}" height="36" rx="${rx}" fill="${bgColor}" />
      
      <!-- Icon Zone -->
      <g transform="translate(8, 8) scale(0.83)">
        ${paths.map((d) => `<path d="${d}" stroke="${iconStroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />`).join("")}
      </g>
      
      <!-- Content Text -->
      <text x="${iconZoneWidth + 6}" y="22" fill="${textColor}" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="13" font-weight="400">
        <tspan fill="${mutedColor}" font-weight="600">${label}:</tspan> ${value}
      </text>
    </svg>
  `.trim();
}


