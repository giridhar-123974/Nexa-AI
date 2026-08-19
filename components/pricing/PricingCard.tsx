"use client";

import React from "react";
import { PricingTier } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface PricingCardProps {
  tier: PricingTier;
  isAnnual: boolean;
  onSelect?: (tier: PricingTier) => void;
}

export function PricingCard({ tier, isAnnual, onSelect }: PricingCardProps) {
  const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;

  return (
    <GlassCard
      hoverScale
      borderGlow={tier.popular}
      className={`p-6 sm:p-8 flex flex-col justify-between h-full relative ${
        tier.popular
          ? "bg-surface-100/90 border-brand-500/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
          : "bg-surface-200/50 border-white/[0.08]"
      }`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <Badge variant="brand" dot className="shadow-lg py-1 px-3">
            Most Popular Choice
          </Badge>
        </div>
      )}

      <div>
        {/* Tier Name & Tagline */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
          <p className="text-xs text-neutral-400 min-h-[36px] leading-relaxed">
            {tier.tagline}
          </p>
        </div>

        {/* Pricing Number Display */}
        <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
          <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
            {price === 0 ? "Free" : formatCurrency(price)}
          </span>
          {price > 0 && (
            <span className="text-xs text-neutral-400 font-mono">
              / month {isAnnual && <span className="text-emerald-400 block text-[10px]">billed annually</span>}
            </span>
          )}
        </div>

        {/* Feature List */}
        <div className="mb-8">
          <h4 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-mono">
            Included Capabilities
          </h4>
          <ul className="flex flex-col gap-3">
            {tier.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs">
                {feature.included ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-600 shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5" />
                  </div>
                )}

                <span
                  className={
                    feature.included
                      ? "text-neutral-200"
                      : "text-neutral-500 line-through decoration-neutral-600"
                  }
                >
                  {feature.text}
                </span>

                {feature.tooltip && (
                  <Tooltip content={feature.tooltip} side="top">
                    <HelpCircle className="w-3.5 h-3.5 text-neutral-500 hover:text-neutral-300 cursor-help ml-auto shrink-0" />
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        variant={tier.popular ? "gradient" : "outline"}
        size="lg"
        glow={tier.popular}
        className="w-full justify-center"
        rightIcon={<ArrowRight className="w-4 h-4" />}
        onClick={() => onSelect?.(tier)}
      >
        {tier.ctaText}
      </Button>
    </GlassCard>
  );
}
