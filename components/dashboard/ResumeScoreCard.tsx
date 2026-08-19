"use client";

import React, { useState, useRef } from "react";
import { useCareer } from "@/context/CareerContext";
import { TARGET_JOBS } from "@/lib/careerData";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowRight,
  Briefcase,
  User,
  Mail,
  Phone,
  GraduationCap,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ResumeScoreCard() {
  const {
    activeProfile,
    activeJob,
    selectJob,
    parsedResume,
    atsAnalysis,
    uploadCustomResume,
    resetToProfileResume,
    computedResumeScore,
    computedAtsScore,
    computedKeywordMatch,
    appliedScoreBoost,
  } = useCareer();

  const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "extracted" | "upload">("overview");
  const [pastedText, setPastedText] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      uploadCustomResume(file.name, text || activeProfile.sampleResumeText);
      setActiveTab("overview");
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) return;
    uploadCustomResume("pasted_resume.txt", pastedText);
    setPastedText("");
    setActiveTab("overview");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner: Benchmark Target Job & Quick Upload Actions */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-100/90 border border-white/[0.08] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
            Target Job Specification
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-400" />
              {activeJob.title}
            </h3>
            <span className="text-xs text-neutral-400 font-normal">
              ({activeJob.company} • {activeJob.salaryBand})
            </span>
          </div>
        </div>

        {/* Quick Job Switcher & Upload Action */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Button
            type="button"
            size="sm"
            variant="gradient"
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
          >
            Upload & Scan Resume
          </Button>

          <select
            id="job-select"
            value={activeJob.id}
            onChange={(e) => selectJob(e.target.value)}
            className="px-3 py-1.5 text-xs bg-surface-200 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-400"
          >
            {TARGET_JOBS.map((j) => (
              <option key={j.id} value={j.id} className="bg-neutral-950 text-white">
                {j.title} ({j.company})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "overview"
                ? "bg-white text-neutral-950 font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            ATS Score Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("keywords")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "keywords"
                ? "bg-white text-neutral-950 font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Keyword Matcher ({atsAnalysis.matchedKeywords.length}/{activeJob.requiredKeywords.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("extracted")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "extracted"
                ? "bg-white text-neutral-950 font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Extracted Metadata ({parsedResume.skills.length} Skills)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "upload"
                ? "bg-cyan-500 text-neutral-950 font-semibold shadow-sm"
                : "text-cyan-400 hover:text-cyan-300"
            }`}
          >
            Upload Resume
          </button>
        </div>

        {parsedResume.isCustomUpload && (
          <button
            type="button"
            onClick={resetToProfileResume}
            className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 underline"
          >
            <RefreshCw className="w-3 h-3" /> Reset to {activeProfile.name} Default
          </button>
        )}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-5">
          {/* Main Gauges Row */}
          <div className="p-6 rounded-2xl bg-surface-100/80 border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: SVG Gauge */}
            <div className="md:col-span-4 flex items-center justify-center sm:justify-start gap-4">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
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
                    strokeDasharray={`${computedResumeScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-white leading-none font-mono">
                    {computedResumeScore}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">/100</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-bold text-white">Composite Score</h4>
                  <Badge variant={computedResumeScore >= 90 ? "emerald" : "amber"} dot>
                    {computedResumeScore >= 90 ? "Optimal" : "Competitive"}
                  </Badge>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Active File: <strong className="text-white font-mono">{parsedResume.fileName}</strong>
                </p>
                {appliedScoreBoost > 0 && (
                  <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                    +{appliedScoreBoost} pts applied modifications
                  </span>
                )}
              </div>
            </div>

            {/* Right: Sub-Dimension Metrics */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">ATS Pass Rate</span>
                <span className="text-xl font-bold font-mono text-cyan-400">{computedAtsScore}%</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${computedAtsScore}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Keyword Match</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{computedKeywordMatch}%</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${computedKeywordMatch}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Action Verbs</span>
                <span className="text-xl font-bold font-mono text-brand-300">{atsAnalysis.actionVerbScore}%</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-brand-400 h-full rounded-full" style={{ width: `${atsAnalysis.actionVerbScore}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Impact Metrics</span>
                <span className="text-xl font-bold font-mono text-amber-400">{atsAnalysis.quantifiedImpactCount} found</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${Math.min(100, atsAnalysis.quantifiedImpactCount * 20)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Improvement Suggestions */}
          <div className="p-5 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <h4 className="text-sm font-semibold text-white">
                  Deterministic Improvement Suggestions ({atsAnalysis.improvementSuggestions.length})
                </h4>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Click to apply fixes in real-time
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {atsAnalysis.improvementSuggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-3.5 rounded-xl bg-surface-200/70 border border-white/[0.06] flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Zap className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block mb-0.5">
                        {sug.title}
                      </span>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        {sug.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 whitespace-nowrap">
                    {sug.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. KEYWORDS TAB */}
      {activeTab === "keywords" && (
        <div className="p-5 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col gap-5">
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">
              Role Keyword Density Diagnostic: {activeJob.title}
            </h4>
            <p className="text-xs text-neutral-400">
              Evaluates direct text token match against enterprise hiring requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matched Keywords */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Verified Matched Keywords ({atsAnalysis.matchedKeywords.length})</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {atsAnalysis.matchedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/30"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-rose-400">
                <span>Missing High-Signal Keywords ({atsAnalysis.missingKeywords.length})</span>
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {atsAnalysis.missingKeywords.length > 0 ? (
                  atsAnalysis.missingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 text-xs font-mono border border-rose-500/30"
                    >
                      + {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-neutral-400">All required keywords detected!</span>
                )}
              </div>
            </div>
          </div>

          {/* Bonus Differentiators */}
          {activeJob.bonusKeywords.length > 0 && (
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col gap-2">
              <span className="text-xs font-semibold text-cyan-400">
                Differentiating Bonus Keywords for {activeJob.company}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeJob.bonusKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-mono border border-cyan-500/30"
                  >
                    ★ {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. EXTRACTED METADATA TAB */}
      {activeTab === "extracted" && (
        <div className="p-5 rounded-2xl bg-surface-100/80 border border-white/[0.08] flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Parsed Abstract Syntax Tree Nodes
              </h4>
              <p className="text-xs text-neutral-400">
                Deterministic token extraction from {parsedResume.fileName}.
              </p>
            </div>
            <Badge variant="cyan" className="text-[10px]">
              {parsedResume.skills.length} Technical Tokens Detected
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.06] flex items-center gap-3">
              <User className="w-4 h-4 text-brand-400" />
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Candidate Name</span>
                <span className="text-xs font-bold text-white">{parsedResume.name}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.06] flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Email Node</span>
                <span className="text-xs font-mono text-white truncate max-w-[160px]">{parsedResume.email}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.06] flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Phone Node</span>
                <span className="text-xs font-mono text-white">{parsedResume.phone}</span>
              </div>
            </div>
          </div>

          {/* Detected Skills Cloud */}
          <div className="p-4 rounded-xl bg-surface-200/60 border border-white/[0.06]">
            <span className="text-xs font-semibold text-neutral-300 block mb-2">
              Recognized Technical Competencies ({parsedResume.skills.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {parsedResume.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded bg-surface-300 text-[11px] text-cyan-300 font-mono border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Experience Sample */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-200/60 border border-white/[0.06]">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5 mb-2">
                <GraduationCap className="w-4 h-4 text-brand-400" /> Education Hierarchy
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {parsedResume.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-400 font-bold">•</span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-surface-200/60 border border-white/[0.06]">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5 mb-2">
                <Layers className="w-4 h-4 text-emerald-400" /> Experience Nodes ({parsedResume.experience.length})
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {parsedResume.experience.slice(0, 3).map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2 truncate">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className="truncate">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. UPLOAD TAB */}
      {activeTab === "upload" && (
        <div className="p-6 rounded-2xl bg-surface-100/90 border border-white/[0.08] flex flex-col gap-6">
          <div>
            <h4 className="text-base font-bold text-white mb-1">
              Upload Your Resume (PDF, DOCX, or Plain Text)
            </h4>
            <p className="text-xs text-neutral-400">
              Your resume is tokenized locally in your browser. Zero backend storage or external AI dependencies.
            </p>
          </div>

          {/* Drag & Drop Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-8 rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/60 bg-surface-200/50 hover:bg-surface-200/80 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.docx,.txt,.md"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white block mb-0.5">
                Click to browse or drop file here
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Supports PDF, DOCX, Markdown, or TXT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-neutral-500 uppercase font-mono">OR Paste Raw Resume Text</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Paste Text Form */}
          <form onSubmit={handlePasteSubmit} className="flex flex-col gap-3">
            <textarea
              rows={4}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your experience bullet points, skills, and summary here..."
              className="w-full p-3.5 text-xs font-mono bg-surface-200 rounded-xl border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400"
            />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPastedText(activeProfile.sampleResumeText)}
              >
                Load {activeProfile.name}&apos;s Sample Resume
              </Button>
              <Button
                type="submit"
                variant="gradient"
                size="sm"
                disabled={!pastedText.trim()}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Parse & Score
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
