"use client";

import React from "react";
import { useCareer } from "@/context/CareerContext";
import { CheckCircle2, Circle, Code2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function RoadmapTimeline() {
  const {
    activeProfile,
    completedRoadmapIds,
    toggleRoadmapMilestone,
    completeAllMilestones,
    resetRoadmapMilestones,
    roadmapProgressPercent,
  } = useCareer();

  const roadmap = activeProfile.roadmapMilestones;

  return (
    <div className="flex flex-col gap-5">
      {/* Header with progress */}
      <div className="p-4 rounded-xl bg-surface-100/80 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white">
              Targeted Roadmap: {activeProfile.name} ({activeProfile.targetRole})
            </h4>
            <Badge variant="cyan" className="text-[10px]">
              Active Track
            </Badge>
          </div>
          <p className="text-xs text-neutral-400">
            Algorithmic study plan calibrated for your verified target role requirements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={completeAllMilestones}
              className="text-[11px] text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Complete All
            </button>
            <span className="text-neutral-600">•</span>
            <button
              type="button"
              onClick={resetRoadmapMilestones}
              className="text-[11px] text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col sm:items-end text-xs">
              <span className="text-neutral-400">Roadmap Progress</span>
              <span className="text-sm font-mono font-bold text-cyan-400">
                {roadmapProgressPercent}% Completed
              </span>
            </div>
            <div className="w-20 sm:w-24 bg-white/10 h-2 rounded-full overflow-hidden shrink-0">
              <div
                className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${roadmapProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="flex flex-col gap-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
        {roadmap.map((step) => {
          const isDone = completedRoadmapIds.includes(step.id);

          return (
            <div
              key={step.id}
              onClick={() => toggleRoadmapMilestone(step.id)}
              className={`relative pl-12 pr-4 py-4 rounded-xl border transition-all cursor-pointer ${
                isDone
                  ? "bg-surface-100/50 border-emerald-500/30"
                  : "bg-surface-100/80 border-white/[0.08] hover:border-white/20"
              }`}
            >
              {/* Timeline marker node */}
              <div
                className={`absolute left-3 top-5 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isDone
                    ? "bg-emerald-500 text-neutral-950"
                    : "bg-surface-200 border-2 border-white/20 text-neutral-400"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3" />}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-brand-300 font-semibold">{step.phase}</span>
                  <span className="text-neutral-500">•</span>
                  <h5
                    className={`text-xs sm:text-sm font-semibold ${
                      isDone ? "text-neutral-300 line-through decoration-white/30" : "text-white"
                    }`}
                  >
                    {step.title}
                  </h5>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-500" /> ~{step.estimatedHours} hrs
                  </span>
                  <Badge variant={isDone ? "emerald" : "neutral"} className="text-[10px] w-fit">
                    {isDone ? "Completed" : "Click to mark done"}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-neutral-400 mb-2.5 leading-relaxed">{step.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-medium">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Deliverable: {step.deliverable}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {step.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] text-neutral-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
