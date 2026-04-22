"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import type { TechStackItem } from "@/store/readme-store";

interface SortableTechItemProps {
  tech: TechStackItem;
  onRemove: (name: string) => void;
}

export function SortableTechItem({ tech, onRemove }: SortableTechItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tech.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group bg-gh-muted border border-gh-border rounded transition-all hover:border-gh-green/50 cursor-grab active:cursor-grabbing w-12 h-12 flex items-center justify-center ${
        isDragging ? "opacity-50 scale-105 shadow-xl ring-2 ring-gh-green" : ""
      }`}
    >
      <img
        src={tech.badge}
        alt={tech.name}
        className="w-8 h-8 object-contain"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(tech.name);
        }}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gh-danger text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg hover:bg-gh-danger/80 z-10"
        aria-label={`Remove ${tech.name}`}
      >
        <X className="w-3 h-3" />
      </button>
      <span className="sr-only">{tech.name}</span>
    </div>
  );
}
