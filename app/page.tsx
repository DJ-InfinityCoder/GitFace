"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/landing/hero";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { Logo } from "@/components/ui/logo";
import { GithubIcon } from "@/components/ui/github-icon";
import { Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/DJ-InfinityCoder/GitFace")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gh-bg relative overflow-hidden transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gh-border/50 bg-gh-bg/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-bold text-gh-text font-fira">
              Git<span className="text-gh-green">Face</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <ThemeToggle className="!p-1.5" />
            
            {/* <a
              href="https://github.com/DJ-InfinityCoder/GitFace"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gh-muted rounded text-gh-text-muted hover:text-gh-text transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a> */}

            {/* {stats && (
              <div className="flex items-center gap-4 ml-2">
                <a
                  href="https://github.com/DJ-InfinityCoder/GitFace/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors group"
                >
                  <Star className="w-5 h-5 text-gh-text-muted group-hover:text-gh-orange transition-colors" />
                  <span className="text-sm font-semibold text-gh-text-muted group-hover:text-gh-text font-fira">
                    {stats.stars}
                  </span>
                </a>
                <a
                  href="https://github.com/DJ-InfinityCoder/GitFace/network/members"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors group"
                >
                  <GitFork className="w-5 h-5 text-gh-text-muted group-hover:text-gh-blue transition-colors" />
                  <span className="text-sm font-semibold text-gh-text-muted group-hover:text-gh-text font-fira">
                    {stats.forks}
                  </span>
                </a>
              </div>
            )} */}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero />
    </div>
  );
}
