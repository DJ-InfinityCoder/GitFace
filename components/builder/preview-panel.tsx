"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useReadmeStore } from "@/store/readme-store";
import { generateMarkdown } from "@/lib/generate-markdown";
import confetti from "canvas-confetti";
import {
  Copy,
  Download,
  Check,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Eye,
  Code2,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { CopyGuideModal } from "./copy-guide-modal";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function PreviewPanel() {
  const { previewTheme, previewMode, githubUsername, setField, reset } = useReadmeStore();
  
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
  const [markdown, setMarkdown] = useState("");
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const syncedTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleClearCache = useCallback(() => {
    reset();
  }, [reset]);

  // Subscribe to the whole store but only for markdown generation
  useEffect(() => {
    const generate = () => {
      const state = useReadmeStore.getState();
      const newMarkdown = generateMarkdown(state);
      setMarkdown(newMarkdown);
      // Show "synced" checkmark briefly, then go back to idle
      setSyncStatus("synced");
      if (syncedTimerRef.current) clearTimeout(syncedTimerRef.current);
      syncedTimerRef.current = setTimeout(() => setSyncStatus("idle"), 2000);
    };

    // Initial generate
    generate();

    // Subscribe to store changes
    const unsubscribe = useReadmeStore.subscribe((state, prevState) => {
      // Robust check: compare all fields except ephemeral UI state
      const ignoredKeys = ["previewMode"]; // previewTheme IS included because it affects SVG URLs
      
      const contentChanged = Object.keys(state).some(key => {
        if (ignoredKeys.includes(key)) return false;
        return (state as any)[key] !== (prevState as any)[key];
      });

      if (contentChanged) {
        // Immediately show spinning state
        setSyncStatus("syncing");
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(generate, 1000);
      }
    });

    return () => {
      unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (syncedTimerRef.current) clearTimeout(syncedTimerRef.current);
    };
  }, []);

  // Force-refresh handler
  const handleForceRefresh = useCallback(() => {
    setSyncStatus("syncing");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // Small delay so the user sees the spin animation
    setTimeout(() => {
      const state = useReadmeStore.getState();
      const newMarkdown = generateMarkdown(state);
      setMarkdown(newMarkdown);
      setSyncStatus("synced");
      if (syncedTimerRef.current) clearTimeout(syncedTimerRef.current);
      syncedTimerRef.current = setTimeout(() => setSyncStatus("idle"), 2000);
    }, 300);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#39d353", "#2ea043", "#26a641", "#e6edf3", "#58a6ff"],
      });

      setTimeout(() => setShowGuide(true), 800);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [markdown]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown]);

  const isLight = previewTheme === "light";
  const isMobile = previewMode === "mobile";
  const isRaw = viewMode === "raw";

  return (
    <div className="flex flex-col h-full relative">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gh-border bg-gh-surface/80 backdrop-blur-sm transition-colors">
        <div className="flex items-center gap-1.5">

          {/* Preview / Raw toggle — pill style */}
          <div className="flex items-center bg-gh-muted rounded p-0.5 border border-gh-border">
            <button
              id="view-mode-preview"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${!isRaw
                  ? "bg-gh-surface text-gh-text shadow-sm border border-gh-border"
                  : "text-gh-text-muted hover:text-gh-text"
                }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              id="view-mode-raw"
              onClick={() => setViewMode("raw")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${isRaw
                  ? "bg-gh-surface text-gh-text shadow-sm border border-gh-border"
                  : "text-gh-text-muted hover:text-gh-text"
                }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Raw
            </button>
          </div>

          {/* Theme + viewport toggles — only meaningful in preview mode */}
          {!isRaw && (
            <>
              {/* README theme toggle */}
              <button
                onClick={() =>
                  setField("previewTheme", isLight ? "dark" : "light")
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-all ${isLight
                    ? "bg-yellow-100 dark:bg-white/10 text-yellow-700 border border-yellow-700 dark:text-yellow-300"
                    : "bg-gh-muted text-gh-text-muted hover:text-gh-text border border-gh-border"
                  }`}
              >
                {isLight ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
                {isLight ? "Light" : "Dark"}
              </button>

              {/* Viewport toggle */}
              <button
                onClick={() =>
                  setField("previewMode", isMobile ? "desktop" : "mobile")
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-all ${isMobile
                    ? "bg-gh-green/15 text-gh-green border border-gh-green/30"
                    : "bg-gh-muted text-gh-text-muted hover:text-gh-text border border-gh-border"
                  }`}
              >
                {isMobile ? (
                  <Smartphone className="w-3.5 h-3.5" />
                ) : (
                  <Monitor className="w-3.5 h-3.5" />
                )}
                {isMobile ? "Mobile" : "Desktop"}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sync status indicator — Google Drive style */}
          <button
            id="sync-refresh-btn"
            onClick={handleForceRefresh}
            title={
              syncStatus === "syncing"
                ? "Syncing changes…"
                : syncStatus === "synced"
                ? "Preview is up to date"
                : "Click to refresh preview"
            }
            className={`relative flex items-center justify-center w-8 h-8 rounded transition-all duration-200 ${
              syncStatus === "syncing"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : syncStatus === "synced"
                ? "bg-gh-green/15 text-gh-green border border-gh-green/30"
                : "bg-gh-muted text-gh-text-muted border border-gh-border hover:text-gh-text hover:border-gh-text-muted"
            }`}
          >
            {syncStatus === "synced" ? (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-3.5 h-3.5" />
              </motion.div>
            ) : (
              <RefreshCw
                className={`w-3.5 h-3.5 transition-transform ${
                  syncStatus === "syncing" ? "animate-spin" : ""
                }`}
              />
            )}
          </button>

          {/* Clear Cache/Reset button */}
          <button
            id="clear-cache-btn"
            onClick={() => setIsResetDialogOpen(true)}
            title="Clear all progress and reset"
            className="flex items-center justify-center w-8 h-8 rounded bg-gh-danger/10 text-gh-danger border border-gh-danger/30 hover:bg-gh-danger hover:text-white transition-all transition-colors duration-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Reset Confirmation Dialog */}
          <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will clear your entire configuration and reset the builder to its default state. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleClearCache}
                  variant="destructive"
                >
                  Reset Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Copy button */}
          <button
            id="copy-markdown-btn"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition-all ${copied
                ? "bg-gh-green text-white dark:text-gh-bg"
                : "bg-gh-green/15 text-gh-green border border-gh-green/30 hover:bg-gh-green/25"
              }`}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? "Copied!" : "Copy MD"}
          </button>

          {/* Download button */}
          <button
            id="download-md-btn"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold bg-gh-muted text-gh-text border border-gh-border hover:bg-gh-border transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            .md
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {isRaw ? (
            /* ── Raw markdown view ── */
            <motion.div
              key="raw"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {markdown.trim().length <= 1 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <div className="w-16 h-16 rounded-full bg-gh-muted flex items-center justify-center mb-4">
                    <Code2 className="w-8 h-8 text-gh-text-subtle" />
                  </div>
                  <p className="text-gh-text-muted text-sm font-medium">
                    No markdown yet — fill in the form first
                  </p>
                </div>
              ) : (
                <div className="rounded border border-gh-border bg-gh-bg overflow-hidden">
                  {/* File header bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gh-border bg-gh-surface">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-gh-danger/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                      <div className="w-3 h-3 rounded-full bg-gh-green/50" />
                    </div>
                    <span className="text-xs text-gh-text-muted font-fira ml-2">
                      README.md
                    </span>
                    <span className="ml-auto text-xs text-gh-text-subtle">
                      {markdown.length} chars · {markdown.split("\n").length} lines
                    </span>
                  </div>
                  {/* Code lines */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-fira leading-6">
                      <tbody>
                        {markdown.split("\n").map((line, i) => (
                          <tr
                            key={i}
                            className="hover:bg-gh-muted/50 transition-colors"
                          >
                            <td className="select-none text-right text-gh-text-subtle px-4 py-0 w-12 shrink-0 border-r border-gh-border/40">
                              {i + 1}
                            </td>
                            <td className="px-4 py-0 whitespace-pre text-gh-text">
                              {line || " "}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* ── Rendered preview ── */
            <motion.div
              key={markdown.length > 10 ? "has-content" : "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-auto"
              style={{ maxWidth: isMobile ? 420 : "100%" }}
            >
              <div
                className={`rounded border p-6 min-h-[400px] transition-colors ${isLight
                    ? "bg-white border-[#d1d9e0]"
                    : "bg-[#0d1117] border-[#30363d]"
                  }`}
              >
                {markdown.trim().length <= 1 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <div className="w-16 h-16 rounded-full bg-gh-muted flex items-center justify-center mb-4">
                      <Monitor className="w-8 h-8 text-gh-text-subtle" />
                    </div>
                    <p className="text-gh-text-muted text-sm font-medium">
                      Start filling in the form to see your README preview
                    </p>
                    <p className="text-gh-text-subtle text-xs mt-1">
                      Every change updates instantly
                    </p>
                  </div>
                ) : (
                  <div
                    className={`markdown-preview ${isLight ? "markdown-preview-light" : ""
                      }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        img: ({ node, ...props }: any) => {
                          const { vAlign, vSpace, hSpace, src, ...validProps } = props;
                          
                          // Handle relative paths for local development preview
                          // If src starts with localhost, strip it to use a relative path
                          const cleanSrc = src?.startsWith('http://localhost:3000') 
                            ? src.replace('http://localhost:3000', '') 
                            : src;

                          const style: any = { 
                            maxWidth: "100%", 
                            display: "inline-block",
                            verticalAlign: vAlign || 'middle' 
                          };

                          if (vSpace) {
                            style.marginTop = `${vSpace}px`;
                            style.marginBottom = `${vSpace}px`;
                          }
                          if (hSpace) {
                            style.marginLeft = `${hSpace}px`;
                            style.marginRight = `${hSpace}px`;
                          }

                          return (
                            <img
                              {...validProps}
                              src={cleanSrc}
                              loading="lazy"
                              style={style}
                            />
                          );
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Copy guide modal */}
      <CopyGuideModal
        open={showGuide}
        onClose={() => setShowGuide(false)}
        username={githubUsername}
      />
    </div>
  );
}
