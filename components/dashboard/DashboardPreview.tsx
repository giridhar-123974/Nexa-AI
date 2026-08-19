"use client";

import React, { useState } from "react";
import {
  Bot,
  LayoutDashboard,
  FileSearch,
  Mic,
  Activity,
  Route,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCareer } from "@/context/CareerContext";
import { ProfileSelector } from "./ProfileSelector";
import { ResumeScoreCard } from "./ResumeScoreCard";
import { SkillRadarChart } from "./SkillRadarChart";
import { InterviewPrepCard } from "./InterviewPrepCard";
import { AiSuggestionsList } from "./AiSuggestionsList";
import { RoadmapTimeline } from "./RoadmapTimeline";
import { AiCopilotChat } from "./AiCopilotChat";

export function DashboardPreview() {
  const { activeProfile, activeJob, activeQuestion } = useCareer();
  const [activeTab, setActiveTab] = useState<
    "copilot_chat" | "overview" | "resume" | "interview" | "radar" | "roadmap"
  >("overview");

  React.useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const featureId = customEvent.detail;

      if (featureId === "resume-analyzer" || featureId === "ats-checker" || featureId === "bullet-point-rewriter") {
        setActiveTab("resume");
      } else if (featureId === "mock-interview" || featureId === "interview-simulator") {
        setActiveTab("interview");
      } else if (featureId === "skill-radar" || featureId === "skill-gap-analyzer") {
        setActiveTab("radar");
      } else if (featureId === "learning-roadmap" || featureId === "roadmap-generator") {
        setActiveTab("roadmap");
      } else {
        setActiveTab("copilot_chat");
      }
    };

    window.addEventListener("nexa-switch-tab", handleSwitch);
    return () => window.removeEventListener("nexa-switch-tab", handleSwitch);
  }, []);

  const tabs = [
    { id: "overview", label: "Copilot Overview", icon: LayoutDashboard },
    { id: "copilot_chat", label: "AI Copilot Studio", icon: Bot },
    { id: "resume", label: "Resume & ATS Engine", icon: FileSearch },
    { id: "interview", label: "Voice Mock Interview", icon: Mic },
    { id: "radar", label: "Skill Gap Radar", icon: Activity },
    { id: "roadmap", label: "Learning Roadmap", icon: Route },
  ] as const;

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-radial from-brand-600/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
          <Badge variant="cyan" className="mb-4">
            Interactive Product Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            A Complete Command Center for Your Career.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Switch candidate datasets and target job benchmarks below to experience live multi-factor scoring, AST validation, and adaptive interview simulation.
          </p>
        </div>

        {/* Global Dataset & Target Role Switcher */}
        <div className="max-w-5xl mx-auto mb-6">
          <ProfileSelector />
        </div>

        {/* Dashboard Shell Frame */}
        <div className="rounded-3xl bg-surface-300/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Dashboard Header Bar */}
          <div className="px-5 py-4 border-b border-white/[0.08] bg-surface-200/70 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Tab navigation pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                      isActive
                        ? "bg-white text-neutral-950 font-semibold shadow-sm"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-neutral-950" : "text-neutral-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
              <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline-block">
                AST Model: <strong className="text-white">v4.2-neural</strong>
              </span>
              <Badge variant="emerald" dot pulse className="text-[11px]">
                Live Workspace
              </Badge>
            </div>
          </div>

          {/* Tab Content Display Area */}
          <div className="p-5 sm:p-8 bg-surface-200/30 min-h-[500px]">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left col: Score & Radar (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <ResumeScoreCard />
                  <div className="p-5 rounded-2xl bg-surface-100/80 border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          Multi-Axis Radar: {activeProfile.name}
                        </h4>
                        <p className="text-xs text-neutral-400">
                          Comparing verified candidate coordinates with {activeJob.title} benchmark.
                        </p>
                      </div>
                      <Badge variant="brand" className="text-[10px]">
                        6 Dimensions
                      </Badge>
                    </div>
                    <SkillRadarChart />
                  </div>
                </div>

                {/* Right col: Live AI Suggestions & Interview Quick test (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <AiSuggestionsList />
                  <div className="p-5 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-white">Active Voice Simulation Question</span>
                        <Badge variant="cyan" dot className="text-[10px]">
                          {activeQuestion.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-neutral-300 mb-4">
                        &ldquo;{activeQuestion.question}&rdquo;
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="glass"
                      leftIcon={<Mic className="w-3.5 h-3.5 text-cyan-400" />}
                      className="w-full justify-center text-xs"
                      onClick={() => setActiveTab("interview")}
                    >
                      Open Voice Studio (60 Questions)
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "copilot_chat" && (
              <div className="max-w-4xl mx-auto">
                <AiCopilotChat />
              </div>
            )}

            {activeTab === "resume" && (
              <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <ResumeScoreCard />
                <AiSuggestionsList />
              </div>
            )}

            {activeTab === "interview" && (
              <div className="max-w-4xl mx-auto">
                <InterviewPrepCard />
              </div>
            )}

            {activeTab === "radar" && (
              <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-surface-100/80 border border-white/[0.08]">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Algorithmic Skill Convergence: {activeProfile.name}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Vectorized multi-axis comparison against verified {activeJob.title} hiring rubric.
                  </p>
                </div>
                <SkillRadarChart />
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="max-w-4xl mx-auto">
                <RoadmapTimeline />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
