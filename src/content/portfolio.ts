export type LinkItem = {
  label: string;
  href: string;
};

export type Capability = {
  title: string;
  summary: string;
  tags: string[];
};

export type Project = {
  index: string;
  category: string;
  title: string;
  summary: string;
  outcome: string;
  railSummary?: string;
  railOutcome?: string;
  stack: string[];
  accent: string;
  image?: string;
  href?: string;
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  summary: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type TechStackItem = {
  label: string;
  short: string;
  accent: string;
  logoKey?: string;
};

// Horizontal rail copy is scan-first, not full case-study copy.
// Keep description to one short sentence, ideally <= 112 chars.
// Keep impact to one short sentence, ideally <= 92 chars.
const ctas: LinkItem[] = [
  { label: "View Selected Work", href: "#work" },
  { label: "Start A Conversation", href: "#contact" },
];

const capabilities: Capability[] = [
  {
    title: "Backend Platforms & API Architecture",
    summary:
      "I design backend-heavy systems that hold up under real operational pressure, from modular REST APIs and queue-driven workflows to authentication, database design, and production deployment.",
    tags: ["Node.js", "Express.js", "PostgreSQL", "RabbitMQ"],
  },
  {
    title: "AI Workflows & Automation",
    summary:
      "I build practical AI-enabled systems that improve how teams operate, including RAG pipelines, multi-agent workflows, AI assistants, and automation layers that reduce repetitive manual work.",
    tags: ["Python", "LangChain", "LangGraph", "n8n"],
  },
  {
    title: "Blockchain-Backed Product Delivery",
    summary:
      "I have hands-on experience integrating blockchain into real applications, including smart-contract workflows, backend orchestration, and auditable transaction flows across web and mobile products.",
    tags: ["Solidity", "Hyperledger Besu", "Hardhat", "ethers.js"],
  },
];

const projects: Project[] = [
  {
    index: "01",
    category: "Humanitarian Platform",
    title: "AidChain",
    summary:
      "Led the architecture and delivery of a funded humanitarian aid distribution platform spanning backend APIs, blockchain infrastructure, NGO and admin web apps, and beneficiary and vendor mobile experiences. Built queue-driven disbursement workflows, smart-contract-linked settlement logic, and end-to-end operational traceability.",
    outcome:
      "Enabled same-day aid processing, typically within 6 hours, while reducing manual reconciliation effort by approximately 60%.",
    railSummary:
      "Built a blockchain-backed aid platform with queue-driven disbursement across NGO, admin, and mobile surfaces.",
    railOutcome:
      "Same-day aid processing in about 6 hours with reconciliation effort reduced by roughly 60%.",
    stack: ["Node.js", "Hyperledger Besu", "RabbitMQ", "Flutter"],
    accent: "#d2a76b",
    image: "/project-images/aidchain.png",
  },
  {
    index: "02",
    category: "AI Marketplace",
    title: "GBR + BRIVION",
    summary:
      "Architected and delivered a full-stack AI consultation marketplace with 3-role RBAC, multi-step booking, a public expert directory, analytics dashboards, and an asynchronous expert-matching engine with admin review safeguards.",
    outcome:
      "Reduced expert assignment turnaround by approximately 45% and improved booking completion by approximately 18%.",
    railSummary:
      "Built an AI consultation marketplace with RBAC, booking, expert discovery, and async matching workflows.",
    railOutcome:
      "Expert assignment time cut by roughly 45% and booking completion improved by about 18%.",
    stack: ["React", "Node.js", "PostgreSQL", "Prisma"],
    accent: "#8cbfa8",
    image: "/project-images/brivion.png",
  },
  {
    index: "03",
    category: "Automation Systems",
    title: "AI Workflow Automation Platform",
    summary:
      "Built an event-driven automation layer that connected internal tools and operational workflows with AI-assisted routing, retry-safe webhook processing, and monitoring for reliable day-to-day execution.",
    outcome:
      "Automated 8 recurring workflows and reduced manual coordination across internal and client-facing processes.",
    railSummary:
      "Built an AI automation layer with routing, retry-safe webhooks, and monitoring for client workflows.",
    railOutcome:
      "Automated 8 recurring workflows and reduced manual coordination across teams and operations.",
    stack: ["Python", "Node.js", "PostgreSQL", "Docker"],
    accent: "#8fa7d8",
    image: "/project-images/ai-workflow-platform.png",
  },
];

const experience: ExperienceItem[] = [
  {
    period: "Jan 2026 - Present",
    role: "Full-Stack and AI Engineer",
    company: "Freelance (Self-Employed)",
    summary:
      "Builds full-stack systems, AI assistants, RAG pipelines, and automation workflows across Python, JavaScript, and TypeScript stacks for client-facing and internal use cases.",
  },
  {
    period: "Jan 2025 - Feb 2026",
    role: "Technical Lead & Full-Stack Blockchain Engineer",
    company: "AidChain",
    summary:
      "Led delivery of a blockchain-backed humanitarian aid platform from research and architecture through sprint execution and release, combining backend APIs, queue orchestration, smart-contract workflows, and multi-surface product delivery.",
  },
  {
    period: "Dec 2024 - May 2025",
    role: "Full Stack Engineer (Contract)",
    company: "MarsBear Tech",
    summary:
      "Built a full-stack AI consultation marketplace with secure APIs, expert-matching workflows, booking systems, RAG-powered internal knowledge retrieval, and CI/CD-backed deployment.",
  },
];

const principles: Principle[] = [
  {
    title: "Build For Production",
    description:
      "I optimize for systems that can survive real usage, with clean APIs, reliable workflows, secure defaults, and deployment discipline.",
  },
  {
    title: "Tie Engineering To Outcomes",
    description:
      "I prefer work that improves throughput, reliability, clarity, or operating speed, not just feature count.",
  },
  {
    title: "Keep Systems Explainable",
    description:
      "Whether the stack involves queues, AI workflows, or blockchain, I value architectures that are traceable, defensible, and maintainable.",
  },
];

const techStack: TechStackItem[] = [
  { label: "Python", short: "PY", accent: "#3776ab", logoKey: "python" },
  { label: "Hyperledger Besu", short: "BESU", accent: "#54d9b6" },
  { label: "React", short: "REACT", accent: "#61dafb", logoKey: "react" },
  { label: "JavaScript", short: "JS", accent: "#f7df1e", logoKey: "javascript" },
  { label: "TensorFlow", short: "TF", accent: "#ff6f00", logoKey: "tensorflow" },
  { label: "SQL", short: "SQL", accent: "#8a96a8", logoKey: "sql" },
  { label: "PostgreSQL", short: "PG", accent: "#336791", logoKey: "postgresql" },
  { label: "CrewAI", short: "CREW", accent: "#f0b94d", logoKey: "crewai" },
  { label: "AutoGen", short: "AG", accent: "#a78bfa" },
  { label: "MCP", short: "MCP", accent: "#4ade80" },
  { label: "Codex", short: "CX", accent: "#f3ecf8", logoKey: "codex" },
  { label: "Claude", short: "CLD", accent: "#f59e0b", logoKey: "claude" },
  { label: "OpenAI API", short: "OAI", accent: "#10a37f", logoKey: "openai" },
  { label: "ChatGPT", short: "GPT", accent: "#74aa9c", logoKey: "chatgpt" },
];

const contactLinks: LinkItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/talha-arjumand-49703220a/",
  },
  { label: "GitHub", href: "https://github.com/TalhaArjumand" },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~0104edeaa658cb3b42?companyReference=2006740766894480426&mp_source=share",
  },
  { label: "Resume", href: "NEEDS_INPUT" },
];

export const portfolio = {
  identity: {
    name: "Talha Arjumand",
    location: "Islamabad",
    oneLiner:
      "I build full-stack products, backend systems, and AI-powered workflows.",
    supportLine:
      "Backend-first engineer with hands-on experience shipping production web applications, blockchain-backed platforms, and automation systems with clear operational impact.",
    rotatingRoles: [
      "Full-Stack Engineer",
      "Backend Systems Engineer",
      "AI Workflow Engineer",
    ],
    availability: "Open to freelance work and remote engineering opportunities.",
    ctas,
  },
  credibility: [
    "Led AidChain from research and architecture through release across 7 connected product surfaces.",
    "Built 300+ REST endpoints, 117 database migrations, and 76 queue-driven workflows for a funded humanitarian platform.",
    "Delivered same-day aid disbursement, typically within 6 hours, with 100% traceable off-chain to on-chain records.",
    "Reduced expert assignment turnaround by approximately 45% in an AI consultation marketplace.",
    "Automated 8 recurring operational workflows across internal operations and client-facing systems.",
  ],
  capabilities,
  projects,
  experience,
  techStack,
  about: {
    paragraphs: [
      "I work at the intersection of full-stack product delivery, backend systems, and applied AI. My strongest work is backend-first: designing APIs, shaping data flows, orchestrating async jobs, and building the technical foundations that make products reliable in production.",
      "What differentiates my work is ownership. I have led complex systems from research and architecture through implementation and release, and I care about traceability, maintainability, and measurable operational outcomes rather than surface-level feature shipping.",
    ],
    principles,
  },
  contact: {
    email: "tarjumand11@gmail.com",
    phone: "+923165115359",
    closing:
      "If you need someone who can own backend-heavy delivery, full-stack product work, or AI-integrated systems with a production mindset, let's talk.",
    links: contactLinks,
  },
} as const;
