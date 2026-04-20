"use client";

import { useReadmeStore, type ReadmeState } from "@/store/readme-store";
import { 
  AtSign, Link2, Globe, Video, MessageCircle, 
  Camera, Square, Tv, Code, 
  HelpCircle, BookOpen, PenTool, Pencil, Code2, Palette, Send,
  Orbit, Cloud, MessageSquare, Pin, BarChart, Terminal, Sword, Gamepad, Gamepad2,
  Monitor,
  CheckSquare,
  Hash,
  Dumbbell,
  Shield,
  Newspaper,
  Ghost,
  Type,
  Music,
  Trophy
} from "lucide-react";

const SOCIAL_FIELDS = [
  // Professional Presence
  {
    key: "twitter" as const,
    label: "Twitter / X",
    icon: Send,
    placeholder: "username",
    prefix: "@",
    category: "Professional Presence",
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    icon: Link2,
    placeholder: "in/username",
    prefix: "",
    category: "Professional Presence",
  },
  {
    key: "portfolio" as const,
    label: "Portfolio",
    icon: Globe,
    placeholder: "https://your-site.com",
    prefix: "",
    category: "Professional Presence",
  },
  
  // Coding & Challenges
  {
    key: "stackoverflow" as const,
    label: "Stack Overflow",
    icon: HelpCircle,
    placeholder: "user-id",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "leetcode" as const,
    label: "LeetCode",
    icon: Code2,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "hackerrank" as const,
    label: "HackerRank",
    icon: Terminal,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "codewars" as const,
    label: "CodeWars",
    icon: Sword,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "kaggle" as const,
    label: "Kaggle",
    icon: BarChart,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "codeforces" as const,
    label: "Codeforces",
    icon: Code,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "geeksforgeeks" as const,
    label: "GeeksforGeeks",
    icon: BookOpen,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "topcoder" as const,
    label: "TopCoder",
    icon: Trophy,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "codechef" as const,
    label: "CodeChef",
    icon: Code2,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "codestudio" as const,
    label: "CodeStudio",
    icon: Monitor,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "interviewbit" as const,
    label: "InterviewBit",
    icon: CheckSquare,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "atcoder" as const,
    label: "AtCoder",
    icon: Hash,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "exercism" as const,
    label: "Exercism",
    icon: Dumbbell,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "tryhackme" as const,
    label: "TryHackMe",
    icon: Shield,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },
  {
    key: "codepen" as const,
    label: "CodePen",
    icon: Code,
    placeholder: "username",
    prefix: "",
    category: "Coding & Challenges",
  },

  // Technical Writing
  {
    key: "devto" as const,
    label: "Dev.to",
    icon: BookOpen,
    placeholder: "username",
    prefix: "",
    category: "Technical Writing",
  },
  {
    key: "hashnode" as const,
    label: "Hashnode",
    icon: Pencil,
    placeholder: "username",
    prefix: "@",
    category: "Technical Writing",
  },
  {
    key: "medium" as const,
    label: "Medium",
    icon: PenTool,
    placeholder: "@username",
    prefix: "",
    category: "Technical Writing",
  },
  {
    key: "substack" as const,
    label: "Substack",
    icon: Newspaper,
    placeholder: "username",
    prefix: "",
    category: "Technical Writing",
  },
  {
    key: "ghost" as const,
    label: "Ghost",
    icon: Ghost,
    placeholder: "https://your-blog.com",
    prefix: "",
    category: "Technical Writing",
  },
  {
    key: "writeas" as const,
    label: "Write.as",
    icon: Type,
    placeholder: "username",
    prefix: "",
    category: "Technical Writing",
  },

  // Social Media
  {
    key: "youtube" as const,
    label: "YouTube",
    icon: Video,
    placeholder: "channel-name",
    prefix: "@",
    category: "Social Media",
  },
  {
    key: "discord" as const,
    label: "Discord",
    icon: MessageCircle,
    placeholder: "server-invite-code",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "reddit" as const,
    label: "Reddit",
    icon: MessageSquare,
    placeholder: "username",
    prefix: "u/",
    category: "Social Media",
  },
  {
    key: "threads" as const,
    label: "Threads",
    icon: Orbit,
    placeholder: "username",
    prefix: "@",
    category: "Social Media",
  },
  {
    key: "bluesky" as const,
    label: "BlueSky",
    icon: Cloud,
    placeholder: "username.bsky.social",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "mastodon" as const,
    label: "Mastodon",
    icon: AtSign,
    placeholder: "https://mastodon.social/@user",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: Camera,
    placeholder: "username",
    prefix: "@",
    category: "Social Media",
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: Square,
    placeholder: "username",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "pinterest" as const,
    label: "Pinterest",
    icon: Pin,
    placeholder: "username",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "twitch" as const,
    label: "Twitch",
    icon: Tv,
    placeholder: "username",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "tiktok" as const,
    label: "TikTok",
    icon: Music,
    placeholder: "username",
    prefix: "@",
    category: "Social Media",
  },
  {
    key: "telegram" as const,
    label: "Telegram",
    icon: Send,
    placeholder: "username",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "whatsapp" as const,
    label: "WhatsApp",
    icon: MessageCircle,
    placeholder: "phone-number",
    prefix: "+",
    category: "Social Media",
  },
  {
    key: "signal" as const,
    label: "Signal",
    icon: MessageSquare,
    placeholder: "phone-number",
    prefix: "",
    category: "Social Media",
  },
  {
    key: "snapchat" as const,
    label: "Snapchat",
    icon: Ghost,
    placeholder: "username",
    prefix: "",
    category: "Social Media",
  },

];

export function SocialsSection() {
  const store = useReadmeStore();

  // Group fields by category
  const categories = SOCIAL_FIELDS.reduce((acc, field) => {
    if (!acc[field.category]) acc[field.category] = [];
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, typeof SOCIAL_FIELDS>);

  return (
    <div className="space-y-6">
      {Object.entries(categories).map(([category, fields], index) => (
        <div key={category} className={`${index > 0 ? "pt-4 border-t border-gh-border/50" : ""} space-y-4`}>
          <h3 className="text-sm font-semibold text-gh-text">{category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => {
              const Icon = field.icon;
              const value = store[field.key as keyof ReadmeState] as string;

              return (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gh-text-muted mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center gap-1.5 text-gh-text-subtle">
                      <Icon className="w-4 h-4" />
                      {field.prefix && (
                        <span className="text-[10px] font-mono">{field.prefix}</span>
                      )}
                    </div>
                    <input
                      id={`social-${field.key}`}
                      type="text"
                      value={value}
                      onChange={(e) => store.setField(field.key as any, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full ${
                        field.prefix ? "pl-12" : "pl-10"
                      } pr-3 py-2 bg-gh-bg border border-gh-border rounded text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all text-xs`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
