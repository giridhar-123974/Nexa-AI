"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Rocket, Sparkles } from "lucide-react";

export interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EasterEggModal({ isOpen, onClose }: EasterEggModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Fire celebratory confetti bursts
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      className="text-center p-8 bg-surface-200/95 border-brand-500/50 shadow-[0_0_80px_rgba(99,102,241,0.4)]"
    >
      <div className="flex flex-col items-center gap-4 py-2">
        {/* Animated Trophy Icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-cyan-400 p-0.5 shadow-[0_0_30px_rgba(99,102,241,0.6)] animate-bounce">
            <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
              <Rocket className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-spin" />
        </div>

        <Badge variant="brand" dot pulse className="text-xs">
          Secret Developer Mode Unlocked
        </Badge>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          🚀 Welcome to the Nexa AI Insider Club!
        </h3>

        <p className="text-sm text-neutral-300 max-w-sm leading-relaxed">
          You just triggered the secret developer sequence with perfection. Anyone who tests the Konami Code on a landing page clearly has elite frontend taste.
        </p>

        {/* Secret Developer Specs */}
        <div className="w-full p-4 rounded-xl bg-surface-100/90 border border-white/10 text-left font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Stack Quality:</span>
            <span className="text-emerald-400 font-bold">Staff Senior Grade</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Engineering Standard:</span>
            <span className="text-cyan-400">Vercel / Linear Level</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Accessibility (a11y):</span>
            <span className="text-brand-300">100% WCAG AA</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full justify-center pt-2">
          <Button variant="primary" size="md" onClick={onClose} className="w-full">
            Back to Mission Control
          </Button>
        </div>
      </div>
    </Modal>
  );
}
