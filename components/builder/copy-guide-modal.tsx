"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch, ClipboardPaste } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface CopyGuideModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

const STEPS = [
  {
    number: 1,
    icon: ExternalLink,
    title: "Go to your profile repo",
    getDescription: (username: string) =>
      `Visit github.com/${username || "username"}/${username || "username"}`,
  },
  {
    number: 2,
    icon: GitBranch,
    title: "Edit README.md",
    getDescription: () => "Click the pencil icon to edit the file",
  },
  {
    number: 3,
    icon: ClipboardPaste,
    title: "Paste & Commit",
    getDescription: () => "Replace the content, then commit changes",
  },
];

export function CopyGuideModal({ open, onClose, username }: CopyGuideModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-[calc(100%-2rem)] max-w-[440px] glass-card p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-gh-green/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gh-blue/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gh-muted text-gh-text-muted hover:text-gh-text transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gh-green/10 flex items-center justify-center mx-auto mb-4 border border-gh-green/20 rotate-3 transform transition-transform hover:rotate-0">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-gh-text tracking-tight">
                Markdown Copied!
              </h3>
              <p className="text-sm text-gh-text-muted mt-2 max-w-[280px] mx-auto">
                Follow these simple steps to update your GitHub profile README.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 relative z-10">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gh-bg/40 border border-gh-border/40 hover:bg-gh-bg/60 hover:border-gh-border/60 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gh-muted border border-gh-border text-gh-text flex items-center justify-center shrink-0 text-sm font-bold shadow-sm transition-transform group-hover:scale-110 group-hover:bg-gh-green group-hover:text-white group-hover:border-gh-green">
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-sm font-semibold text-gh-text group-hover:text-gh-green transition-colors">
                        {step.title}
                      </p>
                      <p className="text-xs text-gh-text-muted mt-1 leading-relaxed">
                        {step.getDescription(username)}
                      </p>
                    </div>
                    <Icon className="w-4 h-4 text-gh-text-subtle shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-gh-green transition-all" />
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            {username && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10"
              >
                <a
                  href={`https://github.com/${username}/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gh-green text-white dark:text-gh-bg text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(40,167,69,0.2)]"
                >
                  Open Your Profile Repo
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

