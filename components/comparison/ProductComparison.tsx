"use client";

import React from "react";
import { COMPARISON_DATA } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

export function ProductComparison() {
  return (
    <section id="comparison" className="py-24 relative bg-surface-300/40 border-t border-white/[0.06]">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-4">
            Architecture Comparison
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Why Generic LLMs and Manual Coaches Fall Short.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            A granular comparison between traditional preparation workflows and the Nexa AI Career Copilot architecture.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-2xl sm:rounded-3xl bg-surface-200/70 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Table Header Row */}
          <div className="grid grid-cols-12 p-4 sm:p-6 border-b border-white/[0.08] bg-surface-100/80 text-xs sm:text-sm font-semibold text-neutral-300">
            <div className="col-span-4 sm:col-span-4 uppercase tracking-wider text-neutral-400 font-mono text-[11px]">
              Capability Dimension
            </div>
            <div className="col-span-4 sm:col-span-4 uppercase tracking-wider text-neutral-400 font-mono text-[11px]">
              Traditional Prep / Chatbots
            </div>
            <div className="col-span-4 sm:col-span-4 uppercase tracking-wider text-cyan-400 font-mono text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Nexa AI Copilot
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-white/[0.06]">
            {COMPARISON_DATA.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-6 items-center hover:bg-white/[0.02] transition-colors gap-2 sm:gap-4"
              >
                {/* Feature Name */}
                <div className="col-span-12 sm:col-span-4 font-medium text-white text-xs sm:text-sm mb-1 sm:mb-0">
                  {row.feature}
                </div>

                {/* Traditional */}
                <div className="col-span-6 sm:col-span-4 text-xs text-neutral-400 flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-500/70 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{row.traditional}</span>
                </div>

                {/* Nexa AI */}
                <div className="col-span-6 sm:col-span-4 text-xs text-neutral-200 font-medium flex items-start gap-2 bg-brand-500/[0.04] sm:bg-transparent p-2 sm:p-0 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-cyan-200">{row.nexa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
