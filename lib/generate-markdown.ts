import type { ReadmeState } from "@/store/readme-store";

export function getSectionMarkdown(state: ReadmeState, sectionId: string): string {
  const sectionGenerators: Record<string, () => string[]> = {
    profile: () => generateProfile(state),
    techStack: () => generateTechStack(state),
    githubStats: () => generateGitHubStats(state),
    socials: () => generateSocials(state),
    extras: () => generateExtras(state),
  };

  const generator = sectionGenerators[sectionId];
  if (!generator) return "";
  
  const lines = generator();
  return lines.length > 0 ? lines.join("\n") : "";
}

export function generateMarkdown(state: ReadmeState): string {
  const lines: string[] = [];

  // Generate sections in order
  for (const section of state.sections) {
    const md = getSectionMarkdown(state, section.id);
    if (md) {
      lines.push(md);
      lines.push("");
    }
  }

  return lines.join("\n").trim() + "\n";
}

function generateProfile(state: ReadmeState): string[] {
  const lines: string[] = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

  // No avatar photo — keep it clean

  // Greeting / header
  if (state.name) {
    lines.push(`<h1 align="center">Hi 👋, I'm ${state.name}</h1>`);
    lines.push("");
  }

  if (state.tagline) {
    lines.push(`<h3 align="center">${state.tagline}</h3>`);
    lines.push("");
  }

  // Bio
  if (state.bio) {
    lines.push(`<p align="center">${state.bio}</p>`);
    lines.push("");
  }

  // Monochrome icon list for facts (black/white/gray SVG icons inline)
  const factItems: { icon: string; text: string; link?: string }[] = [];

  if (state.basedIn) {
    factItems.push({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="#ccc" stroke="#333"/></svg>`,
      text: state.basedIn,
    });
  }

  if (state.portfolioUrl) {
    const displayUrl = state.portfolioUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    factItems.push({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" fill="#eee" stroke="#333"/></svg>`,
      text: displayUrl,
      link: state.portfolioUrl,
    });
  }

  if (state.contactEmail) {
    factItems.push({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" fill="#eee" stroke="#333"/><path d="m22 6-10 7L2 6" stroke="#555"/></svg>`,
      text: state.contactEmail,
      link: `mailto:${state.contactEmail}`,
    });
  }

  if (state.workingOn) {
    factItems.push({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" fill="#eee" stroke="#333"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#555"/></svg>`,
      text: `Working on **${state.workingOn}**`,
    });
  }

  if (state.learning) {
    factItems.push({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" fill="#eee" stroke="#333"/></svg>`,
      text: `Learning **${state.learning}**`,
    });
  }

  if (state.collaboratingOn) {
    factItems.push({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4" fill="#ccc" stroke="#333"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#888"/></svg>`,
      text: `Collaborating on **${state.collaboratingOn}**`,
    });
  }

  if (factItems.length > 0) {
    // Left-aligned bulleted list layout to avoid ugly table borders
    for (const item of factItems) {
      const textContent = item.link
        ? `<a href="${item.link}">${item.text}</a>`
        : item.text;
      // Wrap SVG in a single line to avoid breaking the markdown list rendering
      const inlineIcon = item.icon.replace(/\n\s*/g, " ");
      lines.push(`- ${inlineIcon} ${textContent}`);
    }
    lines.push("");
  }

  // Anything else
  if (state.anythingElse) {
    lines.push(`<p align="center">${state.anythingElse}</p>`);
    lines.push("");
  }

  // Visitor Badge
  if (state.showVisitorBadge && state.githubUsername) {
    lines.push(
      `<p align="center">\n  <img src="${baseUrl}/api/visitors/${state.githubUsername}" alt="Profile Visitors" />\n</p>`
    );
    lines.push("");
  }

  return lines;
}

function generateTechStack(state: ReadmeState): string[] {
  if (state.techStack.length === 0) return [];

  const lines: string[] = [];
  lines.push("## Tech Stack");
  lines.push("");

  // Group by category
  const categories = new Map<string, typeof state.techStack>();
  for (const tech of state.techStack) {
    const existing = categories.get(tech.category) || [];
    existing.push(tech);
    categories.set(tech.category, existing);
  }

  // Preferred order: Frontend -> Backend -> DevOps -> Tools
  const preferredOrder = ["Frontend", "Backend", "DevOps", "Tools"];
  const sortedCategories = Array.from(categories.keys()).sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);

    // If both are in preferred order, use that order
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only one is in preferred order, it comes first
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    // Otherwise, alphabetical
    return a.localeCompare(b);
  });

  for (const category of sortedCategories) {
    const techs = categories.get(category)!;
    lines.push(`**${category}:**`);
    lines.push("");
    lines.push(
      `<p>\n${techs.map((t) => `  <img src="${t.badge}" alt="${t.name}" width="40" height="40" />`).join("\n")}\n</p>`
    );
    lines.push("");
  }

  return lines;
}

function generateGitHubStats(state: ReadmeState): string[] {
  if (
    !state.githubUsername ||
    state.githubUsername.toLowerCase() === "username" ||
    (!state.showStats &&
      !state.showStreak &&
      !state.showTopLangs &&
      !state.showTrophies &&
      !state.showHighlights &&
      !state.showPulse &&
      !state.showOSS &&
      !state.showActivity &&
      !state.showPersona)
  ) {
    return [];
  }

  const username = state.githubUsername;
  const lines: string[] = [];
  lines.push("## GitHub Stats");
  lines.push("");

  // Base URL for the API (Relative for preview, absolute for production)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const theme = state.previewTheme || "dark";

  lines.push('<p align="center">');

  if (state.showStats) {
    lines.push(`  <img src="${baseUrl}/api/stats/${username}?theme=${theme}" alt="GitHub Stats" />`);
  }
  if (state.showStreak) {
    lines.push(`  <img src="${baseUrl}/api/streak/${username}?theme=${theme}" alt="GitHub Streak" />`);
  }
  if (state.showTopLangs) {
    lines.push(`  <img src="${baseUrl}/api/langs/${username}?theme=${theme}" alt="Top Languages" />`);
  }
  if (state.showTrophies) {
    lines.push(`  <img src="${baseUrl}/api/trophies/${username}?theme=${theme}" alt="GitHub Trophies" />`);
  }
  if (state.showPersona) {
    lines.push(`  <img src="${baseUrl}/api/persona/${username}?theme=${theme}" alt="Developer Persona" />`);
  }
  if (state.showHighlights) {
    lines.push(`  <img src="${baseUrl}/api/highlights/${username}?theme=${theme}" alt="Top Repositories" />`);
  }
  if (state.showPulse) {
    lines.push(`  <img src="${baseUrl}/api/pulse/${username}?theme=${theme}" alt="Productivity Pulse" />`);
  }
  if (state.showMonthlyPulse) {
    lines.push(`  <img src="${baseUrl}/api/pulse-monthly/${username}?theme=${theme}" alt="Monthly Productivity Pulse" />`);
  }
  if (state.showYearlyPulse) {
    lines.push(`  <img src="${baseUrl}/api/pulse-yearly/${username}?theme=${theme}" alt="Yearly Growth Pulse" />`);
  }
  if (state.showOSS) {
    lines.push(`  <img src="${baseUrl}/api/oss/${username}?theme=${theme}" alt="Open Source Impact" />`);
  }
  if (state.showActivity) {
    lines.push(`  <img src="${baseUrl}/api/activity/${username}?theme=${theme}" alt="Profile Pulse" />`);
  }

  lines.push("</p>");
  lines.push("");

  return lines;
}

function generateSocials(state: ReadmeState): string[] {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const categories: Record<string, string[]> = {
    "Professional & Branding": [],
    "Development": [],
    "Research & Competitive": [],
    "Community & Content": [],
    "Gaming": [],
    "Creative": [],
  };

  const addBadge = (cat: keyof typeof categories, platform: string, value: string, link: string) => {
    categories[cat].push(`<a href="${link}" target="_blank"><img src="${baseUrl}/api/social-badge?platform=${platform}&value=${encodeURIComponent(value)}" alt="${platform}" /></a>`);
  };

  // 1. Professional
  if (state.twitter) addBadge("Professional & Branding", "Twitter", state.twitter, state.twitter.startsWith("http") ? state.twitter : `https://x.com/${state.twitter}`);
  if (state.linkedin) addBadge("Professional & Branding", "LinkedIn", state.linkedin, state.linkedin.startsWith("http") ? state.linkedin : `https://linkedin.com/in/${state.linkedin}`);
  if (state.portfolio) addBadge("Professional & Branding", "Portfolio", state.portfolio, state.portfolio.startsWith("http") ? state.portfolio : `https://${state.portfolio}`);

  // 2. Development
  if (state.stackoverflow) addBadge("Development", "StackOverflow", state.stackoverflow, state.stackoverflow.startsWith("http") ? state.stackoverflow : `https://stackoverflow.com/users/${state.stackoverflow}`);
  if (state.devto) addBadge("Development", "DevTo", state.devto, state.devto.startsWith("http") ? state.devto : `https://dev.to/${state.devto}`);
  if (state.medium) addBadge("Development", "Medium", state.medium, state.medium.startsWith("http") ? state.medium : `https://medium.com/${state.medium.startsWith("@") ? "" : "@"}${state.medium}`);
  if (state.hashnode) addBadge("Development", "Hashnode", state.hashnode, state.hashnode.startsWith("http") ? state.hashnode : `https://hashnode.com/@${state.hashnode}`);
  if (state.leetcode) addBadge("Development", "LeetCode", state.leetcode, state.leetcode.startsWith("http") ? state.leetcode : `https://leetcode.com/${state.leetcode}`);
  if (state.codepen) addBadge("Development", "CodePen", state.codepen, state.codepen.startsWith("http") ? state.codepen : `https://codepen.io/${state.codepen}`);

  // 3. Research/Competitive
  if (state.kaggle) addBadge("Research & Competitive", "Kaggle", state.kaggle, state.kaggle.startsWith("http") ? state.kaggle : `https://kaggle.com/${state.kaggle}`);
  if (state.hackerrank) addBadge("Research & Competitive", "HackerRank", state.hackerrank, state.hackerrank.startsWith("http") ? state.hackerrank : `https://hackerrank.com/${state.hackerrank}`);
  if (state.codewars) addBadge("Research & Competitive", "CodeWars", state.codewars, state.codewars.startsWith("http") ? state.codewars : `https://codewars.com/users/${state.codewars}`);

  // 4. Community
  if (state.youtube) addBadge("Community & Content", "YouTube", state.youtube, state.youtube.startsWith("http") ? state.youtube : `https://youtube.com/@${state.youtube}`);
  if (state.discord) addBadge("Community & Content", "Discord", state.discord, state.discord.startsWith("http") ? state.discord : `https://discord.gg/${state.discord}`);
  if (state.twitch) addBadge("Community & Content", "Twitch", state.twitch, state.twitch.startsWith("http") ? state.twitch : `https://twitch.tv/${state.twitch}`);
  if (state.instagram) addBadge("Community & Content", "Instagram", state.instagram, state.instagram.startsWith("http") ? state.instagram : `https://instagram.com/${state.instagram}`);
  if (state.facebook) addBadge("Community & Content", "Facebook", state.facebook, state.facebook.startsWith("http") ? state.facebook : `https://facebook.com/${state.facebook}`);
  if (state.reddit) addBadge("Community & Content", "Reddit", state.reddit, state.reddit.startsWith("http") ? state.reddit : `https://reddit.com/user/${state.reddit}`);
  if (state.pinterest) addBadge("Community & Content", "Pinterest", state.pinterest, state.pinterest.startsWith("http") ? state.pinterest : `https://pinterest.com/${state.pinterest}`);
  if (state.threads) addBadge("Community & Content", "Threads", state.threads, state.threads.startsWith("http") ? state.threads : `https://threads.net/@${state.threads}`);
  if (state.bluesky) addBadge("Community & Content", "BlueSky", state.bluesky, state.bluesky.startsWith("http") ? state.bluesky : `https://bsky.app/profile/${state.bluesky}`);
  if (state.mastodon) addBadge("Community & Content", "Mastodon", state.mastodon, state.mastodon.startsWith("http") ? state.mastodon : state.mastodon);

  // 5. Gaming
  if (state.steam) addBadge("Gaming", "Steam", state.steam, state.steam.startsWith("http") ? state.steam : `https://steamcommunity.com/id/${state.steam}`);
  if (state.playstation) addBadge("Gaming", "PlayStation", state.playstation, `https://psnprofiles.com/${state.playstation}`);
  if (state.xbox) addBadge("Gaming", "Xbox", state.xbox, `https://xboxgamertag.com/search/${state.xbox}`);

  // 6. Creative
  if (state.behance) addBadge("Creative", "Behance", state.behance, state.behance.startsWith("http") ? state.behance : `https://behance.net/${state.behance}`);
  if (state.dribbble) addBadge("Creative", "Dribbble", state.dribbble, state.dribbble.startsWith("http") ? state.dribbble : `https://dribbble.com/${state.dribbble}`);

  const activeCategories = Object.entries(categories).filter(([_, badges]) => badges.length > 0);
  if (activeCategories.length === 0) return [];

  const lines: string[] = [];
  lines.push("## Connect with me");
  lines.push("");

  activeCategories.forEach(([name, badges], index) => {
    lines.push(`<p align="center">`);
    lines.push(`<strong>${name}</strong><br/>`);
    lines.push(badges.join(" "));
    lines.push(`</p>`);

    if (index < activeCategories.length - 1) {
      lines.push(`<p align="center">`);
      lines.push(`  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />`); // Hypothetical divider? No, I'll use a simple text one.
      lines.push(`</p>`);
    }
  });

  return lines;
}


function generateExtras(state: ReadmeState): string[] {
  const lines: string[] = [];

  if (state.customMarkdown.trim()) {
    lines.push(state.customMarkdown.trim());
    lines.push("");
  }

  return lines;
}
