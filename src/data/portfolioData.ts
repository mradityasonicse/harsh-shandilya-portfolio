export interface Project {
  id: string;
  title: string;
  voyageTitle: string;
  islandName: string;
  coordinates: string;
  lootDescription: string;
  lore: string;
  tags: string[];
  lootType: 'Legendary' | 'Cursed' | 'Mythic' | 'Rare';
  demoUrl?: string;
  githubUrl?: string;
  bounty: string;
}

export interface SkillCategory {
  category: string;
  weaponType: string;
  lore: string;
  iconName: string;
  skills: { name: string; level: number; description: string }[];
}

export interface LogEntry {
  date: string;
  epoch: string;
  title: string;
  portOfCall: string;
  entry: string;
  achievements: string[];
}

export const PORTFOLIO_DATA = {
  captain: {
    name: "Captain Dev 'Blackbeard' Sparrow",
    title: "Master Navigator of Cursed Code & High-Seas Architect",
    tagline: "Sailing through stormy latency and conquering full-stack architectures across the digital Caribbean.",
    bounty: "10,000,000 Spanish Doubloons",
    bio: "Forged in the turbulent tides of distributed systems, WebGL shaders, and high-velocity engineering. A sovereign code privateer who commands fleets of Kubernetes pods, tames rogue GPU render loops, and loots technical debt from enterprise monoliths.",
    stats: [
      { label: "Voyages Sailed (Projects)", value: "38+" },
      { label: "Sea Battles Won (Hackathons)", value: "14 Top Podiums" },
      { label: "Treasures Looted (Stars/Users)", value: "250K+" },
      { label: "Sea Hardened (Years Navigating)", value: "5+ Years" }
    ]
  },
  skills: [
    {
      category: "Front Cannons (Visual & Creative)",
      weaponType: "Triple-Decker 32-Pounder",
      lore: "Devastating visual broadsides that conquer browser screens at 120 FPS.",
      iconName: "Flame",
      skills: [
        { name: "React 19 & Next.js 15", level: 98, description: "App Router, Server Components & Streaming" },
        { name: "Three.js & WebGL / GLSL", level: 92, description: "Procedural Shaders, Particle Physics & 3D Spatial Engines" },
        { name: "TypeScript Magician", level: 96, description: "Strict Compile Gates & Zero Runtime Surprises" },
        { name: "Tailwind CSS & Framer Motion", level: 95, description: "Spring Kinetics, Fluid Typography & Responsive Layouts" },
      ]
    },
    {
      category: "Hull & Keel (Backend & Architecture)",
      weaponType: "Carved Ironclad Oak",
      lore: "Bulletproof structural backbone engineered to survive Category 5 traffic hurricanes.",
      iconName: "Shield",
      skills: [
        { name: "Node.js & Fastify / Bun", level: 94, description: "Sub-millisecond API Gateways & High-Throughput IO" },
        { name: "PostgreSQL & Prisma / Drizzle", level: 90, description: "ACID Transactions, Vector Indexing & Query Tuning" },
        { name: "Redis & Upstash QStash", level: 88, description: "Distributed Locks, Caching & Message Queues" },
        { name: "Python & FastAPI / PyTorch", level: 86, description: "AI Agent Orchestration & LLM Inference" },
      ]
    },
    {
      category: "Navigational Brass (DevOps & Edge)",
      weaponType: "Celestial Astrolabe",
      lore: "Guiding the fleet through murky fog to instant zero-downtime deployments.",
      iconName: "Compass",
      skills: [
        { name: "Docker & Container Hardening", level: 90, description: "Distroless Sandboxes & Multi-Stage Builds" },
        { name: "Cloudflare Workers & R2", level: 92, description: "Edge Compute, KV & Durable Objects" },
        { name: "AWS & Kubernetes (EKS)", level: 85, description: "Zero-Trust VPC, Helm Charts & Autoscaling" },
        { name: "CI/CD & GitHub Actions", level: 95, description: "Automated Verification Gates & Release Pipelines" },
      ]
    },
    {
      category: "Cursed Blades (Cyber Red-Teaming)",
      weaponType: "Enchanted Cutlass",
      lore: "Sharpened perimeter auditing to pierce through vulnerabilities before rivals exploit them.",
      iconName: "Skull",
      skills: [
        { name: "OWASP Top 10 Web Hunting", level: 92, description: "IDOR, SSRF, SQLi, JWT Crypto & Race Conditions" },
        { name: "Reverse Engineering & APIs", level: 88, description: "Binary Analysis, Protocol Dissection & Fuzzing" },
        { name: "Zero-Trust Architecture", level: 90, description: "Least Privilege IAM & Secret Zero-Leakage" },
        { name: "Autonomous Exploit Scanners", level: 89, description: "Telemetry Probing & Soft-404 Derivation" },
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "black-pearl-engine",
      title: "Kraken: Autonomous Cyber Warfare AI",
      voyageTitle: "Voyage into the Bermuda Breach",
      islandName: "Isla de Muerta",
      coordinates: "18°24'N 64°29'W",
      lootDescription: "Autonomous reconnaissance, vulnerability scanner and automated CVSS report engine for bug bounty hunters.",
      lore: "Legend whispers that this cursed script sails the dark perimeter of servers, discovering hidden endpoints and exposing rogue access tokens before midnight strikes.",
      tags: ["TypeScript", "Bun", "Node.js", "OWASP Top 10", "CLI Engine"],
      lootType: "Legendary",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      bounty: "50,000 Gold Coins"
    },
    {
      id: "shanty-synthesizer",
      title: "Sirens of the Deep: WebGL 3D Audio Visualizer",
      voyageTitle: "The Maelstrom Symphony",
      islandName: "Tortuga Reef",
      coordinates: "21°59'N 79°48'W",
      lootDescription: "Real-time reactive GLSL water shaders reacting to spatial Web Audio frequency waveforms.",
      lore: "An interactive siren call that turns audio vibrations into turbulent 3D oceanic waves, illuminated by bioluminescent plankton shaders.",
      tags: ["Three.js", "GLSL Shaders", "Web Audio API", "Vite", "Tailwind"],
      lootType: "Mythic",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      bounty: "35,000 Gold Coins"
    },
    {
      id: "cursed-ledger",
      title: "Dead Man's Chest: Distributed Zero-Knowledge Vault",
      voyageTitle: "The Locked Davy Jones Locker",
      islandName: "Shipwreck Cove",
      coordinates: "15°11'N 61°21'W",
      lootDescription: "Zero-knowledge decentralized secret storage with threshold multi-sig decryption and verifiable logs.",
      lore: "No mortal eye can view what lies within this chest without the nine pieces of eight. Cryptographically sealed against even the king's armada.",
      tags: ["Rust", "Zero-Knowledge", "Solana", "PostgreSQL", "Next.js"],
      lootType: "Cursed",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      bounty: "80,000 Gold Coins"
    },
    {
      id: "cartographers-quill",
      title: "The Flying Dutchman: 120 FPS E-Commerce Galleon",
      voyageTitle: "The Silk & Spices Route",
      islandName: "Port Royal",
      coordinates: "17°56'N 76°50'W",
      lootDescription: "Ultra-fast headless commerce platform with 0ms CLS, optimistic mutations, and custom Spline 3D product previews.",
      lore: "Sails through millions of daily transactions without slowing down. Merchants across the seven seas trade their silks and gold upon this deck.",
      tags: ["Next.js 15", "Turbopack", "Stripe API", "Zustand", "Tailwind CSS"],
      lootType: "Rare",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      bounty: "42,000 Gold Coins"
    }
  ] as Project[],

  logs: [
    {
      date: "Anno Domini 2026",
      epoch: "The Autonomous Era",
      title: "Fleet Admiral & Principal Systems Architect",
      portOfCall: "Tortuga Engineering Fleet",
      entry: "Commisioned the flagship autonomous agent mesh. Deployed 3,200+ specialized skill rigs, slashing enterprise pipeline latency by 74% and steering through high-concurrency traffic without dropping a single packet.",
      achievements: [
        "Architected multi-agent swarm systems handling 100M+ real-time requests",
        "Pioneered WebGPU shader pipelines for immersive browser spatial experiences",
        "Defended core cloud infrastructure from massive distributed credential stuffing attacks"
      ]
    },
    {
      date: "Anno Domini 2024 - 2025",
      epoch: "The Caribbean High Seas",
      title: "Senior Full-Stack Privateer",
      portOfCall: "Isla de la Juventud Labs",
      entry: "Led the vanguard engineering crew building distributed real-time platforms. Overhauled legacy monoliths into resilient microservices running on edge workers and Redis streams.",
      achievements: [
        "Reduced 99th percentile response latency from 680ms down to 42ms",
        "Authored award-winning design systems with 100% WCAG AAA accessibility",
        "Mentored a crew of 12 junior buccaneers into seasoned TypeScript privateers"
      ]
    },
    {
      date: "Anno Domini 2022 - 2024",
      epoch: "The Maiden Voyages",
      title: "Navigational Quartermaster",
      portOfCall: "Port Royal Tech Outpost",
      entry: "Handled the helm of frontend UI and database engines. Mastered the art of clean code, automated unit testing, and relational database schema normalization.",
      achievements: [
        "Shipped 15+ production applications with zero downtime deployment records",
        "Captured 1st Place in 5 regional maritime tech hackathons"
      ]
    }
  ] as LogEntry[],

  bottleQuotes: [
    "Not all treasure's silver and gold, mate. Some is written in zero-defect TypeScript.",
    "The code is more what you'd call 'guidelines' than actual rules... until the typechecker runs.",
    "Take what you can, give nothing back — except for clean pull requests and well-documented PRDs.",
    "Why fight when you can negotiate an asynchronous queue?"
  ]
};
