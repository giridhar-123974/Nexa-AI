"use client";

import React, { useState } from "react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { StepVisualizer } from "./StepVisualizer";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = HOW_IT_WORKS_STEPS[activeStepIndex];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-4">
            Structured Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            From Profile Ingestion to Offer Negotiation.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Four systematic phases designed to eliminate guesswork, highlight competitive strengths, and build interview confidence.
          </p>
        </div>

        {/* 2-Column Interactive Workflow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Step Selectors (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-surface-100/90 border-brand-500/50 shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
                      : "bg-surface-200/40 border-white/[0.06] hover:bg-surface-100/60 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-sm font-mono font-bold px-2.5 py-1 rounded-lg border ${
                        isActive
                          ? "bg-brand-500/20 text-brand-300 border-brand-500/30"
                          : "bg-surface-100 text-neutral-400 border-white/10"
                      }`}
                    >
                      {step.step}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white">
                          {step.title}
                        </h3>
                        <Badge variant={isActive ? "brand" : "neutral"} className="text-[10px]">
                          {step.badge}
                        </Badge>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-3">
                        {step.description}
                      </p>

                      {isActive && (
                        <ul className="flex flex-col gap-1.5 pt-2 border-t border-white/[0.06] animate-in fade-in duration-300">
                          {step.detailPoints.map((point, pIdx) => (
                            <li key={pIdx} className="text-xs text-neutral-300 flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Visual Simulator Output (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <StepVisualizer type={activeStep.codeOrVisualType} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
