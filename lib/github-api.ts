async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, options);
      return res;
    } catch (err) {
      if (attempt === retries - 1) throw err;
      // Exponential backoff: 500ms, 1s, 2s
      await new Promise(r => setTimeout(r, 500 * Math.pow(2, attempt)));
    }
  }
  throw new Error("fetchWithRetry: exhausted retries");
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export async function fetchGitHubUser(
  username: string
): Promise<GitHubUser | null> {
  if (!username.trim()) return null;

  const res = await fetch(`https://api.github.com/users/${username.trim()}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return {
    login: data.login,
    avatar_url: data.avatar_url,
    html_url: data.html_url,
    name: data.name,
    bio: data.bio,
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  };
}

export async function fetchGitHubStats(username: string) {
  if (!username.trim()) return null;
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set in environment variables");
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(first: 100, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            stargazerCount
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
        }
        issues { totalCount }
        prs_raised: pullRequests { totalCount }
        prs_merged: pullRequests(states: [MERGED]) { totalCount }
        prs_open: pullRequests(states: [OPEN]) { totalCount }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 }
  });

  if (!res.ok) return null;
  const { data } = await res.json();
  if (!data?.user) return null;

  const user = data.user;
  let totalStars = 0;
  
  // Correct Language Aggregation
  const languagesMap: Record<string, number> = {};
  let totalBytes = 0;

  user.repositories.nodes.forEach((repo: any) => {
    totalStars += repo.stargazerCount || 0;
    
    repo.languages.edges.forEach((edge: any) => {
      const name = edge.node.name;
      const size = edge.size;
      languagesMap[name] = (languagesMap[name] || 0) + size;
      totalBytes += size; // Denominator for percentage
    });
  });

  // Calculate percentage correctly
  const topLanguages = Object.entries(languagesMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6) // Get top 6
    .map(([name, size]) => ({
      name,
      count: size, // Byte size
      percentage: totalBytes > 0 ? parseFloat(((size / totalBytes) * 100).toFixed(2)) : 0
    }));

  return {
    totalStars,
    totalPRs: user.prs_raised.totalCount,
    prsMerged: user.prs_merged.totalCount,
    prsOpen: user.prs_open.totalCount,
    totalIssues: user.issues.totalCount,
    totalCommits: user.contributionsCollection.totalCommitContributions + user.contributionsCollection.restrictedContributionsCount,
    repoCount: user.repositories.nodes.length,
    topLanguages, // Now contains correct percentage
    totalBytes
  };
}

export async function fetchGitHubStreak(username: string) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set in environment variables");
  }

  // 1. Fetch User Creation Date
  const userRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query($username: String!) { user(login: $username) { createdAt } }`,
      variables: { username },
    }),
  });
  
  const userData = await userRes.json();
  const createdAt = userData.data?.user?.createdAt;
  if (!createdAt) return null;

  const startYear = new Date(createdAt).getFullYear();
  const currentYear = new Date().getFullYear();
  
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  
  const yearResults = await Promise.all(years.map(async (year) => {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;
    
    try {
      const annualRes = await fetchWithRetry("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                  contributionCalendar { totalContributions }
                }
              }
            }
          `,
          variables: { username, from, to },
        }),
      });
      if (annualRes.ok) {
        const annualData = await annualRes.json();
        return annualData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;
      }
    } catch (err) {
      console.error(`Error fetching streak for year ${year}:`, err);
    }
    return 0;
  }));

  const totalContributions = yearResults.reduce((sum, count) => sum + count, 0);

  // 3. Fetch All Contribution Days for Streak Calculation
  // Note: For very old accounts, you might need to fetch multiple years of days.
  // For standard streaks, the last year (default) is usually what's shown.
  const calendarRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
      variables: { username },
    }),
  });

  const calendarData = await calendarRes.json();
  const days = calendarData.data.user.contributionsCollection.contributionCalendar.weeks.flatMap((w: any) => w.contributionDays);
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // --- STREAK CALCULATIONS ---
  
  let longestStreak = 0;
  let lStart = "";
  let lEnd = "";
  
  let currentStreak = 0;
  let cStart = "";
  let cEnd = "";

  let tempStreak = 0;
  let tempStart = "";

  days.forEach((day: any, index: number) => {
    if (day.contributionCount > 0) {
      if (tempStreak === 0) tempStart = day.date;
      tempStreak++;
    } else {
      // If we hit a 0-count day, check if the streak we just ended is the longest
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        lStart = tempStart;
        lEnd = days[index - 1].date;
      }
      tempStreak = 0;
    }
  });

  // Final check for the last streak in the array
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
    lStart = tempStart;
    lEnd = days[days.length - 1].date;
  }

  // Determine Current Streak
  const reversedDays = [...days].reverse();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // If no contribution today OR yesterday, the current streak is broken (0)
  const lastDay = reversedDays[0];
  const secondLastDay = reversedDays[1];

  if (lastDay.contributionCount > 0 || (lastDay.date === today && secondLastDay.contributionCount > 0)) {
     // Work backwards to find current streak length
     for (const day of reversedDays) {
       if (day.contributionCount > 0) {
         if (currentStreak === 0) cEnd = day.date;
         currentStreak++;
         cStart = day.date;
       } else if (day.date === today) {
         continue; // Ignore today if no contributions yet
       } else {
         break;
       }
     }
  }

  return {
    totalContributions,
    currentStreak,
    longestStreak,
    currentRange: currentStreak > 0 ? `${formatDate(cStart)} - ${formatDate(cEnd)}` : "No active streak",
    longestRange: longestStreak > 0 ? `${formatDate(lStart)} - ${formatDate(lEnd)}` : "No streaks yet",
    totalRange: `${formatDate(createdAt)} - Present`,
  };
}

export async function fetchAdvancedGitHubStats(username: string, options: { includeFullHistory?: boolean } = { includeFullHistory: true }) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set in environment variables");
  }

  // 1. Get user creation date, OSS count, and top repos
  const userQuery = `query($username: String!) { user(login: $username) { createdAt repositoriesContributedTo(first: 1, contributionTypes: [PULL_REQUEST, COMMIT, ISSUE]) { totalCount } repositories(first: 3, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC, isFork: false) { nodes { name stargazerCount forkCount description primaryLanguage { name color } } } } }`;
  const userRes = await fetchWithRetry("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: userQuery, variables: { username } }),
    cache: "no-store"
  });

  if (!userRes.ok) return null;
  const { data: userData } = await userRes.json();
  if (!userData?.user) return null;

  const createdAt = new Date(userData.user.createdAt);
  const startYear = createdAt.getFullYear();
  const currentYear = new Date().getFullYear();
  
  let allTimeContributions = 0;
  let allActivityDays: any[] = [];

  // 2. Aggregate all years (only if requested)
  if (options.includeFullHistory) {
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
    
    const yearResults = await Promise.all(years.map(async (year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;

      const yearQuery = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const yearRes = await fetchWithRetry("https://api.github.com/graphql", {
          method: "POST",
          headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
          body: JSON.stringify({ query: yearQuery, variables: { username, from, to } }),
          cache: "no-store"
        });

        if (yearRes.ok) {
          const { data } = await yearRes.json();
          return data?.user?.contributionsCollection?.contributionCalendar;
        }
      } catch (err) {
        console.error(`Error fetching year ${year}:`, err);
      }
      return null;
    }));

    for (const cal of yearResults) {
      if (cal) {
        allTimeContributions += cal.totalContributions;
        allActivityDays.push(...cal.weeks.flatMap((w: any) => w.contributionDays));
      }
    }
  }

  return {
    ossCount: userData.user.repositoriesContributedTo.totalCount,
    topRepos: userData.user.repositories.nodes,
    activityDays: allActivityDays,
    totalContributions: allTimeContributions
  };
}

export async function fetchLatestActivity(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=1`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const events = await res.json();
  if (events.length === 0) return null;

  const event = events[0];
  let action = "Active on GitHub";
  let repo = event.repo.name;

  switch (event.type) {
    case "PushEvent":
      action = `Pushed ${event.payload.size} commit(s)`;
      break;
    case "PullRequestEvent":
      action = `${event.payload.action === "opened" ? "Opened" : "Merged"} a PR`;
      break;
    case "IssuesEvent":
      action = `${event.payload.action === "opened" ? "Opened" : "Closed"} an issue`;
      break;
    case "WatchEvent":
      action = "Starred a repository";
      break;
  }

  return { action, repo, date: event.created_at };
}

export async function fetchDeveloperPersona(username: string) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set in environment variables");
  }

  // 1. Fetch recent events for time distribution
  const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    cache: "no-store"
  });

  let peakHour = 12; // Default
  if (eventsRes.ok) {
    const events = await eventsRes.json();
    const hours = events.map((e: any) => new Date(e.created_at).getHours());
    if (hours.length > 0) {
      const sum = hours.reduce((a: number, b: number) => a + b, 0);
      peakHour = Math.round(sum / hours.length);
    }
  }

  // 2. Fetch Reviews and Topics via GraphQL
  const query = `
    query($username: String!) {
      user(login: $username) {
        pullRequestReviews {
          totalCount
        }
        repositories(first: 20, isFork: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const gqlRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  let reviewsCount = 0;
  let topTopic = "Generalist";

  if (gqlRes.ok) {
    const { data } = await gqlRes.json();
    if (data?.user) {
      reviewsCount = data.user.pullRequestReviews.totalCount;
      
      const topics: Record<string, number> = {};
      data.user.repositories.nodes.forEach((repo: any) => {
        repo.repositoryTopics.nodes.forEach((t: any) => {
          const name = t.topic.name;
          topics[name] = (topics[name] || 0) + 1;
        });
      });
      
      const sortedTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]);
      if (sortedTopics.length > 0) {
        topTopic = sortedTopics[0][0];
      }
    }
  }

  return {
    peakHour,
    reviewsCount,
    topTopic
  };
}
