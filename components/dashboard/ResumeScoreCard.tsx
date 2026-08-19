"use client";

import React, { useState } from "react";
import { useCareer } from "@/context/CareerContext";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function ResumeScoreCard() {
  const { activeProfile, activeJob, computedResumeScore, computedAtsScore, appliedScoreBoost } = useCareer();
  const [selectedMetric, setSelectedMetric] = useState<string>("overall");

  const sub = activeProfile.subScores;

  const metrics = [
    {
      id: "overall",
      label: "Composite Resume AST Score",
      score: computedResumeScore,
      status: computedResumeScore >= 90 ? "Optimal" : "Competitive",
      detail: `Weighted AST evaluation across 5 key dimensions for ${activeProfile.name}.`,
      recommendation: appliedScoreBoost > 0 ? `Applied +${appliedScoreBoost} pts in active modifications.` : "Click 'Apply Fix' in suggestions to boost this score.",
    },
    {
      id: "impact",
      label: "Quantified Impact Ratio",
      score: sub.quantifiedImpact,
      status: sub.quantifiedImpact >= 90 ? "Optimal" : "Action Needed",
      detail: "Percentage of experience bullet points containing measurable business/latency metrics.",
      recommendation: "Target 90%+ quantification on high-concurrency projects.",
    },
    {
      id: "action_verbs",
      label: "Action Verb Power",
      score: sub.actionVerbs,
      status: sub.actionVerbs >= 90 ? "Strong" : "Moderate",
      detail: "Leading verbs include: Architected, Reduced, Spearheaded, Orchestrated.",
      recommendation: "Replace passive verbs with executive first-person ownership terms.",
    },
    {
      id: "ats_parse",
      label: "ATS Parse Integrity",
      score: sub.atsParseIntegrity,
      status: "Verified",
      detail: `Single-column text hierarchy tested against Greenhouse, Lever, and Workday for ${activeProfile.targetRole}.`,
      recommendation: "Zero table structural parsing bottlenecks detected.",
    },
    {
      id: "relevance",
      label: "Domain Keyword Density",
      score: sub.keywordDensity,
      status: sub.keywordDensity >= 90 ? "Strong" : "Action Needed",
      detail: `Matched ${activeProfile.atsParsedKeywords} keywords for ${activeJob.title} at ${activeJob.company}.`,
      recommendation: `Missing: ${activeProfile.missingSkills.join(", ")}.`,
    },
  ];

  const active = metrics.find((m) => m.id === selectedMetric) || metrics[0];

  return (
    <div className="flex flex-col gap-5">
      {/* Top Main Gauge Summary */}
      <div className="p-5 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-5">
          {/* Animated SVG Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-700 ease-out"
                strokeDasharray={`${active.score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-white leading-none font-mono">
                {active.score}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">/100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-base font-semibold text-white">{active.label}</h4>
              <Badge variant={active.score >= 92 ? "emerald" : active.score >= 85 ? "cyan" : "amber"} dot>
                {active.status}
              </Badge>
            </div>
            <p className="text-xs text-neutral-300 max-w-sm leading-relaxed">
              {active.detail}
            </p>
            <p className="text-[11px] text-cyan-300 font-mono mt-1">
              💡 {active.recommendation}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-1 text-xs">
          <span className="text-neutral-400">Target Role Benchmark:</span>
          <span className="text-sm font-semibold text-cyan-400 font-mono">{activeJob.title}</span>
          <span className="text-[11px] text-neutral-300">({activeJob.company} • {activeJob.salaryBand})</span>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" /> ATS Match: {computedAtsScore}%
          </span>
        </div>
      </div>

      {/* Sub-Metrics Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {metrics.slice(1).map((m) => {
          const isSelected = selectedMetric === m.id;
          return (
            <button
              type="button"
              key={m.id}
              onClick={() => setSelectedMetric(m.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                isSelected
                  ? "bg-surface-50 border-brand-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-brand-500/30"
                  : "bg-surface-100/60 border-white/[0.06] hover:bg-surface-100 hover:border-white/15"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-200">{m.label}</span>
                <span className="text-sm font-bold font-mono text-white">{m.score}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    m.score >= 92
                      ? "bg-emerald-400"
                      : m.score >= 85
                      ? "bg-cyan-400"
                      : "bg-amber-400"
                  }`}
                  style={{ width: `${m.score}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-1 truncate">{m.detail}</p>
              <p className="text-[11px] text-cyan-300 font-medium truncate">{m.recommendation}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
