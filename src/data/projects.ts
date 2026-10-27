import { Project } from '../types';
import { ailayerCaseStudy, floodCaseStudy, miniAgenticCaseStudy } from './caseStudies';

export const projects: Project[] = [
  {
    id: '14',
    title: 'Job App OS (Vision 2060)',
    description: 'An AI job-application assistant that captures job posts, checks them against your profile and drafts tailored applications from verified profile facts only, leaving gaps visible instead of inventing qualifications.',
    achievements: [
      'Captures a job from pasted text, a link or a screenshot into structured fields',
      'Fit analysis with a verdict and the strengths and gaps behind it',
      'Cover notes and follow-ups grounded in the user’s own profile',
      'Rule: incomplete truth over hallucination'
    ],
    techStack: ['React', 'TypeScript', 'Gemini', 'Firebase', 'Node.js', 'PostgreSQL'],
    category: 'AI/ML',
    status: 'Live',
    image: 'https://images.pexels.com/photos/5439455/pexels-photo-5439455.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: 'https://job-app-os-kappa.vercel.app/',
    githubUrl: 'https://github.com/FranklinMburu/job-app-OS'
  },
  {
    id: '15',
    title: 'Autonomous Content Studio',
    description: 'A $0 pipeline that turns a topic into a fact-checked, animated vertical explainer video, run on GitHub Actions. A person reviews every video before it is uploaded.',
    achievements: [
      'Gemini free tier writes the script and checks it against its sources',
      'Kokoro open-source voice and 11 animated scene types with Tabler icons',
      'FFmpeg rendering on GitHub Actions; the first run finished in 2 min 13 s',
      'Version 1 built and five videos produced'
    ],
    techStack: ['Python', 'Gemini', 'Kokoro', 'FFmpeg', 'GitHub Actions'],
    category: 'Automation',
    status: 'Public code',
    image: 'https://images.pexels.com/photos/29505140/pexels-photo-29505140.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/FranklinMburu/Autonomous-content-studio'
  },
  {
    id: '16',
    title: 'AI Email Cleaner',
    description: 'A human-controlled Gmail cleanup tool for large inboxes. It sorts mail from metadata first, previews every change before it runs, and takes no destructive action without the user’s approval.',
    achievements: [
      'Metadata-first categorisation over Gmail OAuth',
      'Dry-run previews before any action runs',
      'Starred and important emails are protected',
      'Audit log of every action; archive, label and trash can be undone, permanent delete is blocked'
    ],
    techStack: ['Node.js', 'Express', 'React', 'SQLite', 'Gmail API', 'OAuth'],
    category: 'Full-Stack',
    status: 'Public code',
    image: 'https://images.pexels.com/photos/5386485/pexels-photo-5386485.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/FranklinMburu/Ai-Email_cleaner'
  },
  {
    id: '17',
    title: 'ailayer: Shared LLM Gateway',
    description: 'A dependency-free Python package with one ask() call that routes each request across Gemini, Groq, NVIDIA and local Ollama by tier, and falls back to another model or provider when one fails. Free tiers only.',
    achievements: [
      'Tiered routing (bulk, standard, critical, private) with automatic fallback',
      'Per-model pacing, retries on server errors and a cooldown after rate limits',
      'JSON validation with one repair round; reasoning traces stripped from open models',
      'Usage logging that never records prompts, outputs or keys',
      'Key probe tool, offline tests against a fake server and a blind evaluation harness'
    ],
    techStack: ['Python', 'Gemini', 'Groq', 'NVIDIA', 'Ollama', 'JSON validation'],
    category: 'AI/ML',
    status: 'In Development',
    image: 'https://images.pexels.com/photos/6466143/pexels-photo-6466143.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'ailayer',
    caseStudy: ailayerCaseStudy
  },
  {
    id: '1',
    title: 'AI Trading Agent (ICT/SMC Strategy)',
    description: 'Multi-layer AI reasoning system with GPT-5 orchestration for real-time market analysis. Implements autonomous decision-making with risk management protocols.',
    achievements: [
      'Multi-agent orchestration with adaptive reasoning',
      'Real-time market sentiment analysis',
      'Advanced risk management system'
    ],
    techStack: ['Python', 'FastAPI', 'GPT-5', 'Multi-agent Systems', 'WebSocket'],
    category: 'AI/ML',
    status: 'In Development',
    image: '/assets/images/ai-trading-agent.jpg'
  },
  {
    id: '2',
    title: 'Full-Stack Supplier Inventory System',
    description: 'Enterprise inventory management with AI-powered stock prediction and automated reordering. Features JWT authentication and role-based access control.',
    achievements: [
      'AI reasoning for stock optimization',
      'Real-time inventory tracking',
      'Multi-role permission system'
    ],
    techStack: ['Flask', 'React', 'PostgreSQL', 'JWT', 'RBAC', 'AI'],
    category: 'Full-Stack',
    status: 'Private',
    image: '/assets/images/full-stack-supplier-inventory.jpg'
  },
  {
    id: '3',
    title: 'AI Reasoning & Memory Pipeline',
    description: 'Advanced RAG pipeline with state tracking and adaptive execution. Integrates ChromaDB for persistent memory and LangChain for orchestration.',
    achievements: [
      'Semantic search with vector embeddings',
      'Contextual memory management',
      'Multi-turn conversation handling'
    ],
    techStack: ['Python', 'ChromaDB', 'LangChain', 'RAG', 'Transformers'],
    category: 'AI/ML',
    status: 'Private',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Movers Transport System',
    description: 'End-to-end transport management with Mpesa STK Push integration. Automated driver assignment and real-time tracking capabilities.',
    achievements: [
      'Seamless Mpesa payment integration',
      'Intelligent driver-vehicle matching',
      'Real-time booking management'
    ],
    techStack: ['FastAPI', 'React', 'Mpesa API', 'SQLite', 'JWT'],
    category: 'Full-Stack',
    status: 'Private',
    image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    title: 'SmartFarm Dairy Tracker',
    description: 'Comprehensive dairy farm management with role-based CRUD operations and analytics dashboard for production insights.',
    achievements: [
      'Multi-user role management',
      'Production analytics dashboard',
      'Automated report generation'
    ],
    techStack: ['Django', 'MySQL', 'Bootstrap', 'Chart.js'],
    category: 'Backend',
    status: 'Private',
    image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    title: 'School Result Management System',
    description: 'Multi-user academic management system with automated grading, report generation, and parent portal access.',
    achievements: [
      'Automated grade calculations',
      'Parent-teacher communication portal',
      'Performance analytics'
    ],
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    category: 'Full-Stack',
    status: 'Private',
    image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '7',
    title: 'Advanced NLP Pipeline',
    description: 'Production-grade natural language processing system with custom transformers and fine-tuned models for domain-specific tasks.',
    achievements: [
      'Custom model fine-tuning',
      'Multi-language support',
      'Real-time inference optimization'
    ],
    techStack: ['PyTorch', 'Transformers', 'FastAPI', 'Docker'],
    category: 'AI/ML',
    status: 'Private',
    image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '8',
    title: 'Automated Workflow System',
    description: 'N8n-powered automation platform integrating multiple services for seamless business process automation.',
    achievements: [
      'Multi-service integration',
      'Custom workflow templates',
      'Error handling & retry logic'
    ],
    techStack: ['n8n', 'Node.js', 'PostgreSQL', 'REST API'],
    category: 'Automation',
    status: 'Private',
    image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '9',
    title: 'Mini Agentic AI',
    description: 'Multi-worker LLM orchestration system that coordinates specialized AI agents (Planner, Coder, Reviewer) to solve complex tasks. Features real-time WebSocket event streaming, deterministic action validation, and auto-persistent state management.',
    achievements: [
      'Multi-agent coordination with role-based workers',
      'Real-time event streaming to live dashboard',
      'State persistence and recovery',
      'Rate-limited API calls with token bucket algorithm',
      'Comprehensive test coverage (10+ test files)'
    ],
    techStack: ['Python', 'FastAPI', 'WebSocket', 'Google Generative AI', 'Async/Await'],
    category: 'AI/ML',
    status: 'Public code',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/FranklinMburu/mini-agentic-ai',
    featured: true,
    slug: 'mini-agentic-ai',
    caseStudy: miniAgenticCaseStudy
  },
  {
    id: '10',
    title: 'AI-Powered KYC Verification Platform',
    description: 'Enterprise-grade identity verification platform with OCR extraction, face matching, liveness detection, and fraud analysis. Production-ready system handling secure document processing with comprehensive audit logging.',
    achievements: [
      'Multi-modal identity verification (OCR, face matching, liveness detection)',
      'Enterprise fraud scoring & suspicious activity detection',
      'Admin verification dashboard with audit logging',
      'Mobile-responsive capture workflows',
      'REST API architecture with secure authentication'
    ],
    techStack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'OpenCV', 'Tesseract OCR', 'Docker'],
    category: 'AI/ML',
    status: 'Private',
    image: 'https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '11',
    title: 'AI Document Intelligence API',
    description: 'High-performance document processing API for extracting structured intelligence from IDs, invoices, PDFs, and compliance documents. Async-first architecture with confidence scoring and automated validation pipelines.',
    achievements: [
      'Multi-format document parsing (PDF, images, scans)',
      'Structured JSON extraction with confidence scoring',
      'Document classification & entity recognition',
      'Async processing with distributed task queue',
      'RESTful API with validation pipelines'
    ],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Tesseract OCR', 'LangChain', 'Docker'],
    category: 'AI/ML',
    status: 'Live',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: 'https://document-ai-api.vercel.app/docs',
    featured: true
  },
  {
    id: '12',
    title: 'Compliance & Risk Monitoring Dashboard',
    description: 'Operational compliance and risk monitoring platform for detecting suspicious workflows, investigating failed verifications, and tracking enterprise anomalies. Real-time analytics with role-based access control.',
    achievements: [
      'Real-time risk scoring engine with machine learning models',
      'Suspicious activity detection & alert workflows',
      'Investigation management queue with prioritization',
      'Comprehensive audit logging & traceability',
      'Role-based access control (RBAC) system',
      'Interactive analytics dashboards'
    ],
    techStack: ['React', 'FastAPI', 'PostgreSQL', 'WebSockets', 'Chart.js', 'Docker'],
    category: 'Full-Stack',
    status: 'Private',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '13',
    title: 'Nairobi Urban Flood Catastrophe Model',
    description: 'Team hackathon prototype for the Kenya Re AI4Insurance Hackathon 2026: an auditable flood catastrophe-loss engine that runs hazard → exposure → vulnerability → financial loss → portfolio risk → AI analysis → human decision, on an organiser-supplied synthetic portfolio of 600 buildings.',
    achievements: [
      'Input validation rules (V1–V11) that stop a run instead of silently correcting data',
      'Source-tagged configuration with four default loss scenarios',
      'FastAPI upload service adapting CSV, XLSX, GeoJSON and PDF tables',
      'Human approval step before AI-extracted values reach the model',
      'pytest suite run by GitHub Actions on every push'
    ],
    techStack: ['Python', 'FastAPI', 'pandas', 'NumPy', 'rasterio', 'pytest', 'GitHub Actions'],
    category: 'AI/ML',
    status: 'Hackathon',
    image: '/assets/images/nairobi-flood-cat-model.webp',
    liveUrl: 'https://nairobi-flood-cat-model.vercel.app',
    githubUrl: 'https://github.com/FranklinMburu/Nairobi-flood-cat-model',
    featured: true,
    slug: 'nairobi-flood-cat-model',
    caseStudy: floodCaseStudy
  }
];

/** Projects with a case study, in the order of the list above. */
export const caseStudies = projects.filter((project) => project.slug && project.caseStudy);
