"use client";

import React from "react";
import { useCareer } from "@/context/CareerContext";
import { Sparkles, Check, CornerDownRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function AiSuggestionsList() {
  const { activeProfile, appliedSuggestionIds, toggleSuggestion, appliedScoreBoost } = useCareer();
  const suggestions = activeProfile.suggestions;

  return (
    <div className="flex flex-col gap-4">
      {/* Header status */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-100/70 border border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-semibold text-white">
            High-Impact AI Recommendations for {activeProfile.name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-neutral-400">Applied Boost:</span>
          <span className="text-emerald-400 font-bold">
            +{appliedScoreBoost} pts
          </span>
        </div>
      </div>

      {/* Suggestion Cards */}
      <div className="flex flex-col gap-3">
        {suggestions.map((sug) => {
          const isApplied = appliedSuggestionIds.includes(sug.id);

          return (
            <div
              key={sug.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isApplied
                  ? "bg-surface-50/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                  : "bg-surface-100/60 border-white/[0.08] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <Badge variant={isApplied ? "emerald" : "brand"} className="text-[10px]">
                    {sug.field}
                  </Badge>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {sug.impactScore}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant={isApplied ? "secondary" : "primary"}
                  className="text-xs px-3 h-7"
                  leftIcon={isApplied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Zap className="w-3.5 h-3.5 text-brand-400" />}
                  onClick={() => toggleSuggestion(sug.id, parseInt(sug.impactScore) || 10)}
                >
                  {isApplied ? "Applied" : "Apply Fix"}
                </Button>
              </div>

              {/* Before & After Diff Box */}
              <div className="flex flex-col gap-2 my-2 text-xs font-mono">
                {/* Before */}
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 select-none">-</span>
                  <span className="line-through opacity-80">{sug.before}</span>
                </div>

                {/* After */}
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 select-none">+</span>
                  <span className="font-sans font-normal text-white">{sug.after}</span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5">
                <CornerDownRight className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{sug.impactDescription}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
