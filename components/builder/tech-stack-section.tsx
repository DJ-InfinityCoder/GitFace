"use client";

import { useState, useMemo } from "react";
import { useReadmeStore } from "@/store/readme-store";
import { TECH_BADGES, CATEGORIES, type TechBadge } from "@/lib/tech-badges";
import { Search, X } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

export function TechStackSection() {
  const { techStack, addTech, removeTech } = useReadmeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const techStackCategories = useMemo(() => {
    const cats = new Set(techStack.map((t) => t.category));
    return ["All", ...Array.from(cats)].sort();
  }, [techStack]);

  const filteredSelected = useMemo(() => {
    if (selectedCategory === "All") return techStack;
    return techStack.filter((t) => t.category === selectedCategory);
  }, [techStack, selectedCategory]);

  const filteredBadges = useMemo(() => {
    let badges: TechBadge[] = TECH_BADGES;

    if (activeCategory !== "All") {
      badges = badges.filter((b) => b.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      badges = badges.filter((b) => b.name.toLowerCase().includes(q));
    }

    return badges;
  }, [searchQuery, activeCategory]);

  const isSelected = (name: string) =>
    techStack.some((t) => t.name === name);

  return (
    <div className="space-y-6">
      {/* Selected badges */}
      {techStack.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gh-text">Current Stack</h3>
            <span className="text-[10px] font-bold text-gh-green bg-gh-green/10 px-2 py-0.5 rounded-full">
              {techStack.length} selected
            </span>
          </div>

          {/* Selected Category Filters */}
          {techStackCategories.length > 2 && (
            <div className="flex flex-wrap gap-1.5 pt-1 px-1">
              {techStackCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? "bg-gh-green/15 text-gh-green border border-gh-green/30"
                      : "bg-gh-muted text-gh-text-muted border border-transparent hover:text-gh-text hover:bg-gh-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-1 px-1 min-h-[50px]">
            {filteredSelected.map((tech) => (
              <Tooltip key={tech.name} content={tech.name}>
                <div
                  className="relative group p-2 rounded bg-gh-muted border border-gh-border transition-all hover:border-gh-green/50"
                >
                  <img
                    src={tech.badge}
                    alt={tech.name}
                    className="w-8 h-8 object-contain"
                  />
                  <button
                    onClick={() => removeTech(tech.name)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gh-danger text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg hover:bg-gh-danger/80"
                    aria-label={`Remove ${tech.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="sr-only">{tech.name}</span>
                </div>
              </Tooltip>
            ))}
            
            {filteredSelected.length === 0 && (
              <p className="text-xs text-gh-text-subtle italic py-2">
                No selected items in this category.
              </p>
            )}
          </div>


        </div>
      )}

      {/* Explorer Section */}
      <div className={`${techStack.length > 0 ? "pt-5 border-t border-gh-border/50" : ""} space-y-4`}>
        <h3 className="text-sm font-semibold text-gh-text px-1">Skill Explorer</h3>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gh-text-subtle" />
          <input
            id="tech-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies..."
            className="w-full pl-10 pr-3 py-2 bg-gh-bg border border-gh-border rounded text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all text-xs"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-gh-green/15 text-gh-green border border-gh-green/30"
                  : "bg-gh-muted text-gh-text-muted border border-transparent hover:text-gh-text hover:bg-gh-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Badge grid */}
        <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredBadges.map((badge) => {
            const selected = isSelected(badge.name);
            return (
                <Tooltip key={badge.name} content={badge.name}>
                  <button
                    onClick={() => {
                      if (selected) {
                        removeTech(badge.name);
                      } else {
                        addTech({
                          name: badge.name,
                          category: badge.category,
                          badge: badge.badgeUrl,
                        });
                      }
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded border transition-all w-full ${
                      selected
                        ? "bg-gh-green/5 border-gh-green/30 text-gh-green"
                        : "bg-gh-bg border-gh-border text-gh-text-muted hover:border-gh-text-subtle hover:text-gh-text"
                    }`}
                  >
                    <img
                      src={badge.badgeUrl}
                      alt={badge.name}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="truncate text-xs font-medium">{badge.name}</span>
                  </button>
                </Tooltip>
            );
          })}
        </div>

        {filteredBadges.length === 0 && (
          <p className="text-center text-xs text-gh-text-subtle py-8">
            No matching technologies found.
          </p>
        )}
      </div>
    </div>
  );
}

