export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  category: "Resume" | "Interview" | "Career" | "Optimization";
  highlights: string[];
  metricsPreview?: {
    label: string;
    value: string;
    trend: string;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  ctaText: string;
  features: {
    text: string;
    included: boolean;
    tooltip?: string;
  }[];
}

export interface FaqItemType {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Security & ATS" | "Interview Prep" | "Billing";
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  badge: string;
  detailPoints: string[];
  codeOrVisualType: "upload" | "analyzer" | "interview" | "match";
}

export interface SkillItem {
  name: string;
  current: number; // 0 - 100
  target: number;  // 0 - 100
}

export interface AiSuggestion {
  id: string;
  field: string;
  type: "addition" | "replacement" | "syntax";
  before: string;
  after: string;
  impactScore: string;
  impactDescription: string;
}

export interface RoadmapMilestone {
  id: number;
  phase: string;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
  description: string;
  deliverable: string;
  skills: string[];
  estimatedHours: number;
}

export interface CandidateProfile {
  id: string;
  name: string;
  avatarInitials: string;
  currentTitle: string;
  targetRole: string;
  experienceLevel: "Mid-Level" | "Senior" | "Staff / Principal" | "Engineering Leader";
  baseResumeScore: number;
  baseAtsScore: number;
  baseKeywordMatch: number;
  atsParsedKeywords: number;
  subScores: {
    quantifiedImpact: number;
    actionVerbs: number;
    atsParseIntegrity: number;
    keywordDensity: number;
  };
  strengths: string[];
  missingSkills: string[];
  skillRadar: SkillItem[];
  suggestions: AiSuggestion[];
  roadmapMilestones: RoadmapMilestone[];
}

export interface TargetJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryBand: string;
  matchScore: number;
  requiredKeywords: string[];
  bonusKeywords: string[];
  description: string;
}

export interface InterviewQuestion {
  id: string;
  category: "frontend" | "backend" | "system_design" | "behavioral" | "leadership" | "product";
  categoryLabel: string;
  difficulty: "Medium" | "Hard" | "Staff Level";
  title: string;
  question: string;
  hints: string[];
  evaluationRubric: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  candidateSnippet: string;
  starBreakdown: {
    situation: number;
    task: number;
    action: number;
    result: number;
  };
  pacing: string;
  fillerWords: string;
  score: number;
}

export interface CopilotKnowledgeItem {
  id: string;
  category: "Resume" | "ATS" | "Interview" | "System Design" | "Behavioral" | "Salary" | "Roadmap";
  triggers: string[];
  title: string;
  responseMarkdown: string;
  tags: string[];
  metrics: { label: string; value: string };
}
