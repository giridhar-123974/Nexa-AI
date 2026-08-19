"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Check, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";

export function Pricing() {
  const tiers = [
    {
      id: "free",
      name: "Free Forever",
      price: "$0",
      period: "forever",
      tagline: "Essential tools for students and job seekers starting their preparation.",
      ctaText: "Start Exploring",
      ctaVariant: "outline" as const,
      popular: false,
      features: [
        "1 Complete Resume AST Diagnostic Scan",
        "Deterministic ATS Keyword Compatibility",
        "Access to 10 Practice Interview Questions",
        "Multi-Axis Skill Radar Visualization",
        "Standard Community Support",
      ],
      action: () => {
        const el = document.getElementById("dashboard");
        el?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "pro",
      name: "Pro Copilot",
      price: "$19",
      period: "/month",
      badge: "Coming Soon",
      tagline: "Full access to advanced AST rewrites, unlimited interview simulations, and tailored roadmaps.",
      ctaText: "Join Early Access Waitlist",
      ctaVariant: "gradient" as const,
      popular: true,
      features: [
        "Unlimited Resume AST Scans & Rewrites",
        "Full 60-Question Staff & Senior Question Bank",
        "Interactive Voice & STAR Rubric Scoring",
        "Targeted Multi-Phase Study Roadmap",
        "Job Description Tailoring & Keyword Matcher",
        "Priority Early Feature Access",
      ],
      action: () => {
        const el = document.getElementById("cta-section");
        el?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "enterprise",
      name: "University & Teams",
      price: "Custom",
      period: "per cohort",
      tagline: "Cohort-wide career placement analytics for bootcamps, universities, and organizations.",
      ctaText: "Contact for Cohorts",
      ctaVariant: "glass" as const,
      popular: false,
      features: [
        "Cohort Career Readiness Dashboard",
        "Bulk Student Resume AST Diagnostics",
        "Custom Technical Interview Rubrics",
        "Dedicated Account Lead & Workshop Onboarding",
        "SOC-2 Type II Ingestion & Privacy Compliance",
      ],
      action: () => {
        window.location.href = "mailto:partnerships@nexa.ai?subject=University%20%26%20Team%20Cohort%20Inquiry";
      },
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-4">
            Honest & Transparent Tiers
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Invest in High-Impact Preparation.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Transparent pricing with zero hidden fees. Start exploring free today without entering a credit card.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-16">
          {tiers.map((tier) => (
            <GlassCard
              key={tier.id}
              spotlight
              hoverElevation
              className={`p-8 flex flex-col justify-between relative rounded-3xl ${
                tier.popular
                  ? "border-brand-500/50 bg-surface-100/90 shadow-[0_0_40px_rgba(99,102,241,0.15)] ring-1 ring-brand-500/30"
                  : "border-white/10 bg-surface-200/50"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  {tier.badge && (
                    <Badge variant="cyan" dot pulse className="text-[10px]">
                      {tier.badge}
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                    {tier.price}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {tier.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="flex flex-col gap-3 mb-8">
                  <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                    What&apos;s Included:
                  </span>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                variant={tier.ctaVariant}
                glow={tier.popular}
                size="md"
                className="w-full justify-center"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={tier.action}
              >
                {tier.ctaText}
              </Button>
            </GlassCard>
          ))}
        </div>

        {/* Value Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 border-t border-white/[0.08] text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">100% Data Privacy</h4>
              <p className="text-[11px] text-neutral-400">Zero model training on submissions.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Instant Exploration</h4>
              <p className="text-[11px] text-neutral-400">Interactive live showcase ready immediately.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">No Credit Card Required</h4>
              <p className="text-[11px] text-neutral-400">Free forever tier with zero commitments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
