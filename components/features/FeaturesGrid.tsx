"use client";

import React, { useState } from "react";
import { FEATURES_DATA } from "@/lib/constants";
import { FeatureItem } from "@/lib/types";
import { FeatureCard } from "./FeatureCard";
import { Badge } from "@/components/ui/Badge";
import { InteractiveFeatureModal } from "./InteractiveFeatureModal";

export function FeaturesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeFeature, setActiveFeature] = useState<FeatureItem | null>(null);

  const categories = ["All", "Resume", "Interview", "Career", "Optimization"];

  const filteredFeatures =
    selectedCategory === "All"
      ? FEATURES_DATA
      : FEATURES_DATA.filter((f) => f.category === selectedCategory);

  return (
    <section id="features" className="py-24 relative bg-surface-300/30 border-t border-white/[0.06]">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand" className="mb-4">
            Integrated Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Six Specialized Engines. One Unified Copilot.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Click any engine below to launch the live interactive diagnostic workspace, upload resumes, and run real-time simulations.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                  selectedCategory === cat
                    ? "bg-white text-neutral-950 font-semibold shadow-sm"
                    : "bg-surface-100/80 text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                }`}
              >
                {cat} {cat === "All" && `(${FEATURES_DATA.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onSelect={(f) => setActiveFeature(f)}
            />
          ))}
        </div>

        {/* Interactive Working Feature Modal */}
        <InteractiveFeatureModal
          feature={activeFeature}
          onClose={() => setActiveFeature(null)}
        />
      </div>
    </section>
  );
}
