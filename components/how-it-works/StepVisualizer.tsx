"use client";

import React from "react";
import { UploadCloud, ShieldCheck, Mic, FileDown, FileCode } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface StepVisualizerProps {
  type: "upload" | "analyzer" | "interview" | "match";
}

export function StepVisualizer({ type }: StepVisualizerProps) {
  if (type === "upload") {
    return (
      <div className="p-6 rounded-2xl bg-surface-100/90 border border-white/[0.08] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-brand-400" />
            <span className="text-xs font-semibold text-white">Source Ingestion & AST Extraction</span>
          </div>
          <Badge variant="cyan" dot className="text-[10px]">Processing</Badge>
        </div>

        <div className="p-4 rounded-xl border border-dashed border-white/20 bg-surface-200/50 flex flex-col items-center justify-center gap-2 text-center py-6">
          <FileCode className="w-8 h-8 text-cyan-400 animate-bounce" />
          <span className="text-xs font-mono text-white">resume_giridhar_staff_fe.pdf</span>
          <span className="text-[10px] text-neutral-400 font-mono">148KB • Parsed into 12 semantic nodes</span>
        </div>

        <div className="flex flex-col gap-1.5 text-xs font-mono">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Extracted Experience Nodes:</span>
            <span className="text-emerald-400">100% Valid</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>GitHub Repositories Indexed:</span>
            <span className="text-brand-300">4 Active Repos</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "analyzer") {
    return (
      <div className="p-6 rounded-2xl bg-surface-100/90 border border-white/[0.08] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold text-white">ATS Parser Simulation</span>
          </div>
          <Badge variant="emerald" dot className="text-[10px]">98.4% Match</Badge>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-surface-200/90 border border-emerald-500/30 flex items-center justify-between">
            <span className="text-neutral-300">Workday AST Tokenizer</span>
            <span className="text-emerald-400 font-bold">PASS (0 errors)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-200/90 border border-emerald-500/30 flex items-center justify-between">
            <span className="text-neutral-300">Greenhouse Column Parser</span>
            <span className="text-emerald-400 font-bold">PASS (100% flow)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-200/90 border border-emerald-500/30 flex items-center justify-between">
            <span className="text-neutral-300">Lever Keyword Density</span>
            <span className="text-cyan-400 font-bold">24 / 26 Keywords</span>
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 mt-1">
          Zero two-column fragmentation hazards detected. Machine-readable across all major enterprise ATS platforms.
        </p>
      </div>
    );
  }

  if (type === "interview") {
    return (
      <div className="p-6 rounded-2xl bg-surface-100/90 border border-white/[0.08] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-semibold text-white">Real-Time Voice AI Simulation</span>
          </div>
          <Badge variant="cyan" dot pulse className="text-[10px]">Latency 210ms</Badge>
        </div>

        <div className="p-3 rounded-lg bg-surface-200/80 border border-white/[0.05] text-xs">
          <span className="text-[10px] font-mono text-brand-300 font-bold block mb-1">AI Interviewer:</span>
          &ldquo;Tell me about a complex race condition in your distributed state and how you resolved it.&rdquo;
        </div>

        <div className="flex items-center justify-between gap-1 h-8 px-2 rounded-lg bg-neutral-950/60 border border-white/[0.05]">
          {[30, 70, 95, 45, 80, 100, 60, 40, 85, 90, 50, 75, 95, 40, 60, 80].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-brand-500 to-cyan-400 rounded-full"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">STAR Score: <strong className="text-emerald-400">96/100</strong></span>
          <span className="text-neutral-400">Pacing: <strong className="text-cyan-400">140 WPM</strong></span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-surface-100/90 border border-white/[0.08] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileDown className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold text-white">Targeted Submission Package</span>
        </div>
        <Badge variant="emerald" className="text-[10px]">Ready to Submit</Badge>
      </div>

      <div className="p-3 rounded-xl bg-surface-200/90 border border-white/[0.05] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">Tailored ATS-Optimized Resume</span>
          <span className="text-[10px] text-neutral-400 font-mono">PDF/A-1b Verified • Single Column</span>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold">100% ATS Ready</span>
      </div>

      <div className="p-3 rounded-xl bg-surface-200/90 border border-white/[0.05] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">Role Talking Points Matrix</span>
          <span className="text-[10px] text-neutral-400 font-mono">6 Custom STAR Anecdotes</span>
        </div>
        <span className="text-xs font-mono text-cyan-400 font-bold">Generated</span>
      </div>
    </div>
  );
}
