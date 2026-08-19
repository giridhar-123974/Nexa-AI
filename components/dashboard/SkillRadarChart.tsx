"use client";

import React, { useState } from "react";
import { useCareer } from "@/context/CareerContext";
import { SkillItem } from "@/lib/types";
import { Activity } from "lucide-react";

export function SkillRadarChart() {
  const { activeProfile, activeJob } = useCareer();
  const skills: SkillItem[] = activeProfile.skillRadar;
  const [activeMetric, setActiveMetric] = useState<"both" | "current" | "target">("both");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  // Center coordinates and radius for radar
  const size = 320;
  const center = size / 2;
  const radius = 100;
  const total = skills.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = ((Math.PI * 2) / total) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate SVG polygon points
  const currentPoints = skills
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.current);
      return `${x},${y}`;
    })
    .join(" ");

  const targetPoints = skills
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.target);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Controls & Filter */}
      <div className="flex flex-wrap items-center justify-between w-full gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-white">
            {activeProfile.name} vs. {activeJob.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveMetric("both")}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              activeMetric === "both"
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-surface-100 text-neutral-400 hover:text-white"
            }`}
          >
            All Layers
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("current")}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              activeMetric === "current"
                ? "bg-cyan-500 text-neutral-950 font-semibold"
                : "bg-surface-100 text-neutral-400 hover:text-white"
            }`}
          >
            Verified Level
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("target")}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              activeMetric === "target"
                ? "bg-emerald-500 text-neutral-950 font-semibold"
                : "bg-surface-100 text-neutral-400 hover:text-white"
            }`}
          >
            Target Benchmark
          </button>
        </div>
      </div>

      {/* SVG Radar Chart Canvas */}
      <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {/* Concentric grid webs */}
          {[0.25, 0.5, 0.75, 1].map((level, idx) => {
            const pts = Array.from({ length: total })
              .map((_, i) => {
                const angle = ((Math.PI * 2) / total) * i - Math.PI / 2;
                const r = level * radius;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(" ");
            return (
              <polygon
                key={idx}
                points={pts}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            );
          })}

          {/* Radial axis lines */}
          {skills.map((_, i) => {
            const angle = ((Math.PI * 2) / total) * i - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Target Polygon (Emerald / Benchmark) */}
          {(activeMetric === "both" || activeMetric === "target") && (
            <polygon
              points={targetPoints}
              fill="rgba(16, 185, 129, 0.15)"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="transition-all duration-700 ease-out"
            />
          )}

          {/* Current Polygon (Cyan / Candidate) */}
          {(activeMetric === "both" || activeMetric === "current") && (
            <polygon
              points={currentPoints}
              fill="rgba(6, 182, 212, 0.25)"
              stroke="#06b6d4"
              strokeWidth="2.5"
              className="transition-all duration-700 ease-out"
            />
          )}

          {/* Vertex dots for current values with hover tooltip */}
          {skills.map((s, i) => {
            const { x, y } = getCoordinates(i, s.current);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4.5"
                onMouseEnter={() => setHoveredSkill(s)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="fill-cyan-400 stroke-neutral-950 stroke-2 hover:r-6 transition-all cursor-pointer"
              />
            );
          })}

          {/* Axis Labels */}
          {skills.map((s, i) => {
            const angle = ((Math.PI * 2) / total) * i - Math.PI / 2;
            const labelRadius = radius + 24;
            const lx = center + labelRadius * Math.cos(angle);
            const ly = center + labelRadius * Math.sin(angle);
            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-neutral-300 text-[10px] font-medium"
              >
                {s.name}
              </text>
            );
          })}
        </svg>

        {/* Hover Floating Tooltip */}
        {hoveredSkill && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-surface-300 border border-brand-400/40 text-xs shadow-xl pointer-events-none animate-in fade-in">
            <span className="font-bold text-white">{hoveredSkill.name}</span>:{" "}
            <span className="text-cyan-400 font-mono">{hoveredSkill.current}%</span> vs{" "}
            <span className="text-emerald-400 font-mono">{hoveredSkill.target}%</span> (
            <span className="text-amber-400 font-mono font-semibold">
              {hoveredSkill.target - hoveredSkill.current > 0
                ? `-${hoveredSkill.target - hoveredSkill.current}% gap`
                : "Target Met"}
            </span>
            )
          </div>
        )}
      </div>

      {/* Skill Dimension Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
        {skills.map((s) => {
          const gap = s.target - s.current;
          return (
            <div
              key={s.name}
              className="p-2.5 rounded-xl bg-surface-100/70 border border-white/[0.06] flex flex-col gap-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-neutral-300 font-medium truncate">{s.name}</span>
                <span className="text-cyan-400 font-mono font-bold">{s.current}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${s.current}%` }}
                />
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                {gap > 0 ? (
                  <span className="text-amber-400">+{gap}% to target</span>
                ) : (
                  <span className="text-emerald-400">✓ Benchmark Met</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="text-neutral-300">Verified Level ({activeProfile.name})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-neutral-300">Target Role Bar ({activeJob.title})</span>
        </div>
      </div>
    </div>
  );
}
