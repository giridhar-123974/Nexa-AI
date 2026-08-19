"use client";

import React, { useState } from "react";
import { useCareer } from "@/context/CareerContext";
import { SkillItem } from "@/lib/types";

export function SkillRadarChart() {
  const { activeProfile } = useCareer();
  const skills: SkillItem[] = activeProfile.skillRadar;
  const [activeMetric, setActiveMetric] = useState<"both" | "current" | "target">("both");

  // Center coordinates and radius for radar
  const size = 300;
  const center = size / 2;
  const radius = 95;
  const total = skills.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
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
    <div className="flex flex-col items-center">
      {/* Controls & Filter */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setActiveMetric("both")}
          className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
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
          className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
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
          className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
            activeMetric === "target"
              ? "bg-emerald-500 text-neutral-950 font-semibold"
              : "bg-surface-100 text-neutral-400 hover:text-white"
          }`}
        >
          Target Role Bar
        </button>
      </div>

      {/* SVG Radar Chart */}
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {/* Concentric grid webs */}
          {[0.25, 0.5, 0.75, 1].map((level, idx) => {
            const pts = Array.from({ length: total })
              .map((_, i) => {
                const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
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
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
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

          {/* Target Polygon (Emerald / Indigo) */}
          {(activeMetric === "both" || activeMetric === "target") && (
            <polygon
              points={targetPoints}
              fill="rgba(16, 185, 129, 0.15)"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="transition-all duration-500"
            />
          )}

          {/* Current Polygon (Cyan / Brand) */}
          {(activeMetric === "both" || activeMetric === "current") && (
            <polygon
              points={currentPoints}
              fill="rgba(6, 182, 212, 0.25)"
              stroke="#06b6d4"
              strokeWidth="2.5"
              className="transition-all duration-500"
            />
          )}

          {/* Vertex dots for current values */}
          {skills.map((s, i) => {
            const { x, y } = getCoordinates(i, s.current);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                className="fill-cyan-400 stroke-neutral-950 stroke-2 hover:r-6 transition-all cursor-pointer"
              />
            );
          })}

          {/* Axis Labels */}
          {skills.map((s, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
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
      </div>

      {/* Legend & Summary */}
      <div className="flex items-center gap-6 mt-2 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="text-neutral-300">Verified Level</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-neutral-300">Target Role Bar</span>
        </div>
      </div>
    </div>
  );
}
