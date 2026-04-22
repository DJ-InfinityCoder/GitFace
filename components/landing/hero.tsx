"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { GithubIcon } from "@/components/ui/github-icon";

const PHRASES = [
  "Your GitHub profile. Reimagined.",
  "Stand out from the crowd.",
  "Build it in 60 seconds.",
];



export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const type = useCallback(() => {
    const currentPhrase = PHRASES[phraseIndex];
    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        setTimeout(
          () => setDisplayText(currentPhrase.slice(0, displayText.length + 1)),
          60
        );
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        setTimeout(() => setDisplayText(displayText.slice(0, -1)), 30);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    }
  }, [displayText, isDeleting, phraseIndex]);

  useEffect(() => {
    const timer = setTimeout(type, 10);
    return () => clearTimeout(timer);
  }, [type]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center overflow-hidden">

      {/* ── dot-grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── gradient orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gh-green/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[350px] bg-blue-500/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>


      {/* ── logo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="flex flex-col items-center mb-7"
      >
        <Logo size={72} />
      </motion.div>

      {/* ── typewriter headline ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mb-5"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-gh-text min-h-[1.3em] font-fira tracking-tight leading-tight">
          <span>{displayText}</span>
          <span className="typewriter-cursor ml-0.5 opacity-70">&nbsp;</span>
        </h1>
      </motion.div>

      {/* ── subtitle ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.34 }}
        className="text-base sm:text-lg text-gh-text-muted max-w-[480px] leading-relaxed mb-10"
      >
        The fastest way to create a stunning GitHub profile README.
        Drag, drop, customize, and copy — all in one place.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center gap-3 mb-14"
      >
        <Link
          href="/builder"
          id="cta-build-readme"
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg
            bg-gh-green text-white dark:text-gh-bg font-bold text-base
            hover:opacity-90 active:scale-[0.98] transition-all
            shadow-[0_0_24px_rgba(var(--gh-green-rgb),0.35)]
            hover:shadow-[0_0_36px_rgba(var(--gh-green-rgb),0.5)]"
        >
          Build Your README
          <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="https://github.com/DJ-InfinityCoder/GitFace"
          target="_blank"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg
            border border-white/10 bg-white/4 text-gh-text-muted text-base font-medium
            hover:bg-white/8 hover:text-gh-text hover:border-white/18
            active:scale-[0.98] transition-all backdrop-blur-sm"
        >
          <GithubIcon className="w-4 h-4" />
          View Source
        </Link>
      </motion.div>

    </section>
  );
}