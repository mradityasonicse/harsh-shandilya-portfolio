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
  name: "Harsh",
  moniker: "Harsh",
  role: "Full-Stack Software Engineer & Systems Architect",
  subRole: "Specializing in High-Performance Distributed Systems, 3D WebGL & Modern Web",
  tagline: "Architecting high-throughput distributed systems, secure cloud backends, and interactive 3D spatial web interfaces.",
  location: "Bhilai / Raipur, India (Open to Global Remote & On-Site Roles)",
  email: "7c24harsh@gmail.com",
  photoUrl: "/profile-photo.jpg",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
  resumeUrl: "#resume",
  aboutBio: "I am a dedicated software engineer with an obsession for high-velocity engineering, clean architecture, and zero-defect code. From scaling microservice backends and building deterministic CLI test harnesses to engineering silky 120 FPS WebGL 3D spatial interfaces, I build production software that leaves a lasting impression.",
  codePhilosophy: "Zero vibe coding. 100% verified execution. Every API is strictly typed, every component is profiled, and every architecture is engineered to endure real-world traffic storms.",
  
  stats: [
    { label: "Production Systems", value: "24+", subtext: "Shipped & Deployed" },
    { label: "Hackathons Conquered", value: "6+ Podiums", subtext: "National & Global" },
    { label: "Code Commits", value: "3,200+", subtext: "Verified Open Source" },
    { label: "Test Automation", value: "98%+", subtext: "Deterministic Passes" }
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
        { name: "Python, FastAPI & CLI Tools", level: 94, category: "Core Language" },
        { name: "Node.js, Express & Bun Runtime", level: 93, category: "Runtime" },
        { name: "PostgreSQL & Prisma / Drizzle ORM", level: 91, category: "Database" },
        { name: "Redis & Distributed Caching", level: 89, category: "Cache / Queues" },
      ]
    },
    {
      category: "Cloud, DevOps & Infrastructure",
      themeLabel: "Navigational Infrastructure",
      lore: "Containerized isolation, zero-downtime CI/CD pipelines, and serverless edge scale.",
      skills: [
        { name: "Docker & Container Hardening", level: 90, category: "Containers" },
        { name: "AWS Cloud & Architecture", level: 88, category: "Cloud Platform" },
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
        { name: "Unit & Automated Integration Testing", level: 96, category: "Quality" },
      ]
    }
  ],

  projects: [
    {
      id: "restaurant-order-billing",
      title: "Restaurant Order & Automated Billing Engine",
      tagline: "Deterministic order processing, test-driven pricing logic & receipt pipeline",
      islandCode: "PORT 01 • AUTOMATION & PYTHON",
      description: "A production Python ordering and billing system engineered with strict test-driven validation, table status management, real-time bill calculations, itemized discount policies, and terminal receipt generation.",
      highlights: [
        "100% deterministic test-case verification across standard, edge-case, and boundary order inputs",
        "Built modular menu catalogue parser and itemized tax calculation engine",
        "Clean terminal CLI interface with formatted tabular output and receipt logs"
      ],
      techStack: ["Python 3.12", "CLI Engineering", "Unit Testing", "Regex", "Clean Architecture"],
      type: "Distributed System",
      metrics: "100% Test Pass Rate • Sub-10ms Processing",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "ai-copilot-engine",
      title: "OmniAgent: Autonomous Multi-Agent AI System",
      tagline: "Autonomous multi-threaded developer agent orchestrator",
      islandCode: "PORT 02 • SYSTEM CORE",
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
      id: "visionpath-ai",
      title: "VisionPath AI: Real-Time Edge Computer Vision Engine",
      tagline: "Multimodal computer vision pipeline with real-time tensor inference",
      islandCode: "PORT 03 • AI & MACHINE LEARNING",
      description: "High-performance edge vision engine designed for object tracking, facial gesture analysis, and automated scene classification using quantized lightweight neural models.",
      highlights: [
        "Delivers sub-15ms inference latency per frame on standard consumer hardware",
        "Engineered robust WebSocket streaming pipeline for live camera telemetry",
        "Modular plug-and-play architecture supporting custom trained neural backends"
      ],
      techStack: ["Python", "PyTorch", "OpenCV", "FastAPI", "WebSockets", "Docker"],
      type: "3D & AI",
      metrics: "60 FPS Stream Rate • Sub-15ms Latency",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "spatial-3d-web",
      title: "Verve3D: Real-Time WebGL Spatial Commerce Engine",
      tagline: "Interactive 3D configurator with 60-120 FPS performance budget",
      islandCode: "PORT 04 • GRAPHICS & WEBGL",
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
      id: "resilient-student-planner",
      title: "Resilient Student: Academic Scheduler & Attendance Tracker",
      tagline: "Smart timetable optimization, class deficit predictor & automated reminders",
      islandCode: "PORT 05 • FULL-STACK WEB",
      description: "A comprehensive academic governance suite helping students navigate complex course schedules, dynamic attendance criteria thresholds, exam timetables, and assignment workflows.",
      highlights: [
        "Automated attendance projection engine calculating mandatory presence margins",
        "Offline-first progressive web app with instant sync and local encrypted persistence",
        "Seamless timetable scheduling algorithm avoiding multi-course conflicts"
      ],
      techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "IndexedDB", "PWA"],
      type: "Full-Stack SaaS",
      metrics: "1,500+ Active Students • 0ms Layout Shift",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "nexus-campus-portal",
      title: "NexusCampus: Distributed University Ecosystem",
      tagline: "Centralized campus events, lab resource reservations & peer collaboration",
      islandCode: "PORT 06 • DISTRIBUTED APPS",
      description: "An integrated campus infrastructure portal coordinating technical events, lab equipment reservations, student project showcases, and administrative communications with RBAC permissions.",
      highlights: [
        "Implemented role-based access control (RBAC) separating students, faculty, and coordinators",
        "Designed conflict-free resource scheduling with optimistic locking",
        "Integrated instant notification webhooks for urgent event updates"
      ],
      techStack: ["React 19", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      type: "Full-Stack SaaS",
      metrics: "5,000+ Campus Bookings • 99.9% Uptime",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "fintech-settlement",
      title: "SentinelPay: High-Throughput Payment Settlement Gateway",
      tagline: "Idempotent financial ledger with sub-50ms latency",
      islandCode: "PORT 07 • FINTECH & CLOUD",
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
      islandCode: "PORT 08 • SECURITY & AUDIT",
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
      organization: "Tech Innovation & Autonomous Systems Fleet",
      location: "Bengaluru / Remote",
      description: "Leading core product engineering and distributed architecture, driving high-concurrency Python & TypeScript backends, WebGL rendering engines, and developer productivity tools.",
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
