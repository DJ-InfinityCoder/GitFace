"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

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
        setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 60);
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gh-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-8"
      >
        <div className="w-10 h-10 rounded bg-gh-green/15 flex items-center justify-center border border-gh-green/20">
          <Zap className="w-5 h-5 text-gh-green" />
        </div>
        <span className="text-2xl font-bold text-gh-text font-fira">
          Git<span className="text-gh-green">Face</span>
        </span>
      </motion.div>

      {/* Typewriter text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gh-text min-h-[1.3em] font-fira tracking-tight">
          <span>{displayText}</span>
          <span className="typewriter-cursor ml-0.5">&nbsp;</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg text-gh-text-muted max-w-lg mb-10"
      >
        The fastest way to create a stunning GitHub profile README. Drag, drop,
        customize, and copy — all in one place.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link
          href="/builder"
          id="cta-build-readme"
          className="group inline-flex items-center gap-2 px-8 py-4 rounded bg-gh-green text-white dark:text-gh-bg font-bold text-lg hover:opacity-90 transition-all glow-green"
        >
          Build Your README
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-gh-border flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-gh-green" />
        </motion.div>
      </motion.div>
    </section>
  );
}
