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
  name: "Harsh",
  moniker: "Harsh",
  role: "Full-Stack Software Engineer & Systems Architect",
  subRole: "Specializing in High-Performance Distributed Systems, 3D WebGL & Modern Web",
  tagline: "Architecting high-throughput distributed systems, secure cloud backends, and interactive 3D spatial web interfaces.",
  location: "India (Open to Global Remote & On-Site Opportunities)",
  email: "harsh@example.com",
  photoUrl: "/profile-photo.jpg",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
  resumeUrl: "#resume",
  aboutBio: "I am a dedicated software engineer with an obsession for high-velocity engineering, clean architecture, and zero-defect code. From scaling microservice backends that handle millions of requests to engineering silky 120 FPS WebGL 3D spatial interfaces, I build production software that leaves a lasting impression.",
  codePhilosophy: "Zero vibe coding. 100% verified execution. Every API is strictly typed, every component is profiled, and every architecture is engineered to endure real-world traffic storms.",
  
  stats: [
    { label: "Production Projects", value: "20+", subtext: "Shipped & Deployed" },
    { label: "Hackathons Conquered", value: "5+ Podiums", subtext: "National & Global" },
    { label: "Code Commits", value: "2,500+", subtext: "Verified Open Source" },
    { label: "Test Automation", value: "95%+", subtext: "Strict Coverage Gate" }
  ],

  skills: [
    {
      category: "Frontend & Creative Engineering",
      themeLabel: "The Visual Broadside",
      lore: "Pixel-perfect Auto Layouts, fluid typography clamp curves, and GPU-accelerated motion.",
      skills: [
        { name: "React 19 & Next.js 15 (App Router)", level: 96, category: "Framework" },
        { name: "TypeScript & Strict Type Safety", level: 95, category: "Language" },
        { name: "Three.js & WebGL / GLSL Shaders", level: 90, category: "3D Graphics" },
        { name: "Tailwind CSS & Framer Motion", level: 95, category: "Styling" },
      ]
    },
    {
      category: "Backend & Systems Engineering",
      themeLabel: "The Ironclad Engine",
      lore: "Sub-millisecond API gateways, distributed locks, and ACID transactional databases.",
      skills: [
        { name: "Node.js, Express & Fastify / Bun", level: 93, category: "Runtime" },
        { name: "PostgreSQL & Prisma / Drizzle ORM", level: 91, category: "Database" },
        { name: "Redis & Distributed Caching", level: 89, category: "Cache / Queues" },
        { name: "Python, FastAPI & REST / GraphQL", level: 88, category: "APIs / AI" },
      ]
    },
    {
      category: "Cloud, DevOps & Infrastructure",
      themeLabel: "Navigational Infrastructure",
      lore: "Containerized isolation, zero-downtime CI/CD pipelines, and serverless edge scale.",
      skills: [
        { name: "Docker & Container Hardening", level: 90, category: "Containers" },
        { name: "Kubernetes & Cloud Deployments (AWS/GCP)", level: 85, category: "Orchestration" },
        { name: "CI/CD & GitHub Actions Workflows", level: 92, category: "Automation" },
        { name: "Cloudflare Workers & Edge Storage", level: 89, category: "Serverless" },
      ]
    },
    {
      category: "Computer Science & Security Fundamentals",
      themeLabel: "The Cursed Defense Arsenal",
      lore: "Mastery of algorithmic complexity, clean system design, and OWASP Top 10 security.",
      skills: [
        { name: "Data Structures & Algorithms (DSA)", level: 92, category: "Core CS" },
        { name: "System Design & Microservices", level: 89, category: "Architecture" },
        { name: "OWASP Top 10 Security & Input Sanitization", level: 90, category: "AppSec" },
        { name: "Database Indexing & Query Optimization", level: 88, category: "Performance" },
      ]
    }
  ],

  projects: [
    {
      id: "ai-copilot-engine",
      title: "OmniAgent: Autonomous Multi-Agent AI System",
      tagline: "Autonomous multi-threaded developer agent orchestrator",
      islandCode: "PORT 01 • SYSTEM CORE",
      description: "A production-grade agent orchestration framework with persistent task sharding, AST code intelligence, self-healing diagnostics, and isolated subagent swarms for parallel task completion.",
      highlights: [
        "Reduced complex codebase refactoring cycles from 4 hours to 12 minutes",
        "Implemented AST parsing and ripgrep binary integration for sub-millisecond symbol discovery",
        "Built persistent state checkpointing immune to memory context degradation"
      ],
      techStack: ["TypeScript", "Node.js", "Bun", "Vector DB", "Docker", "Tailwind CSS"],
      type: "Distributed System",
      metrics: "50K+ Operations / Day • 99.98% Uptime",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "spatial-3d-web",
      title: "Verve3D: Real-Time WebGL Spatial Commerce Engine",
      tagline: "Interactive 3D configurator with 60-120 FPS performance budget",
      islandCode: "PORT 02 • GRAPHICS & WEBGL",
      description: "An award-winning 3D spatial web platform featuring procedural GLSL fragment shaders, custom physical materials, realistic lighting models, and zero layout shift on mobile devices.",
      highlights: [
        "Architected custom WebGL shader pipeline delivering stable 60 FPS on mobile and 120 FPS on desktop",
        "Engineered procedural audio synthesizer utilizing Web Audio API for spatial feedback",
        "Scored 99/100 on Google Lighthouse performance audits"
      ],
      techStack: ["React 19", "Three.js", "GLSL Shaders", "Web Audio API", "Tailwind CSS"],
      type: "3D & AI",
      metrics: "Sub-500ms First Contentful Paint • 0ms CLS",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "fintech-settlement",
      title: "SentinelPay: High-Throughput Payment Settlement Gateway",
      tagline: "Idempotent financial ledger with sub-50ms latency",
      islandCode: "PORT 03 • FINTECH & CLOUD",
      description: "An enterprise-grade double-entry ledger and payment router designed with strict ACID compliance, distributed Redis locking, and automated reconciliation audit trails.",
      highlights: [
        "Handles 10,000+ concurrent payment transactions per second with zero double-spends",
        "Engineered real-time webhook delivery with exponential backoff and dead-letter queues",
        "PCI-DSS aligned security posture with zero plain-text credential persistence"
      ],
      techStack: ["Next.js 15", "PostgreSQL", "Prisma", "Redis", "Docker", "Stripe API"],
      type: "Full-Stack SaaS",
      metrics: "10,000 TPS Capacity • 0 Reconciliation Errors",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "cyber-hunter",
      title: "AegisHunt: Autonomous Vulnerability Auditor",
      tagline: "Automated perimeter reconnaissance and CVE scanner",
      islandCode: "PORT 04 • SECURITY & AUDIT",
      description: "A defensive cybersecurity engine that maps attack surfaces, audits JWT crypto implementations, derives soft-404 baselines, and generates standardized CVSS v3.1 reports.",
      highlights: [
        "Automated discovery of IDOR, SSRF, and authentication bypass attack vectors",
        "Generates executive-ready PDF audit reports with non-destructive reproduction proofs",
        "Used by security researchers to triage bug bounty scopes in minutes"
      ],
      techStack: ["Python", "FastAPI", "TypeScript", "OWASP Arsenal", "PostgreSQL"],
      type: "Cyber Security",
      metrics: "200+ Automated Vulnerability Checks",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    }
  ],

  experience: [
    {
      period: "2024 - Present",
      role: "Lead Full-Stack & Systems Engineer",
      organization: "Tech Innovation & Autonomous Systems Fleet",
      location: "Bengaluru / Remote",
      description: "Leading the core product engineering and distributed architecture division, driving high-concurrency systems, WebGL rendering engines, and developer productivity tools.",
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
    degree: "Bachelor of Technology (B.Tech.) in Engineering",
    period: "2022 - 2026",
    grade: "First Class with Distinction",
    details: "Focused on Data Structures, Algorithms, Operating Systems, Database Management Systems, and Advanced Software Engineering. Active participant in national technical hackathons."
  }
};
