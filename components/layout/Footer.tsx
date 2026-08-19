"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, Shield, Terminal } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setErrorMsg("Please enter an email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("success");
    setErrorMsg("");
    setTimeout(() => {
      setEmail("");
      setStatus("idle");
    }, 4000);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-neutral-950/80 backdrop-blur-md relative overflow-hidden pt-16 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-t from-brand-900/10 via-brand-500/5 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-lg"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {SITE_CONFIG.mission} Engineered with deterministic AST parsers, real-time voice simulations, and zero data compromise.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Badge variant="emerald" dot pulse>
                All Systems Operational
              </Badge>
              <span className="text-xs text-neutral-400 font-mono">v1.4.0</span>
            </div>

            {/* Newsletter input */}
            <div className="mt-4 pt-4 border-t border-white/[0.06] max-w-sm">
              <label htmlFor="footer-newsletter" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Engineering & Career Dispatch
              </label>
              {status === "success" ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Demo dispatch subscription recorded!</span>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      id="footer-newsletter"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="engineer@domain.com"
                      className={`flex-1 px-3.5 py-2 text-xs bg-surface-100/90 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-1 ${
                        status === "error"
                          ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500"
                          : "border-white/10 focus:border-brand-400 focus:ring-brand-400"
                      }`}
                    />
                    <Button type="submit" size="sm" variant="primary">
                      Join
                    </Button>
                  </form>
                  {status === "error" && (
                    <p className="text-[10px] text-rose-400 mt-1 font-medium">{errorMsg}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Nav Col 1: Platform */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="flex flex-col gap-2 text-xs text-neutral-400">
              <li><a href="#features" className="hover:text-white transition-colors">Resume AST Analyzer</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Deterministic ATS Parser</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Real-Time Mock Interview</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Skill Gap Radar</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Targeted Learning Roadmap</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Semantic Job Matcher</a></li>
            </ul>
          </div>

          {/* Nav Col 2: Engineering & Standards */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Security & Standards</h4>
            <ul className="flex flex-col gap-2 text-xs text-neutral-400">
              <li className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-cyan-400" /><span>Zero-Retention Policy</span></li>
              <li><span className="text-neutral-500">SOC-2 Type II Ingestion</span></li>
              <li><span className="text-neutral-500">AES-256 Data Encryption</span></li>
              <li><span className="text-neutral-500">WCAG 2.1 AA Compliant</span></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Data Processing FAQ</a></li>
            </ul>
          </div>

          {/* Nav Col 3: Resources & Community */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Resources</h4>
            <ul className="flex flex-col gap-2 text-xs text-neutral-400">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Copilot Dashboard</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Matrix</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li className="pt-2">
                <div className="p-2.5 rounded-xl bg-surface-100/60 border border-white/[0.06] flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span>Konami: ↑ ↑ ↓ ↓ ← → ← → B A</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Nexa AI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-neutral-200 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-200 transition-colors">Terms of Service</a>
            <a href="#terms" className="hover:text-neutral-200 transition-colors">Security Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
