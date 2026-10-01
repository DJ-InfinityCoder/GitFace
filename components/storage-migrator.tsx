"use client";

import { useEffect } from "react";
import { useReadmeStore } from "@/store/readme-store";

const LEGACY_ORIGIN = "https://gitface.dilip.live";
const MIGRATION_DONE_KEY = "gitface-migrated-from-live";

export function StorageMigrator() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not run if already on the legacy domain
    if (window.location.hostname.includes("dilip.live")) return;

    // If migration already finished or user already has local config on this domain, skip
    const alreadyMigrated = localStorage.getItem(MIGRATION_DONE_KEY);
    const existingConfig = localStorage.getItem("gitface-readme-config");

    if (alreadyMigrated || existingConfig) {
      return;
    }

    let cleanupTimer: ReturnType<typeof setTimeout>;

    const iframe = document.createElement("iframe");
    iframe.src = `${LEGACY_ORIGIN}/migrate.html`;
    iframe.style.display = "none";
    iframe.setAttribute("aria-hidden", "true");

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== LEGACY_ORIGIN) return;

      if (event.data?.type === "GITFACE_MIGRATION_READY") {
        iframe.contentWindow?.postMessage(
          { type: "REQUEST_GITFACE_STORAGE" },
          LEGACY_ORIGIN
        );
      } else if (event.data?.type === "GITFACE_STORAGE_DATA") {
        const { config, theme } = event.data;

        if (config) {
          try {
            localStorage.setItem("gitface-readme-config", config);
            // Rehydrate the Zustand store with migrated data immediately
            useReadmeStore.persist?.rehydrate();
          } catch (e) {
            console.warn("GitFace migration persist error:", e);
          }
        }

        if (theme) {
          try {
            localStorage.setItem("gitface-theme", theme);
            if (theme === "dark") {
              document.documentElement.classList.add("dark");
            } else if (theme === "light") {
              document.documentElement.classList.remove("dark");
            }
          } catch (e) {}
        }

        localStorage.setItem(MIGRATION_DONE_KEY, "true");
        cleanup();
      } else if (event.data?.type === "GITFACE_STORAGE_ERROR") {
        localStorage.setItem(MIGRATION_DONE_KEY, "true");
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener("message", handleMessage);
      if (cleanupTimer) clearTimeout(cleanupTimer);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    window.addEventListener("message", handleMessage);
    document.body.appendChild(iframe);

    // Timeout safety fallback: If legacy domain is unreachable or down, remove iframe after 3.5s
    cleanupTimer = setTimeout(() => {
      localStorage.setItem(MIGRATION_DONE_KEY, "true");
      cleanup();
    }, 3500);

    return cleanup;
  }, []);

  return null;
}
