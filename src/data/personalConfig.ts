export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Hackathons' | 'Certifications' | 'Badges';
  description: string;
  iconType: 'trophy' | 'award' | 'shield' | 'star';
  credentialUrl?: string;
  badgeCode: string;
}

export interface PersonalProfile {
  name: string;
  moniker: string;
  role: string;
  subRole: string;
  tagline: string;
  location: string;
  email: string;
  photoUrl?: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  resumeUrl: string;
  aboutBio: string;
  codePhilosophy: string;
  stats: { label: string; value: string; subtext: string }[];
  skills: {
    category: string;
    themeLabel: string;
    lore: string;
    skills: { name: string; level: number; category: string }[];
  }[];
  projects: {
    id: string;
    title: string;
    tagline: string;
    islandCode: string;
    description: string;
    highlights: string[];
    techStack: string[];
    type: 'Full-Stack SaaS' | '3D & AI' | 'Distributed System' | 'Cyber Security';
    metrics: string;
    demoUrl: string;
    githubUrl: string;
  }[];
  achievements: AchievementItem[];
  experience: {
    period: string;
    role: string;
    organization: string;
    location: string;
    description: string;
    achievements: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    grade: string;
    details: string;
  };
}

export const PERSONAL_CONFIG: PersonalProfile = {
  name: "Harsh Shandilya",
  moniker: "Harsh",
  role: "Full-Stack Software Engineer & Systems Architect",
  subRole: "Specializing in High-Throughput Distributed Backends, 3D WebGL Engines & Resilient Cloud Architecture",
  tagline: "Architecting high-concurrency distributed systems, zero-defect microservices, and interactive 3D spatial web environments.",
  location: "Bhilai / Raipur, India • 21°14'N 81°38'E (Open to Global Remote & Relocation)",
  email: "7c24harsh@gmail.com",
  // Path to your hero portrait cutout (drop your cut-out photo in public/ and update path here):
  photoUrl: "/harsh-cutout.png",
  githubUrl: "https://github.com/mradityasonicse",
  linkedinUrl: "https://linkedin.com/in/harsh-shandilya",
  twitterUrl: "https://x.com",
  resumeUrl: "#resume",
  aboutBio: "I am a full-stack engineer and systems architect dedicated to engineering resilient software with zero-vibe coding and 100% verified execution. From scaling concurrent distributed pipelines and designing strict relational schemas to rendering silky 120 FPS WebGL spatial experiences, I build production systems engineered to endure real-world stress.",
  codePhilosophy: "Zero unverified assumptions. Every API contract is strictly typed, every component passes performance and accessibility budgets, and every architecture is built to withstand production turbulence.",
  
  stats: [
    { label: "Production Deployments", value: "24+", subtext: "Zero-Downtime Releases" },
    { label: "National Hackathons", value: "Top Finalist", subtext: "SIH & Regional Podiums" },
    { label: "Open Source Commits", value: "3,200+", subtext: "Deterministic Codebases" },
    { label: "System Test Coverage", value: "98%+", subtext: "Strict Automated Harnesses" }
  ],

  skills: [
    {
      category: "Frontend & 3D Spatial Interfaces",
      themeLabel: "Naval Cartography & Visual Engine",
      lore: "Sub-pixel precision, fluid clamp typography, GPU fragment shaders, and 60-120 FPS render loops.",
      skills: [
        { name: "React 19 & Next.js 15 (App Router)", level: 96, category: "Core Framework" },
        { name: "TypeScript & Strict Type Safety", level: 95, category: "Type System" },
        { name: "Three.js & WebGL / GLSL Shaders", level: 90, category: "3D & Shaders" },
        { name: "Tailwind CSS v4 & Framer Motion", level: 95, category: "Kinetic Motion" },
      ]
    },
    {
      category: "Backend & Systems Propulsion",
      themeLabel: "High-Throughput Distributed Core",
      lore: "Sub-millisecond API response budgets, distributed locks, and ACID transactional databases.",
      skills: [
        { name: "Python 3.12, FastAPI & Asynchronous Queues", level: 94, category: "Core Language" },
        { name: "Node.js, Express & Bun Runtime", level: 93, category: "Engine Runtime" },
        { name: "PostgreSQL & Prisma / Drizzle ORM", level: 91, category: "Relational DB" },
        { name: "Redis & Distributed In-Memory Cache", level: 89, category: "Fast Storage" },
      ]
    },
    {
      category: "Cloud Infrastructure & DevOps",
      themeLabel: "Navigational Fleet Logistics",
      lore: "Containerized multi-stage microservices, automated CI/CD pipelines, and serverless edge compute.",
      skills: [
        { name: "Docker & Container Hardening", level: 90, category: "Containers" },
        { name: "AWS Cloud (ECS, S3, RDS, Lambda)", level: 88, category: "Cloud Architecture" },
        { name: "GitHub Actions CI/CD Automation", level: 92, category: "DevOps" },
        { name: "Cloudflare Workers & Edge K/V", level: 89, category: "Edge Infrastructure" },
      ]
    },
    {
      category: "Algorithmic Integrity & Security",
      themeLabel: "Cryptographic & Defensive Armor",
      lore: "Algorithmic computational complexity, clean hexagonal architecture, and OWASP Top 10 mitigation.",
      skills: [
        { name: "Data Structures & Algorithms (DSA)", level: 92, category: "Core CS" },
        { name: "System Design & Event-Driven Patterns", level: 89, category: "Architecture" },
        { name: "OWASP Top 10 Security & Input Sanitization", level: 90, category: "Application Security" },
        { name: "TDD & Automated Integration Testing", level: 96, category: "Verification" },
      ]
    }
  ],

  projects: [
    {
      id: "restaurant-order-billing",
      title: "Automated Billing & Order Processing Engine",
      tagline: "Deterministic pricing calculations, table state machine & tabular receipt pipeline",
      islandCode: "EXPEDITION 01 • PYTHON SYSTEMS",
      description: "A production Python ordering and automated billing engine built with test-driven validation, table status management, real-time bill calculations, itemized discount policies, and CLI receipt formatting.",
      highlights: [
        "100% deterministic test-case verification across standard, edge-case, and boundary order inputs",
        "Engineered modular menu parser and itemized multi-tier taxation engine",
        "Deterministic terminal CLI reporting with sub-10ms transactional execution"
      ],
      techStack: ["Python 3.12", "CLI Architecture", "Unit Testing", "Regex Parsing", "Clean Architecture"],
      type: "Distributed System",
      metrics: "100% Test Pass Rate • Sub-10ms Latency",
      demoUrl: "https://github.com/mradityasonicse",
      githubUrl: "https://github.com/mradityasonicse"
    },
    {
      id: "omni-agent-orchestrator",
      title: "OmniAgent: Autonomous Multi-Threaded Engine",
      tagline: "Autonomous multi-threaded developer agent orchestrator with AST code intelligence",
      islandCode: "EXPEDITION 02 • CORE INTELLIGENCE",
      description: "A developer agent orchestration framework with persistent task sharding, AST code intelligence, self-healing diagnostic loops, and isolated subagents for concurrent operations.",
      highlights: [
        "Accelerates multi-file codebase refactoring with surgical symbol discovery via Ripgrep",
        "Engineered persistent state checkpointing on disk immune to memory degradation",
        "Autonomous exit-code diagnostics that self-heal compilation and syntax errors"
      ],
      techStack: ["TypeScript", "Node.js", "Bun", "Vector Index", "Docker", "Tailwind CSS"],
      type: "Distributed System",
      metrics: "50K+ Operations / Day • 99.98% Uptime",
      demoUrl: "https://github.com/mradityasonicse",
      githubUrl: "https://github.com/mradityasonicse"
    },
    {
      id: "visionpath-ai",
      title: "VisionPath: Real-Time Edge Vision Pipeline",
      tagline: "Multimodal edge computer vision pipeline with real-time tensor inference",
      islandCode: "EXPEDITION 03 • EDGE TENSORS",
      description: "High-performance edge vision engine designed for object tracking, facial gesture analysis, and automated scene classification using quantized neural models.",
      highlights: [
        "Delivers sub-15ms inference latency per frame on standard hardware",
        "Engineered low-latency WebSocket streaming pipeline for live camera telemetry",
        "Modular architecture supporting hot-swappable neural weight checkpoints"
      ],
      techStack: ["Python", "PyTorch", "OpenCV", "FastAPI", "WebSockets", "Docker"],
      type: "3D & AI",
      metrics: "60 FPS Stream Rate • Sub-15ms Latency",
      demoUrl: "https://github.com/mradityasonicse",
      githubUrl: "https://github.com/mradityasonicse"
    },
    {
      id: "verve-spatial-engine",
      title: "Verve3D: Real-Time WebGL Spatial Platform",
      tagline: "Interactive 3D configurator with 60-120 FPS performance budget and GLSL shaders",
      islandCode: "EXPEDITION 04 • GRAPHICS & WEBGL",
      description: "An interactive 3D spatial web platform featuring procedural GLSL fragment shaders, custom physical materials, realistic lighting models, and zero layout shift on mobile viewports.",
      highlights: [
        "Custom WebGL shader pipeline delivering stable 60 FPS on mobile and 120 FPS on desktop",
        "Engineered procedural Web Audio synthesizer for tactile spatial haptics",
        "Achieved 99/100 Google Lighthouse performance rating with 0ms CLS"
      ],
      techStack: ["React 19", "Three.js", "GLSL Shaders", "Web Audio API", "Tailwind CSS"],
      type: "3D & AI",
      metrics: "Sub-500ms FCP • 0ms Layout Shift",
      demoUrl: "https://github.com/mradityasonicse",
      githubUrl: "https://github.com/mradityasonicse"
    },
    {
      id: "resilient-student-planner",
      title: "Resilient Academic Governance Suite",
      tagline: "Deterministic timetable optimizer, attendance margin calculator & PWA sync",
      islandCode: "EXPEDITION 05 • FULL-STACK WEB",
      description: "An offline-first academic management suite helping students navigate complex course schedules, dynamic attendance criteria thresholds, exam timetables, and assignment workflows.",
      highlights: [
        "Automated attendance projection engine calculating required presence margins",
        "Offline-first progressive web app with instant sync and local encrypted persistence",
        "Conflict-free timetable scheduling algorithm avoiding multi-course clashes"
      ],
      techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "IndexedDB", "PWA"],
      type: "Full-Stack SaaS",
      metrics: "1,500+ Active Students • 0ms CLS",
      demoUrl: "https://github.com/mradityasonicse",
      githubUrl: "https://github.com/mradityasonicse"
    },
    {
      id: "nexus-campus-portal",
      title: "NexusCampus: Distributed University Ecosystem",
      tagline: "Centralized campus reservations, event logistics & role-based access control",
      islandCode: "EXPEDITION 06 • DISTRIBUTED APPS",
      description: "An integrated campus infrastructure portal coordinating technical events, lab equipment reservations, student project showcases, and administrative communications with RBAC permissions.",
      highlights: [
        "Implemented role-based access control (RBAC) separating students, faculty, and coordinators",
        "Designed conflict-free resource scheduling with optimistic locking",
        "Integrated instant notification webhooks for urgent event updates"
      ],
      techStack: ["React 19", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      type: "Full-Stack SaaS",
      metrics: "5,000+ Bookings • 99.9% Uptime",
      demoUrl: "https://github.com/mradityasonicse/NexusCampus",
      githubUrl: "https://github.com/mradityasonicse/NexusCampus"
    },
    {
      id: "fintech-settlement",
      title: "SentinelPay: High-Throughput Settlement Gateway",
      tagline: "Idempotent financial ledger with sub-50ms latency and ACID compliance",
      islandCode: "EXPEDITION 07 • FINTECH & CLOUD",
      description: "An enterprise-grade double-entry ledger and payment router designed with strict ACID compliance, distributed Redis locking, and automated reconciliation audit trails.",
      highlights: [
        "Handles 10,000+ concurrent payment transactions per second with zero double-spends",
        "Engineered real-time webhook delivery with exponential backoff and dead-letter queues",
        "PCI-DSS aligned security posture with zero plain-text credential persistence"
      ],
      techStack: ["Next.js 15", "PostgreSQL", "Prisma", "Redis", "Docker", "Stripe API"],
      type: "Full-Stack SaaS",
      metrics: "10,000 TPS Capacity • 0 Double-Spends",
      demoUrl: "https://github.com/mradityasonicse",
      githubUrl: "https://github.com/mradityasonicse"
    },
    {
      id: "cyber-hunter",
      title: "AegisHunt: Autonomous Vulnerability Auditor",
      tagline: "Automated perimeter reconnaissance, soft-404 baseline derivation & CVSS reporting",
      islandCode: "EXPEDITION 08 • SECURITY & AUDIT",
      description: "A defensive cybersecurity engine that maps attack surfaces, audits JWT crypto implementations, derives soft-404 baselines, and generates standardized CVSS v3.1 reports.",
      highlights: [
        "Automated discovery of IDOR, SSRF, and authentication bypass attack vectors",
        "Generates executive-ready PDF audit reports with non-destructive reproduction proofs",
        "Accelerates vulnerability triage for security researchers and platform engineers"
      ],
      techStack: ["Python", "FastAPI", "TypeScript", "OWASP Arsenal", "PostgreSQL"],
      type: "Cyber Security",
      metrics: "200+ Automated Vulnerability Checks",
      demoUrl: "https://github.com/mradityasonicse",
      githubUrl: "https://github.com/mradityasonicse"
    }
  ],

  achievements: [
    {
      id: "sih-hackathon",
      title: "Smart India Hackathon (SIH)",
      issuer: "Ministry of Education & AICTE, Govt. of India",
      year: "2024",
      category: "Hackathons",
      description: "Selected as National Finalist in India's premier nationwide hackathon, solving real-world challenges through resilient software architecture and intelligent system automation.",
      iconType: "trophy",
      credentialUrl: "https://sih.gov.in",
      badgeCode: "SIH-NAT-FINALIST"
    },
    {
      id: "aws-community-day",
      title: "AWS Student Community Day — Cloud Architecture Recognition",
      issuer: "AWS Student Builder Group & Community",
      year: "2024",
      category: "Hackathons",
      description: "Awarded top builder recognition for demonstrating serverless cloud architecture, containerized microservices, and cost-effective distributed pipelines on AWS.",
      iconType: "award",
      credentialUrl: "https://aws.amazon.com",
      badgeCode: "AWS-SBG-HONOR"
    },
    {
      id: "ssipmt-techfest",
      title: "SSIPMT Innovation Hackathon — 1st Prize Winner",
      issuer: "Shri Shankaracharya Institute of Professional Management & Tech",
      year: "2023",
      category: "Hackathons",
      description: "Secured 1st Place for designing an autonomous campus resource coordination engine with zero-conflict scheduling and sub-100ms response times.",
      iconType: "trophy",
      credentialUrl: "https://ssipmt.com",
      badgeCode: "SSIPMT-CHAMP"
    },
    {
      id: "aws-solutions-architect",
      title: "AWS Certified Solutions Architect Standards",
      issuer: "Amazon Web Services (AWS)",
      year: "2024",
      category: "Certifications",
      description: "Validated competencies in high-availability cloud architecture, VPC network isolation, IAM zero-trust policies, and auto-scaling Kubernetes clusters.",
      iconType: "shield",
      credentialUrl: "https://aws.amazon.com/certification/",
      badgeCode: "AWS-ARCH-SPEC"
    },
    {
      id: "python-systems-cert",
      title: "Advanced Python & Distributed Systems Engineering",
      issuer: "Python Software Engineering Council / Academy",
      year: "2023",
      category: "Certifications",
      description: "Demonstrated mastery of object-oriented design, concurrent threading/multiprocessing, socket network programming, and deterministic test suites.",
      iconType: "star",
      credentialUrl: "https://python.org",
      badgeCode: "PY-SYS-MASTER"
    },
    {
      id: "owasp-appsec",
      title: "OWASP Application Security & Secure Coding Specialist",
      issuer: "Open Worldwide Application Security Project",
      year: "2024",
      category: "Badges",
      description: "Certified proficiency in mitigating OWASP Top 10 vulnerabilities: SQLi, XSS, CSRF, IDOR, SSRF, broken authentication, and secure JWT handling.",
      iconType: "shield",
      credentialUrl: "https://owasp.org",
      badgeCode: "OWASP-TOP10-DEF"
    }
  ],

  experience: [
    {
      period: "2024 - Present",
      role: "Lead Full-Stack & Systems Engineer",
      organization: "Autonomous Systems Fleet & Enterprise Platforms",
      location: "Bengaluru / Remote",
      description: "Leading core software development and distributed architecture, driving high-concurrency Python & TypeScript backends, WebGL rendering engines, and developer productivity tools.",
      achievements: [
        "Spearheaded redesign of legacy monolith into event-driven microservices, slashing p99 latency by 68%",
        "Architected real-time collaboration canvas supporting thousands of simultaneous active users",
        "Mentored team members in TypeScript strict standards, automated CI/CD testing, and system design"
      ]
    },
    {
      period: "2023 - 2024",
      role: "Software Engineering Intern / Contributor",
      organization: "Cloud & Web Platforms Outpost",
      location: "India",
      description: "Engineered scalable REST and GraphQL APIs, optimized relational database query execution plans, and implemented high-converting responsive user interfaces.",
      achievements: [
        "Engineered automated test suites achieving 94% code coverage across mission-critical billing modules",
        "Reduced Docker production image sizes from 1.2 GB down to 88 MB using multi-stage builds",
        "Collaborated with product designers to achieve 100% token parity with Figma design systems"
      ]
    }
  ],

  education: {
    institution: "Shri Shankaracharya Institute of Professional Management & Technology (SSIPMT)",
    degree: "Bachelor of Technology (B.Tech.) in Computer Science & Engineering",
    period: "2022 - 2026",
    grade: "First Class with Distinction",
    details: "Focused on Data Structures, Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Advanced Software Engineering. Active participant in national technical hackathons."
  }
};

/**
 * Cinematic Opening Transition Configuration
 * Easily update the opening airplane-and-curtain reveal settings.
 */
export interface IntroConfig {
  enabled: boolean;
  ownerName: string;
  durationMs: number;
}

export const INTRO_CONFIG: IntroConfig = {
  enabled: true,
  // Owner name displayed on the airplane and hero poster:
  ownerName: "HARSH",
  durationMs: 2200,
};

