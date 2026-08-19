"use client";

import React, { useState, useMemo } from "react";
import { FAQ_DATA } from "@/lib/constants";
import { FaqItem } from "./FaqItem";
import { Badge } from "@/components/ui/Badge";
import { Search, HelpCircle } from "lucide-react";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "General", "Security & ATS", "Interview Prep", "Billing"];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 relative bg-surface-300/40 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <Badge variant="cyan" className="mb-4">
            Answers & Clarifications
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Everything you need to know about our deterministic AST parsers, real-time voice latency, and data privacy commitments.
          </p>

          {/* Search bar & Category filters */}
          <div className="w-full mt-8 flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search topics (e.g. ATS parsing, voice latency, privacy)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100/90 border border-white/10 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    activeCategory === cat
                      ? "bg-white text-neutral-950 font-semibold shadow-sm"
                      : "bg-surface-100/60 text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Faq Items Accordion Stack */}
        <div className="flex flex-col gap-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <FaqItem
                key={faq.id}
                item={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 rounded-2xl bg-surface-100/50 border border-white/[0.06]">
              <HelpCircle className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
              <p className="text-sm text-neutral-300 font-medium">No matching questions found</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching a different keyword or resetting filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
