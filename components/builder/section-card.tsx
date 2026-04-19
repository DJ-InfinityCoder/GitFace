"use client";

import { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useReadmeStore } from "@/store/readme-store";
import { motion, AnimatePresence } from "framer-motion";

interface SectionCardProps {
  id: string;
  label: string;
  icon: ReactNode;
  defaultCollapsed?: boolean;
  children: ReactNode;
}

export function SectionCard({
  id,
  label,
  icon,
  defaultCollapsed = true,
  children,
}: SectionCardProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`glass-card overflow-hidden transition-all ${
        isDragging ? "drag-overlay" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gh-muted text-gh-text-subtle hover:text-gh-text-muted transition-colors touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-7 h-7 rounded flex items-center justify-center bg-gh-green/15 text-gh-green transition-colors">
          {icon}
        </div>

        {/* Label */}
        <span className="text-sm font-semibold flex-1 text-gh-text transition-colors">
          {label}
        </span>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gh-muted text-gh-text-subtle hover:text-gh-text-muted transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-gh-border/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
