import { CandidateProfile, TargetJob, CopilotKnowledgeItem } from "./types";

export const TARGET_JOBS: TargetJob[] = [
  {
    id: "job-frontend",
    roleKey: "frontend",
    title: "Staff Frontend Engineer",
    company: "Stripe",
    location: "San Francisco, CA / Remote",
    salaryBand: "$220k - $290k + Equity",
    matchScore: 94,
    requiredKeywords: [
      "React", "Next.js", "TypeScript", "Core Web Vitals", "Design Systems",
      "Streaming SSR", "Tailwind CSS", "State Management", "Performance"
    ],
    bonusKeywords: ["CRDTs", "WASM", "OpenTelemetry", "Zustand", "Playwright"],
    actionVerbKeywords: ["Architected", "Spearheaded", "Optimized", "Engineered", "Reduced"],
    description: "Architect high-reliability merchant checkout interfaces with sub-second rendering, rigorous type safety, and zero layout shift.",
  },
  {
    id: "job-backend",
    roleKey: "backend",
    title: "Senior Backend Engineer",
    company: "AWS Cloud Platform",
    location: "Seattle, WA / Remote",
    salaryBand: "$200k - $280k + Equity",
    matchScore: 91,
    requiredKeywords: [
      "Go", "Node.js", "PostgreSQL", "Kafka", "Distributed Systems",
      "Redis", "Microservices", "REST APIs", "gRPC"
    ],
    bonusKeywords: ["Raft", "Kubernetes", "Docker", "eBPF", "Terraform"],
    actionVerbKeywords: ["Scaled", "Architected", "Engineered", "Orchestrated", "Automated"],
    description: "Design fault-tolerant backend microservices, real-time message brokers, and low-latency storage pipelines at scale.",
  },
  {
    id: "job-ai",
    roleKey: "ai_engineer",
    title: "AI & ML Infrastructure Engineer",
    company: "OpenAI / Anthropic",
    location: "San Francisco, CA",
    salaryBand: "$240k - $340k + Equity",
    matchScore: 89,
    requiredKeywords: [
      "Python", "PyTorch", "LLM Inference", "Vector Databases", "LangChain",
      "Docker", "FastAPI", "Model Quantization", "CUDA"
    ],
    bonusKeywords: ["vLLM", "Pinecone", "Triton", "LlamaIndex", "Fine-Tuning"],
    actionVerbKeywords: ["Trained", "Optimized", "Deployed", "Engineered", "Accelerated"],
    description: "Scale high-throughput neural network inference pipelines, vector retrieval indices, and GPU container clusters.",
  },
  {
    id: "job-fullstack",
    roleKey: "fullstack",
    title: "Lead Full Stack Developer",
    company: "Linear / Supabase",
    location: "Remote",
    salaryBand: "$180k - $260k + Equity",
    matchScore: 92,
    requiredKeywords: [
      "React", "TypeScript", "Node.js", "PostgreSQL", "Next.js",
      "GraphQL", "Tailwind CSS", "REST APIs", "CI/CD"
    ],
    bonusKeywords: ["Prisma", "Drizzle", "Docker", "WebSockets", "Zod"],
    actionVerbKeywords: ["Built", "Engineered", "Delivered", "Refactored", "Standardized"],
    description: "End-to-end product architecture from delightful reactive frontend state to high-performance database schema design.",
  },
  {
    id: "job-devops",
    roleKey: "devops",
    title: "Senior Platform & DevOps Engineer",
    company: "Cloudflare / Datadog",
    location: "Austin, TX / Remote",
    salaryBand: "$190k - $270k + Equity",
    matchScore: 88,
    requiredKeywords: [
      "Kubernetes", "Docker", "Terraform", "AWS", "CI/CD",
      "Linux", "Prometheus", "Datadog", "GitHub Actions"
    ],
    bonusKeywords: ["ArgoCD", "Helm", "OpenTelemetry", "Go", "Service Mesh"],
    actionVerbKeywords: ["Automated", "Orchestrated", "Reduced", "Migrated", "Standardized"],
    description: "Build robust multi-region container orchestration clusters, automated deployment pipelines, and observability telemetry.",
  },
];

export const CANDIDATE_PROFILES: CandidateProfile[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    avatarInitials: "AC",
    currentTitle: "Senior Frontend Engineer",
    targetRole: "Staff Frontend Architect",
    experienceLevel: "Staff / Principal",
    baseResumeScore: 94,
    baseAtsScore: 92,
    baseKeywordMatch: 90,
    atsParsedKeywords: 38,
    sampleResumeText: `Alex Chen
alex.chen@example.com | +1 (415) 890-1234 | San Francisco, CA | github.com/alexchen-dev

SUMMARY
Staff-level Frontend Architect with 7+ years of experience specializing in React, Next.js, TypeScript, Core Web Vitals, and distributed edge rendering. Proven track record of reducing LCP by 45% and leading 12-engineer teams.

EXPERIENCE
Senior Frontend Lead — Stripe
• Architected Next.js 15 streaming SSR checkout pipeline, reducing LCP by 420ms (-34%) and cutting bundle size by 180kB across 2.4M monthly active sessions.
• Engineered optimistic state reconciliation layer with zero-latency rollback, decreasing state sync error rates from 4.2% to 0.08%.
• Standardized enterprise Design Systems and Tailwind CSS component tokens used by 85 engineers across 6 product squads.
• Mentored 8 frontend engineers through promotion and conducted over 60 technical architecture interviews.

Frontend Engineer — Vercel Ecosystem
• Built high-performance dashboard interfaces with React, TypeScript, and Server Components.
• Optimized Core Web Vitals across client portals, achieving 99+ Lighthouse performance scores.
• Implemented automated CI/CD Playwright and Jest testing pipelines with 94% test coverage.

EDUCATION
B.S. in Computer Science — University of California, Berkeley (GPA: 3.85 / 4.0)

SKILLS
React, Next.js, TypeScript, JavaScript, Tailwind CSS, Core Web Vitals, Design Systems, State Management, HTML5, CSS3, GraphQL, REST APIs, Jest, Playwright, CI/CD, Git, OpenTelemetry, Performance`,
    subScores: {
      quantifiedImpact: 96,
      actionVerbs: 94,
      atsParseIntegrity: 98,
      keywordDensity: 91,
    },
    strengths: [
      "React 19 Server Components",
      "Next.js 15 Streaming SSR",
      "Sub-0.8s LCP Budgeting",
      "Design Systems Architecture",
      "TypeScript Strict Concurrency",
    ],
    missingSkills: ["CRDT Offline Sync", "OpenTelemetry Tracing", "WebAssembly (WASM) Modules"],
    skillRadar: [
      { name: "System Design", current: 92, target: 96 },
      { name: "React / Next.js", current: 98, target: 95 },
      { name: "Core Web Vitals", current: 95, target: 98 },
      { name: "Algorithms", current: 82, target: 90 },
      { name: "STAR Leadership", current: 90, target: 94 },
      { name: "Edge & Telemetry", current: 78, target: 92 },
    ],
    suggestions: [
      {
        id: "ac-sug-1",
        field: "Architecture Impact",
        type: "replacement",
        before: "Built micro-frontend components and optimized page loading times for customer checkout.",
        after: "Architected Next.js 15 streaming SSR checkout pipeline, reducing LCP by 420ms (-34%) and cutting bundle size by 180kB across 2.4M monthly active sessions.",
        impactScore: "+18",
        impactDescription: "Demonstrates quantified Staff-level latency metrics and revenue-critical scope.",
      },
      {
        id: "ac-sug-2",
        field: "Distributed State",
        type: "addition",
        before: "Maintained global Redux state across multiple client modules.",
        after: "Engineered optimistic state reconciliation layer with zero-latency rollback, decreasing state sync error rates from 4.2% to 0.08%.",
        impactScore: "+12",
        impactDescription: "Demonstrates deep concurrency management and fault-tolerance ownership.",
      },
      {
        id: "ac-sug-3",
        field: "Engineering Leadership",
        type: "replacement",
        before: "Helped junior developers with code reviews and documentation.",
        after: "Authored 4 architectural RFCs adopted company-wide, driving cross-functional alignment across 3 departments and cutting frontend regression cycles by 40%.",
        impactScore: "+14",
        impactDescription: "Emphasizes cross-functional influence, RFC authorship, and engineering standardization.",
      },
    ],
    roadmapMilestones: [
      {
        id: 1,
        phase: "Week 1 - 2",
        title: "React 19 Server Actions & Streaming Serialization Internals",
        status: "completed",
        description: "Master React Flight protocol, Suspense boundary streaming, and optimistic mutations.",
        deliverable: "Built open-source streaming SSR dashboard with sub-50ms TTFB.",
        skills: ["React 19", "Streaming SSR", "Flight Protocol"],
        estimatedHours: 18,
        weeklyTarget: "10 hrs / week",
      },
      {
        id: 2,
        phase: "Week 3 - 4",
        title: "Distributed State Machines & CRDT Realtime Sync",
        status: "in-progress",
        description: "Implement Conflict-Free Replicated Data Types (Yjs + WebSockets) for offline-first multi-client sync.",
        deliverable: "Multiplayer canvas editor handling 500 concurrent client updates with zero conflict loss.",
        skills: ["CRDTs", "Yjs", "WebSockets", "XState"],
        estimatedHours: 24,
        weeklyTarget: "12 hrs / week",
      },
      {
        id: 3,
        phase: "Week 5 - 6",
        title: "OpenTelemetry Distributed Tracing & Edge Telemetry",
        status: "upcoming",
        description: "Instrument client-to-edge distributed traces, custom metrics, and Core Web Vitals telemetry.",
        deliverable: "Automated real-user monitoring (RUM) pipeline pushing traces to Datadog / Grafana.",
        skills: ["OpenTelemetry", "Datadog", "RUM", "Edge Compute"],
        estimatedHours: 20,
        weeklyTarget: "10 hrs / week",
      },
    ],
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    avatarInitials: "SJ",
    currentTitle: "Full-Stack Node.js Developer",
    targetRole: "Senior Platform & Edge Engineer",
    experienceLevel: "Senior",
    baseResumeScore: 88,
    baseAtsScore: 86,
    baseKeywordMatch: 82,
    atsParsedKeywords: 32,
    sampleResumeText: `Sarah Jenkins
sarah.jenkins@example.com | +1 (206) 456-7890 | Seattle, WA | github.com/sjenkins-dev

SUMMARY
Senior Full-Stack Engineer with 5+ years of experience architecting TypeScript, Node.js, and PostgreSQL backend microservices. Scaled APIs to 15k RPS and automated CI/CD deployment pipelines.

EXPERIENCE
Senior Software Engineer — Platform Cloud
• Engineered Node.js and TypeScript microservices handling 15,000 requests/sec with 99.98% uptime.
• Reduced PostgreSQL p99 query latency from 320ms to 24ms by introducing Redis caching and multi-column B-Tree indexes.
• Automated Docker and Kubernetes deployment pipelines using GitHub Actions, reducing release cycle time by 60%.

Software Developer — Fintech Solutions
• Built full-stack customer portal with React, Node.js, and REST APIs.
• Integrated Stripe payment gateways with idempotent webhook consumers.

EDUCATION
B.S. in Software Engineering — University of Washington

SKILLS
TypeScript, Node.js, React, PostgreSQL, Redis, Docker, Kubernetes, GraphQL, REST APIs, Microservices, CI/CD, Git`,
    subScores: {
      quantifiedImpact: 88,
      actionVerbs: 86,
      atsParseIntegrity: 95,
      keywordDensity: 84,
    },
    strengths: [
      "Node.js High-Throughput APIs",
      "PostgreSQL Query Optimization",
      "Redis Caching Strategies",
      "TypeScript End-to-End",
      "Docker & CI/CD Pipelines",
    ],
    missingSkills: ["Edge Workers (V8 Isolates)", "Kubernetes Service Mesh", "GraphQL Subgraph Federation"],
    skillRadar: [
      { name: "System Design", current: 85, target: 92 },
      { name: "React / Next.js", current: 80, target: 88 },
      { name: "Core Web Vitals", current: 72, target: 85 },
      { name: "Algorithms", current: 86, target: 90 },
      { name: "STAR Leadership", current: 82, target: 88 },
      { name: "Edge & Telemetry", current: 75, target: 90 },
    ],
    suggestions: [
      {
        id: "sj-sug-1",
        field: "Distributed Caching",
        type: "replacement",
        before: "Used Redis to speed up database queries.",
        after: "Architected multi-tier distributed Redis caching layer with stale-while-revalidate invalidation, cutting p99 database latency from 340ms to 22ms at 18k RPS.",
        impactScore: "+16",
        impactDescription: "Quantifies throughput scale and database load reduction.",
      },
    ],
    roadmapMilestones: [
      {
        id: 1,
        phase: "Week 1 - 2",
        title: "V8 Isolate Serverless Edge Runtimes",
        status: "in-progress",
        description: "Deploy sub-millisecond edge compute routing functions across global points-of-presence.",
        deliverable: "High-speed geolocation edge middleware routing requests in <5ms.",
        skills: ["Edge Workers", "V8 Isolates", "TypeScript"],
        estimatedHours: 20,
        weeklyTarget: "10 hrs / week",
      },
      {
        id: 2,
        phase: "Week 3 - 4",
        title: "Kubernetes & Container Orchestration",
        status: "upcoming",
        description: "Author Helm charts, HPA autoscaling policies, and zero-downtime canary deployments.",
        deliverable: "Automated zero-downtime canary deployment pipeline.",
        skills: ["Kubernetes", "Docker", "CI/CD"],
        estimatedHours: 22,
        weeklyTarget: "11 hrs / week",
      },
    ],
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    avatarInitials: "MV",
    currentTitle: "Senior Backend Engineer",
    targetRole: "Distributed Systems Tech Lead",
    experienceLevel: "Staff / Principal",
    baseResumeScore: 92,
    baseAtsScore: 90,
    baseKeywordMatch: 88,
    atsParsedKeywords: 36,
    sampleResumeText: `Marcus Vance
marcus.vance@example.com | +1 (212) 555-0192 | New York, NY | github.com/marcusvance

SUMMARY
Distributed Systems Engineer with 8+ years specializing in Go, Rust, Kafka event streaming, gRPC, and high-concurrency partition-tolerant databases.

EXPERIENCE
Senior Distributed Systems Engineer — Core Infrastructure
• Architected distributed Kafka event streaming pipeline processing 45,000 events/sec with zero data loss.
• Implemented gRPC microservices in Go, reducing inter-service serialization latency by 68%.
• Optimized PostgreSQL partitioning strategy for 80M+ row multi-tenant tables.

Backend Engineer — Cloud Systems
• Built RESTful microservices in Go and Docker.
• Maintained Redis clusters and configured Prometheus monitoring.

EDUCATION
M.S. in Computer Science — Columbia University

SKILLS
Go, Rust, Kafka, gRPC, PostgreSQL, Redis, Distributed Systems, Docker, Kubernetes, Linux, Microservices, CI/CD`,
    subScores: {
      quantifiedImpact: 94,
      actionVerbs: 92,
      atsParseIntegrity: 96,
      keywordDensity: 89,
    },
    strengths: [
      "Go & Rust Concurrency",
      "Kafka Event Streaming",
      "gRPC & Protobuf",
      "PostgreSQL Partitions",
      "Distributed Rate Limiting",
    ],
    missingSkills: ["eBPF Kernel Probing", "Raft Consensus Protocol", "Envoy Service Mesh"],
    skillRadar: [
      { name: "System Design", current: 96, target: 98 },
      { name: "React / Next.js", current: 55, target: 65 },
      { name: "Core Web Vitals", current: 50, target: 60 },
      { name: "Algorithms", current: 95, target: 96 },
      { name: "STAR Leadership", current: 88, target: 92 },
      { name: "Edge & Telemetry", current: 92, target: 96 },
    ],
    suggestions: [
      {
        id: "mv-sug-1",
        field: "High-Throughput Streaming",
        type: "replacement",
        before: "Wrote backend services to process queue messages in Kafka.",
        after: "Architected distributed Kafka pipeline processing 45k events/sec with zero message loss and exactly-once semantics across 12 worker clusters.",
        impactScore: "+20",
        impactDescription: "Highlights enterprise event throughput and data consistency guarantees.",
      },
    ],
    roadmapMilestones: [
      {
        id: 1,
        phase: "Week 1 - 3",
        title: "Raft Consensus Algorithm from Scratch in Go",
        status: "in-progress",
        description: "Implement leader election, log replication, and heartbeat fault-tolerance.",
        deliverable: "3-node distributed Key-Value store passing Jepsen partition tests.",
        skills: ["Go", "Raft", "Distributed Consensus"],
        estimatedHours: 30,
        weeklyTarget: "10 hrs / week",
      },
    ],
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    avatarInitials: "PS",
    currentTitle: "Machine Learning Engineer",
    targetRole: "GenAI Infrastructure Engineer",
    experienceLevel: "Senior",
    baseResumeScore: 90,
    baseAtsScore: 88,
    baseKeywordMatch: 85,
    atsParsedKeywords: 34,
    sampleResumeText: `Priya Sharma
priya.sharma@example.com | +1 (650) 432-8765 | Palo Alto, CA | github.com/priyasharma-ai

SUMMARY
AI/ML Engineer with 5+ years of experience optimizing deep learning models, LLM inference pipelines, PyTorch training loops, and vector search systems.

EXPERIENCE
AI Infrastructure Engineer — Neural Scale
• Scaled low-latency LLM inference pipelines using vLLM and TensorRT-LLM, cutting time-to-first-token by 55%.
• Architected vector retrieval system using Pinecone and LangChain indexing 20M documents with <35ms query latency.
• Containerized model serving microservices with Docker and Kubernetes on AWS GPU instances.

Machine Learning Engineer — DataAI
• Trained and fine-tuned BERT and transformer models with PyTorch.
• Built automated feature engineering pipelines in Python and SQL.

EDUCATION
M.S. in Artificial Intelligence — Stanford University

SKILLS
Python, PyTorch, LLM Inference, Vector Databases, LangChain, Docker, Kubernetes, FastAPI, CUDA, SQL, AWS`,
    subScores: {
      quantifiedImpact: 92,
      actionVerbs: 90,
      atsParseIntegrity: 94,
      keywordDensity: 88,
    },
    strengths: [
      "PyTorch & Transformers",
      "High-Throughput vLLM Serving",
      "Vector Search & RAG Architecture",
      "CUDA Kernel Optimization",
      "GPU Cluster Orchestration",
    ],
    missingSkills: ["FlashAttention-2 Custom Kernels", "Triton Server C++ Extensions", "DeepSpeed ZeRO-3 Scaling"],
    skillRadar: [
      { name: "System Design", current: 90, target: 95 },
      { name: "React / Next.js", current: 60, target: 70 },
      { name: "Core Web Vitals", current: 50, target: 60 },
      { name: "Algorithms", current: 92, target: 96 },
      { name: "STAR Leadership", current: 85, target: 90 },
      { name: "Edge & Telemetry", current: 88, target: 94 },
    ],
    suggestions: [
      {
        id: "ps-sug-1",
        field: "LLM Serving Latency",
        type: "replacement",
        before: "Deployed language models on cloud servers for chat completions.",
        after: "Optimized distributed vLLM inference engine with PagedAttention and FP8 quantization, reducing token time-to-first-byte by 62% for 4.2M daily queries.",
        impactScore: "+18",
        impactDescription: "Demonstrates specialized knowledge in modern GPU memory attention mechanisms.",
      },
    ],
    roadmapMilestones: [
      {
        id: 1,
        phase: "Week 1 - 2",
        title: "Triton GPU Kernel Programming",
        status: "in-progress",
        description: "Author custom fused matrix multiplication and attention kernels in OpenAI Triton.",
        deliverable: "Custom fused softmax-attention kernel outperforming vanilla PyTorch by 2.4x.",
        skills: ["Triton", "PyTorch", "GPU Kernels"],
        estimatedHours: 24,
        weeklyTarget: "12 hrs / week",
      },
    ],
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    avatarInitials: "ER",
    currentTitle: "Engineering Manager / Lead",
    targetRole: "Director of Frontend Engineering",
    experienceLevel: "Engineering Leader",
    baseResumeScore: 95,
    baseAtsScore: 93,
    baseKeywordMatch: 92,
    atsParsedKeywords: 42,
    sampleResumeText: `Elena Rostova
elena.rostova@example.com | +1 (312) 678-9012 | Chicago, IL | linkedin.com/in/elenarostova

SUMMARY
Director of Engineering / Senior Manager with 10+ years of technical leadership leading 35+ engineers across 4 squads. Expert in high-scale web architecture, OKR delivery, hiring, and system design.

EXPERIENCE
Senior Engineering Manager — Global FinTech
• Managed 28 software engineers across 3 distributed platform squads, increasing sprint delivery velocity by 38%.
• Led technical migration to React and Next.js micro-frontends, reducing annual infrastructure costs by $420k.
• Spearheaded career progression ladders and mentored 6 engineers to Staff and Manager promotions.

Lead Architect — Enterprise Systems
• Architected cloud-native web portals handling $1.2B annual transaction volume.
• Standardized security compliance (SOC-2 Type II, ISO 27001) across 14 services.

EDUCATION
B.S. & M.S. in Computer Science — University of Illinois Urbana-Champaign

SKILLS
Engineering Leadership, System Design, React, Next.js, TypeScript, Architecture, Agile, Hiring, Cloud Infrastructure, SOC-2`,
    subScores: {
      quantifiedImpact: 98,
      actionVerbs: 96,
      atsParseIntegrity: 99,
      keywordDensity: 94,
    },
    strengths: [
      "Executive Technical Strategy",
      "High-Scale Team Scaling (30+ devs)",
      "Cross-Functional Product Alignment",
      "Career Progression Ladders",
      "Architecture Standardization",
    ],
    missingSkills: ["Multi-Cloud Cost FinOps", "Zero-Trust Mesh Architecture"],
    skillRadar: [
      { name: "System Design", current: 95, target: 98 },
      { name: "React / Next.js", current: 88, target: 90 },
      { name: "Core Web Vitals", current: 85, target: 90 },
      { name: "Algorithms", current: 85, target: 90 },
      { name: "STAR Leadership", current: 98, target: 99 },
      { name: "Edge & Telemetry", current: 88, target: 92 },
    ],
    suggestions: [
      {
        id: "er-sug-1",
        field: "Organizational Velocity",
        type: "replacement",
        before: "Led engineering teams and helped deliver roadmap features.",
        after: "Scaled engineering organization from 12 to 34 engineers across 4 squads, improving on-time sprint velocity by 42% and driving zero critical production regressions over 8 quarters.",
        impactScore: "+18",
        impactDescription: "Shows executive scaling metrics, leadership cadence, and zero-defect delivery.",
      },
    ],
    roadmapMilestones: [
      {
        id: 1,
        phase: "Week 1 - 2",
        title: "Executive Technical Strategy & Multi-Year Architecture Roadmaps",
        status: "in-progress",
        description: "Author comprehensive 3-year technical roadmap balancing tech debt with feature velocity.",
        deliverable: "Executive RFC aligning 4 VP stakeholders on micro-frontend modernization.",
        skills: ["Strategy", "RFCs", "Team Scaling"],
        estimatedHours: 20,
        weeklyTarget: "10 hrs / week",
      },
    ],
  },
];

export const COPILOT_KNOWLEDGE_BASE: CopilotKnowledgeItem[] = [
  {
    id: "kb-ats",
    category: "ATS",
    triggers: ["ats", "greenhouse", "lever", "workday", "parse", "table", "format"],
    title: "ATS Abstract Syntax Tree (AST) Compliance Standards",
    responseMarkdown:
      "### 📄 ATS Lexical Parser Diagnostic\n\n**Compliance Rating**: 98.4% (Greenhouse, Lever & Workday Tested)\n\n**Key Technical Guidelines**:\n1. **Single-Column Flow**: Use standard vertical section hierarchies. Tables and absolute multi-column float layouts frequently cause token drops.\n2. **Clean Contact Nodes**: Isolate Email, Phone, GitHub, and LinkedIn links in standard text lines above the Summary.\n3. **Verifiable Metrics**: Include quantifiable units in 90%+ of bullet points (e.g. `LCP -420ms`, `+18k QPS`, `99.99% uptime`).",
    tags: ["ATS Integrity: 98.4%", "Zero Table Drop", "Workday Compliant"],
    metrics: { label: "Parse Integrity", value: "99.2%" },
  },
  {
    id: "kb-star",
    category: "Behavioral",
    triggers: ["star", "interview", "behavioral", "amazon", "leadership", "conflict"],
    title: "STAR Behavioral Master Framework",
    responseMarkdown:
      "### 🎙️ Staff-Level STAR Answer Blueprint\n\n1. **Situation (15s)**: High-concurrency checkout outage during Black Friday peak traffic.\n2. **Task (15s)**: Own root-cause diagnosis, coordinate rollback SLAs, and prevent data corruption.\n3. **Action (45s)**: Authored hotfix isolating Redis race condition, coordinated with 3 squad leads, and deployed zero-downtime patch.\n4. **Result (15s)**: Restored sub-50ms latency in 11 minutes with 0 data loss, followed by post-mortem RFC establishing automated circuit breakers.",
    tags: ["STAR Score: 96/100", "0 Filler Words", "Pacing: 140 WPM"],
    metrics: { label: "Readiness Score", value: "96/100" },
  },
];
