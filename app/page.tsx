"use client";

import { Hero } from "@/components/landing/hero";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { Logo } from "@/components/ui/logo";
import { GithubIcon } from "@/components/ui/github-icon";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
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
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/DJ-InfinityCoder/GitFace"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded hover:bg-gh-muted text-gh-text-muted hover:text-gh-text transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero />
    </div>
  );
}
