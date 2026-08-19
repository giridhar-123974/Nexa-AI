"use client";

import React from "react";
import { useCareer } from "@/context/CareerContext";
import {
  CheckCircle2,
  Circle,
  Code2,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function RoadmapTimeline() {
  const {
    activeProfile,
    activeJob,
    completedRoadmapIds,
    toggleRoadmapMilestone,
    completeAllMilestones,
    resetRoadmapMilestones,
    roadmapProgressPercent,
  } = useCareer();

  const milestones = activeProfile.roadmapMilestones;
  const totalHours = milestones.reduce((sum, m) => sum + m.estimatedHours, 0);
  const completedHours = milestones
    .filter((m) => completedRoadmapIds.includes(m.id))
    .reduce((sum, m) => sum + m.estimatedHours, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Progress Gauge & Controls */}
      <div className="p-5 rounded-2xl bg-surface-100/90 border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-white">
              Targeted Roadmap: {activeProfile.name} ➔ {activeJob.title}
            </h3>
            <Badge variant="brand" className="text-[10px]">
              {milestones.length} Milestones
            </Badge>
          </div>
          <p className="text-xs text-neutral-400">
            Algorithmic study plan targeting your exact missing skill competencies:{" "}
            <span className="text-cyan-400 font-mono">
              ({activeProfile.missingSkills.join(", ")})
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={completeAllMilestones}
              className="text-neutral-400 hover:text-white underline transition-colors"
            >
              Complete All
            </button>
            <span className="text-neutral-600">•</span>
            <button
              type="button"
              onClick={resetRoadmapMilestones}
              className="text-neutral-400 hover:text-white underline transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="flex items-center gap-3 bg-surface-200/80 px-3.5 py-2 rounded-xl border border-white/10">
            <div className="flex flex-col text-xs">
              <span className="text-neutral-400">Progress</span>
              <span className="text-sm font-mono font-bold text-cyan-400">
                {roadmapProgressPercent}% ({completedHours}/{totalHours} hrs)
              </span>
            </div>
            <div className="w-20 sm:w-24 bg-white/10 h-2 rounded-full overflow-hidden shrink-0">
              <div
                className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${roadmapProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Steps Checklist */}
      <div className="flex flex-col gap-3.5 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
        {milestones.map((step, idx) => {
          const isDone = completedRoadmapIds.includes(step.id);
          const isUnlocked = idx === 0 || completedRoadmapIds.includes(milestones[idx - 1].id);

          return (
            <div
              key={step.id}
              onClick={() => toggleRoadmapMilestone(step.id)}
              className={`relative pl-12 pr-5 py-4 rounded-xl border transition-all cursor-pointer ${
                isDone
                  ? "bg-surface-100/50 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
                  : isUnlocked
                  ? "bg-surface-100/90 border-white/[0.08] hover:border-brand-400/40 shadow-sm"
                  : "bg-surface-100/40 border-white/[0.04] opacity-80"
              }`}
            >
              {/* Timeline marker node */}
              <div
                className={`absolute left-3 top-5 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isDone
                    ? "bg-emerald-500 text-neutral-950 font-bold"
                    : isUnlocked
                    ? "bg-surface-200 border-2 border-brand-400 text-brand-300"
                    : "bg-surface-200 border-2 border-white/20 text-neutral-500"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3" />}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-brand-300 font-bold">{step.phase}</span>
                  <span className="text-neutral-600">•</span>
                  <h4
                    className={`text-sm font-bold ${
                      isDone ? "text-neutral-300 line-through decoration-white/30" : "text-white"
                    }`}
                  >
                    {step.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-500" /> ~{step.estimatedHours} hrs
                  </span>
                  {step.weeklyTarget && (
                    <span className="text-[10px] text-cyan-400 font-mono hidden sm:inline-block">
                      ({step.weeklyTarget})
                    </span>
                  )}
                  <Badge variant={isDone ? "emerald" : "neutral"} className="text-[10px]">
                    {isDone ? "Completed" : "Click to mark done"}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-neutral-300 mb-3 leading-relaxed">{step.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Deliverable: {step.deliverable}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {step.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] text-neutral-300 font-mono border border-white/[0.08]"
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
