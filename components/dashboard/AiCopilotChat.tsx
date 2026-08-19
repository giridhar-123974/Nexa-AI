"use client";

import React, { useState } from "react";
import { useCareer } from "@/context/CareerContext";
import { COPILOT_KNOWLEDGE_BASE } from "@/lib/careerData";
import { Sparkles, Send, Bot, User, Check, Copy, RefreshCw, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  tags?: string[];
  metrics?: { label: string; value: string };
}

export function AiCopilotChat() {
  const { activeProfile, activeJob, computedResumeScore, computedAtsScore } = useCareer();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: `Hello ${activeProfile.name}! I am your Nexa AI Career Copilot calibrated for ${activeJob.title} roles at ${activeJob.company}.

I can analyze your resume AST, run STAR mock interviews, or tailor a learning roadmap for your skill gaps: (${activeProfile.missingSkills.join(", ")}).

How can I help you prepare today?`,
      timestamp: "Just now",
      tags: [`Score: ${computedResumeScore}/100`, `ATS: ${computedAtsScore}%`, `${activeJob.company} Target`],
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promptSuggestions = [
    `Audit ${activeProfile.name}'s resume for ${activeJob.company}`,
    "Simulate Amazon STAR behavioral interview",
    `Generate 6-week study plan for ${activeProfile.targetRole}`,
    "Show verified Staff tech salary bands",
    "4-step System Design RFC blueprint",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "";
      let tags: string[] = [];
      let metrics: { label: string; value: string } | undefined;

      const lower = query.toLowerCase();

      // Find matching item from COPILOT_KNOWLEDGE_BASE
      const kbMatch = COPILOT_KNOWLEDGE_BASE.find((item) =>
        item.triggers.some((t) => lower.includes(t))
      );

      if (kbMatch) {
        aiResponseText = kbMatch.responseMarkdown;
        tags = kbMatch.tags;
        metrics = kbMatch.metrics;
      } else if (lower.includes("audit") || lower.includes("resume") || lower.includes("missing")) {
        aiResponseText = `### 📄 AST Profile Diagnostic for ${activeProfile.name}\n\n- **Target Position**: ${activeJob.title} (${activeJob.company})\n- **Composite Score**: ${computedResumeScore}/100\n- **ATS Compatibility**: ${computedAtsScore}%\n- **Identified Competency Gaps**: \`${activeProfile.missingSkills.join("`, `")}\`\n\n**Action Item**: Apply the recommendations in the **Resume & ATS Engine** tab to elevate your domain keyword density to 95%+.`;
        tags = [`${activeProfile.name}`, `Score: ${computedResumeScore}`, "AST Calibrated"];
        metrics = { label: "ATS Readiness", value: `${computedAtsScore}%` };
      } else {
        aiResponseText = `### 🤖 Nexa Copilot Advisory for: "${query}"\n\nI evaluated your request against verified ${activeProfile.experienceLevel} benchmarks at ${activeJob.company}.\n\n1. **Technical Depth**: Align bullet points with quantified engineering metrics (-LCP, +QPS, +throughput).\n2. **STAR Readiness**: Structure your response with a 15-second Situation, 15-second Task, 45-second Action, and 15-second Result.\n3. **Current Profile Strengths**: ${activeProfile.strengths.slice(0, 3).join(", ")}.`;
        tags = ["Custom Query", "Real-Time AST", "Verified Profile"];
        metrics = { label: "Target Match", value: `${computedAtsScore}%` };
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: "Just now",
        tags,
        metrics,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[520px] rounded-2xl bg-surface-100/90 border border-white/[0.08] overflow-hidden">
      {/* Copilot Header */}
      <div className="px-5 py-3.5 border-b border-white/[0.08] bg-surface-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-500 p-0.5 shadow-sm">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-white">Nexa AI Copilot Studio</h4>
              <Badge variant="emerald" dot pulse className="text-[10px]">
                Active Knowledge Engine
              </Badge>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono">
              Calibrated for {activeProfile.name} • {activeJob.company} Target
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="text-xs text-neutral-400 hover:text-white h-7 px-2"
          onClick={() =>
            setMessages([
              {
                id: "msg-reset",
                sender: "ai",
                text: `Session reset for ${activeProfile.name}. What career or technical topic would you like to explore?`,
                timestamp: "Just now",
                tags: ["Fresh Session", "Ready"],
              },
            ])
          }
          leftIcon={<RefreshCw className="w-3 h-3" />}
        >
          Reset
        </Button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <div className="w-7 h-7 rounded-lg bg-surface-50 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-brand-600 text-white rounded-tr-none shadow-md font-medium"
                  : "bg-surface-200/90 border border-white/[0.08] text-neutral-200 rounded-tl-none shadow-sm"
              }`}
            >
              {/* Markdown-styled text output */}
              <div className="whitespace-pre-wrap font-sans">
                {msg.text.split("\n").map((line, lIdx) => {
                  if (line.startsWith("### ")) {
                    return (
                      <h5 key={lIdx} className="text-sm sm:text-base font-bold text-white mb-2">
                        {line.replace("### ", "")}
                      </h5>
                    );
                  }
                  if (line.startsWith("> ")) {
                    return (
                      <blockquote
                        key={lIdx}
                        className="p-2.5 my-2 rounded-lg bg-surface-300/80 border-l-2 border-brand-400 text-neutral-300 italic text-xs"
                      >
                        {line.replace("> ", "")}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={lIdx} className={line.trim() === "" ? "h-2" : "mb-1"}>
                      {line}
                    </p>
                  );
                })}
              </div>

              {/* Tags & Metric Badge if AI */}
              {msg.sender === "ai" && (msg.tags || msg.metrics) && (
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {msg.tags?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.05] text-[10px] text-cyan-300 font-mono border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {msg.metrics && (
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        {msg.metrics.label}: {msg.metrics.value}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-7 h-7 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300 shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center">
            <div className="w-7 h-7 rounded-lg bg-surface-50 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-2xl bg-surface-200/90 border border-white/[0.08] flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              <span className="ml-1 text-[11px] font-mono">Synthesizing local knowledge diagnostic...</span>
            </div>
          </div>
        )}
      </div>

      {/* Preset prompt pills */}
      <div className="px-4 py-2 bg-surface-200/50 border-t border-white/[0.04] flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] text-neutral-500 uppercase font-mono shrink-0">
          Try:
        </span>
        {promptSuggestions.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg bg-surface-100 border border-white/10 text-[11px] text-neutral-300 hover:text-white hover:border-brand-400/40 whitespace-nowrap transition-all flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-surface-200/90 border-t border-white/[0.08] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask Nexa Copilot anything for ${activeProfile.name} (e.g. 'Audit my resume for ${activeJob.company}')...`}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-surface-100 rounded-xl border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
        <Button
          type="submit"
          size="sm"
          variant="gradient"
          disabled={!input.trim}
          className="h-10 px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
