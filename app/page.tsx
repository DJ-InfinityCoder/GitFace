"use client";

import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { DemoPreview } from "@/components/landing/demo-preview";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Code2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gh-bg relative overflow-hidden transition-colors duration-300">
      {/* Particle-like background grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--gh-green) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gh-border/50 bg-gh-bg/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gh-green" />
            <span className="text-lg font-bold text-gh-text font-fira">
              Git<span className="text-gh-green">Face</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded hover:bg-gh-muted text-gh-text-muted hover:text-gh-text transition-colors"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <Link
              href="/builder"
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-gh-green/15 text-gh-green text-sm font-semibold border border-gh-green/30 hover:bg-gh-green/25 transition-all"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero />

      {/* Features */}
      <Features />

      {/* Demo */}
      <DemoPreview />

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gh-text mb-4">
            Ready to level up your profile?
          </h2>
          <p className="text-gh-text-muted mb-8 max-w-md mx-auto">
            Join thousands of developers who&apos;ve already upgraded their
            GitHub presence.
          </p>
          <Link
            href="/builder"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded bg-gh-green text-white dark:text-gh-bg font-bold text-lg hover:opacity-90 transition-all glow-green"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gh-border py-8 px-6 text-center transition-colors">
        <p className="text-sm text-gh-text-subtle">
          Built with{" "}
          <span className="text-gh-green">♥</span> using Next.js,
          Tailwind CSS & Framer Motion
        </p>
      </footer>
    </div>
  );
}
