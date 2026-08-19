"use client";

import React from "react";
import { VALUE_PILLARS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Cpu, Terminal, GitBranch, Shield } from "lucide-react";

export function ValueProposition() {
  const icons = [
    <Cpu key="0" className="w-5 h-5 text-brand-400" />,
    <Terminal key="1" className="w-5 h-5 text-cyan-400" />,
    <GitBranch key="2" className="w-5 h-5 text-emerald-400" />,
    <Shield key="3" className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section className="py-20 relative border-y border-white/[0.06] bg-surface-300/40">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-4">
            Engineering Excellence
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Built for Serious Career Preparation.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Eliminate guesswork with deterministic applicant tracking simulations, adaptive voice mock interviews, and privacy-first data guarantees.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PILLARS.map((pillar, idx) => (
            <GlassCard
              key={pillar.title}
              hoverScale
              borderGlow
              className="p-6 flex flex-col justify-between h-full bg-surface-100/50"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-5">
                  {icons[idx]}
                </div>

                <div className="mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {pillar.metric}
                  </span>
                  <span className="block text-xs font-mono text-cyan-400 font-medium mt-0.5">
                    {pillar.metricLabel}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
