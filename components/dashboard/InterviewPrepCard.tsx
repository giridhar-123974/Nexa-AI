"use client";

import React, { useState } from "react";
import { useCareer } from "@/context/CareerContext";
import { InterviewCategory } from "@/lib/types";
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Send,
  RefreshCw,
  Trophy,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function InterviewPrepCard() {
  const {
    activeInterviewCategory,
    activeQuestion,
    categoryQuestions,
    userAnswerInput,
    setUserAnswerInput,
    currentEvaluation,
    selectInterviewCategory,
    selectQuestion,
    submitCurrentAnswer,
    nextQuestion,
    resetInterviewCategoryProgress,
    interviewStats,
  } = useCareer();

  const [showHints, setShowHints] = useState(false);
  const [showExpectedAnswer, setShowExpectedAnswer] = useState(false);

  const categories: { id: InterviewCategory; label: string }[] = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "system_design", label: "System Design" },
    { id: "react", label: "React 19" },
    { id: "javascript", label: "JavaScript" },
    { id: "typescript", label: "TypeScript" },
    { id: "nodejs", label: "Node.js" },
    { id: "sql", label: "SQL & DB" },
    { id: "behavioral", label: "Behavioral" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswerInput.trim()) return;
    submitCurrentAnswer();
  };

  const handleLoadSample = () => {
    setUserAnswerInput(activeQuestion.sampleGoodAnswer);
    submitCurrentAnswer(activeQuestion.sampleGoodAnswer);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header: Progress & Category Pills */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-100/90 border border-white/[0.08] flex flex-col gap-4">
        {/* Statistics Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-cyan-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Deterministic Technical & Behavioral Simulator
              </h3>
              <p className="text-xs text-neutral-400">
                Type your answer to receive instant rubric scoring and keyword diagnostic feedback.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex flex-col items-end">
              <span className="text-neutral-400">Category Progress</span>
              <span className="text-cyan-400 font-bold">
                {interviewStats.categoryCompletionPercent}% Done ({interviewStats.passedCount} Passed)
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-neutral-400 hover:text-white h-7 px-2 text-[11px]"
              onClick={resetInterviewCategoryProgress}
              leftIcon={<RefreshCw className="w-3 h-3" />}
            >
              Reset Category
            </Button>
          </div>
        </div>

        {/* Category Selector Tabs (9 Categories) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = activeInterviewCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectInterviewCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-brand-500 text-white font-semibold shadow-md"
                    : "bg-surface-200/80 text-neutral-300 hover:text-white hover:bg-surface-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Selection Bar */}
      <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/[0.06] flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-mono text-neutral-400 uppercase shrink-0">
          Questions:
        </span>
        {categoryQuestions.map((q, idx) => {
          const isSelected = q.id === activeQuestion.id;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => selectQuestion(q.id)}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold"
                  : "bg-surface-200/50 text-neutral-400 border-white/[0.04] hover:text-white"
              }`}
            >
              Q{idx + 1}: {q.title}
            </button>
          );
        })}
      </div>

      {/* Main Question & Interactive Answer Panel */}
      <div className="p-6 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col gap-5">
        {/* Question Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface-200/90 border border-brand-500/20 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-300">
                {activeQuestion.categoryLabel}
              </span>
              <span className="text-neutral-600">•</span>
              <Badge
                variant={activeQuestion.difficulty === "Staff Level" ? "brand" : "cyan"}
                className="text-[10px]"
              >
                {activeQuestion.difficulty}
              </Badge>
            </div>

            <button
              type="button"
              onClick={() => setShowHints(!showHints)}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHints ? "Hide Rubric Hints" : "View Rubric Hints"}</span>
            </button>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            &ldquo;{activeQuestion.question}&rdquo;
          </h4>

          {/* Hints Accordion */}
          {showHints && (
            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-1.5 animate-in fade-in">
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                Evaluation Rubric Dimensions:
              </span>
              <ul className="space-y-1">
                {activeQuestion.hints.map((hint, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* User Answer Text Area */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="user-answer-input" className="text-neutral-300 font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Your Answer / Talking Points:</span>
            </label>
            <span className="text-neutral-500 font-mono">
              {userAnswerInput.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            id="user-answer-input"
            rows={5}
            value={userAnswerInput}
            onChange={(e) => setUserAnswerInput(e.target.value)}
            placeholder="Type your technical response here, explaining architecture, data structures, trade-offs, and STAR results..."
            className="w-full p-4 text-xs sm:text-sm font-sans bg-surface-200/90 rounded-xl border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
            >
              Insert Staff-Level Sample Answer
            </Button>

            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="gradient"
                size="md"
                disabled={!userAnswerInput.trim()}
                rightIcon={<Send className="w-3.5 h-3.5" />}
              >
                Evaluate Answer
              </Button>
              {currentEvaluation && (
                <Button
                  type="button"
                  variant="glass"
                  size="md"
                  onClick={nextQuestion}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Next Question
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Live Evaluation Result Card */}
        {currentEvaluation && (
          <div className="p-5 rounded-2xl bg-surface-200/90 border border-brand-500/30 shadow-lg flex flex-col gap-4 animate-in fade-in zoom-in-95">
            {/* Top Score Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg ${
                    currentEvaluation.score >= 85
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : currentEvaluation.score >= 70
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {currentEvaluation.score}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-white">Evaluation Score</h5>
                    <Badge variant={currentEvaluation.isPassed ? "emerald" : "amber"}>
                      {currentEvaluation.isPassed ? "Pass / Ready" : "Needs Expansion"}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-300">{currentEvaluation.feedbackMessage}</p>
                </div>
              </div>
            </div>

            {/* Expected Key Points Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col gap-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Covered Key Points ({currentEvaluation.matchedPoints.length})
                </span>
                <ul className="space-y-1 text-xs text-neutral-300">
                  {currentEvaluation.matchedPoints.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 flex flex-col gap-2">
                <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Recommended Additions ({currentEvaluation.missingPoints.length})
                </span>
                <ul className="space-y-1 text-xs text-neutral-300">
                  {currentEvaluation.missingPoints.length > 0 ? (
                    currentEvaluation.missingPoints.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-neutral-400">All key architectural dimensions covered!</li>
                  )}
                </ul>
              </div>
            </div>

            {/* STAR Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-2.5 rounded-lg bg-surface-100 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Situation</span>
                <span className="text-sm font-bold font-mono text-cyan-400">{currentEvaluation.starBreakdown.situation}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-100 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Task</span>
                <span className="text-sm font-bold font-mono text-cyan-400">{currentEvaluation.starBreakdown.task}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-100 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Action</span>
                <span className="text-sm font-bold font-mono text-emerald-400">{currentEvaluation.starBreakdown.action}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-100 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Result</span>
                <span className="text-sm font-bold font-mono text-emerald-400">{currentEvaluation.starBreakdown.result}%</span>
              </div>
            </div>

            {/* Expected Answer Accordion */}
            <div className="pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setShowExpectedAnswer(!showExpectedAnswer)}
                className="text-xs text-neutral-400 hover:text-white flex items-center justify-between w-full"
              >
                <span>View Reference Answer Blueprint</span>
                {showExpectedAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showExpectedAnswer && (
                <div className="mt-2 p-3.5 rounded-xl bg-surface-100/90 border border-white/10 text-xs text-neutral-200 leading-relaxed font-sans animate-in fade-in">
                  {activeQuestion.sampleGoodAnswer}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
