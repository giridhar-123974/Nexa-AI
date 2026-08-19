# Nexa AI — Your AI Career Copilot

> **Acdyon Technologies Frontend Challenge (Part 2 – Premium Home Page)**  
> Production-grade SaaS landing page built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

---

## 🌟 Project Overview

**Nexa AI** is an AI Career Copilot designed to empower students and software engineering professionals to prepare smarter for technical roles. The landing page showcases:
- **Interactive Product Showcase (Dashboard)**: Visual state-driven command center demonstrating multi-axis skill radar charts, deterministic ATS scoring, question banks with rubrics, and dynamic learning roadmaps without relying on fake APIs.
- **5 Realistic Profile Datasets**: Switch between 5 distinct engineering backgrounds (Staff Frontend, Senior Platform, Systems Tech Lead, GenAI Infra, Engineering Leader).
- **6 Premium Feature Modules**: AI Resume Analyzer, ATS Compatibility Checker, Interview Preparation, Skill Gap Analysis, Learning Roadmap, and Career Progress Dashboard.
- **Why Choose Nexa AI**: Value pillars highlighting 3.2x preparation velocity, AST validation accuracy, and continuous career tracking.
- **Honest Pricing**: Transparent Free Forever, Pro (Coming Soon), and Enterprise Cohorts.
- **WCAG 2.1 AA Accessibility**: Full keyboard navigation, semantic HTML5, focus rings, and screen-reader support.
- **Easter Egg**: Full Konami Code sequence (`↑ ↑ ↓ ↓ ← → ← → B A`) with celebratory confetti.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Runtime**: [React 19](https://react.dev/)
- **Language**: [TypeScript (Strict Mode)](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + Canvas Confetti
- **Icons**: [Lucide React](https://lucide.dev/)
- **Zero Heavy UI Kits**: 100% custom-built design system tokens (no shadcn/ui, no Bootstrap, no Material UI).

---

## 📁 Folder Structure

```
ASSIGRMNT/
├── app/
│   ├── globals.css          # Design system tokens, glassmorphism, focus styles
│   ├── layout.tsx           # Root layout with CareerProvider, metadata, and JSON-LD
│   ├── page.tsx             # 10-section landing page assembly
│   ├── robots.ts            # Dynamic robots.txt metadata
│   └── sitemap.ts           # Dynamic XML sitemap
├── components/
│   ├── layout/              # Navbar, Footer, SkipLink
│   ├── hero/                # Hero and 3D Dashboard Mockup
│   ├── dashboard/           # State-driven Dashboard, ProfileSelector, Radar, ScoreCard
│   ├── features/            # 6 Feature Cards and Deep-Dive Modal
│   ├── how-it-works/        # 4-Stage Workflow Timeline and Step Visualizer
│   ├── why-nexa/            # Why Choose Nexa AI Value Pillars
│   ├── pricing/             # Honest Pricing Cards
│   ├── faq/                 # Searchable ARIA Accordion
│   ├── cta/                 # Final Acdyon Demonstration CTA
│   ├── ui/                  # Polymorphic Button, GlassCard, Badge, Modal, Tooltip
│   └── easter-egg/          # Konami Code Listener and Modal
├── context/
│   └── CareerContext.tsx    # Unified state management for profiles, jobs, and scores
├── hooks/
│   ├── useKonamiCode.ts     # Keyboard sequence hook
│   ├── useScrollPosition.ts # Scroll listener for sticky header & scrollspy
│   └── useReducedMotion.ts  # a11y reduced motion detector
├── lib/
│   ├── types.ts             # TypeScript definitions
│   ├── constants.ts         # Static navigation, features, FAQ, and workflow data
│   ├── careerData.ts        # 5 Profiles, 4 Jobs, 60 Questions, and Knowledge Base
│   └── utils.ts             # Class merging & formatters
├── DECISIONS.md             # Technical and architectural rationale
└── README.md                # Project documentation
```

---

## 🚀 Getting Started & Installation

1. **Clone or Navigate to the Project**:
   ```bash
   cd ASSIGRMNT
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

4. **Run Verification**:
   ```bash
   npm run lint          # Validates ESLint rules
   npx tsc --noEmit      # Validates TypeScript types
   npm run build         # Validates production static export
   ```

---

## ♿ Accessibility (a11y)

- **Semantic Landmark Roles**: `<header>`, `<main id="main-content">`, `<section>`, `<nav>`, `<footer>`.
- **Keyboard Navigation**: `SkipLink` to bypass header, complete `Tab` traversal, and `Escape` key listeners for modal/menu dismissal.
- **Focus Rings**: High-contrast `focus-visible:ring-2 focus-visible:ring-brand-400`.
- **Reduced Motion**: Respects OS-level `prefers-reduced-motion` settings.

---

## ⚡ Performance Optimization

- Optimized Google Fonts with `next/font/google` (`Geist` and `Geist Mono`).
- Zero layout shift (CLS: 0) with explicit image aspect ratios and SVG viewBoxes.
- Modular code splitting with Next.js App Router dynamic streaming.
- Static generation (`SSG`) for instant edge cache delivery.
