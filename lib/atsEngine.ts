import { ParsedResumeData, AtsAnalysisResult, TargetJob } from "./types";

// Comprehensive Technical Skills Dictionary
export const KNOWN_TECH_SKILLS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Go", "Golang",
  "Rust", "Java", "C++", "HTML5", "CSS3", "Tailwind CSS", "GraphQL", "REST APIs",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "RabbitMQ", "Docker", "Kubernetes",
  "AWS", "GCP", "Azure", "Terraform", "CI/CD", "GitHub Actions", "Microservices",
  "Serverless", "OpenTelemetry", "Datadog", "Prometheus", "Linux", "Git", "Jest",
  "Cypress", "Playwright", "Vitest", "Redux", "Zustand", "Prisma", "Drizzle", "SQL",
  "System Design", "Distributed Systems", "Core Web Vitals", "WebSockets", "gRPC",
  "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "Vector Databases", "Pinecone",
  "Next.js App Router", "Server Components", "State Machines", "WASM", "Web Workers",
  "Webpack", "Vite", "Turbopack", "ESLint", "CI/CD Pipelines", "OAuth", "JWT",
];

// High-Impact Action Verbs
export const ACTION_VERBS = [
  "architected", "spearheaded", "engineered", "orchestrated", "optimized",
  "reduced", "eliminated", "scaled", "automated", "accelerated", "designed",
  "implemented", "refactored", "migrated", "championed", "mentored",
  "deployed", "delivered", "streamlined", "benchmarked", "integrated",
  "resolved", "standardized", "authored", "led", "developed", "built",
];

// Simple Client-Side Resume Parser
export function parseResumeText(rawText: string, fileName = "resume.pdf"): ParsedResumeData {
  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  
  // Detect Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : "candidate@example.com";

  // Detect Phone
  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : "+1 (555) 234-5678";

  // Detect Name (Assume first non-empty line or derive from email)
  let name = lines[0] || "Alex Chen";
  if (name.includes("@") || name.length > 35) {
    name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Detect Skills
  const lowerText = rawText.toLowerCase();
  const detectedSkills = KNOWN_TECH_SKILLS.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );

  // Segment Education, Experience, Projects
  const education: string[] = [];
  const experience: string[] = [];
  const projects: string[] = [];

  let currentSection: "header" | "exp" | "edu" | "proj" = "header";

  lines.forEach((line) => {
    const l = line.toLowerCase();
    if (l.includes("experience") || l.includes("employment") || l.includes("work history")) {
      currentSection = "exp";
      return;
    }
    if (l.includes("education") || l.includes("academic") || l.includes("degree")) {
      currentSection = "edu";
      return;
    }
    if (l.includes("project") || l.includes("open source") || l.includes("portfolio")) {
      currentSection = "proj";
      return;
    }

    if (currentSection === "exp" && line.length > 20) {
      experience.push(line);
    } else if (currentSection === "edu" && line.length > 10) {
      education.push(line);
    } else if (currentSection === "proj" && line.length > 15) {
      projects.push(line);
    }
  });

  // Fallback defaults if structure was not separated by clear headers
  if (experience.length === 0) {
    experience.push(
      "Senior Engineer — Architected distributed cloud services with 99.99% uptime.",
      "Optimized client rendering pipeline, cutting latency by 45% for 1.2M users."
    );
  }
  if (education.length === 0) {
    education.push("B.S. in Computer Science — GPA: 3.8 / 4.0");
  }
  if (projects.length === 0) {
    projects.push("Open-Source Realtime State Sync Engine (1.4k GitHub Stars)");
  }

  return {
    fileName,
    name,
    email,
    phone,
    skills: Array.from(new Set(detectedSkills)),
    education,
    experience,
    projects,
    rawText,
    isCustomUpload: true,
  };
}

// Deterministic ATS Scoring & Improvement Generator
export function calculateAtsScore(
  parsed: ParsedResumeData,
  targetJob: TargetJob
): AtsAnalysisResult {
  const lowerText = parsed.rawText.toLowerCase();

  // 1. Keyword Matching
  const matchedKeywords = targetJob.requiredKeywords.filter((kw) =>
    lowerText.includes(kw.toLowerCase())
  );
  const missingKeywords = targetJob.requiredKeywords.filter(
    (kw) => !lowerText.includes(kw.toLowerCase())
  );
  const bonusMatchedKeywords = targetJob.bonusKeywords.filter((kw) =>
    lowerText.includes(kw.toLowerCase())
  );

  const keywordMatchScore = Math.min(
    100,
    Math.round(
      (matchedKeywords.length / Math.max(1, targetJob.requiredKeywords.length)) * 85 +
        (bonusMatchedKeywords.length / Math.max(1, targetJob.bonusKeywords.length)) * 15
    )
  );

  // 2. Action Verbs Count
  const matchedActionVerbs = ACTION_VERBS.filter((verb) =>
    lowerText.includes(verb)
  );
  const actionVerbScore = Math.min(
    100,
    Math.round((matchedActionVerbs.length / 10) * 100)
  );

  // 3. Quantified Impact Ratio (Numbers, %, ms, $, QPS, users)
  const metricRegex = /(\d+%\b|\d+\s*ms\b|\$\d+|\b\d+\s*k\b|\b\d+\s*m\b|\b\d+\s*users\b|\b\d+\s*qps\b|\b\d{2,}\b)/gi;
  const metricsFound = parsed.rawText.match(metricRegex) || [];
  const quantifiedImpactCount = metricsFound.length;
  const quantifiedScore = Math.min(100, Math.round((quantifiedImpactCount / 6) * 100));

  // 4. Formatting & Structure Scores
  const hasEmail = Boolean(parsed.email && parsed.email !== "candidate@example.com");
  const hasPhone = Boolean(parsed.phone);
  const hasMultipleSkills = parsed.skills.length >= 6;
  const hasExperience = parsed.experience.length >= 2;
  const hasEducation = parsed.education.length >= 1;

  const structureScore = Math.min(
    100,
    (hasEmail ? 20 : 0) +
      (hasPhone ? 15 : 0) +
      (hasMultipleSkills ? 25 : 10) +
      (hasExperience ? 25 : 10) +
      (hasEducation ? 15 : 5)
  );

  const formattingScore = Math.min(
    100,
    90 + (parsed.rawText.length > 500 ? 10 : 0)
  );

  const projectsScore = Math.min(100, Math.max(65, parsed.projects.length * 35));
  const experienceScore = Math.min(100, Math.max(70, parsed.experience.length * 25));

  // Composite ATS & Overall Score
  const atsScore = Math.min(
    99,
    Math.round(
      keywordMatchScore * 0.45 +
        structureScore * 0.25 +
        formattingScore * 0.15 +
        actionVerbScore * 0.15
    )
  );

  const overallScore = Math.min(
    99,
    Math.round(
      atsScore * 0.4 +
        quantifiedScore * 0.25 +
        actionVerbScore * 0.15 +
        experienceScore * 0.1 +
        projectsScore * 0.1
    )
  );

  // 5. Generate Contextual Improvement Suggestions
  const improvementSuggestions: AtsAnalysisResult["improvementSuggestions"] = [];

  if (missingKeywords.length > 0) {
    improvementSuggestions.push({
      id: "sug-missing-kw",
      type: "critical",
      title: `Integrate Missing Role Keywords (${missingKeywords.slice(0, 3).join(", ")})`,
      description: `Target role ${targetJob.title} heavily weights "${missingKeywords.slice(0, 2).join('", "')}". Contextualize these within your project or experience bullets.`,
      impact: "+18 pts ATS Match",
    });
  }

  if (quantifiedImpactCount < 4) {
    improvementSuggestions.push({
      id: "sug-quantify",
      type: "warning",
      title: "Quantify Outcomes with Engineering Metrics",
      description:
        "Replace general statements with measurable figures (e.g. latency in ms, throughput QPS, bundle reduction %, active user scale).",
      impact: "+14 pts Impact Score",
    });
  }

  if (actionVerbScore < 75) {
    improvementSuggestions.push({
      id: "sug-action-verbs",
      type: "warning",
      title: "Elevate Action Verb Ownership",
      description:
        "Replace passive terms like 'assisted' or 'worked on' with executive verbs: 'Architected', 'Spearheaded', 'Engineered', 'Orchestrated'.",
      impact: "+8 pts Quality Score",
    });
  }

  if (bonusMatchedKeywords.length < 2 && targetJob.bonusKeywords.length > 0) {
    improvementSuggestions.push({
      id: "sug-bonus-kw",
      type: "success",
      title: `Add Differentiating Stack Items: ${targetJob.bonusKeywords.slice(0, 2).join(", ")}`,
      description: `Including high-leverage bonus tools like ${targetJob.bonusKeywords[0]} places your profile in the top 5% of candidate screenings.`,
      impact: "+10 pts Distinction",
    });
  }

  return {
    overallScore,
    atsScore,
    keywordMatchScore,
    matchedKeywords,
    missingKeywords,
    bonusMatchedKeywords,
    actionVerbRatio: Math.min(100, Math.round((matchedActionVerbs.length / 8) * 100)),
    quantifiedImpactCount,
    formattingScore,
    structureScore,
    actionVerbScore,
    projectsScore,
    experienceScore,
    improvementSuggestions,
  };
}
