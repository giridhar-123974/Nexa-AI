"use client";

import React from "react";
import { Zap, Target, TrendingUp, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

export function WhyChoose() {
  const pillars = [
    {
      icon: Zap,
      badge: "3.2x Velocity",
      title: "Prepare Faster",
      tagline: "Targeted High-Signal Focus",
      description:
        "Stop wasting hundreds of hours on generic question lists. Nexa AI isolates your exact competency gaps and delivers focused drills for your target role.",
      points: [
        "Personalized milestone roadmap",
        "Role-specific STAR interview questions",
        "Zero irrelevant study material",
      ],
      color: "from-brand-500/20 to-indigo-500/10",
      accent: "text-brand-400",
    },
    {
      icon: Target,
      badge: "98.4% ATS Accuracy",
      title: "Improve Resume Quality",
      tagline: "Deterministic AST Validation",
      description:
        "Evaluate your resume using the exact Abstract Syntax Tree (AST) parsing standards employed by Greenhouse, Lever, and Workday to ensure zero rejected applications.",
      points: [
        "Quantified impact bullet analysis",
        "Action verb strength scoring",
        "Domain keyword density checks",
      ],
      color: "from-cyan-500/20 to-teal-500/10",
      accent: "text-cyan-400",
    },
    {
      icon: TrendingUp,
      badge: "Real-Time Tracking",
      title: "Track Career Growth",
      tagline: "Continuous Multi-Axis Progress",
      description:
        "Visualize your technical depth across System Design, Core Frameworks, and Leadership with dynamic radar metrics and weekly achievement milestones.",
      points: [
        "Dynamic multi-axis skill radar",
        "Verified benchmark comparisons",
        "Weekly progress goal tracking",
      ],
      color: "from-emerald-500/20 to-green-500/10",
      accent: "text-emerald-400",
    },
  ];

  return (
    <section id="why-nexa" className="py-24 relative overflow-hidden bg-surface-200/20 border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-4">
            The Nexa Advantage
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Why Choose Nexa AI?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Engineered specifically for ambitious students and tech professionals preparing for high-impact software engineering and product roles.
          </p>
        </div>

        {/* 3 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <GlassCard
                key={idx}
                spotlight
                hoverElevation
                className="p-8 flex flex-col justify-between relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} border border-white/10 flex items-center justify-center ${p.accent} shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="neutral" className="text-[10px] font-mono">
                      {p.badge}
                    </Badge>
                  </div>

                  <span className={`text-xs font-mono font-semibold ${p.accent} uppercase tracking-wider block mb-1`}>
                    {p.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.06] flex flex-col gap-2">
                  {p.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <ShieldCheck className={`w-3.5 h-3.5 ${p.accent} shrink-0`} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
