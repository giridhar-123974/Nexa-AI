import { FeatureItem, PricingTier, FaqItemType, HowItWorksStep, SkillItem, AiSuggestion } from "./types";

export const SITE_CONFIG = {
  name: "Nexa AI",
  title: "Nexa AI — Your AI Career Copilot",
  description:
    "Land better career opportunities with AI. Prepare for technical & behavioral interviews, optimize your resume with precision ATS parsing, discover missing skills, and build confidence with one intelligent platform.",
  url: "https://nexa.ai",
  tagline: "Your AI Career Copilot",
  mission: "Empowering students and professionals to prepare smarter for high-impact jobs using AI.",
  author: "Nexa AI Engineering Team",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    docs: "/docs",
    status: "https://status.nexa.ai",
  },
};

export const NAV_ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Nexa", href: "#why-nexa" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const VALUE_PILLARS = [
  {
    title: "Precision Resume Engine",
    metric: "100%",
    metricLabel: "Deterministic AST Parser",
    description:
      "Unlike generic LLMs that hallucinate formatting, our syntax tree evaluator extracts keyword densities and structural weights compliant with modern enterprise ATS algorithms.",
  },
  {
    title: "Interactive Voice & Code Simulator",
    metric: "<250ms",
    metricLabel: "Real-Time AI Latency",
    description:
      "Simulate high-stakes technical coding rounds and behavioral interviews with dynamic follow-ups, sentiment feedback, and STAR-method scoring.",
  },
  {
    title: "Dynamic Skill Gap Roadmap",
    metric: "1-Click",
    metricLabel: "Curated Learning Tracks",
    description:
      "Map your current technical repository against real-time job market requirements to reveal exact missing competencies and actionable projects.",
  },
  {
    title: "Privacy-First Career Vault",
    metric: "Zero",
    metricLabel: "Third-Party Data Training",
    description:
      "Your resumes, interview audio transcripts, and proprietary code solutions remain private, encrypted at rest, and never fed into public training corpuses.",
  },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "resume-analyzer",
    icon: "FileSearch",
    title: "AI Resume Analyzer",
    tagline: "Lexical & structural analysis with AST-level precision",
    description:
      "Deep-parse your resume into text AST nodes. Measure quantified impact ratio, action verb strength, and sentence-level readability against verified engineering benchmarks.",
    category: "Resume",
    highlights: ["Measurable impact ratio scoring", "Action verb power evaluation", "Formatting & structural linting"],
    metricsPreview: {
      label: "Average Score Lift",
      value: "+24 pts",
      trend: "Based on lexical optimizations",
    },
  },
  {
    id: "ats-checker",
    icon: "ShieldCheck",
    title: "ATS Compatibility Checker",
    tagline: "Deterministic validation against enterprise ATS parsers",
    description:
      "Simulate how Greenhouse, Lever, and Workday extract candidate metadata from single and multi-column formats. Eliminate parsing bottlenecks before submitting.",
    category: "Resume",
    highlights: ["Lever & Greenhouse schema testing", "Contact & metadata node isolation", "0-table hierarchy validation"],
    metricsPreview: {
      label: "Parse Accuracy",
      value: "99.2%",
      trend: "Across top 5 enterprise ATS platforms",
    },
  },
  {
    id: "interview-prep",
    icon: "Mic",
    title: "Interview Preparation",
    tagline: "Voice-driven behavioral & systems architecture rounds",
    description:
      "Engage in realistic interview simulations across System Design, Behavioral STAR, and Core Architecture with instant scoring rubrics and pacing feedback.",
    category: "Interview",
    highlights: ["Adaptive probing questions", "STAR methodology scorecards", "Filler-word & pacing diagnostics"],
    metricsPreview: {
      label: "Readiness Index",
      value: "94/100",
      trend: "Behavioral structure score",
    },
  },
  {
    id: "skill-gap-analysis",
    icon: "Activity",
    title: "Skill Gap Analysis",
    tagline: "Vectorized comparison against target role requirements",
    description:
      "Map your verified technical proficiencies against target job specifications on a dynamic multi-axis radar chart to pinpoint critical competency gaps.",
    category: "Career",
    highlights: ["Multi-axis radar convergence", "Seniority-level benchmarking", "Identified missing tech stack items"],
    metricsPreview: {
      label: "Gap Resolution",
      value: "3.2x",
      trend: "Faster path to role qualification",
    },
  },
  {
    id: "learning-roadmap",
    icon: "Route",
    title: "Learning Roadmap",
    tagline: "Bridge the gap between your profile and target job specs",
    description:
      "Synthesize an algorithmic multi-phase study roadmap tailored to your specific skill gaps, with concrete project deliverables and weekly hour estimates.",
    category: "Career",
    highlights: ["Weekly milestone breakdowns", "Hands-on portfolio deliverables", "Estimated completion velocity"],
    metricsPreview: {
      label: "Velocity Boost",
      value: "3.4x",
      trend: "Faster core competency mastery",
    },
  },
  {
    id: "career-progress",
    icon: "Layers",
    title: "Career Progress Dashboard",
    tagline: "Unified command center tracking your preparation journey",
    description:
      "Track your complete career readiness in one centralized dashboard. Monitor composite scores, ATS match percentages, and milestone completion in real time.",
    category: "Optimization",
    highlights: ["Unified readiness overview", "Dynamic profile dataset switching", "Real-time score recalculation"],
    metricsPreview: {
      label: "Readiness Tracking",
      value: "100%",
      trend: "Synchronized state metrics",
    },
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    badge: "Ingestion",
    title: "Upload Resume",
    description:
      "Upload your existing resume in PDF, DOCX, or text format. The parser instantly tokenizes your experience into structured data nodes.",
    detailPoints: [
      "Instant multi-format parsing into standard career AST",
      "Automatic technical stack and domain recognition",
      "Zero manual re-entry required",
    ],
    codeOrVisualType: "upload",
  },
  {
    step: "02",
    badge: "Diagnostic",
    title: "AI Analysis",
    description:
      "Our diagnostic engine audits your resume against enterprise ATS standards, quantifying bullet point impact and detecting missing role competencies.",
    detailPoints: [
      "Identifies missing high-signal keywords",
      "Scores metric quantification and action verb strength",
      "Validates ATS parsing hierarchy",
    ],
    codeOrVisualType: "analyzer",
  },
  {
    step: "03",
    badge: "Refinement",
    title: "Improve Skills",
    description:
      "Follow personalized learning milestones and practice role-specific technical and behavioral interview questions with structured STAR rubrics.",
    detailPoints: [
      "Targeted study roadmaps for skill gaps",
      "STAR framework interview scorecards",
      "1-click bullet point metric enhancements",
    ],
    codeOrVisualType: "interview",
  },
  {
    step: "04",
    badge: "Execution",
    title: "Apply Confidently",
    description:
      "Submit verified, ATS-optimized applications with complete confidence and track your career growth metrics in real time.",
    detailPoints: [
      "Machine-readable, ATS-compliant formats",
      "Personalized company talking points",
      "Unified readiness tracking across target roles",
    ],
    codeOrVisualType: "match",
  },
];

export const COMPARISON_DATA = [
  {
    feature: "ATS Optimization Method",
    traditional: "Generic keyword stuffing & basic templates",
    nexa: "Deterministic AST parser simulating Lever, Greenhouse & Workday",
    advantage: true,
  },
  {
    feature: "Interview Practice Mode",
    traditional: "Static generic question lists or expensive $200/hr coaches",
    nexa: "Low-latency voice & code AI simulator with adaptive follow-ups",
    advantage: true,
  },
  {
    feature: "Resume Improvement Feedback",
    traditional: "Vague feedback like 'make this stronger'",
    nexa: "Granular lexical diffs quantifying metrics & active verb power",
    advantage: true,
  },
  {
    feature: "Skill Gap Bridging",
    traditional: "Uncurated course lists without context",
    nexa: "Algorithmic roadmap targeting exact requirements of your dream roles",
    advantage: true,
  },
  {
    feature: "Data Privacy & Security",
    traditional: "Unknown data retention; often used for model training",
    nexa: "Strict zero-retention guarantee, encrypted at rest, never trained on",
    advantage: true,
  },
  {
    feature: "Turnaround Time",
    traditional: "3 to 5 business days per review",
    nexa: "Instantaneous sub-second real-time feedback loops",
    advantage: true,
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Starter",
    tagline: "Essential AI diagnostic tools for active job seekers starting their search.",
    priceMonthly: 0,
    priceAnnual: 0,
    ctaText: "Start Free Now",
    features: [
      { text: "3 Deep Resume ATS Scans per month", included: true },
      { text: "Basic lexical impact diagnostics", included: true },
      { text: "1 AI Mock Interview session (15 mins)", included: true },
      { text: "Fundamental skill gap radar", included: true },
      { text: "Export standard ATS PDF format", included: true },
      { text: "Voice-driven adaptive follow-ups", included: false, tooltip: "Available on Pro plan" },
      { text: "Live GitHub portfolio code audit", included: false, tooltip: "Available on Pro plan" },
      { text: "Unlimited targeted cover letters", included: false, tooltip: "Available on Pro plan" },
    ],
  },
  {
    id: "pro",
    name: "Professional Copilot",
    tagline: "The complete end-to-end preparation suite for engineers, PMs, and designers.",
    priceMonthly: 24,
    priceAnnual: 19,
    popular: true,
    ctaText: "Unlock Full Access",
    features: [
      { text: "Unlimited Deep Resume ATS Scans", included: true },
      { text: "Granular lexical diffs & metric rewrites", included: true },
      { text: "Unlimited AI Mock Interviews with Voice", included: true },
      { text: "STAR framework & pacing breakdown", included: true },
      { text: "Dynamic Skill Gap Roadmap & Project Ideas", included: true },
      { text: "Live GitHub portfolio code audit", included: true },
      { text: "Unlimited tailored cover letters", included: true },
      { text: "Real-time tech salary compensation data", included: true },
    ],
  },
  {
    id: "team",
    name: "University & Bootcamps",
    tagline: "Cohort-wide career acceleration for educational institutions and organizations.",
    priceMonthly: 89,
    priceAnnual: 75,
    ctaText: "Contact Education Team",
    features: [
      { text: "Everything in Professional Copilot", included: true },
      { text: "Cohort management & advisor dashboard", included: true },
      { text: "Curriculum alignment with hiring trends", included: true },
      { text: "Institutional ATS benchmarking metrics", included: true },
      { text: "Dedicated SSO & LMS integration", included: true },
      { text: "Custom rubric scoring configuration", included: true },
      { text: "Priority SLA & dedicated account manager", included: true },
    ],
  },
];

export const FAQ_DATA: FaqItemType[] = [
  {
    id: "faq-1",
    category: "General",
    question: "How is Nexa AI different from asking ChatGPT or Claude for resume help?",
    answer:
      "Generic chatbots lack deterministic AST parsers configured to simulate corporate ATS algorithms (like Workday, Lever, and Greenhouse). Nexa AI provides structured lexical scoring, verified ATS compliance tests, sub-second latency voice interview simulations, and actionable diff-based bullet point improvements without hallucination.",
  },
  {
    id: "faq-2",
    category: "Security & ATS",
    question: "How does the ATS parser test guarantee formatting compliance?",
    answer:
      "We run your resume file through an automated multi-engine extraction pipeline that tokenizes tables, headers, dates, and bullet hierarchies exactly as enterprise recruitment platforms do. If a two-column design drops your experience section into education, Nexa AI instantly flags the structural parse failure.",
  },
  {
    id: "faq-3",
    category: "Interview Prep",
    question: "How do the voice mock interview simulations work?",
    answer:
      "Nexa AI connects to low-latency neural speech models to conduct full voice-to-voice interviews. The AI dynamically adapts its technical depth based on your previous answers, challenges your edge-case logic in coding/system design, and evaluates your pacing, filler words, and STAR-method clarity.",
  },
  {
    id: "faq-4",
    category: "Security & ATS",
    question: "Is my resume and interview audio kept private and secure?",
    answer:
      "Yes, completely. Nexa AI follows an enterprise zero-retention policy on user data. Your resumes, source code repositories, and audio transcripts are encrypted at rest using AES-256 and in transit via TLS 1.3. We never sell your data or feed user submissions into public training corpuses.",
  },
  {
    id: "faq-5",
    category: "Billing",
    question: "Can I cancel or switch my subscription at any time?",
    answer:
      "Yes. You can upgrade, downgrade, or cancel your subscription with a single click from your account settings at any point. If you cancel, you will maintain access through the end of your prepaid billing period with zero cancellation fees.",
  },
  {
    id: "faq-6",
    category: "General",
    question: "Is Nexa AI tailored for non-engineering career paths as well?",
    answer:
      "While Nexa AI offers specialized depth for software engineering, frontend, backend, and DevOps roles, our core algorithms are calibrated for product management, data science, UX design, product marketing, and technical sales roles as well.",
  },
];

export const SAMPLE_SKILL_RADAR: SkillItem[] = [
  { name: "System Design", current: 78, target: 92 },
  { name: "Algorithms & DS", current: 85, target: 90 },
  { name: "Frontend Architecture", current: 94, target: 95 },
  { name: "Behavioral / STAR", current: 82, target: 90 },
  { name: "Database Optimization", current: 70, target: 88 },
  { name: "Cloud & CI/CD", current: 76, target: 85 },
];

export const SAMPLE_AI_SUGGESTIONS: AiSuggestion[] = [
  {
    id: "sug-1",
    field: "Experience • Senior Frontend Lead",
    type: "replacement",
    before: "Worked on optimizing React web performance and reducing bundle sizes.",
    after:
      "Architected Next.js module federation and tree-shaking pipeline, reducing LCP by 410ms and bundle size by 38% for 2.4M monthly active sessions.",
    impactScore: "+28 pts",
    impactDescription: "Added quantified metrics, architecture scope, and concrete business outcome.",
  },
  {
    id: "sug-2",
    field: "ATS Keyword Match",
    type: "addition",
    before: "Missing target competencies for Senior Staff Engineer role.",
    after:
      "Recommended keywords to contextualize: 'Distributed Systems', 'Core Web Vitals', 'Design Tokens', 'Observability (OpenTelemetry)'.",
    impactScore: "+15 pts",
    impactDescription: "Increases semantic vector match against target job description from 76% to 94%.",
  },
  {
    id: "sug-3",
    field: "Interview Practice • Behavioral STAR",
    type: "syntax",
    before: "Described conflict resolution without explicit measurable resolution.",
    after:
      "Re-anchored answer using STAR framework: Explicitly framed the team disagreement on state management, the consensus-building RFC process, and the resulting 0-defect rollout.",
    impactScore: "+18 pts",
    impactDescription: "Eliminated ambiguity and demonstrated high emotional quotient and leadership.",
  },
];
