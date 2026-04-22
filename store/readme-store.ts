import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SectionItem {
  id: string;
  label: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: string;
  badge: string;
}

export interface ReadmeState {
  // Profile
  name: string;
  tagline: string;
  bio: string;
  githubUsername: string;

  // Quick Facts
  basedIn: string;
  portfolioUrl: string;
  contactEmail: string;
  workingOn: string;
  learning: string;
  collaboratingOn: string;
  anythingElse: string;

  // GitHub API data (fetched)
  avatarUrl: string;
  followers: number;
  publicRepos: number;
  githubBio: string;

  // Tech stack
  techStack: TechStackItem[];

  // GitHub stats toggles
  showStats: boolean;
  showStreak: boolean;
  showTopLangs: boolean;
  showTrophies: boolean;
  showHighlights: boolean;
  showPulse: boolean;
  showMonthlyPulse: boolean;
  showYearlyPulse: boolean;
  showOSS: boolean;
  showActivity: boolean;
  showPersona: boolean;

  // Socials
  twitter: string;
  linkedin: string;
  portfolio: string;
  youtube: string;
  discord: string;
  instagram: string;
  facebook: string;
  stackoverflow: string;
  devto: string;
  medium: string;
  hashnode: string;
  twitch: string;
  codepen: string;
  leetcode: string;
  reddit: string;
  pinterest: string;
  threads: string;
  bluesky: string;
  mastodon: string;
  kaggle: string;
  hackerrank: string;
  codewars: string;
  codeforces: string;
  geeksforgeeks: string;
  topcoder: string;
  codechef: string;
  codestudio: string;
  interviewbit: string;
  atcoder: string;
  exercism: string;
  tryhackme: string;
  substack: string;
  ghost: string;
  writeas: string;
  tiktok: string;
  telegram: string;
  whatsapp: string;
  signal: string;
  snapchat: string;

  // Extras
  showVisitorBadge: boolean;
  customMarkdown: string;

  // Section order & visibility
  sections: SectionItem[];

  // Preview settings
  previewTheme: "light" | "dark";
  previewMode: "desktop" | "mobile";
}

export interface ReadmeActions {
  setField: <K extends keyof ReadmeState>(key: K, value: ReadmeState[K]) => void;
  reorderSections: (activeId: string, overId: string) => void;
  addTech: (tech: TechStackItem) => void;
  removeTech: (name: string) => void;
  setTechStack: (techStack: TechStackItem[]) => void;
  reset: () => void;
  setGitHubData: (data: {
    avatarUrl: string;
    followers: number;
    publicRepos: number;
    githubBio: string;
  }) => void;
  clearGitHubData: () => void;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { id: "profile", label: "About Me" },
  { id: "techStack", label: "Tech Stack" },
  { id: "githubStats", label: "GitHub Stats" },
  { id: "socials", label: "Social Links" },
  { id: "extras", label: "Extras" },
];

export const useReadmeStore = create<ReadmeState & ReadmeActions>()(
  persist(
    (set) => ({
      // Initial state
      name: "",
      tagline: "",
      bio: "",
      githubUsername: "",

      basedIn: "",
      portfolioUrl: "",
      contactEmail: "",
      workingOn: "",
      learning: "",
      collaboratingOn: "",
      anythingElse: "",

      avatarUrl: "",
      followers: 0,
      publicRepos: 0,
      githubBio: "",

      techStack: [],

      showStats: true,
      showStreak: true,
      showTopLangs: true,
      showTrophies: true,
      showHighlights: true,
      showPulse: true,
      showMonthlyPulse: true,
      showYearlyPulse: true,
      showOSS: true,
      showActivity: true,
      showPersona: true,

      twitter: "",
      linkedin: "",
      portfolio: "",
      youtube: "",
      discord: "",
      instagram: "",
      facebook: "",
      stackoverflow: "",
      devto: "",
      medium: "",
      hashnode: "",
      twitch: "",
      codepen: "",
      leetcode: "",
      reddit: "",
      pinterest: "",
      threads: "",
      bluesky: "",
      mastodon: "",
      kaggle: "",
      hackerrank: "",
      codewars: "",
      codeforces: "",
      geeksforgeeks: "",
      topcoder: "",
      codechef: "",
      codestudio: "",
      interviewbit: "",
      atcoder: "",
      exercism: "",
      tryhackme: "",
      substack: "",
      ghost: "",
      writeas: "",
      tiktok: "",
      telegram: "",
      whatsapp: "",
      signal: "",
      snapchat: "",

      showVisitorBadge: true,
      customMarkdown: "",

      sections: DEFAULT_SECTIONS,

      previewTheme: "light",
      previewMode: "desktop",

      // Actions
      setField: (key, value) =>
        set((state) => ({ ...state, [key]: value })),

      reorderSections: (activeId, overId) =>
        set((state) => {
          const oldIndex = state.sections.findIndex((s) => s.id === activeId);
          const newIndex = state.sections.findIndex((s) => s.id === overId);
          if (oldIndex === -1 || newIndex === -1) return state;

          const newSections = [...state.sections];
          const [removed] = newSections.splice(oldIndex, 1);
          newSections.splice(newIndex, 0, removed);
          return { sections: newSections };
        }),

      addTech: (tech) =>
        set((state) => {
          if (state.techStack.some((t) => t.name === tech.name)) return state;
          return { techStack: [...state.techStack, tech] };
        }),

      removeTech: (name) =>
        set((state) => ({
          techStack: state.techStack.filter((t) => t.name !== name),
        })),
      setTechStack: (techStack) => set({ techStack }),
      reset: () => {
        localStorage.removeItem("gitface-readme-config");
        set({
          name: "",
          tagline: "",
          bio: "",
          githubUsername: "",
          basedIn: "",
          portfolioUrl: "",
          contactEmail: "",
          workingOn: "",
          learning: "",
          collaboratingOn: "",
          anythingElse: "",
          avatarUrl: "",
          followers: 0,
          publicRepos: 0,
          githubBio: "",
          techStack: [],
          showStats: true,
          showStreak: true,
          showTopLangs: true,
          showTrophies: true,
          showHighlights: true,
          showPulse: true,
          showMonthlyPulse: true,
          showYearlyPulse: true,
          showOSS: true,
          showActivity: true,
          showPersona: true,
          showVisitorBadge: true,
          customMarkdown: "",
          sections: DEFAULT_SECTIONS,
          previewTheme: "light",
          previewMode: "desktop",
        });
      },

      setGitHubData: (data) =>
        set(() => ({
          avatarUrl: data.avatarUrl,
          followers: data.followers,
          publicRepos: data.publicRepos,
          githubBio: data.githubBio,
        })),

      clearGitHubData: () =>
        set((state) => ({
          ...state,
          avatarUrl: "",
          followers: 0,
          publicRepos: 0,
          githubBio: "",
        })),
    }),
    {
      name: "gitface-readme-config",
    }
  )
);
