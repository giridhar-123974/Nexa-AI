"use client";

import React, { useState, useRef } from "react";
import { FeatureItem, InterviewCategory } from "@/lib/types";
import { useCareer } from "@/context/CareerContext";
import { TARGET_JOBS } from "@/lib/careerData";
import { parseResumeText, calculateAtsScore } from "@/lib/atsEngine";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Briefcase,
  ArrowRight,
  RefreshCw,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface InteractiveFeatureModalProps {
  feature: FeatureItem | null;
  onClose: () => void;
}

export function InteractiveFeatureModal({ feature, onClose }: InteractiveFeatureModalProps) {
  const {
    activeProfile,
    activeJob,
    selectJob,
    uploadCustomResume,
    activeInterviewCategory,
    activeQuestion,
    selectInterviewCategory,
    submitCurrentAnswer,
    currentEvaluation,
    userAnswerInput,
    setUserAnswerInput,
    completedRoadmapIds,
    toggleRoadmapMilestone,
    roadmapProgressPercent,
    computedResumeScore,
    computedAtsScore,
  } = useCareer();

  // Local state for interactive resume scanning inside the modal
  const [modalResumeText, setModalResumeText] = useState("");
  const [modalFileName, setModalFileName] = useState("my_resume.pdf");
  const [selectedJobId, setSelectedJobId] = useState<string>(activeJob.id);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeModalJob = TARGET_JOBS.find((j) => j.id === selectedJobId) || activeJob;

  const currentParsed = parseResumeText(
    modalResumeText || activeProfile.sampleResumeText,
    modalFileName
  );
  const currentScanResult = calculateAtsScore(currentParsed, activeModalJob);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setModalFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || "";
      setModalResumeText(text);
      triggerScan(text, file.name);
    };
    reader.readAsText(file);
  };

  const triggerScan = (textToScan = modalResumeText, fileName = modalFileName) => {
    setIsScanning(true);
    setTimeout(() => {
      uploadCustomResume(fileName, textToScan || activeProfile.sampleResumeText);
      setIsScanning(false);
      setScanCompleted(true);
    }, 600);
  };

  if (!feature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-surface-200/95 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-8">
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] bg-surface-100/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">{feature.title}</h3>
                <Badge variant="brand" className="text-[10px]">
                  Interactive Engine
                </Badge>
              </div>
              <p className="text-xs text-neutral-400">{feature.tagline}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Switch based on Feature ID */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* FEATURE 1 & 2: Resume Analyzer / ATS Checker */}
          {(feature.id === "resume-analyzer" || feature.id === "ats-checker") && (
            <div className="flex flex-col gap-6">
              {/* Target Job Selector & Quick Actions */}
              <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Select Target Job Benchmark:
                  </span>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-400" />
                    <select
                      value={selectedJobId}
                      onChange={(e) => {
                        setSelectedJobId(e.target.value);
                        selectJob(e.target.value);
                      }}
                      className="px-3 py-1.5 text-xs bg-surface-200 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-brand-400"
                    >
                      {TARGET_JOBS.map((j) => (
                        <option key={j.id} value={j.id} className="bg-neutral-950 text-white">
                          {j.title} ({j.company})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setModalResumeText(activeProfile.sampleResumeText);
                    setModalFileName(`${activeProfile.name.toLowerCase().replace(/\s+/g, "_")}_resume.pdf`);
                    triggerScan(activeProfile.sampleResumeText, `${activeProfile.name.toLowerCase().replace(/\s+/g, "_")}_resume.pdf`);
                  }}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Load {activeProfile.name}&apos;s Sample Resume
                </Button>
              </div>

              {/* Upload Drop Zone & Text Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upload Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/60 bg-surface-100/60 hover:bg-surface-100/90 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2.5 group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.txt,.md"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block mb-0.5">
                      Upload Resume File (PDF, DOCX, TXT)
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Active: {modalFileName}
                    </span>
                  </div>
                </div>

                {/* Paste Text */}
                <div className="flex flex-col gap-2">
                  <textarea
                    rows={4}
                    value={modalResumeText}
                    onChange={(e) => setModalResumeText(e.target.value)}
                    placeholder="Or paste your resume text / experience bullet points here..."
                    className="w-full p-3 text-xs font-mono bg-surface-100/90 rounded-xl border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400"
                  />
                  <Button
                    type="button"
                    variant="gradient"
                    size="sm"
                    disabled={isScanning}
                    onClick={() => triggerScan()}
                    className="w-full justify-center"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {isScanning ? "Scanning Resume AST..." : "Run Instant ATS Scan"}
                  </Button>
                </div>
              </div>

              {/* Scan Results Panel */}
              {scanCompleted && (
                <div className="p-5 rounded-2xl bg-surface-100/90 border border-emerald-500/30 shadow-xl flex flex-col gap-5 animate-in fade-in zoom-in-95">
                  {/* Top Scores Gauge Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-white/10"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-emerald-400 transition-all duration-700 ease-out"
                            strokeDasharray={`${currentScanResult.overallScore}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-bold font-mono text-white leading-none">
                            {currentScanResult.overallScore}
                          </span>
                          <span className="text-[9px] text-neutral-400 font-mono">/100</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white">ATS Scan Completed</h4>
                          <Badge variant="emerald" dot>
                            Verified Match
                          </Badge>
                        </div>
                        <p className="text-xs text-neutral-300">
                          Evaluated against <strong className="text-cyan-400">{activeModalJob.title}</strong> at {activeModalJob.company}.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                      <div className="p-3 rounded-xl bg-surface-200/80 border border-white/10 text-center">
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">ATS Pass Rate</span>
                        <span className="text-base font-bold font-mono text-cyan-400">{currentScanResult.atsScore}%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-surface-200/80 border border-white/10 text-center">
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">Keyword Match</span>
                        <span className="text-base font-bold font-mono text-emerald-400">{currentScanResult.keywordMatchScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Keywords Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Matched Required Keywords ({currentScanResult.matchedKeywords.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentScanResult.matchedKeywords.map((kw) => (
                          <span key={kw} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                      <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-2">
                        <AlertCircle className="w-3.5 h-3.5" /> Missing Role Keywords ({currentScanResult.missingKeywords.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentScanResult.missingKeywords.length > 0 ? (
                          currentScanResult.missingKeywords.map((kw) => (
                            <span key={kw} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-xs font-mono border border-rose-500/30">
                              + {kw}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-neutral-400">All required keywords found!</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Suggestions List */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-semibold text-neutral-300">Actionable Suggestions:</span>
                    {currentScanResult.improvementSuggestions.map((sug) => (
                      <div key={sug.id} className="p-3 rounded-xl bg-surface-200/80 border border-white/[0.06] flex items-start justify-between gap-3 text-xs">
                        <div>
                          <span className="font-semibold text-white block mb-0.5">{sug.title}</span>
                          <p className="text-[11px] text-neutral-400">{sug.description}</p>
                        </div>
                        <span className="font-mono font-bold text-emerald-400 whitespace-nowrap">{sug.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FEATURE 3: Interview Preparation */}
          {feature.id === "interview-prep" && (
            <div className="flex flex-col gap-5">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(["frontend", "backend", "system_design", "react", "javascript", "typescript", "nodejs", "sql", "behavioral"] as InterviewCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => selectInterviewCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      activeInterviewCategory === cat
                        ? "bg-brand-500 text-white font-semibold shadow-md"
                        : "bg-surface-100 text-neutral-300 hover:text-white"
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Question Banner */}
              <div className="p-4 rounded-xl bg-surface-100/90 border border-brand-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-brand-300">{activeQuestion.categoryLabel}</span>
                  <Badge variant="cyan" className="text-[10px]">{activeQuestion.difficulty}</Badge>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed mb-3">
                  &ldquo;{activeQuestion.question}&rdquo;
                </h4>

                <textarea
                  rows={4}
                  value={userAnswerInput}
                  onChange={(e) => setUserAnswerInput(e.target.value)}
                  placeholder="Type your technical answer here..."
                  className="w-full p-3 text-xs bg-surface-200 rounded-xl border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400 mb-3"
                />

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUserAnswerInput(activeQuestion.sampleGoodAnswer);
                      submitCurrentAnswer(activeQuestion.sampleGoodAnswer);
                    }}
                  >
                    Load Sample Answer
                  </Button>
                  <Button
                    type="button"
                    variant="gradient"
                    size="sm"
                    disabled={!userAnswerInput.trim()}
                    onClick={() => submitCurrentAnswer()}
                    rightIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Evaluate Answer
                  </Button>
                </div>
              </div>

              {/* Evaluation Output */}
              {currentEvaluation && (
                <div className="p-4 rounded-xl bg-surface-100/90 border border-emerald-500/30 flex flex-col gap-3 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-white">Score: {currentEvaluation.score}/100</span>
                    <Badge variant={currentEvaluation.isPassed ? "emerald" : "amber"}>
                      {currentEvaluation.isPassed ? "Passed" : "Needs Detail"}
                    </Badge>
                  </div>
                  <p className="text-neutral-300">{currentEvaluation.feedbackMessage}</p>
                </div>
              )}
            </div>
          )}

          {/* FEATURE 4: Skill Gap Analysis */}
          {feature.id === "skill-gap-analysis" && (
            <div className="flex flex-col gap-5">
              <div className="p-4 rounded-xl bg-surface-100/80 border border-white/[0.08]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">Multi-Axis Competency Radar</h4>
                    <p className="text-xs text-neutral-400">Comparing {activeProfile.name} with {activeJob.title} benchmark.</p>
                  </div>
                  <Badge variant="brand" className="text-[10px]">6 Dimensions</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {activeProfile.skillRadar.map((s) => (
                    <div key={s.name} className="p-2.5 rounded-lg bg-surface-200/80 border border-white/10 text-xs">
                      <div className="flex justify-between font-semibold text-white mb-1">
                        <span>{s.name}</span>
                        <span className="text-cyan-400 font-mono">{s.current}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full" style={{ width: `${s.current}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 5: Learning Roadmap */}
          {feature.id === "learning-roadmap" && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-surface-100/80 border border-white/[0.08] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Targeted Roadmap ({activeProfile.name})</h4>
                  <p className="text-xs text-neutral-400">{roadmapProgressPercent}% Completed</p>
                </div>
                <div className="w-24 bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full" style={{ width: `${roadmapProgressPercent}%` }} />
                </div>
              </div>

              <div className="space-y-2.5">
                {activeProfile.roadmapMilestones.map((step) => {
                  const isDone = completedRoadmapIds.includes(step.id);
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleRoadmapMilestone(step.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                        isDone ? "bg-surface-100/50 border-emerald-500/40" : "bg-surface-100 border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className={`w-4 h-4 ${isDone ? "text-emerald-400" : "text-neutral-500"}`} />
                        <div>
                          <span className={`font-semibold ${isDone ? "text-neutral-400 line-through" : "text-white"}`}>
                            {step.phase}: {step.title}
                          </span>
                          <span className="text-[11px] text-neutral-400 block">{step.deliverable}</span>
                        </div>
                      </div>
                      <Badge variant={isDone ? "emerald" : "neutral"} className="text-[10px]">
                        {isDone ? "Done" : "Mark Done"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FEATURE 6: Career Progress Dashboard */}
          {feature.id === "career-progress" && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-surface-100 border border-white/10 text-center">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Resume Score</span>
                  <span className="text-2xl font-bold font-mono text-white">{computedResumeScore}/100</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-100 border border-white/10 text-center">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">ATS Match</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">{computedAtsScore}%</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-100 border border-white/10 text-center">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Roadmap Progress</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">{roadmapProgressPercent}%</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-100 border border-white/10 text-center">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Target Benchmark</span>
                  <span className="text-sm font-bold font-mono text-brand-300 truncate block mt-1">{activeJob.company}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-surface-100/70 flex items-center justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={() => {
              onClose();
              const el = document.getElementById("dashboard");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Open in Full Command Center
          </Button>
        </div>
      </div>
    </div>
  );
}
