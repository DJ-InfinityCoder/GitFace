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

  const factItems: { type: string; label: string; text: string; link?: string }[] = [];

  if (state.basedIn) {
    factItems.push({
      type: "location",
      label: "Location",
      text: state.basedIn,
    });
  }

  if (state.portfolioUrl) {
    const displayUrl = state.portfolioUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    factItems.push({
      type: "portfolio",
      label: "Portfolio",
      text: displayUrl,
      link: state.portfolioUrl,
    });
  }

  if (state.contactEmail) {
    factItems.push({
      type: "mail",
      label: "Email",
      text: state.contactEmail,
      link: `mailto:${state.contactEmail}`,
    });
  }

  if (state.workingOn) {
    factItems.push({
      type: "working",
      label: "Working on",
      text: `<b>${state.workingOn}</b>`,
    });
  }

  if (state.learning) {
    factItems.push({
      type: "learning",
      label: "Learning",
      text: `<b>${state.learning}</b>`,
    });
  }

  if (state.collaboratingOn) {
    factItems.push({
      type: "collab",
      label: "Collaborating on",
      text: `<b>${state.collaboratingOn}</b>`,
    });
  }

  if (factItems.length > 0) {
    lines.push("### Quick Facts");
    lines.push("");
    lines.push('<div align="center">');
    lines.push("");
    lines.push('  <table width="100%">');
    for (const item of factItems) {
      const textContent = item.link
        ? `<a href="${item.link}">${item.text}</a>`
        : item.text;
      
      lines.push("    <tr>");
      lines.push(`      <td align="left" nowrap><img src="${baseUrl}/api/fact-icon?type=${item.type}" width="18" height="18" alt="${item.type}" valign="middle" /> &nbsp; <b>${item.label}</b></td>`);
      lines.push(`      <td align="left">${textContent}</td>`);
      lines.push("    </tr>");
    }
    lines.push("  </table>");
    lines.push("");
    lines.push("</div>");
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

  const lines: string[] = [];
  lines.push("");
  lines.push("## Technologies I’ve worked with");
  lines.push("");

  const icons = state.techStack.map((tech) => 
    `<img src="${baseUrl}/api/tech-badge?name=${encodeURIComponent(tech.id || tech.name)}" alt="${tech.name}" title="${tech.name}" height="36" hspace="10" vspace="10" />`
  );

  lines.push(`<p align="center">`);
  lines.push(`  ${icons.join(" ")}`);
  lines.push(`</p>`);
  lines.push("");

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
  lines.push("");
  lines.push("## GitHub Insights");
  lines.push("");

  // Base URL for the API (Relative for preview, absolute for production)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const theme = state.previewTheme || "dark";

  lines.push('<p align="center">');

  if (state.showStats) {
    lines.push(`  <img src="${baseUrl}/api/stats/${username}?theme=${theme}" alt="GitHub Stats" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showStreak) {
    lines.push(`  <img src="${baseUrl}/api/streak/${username}?theme=${theme}" alt="GitHub Streak" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showTopLangs) {
    lines.push(`  <img src="${baseUrl}/api/langs/${username}?theme=${theme}" alt="Top Languages" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showTrophies) {
    lines.push(`  <img src="${baseUrl}/api/trophies/${username}?theme=${theme}" alt="GitHub Trophies" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showPersona) {
    lines.push(`  <img src="${baseUrl}/api/persona/${username}?theme=${theme}" alt="Developer Persona" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showHighlights) {
    lines.push(`  <img src="${baseUrl}/api/highlights/${username}?theme=${theme}" alt="Top Repositories" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showPulse) {
    lines.push(`  <img src="${baseUrl}/api/pulse/${username}?theme=${theme}" alt="Productivity Pulse" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showMonthlyPulse) {
    lines.push(`  <img src="${baseUrl}/api/pulse-monthly/${username}?theme=${theme}" alt="Monthly Productivity Pulse" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showYearlyPulse) {
    lines.push(`  <img src="${baseUrl}/api/pulse-yearly/${username}?theme=${theme}" alt="Yearly Growth Pulse" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showOSS) {
    lines.push(`  <img src="${baseUrl}/api/oss/${username}?theme=${theme}" alt="Open Source Impact" hspace="10" vspace="5" height="150" />`);
  }
  if (state.showActivity) {
    lines.push(`  <img src="${baseUrl}/api/activity/${username}?theme=${theme}" alt="Profile Pulse" hspace="10" vspace="5" height="150" />`);
  }

  lines.push("</p>");
  lines.push("");

  return lines;
}

function generateSocials(state: ReadmeState): string[] {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const categories: Record<string, string[]> = {
    "Professional Presence": [],
    "Coding & Challenges": [],
    "Technical Writing": [],
    "Social Media": [],
  };

  const addBadge = (cat: keyof typeof categories, platform: string, value: string, link: string) => {
    categories[cat].push(`<a href="${link}" target="_blank"><img src="${baseUrl}/api/social-badge?platform=${platform}&value=${encodeURIComponent(value)}" alt="${platform}" vspace="5" hspace="2" /></a>`);
  };

  // 1. Professional Presence
  if (state.twitter) addBadge("Professional Presence", "Twitter", state.twitter, state.twitter.startsWith("http") ? state.twitter : `https://x.com/${state.twitter}`);
  if (state.linkedin) addBadge("Professional Presence", "LinkedIn", state.linkedin, state.linkedin.startsWith("http") ? state.linkedin : `https://linkedin.com/in/${state.linkedin}`);
  if (state.portfolio) addBadge("Professional Presence", "Portfolio", state.portfolio, state.portfolio.startsWith("http") ? state.portfolio : `https://${state.portfolio.replace(/^https?:\/\//, "")}`);

  // 2. Coding & Challenges
  if (state.stackoverflow) addBadge("Coding & Challenges", "StackOverflow", state.stackoverflow, state.stackoverflow.startsWith("http") ? state.stackoverflow : `https://stackoverflow.com/users/${state.stackoverflow}`);
  if (state.leetcode) addBadge("Coding & Challenges", "LeetCode", state.leetcode, state.leetcode.startsWith("http") ? state.leetcode : `https://leetcode.com/${state.leetcode}`);
  if (state.hackerrank) addBadge("Coding & Challenges", "HackerRank", state.hackerrank, state.hackerrank.startsWith("http") ? state.hackerrank : `https://hackerrank.com/${state.hackerrank}`);
  if (state.codewars) addBadge("Coding & Challenges", "CodeWars", state.codewars, state.codewars.startsWith("http") ? state.codewars : `https://codewars.com/users/${state.codewars}`);
  if (state.kaggle) addBadge("Coding & Challenges", "Kaggle", state.kaggle, state.kaggle.startsWith("http") ? state.kaggle : `https://kaggle.com/${state.kaggle}`);
  if (state.codeforces) addBadge("Coding & Challenges", "Codeforces", state.codeforces, state.codeforces.startsWith("http") ? state.codeforces : `https://codeforces.com/profile/${state.codeforces}`);
  if (state.geeksforgeeks) addBadge("Coding & Challenges", "GeeksforGeeks", state.geeksforgeeks, state.geeksforgeeks.startsWith("http") ? state.geeksforgeeks : `https://geeksforgeeks.org/user/${state.geeksforgeeks}`);
  if (state.topcoder) addBadge("Coding & Challenges", "TopCoder", state.topcoder, state.topcoder.startsWith("http") ? state.topcoder : `https://topcoder.com/members/${state.topcoder}`);
  if (state.codechef) addBadge("Coding & Challenges", "CodeChef", state.codechef, state.codechef.startsWith("http") ? state.codechef : `https://codechef.com/users/${state.codechef}`);
  if (state.codestudio) addBadge("Coding & Challenges", "CodeStudio", state.codestudio, state.codestudio.startsWith("http") ? state.codestudio : `https://codingninjas.com/studio/profile/${state.codestudio}`);
  if (state.interviewbit) addBadge("Coding & Challenges", "InterviewBit", state.interviewbit, state.interviewbit.startsWith("http") ? state.interviewbit : `https://interviewbit.com/profile/${state.interviewbit}`);
  if (state.atcoder) addBadge("Coding & Challenges", "AtCoder", state.atcoder, state.atcoder.startsWith("http") ? state.atcoder : `https://atcoder.jp/users/${state.atcoder}`);
  if (state.exercism) addBadge("Coding & Challenges", "Exercism", state.exercism, state.exercism.startsWith("http") ? state.exercism : `https://exercism.org/profiles/${state.exercism}`);
  if (state.tryhackme) addBadge("Coding & Challenges", "TryHackMe", state.tryhackme, state.tryhackme.startsWith("http") ? state.tryhackme : `https://tryhackme.com/p/${state.tryhackme}`);
  if (state.codepen) addBadge("Coding & Challenges", "CodePen", state.codepen, state.codepen.startsWith("http") ? state.codepen : `https://codepen.io/${state.codepen}`);

  // 3. Technical Writing
  if (state.devto) addBadge("Technical Writing", "DevTo", state.devto, state.devto.startsWith("http") ? state.devto : `https://dev.to/${state.devto}`);
  if (state.hashnode) addBadge("Technical Writing", "Hashnode", state.hashnode, state.hashnode.startsWith("http") ? state.hashnode : `https://hashnode.com/@${state.hashnode}`);
  if (state.medium) addBadge("Technical Writing", "Medium", state.medium, state.medium.startsWith("http") ? state.medium : `https://medium.com/${state.medium.startsWith("@") ? "" : "@"}${state.medium}`);
  if (state.substack) addBadge("Technical Writing", "Substack", state.substack, state.substack.startsWith("http") ? state.substack : `https://${state.substack}.substack.com`);
  if (state.ghost) addBadge("Technical Writing", "Ghost", state.ghost, state.ghost.startsWith("http") ? state.ghost : state.ghost);
  if (state.writeas) addBadge("Technical Writing", "WriteAs", state.writeas, state.writeas.startsWith("http") ? state.writeas : `https://write.as/${state.writeas}`);

  // 4. Social Media
  if (state.youtube) addBadge("Social Media", "YouTube", state.youtube, state.youtube.startsWith("http") ? state.youtube : `https://youtube.com/@${state.youtube}`);
  if (state.discord) addBadge("Social Media", "Discord", state.discord, state.discord.startsWith("http") ? state.discord : `https://discord.gg/${state.discord}`);
  if (state.twitch) addBadge("Social Media", "Twitch", state.twitch, state.twitch.startsWith("http") ? state.twitch : `https://twitch.tv/${state.twitch}`);
  if (state.instagram) addBadge("Social Media", "Instagram", state.instagram, state.instagram.startsWith("http") ? state.instagram : `https://instagram.com/${state.instagram}`);
  if (state.facebook) addBadge("Social Media", "Facebook", state.facebook, state.facebook.startsWith("http") ? state.facebook : `https://facebook.com/${state.facebook}`);
  if (state.reddit) addBadge("Social Media", "Reddit", state.reddit, state.reddit.startsWith("http") ? state.reddit : `https://reddit.com/user/${state.reddit}`);
  if (state.pinterest) addBadge("Social Media", "Pinterest", state.pinterest, state.pinterest.startsWith("http") ? state.pinterest : `https://pinterest.com/${state.pinterest}`);
  if (state.threads) addBadge("Social Media", "Threads", state.threads, state.threads.startsWith("http") ? state.threads : `https://threads.net/@${state.threads}`);
  if (state.bluesky) addBadge("Social Media", "BlueSky", state.bluesky, state.bluesky.startsWith("http") ? state.bluesky : `https://bsky.app/profile/${state.bluesky}`);
  if (state.mastodon) addBadge("Social Media", "Mastodon", state.mastodon, state.mastodon.startsWith("http") ? state.mastodon : state.mastodon);
  if (state.tiktok) addBadge("Social Media", "TikTok", state.tiktok, state.tiktok.startsWith("http") ? state.tiktok : `https://tiktok.com/@${state.tiktok}`);
  if (state.telegram) addBadge("Social Media", "Telegram", state.telegram, state.telegram.startsWith("http") ? state.telegram : `https://t.me/${state.telegram}`);
  if (state.whatsapp) addBadge("Social Media", "WhatsApp", state.whatsapp, state.whatsapp.startsWith("http") ? state.whatsapp : `https://wa.me/${state.whatsapp}`);
  if (state.signal) addBadge("Social Media", "Signal", state.signal, state.signal.startsWith("http") ? state.signal : `https://signal.me/#p/${state.signal}`);
  if (state.snapchat) addBadge("Social Media", "Snapchat", state.snapchat, state.snapchat.startsWith("http") ? state.snapchat : `https://snapchat.com/add/${state.snapchat}`);


  const activeCategories = Object.entries(categories).filter(([_, badges]) => badges.length > 0);
  if (activeCategories.length === 0) return [];

  const lines: string[] = [];
  lines.push("");
  lines.push("## Connect with me");
  lines.push("");

  activeCategories.forEach(([name, badges]) => {
    lines.push(`<p>`);
    lines.push(`  <b>${name}:</b> <br />`);
    lines.push(`  ${badges.join(" ")}`);
    lines.push(`</p>`);
    lines.push("");
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
