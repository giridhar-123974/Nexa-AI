import { InterviewQuestion } from "./types";

export interface InterviewEvaluationResult {
  score: number;
  isPassed: boolean;
  feedbackMessage: string;
  matchedPoints: string[];
  missingPoints: string[];
  starBreakdown: {
    situation: number;
    task: number;
    action: number;
    result: number;
  };
  wordCount: number;
  suggestions: string[];
  sampleExpectedAnswer: string;
}

// Full 9-Category Predefined Question Bank
export const EXTENDED_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // 1. Frontend Architecture
  {
    id: "fe-1",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    difficulty: "Staff Level",
    title: "Micro-Frontend Hydration & State Synchronization",
    question:
      "How would you architect state synchronization across independent micro-frontends without creating global memory leaks or hydration mismatches?",
    hints: [
      "Consider Custom Events / BroadcastChannel API for decoupled messaging.",
      "Discuss single-spa or module federation lifecycle boundaries.",
      "Explain state cleanup on unmount.",
    ],
    expectedKeyPoints: [
      {
        id: "p1",
        point: "Decoupled Event Bus or BroadcastChannel for pub/sub messaging",
        keywords: ["broadcastchannel", "event bus", "custom event", "pub/sub", "messaging"],
        weight: 25,
      },
      {
        id: "p2",
        point: "Module Federation boundary isolation and shared dependency singletons",
        keywords: ["module federation", "singleton", "isolation", "boundary", "dependency"],
        weight: 25,
      },
      {
        id: "p3",
        point: "Memory leak prevention with deterministic teardown and unsubscribe hooks",
        keywords: ["memory leak", "unsubscribe", "cleanup", "unmount", "teardown"],
        weight: 25,
      },
      {
        id: "p4",
        point: "Hydration boundary alignment and SSR state hydration contracts",
        keywords: ["hydration", "ssr", "streaming", "mismatch", "server components"],
        weight: 25,
      },
    ],
    sampleGoodAnswer:
      "I would establish an event-driven architecture using the native BroadcastChannel API or CustomEvents for cross-app messaging to preserve framework independence. Shared libraries like React are configured as Module Federation singletons. Every micro-frontend encapsulates its state machine and registers clean unmount teardown handlers in useEffect cleanup to prevent orphaned listeners. For SSR hydration, we pass serialized state via deterministic JSON-LD tags across hydration boundaries.",
    evaluationRubric: {
      technicalDepth: "Evaluates cross-app communication, memory isolation, and SSR hydration contracts.",
      clarity: "Clear distinction between host and remote micro-frontend boundaries.",
    },
    starBreakdown: { situation: 92, task: 90, action: 96, result: 94 },
    pacing: "142 WPM (Optimal)",
    fillerWords: "0 detected",
    score: 95,
  },
  {
    id: "fe-2",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    difficulty: "Hard",
    title: "Optimizing Core Web Vitals (LCP & INP)",
    question:
      "A high-traffic e-commerce checkout page has an LCP of 3.8s and poor Interaction to Next Paint (INP). Walk me through your diagnostic and optimization blueprint.",
    hints: [
      "Break down Chrome DevTools Performance panel profiling.",
      "Mention font-display: optional, priority hints (fetchpriority='high'), and streaming SSR.",
      "Address long JavaScript tasks blocking main thread (yield to main, requestPostAnimationFrame).",
    ],
    expectedKeyPoints: [
      {
        id: "fe2-p1",
        point: "Profile long tasks and LCP resource priority (fetchpriority='high', preload)",
        keywords: ["fetchpriority", "preload", "lcp", "hero image", "resource load"],
        weight: 25,
      },
      {
        id: "fe2-p2",
        point: "Break long tasks using scheduler.yield() or requestIdleCallback to optimize INP",
        keywords: ["inp", "yield", "long task", "main thread", "interaction"],
        weight: 25,
      },
      {
        id: "fe2-p3",
        point: "Optimize font loading (font-display: swap/optional) and eliminate render-blocking CSS",
        keywords: ["font-display", "render-blocking", "critical css", "cls", "web vitals"],
        weight: 25,
      },
      {
        id: "fe2-p4",
        point: "Measure and monitor with field real-user telemetry (RUM / Core Web Vitals library)",
        keywords: ["rum", "telemetry", "opentelemetry", "web-vitals", "metrics"],
        weight: 25,
      },
    ],
    sampleGoodAnswer:
      "First, I profile the Performance timeline to identify whether LCP delay is caused by server response time (TTFB), resource load delay, or render delay. For the hero element, I add fetchpriority='high' and preload tags while self-hosting fonts with font-display: optional. To resolve INP, I break large script evaluation using scheduler.yield() and transition expensive React state updates to useTransition to keep input handlers responsive within <50ms.",
    evaluationRubric: {
      technicalDepth: "Addresses both resource loading waterfalls and main-thread scheduling.",
      clarity: "Concrete performance optimizations with measurable metrics.",
    },
    starBreakdown: { situation: 94, task: 92, action: 96, result: 95 },
    pacing: "138 WPM",
    fillerWords: "0 detected",
    score: 96,
  },

  // 2. React Internals & Architecture
  {
    id: "react-1",
    category: "react",
    categoryLabel: "React 19 & Architecture",
    difficulty: "Hard",
    title: "React Server Components vs Client Hydration",
    question:
      "Explain the fundamental architecture difference between React Server Components (RSC) and standard client components. How does RSC eliminate client bundle bloat?",
    hints: [
      "RSC executes exclusively on the server and serializes to a JSON stream, not HTML or JS bundle.",
      "Dependencies imported in RSC never ship to client.",
      "Explain the 'use client' boundary directive.",
    ],
    expectedKeyPoints: [
      {
        id: "r1",
        point: "Server Components execute solely on server and stream serialized React flight data",
        keywords: ["flight", "server components", "serialize", "stream", "zero bundle"],
        weight: 30,
      },
      {
        id: "r2",
        point: "Heavy server-side dependencies (markdown parsers, DB clients) are excluded from JS bundles",
        keywords: ["bundle size", "dependencies", "zero client", "npm packages"],
        weight: 30,
      },
      {
        id: "r3",
        point: "'use client' defines the serialization boundary where interactive event handlers hydrate",
        keywords: ["use client", "boundary", "hydration", "interactivity", "state"],
        weight: 25,
      },
      {
        id: "r4",
        point: "Preserves client state during server re-renders via stream reconciliation",
        keywords: ["state preservation", "reconciliation", "streaming"],
        weight: 15,
      },
    ],
    sampleGoodAnswer:
      "React Server Components run exclusively on the server and emit a compact JSON-like serialized stream (the Flight payload) rather than executable JavaScript code. Heavy packages like date-fns, markdown parsers, or direct database queries remain on the server, resulting in 0kb added to the client bundle. The 'use client' boundary defines where client hydration and interactive event handlers begin, allowing seamless interleaving of server and client component trees.",
    evaluationRubric: {
      technicalDepth: "Understands Flight protocol, bundle isolation, and boundary composition.",
      clarity: "Concise explanation of client bundle elimination.",
    },
    starBreakdown: { situation: 92, task: 94, action: 96, result: 92 },
    pacing: "140 WPM",
    fillerWords: "0 detected",
    score: 95,
  },

  // 3. JavaScript Engine & Concurrency
  {
    id: "js-1",
    category: "javascript",
    categoryLabel: "JavaScript Internals",
    difficulty: "Hard",
    title: "Event Loop, Microtasks & V8 Memory Management",
    question:
      "Explain the priority execution order between Promise microtasks, requestAnimationFrame, setTimeout macrotasks, and queueMicrotask. How do memory leaks happen in closures?",
    hints: [
      "Microtasks queue empties after every task and before rendering.",
      "requestAnimationFrame executes right before the browser paint step.",
      "Closures retain references to outer scope variables preventing garbage collection.",
    ],
    expectedKeyPoints: [
      {
        id: "js1-p1",
        point: "Microtask queue (Promises, queueMicrotask) drains completely before macrotasks and rendering",
        keywords: ["microtask", "promise", "queuemicrotask", "drain", "priority"],
        weight: 30,
      },
      {
        id: "js1-p2",
        point: "requestAnimationFrame runs immediately prior to browser paint recalculation",
        keywords: ["requestanimationframe", "paint", "render step", "animation"],
        weight: 25,
      },
      {
        id: "js1-p3",
        point: "Macrotasks (setTimeout, setInterval, I/O) execute one per event loop turn",
        keywords: ["macrotask", "settimeout", "task queue", "event loop"],
        weight: 20,
      },
      {
        id: "js1-p4",
        point: "Unreleased closure references keep entire lexical environment in V8 heap memory",
        keywords: ["closure", "memory leak", "garbage collector", "v8 heap", "retain"],
        weight: 25,
      },
    ],
    sampleGoodAnswer:
      "The V8 event loop executes the synchronous call stack first. When empty, it drains the entire Microtask queue (Promise callbacks and queueMicrotask) before processing rendering steps. requestAnimationFrame fires right before the style calculation and paint phase. Macrotasks like setTimeout are evaluated in subsequent loop ticks. Closures cause memory leaks when an inner function maintains an unintended reference to a large outer scope variable, preventing V8's Mark-and-Sweep garbage collector from reclaiming the heap allocation.",
    evaluationRubric: {
      technicalDepth: "Detailed knowledge of event loop lifecycle and V8 garbage collection.",
      clarity: "Structured step-by-step execution timeline.",
    },
    starBreakdown: { situation: 90, task: 92, action: 95, result: 93 },
    pacing: "144 WPM",
    fillerWords: "0 detected",
    score: 94,
  },

  // 4. TypeScript Advanced Typing
  {
    id: "ts-1",
    category: "typescript",
    categoryLabel: "TypeScript Mastery",
    difficulty: "Medium",
    title: "Conditional Types, Infer Keyword & Template Literals",
    question:
      "How do Conditional Types combined with the 'infer' keyword enable compile-time type deduction? Give a real-world example like unwrapping nested Promises or Action types.",
    hints: [
      "Syntax: T extends Promise<infer U> ? U : T",
      "Explain distributive conditional types over union types.",
      "Mention recursive conditional types.",
    ],
    expectedKeyPoints: [
      {
        id: "ts1-p1",
        point: "Infer keyword introduces a type variable dynamically extracted within the extends condition",
        keywords: ["infer", "conditional types", "extends", "type variable", "deduce"],
        weight: 30,
      },
      {
        id: "ts1-p2",
        point: "Example pattern: type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T",
        keywords: ["awaited", "promise", "unwrap", "generic", "pattern"],
        weight: 30,
      },
      {
        id: "ts1-p3",
        point: "Distributive property across union types when checking bare type parameters",
        keywords: ["distributive", "union", "bare type parameter"],
        weight: 20,
      },
      {
        id: "ts1-p4",
        point: "Compile-time safety without runtime overhead",
        keywords: ["compile-time", "zero runtime", "type safety"],
        weight: 20,
      },
    ],
    sampleGoodAnswer:
      "Conditional types allow type branching using ternary syntax: `T extends U ? X : Y`. When combined with `infer R`, TypeScript inspects the structural type match and dynamically assigns the extracted type parameter to `R`. For instance, `type Flatten<T> = T extends (infer Item)[] ? Item : T` unwraps array items automatically. Furthermore, conditional types distribute across unions, enabling powerful algebraic type validation at compile time with zero runtime JavaScript footprint.",
    evaluationRubric: {
      technicalDepth: "Demonstrates deep comprehension of TypeScript type system metaprogramming.",
      clarity: "Clean syntax demonstration and union distribution explanation.",
    },
    starBreakdown: { situation: 92, task: 90, action: 94, result: 92 },
    pacing: "135 WPM",
    fillerWords: "0 detected",
    score: 93,
  },

  // 5. Backend & Distributed Systems
  {
    id: "be-1",
    category: "backend",
    categoryLabel: "Backend & Systems",
    difficulty: "Staff Level",
    title: "Distributed Rate Limiting at High Throughput",
    question:
      "Design a distributed rate limiter supporting 100,000 QPS with sub-millisecond overhead. Compare Sliding Window Log, Token Bucket, and Redis Lua scripts.",
    hints: [
      "Token Bucket and Sliding Window Counter are ideal for high throughput.",
      "Redis + Atomic Lua scripts prevent race conditions across distributed worker nodes.",
      "Local in-memory token batching reduces network round trips to Redis.",
    ],
    expectedKeyPoints: [
      {
        id: "be1-p1",
        point: "Token Bucket / Sliding Window Counter algorithm implementation",
        keywords: ["token bucket", "sliding window", "leaky bucket", "rate limit"],
        weight: 25,
      },
      {
        id: "be1-p2",
        point: "Redis cluster with atomic Lua scripts to eliminate race conditions",
        keywords: ["redis", "lua", "atomic", "race condition", "cluster"],
        weight: 30,
      },
      {
        id: "be1-p3",
        point: "Local in-memory token pooling / batching to achieve <1ms latency at 100k QPS",
        keywords: ["batching", "in-memory", "local cache", "throughput", "latency"],
        weight: 25,
      },
      {
        id: "be1-p4",
        point: "Graceful degradation headers (X-RateLimit-Remaining, Retry-After)",
        keywords: ["headers", "429", "retry-after", "degradation", "fallback"],
        weight: 20,
      },
    ],
    sampleGoodAnswer:
      "To support 100k QPS with sub-millisecond overhead, I implement the Sliding Window Counter algorithm using Redis with atomic Lua scripting. To prevent hammering Redis on every single HTTP request, edge gateway instances reserve local token batches (e.g. 50 tokens at a time) in-memory. If Redis experiences temporary latency or downtime, the rate limiter fails open with local circuit breakers while returning RFC-compliant 429 and Retry-After headers to throttling clients.",
    evaluationRubric: {
      technicalDepth: "Addresses both algorithmic complexity and network optimization via batching.",
      clarity: "High-scale engineering tradeoffs clearly justified.",
    },
    starBreakdown: { situation: 95, task: 94, action: 96, result: 96 },
    pacing: "140 WPM",
    fillerWords: "0 detected",
    score: 96,
  },

  // 6. Node.js & Asynchronous I/O
  {
    id: "node-1",
    category: "nodejs",
    categoryLabel: "Node.js Architecture",
    difficulty: "Medium",
    title: "Libuv Thread Pool vs Worker Threads for CPU Heavy Tasks",
    question:
      "When a Node.js API needs to perform image resizing or cryptography, why should you avoid blocking the main event loop? Compare Worker Threads vs Libuv thread pool.",
    hints: [
      "Libuv thread pool default size is 4, used for fs, crypto, dns.lookup.",
      "CPU-bound tasks block event loop, stalling all concurrent HTTP requests.",
      "Worker Threads run in separate V8 isolates with shared memory.",
    ],
    expectedKeyPoints: [
      {
        id: "n1",
        point: "CPU-bound tasks block the single-threaded event loop, spiking API latency for all clients",
        keywords: ["event loop", "block", "cpu-bound", "single thread", "latency spike"],
        weight: 30,
      },
      {
        id: "n2",
        point: "Libuv thread pool handles asynchronous I/O and specific crypto/fs tasks (UV_THREADPOOL_SIZE)",
        keywords: ["libuv", "threadpool", "crypto", "fs", "uv_threadpool_size"],
        weight: 25,
      },
      {
        id: "n3",
        point: "Worker Threads (worker_threads module) create separate V8 isolates for CPU-intensive computing",
        keywords: ["worker threads", "v8 isolate", "parallel", "multithreading"],
        weight: 25,
      },
      {
        id: "n4",
        point: "Use ArrayBuffer / SharedArrayBuffer for zero-copy memory sharing across workers",
        keywords: ["sharedarraybuffer", "zero-copy", "transferable", "messagechannel"],
        weight: 20,
      },
    ],
    sampleGoodAnswer:
      "Node.js processes all HTTP requests on a single-threaded V8 event loop. Executing CPU-intensive tasks like image transcoding on the main thread stops the event loop entirely, preventing any incoming connections from being processed. While Libuv provides an underlying thread pool for I/O and native crypto operations (configurable via UV_THREADPOOL_SIZE), heavy custom compute belongs in Worker Threads, which run separate V8 isolates and communicate via MessagePort or zero-copy SharedArrayBuffers.",
    evaluationRubric: {
      technicalDepth: "Clear delineation between Libuv I/O threads and V8 Worker Threads.",
      clarity: "Concrete performance remedies for event loop blockage.",
    },
    starBreakdown: { situation: 92, task: 90, action: 95, result: 93 },
    pacing: "140 WPM",
    fillerWords: "0 detected",
    score: 94,
  },

  // 7. SQL & Database Optimization
  {
    id: "sql-1",
    category: "sql",
    categoryLabel: "SQL & Query Optimization",
    difficulty: "Hard",
    title: "PostgreSQL Indexing: B-Tree, GIN & Partitioning",
    question:
      "A table with 50 million orders is suffering from slow multi-tenant queries. Explain how you analyze EXPLAIN ANALYZE, pick between B-Tree vs GIN indexes, and design table partitioning.",
    hints: [
      "Look for Sequential Scan vs Index Scan / Bitmap Heap Scan.",
      "B-Tree for equality and range queries, GIN for JSONB and full-text search.",
      "Partitioning by tenant_id or created_at (List or Range partitioning).",
    ],
    expectedKeyPoints: [
      {
        id: "s1",
        point: "Inspect EXPLAIN ANALYZE for Seq Scan, filter cost, buffer cache hits, and execution time",
        keywords: ["explain analyze", "seq scan", "index scan", "cost", "buffer"],
        weight: 25,
      },
      {
        id: "s2",
        point: "B-Tree composite index on (tenant_id, created_at DESC) for fast range lookups",
        keywords: ["b-tree", "composite index", "range query", "order by", "tenant_id"],
        weight: 25,
      },
      {
        id: "s3",
        point: "GIN index for JSONB metadata attributes or full-text search indexing",
        keywords: ["gin index", "jsonb", "full-text search", "inverted index"],
        weight: 25,
      },
      {
        id: "s4",
        point: "Declarative table partitioning by RANGE (created_at) or LIST (tenant_id) to reduce working set size",
        keywords: ["partitioning", "range", "list", "partition pruning", "working set"],
        weight: 25,
      },
    ],
    sampleGoodAnswer:
      "I start by running `EXPLAIN (ANALYZE, BUFFERS)` to inspect if queries are performing full table sequential scans or spilling to disk. For multi-tenant queries filtering by customer and timestamp, I create a composite B-Tree index on `(tenant_id, created_at DESC)`. If orders contain semi-structured JSONB payloads, I use a GIN index with `jsonb_path_ops`. For tables scaling past 50M rows, I implement declarative RANGE partitioning by year/month, which allows PostgreSQL's query planner to use partition pruning to scan only relevant child tables.",
    evaluationRubric: {
      technicalDepth: "Detailed understanding of index data structures and query plan optimization.",
      clarity: "Practical production database refactoring strategy.",
    },
    starBreakdown: { situation: 94, task: 92, action: 96, result: 95 },
    pacing: "142 WPM",
    fillerWords: "0 detected",
    score: 95,
  },

  // 8. System Design
  {
    id: "sys-1",
    category: "system_design",
    categoryLabel: "System Design",
    difficulty: "Staff Level",
    title: "Designing a Collaborative Document Editor (CRDT vs OT)",
    question:
      "Design a real-time collaborative document editing platform like Google Docs or Figma for 10,000 concurrent editors. Compare CRDTs vs Operational Transformation.",
    hints: [
      "Operational Transformation (OT) requires centralized sequencing server.",
      "CRDTs (Conflict-free Replicated Data Types) allow decentralized convergence with Yjs/Automerge.",
      "WebSockets for bidirectional delta streaming.",
    ],
    expectedKeyPoints: [
      {
        id: "sys1-p1",
        point: "CRDTs (Yjs/LSeq) for peer-to-peer or decentralized state convergence vs OT centralized authority",
        keywords: ["crdt", "operational transformation", "convergence", "conflict-free", "yjs"],
        weight: 30,
      },
      {
        id: "sys1-p2",
        point: "WebSocket cluster with Redis Pub/Sub backplane for real-time delta transmission",
        keywords: ["websocket", "pub/sub", "redis", "delta", "real-time"],
        weight: 25,
      },
      {
        id: "sys1-p3",
        point: "Snapshotting and append-only change logs in durable storage (PostgreSQL/S3)",
        keywords: ["snapshot", "append-only", "durability", "s3", "storage"],
        weight: 25,
      },
      {
        id: "sys1-p4",
        point: "Awareness protocol for cursor positions and client presence heartbeats",
        keywords: ["awareness", "cursor", "presence", "heartbeat"],
        weight: 20,
      },
    ],
    sampleGoodAnswer:
      "I choose state-based CRDTs (like Yjs) over Operational Transformation because CRDTs guarantee mathematical strong eventual consistency without requiring every keystroke to round-trip to a centralized server before local rendering. Clients perform optimistic local edits immediately and broadcast serialized state deltas over WebSockets backed by an horizontally scaled Redis Pub/Sub cluster. Periodic document snapshots are asynchronously written to S3 and PostgreSQL, while a lightweight awareness protocol broadcasts ephemeral cursor presence.",
    evaluationRubric: {
      technicalDepth: "Detailed comparison of distributed consistency models and real-time transport.",
      clarity: "Clear architectural block diagram and data flow narrative.",
    },
    starBreakdown: { situation: 96, task: 94, action: 98, result: 96 },
    pacing: "145 WPM",
    fillerWords: "0 detected",
    score: 97,
  },

  // 9. Behavioral STAR Interview
  {
    id: "beh-1",
    category: "behavioral",
    categoryLabel: "Behavioral (STAR Method)",
    difficulty: "Staff Level",
    title: "Navigating High-Stakes Architectural Disagreement",
    question:
      "Tell me about a time you strongly disagreed with a tech lead or product manager regarding an engineering architecture or release timeline. How did you resolve it?",
    hints: [
      "Follow STAR: Situation, Task, Action, Result.",
      "Focus on objective data, benchmarking, and consensus rather than personal opinion.",
      "Show empathy, business priority alignment, and positive outcome.",
    ],
    expectedKeyPoints: [
      {
        id: "beh1-p1",
        point: "Situation: Specific context with competing technical and business constraints",
        keywords: ["situation", "context", "constraint", "disagreement", "team", "project"],
        weight: 25,
      },
      {
        id: "beh1-p2",
        point: "Task: Defining the shared business goal and risk mitigation ownership",
        keywords: ["task", "goal", "objective", "risk", "responsibility", "ownership"],
        weight: 25,
      },
      {
        id: "beh1-p3",
        point: "Action: Built proof-of-concept benchmarks and authored an RFC to align stakeholders on data",
        keywords: ["action", "benchmark", "poc", "rfc", "data", "alignment", "compromise"],
        weight: 25,
      },
      {
        id: "beh1-p4",
        point: "Result: Quantified engineering outcome and strengthened cross-functional trust",
        keywords: ["result", "outcome", "latency", "on time", "trust", "delivered", "metrics"],
        weight: 25,
      },
    ],
    sampleGoodAnswer:
      "**Situation**: During a major migration to Next.js 15, product management wanted to rush client-side rendering for a critical checkout flow to meet a quarterly date, whereas I identified severe SEO and LCP regression risks. **Task**: I needed to safeguard site performance without missing the marketing launch window. **Action**: I authored an RFC with a 48-hour POC benchmarking streaming SSR against CSR, proving a 650ms faster checkout load time. I proposed a phased hybrid rollout that met the deadline while keeping critical routes server-rendered. **Result**: We launched on time with zero regressions, resulting in a +12% conversion lift and establishing an RFC template adopted across engineering.",
    evaluationRubric: {
      technicalDepth: "Demonstrates data-driven consensus building and executive communication.",
      clarity: "Flawless STAR structure with quantified business impact.",
    },
    starBreakdown: { situation: 95, task: 92, action: 96, result: 95 },
    pacing: "136 WPM",
    fillerWords: "0 detected",
    score: 96,
  },
];

// Deterministic Answer Evaluator
export function evaluateInterviewAnswer(
  question: InterviewQuestion,
  answer: string
): InterviewEvaluationResult {
  const cleanAnswer = answer.trim();
  const lowerAnswer = cleanAnswer.toLowerCase();
  const words = cleanAnswer.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Keyword and Key Point Coverage
  const matchedPoints: string[] = [];
  const missingPoints: string[] = [];
  let pointsScore = 0;

  question.expectedKeyPoints.forEach((kp) => {
    const isMatched = kp.keywords.some((kw) => lowerAnswer.includes(kw.toLowerCase()));
    if (isMatched) {
      matchedPoints.push(kp.point);
      pointsScore += kp.weight;
    } else {
      missingPoints.push(kp.point);
    }
  });

  // 2. Length & Structural Depth Scoring
  let lengthMultiplier = 1.0;
  if (wordCount < 20) {
    lengthMultiplier = 0.35; // Too brief
  } else if (wordCount < 45) {
    lengthMultiplier = 0.65;
  } else if (wordCount < 80) {
    lengthMultiplier = 0.88;
  } else {
    lengthMultiplier = 1.0;
  }

  // 3. STAR structure evaluation for Behavioral or System Design
  const hasSituation = lowerAnswer.includes("situation") || lowerAnswer.includes("when") || lowerAnswer.includes("context");
  const hasTask = lowerAnswer.includes("task") || lowerAnswer.includes("goal") || lowerAnswer.includes("needed to");
  const hasAction = lowerAnswer.includes("action") || lowerAnswer.includes("built") || lowerAnswer.includes("implemented") || lowerAnswer.includes("designed");
  const hasResult = lowerAnswer.includes("result") || lowerAnswer.includes("reduced") || lowerAnswer.includes("increased") || lowerAnswer.includes("outcome");

  const situationScore = hasSituation ? 92 : 70;
  const taskScore = hasTask ? 90 : 68;
  const actionScore = hasAction ? 95 : 72;
  const resultScore = hasResult ? 94 : 65;

  const rawScore = Math.round(pointsScore * lengthMultiplier);
  const finalScore = Math.max(
    Math.min(98, rawScore + (wordCount > 60 ? 5 : 0)),
    wordCount > 15 ? 42 : 20
  );
  const isPassed = finalScore >= 70;

  // 4. Generate Actionable Feedback and Suggestions
  const suggestions: string[] = [];

  if (wordCount < 40) {
    suggestions.push("Expand your answer: provide concrete architecture details and trade-off justifications.");
  }
  if (missingPoints.length > 0) {
    suggestions.push(`Cover key technical dimension: "${missingPoints[0]}"`);
  }
  if (!hasResult && question.category === "behavioral") {
    suggestions.push("Conclude with quantified results (e.g. latency reduced by X%, team velocity increased).");
  }
  if (matchedPoints.length === question.expectedKeyPoints.length) {
    suggestions.push("Exceptional technical depth covering all key architectural dimensions!");
  }

  let feedbackMessage = "";
  if (finalScore >= 90) {
    feedbackMessage = "Staff-Level Response: Excellent technical depth, structured delivery, and clear trade-offs.";
  } else if (finalScore >= 75) {
    feedbackMessage = "Strong Answer: Solid domain knowledge with minor gaps in architectural edge-cases.";
  } else if (finalScore >= 55) {
    feedbackMessage = "Adequate Foundation: Good start, but needs deeper technical specifics and concrete metrics.";
  } else {
    feedbackMessage = "Incomplete Response: Elaborate on the core concepts and include key technical keywords.";
  }

  return {
    score: finalScore,
    isPassed,
    feedbackMessage,
    matchedPoints,
    missingPoints,
    starBreakdown: {
      situation: situationScore,
      task: taskScore,
      action: actionScore,
      result: resultScore,
    },
    wordCount,
    suggestions,
    sampleExpectedAnswer: question.sampleGoodAnswer,
  };
}
