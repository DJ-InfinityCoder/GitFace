"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch, ClipboardPaste } from "lucide-react";

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
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass-card p-6"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded hover:bg-gh-muted text-gh-text-muted hover:text-gh-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gh-green/15 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-lg font-bold text-gh-text">
                Markdown Copied!
              </h3>
              <p className="text-sm text-gh-text-muted mt-1">
                Now paste it into your GitHub profile README
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                    className="flex items-start gap-3 p-3 rounded bg-gh-bg/50 border border-gh-border/50"
                  >
                    <div className="w-7 h-7 rounded-full bg-gh-green/15 text-gh-green flex items-center justify-center shrink-0 text-xs font-bold">
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gh-text">
                        {step.title}
                      </p>
                      <p className="text-xs text-gh-text-muted mt-0.5">
                        {step.getDescription(username)}
                      </p>
                    </div>
                    <Icon className="w-4 h-4 text-gh-text-subtle shrink-0 mt-0.5" />
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            {username && (
              <a
                href={`https://github.com/${username}/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-gh-green text-white dark:text-gh-bg text-sm font-semibold hover:opacity-90 transition-colors"
              >
                Open Profile Repo
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
