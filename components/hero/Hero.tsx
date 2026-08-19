"use client";

import React from "react";
import { ArrowRight, Play, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroDashboardMock } from "./HeroDashboardMock";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Background ambient gradient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-brand-600/20 via-cyan-500/15 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header Stack */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Top Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-brand-400/40 transition-colors shadow-sm cursor-pointer group">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-medium text-neutral-200">
                Next-Gen Career Copilot Engine
              </span>
              <span className="text-[10px] text-neutral-400 font-mono flex items-center group-hover:text-cyan-300 transition-colors">
                v1.4 Available <ChevronRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6"
          >
            Land Better Opportunities with <span className="text-gradient-brand">AI.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal"
          >
            Prepare for interviews, optimize your resume, discover missing skills, and build confidence with one intelligent platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-8"
          >
            <Button
              size="lg"
              variant="gradient"
              magnetic
              glow
              className="w-full sm:w-auto px-8"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                const el = document.getElementById("pricing");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Free
            </Button>

            <Button
              size="lg"
              variant="glass"
              magnetic
              className="w-full sm:w-auto px-8"
              leftIcon={<Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />}
              onClick={() => {
                const el = document.getElementById("dashboard");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Interactive Demo
            </Button>
          </motion.div>

          {/* Trust Value Points - Value first, zero fabricated metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Deterministic AST Parser
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sub-250ms Voice Latency
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Data Model Training
            </span>
          </motion.div>
        </div>

        {/* 3D Dashboard Mock Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <HeroDashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
