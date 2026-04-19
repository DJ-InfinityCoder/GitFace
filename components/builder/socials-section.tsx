"use client";

import { useReadmeStore, type ReadmeState } from "@/store/readme-store";
import { 
  AtSign, Link2, Globe, Video, MessageCircle, 
  Camera, Square, Tv, Code, 
  HelpCircle, BookOpen, PenTool, Pencil, Code2, Palette, Send,
  Orbit, Cloud, MessageSquare, Pin, BarChart, Terminal, Sword, Gamepad, Gamepad2
} from "lucide-react";

const SOCIAL_FIELDS = [
  // Professional & Branding
  {
    key: "twitter" as const,
    label: "Twitter / X",
    icon: Send,
    placeholder: "username",
    prefix: "@",
    category: "Professional & Branding",
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    icon: Link2,
    placeholder: "in/username",
    prefix: "",
    category: "Professional & Branding",
  },
  {
    key: "portfolio" as const,
    label: "Portfolio",
    icon: Globe,
    placeholder: "https://your-site.com",
    prefix: "",
    category: "Professional & Branding",
  },
  
  // Developer Profiles
  {
    key: "stackoverflow" as const,
    label: "Stack Overflow",
    icon: HelpCircle,
    placeholder: "user-id",
    prefix: "",
    category: "Development",
  },
  {
    key: "leetcode" as const,
    label: "LeetCode",
    icon: Code2,
    placeholder: "username",
    prefix: "",
    category: "Development",
  },
  {
    key: "codepen" as const,
    label: "CodePen",
    icon: Code,
    placeholder: "username",
    prefix: "",
    category: "Development",
  },
  {
    key: "devto" as const,
    label: "Dev.to",
    icon: BookOpen,
    placeholder: "username",
    prefix: "",
    category: "Development",
  },
  {
    key: "hashnode" as const,
    label: "Hashnode",
    icon: Pencil,
    placeholder: "username",
    prefix: "@",
    category: "Development",
  },
  {
    key: "medium" as const,
    label: "Medium",
    icon: PenTool,
    placeholder: "@username",
    prefix: "",
    category: "Development",
  },

  // Research & Competitive
  {
    key: "kaggle" as const,
    label: "Kaggle",
    icon: BarChart,
    placeholder: "username",
    prefix: "",
    category: "Research & Competitive",
  },
  {
    key: "hackerrank" as const,
    label: "HackerRank",
    icon: Terminal,
    placeholder: "username",
    prefix: "",
    category: "Research & Competitive",
  },
  {
    key: "codewars" as const,
    label: "CodeWars",
    icon: Sword,
    placeholder: "username",
    prefix: "",
    category: "Research & Competitive",
  },
  
  // Content & Community
  {
    key: "youtube" as const,
    label: "YouTube",
    icon: Video,
    placeholder: "channel-name",
    prefix: "@",
    category: "Community & Content",
  },
  {
    key: "discord" as const,
    label: "Discord",
    icon: MessageCircle,
    placeholder: "server-invite-code",
    prefix: "",
    category: "Community & Content",
  },
  {
    key: "reddit" as const,
    label: "Reddit",
    icon: MessageSquare,
    placeholder: "username",
    prefix: "u/",
    category: "Community & Content",
  },
  {
    key: "threads" as const,
    label: "Threads",
    icon: Orbit,
    placeholder: "username",
    prefix: "@",
    category: "Community & Content",
  },
  {
    key: "bluesky" as const,
    label: "BlueSky",
    icon: Cloud,
    placeholder: "username.bsky.social",
    prefix: "",
    category: "Community & Content",
  },
  {
    key: "mastodon" as const,
    label: "Mastodon",
    icon: AtSign,
    placeholder: "https://mastodon.social/@user",
    prefix: "",
    category: "Community & Content",
  },
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: Camera,
    placeholder: "username",
    prefix: "@",
    category: "Community & Content",
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: Square,
    placeholder: "username",
    prefix: "",
    category: "Community & Content",
  },
  {
    key: "pinterest" as const,
    label: "Pinterest",
    icon: Pin,
    placeholder: "username",
    prefix: "",
    category: "Community & Content",
  },
  {
    key: "twitch" as const,
    label: "Twitch",
    icon: Tv,
    placeholder: "username",
    prefix: "",
    category: "Community & Content",
  },

  // Gaming
  {
    key: "steam" as const,
    label: "Steam",
    icon: Gamepad2,
    placeholder: "username",
    prefix: "",
    category: "Gaming",
  },
  {
    key: "playstation" as const,
    label: "PlayStation",
    icon: Gamepad,
    placeholder: "psn_id",
    prefix: "",
    category: "Gaming",
  },
  {
    key: "xbox" as const,
    label: "Xbox",
    icon: Gamepad,
    placeholder: "gamertag",
    prefix: "",
    category: "Gaming",
  },
  
  // Design & Creative
  {
    key: "behance" as const,
    label: "Behance",
    icon: Palette,
    placeholder: "username",
    prefix: "",
    category: "Creative",
  },
  {
    key: "dribbble" as const,
    label: "Dribbble",
    icon: Globe,
    placeholder: "username",
    prefix: "",
    category: "Creative",
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
