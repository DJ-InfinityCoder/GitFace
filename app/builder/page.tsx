"use client";

import { useState, useEffect } from "react";
import { useReadmeStore } from "@/store/readme-store";
import { SectionsList } from "@/components/builder/sections-list";
import { PreviewPanel } from "@/components/builder/preview-panel";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BuilderPage() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gh-bg transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!hasHydrated ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gh-bg"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <Zap className="w-12 h-12 text-gh-green" />
                <motion.div 
                  className="absolute inset-0 bg-gh-green/20 blur-xl rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h2 className="text-xl font-bold text-gh-text font-fira tracking-tight">
                Git<span className="text-gh-green">Face</span>
              </h2>
            </motion.div>
            <p className="text-sm text-gh-text-subtle mt-8 flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Syncing with local storage...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-screen"
          >
            {/* Top bar */}
            <header className="sticky top-0 z-40 border-b border-gh-border bg-gh-bg/80 backdrop-blur-md transition-colors">
              <div className="flex items-center justify-between px-4 lg:px-6 py-3">
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-gh-text-muted hover:text-gh-text transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">Back</span>
                  </Link>
                  <div className="w-px h-5 bg-gh-border" />
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gh-green" />
                    <h1 className="text-sm font-bold text-gh-text font-fira">
                      Git<span className="text-gh-green">Face</span>
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-gh-text-subtle hidden md:block">
                    Changes update the preview instantly
                  </p>
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Two-panel layout */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              {/* Left Panel — Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full lg:w-[42%] xl:w-[38%] 2xl:w-[34%] overflow-y-auto border-r border-gh-border/50 transition-colors"
              >
                <div className="p-4 lg:p-6 space-y-1">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gh-text">
                      Build Your README
                    </h2>
                    <p className="text-sm text-gh-text-muted mt-1">
                      Drag sections to reorder • Toggle to show/hide
                    </p>
                  </div>
                  <SectionsList />
                </div>
              </motion.div>

              {/* Right Panel — Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                className="flex-1 bg-gh-surface/30 overflow-hidden transition-colors"
              >
                <PreviewPanel />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
