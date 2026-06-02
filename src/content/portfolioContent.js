// Trustworthy portfolio content sourced from:
// - C:/Users/smati/VS Code Projects/career-ops/cv.md
// - Explicit project copy in S03/T01 for Reliu and NazScan positioning.
// Keep personal claims centralized here so editorial sections can render from one inspectable surface.

export const portfolioContent = {
  identity: {
    name: 'Mohammad Aatif Shaikh',
    shortName: 'Aatif',
    location: 'Tampa, FL',
    headline: 'Curious builder, still figuring it out in public',
    targetRoles: ['Applied AI', 'LLMOps', 'AI security'],
    workAuthorization: ['US (F1; CPT/OPT eligible, Dec 2026)', 'UAE', 'India'],
  },

  contact: {
    email: 'mohammadaatif@usf.edu',
    phone: '+1-813-568-5612',
    linkedin: 'https://linkedin.com/in/shaikhaatif',
    github: 'https://github.com/aatif101',
  },

  lede: {
    eyebrow: 'Computer Science senior at the University of South Florida',
    title: "I build AI systems, security tools, and whatever I'm curious about next.",
    proof: ['20+ projects', 'NazScan — 63 commits', 'Pfizer externship', 'Vision desktop agent'],
    body: [
      'Agentic document intelligence for Pfizer. A security scanner at 63 commits. A vision-based desktop agent — and a couple dozen other things I built to find out if I could.',
      "I'm still learning in public, and I ship while I do it. What I want next is simple: something of mine running in real production, with real users on it.",
    ],
  },

  selectedWork: [
    {
      id: 'reliu',
      name: 'Reliu',
      title: 'HabitHealth iOS App',
      role: 'Founder build',
      status: 'Zero to TestFlight-ready in 3 days',
      summary:
        'Built and shipped a full-stack iOS habit-tracking app with AI coaching for a founder, taking the product from blank repo to a TestFlight-ready build in 3 days.',
      details: [
        'Built the React/TypeScript and Supabase product and packaged it through Capacitor/Xcode.',
        'Kept one codebase moving fast enough for founder review and release testing.',
        'Turned an idea into a testable product so the founder could move into software testing and real user feedback instead of staying in prototype mode.',
      ],
      technologies: ['React', 'TypeScript', 'Supabase', 'Capacitor', 'Xcode'],
    },
    {
      id: 'nazscan',
      name: 'NazScan',
      title: 'Web Application Security Scanner',
      role: 'Personal security project',
      status: 'In active development, Phase 3/5',
      href: 'https://github.com/aatif101/nazscan',
      summary:
        'I wanted to know if I could build a real security scanner, so I started one — a one-command security scanner for vibe-coded repos. Async, OWASP coverage, scope boundaries, with AI-assisted triage coming next. Phase 3 of 5 and still going.',
      details: [
        'Covers SQLi, XSS, CSRF, SSRF, open redirects, directory traversal, command injection, insecure headers, SSL/TLS misconfigurations, and subdomain enumeration.',
        'Includes a custom payload library with context-aware injection, crawler/spider module with auth flow handling and scope boundaries.',
        'Uses rate limiting and exponential backoff for responsible scanning, plus CVSS-style severity scoring with remediation guidance.',
        'Shipping next: AI-assisted triage to reduce false positives, authenticated scan flows, plugin architecture, and HackerOne/Bugcrowd export integration.',
      ],
      technologies: ['Python', 'Async', 'OWASP', 'AI triage', 'Bug bounty integration'],
    },
  ],

  experience: [
    {
      organization: 'Pfizer',
      context: 'via Externship Program',
      role: 'AI/ML Extern — Pharmaceutical Document Intelligence',
      period: 'Mar 2026 – Apr 2026',
      highlights: [
        'Architected an end-to-end AI document intelligence system for Pfizer supplier documentation, replacing the course baseline with an agentic pipeline.',
        'Used IBM Docling with Granite-Docling-258M for document parsing, reporting 97.9% table extraction accuracy on complex pharmaceutical PDFs.',
        'Built agentic field extraction with VLMs, Pydantic schemas, critic/reflection reconciliation, confidence scores, bounding-box citations, and human-in-the-loop routing for low-confidence results.',
        'Built visual and hybrid RAG with ColQwen2/ColPali in Qdrant, BM25 hybrid search over Docling text, and Cohere reranking.',
        'Integrated Langfuse observability and an evaluation harness benchmarking F1, table accuracy, latency, and cost per 1000 pages.',
      ],
    },
    {
      organization: 'CacheAi',
      role: 'AI/ML Intern',
      period: 'Jul 2024 – Aug 2024',
      highlights: [
        'Built LLM evaluation harnesses and RAG pipelines integrating retrieval backends with LLM inference.',
        'Added latency and cost observability for LLM calls; wired into CI/CD with Docker and GitHub Actions.',
        'Contributed to internal Python APIs and supported pipeline testing ahead of beta launch.',
      ],
    },
    {
      organization: 'USF IT',
      role: 'AV Tech & Workflow Automation',
      period: 'May 2025 – Present',
      highlights: [
        'Identified a coordination gap across 20+ AV technicians and built a lightweight automation layer for task routing, status updates, and technician handoffs.',
        'The system was adopted into the broader USF IT toolkit.',
        'Maintained approximately 99% uptime across 100+ lab PCs and AV infrastructure serving 200+ classes per week.',
      ],
    },
    {
      organization: 'Mozilla',
      role: 'Open Source Contributor',
      context: 'via Bugzilla',
      highlights: [
        'Contributed to Firefox DevTools through issue triage, CI/CD-related fixes, and DevOps documentation improvements.',
        'Accepted into Meta MLH Site Reliability Engineering Fellowship but was unable to attend due to medical circumstances.',
      ],
    },
    {
      organization: 'Infrastructure Docs Collective',
      role: 'Open Source Contributor',
      highlights: [
        'Merged 20+ PRs across Terraform modules, GitHub Actions workflows, Ansible playbooks, EKS deployments, and AWS IAM/VPC walkthroughs.',
        'Improved time-to-first-deploy for new contributors through onboarding guides and infrastructure readmes.',
      ],
    },
  ],

  education: [
    {
      institution: 'University of South Florida',
      degree: 'B.S. Computer Science',
      period: 'Aug 2022 – Dec 2026',
      gpa: '3.6',
      honors: ['USF Green & Gold Scholarship Recipient'],
      coursework: [
        'Intro to AI',
        'Network Analysis & ML',
        'Software Engineering',
        'Algorithms',
        'Data Structures',
      ],
    },
  ],

  leadership: [
    {
      organization: 'USF Student Government',
      role: 'Senator',
      period: 'May 2024 – May 2025',
      highlights: [
        'Helped oversee $2M+ in student activity funds through ASRC and ensured compliance with Title-8 Finance Code.',
        'Drove updates to 10+ statutes and served on 3+ committees concurrently.',
      ],
    },
  ],

  skills: {
    aiAgenticSystems: [
      'LangGraph',
      'LangChain',
      'CrewAI',
      'agentic RAG',
      'critic/reflection loops',
      'HITL queues',
      'query decomposition',
      'multi-agent orchestration',
      'MCP tooling',
    ],
    llmVlm: ['Claude API', 'GPT-4', 'ColQwen2 / ColPali', 'VLM-based extraction', 'prompt engineering', 'guardrails', 'Pydantic schemas'],
    retrieval: ['Hybrid RAG', 'BM25 + vector', 'Qdrant', 'ColPali visual retrieval', 'Cohere Rerank', 'LlamaIndex', 'two-stage retrieval'],
    observabilityEvals: ['Langfuse tracing', 'eval harness design', 'F1/latency/cost benchmarking', 'LLM eval pipelines'],
    security: ['SQLi', 'XSS', 'CSRF', 'SSRF', 'OWASP', 'CVSS scoring', 'CTF background', 'bug bounty in progress'],
    cloudInfra: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitHub Actions', 'Jenkins'],
    languages: ['Python', 'JavaScript/TypeScript', 'Go', 'Bash', 'C++', 'C#', 'SQL'],
    backendUi: ['REST APIs', 'PostgreSQL', 'async Python', 'Streamlit', 'Supabase', 'React Native / Expo'],
  },
};

export default portfolioContent;
