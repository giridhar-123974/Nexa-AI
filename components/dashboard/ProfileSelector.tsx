"use client";

import React from "react";
import { useCareer } from "@/context/CareerContext";
import { CANDIDATE_PROFILES, TARGET_JOBS } from "@/lib/careerData";
import { User, Briefcase, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function ProfileSelector() {
  const {
    selectedProfileId,
    selectedJobId,
    selectProfile,
    selectJob,
    activeProfile,
    activeJob,
    computedResumeScore,
    computedAtsScore,
  } = useCareer();

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-surface-100/90 border border-white/[0.08] shadow-lg flex flex-col gap-4">
      {/* Top Banner with Active Profile Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 via-indigo-600 to-cyan-500 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center font-bold text-sm text-cyan-400">
              {activeProfile.avatarInitials}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">{activeProfile.name}</h3>
              <Badge variant="brand" className="text-[10px]">
                {activeProfile.experienceLevel}
              </Badge>
            </div>
            <p className="text-xs text-neutral-400">
              {activeProfile.currentTitle} ➔ <strong className="text-white">{activeJob.title}</strong> ({activeJob.company})
            </p>
          </div>
        </div>

        {/* Live Synchronized Score Micro-Badges */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
          <div className="px-3 py-1.5 rounded-xl bg-surface-200/80 border border-white/10 flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Resume:</span>
            <span className="text-cyan-400 font-mono font-bold">{computedResumeScore}/100</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-surface-200/80 border border-white/10 flex items-center gap-2 text-xs">
            <span className="text-neutral-400">ATS Match:</span>
            <span className="text-emerald-400 font-mono font-bold">{computedAtsScore}%</span>
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Candidate Profile Quick Switcher */}
        <div>
          <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <User className="w-3 h-3 text-cyan-400" />
            <span>Select Candidate Dataset (5 Profiles):</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {CANDIDATE_PROFILES.map((p) => {
              const isSelected = p.id === selectedProfileId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectProfile(p.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-left text-xs transition-all border ${
                    isSelected
                      ? "bg-brand-600/30 border-brand-400/60 text-white font-semibold shadow-sm"
                      : "bg-surface-200/50 border-white/[0.06] text-neutral-300 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{p.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-cyan-400 shrink-0 ml-1" />}
                  </div>
                  <span className="text-[10px] text-neutral-400 block font-normal truncate">
                    {p.targetRole.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Job Role Quick Switcher */}
        <div>
          <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 text-brand-400" />
            <span>Benchmark Against Target Role:</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {TARGET_JOBS.map((j) => {
              const isSelected = j.id === selectedJobId;
              return (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => selectJob(j.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-left text-xs transition-all border ${
                    isSelected
                      ? "bg-cyan-950/40 border-cyan-400/60 text-white font-semibold shadow-sm"
                      : "bg-surface-200/50 border-white/[0.06] text-neutral-300 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{j.company}</span>
                    {isSelected && <Check className="w-3 h-3 text-emerald-400 shrink-0 ml-1" />}
                  </div>
                  <span className="text-[10px] text-neutral-400 block font-normal truncate">
                    {j.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
