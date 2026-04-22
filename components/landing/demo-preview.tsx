"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const MOCK_LINES = [
  '<h1 align="center">Hi 👋, I\'m Sarah Chen</h1>',
  "",
  '<h3 align="center">Full-stack developer who loves open source</h3>',
  "",
  "## Tech Stack",
  "",
  "![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)",
  "",
  "## GitHub Stats",
  "",
  "![Stats](https://github-readme-stats.vercel.app/api?username=sarahchen&show_icons=true&theme=github_dark)",
];

export function DemoPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= MOCK_LINES.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gh-green/10 text-gh-green text-xs font-semibold mb-4 border border-gh-green/20">
            DEMO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gh-text mb-4">
            Watch it build itself
          </h2>
          <p className="text-gh-text-muted max-w-lg mx-auto">
            See how your README comes together — line by line, in real-time
          </p>
        </motion.div>

        {/* Demo window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gh-border/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gh-danger/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-gh-green/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded bg-gh-bg/80 text-xs text-gh-text-subtle font-mono">
                README.md
              </div>
            </div>
          </div>

          {/* Code area */}
          <div className="p-6 bg-gh-bg font-fira text-sm leading-relaxed min-h-[320px] transition-colors">
            {MOCK_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <span className="text-gh-text-subtle w-8 text-right mr-4 select-none shrink-0">
                  {i + 1}
                </span>
                <span
                  className={`${
                    line.startsWith("#")
                      ? "text-red-400 dark:text-[#ff7b72]"
                      : line.startsWith("![") || line.startsWith("<")
                      ? "text-blue-500 dark:text-[#79c0ff]"
                      : line.startsWith("**")
                      ? "text-purple-500 dark:text-[#d2a8ff]"
                      : "text-gh-text"
                  }`}
                >
                  {line || "\u00A0"}
                </span>
              </motion.div>
            ))}

            {/* Blinking cursor */}
            {visibleLines < MOCK_LINES.length && isInView && (
              <div className="flex">
                <span className="text-gh-text-subtle w-8 text-right mr-4 select-none">
                  {visibleLines + 1}
                </span>
                <span className="typewriter-cursor">&nbsp;</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
