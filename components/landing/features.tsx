"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Layers,
  Zap,
  Eye,
  GripVertical,
  Copy,
  Palette,
} from "lucide-react";

const FEATURES = [
  {
    icon: Layers,
    title: "Modular Sections",
    description:
      "Profile, tech stack, stats, socials, and extras — all as toggleable, drag-and-drop cards.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "See your README exactly as GitHub renders it. Every keystroke updates the preview instantly.",
  },
  {
    icon: GripVertical,
    title: "Drag to Reorder",
    description:
      "Arrange sections in any order with smooth drag-and-drop. Your README, your layout.",
  },
  {
    icon: Palette,
    title: "GitHub Themes",
    description:
      "Toggle between GitHub Light and Dark themes. Preview on desktop or mobile width.",
  },
  {
    icon: Zap,
    title: "Shields.io Badges",
    description:
      "80+ tech badges with a searchable picker. Categorized by Frontend, Backend, DevOps, and Tools.",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description:
      "Copy your markdown with a single click. Download as .md or paste directly into GitHub.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card glass-card-hover p-6 group"
    >
      <div className="w-11 h-11 rounded bg-gh-green/10 flex items-center justify-center mb-4 group-hover:bg-gh-green/20 transition-colors">
        <Icon className="w-5 h-5 text-gh-green" />
      </div>
      <h3 className="text-base font-bold text-gh-text mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-gh-text-muted leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gh-green/10 text-gh-green text-xs font-semibold mb-4 border border-gh-green/20">
            FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gh-text mb-4">
            Everything you need to stand out
          </h2>
          <p className="text-gh-text-muted max-w-lg mx-auto">
            A complete toolkit for building professional GitHub profile READMEs
            — without writing a single line of markdown.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
