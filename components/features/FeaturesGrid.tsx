"use client";

import React, { useState } from "react";
import { FEATURES_DATA } from "@/lib/constants";
import { FeatureItem } from "@/lib/types";
import { FeatureCard } from "./FeatureCard";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

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
            Eight Specialized Engines. One Unified Copilot.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Every layer of modern job preparation engineered with deterministic precision, real-time voice latency, and actionable lexical analytics.
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

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onSelect={(f) => setActiveFeature(f)}
            />
          ))}
        </div>

        {/* Interactive Deep-Dive Modal for Feature Details */}
        <Modal
          isOpen={!!activeFeature}
          onClose={() => setActiveFeature(null)}
          title={activeFeature?.title}
          description={activeFeature?.tagline}
          maxWidth="lg"
        >
          {activeFeature && (
            <div className="flex flex-col gap-4 py-2">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeFeature.description}
              </p>

              <div className="p-4 rounded-xl bg-surface-100/90 border border-white/[0.08]">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Key Technical Capabilities
                </h4>
                <ul className="flex flex-col gap-2">
                  {activeFeature.highlights.map((h, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeFeature.metricsPreview && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs">
                  <span className="text-neutral-300 font-medium">Performance Benchmark:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {activeFeature.metricsPreview.value} ({activeFeature.metricsPreview.trend})
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveFeature(null)}
                >
                  Close
                </Button>
                <Button
                  variant="gradient"
                  glow
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    const featureId = activeFeature.id;
                    setActiveFeature(null);
                    window.dispatchEvent(
                      new CustomEvent("nexa-switch-tab", { detail: featureId })
                    );
                    const el = document.getElementById("dashboard");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Try in Dashboard Simulator
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
