"use client";

import { useReadmeStore } from "@/store/readme-store";
import { BarChart3, Flame, Code2, Trophy, Star, Activity, Globe, Zap, User } from "lucide-react";

const STAT_CARDS = [
  {
    id: "showStats" as const,
    label: "GitHub Stats",
    description: "Commits, PRs, issues, and contributions",
    icon: BarChart3,
  },
  {
    id: "showStreak" as const,
    label: "Streak Stats",
    description: "Current streak and total contributions",
    icon: Flame,
  },
  {
    id: "showTopLangs" as const,
    label: "Top Languages",
    description: "Most used programming languages",
    icon: Code2,
  },
  {
    id: "showTrophies" as const,
    label: "Achievements",
    description: "Your custom medals and milestones",
    icon: Trophy,
  },
  {
    id: "showPersona" as const,
    label: "Developer Persona",
    description: "Your coding personality, habits, and role",
    icon: User,
  },
  {
    id: "showHighlights" as const,
    label: "Repo Highlights",
    description: "Spotlight on your top 3 projects",
    icon: Star,
  },
  {
    id: "showPulse" as const,
    label: "Weekly Productivity Pulse",
    description: "Visualize your weekly contribution flow",
    icon: Activity,
  },
  {
    id: "showMonthlyPulse" as const,
    label: "Monthly Productivity Pulse",
    description: "Analyze your seasonal coding patterns",
    icon: BarChart3,
  },
  {
    id: "showYearlyPulse" as const,
    label: "Yearly Productivity Pulse",
    description: "Track your historical growth and milestones",
    icon: BarChart3,
  },
  {
    id: "showOSS" as const,
    label: "OSS Impact",
    description: "Highlight your community contributions",
    icon: Globe,
  },
  {
    id: "showActivity" as const,
    label: "Profile Pulse",
    description: "Your latest live action on GitHub",
    icon: Zap,
  },
];

export function StatsSection() {
  const store = useReadmeStore();

  const groups = [
    {
      title: "Core Statistics",
      ids: ["showStats", "showStreak", "showTopLangs", "showTrophies"],
    },
    {
      title: "Productivity Metrics",
      ids: ["showPulse", "showMonthlyPulse", "showYearlyPulse"],
    },
    {
      title: "Developer Insights",
      ids: ["showPersona", "showOSS"],
    },
    {
      title: "Showcase & Highlights",
      ids: ["showHighlights", "showActivity"],
    },
  ];

  return (
    <div className="space-y-6">
      {groups.map((group, groupIndex) => (
        <div 
          key={group.title} 
          className={`${groupIndex > 0 ? "pt-5 border-t border-gh-border/50" : ""} space-y-4`}
        >
          <h3 className="text-sm font-semibold text-gh-text px-1">{group.title}</h3>
          
          <div className="space-y-2">
            {group.ids.map((id) => {
              const card = STAT_CARDS.find((c) => c.id === id);
              if (!card) return null;
              
              const enabled = store[card.id as keyof typeof store] as boolean;
              const Icon = card.icon;

              return (
                <button
                  key={card.id}
                  onClick={() => store.setField(card.id as any, !enabled)}
                  className={`w-full flex items-center gap-3 p-3 rounded border text-left transition-all ${
                    enabled
                      ? "bg-gh-green/5 border-gh-green/30"
                      : "bg-gh-bg border-gh-border hover:border-gh-text-subtle"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded flex items-center justify-center shrink-0 transition-colors ${
                      enabled
                        ? "bg-gh-green/15 text-gh-green"
                        : "bg-gh-muted text-gh-text-subtle"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium transition-colors ${
                        enabled ? "text-gh-text" : "text-gh-text-muted"
                      }`}
                    >
                      {card.label}
                    </p>
                    <p className="text-xs text-gh-text-subtle truncate">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${
                      enabled ? "bg-gh-green" : "bg-gh-border"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform shadow-sm ${
                        enabled ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
