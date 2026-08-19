"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    setStatus("success");
    setErrorMessage("");
  };

  return (
    <section id="cta-section" className="py-24 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-r from-brand-600/25 via-cyan-500/20 to-emerald-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-surface-200/80 backdrop-blur-2xl border border-white/15 p-8 sm:p-14 md:p-16 text-center max-w-5xl mx-auto shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Inner ambient shine */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex mb-6">
            <Badge variant="cyan" dot pulse>
              Instant Showcase • Zero Setup Required
            </Badge>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-3xl mx-auto leading-tight">
            Stop Guessing. Start Preparing with <span className="text-gradient-brand">Precision.</span>
          </h2>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            Join forward-thinking students and professionals who prepare smarter with deterministic ATS simulations, skill radar mapping, and structured interview rubrics.
          </p>

          {/* Input Form with Honest Demonstration feedback */}
          {status === "success" ? (
            <div className="max-w-xl mx-auto p-6 rounded-2xl bg-surface-100/95 border border-brand-500/30 text-white flex flex-col items-center justify-center gap-3 text-xs sm:text-sm font-medium mb-8 shadow-xl animate-in fade-in zoom-in-95 duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-white">
                This is a frontend demonstration created for the Acdyon Frontend Challenge.
              </p>
              <p className="text-xs text-neutral-400 font-normal max-w-md leading-relaxed">
                Thank you for evaluating Nexa AI! All interactive features, profile dataset switchers, and scoring gauges are fully operational in the dashboard preview above.
              </p>
              <Button
                type="button"
                size="sm"
                variant="gradient"
                glow
                className="mt-2"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  const el = document.getElementById("dashboard");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Dashboard Preview
              </Button>
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-8">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email address..."
                  className={`w-full sm:flex-1 px-4 py-3 text-xs sm:text-sm bg-surface-100/90 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-1 shadow-inner ${
                    status === "error"
                      ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500"
                      : "border-white/15 focus:border-brand-400 focus:ring-brand-400"
                  }`}
                />
                <Button
                  type="submit"
                  size="md"
                  variant="gradient"
                  glow
                  className="w-full sm:w-auto px-6 whitespace-nowrap"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Free
                </Button>
              </form>
              {status === "error" && (
                <p className="text-[11px] text-rose-400 mt-2 text-left font-medium">{errorMessage}</p>
              )}
            </div>
          )}

          {/* Value Badges Footer */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-neutral-400 pt-4 border-t border-white/[0.08]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> Free tier available forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Privacy-First Architecture
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
