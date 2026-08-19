"use client";

import React from "react";
import { FeatureItem } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import {
  FileSearch,
  ShieldCheck,
  Mic,
  Route,
  Crosshair,
  Layers,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  FileSearch,
  ShieldCheck,
  Mic,
  Route,
  Crosshair,
  Layers,
  Sparkles,
  TrendingUp,
};

export interface FeatureCardProps {
  feature: FeatureItem;
  onSelect?: (feature: FeatureItem) => void;
}

export function FeatureCard({ feature, onSelect }: FeatureCardProps) {
  const IconComponent = ICON_MAP[feature.icon] || Sparkles;

  return (
    <GlassCard
      hoverScale
      borderGlow
      className="p-6 flex flex-col justify-between h-full bg-surface-100/50 cursor-pointer group"
      onClick={() => onSelect?.(feature)}
    >
      <div>
        {/* Top bar with Icon and Category */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-11 h-11 rounded-xl bg-surface-50 border border-white/10 flex items-center justify-center text-brand-400 group-hover:scale-110 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all">
            <IconComponent className="w-5 h-5" />
          </div>
          <Badge variant="neutral" className="text-[10px]">
            {feature.category}
          </Badge>
        </div>

        {/* Title and Tagline */}
        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
          {feature.title}
        </h3>
        <p className="text-xs font-mono text-neutral-400 mb-3 leading-snug">
          {feature.tagline}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
          {feature.description}
        </p>

        {/* Highlights Checklist */}
        <ul className="flex flex-col gap-1.5 mb-4">
          {feature.highlights.map((h, i) => (
            <li key={i} className="text-xs text-neutral-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Metric Preview Box */}
      {feature.metricsPreview && (
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-400">{feature.metricsPreview.label}:</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {feature.metricsPreview.value}
            </span>
          </div>
          <span className="text-xs font-medium text-neutral-400 group-hover:text-white flex items-center gap-1 transition-colors">
            Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      )}
    </GlassCard>
  );
}
