"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useReadmeStore } from "@/store/readme-store";
import { SectionCard } from "./section-card";
import { ProfileSection } from "./profile-section";
import { TechStackSection } from "./tech-stack-section";
import { StatsSection } from "./stats-section";
import { SocialsSection } from "./socials-section";
import { ExtrasSection } from "./extras-section";
import {
  User,
  Layers,
  BarChart3,
  Share2,
  Sparkles,
} from "lucide-react";

const SECTION_COMPONENTS: Record<string, React.ReactNode> = {
  profile: <ProfileSection />,
  techStack: <TechStackSection />,
  githubStats: <StatsSection />,
  socials: <SocialsSection />,
  extras: <ExtrasSection />,
};

const SECTION_ICONS: Record<string, React.ReactNode> = {
  profile: <User className="w-4 h-4" />,
  techStack: <Layers className="w-4 h-4" />,
  githubStats: <BarChart3 className="w-4 h-4" />,
  socials: <Share2 className="w-4 h-4" />,
  extras: <Sparkles className="w-4 h-4" />,
};

import { useState, useEffect } from "react";

export function SectionsList() {
  const { sections, reorderSections } = useReadmeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSections(active.id as string, over.id as string);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch on aria attributes entirely
  }

  return (
    <DndContext
      id="builder-dnd"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              id={section.id}
              label={section.label}
              icon={SECTION_ICONS[section.id]}
              defaultCollapsed={section.id !== "profile"}
            >
              {SECTION_COMPONENTS[section.id]}
            </SectionCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
