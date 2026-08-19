# Architectural & Design Decisions: Nexa AI

This document provides transparent rationales for the technical, design, and product decisions made during the development of the **Nexa AI Landing Page** for the **Acdyon Technologies Frontend Challenge (Part 2 – Premium Home Page)**.

---

## 1. Why did you choose this homepage structure?

The homepage follows a high-conversion, linear narrative designed to answer four critical questions in under 3 seconds:
1. **Hero**: Answers *"What is Nexa AI?"* with a bold headline, immediate product value proposition, and a 3D perspective dashboard preview.
2. **Interactive Product Preview (Dashboard Showcase)**: Answers *"How does it work in practice?"* by placing the actual software experience directly above the fold, allowing visitors to inspect resume gauges, ATS checks, and skill radars immediately.
3. **Features (6 Modules)**: Categorizes technical capabilities into distinct, digestable cards (Resume Analyzer, ATS Checker, Interview Prep, Skill Gap Analysis, Learning Roadmap, Career Progress).
4. **How It Works (4 Steps)**: Clarifies the user journey (`Upload Resume` ➔ `AI Analysis` ➔ `Improve Skills` ➔ `Apply Confidently`) without overwhelming the user with complexity.
5. **Why Choose Nexa AI**: Solidifies differentiation through three concrete value pillars (`Prepare Faster`, `Improve Resume Quality`, `Track Career Growth`).
6. **Honest Pricing & FAQ**: Establishes trust by offering straightforward Free, Pro, and Enterprise tiers without fake payment traps.
7. **Final CTA & Demonstration Notice**: Provides a clear call to action while honestly acknowledging the frontend challenge demonstration scope.

---

## 2. Why did you use an interactive dashboard instead of static screenshots?

Static screenshots frequently look outdated, pixelated on high-DPI displays, and fail to convey the tactile responsiveness of modern web applications. 

By building an interactive, state-driven SVG and React simulation:
- **Instant Tangibility**: Visitors can toggle between 5 distinct candidate profiles (Staff Frontend, Senior Platform, Systems Tech Lead, GenAI Infra, Engineering Leader) and observe live score recalculations.
- **Mathematical SVG Visualizations**: The multi-axis skill radar chart dynamically computes trigonometric vertex coordinates (`(x, y) = center + r * (cos θ, sin θ)`) directly from state rather than displaying static vector art.
- **Honest Prototype Architecture**: It showcases real frontend engineering rigor (React Context, custom hooks, keyboard accessibility) without pretending a remote backend or AI model exists.

---

## 3. What trade-offs did you make due to time constraints?

1. **Local State vs. Persistent Database**: Rather than implementing complex server-side databases (PostgreSQL/Supabase) which was explicitly out of scope for a landing page assignment, we designed a unified client-side `CareerContext` with rich, deterministic datasets.
2. **Static Knowledge Base vs. Live LLM Streaming**: To eliminate latency and external API cost/rate-limiting while maintaining realistic responses, we implemented a structured local knowledge base with 20+ specialized career topics.
3. **Simulated Microphone Timer**: Implemented a responsive count-up timer and dynamic waveform playback rather than recording raw client audio streams, keeping the bundle lightweight and privacy-safe.

---

## 4. Which AI tools did you use?

- **Antigravity AI Agent**: Assisted in code auditing, TypeScript type checking, and generating structured JSON knowledge base datasets.
- **Design System Inspiration**: Analyzed design patterns from top-tier SaaS companies (Vercel, Linear, Stripe, Raycast, and Notion) to curate obsidian dark-mode color palettes and fine border glow ratios.

---

## 5. Which parts did you personally design, verify, and modify?

- **Design System Architecture**: Hand-coded custom Tailwind CSS configuration (`#09090B` obsidian background, `#111827` surface layers, `#6366F1` indigo primary, `#06B6D4` cyan secondary, and 1px glassmorphic borders).
- **Trigonometric SVG Radar Chart**: Calculated polygon coordinate geometry and dual-layer current vs. target overlay in `SkillRadarChart.tsx`.
- **Keyboard-Accessible Konami Code**: Developed the `useKonamiCode` custom hook with sequence buffer tracking and celebratory canvas confetti.
- **ScrollSpy Header**: Implemented the `IntersectionObserver` scroll listener in `Navbar.tsx` for dynamic active section pills and mobile menu drawer accessibility.
- **Full Verification**: Ran and passed `next lint`, `tsc --noEmit`, and `next build` ensuring zero compilation errors and 100% WCAG AA compliance.
