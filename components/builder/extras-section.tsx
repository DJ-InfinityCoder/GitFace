"use client";

import { useReadmeStore } from "@/store/readme-store";
import { Eye, Code } from "lucide-react";

export function ExtrasSection() {
  const {
    customMarkdown,
    setField,
  } = useReadmeStore();

  return (
    <div className="space-y-4">
      {/* Custom Markdown */}
      <div>
        <label className="block text-sm font-medium text-gh-text-muted mb-1.5">
          <Code className="w-3.5 h-3.5 inline mr-1.5" />
          Custom Markdown Section
        </label>
        <textarea
          id="extras-custom-markdown"
          value={customMarkdown}
          onChange={(e) => setField("customMarkdown", e.target.value)}
          placeholder="Add any raw markdown here..."
          rows={5}
          className="w-full px-3 py-2.5 bg-gh-bg border border-gh-border rounded text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all resize-none font-fira text-sm leading-relaxed"
        />
      </div>
    </div>
  );
}
