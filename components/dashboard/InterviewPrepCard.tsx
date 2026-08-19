"use client";

import React, { useState, useEffect } from "react";
import { useCareer } from "@/context/CareerContext";
import { Play, Pause, MessageSquare, Mic, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function InterviewPrepCard() {
  const {
    activeInterviewCategory,
    activeQuestion,
    categoryQuestions,
    selectInterviewCategory,
    selectQuestion,
  } = useCareer();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const categories = [
    { id: "frontend", label: "Frontend Architecture" },
    { id: "system_design", label: "System Design" },
    { id: "behavioral", label: "Behavioral (STAR)" },
    { id: "leadership", label: "Leadership" },
    { id: "backend", label: "Backend & Systems" },
    { id: "product", label: "Product Engineering" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPlaying(true);
    } else {
      setIsRecording(false);
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Category selector tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = activeInterviewCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => selectInterviewCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                isActive
                  ? "bg-brand-500 text-white shadow-md font-semibold"
                  : "bg-surface-100 text-neutral-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Question Selector Pills (Category Question Bank) */}
      <div className="p-3 rounded-xl bg-surface-100/60 border border-white/[0.06] flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-mono text-neutral-400 uppercase shrink-0">
          Questions ({categoryQuestions.length}):
        </span>
        {categoryQuestions.map((q, idx) => {
          const isSelected = q.id === activeQuestion.id;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => selectQuestion(q.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold"
                  : "bg-surface-200/50 text-neutral-400 border-white/[0.04] hover:text-white hover:border-white/10"
              }`}
            >
              Q{idx + 1}: {q.title}
            </button>
          );
        })}
      </div>

      {/* Main Simulation Panel */}
      <div className="p-5 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col gap-4">
        {/* Question Box */}
        <div className="p-4 rounded-xl bg-surface-200/90 border border-brand-500/20">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-300">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Technical Interviewer ({activeQuestion.categoryLabel})</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={activeQuestion.difficulty === "Staff Level" ? "brand" : "cyan"} className="text-[10px]">
                {activeQuestion.difficulty}
              </Badge>
              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 underline underline-offset-2"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{showHints ? "Hide Hints" : "View Hints"}</span>
              </button>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed">
            &ldquo;{activeQuestion.question}&rdquo;
          </p>

          {/* Collapsible Hints Box */}
          {showHints && (
            <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-1.5 animate-in fade-in">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold">Staff-Level Rubric Hints:</span>
              <ul className="flex flex-col gap-1">
                {activeQuestion.hints.map((hint, hIdx) => (
                  <li key={hIdx} className="text-xs text-neutral-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Real-Time Audio Visualizer & Controls */}
        <div className="p-4 rounded-xl bg-surface-200/50 border border-white/[0.05] flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-sm shrink-0"
                aria-label={isPlaying ? "Pause audio stream" : "Play audio stream"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white">
                  {isRecording ? "Live Voice Answer Recording..." : "Sample Staff Candidate Response"}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {isRecording ? `${formatTimer(recordingSeconds)} / 03:00 • Recording Active` : "01:45 / 03:00 • Stream Synced"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={isRecording ? "gradient" : "outline"}
                className="text-xs h-8 px-3"
                leftIcon={
                  isRecording ? (
                    <Mic className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  ) : (
                    <Mic className="w-3.5 h-3.5 text-cyan-400" />
                  )
                }
                onClick={toggleRecording}
              >
                {isRecording ? "Stop Recording" : "Simulate My Voice"}
              </Button>
              <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                Score: {activeQuestion.score}/100
              </span>
            </div>
          </div>

          {/* Animated Audio Bars */}
          <div className="flex items-center justify-between gap-1 h-12 px-3 rounded-xl bg-neutral-950/60 border border-white/[0.05]">
            {[35, 55, 80, 45, 90, 65, 30, 75, 100, 85, 40, 60, 95, 70, 50, 80, 90, 65, 45, 30, 85, 60, 75, 40, 90, 50, 35].map(
              (val, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlaying || isRecording
                      ? "bg-gradient-to-t from-brand-500 via-indigo-400 to-cyan-400"
                      : "bg-neutral-700"
                  }`}
                  style={{
                    height: isPlaying || isRecording ? `${val}%` : "20%",
                    opacity: 0.4 + (val / 100) * 0.6,
                  }}
                />
              )
            )}
          </div>

          {/* Transcript snippet */}
          <p className="text-xs text-neutral-300 italic bg-surface-300/40 p-3 rounded-lg border border-white/[0.04] leading-relaxed">
            &ldquo;{activeQuestion.candidateSnippet}&rdquo;
          </p>
        </div>

        {/* STAR Framework Scorecard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-surface-200/70 border border-white/[0.05]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Situation</span>
            <span className="text-base font-bold text-white font-mono">{activeQuestion.starBreakdown.situation}%</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5 truncate">{activeQuestion.evaluationRubric.situation}</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-200/70 border border-white/[0.05]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Task</span>
            <span className="text-base font-bold text-white font-mono">{activeQuestion.starBreakdown.task}%</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5 truncate">{activeQuestion.evaluationRubric.task}</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-200/70 border border-white/[0.05]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Action</span>
            <span className="text-base font-bold text-white font-mono">{activeQuestion.starBreakdown.action}%</span>
            <span className="text-[10px] text-cyan-400 block mt-0.5 truncate">{activeQuestion.evaluationRubric.action}</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-200/70 border border-white/[0.05]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Result</span>
            <span className="text-base font-bold text-white font-mono">{activeQuestion.starBreakdown.result}%</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5 truncate">{activeQuestion.evaluationRubric.result}</span>
          </div>
        </div>

        {/* Diagnostics footer */}
        <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/[0.06]">
          <span>Cadence: <strong className="text-neutral-200 font-mono">{activeQuestion.pacing}</strong></span>
          <span>Filler Words: <strong className="text-emerald-400 font-mono">{activeQuestion.fillerWords}</strong></span>
          <span className="text-cyan-400 font-medium">STAR Framework Evaluated</span>
        </div>
      </div>
    </div>
  );
}
