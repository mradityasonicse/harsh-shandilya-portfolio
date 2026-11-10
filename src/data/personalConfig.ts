export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Certifications' | 'Leadership' | 'Badges';
  description: string;
  iconType: 'trophy' | 'award' | 'shield' | 'star';
  credentialUrl: string;
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
  phone?: string;
  photoUrl?: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  resumeUrl: string;
  aboutBio: string;
  lookingForWork?: string;
  codePhilosophy: string;
  stats: { label: string; value: string; subtext: string }[];
  skills: {
    category: string;
    themeLabel: string;
    focus: string;
    lore?: string;
    skills: { name: string; level: number; category: string }[];
  }[];
  projects: {
    id: string;
    title: string;
    tagline: string;
    projectCode: string;
    islandCode?: string;
    description: string;
    highlights: string[];
    techStack: string[];
    type: 'Java & Algorithms' | 'Frontend Engineering' | 'Cybersecurity & Linux';
    metrics: string;
    demoUrl: string;
    githubUrl: string;
    problem?: string;
    contribution?: string;
    toolsUsed?: string[];
    outcome?: string;
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
  secondaryEducation?: {
    school: string;
    level: string;
    period: string;
  }[];
}

export const PERSONAL_CONFIG: PersonalProfile = {
  name: "Harsh Kumar Shandilaya",
  moniker: "Harsh",
  role: "Cybersecurity & Software Developer",
  subRole: "B.Tech CSE (Cyber Security) • Google Student Ambassador '26 • AWS Student Builder Lead",
  tagline: "Building reliable software, practical cloud architectures, and secure systems with active community leadership.",
  location: "Bhilai / Raipur, Chhattisgarh, India",
  email: "hshandilya2008@gmail.com",
  phone: "+91 7647088605",
  photoUrl: "/harsh-cutout.png",
  githubUrl: "https://github.com/hackthesparrow",
  linkedinUrl: "https://www.linkedin.com/in/harsh-kumar-shandilya-78b223372/",
  twitterUrl: "https://x.com",
  resumeUrl: "/Harsh_Resume.pdf",
  aboutBio: "I am a B.Tech Computer Science & Engineering (Cyber Security) student at Rungta International Skills University with active focus on software development, cloud computing, and defensive cybersecurity. Serving as Google Student Ambassador 2026 and Media & Content Lead at AWS Student Builder Group RCET, I combine practical programming in Java and C with hands-on Linux system security and campus tech event leadership.",
  lookingForWork: "Seeking Software Engineering, Cybersecurity, and Cloud Computing internships where I can contribute technical skills, build verifiable software, and grow as an engineer.",
  codePhilosophy: "Clean, verifiable, and secure code. Grounded in solid computer science fundamentals, defensive security practices, and continuous community-driven learning.",
  
  stats: [
    { label: "Community Leadership", value: "Google Ambassador '26", subtext: "Tech Events & AI Tool Adoption" },
    { label: "Cloud Builder Lead", value: "AWS SBG RCET", subtext: "Media & Content Strategy" },
    { label: "Verified Credentials", value: "6+ Certifications", subtext: "Cybersecurity, Java, ML & Cloud" },
    { label: "Core Academic Focus", value: "B.Tech CSE", subtext: "Cyber Security Specialization" }
  ],

  skills: [
    {
      category: "Development",
      themeLabel: "Programming & Algorithms",
      focus: "Core languages, data structures, and algorithms for building high-performance applications.",
      lore: "Core languages, data structures, and algorithms for building high-performance applications.",
      skills: [
        { name: "Java (Core & OOP)", level: 88, category: "Language" },
        { name: "C Programming", level: 85, category: "Low-Level" },
        { name: "Python", level: 82, category: "Language" },
        { name: "JavaScript & React", level: 80, category: "Web Frontend" },
        { name: "HTML5 & Modern CSS3", level: 88, category: "Web Standards" }
      ]
    },
    {
      category: "Cybersecurity",
      themeLabel: "Systems Defense & Auditing",
      focus: "Practical security testing, Linux environments, packet analysis, and defensive cybersecurity principles.",
      lore: "Practical security testing, Linux environments, packet analysis, and defensive cybersecurity principles.",
      skills: [
        { name: "Kali Linux", level: 86, category: "Security OS" },
        { name: "Basic Penetration Testing", level: 80, category: "Security Testing" },
        { name: "Wireshark Packet Analysis", level: 82, category: "Networking" },
        { name: "Linux Administration & Bash", level: 84, category: "OS & CLI" },
        { name: "Cyber Essentials & Hardening", level: 85, category: "Security Principles" }
      ]
    },
    {
      category: "Tools & Cloud",
      themeLabel: "Infrastructure, DB & Workflows",
      focus: "Database storage, cloud fundamentals, and developer collaboration workflows.",
      lore: "Database storage, cloud fundamentals, and developer collaboration workflows.",
      skills: [
        { name: "MySQL", level: 82, category: "Relational DB" },
        { name: "AWS Cloud Fundamentals", level: 80, category: "Cloud Services" },
        { name: "Git & GitHub Version Control", level: 86, category: "Developer Tools" },
        { name: "File I/O & Bitstream Streams", level: 84, category: "Algorithms" }
      ]
    },
    {
      category: "Leadership",
      themeLabel: "Community & Tech Advocacy",
      focus: "Guiding student communities, organizing technical workshops, and developer communication.",
      lore: "Guiding student communities, organizing technical workshops, and developer communication.",
      skills: [
        { name: "Technical Event Organization", level: 92, category: "Community" },
        { name: "Developer Tool Promotion", level: 90, category: "Advocacy" },
        { name: "Problem Solving", level: 88, category: "Analytical" },
        { name: "Technical Writing & Media", level: 86, category: "Communication" }
      ]
    }
  ],

  projects: [
    {
      id: "file-compression-simulator",
      title: "File Compression Simulator",
      tagline: "Java simulation tool demonstrating Huffman coding & run-length encoding with bitrate analysis",
      projectCode: "PROJ-01 // JAVA",
      islandCode: "PROJ-01 // JAVA",
      description: "An algorithmic Java application designed to simulate and evaluate lossless file compression and decompression techniques using Huffman coding trees and run-length encoding (RLE), with file size reduction metrics and performance benchmarking.",
      problem: "Uncompressed text and binary streams incur excessive bandwidth overhead and inflated storage footprints during transmission.",
      contribution: "Architected Huffman tree nodes, priority queue frequency mapping, binary bitstream serialization, and an interactive CLI test harness.",
      toolsUsed: ["Java", "Data Structures", "Huffman Coding", "File Streams", "CLI"],
      outcome: "Achieved 30% to 50% compression ratios on sample text datasets with sub-second execution speeds.",
      highlights: [
        "Implemented variable-length prefix code trees with symbol frequency analysis",
        "Engineered bit-level file input/output streams for encoded binary formats",
        "Validated decompression integrity with 100% byte-for-byte fidelity checks"
      ],
      techStack: ["Java", "Data Structures", "Huffman Coding", "Algorithms"],
      type: "Java & Algorithms",
      metrics: "30-50% Size Reduction • Sub-second Processing",
      demoUrl: "https://github.com/hackthesparrow/Java-Project-",
      githubUrl: "https://github.com/hackthesparrow/Java-Project-"
    },
    {
      id: "personal-portfolio-web",
      title: "Interactive Web Mini Projects & UI Suite",
      tagline: "Suite of responsive frontend applications, DOM utilities, and modular components",
      projectCode: "PROJ-02 // WEB",
      islandCode: "PROJ-02 // WEB",
      description: "A portfolio and interactive web tools repository demonstrating responsive UI design, accessible layout systems, and clean JavaScript component architecture.",
      problem: "Creating high-converting, mobile-friendly interfaces without layout shifts, visual clutter, or unresponsive viewports.",
      contribution: "Engineered responsive layout grids, dark-mode themes, modular CSS styles, and performant interactions.",
      toolsUsed: ["JavaScript", "React", "HTML5", "CSS3", "Tailwind CSS"],
      outcome: "Delivered fast, accessible frontend interfaces with 0ms CLS and mobile-first responsiveness.",
      highlights: [
        "Crafted responsive components tested across mobile and desktop viewports",
        "Zero layout shift with optimized typography and accessible contrast ratios",
        "Clean modular repository architecture for continuous open-source contribution"
      ],
      techStack: ["JavaScript", "React", "HTML5", "CSS3", "Tailwind CSS"],
      type: "Frontend Engineering",
      metrics: "100% Responsive • Accessible Design",
      demoUrl: "https://github.com/hackthesparrow/Web-Mini_Projects",
      githubUrl: "https://github.com/hackthesparrow/Web-Mini_Projects"
    },
    {
      id: "network-security-audit-lab",
      title: "Network Security & Vulnerability Analysis Lab",
      tagline: "Hands-on penetration testing labs, packet dissection, and security auditing with Kali Linux & Wireshark",
      projectCode: "PROJ-03 // CYBERSEC",
      islandCode: "PROJ-03 // CYBERSEC",
      description: "Practical cybersecurity laboratory environments demonstrating network packet capture, Nmap service reconnaissance, CIA triad defense models, and defensive vulnerability scanning.",
      problem: "Unsecured network services, unmonitored open ports, and unencrypted transmission protocols leave systems exposed to interception and unauthorized lateral access.",
      contribution: "Configured isolated Kali Linux audit environments, performed Wireshark packet dissections, executed Nmap port fingerprinting scans, and documented hardening runbooks.",
      toolsUsed: ["Kali Linux", "Wireshark", "Nmap", "Bash", "Network Protocols"],
      outcome: "Audited network traffic patterns, mapped vulnerable service ports, and verified defensive security configurations.",
      highlights: [
        "Analyzed TCP 3-way handshakes, DNS queries, and HTTP headers using Wireshark captures",
        "Conducted host discovery and service version fingerprinting with Nmap NSE scripts",
        "Documented vulnerability assessment workflows and remediation checklists"
      ],
      techStack: ["Kali Linux", "Wireshark", "Nmap", "Bash", "Security Auditing"],
      type: "Cybersecurity & Linux",
      metrics: "Packet Inspection • Port Reconnaissance • Kali Linux",
      demoUrl: "https://github.com/hackthesparrow",
      githubUrl: "https://github.com/hackthesparrow"
    }
  ],

  achievements: [
    {
      id: "cert-cyber-foundations",
      title: "Foundations of Cybersecurity",
      issuer: "Coursera (Google / Industry)",
      year: "2024",
      category: "Certifications",
      description: "Validated competencies in core cybersecurity domains, threat modeling, security compliance frameworks, and network defense foundations.",
      iconType: "shield",
      credentialUrl: "https://coursera.org/share/7e749bc9a0fe90bc3717a338c758f9e7",
      badgeCode: "COURSERA-CYBER-FOUND"
    },
    {
      id: "cert-cyber-essentials",
      title: "Cyber Essentials & Security Defenses",
      issuer: "Certified Security Course",
      year: "2024",
      category: "Certifications",
      description: "Demonstrated practical knowledge of access control mechanisms, malware defenses, system hardening, and secure configuration management.",
      iconType: "shield",
      credentialUrl: "https://drive.google.com/file/d/1Xc0p5zOqnAIxRAQXnBeVt8-c4IDVxKTx/view?usp=sharing",
      badgeCode: "CYBER-ESSENTIALS"
    },
    {
      id: "cert-intro-cyber",
      title: "Introduction to Cybersecurity",
      issuer: "Coursera",
      year: "2024",
      category: "Certifications",
      description: "Comprehensive coverage of cybersecurity principles, CIA triad, cryptography fundamentals, vulnerability identification, and mitigation strategies.",
      iconType: "shield",
      credentialUrl: "https://coursera.org/share/52b5ed448da8f62a1f399802af0b6530",
      badgeCode: "COURSERA-INTRO-SEC"
    },
    {
      id: "cert-ml-ds",
      title: "Machine Learning and Data Science",
      issuer: "Coursera",
      year: "2024",
      category: "Certifications",
      description: "Studied foundational algorithms in supervised/unsupervised machine learning, statistical data modeling, and predictive feature engineering.",
      iconType: "star",
      credentialUrl: "https://coursera.org/share/e2e08944a48bfb9788ee14348789ba99",
      badgeCode: "COURSERA-ML-DS"
    },
    {
      id: "cert-java",
      title: "Programming in Java",
      issuer: "Coursera",
      year: "2024",
      category: "Certifications",
      description: "Validated proficiency in Java programming, object-oriented design, inheritance, interfaces, exception handling, and collection frameworks.",
      iconType: "award",
      credentialUrl: "https://coursera.org/share/42f1ce37c6c596648906174438de0fe2",
      badgeCode: "COURSERA-JAVA-PROG"
    },
    {
      id: "cert-networking",
      title: "Computer Networking Fundamentals",
      issuer: "Coursera",
      year: "2024",
      category: "Certifications",
      description: "Deep dive into the OSI and TCP/IP stack, IP routing, subnetting, DNS, HTTP/S, and network packet flow troubleshooting.",
      iconType: "star",
      credentialUrl: "https://coursera.org/share/abe5a9612db47abae37e31f33b45b682",
      badgeCode: "COURSERA-NETWORKING"
    }
  ],

  experience: [
    {
      period: "May 2026 - Present",
      role: "Google Student Ambassador 2026",
      organization: "Google Student Community",
      location: "Campus & Developer Community",
      description: "Leading developer engagement on campus, organizing technical workshops, and driving adoption of Google AI tools and developer platforms within the student community.",
      achievements: [
        "Organized tech events, workshops, and study jams introducing students to Google AI technologies and developer tools",
        "Promoted practical technology adoption and peer mentoring across multiple engineering cohorts",
        "Facilitated hands-on coding sessions and student developer initiatives"
      ]
    },
    {
      period: "Mar 2026 - Present",
      role: "Media & Content Lead",
      organization: "AWS Student Builder Group RCET",
      location: "Rungta College of Engineering & Technology",
      description: "Directing technical media strategy, workshop announcements, and educational cloud content for the official AWS Student Builder Group at RCET.",
      achievements: [
        "Led content strategy and visual communications for campus cloud computing workshops and study jams",
        "Drove student awareness and active participation in hands-on AWS Cloud builder labs",
        "Collaborated with student leadership to deliver practical learning materials on cloud fundamentals"
      ]
    }
  ],

  education: {
    institution: "Rungta International Skills University (RCET)",
    degree: "Bachelor of Technology (B.Tech) – Computer Science Engineering",
    period: "2025 — 2029 (Currently Pursuing)",
    grade: "First Year • Cyber Security Specialization",
    details: "Specializing in Cyber Security, Software Engineering, Cloud Computing, Database Management Systems, and Computer Networks. Active community leader in Google and AWS student developer chapters."
  },

  secondaryEducation: [
    {
      level: "Higher Secondary (12th)",
      school: "Govt Higher Secondary School Koilibeda",
      period: "2023 - 2024"
    },
    {
      level: "Secondary School (10th)",
      school: "Govt Higher Secondary School Koilibeda",
      period: "2021 - 2022"
    }
  ]
};

export interface IntroConfig {
  enabled: boolean;
  ownerName: string;
  durationMs: number;
}

export const INTRO_CONFIG: IntroConfig = {
  enabled: false,
  ownerName: "HARSH KUMAR SHANDILAYA",
  durationMs: 1800,
};
