"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useReadmeStore } from "@/store/readme-store";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser } from "@/lib/github-api";
import { GitBranch, Users, Search, Eye } from "lucide-react";

export function ProfileSection() {
  const {
    name,
    tagline,
    bio,
    githubUsername,
    avatarUrl,
    followers,
    publicRepos,
    basedIn,
    portfolioUrl,
    contactEmail,
    workingOn,
    learning,
    collaboratingOn,
    anythingElse,
    showVisitorBadge,
    setField,
    setGitHubData,
    clearGitHubData,
  } = useReadmeStore();

  const [debouncedUsername, setDebouncedUsername] = useState(githubUsername);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleUsernameChange = useCallback(
    (value: string) => {
      setField("githubUsername", value);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDebouncedUsername(value);
      }, 600);
    },
    [setField]
  );

  const { data: ghUser, isLoading } = useQuery({
    queryKey: ["github-user", debouncedUsername],
    queryFn: () => fetchGitHubUser(debouncedUsername),
    enabled: debouncedUsername.length > 0,
  });

  useEffect(() => {
    if (ghUser) {
      setGitHubData({
        avatarUrl: ghUser.avatar_url,
        followers: ghUser.followers,
        publicRepos: ghUser.public_repos,
        githubBio: ghUser.bio || "",
      });
    } else if (!isLoading && debouncedUsername) {
      clearGitHubData();
    }
  }, [ghUser, isLoading, debouncedUsername, setGitHubData, clearGitHubData]);

  return (
    <div className="space-y-4">
      {/* GitHub Username */}
      <div>
        <label className="block text-sm font-medium text-gh-text-muted mb-1.5">
          GitHub Username
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gh-text-subtle" />
          <input
            id="profile-github-username"
            type="text"
            value={githubUsername}
            onChange={(e) => handleUsernameChange(e.target.value)}
            placeholder="octocat"
            className="w-full pl-10 pr-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all"
          />
        </div>
      </div>

      {/* GitHub User Card */}
      {(isLoading || avatarUrl) && (
        <div className="mt-3 p-4 rounded border border-gh-border bg-gh-bg/50">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 shimmer" />
                <div className="h-3 w-48 shimmer" />
              </div>
            </div>
          ) : (
            avatarUrl && (
              <div className="flex items-center gap-3">
                <img
                  src={avatarUrl}
                  alt="GitHub Avatar"
                  className="w-12 h-12 rounded-full border-2 border-gh-green/30"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gh-text truncate">
                    {githubUsername}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gh-text-muted">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {followers} followers
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {publicRepos} repos
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gh-text-muted mb-1.5">
          Display Name
        </label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="John Doe"
          className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all"
        />
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-sm font-medium text-gh-text-muted mb-1.5">
          Tagline
        </label>
        <input
          id="profile-tagline"
          type="text"
          value={tagline}
          onChange={(e) => setField("tagline", e.target.value)}
          placeholder="A passionate full-stack developer from India"
          className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gh-text-muted mb-1.5">
          Bio
        </label>
        <textarea
          id="profile-bio"
          value={bio}
          onChange={(e) => setField("bio", e.target.value)}
          placeholder="Tell the world about yourself..."
          rows={3}
          className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all resize-none"
        />
      </div>

      <div className="pt-4 border-t border-gh-border/50 space-y-4">
        <h3 className="text-sm font-semibold text-gh-text">Quick Facts</h3>
        
        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gh-text-muted mb-1.5">Location</label>
            <input type="text" value={basedIn} onChange={(e) => setField("basedIn", e.target.value)} placeholder="New York, USA" className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gh-text-muted mb-1.5">Portfolio URL</label>
            <input type="text" value={portfolioUrl} onChange={(e) => setField("portfolioUrl", e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gh-text-muted mb-1.5">Contact Email</label>
            <input type="email" value={contactEmail} onChange={(e) => setField("contactEmail", e.target.value)} placeholder="me@example.com" className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gh-text-muted mb-1.5">Working on</label>
            <input type="text" value={workingOn} onChange={(e) => setField("workingOn", e.target.value)} placeholder="a new SaaS project" className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gh-text-muted mb-1.5">Learning</label>
            <input type="text" value={learning} onChange={(e) => setField("learning", e.target.value)} placeholder="Web3 & Rust" className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gh-text-muted mb-1.5">Collaborating on</label>
            <input type="text" value={collaboratingOn} onChange={(e) => setField("collaboratingOn", e.target.value)} placeholder="open source libraries" className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gh-text-muted mb-1.5">Anything else</label>
            <input type="text" value={anythingElse} onChange={(e) => setField("anythingElse", e.target.value)} placeholder="Fun fact: I love pizza!" className="w-full px-3 py-2 bg-gh-bg border border-gh-border rounded text-sm text-gh-text placeholder-gh-text-subtle focus:border-gh-green focus:ring-1 focus:ring-gh-green/30 outline-none transition-all" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gh-border/50 space-y-4">
        <h3 className="text-sm font-semibold text-gh-text">Profile Options</h3>
        <button
          onClick={() => setField("showVisitorBadge", !showVisitorBadge)}
          className={`w-full flex items-center gap-3 p-3 rounded border text-left transition-all ${
            showVisitorBadge
              ? "bg-gh-green/5 border-gh-green/30"
              : "bg-gh-bg border-gh-border hover:border-gh-text-subtle"
          }`}
        >
          <div
            className={`w-9 h-9 rounded flex items-center justify-center shrink-0 transition-colors ${
              showVisitorBadge
                ? "bg-gh-green/15 text-gh-green"
                : "bg-gh-muted text-gh-text-subtle"
            }`}
          >
            <Eye className="w-4.5 h-4.5" />
          </div>
          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                showVisitorBadge ? "text-gh-text" : "text-gh-text-muted"
              }`}
            >
              Visitor Counter Badge
            </p>
            <p className="text-xs text-gh-text-subtle">Real-time Total & Unique visitor tracking</p>
          </div>
          <div
            className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${
              showVisitorBadge ? "bg-gh-green" : "bg-gh-border"
            }`}
          >
            <div
              className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform shadow-sm ${
                showVisitorBadge ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
