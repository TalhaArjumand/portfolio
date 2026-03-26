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
  stack: string[];
  accent: string;
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

const ctas: LinkItem[] = [
  { label: "View Selected Work", href: "#work" },
  { label: "Start A Conversation", href: "#contact" },
];

const capabilities: Capability[] = [
  {
    title: "Product Frontend",
    summary:
      "Build responsive interfaces that feel premium, communicate clearly, and support real business goals.",
    tags: ["React", "TypeScript", "Design Systems", "Responsive UI"],
  },
  {
    title: "Full-Stack Delivery",
    summary:
      "Ship production-ready features end to end when the product needs frontend execution plus backend coordination.",
    tags: ["Node.js", "APIs", "Data Modeling", "Deployment"],
  },
  {
    title: "Client Collaboration",
    summary:
      "Turn rough ideas into structured deliverables with clear milestones, sharper scope, and reliable communication.",
    tags: ["Discovery", "Roadmapping", "Iteration", "Handoff"],
  },
];

const projects: Project[] = [
  {
    index: "01",
    category: "Operations Platform",
    title: "Internal Dashboard For Faster Daily Execution",
    summary:
      "A clean control panel for teams managing operations, approvals, and reporting from one interface.",
    outcome:
      "Reduced friction across repeated internal tasks and gave stakeholders a single place to track progress.",
    stack: ["React", "TypeScript", "Charts", "API Integration"],
    accent: "#d2a76b",
  },
  {
    index: "02",
    category: "Marketing Site",
    title: "Conversion-Focused Web Presence For A Service Business",
    summary:
      "A premium marketing website designed to build trust quickly and move visitors toward enquiries.",
    outcome:
      "Clarified positioning, improved first impression, and created stronger calls to action for lead generation.",
    stack: ["Vite", "GSAP", "Content Strategy", "Responsive Design"],
    accent: "#8cbfa8",
  },
  {
    index: "03",
    category: "Workflow Tool",
    title: "Feature-Rich Admin Experience With Structured Navigation",
    summary:
      "A modular admin surface with reusable UI patterns for teams handling data-heavy workflows.",
    outcome:
      "Created a more maintainable UI foundation and made complex workflows easier to understand at a glance.",
    stack: ["Design Tokens", "Reusable Components", "Filters", "Tables"],
    accent: "#8fa7d8",
  },
];

const experience: ExperienceItem[] = [
  {
    period: "Add Your Current Period",
    role: "Current Role Or Focus",
    company: "Company / Freelance",
    summary:
      "Describe what you are building now, what systems you own, and the kind of impact you are responsible for.",
  },
  {
    period: "Add Previous Period",
    role: "Previous Role",
    company: "Previous Company",
    summary:
      "Summarize a meaningful responsibility, a migration, a delivery milestone, or a product challenge you handled.",
  },
  {
    period: "Add Earlier Period",
    role: "Foundational Role",
    company: "Earlier Company Or Client Work",
    summary:
      "Use this slot for the experience that shows how your capability was formed, not just where you worked.",
  },
];

const principles: Principle[] = [
  {
    title: "Clarity First",
    description:
      "Strong layout and strong copy matter as much as code when the goal is trust and conversion.",
  },
  {
    title: "Ship With Intent",
    description:
      "Every section should earn its place by supporting credibility, differentiation, or action.",
  },
  {
    title: "Maintainable Build",
    description:
      "The final site should look premium without becoming painful to update six weeks later.",
  },
];

const contactLinks: LinkItem[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/your-link" },
  { label: "GitHub", href: "https://github.com/your-handle" },
  { label: "Resume", href: "#" },
];

export const portfolio = {
  identity: {
    name: "Your Name",
    location: "Based in Pakistan, collaborating across time zones",
    oneLiner:
      "I build polished product experiences that help companies hire faster, sell clearer, and ship with confidence.",
    supportLine:
      "This starter is structured for both job applications and freelance client conversion. Replace the content in src/content/portfolio.ts with your real background, projects, and links.",
    rotatingRoles: [
      "Full-Stack Developer",
      "Frontend-Focused Builder",
      "Freelance Product Partner",
    ],
    availability: "Open to full-time roles and selective freelance work",
    ctas,
  },
  credibility: [
    "Available for freelance collaborations",
    "Open to remote product roles",
    "Frontend, UI systems, and product delivery",
    "Fast iteration with clean handoff",
    "Responsive, accessible, performance-aware builds",
  ],
  capabilities,
  projects,
  experience,
  about: {
    paragraphs: [
      "I prefer work that is visually sharp, technically reliable, and easy for real users to move through. That usually means balancing engineering detail with clarity in content and interface structure.",
      "For jobs, this portfolio should help recruiters understand range, depth, and communication style quickly. For clients, it should show that I can shape a polished experience, not just write code behind the scenes.",
    ],
    principles,
  },
  contact: {
    email: "hello@yourdomain.com",
    phone: "+92 300 0000000",
    closing:
      "If you are hiring, building a product, or need a portfolio-quality web experience, reach out and tell me what you are optimizing for.",
    links: contactLinks,
  },
} as const;
