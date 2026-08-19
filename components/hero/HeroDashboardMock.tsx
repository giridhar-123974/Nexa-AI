"use client";

import React, { useRef, useState, MouseEvent } from "react";
import {
  Mic,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function HeroDashboardMock() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 6, y: -4 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 4, y: -3 });
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto perspective-1000 py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow beneath the card */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 via-cyan-500/15 to-emerald-500/10 rounded-3xl filter blur-3xl opacity-60 -z-10 animate-pulse-glow" />

      {/* Floating Card 1: Live ATS Matcher badge */}
      <div className="hidden sm:flex absolute -top-4 -left-6 z-20 items-center gap-3 p-3 rounded-2xl bg-surface-200/95 backdrop-blur-xl border border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-float">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">ATS Pass Rate</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              98.4%
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">Greenhouse & Lever Compliant</p>
        </div>
      </div>

      {/* Floating Card 2: Live AI Interview Feedback */}
      <div className="hidden sm:flex absolute -bottom-6 -right-6 z-20 items-center gap-3 p-3.5 rounded-2xl bg-surface-200/95 backdrop-blur-xl border border-brand-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-float-delayed">
        <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
          <Mic className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">Mock Interview Simulator</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-[11px] text-neutral-400">STAR Score: 94/100 • 0 filler words</p>
        </div>
      </div>

      {/* Main 3D Card Dashboard Container */}
      <div
        ref={containerRef}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="rounded-2xl sm:rounded-3xl bg-surface-300/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Mock OS / Browser Window Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-surface-200/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs text-neutral-400 font-mono hidden sm:inline-block">
              nexa.ai/app/career-copilot
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Badge variant="cyan" dot pulse className="text-[11px]">
              AI Engine Connected
            </Badge>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-semibold text-white">
              JD
            </div>
          </div>
        </div>

        {/* Realistic SaaS Dashboard Internal Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 bg-gradient-to-b from-surface-200/40 to-surface-300/80">
          {/* Col 1: Resume Score & Lexical Impact (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-100/70 border border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neutral-300">Resume Impact Score</span>
                <Badge variant="emerald" className="text-[10px]">Optimal</Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* Circular Score Gauge */}
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400 transition-all duration-1000"
                      strokeDasharray="94, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-bold text-white leading-none">94</span>
                    <span className="text-[9px] text-neutral-400">/100</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-neutral-400">Quantified metrics:</span>
                    <span className="text-emerald-300 font-medium">96%</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-neutral-400">Action verb power:</span>
                    <span className="text-cyan-300 font-medium">92%</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-neutral-400">Structure & length:</span>
                    <span className="text-brand-300 font-medium">95%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Targeted Role Readiness */}
            <div className="p-4 rounded-xl bg-surface-100/70 border border-white/[0.08] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-300">Target Role Fit</span>
                <span className="text-xs font-mono text-cyan-400 font-medium">Senior Staff FE</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full w-[91%]" />
              </div>
              <p className="text-[11px] text-neutral-400">
                12 of 13 core requirements matched. 1 minor gap in Distributed Caching.
              </p>
            </div>
          </div>

          {/* Col 2: Voice Interview Simulation Waveform (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-100/70 border border-white/[0.08] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-white">Live System Design Mock</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">08:42 / 20:00</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-200/80 border border-white/[0.05] text-xs text-neutral-300 mb-3">
                  <span className="text-brand-300 font-semibold font-mono text-[11px] block mb-1">
                    AI Interviewer:
                  </span>
                  &ldquo;How would you handle cache invalidation across distributed edge clusters during sudden traffic spikes?&rdquo;
                </div>
              </div>

              {/* Dynamic waveform visualizer */}
              <div className="py-2">
                <div className="text-[10px] text-neutral-400 mb-1 flex justify-between font-mono">
                  <span>Candidate Audio Stream</span>
                  <span className="text-emerald-400">STAR Confidence: High</span>
                </div>
                <div className="flex items-center justify-between gap-1 h-10 px-2 rounded-lg bg-surface-200/90 border border-white/[0.05]">
                  {[24, 45, 68, 90, 40, 75, 95, 60, 30, 85, 100, 70, 50, 80, 92, 45, 60, 35, 75, 55, 90, 65, 40, 20].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-brand-500 to-cyan-400 rounded-full transition-all duration-300"
                        style={{ height: `${height}%`, opacity: 0.3 + (height / 100) * 0.7 }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct, metric-anchored answer
                </span>
                <span className="text-neutral-400 font-mono">148 WPM</span>
              </div>
            </div>
          </div>

          {/* Col 3: Real-Time AI Suggestions (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="p-4 rounded-xl bg-surface-100/70 border border-white/[0.08] h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neutral-300">Live AI Suggestions</span>
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="p-2.5 rounded-lg bg-surface-200/90 border border-brand-500/20 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-brand-300 font-medium mb-1">
                    <span>Keyword Optimization</span>
                    <span className="text-emerald-400">+12%</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-tight">
                    Add &lsquo;Next.js App Router&rsquo; to Lead Experience section.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-200/90 border border-cyan-500/20 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-cyan-300 font-medium mb-1">
                    <span>Bullet Quantifier</span>
                    <span className="text-emerald-400">+18%</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-tight">
                    Quantify latency reduction from &lsquo;improved speed&rsquo; to &lsquo;cut LCP by 410ms&rsquo;.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
